import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    //if movie is not present then return
    if(!movies) return;
    //we need one main movie to display
    const mainMovie = movies[0];
    console.log(mainMovie);

    const {original_title , overview, id} = mainMovie;

  return (
  <div>

    <VideoTitle  title = {original_title} overview = {overview}/>
    <VideoBackground  movieId = {id}/>


  </div>
  );
};

export default MainContainer;