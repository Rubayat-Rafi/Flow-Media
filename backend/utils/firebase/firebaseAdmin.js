require("dotenv").config();
const admin = require("firebase-admin");
const base64Key = process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64;
if (!base64Key) {
  throw new Error("Missing Firebase Admin Key in environment variable");
}
const serviceAccount = JSON.parse(
  Buffer.from(base64Key, "base64").toString("utf-8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
