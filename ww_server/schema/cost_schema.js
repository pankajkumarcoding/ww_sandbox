const graphql = require('graphql');
const _ = require('lodash');

// Models
const colData = require('../models/col_data');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const colDataType = new GraphQLObjectType({
    name : "colData",
    fields: () => ({
        f : {type: GraphQLString},
        s : {type: GraphQLString},
        i : {type: GraphQLString},
        col : {type: GraphQLInt}, 
        rv : {type: GraphQLInt},
        r0 : {type: GraphQLInt},
        r1 : {type: GraphQLInt},
        r2 : {type: GraphQLInt},
        r3 : {type: GraphQLInt},
        r4 : {type: GraphQLInt}
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        cols: {
            type: new GraphQLList(colDataType),
            resolve(parent,args){
                return colData.find({});
            }
        }
    }
});
 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCol: {
           type: colDataType,
           args: {
                f   : {type: GraphQLString},
                s   : {type: GraphQLString},
                i   : {type: GraphQLString},
                col : {type: GraphQLInt},
                rv  : {type: GraphQLInt},
                r0  : {type: GraphQLInt},
                r1  : {type: GraphQLInt},
                r2  : {type: GraphQLInt},
                r3  : {type: GraphQLInt},
                r4  : {type: GraphQLInt},
            },
           resolve(parent, args) {
               let col = new colData ({
                f   : args.f,
                s   : args.s,
                i   : args.i,
                col : args.col,
                rv  : args.rv,
                r0  : args.r0,
                r1  : args.r1,
                r2  : args.r2,
                r3  : args.r3,
                r4  : args.r4
               });
               return col.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,       // the user can perform queries
    mutation: Mutation      // the user can perorm mutations
})