import './index.sass';
export interface WeatherData {
    weather: {
        main: string;
        description: string;
    }[];
    main: {
        temp: number;
    };
    clouds: {
        all: number;
    };
}

function WeatherDisplay({ city, weatherData }: { city: string, weatherData: WeatherData | null }) {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
        return (
            <div id="weather-display">
                <h1>Weather in {city}</h1>
                <p>Weather:</p>
                <p>Temperature:</p>
                <p>Clouds:</p>
            </div>
        );

    }

    return (
        <div id="weather-display">
            <h1>Weather in {city}</h1>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp}°C</p>
            <p>Clouds: {weatherData.clouds.all}%</p>
        </div>
    );
}

export default WeatherDisplay;



