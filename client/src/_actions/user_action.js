import axios from 'axios';
import { REGISTER_USER, LOGIN_USER } from '../_actions/types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('/api/user/login', dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/user/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
