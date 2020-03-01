import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import axios from '../axios-instance.js';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Navigate = (props) => {
  const classes = useStyles();

  // All complaints state:
  const [isLoading, setIsLoading] = useState(true)
  const [allComplaints, setAllComplaints] = useState([]);

  return (
    <div className={classes.root}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        // onClick={signInWithEmailAndPassword}
        className="sign-in-button"
      >
        All complaints in my district
      </Button>


      <Button
        type="submit"
        variant="contained"
        color="primary"
        // onClick={signInWithEmailAndPassword}
        className="sign-in-button"
      >
        Open complaints in my district
      </Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        // onClick={signInWithEmailAndPassword}
        className="sign-in-button"
      >
        Closed complaints in my district
      </Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        // onClick={signInWithEmailAndPassword}
        className="sign-in-button"
      >
      Top complaints in my district
      </Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        // onClick={signInWithEmailAndPassword}
        className="sign-in-button"
      >
        Complaints by my contituents
      </Button>
    </div>
  );
};

export default withRouter(Navigate)
