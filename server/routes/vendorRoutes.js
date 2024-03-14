import express from "express";
import vendorController from "../controllers/vendor-controller.js";

const router = express.Router();
const {getAllVendors, createVendor, getVendorById} = vendorController

router.route("/").get(getAllVendors).post(createVendor);
router.route("/:id").get(getVendorById);

export default router;
