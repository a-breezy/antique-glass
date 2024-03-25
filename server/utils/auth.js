import "dotenv/config";
import jwt from "jsonwebtoken";

// create a token to authenticate user
export const authToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, vendor) => {
    if (err) return res.sendStatus(403);
    req.vendor = vendor;
    next();
  });
};

// validate token from user
export const validateToken = function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }
  if (!token) return req;
  try {
    const { data } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.vendor = data;
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return req;
};
