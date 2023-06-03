'use strict'

const validate = require('./validate');

let connection = {};

module.exports = {
    gitutils: require('./gitutils'),
    connect: async (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                validate.options(options);

                await validate.token(options);
                await validate.repository(options);
                await validate.branch(options);

                connection = options;
                resolve("Validation complete.");
            } catch (error) {
                reject(error)
            }
        });
    },
    getConnection: () => {
        return connection;
    }
}