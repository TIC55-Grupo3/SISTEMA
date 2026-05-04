import bcrypt

hash_armazenado = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYrTe3rt/R.2"
senha_teste = "admin123"

print(f"Hash: {hash_armazenado}")
print(f"Senha: {senha_teste}")

# Teste direto com bcrypt
resultado = bcrypt.checkpw(senha_teste.encode('utf-8'), hash_armazenado.encode('utf-8'))
print(f"Resultado bcrypt direto: {resultado}")

# Gerar novo hash para comparação
novo_hash = bcrypt.hashpw(senha_teste.encode('utf-8'), bcrypt.gensalt())
print(f"Novo hash para '{senha_teste}': {novo_hash.decode('utf-8')}")