import Sidebar from '../components/Sidebar'

function Relatorios() {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '2rem', flex: 1, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <h1 style={{ color: '#1a1a2e' }}>Relatórios</h1>
        <p style={{ color: '#666' }}>Relatórios do sistema.</p>
      </main>
    </div>
  )
}

export default Relatorios
