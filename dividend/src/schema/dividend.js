const db = require('./psqlAdapter');

const typeDef = `
    extend type Query {
        dividend(id: ID!): Dividend
        dividends: [Dividend!]!
    }

    extend type Mutation {
        addDividend(dividend: Int!): Dividend
    }

    type Dividend {
        id: ID!
        dividend: Int!
    }
`;

const resolvers = {
    Query: {
        dividend: (parent, args) => {
            const dividendQuery = `SELECT * FROM "dividends" WHERE id=${args.id}`;
            return db.one(dividendQuery)
                .then(data => {
                    return data;
                })     
        },
        dividends: (parent, args) => {
            const dividendsQuery = `SELECT * FROM "dividends"`;
            return db.manyOrNone(dividendsQuery)
                .then(data => {
                    return data;
                })
        }
    },
    Mutation: {
        addDividend: (parent, args) => {
            const addDividendQuery = `INSERT INTO dividends(dividend) VALUES ('${args.dividend}') RETURNING *`;
            return db.oneOrNone(addDividendQuery)
                .then(data => {
                    return data;
                })
                .catch(error => {
                    if (error.message.split(" ")[0] === "duplicate") {
                        const existentDividendQuery = `SELECT * FROM "dividends" WHERE dividend=${args.dividend}`;
                        return db.one(existentDividendQuery)
                            .then(existentData => {
                                return existentData;
                            })
                    }
                })
        }    
    }
};

module.exports = {
    Dividend: typeDef,
    dividendResolvers: resolvers
};