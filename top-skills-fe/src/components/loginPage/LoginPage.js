import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getMe } from "../../redux/slices/loginSlice";
import { Link } from "react-router-dom";

import classes from "./LoginPage.module.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = useSelector((state) => state.login.isLogged);
  const authToken = useSelector((state) => state.login.authToken);

  useEffect(() => {
    if (isLogged && authToken) {
      dispatch(getMe({ authToken: authToken }));
      window.location = "/homePage";
    }
  }, [authToken]);

  return (
    <div className={classes.ContainerLogin}>
      <div className={classes.LoginText}>Login</div>
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
      <div className={classes.LoginRow}>
        <button
          onClick={() => {
            dispatch(login({ email: email, password: password }));
          }}
          className={classes.LoginBtn}
        >
          {" "}
          Вход
        </button>
      </div>
      <div className={classes.CenteredRow}>
        <Link to="/register" style={{ color: "white", marginTop: "20px" }}>
          Or register
        </Link>
      </div>
    </div>
  );
};

export default memo(LoginPage);
