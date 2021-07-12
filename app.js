// Enviromental variables
require('dotenv').config();
// packages imports
const express = require('express');
const expressJwt = require('express-jwt');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// Services
const db = require('./services/database');
// Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/user');
const productsRoute = require('./routes/product');
const ordersRoute = require('./routes/order');

const server = express();
const port = process.env.PORT || 3000;

db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(e => console.log('ERROR : ', e));

// Middlewares
server.use(helmet());
server.use(compression());
server.use(express.json());
server.use(cors());
server.use(expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ["HS256"], credentialsRequired: false })
    .unless({ path: ["/v1/users/login", "/v1/users/register"] }));

// Route Middlewares
server.use('/v1/auth',authRoute);
server.use('/v1/users', usersRoute);
server.use('/v1/products', productsRoute);
server.use('/v1/orders', ordersRoute);

// Starts the server.

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = server;

