require("dotenv").config();
const { ObjectId } = require("mongodb");
const client = require("../lib/db_connection/db_connection.js");
exports.affiliate = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const affiliateCollection = db.collection("affiliates");
    const usersCollection = db.collection("users");
    const reqBody = req.body;

    // Check if affiliate already exists
    const existingAffiliate = await affiliateCollection.findOne({
      $or: [{ userId: reqBody?.userId }, { email: reqBody?.email }],
    });

    if (existingAffiliate) {
      return res.status(200).json({
        message: "Affiliate already exists",
        success: false,
      });
    }

    // Prepare data
    reqBody.applyDate = new Date();
    reqBody.timeStamp = Date.now();
    reqBody.status = false;

    // Insert affiliate into affiliates collection
    const affiliateInsert = await affiliateCollection.insertOne(reqBody);

    if (!affiliateInsert.insertedId) {
      return res.status(500).json({
        message: "Error inserting affiliate",
        success: false,
      });
    }

    // Update the user with affiliateInfo
    const updateUser = await usersCollection.updateOne(
      { _id: new ObjectId(reqBody.userId) },
      {
        $set: {
          affiliateInfo: {
            status: false,
            pid: "",
          },
        },
      }
    );

    if (updateUser.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found to update affiliateInfo",
        success: false,
      });
    }

    // Notify all admins by pushing to their affiliate array
    const existingAdmins = await usersCollection
      .find({ role: "admin" })
      .toArray();

    if (existingAdmins.length === 0) {
      return res.status(404).json({
        message: "No admin found",
        success: false,
      });
    }

    const affiliateData = {
      affiliateId: affiliateInsert.insertedId,
      userId: reqBody?.userId,
      status: false,
      pid: "",
    };

    for (const admin of existingAdmins) {
      await usersCollection.updateOne(
        { _id: admin._id },
        {
          $push: { affiliates: affiliateData },
        }
      );
    }

    return res.status(201).json({
      message: "Affiliate application submitted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.myAffiliate = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const affiliateCollection = db.collection("affiliates");
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        message: "Missing userId",
        success: false,
      });
    }

    const findAffiliate = await affiliateCollection.findOne({
      userId: userId,
    });

    if (!findAffiliate) {
      return res.status(404).json({
        message: "Affiliate not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Affiliate found",
      success: true,
      data: findAffiliate,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};



exports.affiliateAction = async (req, res) => {
  const { id } = req.params; // `id` refers to userId
  const { action, pid, adminId } = req.body;
  const db = client.db("flow_media");
  const affiliateCollection = db.collection("affiliates");
  const usersCollection = db.collection("users");

  try {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid user or admin ID" });
    }

    if (action === "approve") {
      if (!pid) {
        return res
          .status(400)
          .json({ message: "PID is required for approval" });
      }

      await affiliateCollection.updateOne(
        { userId: id },
        { $set: { status: true, pid } }
      );

      await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            affiliateInfo: {
              status: true,
              pid,
            },
          },
        }
      );

      await usersCollection.updateOne(
        { _id: new ObjectId(adminId) },
        {
          $set: {
            "affiliates.$[elem].status": true,
            "affiliates.$[elem].pid": pid,
          },
        },
        {
          arrayFilters: [{ "elem.userId": id }],
        }
      );
    } else if (action === "reject") {
      await affiliateCollection.updateOne(
        { userId: id },
        { $set: { status: "rejected" } }
      );

      await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            "affiliateInfo.status": "rejected",
          },
        }
      );

      await usersCollection.updateOne(
        { _id: new ObjectId(adminId) },
        {
          $set: {
            "affiliates.$[elem].status": "rejected",
          },
        },
        {
          arrayFilters: [{ "elem.userId": id }],
        }
      );
    } else if (action === "delete") {
      await affiliateCollection.deleteOne({ userId: id });
      
      await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $unset: { affiliateInfo: "" } }
      );

     
      await usersCollection.updateOne(
        { _id: new ObjectId(adminId) },
        {
          $pull: {
            affiliates: { userId: id },
          },
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    return res.status(200).json({
      message: `Affiliate ${action}d successfully`,
      success: true,
    });
  } catch (err) {
    console.error("Affiliate action error:", err);
    return res.status(500).json({ message: err.message, success: false });
  }
};
