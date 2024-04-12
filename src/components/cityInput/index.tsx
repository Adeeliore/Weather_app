import './index.sass';

import {ChangeEvent, FC} from "react";

interface CityInputProps {
    city: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CityInput: FC<CityInputProps> = ({ city, onInputChange }) => {
    return (
        <input type="text" value={city} onChange={onInputChange} />
    );
}

export default CityInput;