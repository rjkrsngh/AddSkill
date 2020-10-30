var conn = require('../connector');
const assert = require('assert');

// fetch a list of existing tasks
var listTasks = async (req, res)=>{
	var db = await conn.connector();
    const collection = db.collection('tasks');
   	collection.find({}).toArray((err, docs)=>{
  	assert.equal(err, null);
  	if(!docs.length){
  		console.log('no data in db');
  	}else{
      res.json(docs);
      console.log('inside ListTasks');
	  	for(obj of docs){
	  		console.log(obj.taskname, obj.status);
	  	}
  	}
  });	
}

// update a task status in the db
let updateTask = async (req,res)=>{
  var db = await conn.connector();
  let name =  req.query.name;
  let status = req.query.status;
  const collection = db.collection('tasks');
  collection.updateOne({"taskname":name}, {$set:{"status":status}},(err)=>{
	  if(err){
		  console.log("Update Errorr ",err);
		  res.json({
			  "success":false
		  })
	  }else{
		  res.json({
			  "success":true,
			  "message":'Update successfully'
		  })
	  }
  })
}

// remove a task from the db
let deleteTask = async (req,res)=>{
  var db = await conn.connector();
  let name = req.query.name;
  const collection = db.collection('tasks');
  collection.removeOne({'taskname':name},(err)=>{
	  if(err){
		  console.log("Delete Error ",err);
		  res.json({
			  "success":false
		  })
	  }else{
		  res.json({
			  "success":true,
			  "message":"Delete Successfully"
		  })
	  }
  })
}

// create a new task
var createTask = async (req, res) => {
  var db = await conn.connector();
  let name  = req.query.name;
  let status = req.query.status;
  if(!status){
    status = 'yet to be done';
  }

  const collection = db.collection('tasks');
	collection.insert({'taskname':name, 'status':status}, (err) => {
		if (err) {
			console.error('Error inserting task');
			res.json({
				"success": false
			})
		} else {
			res.json({
				"success": true
			})
		}
	})
}

module.exports.listTasks = listTasks;
module.exports.createTask = createTask;
module.exports.deleteTask = deleteTask;
module.exports.updateTask = updateTask;