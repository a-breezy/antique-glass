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
    availability: {
      type: Boolean,
      required: true,
    },
    images:
      //! create an array after tested and accurate
      [
        {
          type: String,
          // size: Number,
          // type: String
        },
      ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
