'use strict'

const validate = require('./validate');

let connection = {};

module.exports = {
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
    getConnection: async () => {
        if (Object.keys(connection).length === 0) {
            throw new Error("Connection not established.")
        } else return connection;
    }
}