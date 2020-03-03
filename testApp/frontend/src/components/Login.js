import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

function Login(props) {
  const classes = useStyles();

  // Handle text input changes
  const [values, setValues] = React.useState({
    name: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // Get the logged in councilman's district:
  const getDistrict = str => {
    let splitStr = str.split("-");
    let district = splitStr[1];

    console.log('distric: ', district);

    localStorage.setItem("councilmanDistrict", district);
  };

  // Handles submit for the login form:
  const handleLogin = e => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/login/", values)
      .then(res => {
        // console.log("login res:", res);

        localStorage.setItem("councilmanToken", res.data.token);
        getDistrict(values.password);

        props.history.push(`/homepage`);
      })
      .catch(err => {
        console.log("login error: ", err);
      });
  };

  return (
    <>
      <h1
        className={classes.container}
        style={{
          background: "#3f51b5",
          color: "white",
          width: "800px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "20px"
        }}
      >
        Welcome! please log in to view your information
      </h1>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="filled-name"
          label="username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange("username")}
          margin="normal"
          variant="filled"
        />
        <TextField
          id="filled-uncontrolled"
          label="password"
          value={values.password}
          onChange={handleChange("password")}
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
      </form>
      
      <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.container}
          style={{
            margin: "20px auto",
            padding: "10px"
          }}
        >
          Sign in
        </Button>
    </>
  );
}

export default withRouter(Login);
