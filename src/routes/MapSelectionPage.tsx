import { Box, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import mapPage from '../../assets/UI/map.png';

const MapSelectionPage = () => {
  return (
    <StyledBox component='div'>
      <Map src={mapPage} />
      <ImageBackground src={mapPage} />
    </StyledBox>
  )
}

export default MapSelectionPage


const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh
`

const Map = styled('img')`
  height: 80%;
  z-index: 10;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
`

const ImageBackground = styled('img')`
  width: 100%;
  z-index: 1;
  opacity: 0.3;
  position: absolute;
`
