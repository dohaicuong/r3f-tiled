import { Suspense } from 'react'

import { TileMap } from './common/TileMap'
import mapData from './map.json'
import Menu from './components/Menu'
import Sorc from './components/Sorc'

import useSound from "use-sound"
import { useKey, useAudio } from 'react-use'
import atkSound from '../assets/sword.mp3'

const App = () => {
  const [audio, , controls] = useAudio({ src: atkSound, loop: false })
  const atk = async () => {
    console.log('attack')
    await controls.play()
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
