-- ==========================================================
-- SCRIPT DE POPULAÇÃO DE DADOS PARA TESTES
-- ==========================================================

-- 1. CONFIGURAÇÕES DA EMPRESA (Tabela de linha única)
INSERT INTO configuracoes_empresa (nome_fantasia, cnpj, endereco_completo, telefone, termos_garantia_padrao, dicas_uso_padrao) 
VALUES (
    'Five Assistência Técnica', 
    '12.345.678/0001-90', 
    'Avenida Victor Barreto, 1020, Centro, Canoas - RS', 
    '(51) 99999-9999', 
    'Garantia de 90 dias para peças e serviços, não cobrindo mau uso ou contato com líquidos.', 
    'Mantenha o equipamento em local ventilado e faça limpezas preventivas anualmente.'
);

-- 2. USUÁRIOS
INSERT INTO usuarios (nome, email, senha_hash, perfil, status) 
VALUES 
    ('Administrador Sistema', 'admin@fiveassistencia.com', 'hash_fake_123', 'Admin', 'Ativo'),
    ('João Técnico', 'joao@fiveassistencia.com', 'hash_fake_456', 'Técnico', 'Ativo');

-- 3. FORNECEDORES
INSERT INTO fornecedores (razao_social, nome_fantasia, cnpj, telefone_contato, email) 
VALUES 
    ('Sul Peças e Componentes Ltda', 'Sul Peças', '98.765.432/0001-10', '(51) 3333-4444', 'vendas@sulpecas.com.br'),
    ('Distribuidora Tech RS', 'Tech RS', '11.222.333/0001-44', '(51) 3456-7890', 'contato@techrs.com.br');

-- 4. PRODUTOS E PEÇAS (Estoque)
INSERT INTO produtos_pecas (descricao, categoria, condicao, custo, preco_venda, saldo_atual, estoque_minimo) 
VALUES 
    ('SSD 512GB Kingston', 'Armazenamento', 'Nova', 150.00, 280.00, 10, 3),
    ('Memória RAM 8GB DDR4', 'Memória', 'Nova', 90.00, 180.00, 5, 2),
    ('Tela Notebook 15.6 LED', 'Telas', 'Reuso', 200.00, 450.00, 2, 1),
    ('Teclado USB Padrão', 'Acessórios', 'Nova', 25.00, 55.00, 15, 5);

-- 5. SERVIÇOS TÉCNICOS
INSERT INTO servicos (descricao, valor_padrao, tempo_estimado) 
VALUES 
    ('Formatação com Backup', 150.00, '2 horas'),
    ('Limpeza Interna e Troca de Pasta Térmica', 120.00, '1.5 horas'),
    ('Instalação de Peça', 50.00, '30 minutos');

-- 6. CLIENTES
INSERT INTO clientes (nome, telefone_whatsapp, cpf_cnpj, endereco) 
VALUES 
    ('Carlos Almeida', '(51) 98888-7777', '111.222.333-44', 'Rua Mathias Velho, 89, Canoas - RS'),
    ('Ana Souza', '(51) 97777-6666', '555.666.777-88', 'Av. Inconfidência, 450, Canoas - RS');

-- 7. EQUIPAMENTOS DOS CLIENTES
INSERT INTO equipamentos (id_cliente, tipo_aparelho, marca, modelo, numero_serie, observacoes) 
VALUES 
    (1, 'Notebook', 'Dell', 'Inspiron 15', 'BR-DELL-1234', 'Adesivo na tampa, falta borracha do pé'),
    (2, 'PC Desktop', 'Customizado', 'Gamer', 'N/A', 'Gabinete com vidro lateral trincado'),
    (2, 'Impressora', 'Epson', 'L3150', 'EPS-9988', 'Sem cabo de energia');

-- 8. ORDENS DE SERVIÇO (Cabeçalho)
-- Inserindo uma OS para o notebook do Carlos
INSERT INTO ordens_servico (id_equipamento, problema_relatado, estado_carcaca, laudo_tecnico, status, data_validade_orcamento) 
VALUES 
    (1, 'Computador muito lento para iniciar e travando.', 'Arranhões leves na base', 'Foi identificado lentidão devido a HD mecânico antigo. Recomendada troca por SSD e formatação.', 'Em Andamento', CURRENT_DATE + INTERVAL '5 days');

-- 9. ITENS DA ORDEM DE SERVIÇO (Dispara a Trigger que atualiza o total da OS e valida estoque)
-- Incluindo 1 SSD (R$ 280,00) e 1 Formatação (R$ 150,00) na OS 1
INSERT INTO os_itens (id_os, id_produto, id_servico, quantidade, valor_unitario, subtotal) 
VALUES 
    (1, 1, NULL, 1, 280.00, 280.00), -- Venda do Produto ID 1 (SSD)
    (1, NULL, 1, 1, 150.00, 150.00); -- Execução do Serviço ID 1 (Formatação)

-- 10. MOVIMENTAÇÕES DE ESTOQUE (Baixa da Peça usada na OS acima)
INSERT INTO movimentacoes_estoque (id_produto, tipo_movimentacao, quantidade, motivo, id_usuario) 
VALUES 
    (1, 'Saída', 1, 'Uso na OS #1', 2);

-- 11. TRANSAÇÕES FINANCEIRAS (Entrada de Adiantamento/Sinal da OS)
-- Registrando um PIX de R$ 100,00 como sinal do cliente Carlos para aprovar o serviço
INSERT INTO transacoes_financeiras (tipo, origem, valor, forma_pagamento, id_os) 
VALUES 
    ('Entrada', 'Sinal/Adiantamento OS #1', 100.00, 'PIX', 1);

-- 12. VENDAS RÁPIDAS (Balcão)
-- Venda de 1 Teclado USB para a Ana Souza
INSERT INTO vendas (id_cliente, valor_total, forma_pagamento, status) 
VALUES 
    (2, 55.00, 'Cartão de Débito', 'Concluída');

INSERT INTO vendas_itens (id_venda, id_produto, id_servico, quantidade, valor_unitario, subtotal) 
VALUES 
    (1, 4, NULL, 1, 55.00, 55.00);

-- Baixa de estoque da venda de balcão
INSERT INTO movimentacoes_estoque (id_produto, tipo_movimentacao, quantidade, motivo, id_usuario) 
VALUES 
    (4, 'Saída', 1, 'Venda Balcão #1', 1);

-- Pagamento da venda de balcão
INSERT INTO transacoes_financeiras (tipo, origem, valor, forma_pagamento, id_venda) 
VALUES 
    ('Entrada', 'Venda Balcão #1', 55.00, 'Cartão de Débito', 1);