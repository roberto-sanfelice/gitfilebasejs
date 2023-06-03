const meta_schema = require("./meta_schema");
const Ajv = require("ajv");
const ajv = new Ajv({ useDefaults: true });

class FileSchema {
    constructor(user_schema) {
        this.validate(user_schema);
        this.valid_user_schema = this.convert(user_schema);
    };

    validate = schema => {
        return ajv.validate(meta_schema, schema);
    };

    convert = user_schema => {
        var valid_user_schema = {
            type: "object",
            properties: {},
            required: []
        }

        for (let key in user_schema) {
            const value = user_schema[key];

            if (typeof value === 'string') {
                valid_user_schema.properties[key] = { type: value };
            } else if (typeof value === 'object') {
                valid_user_schema.properties[key] = { type: value.type };
                if (value.required) {
                    valid_user_schema.required = valid_user_schema.required || [];
                    valid_user_schema.required.push(key);
                }
            }
        }

        return valid_user_schema;
    };
}

module.exports = FileSchema;