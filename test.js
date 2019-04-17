const request = require('request')
const yargs = require('yargs')

const argv = yargs
	.option({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Search for an address',
			string: true
		}
	})
	.help()
	.argv;

request({
	curl -G https://images-api.nasa.gov/search
       --data-urlencode "q=apollo 11"
       --data-urlencode "description=moon landing"
       --data-urlencode "media_type=image" |
       python -m json.tool
}, (error, response, body) => {
	console.log(body);
});


