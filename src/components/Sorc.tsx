import { useEffect, useMemo, useRef } from 'react'
import { SpriteProps, useFrame } from '@react-three/fiber'
import { Box2, BoxGeometry, BoxHelper, Sprite, Vector2 } from 'three'

import { AnimatedSprite } from '../common/AnimatedSprite'
import { PlayerInputSchema, usePlayerInput } from '../common/usePlayerInput'
import { useMapTileRow, AnimationSchema } from '../common/useMapTileRow'

import { useAudio } from 'react-use'
import atkSound from '../../assets/sword.mp3'
import { Html, useHelper } from '@react-three/drei'
import { useAtom, useAtomValue } from 'jotai'
import { collidableFamily } from '../families/collidable'
import { useHitBox } from '../common/useHitBox'

type SorcProps = SpriteProps & {
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
}

const inputSchema: PlayerInputSchema = {
  attack: 'j',

  walk_up: 'w',
  walk_right: 'd',
  walk_left: 'a',
  walk_down: 's',
}

const Sorc: React.FC<SorcProps> = ({
  name,
  moveSpeed = 5,
  ...props
}) => {
  const [action, direction, acceleration] = usePlayerInput(inputSchema)
  const animationRow = useMapTileRow(animationSchema, action, direction, 11)

  const [playerPos, setPlayerPos] = useAtom(collidableFamily({ id: 'player' }))
  const ref = useRef<Sprite>(null!)
  const girlHitBox = useHitBox('girl')
  useFrame((_, delta) => {
    if (action === 'walk') {
      const newPos = [
        ref.current.position.x + acceleration[0] * delta,
        ref.current.position.y + acceleration[1] * delta
      ]

      const playerHitBox = new Box2(
        new Vector2(newPos[0] - playerPos.width, newPos[1]),
        new Vector2(newPos[0], newPos[1] + playerPos.height)
      )

      const isCollided = playerHitBox.intersectsBox(girlHitBox)
      if (isCollided) return

      ref.current.position.x = newPos[0]
      ref.current.position.y = newPos[1]
      setPlayerPos({
        x: newPos[0],
        y: newPos[1],
        width: 1,
        height: 1,
      })
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
          {name}
        </Html>
      </AnimatedSprite>
      <Html>{attackAudio}</Html>
    </>
  )
}

export default Sorc
