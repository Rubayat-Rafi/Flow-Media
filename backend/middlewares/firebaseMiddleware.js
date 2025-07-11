const admin = require("../utils/firebase/firebaseAdmin.js"); 

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // now you have access to uid, email, etc.
    next(); // move to next middleware or route
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = verifyFirebaseToken;
