'use strict'

const { getConnection } = require('../connection/index');
const https = require('https');

class FileModel {
    constructor(modelName, fileSchema) {
        this.modelName = modelName;
        this.fileSchema = fileSchema;
    }

    async create(object) {
        let connectionSettings = {}
        try {
            connectionSettings = await getConnection();
        } catch (error) {
            throw error;
        }

        const { modelName, fileSchema, _id, _sha, ...body } = object;

        const fileContent = JSON.stringify(body, null, 2);
        const fileName = `${object._id}.json`;
        const filePath = `${this.modelName}/${fileName}`;

        const httpsOptions = {
            hostname: 'api.github.com',
            path: `/repos/${connectionSettings.owner}/${connectionSettings.repo}/contents/${filePath}?ref=${connectionSettings.branch}`,
            method: 'PUT',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `Bearer ${connectionSettings.token}`,
                'Content-Type': 'application/json',
            },
        }

        const fileData = {
            message: `Create file in ${this.modelName} collection.`,
            content: Buffer.from(fileContent).toString('base64'),
        };

        return new Promise((resolve, reject) => {
            const req = https.request(httpsOptions, (res) => {
                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 201) {
                        resolve(JSON.parse(responseBody).content.sha);
                    } else {
                        reject(
                            new Error(
                                `Error creating file: ${res.statusCode} ${res.statusMessage}\nResponse Body: ${responseBody}`
                            )
                        );
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(JSON.stringify(fileData));
            req.end();
        });
    }

    async update(object) {
        let connectionSettings = {};
        try {
            connectionSettings = await getConnection();
        } catch (error) {
            throw error;
        }
        const { modelName, fileSchema, _id, _sha, ...body } = object;

        const fileContent = JSON.stringify(body);
        const fileName = `${_id}.json`;
        const filePath = `${modelName}/${fileName}`;

        const fileData = {
            message: 'Update file',
            content: Buffer.from(fileContent).toString('base64'),
            sha: _sha,
        };

        const httpsOptions = {
            hostname: 'api.github.com',
            path: `/repos/${connectionSettings.owner}/${connectionSettings.repo}/contents/${filePath}?ref=${connectionSettings.branch}`,
            method: 'PUT',
            headers: {
                'User-Agent': 'Node.js',
                'Authorization': `Bearer ${connectionSettings.token}`,
                'Content-Type': 'application/json',
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.request(httpsOptions, (res) => {
                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(`${this.modelName} updated.`);
                    } else {
                        reject(new Error(`Failed to update file: ${res.statusCode} ${res.statusMessage}`));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(JSON.stringify(fileData));
            req.end();
        });
    }

    static async read(modelName, fileID) {
        let connectionSettings = {};
        try {
            connectionSettings = await getConnection();
        } catch (error) {
            throw error;
        }

        const fileName = `${fileID}.json`;
        const filePath = `${modelName}/${fileName}`;

        return new Promise((resolve, reject) => {
            const httpsOptions = {
                hostname: 'api.github.com',
                path: `/repos/${connectionSettings.owner}/${connectionSettings.repo}/contents/${filePath}?ref=${connectionSettings.branch}`,
                method: 'GET',
                headers: {
                    'User-Agent': 'Node.js',
                    Authorization: `Bearer ${connectionSettings.token}`,
                },
            }

            const req = https.request(httpsOptions, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to read file: ${res.statusCode} ${res.statusMessage}`));
                    return;
                }

                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    const jsonResponse = JSON.parse(responseBody);
                    const obj = {
                        _id: fileID,
                        _sha: jsonResponse.sha,
                        body: JSON.parse(Buffer.from(jsonResponse.content, 'base64').toString('utf-8'))
                    }

                    resolve(obj);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });
    }

    async delete(fileID, fileSha) {
        let connectionSettings = {};
        try {
            connectionSettings = await getConnection();
        } catch (error) {
            throw error;
        }

        const fileName = `${fileID}.json`;
        const filePath = `${this.modelName}/${fileName}`;
        const commitMessage = `Deleted ${fileName} from ${this.modelName}`;

        const httpsOptions = {
            hostname: 'api.github.com',
            path: `/repos/${connectionSettings.owner}/${connectionSettings.repo}/contents/${filePath}?ref=${connectionSettings.branch}&sha=${fileSha}&message=${encodeURIComponent(commitMessage)}`,
            method: 'DELETE',
            headers: {
                'User-Agent': 'Node.js',
                Authorization: `Bearer ${connectionSettings.token}`,
            },
        };

        const req = https.request(httpsOptions, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('File deleted successfully');
                } else {
                    throw new Error(`Error deleting file: ${res.statusCode} ${res.statusMessage}\nResponse Body: ${responseBody}`);
                }
            });
        });

        req.on('error', (error) => {
            throw new Error(error);
        });

        req.end();
    }
}

module.exports = FileModel;