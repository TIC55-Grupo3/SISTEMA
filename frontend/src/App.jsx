<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import RecuperarSenha from './pages/RecuperarSenha'
import RecuperarSenhaSucesso from './pages/RecuperarSenhaSucesso'
import RedefinirSenha from './pages/RedefinirSenha'
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RotaPrivada from './components/RotaPrivada'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Relatorios from './pages/Relatorios'
>>>>>>> 666d990710bb09a48c9ac94b87cd98416676db3a

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha/sucesso" element={<RecuperarSenhaSucesso />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/painel" element={<div>Painel (em breve)</div>} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
          <Route path="/usuarios" element={<RotaPrivada><Usuarios /></RotaPrivada>} />
          <Route path="/relatorios" element={<RotaPrivada><Relatorios /></RotaPrivada>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
>>>>>>> 666d990710bb09a48c9ac94b87cd98416676db3a
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App