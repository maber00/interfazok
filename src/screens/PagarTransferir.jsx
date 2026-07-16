import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import {
  Transfer, Dollar, QR, Phone, Card, Chevron, Back, Check
} from '../components/Icons.jsx'
import { CUENTA, BANCOS, NOMBRES_BENEF, cop } from '../data/mock.js'

const opciones = [
  { id: 'cuenta', Icon: Transfer, label: 'Transferir a cuenta' },
  { id: 'servicios', Icon: Dollar, label: 'Pagar servicios' },
  { id: 'breb', Icon: Transfer, label: 'Transferir por Bre-B' },
  { id: 'qr', Icon: QR, label: 'Pagar con QR' },
  { id: 'recarga', Icon: Phone, label: 'Recargar celular' },
  { id: 'tarjeta', Icon: Card, label: 'Pagar tarjeta de crédito' }
]

export default function PagarTransferir({ go }) {
  const [flow, setFlow] = useState(false)

  if (flow) return <TransferFlow onClose={() => setFlow(false)} go={go} />

  return (
    <div className="min-h-full bg-bdb-fondo">
      <ScreenHeader title="Pagar y Transferir" />
      <div className="p-4 space-y-3">
        {opciones.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => id === 'cuenta' ? setFlow(true) : null}
            className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 active:bg-gray-50"
          >
            <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-bdb-azul shrink-0">
              <Icon size={22} />
            </span>
            <span className="flex-1 text-left text-[16px] font-semibold text-bdb-texto">
              {label}
            </span>
            <Chevron size={20} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- Flujo de transferencia ----------
function TransferFlow({ onClose, go }) {
  const [step, setStep] = useState(1)
  const [tipo, setTipo] = useState('bdb')
  const [banco, setBanco] = useState(BANCOS[0])
  const [cuentaDest, setCuentaDest] = useState('')
  const [benef, setBenef] = useState('')
  const [monto, setMonto] = useState(0)
  const [desc, setDesc] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [comprobante] = useState('BDB' + Math.floor(Math.random() * 9000000 + 1000000))

  const onCuentaChange = (v) => {
    const num = v.replace(/\D/g, '')
    setCuentaDest(num)
    if (num.length >= 6) {
      setBenef(NOMBRES_BENEF[parseInt(num.slice(-1)) % NOMBRES_BENEF.length])
    } else setBenef('')
  }

  const back = () => (step > 1 ? setStep(step - 1) : onClose())

  return (
    <div className="min-h-full bg-bdb-fondo">
      <div
        className="text-white rounded-b-[24px] px-4 py-5 flex items-center gap-3"
        style={{ background: 'linear-gradient(160deg, #1A4BAF 0%, #2563EB 60%, #3B82F6 100%)' }}
      >
        <button onClick={back} className="-ml-1 p-1"><Back size={26} /></button>
        <h1 className="text-[20px] font-bold">Transferir a cuenta</h1>
      </div>

      {/* Indicador de pasos */}
      {step < 7 && (
        <div className="flex items-center justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span
              key={n}
              className={`h-2 rounded-full transition-all ${
                n === step ? 'w-6 bg-bdb-dorado' : n < step ? 'w-2 bg-bdb-azul' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Paso 1: cuenta origen */}
        {step === 1 && (
          <>
            <p className="text-[15px] font-bold text-bdb-texto">Cuenta origen</p>
            <div className="rounded-2xl bg-bdb-azul text-white p-5">
              <p className="text-[13px] text-white/80">{CUENTA.nombre}</p>
              <p className="text-[15px] font-semibold tracking-wider">{CUENTA.numeroCorto}</p>
              <p className="mt-3 text-[12px] text-white/70">Saldo disponible</p>
              <p className="text-[26px] font-extrabold">{cop(CUENTA.saldoDisponible)}</p>
            </div>
            <Boton onClick={() => setStep(2)}>Continuar</Boton>
          </>
        )}

        {/* Paso 2: tipo destino */}
        {step === 2 && (
          <>
            <p className="text-[15px] font-bold text-bdb-texto">¿A dónde transfieres?</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'bdb', label: 'Banco de Bogotá' },
                { id: 'otro', label: 'Otro banco' }
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setTipo(o.id)}
                  className={`rounded-xl border-2 p-4 text-[14px] font-bold ${
                    tipo === o.id
                      ? 'border-bdb-azul bg-blue-50 text-bdb-azul'
                      : 'border-gray-200 bg-white text-bdb-texto'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {tipo === 'otro' && (
              <Campo label="Banco destino">
                <select
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px] bg-white"
                >
                  {BANCOS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Campo>
            )}
            <Boton onClick={() => setStep(3)}>Continuar</Boton>
          </>
        )}

        {/* Paso 3: cuenta destino + beneficiario */}
        {step === 3 && (
          <>
            <Campo label="Número de cuenta destino">
              <input
                inputMode="numeric"
                value={cuentaDest}
                onChange={(e) => onCuentaChange(e.target.value)}
                placeholder="Ej: 123 456 7890"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px]"
              />
            </Campo>
            <Campo label="Nombre del beneficiario">
              <input
                value={benef}
                onChange={(e) => setBenef(e.target.value)}
                placeholder="Se completa automáticamente"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px]"
              />
            </Campo>
            <Boton
              disabled={cuentaDest.length < 5 || !benef}
              onClick={() => setStep(4)}
            >
              Continuar
            </Boton>
          </>
        )}

        {/* Paso 4: monto */}
        {step === 4 && (
          <>
            <div className="rounded-xl bg-blue-50 text-bdb-azul text-center py-3 text-[14px] font-semibold">
              Saldo disponible: {cop(CUENTA.saldoDisponible)}
            </div>
            <Campo label="Monto a transferir">
              <input
                inputMode="numeric"
                value={monto ? cop(monto) : ''}
                onChange={(e) => setMonto(parseInt(e.target.value.replace(/\D/g, '') || '0'))}
                placeholder="$0"
                className="w-full text-center text-[34px] font-extrabold text-bdb-azul border-b-2 border-gray-300 py-3 focus:border-bdb-azul"
              />
            </Campo>
            <Campo label="Descripción (opcional)">
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ej: Pago arriendo"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px]"
              />
            </Campo>
            <Boton
              disabled={monto <= 0 || monto > CUENTA.saldoDisponible}
              onClick={() => setStep(5)}
            >
              {monto > CUENTA.saldoDisponible ? 'Saldo insuficiente' : 'Continuar'}
            </Boton>
          </>
        )}

        {/* Paso 5: confirmación */}
        {step === 5 && (
          <>
            <p className="text-[15px] font-bold text-bdb-texto">Confirma la transferencia</p>
            <div className="rounded-2xl bg-white shadow-card p-5 space-y-3">
              <Fila k="Monto" v={cop(monto)} fuerte />
              <Fila k="Beneficiario" v={benef} />
              <Fila k="Cuenta destino" v={cuentaDest} />
              <Fila k="Banco" v={tipo === 'otro' ? banco : 'Banco de Bogotá'} />
              {desc && <Fila k="Descripción" v={desc} />}
              <Fila k="Desde" v={CUENTA.numeroCorto} />
            </div>
            <Boton onClick={() => setStep(6)}>Confirmar</Boton>
          </>
        )}

        {/* Paso 6: OTP */}
        {step === 6 && (
          <>
            <p className="text-center text-[16px] font-bold text-bdb-azul">
              Ingresa tu token de 6 dígitos
            </p>
            <p className="text-center text-[13px] text-bdb-gris">
              Confirma con tu clave dinámica
            </p>
            <OtpInputs
              value={otp}
              onChange={setOtp}
              onComplete={() => setStep(7)}
            />
          </>
        )}

        {/* Paso 7: éxito */}
        {step === 7 && (
          <div className="flex flex-col items-center text-center pt-8">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-[pop_0.4s_ease]">
              <Check size={54} className="text-white" sw={3} />
            </div>
            <h2 className="mt-5 text-[22px] font-extrabold text-bdb-azul">
              ¡Transferencia exitosa!
            </h2>
            <p className="text-[30px] font-extrabold text-green-600 my-2">{cop(monto)}</p>
            <div className="w-full rounded-2xl bg-white shadow-card p-5 space-y-3 mt-2 text-left">
              <Fila k="Beneficiario" v={benef} />
              <Fila k="Cuenta destino" v={cuentaDest} />
              <Fila k="Banco" v={tipo === 'otro' ? banco : 'Banco de Bogotá'} />
              <Fila k="Comprobante" v={comprobante} />
              <Fila k="Fecha" v={new Date().toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })} />
            </div>
            <Boton onClick={() => { onClose(); go('home') }}>Volver al inicio</Boton>
          </div>
        )}
      </div>

      <style>{`@keyframes pop{0%{transform:scale(0)}100%{transform:scale(1)}}`}</style>
    </div>
  )
}

