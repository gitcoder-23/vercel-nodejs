var https = require('https');


/*
	@Purpose: To fetch data from LinkedIn API v2 endpoint
	@Input: Authorization Bearer token
	@Output: Required Data
*/
module.exports.scheduleData = (req, res, next) => {	
	const data = require('./data.json');
	return res.json(data);
}
module.exports.sampleFunction = (req, res, next) => {	
	const sampleArr = new Array(3)[0];
	console.log(sampleArr)
	return res.json(sampleArr);
}

