import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Paper, Tabs, Tab, Button } from "@material-ui/core";

import axios from "../axios-instance.js";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Navigate = props => {
  const classes = useStyles();

  // Function to log user out:
  const logout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        // value={value}
        // onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link to={`/allcomplaints`}>
          <Tab label="All complaints in my district" />
        </Link>

        <Link to={`/opencomplaints`}>
          <Tab label="Open complaints in my district" />
        </Link>

        <Link to={`/closedcomplaints`}>
          <Tab label="Closed complaints in my district" />
        </Link>

        <Link to={`/topcomplaints`}>
          <Tab label="Top complaints in my district" />
        </Link>

        <Link to={`/constituentcomplaints`}>
          <Tab label="Complaints by my contituents" />
        </Link>

        <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={logout}
          >
            Logout
          </Button>

        {/* <Tab label="Logout" onClick={logout} /> */}
      </Tabs>
    </Paper>
  );
};

export default withRouter(Navigate);
