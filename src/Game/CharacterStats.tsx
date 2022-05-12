import { Avatar, Paper, Typography } from '@mui/material'
import { Html } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { authAtom } from '../atoms/auth'

import avatar1 from '../../assets/UI/avatars/avatar1.png'
import avatar2 from '../../assets/UI/avatars/avatar2.png'
import avatar3 from '../../assets/UI/avatars/avatar3.png'
import avatar4 from '../../assets/UI/avatars/avatar4.png'
import { useEffect, useMemo, useState } from 'react'

const characterMap = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
}

const CharacterStats = () => {
  const auth = useAtomValue(authAtom)
  const character = useMemo(() => {
    return (characterMap as any)[auth.data.data.cinque.avatar]
  }, [auth.data.data.cinque.avatar])

  const [score, setScore] = useState(0)
  useEffect(() => {
    fetch(`https://api.dev.go1.cloud/cinque/scores/me?jwt=${auth.data.jwt}`)
      .then(res => res.json())
      .then(res => setScore(res.score))
  }, [])

  return (
    <Html position={[0, -9.56, 0]}>
      <Paper style={{ display: 'flex' }}>
        <Avatar src={character} variant='square' />
        <Typography variant='body2' style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', padding: '0px 12px' }}>
          {score} go token
        </Typography>
      </Paper>
    </Html>
  )
}

export default CharacterStats
