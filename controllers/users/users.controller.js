var https = require('https');


/*
	@Purpose: To fetch data from LinkedIn API v2 endpoint
	@Input: Authorization Bearer token
	@Output: Required Data
*/
module.exports.linkedInData = (req, res, next) => {
	const token = 'AQXO7rB4sg1KEQ7GbaGeOOeoFCKvcIPv98J4qYSg6DNtSBpEIoO7iJVdVU0oDkosTTJKW_rE2LctGP5MKXgRm18U_l-WjGqiZg6tCnjgsL1D__7UnbYpXTcKbDrmqhWdpPNg2S1BHiIH00XaHs_jOSRNohfy66KpEfMiFXU0s54V1rbTWIWDSyeV-mdEewEXMrX_5ZHn6x4dBgXFZnSlCECO8GLTqe_HzhIYasclbrlC0w3S88Nx1tunfCTCF1bsLbaU7Mlt9nn9ZjBdJRGLlP6ueCJEmd4TLaBS-OnOUUHjL8vqjC7LpkeQ_I6pRoEFCFaummXF1acj_rDP3k1poOApLBo62A';
	
	// const path = 'https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:82488034&sharesPerOwner=100&count=25&start=0';
	const path = 'https://api.linkedin.com/v2/organizations/74282752';
	//const path = '/v2/me';

	var result ;
	var options = {
		host: 'api.linkedin.com',
		port: 443,
		path: path,
		headers: {
		'Authorization': 'Bearer ' + token
		}   
	};
	https.get(options, (resp) => {
		let data = ''; let finalRes = {};

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			if(data && (data != '' || data.length!=0)) {
				try {
					result = JSON.parse(data) ;
					const companyPostUrl = 'https://www.linkedin.com/feed/update/';
					let d = [];
					result.elements.map((x, i) => {
						const link = result.elements[i].activity;
						const title = (x.text.text === '') ? result.elements[i].content.title : result.elements[i].text.text;
						const time = linkedInDate(result.elements[i].created.time);
						d.push({'title': title, 'link': companyPostUrl + link, time: time});
					});
					return res.json(d);
				}catch(e){
					console.log(e);
				}
			} else{ 
				console.log('+++', data);
			}
		});
	}).on("error", (err) => {
		console.log(err);
	});	
}

const linkedInDate = timeStamp => {
	const d1 = Date.now();
	const d2 = timeStamp;
	const diff = d1 - d2;
	
	var res = Math.floor(diff / 1000);
	if(res >= 60){
		res = Math.floor(res / 60);
		if(res >= 60){
			res = Math.floor(res / 60);
			if(res >= 24){
				res = Math.floor(res / 24);
				if(res >= 7){
					return Math.floor(res / 7) + 'w ago';
				} else if(res >= 30){
					return Math.floor(res / 30) + 'mo ago';
				} if(res >= 365){
					return Math.floor(res / 365) + 'y ago';
				} else{
					res = res + 'd ago';
				}
			} else {				
				res = res + 'h ago'; 
			}
		}else{
			res = res + 'm ago';
		}
	}else{
		res = res + 'sec ago';
	}
	return res;
}
