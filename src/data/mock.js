// ============================================================
// DATOS FICTICIOS / SIMULADOS — producción audiovisual
// Ninguna relación con Banco de Bogotá S.A.
// ============================================================

export const USER = {
  nombre: 'Manuel',
  nombreCompleto: 'Manuel A. Bedoya',
  iniciales: 'MB',
  cc: '14.796.279',
  email: 'm.bedoya@email.com',
  celular: '310 456 7890'
}

export const CUENTA = {
  nombre: 'Cuenta de Ahorros',
  numeroCorto: '···· 7-71',
  numeroLargo: '0622281624',
  saldoDisponible: 651240000,
  saldoTotal: 651240000,
  estado: 'En verificación'
}


export const BANCOS = [
  'Bancolombia', 'Davivienda', 'BBVA Colombia', 'Banco de Occidente',
  'Banco Popular', 'Banco Caja Social', 'Scotiabank Colpatria',
  'Banco AV Villas', 'Banco Agrario', 'Nequi', 'Daviplata', 'Banco Falabella'
]

export const NOMBRES_BENEF = [
  'María Fernanda López', 'Andrés Felipe Gómez', 'Laura Catalina Ríos',
  'Santiago Herrera M.', 'Diana Carolina Ruiz', 'Juan David Torres'
]

// Formato colombiano de moneda: $1.234.567 (sin decimales)
export const cop = (n) =>
  '$' + Math.abs(Math.round(n)).toLocaleString('es-CO').replace(/,/g, '.')

export const saludo = () => {
  const h = new Date().getHours()
  if (h >= 6 && h < 12) return 'Buenos días,'
  if (h >= 12 && h < 18) return 'Buenas tardes,'
  return 'Buenas noches,'
}