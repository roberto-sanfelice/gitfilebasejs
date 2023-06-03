'use strict';

const gitfilebasejs = require("./src/");

module.exports = gitfilebasejs;
module.exports.default = gitfilebasejs;
module.exports.gitfilebasejs = gitfilebasejs;

module.exports.connect = gitfilebasejs.connection.connect;
module.exports.connection = gitfilebasejs.connection.getConnection;

module.exports.FileSchema = gitfilebasejs.schema.FileSchema;
module.exports.FileModel = gitfilebasejs.schema.FileModel;