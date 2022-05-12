import { Box, Select, Grid, Hidden, Stack, Typography, Link, TextField, MenuItem, InputLabel, FormControl, Avatar, Button } from '@mui/material'
import backgroundImage from '../../assets/UI/map.png';
import Go1Logo from '../../assets/UI/go1_logo.svg';
import avatar1 from '../../assets/UI/avatars/avatar1.png'
import avatar2 from '../../assets/UI/avatars/avatar2.png'
import avatar3 from '../../assets/UI/avatars/avatar3.png'
import avatar4 from '../../assets/UI/avatars/avatar4.png'
import { colors } from '../theme';
import { useState } from 'react';
const roles = [
  'Deleloper',
  'Product Manager',
  'Designer'
];

const avatars = [
  {value: 1, url: avatar1},
  {value: 2, url: avatar2},
  {value: 3, url: avatar3},
  {value: 4, url: avatar4},
];



const CharacterCreationPage = () => {
  const [firtName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(null);

  return (
    <Box component="div" sx={{ height: '100vh'}}>
      <Grid container sx={{ height: '100%'}} spacing={0}>
        <Hidden only={[ "sm", "xs"]}>
          <Grid item lg={6} md ={6} sx={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            display: 'inline-block', 
          }}>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md ={6} lg={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Box component="div" sx={{ width: '70%' }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <img src={Go1Logo} style={{marginBottom: 30}}></img>
              <Typography sx={{ fontWeight: 500, fontSize: 20, color: colors.accent}}>
                Sign up with your work email!
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 16, color: colors.default }}>
                Already have an account? <Link href="#">Log in</Link>
              </Typography>
              <Stack direction="column" paddingTop={3} paddingX={2} spacing={1}>
                <Stack direction="row"  spacing={1}>
                  <TextField required id="first-name" label="First Name" />
                  <TextField required id="last-name" label="Last Name" />
                </Stack>
                <TextField required fullWidth id="email" label="Fmail" />
                <TextField required fullWidth id="password" label="Password" />
                <FormControl required>
                  <InputLabel id="role-label">What's your role?</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={null}
                    onChange={() => {}}
                    label="What's your role?"
                  >
                    {roles.map((item) => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack>
                  <InputLabel required shrink id="role-label">Choose your avatar</InputLabel>
                  <Stack direction="row" spacing={3}>
                    {avatars.map((item => (
                      <Avatar 
                        onClick={() => console.log('click')} 
                        variant="rounded" 
                        src={item.url} 
                        sx={{width: 60, height: 60, cursor: "pointer", background: colors.default}}  
                      />
                    )))}
                  </Stack>
                </Stack>
                <Stack paddingTop={3}>
                  <Button variant="contained" color='secondary'>
                    Create new account
                  </Button>
                </Stack>
              </Stack>

            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CharacterCreationPage;
