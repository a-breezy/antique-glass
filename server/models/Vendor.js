import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

vendorSchema.virtual("productCount").get(function () {
  return this.products.length;
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
