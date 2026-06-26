import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Package, ShoppingBag, Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { isAdminLoggedIn, adminLogout } from '../lib/adminAuth'
import { subscribeProducts, subscribePedidos, updateProduct, addProduct, deleteProduct, updatePedidoEstado } from '../lib/firestore'

const TABS = ['Productos', 'Pedidos']

export default function Admin() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Productos')
  const [productos, setProductos] = useState([])
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate('/admin/login')
  }, [])

  useEffect(() => {
    const unsub1 = subscribeProducts(setProductos)
    const unsub2 = subscribePedidos(setPedidos)
    return () => { unsub1(); unsub2() }
  }, [])

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <img src="/encco-logo.png" alt="ENCCO" style={styles.logo} />

        <nav style={styles.nav}>
          {TABS.map(t => (
            <button
              key={t}
              style={{ ...styles.navBtn, ...(tab === t ? styles.navBtnActive : {}) }}
              onClick={() => setTab(t)}
            >
              {t === 'Productos' ? <Package size={16} /> : <ShoppingBag size={16} />}
              {t}
            </button>
          ))}
        </nav>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={15} /> Salir
        </button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.topBar}>
          <h1 style={styles.pageTitle}>{tab}</h1>
          {tab === 'Productos' && (
            <span style={styles.badge}>{productos.length} productos</span>
          )}
          {tab === 'Pedidos' && (
            <span style={styles.badge}>{pedidos.filter(p => p.estado === 'pendiente').length} pendientes</span>
          )}
        </div>

        {tab === 'Productos' && <ProductosPanel productos={productos} />}
        {tab === 'Pedidos' && <PedidosPanel pedidos={pedidos} />}
      </main>
    </div>
  )
}

