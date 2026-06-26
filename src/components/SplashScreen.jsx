import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}))

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('logo') // logo → tagline → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 1800)
    const t2 = setTimeout(() => setPhase('exit'), 3400)
    const t3 = setTimeout(() => onFinish(), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          style={styles.container}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div style={styles.grid} />

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              style={{
                ...styles.particle,
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Orange radial glow */}
          <motion.div
            style={styles.glow}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo */}
          <motion.div
            style={styles.centerContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              style={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/encco-logo.svg"
                alt="ENCCO"
                style={styles.logoImg}
              />
            </motion.div>

            {/* Orange line */}
            <motion.div
              style={styles.line}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Tagline */}
            <AnimatePresence>
              {(phase === 'tagline' || phase === 'exit') && (
                <motion.p
                  style={styles.tagline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Nos encargamos de todo, tú solo disfruta
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom loader bar */}
          <motion.div style={styles.loaderTrack}>
            <motion.div
              style={styles.loaderBar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.2, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
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
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#ff8000',
  },
  glow: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,128,0,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    zIndex: 1,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 'clamp(260px, 40vw, 420px)',
    height: 'auto',
    filter: 'drop-shadow(0 0 20px rgba(255,128,0,0.35))',
  },
  line: {
    height: '3px',
    width: '100%',
    backgroundColor: '#ff8000',
    borderRadius: '2px',
    transformOrigin: 'left',
    boxShadow: '0 0 12px rgba(255,128,0,0.6)',
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  loaderTrack: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '160px',
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    backgroundColor: '#ff8000',
    transformOrigin: 'left',
    boxShadow: '0 0 8px rgba(255,128,0,0.8)',
    borderRadius: '2px',
  },
}
