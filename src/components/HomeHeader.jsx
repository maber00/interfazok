import { LogoMark } from './Logo.jsx'
import { Bell, Finanzas, Ayuda, Salida } from './Icons.jsx'
import { saludo, USER } from '../data/mock.js'

export default function HomeHeader({ onLogout }) {
  return (
    <div className="relative text-white overflow-hidden rounded-b-[28px]"
      style={{ background: 'linear-gradient(160deg, #1A4BAF 0%, #2563EB 60%, #3B82F6 100%)' }}
    >
      {/* sin círculos decorativos */}
      <div className="relative px-5 pt-6 pb-6">
        <div className="flex items-start justify-between gap-3">
          {/* Saludo + símbolo */}
          <div className="flex items-start gap-3">
            <LogoMark size={42} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-[18px] leading-snug font-medium opacity-95">
                {saludo()}
              </p>
              <p className="text-[26px] font-extrabold leading-tight">
                {USER.nombre}
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-start gap-4 pt-1">
            <HeaderIcon Icon={Bell} badge={3} />
            <HeaderIcon Icon={Finanzas} label="Finanzas" />
            <HeaderIcon Icon={Ayuda} label="Ayuda" />
            <HeaderIcon Icon={Salida} label="Salida" onClick={onLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}

function HeaderIcon({ Icon, label, badge, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 text-white/90">
      <span className="relative">
        <Icon size={24} />
        {badge && (
          <span className="absolute -top-1.5 -right-2 bg-bdb-rojo text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </span>
      {label && <span className="text-[11px] leading-none">{label}</span>}
    </button>
  )
}