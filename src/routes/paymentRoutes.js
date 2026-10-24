const express = require("express");
const { createPaymentRequest, verifyPayment } = require("../services/paymentService");
const { validateTelebirrCallback } = require("../middleware/validateTelebirrCallback");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "telebirr-payment-service",
    timestamp: Date.now()
  });
});

router.post("/api/payments/init", async (req, res) => {
  try {
    const { amount, phone, description, merchantOrderId } = req.body;

    if (!amount || !phone) {
      return res.status(400).json({
        success: false,
        message: "amount and phone are required"
      });
    }

    const result = await createPaymentRequest({
      amount,
      phone,
      description: description || "Telebirr payment",
      merchantOrderId
    });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Payment init failed:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to initialize payment",
      error: error.response?.data || error.message
    });
  }
});

router.post("/api/payments/verify", async (req, res) => {
  try {
    const { merchantOrderId, transactionId } = req.body;

    if (!merchantOrderId || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "merchantOrderId and transactionId are required"
      });
    }

    const result = await verifyPayment({ merchantOrderId, transactionId });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Payment verify failed:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.response?.data || error.message
    });
  }
});

router.post("/api/payments/callback", validateTelebirrCallback, async (req, res) => {
  try {
    const callback = req.telebirrCallback;

    // Production:
    // - check idempotency
    // - persist payment status
    // - update DB order
    // - return 200

    return res.status(200).json({
      success: true,
      message: "Callback accepted",
      transactionId: callback.transactionId
    });
  } catch (error) {
    console.error("Process callback error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process callback"
    });
  }
});

module.exports = router;
