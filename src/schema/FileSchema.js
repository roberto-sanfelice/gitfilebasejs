'use strict'

const primitiveTypes = ['boolean', 'number', 'string', 'bigint', 'symbol'];
class FileSchema {
    constructor(fileSchema) {
        for(let key in fileSchema) {
            if(fileSchema.hasOwnProperty(key)) {
                //this.validate(key, fileSchema[key]);
                this[key] = fileSchema[key];
            }
        }
    }

    /*validate(key, value) {
        if(Array.isArray(value)) {
            if (value.length > 1) throw new Error('Arrays with mixed types not allowed.')
            if(value[0])
        }
    }*/
}

module.exports = FileSchema;