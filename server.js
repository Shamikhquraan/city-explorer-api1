"use strict";

require("dotenv").config();
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");



server.get("/", homeHandler);
server.get("/Weather", getWeatherHandler);
server.get("/movie", getDataMovies);
server.get("*", notFoundHandler);

//localhost:3001/

function homeHandler(req, res) {
  res.send("HOME");
}



class Movies {
  constructor(movieData) {
    this.title = movieData.title;
    this.poster = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`;
  }
}



async function getWeatherHandler(req, response) {
  console.log(req.query);
  let searchQuery = req.query.searchQuery;
  let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WHEATHER_SERVER_KEY}`;
  try {
    axios.get(URL).then((weatherResult) => {
      let weatherArray = weatherResult.data.data.map((item) => {
        return new weatherClass(item);
      });
      // console.log('weatherArray',weatherArray);

      response.send(weatherArray);
    });
  } catch (error) {
    console.log("error from axios", error);
    response.send(error);
  }
}

class weatherClass {
  constructor(countryData) {
    this.description = countryData.weather.description;
    this.date = countryData.valid_date;
    //    this.temp=countryData.temp;
  }
};

// ===============================================FunctiomMovie=======

// localhost:3700/movies?cityName=amman
function getDataMovies (req, res) {

  console.log(req.query.cityName);


  let cityName =req.query.cityName;
  

  
      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&include_adult=false`
  try {
      axios.get(movieUrl).then((movieData) => {
          console.log(movieData);

          let weaArr = movieData.data.results.map((elem) => {
              return new Movies(elem);
          })

          res.status(200).send(weaArr) 
      })

      } catch (error) {
          console.log(error);
          res.status(500).send('not found');
      }
  }



function notFoundHandler(req, res) {
  res.status(404).send({
    error: "Unable to get the route",
  });
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
