import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { LinearMipMapLinearFilter, NearestFilter } from 'three'
import { TileMap } from './components/TileMap'
import mapData from './map.json'

const App = () => {
  return (
    <>
      <TileMap
        padding={[-14, -11]}
        tileset='tileset.png'
        data={mapData}
      />
      <Player />
    </>
  )
}

export default App

const Player = () => {
  const texture = useTexture(`assets/elf_idle.png`)
  const map = useMemo(() => texture.clone(), [])

  useEffect(() => {
    const frameWidth = 16
    const frameHeight = 24
    const xFrame = 0
    const yFrame = 3

    // map.magFilter = NearestFilter
    map.minFilter = LinearMipMapLinearFilter

    map.repeat.x = 1 / (map.image.width / frameWidth)
    map.repeat.y = 1 / (map.image.height / frameHeight)
    
    map.offset.x = xFrame * frameWidth / map.image.width
    map.offset.y = yFrame * frameHeight / map.image.height
  }, [])

  const interval = useRef<number>()
  const currentFrame = useRef<number>(0)
  useFrame(({ clock }) => {
    if (interval.current === undefined) interval.current = clock.oldTime
    
    const frameRate = 250
    const frameWidth = 16
    if (clock.oldTime >= interval.current + frameRate) {
      interval.current = clock.oldTime
      currentFrame.current++

      map.offset.x = (currentFrame.current % 4) * frameWidth / map.image.width
    }
  })

  return (
    <sprite position={[2, 1, 0] as any} scale={1}>
      <spriteMaterial map={map} />
      <boxGeometry args={[1, 1.5, 1]} />
    </sprite>
  )
}
