import { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component
import SearchBar from './SearchBar'; // Assuming you have a SearchBar component
import FilterPanel from './FilterPanel'; // Assuming you have a FilterPanel component
import axiosPublic from '../../Utilities/useAxiosPublic';

const ContentArea = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get('/products'); // Replace with your API endpoint
                setProducts(response.data);
                setFilteredProducts(response.data); // Set initial filtered products
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            let filtered = products;

            // Filter by search query
            if (searchQuery) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Apply additional filters (like category, brand, price, etc.)
            if (filters.category) {
                filtered = filtered.filter(product => product.category === filters.category);
            }
            if (filters.brand) {
                filtered = filtered.filter(product => product.brand === filters.brand);
            }
            if (filters.priceRange) {
                const [min, max] = filters.priceRange;
                filtered = filtered.filter(product => product.price >= min && product.price <= max);
            }

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [products, searchQuery, filters]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="content-area mt-5 container mx-auto">
            <SearchBar onSearch={handleSearch} />
            <div className="content-container" style={{ display: 'flex' }}>
                <aside className="filter-panel pr-5" style={{ flex: '1 1 20%' }}>
                    <FilterPanel onFilterChange={handleFilterChange} />
                </aside>
                <main className="product-list" style={{ flex: '1 1 80%' }}>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>Error fetching products: {error.message}</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ContentArea;
