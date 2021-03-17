import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React from 'react';

function LandingPage(props) {
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
      <h2>LandingPage</h2>
    </div>
  );
}

export default withRouter(LandingPage);
