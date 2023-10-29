const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000; // Your desired port
// console.log(process.env)
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import routes
const fertilizersRoute = require('./routes/fertilizers');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const crops = require('./routes/crops');

// Use routes
app.use('/fertilizers', fertilizersRoute);
app.use('/login/', loginRoute);
app.use('/signup/', signupRoute);
app.use('/crops/',crops);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
