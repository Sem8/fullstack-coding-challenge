// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome</h1>

//     </div>
//   );
// }

// export default App;

import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import Main from "./components/Main";
import Navigate from "./components/Navigate";
import { withRouter } from "react-router";

function App() {
  return (
    <>
      <div className="main-wrapper-app">
        {/* <div className="component-wrapper">          
          <Navigate />
        </div> */}

        {/* <Switch> */}

        <Route exact path="/" component={Main} />
        <Route path="/navigate" component={Navigate} />
        {/* </Switch> */}

        {/* <div className="component-wrapper">
          {localStorage.getItem("councilmanToken") ? <Navigate /> : <Main />}
        </div> */}
      </div>
      

      
    </>
  );
}

export default withRouter(App);
