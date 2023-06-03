'use strict'

require('dotenv').config();
const gitfilebasejs = require('../index');

const options = {
    token: process.env.GITHUB_USER_TOKEN,
    owner: "roberto-sanfelice",
    repo: "math_collection"
}

gitfilebasejs.connect(options).then((result) => {
    console.log(result);

    const testSchema = new gitfilebasejs.FileSchema({
        name: "string",
        surname: "string",
        age: "number"
    });

    const fileModel = new gitfilebasejs.FileModel("User", testSchema);

    
}).catch((error) => {
    console.log(error);
});