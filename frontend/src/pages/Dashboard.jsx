import Sidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>
        <h1 style={styles.titulo}>Dashboard</h1>
        <p style={styles.subtitulo}>Bem-vindo ao sistema!</p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <p style={styles.cardNumero}>128</p>
            <p style={styles.cardLabel}>Usuários</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardNumero}>34</p>
            <p style={styles.cardLabel}>Relatórios</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardNumero}>99%</p>
            <p style={styles.cardLabel}>Disponibilidade</p>
          </div>
        </div>
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'sans-serif',
  },
  main: {
    marginLeft: '240px',
    padding: '2rem',
    flex: 1,
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  titulo: {
    color: '#1a1a2e',
    marginBottom: '0.25rem',
  },
  subtitulo: {
    color: '#666',
    marginBottom: '2rem',
  },
  cards: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    minWidth: '140px',
    textAlign: 'center',
  },
  cardNumero: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4f46e5',
    margin: 0,
  },
  cardLabel: {
    color: '#888',
    margin: '0.25rem 0 0',
    fontSize: '0.9rem',
  },
}

export default Dashboard
