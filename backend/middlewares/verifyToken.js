// middlewares/verifyToken.js
const verifyToken = async (req, res, next) => {
    try {
       const token = req.headers;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
module.exports = verifyToken;
