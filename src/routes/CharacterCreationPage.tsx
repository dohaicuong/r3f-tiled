import { Box, Select, Grid, Hidden, Stack, Typography, Link, TextField, MenuItem, InputLabel, FormControl, Avatar, Button } from '@mui/material'
import backgroundImage from '../../assets/UI/half_map.png';
import Go1Logo from '../../assets/UI/go1_logo.svg';
import avatar1 from '../../assets/UI/avatars/avatar1.png'
import avatar2 from '../../assets/UI/avatars/avatar2.png'
import avatar3 from '../../assets/UI/avatars/avatar3.png'
import avatar4 from '../../assets/UI/avatars/avatar4.png'
import { colors } from '../theme';
import { useEffect, useState } from 'react';
import { createNewAccount, oneTimeLogin } from '../apis/auth';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/auth';
import { useNavigate } from 'react-router-dom';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState({value: 0, url: ''});
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const clearInput = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole('');
    setAvatar({value: 0, url: ''});
  }

  useEffect(() => {
    const authed = auth.data.jwt;
    if (authed) {
      navigate('/select-map');
    }
  }, [auth]);

  const handleRegister = async () => {
    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      data: {
        "consent":{"term_policy":1,"term_tos":1,"term_collection":1,"term_privacy":1},
        "cinque": {
          role,
          avatar: avatar.value
        }
      }
    };
    const response = await createNewAccount(payload);
    const {id, jwt, data, uuid, first_name, last_name, mail} = response.data;
    // const res = await oneTimeLogin(mail, jwt);
    // const { one_time_token }  = res.data;
    setAuth({
      ...auth,
      // oneTimeToken: one_time_token,
      data: {id, jwt, data, uuid, first_name, last_name, mail}
    });
  }

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
                  <TextField onChange={evt => setFirstName(evt.target.value as string)} required id="first-name" label="First Name" />
                  <TextField onChange={evt => setLastName(evt.target.value as string)} required id="last-name" label="Last Name" />
                </Stack>
                <TextField onChange={evt => setEmail(evt.target.value as string)} required fullWidth id="email" label="Email" />
                <TextField type="password" onChange={evt => setPassword(evt.target.value as string)}  required fullWidth id="password" label="Password" />
                <FormControl required>
                  <InputLabel id="role-label">What's your role?</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    onChange={evt => {setRole(evt.target.value as string)}}
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
                        onClick={() => setAvatar(item)} 
                        variant="rounded" 
                        src={item.url} 
                        sx={{width: 60, height: 60, cursor: "pointer", background: item.value===(avatar.value)?colors.default:null}}  
                      />
                    )))}
                  </Stack>
                </Stack>
                <Stack paddingTop={3}>
                  <Button variant="contained" color='secondary'
                    onClick={handleRegister}
                  >
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
