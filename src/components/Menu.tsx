import { Html } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useAudio } from 'react-use'
import backgroundSound from '../../assets/a_rainy_forest_morning.mp3'

const Menu = () => {
  const [start, setStart] = useState(false)
  const [audio, , controls] = useAudio({
    src: backgroundSound,
    loop: true,
  })

  const handleStart = () => {
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
