import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import mapPage from '../../assets/UI/map.png';

const MapSelectionPage = () => {
  return (
    <>
      <Box component="div" sx={{ height: '100vh', backgroundImage: `url(${mapPage})`, backgroundSize: 'cover'}}>

      </Box>
    </>
  )
}

export default MapSelectionPage
