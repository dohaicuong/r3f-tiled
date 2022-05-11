import { Html } from '@react-three/drei'
import { SpriteProps } from '@react-three/fiber'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Sprite } from 'three'
import { AnimatedSprite } from '../common/AnimatedSprite'
import { collidableFamily } from '../families/collidable'

type GirlProps = SpriteProps

const Girl: React.FC<GirlProps> = props => {
  const setPos = useSetAtom(collidableFamily({ id: 'girl' }))

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
        args: [1, 1.5, 1]
      }}
      currentTextureRow={3}
      textureAtlas={{
        tileset: 'npc_girl.png',
        tileSize: [16, 24],
        columns: 4,
      }}
    >
      <Html position={[-0.1, 1, 0]}>
        <span
          style={{
            color: '#c98f19',
            fontWeight: 900,
            fontSize: 25,
          }}
        >
          ?
        </span>
      </Html>
    </AnimatedSprite>
  )
}

export default Girl
