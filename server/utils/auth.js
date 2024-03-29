import "dotenv/config";
import jwt from "jsonwebtoken";
import { Vendor } from "../models/Vendor.js";

export const authToken = function (req, res, next) {
  let { authorization, refreshtoken } = req.headers;
  if (!authorization || !refreshtoken)
    return res.status(401).send({ message: "Please log in" });
  const token = req.headers.authorization.split(" ")[1];
  const refreshToken = req.headers.refreshtoken.split(" ")[1];

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      verifyRefreshToken(refreshToken, req, res, next);
    } else {
      req.vendor = decoded;
      next();
    }
  });
};

// if token has expired check refresh token and return new tokens
async function verifyRefreshToken(refreshToken, req, res, next) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (decoded) {
      const vendor = await Vendor.findOne({ email: decoded.email });
      if (!vendor) return res.status(403).send({ message: "Vendor not found" });
      const newToken = jwt.sign(
        { email: vendor.email },
        process.env.SECRET_TOKEN
      );
      const newRefreshToken = jwt.sign(
        { email: vendor.email },
        process.env.REFRESH_TOKEN
      );
      req.newTokens = { token: newToken, refreshToken: newRefreshToken };
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Refresh token is invalid" });
  }
}
