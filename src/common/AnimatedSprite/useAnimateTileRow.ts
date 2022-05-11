import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Texture } from 'three'

export const useAnimateTileRow = (
  map: Texture,
  tileSize: [number, number],
  columns: number,
  frameRate = 250,
) => {
  const interval = useRef<number>()
  const currentFrame = useRef<number>(0)
  
  useFrame(({ clock }) => {
    if (columns < 2) return
    if (interval.current === undefined) interval.current = clock.oldTime
    
    const frameWidth = tileSize[0]
    if (clock.oldTime >= interval.current + frameRate) {
      interval.current = clock.oldTime

      currentFrame.current++
      map.offset.x = (currentFrame.current % (columns - 1)) * frameWidth / map.image.width
    }
  })
}
