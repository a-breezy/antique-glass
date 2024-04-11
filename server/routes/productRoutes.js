import express from "express";
import productController from "../controllers/product-controller.js";

import { v4 as uuidv4 } from "uuid";
import multer from "multer";

//! uncomment when correct working
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file)
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    console.log("In Multer checking file", file);
    cb(null, uuidv4() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

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
  // ! change upload to array when it works
  .post(upload.array("productImages"), createProduct);
  // .post(upload.array("productImages"), (req, res) => {
  //   console.log("line 39", req.files);
  //   console.log(req.body);
  //   res.json({...req.body, images:req.files});
  // });

router
  .route("/:productId")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
