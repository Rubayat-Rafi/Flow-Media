const client = require("../../lib/db_connection/db_connection.js");
const { ObjectId } = require("mongodb");
exports.resolveM3u8SecureUrlFromDB = async (id) => {
  try {
    const db = client.db("flow_media");
    const streamCollect = db.collection("categorys");
    const stream = await streamCollect.findOne({ _id: new ObjectId(id) });
    if (!stream) {
      return null;
    }
    const url = stream.matchUrl || stream.channelURL;
    return url;
  } catch (error) {
    console.error("Error fetching stream URL:", error);
    return null;
  }
};
