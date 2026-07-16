import { Back } from './Icons.jsx'

export default function ScreenHeader({ title, onBack, children }) {
  return (
    <div
      className="relative text-white rounded-b-[24px] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1A4BAF 0%, #2563EB 60%, #3B82F6 100%)' }}
    >
      <div className="relative px-4 py-5 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="-ml-1 p-1">
            <Back size={26} />
          </button>
        )}
        <h1 className="text-[20px] font-bold">{title}</h1>
      </div>
      {children}
    </div>
  )
}