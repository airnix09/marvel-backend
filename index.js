require("dotenv").config();
const express = require("express");
const expressFormidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(expressFormidable());
app.use(cors());

const characters = require("./routes/characters");
app.use(characters);
const comics = require("./routes/comics");
app.use(comics);

app.all("*", (req, res) => {
  res.json({ error: { message: "Page not found" } });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
