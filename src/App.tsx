import './index.sass';

import { WeatherDisplay } from './components/WeatherDisplay';
import { WeatherData } from './components/WeatherDisplay';
import { getWeather } from './services/weathermap';
import { CityInput } from './components/CityInput';
import {ChangeEvent, useCallback, useState} from "react";
import { getCities } from "./services/geodb.ts";
import { CityList } from "./components/CityList";
import { City } from "./types/types.ts";
import { SearchButton } from "./components/SearchButton";
import classNames from 'classnames';
import debounce from 'lodash/debounce';

export function App() {
    const [input, setInput] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState(false);


    const handleSearch = useCallback(debounce((input: string) => {
        if (input.length > 2) {
            getCities(input)
                .then(response => {
                    const cityData = response.data.map((city: City) => ({
                        name: city.name,
                        country: city.country
                    }));
                    setCities(cityData);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, 300), []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInput(newValue);
        handleSearch(newValue);
    };


    const handleCitySelection = (city: string) => {
        setCity(city);
        getWeather(city)
            .then(data => {
                setWeatherData(data);
                setError(false);
            })
            .catch(error => {
                console.error(error);
                setWeatherData(null);
                setError(true);
            });
    };

    const appClass = classNames('App', {
        Thunderstorm: weatherData?.weather?.[0]?.main === 'Thunderstorm',
        Drizzle: weatherData?.weather?.[0]?.main === 'Drizzle',
        Rain: weatherData?.weather?.[0]?.main === 'Rain',
        Snow: weatherData?.weather?.[0]?.main === 'Snow',
        Atmosphere: weatherData?.weather?.[0]?.main === 'Atmosphere',
        Clear: weatherData?.weather?.[0]?.main === 'Clear',
        Clouds: weatherData?.weather?.[0]?.main === 'Clouds',
        Mist: weatherData?.weather?.[0]?.main === 'Mist',
        Smoke: weatherData?.weather?.[0]?.main === 'Smoke',
        Haze: weatherData?.weather?.[0]?.main === 'Haze',
        Dust: weatherData?.weather?.[0]?.main === 'Dust',
        Fog: weatherData?.weather?.[0]?.main === 'Fog',
        Sand: weatherData?.weather?.[0]?.main === 'Sand',
        Ash: weatherData?.weather?.[0]?.main === 'Ash',
        Squall: weatherData?.weather?.[0]?.main === 'Squall',
        Tornado: weatherData?.weather?.[0]?.main === 'Tornado',
        Basic: !weatherData?.weather?.[0]?.main,
    });

    return (
        <div className={appClass}>
            <WeatherDisplay city={city} weatherData={weatherData} error={error} />
            <CityInput city={input} onInputChange={handleInputChange} />
            <SearchButton onClick={() => handleSearch(input)} />
            {cities.length > 0 && <CityList cities={cities} onCityClick={handleCitySelection} />}
        </div>
    );
}

