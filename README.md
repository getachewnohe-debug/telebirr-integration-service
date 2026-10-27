# Telebirr Integration Service

![Safaricom + GitHub](src/file_000000007c6482088589e5e7ceade7c6.png)

**Telebirr Payment Integration Service** — Node.js service for handling Telebirr H5 payments, callbacks, and verification.

---

## Features

- Payment initialization (`/api/payments/init`)
- Payment verification (`/api/payments/verify`)
- Secure callback handling with signature validation
- HMAC-SHA256 signature verification
- Timestamp freshness check (anti-replay)

---

## Project Structure

```text
src/
├── server.js
├── app.js                  (currently under app.jssrc/)
├── routes/
│   └── paymentRoutes.js
├── middleware/
│   └── validateTelebirrCallback
├── utils/
│   └── telebirrSignature.js
└── file_000000007c6482088589e5e7ceade7c6.png   ← banner (move to assets/ later)
```

> Note: The folder structure has some issues (e.g. `app.jssrc`). Clean-up recommended.

---

## Quick Start

```bash
npm install
node src/server.js
```

---

## Callback URL

After payment, Telebirr sends a POST request to:

```text
https://your-domain.com/api/payments/callback
```

Make sure the URL is **HTTPS** and publicly accessible.

---

## Banner / Social Preview

Banner is currently at:
`src/file_000000007c6482088589e5e7ceade7c6.png`

Recommended later:
1. Move it to `assets/banner.png`
2. Update the image path in this README
3. Set it as **Social preview** in Repo → Settings → General → Social preview

---

## License

MIT
