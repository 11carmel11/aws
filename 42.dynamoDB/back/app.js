const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
  res.json("pong");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
