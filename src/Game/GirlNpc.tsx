import { Typography } from '@mui/material'
import { Html } from '@react-three/drei'
import { SpriteProps } from '@react-three/fiber'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Sprite } from 'three'
import { AnimatedSprite } from '../common/AnimatedSprite'
import { collidableFamily } from '../atoms/collidable'
import girlTileset from '../../assets/npc_girl.png'

type GirlProps = SpriteProps & {
  atom_id: string
  hasQuest: boolean
}

const Girl: React.FC<GirlProps> = ({ atom_id, hasQuest, ...props }) => {
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
        args: [1, 1.5, 1]
      }}
      currentTextureRow={3}
      textureAtlas={{
        tileset: girlTileset,
        tileSize: [16, 24],
        columns: 4,
      }}
    >
      {hasQuest && (
        <Html position={[-0.15, 1, 0]}>
          <Typography
            style={{
              color: '#ffe100',
              fontWeight: 900,
              fontSize: 25,
              textShadow: '0px 1px 4px black',
            }}
          >
            ?
          </Typography>
        </Html>    
      )}
    </AnimatedSprite>
  )
}

export default Girl
