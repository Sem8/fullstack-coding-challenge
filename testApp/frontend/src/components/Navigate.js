import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function Navigate() {
  const classes = useStyles();

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
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
    </div>
  );
}
