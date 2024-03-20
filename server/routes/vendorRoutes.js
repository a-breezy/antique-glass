import express from "express";

import vendorController from "../controllers/vendor-controller.js";

//! delete after testing routes
import authToken from "../utils/auth.js";

const router = express.Router();
const { getAllVendors, createVendor, getVendorById, deleteVendor } =
  vendorController;

// delete getAllVendors before Live
router.route("/").get(getAllVendors).post(createVendor);
router.route("/:vendorId").get(authToken, getVendorById).delete(deleteVendor);

export default router;
