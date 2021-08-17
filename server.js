require("dotenv").config();

const  express  = require('express');
require("dotenv").config();
const cors = require("cors");
const server = express();
server.use(cors());

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


 //localhost:3700/getDataFromWeth?cityName=
server.get('/getDataFromWeth',(req,res)=>{
    console.log(req.query);
      let qurName = req.query.cityName;
      let cityInfo = pokeData.find(item=>{
        if(item.city_name.toLowerCase() === qurName.toLowerCase()) {
            console.log(item);

            return item;
        
        }
    })
    res.send(cityInfo);
      
  })



  server.get('*',(req,res)=>{

    res.status(500).send('some thing went wrong .')
})





server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})