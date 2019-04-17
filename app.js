const express = require('express');
const request = require('request');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const geocode = require('./func');

const path = require('path');



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
		title: 'Weather page',
		/*year: new Date().getFullYear(),*/
		welcome: 'Hello!'
	});
});

hbs.registerHelper('getWeather', () => {
	geocode.getCapital('China').then((result) => {
		return geocode.getWeather(result[0], result[1]);
	}).then((result) => {
		weather = result;
	}).catch((error) => {
		weather = error;
	})
	return weather;
});

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
	
});
