import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import RecuperarSenha from './pages/RecuperarSenha'
import RecuperarSenhaSucesso from './pages/RecuperarSenhaSucesso'
import RedefinirSenha from './pages/RedefinirSenha'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha/sucesso" element={<RecuperarSenhaSucesso />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/painel" element={<div>Painel (em breve)</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App