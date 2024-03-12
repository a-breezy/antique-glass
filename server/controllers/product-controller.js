const { Product } = require("../models");

const productController = {
    // get all products
  getAllProducts : async (req, res) => {
    Product.find({}).then();
  },
  
  // get single product

  //update product

  //delete product
};

module.exports = productController;
