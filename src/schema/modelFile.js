'use strict'

const { v4: uuidv4 } = require('uuid');

const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true, allErrors: true });
const FileModel = require('./FileModel');

module.exports = (modelName, fileSchema) => {
    return class extends FileModel {
        constructor(data, _id = uuidv4(), _sha = "") {2
            try {
                ajv.compile(fileSchema.converted_schema)(data)
            } catch(validate_error) {
                throw validate_error;
            }
            
            super(modelName, fileSchema);
            this._id = _id;
            this._sha = _sha;
            Object.assign(this, data); 
        }

        async create() {
            return new Promise((resolve, reject) => {
                try {
                    super.create(this).then(result => {
                        this._sha = result;
                        resolve(`${modelName} saved.`);
                    }).catch(error => {
                        throw error;
                    });
                } catch (error) {
                    reject(error);
                }
            });
        }

        async update() {
            return new Promise((resolve, reject) => {
                try {
                    super.update(this).then(result => {
                        resolve(result);
                    }).catch(error => {
                        throw error;
                    });
                    resolve(`${modelName} updated.`);
                } catch (error) {
                    reject(error);
                }
            });
        }

        static async read(fileID) {
            return new Promise((resolve, reject) => {
                try {
                    super.read(modelName, fileID).then(result => {
                        resolve(new this(result.body, result._id, result._sha));
                    }).catch(error => {
                        throw error;
                    });
                } catch (error) { reject(error); }
            });
        }

        async delete() { await super.delete(this._id, this._sha); }
    }
};