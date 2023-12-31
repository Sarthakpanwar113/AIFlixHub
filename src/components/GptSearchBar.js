import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const dispatch = useDispatch();

    const langkey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    //seach movie in tmsb database
    const searchMovieTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + 
            '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json()
        return json.results;
    };


    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        //give search text value
        //make api call to OPEN API and get movie results
        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Hum Tum, Golmaal, Jawan";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });


        if (!gptResults.choices) {
        //TODO : WRITE error handling
        }
        console.log(gptResults.choices?.[0]?.message?.content);

        // "3 Idiots, Andaz Apna Apna, Hera Pheri, Chennai Express, PK, Bheja Fry"
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        //now it become array
        //for each movie i will seach for TMDB Api
        const promiseArray = gptMovies.map((movie) =>searchMovieTMDB(movie));
        //result here we get is array of promises [promises, promises, promises, promises, promises, promises] not the result

        const tmdbResults =await Promise.all(promiseArray);
        console.log(tmdbResults);

        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults : tmdbResults}));


    };

    return (<div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className=' w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} className='p-4 m-4 col-span-9' type="text" placeholder={lang[langkey]?.gptSearchPlaceholder} />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langkey]?.search}</button>
        </form>
    </div>
    );
};

export default GptSearchBar;