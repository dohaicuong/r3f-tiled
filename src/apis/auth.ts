import axios from 'axios';
import env from './constants';

export const Auth = (email: string, password: string) => {
  const endpoint = '/user/account/login?allAccounts=false';
  return axios.post(env.API_URL+endpoint,{
    username: email,
    password,
    portal: env.PORTAL
  });
};

export const oneTimeLogin = (email?: string, token?: string) => {
  const endpoint = `/user/account/login/${env.PORTAL}/${email}`;
  return axios.post(env.API_URL+endpoint, {}, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
}