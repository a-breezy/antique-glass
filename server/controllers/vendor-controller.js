import { Vendor } from "../models/Vendor.js";
import bcrypt from "bcrypt";

const vendorController = {
  //! delete for production
  // get all vendors
  getAllVendors: async (req, res) => {
    try {
      const vendors = await Vendor.find({})
        .populate({
          path: "products",
          model: "Product",
          select: "-__v",
        })
        .select("-__v");
      return res.status(200).json({ data: vendors });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // get vendor
  getVendorById: async ({ params }, res) => {
    try {
      const vendor = await Vendor.findById({ _id: params.vendorId })
        .populate({
          path: "products",
          model: "Product",
          select: "-__v",
        })
        .select("-__v");
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      return res.status(200).json(vendor);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  // create vendor
  createVendor: async ({ body }, res) => {
    try {
      const newVendor = {
        ...body,
        password: await bcrypt.hash(body.password, 10),
      };
      const vendor = await Vendor.create(newVendor);
      return res.status(201).json(vendor);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  // delete vendor
  deleteVendor: async ({ params }, res) => {
    try {
      const vendor = await Vendor.findByIdAndDelete({ _id: params.vendorId });
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });

      return res.status(200).json({ message: "Vendor successfully deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  // update vendor -- uncertain if I will make this yet

  // vendor dashboard - prints all products from that vendor
  // this can be done through a virtual in vendor perhaps
};

export default vendorController;
