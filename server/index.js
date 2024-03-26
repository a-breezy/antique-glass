import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { authToken } from "./utils/auth.js";

import productRoutes from "./routes/productRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.8pi33kq.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/Unique-wares`);
// mongoose.set('debug', true);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());

// app.get("/", res.send({ message: "correct" }));

app.use("/login", loginRoutes);
//! uncomment after testing to apply middleware to all routes
// app.use("/vendor", authToken, vendorRoutes);
app.use("/vendor", vendorRoutes);
app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>404 Error!</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port: ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
