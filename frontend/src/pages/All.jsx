import React, { useState, useEffect } from 'react';
import Item from '../components/item/Item';
import "./CSS/All.css"
import Sort from "../components/sort/Sort.jsx"; // Ensure this matches the exact file path
import sortProducts from "../components//sort/SortProducts.js"; // Ensure this matches the exact file path


function All () {
    const[products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sortOption, setSortOption] = useState("default"); // Default sort option


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

    const handleSort = (option) => {
        setSortOption(option); // Update sort option
        const sorted = sortProducts(products, option); // Sort the products
        setProducts(sorted); // Update the state with the sorted products
      };
    
      return (
        <div className="allItem">
          <h1>All Items</h1>
          <hr />
          {!loading && !error && (
            <Sort onSort={handleSort} /> // Pass handleSort to Sort component
          )}
          {loading ? (
            <p>Loading products...</p>
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
    
    export default All;