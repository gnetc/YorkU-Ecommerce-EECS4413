const sortProducts = (data, sortOption) => {
    let sorted = [...data]; 
  
    switch (sortOption) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price); // Price: Low to High
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price); // Price: High to Low
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name)); // Name: A to Z
        break;
      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name)); // Name: Z to A
        break;
      default:
        return data;
    }
  
    return sorted;
  };
  
  export default sortProducts;
  