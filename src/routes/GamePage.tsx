import { Canvas } from '@react-three/fiber'
import { Provider as StateProvider, useAtom } from 'jotai'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../atoms/auth';

import Game from '../Game'

const GamePage = () => {

  const navigate = useNavigate();
  const [auth, useAuth] = useAtom(authAtom);

  useEffect(() => {
    if (!auth.data.jwt) {
      navigate('/');
    }
  }, [auth]);

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
