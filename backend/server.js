"use strict";
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { assertDb } = require("./DB/db");
const routes = require("./routes/index");

const app = express();

// CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/", routes);

app.get("/", (_req, res) => res.send("Restaurant API is running 🚀"));

// start server
const PORT = process.env.PORT || 5000;

assertDb().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
});
