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
const pesticide = require('./routes/pesticide');
const avail_produce = require('./routes/get_avail_produce');
const get_orders = require('./routes/get_orders');
const purchase = require('./routes/purchase_record');
const orderpur = require('./routes/getordpur');
const notify = require('./routes/notification');

// Use routes
console.log("hiiiiii")
app.use('/fertilizers', fertilizersRoute);
app.use('/login/', loginRoute);
app.use('/signup/', signupRoute);
app.use('/crops/',crops);
app.use('/pesticide/',pesticide);
app.use('/get_avail_produce/',avail_produce);
app.use('/get_orders/',get_orders);
app.use('/purchase_record/',purchase);
app.use('/getordpur/',orderpur);
app.use('/get_notification/',notify);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
