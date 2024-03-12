import express from "express";
import {Vendor} from "../models";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/vendor", async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).send({
      message:
        "Send all required fields: first name, last name, email, and password",
    });
  }

  try {
    const newVendor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hash(req.body.password, 10),
    };
    const vendor = await Vendor.create(newVendor);
    return res.status(201).send(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
