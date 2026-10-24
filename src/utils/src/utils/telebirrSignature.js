const crypto = require("crypto");

function canonicalizeForSignature(payload) {
  const sorted = Object.keys(payload)
    .sort()
    .reduce((acc, key) => {
      acc[key] = payload[key];
      return acc;
    }, {});

  return JSON.stringify(sorted);
}

function verifySignature({ payload, secretKey, signature }) {
  if (!secretKey || !signature) return false;

  const canonical = canonicalizeForSignature(payload);
  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(canonical)
    .digest("hex");

  const provided = String(signature).trim();

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(provided.toLowerCase(), "hex")
    );
  } catch (err) {
    return false;
  }
}

function generateSignature({ payload, secretKey }) {
  if (!secretKey) throw new Error("Missing secret key");

  const canonical = canonicalizeForSignature(payload);

  return crypto
    .createHmac("sha256", secretKey)
    .update(canonical)
    .digest("hex");
}

module.exports = {
  canonicalizeForSignature,
  verifySignature,
  generateSignature
};
