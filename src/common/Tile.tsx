import { useTexture } from '@react-three/drei'
import { useEffect, useMemo } from 'react'

type TileProps = {
  position: [number, number]

  source: string
  tileId: number
  tileWidth: number
  tileHeight: number
}

export const Tile: React.FC<TileProps> = ({
  position,
  source,
  tileId,
  tileWidth,
  tileHeight,
}) => {
  const texture = useTexture(`assets/${source}`)
  const map = useMemo(() => texture.clone(), [])

  useEffect(() => {
    if (tileId === 0) return

    const imageWidth = map.image.width
    const imageHeight = map.image.height
    const tileOnRow = imageWidth / tileWidth

    const xIndex = tileId % tileOnRow - 1
    const yIndex = tileOnRow - parseInt(String(tileId / tileOnRow)) - 1

    map.repeat.x = 1 / (imageWidth / tileWidth)
    map.repeat.y = 1 / (imageHeight / tileHeight)

    map.offset.x = xIndex * tileWidth / imageWidth
    map.offset.y = yIndex * tileHeight / imageHeight
  }, [])

  if (tileId === 0) return null

  return (
    <sprite position={[...position, 0] as any} scale={1}>
      <spriteMaterial map={map} />
    </sprite>
  )
}
