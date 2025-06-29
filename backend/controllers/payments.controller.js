require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const package = require("../utils/subscriptions/packages/packages.js");

exports.payments = async (req, res) => {
  try {
    const { amount, pack, queryEmail, formData } = req.body;
    console.log(amount, pack, queryEmail, formData);

    const plan = pack;
    // const expiryDate = await package.Package({ plan });

    // const subscription = {
    //   queryEmail,
    //   pack,
    //   startDate: new Date(),
    //   endDate: expiryDate,
    //   status: "active",
    // };
    const subscription = {
      queryEmail,
      pack,
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1 * 60 * 1000), // 1 minute from now
      status: "active",
    };

    const db = client.db("flow_media");
    const usersCollection = db.collection("users");

    const updatedUser = await usersCollection.updateOne(
      { email: queryEmail },
      {
        $set: {
          subscribe: true,
          subscription: subscription,
        },
      }
    );

    if (updatedUser.modifiedCount > 0) {
      res
        .status(200)
        .json({ message: "Subscription updated successfully", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
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
