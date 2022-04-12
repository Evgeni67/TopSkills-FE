import React, { memo, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { login, getMe } from "../../redux/slices/loginSlice.js";
import backendUrls from "../../utils/backendurls";
import classes from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.login.authToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [logged, setLogged] = useState(false);
  const isLogged = useSelector((state) => state.login.isLogged);

  const register = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: {
          email: email,
          password: password,
        },
      };
      const registerRes = await axios.post(
        `${backendUrls.mainUrl}${backendUrls.accounting.post.register}`,
        requestOptions
      );
      console.log(registerRes);
      dispatch(login({ email: email, password: password }));
      dispatch(getMe({ authToken: authToken }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (logged) {
      window.location.href = "/homePage";
    }
  }, [logged]);

  useEffect(() => {
    if (isLogged && authToken) {
      dispatch(getMe({ authToken: authToken }));
      window.location = "/homePage";
    }
  }, [authToken]);

  return (
    <div className={classes.ContainerRegister}>
      <div className={classes.RegisterText}>Register</div>
      <div className={classes.CenteredRow}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ marginBottom: "5px" }}>👨‍💻</span>
          <input
            type="text"
            className={classes.EmailInput}
            placeholder="Username"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className={classes.CenteredRow}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ marginBottom: "5px" }}>🔒</span>
          <input
            type="password"
            className={classes.PasswordInput}
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className={classes.CenteredRow}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="password"
            className={classes.PasswordInput}
            placeholder="Confirm password"
            onChange={(e) => setPassword2(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className={classes.RegisterRow}>
        <button onClick={() => register()} className={classes.RegisterBtn}>
          {" "}
          Create account
        </button>
      </div>
      <div className={classes.CenteredRow}>
        <Link to="/login" style={{ color: "white", marginTop: "20px" }}>
          Or login
        </Link>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