// ── Productos Panel ────────────────────────────────────────
function ProductosPanel({ productos }) {
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [showAdd, setShowAdd] = useState(false)
  const [newProd, setNewProd] = useState({ nombre: '', categoria: '', precio: '', descripcion: '', disponible: true })
  const [saving, setSaving] = useState(false)

  const startEdit = (p) => { setEditId(p.id); setEditData({ ...p }) }
  const cancelEdit = () => { setEditId(null); setEditData({}) }

  const saveEdit = async () => {
    setSaving(true)
    await updateProduct(editId, {
      nombre: editData.nombre,
      categoria: editData.categoria,
      precio: Number(editData.precio),
      descripcion: editData.descripcion,
      disponible: editData.disponible,
    })
    setSaving(false)
    cancelEdit()
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este producto?')) await deleteProduct(id)
  }

  const handleAdd = async () => {
    if (!newProd.nombre || !newProd.precio) return
    setSaving(true)
    await addProduct({ ...newProd, precio: Number(newProd.precio) })
    setNewProd({ nombre: '', categoria: '', precio: '', descripcion: '', disponible: true })
    setShowAdd(false)
    setSaving(false)
  }

  const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))]

  return (
    <div>
      <div style={styles.toolbar}>
        <input
          style={styles.searchInput}
          placeholder="Buscar producto..."
          onChange={e => {}}
        />
        <motion.button
          style={styles.addBtn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus size={15} /> Agregar
        </motion.button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            style={styles.addForm}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h3 style={styles.addFormTitle}>Nuevo producto</h3>
            <div style={styles.formGrid}>
              <InputField label="Nombre" value={newProd.nombre} onChange={v => setNewProd(p => ({ ...p, nombre: v }))} />
              <InputField label="Categoría" value={newProd.categoria} onChange={v => setNewProd(p => ({ ...p, categoria: v }))} />
              <InputField label="Precio ($)" value={newProd.precio} onChange={v => setNewProd(p => ({ ...p, precio: v }))} type="number" />
              <InputField label="Descripción" value={newProd.descripcion} onChange={v => setNewProd(p => ({ ...p, descripcion: v }))} />
            </div>
            <div style={styles.formActions}>
              <button style={styles.cancelBtn} onClick={() => setShowAdd(false)}>Cancelar</button>
              <motion.button style={styles.saveBtn} onClick={handleAdd} disabled={saving} whileHover={{ scale: 1.02 }}>
                {saving ? 'Guardando...' : 'Guardar'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Nombre', 'Categoría', 'Precio', 'Disponible', 'Acciones'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} style={styles.tr}>
                {editId === p.id ? (
                  <>
                    <td style={styles.td}><input style={styles.inlineInput} value={editData.nombre} onChange={e => setEditData(d => ({ ...d, nombre: e.target.value }))} /></td>
                    <td style={styles.td}><input style={styles.inlineInput} value={editData.categoria} onChange={e => setEditData(d => ({ ...d, categoria: e.target.value }))} /></td>
                    <td style={styles.td}><input style={styles.inlineInput} type="number" value={editData.precio} onChange={e => setEditData(d => ({ ...d, precio: e.target.value }))} /></td>
                    <td style={styles.td}>
                      <button style={{ ...styles.toggleBtn, backgroundColor: editData.disponible ? '#ff8000' : '#333' }} onClick={() => setEditData(d => ({ ...d, disponible: !d.disponible }))}>
                        {editData.disponible ? 'Sí' : 'No'}
                      </button>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button style={styles.iconBtnGreen} onClick={saveEdit}><Check size={14} /></button>
                        <button style={styles.iconBtnRed} onClick={cancelEdit}><X size={14} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}><span style={styles.prodName}>{p.nombre}</span></td>
                    <td style={styles.td}><span style={styles.catTag}>{p.categoria}</span></td>
                    <td style={styles.td}><span style={styles.price}>${Number(p.precio).toFixed(2)}</span></td>
                    <td style={styles.td}>
                      <span style={{ ...styles.availBadge, backgroundColor: p.disponible ? 'rgba(0,200,100,0.12)' : 'rgba(255,50,50,0.12)', color: p.disponible ? '#00c864' : '#ff4444' }}>
                        {p.disponible ? 'Disponible' : 'Agotado'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button style={styles.iconBtn} onClick={() => startEdit(p)}><Pencil size={14} /></button>
                        <button style={styles.iconBtnRed} onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {productos.length === 0 && (
          <p style={styles.empty}>No hay productos aún. Agrega el primero.</p>
        )}
      </div>
    </div>
  )
}

// ── Pedidos Panel ──────────────────────────────────────────
function PedidosPanel({ pedidos }) {
  const estadoColors = {
    pendiente: { bg: 'rgba(255,128,0,0.12)', color: '#ff8000' },
    preparando: { bg: 'rgba(0,150,255,0.12)', color: '#0096ff' },
    enviado: { bg: 'rgba(150,0,255,0.12)', color: '#9600ff' },
    entregado: { bg: 'rgba(0,200,100,0.12)', color: '#00c864' },
    cancelado: { bg: 'rgba(255,50,50,0.12)', color: '#ff4444' },
  }

  return (
    <div style={styles.pedidosGrid}>
      {pedidos.length === 0 && <p style={styles.empty}>No hay pedidos aún.</p>}
      {pedidos.map(p => (
        <motion.div
          key={p.id}
          style={styles.pedidoCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ borderColor: 'rgba(255,128,0,0.3)' }}
        >
          <div style={styles.pedidoHeader}>
            <span style={styles.pedidoId}>#{p.id.slice(-6).toUpperCase()}</span>
            <span style={{
              ...styles.estadoBadge,
              backgroundColor: estadoColors[p.estado]?.bg || '#333',
              color: estadoColors[p.estado]?.color || '#fff',
            }}>
              {p.estado}
            </span>
          </div>
          <p style={styles.pedidoCliente}>{p.nombre || 'Cliente'}</p>
          <p style={styles.pedidoTel}>{p.telefono}</p>
          <p style={styles.pedidoDir}>{p.direccion}</p>
          <div style={styles.pedidoItems}>
            {(p.items || []).map((item, i) => (
              <span key={i} style={styles.itemChip}>{item.nombre} x{item.cantidad}</span>
            ))}
          </div>
          <div style={styles.pedidoFooter}>
            <span style={styles.pedidoTotal}>${Number(p.total || 0).toFixed(2)}</span>
            <select
              style={styles.estadoSelect}
              value={p.estado}
              onChange={e => updatePedidoEstado(p.id, e.target.value)}
            >
              {Object.keys(estadoColors).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text' }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input style={styles.formInput} type={type} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', backgroundColor: '#000' },
  sidebar: {
    width: '220px', minWidth: '220px', backgroundColor: '#080808',
    borderRight: '1px solid #1a1a1a', padding: '28px 16px',
    display: 'flex', flexDirection: 'column', gap: '32px',
  },
  logo: { height: '32px', width: 'auto', filter: 'drop-shadow(0 0 6px rgba(255,128,0,0.2))' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 12px', borderRadius: '8px', border: 'none',
    backgroundColor: 'transparent', color: 'rgba(255,255,255,0.45)',
    fontFamily: "'Inter', sans-serif", fontSize: '14px', cursor: 'pointer',
    transition: 'all 0.2s', textAlign: 'left',
  },
  navBtnActive: { backgroundColor: 'rgba(255,128,0,0.1)', color: '#ff8000' },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 12px', border: 'none', backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif",
    fontSize: '13px', cursor: 'pointer',
  },
  main: { flex: 1, padding: '32px', overflowY: 'auto' },
  topBar: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' },
  pageTitle: { fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, color: '#fff' },
  badge: {
    padding: '4px 12px', backgroundColor: 'rgba(255,128,0,0.1)',
    color: '#ff8000', borderRadius: '999px',
    fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600,
  },
  toolbar: { display: 'flex', gap: '12px', marginBottom: '20px' },
  searchInput: {
    flex: 1, padding: '10px 14px', backgroundColor: '#111',
    border: '1px solid #222', borderRadius: '8px',
    color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '14px', outline: 'none',
  },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '10px 18px', backgroundColor: '#ff8000',
    color: '#000', border: 'none', borderRadius: '8px',
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px', cursor: 'pointer',
  },
  addForm: {
    backgroundColor: '#0f0f0f', border: '1px solid #222',
    borderRadius: '12px', padding: '24px', marginBottom: '20px',
  },
  addFormTitle: {
    fontFamily: "'Syne', sans-serif", fontSize: '16px',
    fontWeight: 700, color: '#fff', marginBottom: '16px',
  },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  formInput: {
    padding: '9px 12px', backgroundColor: '#161616',
    border: '1px solid #2a2a2a', borderRadius: '7px',
    color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '14px', outline: 'none',
  },
  formActions: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  cancelBtn: {
    padding: '9px 20px', backgroundColor: 'transparent',
    border: '1px solid #333', borderRadius: '7px',
    color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif",
    fontSize: '13px', cursor: 'pointer',
  },
  saveBtn: {
    padding: '9px 20px', backgroundColor: '#ff8000',
    border: 'none', borderRadius: '7px',
    color: '#000', fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: '13px', cursor: 'pointer',
  },
  tableWrap: { overflowX: 'auto', borderRadius: '12px', border: '1px solid #1a1a1a' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '12px 16px', textAlign: 'left',
    fontFamily: "'Inter', sans-serif", fontSize: '11px',
    color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
    letterSpacing: '0.8px', borderBottom: '1px solid #1a1a1a',
    backgroundColor: '#0a0a0a',
  },
  tr: { borderBottom: '1px solid #111', transition: 'background 0.15s' },
  td: { padding: '14px 16px', verticalAlign: 'middle' },
  prodName: { fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#fff', fontWeight: 500 },
  catTag: {
    padding: '3px 10px', backgroundColor: '#1a1a1a',
    borderRadius: '999px', fontFamily: "'Inter', sans-serif",
    fontSize: '11px', color: 'rgba(255,255,255,0.5)',
  },
  price: { fontFamily: "'Syne', sans-serif", fontSize: '14px', fontWeight: 700, color: '#ff8000' },
  availBadge: {
    padding: '3px 10px', borderRadius: '999px',
    fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
  },
  actions: { display: 'flex', gap: '6px' },
  iconBtn: {
    padding: '6px', backgroundColor: '#1a1a1a', border: 'none',
    borderRadius: '6px', cursor: 'pointer', color: '#fff',
    display: 'flex', alignItems: 'center',
  },
  iconBtnGreen: {
    padding: '6px', backgroundColor: 'rgba(0,200,100,0.15)', border: 'none',
    borderRadius: '6px', cursor: 'pointer', color: '#00c864',
    display: 'flex', alignItems: 'center',
  },
  iconBtnRed: {
    padding: '6px', backgroundColor: 'rgba(255,50,50,0.1)', border: 'none',
    borderRadius: '6px', cursor: 'pointer', color: '#ff4444',
    display: 'flex', alignItems: 'center',
  },
  toggleBtn: {
    padding: '4px 12px', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    fontSize: '12px', fontWeight: 600, color: '#000',
  },
  inlineInput: {
    padding: '6px 10px', backgroundColor: '#1a1a1a',
    border: '1px solid #333', borderRadius: '6px',
    color: '#fff', fontFamily: "'Inter', sans-serif",
    fontSize: '13px', outline: 'none', width: '100%',
  },
  empty: {
    padding: '40px', textAlign: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px', color: 'rgba(255,255,255,0.25)',
  },
  pedidosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  pedidoCard: {
    backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a',
    borderRadius: '12px', padding: '20px',
    display: 'flex', flexDirection: 'column', gap: '8px',
    transition: 'border-color 0.2s',
  },
  pedidoHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pedidoId: { fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 700, color: '#ff8000' },
  estadoBadge: { padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, fontFamily: "'Inter', sans-serif", textTransform: 'capitalize' },
  pedidoCliente: { fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#fff', fontWeight: 600 },
  pedidoTel: { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  pedidoDir: { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  pedidoItems: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' },
  itemChip: {
    padding: '3px 10px', backgroundColor: '#1a1a1a',
    borderRadius: '999px', fontFamily: "'Inter', sans-serif",
    fontSize: '11px', color: 'rgba(255,255,255,0.6)',
  },
  pedidoFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  pedidoTotal: { fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 800, color: '#ff8000' },
  estadoSelect: {
    padding: '6px 10px', backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a', borderRadius: '7px',
    color: '#fff', fontFamily: "'Inter', sans-serif",
    fontSize: '12px', outline: 'none', cursor: 'pointer',
  },
}
