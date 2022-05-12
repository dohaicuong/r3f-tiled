import { Typography } from '@mui/material'
import { Html } from '@react-three/drei'
import { SpriteProps } from '@react-three/fiber'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Sprite } from 'three'
import { AnimatedSprite } from '../common/AnimatedSprite'
import { collidableFamily } from '../atoms/collidable'

type AnvilProps = SpriteProps & {
  atom_id: string
}

const Anvil: React.FC<AnvilProps> = ({ atom_id, ...props }) => {
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
        args: [1, 1, 1]
      }}
      currentTextureRow={0}
      textureAtlas={{
        tileset: 'anvil.png',
        tileSize: [16, 16],
        columns: 1,
      }}
    >
      <Html position={[-0.15, 1, 0]}>
        <Typography
          style={{
            color: '#ffe100',
            fontWeight: 900,
            fontSize: 25,
            textShadow: '0px 1px 4px black',
          }}
        >
          !
        </Typography>
      </Html>
    </AnimatedSprite>
  )
}

export default Anvil
