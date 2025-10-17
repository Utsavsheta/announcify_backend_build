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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const language_model_1 = require("../models/language.model");
/** Get all languages */
const getAllLanguages = (search) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.name = { [sequelize_1.Op.like]: `%${search}%` };
    }
    return yield language_model_1.Language.findAll({
        where: whereClause,
        attributes: ['id', 'name', 'logo_url', 'category', 'created_at'],
        order: [['created_at', 'DESC']]
    });
});
/** Get all languages with pagination */
const getAllLanguagesPaginated = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, search) {
    const offset = (Number(page) - 1) * Number(limit);
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.name = { [sequelize_1.Op.like]: `%${search}%` };
    }
    const { count, rows: languages } = yield language_model_1.Language.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'name', 'logo_url', 'category', 'created_at'],
        order: [['created_at', 'DESC']],
        limit: Number(limit),
        offset: Number(offset)
    });
    return {
        languages,
        pagination: {
            totalCount: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / Number(limit))
        }
    };
});
/** Find language by ID */
const findLanguageById = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield language_model_1.Language.findOne({
        where: {
            id,
            is_deleted: false
        },
        attributes: ['id', 'name', 'logo_url', 'category', 'created_at'],
        transaction
    });
});
/** Create new language */
const createLanguage = (languageData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield language_model_1.Language.create(languageData, { transaction });
});
/** Update language */
const updateLanguage = (id, updateData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield language_model_1.Language.update(updateData, {
        where: { id },
        transaction
    });
    return affected;
});
/** Delete language (soft delete) */
const deleteLanguage = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield language_model_1.Language.update({ is_deleted: true }, { where: { id }, transaction });
    return affected;
});
exports.default = {
    findLanguageById,
    createLanguage,
    updateLanguage,
    getAllLanguages,
    getAllLanguagesPaginated,
    deleteLanguage
};
