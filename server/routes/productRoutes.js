import express from "express";
import productController from "../controllers/product-controller.js";

import upload from "../utils/fileUpload.js";

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  // .post(upload.single("productImage"), createProduct);
  .post(upload.single("productImage"), (req, res) => {
    console.log("here")
    console.log(req.body)
    console.log(req.file)
    res.json(req.file)
  });

router
  .route("/:productId")
  .get(getProductById)
  //! update put route if change to product images
  .put(upload.single("productImage"), updateProduct)
  // .put(upload.single("productImage"), (req, res) => {
  //   console.log(req.file)
  //   res.json(req.file)
  // })
  .delete(deleteProduct);

export default router;
