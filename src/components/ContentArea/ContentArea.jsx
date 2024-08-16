import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import axiosPublic from '../../Utilities/useAxiosPublic';
import Pagination from './Pagination';

const ContentArea = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        // Initialize cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get('/products', {
                    params: {
                        page: currentPage,
                        limit: productsPerPage,
                        search: searchQuery || '',
                        category: filters.category || '',
                        brand: filters.brand || '',
                        minPrice: filters.priceRange ? filters.priceRange[0] : '',
                        maxPrice: filters.priceRange ? filters.priceRange[1] : '',
                    }
                });

                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, filters]);


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
    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const isItemInCart = prevCart.some(item => item._id === product._id);

            if (isItemInCart) {
                // Remove item from cart
                const updatedCart = prevCart.filter(item => item._id !== product._id);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                // Add item to cart
                const updatedCart = [...prevCart, product];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
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
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        isInCart={cart.some(item => item._id === product._id)}
                                    />
                                ))}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ContentArea;
