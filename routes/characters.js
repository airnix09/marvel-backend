require("dotenv").config();
const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const router = express.Router();

router.get("/characters", async (req, res) => {
  // destructuring
  const page = req.query.page;
  const search = req.query.search;

  // get timestamp
  const date = new Date();
  const ts = date.getTime();

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);

  const limit = 100;

  const urlbase = "http://gateway.marvel.com/v1/public/characters?ts=";
  let url =
    urlbase +
    ts +
    "&apikey=" +
    process.env.API_PUB_KEY +
    "&hash=" +
    hash +
    "&limit=" +
    limit +
    "&orderBy=name";

  if (page) {
    const offset = limit * (page - 1);

    // add offset to the url if needed
    url = url + "&offset=" + offset;
  }

  if (search) {
    // add search to the url if needed
    url = url + "&nameStartsWith=" + search;
  }

  try {
    // check the url used
    console.log(url);

    // get characters
    const response = await axios.get(url);

    // check response
    console.log("API data response", response.data);

    // respond to API client
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
    // respond to API client
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/:id/comics", async (req, res) => {
  // get timestamp
  const date = new Date();
  const ts = date.getTime();

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);

  try {
    // build url
    const url =
      "http://gateway.marvel.com/v1/public/characters/" +
      req.params.id +
      "/comics?ts=" +
      ts +
      "&apikey=" +
      process.env.API_PUB_KEY +
      "&hash=" +
      hash;

    // check the url used
    console.log(url);

    // get associated comics
    const response = await axios.get(url);

    // check response
    console.log("API data response", response.data);

    // respond to API client
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
    // respond to API client
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/:id", async (req, res) => {
  // get timestamp
  const date = new Date();
  const ts = date.getTime();

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);

  try {
    // build url
    const url =
      "http://gateway.marvel.com/v1/public/characters/" +
      req.params.id +
      "?ts=" +
      ts +
      "&apikey=" +
      process.env.API_PUB_KEY +
      "&hash=" +
      hash;

    // check the url used
    console.log(url);

    // get the character
    const response = await axios.get(url);

    // check response
    console.log("API data response", response.data);

    // respond to API client
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
    // respond to API client
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
