const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Importing the Testing Data.
const customers = require('./data/hard-coded-data.js');

// Customer Type 
const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentVal, args) {
                for (let c of customers) {
                    if (c.id === args.id) return c;
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve: (parentVal, args) => customers 
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
