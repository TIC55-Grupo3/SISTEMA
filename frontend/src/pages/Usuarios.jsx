import Sidebar from '../components/Sidebar'

function Usuarios() {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '2rem', flex: 1, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <h1 style={{ color: '#1a1a2e' }}>Usuários</h1>
        <p style={{ color: '#666' }}>Lista de usuários do sistema.</p>
      </main>
    </div>
  )
}

export default Usuarios
