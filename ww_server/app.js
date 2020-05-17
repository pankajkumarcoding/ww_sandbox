const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
// import {flowRight as compose} from "lodash";

mongoose.connect("mongodb+srv://sparxxbl:tempo472!@ww-sandbox-uk3ov.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
});

const app = express();

app.use('/graphql', graphqlHTTP({
    // ES6 shorthand for schema : schema
    schema,
    graphiql : true
}));

app.use('/', () => {
    console.log("hi");
});

app.listen(4000, () => {
    console.log("WWWorld");
});