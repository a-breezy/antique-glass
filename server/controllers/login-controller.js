import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Vendor } from "../models/Vendor.js";

const loginController = {
  // login vendor
  login: async ({ body }, res) => {
    const { email, password } = body;
    const vendor = await Vendor.findOne({ email: email });
    // console.log(vendor);
    if (!vendor) return res.status(401).json({ message: "Vendor not found" });
    try {
      const validPassword = await bcrypt.compare(password, vendor.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      return res.json({ id: vendor._id, token: token });
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: err.message });
    }
  },
  //   logout
};

export default loginController;
