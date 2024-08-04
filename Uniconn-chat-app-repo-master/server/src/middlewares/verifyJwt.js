import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decodedToken.id).select(
      "-passwordHash -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default verifyToken;
