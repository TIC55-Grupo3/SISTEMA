import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    // Simulação de login (sem banco de dados)
    if (email === 'admin@sistema.com' && senha === '123456') {
      login({ nome: 'Administrador', email }, 'token-fake-jwt-123')
      navigate('/dashboard')
    } else {
      setErro('Email ou senha incorretos')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>SISTEMA</h1>
        <p style={styles.subtitulo}>Faça login para continuar</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.campo}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@sistema.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="123456"
              style={styles.input}
              required
            />
          </div>

          {erro && <p style={styles.erro}>{erro}</p>}

          <button type="submit" style={styles.botao}>
            Entrar
          </button>
        </form>

        <p style={styles.dica}>
          Use: <strong>admin@sistema.com</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '380px',
  },
  titulo: {
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: '0.25rem',
  },
  subtitulo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  campo: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.6rem 0.8rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  },
  botao: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  erro: {
    color: 'red',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  dica: {
    marginTop: '1.5rem',
    fontSize: '0.8rem',
    color: '#888',
    textAlign: 'center',
  },
}

export default Login
