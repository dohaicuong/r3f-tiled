import { useEffect, useRef } from 'react'
import { SpriteProps, useFrame } from '@react-three/fiber'
import { Box2, BoxGeometry, BoxHelper, Sprite, Vector2 } from 'three'

import { AnimatedSprite } from '../common/AnimatedSprite'
import { PlayerInputSchema, usePlayerInput } from '../common/usePlayerInput'
import { useMapTileRow, AnimationSchema } from '../common/useMapTileRow'

import { useAudio } from 'react-use'
import atkSound from '../../assets/sword.mp3'
import { Html, useHelper } from '@react-three/drei'

type SorcProps = SpriteProps & {
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
}

const inputSchema: PlayerInputSchema = {
  attack: 'j',

  walk_up: 'w',
  walk_right: 'd',
  walk_left: 'a',
  walk_down: 's',
}

const Sorc: React.FC<SorcProps> = ({
  moveSpeed = 5,
  ...props
}) => {
  const [action, direction, acceleration] = usePlayerInput(inputSchema)
  const animationRow = useMapTileRow(animationSchema, action, direction, 11)

  const ref = useRef<Sprite>(null!)
  useFrame((_, delta) => {
    if (action === 'walk') {
      ref.current.position.x += acceleration[0] * delta
      ref.current.position.y += acceleration[1] * delta
    }
  })

  const [attackAudio, , attackAudioControls] = useAudio({ src: atkSound, loop: false })
  useEffect(() => {
    if (action === 'attack') {
      attackAudioControls.seek(0)
      attackAudioControls.play()
    }
  }, [action])

  // useEffect(() => {
  //   const mesh = ref.current

  //   const hitbox = new Box2()
  //   hitbox.setFromCenterAndSize(
  //     new Vector2(mesh.position.x, mesh.position.y),
  //     new Vector2(1, 1)
  //   )

  //   const isHit = hitbox.intersectsBox()

  // }, [])

  return (
    <group>
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
      />
      <Html>{attackAudio}</Html>
    </group>
  )
}

export default Sorc
