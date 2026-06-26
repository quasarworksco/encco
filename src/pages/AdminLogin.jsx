import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { adminLogin } from '../lib/adminAuth'

export default function AdminLogin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setTimeout(() => {
      if (adminLogin(user, pass)) {
        navigate('/admin')
      } else {
        setError(true)
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div style={styles.page}>
      <div style={styles.grid} />

      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/encco-logo.png" alt="ENCCO" style={styles.logo} />

        <div style={styles.titleGroup}>
          <h1 style={styles.title}>Panel Admin</h1>
          <p style={styles.sub}>Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Usuario</label>
            <input
              style={styles.input}
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <motion.p
              style={styles.error}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Credenciales incorrectas
            </motion.p>
          )}

          <motion.button
            type="submit"
            style={styles.btn}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,128,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,128,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,128,0,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#0f0f0f',
    border: '1px solid #1f1f1f',
    borderRadius: '16px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
  },
  logo: {
    height: '40px',
    width: 'auto',
    filter: 'drop-shadow(0 0 8px rgba(255,128,0,0.25))',
  },
  titleGroup: {
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '22px',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '4px',
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: '#ff4444',
    textAlign: 'center',
  },
  btn: {
    padding: '13px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
    letterSpacing: '0.5px',
  },
}
