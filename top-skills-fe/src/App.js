import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/registerPage/RegisterPage";

import classes from "./App.module.scss";

const App = () => {
  useEffect(() => {
    if (
      localStorage.getItem("accessToken")?.length === 0 ||
      window.location.href === "http://localhost:3000" ||
      window.location.href === "http://localhost:3000/"
    ) {
      window.location = "/login";
    }
  }, []);
  return (
    <div className={classes.MainContainer}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/register" element={<RegisterPage />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
