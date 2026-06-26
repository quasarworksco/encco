import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = (producto) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === producto.id)
      if (ex) return prev.map(i => i.id === producto.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...producto, qty: 1 }]
    })
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const update = (id, qty) => {
    if (qty <= 0) return remove(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const total = items.reduce((s, i) => s + i.precio * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
