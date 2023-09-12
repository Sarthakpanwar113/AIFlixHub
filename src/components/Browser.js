import React from 'react'
import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecoundaryContainer from './SecoundaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';


const Browser = () => {

  useNowPlayingMovies();
  //this hook we take care everthink
  usePopularMovies();
  return (
    <div>
    <Header />
    <MainContainer />
    <SecoundaryContainer />
    </div>

    

    // MainContainer
          // - VideoBackground
          // - VideoTitle
    // SecoundaryContainer
          //- movieList * n
              // - many cards*n
  );
};

export default Browser