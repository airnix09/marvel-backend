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

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);
  console.log("hash comics", hash);

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

    // add offset to the url if needed
    url = url + "&offset=" + offset;

    console.log(url);
  }
  if (search) {
    // add search to the url if needed
    url = url + "&titleStartsWith=" + search;

    console.log(url);
  }
  try {
    // get comics
    const response = await axios.get(url);

    // check response
    console.log("API data response", response.data);

    // respond to API client
    res.status(200).json(response.data.data);
  } catch (error) {
    // check error
    console.log(error.message);
    // respond to API client
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  // get timestamp
  const date = new Date();
  const ts = date.getTime();

  // get hash
  hash = md5(ts + process.env.API_PRIV_KEY + process.env.API_PUB_KEY);

  try {
    // build url
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

    // get comic by id
    const response = await axios.get(url);

    // check response
    console.log("API data response", response.data);

    // respond to API client
    res.status(200).json(response.data.data);
  } catch (error) {
    // check error
    console.log(error.message);
    // respond to API client
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
