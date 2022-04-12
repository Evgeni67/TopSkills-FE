import React from "react";
import classes from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={classes.MainNavContainer}>
      <div className={classes.NavLabel}>My Movie Collection</div>
      <div>
        <input className={classes.Input} />{" "}
        <button className={classes.SearchBtn}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
