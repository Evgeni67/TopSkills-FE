import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../redux/slices/loginSlice";
import backendUrls from "../../utils/backendurls";
import axios from "axios";

import { useParams } from "react-router-dom";

import classes from "./SingleMoviePage.module.scss";

const SingleMoviePage = () => {
  const dispatch = useDispatch();
  const meUser = useSelector((state) => state.login.meUser);
  const authToken = useSelector((state) => state.login.authToken);
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const addToFavourites = useCallback(async () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const addToFavouritesRes = await axios.put(
        `${backendUrls.mainUrl}${backendUrls.accounting.put.addToFavourites(
          id
        )}`,
        requestOptions
      );
      console.log(addToFavouritesRes);
      dispatch(getMe({ authToken: authToken }));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, authToken, id]);

  const loadFavouriteMovie = async () => {
    try {
      const movieRes = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      console.log(movieRes);
      setMovie(movieRes.data);
    } catch (e) {
      console.error(e);
    }
  };
  console.log("OD", id);
  useEffect(() => {
    loadFavouriteMovie();
  }, []);
  return (
    <div className={classes.MainMovieContainer}>
      <img
        src={movie?.image?.original}
        alt="movie pic"
        className={classes.MoviePic}
      />
      <div className={classes.Heading}>
        <div className={classes.InnerTextContainer}>
          <h1 style={{ color: "white" }}>{movie?.name}</h1>
          <div style={{ color: "lightgray", marginTop: "-20px" }}>
            {movie?.show?.genres?.join(", ")}
          </div>
          <h3 className={classes.InfoText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h3>

          <button
            className={classes.HandleFavouritesBtn}
            onClick={() => addToFavourites()}
          >
            {meUser?.favourites?.includes(id)
              ? "Remove from favourites"
              : "Add to favourites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
