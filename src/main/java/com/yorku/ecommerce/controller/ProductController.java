package com.yorku.ecommerce.controller;



  public class ProductController {

    @Autowired
    private ProductDAO productDAO;

    @GetMapping
    public List<Product> getAllProducts(
    @RequestParam(required = false) Integer categoryId,
    @RequestParam(required = false) Integer brandId,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) String sort) {
    return productDAO.getAllProducts(categoryId, brandId, search, sort);
     }
    @PostMapping
    public void createProduct(@RequestBody Product product) {
        productDAO.save(product);
    }

    @GetMapping("/products")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

     @GetMapping("")
    
   

    
 }
