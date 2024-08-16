
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-green-500 font-bold text-lg mb-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-yellow-500">Rating: {product.ratings} ★</p>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        ratings: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;
