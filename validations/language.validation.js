"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageUpdateSchema = exports.languageCreateSchema = exports.languageGetAllPaginatedSchema = exports.languageGetAllSchema = void 0;
/** Schema to validate languageGetAll API. */
exports.languageGetAllSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
    },
    additionalProperties: false,
};
/** Schema to validate languageGetAllPaginated API. */
exports.languageGetAllPaginatedSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
        page: {
            type: 'string',
            pattern: '^[1-9][0-9]*$'
        },
        limit: {
            type: 'string',
            pattern: '^[1-9][0-9]*$'
        }
    },
    additionalProperties: false,
};
/** Schema to validate language creation. */
exports.languageCreateSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 250
        },
        logo_url: {
            type: 'string',
            maxLength: 500
        },
        category: {
            type: 'string',
            minLength: 1,
            maxLength: 100
        }
    },
    additionalProperties: false,
    required: ['name', 'category']
};
/** Schema to validate language update. */
exports.languageUpdateSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 250
        },
        logo_url: {
            type: 'string',
            maxLength: 500
        },
        category: {
            type: 'string',
            minLength: 1,
            maxLength: 100
        }
    },
    additionalProperties: false,
    required: ['name', 'category']
};
