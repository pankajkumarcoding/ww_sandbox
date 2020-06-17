const express = require('express');
const graphqlHTTP = require('express-graphql');
const cost_schema = require('./schema/cost_schema');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());

// Import the auth routes
require('./routes/auth')(app);

// allow cross origin requests
app.use(cors());

mongoose.connect("mongodb+srv://sparxxbl:tempo472!@ww-sandbox-uk3ov.mongodb.net/ww_data?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
});

app.use('/graphql', graphqlHTTP({
    // ES6 shorthand for schema : schema
    schema,
    graphiql : true
}));

app.use('/', () => {
    console.log("Ouch.");
});

app.listen(4000, () => {
    console.log("WWWorld");
});