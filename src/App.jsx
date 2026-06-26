import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import CartDrawer from './components/CartDrawer'
import BottomNav from './components/BottomNav'
import WhatsAppFloat from './components/WhatsAppFloat'
import { CartProvider } from './context/CartContext'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <BrowserRouter>
        {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
        {splashDone && (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo onCartOpen={() => setCartOpen(true)} />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <BottomNav onCartOpen={() => setCartOpen(true)} />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WhatsAppFloat />
          </>
        )}
      </BrowserRouter>
    </CartProvider>
  )
}
