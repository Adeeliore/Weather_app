import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';



const cache = setupCache({
    maxAge: 15 * 60 * 1000
});


const api = axios.create({
    adapter: cache.adapter
});

const WEATHER_API_KEY = '47f3d62e3514b4cb32c0878289db554a';

export const getWeather = async (city: string) => {
    try {
        const response = await api.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: WEATHER_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error('City not found');
        }
        throw error;
    }
};

