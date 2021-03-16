import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React from 'react';

function LandingPage(props) {
  const onClickhandler = () => {
    axios.get('/api/user/logout').then((response) => {
      if (response.data.success) {
        window.localStorage.removeItem('userId');
        props.history.push('/login');
      } else {
        alert('failed to logout');
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
      <br />
      <button onClick={onClickhandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
