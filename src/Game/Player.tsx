import { useRef } from 'react'
import { SpriteProps } from '@react-three/fiber'
import { Sprite } from 'three'
import { Html } from '@react-three/drei'
import { Paper, Typography } from '@mui/material'

import { AnimatedSprite } from '../common/AnimatedSprite'
import { PlayerInputSchema, usePlayerInput } from '../common/usePlayerInput'
import { useMapTileRow, AnimationSchema } from '../common/useMapTileRow'

import { useWhenPlayerWalk } from './useWhenPlayerWalk'
import { useWhenPlayerAttack } from './useWhenPlayerAttack'
import { useWhenPlayerInteract } from '../common/useWhenPlayerInteract'

type SorcProps = SpriteProps & {
  atom_id: string
  name: string
  moveSpeed?: number
}

const animationSchema: AnimationSchema = {
  attack_up: 0,
  attack_right: 1,
  attack_left: 2,
  attack_down: 3,

  walk_up: 4,
  walk_right: 5,
  walk_left: 6,
  walk_down: 7,

  idle_up: 8,
  idle_right: 9,
  idle_left: 10,
  idle_down: 11,

  interact_up: 8,
  interact_right: 9,
  interact_left: 10,
  interact_down: 11,
}

const inputSchema: PlayerInputSchema = {
  interact: 'q',

  attack: 'j',

  walk_up: 'w',
  walk_right: 'd',
  walk_left: 'a',
  walk_down: 's',
}

const Sorc: React.FC<SorcProps> = ({
  atom_id,
  name,
  moveSpeed = 5,
  ...props
}) => {
  const [action, direction, acceleration] = usePlayerInput(inputSchema)
  const animationRow = useMapTileRow(animationSchema, action, direction, 11)

  const ref = useRef<Sprite>(null!)
  useWhenPlayerWalk(atom_id, ref, action, acceleration)

  const [attackAudio] = useWhenPlayerAttack(action)

  const [isInteractWithGirl] = useWhenPlayerInteract(atom_id, 'girl', action)

  const [isInteractWithAvil] = useWhenPlayerInteract(atom_id, 'anvil', action)

  return (
    <>
      <AnimatedSprite
        spriteProps={{
          ...props,
          ref,
        }}
        geometryProps={{
          args: [3, 3, 1]
        }}
        currentTextureRow={animationRow}
        textureAtlas={{
          tileset: 'sorc.png',
          tileSize: [48, 48],
          columns: 4,
        }}
      >
        <Html position={[-0.4, 1, 0]}>
          <Typography
            style={{
              color: '#ffe100',
              fontWeight: 900,
              fontSize: 25,
              textShadow: '0px 1px 4px black',
            }}
          >
            {name}
          </Typography>
        </Html>
      </AnimatedSprite>

      <Html>{attackAudio}</Html>

      {isInteractWithGirl && (
        <Html>
          <Paper>
            <Typography variant='h4'>
              Hello
            </Typography>
          </Paper>
        </Html>
      )}

      {isInteractWithAvil && (
        <Html>
          <Paper>
            <Typography variant='body1'>
              Something that u need to read
            </Typography>
          </Paper>
        </Html>
      )}
    </>
  )
}

export default Sorc
