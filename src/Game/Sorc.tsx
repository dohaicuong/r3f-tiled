import { useEffect, useRef, useState } from 'react'
import { SpriteProps, useFrame } from '@react-three/fiber'
import { Box2, Sprite, Vector2 } from 'three'

import { AnimatedSprite } from '../common/AnimatedSprite'
import { PlayerInputSchema, usePlayerInput } from '../common/usePlayerInput'
import { useMapTileRow, AnimationSchema } from '../common/useMapTileRow'

import { useAudio } from 'react-use'
import atkSound from '../../assets/sword.mp3'


import { Paper, Typography } from '@mui/material'
import { Html } from '@react-three/drei'
import { useAtom } from 'jotai'
import { collidableFamily, userInfoFamily } from '../families/collidable'
import { useHitBox } from '../common/useHitBox'
import { useMapHitBox } from '../common/useMapHitBox'

import { oneTimeLogin } from '../apis/auth'
import { createOnePlayerUrl, openPopUp } from '../utils/openPopUp'

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
  name,
  moveSpeed = 5,
  ...props
}) => {
  const [action, direction, acceleration] = usePlayerInput(inputSchema)
  const animationRow = useMapTileRow(animationSchema, action, direction, 11)

  const [playerPos, setPlayerPos] = useAtom(collidableFamily({ id: 'player' }))
  const [userInfo, setUserInfo] = useAtom(userInfoFamily({ id: 'player' }))

  const ref = useRef<Sprite>(null!)
  const girlHitBox = useHitBox('girl')
  const mapHitBox = useMapHitBox()
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

      const willInMap = mapHitBox.containsBox(playerHitBox)
      const willCollidedWithGirl = playerHitBox.intersectsBox(girlHitBox)

      const isMovable = [
        willInMap,
        !willCollidedWithGirl
      ].every(condition => condition === true)
      if (!isMovable) return

      ref.current.position.x = newPos[0]
      ref.current.position.y = newPos[1]
      setPlayerPos({
        x: newPos[0], y: newPos[1],
        width: 1, height: 1,
      })
    }
  })

  const [isInteractWithGirl, setIsInteractWithGirl] = useState(false)
  const girlInteractionBox = useHitBox('girl', [0.5, 0.5])
  const playerHitBox = useHitBox('player')
  useEffect(() => {
    const isInteractWithGirl = playerHitBox.intersectsBox(girlInteractionBox)
    if (action === 'interact' && isInteractWithGirl) {
      setIsInteractWithGirl(true)
    }
    if (!isInteractWithGirl) {
      setIsInteractWithGirl(false)
    }
  }, [action])

  const [attackAudio, , attackAudioControls] = useAudio({ src: atkSound, loop: false })
  useEffect(() => {
    if (action === 'attack') {
      attackAudioControls.seek(0)
      attackAudioControls.play()
      const { jwt, mail } = userInfo.data;
      console.log(userInfo.oneTimeToken);
      if (userInfo.oneTimeToken) {
        openPopUp(createOnePlayerUrl('12791396'));
      } else {
        oneTimeLogin(mail || '', jwt || '')
        .then(res => {
          const { data } = res;
          const oneTimeToken = data.one_time_token;
          setUserInfo({oneTimeToken, data: userInfo.data});
          openPopUp(createOnePlayerUrl('12791396', '', oneTimeToken));
        });
      }
    }
  }, [action])

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
      {isInteractWithGirl && (
        <Html>
          <Paper>
            <Typography variant='h4'>
              Hello
            </Typography>
          </Paper>
        </Html>
      )}
    </>
  )
}

export default Sorc
