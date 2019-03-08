const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { Dividend, dividendResolvers } = require('./dividend.js');

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
    typeDefs: [Query, Mutation, Dividend],
    resolvers: [dividendResolvers]
});
