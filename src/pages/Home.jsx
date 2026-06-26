import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div style={styles.page}>
      <Navbar />
      <HeroSection />
      <FeaturesRow />
    </div>
  )
}

function HeroSection() {
  return (
    <section style={styles.hero}>
      {/* Bg grid */}
      <div style={styles.grid} />

      {/* Orange glow bottom */}
      <div style={styles.heroGlow} />

      <motion.div
        style={styles.heroContent}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <motion.span
          style={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          ⚡ Delivery Express · Maracaibo
        </motion.span>

        <h1 style={styles.heroTitle}>
          El panita que
          <br />
          <span style={styles.heroOrange}>resuelve tu rumba</span>
        </h1>

        <p style={styles.heroSub}>
          Snacks, bebidas y todo lo que necesitas — directo a tu puerta.
          <br />
          Nos encargamos de todo, tú solo disfruta.
        </p>

        <div style={styles.heroCtas}>
          <motion.button
            style={styles.btnPrimary}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(255,128,0,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            Ver catálogo
          </motion.button>
          <motion.button
            style={styles.btnGhost}
            whileHover={{ borderColor: '#ff8000', color: '#ff8000' }}
            whileTap={{ scale: 0.97 }}
          >
            ¿Cómo funciona?
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

function FeaturesRow() {
  const features = [
    { icon: '⚡', title: 'Express', desc: 'Entrega rápida en todo Maracaibo' },
    { icon: '🛒', title: 'Variedad', desc: 'Snacks, bebidas y más' },
    { icon: '📦', title: 'Sin complicaciones', desc: 'Pedido en minutos' },
    { icon: '🤙', title: 'El panita', desc: 'Siempre disponible para ti' },
  ]

  return (
    <section style={styles.featuresSection}>
      <div style={styles.featuresGrid}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            style={styles.featureCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: 'rgba(255,128,0,0.4)', y: -4 }}
          >
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#000',
  },
  hero: {
    position: 'relative',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '100px 24px 60px',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,128,0,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,128,0,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  },
  heroGlow: {
    position: 'absolute',
    bottom: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '400px',
    background: 'radial-gradient(ellipse, rgba(255,128,0,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: '700px',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '999px',
    border: '1px solid rgba(255,128,0,0.3)',
    backgroundColor: 'rgba(255,128,0,0.08)',
    color: '#ff8000',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    marginBottom: '28px',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(40px, 7vw, 80px)',
    fontWeight: 800,
    lineHeight: 1.05,
    color: '#fff',
    marginBottom: '24px',
  },
  heroOrange: {
    color: '#ff8000',
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.7,
    marginBottom: '40px',
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    padding: '14px 32px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    letterSpacing: '0.5px',
  },
  btnGhost: {
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.5px',
  },
  featuresSection: {
    padding: '0 24px 80px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  featureCard: {
    padding: '28px 24px',
    backgroundColor: '#0f0f0f',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  featureIcon: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '12px',
  },
  featureTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '17px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '8px',
  },
  featureDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.6,
  },
}
