import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RecuperarSenhaSucesso() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const email = state?.email || 'seu e-mail'

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') navigate('/')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <div style={s.fundo}>
      <div style={s.card}>
        <div style={s.iconeWrapper}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h2 style={s.titulo}>E-mail enviado!</h2>
        <p style={s.texto}>
          Se o e-mail <strong>{email}</strong> estiver cadastrado em nosso sistema, você receberá um link de recuperação em instantes. Lembre-se de checar a caixa de spam.
        </p>

        <button style={s.botao} onClick={() => navigate('/')}>
          Voltar para o login
        </button>
      </div>
    </div>
  )
}

const s = {
  fundo: { minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  iconeWrapper: { marginBottom: '20px' },
  titulo: { fontSize: '22px', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '16px' },
  texto: { fontSize: '14px', color: '#64748b', textAlign: 'center', lineHeight: '1.7', marginBottom: '28px' },
  botao: { width: '100%', padding: '14px', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
}