const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema
} = graphql;

mines = [
    {"id":"123abc", "name":"AAA-BNB"},
    {"id":"456def", "name":"CDC-GGG"}
]

const MyNewType = new GraphQLObjectType({
    name : "Mine",
    fields : () => ({
        id : {type: GraphQLString},
        name : {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        mine: {
            type: MyNewType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                return _.find(mines, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})