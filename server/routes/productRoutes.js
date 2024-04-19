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
  // .post(upload.single("productImage"), async (req, res) => {
  //   // console.log("req.body", req.body);
  //   // console.log("req.file", req.file);
  //   try {
  //     //! for testing Base64 upload
  //     const b64 = Buffer.from(req.file.buffer).toString("base64");
  //     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  //     const vendorId = req.body.vendor;

  //     const cloudRes = await handleImageUpload(dataURI, vendorId);

  //     console.log("cloudRes", cloudRes);

  //     res.json(cloudRes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

router
  .route("/:productId")
  .get(getProductById)
  //! update put route if change to product images
  // .put(upload.single("productImage"), updateProduct)
  // .put(upload.single("productImage"), (req, res) => {
  //   console.log(req.file)
  //   res.json(req.file)
  // })
  .delete(deleteProduct);

export default router;
