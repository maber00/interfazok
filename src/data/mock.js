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
// Notificaciones de la campana — transferencias devueltas ("rebotadas")
export const NOTIFICACIONES = [
  {
    id: 'n3',
    monto: 24000000,
    fecha: '25 de septiembre',
    hora: '2:18 p. m.',
    banco: 'Bancolombia',
    cuenta: '70267004577',
    nueva: true
  },
  {
    id: 'n2',
    monto: 11000000,
    fecha: '25 de septiembre',
    hora: '11:06 a. m.',
    banco: 'Banco de Bogotá',
    cuenta: CUENTA.numeroLargo,
    nueva: true
  },
  {
    id: 'n1',
    monto: 45000000,
    fecha: '15 de septiembre',
    hora: '9:42 a. m.',
    banco: 'Bancolombia',
    cuenta: '70267004577',
    nueva: true
  }
]

// Llaves Bre-B registradas (ficticias)
export const LLAVES = [
  { id: 'l1', tipo: 'Celular',       valor: '@310 456 7890',  estado: 'Activa' },
  { id: 'l2', tipo: 'Correo',        valor: '@m.bedoya',      estado: 'Activa' },
  { id: 'l3', tipo: 'Documento',     valor: '@14796279',      estado: 'Activa' },
  { id: 'l4', tipo: 'Alfanumérica',  valor: '@manuelb',       estado: 'Pendiente' }
]

export const TIPOS_LLAVE = ['Celular', 'Correo', 'Documento', 'Alfanumérica']
