import './index.sass';
import {City} from "../../types/types.ts";

interface CityListProps {
    cities: City[];
    onCityClick: (city: string) => void;
}

export const CityList = ({ cities, onCityClick }: CityListProps) => (
    <div className="cityList">
        {cities.map((city, index) => (
            <p key={index} onClick={() => onCityClick(city.name)}>
                {city.name}, {city.country}
            </p>
        ))}
    </div>
);
