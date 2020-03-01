import React from 'react';
import { withRouter } from "react-router";

import Login from './Login';


const Main = () => {
  return (
    <div className='landing-page'>
      <Login />

    </div>
  );
};

export default withRouter(Main);