const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

octokit.repos.get({
    owner: owner,
    repo: repo
})
.then(({ data }) => {
    console.log('Repository:', data);
})
.catch((error) => {
    console.error('Error:', error.message);
});