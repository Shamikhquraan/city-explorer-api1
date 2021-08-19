require("dotenv").config();

const  express  = require('express');
require("dotenv").config();
const cors = require("cors");
const server = express();
server.use(cors());
const axios = require("axios");
const { request } = require('express');

//const pokeData = require('./assets/weather.json');
const PORT = process.env.PORT;


server.get('/Weather',getWeatherHandler);

//localhost:3001/
server.get('/',homeHandler);


function homeHandler(req, res) {
    res.send("HOME");
  }

  async function getWeatherHandler(req,response){
    console.log(req.query);
      let searchQuery = req.query.searchQuery;
      let URL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WHEATHER_SERVER_KEY}`
      try {
        axios.get(URL).then((weatherResult)=> {
        let weatherArray = weatherResult.data.data.map((item)=>{

            return new weatherClass(item);
        
        });
        // console.log('weatherArray',weatherArray);

        response.send(weatherArray)
    });
    } catch(error) {
        console.log('error from axios',error)
        response.send(error)
    
    }
    };
  


    class weatherClass  {
        constructor(countryData){
            this.description = countryData.weather.description;
            this.date = countryData.valid_date;
        //    this.temp=countryData.temp;
        }
    };


  server.get('*',(req,res)=>{

    res.status(500).send('some thing went wrong .')
})


server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})