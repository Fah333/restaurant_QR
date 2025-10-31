"use strict";
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { assertDb } = require("./DB/db");
const routes = require("./routes/index");

const app = express();

// ✅ ตั้งค่า CORS ให้รองรับทั้ง localhost และ Vercel
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://restaurant-qr-qskx.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ routes
app.use("/", routes);

// ✅ root endpoint (Render จะใช้ตรงนี้ตรวจว่าแอปรันอยู่ไหม)
app.get("/", (_req, res) => res.send("✅ Restaurant API is running 🚀"));

// ✅ start server
const PORT = process.env.PORT || 5000;
assertDb().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
  );
});
