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
import { withRouter } from "react-router";

import Main from "./components/Main";
import Navigate from "./components/Navigate";
import AllComplaints from "./components/complaints/AllComplaints";
import ClosedComplaints from "./components/complaints/ClosedComplaints";
import OpenComplaints from "./components/complaints/OpenComplaints";
import TopComplaints from "./components/complaints/TopComplaints";
import ConstituentComplaints from "./components/complaints/ConstituentComplaints";

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
        <Route path="/allcomplaints" component={AllComplaints} />
        <Route path="/opencomplaints" component={OpenComplaints} />
        <Route path="/closedcomplaints" component={ClosedComplaints} />
        <Route path="/topcomplaints" component={TopComplaints} />
        <Route
          path="/constituentcomplaints"
          component={ConstituentComplaints}
        />
        {/* </Switch> */}

        {/* <div className="component-wrapper">
          {localStorage.getItem("councilmanToken") ? <Navigate /> : <Main />}
        </div> */}
      </div>
    </>
  );
}

export default withRouter(App);
