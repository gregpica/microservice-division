const db = require('./psqlAdapter');
const fetch = require("node-fetch");

const typeDef = `
    extend type Query {
        quotient(dividendId: ID!, divisorId: ID!): Quotient
        quotients: [Quotient!]!

    }

    extend type Mutation {
        addQuotient(dividendId: ID!, divisorId: ID!, quotient: Float! ): Quotient
        deleteQuotient(dividendId: ID!, divisorId: ID!): Quotient
    }

    type Quotient {
        divisor_id: ID!
        dividend_id: ID!
        quotient: Float!
        dividend: Int!
        divisor: Int!
    }
`;

const resolvers = {
    Query: {
        quotient: (parent, args) => {
            const quotientQuery = `SELECT * FROM "quotients" WHERE "dividendId"=${args.dividendId} AND "divisorId"=${args.divisorId} RETURNING *`;
            return db.one(quotientQuery)
                .then(data => {
                    return data;
                })     
        },
        quotients: (parent, args) => {
            const quotientsQuery = `SELECT * FROM "quotients"`;
            return db.manyOrNone(quotientsQuery)
                .then(data => {
                    return data;
                })
        }
    },
    Mutation: {
        addQuotient: (parent, args) => {
            const addQuotientQuery = `INSERT INTO quotients(dividend_id, divisor_id, quotient) VALUES ('${args.dividendId}', '${args.divisorId}', '${args.quotient}') RETURNING quotient`;
            return db.one(addQuotientQuery)
                .then(data => {
                    return data 
                })
        },
        deleteQuotient: (parent, args) => {
            const deleteQuotientQuery = `DELETE FROM quotients WHERE "dividend_id"= ${args.dividendId} AND "divisor_id"=${args.divisorId} RETURNING *`;
            return db.one(deleteQuotientQuery)
                .then(data => {
                    return data
                })    
        }
    },
    Quotient: {
        dividend: (parent) => {
            return fetch("http://dividend:3000/api/v1/dividend", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `query { dividend(id: ${parent.dividend_id}) { dividend } }`})
             }).then(res => res.json())
            .then(json => {
                return json.data.dividend.dividend
            })
        },
        divisor: (parent) => {
            return fetch("http://divisor:3000/api/v1/divisor", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `query { divisor(id: ${parent.divisor_id}) { divisor } }`})
             }).then(res => res.json())
            .then(json => {
                return json.data.divisor.divisor
            })
        }   
    }
};

module.exports = {
    Quotient: typeDef,
    quotientResolvers: resolvers
};