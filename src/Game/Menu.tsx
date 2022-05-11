import { Button, Paper, TextField, Typography } from '@mui/material'
import { Html } from '@react-three/drei'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAudio } from 'react-use'
import backgroundSound from '../../assets/a_rainy_forest_morning.mp3'
import { Auth } from '../apis/auth'
import { userInfoFamily } from '../families/collidable'

const Menu = () => {
  const [start, setStart] = useState(false)
  const [audio, , controls] = useAudio({
    src: backgroundSound,
    loop: true,
  })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setUserInfo] = useAtom(userInfoFamily({ id: 'player' }));

  const handleStart = async () => {
    // const response = await Auth(email, password);
    // const userInfo = response.data;
    // setUserInfo({ ...info, data: userInfo });
    // const response = await auth.
    setStart(true)
    controls.volume(0.3)
    controls.play()
  }

  useEffect(() => {
    return () => {
      setStart(false)
      controls.pause()
    }
  }, [])

  return (
    <Html style={{ display: start ? 'none' : 'inline', zIndex: 500 }}>
      <div
        style={{
          marginLeft: -1000,
          marginTop: -1000,
          background: '#000',
          opacity: 0.3,
          height: '300vh',
          width: '300vw',
          zIndex: 500,
        }}
      />
      <Paper style={{ zIndex: 500, position: 'absolute', top: -60, left: -200, padding: 24 }}>
        <Typography textAlign='center' variant='h4' style={{ marginBottom: 32 }}>
          Connect to the GoVerse
        </Typography>
        <TextField
          label='email'
          type='email'
          fullWidth
          style={{ marginBottom: 16 }}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label='password'
          type='password'
          fullWidth
          style={{ marginBottom: 16 }}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={handleStart}
        >
          start
        </Button>
      </Paper>
      {audio}
    </Html>
  )
}

export default Menu
