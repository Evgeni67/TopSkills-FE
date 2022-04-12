import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";

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
  const [currentRating, setCurrentRating] = useState(0);
  const [noteText, setNoteText] = useState(0);

  const sendNote = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: {
          rating: currentRating,
          note: noteText,
          id: id,
        },
      };
      const addToFavouritesRes = await axios.put(
        `${backendUrls.mainUrl}${backendUrls.accounting.put.addNote(id)}`,
        requestOptions
      );
      console.log(addToFavouritesRes);
      dispatch(getMe({ authToken: authToken }));
      setCurrentRating(0);
      setNoteText("");
    } catch (e) {
      console.error(e);
    }
  };
  const deleteNote = useCallback(
    async (note) => {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: {
            rating: note.rating,
            note: note.note,
            id: note.id,
          },
        };
        const deletedMovieNoteREs = await axios.put(
          `${backendUrls.mainUrl}${backendUrls.accounting.delete.note}`,
          requestOptions
        );
        console.log(deletedMovieNoteREs);
        dispatch(getMe({ authToken: authToken }));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, authToken, id]
  );
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
    <>
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
      <div className={classes.NotesWrapper}>
        <h5 style={{ color: "white", fontSize: "1.7rem", marginBottom: "0px" }}>
          Your Review
        </h5>{" "}
        <span>
          <StarRatings
            rating={currentRating}
            starRatedColor="yellow"
            starHoverColor="#f0f01f"
            changeRating={setCurrentRating}
            numberOfStars={5}
            name="rating"
          />
          <button
            className={classes.HandleFavouritesBtn}
            style={{ marginLeft: "30px", width: "150px" }}
            onClick={() => sendNote()}
          >
            Add
          </button>
        </span>
        <textarea
          className={classes.NoteTextArea}
          value={noteText}
          onChange={(e) => {
            setNoteText(e.currentTarget.value);
          }}
          placeholder="Your private notes and comments about the movie..."
        />
        {meUser?.notes &&
          meUser?.notes.map(
            (note) =>
              note.id === id && (
                <div className={classes.Note} key={note.note}>
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <StarRatings
                      rating={note.rating}
                      starRatedColor="yellow"
                      isSelectable={false}
                      changeRating={setCurrentRating}
                      numberOfStars={5}
                      starDimension="15px"
                      name="rating"
                    />
                    <span
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => deleteNote(note)}
                    >
                      x
                    </span>
                  </span>
                  <span style={{ marginTop: "5px" }}>{note.note}</span>
                </div>
              )
          )}{" "}
      </div>
    </>
  );
};

export default SingleMoviePage;
