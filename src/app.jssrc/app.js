const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    name: "Telebirr Payment Service",
    status: "running"
  });
});

app.use(paymentRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

module.exports = app;
