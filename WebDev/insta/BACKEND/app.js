const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000;

// Register user schema
require('./models/user');
require('./models/post');

// to remove the warnings related to useNewUrlParser and useUnifiedTopology
mongoose.connect('mongodb://localhost:27017/instagram', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo!');
});

mongoose.connection.on('error', () => {
    console.log('error connecting to mongo!', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register authentication route
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

// const customMiddleWare = (req, res, next) => {
//     console.log('middleware executed');
//     next();
// }

// // Middlewares are executed befor going to route handlers
// app.use(customMiddleWare);

// app.get('/', (req, res) => {
//     console.log('going to home page');
//     res.send('hello world');
// });

// // using customMiddleWare here means that the custom middleware will be executed
// // only for this route
// app.get('/about', customMiddleWare, (req, res) => {
//     console.log('going to about page');
//     res.send('about page');
// });

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});