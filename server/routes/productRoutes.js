import express from "express";
import productController from "../controllers/product-controller.js";

import { upload, handleImageUpload } from "../utils/fileUpload.js";

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
  .post(upload.single("productImage"), createProduct);

router
  .route("/:productId")
  .get(getProductById)
  .put(upload.single("productImage"), updateProduct)
  .delete(deleteProduct);

export default router;
