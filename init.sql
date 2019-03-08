CREATE TABLE dividends(
    id serial PRIMARY KEY, 
    dividend integer UNIQUE NOT NULL
);

CREATE TABLE divisors(
    id serial PRIMARY KEY, 
    divisor integer UNIQUE NOT NULL
);

CREATE TABLE quotients(
    quotient NUMERIC(10,2) NOT NULL, 
    dividend_id INTEGER NOT NULL, 
    divisor_id INTEGER NOT NULL, 
    PRIMARY KEY (dividend_id, divisor_id),
    CONSTRAINT quotients_dividend_id_fkey FOREIGN KEY (dividend_id)
        REFERENCES dividends (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION, 
    CONSTRAINT quotients_divisor_id_fkey FOREIGN KEY (divisor_id)
        REFERENCES divisors (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION  
);