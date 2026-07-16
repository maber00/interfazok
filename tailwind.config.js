/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bdb: {
          azul: '#14327D',       // azul principal
          azulMedio: '#1A3F9A',  // hover
          azulClaro: '#EAF1FB',  // fondos info / banner suave
          rojo: '#CD3232',       // símbolo / alertas
          dorado: '#EBB932',     // símbolo
          fondo: '#F0F2F5',      // fondo app
          texto: '#1A1A1A',      // texto principal
          gris: '#6B7280'        // texto secundario
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        card: '0 2px 12px rgba(20,50,125,0.08)',
        nav: '0 -2px 14px rgba(0,0,0,0.18)'
      }
    }
  },
  plugins: []
}
