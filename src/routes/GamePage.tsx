import { Canvas } from '@react-three/fiber'
import { Provider as StateProvider } from 'jotai'
import Game from '../Game'

const GamePage = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 40],
        fov: 30
      }}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <StateProvider>
        <Game />
      </StateProvider>
    </Canvas>
  )
}

export default GamePage
