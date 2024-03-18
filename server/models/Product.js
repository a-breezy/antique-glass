import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.ObjectId,
      ref: "Vendor",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // set price minimum price that item can sell for
    offerPrice: {
      type: Number,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    // images: [{
    //   type: Array,
    // }],
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
