const axios = require('axios');
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
                // for (let c of customers) {
                //     if (c.id === args.id) return c;
                // }

                return axios.get(`http://localhost:3000/customers/${args.id}`).then(res => res.data)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve: (parentVal, args) => customers 
        }
    }
});

// Mutation
const MutationQuery = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parentVal, args) {
                return axios.post(`http://localhost:3000/customers`, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(res => res.data)
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery 
});
