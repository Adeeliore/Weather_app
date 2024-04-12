import './index.sass';
import { FC, MouseEvent } from 'react';



interface SearchButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SearchButton: FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick}>Search</button>
    );
}

export default SearchButton;
