"use strict";

require("dotenv").config();
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");


const getForecastHandler = require("./data/weather");
const getMovieHandler = require("./data/movi");



server.get("/", homeHandler);
server.get("/Weather", getForecastHandler);
server.get("/movie", getMovieHandler);
server.get("*", notFoundHandler);

//localhost:3001/

function homeHandler(req, res) {
  res.send("HOME");
}






function notFoundHandler(req, res) {
  res.status(404).send({
    error: "Unable to get the route",
  });
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
