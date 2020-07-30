const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials/'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index');
});

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
    .then((beersFromApi) => {
      res.render(__dirname + '/views/beers', {beersFromApi});
    })

    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((getRandom) => {
    res.render(__dirname + '/views/random-beers', {getRandom});
  })

  .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) =>{

  let beerId = req.params.beerId;
  punkAPI.getBeer(beerId)
    .then((data)=> {
      let myBeer = data[0]
      console.log(data[0].image_url)
    res.render(__dirname + '/views/beers', {beersFromApi: data})
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
