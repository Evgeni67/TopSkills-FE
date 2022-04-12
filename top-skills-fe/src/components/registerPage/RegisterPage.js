import React, { memo, useState, useEffect } from "react";
// import axios from "axios";
// import backendUrls from "../../utils/backendurls";
import { Link } from "react-router-dom";

import classes from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

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
