import { useEffect } from 'react'
import { Texture } from 'three'

export const useRenderSprite = (
  map: Texture,
  tileSize: [number, number],
  currentRow: number = 0,
) => {
  useEffect(() => {
    const frameWidth = tileSize[0]
    const frameHeight = tileSize[1]
    const yFrame = currentRow

    map.repeat.x = 1 / (map.image.width / frameWidth)
    map.repeat.y = 1 / (map.image.height / frameHeight)
    
    map.offset.x = 0 * frameWidth / map.image.width
    map.offset.y = yFrame * frameHeight / map.image.height
  }, [])
}
