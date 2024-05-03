import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();

// connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.8pi33kq.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const db = mongoose
  .connect(uri || `mongodb://127.0.0.1:27017/Unique-wares`)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));
  
app.use(cors());
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/vendor", vendorRoutes);
app.use("/products", productRoutes);


app.use((req, res) => {
  //! check what the request is for testing raspberry pi
  console.log(req);
  res.status(404).send("<h1>404 Error!</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
