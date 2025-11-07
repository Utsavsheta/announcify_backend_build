"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonSectionUpdateSchema = exports.lessonSectionCreateSchema = exports.lessonSectionGetAllPaginatedSchema = exports.lessonSectionGetAllSchema = exports.lessonUpdateSchema = exports.lessonCreateSchema = exports.lessonGetAllPaginatedSchema = exports.lessonGetAllSchema = void 0;
/** Schema to validate lessonGetAll API. */
exports.lessonGetAllSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
        language_id: { type: 'string' },
        section_id: { type: 'string' }
    },
    additionalProperties: false,
};
/** Schema to validate lessonGetAllPaginated API. */
exports.lessonGetAllPaginatedSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
        language_id: { type: 'string' },
        section_id: { type: 'string' },
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
/** Schema to validate lesson creation. */
exports.lessonCreateSchema = {
    type: 'object',
    properties: {
        language_id: {
            type: 'string',
            minLength: 1
        },
        section_id: {
            type: 'string',
            minLength: 1
        },
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 500
        },
        description: {
            type: 'string',
            maxLength: 2000
        },
        lesson_number: {
            type: 'integer',
            minimum: 1
        },
        content: {
            type: 'object',
            properties: {
                codeExample: {
                    type: 'string',
                    maxLength: 5000
                },
                codeExamples: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            code: { type: 'string' },
                            explanation: { type: 'string' }
                        },
                        required: ['id', 'title', 'description', 'code']
                    }
                },
                steps: {
                    type: 'array',
                    items: { type: 'string' }
                },
                exercise: {
                    type: 'object',
                    properties: {
                        description: { type: 'string' },
                        solution: { type: 'string' },
                        starterCode: { type: 'string' }
                    },
                    required: ['description']
                }
            }
        },
        is_published: {
            type: 'boolean'
        }
    },
    additionalProperties: false,
    required: ['language_id', 'section_id', 'title', 'lesson_number']
};
/** Schema to validate lesson update. */
exports.lessonUpdateSchema = {
    type: 'object',
    properties: {
        language_id: {
            type: 'string',
            minLength: 1
        },
        section_id: {
            type: 'string',
            minLength: 1
        },
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 500
        },
        description: {
            type: 'string',
            maxLength: 2000
        },
        lesson_number: {
            type: 'integer',
            minimum: 1
        },
        content: {
            type: 'object',
            properties: {
                codeExample: {
                    type: 'string',
                    maxLength: 5000
                },
                codeExamples: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            code: { type: 'string' },
                            explanation: { type: 'string' }
                        },
                        required: ['id', 'title', 'description', 'code']
                    }
                },
                steps: {
                    type: 'array',
                    items: { type: 'string' }
                },
                exercise: {
                    type: 'object',
                    properties: {
                        description: { type: 'string' },
                        solution: { type: 'string' },
                        starterCode: { type: 'string' }
                    },
                    required: ['description']
                }
            }
        },
        is_published: {
            type: 'boolean'
        }
    },
    additionalProperties: false
};
// ==================== LESSON SECTION VALIDATIONS ====================
/** Schema to validate lessonSectionGetAll API. */
exports.lessonSectionGetAllSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
        language_id: { type: 'string' }
    },
    additionalProperties: false,
};
/** Schema to validate lessonSectionGetAllPaginated API. */
exports.lessonSectionGetAllPaginatedSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
        language_id: { type: 'string' },
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
/** Schema to validate lesson section creation. */
exports.lessonSectionCreateSchema = {
    type: 'object',
    properties: {
        language_id: {
            type: 'string',
            minLength: 1
        },
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 500
        },
        description: {
            type: 'string',
            maxLength: 2000
        },
        section_order: {
            type: 'integer',
            minimum: 0
        },
        is_published: {
            type: 'boolean'
        }
    },
    additionalProperties: false,
    required: ['language_id', 'title']
};
/** Schema to validate lesson section update. */
exports.lessonSectionUpdateSchema = {
    type: 'object',
    properties: {
        language_id: {
            type: 'string',
            minLength: 1
        },
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 500
        },
        description: {
            type: 'string',
            maxLength: 2000
        },
        section_order: {
            type: 'integer',
            minimum: 0
        },
        is_published: {
            type: 'boolean'
        }
    },
    additionalProperties: false
};
