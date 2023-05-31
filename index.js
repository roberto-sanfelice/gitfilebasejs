/**
 * Export lib/gitfilebasejs
 *
 */

'use strict';

const gitfilebasejs = require("./src/");

module.exports = gitfilebasejs;
module.exports.default = gitfilebasejs;
module.exports.gitfilebasejs = gitfilebasejs;

module.exports.FileSchema = gitfilebasejs.schema.FileSchema;
module.exports.FileModel = gitfilebasejs.schema.FileModel;