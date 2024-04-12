import './index.sass';
import SearchButton from './components/searchButton';
import WeatherDisplay from './components/weatherDisplay';
import { WeatherData } from './components/weatherDisplay';
import { getWeather } from './services/weathermap';
import CityInput from './components/cityInput';
import React, {ChangeEvent, useState} from "react";
import { styles } from './styles';
import {getCities} from "./services/geodb.ts";
import CityList, {City} from "./components/cityList";

function App() {
    const [input, setInput] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSearch = () => {
        if (input.length > 2) {
            getCities(input)
                .then(response => {
                    const cityData = response.data.map((city: City) => ({
                        name: city.name,
                        country: city.country
                    }));
                    setCities(cityData);
                });
        }
    };

    const handleCitySelection = (city: string) => {
        setCity(city);
        getWeather(city)
            .then(data => setWeatherData(data))
            .catch(error => console.error(error));
    };

    let backgroundStyle = styles['Basic'] as React.CSSProperties;

    if (weatherData && weatherData.weather && weatherData.weather[0]) {
        const weatherCondition = weatherData.weather[0].main as keyof typeof styles;
        backgroundStyle = styles[weatherCondition] || styles['Snow'];
    }

    return (
        <div className='App' style={backgroundStyle}>
            <WeatherDisplay city={city} weatherData={weatherData} />
            <CityInput city={input} onInputChange={handleInputChange} />
            <SearchButton onClick={handleSearch} />
            {cities.length > 0 && <CityList cities={cities} onCityClick={handleCitySelection} />}
        </div>
    );
}

export default App;


