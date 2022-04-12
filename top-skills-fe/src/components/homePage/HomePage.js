import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../../redux/slices/loginSlice";

import classes from "./HomePage.module.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const meUser = useSelector((state) => state.login.meUser);
  const authToken = useSelector((state) => state.login.authToken);
  const loadFavouriteMovie = async () => {
    try {
      for (let i = 0; i < meUser?.favourites.length; i++) {
        const movieRes = await axios.get(
          `https://api.tvmaze.com/shows/${meUser?.favourites[i]}`
        );
        setMovies((prev) => [...prev, movieRes.data]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadFavouriteMovie();
    if (authToken) {
      dispatch(getMe({ authToken: authToken }));
    } else {
      window.location = "/login";
    }
  }, []);
  return (
    <>
      <div className={classes.MainHomeContainer}>
        <div className={classes.Heading}>
          <div className={classes.InnerTextContainer}>
            <h1 style={{ color: "white" }}>Heading</h1>
            <h3 className={classes.InfoText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h3>
            <Link to="/searchPage" className={classes.LinkButton}>
              <button className={classes.SearchButton}>Search</button>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "25%",
          margin: "0 auto",
          justifyContent: "center",
          fontSize: "1.7rem",
          padding: "15px",
          backgroundColor: " #59636c",
          color: "whitesmoke",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        Your Favourites
      </div>
      <div className={classes.FavouritesContainer}>
        {movies?.map((movie) => (
          <img
            src={
              movie?.image?.original ??
              "https://pic.onlinewebfonts.com/svg/img_98811.png"
            }
            className={classes.FavImg}
            alt="fav movie img"
            onClick={() => (window.location = `singleMoviePage/${movie.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
