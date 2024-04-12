import './index.sass';
import {FC} from "react";

export interface City {
    name: string;
    country: string;
}

interface CityListProps {
    cities: City[];
    onCityClick: (city: string) => void;
}

const CityList: FC<CityListProps> = ({ cities, onCityClick }) => {
    return (
        <div className="cityList">
            {cities.map((city, index) => (
                <p key={index} onClick={() => onCityClick(city.name)}>
                    {city.name}, {city.country}
                </p>
            ))}
        </div>
    );
};

export default CityList;