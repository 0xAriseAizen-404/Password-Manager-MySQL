const express = require("express");
const app = express();

const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 5001;

const { ecrypt, decrypt, encrypt } = require("./EncryptPassword");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root123",
  database: "password_manager",
});

app.get("/", (req, res) => {
  res.send("Welcome to the Password Manager API");
});

app.post("/addpassword", (req, res) => {
  const { title, password, url } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords_info (title, password, url, iv) VALUES (?, ?, ?, ?);",
    [title, hashedPassword.password, url, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.error("Error adding password:", err);
        res.json("Couldn't add password");
      } else {
        res.json("Password added successfully!");
      }
    }
  );
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.delete("/deletepassword", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM passwords_info WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting password:", err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the password" });
    } else {
      console.log("Password deleted successfully");
      res.status(200).json({ message: "Password deleted successfully" });
    }
  });
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * from passwords_info;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/showpasswords/:title", (req, res) => {
  const title = req.params.title;
  db.query(
    `SELECT * from passwords_info where title LIKE '${title.toString()}%';`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }
    console.log("Connected to the database!");
  });
});
