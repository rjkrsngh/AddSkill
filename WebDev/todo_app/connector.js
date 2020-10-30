const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
	 
// Database Name
const dbName = 'todoapp';
var db;

function connector(){
	console.log('called connector');
	 
	 return new Promise((resolve, reject)=>{
		MongoClient.connect(url, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected successfully to server");
		  db = client.db(dbName);
		  resolve(db);
		});
	 });
}

// expose the connector function to other services
module.exports.connector = connector;