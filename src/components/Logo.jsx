// Símbolo real del banco (imagen con fondo transparente).
export function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src="/symbol.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}

// Logo horizontal completo: texto "Banco de Bogotá" + símbolo.
// variant: 'azul' (login) | 'blanco' (header oscuro)
export function LogoFull({ variant = 'azul', size = 28 }) {
  const color = variant === 'blanco' ? '#FFFFFF' : '#14327D'
  return (
    <div className="flex items-center gap-2 select-none">
      <span
        className="font-extrabold tracking-tight leading-none"
        style={{ color, fontSize: size }}
      >
        Banco de Bogotá
      </span>
      <LogoMark size={size * 1.45} />
    </div>
  )
}
