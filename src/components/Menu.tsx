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
  const [info, setUserInfo] = useAtom(userInfoFamily({id: 'player'}));

  const handleStart = async () => {
    const response = await Auth(email, password);
    const userInfo = response.data;
    setUserInfo({...info, data: userInfo});
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
    <Html style={{ display: start ? 'none' : 'inline' }}>
      <div
        style={{
          marginLeft: -1000,
          marginTop: -1000,
          background: '#000',
          opacity: 0.3,
          height: '300vh',
          width: '300vw',
        }}
      />
      <input onChange={e => setEmail(e.target.value)} placeholder="email" style={{ position: 'absolute', top: -80, left: 0 }} />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password" style={{ position: 'absolute', top: -30, left: 0 }} />
      <button
        style={{ position: 'absolute', top: 0, left: 0 }}
        onClick={handleStart}
      >
        start
      </button>
      {audio}
    </Html>
  )
}

export default Menu
