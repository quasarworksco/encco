import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react'
import { subscribeProducts } from '../lib/firestore'
import { useCart } from '../context/CartContext'

const CATEGORIA_ICONS = {
  'Combos': '⚡',
  'Cervezas': '🍺',
  'Snacks': '🍿',
  'Whisky': '🥃',
  'Ron': '🍶',
  'Tequila': '🌵',
  'Vodka': '🧊',
  'Ginebra': '🌿',
  'Aguardiente / Anís': '🔥',
  'Vinos, Espumante y Sangría': '🍷',
  'Otros Licores': '🍹',
  'Bebidas': '🥤',
  'Energizantes': '⚡',
  'Cigarros': '🚬',
  'Arguile': '💨',
  'Helados / Marquesas': '🍦',
  'Otros': '📦',
}

export default function Catalogo({ onCartOpen }) {
  const [productos, setProductos] = useState([])
  const [search, setSearch] = useState('')
  const [catActiva, setCatActiva] = useState('Combos')
  const [loading, setLoading] = useState(true)
  const tabsRef = useRef(null)

  useEffect(() => {
    const unsub = subscribeProducts(data => {
      setProductos(data)
      setLoading(false)
    })
    return unsub
  }, [])

  const categorias = ['Combos', ...new Set(
    productos.filter(p => p.categoria !== 'Combos').map(p => p.categoria)
  )]

  const filtrados = productos.filter(p => {
    const matchCat = p.categoria === catActiva
    const matchSearch = search
      ? p.nombre.toLowerCase().includes(search.toLowerCase())
      : true
    return search ? matchSearch : matchCat
  })

  const combos = filtrados.filter(p => p.esCombo)
  const regulares = filtrados.filter(p => !p.esCombo)

  const scrollToTab = (cat, idx) => {
    setCatActiva(cat)
    const tabs = tabsRef.current
    if (tabs) {
      const btn = tabs.children[idx]
      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <div style={styles.page}>
      {/* Header sticky */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <img src="/encco-logo.png" alt="ENCCO" style={styles.logo} />
          <CartBubble onOpen={onCartOpen} />
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <Search size={16} color="rgba(255,255,255,0.35)" style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={styles.searchClear} onClick={() => setSearch('')}>
              <X size={14} color="rgba(255,255,255,0.4)" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        {!search && (
          <div style={styles.tabsWrap}>
            <div ref={tabsRef} style={styles.tabs}>
              {categorias.map((cat, i) => (
                <button
                  key={cat}
                  style={{
                    ...styles.tab,
                    ...(catActiva === cat ? styles.tabActive : {}),
                  }}
                  onClick={() => scrollToTab(cat, i)}
                >
                  <span style={styles.tabIcon}>{CATEGORIA_ICONS[cat] || '•'}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <LoadingSkeleton />
        ) : search ? (
          <SearchResults items={filtrados} query={search} />
        ) : (
          <>
            {catActiva === 'Combos' && combos.length > 0 && (
              <CombosSection combos={combos} />
            )}
            {catActiva !== 'Combos' && (
              <ProductosGrid items={regulares} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Combos Section — cards especiales ─────────────────────
function CombosSection({ combos }) {
  const subCats = [...new Set(combos.map(c => c.subcategoria))]

  return (
    <div style={styles.combosWrap}>
      {subCats.map(sub => (
        <div key={sub} style={styles.subSection}>
          <h3 style={styles.subTitle}>{sub}</h3>
          <div style={styles.combosGrid}>
            {combos.filter(c => c.subcategoria === sub).map((combo, i) => (
              <ComboCard key={combo.id} combo={combo} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ComboCard({ combo, index }) {
  const { add, items } = useCart()
  const inCart = items.find(i => i.id === combo.id)
  const [burst, setBurst] = useState(false)

  const handleAdd = () => {
    add(combo)
    setBurst(true)
    setTimeout(() => setBurst(false), 600)
  }

  return (
    <motion.div
      style={styles.comboCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Orange top accent */}
      <div style={styles.comboAccent} />

      <div style={styles.comboBody}>
        <div style={styles.comboLeft}>
          <h2 style={styles.comboNombre}>{combo.nombre}</h2>
          {combo.detalle && (
            <p style={styles.comboDetalle}>{combo.detalle}</p>
          )}
          {inCart && (
            <span style={styles.comboInCart}>✓ {inCart.qty} en carrito</span>
          )}
        </div>
        <div style={styles.comboRight}>
          <span style={styles.comboPrecio}>${combo.precio.toFixed(2)}</span>
          <motion.button
            style={{ ...styles.comboAddBtn, ...(burst ? styles.comboAddBtnBurst : {}) }}
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={20} color="#000" strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Productos Grid ─────────────────────────────────────────
function ProductosGrid({ items }) {
  if (items.length === 0) return (
    <p style={styles.empty}>Sin productos en esta categoría</p>
  )

  return (
    <div style={styles.prodGrid}>
      {items.map((p, i) => (
        <ProductCard key={p.id} producto={p} index={i} />
      ))}
    </div>
  )
}

function ProductCard({ producto, index }) {
  const { add, items, update } = useCart()
  const inCart = items.find(i => i.id === producto.id)

  return (
    <motion.div
      style={{ ...styles.prodCard, ...(producto.disponible === false ? styles.prodCardAgotado : {}) }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <div style={styles.prodInfo}>
        <p style={styles.prodNombre}>{producto.nombre}</p>
        {producto.subcategoria && (
          <p style={styles.prodSub}>{producto.subcategoria}</p>
        )}
        <p style={styles.prodPrecio}>${producto.precio.toFixed(2)}</p>
      </div>

      <div style={styles.prodAction}>
        {producto.disponible === false ? (
          <span style={styles.agotadoBadge}>Agotado</span>
        ) : inCart ? (
          <QtyControl
            qty={inCart.qty}
            onInc={() => update(producto.id, inCart.qty + 1)}
            onDec={() => update(producto.id, inCart.qty - 1)}
          />
        ) : (
          <motion.button
            style={styles.addBtn}
            onClick={() => add(producto)}
            whileTap={{ scale: 0.88 }}
          >
            <Plus size={18} color="#000" strokeWidth={3} />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

function QtyControl({ qty, onInc, onDec }) {
  return (
    <div style={styles.qtyControl}>
      <motion.button style={styles.qtyBtn} onClick={onDec} whileTap={{ scale: 0.85 }}>
        <Minus size={14} color="#ff8000" strokeWidth={2.5} />
      </motion.button>
      <span style={styles.qtyNum}>{qty}</span>
      <motion.button style={styles.qtyBtn} onClick={onInc} whileTap={{ scale: 0.85 }}>
        <Plus size={14} color="#ff8000" strokeWidth={2.5} />
      </motion.button>
    </div>
  )
}

function CartBubble({ onOpen }) {
  const { count } = useCart()
  return (
    <motion.button
      style={styles.cartBubble}
      onClick={onOpen}
      whileTap={{ scale: 0.9 }}
      animate={count > 0 ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <ShoppingCart size={22} color="#fff" />
      {count > 0 && (
        <motion.span
          style={styles.cartCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={count}
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  )
}

function SearchResults({ items, query }) {
  if (items.length === 0) return (
    <div style={styles.noResults}>
      <p style={styles.noResultsText}>Sin resultados para "{query}"</p>
      <p style={styles.noResultsSub}>Intenta con otro nombre</p>
    </div>
  )
  return (
    <div>
      <p style={styles.resultsCount}>{items.length} resultado{items.length !== 1 ? 's' : ''}</p>
      <div style={styles.prodGrid}>
        {items.map((p, i) => <ProductCard key={p.id} producto={p} index={i} />)}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div style={styles.prodGrid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={styles.skeleton} />
      ))}
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#000',
    minHeight: '100vh',
    paddingBottom: '100px',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#000',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '0',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px 10px',
  },
  logo: { height: '28px', width: 'auto', filter: 'drop-shadow(0 0 6px rgba(255,128,0,0.2))' },
  cartBubble: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
  },
  cartCount: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ff8000',
    color: '#000',
    fontSize: '10px',
    fontWeight: 800,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  searchWrap: {
    position: 'relative',
    margin: '0 16px 10px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '11px 36px 11px 38px',
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '12px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  searchClear: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '4px',
  },
  tabsWrap: {
    overflowX: 'auto',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
  },
  tabs: {
    display: 'flex',
    gap: '6px',
    padding: '0 16px 12px',
    width: 'max-content',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 14px',
    borderRadius: '999px',
    border: '1px solid #222',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.45)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: '#ff8000',
    borderColor: '#ff8000',
    color: '#000',
    fontWeight: 700,
  },
  tabIcon: { fontSize: '14px' },
  content: { padding: '16px' },

  // Combos
  combosWrap: { display: 'flex', flexDirection: 'column', gap: '24px' },
  subSection: {},
  subTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    color: 'rgba(255,128,0,0.8)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  combosGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  comboCard: {
    backgroundColor: '#0f0f0f',
    border: '1px solid #1e1e1e',
    borderRadius: '14px',
    overflow: 'hidden',
    position: 'relative',
  },
  comboAccent: {
    height: '3px',
    background: 'linear-gradient(90deg, #ff8000, #ff5500)',
    boxShadow: '0 0 8px rgba(255,128,0,0.4)',
  },
  comboBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 14px 16px',
    gap: '12px',
  },
  comboLeft: { flex: 1 },
  comboNombre: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '17px',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '5px',
    letterSpacing: '-0.3px',
  },
  comboDetalle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.5,
  },
  comboInCart: {
    display: 'inline-block',
    marginTop: '6px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    color: '#ff8000',
    fontWeight: 600,
  },
  comboRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    flexShrink: 0,
  },
  comboPrecio: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '22px',
    fontWeight: 800,
    color: '#ff8000',
  },
  comboAddBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#ff8000',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s',
  },
  comboAddBtnBurst: {
    backgroundColor: '#fff',
  },

  // Productos grid
  prodGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  prodCard: {
    backgroundColor: '#0f0f0f',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    padding: '14px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  prodCardAgotado: {
    opacity: 0.45,
  },
  prodInfo: { flex: 1 },
  prodNombre: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    lineHeight: 1.3,
    marginBottom: '2px',
  },
  prodSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    marginBottom: '4px',
  },
  prodPrecio: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#ff8000',
  },
  prodAction: { flexShrink: 0 },
  addBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: '#ff8000',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255,128,0,0.25)',
  },
  qtyBtn: {
    width: '34px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#fff',
    minWidth: '24px',
    textAlign: 'center',
  },
  agotadoBadge: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    color: '#ff4444',
    fontWeight: 600,
  },
  resultsCount: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '12px',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    gap: '8px',
  },
  noResultsText: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
  },
  noResultsSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.35)',
  },
  empty: {
    padding: '40px 0',
    textAlign: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.25)',
  },
  skeleton: {
    height: '70px',
    backgroundColor: '#111',
    borderRadius: '12px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
}
