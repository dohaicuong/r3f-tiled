import { SpriteProps } from '@react-three/fiber'
import { AnimatedSprite } from './components/AnimatedSprite'
import { TileMap } from './components/TileMap'
import mapData from './map.json'
import Sorc from './Sorc'

const App = () => {
  return (
    <>
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc
        action='idle_up'
        position={[2, 1, 0]}
        scale={1}
      />
    </>
  )
}

export default App
