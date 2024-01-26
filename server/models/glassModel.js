import mongoose from "mongoose";

const glassSchema = mongoose.Schema(
  {
    title: {
      type: String,
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
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    // images: {
    //   type: Array,
    // },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Glass = mongoose.model("Glass", glassSchema);
