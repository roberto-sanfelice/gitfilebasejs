'use strict'

require('dotenv').config();
const { error } = require('ajv/dist/vocabularies/applicator/dependencies');
const gitfilebasejs = require('../index');

const options = {
    token: process.env.GITHUB_USER_TOKEN,
    owner: "roberto-sanfelice",
    repo: "math_collection"
}

gitfilebasejs.connect(options).then((result) => {
    const userSchema = new gitfilebasejs.FileSchema({
        name: "string",
        surname: "string",
        age: "number"
    });

    const User = gitfilebasejs.modelFile("User", userSchema);

    const instanceUser = new User({
        name: "Mario",
        surname: "Rossi",
        age: 40
    });

    User.read("3b03d541-dc6b-4b9c-924c-319a46d381bf").then(result => {
        result.body.name = "Carlo";
        result.update().then(result => { console.log(result) }).catch(error => { console.error(error) });
    })

}).catch((error) => {
    console.log(error);
});