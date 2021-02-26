import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';

export default function (Spe, option, adRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } else {
          if (adRoute && !response.payload.isAuth) {
            props.history.push('/');
          } else {
            if (!option) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);
    return <Spe />;
  }
  return AuthenticationCheck;
}
