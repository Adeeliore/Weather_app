import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
    maxAge: 15 * 60 * 1000 // Кешируем запросы на 15 минут
});


const api = axios.create({
    adapter: cache.adapter
});

const GEO_API_HOST = 'https://wft-geo-db.p.rapidapi.com';
const GEO_API_KEY = 'cd36335156msh16b1c128dcf4704p138177jsn6c7b4fa6a9fb';

export const getCities = async (cityName: string) => {
    try {
        const response = await api.get(`${GEO_API_HOST}/v1/geo/cities`, {
            params: {
                namePrefix: cityName,
                types: 'CITY',
                limit: 10,
                sort: '-population'
            },
            headers: {
                'X-RapidAPI-Key': GEO_API_KEY,
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

