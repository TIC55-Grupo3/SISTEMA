-- ==========================================================
-- Views e Procedures
-- ==========================================================

------------------------------------------------------------
-- MÓDULO 3: OPERACIONAL E CRM (VISUALIZAÇÃO)
------------------------------------------------------------

-- View: Painel de Controle de OS (O que o técnico vê)
CREATE OR REPLACE VIEW vw_painel_ordens_servico AS
SELECT 
    os.id_os AS "Nº OS",
    c.nome AS "Cliente",
    e.tipo_aparelho || ' ' || e.marca || ' (' || e.modelo || ')' AS "Equipamento",
    os.status AS "Status",
    os.valor_total AS "Total",
    os.valor_pago AS "Adiantamento",
    (os.valor_total - os.valor_pago) AS "Saldo a Pagar",
    os.data_entrada AS "Entrada"
FROM ordens_servico os
JOIN equipamentos e ON os.id_equipamento = e.id_equipamento
JOIN clientes c ON e.id_cliente = c.id_cliente;

-- Procedure: Receber Adiantamento ou Pagamento de OS
CREATE OR REPLACE PROCEDURE pr_receber_pagamento_os(
    p_id_os INT,
    p_valor DECIMAL(10,2),
    p_forma_pagamento VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- 1. Registra a entrada no financeiro
    INSERT INTO transacoes_financeiras (tipo, origem, valor, forma_pagamento, id_os)
    VALUES ('Entrada', 'Pagamento OS #' || p_id_os, p_valor, p_forma_pagamento, p_id_os);

    -- 2. Atualiza o que já foi pago na OS
    UPDATE ordens_servico 
    SET valor_pago = valor_pago + p_valor
    WHERE id_os = p_id_os;

    COMMIT;
END;
$$;

------------------------------------------------------------
-- MÓDULO 4: ESTOQUE (ALERTAS)
------------------------------------------------------------

-- View: Radar de Reposição (Estoque Crítico)
CREATE OR REPLACE VIEW vw_estoque_critico AS
SELECT 
    descricao AS "Produto",
    saldo_atual AS "Qtd Atual",
    estoque_minimo AS "Mínimo",
    (estoque_minimo - saldo_atual) AS "Sugestão de Compra"
FROM produtos_pecas
WHERE saldo_atual <= estoque_minimo;

------------------------------------------------------------
-- MÓDULO 5: COMERCIAL E FINANCEIRO (PROCESSAMENTO)
------------------------------------------------------------

-- View: Fechamento de Caixa Diário
CREATE OR REPLACE VIEW vw_fluxo_caixa_diario AS
SELECT 
    CAST(data_pagamento AS DATE) AS "Data",
    tipo AS "Tipo",
    origem AS "Descrição",
    forma_pagamento AS "Forma",
    CASE WHEN tipo = 'Entrada' THEN valor ELSE valor * -1 END AS "Valor Líquido"
FROM transacoes_financeiras
WHERE CAST(data_pagamento AS DATE) = CURRENT_DATE
ORDER BY data_pagamento DESC;

-- PROCEDURE AVANÇADA: Registrar Venda de Balcão com Múltiplos Itens (via JSON)
CREATE OR REPLACE PROCEDURE pr_registrar_venda_completa(
    p_id_cliente INT,
    p_valor_total DECIMAL(10,2),
    p_forma_pagamento VARCHAR(50),
    p_itens_json JSONB 
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_venda INT;
    v_item RECORD;
BEGIN
    -- 1. Cria o cabeçalho da venda
    INSERT INTO vendas (id_cliente, valor_total, forma_pagamento, status)
    VALUES (p_id_cliente, p_valor_total, p_forma_pagamento, 'Concluída')
    RETURNING id_venda INTO v_id_venda;

    -- 2. Processa os itens do JSON
    FOR v_item IN SELECT * FROM jsonb_to_recordset(p_itens_json) 
        AS x(id_produto INT, qtd INT, preco DECIMAL(10,2))
    LOOP
        -- Insere o item da venda
        INSERT INTO vendas_itens (id_venda, id_produto, quantidade, valor_unitario, subtotal)
        VALUES (v_id_venda, v_item.id_produto, v_item.qtd, v_item.preco, (v_item.qtd * v_item.preco));

        -- Gera a movimentação de saída do estoque
        INSERT INTO movimentacoes_estoque (id_produto, tipo_movimentacao, quantidade, motivo, id_usuario)
        VALUES (v_item.id_produto, 'Saída', v_item.qtd, 'Venda Balcão #' || v_id_venda, 1);
    END LOOP;

    -- 3. Registra no financeiro
    INSERT INTO transacoes_financeiras (tipo, origem, valor, forma_pagamento, id_venda)
    VALUES ('Entrada', 'Venda Balcão #' || v_id_venda, p_valor_total, p_forma_pagamento, v_id_venda);

    COMMIT;
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE;
END;
$$;