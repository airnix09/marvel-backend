require("dotenv").config();
const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const router = express.Router();

router.get("/comics", async (req, res) => {
  // destructuring
  const page = req.query.page;
  const search = req.query.search;

  // get timestamp
  const date = new Date();
  const ts = date.getTime();
  // ts = Math.floor(Date.now() / 1000);
  // console.log("timestamp comics", ts);

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);
  // console.log("hash comics", hash);

  // variable globale
  const limit = 100;
  const urlbase = "http://gateway.marvel.com/v1/public/comics?ts=";
  let url =
    urlbase +
    ts +
    "&apikey=" +
    process.env.API_PUB_KEY +
    "&hash=" +
    hash +
    "&limit=" +
    limit +
    "&orderBy=title";

  if (page) {
    const offset = limit * (page - 1);

    // création de l'url
    url = url + "&offset=" + offset;

    console.log(url);
  }
  if (search) {
    // création de l'url
    url = url + "&titleStartsWith=" + search;

    console.log(url);
  }
  try {
    // récupérer la liste des personnages
    const response = await axios.get(url);

    // check du retour
    console.log("API data response", response.data);

    // retour à l'utilisateur
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/comic/:id", async (req, res) => {
  // get timestamp
  const date = new Date();
  const ts = date.getTime();
  // ts = Math.floor(Date.now() / 1000);
  // console.log("timestamp characters", ts);

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);
  // console.log("hash characters", hash);

  try {
    // création de l'url
    const url =
      "http://gateway.marvel.com/v1/public/comics/" +
      req.params.id +
      "?ts=" +
      ts +
      "&apikey=" +
      process.env.API_PUB_KEY +
      "&hash=" +
      hash;

    console.log(url);

    // récupérer la liste des personnages
    const response = await axios.get(url);

    // check du retour
    console.log("API data response", response.data);

    // retour à l'utilisateur
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
