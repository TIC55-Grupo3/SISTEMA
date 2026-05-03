SELECT * FROM vw_historico_auditoria;
SELECT descricao, saldo_atual FROM produtos_pecas WHERE id_produto IN (1, 4);
SELECT id_os, problema_relatado, valor_total FROM ordens_servico WHERE id_os = 1;
SELECT * FROM vw_painel_ordens_servico;
SELECT 
    os.id_os AS "Nº OS",
    COALESCE(p.descricao, s.descricao) AS "Item / Serviço",
    i.quantidade AS "Qtd",
    i.valor_unitario AS "Valor Unitário",
    i.subtotal AS "Subtotal"
FROM os_itens i
JOIN ordens_servico os ON i.id_os = os.id_os
LEFT JOIN produtos_pecas p ON i.id_produto = p.id_produto
LEFT JOIN servicos s ON i.id_servico = s.id_servico
WHERE os.id_os = 1;
SELECT * FROM vw_fluxo_caixa_diario;
SELECT 
    TO_CHAR(m.data, 'DD/MM/YYYY HH24:MI') AS "Data/Hora",
    p.descricao AS "Produto",
    m.tipo_movimentacao AS "Tipo",
    m.quantidade AS "Qtd",
    m.motivo AS "Motivo",
    u.nome AS "Técnico Responsável"
FROM movimentacoes_estoque m
JOIN produtos_pecas p ON m.id_produto = p.id_produto
JOIN usuarios u ON m.id_usuario = u.id_usuario
ORDER BY m.data DESC;
SELECT 
    c.nome AS "Cliente",
    c.telefone_whatsapp AS "WhatsApp",
    e.tipo_aparelho AS "Aparelho",
    e.marca AS "Marca",
    e.modelo AS "Modelo"
FROM clientes c
JOIN equipamentos e ON c.id_cliente = e.id_cliente
ORDER BY c.nome;
SELECT * FROM vw_estoque_critico;
