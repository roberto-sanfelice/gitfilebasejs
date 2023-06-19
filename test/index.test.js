'use strict'

require('dotenv').config();
const gitfilebasejs = require('../index');

const options = {
    token: process.env.GITHUB_USER_TOKEN,
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO_NAME
}

gitfilebasejs.connect(options).then((result) => {
    const userSchema = new gitfilebasejs.FileSchema({
        username: {
            type : "string",
            required : true
        },
        age: "number"
    });

    const User = gitfilebasejs.modelFile("User", userSchema);

    const userInstance = new User({
        name: "Mario",
        surname: "Rossi",
        age: 40
    })

    //userInstance.create();
    //userInstance.update();
    //User.read(userID);
    //userInstance.delete();

}).catch((error) => {
    console.log(error);
});