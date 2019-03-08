const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { Divisor, divisorResolvers } = require('./divisor.js');

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
    typeDefs: [Query, Mutation, Divisor],
    resolvers: [divisorResolvers]
});