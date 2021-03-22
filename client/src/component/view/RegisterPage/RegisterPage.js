import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return '확인된 비밀번호가 다릅니다.';
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler} />
          <label>Name</label>
          <input type='text' value={Name} onChange={onNameHandler} />
          <label>Password</label>
          <input
            type='password'
            value={Password}
            onChange={onPasswordHandler}
          />
          <label>ConfirmPassword</label>
          <input
            type='password'
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <br />
          <button type='submit'>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(RegisterPage);
