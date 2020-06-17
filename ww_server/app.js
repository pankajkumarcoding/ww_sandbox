const express = require('express');
const graphqlHTTP = require('express-graphql');
const cost_schema = require('./schema/cost_schema');
const user_schema = require('./schema/user_schema');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser')
require('dotenv').config()

var app = express();
app.use(bodyParser.json());

// Import the auth routes
require('./routes/auth')(app);

// allow cross origin requests
app.use(cors());

mongoose.connect("mongodb+srv://" + process.env.MDB_USER + ":" + process.env.MDB_PASS + "@ww-sandbox-uk3ov.mongodb.net/ww_data?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
});

app.use('/graphql', graphqlHTTP({
    // ES6 shorthand for schema : schema
    cost_schema,
    user_schema,
    graphiql : true
}));

app.use('/', () => {

});

app.listen(4000, () => {
    console.log("WWWorld");
});