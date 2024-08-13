import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Navbar from './components/navbars/Navbar'

import { AuthProvider } from './context/AuthContext'
import { DbProvider } from './context/DbContext'

function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <BrowserRouter>
          <main className='container mx-auto px-5'>
            <Navbar />
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/home' element={<HomePage />}></Route>
              </Route>
              <Route path='/login' element={<LoginPage />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </DbProvider>
    </AuthProvider >
  )
}

export default App
