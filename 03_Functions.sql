-- ==========================================================
-- Functions e Triggers
-- ==========================================================

------------------------------------------------------------
-- MÓDULO 3: OPERACIONAL
------------------------------------------------------------

-- Função para atualizar o valor_total da Ordem de Serviço
CREATE OR REPLACE FUNCTION fn_atualizar_total_os()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ordens_servico
    SET valor_total = (
        SELECT COALESCE(SUM(subtotal), 0)
        FROM os_itens
        WHERE id_os = COALESCE(NEW.id_os, OLD.id_os)
    )
    WHERE id_os = COALESCE(NEW.id_os, OLD.id_os);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para recálculo automático de OS
DROP TRIGGER IF EXISTS trg_atualiza_total_os ON os_itens;
CREATE TRIGGER trg_atualiza_total_os
AFTER INSERT OR UPDATE OR DELETE ON os_itens
FOR EACH ROW EXECUTE FUNCTION fn_atualizar_total_os();

------------------------------------------------------------
-- MÓDULO 4: ESTOQUE (SUPRIMENTOS)
------------------------------------------------------------

-- Função para validar se há estoque disponível
CREATE OR REPLACE FUNCTION fn_item_tem_estoque()
RETURNS TRIGGER AS $$
DECLARE
    v_saldo_atual INT;
BEGIN
    -- Só valida se for um produto (id_produto não nulo)
    IF NEW.id_produto IS NOT NULL THEN
        SELECT saldo_atual INTO v_saldo_atual 
        FROM produtos_pecas 
        WHERE id_produto = NEW.id_produto;

        IF v_saldo_atual < NEW.quantidade THEN
            RAISE EXCEPTION 'Saldo insuficiente em estoque para o produto ID % (Disponível: %, Solicitado: %)', 
                NEW.id_produto, v_saldo_atual, NEW.quantidade;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de barreira de segurança para estoque (OS)
DROP TRIGGER IF EXISTS trg_valida_estoque_os ON os_itens;
CREATE TRIGGER trg_valida_estoque_os
BEFORE INSERT OR UPDATE ON os_itens
FOR EACH ROW EXECUTE FUNCTION fn_item_tem_estoque();

-- Trigger de barreira de segurança para estoque (Vendas)
DROP TRIGGER IF EXISTS trg_valida_estoque_vendas ON vendas_itens;
CREATE TRIGGER trg_valida_estoque_vendas
BEFORE INSERT OR UPDATE ON vendas_itens
FOR EACH ROW EXECUTE FUNCTION fn_item_tem_estoque();


-- Função para atualizar saldo_atual na tabela produtos_pecas
CREATE OR REPLACE FUNCTION fn_atualizar_saldo_estoque()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.tipo_movimentacao = 'Entrada') THEN
        UPDATE produtos_pecas 
        SET saldo_atual = saldo_atual + NEW.quantidade
        WHERE id_produto = NEW.id_produto;
    ELSIF (NEW.tipo_movimentacao = 'Saída' OR NEW.tipo_movimentacao = 'Ajuste') THEN
        UPDATE produtos_pecas 
        SET saldo_atual = saldo_atual - NEW.quantidade
        WHERE id_produto = NEW.id_produto;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar saldo físico
DROP TRIGGER IF EXISTS trg_atualiza_estoque ON movimentacoes_estoque;
CREATE TRIGGER trg_atualiza_estoque
AFTER INSERT ON movimentacoes_estoque
FOR EACH ROW EXECUTE FUNCTION fn_atualizar_saldo_estoque();

------------------------------------------------------------
-- MÓDULO 5: COMERCIAL E FINANCEIRO
------------------------------------------------------------

-- Função matemática para cálculo de saldo devedor
CREATE OR REPLACE FUNCTION fn_saldo_devedor_os(p_id_os INT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_total DECIMAL(10,2);
    v_pago DECIMAL(10,2);
BEGIN
    SELECT valor_total, valor_pago INTO v_total, v_pago
    FROM ordens_servico
    WHERE id_os = p_id_os;
    
    RETURN COALESCE(v_total, 0) - COALESCE(v_pago, 0);
END;
$$ LANGUAGE plpgsql;