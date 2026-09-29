import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import ModalRestriccion from '../components/ModalRestriccion.jsx'
import { Transfer, QR, Phone, Chevron, Check, X } from '../components/Icons.jsx'
import { CUENTA, LLAVES, TIPOS_LLAVE, NOMBRES_BENEF, cop } from '../data/mock.js'

const items = [
  { id: 'enviar', Icon: Transfer, label: 'Enviar por llave', sub: 'Celular, correo o documento' },
  { id: 'qr',     Icon: QR,       label: 'Pagar con QR Bre-B', sub: 'Escanea y paga al instante' },
  { id: 'llaves', Icon: Phone,    label: 'Registrar mis llaves', sub: 'Administra tus llaves Bre-B' }
]

export default function BreB() {
  const [vista, setVista] = useState(null)

  if (vista === 'enviar') return <EnviarPorLlave onBack={() => setVista(null)} />
  if (vista === 'qr')     return <PagarQR onBack={() => setVista(null)} />
  if (vista === 'llaves') return <MisLlaves onBack={() => setVista(null)} />

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
          {items.map(({ id, Icon, label, sub }) => (
            <button
              key={id}
              onClick={() => setVista(id)}
              className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 active:bg-gray-50"
            >
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

        {/* Resumen de llaves */}
        <div className="mt-5 rounded-2xl bg-white shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-bold text-bdb-texto">Mis llaves</p>
            <button onClick={() => setVista('llaves')} className="text-[13px] font-bold text-bdb-azul">
              Ver todas
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {LLAVES.map((l) => (
              <span
                key={l.id}
                className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${
                  l.estado === 'Activa' ? 'bg-blue-50 text-bdb-azul' : 'bg-amber-50 text-[#B45309]'
                }`}
              >
                {l.valor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Enviar por llave ----------
function EnviarPorLlave({ onBack }) {
  const [tipo, setTipo] = useState('Celular')
  const [llave, setLlave] = useState('')
  const [benef, setBenef] = useState('')
  const [monto, setMonto] = useState(0)
  const [modal, setModal] = useState(false)

  const buscar = () => {
    const semilla = llave.replace(/\D/g, '').slice(-1) || '0'
    setBenef(NOMBRES_BENEF[parseInt(semilla) % NOMBRES_BENEF.length])
  }

  return (
    <div className="min-h-full bg-bdb-fondo">
      {modal && <ModalRestriccion onClose={() => setModal(false)} />}
      <ScreenHeader title="Enviar por llave" onBack={onBack} />

      <div className="p-4 space-y-4">
        <div>
          <p className="text-[14px] font-semibold text-bdb-texto mb-2">Tipo de llave</p>
          <div className="flex flex-wrap gap-2">
            {TIPOS_LLAVE.map((t) => (
              <button
                key={t}
                onClick={() => { setTipo(t); setBenef('') }}
                className={`px-4 py-2 rounded-full text-[13px] font-bold border-2 ${
                  tipo === t
                    ? 'border-bdb-azul bg-blue-50 text-bdb-azul'
                    : 'border-gray-200 bg-white text-bdb-gris'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-semibold text-bdb-texto mb-2">
            Llave del destinatario
          </label>
          <div className="flex gap-2">
            <input
              value={llave}
              onChange={(e) => { setLlave(e.target.value); setBenef('') }}
              placeholder={
                tipo === 'Celular' ? '@300 123 4567'
                : tipo === 'Correo' ? '@nombre.correo'
                : tipo === 'Documento' ? '@1023456789'
                : '@millave'
              }
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3.5 text-[16px]"
            />
            <button
              onClick={buscar}
              disabled={llave.length < 4}
              className={`px-5 rounded-xl text-[15px] font-bold ${
                llave.length < 4 ? 'bg-gray-200 text-gray-500' : 'bg-bdb-azul text-white'
              }`}
            >
              Buscar
            </button>
          </div>
        </div>

        {benef && (
          <div className="rounded-2xl bg-white shadow-card p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Check size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] text-bdb-gris">Llave verificada</p>
              <p className="text-[15px] font-bold text-bdb-texto truncate">{benef}</p>
              <p className="text-[12px] text-bdb-gris">{llave}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-[14px] font-semibold text-bdb-texto mb-2">Monto a enviar</label>
          <input
            inputMode="numeric"
            value={monto ? cop(monto) : ''}
            onChange={(e) => setMonto(parseInt(e.target.value.replace(/\D/g, '') || '0'))}
            placeholder="$0"
            className="w-full text-center text-[34px] font-extrabold text-bdb-azul border-b-2 border-gray-300 py-3 focus:border-bdb-azul"
          />
          <p className="text-[12px] text-bdb-gris text-center mt-2">
            Desde {CUENTA.nombre} {CUENTA.numeroCorto}
          </p>
        </div>

        <button
          onClick={() => setModal(true)}
          disabled={!benef || monto <= 0}
          className={`w-full rounded-xl py-4 text-[17px] font-bold ${
            !benef || monto <= 0 ? 'bg-gray-200 text-gray-500' : 'bg-bdb-azul text-white active:bg-bdb-azulMedio'
          }`}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}

// ---------- Pagar con QR ----------
function PagarQR({ onBack }) {
  const [miQR, setMiQR] = useState(false)

  return (
    <div className="min-h-full bg-bdb-fondo">
      <ScreenHeader title="QR Bre-B" onBack={onBack} />

      <div className="p-4 space-y-4">
        {!miQR ? (
          <>
            <div className="relative rounded-2xl bg-gray-900 aspect-square overflow-hidden flex items-center justify-center">
              {/* Marco de escaneo */}
              <div className="relative w-2/3 aspect-square">
                {[
                  'top-0 left-0 border-t-4 border-l-4 rounded-tl-xl',
                  'top-0 right-0 border-t-4 border-r-4 rounded-tr-xl',
                  'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl',
                  'bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl'
                ].map((c) => (
                  <span key={c} className={`absolute w-10 h-10 border-white ${c}`} />
                ))}
                <span className="absolute left-0 right-0 h-0.5 bg-bdb-dorado animate-[scan_2.2s_ease-in-out_infinite]" />
              </div>
              <p className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-[13px]">
                Apunta la cámara al código QR Bre-B
              </p>
            </div>
            <button
              onClick={() => setMiQR(true)}
              className="w-full rounded-xl py-4 text-[17px] font-bold bg-bdb-azul text-white active:bg-bdb-azulMedio"
            >
              Mostrar mi código QR
            </button>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white shadow-card p-6 flex flex-col items-center">
              <p className="text-[15px] font-bold text-bdb-texto mb-1">Mi QR Bre-B</p>
              <p className="text-[13px] text-bdb-gris mb-4">Recibe dinero al instante</p>
              <QRFalso />
              <p className="mt-4 text-[16px] font-extrabold text-bdb-azul">{LLAVES[3].valor}</p>
              <p className="text-[13px] text-bdb-gris">{CUENTA.nombre} {CUENTA.numeroCorto}</p>
            </div>
            <button
              onClick={() => setMiQR(false)}
              className="w-full rounded-xl py-4 text-[17px] font-bold border-2 border-bdb-azul text-bdb-azul"
            >
              Volver al escáner
            </button>
          </>
        )}
      </div>

      <style>{`@keyframes scan{0%{top:6%}50%{top:92%}100%{top:6%}}`}</style>
    </div>
  )
}

// Cuadrícula tipo QR — decorativa, patrón fijo (no es un QR real)
function QRFalso() {
  const n = 21
  const celdas = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const esquina =
        (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8)
      const borde = esquina && (x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5))
      const relleno = esquina ? borde : ((x * 7 + y * 13 + x * y) % 3 === 0)
      celdas.push(relleno)
    }
  }
  return (
    <div
      className="grid gap-px bg-white"
      style={{ gridTemplateColumns: `repeat(${n}, 8px)` }}
    >
      {celdas.map((on, i) => (
        <span key={i} className={`w-2 h-2 ${on ? 'bg-gray-900' : 'bg-white'}`} />
      ))}
    </div>
  )
}

// ---------- Mis llaves ----------
function MisLlaves({ onBack }) {
  const [llaves, setLlaves] = useState(LLAVES)
  const [form, setForm] = useState(false)
  const [tipo, setTipo] = useState('Alfanumérica')
  const [valor, setValor] = useState('')
  const [ok, setOk] = useState(false)

  const registrar = () => {
    const v = valor.startsWith('@') ? valor : '@' + valor
    setLlaves([...llaves, { id: 'n' + llaves.length, tipo, valor: v, estado: 'Pendiente' }])
    setForm(false)
    setValor('')
    setOk(true)
    setTimeout(() => setOk(false), 2200)
  }

  return (
    <div className="min-h-full bg-bdb-fondo">
      <ScreenHeader title="Mis llaves" onBack={onBack} />

      <div className="p-4 space-y-3">
        {ok && (
          <div className="rounded-xl bg-green-50 text-green-700 px-4 py-3 text-[14px] font-semibold flex items-center gap-2">
            <Check size={18} /> Llave registrada correctamente
          </div>
        )}

        {llaves.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4">
            <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-bdb-azul shrink-0 text-[15px] font-extrabold">
              @
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-bdb-texto truncate">{l.valor}</p>
              <p className="text-[13px] text-bdb-gris">{l.tipo}</p>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                l.estado === 'Activa' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-[#B45309]'
              }`}
            >
              {l.estado}
            </span>
          </div>
        ))}

        {!form ? (
          <button
            onClick={() => setForm(true)}
            className="w-full rounded-xl py-4 text-[17px] font-bold bg-bdb-azul text-white active:bg-bdb-azulMedio"
          >
            Registrar nueva llave
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-bold text-bdb-texto">Nueva llave</p>
              <button onClick={() => setForm(false)} className="text-gray-400"><X size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TIPOS_LLAVE.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold border-2 ${
                    tipo === t
                      ? 'border-bdb-azul bg-blue-50 text-bdb-azul'
                      : 'border-gray-200 bg-white text-bdb-gris'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="@millave"
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px]"
            />
            <button
              onClick={registrar}
              disabled={valor.length < 3}
              className={`w-full rounded-xl py-3.5 text-[16px] font-bold ${
                valor.length < 3 ? 'bg-gray-200 text-gray-500' : 'bg-bdb-azul text-white'
              }`}
            >
              Registrar llave
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
