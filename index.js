'use strict';

const gitfilebasejs = require("./src/");

module.exports = gitfilebasejs;
module.exports.default = gitfilebasejs;
module.exports.gitfilebasejs = gitfilebasejs;

module.exports.FileModel = gitfilebasejs.schema.FileModel;
module.exports.connect = gitfilebasejs.connect;