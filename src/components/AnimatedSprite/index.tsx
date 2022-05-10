import { useTexture } from "@react-three/drei"
import { BoxGeometryProps, SpriteMaterialProps, SpriteProps } from "@react-three/fiber"
import { useMemo } from "react"
import { useAnimateTileRow } from "./useAnimateTileRow"
import { useRenderSprite } from "./useRenderSprite"

type AnimatedSpriteProps = {
  spriteProps?: SpriteProps
  geometryProps?: BoxGeometryProps
  materialProps?: Omit<SpriteMaterialProps, 'map'>
  textureData: TextureData
}
  
type TextureData = {
  tileset: string
  tileSize: [number, number]
  columns: number
  frameRate?: number
  currentRow?: number
}

export const AnimatedSprite: React.FC<AnimatedSpriteProps> = ({
  textureData: {
    tileset,
    tileSize,
    columns,
    frameRate,
    currentRow = 0,
  },
  spriteProps,
  geometryProps,
  materialProps,
}) => {
  const texture = useTexture(`assets/${tileset}`)
  const map = useMemo(() => texture.clone(), [])

  useRenderSprite(map, tileSize, currentRow)

  useAnimateTileRow(map, tileSize, columns, frameRate)

  return (
    <sprite {...spriteProps}>
      <spriteMaterial map={map} {...materialProps} />
      <boxGeometry {...geometryProps} />
    </sprite>
  )
}
