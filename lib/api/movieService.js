import axios from 'axios';
import { apiKey } from '../constants/index';

const baseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upComingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;


// dynamic endpoints
const movieDetailsEndpoint = id=> `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const recommendedMoviesEndpoint = id=> `${baseUrl}/movie/${id}/recommendations?api_key=${apiKey}`;
const personDetailsEndpoint = id=> `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMovieDetailsEndpoint = id=> `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const searchMoviesEndpoint =  `${baseUrl}/search/movie?api_key=${apiKey}`;


export const imageOriginal = path=> path? `https://image.tmdb.org/t/p/original${path}` : null;
export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackPosterImage = 'https://react-native-movieapp.s3.us-east-2.amazonaws.com/images/image_not_found.png';
export const fallbackPersonImage = 'https://react-native-movieapp.s3.us-east-2.amazonaws.com/images/user.png';


const runFunctionForApi = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params:{},
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err){
        console.log('error: ', err);
        return null;
    }
}


export const fetchTrendingMovies = ()=> {
    return runFunctionForApi(trendingMoviesEndpoint);
}

export const fetchUpComingMovies = params=> {
    return runFunctionForApi(upComingMoviesEndpoint);
}

export const fetchTopRatedMovies = params=> {
    return runFunctionForApi(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return runFunctionForApi(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = id => {
    return runFunctionForApi(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = id => {
    return runFunctionForApi(similarMoviesEndpoint(id));
}

export const fetchRecommendedMovies = id => {
    return runFunctionForApi(recommendedMoviesEndpoint(id));
}

export const fetchPersonDetails = id => {
    return runFunctionForApi(personDetailsEndpoint(id));
}

export const fetchPersonMovieDetails = id => {
    return runFunctionForApi(personMovieDetailsEndpoint(id));
}

export const fetchSearchedMovies = params => {
    return runFunctionForApi(searchMoviesEndpoint, params);
}
