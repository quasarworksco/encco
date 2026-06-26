import { motion } from 'framer-motion'
import { CONTACTO } from '../lib/contacto'

const socials = [
  {
    label: 'WhatsApp',
    handle: CONTACTO.whatsappDisplay,
    url: CONTACTO.whatsappUrl,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: '#25D366',
  },
  {
    label: 'Telegram',
    handle: CONTACTO.telegram,
    url: CONTACTO.telegramUrl,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: '#229ED9',
  },
  {
    label: 'Instagram',
    handle: CONTACTO.instagram,
    url: CONTACTO.instagramUrl,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    color: '#E1306C',
  },
  {
    label: 'TikTok',
    handle: CONTACTO.tiktok,
    url: CONTACTO.tiktokUrl,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: '#fff',
  },
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.topGradient} />

      <div style={styles.inner}>
        {/* Brand */}
        <div style={styles.brand}>
          <img src="/encco-logo.png" alt="ENCCO" style={styles.logo} />
          <p style={styles.tagline}>Nos encargamos de todo,<br />tú solo disfruta.</p>
          <motion.a
            href={CONTACTO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLink}
            whileHover={{ color: '#ff8000' }}
          >
            📍 {CONTACTO.ciudad}
          </motion.a>
        </div>

        {/* Redes sociales */}
        <div style={styles.socialsGroup}>
          <h4 style={styles.groupTitle}>Encuéntranos</h4>
          <div style={styles.socialsList}>
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialRow}
                whileHover={{ x: 4, color: s.color }}
              >
                <span style={{ ...styles.socialIcon, color: s.color }}>{s.icon}</span>
                <div>
                  <span style={styles.socialLabel}>{s.label}</span>
                  <span style={styles.socialHandle}>{s.handle}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={styles.linksGroup}>
          <h4 style={styles.groupTitle}>Tienda</h4>
          {['Combos', 'Cervezas', 'Snacks', 'Whisky', 'Ron', 'Bebidas', 'Energizantes'].map(l => (
            <a key={l} href="#catalogo" style={styles.link}>{l}</a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div style={styles.ctaGroup}>
          <h4 style={styles.groupTitle}>¿Listo para pedir?</h4>
          <p style={styles.ctaSub}>Escríbenos directo y tu pedido sale volando.</p>
          <motion.a
            href={`${CONTACTO.whatsappUrl}?text=Hola%20ENCCO!%20Quiero%20hacer%20un%20pedido%20🚀`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.waBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(37,211,102,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#000" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir por WhatsApp
          </motion.a>

          <motion.a
            href={CONTACTO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.tgBtn}
            whileHover={{ scale: 1.04, borderColor: '#229ED9', color: '#229ED9' }}
            whileTap={{ scale: 0.97 }}
          >
            Pedir por Telegram
          </motion.a>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copy}>© 2025 ENCCO · Maracaibo, Venezuela</p>
        <div style={styles.bottomSocials}>
          {socials.map(s => (
            <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ ...styles.bottomIcon, color: 'rgba(255,255,255,0.3)' }}
              whileHover={{ color: s.color, scale: 1.15 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: { backgroundColor: '#050505', borderTop: '1px solid #111' },
  topGradient: { height: '2px', background: 'linear-gradient(90deg, transparent, #ff8000, transparent)' },
  inner: {
    maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 48px',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px',
  },
  brand: { display: 'flex', flexDirection: 'column', gap: '14px' },
  logo: { height: '36px', width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255,128,0,0.2))' },
  tagline: { fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 },
  mapLink: { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,128,0,0.7)', textDecoration: 'none', transition: 'color 0.2s' },
  groupTitle: {
    fontFamily: "'Syne', sans-serif", fontSize: '11px', fontWeight: 700,
    color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px',
  },
  socialsGroup: { display: 'flex', flexDirection: 'column' },
  socialsList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  socialRow: {
    display: 'flex', alignItems: 'center', gap: '12px',
    textDecoration: 'none', color: 'rgba(255,255,255,0.55)',
    transition: 'all 0.2s',
  },
  socialIcon: { display: 'flex', flexShrink: 0 },
  socialLabel: { display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' },
  socialHandle: { display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' },
  linksGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  link: { fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' },
  ctaGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  ctaSub: { fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 },
  waBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding: '12px 20px', backgroundColor: '#25D366', color: '#000',
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px',
    borderRadius: '8px', textDecoration: 'none', letterSpacing: '0.3px',
  },
  tgBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '11px 20px', backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)',
    fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '13px',
    borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s',
  },
  bottom: {
    borderTop: '1px solid #111', maxWidth: '1200px', margin: '0 auto',
    padding: '20px 24px', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '12px',
  },
  copy: { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.2)' },
  bottomSocials: { display: 'flex', gap: '16px', alignItems: 'center' },
  bottomIcon: { display: 'flex', transition: 'all 0.2s', textDecoration: 'none' },
}
