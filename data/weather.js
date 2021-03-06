const axios = require("axios")
module.exports = getWeatherHandler;

let inMemory = {}



async function getWeatherHandler(req, response) {


  // console.log(req.query);

  let searchQuery = req.query.searchQuery;
  let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WHEATHER_SERVER_KEY}`;

  if (inMemory[searchQuery] !== undefined) {
    console.log(" cache hit / weather ");
    response.send(inMemory[searchQuery]);
  } else {
    console.log(" cache miss / weather ");
    try {
      axios.get(URL).then((weatherResult) => {

        let weatherArray = weatherResult.data.data.map((item) => {
          return new weatherClass(item);
        })
        // console.log('weatherArray',weatherArray);

        inMemory[searchQuery]= weatherArray;
        response.send(weatherArray);
      });
    } catch (error) {
      console.log("error from axios", error);
      response.send(error);
    }
  }
}

class weatherClass {
  constructor(countryData) {
    this.description = countryData.weather.description;
    this.date = countryData.valid_date;
    //    this.temp=countryData.temp;
  }
}
