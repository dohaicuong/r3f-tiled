import { Suspense, useEffect, useState } from 'react'

import { TileMap } from './common/TileMap'
import mapData from './map.json'
import Menu from './components/Menu'
import Sorc from './components/Sorc'

import useSound from "use-sound"
import { useKey, useAudio } from 'react-use'
import atkSound from '../assets/sword.mp3'
import { Html } from '@react-three/drei'
import { useAction } from './utils/hooks/useAction'
import { useFrame } from '@react-three/fiber'
import { useMultiKeyPress } from './utils/hooks/useInput'

const App = () => {
  const [audio, , controls] = useAudio({ src: atkSound, loop: false });
  const [position, setPosition] = useState([2, 1]);
  const actions = useAction();
 
  const atk = async () => {
    console.log('attack')

    controls.seek(0)
    controls.play()
  }
  useKey('j', atk)

  useFrame(() => {
    if (actions.length > 0) {
      console.log(actions)
      for (const action of actions) {
        switch(action) {
          case 'up': setPosition(position => [position[0], position[1]+0.06]); break;
          case 'down': setPosition(position => [position[0], position[1]-0.06]); break;
          case 'left': setPosition(position => [position[0]-0.06, position[1]]); break;
          case 'right': setPosition(position => [position[0]+0.06, position[1]]); break;
        }
      }
    };
  });

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
        position={[...position, 0]}
        scale={1}
      />
      <Html>{audio}</Html>
    </Suspense>
  )
}

export default App
