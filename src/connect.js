'use strict'

const validate = require('./validate');

module.exports = async function (options) {
    // Check if the options object is valid.
    validate.options(options);

    // Verify the passed informations.
    await validate.token(options);
    await validate.repository(options);
    await validate.branch(options);
}