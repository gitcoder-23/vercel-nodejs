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

