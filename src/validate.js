'use strict'

const https = require("https");

module.exports = {
    options: (options) => {
        if (!options.hasOwnProperty("owner")) {
            throw new Error("Owner username required.");
        } else {
            if (typeof options.owner !== 'string' && !(options.owner instanceof String)) {
                throw new error("Owner parameter must be a string.");
            }
        }
    
        if (!options.hasOwnProperty("repo")) {
            throw new Error("Repository required.");
        } else if (typeof options.repo !== 'string' && !(options.repo instanceof String)) {
            throw new Error("Repo parameter must be an object or a string.");
        }
    
        if (!options.hasOwnProperty("branch")) {
            options.branch = "main";
        } else {
            if (typeof options.branch !== 'string' && !(options.branch instanceof String)) {
                throw new Error("Owner parameter must be a string.")
            }
        }
    
        if (!options.hasOwnProperty("token")) {
            throw new Error("Token required. Check GitHub documentations to generate one.");
        } else if (typeof options.token !== "string" && !(options.token instanceof String)) {
            throw new error("Token parameter must be a string.")
        }
    
        for (let key in options) {
            if (options.hasOwnProperty(key) && !["owner", "repo", "branch", "token"].includes(key)) throw new Error(`Unrecognized parameter: ${key}`);
        }
    },

    token: async options => {
        httpsOptions = {
            hostname: 'api.github.com',
            path: `/user`,
            method: 'GET',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `token ${options.token}`
            }
        }

        const tokenRequest = https.request(httpsOptions, (response) => {
            if (response.statusCode !== 200) throw new Error('Invalid token.');
        })

        tokenRequest.on('error', (error) => {
            console.error('Request error:', error);
        });

        tokenRequest.end();
    },

    repository: async options => {
        httpsOptions = {
            hostname: 'api.github.com',
            path: `/repos/${options.owner}/${options.repo}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `token ${options.token}`
            }
        }

        const repoRequest = https.request(httpsOptions, (response) => {
            if (response.statusCode !== 200) throw new Error('Repository does not exist');
        });

        repoRequest.on('error', (error) => {
            console.error('Request error:', error);
        });

        repoRequest.end();
    },

    branch: async options => {
        httpsOptions = {
            hostname: 'api.github.com',
            path: `/repos/${options.owner}/${options.repo}/branches/${options.branch}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `token ${options.token}`
            }
        }

        const branchRequest = https.request(httpsOptions, (response) => {
            if (response.statusCode !== 200) throw new Error('Branch does not exist');
        });

        branchRequest.on('error', (error) => {
            console.error('Request error:', error);
        });

        branchRequest.end();
    }
}