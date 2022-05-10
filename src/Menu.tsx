import { Html } from "@react-three/drei"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import backgroundSound from '../assets/a_rainy_forest_morning.mp3'

const Menu = () => {
  const [start, setStart] = useState(false)
  const [play, { stop }] = useSound(backgroundSound, { volume: 0.5 })

  const handleStart = () => {
    setStart(true)
    play()
  }

  useEffect(() => {
    return () => {
      setStart(false)
      stop()
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
    </Html>
  )
}

export default Menu
