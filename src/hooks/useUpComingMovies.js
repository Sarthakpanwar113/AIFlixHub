import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {  addUpComingMovies } from "../utils/movieSlice";

const useUpComingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  //memorization
//   const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
    getUpComingMovies();
  }, []);
};

export default  useUpComingMovies;