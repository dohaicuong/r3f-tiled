import { Suspense } from 'react'

import { TileMap } from './components/TileMap'
import mapData from './map.json'
import Menu from './Menu'
import Sorc from './Sorc'

import useSound from "use-sound"
import { useKey } from 'react-use'
import atkSound from '../assets/sword.mp3'

const App = () => {
  const [play] = useSound(atkSound, { volume: 1 })
  const atk = () => {
    console.log('attack')
    play()
  }
  useKey('j', atk)

  return (
    <Suspense fallback={null}>
      <Menu />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc
        action='idle_down'
        position={[2, 1, 0]}
        scale={1}
      />
    </Suspense>
  )
}

export default App
