"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = __importDefault(require("../controllers/language.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_validator_middleware_1 = require("../middlewares/schema-validator.middleware");
const language_validation_1 = require("../validations/language.validation");
const router = (0, express_1.Router)();
// Public routes (no authentication required)
router.get('/all', (0, schema_validator_middleware_1.validateSchema)(language_validation_1.languageGetAllSchema, 'query'), language_controller_1.default.getAllLanguages);
// Admin routes (authentication and admin role required)
router.get('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(language_validation_1.languageGetAllPaginatedSchema, 'query'), language_controller_1.default.getAllLanguagesPaginated);
router.get('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), language_controller_1.default.getLanguageById);
router.post('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(language_validation_1.languageCreateSchema, 'body'), language_controller_1.default.createLanguage);
router.put('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(language_validation_1.languageUpdateSchema, 'body'), language_controller_1.default.updateLanguage);
router.delete('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), language_controller_1.default.deleteLanguage);
exports.default = router;
