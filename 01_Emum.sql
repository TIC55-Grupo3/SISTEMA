-- ==========================================================
-- 01_enums_e_tipos.sql
-- ==========================================================

-- 1. Governança e Administração
DROP TYPE IF EXISTS enum_perfil_usuario CASCADE;
CREATE TYPE enum_perfil_usuario AS ENUM ('Admin', 'Técnico');

DROP TYPE IF EXISTS enum_status_usuario CASCADE;
CREATE TYPE enum_status_usuario AS ENUM ('Ativo', 'Inativo', 'Bloqueado');

DROP TYPE IF EXISTS enum_prioridade_lembrete CASCADE;
CREATE TYPE enum_prioridade_lembrete AS ENUM ('Alta', 'Média', 'Baixa');

DROP TYPE IF EXISTS enum_status_lembrete CASCADE;
CREATE TYPE enum_status_lembrete AS ENUM ('Pendente', 'Concluído', 'Cancelado');

-- 2. Estoque e Suprimentos
DROP TYPE IF EXISTS enum_condicao_produto CASCADE;
CREATE TYPE enum_condicao_produto AS ENUM ('Nova', 'Reuso');

DROP TYPE IF EXISTS enum_tipo_movimentacao CASCADE;
CREATE TYPE enum_tipo_movimentacao AS ENUM ('Entrada', 'Saída', 'Ajuste');

-- 3. Operacional
DROP TYPE IF EXISTS enum_status_os CASCADE;
CREATE TYPE enum_status_os AS ENUM (
    'Orçamento Pendente', 
    'Orçamento Aprovado', 
    'Em Andamento', 
    'Aguardando Peça', 
    'Concluído', 
    'Entregue', 
    'Cancelado'
);

DROP TYPE IF EXISTS enum_tipo_foto CASCADE;
CREATE TYPE enum_tipo_foto AS ENUM ('Visão Geral', 'Dano', 'Interno', 'Finalizado');

-- 4. Comercial e Financeiro
DROP TYPE IF EXISTS enum_status_venda CASCADE;
CREATE TYPE enum_status_venda AS ENUM ('Pendente', 'Concluída', 'Cancelada');

DROP TYPE IF EXISTS enum_tipo_transacao CASCADE;
CREATE TYPE enum_tipo_transacao AS ENUM ('Entrada', 'Saída');