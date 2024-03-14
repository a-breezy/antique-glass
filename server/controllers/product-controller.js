import { Product } from "../models/Product.js";

const productController = {
  // get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({})
      return res.status(200).json({
        data: products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },

  // get single product
  getProductById: async ({ params }, res) => {
    try {
      const product = await Product.findById({ _id: params.id });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: error.message });
    }
  },

  // create new product
  createProduct: async ({ body }, res) => {
    if (
      !body.title ||
      !body.vendor ||
      !body.description ||
      !body.condition ||
      !body.quantity ||
      !body.price ||
      !body.availability
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title, availability, price, and quantity",
      });
    } else {
      try {
        const newProduct = {
          title: body.title,
          vendor: body.vendor,
          description: body.description,
          condition: body.condition,
          quantity: body.quantity,
          price: body.price,
          // offerPrice:.body.offerPrice,
          availability: body.availability,
        };
        const product = await Product.create(newProduct);
        return res.status(201).send(product);
      } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
      }
    }
  },

  //update product
  updateProduct: async ({ params, body }, res) => {
    try {
      const product = await Product.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).send({ message: "Product updated" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },

  //delete product
  deleteProduct: async ({ params }, res) => {
    try {
      const product = await Product.findByIdAndDelete({ _id: params.id });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).send({ message: "Product successfully deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },
};

export default productController;
