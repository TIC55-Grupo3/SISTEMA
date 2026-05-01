import { useState, useEffect } from 'react'
import api from './services/api'

function App() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    api.get('/health')
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('offline'))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SISTEMA</h1>
      <p>
        Backend:{' '}
        <span style={{ color: status === 'ok' ? 'green' : 'red' }}>
          {status ?? 'verificando...'}
        </span>
      </p>
    </div>
  )
}

export default App
