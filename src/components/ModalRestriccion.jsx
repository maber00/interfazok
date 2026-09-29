// Modal restricción — mensaje real estilo banco colombiano
export default function ModalRestriccion({ onClose }) {
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
