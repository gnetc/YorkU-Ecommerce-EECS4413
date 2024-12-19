import React, { useContext, useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams } from 'react-router-dom';
import "./ProductDisplay.css"
import { ShopContext } from '../../context/ShopContext';

/**
 * this page is for displaying the product the user clicked on - shows detail of the product
 * @param {*} props 
 * @returns product info page
 */
function ProductDisplay() {
    const { productId } = useParams(); // Get productId from the URL
    const [product, setProduct] = useState(null); // Initially null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const {addToCart} = useContext(ShopContext);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="productDisplay">
            <div className="displayLeft">
                <div className="displayImg">
                    <img
                        className="displayMain"
                        src={product.image_url} // Ensure backend uses 'image_url'
                        alt={product.name}
                    />
                </div>
            </div>
            <div className="displayRight">
                <h1>{product.name}</h1>
                <div className="displayPrice">${product.price}</div>
                <div className="displayBrand">Brand:&nbsp;<span>{product.brand}</span></div>
                <div className="displayQuantity">
                    Quantity left:&nbsp;<span>{product.stock}</span>
                </div>
                <div className="displayDescription">
                    Description:&nbsp;<span>{product.description}</span>
                </div>
                <button onClick={() => {addToCart(product.id)}}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductDisplay;