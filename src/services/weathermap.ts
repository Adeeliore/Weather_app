import axios from 'axios';

const API_KEY = '47f3d62e3514b4cb32c0878289db554a';

export const getWeather = async (city: string) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};