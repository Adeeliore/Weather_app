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

interface WeatherDisplayProps {
    city: string;
    weatherData: WeatherData | null;
    error: boolean;
}

export function WeatherDisplay({ city, weatherData, error }: WeatherDisplayProps) {
    if (error) {
        return (
            <div id="weather-display">
                <h1>Weather in {city}</h1>
                <p>Error: City not found in weather API.</p>
                <p>Please select another city.</p>
            </div>
        );
    }

    const hasWeatherData = weatherData !== null;
    const hasWeatherInfo = hasWeatherData && weatherData.weather && weatherData.weather.length > 0;

    const weatherDescription = hasWeatherInfo ? weatherData.weather[0].description : null;
    const temperature = hasWeatherData ? weatherData.main.temp : null;
    const clouds = hasWeatherData ? weatherData.clouds.all : null;

    return (
        <div id="weather-display">
            <h1>Weather in {city}</h1>
            <p>{weatherDescription !== null ? weatherDescription : "Weather:"}</p>
            <p>{temperature !== null ? `${temperature}°C` : "Temperature:"}</p>
            <p>{clouds !== null ? `Clouds: ${clouds}%` : "Clouds:"}</p>
        </div>
    );
}




