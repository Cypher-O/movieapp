import axios from 'axios';
import { apiKey } from '../constants';

// const forecastEndpoint = params=> `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no`;
const forecastEndpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no`;
const locationsEndpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;


const runFunctionForApi = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err){
        console.log('error: ', err);
        return null;
    }
}

export const fetchWeatherForeCast = params=> {
    // let foreCastUrl = forecastEndpoint(params);
    // return runFunctionForApi(foreCastUrl);
    return runFunctionForApi(forecastEndpoint(params));
}

export const fetchLocations = params=> {
    // let foreCastUrl = forecastEndpoint(params);
    // return runFunctionForApi(foreCastUrl);
    return runFunctionForApi(locationsEndpoint(params));
}