'use strict'

const validate = require('./validate');

module.exports = {
    createRepo: async options => {
        validate.options(options);

        const httpsOptions = {
            hostname: 'api.github.com',
            path: '/user/repos',
            method: 'POST',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `token ${options.token}`,
                'Content-Type': 'application/json'
            }
        };

        const postData = JSON.stringify({
            name: options.repo,
            owner: options.owner,
            auto_init: true
        });

        const request = https.request(httpsOptions, (response) => {
            if (response.statusCode === 201) {
                console.log('Repository created successfully');
            } else {
                console.error('Failed to create repository');
            }
        });

        request.on('error', (error) => {
            console.error('Request error:', error);
        });

        request.write(postData);
        request.end();
    },
}