
import PropTypes from 'prop-types';
import { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handleFilterChange = () => {
        onFilterChange({ category, brand, priceRange });
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                >
                    <option value="">All Categories</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bags">Bags</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Watches">Watches</option>
                    {/* Add more categories as needed */}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Brand</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter brand name"
                    className="border rounded-lg p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price Range</label>
                <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                    placeholder="Min price"
                    className="border rounded-lg p-2 w-full mb-2"
                />
                <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                    placeholder="Max price"
                    className="border rounded-lg p-2 w-full"
                />
            </div>

            <button
                onClick={handleFilterChange}
                className="bg-blue-500 text-white rounded-lg p-2 w-full"
            >
                Apply Filters
            </button>
        </div>
    );
};

FilterPanel.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FilterPanel;
