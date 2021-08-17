require("dotenv").config();

const  express  = require('express');
require("dotenv").config();
const server = express();

const pokeData = require('./assets/weather.json');
const PORT = process.env.PORT;



//localhost:3001/
server.get('/',(req,res)=>{
    res.send('home route')
})

//localhost:3700/test
server.get('/test',(request,response)=>{
    response.send('your server is working')
})

// localhost:3700/getShoppingData
server.get('/getShoppingData',(req,res)=>{
    let shoppingArray = ['shoes','bag','toys'];
    res.status(200).send(shoppingArray);
})



 //localhost:3700/getShoppingData?cityName=
server.get('/getDataFromWeth',(req,res)=>{
    
    console.log(req.query);
      let qurName = req.query.cityName;
      console.log(city.city_name.toLowerCase());
      let cityInfo = pokeData.find(item=>{
              console.log(city.city_name.toLowerCase());

        if(item.city_name.toLowerCase() === qurName.toLowerCase()) {
            console.log(city.city_name.toLowerCase());

            return item;
        }
    })
    res.send(cityInfo);
      
  })



  server.get('*',(req,res)=>{
    res.status(404).send('not found')
})



server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})