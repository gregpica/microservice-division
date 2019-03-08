const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { Quotient, quotientResolvers } = require('./quotient.js');

const Query = `
    type Query {
        _empty: String
    }
`;

const Mutation = `
    type Mutation {
        _empty: String
    }
`;
 
module.exports = makeExecutableSchema({
    typeDefs: [Query, Mutation, Quotient],
    resolvers: [quotientResolvers]
});