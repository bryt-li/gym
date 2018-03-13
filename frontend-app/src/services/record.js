import { delay } from "../utils";
var AWS = require('aws-sdk/dist/aws-sdk-react-native');

const config = require('../config');

export const saveRecord = async (record) => {

	AWS.config.update({ region: config.AWS_DYNAMODB_REGION });

	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	  IdentityPoolId: config.AWS_COGNITO_IDENTITY_POOL_ID,
	});

	ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	}

	var today = yyyy + '-' + mm + '-' + dd;

	var params = {
		TableName: "Gym",
		Item: {
			"date": {'S': today},
			"record": {'M': {
					'run': {'BOOL':record.runEnabled},
					'pullup': {'BOOL':record.pullupEnabled},
					'pushup': {'BOOL':record.pushupEnabled},
					'situp': {'BOOL':record.situpEnabled},
					'squat': {'BOOL':record.squatEnabled},
				} 
			}
		}
	};

	console.log('putItem');	
	var promise = ddb.putItem(params).promise();
	var return_data = await promise.then(
		function(data) {
	    	console.log(data);
	    	return data;
		},
		function(error){
			console.log(error);
			return null;
		}
	);
	console.log('putItem end');

	console.log(return_data);
	return return_data
};
