/**
 * This page is for filtering products by brand, category, or genre
 * @param {*} products 
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
const filterProducts = (products, key, value) => {
    // Return all (without filtering) if no filtering specified
    if (!key || !value) {
        return products;
    } 
    // Return products filtered by the specified filter key.
    return products.filter((product) => product[key] === value);
  };
  
  export default filterProducts;
  