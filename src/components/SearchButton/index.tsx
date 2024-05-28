import './index.sass';
import { MouseEvent } from 'react';

interface SearchButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => (
    <button className="searchButton" onClick={onClick}>Search</button>
);


