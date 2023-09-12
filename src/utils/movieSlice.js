import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({

    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        trailerVideo: null
    },
    reducers: {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
            //whatever comes over here will be added to the addnowplayingmovies
        },
        addTrailerVideo:(state,action) =>{
            state.trailerVideo = action.payload;
        },
        addPopularMovies:(state,action) => {
            state.popularMovies = action.payload;
        },
        
        addTopRatedMovies:(state,action) =>{
            state.topRatedMovies = action.payload;
            },
        addUpComingMovies:(state,action) =>{
            state.upComingMovies = action.payload;
        }
        
    },


});

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpComingMovies} = movieSlice.actions;

export default movieSlice.reducer;