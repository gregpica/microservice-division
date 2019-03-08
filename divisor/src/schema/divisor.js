const db = require('./psqlAdapter');

const typeDef = `
    extend type Query {
        divisor(id: ID!): Divisor
        divisors: [Divisor!]!
    }

    extend type Mutation {
        addDivisor(divisor: Int!): Divisor
    }

    type Divisor {
        id: ID!
        divisor: Int!
    }
`;

const resolvers = {
    Query: {
        divisor: (parent, args) => {
            const divisorQuery = `SELECT * FROM "divisors" WHERE id=${args.id}`;
            return db.one(divisorQuery)
                .then(data => {
                    return data;
                })     
        },
        divisors: (parent, args) => {
            const divisorsQuery = `SELECT * FROM "divisors"`;
            return db.manyOrNone(divisorsQuery)
                .then(data => {
                    return data;
                })
        }
    },
    Mutation: {
        addDivisor: (parent, args) => {
            const addDivisorQuery = `INSERT INTO divisors(divisor) VALUES ('${args.divisor}') RETURNING *`;
            return db.one(addDivisorQuery)
                .then(data => {
                    return data;
                })
                .catch(error => {
                    if (error.message.split(" ")[0] === "duplicate") {
                        const existentDivisorQuery = `SELECT * FROM "divisors" WHERE divisor=${args.divisor}`;
                        return db.one(existentDivisorQuery)
                            .then(existentData => {
                                return existentData;
                            })
                    }
                })
        }    
    }
};

module.exports = {
    Divisor: typeDef,
    divisorResolvers: resolvers
};