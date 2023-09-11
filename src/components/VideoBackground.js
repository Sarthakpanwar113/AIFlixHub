import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';

const VideoBackground = ({movieId}) => {

    const trailerVideo = useSelector(store => store.movies?.trailerVideo);

    const dispatch = useDispatch();
    // or 
    const [trailerId, setTrailerId] = useState(null);
    //fetch trailer video i have to make aan api call for that we need movie id
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/615656/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        console.log(json);

        const trailer = json.results.filter(video => video.type === "Trailer");
        console.log(trailer);
        setTrailerId(trailer.key);
        // or
        dispatch(addTrailerVideo(trailer));

    };
    useEffect(() => {
        getMovieVideos();
    }, []);

    // return (<div>
    //     <iframe
    //         width="568"
    //         height="315"
    //         src={"https://www.youtube.com/embed/" + trailerVideo?.key}
    //         title="YouTube video player"
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     ></iframe>
    // </div>
      return   (  <div><iframe width="568" height="318" src="https://www.youtube.com/embed/dG91B3hHyY4"  title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe></div>
    );
};
export default VideoBackground