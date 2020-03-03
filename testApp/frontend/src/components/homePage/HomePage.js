import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Navigate from "../Navigate";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: "100%",
    padding: '20px',
    margin: '20px auto',
    color: 'white',
    backgroundColor: '#3f51b5',
    maxWidth: 850,
    
  }
});

const HomePage = props => {
  const classes = useStyles();

  return (
    <>
      <Navigate />
      <div className={classes.root}>
        <Typography variant="h1" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="h3" gutterBottom>
          Use the navigation links above to view your desired information
        </Typography>
      </div>
    </>
  );
};

export default withRouter(HomePage);
