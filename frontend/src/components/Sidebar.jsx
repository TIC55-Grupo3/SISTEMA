import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Usuários', path: '/usuarios', icon: '👥' },
  { label: 'Relatórios', path: '/relatorios', icon: '📄' },
]

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>SISTEMA</div>

      <div style={styles.usuario}>
        <div style={styles.avatar}>
          {user?.nome?.charAt(0) ?? 'U'}
        </div>
        <div>
          <p style={styles.nomeUsuario}>{user?.nome ?? 'Usuário'}</p>
          <p style={styles.emailUsuario}>{user?.email ?? ''}</p>
        </div>
      </div>

      <nav style={styles.nav}>
        {menuItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.menuItem,
              ...(location.pathname === item.path ? styles.menuItemAtivo : {}),
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} style={styles.botaoSair}>
        🚪 Sair
      </button>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '240px',
    height: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 1rem',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    fontFamily: 'sans-serif',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    letterSpacing: '2px',
    color: '#a78bfa',
  },
  usuario: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '1.5rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
    flexShrink: 0,
  },
  nomeUsuario: {
    margin: 0,
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  emailUsuario: {
    margin: 0,
    fontSize: '0.7rem',
    color: '#aaa',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    flex: 1,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textAlign: 'left',
    width: '100%',
  },
  menuItemAtivo: {
    backgroundColor: '#4f46e5',
    color: '#fff',
  },
  botaoSair: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    border: '1px solid #333',
    background: 'transparent',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
    marginTop: '1rem',
  },
}

export default Sidebar
