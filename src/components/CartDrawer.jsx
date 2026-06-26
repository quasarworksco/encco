import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CONTACTO } from '../lib/contacto'
import { addPedido } from '../lib/firestore'

export default function CartDrawer({ open, onClose }) {
  const { items, update, remove, clear, total, count } = useCart()
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [nota, setNota] = useState('')
  const [gpsLoading, setGpsLoading] = useState(false)
  const [step, setStep] = useState('cart') // 'cart' | 'datos'
  const [sending, setSending] = useState(false)

  const resetForm = () => {
    setNombre(''); setTelefono(''); setDireccion(''); setNota(''); setStep('cart')
  }

  const getLocation = () => {
    if (!navigator.geolocation) { alert('Tu navegador no soporta geolocalización'); return }
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setDireccion(`https://maps.google.com/?q=${latitude},${longitude}`)
        setGpsLoading(false)
      },
      () => { alert('No se pudo obtener la ubicación'); setGpsLoading(false) }
    )
  }

  const buildWhatsAppMsg = () => {
    if (items.length === 0) return ''
    let msg = '🛒 *Pedido ENCCO*\n\n'
    items.forEach(i => {
      msg += `• ${i.nombre} x${i.qty} — $${(i.precio * i.qty).toFixed(2)}\n`
    })
    msg += `\n💰 *Total: $${total.toFixed(2)}*`
    if (nombre) msg += `\n\n👤 *Cliente:* ${nombre}`
    if (telefono) msg += `\n📱 *Teléfono:* ${telefono}`
    if (direccion) msg += `\n📍 *Ubicación:* ${direccion}`
    if (nota) msg += `\n📝 *Nota:* ${nota}`
    return encodeURIComponent(msg)
  }

  const handleEnviar = async () => {
    if (!nombre || !direccion) return
    setSending(true)
    try {
      await addPedido({
        nombre,
        telefono,
        direccion,
        nota,
        items: items.map(i => ({ id: i.id, nombre: i.nombre, precio: i.precio, cantidad: i.qty })),
        total,
      })
      window.open(`${CONTACTO.whatsappUrl}?text=${buildWhatsAppMsg()}`, '_blank')
      clear()
      resetForm()
      onClose()
    } catch (e) {
      console.error(e)
    }
    setSending(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            style={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            style={styles.drawer}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div style={styles.handle} />

            {/* Header */}
            <div style={styles.drawerHeader}>
              <div>
                <h2 style={styles.drawerTitle}>Tu pedido</h2>
                {count > 0 && <p style={styles.drawerSub}>{count} producto{count !== 1 ? 's' : ''}</p>}
              </div>
              <button style={styles.closeBtn} onClick={onClose}>
                <X size={20} color="rgba(255,255,255,0.6)" />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div style={styles.emptyCart}>
                <ShoppingCart size={48} color="rgba(255,255,255,0.1)" />
                <p style={styles.emptyText}>Tu carrito está vacío</p>
                <p style={styles.emptySub}>Agrega productos del catálogo</p>
                <motion.button
                  style={styles.emptyBtn}
                  onClick={onClose}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver catálogo
                </motion.button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={styles.itemsList}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      style={styles.cartItem}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <div style={styles.itemInfo}>
                        <p style={styles.itemNombre}>{item.nombre}</p>
                        <p style={styles.itemPrecioUnit}>${item.precio.toFixed(2)} c/u</p>
                      </div>
                      <div style={styles.itemControls}>
                        <div style={styles.qtyRow}>
                          <motion.button
                            style={styles.qtyBtn}
                            onClick={() => update(item.id, item.qty - 1)}
                            whileTap={{ scale: 0.85 }}
                          >
                            <Minus size={13} color="#ff8000" />
                          </motion.button>
                          <span style={styles.qtyNum}>{item.qty}</span>
                          <motion.button
                            style={styles.qtyBtn}
                            onClick={() => update(item.id, item.qty + 1)}
                            whileTap={{ scale: 0.85 }}
                          >
                            <Plus size={13} color="#ff8000" />
                          </motion.button>
                        </div>
                        <span style={styles.itemTotal}>${(item.precio * item.qty).toFixed(2)}</span>
                        <motion.button
                          style={styles.removeBtn}
                          onClick={() => remove(item.id)}
                          whileTap={{ scale: 0.85 }}
                        >
                          <Trash2 size={14} color="#ff4444" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div style={styles.drawerFooter}>
                  <div style={styles.totalRow}>
                    <span style={styles.totalLabel}>Total estimado</span>
                    <span style={styles.totalAmount}>${total.toFixed(2)}</span>
                  </div>

                  {step === 'cart' ? (
                    <>
                      <motion.button
                        style={styles.waBtn}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep('datos')}
                      >
                        <ShoppingCart size={18} color="#000" />
                        Confirmar pedido
                      </motion.button>
                      <button style={styles.clearBtn} onClick={clear}>Vaciar carrito</button>
                    </>
                  ) : (
                    <div style={styles.datosForm}>
                      <p style={styles.datosTitle}>¿A dónde te lo llevamos?</p>

                      <input
                        style={styles.formInput}
                        placeholder="Nombre y apellido *"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                      />

                      <input
                        style={styles.formInput}
                        placeholder="Teléfono (WhatsApp / llamada) *"
                        type="tel"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                      />

                      <div style={styles.ubicacionRow}>
                        <input
                          style={{ ...styles.formInput, flex: 1 }}
                          placeholder="Sector, Av., Calle, Villa o Edificio *"
                          value={direccion}
                          onChange={e => setDireccion(e.target.value)}
                        />
                        <motion.button
                          style={styles.gpsBtn}
                          onClick={getLocation}
                          disabled={gpsLoading}
                          whileTap={{ scale: 0.9 }}
                          title="Usar mi ubicación"
                        >
                          {gpsLoading ? '...' : '📍'}
                        </motion.button>
                      </div>
                      <p style={styles.gpsHint}>Ej: Sector Las Mercedes, Av. 4, Villa El Prado. Toca 📍 para ubicación GPS</p>

                      <textarea
                        style={styles.formTextarea}
                        placeholder="Punto de referencia o nota adicional (ej: casa azul, apto 3B)"
                        value={nota}
                        onChange={e => setNota(e.target.value)}
                        rows={2}
                      />
                      <motion.button
                        style={{
                          ...styles.waBtn,
                          opacity: (!nombre || !telefono || !direccion) ? 0.5 : 1,
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleEnviar}
                        disabled={!nombre || !telefono || !direccion || sending}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="#000">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {sending ? 'Enviando...' : 'Enviar por WhatsApp'}
                      </motion.button>
                      <button style={styles.clearBtn} onClick={() => setStep('cart')}>← Volver</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 200,
    backdropFilter: 'blur(4px)',
  },
  drawer: {
    position: 'fixed',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#0d0d0d',
    borderRadius: '20px 20px 0 0',
    zIndex: 201,
    maxHeight: '88vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 -4px 40px rgba(0,0,0,0.6)',
  },
  handle: {
    width: '36px', height: '4px',
    backgroundColor: '#333',
    borderRadius: '2px',
    margin: '12px auto 0',
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '16px 20px 12px',
    borderBottom: '1px solid #1a1a1a',
    flexShrink: 0,
  },
  drawerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '20px', fontWeight: 800, color: '#fff',
  },
  drawerSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px',
  },
  closeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '4px', display: 'flex',
  },
  emptyCart: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '48px 24px', gap: '10px',
  },
  emptyText: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '8px',
  },
  emptySub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px', color: 'rgba(255,255,255,0.35)',
  },
  emptyBtn: {
    marginTop: '16px', padding: '12px 28px',
    backgroundColor: '#ff8000', color: '#000',
    border: 'none', borderRadius: '10px',
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px',
    cursor: 'pointer',
  },
  itemsList: {
    flex: 1, overflowY: 'auto',
    padding: '12px 20px',
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  cartItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', gap: '12px',
    padding: '12px 14px',
    backgroundColor: '#111',
    borderRadius: '12px',
    border: '1px solid #1e1e1e',
  },
  itemInfo: { flex: 1 },
  itemNombre: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px', fontWeight: 600, color: '#fff', lineHeight: 1.3,
  },
  itemPrecioUnit: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px',
  },
  itemControls: {
    display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
  },
  qtyRow: {
    display: 'flex', alignItems: 'center',
    backgroundColor: '#1a1a1a', borderRadius: '8px',
    border: '1px solid rgba(255,128,0,0.2)',
  },
  qtyBtn: {
    width: '30px', height: '30px',
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '13px', fontWeight: 700, color: '#fff',
    minWidth: '20px', textAlign: 'center',
  },
  itemTotal: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '14px', fontWeight: 700, color: '#ff8000',
    minWidth: '44px', textAlign: 'right',
  },
  removeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '4px', display: 'flex',
  },
  drawerFooter: {
    padding: '16px 20px 32px',
    borderTop: '1px solid #1a1a1a',
    flexShrink: 0,
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '4px',
  },
  totalLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px', color: 'rgba(255,255,255,0.5)',
  },
  totalAmount: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '26px', fontWeight: 800, color: '#ff8000',
  },
  waBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding: '16px', backgroundColor: '#25D366',
    color: '#000', fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: '15px',
    borderRadius: '12px', textDecoration: 'none',
    letterSpacing: '0.3px',
  },
  clearBtn: {
    background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.25)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px', cursor: 'pointer',
    textAlign: 'center', padding: '4px',
  },
  datosForm: { display: 'flex', flexDirection: 'column', gap: '8px' },
  datosTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px',
  },
  formInput: {
    padding: '13px 14px',
    backgroundColor: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px', outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  formTextarea: {
    padding: '13px 14px',
    backgroundColor: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px', outline: 'none',
    resize: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  ubicacionRow: { display: 'flex', gap: '8px', alignItems: 'stretch' },
  gpsBtn: {
    width: '48px', flexShrink: 0,
    backgroundColor: 'rgba(255,128,0,0.12)',
    border: '1px solid rgba(255,128,0,0.25)',
    borderRadius: '10px',
    fontSize: '20px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  gpsHint: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px', color: 'rgba(255,128,0,0.5)',
    marginTop: '-4px',
  },
}
