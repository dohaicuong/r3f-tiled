import { Paper, styled } from '@mui/material'
import { Html } from '@react-three/drei'
import { useEffect } from 'react'
import { useAudio } from 'react-use'
import backgroundSound from '../../assets/a_rainy_forest_morning.mp3'
import { ControllerTutorialDialog } from './ControllerTutorialDialog'

type MenuProps = {
  isStart: boolean
  onClose: () => void
}
const Menu: React.FC<MenuProps> = ({ isStart, onClose }) => {
  const [audio, , controls] = useAudio({
    src: backgroundSound,
    loop: true,
  })

  const handleStart = async () => {
    onClose()
    controls.volume(0.3)
    controls.play()
  }

  useEffect(() => {
    return () => {
      controls.pause()
    }
  }, [])

  return (
    <Html style={{ display: isStart ? 'none' : 'inline', zIndex: 500, position: 'absolute' }}>
      <Backdrop />
      <StyledPaper>
        <ControllerTutorialDialog onClose={handleStart} />
      </StyledPaper>
      {audio}
    </Html>
  )
}

export default Menu

const Backdrop = styled('div')`
  margin-left: -1000px;
  margin-top: -1000px;
  background: #000;
  opacity: 0.3;
  height: 300vh;
  width: 300vw;
  z-index: 500;
`

const StyledPaper = styled(Paper)`
  z-index: 800;
  position: absolute;
  top: -180px;
  left: -300px;
`
