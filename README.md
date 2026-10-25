# Telebirr Integration Service

<!-- Banner: upload assets/banner.png then uncomment the line below -->
<!-- ![Safaricom + GitHub](assets/banner.png) -->

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
└── utils/
    └── telebirrSignature.js
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

1. Create folder `assets/`
2. Upload the Safaricom + GitHub banner as `assets/banner.png`
3. Uncomment the banner line at the top of this README
4. (Optional) Set the same image as **Social preview** in  
   Repo → Settings → General → Social preview

---

## License

MIT
