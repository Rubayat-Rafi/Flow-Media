require("dotenv").config();
exports.health = async (req, res) => {
  res.status(200).send("OK");
};
