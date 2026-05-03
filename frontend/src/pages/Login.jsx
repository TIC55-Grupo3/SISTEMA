<<<<<<< HEAD
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../services/api'
import Spinner from '../components/Spinner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleLogin() {
    setCarregando(true)
    setErro('')
    try {
      const response = await api.post('/auth/login', { email, senha })
      login(response.data.usuario, response.data.token)
      navigate('/painel')
    } catch {
      setErro('E-mail ou senha incorretos. Tente novamente.')
    } finally {
      setCarregando(false)
=======
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
>>>>>>> 666d990710bb09a48c9ac94b87cd98416676db3a
    }
  }

  return (
<<<<<<< HEAD
    <div style={s.fundo}>
      <div style={s.card}>
        <h1 style={s.logo}>Sistema</h1>
        <h2 style={s.titulo}>Entrar na conta</h2>

        <label style={s.label}>E-mail</label>
        <input
          style={s.input}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={s.label}>Senha</label>
        <div style={s.senhaWrapper}>
          <input
            style={{ ...s.input, paddingRight: '48px' }}
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button style={s.olhinho} onClick={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        </div>

        {erro && <p style={s.erro}>{erro}</p>}

        <div style={s.botoesWrapper}>
          <button
            style={{ ...s.botaoPrimario, opacity: carregando ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={carregando}
          >
            {carregando ? <Spinner /> : 'Entrar'}
          </button>
          <button style={s.botaoSecundario} onClick={() => navigate('/recuperar-senha')}>
            Recuperar senha
          </button>
        </div>
=======
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
>>>>>>> 666d990710bb09a48c9ac94b87cd98416676db3a
      </div>
    </div>
  )
}

<<<<<<< HEAD
const s = {
  fundo: { minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '20px', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '8px' },
  titulo: { fontSize: '24px', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '28px' },
  label: { fontSize: '14px', fontWeight: 500, color: '#1e293b', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b', marginBottom: '16px', outline: 'none' },
  senhaWrapper: { position: 'relative', width: '100%' },
  olhinho: { position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  erro: { color: '#dc2626', fontSize: '14px', marginBottom: '12px', backgroundColor: '#fee2e2', padding: '8px 12px', borderRadius: '8px' },
  botoesWrapper: { display: 'flex', gap: '12px', marginTop: '8px' },
  botaoPrimario: { flex: 1, padding: '12px', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  botaoSecundario: { flex: 1, padding: '12px', backgroundColor: 'transparent', color: '#1e293b', fontWeight: 500, fontSize: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer' },
}
=======
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
>>>>>>> 666d990710bb09a48c9ac94b87cd98416676db3a
