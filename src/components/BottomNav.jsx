import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Grid, ShoppingCart, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CONTACTO } from '../lib/contacto'

const TABS = [
  { id: 'home', label: 'Inicio', icon: Home, path: '/' },
  { id: 'catalogo', label: 'Catálogo', icon: Grid, path: '/catalogo' },
  { id: 'cart', label: 'Carrito', icon: ShoppingCart, path: null },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle, path: null, external: CONTACTO.whatsappUrl },
]

export default function BottomNav({ onCartOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useCart()

  // Ocultar en admin
  if (location.pathname.startsWith('/admin')) return null

  return (
    <nav style={styles.nav}>
      {TABS.map(tab => {
        const active = tab.path && location.pathname === tab.path
        const Icon = tab.icon

        const handlePress = () => {
          if (tab.id === 'cart') { onCartOpen(); return }
          if (tab.external) { window.open(tab.external, '_blank'); return }
          navigate(tab.path)
        }

        return (
          <motion.button
            key={tab.id}
            style={styles.tab}
            onClick={handlePress}
            whileTap={{ scale: 0.88 }}
          >
            <div style={{ position: 'relative' }}>
              <Icon
                size={24}
                color={active ? '#ff8000' : 'rgba(255,255,255,0.4)'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              {tab.id === 'cart' && count > 0 && (
                <motion.span
                  style={styles.badge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={count}
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </div>
            <span style={{
              ...styles.label,
              color: active ? '#ff8000' : 'rgba(255,255,255,0.35)',
              fontWeight: active ? 600 : 400,
            }}>
              {tab.label}
            </span>
            {active && <motion.div style={styles.activeDot} layoutId="activeDot" />}
          </motion.button>
        )
      })}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0, left: 0, right: 0,
    height: '72px',
    backgroundColor: 'rgba(8,8,8,0.97)',
    borderTop: '1px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100,
    backdropFilter: 'blur(16px)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  tab: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '3px', flex: 1, height: '100%',
    background: 'none', border: 'none', cursor: 'pointer',
    position: 'relative',
    padding: '8px 0 4px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.3px',
  },
  badge: {
    position: 'absolute',
    top: '-6px', right: '-8px',
    backgroundColor: '#ff8000',
    color: '#000',
    fontSize: '9px', fontWeight: 800,
    minWidth: '17px', height: '17px',
    borderRadius: '999px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    border: '2px solid #080808',
  },
  activeDot: {
    position: 'absolute',
    top: 0, left: '50%',
    transform: 'translateX(-50%)',
    width: '24px', height: '2px',
    backgroundColor: '#ff8000',
    borderRadius: '0 0 2px 2px',
  },
}
