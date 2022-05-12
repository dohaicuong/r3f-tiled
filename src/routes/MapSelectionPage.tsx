import { Box, Button, Modal, Stack, styled, Typography, Popover } from '@mui/material'
import { useState } from 'react';
import mapPage from '../../assets/UI/map.png';
import { colors } from '../theme';
import { ImageMap } from '@qiuz/react-image-map';
import { useNavigate } from 'react-router-dom';

const MapSelectionPage = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const navigate = useNavigate();

  const mapArea = [
    {
      left: '8%',
      top: '8%',
      height: '30%',
      width: '22%',
      style: { cursor: 'pointer', zIndex: 20 },
      label: 'Castle of Compliance',
      onMouseEnter: (evt : any) => {
        if (anchorEl) {
          return;
        }
        setAnchorEl(() => ({
          left: evt.clientX,
          top: evt.clientY,
          label: 'Castle of Compliance'
        }));
      },
      onMouseLeave: () => setAnchorEl(null)
    },
    {
      left: '65%',
      top: '8%',
      height: '15%',
      width: '10%',
      style: { cursor: 'pointer', zIndex: 20 },
      label: 'Chambers of Secrets',
      onMouseEnter: (evt : any) => {
        setAnchorEl(() => ({
          left: evt.clientX,
          top: evt.clientY,
          label: 'Chambers of Secrets'
        }));
      },
      onMouseLeave: () => setAnchorEl(null)
    },
    {
      left: '57%',
      top: '41%',
      height: '13%',
      width: '13%',
      style: { cursor: 'pointer',zIndex: 20 },
      label: 'PVP Chanllenge',
      onMouseEnter: (evt : any) => {
        setAnchorEl(() => ({
          left: evt.clientX,
          top: evt.clientY,
          label: 'PVP Chanllenge'
        }));
      },
      onMouseLeave: () => setAnchorEl(null)
    },
    {
      left: '39%',
      top: '48%',
      height: '16%',
      width: '6%',
      style: {  cursor: 'pointer', zIndex: 20 },
      label: 'Jungle Village',
      onMouseEnter: (evt : any) => {
        setAnchorEl(() => ({
          left: evt.clientX,
          top: evt.clientY,
          label: 'Jungle Village'
        }));
      },
      onMouseLeave: () => setAnchorEl(null)
    },
    {
      left: '55%',
      top: '78%',
      height: '10%',
      width: '12%',
      style: { cursor: 'pointer', zIndex: 20 },
      label: 'Advanture Guild',
      onMouseEnter: (evt : any) => {
        setAnchorEl(() => ({
          left: evt.clientX,
          top: evt.clientY,
          label: 'Advanture Guild'
        }));
      },
      onMouseLeave: () => setAnchorEl(null)
    },
  ];

  
  return (
    <StyledBox component='div'>
      <MapWrapprer>
        <ImageMap src={mapPage}
          map={mapArea}
          onMapClick={(area, index) => {
            if (index == 0) {
              navigate('/game')
            }
          }}
        />
      </MapWrapprer>
      <ImageBackground src={mapPage} />
      <IntroModal />

      {anchorEl && <Popover open={Boolean(anchorEl)} 
        anchorReference="anchorPosition"
        anchorPosition={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
      >
        <Box component="div" sx={{ border: 1, p: 1, bgcolor: 'background.paper', cursor: 'pointer' }}>
          {anchorEl.label}
        </Box>
      </Popover>}
    </StyledBox>
  )
}



const IntroModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <Modal open={open}>
      <Box component="div" sx={modalBoxstyle}>
        <Stack direction="column" paddingX={3} alignItems="center" spacing={2}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: colors.default }}>
            Welcome to the Go1 onboarding experience!
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: colors.default }}>
            <P>Please navigate the map to complete your compliance training and 
            find any additional materials for your role. You will receive tokens for any items completed 
            which can be exchanged for real world loot!</P>
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: colors.default }}>
          Tips:
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: colors.default }}>
            <P>We have put together some content based on your profile, you can earn tokens for completing 
              this too! You can also take challenges and see where you stack up in our leaderboard!</P>
          </Typography>
          <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
            Let's go
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default MapSelectionPage

const MapWrapprer = styled('div')`
  & .image-map__content__img {
    position: relative;
    z-index: 10;
    width: auto !important;
    height: 80vh;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  }
`


const P = styled('p')`
  margin: 0px;
`

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh
`

const ImageBackground = styled('img')`
  width: 100%;
  z-index: 1;
  opacity: 0.3;
  position: absolute;
`

const modalBoxstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4,
  'border-radius': '10px',
};
