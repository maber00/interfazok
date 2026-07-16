import { User, Lock, Bell, Pin, Headset, Info, Salida, Chevron } from '../components/Icons.jsx'
import { USER } from '../data/mock.js'

const opciones = [
  { Icon: User, label: 'Mi perfil' },
  { Icon: Lock, label: 'Seguridad y claves' },
  { Icon: Bell, label: 'Notificaciones' },
  { Icon: Pin, label: 'Sucursales y cajeros' },
  { Icon: Headset, label: 'Líneas de atención: 01 8000 111 560' },
  { Icon: Info, label: 'Acerca de la app (v11.1.1)' }
]

export default function MenuScreen({ onLogout }) {
  const handleLogout = () => onLogout()

  return (
    <div className="min-h-full bg-bdb-fondo">
      {/* Header con avatar */}
      <div
        className="relative text-white rounded-b-[24px]"
        style={{ background: 'linear-gradient(160deg, #1A4BAF 0%, #2563EB 60%, #3B82F6 100%)' }}
      >
        <div className="relative px-5 py-7 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bdb-dorado text-bdb-azul flex items-center justify-center text-[22px] font-extrabold">
            {USER.iniciales}
          </div>
          <div>
            <p className="text-[20px] font-extrabold leading-tight">{USER.nombreCompleto}</p>
            <p className="text-[13px] text-white/80">C.C. {USER.cc}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {opciones.map(({ Icon, label }, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 px-4 py-4 border-b border-gray-100 last:border-0 active:bg-gray-50"
            >
              <span className="text-bdb-azul shrink-0"><Icon size={22} /></span>
              <span className="flex-1 text-left text-[15px] font-semibold text-bdb-texto">{label}</span>
              <Chevron size={20} className="text-gray-300" />
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-white rounded-2xl shadow-card px-4 py-4 flex items-center gap-4 active:bg-gray-50"
        >
          <span className="text-bdb-rojo shrink-0"><Salida size={22} /></span>
          <span className="flex-1 text-left text-[15px] font-bold text-bdb-rojo">Cerrar sesión</span>
        </button>

        <p className="text-center text-[12px] text-bdb-gris mt-6 leading-snug">
          Vigilado por la Superintendencia Financiera de Colombia
          <br />
          <span className="text-[11px] text-gray-400">
            Aplicación ficticia · solo para producción audiovisual
          </span>
        </p>
      </div>
    </div>
  )
}