-- ==========================================================
-- Functions e Triggers
-- ==========================================================
------------------------------------------------------------
-- MÓDULO 1: GOVERNANÇA E ADMINISTRAÇÃO
------------------------------------------------------------

-- Função genérica de Auditoria para registrar Criação, Atualização e Exclusão em texto
CREATE OR REPLACE FUNCTION fn_registrar_auditoria()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data TEXT := NULL;
    v_new_data TEXT := NULL;
    v_id_usuario INT := NULL;
BEGIN
    -- Captura o usuário atual se a aplicação estiver setando a variável de sessão
    BEGIN
        v_id_usuario := current_setting('app.current_user_id', true)::INT;
    EXCEPTION WHEN OTHERS THEN
        v_id_usuario := NULL;
    END;

    -- O PostgreSQL sempre lê a operação em inglês no TG_OP, mas salvamos em português
    IF (TG_OP = 'DELETE') THEN
        v_old_data := OLD::TEXT;
        INSERT INTO log_auditoria (nome_tabela, acao, dados_antigos, id_usuario)
        VALUES (TG_TABLE_NAME, 'Exclusão', v_old_data, v_id_usuario);
        RETURN OLD;
        
    ELSIF (TG_OP = 'UPDATE') THEN
        v_old_data := OLD::TEXT;
        v_new_data := NEW::TEXT;
        INSERT INTO log_auditoria (nome_tabela, acao, dados_antigos, dados_novos, id_usuario)
        VALUES (TG_TABLE_NAME, 'Atualização', v_old_data, v_new_data, v_id_usuario);
        RETURN NEW;
        
    ELSIF (TG_OP = 'INSERT') THEN
        v_new_data := NEW::TEXT;
        INSERT INTO log_auditoria (nome_tabela, acao, dados_novos, id_usuario)
        VALUES (TG_TABLE_NAME, 'Criação', v_new_data, v_id_usuario);
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers de Auditoria
CREATE TRIGGER trg_auditar_ordens_servico
AFTER INSERT OR UPDATE OR DELETE ON ordens_servico
FOR EACH ROW EXECUTE FUNCTION fn_registrar_auditoria();

CREATE TRIGGER trg_auditar_produtos
AFTER INSERT OR UPDATE OR DELETE ON produtos_pecas
FOR EACH ROW EXECUTE FUNCTION fn_registrar_auditoria();

CREATE TRIGGER trg_auditar_transacoes
AFTER INSERT OR UPDATE OR DELETE ON transacoes_financeiras
FOR EACH ROW EXECUTE FUNCTION fn_registrar_auditoria();

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