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
  .post(upload.array("productImages"), createProduct);

router
  .route("/:productId")
  .get(getProductById)
  .put(upload.array("productImages"), updateProduct)
  .delete(deleteProduct);

export default router;
