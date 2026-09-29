import { motion } from 'framer-motion'
import { X } from './Icons.jsx'
import { NOTIFICACIONES, cop } from '../data/mock.js'

// Panel de la campana — transferencias devueltas (datos ficticios)
export default function Notificaciones({ onClose, leidas }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-[460px] max-h-full flex flex-col bg-bdb-fondo"
      >
        {/* Encabezado */}
        <div className="bg-bdb-azul text-white px-5 pt-6 pb-5 flex items-center justify-between">
          <h2 className="text-[22px] font-extrabold">Notificaciones</h2>
          <button onClick={onClose} className="text-white/90" title="Cerrar">
            <X size={24} />
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 space-y-3">
          {NOTIFICACIONES.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl bg-white p-4 shadow-card border-l-4 border-bdb-rojo"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-bold text-gray-900 leading-snug">
                      Transferencia devuelta
                    </p>
                    {n.nueva && !leidas && <span className="w-2 h-2 rounded-full bg-bdb-rojo mt-1.5 shrink-0" />}
                  </div>

                  <p className="text-[20px] font-extrabold text-gray-900 leading-tight mt-0.5">
                    {cop(n.monto)}
                  </p>

                  <p className="text-[13px] text-gray-500 leading-relaxed mt-1">
                    La transferencia salió de tu cuenta, pero el banco destino la
                    rechazó. El dinero fue reintegrado.
                  </p>

                  {n.cuenta && (
                    <p className="text-[13px] text-gray-600 font-semibold mt-1.5">
                      Cuenta destino: {n.cuenta}
                    </p>
                  )}

                  <p className="text-[12px] text-gray-400 mt-2">
                    {n.fecha} · {n.hora}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <p className="text-[12px] text-gray-400 text-center pt-2 pb-4">
            No tienes más notificaciones
          </p>
        </div>
      </motion.div>
    </div>
  )
}
