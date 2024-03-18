import "dotenv/config";
import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, vendor) => {
    if (err) return res.sendStatus(403);
    req.vendor = vendor;
    next();
  });
};

export default authToken;