// ---------- Subcomponentes ----------
function Boton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl py-4 text-[17px] font-bold mt-2 transition-colors ${
        disabled ? 'bg-gray-200 text-gray-500' : 'bg-bdb-azul text-white active:bg-bdb-azulMedio'
      }`}
    >
      {children}
    </button>
  )
}

function Campo({ label, children }) {
  return (
    <div>
      <label className="block text-[14px] font-semibold text-bdb-texto mb-2">{label}</label>
      {children}
    </div>
  )
}

function Fila({ k, v, fuerte }) {
  return (
    <div className="flex justify-between gap-4 text-[14px]">
      <span className="text-bdb-gris">{k}</span>
      <span className={`text-right ${fuerte ? 'font-extrabold text-bdb-azul text-[16px]' : 'font-semibold text-bdb-texto'}`}>
        {v}
      </span>
    </div>
  )
}

function OtpInputs({ value, onChange, onComplete }) {
  const setDigit = (i, d) => {
    const next = [...value]
    next[i] = d.replace(/\D/g, '').slice(-1)
    onChange(next)
    if (next[i] && i < 5) document.getElementById(`otp-${i + 1}`)?.focus()
    if (next.every((x) => x)) setTimeout(onComplete, 350)
  }
  return (
    <div className="flex justify-center gap-2 mt-2">
      {value.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !d && i > 0) document.getElementById(`otp-${i - 1}`)?.focus()
          }}
          className="w-12 h-14 text-center text-[24px] font-extrabold border-2 border-gray-300 rounded-xl text-bdb-azul focus:border-bdb-azul"
        />
      ))}
    </div>
  )
}