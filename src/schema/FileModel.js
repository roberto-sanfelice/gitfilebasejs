'use strict'

class FileModel {
    constructor(modelName, fileObj) {
        this.modelName = modelName;
        this.fileJson = JSON.stringify(fileObj);
    }
}

module.exports = FileModel;