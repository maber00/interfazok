import { useState } from 'react'
import { LogoFull } from '../components/Logo.jsx'
import { Eye, EyeOff, X, ChevronDown } from '../components/Icons.jsx'
import { signIn } from '../lib/auth.js'

export default function Login({ onSuccess }) {
  const [tab, setTab] = useState('clave')
  const [docTipo, setDocTipo] = useState('C.C.')
  const [doc, setDoc] = useState('')
  const [clave, setClave] = useState('')
  const [showClave, setShowClave] = useState(false)
  const [info, setInfo] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = doc.trim().length > 0 && clave.trim().length > 0 && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setLoading(true)
    // Spinner para el efecto visual
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    if (signIn(doc, clave)) onSuccess()
    else setError('Documento o clave incorrectos. Verifica tus datos.')
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-white px-6 pt-10 pb-6">
      {/* Logo */}
      <LogoFull variant="azul" size={24} />

      {/* Título */}
      <h1 className="mt-7 text-[28px] leading-tight font-extrabold text-bdb-texto">
        Bienvenido a tu Banca Virtual
      </h1>

      <div
        className="mt-5 rounded-2xl text-white p-4 flex items-center gap-3"
        style={{ background: 'linear-gradient(160deg, #1A4BAF 0%, #2563EB 60%, #3B82F6 100%)' }}
      >
        <p className="text-[15px] font-semibold leading-snug">
          ¿Nunca has ingresado a Banca Virtual?
          <br />
          Aquí te decimos cómo hacerlo ›
        </p>
      </div>

      {/* Card de ingreso */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Tabs */}
        <div className="grid grid-cols-2 text-center">
          {[
            { id: 'clave', label: 'Clave segura' },
            { id: 'tarjeta', label: 'Tarjeta débito' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-4 text-[17px] font-bold relative ${
                tab === t.id ? 'text-bdb-azul' : 'text-bdb-texto'
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-4/5 bg-bdb-azul rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="h-px bg-gray-200" />

        {/* Aviso info */}
        {info && (
          <div className="bg-bdb-azulClaro px-5 py-4 flex items-start gap-3">
            <p className="text-[14px] text-bdb-texto leading-snug flex-1">
              Estás ingresando con tu Clave Segura. Selecciona ‘Tarjeta Débito’
              para cambiar el tipo de ingreso.
            </p>
            <button onClick={() => setInfo(false)} className="text-bdb-azul shrink-0">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-5 py-6">
          <label className="block text-[15px] font-semibold text-bdb-texto mb-2">
            Identificación
          </label>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <div className="relative">
              <select
                value={docTipo}
                onChange={(e) => setDocTipo(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-xl px-3 py-3.5 text-[16px] font-semibold text-bdb-texto bg-white"
              >
                <option>C.C.</option>
                <option>C.E.</option>
                <option>NIT</option>
                <option>Pas.</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-bdb-azul">
                <ChevronDown size={20} />
              </span>
            </div>
            <input
              inputMode="numeric"
              value={doc}
              onChange={(e) => setDoc(e.target.value.replace(/[^\d.]/g, ''))}
              placeholder="#"
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[16px] text-bdb-texto placeholder:text-gray-400"
            />
          </div>

          <label className="block text-[15px] font-semibold text-bdb-texto mt-5 mb-2">
            {tab === 'clave' ? 'Clave segura' : 'Clave de cajero (4 dígitos)'}
          </label>
          <div className="relative">
            <input
              type={showClave ? 'text' : 'password'}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="····"
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 text-[16px] text-bdb-texto placeholder:text-gray-400 tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowClave((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bdb-azul"
            >
              {showClave ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-[13px] text-bdb-rojo font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`mt-6 w-full rounded-xl py-4 text-[17px] font-bold transition-colors flex items-center justify-center gap-2 ${
              canSubmit
                ? 'bg-bdb-azul text-white active:bg-bdb-azulMedio'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Ingresando…
              </>
            ) : (
              'Ingresar'
            )}
          </button>

          <div className="mt-5 flex items-center justify-center gap-4 text-[16px] font-bold text-bdb-azul">
            <button type="button">Registrarme ›</button>
            <span className="w-px h-5 bg-gray-300" />
            <button type="button">Olvidé mi clave ›</button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-[12px] leading-snug text-bdb-gris">
        Este sitio está protegido por reCAPTCHA y aplican las{' '}
        <span className="text-bdb-azul">políticas de privacidad</span> y los{' '}
        <span className="text-bdb-azul">términos de servicio</span> de Google.
      </p>
      <p className="mt-3 text-[11px] text-gray-400 text-center">
        Contenido ficticio para producción audiovisual
      </p>
    </div>
  )
}