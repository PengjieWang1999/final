const request = require('request')

var getCapital = (country) => {
	return new Promise((resolve, reject) => {
		request({
	url: `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}?fullText=true`,
	json: true
}, (error, response, body) => {
	if (body.status != 404) {
		resolve([body[0].capital, body[0].name]);
	} else {
		reject('Cannot find the capital');
	};

}) 
	});
};


var getImage = (q) => {
	return new Promise((resolve, reject) => {
		request({
	url: `https://images-api.nasa.gov/search?q=${q}&media_type=image`,
	json: true
}, (error, response, body) => {
	if (body.collection.items != []) {
		resolve(`${body.collection.items[0].links[0].href}`);
	} else {
		reject('Cannot find the weather');
	};

}) 
	});
};

var getDeck1 = (num) => {
	return new Promise((resolve, reject) => {
		request({
	url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${num}`,
	json: true
}, (error, response, body) => {
	if (body.deck_id != '' ) {
		resolve(`${body.deck_id}`);
	} else {
		reject('Cannot find the card');
	};

}) 
	});
};

var getDeck2 = (num, id) => {
	return new Promise((resolve, reject) => {
		request({
	url: `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${num}`,
	json: true
}, (error, response, body) => {
	if (body.success != false ) {
		resolve(`${body.cards[0].images.png}`);
	} else {
		reject('Cannot find the pic');
	};

}) 
	});
};


module.exports = {
	getCapital,
	getImage,
	getDeck1,
	getDeck2
}