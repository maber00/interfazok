// Autenticación local (sin backend). Credenciales fijas para la ficción.
const DOCUMENTO = '14796279'

// Acepta cualquier clave — es simulación para producción audiovisual.
export function signIn(doc, clave) {
  return String(doc).replace(/\D/g, '') === DOCUMENTO || clave.length > 0
}