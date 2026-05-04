import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../services/api'
import Spinner from '../components/Spinner'

function Olhinho({ visivel, onClick }) {
  return (
    <button style={s.olhinho} onClick={onClick}>
      {visivel ? (
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
  )
}

function Check({ ok }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={ok ? '#059669' : '#94a3b8'} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function RedefinirSenha() {
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirma, setMostrarConfirma] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erroToken, setErroToken] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const regras = {
    tamanho: senha.length >= 10 && senha.length <= 20,
    maiuscula: /[A-Z]/.test(senha),
    numero: /[0-9]/.test(senha),
    especial: /[^a-zA-Z0-9]/.test(senha),
    iguais: senha === confirma && confirma.length > 0,
  }

  const tudo = Object.values(regras).every(Boolean)

  async function handleSalvar() {
    if (!tudo) return
    setCarregando(true)
    setErroToken('')
    try {
      await api.post('/auth/redefinir-senha', { token, senha })
      navigate('/', { state: { sucesso: 'Senha alterada com sucesso!' } })
    } catch {
      setErroToken('Link inválido ou expirado. Solicite um novo link.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={s.fundo}>
      <div style={s.card}>
        <h1 style={s.logo}>Sistema</h1>
        <h2 style={s.titulo}>Criar nova senha</h2>

        <label style={s.label}>Senha</label>
        <div style={s.senhaWrapper}>
          <input
            style={{ ...s.input, paddingRight: '48px' }}
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSalvar()}
          />
          <Olhinho visivel={mostrarSenha} onClick={() => setMostrarSenha(!mostrarSenha)} />
        </div>

        <label style={s.label}>Confirme sua senha</label>
        <div style={s.senhaWrapper}>
          <input
            style={{ ...s.input, paddingRight: '48px' }}
            type={mostrarConfirma ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSalvar()}
          />
          <Olhinho visivel={mostrarConfirma} onClick={() => setMostrarConfirma(!mostrarConfirma)} />
        </div>

        {confirma.length > 0 && !regras.iguais && (
          <p style={s.erroSenha}>As senhas não conferem</p>
        )}

        <div style={s.regrasBox}>
          <p style={s.regrasTitle}>Sua senha deve conter:</p>
          <div style={s.regraItem}><Check ok={regras.tamanho} /> 10 a 20 caracteres</div>
          <div style={s.regraItem}><Check ok={regras.maiuscula} /> 1 letra maiúscula</div>
          <div style={s.regraItem}><Check ok={regras.numero} /> 1 número</div>
          <div style={s.regraItem}><Check ok={regras.especial} /> 1 caractere especial</div>
          <div style={s.regraItem}><Check ok={regras.iguais} /> Senhas iguais</div>
        </div>

        {erroToken && <p style={s.erro}>{erroToken}</p>}

        <button
          style={{ ...s.botao, opacity: tudo ? 1 : 0.4, cursor: tudo ? 'pointer' : 'not-allowed' }}
          onClick={handleSalvar}
          disabled={!tudo || carregando}
        >
          {carregando ? <Spinner /> : 'Salvar nova senha'}
        </button>

        <button style={s.link} onClick={() => navigate('/')}>
          ← Voltar para o login
        </button>
      </div>
    </div>
  )
}

const s = {
  fundo: { minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '20px', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '8px' },
  titulo: { fontSize: '24px', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '28px' },
  label: { fontSize: '14px', fontWeight: 500, color: '#1e293b', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b', marginBottom: '16px', outline: 'none' },
  senhaWrapper: { position: 'relative', width: '100%' },
  olhinho: { position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  erroSenha: { color: '#dc2626', fontSize: '13px', marginBottom: '12px', marginTop: '-8px' },
  erro: { color: '#dc2626', fontSize: '14px', marginBottom: '12px', backgroundColor: '#fee2e2', padding: '8px 12px', borderRadius: '8px' },
  regrasBox: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px' },
  regrasTitle: { fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '10px' },
  regraItem: { display: 'flex', alignItems: 'center', fontSize: '13px', color: '#64748b', marginBottom: '6px' },
  botao: { width: '100%', padding: '14px', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '16px', border: 'none', borderRadius: '10px', marginBottom: '16px', transition: 'opacity 0.2s' },
  link: { background: 'none', border: 'none', color: '#64748b', fontSize: '13px', cursor: 'pointer', textAlign: 'center' },
}