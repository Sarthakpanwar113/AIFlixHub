import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice';
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constants';

//fetch data from movie TMDB API and update the store let create a hook 

const useNowPlayingMovies=() => {
    const dispatch = useDispatch();

    //memorization
    const nowPlayingMovies = useSelector((store)=> store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        // console.log(json);
        // console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));

    };


    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();

    }, [])

};


export default useNowPlayingMovies;

