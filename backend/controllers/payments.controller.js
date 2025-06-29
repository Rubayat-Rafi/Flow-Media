require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.payments = async (req, res) => {
  try {
    const {amount, pack, queryEmail, formData} = req.body;
    console.log(amount, pack, queryEmail, formData)
    // const db = client.db("Payments_DB");
    // const reqPayment = db.collection("payments");
    // const response = await reqPayment.insertOne(reqBody);
    res.status(200).json({ message: "payment saved", success: true, });
  } catch (error) {
    res.status(500).json({ error: err.message });
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
