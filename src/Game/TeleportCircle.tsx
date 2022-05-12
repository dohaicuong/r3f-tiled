import { SpriteProps } from '@react-three/fiber'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Sprite } from 'three'
import { AnimatedSprite } from '../common/AnimatedSprite'
import { collidableFamily } from '../atoms/collidable'
import teleportTileset from '../../assets/teleport.png'

type TeleportCircleProps = SpriteProps & {
  atom_id: string
}

const TeleportCircle: React.FC<TeleportCircleProps> = ({ atom_id, ...props }) => {
  const setPos = useSetAtom(collidableFamily({ id: atom_id }))

  const ref = useRef<Sprite>(undefined!)
  useEffect(() => {
    setPos({
      x: ref.current.position.x,
      y: ref.current.position.y,
      width: 1,
      height: 1
    })
  }, [])

  return (
    <AnimatedSprite
      spriteProps={{ ...props, scale: 1, ref }}
      geometryProps={{
        args: [2, 1.5, 1]
      }}
      currentTextureRow={0}
      textureAtlas={{
        tileset: teleportTileset,
        tileSize: [27.25, 31],
        columns: 4,
      }}
    >
    </AnimatedSprite>
  )
}

export default TeleportCircle
