'use strict'

require('dotenv').config();
const gitfilebasejs = require('../index');

gitfilebasejs.connect({
    owner: "roberto-sanfelice",
    repo: "math_collection",
    token: process.env.GITHUB_USER_TOKEN
}).then(() => {
    console.log("Connected to GitHub Repository.")
}).catch(error => {
    console.log(error);
});

/*
 * const database = new gitfilebasejs({
 *    repo: "https://username/repositoryname/",
 *    auth: process.env.AUTH_KEY
 * });
*/