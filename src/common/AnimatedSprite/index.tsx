import { Html, useTexture } from '@react-three/drei'
import { BoxGeometryProps, SpriteMaterialProps, SpriteProps } from '@react-three/fiber'
import { useMemo } from 'react'
import { useAnimateTileRow } from './useAnimateTileRow'
import { useRenderSprite } from './useRenderSprite'

type AnimatedSpriteProps = {
  spriteProps?: SpriteProps
  geometryProps?: BoxGeometryProps
  materialProps?: Omit<SpriteMaterialProps, 'map'>
  textureAtlas: TextureAtlas
  currentTextureRow?: number
  children?: React.ReactNode
}
  
type TextureAtlas = {
  tileset: string
  tileSize: [number, number]
  columns: number
  frameRate?: number
}

export const AnimatedSprite: React.FC<AnimatedSpriteProps> = ({
  currentTextureRow = 0,
  textureAtlas,
  spriteProps,
  geometryProps,
  materialProps,
  children
}) => {
  const texture = useTexture(`assets/${textureAtlas.tileset}`)
  const map = useMemo(() => texture.clone(), [])

  useRenderSprite(map, textureAtlas.tileSize, currentTextureRow)

  useAnimateTileRow(map, textureAtlas.tileSize, textureAtlas.columns, textureAtlas.frameRate)

  return (
    <sprite {...spriteProps}>
      <spriteMaterial map={map} {...materialProps} />
      <boxGeometry {...geometryProps} />
      {children}
    </sprite>
  )
}
