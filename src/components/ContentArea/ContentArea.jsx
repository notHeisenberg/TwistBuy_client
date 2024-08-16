import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import axiosPublic from '../../Utilities/useAxiosPublic';

const ContentArea = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 10;


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get('/products', {
                    params: { page: currentPage, limit: productsPerPage }
                });

                setProducts(response.data.products);
                setFilteredProducts(response.data.products); // Set initial filtered products
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    useEffect(() => {
        const filterAndSortProducts = () => {
            let filtered = [...products]; // Clone the products array to avoid direct mutation

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

            // Apply sorting
            if (sortOption === 'priceLowToHigh') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'priceHighToLow') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'newestFirst') {
                filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            }

            setFilteredProducts(filtered);
        };

        filterAndSortProducts();
    }, [products, searchQuery, filters, sortOption]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="content-area mt-5 container mx-auto">
            <SearchBar onSearch={handleSearch} />
            <div className="content-container space-y-4 flex flex-col md:flex-row">
                <aside className="filter-panel p-5 sm:ml-2 mt-5" >
                    <FilterPanel onFilterChange={handleFilterChange} />
                </aside>
                <main className="product-list" style={{ flex: '1 1 80%' }}>
                    <div className="flex justify-end items-center gap-2 mb-4">
                        <p >Sort by:</p>
                        <select onChange={handleSortChange} className="border p-2 rounded-lg">
                            <option value="">Select...</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="newestFirst">Date Added: Newest first</option>
                        </select>
                    </div>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>Error fetching products: {error.message}</p>
                    ) : (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                            <div className="pagination mt-4 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border rounded-lg"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages).keys()].map((page) => (
                                    <button
                                        key={page + 1}
                                        onClick={() => handlePageChange(page + 1)}
                                        className={`p-2 border rounded-lg ${currentPage === page + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border rounded-lg"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ContentArea;
