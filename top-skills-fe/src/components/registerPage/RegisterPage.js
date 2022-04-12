import React, { memo, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { setAuthToken, setIsLogged } from "../../redux/slices/loginSlice";
import backendUrls from "../../utils/backendurls";
import classes from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

  const saveTokensLocally = async (response) => {
    try {
      console.log("res->", response);
      const accessData = response[0];
      const user = response[1];
      console.log(response);
      localStorage.setItem("accessToken", accessData.accessToken);
      localStorage.setItem("refreshToken", accessData.refreshToken);
      localStorage.setItem("username", user.email);
      setLogged(true);
    } catch (e) {
      alert("Wrong password");
    }
  };

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
    } catch (err) {}
  };

  const login = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const loginRes = await axios.get(
        `${backendUrls.mainUrl}${backendUrls.accounting.get.login}/${email}/${password}`,
        requestOptions
      );
      //accessData is object and has properties accessToken & refreshToken
      const accessData = loginRes[0];
      const user = loginRes[1];
      saveTokensLocally(loginRes.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (logged) {
      window.location.href = "/homePage";
    }
  }, [logged]);

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
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className={classes.RegisterRow}>
        <button
          //onClick={() => Register()}
          className={classes.RegisterBtn}
        >
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
