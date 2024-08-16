
import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for products..."
                className="border rounded-l-lg p-2 w-3/4 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white rounded-r-lg p-2 w-1/4"
            >
                Search
            </button>
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
