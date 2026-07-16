import ScreenHeader from '../components/ScreenHeader.jsx'
import { Transfer, QR, Phone, Chevron } from '../components/Icons.jsx'

const items = [
  { Icon: Transfer, label: 'Enviar por llave', sub: 'Celular, correo o documento' },
  { Icon: QR, label: 'Pagar con QR Bre-B', sub: 'Escanea y paga al instante' },
  { Icon: Phone, label: 'Registrar mis llaves', sub: 'Administra tus llaves Bre-B' }
]

export default function BreB() {
  return (
    <div className="min-h-full bg-bdb-fondo">
      <ScreenHeader title="Bre-B" />
      <div className="p-4">
        <div className="rounded-2xl bg-bdb-azul text-white p-5 mb-4">
          <p className="text-[13px] text-white/80">Transferencias inmediatas e interoperables</p>
          <p className="text-[22px] font-extrabold mt-1">Bre-B</p>
          <p className="text-[13px] text-white/80 mt-1">
            Envía y recibe dinero entre bancos al instante, 24/7.
          </p>
        </div>
        <div className="space-y-3">
          {items.map(({ Icon, label, sub }) => (
            <button key={label} className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 active:bg-gray-50">
              <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-bdb-azul shrink-0">
                <Icon size={22} />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-[16px] font-semibold text-bdb-texto">{label}</span>
                <span className="block text-[13px] text-bdb-gris">{sub}</span>
              </span>
              <Chevron size={20} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
