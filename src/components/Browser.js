import React from 'react'
import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecoundaryContainer from './SecoundaryContainer';


const Browser = () => {

  useNowPlayingMovies();
  //this hook we take care everthink
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