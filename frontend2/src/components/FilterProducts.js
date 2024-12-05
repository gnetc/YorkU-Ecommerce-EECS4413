const filterProducts = (products, key, value) => {
    if (!key || !value) {
        return products;
    } 
    return products.filter((product) => product[key] === value);
  };
  
  export default filterProducts;
  