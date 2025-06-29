require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.payments = async (req, res) => {
  try {
    const reqBody = req.body;
    const db = client.db("Payments_DB");
    const reqPayment = db.collection("payments");
    const response = await reqPayment.insertOne(reqBody);
    res.status(200).json({ message: "payment saved", success: true, response });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.paymentIntendSystem = async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
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
