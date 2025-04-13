import { verifyToken } from "../utils/token.js";

const AuthMiddlewares = {
  verifyAccessToken: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) throw new Error("Please enter token");
      // Split the access token from the bearer token
      const token = authHeader.split(" ")[1];

      // Validate the access token
      const data = verifyToken(token, "AT");
      req.user = data;
      return next();
    } catch (error) {
      let type = "";
      let getMessage = "";
      switch (error.message) {
        case "invalid signature":
          getMessage = "Cannot verify token";
          type = "INVALID_TOKEN";
          break;
        case "jwt expired":
          getMessage = "Token is expired";
          type = "EXP_TOKEN";
          break;
        default:
          getMessage = "Cannot authenticate user";
          type = "UNAUTH";
          break;
      }
      res.status(401).send({
        message: getMessage,
        type,
        success: false,
        data: null,
      });
    }
  },
  verifyRefreshToken: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) throw new Error("Please enter token");
      // Split the access token from the bearer token
      const token = authHeader.split(" ")[1];

      // Validate the access token
      const data = verifyToken(token, "RT");
      req.user = data;
      return next();
    } catch (error) {
      let type = "";
      let getMessage = "";
      switch (error.message) {
        case "invalid signature":
          getMessage = "Cannot verify token";
          type = "INVALID_TOKEN";
          break;
        case "jwt expired":
          getMessage = "Token is expired";
          type = "EXP_TOKEN";
          break;
        default:
          getMessage = "Cannot authenticate user";
          type = "UNAUTH";
          break;
      }
      res.status(401).send({
        message: getMessage,
        type,
        success: false,
        data: null,
      });
    }
  },
  verifyAdmin: (req, res, next) => {
    try {
      // Get the user info from req
      // Assume that user is verified before
      const { user } = req;
      // If user doesn't exist or not an admin
      if (!user || String(user.role) !== "Admin") {
        throw new Error("Not_admin");
      }

      return next();
    } catch (error) {
      let type = "";
      let getMessage = "";
      switch (error.message) {
        case "Not_admin":
          getMessage = "Admin access required";
          type = "Forbidden";
          break;
        default:
          getMessage = "Access denied";
          type = "UNAUTH";
          break;
      }
      res.status(403).send({
        message: getMessage,
        type,
        success: false,
        data: null,
      });
    }
  },
};

export default AuthMiddlewares;
