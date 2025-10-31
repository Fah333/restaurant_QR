"use strict";
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: false,
});

// ตรวจสอบ DB connection
async function assertDb() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
}

// ฟังก์ชัน query แบบง่าย
async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// ดึง connection เฉพาะกรณีต้องใช้ transaction
async function getConnection() {
  return pool.getConnection();
}

module.exports = { pool, query, getConnection, assertDb };
