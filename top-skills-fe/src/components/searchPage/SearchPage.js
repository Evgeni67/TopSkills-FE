import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../redux/slices/loginSlice";

import axios from "axios";

import backendUrls from "../../utils/backendurls";
import classes from "./SearchPage.module.scss";

const SearchPage = () => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const authToken = useSelector((state) => state.login.authToken);
  const meUser = useSelector((state) => state.login.meUser);
  const loadMovies = async () => {
    try {
      const moviesRes = await axios.get(
        "https://api.tvmaze.com/search/shows?q=random"
      );
      setMovies(moviesRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const addToFavourites = useCallback(
    async (movieId) => {
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
            movieId
          )}`,
          requestOptions
        );
        console.log(addToFavouritesRes);
        await dispatch(getMe({ authToken: authToken }));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, authToken]
  );

  const loadFilteredMovies = async () => {
    try {
      const moviesRes = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchWord}`
      );
      setMovies(moviesRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const isInFavouritesList = (id) => {
    console.log(id);
    console.log(meUser?.favourites?.includes(id.toString()));
    if (meUser?.favourites?.includes(id.toString())) return true;
    return false;
  };

  useEffect(() => {
    dispatch(getMe({ authToken: authToken }));
    console.log(meUser);
    loadMovies();
  }, []);

  return (
    <div className={classes.MainSearchContainer}>
      <h1 style={{ alignSelf: "center", color: "white" }}>Search</h1>
      <div style={{ alignSelf: "center", marginBottom: "20px" }}>
        <input
          className={classes.InputCustom}
          placeholder={"Search by movie title..."}
          onChange={(e) => setSearchWord(e.currentTarget.value)}
        />
        <button className={classes.SearchButton} onClick={loadFilteredMovies}>
          Search
        </button>
      </div>
      {Object.keys(meUser).length &&
        movies.length &&
        movies?.map((movie) => (
          <div className={classes.MovieRow} key={movie?.show?.name}>
            <img
              src={
                movie?.show?.image?.original ??
                "https://pic.onlinewebfonts.com/svg/img_98811.png"
              }
              alt="Movie Pic"
              className={classes.MovieImg}
            />
            <div className={classes.Heading}>
              <div className={classes.InnerTextContainer}>
                <h1 style={{ color: "white" }}>{movie?.show?.name}</h1>
                <div style={{ color: "lightgray", marginTop: "-20px" }}>
                  {movie?.show?.genres?.join(", ")}
                </div>
                <h3 className={classes.InfoText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h3>

                <button
                  className={classes.HandleFavouritesBtn}
                  onClick={() => addToFavourites(movie?.show?.id)}
                >
                  {isInFavouritesList(movie?.show?.id)
                    ? "Remove from favourites"
                    : "Add to favourites"}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
