// import * as THREE from 'three'
// import { createRoot, extend, events } from '@react-three/fiber'

// import { Provider as StateProvider } from 'jotai'

// import App from './App'

// extend(THREE)

// const root = createRoot(document.getElementById('root')!)

// window.addEventListener('resize', () => {
//   root.configure({
//     events,
//     camera: { position: [0, 0, 40], fov: 30 },
//     size: { width: window.innerWidth, height: window.innerHeight }
//   })
//   root.render(
//     <StateProvider>
//       <App />
//     </StateProvider>
//   )
// })

// window.dispatchEvent(new Event('resize'))

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CharacterCreationPage from './routes/CharacterCreationPage'
import GamePage from './routes/GamePage'
import MapSelectionPage from './routes/MapSelectionPage'

const root = createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CharacterCreationPage />} />
      <Route path='/select-map' element={<MapSelectionPage />} />
      <Route path='/game' element={<GamePage />} />
    </Routes>
  </BrowserRouter>
)
