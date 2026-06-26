import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <BrowserRouter>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      {splashDone && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
