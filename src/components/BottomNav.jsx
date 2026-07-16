import { Home, Dollar, Docs, Menu } from './Icons.jsx'

const items = [
  { id: 'home',       label: 'Productos',          Icon: Home },
  { id: 'pagar',      label: 'Pagar y\nTransferir', Icon: Dollar },
  { id: 'breb',       label: 'Bre-B',               Icon: BreBIcon },
  { id: 'documentos', label: 'Documentos',           Icon: Docs },
  { id: 'menu',       label: 'Menú',                 Icon: Menu }
]

function BreBIcon({ size = 22, active }) {
  return (
    <img
      src="/logo-bre-b.svg"
      alt="Bre-B"
      style={{ height: size, width: 'auto', opacity: active ? 1 : 0.5, filter: 'brightness(0) invert(1)' }}
    />
  )
}

export default function BottomNav({ active, go }) {
  return (
    <nav
      className="bg-bdb-azul shadow-nav flex justify-around items-stretch shrink-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {items.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => go(id)}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5"
          >
            {isActive && (
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white/12" />
            )}
            <span
              className={`relative z-10 ${
                isActive ? 'text-white' : 'text-white/60'
              }`}
            >
              <Icon size={22} active={isActive} />
            </span>
            <span
              className={`relative z-10 text-[10px] leading-tight text-center whitespace-pre-line ${
                isActive ? 'text-white font-semibold' : 'text-white/60'
              }`}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}