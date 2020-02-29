// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Login = props => {
//   // LOGIN STATE
//   const [loginState, setLoginState] = useState({ username: "", password: "" });

//   // Toggle for displaying either login form or the sign up form
//   const [showLogin, setShowLogin] = useState(true);

//   const loginChange = e => {
//     setLoginState({
//       ...loginState,
//       [e.target.name]: e.target.value
//     });
//   };

//   console.log("USER:", loginState);

//   // console.log('VALUE:', value);

//   // handles submit for the login form
//   const handleLogin = e => {
//     e.preventDefault();
//     axios
//       .post(
//         // "https://lambda-mud-test.herokuapp.com/api/login/",
//         "https://t-16-mud.herokuapp.com/api/login/",
//         loginState
//       )
//       .then(res => {
//         localStorage.setItem("token", res.data.key);
//         // props.setLoginState(true);
//         console.log(res.data);
//       })
//       .catch(err => {
//         console.error(err);
//         console.log(err);
//       });
//   };

//   // handles submit for the registration form
//   const handleRegister = e => {
//     e.preventDefault();
//     axios
//       .post(
//         // "https://lambda-mud-test.herokuapp.com/api/registration/",
//         "https://t-16-mud.herokuapp.com/api/registration/",
//         registerState
//       )
//       .then(res => {
//         localStorage.setItem("token", res.data.key);
//         // props.setLoginState(true);
//         console.log("REGISTER DATA", res.data);
//       })
//       .catch(err => {
//         console.error(err);
//         console.log(err);
//       });
//   };

//   return (
//     <LandingContainer>
//       <h1>{showLogin ? "Welcome Back!" : "Join Us Today!"}</h1>
//       {showLogin ? (
//         // <div className='main-wrapper'>
//         <div className="login-wrapper">
//           <form onSubmit={handleLogin}>
//             <div className="input-fields">
//               <input
//                 placeholder="username"
//                 onChange={loginChange}
//                 name="username"
//                 value={loginState.username}
//                 className="field"
//               />
//               <input
//                 onChange={loginChange}
//                 placeholder="password"
//                 name="password"
//                 value={loginState.password}
//                 className="field"
//               />
//               <button className="custom-button" type="submit">
//                 Log In
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="register-form">
//           <form onSubmit={handleRegister}>
//             <div className="input-fields">
//               <input
//                 placeholder="username"
//                 onChange={registerChange}
//                 name="username"
//                 value={registerState.username}
//                 className="field"
//               />
//               <input
//                 onChange={registerChange}
//                 placeholder="password"
//                 name="password1"
//                 value={registerState.password1}
//                 className="field"
//               />
//               <input
//                 onChange={registerChange}
//                 placeholder="confirm password"
//                 name="password2"
//                 value={registerState.password2}
//                 className="field"
//               />
//               <button className="custom-button" type="submit">
//                 Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//         // </div>
//       )}
//       <button
//         className="custom-button2"
//         onClick={() => setShowLogin(!showLogin)}
//       >
//         Toggle Sign in
//       </button>
//     </LandingContainer>
//   );
// };

// export default Login;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  }
}));

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <h1
        className={classes.container}
        style={{
          background: "#1976d2",
          color: "white",
          width: "800px",
          margin: "20px auto",
          padding: '20px',
          borderRadius: '20px'
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
    </>
  );
}
