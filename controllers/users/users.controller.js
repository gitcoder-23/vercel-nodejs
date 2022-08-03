var https = require('https');


/*
	@Purpose: To fetch data from LinkedIn API v2 endpoint
	@Input: Authorization Bearer token
	@Output: Required Data
*/
module.exports.linkedInData = (req, res, next) => {
	const token = 'AQV5c7gK8YUl9VXSl4D1qYV0p8DkXZAoutdSlTGJqi0sQ6fQdlczVx81quhLM89_FAiyPv8irAywCUlJCk7W9ecDVI11ILU9zBFBRL_UbT7oHfwoDTncVfOmRmirI9fV423hJ0uHLSEmbAgGChAdQrMGITpXg_yh7vU3g3GcokwCUdmjWWRO5FL9fBvNRDYdN_aSzz7l2WrH30EUBbQCRWhJCjpm0J-i4USxKS7kbxJ4c1YgFTs8r-eW-aGRt4Kdb9c6CCewYCBf5YHd-w71RQxqeGsxnBQ3D2vJEBbHUovbLEctf0hBYdwTfbl75zn2I0QRxc0IFOdyQ71eshP_P1UHSPyljA';

	var result ;
  var options = {
    host: 'api.linkedin.com',
    port: 443,
    path: '/v2/me',
    headers: {
       'Authorization': 'Bearer ' + token
    }   
  };
	https.get(options, (resp) => {
		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
    console.log('IIII+++', data);

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			if(data && (data != '' || data.length!=0)) {
				try {
					result = JSON.parse(data) ;
					console.log('---', JSON.parse(data));
					return res.json(result);
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
