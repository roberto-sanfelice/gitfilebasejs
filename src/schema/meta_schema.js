'use strict'

const enumTypes = ["string", "number", "boolean"];

module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "patternProperties": {
        "^[a-zA-Z]+$": {
            "oneOf": [
                {
                    "type": "string",
                    "enum": enumTypes
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": enumTypes
                        },
                        "required": {
                            "type": "boolean"
                        }
                    },
                    "additionalProperties": false,
                    "required": ["type"]
                }
            ]
        }
    }
}