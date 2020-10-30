const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const port = 3000;


app.listen(port, (err) => {
	if (err) { 
		console.error('couldn\'t start the server: failed binding to port possibly');
		console.error (err); 
	}
	console.log(`server started on port: ${port}`);
});

// parse incoming request's body as JSON
app.use(express.json());

// redirect to url extension /tasks/
app.use('/tasks', tasksRouter);
