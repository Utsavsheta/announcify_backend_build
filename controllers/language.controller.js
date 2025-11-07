"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const language_service_1 = __importDefault(require("../services/language.service"));
const http_status_1 = require("../utils/http-status");
/** GET API: Get all languages */
const getAllLanguages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const languages = yield language_service_1.default.getAllLanguages(search);
        (0, http_status_1.sendSuccessResponse)(res, 'Languages retrieved successfully.', languages);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve languages.', error);
        next(error);
    }
});
/** GET API: Get all languages with pagination */
const getAllLanguagesPaginated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const result = yield language_service_1.default.getAllLanguagesPaginated(Number(page), Number(limit), search);
        (0, http_status_1.sendSuccessResponse)(res, 'Languages retrieved successfully.', result);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve languages.', error);
        next(error);
    }
});
/** GET API: Get language by ID */
const getLanguageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const language = yield language_service_1.default.findLanguageById(id);
        if (!language) {
            return (0, http_status_1.sendBadRequestResponse)(res, 'Language not found.');
        }
        (0, http_status_1.sendSuccessResponse)(res, 'Language retrieved successfully.', language);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve language.', error);
        next(error);
    }
});
/** POST API: Create new language */
const createLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { name, logo_url, category } = req.body;
        // Check if language with same name already exists
        const existingLanguage = yield language_service_1.default.getAllLanguages();
        const languageExists = existingLanguage.some(lang => lang.name.toLowerCase() === name.toLowerCase());
        if (languageExists) {
            yield transaction.rollback();
            return (0, http_status_1.sendConflictErrorResponse)(res, 'Language with this name already exists!');
        }
        // Prepare language data
        const languageData = {
            name,
            logo_url,
            category
        };
        // Create language
        const language = yield language_service_1.default.createLanguage(languageData, transaction);
        if (!language) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create language.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Language created successfully.', language);
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create language.', error);
        next(error);
    }
});
/** PUT API: Update language */
const updateLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, logo_url, category } = req.body;
        // Check if language exists
        const existingLanguage = yield language_service_1.default.findLanguageById(id);
        if (!existingLanguage) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Language not found.');
        }
        // Check if another language with same name exists (excluding current one)
        const allLanguages = yield language_service_1.default.getAllLanguages();
        const languageExists = allLanguages.some(lang => lang.id !== id && lang.name.toLowerCase() === name.toLowerCase());
        if (languageExists) {
            yield transaction.rollback();
            return (0, http_status_1.sendConflictErrorResponse)(res, 'Language with this name already exists!');
        }
        // Update language
        const updateData = { name, logo_url, category };
        const isUpdated = yield language_service_1.default.updateLanguage(id, updateData, transaction);
        if (!isUpdated) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update language.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Language updated successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update language.', error);
        next(error);
    }
});
/** DELETE API: Delete language */
const deleteLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        // Check if language exists
        const existingLanguage = yield language_service_1.default.findLanguageById(id);
        if (!existingLanguage) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Language not found.');
        }
        // Delete language (soft delete)
        const isDeleted = yield language_service_1.default.deleteLanguage(id, transaction);
        if (!isDeleted) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete language.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Language deleted successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete language.', error);
        next(error);
    }
});
exports.default = {
    getAllLanguages,
    getAllLanguagesPaginated,
    getLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage,
};
