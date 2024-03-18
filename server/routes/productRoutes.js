import express from "express";
import productController from "../controllers/product-controller.js";

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:productId")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
