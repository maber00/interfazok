import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './screens/Login.jsx'
import Home from './screens/Home.jsx'
import PagarTransferir from './screens/PagarTransferir.jsx'
import BreB from './screens/BreB.jsx'
import Documentos from './screens/Documentos.jsx'
import MenuScreen from './screens/MenuScreen.jsx'
import BottomNav from './components/BottomNav.jsx'

const SCREENS = {
  home: Home,
  pagar: PagarTransferir,
  breb: BreB,
  documentos: Documentos,
  menu: MenuScreen
}

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [screen, setScreen] = useState('home')

  const handleLogout = () => {
    setAuthed(false)
    setScreen('home')
  }

  const Current = SCREENS[screen] || Home

  return (
    <div className="mx-auto max-w-[460px] h-full bg-bdb-fondo relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {!authed ? (
          <motion.div
            key="login"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Login onSuccess={() => { setAuthed(true); setScreen('home') }} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={screen}
                  className="absolute inset-0 overflow-y-auto no-scrollbar"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <Current go={setScreen} onLogout={handleLogout} />
                </motion.div>
              </AnimatePresence>
            </div>
            <BottomNav active={screen} go={setScreen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
