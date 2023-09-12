import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';


const useMovieTrailer = (movieId) => {
    
    const dispatch = useDispatch();
    // or 
    // const [trailerId, setTrailerId] = useState(null);
    //fetch trailer video i have to make aan api call for that we need movie id
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId  + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        // console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        
        // console.log(trailer);
        // setTrailerId(trailer.key);
        // or
        dispatch(addTrailerVideo(trailer));

    };
    useEffect(() => {
        getMovieVideos();
    }, []);
}

export default useMovieTrailer;