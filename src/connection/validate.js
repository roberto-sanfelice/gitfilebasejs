'use strict'

const https = require("https");
const Ajv = require("ajv");
const ajv = new Ajv({ useDefaults: true });

const meta_schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
        token: {
            type: "string"
        },
        owner: {
            type: "string"
        },
        repo: {
            type: "string"
        },
        branch: {
            type: "string",
            default: "main"
        }
    },
    required: ["token", "owner", "repo"],
    additionalProperties: false
}

module.exports = {
    options: options => {
        if (!ajv.validate(meta_schema, options)) throw new Error(validate.error);
    },

    token: async options => {
        let httpsOptions = {
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
        });

        tokenRequest.on('error', (error) => {
            console.error('Request error:', error);
        });

        tokenRequest.end();
    },

    repository: async options => {
        let httpsOptions = {
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
        let httpsOptions = {
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