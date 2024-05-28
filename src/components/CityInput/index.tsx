import './index.sass';
import { ChangeEvent } from "react";

interface CityInputProps {
    city: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CityInput = ({ city, onInputChange }: CityInputProps) => (
    <input className="city-input" type="text" value={city} onChange={onInputChange} />
);
