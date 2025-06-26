exports.subscription = async (req, res) => {
  try {
    const data = req.body;
    res.status(201).json({ message: "Subscription completed", data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
