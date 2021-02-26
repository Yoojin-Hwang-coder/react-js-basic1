import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import React from 'react';

function LandingPage(props) {
  const history = useHistory();
  const logoutHandler = () => {
    axios.get('/api/user/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  return (
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
      <h2>시작페이지</h2>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
