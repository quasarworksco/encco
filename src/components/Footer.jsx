import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.topLine} />
      <div style={styles.inner}>
        {/* Logo + tagline */}
        <div style={styles.brand}>
          <img src="/encco-logo.svg" alt="ENCCO" style={styles.logo} />
          <p style={styles.tagline}>Nos encargamos de todo, tú solo disfruta.</p>
          <p style={styles.location}>📍 Maracaibo, Venezuela · Delivery Express</p>
        </div>

        {/* Links */}
        <div style={styles.linksGroup}>
          <h4 style={styles.linkTitle}>Tienda</h4>
          {['Catálogo', 'Categorías', 'Ofertas', 'Novedades'].map(l => (
            <a key={l} href="#" style={styles.link}>{l}</a>
          ))}
        </div>

        <div style={styles.linksGroup}>
          <h4 style={styles.linkTitle}>Info</h4>
          {['Nosotros', 'Delivery', 'Zona de cobertura', 'Contacto'].map(l => (
            <a key={l} href="#" style={styles.link}>{l}</a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div style={styles.contactGroup}>
          <h4 style={styles.linkTitle}>¿Listo para pedir?</h4>
          <p style={styles.contactSub}>Escríbenos directo y resolvemos rápido.</p>
          <motion.a
            href="#"
            style={styles.waBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(255,128,0,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            ⚡ Pedir por WhatsApp
          </motion.a>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copy}>© 2025 ENCCO. Todos los derechos reservados.</p>
        <p style={styles.copy}>Hecho con 🧡 en Maracaibo</p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#050505',
    borderTop: '1px solid #1a1a1a',
    paddingTop: '60px',
  },
  topLine: {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #ff8000, transparent)',
    marginBottom: '60px',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '48px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  logo: {
    height: '38px',
    width: 'auto',
    filter: 'drop-shadow(0 0 8px rgba(255,128,0,0.2))',
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.6,
  },
  location: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,128,0,0.7)',
  },
  linksGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  linkTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  contactGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.6,
  },
  waBtn: {
    display: 'inline-block',
    padding: '11px 20px',
    backgroundColor: '#ff8000',
    color: '#000',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '13px',
    borderRadius: '8px',
    textDecoration: 'none',
    textAlign: 'center',
    letterSpacing: '0.3px',
  },
  bottom: {
    borderTop: '1px solid #111',
    padding: '20px 24px',
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
  },
  copy: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.25)',
  },
}
