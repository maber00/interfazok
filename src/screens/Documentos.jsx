import ScreenHeader from '../components/ScreenHeader.jsx'
import { Docs, Chevron } from '../components/Icons.jsx'
import { CUENTA } from '../data/mock.js'

const docs = [
  { label: 'Extracto Cuenta de Ahorros', sub: 'Junio 2025 · PDF' },
  { label: 'Extracto Cuenta de Ahorros', sub: 'Mayo 2025 · PDF' },
  { label: 'Certificado bancario', sub: `${CUENTA.numeroLargo}` },
  { label: 'Certificado tributario', sub: 'Año gravable 2024' },
  { label: 'Extracto Tarjeta de Crédito', sub: 'Junio 2025 · PDF' }
]

export default function Documentos() {
  return (
    <div className="min-h-full bg-bdb-fondo">
      <ScreenHeader title="Documentos" />
      <div className="p-4 space-y-3">
        {docs.map((d, i) => (
          <button key={i} className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 active:bg-gray-50">
            <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-bdb-azul shrink-0">
              <Docs size={22} />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-[15px] font-semibold text-bdb-texto">{d.label}</span>
              <span className="block text-[13px] text-bdb-gris">{d.sub}</span>
            </span>
            <Chevron size={20} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  )
}
