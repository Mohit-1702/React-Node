const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "empinfo",
  connectionLimit: 10
});

// SHOW
app.get("/item_dtl_mst", (req, res) => {
  db.query("SELECT * FROM item_dtl_mst", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// INSERT
app.post("/item_dtl_mst", (req, res) => {
  const { item_cd, item_nm } = req.body;
  const sql = "INSERT INTO item_dtl_mst (item_cd, item_nm) VALUES (?, ?)";

  db.query(sql, [item_cd, item_nm], (err, result) => {
    if (err) return res.json(err);
    return res.json("Inserted");
  });
});

// DELETE (USING item_cd ONLY)
app.delete("/item_dtl_mst/:item_cd", (req, res) => {
  const sql = "DELETE FROM item_dtl_mst WHERE item_cd = ?";
  db.query(sql, [req.params.item_cd], (err, result) => {
    if (err) return res.json(err);
    return res.json("Deleted");
  });
});

app.listen(8081, () => {
  console.log("Server running on 8081");
});


db.getConnection((err, connection) => {
  if (err) {
    console.log("DB Connection Failed ❌", err);
  } else {
    console.log("DB Connected ✅");
    connection.release();
  }
});