import {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

// ── Productos ──────────────────────────────────────────────
export const getProducts = async () => {
  const snap = await getDocs(collection(db, 'productos'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const subscribeProducts = (callback) => {
  const q = query(collection(db, 'productos'), orderBy('categoria'))
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export const updateProduct = (id, data) =>
  updateDoc(doc(db, 'productos', id), data)

export const addProduct = (data) =>
  addDoc(collection(db, 'productos'), { ...data, creadoEn: serverTimestamp() })

export const deleteProduct = (id) =>
  deleteDoc(doc(db, 'productos', id))

// ── Pedidos ────────────────────────────────────────────────
export const subscribePedidos = (callback) => {
  const q = query(collection(db, 'pedidos'), orderBy('creadoEn', 'desc'))
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export const addPedido = (data) =>
  addDoc(collection(db, 'pedidos'), { ...data, creadoEn: serverTimestamp(), estado: 'pendiente' })

export const updatePedidoEstado = (id, estado) =>
  updateDoc(doc(db, 'pedidos', id), { estado })
