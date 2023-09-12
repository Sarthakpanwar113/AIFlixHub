import React from 'react'
import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecoundaryContainer from './SecoundaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRated';
import useUpComingMovies from '../hooks/useUpComingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browser = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  //this hook we take care everthink
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {
        showGptSearch ? (<GptSearch /> ) : ( <> <MainContainer />
          <SecoundaryContainer /> </> )
      }


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