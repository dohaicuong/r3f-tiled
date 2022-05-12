import { useEffect, useRef } from 'react'
import { SpriteProps } from '@react-three/fiber'
import { Sprite } from 'three'
import { Html } from '@react-three/drei'
import { Button, Divider, Paper, styled, Typography } from '@mui/material'

import { AnimatedSprite } from '../common/AnimatedSprite'
import { PlayerInputSchema, usePlayerInput } from '../common/usePlayerInput'
import { useMapTileRow, AnimationSchema } from '../common/useMapTileRow'

import { useWhenPlayerWalk } from './useWhenPlayerWalk'
import { useWhenPlayerAttack } from './useWhenPlayerAttack'
import { useWhenPlayerInteract } from '../common/useWhenPlayerInteract'
import { useQuestlineStateMachine } from './questline'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/auth'
import { oneTimeLogin } from '../apis/auth'
import { createOnePlayerUrl, openPopUp } from '../common/openPopUp'
import sorcTileset from '../../assets/sorc.png'
import victorySound from '../../assets/zomg_ictory.mp3'

import { PORTAL_ID } from '../apis/constants'
import { useAudio } from 'react-use'
import { useNavigate } from 'react-router-dom'

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

  const [isInteractWithTeleCircle] = useWhenPlayerInteract(atom_id, 'teleport', action)
  useEffect(() => {
    if (isInteractWithTeleCircle) {
      location.href = '/select-map'
    }
  }, [isInteractWithTeleCircle])
  
  const [isInteractWithGirl] = useWhenPlayerInteract(atom_id, 'girl', action)
  const [questlineState, send] = useQuestlineStateMachine()
  const handleAccept = () => {
    send('NEXT')
  }

  const [isInteractWithAvil] = useWhenPlayerInteract(atom_id, 'anvil', action)
  const [auth, setAuth] = useAtom(authAtom)
  const [victoryAudio, , victoryAudioControls] = useAudio({ src: victorySound, loop: false })
  useEffect(() => {
    if (!isInteractWithAvil) return
    const questLoId = '12867398'

    const {
      oneTimeToken,
      data: { jwt, mail },
    } = auth

    let popup: Window | undefined | null
    if (oneTimeToken) {
      const url = createOnePlayerUrl(questLoId)
      popup = openPopUp(url)
    }
    else {
      oneTimeLogin(mail || '', jwt || '').then(res => {
        const { data } = res;
        const oneTimeToken = data.one_time_token;
        setAuth({ oneTimeToken, data: auth.data })
        
        const url = createOnePlayerUrl(questLoId, '', oneTimeToken)
        popup = openPopUp(url)
      })
    }

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval)
        getEnrolment(jwt).then(res => {
          const completed = Boolean(res.hits.find(({ lo_id, status }: any) => lo_id === 12867398 && status === 'completed'))
          console.log({ completed })
          if (completed) {
            victoryAudioControls.seek(0)
            victoryAudioControls.play()
            send('NEXT')
          }
        })
      }
    }, 500)
  }, [isInteractWithAvil])

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
          tileset: sorcTileset,
          tileSize: [48, 48],
          columns: 4,
        }}
      >
        <Html position={[0, 1, 0]}>
          <PlayerName>
            {name}
          </PlayerName>
        </Html>
      </AnimatedSprite>

      <Html>{attackAudio}</Html>
      <Html>{victoryAudio}</Html>

      {isInteractWithGirl && questlineState.value === 'new_quest' && (
        <Html>
          <TakeQuestDialog onAccept={handleAccept} />
        </Html>
      )}
    </>
  )
}

export default Sorc

const PlayerName = styled(Typography)`
  z-index: 1;
  color: #000;
  font-weight: 900;
  text-shadow: 0px 1px 5px #fff;
  white-space: nowrap;
  position: relative;
  transform: translate(-50%, 0%);
`

type TakeQuestDialogProps = {
  onAccept: () => void
}
const TakeQuestDialog: React.FC<TakeQuestDialogProps> = ({ onAccept }) => {
  return (
    <Paper style={{ transform: 'translate(-50%, -50%)', padding: 24 }}>
      <Typography variant='h4' style={{ whiteSpace: 'nowrap' }} gutterBottom>
        Road of No Return
      </Typography>
      <Divider style={{ marginBottom: 24 }} />

      <Typography variant='body2' style={{ whiteSpace: 'nowrap' }} gutterBottom>
        Ah yes, a valiant one they have chosen to venture forth at cinque.
      </Typography>
      <Typography variant='body2' style={{ whiteSpace: 'nowrap' }}>
        To complete the main onboarding questline,
      </Typography>
      <Typography variant='body2' style={{ whiteSpace: 'nowrap' }} gutterBottom>
        you must find the 6 items I have lost while pottering about this old village.
      </Typography>
      <Typography variant='body2' style={{ whiteSpace: 'nowrap' }} gutterBottom>
        I will bestow a reward upon you with each item found...
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
        <Button onClick={onAccept} variant='contained'>
          Accept
        </Button>
      </div>
    </Paper>
  )
}

const getEnrolment = (jwt: string) => {
  const url = [
    'https://api-dev.go1.co/explore/enrolment',
    `/${PORTAL_ID}`,
    '?include%5B%5D=event&include%5B%5D=lo&limit=20&offset=0&singleLi=all&loType%5B%5D=course&loType%5B%5D=li&loType%5B%5D=award&status%5B%5D=completed&type%5B%5D=enrolment&type%5B%5D=award&isAwardPublished=1&use-lr-index=true'
  ].join('')

  return fetch(url, {
    headers: { authorization: `Bearer ${jwt}` }
  })
  .then(res => res.json())
}