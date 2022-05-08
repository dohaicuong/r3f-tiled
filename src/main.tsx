import * as THREE from 'three'
import { createRoot, extend, events } from '@react-three/fiber'

import App from './App'

extend(THREE)

const root = createRoot(document.getElementById('root')!)

window.addEventListener('resize', () => {
  root.configure({
    events,
    camera: { position: [0, 0, 40], fov: 30 },
    size: { width: window.innerWidth, height: window.innerHeight }
  })
  root.render(<App />)
})

window.dispatchEvent(new Event('resize'))
