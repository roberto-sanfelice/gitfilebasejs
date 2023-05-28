require('dotenv').config();
const {FileSchema} = require('../index');

const TestSchema = new FileSchema({
    nome: 'string',
    età : {
        type: 'number'
    },
    matricola: 'string'
})

console.log(TestSchema);

// Select the repository you want to use as a database
//const database = new gitfilebasejs({
//    repo: "https://username/repositoryname/",
//   auth: process.env.AUTH_KEY
//});