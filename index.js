/**
 * Export lib/gitfilebasejs
 *
 */

'use strict';

const gitfilebasejs = require("./src/");

module.exports = gitfilebasejs;
module.exports.default = gitfilebasejs;
module.exports.gitfilebasejs = gitfilebasejs;

module.exports.gitfilebasejs.schemaType = gitfilebasejs.schemaType;
module.exports.gitfilebasejs.schemaType = gitfilebasejs.FileSchema;