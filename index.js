require("dotenv").config();
const express = require("express");
const expressFormidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(expressFormidable());
app.use(cors());

const characters = require("./routes/characters");
app.use(characters);
const comics = require("./routes/comics");
app.use(comics);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.all("*", (req, res) => {
  res.json({ error: { message: "Page not found" } });
});

app.listen(process.env.SERV_PORT, () => {
  console.log("Server Started");
});
