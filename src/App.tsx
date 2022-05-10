import { SpriteProps } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimatedSprite } from './components/AnimatedSprite'
import { TileMap } from './components/TileMap'
import mapData from './map.json'
import Sorc from './Sorc'
import { useAction } from './utils/hooks/useAction'

const App = () => {
  const action = useAction();
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    if (action) {
      switch(action) {
        case 'left': setPosition([position[0]-1, position[1]]); break;
        case 'right': setPosition([position[0]+1, position[1]]); break;
        case 'down': setPosition([position[0], position[1]-1]); break;
        case 'up': setPosition([position[0], position[1]+1]); break;
      }
    }
  }, [action]);
  return (
    <>
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc
        action='idle_up'
        position={[...position, 0]}
        scale={1}
      />
    </>
  )
}

export default App
