import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Main from "./components/Main";
import HomePage from "./components/homePage/HomePage";
import AllComplaints from "./components/complaints/AllComplaints";
import ClosedComplaints from "./components/complaints/ClosedComplaints";
import OpenComplaints from "./components/complaints/OpenComplaints";
import TopComplaints from "./components/complaints/TopComplaints";
import ConstituentComplaints from "./components/complaints/ConstituentComplaints";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  return (
    <>
      <div className="main-wrapper-app">
        <Route exact path="/" component={Main} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/allcomplaints" component={AllComplaints} />
        <Route path="/opencomplaints" component={OpenComplaints} />
        <Route path="/closedcomplaints" component={ClosedComplaints} />
        <Route path="/topcomplaints" component={TopComplaints} />
        <Route path="/errorpage" component={ErrorPage} />
        <Route
          path="/constituentcomplaints"
          component={ConstituentComplaints}
        />
      </div>
    </>
  );
}

export default withRouter(App);
