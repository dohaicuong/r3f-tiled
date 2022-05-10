import { Suspense, useEffect, useState } from 'react'

import { TileMap } from './common/TileMap'
import mapData from './map.json'
import Menu from './components/Menu'
import Sorc from './components/Sorc'

import { useKey, useAudio, usePrevious } from 'react-use'
import atkSound from '../assets/sword.mp3'
import { Html } from '@react-three/drei'
import { useAction } from './utils/hooks/useAction'
import { useMove } from './utils/hooks/useMove'
import { Posture, usePosture } from './utils/hooks/usePosture'

const App = () => {
  const [audio, , controls] = useAudio({ src: atkSound, loop: false });
  const [position, setPosition] = useState([2, 1]);
  const [posture, setPosture] = useState(Posture.idle_down)
  const actions = useAction();
  const prevActions = usePrevious(actions);

 
  const atk = async () => {
    console.log('attack')

    controls.seek(0)
    controls.play()
  }
  useKey('j', atk)

  useEffect(() => {
    useMove(actions, setPosition, 0.07);
    usePosture(prevActions || [], actions, setPosture);
  }, [actions]);

  return (
    <Suspense fallback={null}>
      <Menu />
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Sorc
        posture={posture}
        position={[position[0], position[1], 0]}
        scale={1}
      />
      <Html>{audio}</Html>
    </Suspense>
  )
}

export default App
