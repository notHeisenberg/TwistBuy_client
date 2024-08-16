import { useState, useEffect } from 'react';
import ProductCard from '../ContentArea/ProductCard';
import { IoCalendarClear } from 'react-icons/io5';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const handleRemove = (product) => {
        // Remove item from cart
        const updatedCart = cartItems.filter(item => item._id !== product._id);
        setCartItems(updatedCart);
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="cart bg-gray-200 text-black p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cartItems.map((item) => (
                        <div className="relative group" key={item._id}>
                            <ProductCard
                                product={item}
                                onAddToCart={() => handleRemove(item)} // Use handleRemove to remove item from cart
                                isInCart={true} // To apply cart styling
                            />
                            <button
                                onClick={() => handleRemove(item)}
                                className="absolute top-2 right-2 p-2 bg-red-500 z-10 text-white rounded-full hidden group-hover:block"
                                aria-label="Remove from cart"
                            >
                                <IoCalendarClear></IoCalendarClear>
                            </button>
                            <div className="absolute top-2 right-10 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded-lg">
                                Remove from cart
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
