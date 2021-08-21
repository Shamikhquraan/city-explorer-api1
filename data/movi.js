const axios = require('axios');
module.exports = getMovieHandler; 




// localhost:3700/movies?cityName=amman
function getMovieHandler (req, res) {

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
  
  

class Movies {
    constructor(movieData) {
      this.title = movieData.title;
      this.poster = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`;
    }
  }