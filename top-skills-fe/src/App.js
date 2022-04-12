import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/registerPage/RegisterPage";
import HomePage from "./components/homePage/HomePage";
import SearchPage from "./components/searchPage/SearchPage";
import SingleMoviePage from "./components/singleMoviePage/SingleMoviePage";

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
      <Navbar />
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/singleMoviePage/:id" element={<SingleMoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
