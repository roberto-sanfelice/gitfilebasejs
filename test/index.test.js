require('dotenv').config();
const {FileModel, FileSchema} = require('../index');

const testSchema = new FileSchema({
    property1: 'string',
    property2: 'number',
    property3 : {
        property3_1: 'string',
        property3_2: 'string'
    }
})

console.log(testSchema);

// Select the repository you want to use as a database
//const database = new gitfilebasejs({
//    repo: "https://username/repositoryname/",
//   auth: process.env.AUTH_KEY
//});