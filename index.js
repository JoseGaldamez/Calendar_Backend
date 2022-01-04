const express = require('express');
const DBConnection = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const app = express();


// DataBase connection
DBConnection();

// Configuring CORS basic
app.use( cors() );

// Using JSON for all requests
app.use( express.json() );

// Routes auth
app.use('/api/auth', require('./routes/auth') );


// TODO: CRUD


// Using folder "public" to show static content
app.use( express.static('public') );


// Start listen in port
app.listen( process.env.PORT, () => {
    console.log(`Bakend running on port: ${process.env.PORT}`);
});