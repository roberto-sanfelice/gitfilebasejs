'use strict'

/*
 * FILESCHEMA
 * 
 * schemaType: the type a user can define in a schema.
 * FieldSchema: Provide a constructor to create valid custom schemas for logical representation of the database structure.
 * 
 */

const schemaType = ['boolean', 'number', 'string', 'date', 'time', 'date-time', 'json', 'binary', 'uuid', 'array', 'fileID']

class FileSchema {
    constructor(data) {
        if(typeof data !== 'object' || data === null) {
            throw new Error('Invalid argument. Expected an object.')
        }

        for(let key in data) {
            if (data.hasOwnProperty(key)) {
                if(typeof data[key] === 'object') {
                    if(!data[key].hasOwnProperty('type')) {
                        throw new Error('Parameter object must include type property.')
                    }

                    if(!schemaType.includes(data[key]['type'])) {
                        throw new Error(`Invalid field type: '${key + ': { type: \'' + data[key]['type']}'}\'.`)
                    }
                } else if (typeof data[key] === 'string' && !(data[key] instanceof String)) {
                    if(!schemaType.includes(data[key])) {
                        throw new Error(`Invalid field type: '${key + ': \'' + data[key]}'\'.`)
                    }
                } else {
                    console.log(key)
                    throw new Error(`Incorrect parameter ${key}. Must be a string or an object with a type parameter.`)
                }

                this[key] = data[key];
            }
        }
    }
}

module.exports.schemaType = schemaType;
module.exports.FileSchema = FileSchema;