import { Button, ButtonProps, Grid, IconButton, styled, Typography, TypographyProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type ControllerTutorialDialogProps = {
  onClose: () => void
}

export const ControllerTutorialDialog: React.FC<ControllerTutorialDialogProps> = ({ onClose }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Grid container spacing={4} style={{ padding: 32 }} alignItems="flex-end">
        <Grid item xs>
          <div style={{ marginLeft: 50, marginBottom: 10 }}>
            <Key>W</Key>
          </div>
          <div style={{ display: 'flex', marginBottom: 16 }}>
            <Key style={{ marginRight: 10 }}>A</Key>
            <Key style={{ marginRight: 10 }}>S</Key>
            <Key>D</Key>
          </div>
          <HintText>
            Use WASD keys to move around the board
          </HintText>
        </Grid>

        <Grid item xs>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Key>J</Key>
          </div>
          <HintText>
            Use J to attack
          </HintText>
        </Grid>

        <Grid item xs>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Key>Q</Key>
          </div>
          <HintText>
            Use Q to interact
          </HintText>
        </Grid>
      </Grid>
    </>
  )
}

const Key: React.FC<ButtonProps> = styled(props => <Button variant='outlined' color='inherit' {...props} />)`
  height: 64px;
  fontW-weight: 800;
  font-size: 20px;
`

const HintText: React.FC<TypographyProps> = styled(props => <Typography variant='body1' textAlign='center' {...props} />)`
  height: 48px;
`
