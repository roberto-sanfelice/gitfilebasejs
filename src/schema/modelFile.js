const { v4: uuidv4 } = require('uuid');

const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });
const FileModel = require('./FileModel');
const { error } = require('ajv/dist/vocabularies/applicator/dependencies');

module.exports = (modelName, fileSchema) => {
    return class extends FileModel {
        constructor(data, _id = uuidv4(), _sha = "") {
            ajv.compile(fileSchema.valid_user_schema)(data);

            super(modelName, fileSchema);
            this._id = _id;
            this._sha = _sha;
            this.body = data;
        }

        async create() {
            return new Promise((resolve, reject) => {
                try {
                    super.create(this.body, this._id).then(result => {
                        this._id = result._id;
                        this._sha = result._sha;
                        resolve(`${modelName} saved.`);
                    }).catch(error => {
                        throw new Error(error);
                    });
                } catch (error) {
                    reject(error);
                }
            });
        }

        async update() {
            return new Promise((resolve, reject) => {
                try {
                    super.update().then(result => {
                        resolve(result);
                    }).catch(error => {
                        throw new Error(error);
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
                        throw new Error(error);
                    });
                } catch (error) { reject(error); }
            });
        }

        async delete() { await super.delete(this._id, this._sha); }
    }
};