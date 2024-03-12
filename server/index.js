import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import glassRoutes from "./routes/glassRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.8pi33kq.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("MERN Tutorial");
});

app.use("/glass", glassRoutes);
app.use("/vendor", vendorRoutes);

mongoose
  .connect(uri)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
