import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Spinner from '../components/Spinner'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleEnviar() {
    if (!email) return
    setCarregando(true)
    try {
      await api.post('/auth/recuperar-senha', { email })
    } catch {
      // mesmo com erro, redirecionamos (segurança: não revelar se e-mail existe)
    } finally {
      setCarregando(false)
      navigate('/recuperar-senha/sucesso', { state: { email } })
    }
  }

  return (
    <div style={s.fundo}>
      <div style={s.card}>
        <h1 style={s.logo}>Sistema</h1>
        <h2 style={s.titulo}>Recuperar senha</h2>
        <p style={s.subtitulo}>
          Digite o e-mail cadastrado na sua conta. Enviaremos um link seguro para você criar uma nova senha.
        </p>

        <label style={s.label}>E-mail</label>
        <input
          style={s.input}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
        />

        <div style={s.botoesWrapper}>
          <button
            style={{ ...s.botaoPrimario, opacity: carregando ? 0.7 : 1 }}
            onClick={handleEnviar}
            disabled={carregando}
          >
            {carregando ? <Spinner /> : 'Enviar link de recuperação'}
          </button>
          <button style={s.botaoSecundario} onClick={() => navigate('/')}>
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  fundo: { minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '20px', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '8px' },
  titulo: { fontSize: '24px', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '12px' },
  subtitulo: { fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '28px', lineHeight: '1.6' },
  label: { fontSize: '14px', fontWeight: 500, color: '#1e293b', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b', marginBottom: '16px', outline: 'none' },
  botoesWrapper: { display: 'flex', gap: '12px', marginTop: '8px' },
  botaoPrimario: { flex: 1, padding: '12px', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '15px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  botaoSecundario: { flex: 1, padding: '12px', backgroundColor: 'transparent', color: '#1e293b', fontWeight: 500, fontSize: '15px', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer' },
}