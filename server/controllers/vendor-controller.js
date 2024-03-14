import { Vendor } from "../models/Vendor.js";
import bcrypt from "bcrypt";

const vendorController = {
  // get all vendors
  getAllVendors: async (req, res) => {
    try {
      const vendors = await Vendor.find({});
      return res.status(200).json({ data: vendors });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },

  // get vendor
  getVendorById: async ({ params }, res) => {
    try {
      const vendor = await Vendor.findById({ _id: params.id });
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      return res.status(200).json(vendor);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },

  // create vendor
  createVendor: async ({ body }, res) => {
    try {
      const newVendor = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      };
      console.log(newVendor);
      const vendor = await Vendor.create(newVendor);
      return res.status(201).send(vendor);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },
  // update vendor -- uncertain if I will make this yet

  // vendor dashboard - prints all products from that vendor
};

export default vendorController;
