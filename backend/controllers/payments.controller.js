require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const package = require("../utils/subscriptions/packages/packages.js");
exports.payments = async (req, res) => {
  try {
    const { pack, queryEmail, formData, caustomDate } = req.body;
    const plan = pack;
    const expiryDate = await package.Package({ plan, caustomDate });
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const findUser = await usersCollection.findOne({ email: queryEmail });
    if (!findUser) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    if (
      findUser.subscribe === "active" &&
      findUser.subscription &&
      findUser.subscription.status === "active"
    ) {
      return res.status(200).json({
        message: "Subscription already active for this user",
        success: false,
      });
    }

    const subscription = {
      pack,
      details: formData,
      startDate: new Date(),
      endDate: expiryDate,
      status: "active",
      emails: [findUser.email],
    };

    const newRevenueEntry = {
      amount: formData?.amount / 100,
      plan: pack,
      date: new Date(),
    };
    const updatedUser = await usersCollection.updateOne(
      { email: queryEmail },
      {
        $set: {
          subscribe: "active",
          subscription: subscription,
        },
        $push: {
          revenue: newRevenueEntry,
        },
      }
    );
    if (updatedUser.modifiedCount > 0) {
      return res.status(200).json({
        message: "Subscription updated successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Failed to update subscription",
        success: false,
      });
    }
  } catch (error) {
    console.error("Payment Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.expiredSubscription = async (req, res) => {
  try {
    const { email } = req.params;
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const subscription = user.subscription;
    if (!subscription || subscription.status === "expired") {
      return res.status(200).json({
        message: "Subscription already expired or not found",
        success: false,
      });
    }
    const now = new Date();
    const endDate = new Date(subscription.endDate);
    if (now > endDate) {
      subscription.status = "expired";
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            subscribe: "expired",
            subscription,
          },
        }
      );
      const linkedEmails = subscription.emails || [];
      await usersCollection.updateMany(
        { email: { $in: linkedEmails } },
        {
          $set: {
            subscribe: "expired",
          },
        }
      );

      return res.status(200).json({
        message: "Subscription expired and all linked users updated",
        success: true,
      });
    }
    return res
      .status(200)
      .json({ message: "Subscription still active", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.paymentIntendSystem = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addDeveiceEmail = async (req, res) => {
  try {
    const { pack, userEmail, deviceEmail } = req.body;
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const deviceUser = await usersCollection.findOne({ email: deviceEmail });
    if (deviceUser) {
      await usersCollection.updateOne(
        { email: deviceEmail },
        { $set: { subscribe: "active" } }
      );
    } else {
      return res.status(404).json({
        message: "Device email user not found. Please create an account first.",
        success: false,
      });
    }
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user || !user.subscription) {
      return res
        .status(404)
        .json({ message: "User or subscription not found" });
    }
    const subscription = user.subscription;
    if (subscription.status !== "active") {
      return res.status(400).json({ message: "Subscription is not active" });
    }
    if (subscription.emails.includes(deviceEmail)) {
      return res.status(400).json({ message: "Device email already exists" });
    }
    const maxEmails = pack === "yearly" ? 3 : 2;

    if (subscription.emails.length >= maxEmails) {
      return res.status(400).json({
        message: `Maximum ${
          maxEmails - 1
        } extra devices allowed for ${pack} plan`,
      });
    }
    subscription.emails.push(deviceEmail);
    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { subscription } }
    );
    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: "Device email added successfully",
        emails: subscription.emails,
        success: true,
      });
    } else {
      return res.status(400).json({ message: "Failed to update subscription" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeDeviceEmail = async (req, res) => {
  try {
    const { userEmail, deviceEmail } = req.body;
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user || !user.subscription) {
      return res
        .status(404)
        .json({ message: "User or subscription not found" });
    }
    const subscription = user.subscription;
    if (!subscription.emails.includes(deviceEmail)) {
      return res
        .status(400)
        .json({ message: "Device email not found in subscription" });
    }
    const updatedEmails = subscription.emails.filter(
      (email) => email !== deviceEmail
    );
    subscription.emails = updatedEmails;
    const updateSubscription = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { subscription } }
    );
    const updateDevice = await usersCollection.updateOne(
      { email: deviceEmail },
      { $set: { subscribe: "expired" } }
    );
    if (
      updateSubscription.modifiedCount > 0 ||
      updateDevice.modifiedCount > 0
    ) {
      return res.status(200).json({
        message: "Device email removed successfully",
        emails: updatedEmails,
        success: true,
      });
    } else {
      return res.status(400).json({ message: "Failed to update data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
