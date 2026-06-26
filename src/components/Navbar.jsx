import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      style={{
        ...styles.nav,
        backgroundColor: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={styles.inner}>
        {/* Logo */}
        <span style={styles.logo}>ENCCO</span>

        {/* Links desktop */}
        <div style={styles.links}>
          {['Catálogo', 'Categorías', 'Ofertas', 'Nosotros'].map(link => (
            <motion.a
              key={link}
              href="#"
              style={styles.link}
              whileHover={{ color: '#ff8000' }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Right actions */}
        <div style={styles.actions}>
          <motion.button
            style={styles.cartBtn}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} color="#fff" />
            <span style={styles.cartBadge}>0</span>
          </motion.button>

          <motion.button
            style={styles.orderBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(255,128,0,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Pedir ahora
          </motion.button>

          {/* Burger mobile */}
          <button
            style={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          style={styles.mobileMenu}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {['Catálogo', 'Categorías', 'Ofertas', 'Nosotros'].map(link => (
            <a key={link} href="#" style={styles.mobileLink}>{link}</a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '22px',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
    gap: '32px',
    '@media (max-width: 768px)': { display: 'none' },
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cartBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
  },
  cartBadge: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ff8000',
    color: '#000',
    fontSize: '9px',
    fontWeight: 700,
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  orderBtn: {
    padding: '9px 20px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '7px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    letterSpacing: '0.3px',
  },
  burger: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    '@media (max-width: 768px)': { display: 'flex' },
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px 20px',
    borderTop: '1px solid #1a1a1a',
    backgroundColor: 'rgba(0,0,0,0.97)',
    gap: '16px',
  },
  mobileLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
  },
}
