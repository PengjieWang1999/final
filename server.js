const express = require('express');
const request = require('request');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const geocode = require('./func');

const path = require('path');

app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended:true
  }));



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
});


var weather = '';

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Home page',
		/*year: new Date().getFullYear(),*/
		welcome: 'Hello!'
	});
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		/*year: new Date().getFullYear(),*/
		welcome: 'Hello!'
	});
});

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'Search page',
		/*year: new Date().getFullYear(),*/
		welcome: 'Hello!'
	});
});

app.get('/search', (request, response) => {
	response.render('weather.hbs', {
		title: 'Weather page',
		/*year: new Date().getFullYear(),*/
		welcome: 'Hello!'
	});
});

app.post('/search_image', function (request, response) {

    var keyword = request.body.keyword;
    
    console.log(keyword);

    hbs.registerHelper('getImage', () => {
		geocode.getImage(keyword).then((result) => {
			weather = result;
		}).catch((error) => {
			weather = error;
		})
		return weather;
});

});

hbs.registerHelper('getImage', () => {
	geocode.getImage('apollo').then((result) => {
		weather = result;
	}).catch((error) => {
		weather = error;
	})
	return weather;
});

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
	
});