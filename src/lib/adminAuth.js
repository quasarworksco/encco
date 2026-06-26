// Credenciales admin — cambiar antes de producción
const ADMIN_USER = 'encco.admin'
const ADMIN_PASS = 'Enc%C0#2025$Secure!'

const KEY = 'encco_admin_session'

export const adminLogin = (user, pass) => {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem(KEY, 'true')
    return true
  }
  return false
}

export const adminLogout = () => sessionStorage.removeItem(KEY)

export const isAdminLoggedIn = () => sessionStorage.getItem(KEY) === 'true'
