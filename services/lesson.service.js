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
const lesson_model_1 = require("../models/lesson.model");
const lesson_section_model_1 = require("../models/lesson-section.model");
const language_model_1 = require("../models/language.model");
/** Get all lessons */
const getAllLessons = (search, languageId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.title = { [sequelize_1.Op.like]: `%${search}%` };
    }
    if (languageId) {
        whereClause.language_id = languageId;
    }
    if (sectionId) {
        whereClause.section_id = sectionId;
    }
    return yield lesson_model_1.Lesson.findAll({
        where: whereClause,
        include: [
            {
                model: lesson_section_model_1.LessonSection,
                as: 'section',
                attributes: ['id', 'title', 'section_order']
            },
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'section_id', 'title', 'description', 'lesson_number', 'content', 'is_published', 'created_at'],
        order: [['lesson_number', 'ASC']]
    });
});
/** Get all lessons with pagination */
const getAllLessonsPaginated = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, search, languageId, sectionId) {
    const offset = (Number(page) - 1) * Number(limit);
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.title = { [sequelize_1.Op.like]: `%${search}%` };
    }
    if (languageId) {
        whereClause.language_id = languageId;
    }
    if (sectionId) {
        whereClause.section_id = sectionId;
    }
    const { count, rows: lessons } = yield lesson_model_1.Lesson.findAndCountAll({
        where: whereClause,
        include: [
            {
                model: lesson_section_model_1.LessonSection,
                as: 'section',
                attributes: ['id', 'title', 'section_order']
            },
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'section_id', 'title', 'description', 'lesson_number', 'content', 'is_published', 'created_at'],
        order: [['lesson_number', 'ASC']],
        limit: Number(limit),
        offset: Number(offset)
    });
    return {
        lessons,
        pagination: {
            totalCount: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / Number(limit))
        }
    };
});
/** Find lesson by ID */
const findLessonById = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lesson_model_1.Lesson.findOne({
        where: {
            id,
            is_deleted: false
        },
        include: [
            {
                model: lesson_section_model_1.LessonSection,
                as: 'section',
                attributes: ['id', 'title', 'section_order']
            },
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'section_id', 'title', 'description', 'lesson_number', 'content', 'is_published', 'created_at'],
        transaction
    });
});
/** Create new lesson */
const createLesson = (lessonData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lesson_model_1.Lesson.create(lessonData, { transaction });
});
/** Update lesson */
const updateLesson = (id, updateData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield lesson_model_1.Lesson.update(updateData, {
        where: { id },
        transaction
    });
    return affected;
});
/** Delete lesson (soft delete) */
const deleteLesson = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield lesson_model_1.Lesson.update({ is_deleted: true }, { where: { id }, transaction });
    return affected;
});
/** Get course structure for a language */
const getCourseStructure = (languageId) => __awaiter(void 0, void 0, void 0, function* () {
    const language = yield language_model_1.Language.findOne({
        where: { id: languageId, is_deleted: false },
        attributes: ['id', 'name', 'logo_url', 'category']
    });
    if (!language) {
        return null;
    }
    const sections = yield lesson_section_model_1.LessonSection.findAll({
        where: { language_id: languageId, is_deleted: false, is_published: true },
        include: [
            {
                model: lesson_model_1.Lesson,
                as: 'lessons',
                where: { is_deleted: false, is_published: true },
                required: false,
                attributes: ['id', 'title', 'description', 'lesson_number', 'content', 'is_published'],
                order: [['lesson_number', 'ASC']]
            }
        ],
        attributes: ['id', 'title', 'description', 'section_order'],
        order: [['section_order', 'ASC']]
    });
    return {
        language: language.toJSON(),
        sections: sections.map(section => ({
            id: section.id,
            title: section.title,
            description: section.description,
            section_order: section.section_order,
            lessons: section.lessons || []
        }))
    };
});
/** Get course structure for a language by name */
const getCourseStructureByName = (languageName) => __awaiter(void 0, void 0, void 0, function* () {
    const language = yield language_model_1.Language.findOne({
        where: { name: languageName, is_deleted: false },
        attributes: ['id', 'name', 'logo_url', 'category']
    });
    if (!language) {
        return null;
    }
    const sections = yield lesson_section_model_1.LessonSection.findAll({
        where: { language_id: language.id, is_deleted: false, is_published: true },
        include: [
            {
                model: lesson_model_1.Lesson,
                as: 'lessons',
                where: { is_deleted: false, is_published: true },
                required: false,
                attributes: ['id', 'title', 'description', 'lesson_number', 'content', 'is_published'],
                order: [['lesson_number', 'ASC']]
            }
        ],
        attributes: ['id', 'title', 'description', 'section_order'],
        order: [['section_order', 'ASC']]
    });
    return {
        language: language.toJSON(),
        sections: sections.map(section => ({
            id: section.id,
            title: section.title,
            description: section.description,
            section_order: section.section_order,
            lessons: section.lessons || []
        }))
    };
});
// Lesson Section Services
/** Get all lesson sections */
const getAllLessonSections = (search, languageId) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.title = { [sequelize_1.Op.like]: `%${search}%` };
    }
    if (languageId) {
        whereClause.language_id = languageId;
    }
    return yield lesson_section_model_1.LessonSection.findAll({
        where: whereClause,
        include: [
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'title', 'description', 'section_order', 'is_published', 'created_at'],
        order: [['section_order', 'ASC']]
    });
});
/** Get all lesson sections with pagination */
const getAllLessonSectionsPaginated = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, search, languageId) {
    const offset = (Number(page) - 1) * Number(limit);
    const whereClause = { is_deleted: false };
    if (search) {
        whereClause.title = { [sequelize_1.Op.like]: `%${search}%` };
    }
    if (languageId) {
        whereClause.language_id = languageId;
    }
    const { count, rows: sections } = yield lesson_section_model_1.LessonSection.findAndCountAll({
        where: whereClause,
        include: [
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'title', 'description', 'section_order', 'is_published', 'created_at'],
        order: [['section_order', 'ASC']],
        limit: Number(limit),
        offset: Number(offset)
    });
    return {
        sections,
        pagination: {
            totalCount: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / Number(limit))
        }
    };
});
/** Find lesson section by ID */
const findLessonSectionById = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lesson_section_model_1.LessonSection.findOne({
        where: {
            id,
            is_deleted: false
        },
        include: [
            {
                model: language_model_1.Language,
                as: 'language',
                attributes: ['id', 'name', 'logo_url', 'category']
            }
        ],
        attributes: ['id', 'language_id', 'title', 'description', 'section_order', 'is_published', 'created_at'],
        transaction
    });
});
/** Create new lesson section */
const createLessonSection = (sectionData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lesson_section_model_1.LessonSection.create(sectionData, { transaction });
});
/** Update lesson section */
const updateLessonSection = (id, updateData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield lesson_section_model_1.LessonSection.update(updateData, {
        where: { id },
        transaction
    });
    return affected;
});
/** Delete lesson section (soft delete) */
const deleteLessonSection = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const [affected] = yield lesson_section_model_1.LessonSection.update({ is_deleted: true }, { where: { id }, transaction });
    return affected;
});
exports.default = {
    // Lesson methods
    findLessonById,
    createLesson,
    updateLesson,
    getAllLessons,
    getAllLessonsPaginated,
    deleteLesson,
    getCourseStructure,
    getCourseStructureByName,
    // Lesson Section methods
    findLessonSectionById,
    createLessonSection,
    updateLessonSection,
    getAllLessonSections,
    getAllLessonSectionsPaginated,
    deleteLessonSection
};
