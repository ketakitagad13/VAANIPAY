# VaaniPay 🎤💳
> *"Where Your Voice Is Your Bank"*

Voice-powered, offline-capable payment system for rural India — speak in Hindi and 11 Indian languages, pay anyone, anywhere, even without internet.

---

## Problem Statement

700 million rural Indians are excluded from digital payments — not because they don't want to use them, but because existing systems were never built for them.

- 📱 **No smartphone** — 65% of rural India uses basic feature phones without app support
- 🌐 **No internet** — Poor or zero connectivity makes online payment apps completely unusable
- 📖 **Low literacy** — Complex English interfaces exclude millions of low-literacy users
- 🏦 **No bank history** — Without formal banking, rural citizens cannot access digital financial tools

> India has 1 doctor per 1,456 patients. Only 15% of rural Indians use digital payments. 85% are excluded from digital financial systems.

---

## Solution

VaaniPay enables users to make payments using voice commands in their own language — Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Gujarati, Punjabi, Odia, Malayalam, and English. No UPI IDs to memorise. No complex menus. Works fully offline.

Just say:
```
"Ramesh ko 100 rupaye bhejo"
```
VaaniPay understands, extracts the amount and recipient, and processes the payment — even without internet.

---

## Key Features

- 🎤 **Voice-based payments** — Speak naturally in your own language and dialect
- 📴 **Offline first** — Saves transactions locally, syncs automatically when internet returns
- 🔐 **OTP security** — Every login and transaction verified with a one-time password
- 🌐 **11 Indian languages** — Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Gujarati, Punjabi, Odia, Malayalam, English
- ⚡ **Risk scoring** — AI flags HIGH / MEDIUM / LOW risk before every payment
- 📊 **Live analytics** — Transaction history, balance, pending queue dashboard
- 🤖 **AI chatbot** — Instant Q&A for common user queries
- 🛡️ **Session security** — Session-only storage, never stored permanently on disk

---

## Demo

| Feature | Demo |
|---------|------|
| Voice command | Say *"Send 500 to Priya"* → App extracts ₹500 + Priya → Confirms → Pays |
| Offline mode | Toggle offline → Transaction saves to pending queue → Sync when back online |
| OTP flow | Enter phone + PIN → OTP sent → Enter code → Payment unlocked |
| Risk scoring | ₹500 = LOW RISK ✅ / ₹5000 = MEDIUM RISK ⚠️ / ₹15000 = HIGH RISK 🚨 |

---

## Tech Stack

**Frontend**
- HTML5 + CSS3 + JavaScript (Vanilla)
- Web Speech API — voice recognition, supports Hindi (`hi-IN`) and 10 other Indian languages
- localStorage — offline transaction queue

**Backend**
- Python Flask — REST API
- Session-based authentication
- OTP generation and verification

**Security**
- OTP per transaction (simulated SMS / WhatsApp)
- Session-only storage — no data persisted to disk
- Risk scoring algorithm — flags high-value transactions

**Deployment**
- Runs locally on `localhost:5000`
- Deployable to AWS / Azure with Docker containerisation

---

## System Architecture

```
User speaks command
        ↓
Web Speech API (browser)
        ↓
Command parser — extracts amount + recipient
        ↓
Online?  ──────────────────────────────────────────
   │                                          │
   ↓ Yes                                   ↓ No
Flask backend                          localStorage
POST /api/pay                          Save as TXN###
Risk scoring                         Show in pending queue
Return JSON                               ↓
        ↓                          Sync when connected
Transaction done                    POST /api/sync
        ↓
Success + confetti 🎉
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/login` | Login with phone + PIN |
| `POST` | `/api/send-otp` | Send OTP to registered number |
| `POST` | `/api/verify-otp` | Verify OTP entered by user |
| `POST` | `/api/resend-otp` | Resend new OTP |
| `POST` | `/api/pay` | Process payment |
| `GET` | `/api/balance` | Get current balance |
| `GET` | `/api/transactions` | Get last 10 transactions |
| `POST` | `/api/sync` | Sync offline pending queue |
| `POST` | `/api/voice-parse` | Parse voice command text |
| `POST` | `/api/logout` | Clear session |

---

## Folder Structure

```
VAANIPAY/
├── Backend/
│   ├── app.py              ← Flask backend (all API routes)
│   ├── templates/
│   │   ├── index.html       ← Main landing page
│   │   └── login.html       ← Login / Sign up page
│   └── static/
│       ├── css/
│       │   └── style.css    ← All styles
│       └── js/
│           └── script.js   ← All frontend logic + backend API calls
```

---

## Future Improvements

- 📱 **Android app** — React Native mobile app for feature phones
- 💬 **Real SMS OTP** — Twilio API integration for actual SMS delivery
- 🏦 **UPI integration** — Real bank API for live transactions
- 🤖 **ML fraud detection** — Random Forest model trained on MIMIC-III (40,000+ ICU records)
- 🌍 **HL7 FHIR** — Real-time vital streaming from bedside monitors
- 🔒 **Biometric auth** — Fingerprint / face ID for faster login
- 📊 **MNREGA integration** — Government wage distribution system
- 🏘️ **PM Jan Dhan Yojana** — Direct integration with government welfare schemes
- 🌐 **Offline mesh network** — Peer-to-peer sync without internet infrastructure

---

## Team

| Name | Role | GitHub |
|------|------|--------|
| Ketaki Tagad | Team Leader — Voice Feature + Frontend | [@ketakitagad13](https://github.com/ketakitagad13) |
| Yash Thakur | Backend + Integration | [@ydthakur12-ash](https://github.com/ydthakur12-ash) |
| Alok Yadav | Frontend UI | [@alok-yadav06](https://github.com/alok-yadav06)|
| Aman Patil | Research + Testing + Presentation | [@amanpa869](https://github.com/amanpa869) |

**Team Dev Dynamos**
IndiaNext 2025-26 · Rural FinTech · KES Shroff College, Mumbai

---

## Web Link

https://vaanipay.onrender.com/

## Hackathon

| Event | IndiaNext 2025-26 |
|-------|-----------------|
| Organised by | Department of IT & Data Science, K.E.S. Shroff College |
| Theme | *"Outthink The Algorithm"* |
| Track | Innovation Track |
| Focus area | Rural FinTech |

---

*Making digital payments accessible for every Indian — one voice command at a time.* 🌾
