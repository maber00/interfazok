import { useState } from 'react'
import HomeHeader from '../components/HomeHeader.jsx'
import {
  Refresh, Eye, EyeOff, Transfer, X, Phone, FileAdd, Dollar, Bank, Chart
} from '../components/Icons.jsx'
import { CUENTA, cop } from '../data/mock.js'

// Modal restricción — mensaje real estilo banco colombiano
function ModalSarlaft({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-7 pb-2 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14327D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-gray-900 leading-snug">
            Transacción no disponible
          </h2>
        </div>
        <div className="px-6 py-4 text-center space-y-3">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Por medidas de seguridad tu cuenta presenta restricciones temporales.
          </p>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Para más información comunícate con nosotros o dirígete a una sucursal.
          </p>
          <div className="pt-1">
            <p className="text-[15px] font-bold text-[#14327D]">601 353 9999</p>
            <p className="text-[13px] text-gray-400">Bogotá · Lunes a sábado 7am – 8pm</p>
            <p className="text-[15px] font-bold text-[#14327D] mt-2">01 8000 111 560</p>
            <p className="text-[13px] text-gray-400">Nacional gratuito</p>
          </div>
        </div>
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-[#14327D] text-white font-bold text-[16px] py-3.5 rounded-xl"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}

const accesos = [
  { Icon: Phone, label: 'Recargar celular' },
  { Icon: FileAdd, label: 'Inscribir servicios' },
  { Icon: Transfer, label: 'Transferir', go: 'pagar' },
  { Icon: Dollar, label: 'Pagar servicios', go: 'pagar' },
  { Icon: Bank, label: 'Sucursales' },
  { Icon: Chart, label: 'Mis extractos', go: 'documentos' }
]

export default function Home({ go }) {
  const [tab, setTab] = useState('productos')
  const [verSaldo, setVerSaldo] = useState(true)
  const [promo, setPromo] = useState(true)
  const [modalSarlaft, setModalSarlaft] = useState(false)

  const oculto = '$•••.•••.•••'

  // Intercepta navegación a pagar/transferir y muestra modal
  const handleAcceso = (dest) => {
    if (dest === 'pagar') { setModalSarlaft(true); return }
    if (dest) go(dest)
  }

  return (
    <div className="min-h-full bg-bdb-fondo pb-6">
      {modalSarlaft && <ModalSarlaft onClose={() => setModalSarlaft(false)} />}
      <HomeHeader onLogout={() => go('menu')} />

      {/* Tabs */}
      <div className="bg-white flex shadow-sm">
        {[
          { id: 'productos', label: 'Mis productos' },
          { id: 'ofertas', label: 'Tus Ofertas', dot: true }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-4 text-[17px] font-bold relative flex items-center justify-center gap-1.5 ${
              tab === t.id ? 'text-bdb-azul' : 'text-bdb-texto'
            }`}
          >
            {t.label}
            {t.dot && <span className="w-2 h-2 rounded-full bg-bdb-rojo" />}
            {tab === t.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-3/5 bg-bdb-azul rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Tus productos header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-extrabold text-bdb-texto">Tus productos</h2>
          <div className="flex items-center gap-4 text-bdb-azul">
            <button title="Actualizar"><Refresh size={24} /></button>
            <button onClick={() => setVerSaldo((v) => !v)} title="Mostrar/ocultar saldos">
              {verSaldo ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>
        </div>

        {/* Banner promocional */}
        {promo && (
          <div className="rounded-2xl bg-bdb-azul text-white p-5 relative">
            <button onClick={() => setPromo(false)} className="absolute top-4 right-4 text-white/80">
              <X size={20} />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <Transfer size={28} className="mt-0.5 shrink-0" />
              <p className="text-[18px] font-bold leading-snug">
                Realiza transferencias internacionales
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-white text-bdb-azul font-bold text-[15px] px-5 py-2.5 rounded-xl">
                Conocer más
              </button>
            </div>
          </div>
        )}

        {/* Aviso restricción — texto limpio, sin recuadro ni ícono */}
        <p className="text-[13px] text-[#B45309] font-semibold px-1">
          ⚠️ Tu cuenta está sujeta a verificación. Algunas operaciones están temporalmente restringidas. Comunícate con nosotros.
        </p>

        {/* Cuenta de Ahorros — estilo captura real: card blanca, borde izquierdo amarillo */}
        <button
          onClick={() => setModalSarlaft(true)}
          className="w-full text-left rounded-2xl bg-white p-5 shadow-card border-l-4 border-[#EBB932]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14327D" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              <span className="text-[15px] font-bold text-gray-900">{CUENTA.nombre}</span>
            </div>
            <span className="text-gray-400 text-[18px] leading-none tracking-widest">···</span>
          </div>
          <p className="text-[13px] text-gray-400 mb-3">No. {CUENTA.numeroLargo}</p>
          <p className="text-[12px] text-gray-400">Saldo total</p>
          <p className="text-[26px] font-extrabold text-gray-900 leading-tight">
            {verSaldo ? cop(CUENTA.saldoTotal) : '$  •••.•••.•••'}
          </p>
          <p className="mt-2 text-[12px] text-[#B45309] font-semibold">
            Cuenta sujeta a verificación · Comunícate con nosotros
          </p>
        </button>

        {/* Consulta tus productos + Grupo AVAL */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-6 flex items-center justify-between">
          <span className="text-[16px] text-bdb-texto">Consulta tus productos</span>
          <img src="/grupo-aval.svg" alt="Grupo Aval" className="h-7 w-auto" />
        </div>

        {/* ¿Qué necesitas hacer hoy? */}
        <div>
          <h3 className="text-[22px] font-extrabold text-bdb-texto mb-3">
            ¿Qué necesitas hacer hoy?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {accesos.map(({ Icon, label, go: dest }) => (
              <button
                key={label}
                onClick={() => handleAcceso(dest)}
                className="rounded-2xl border border-dashed border-bdb-azul/40 bg-white p-4 flex items-center gap-3 text-left active:bg-blue-50"
              >
                <span className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-bdb-azul shrink-0">
                  <Icon size={22} />
                </span>
                <span className="text-[15px] font-semibold text-bdb-azul leading-snug">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}