const graphql = require('graphql');
const _ = require('lodash');

// Models
const User = require('../models/auth/User');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;