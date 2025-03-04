import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;

const AuthMiddlewares = {
  validateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      // Split the access token from the bearer token
      const token = authHeader.split(" ")[1];

      // Validate the access token
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send({
            message: "Access token is invalid",
            success: false,
            data: null,
          });
        } else {
          // Save user info into req,
          // Req will be transferred to next handlers
          req.user = decoded;
          return next();
        }
      });
    } else {
      res.status(401).send({
        message: "Access token is missing",
        success: false,
        data: null,
      });
    }
  },
};

export default AuthMiddlewares;
