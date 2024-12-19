import React, { useState, useEffect } from 'react';
import Item from '../components/item/Item';
import "./CSS/All.css"

function All () {
    const[products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:8080/api/products")

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await response.json()
                setProducts(data)

            } catch (err) {
                setError(err.message)
                console.error("Error fetching products:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="allItem">
            <h1>All Items</h1>
            <hr />
            {loading ? (
                <p>Loading products..</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="allProducts">
                    {products.map((product) => (
                        <Item
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image_url}
                            price={product.price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default All