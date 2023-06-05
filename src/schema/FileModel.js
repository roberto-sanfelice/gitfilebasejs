const { getConnection } = require('../connection/index');
const https = require('https');
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });

class FileModel {
    constructor(modelName, fileSchema) {
        this.modelName = modelName;
        this.fileSchema = fileSchema;
    }

    async create(object, fileID) {
        const connectionSettings = getConnection();

        if (Object.keys(connectionSettings).length === 0) {
            throw new Error("Connection not established.")
        }

        const fileContent = JSON.stringify(object);
        const fileName = `${fileID}.json`;
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
                        const obj = {
                            _id: fileID,
                            _sha: JSON.parse(responseBody).content.sha
                        }
                        resolve(obj);
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

    async update() {
        return new Promise((resolve, reject) => {
            reject("Funzione update ancora da implementare.")
        });
    }

    static async read(modelName, fileID) {
        const connectionSettings = getConnection();

        if (Object.keys(connectionSettings).length === 0) {
            throw new Error("Connection not established.")
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
        const connectionSettings = getConnection();

        if (Object.keys(connectionSettings).length === 0) {
            throw new Error("Connection not established.");
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