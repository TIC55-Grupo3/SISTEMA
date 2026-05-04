from app.core.hash import verificar_senha

hash_armazenado = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYrTe3rt/R.2"
senha_teste = "admin123"

print(f"Hash: {hash_armazenado}")
print(f"Senha: {senha_teste}")
print(f"Resultado: {verificar_senha(senha_teste, hash_armazenado)}")