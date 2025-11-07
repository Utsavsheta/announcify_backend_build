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
const lesson_service_1 = __importDefault(require("../services/lesson.service"));
const http_status_1 = require("../utils/http-status");
// ==================== LESSON CONTROLLERS ====================
/** GET API: Get all lessons */
const getAllLessons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, language_id, section_id } = req.query;
        const lessons = yield lesson_service_1.default.getAllLessons(search, language_id, section_id);
        (0, http_status_1.sendSuccessResponse)(res, 'Lessons retrieved successfully.', lessons);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lessons.', error);
        next(error);
    }
});
/** GET API: Get all lessons with pagination */
const getAllLessonsPaginated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search, language_id, section_id } = req.query;
        const result = yield lesson_service_1.default.getAllLessonsPaginated(Number(page), Number(limit), search, language_id, section_id);
        (0, http_status_1.sendSuccessResponse)(res, 'Lessons retrieved successfully.', result);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lessons.', error);
        next(error);
    }
});
/** GET API: Get lesson by ID */
const getLessonById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const lesson = yield lesson_service_1.default.findLessonById(id);
        if (!lesson) {
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson not found.');
        }
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson retrieved successfully.', lesson);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lesson.', error);
        next(error);
    }
});
/** POST API: Create new lesson */
const createLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { language_id, section_id, title, description, lesson_number, content, is_published } = req.body;
        // Check if lesson with same number in section already exists
        const existingLessons = yield lesson_service_1.default.getAllLessons(undefined, language_id);
        const lessonExists = existingLessons.some(lesson => lesson.section_id === section_id && lesson.lesson_number === lesson_number);
        if (lessonExists) {
            yield transaction.rollback();
            return (0, http_status_1.sendConflictErrorResponse)(res, 'Lesson with this number already exists in this section!');
        }
        // Prepare lesson data
        const lessonData = {
            language_id,
            section_id,
            title,
            description,
            lesson_number,
            content,
            is_published: is_published || false
        };
        // Create lesson
        const lesson = yield lesson_service_1.default.createLesson(lessonData, transaction);
        if (!lesson) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create lesson.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson created successfully.', lesson);
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create lesson.', error);
        next(error);
    }
});
/** PUT API: Update lesson */
const updateLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        const { language_id, section_id, title, description, lesson_number, content, is_published } = req.body;
        // Check if lesson exists
        const existingLesson = yield lesson_service_1.default.findLessonById(id);
        if (!existingLesson) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson not found.');
        }
        // Check if another lesson with same number exists in the same section (excluding current one)
        if (lesson_number && section_id) {
            const allLessons = yield lesson_service_1.default.getAllLessons(undefined, language_id);
            const lessonExists = allLessons.some(lesson => lesson.id !== id && lesson.section_id === section_id && lesson.lesson_number === lesson_number);
            if (lessonExists) {
                yield transaction.rollback();
                return (0, http_status_1.sendConflictErrorResponse)(res, 'Lesson with this number already exists in this section!');
            }
        }
        // Update lesson
        const updateData = { language_id, section_id, title, description, lesson_number, content, is_published };
        const isUpdated = yield lesson_service_1.default.updateLesson(id, updateData, transaction);
        if (!isUpdated) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update lesson.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson updated successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update lesson.', error);
        next(error);
    }
});
/** DELETE API: Delete lesson */
const deleteLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        // Check if lesson exists
        const existingLesson = yield lesson_service_1.default.findLessonById(id);
        if (!existingLesson) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson not found.');
        }
        // Delete lesson (soft delete)
        const isDeleted = yield lesson_service_1.default.deleteLesson(id, transaction);
        if (!isDeleted) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete lesson.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson deleted successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete lesson.', error);
        next(error);
    }
});
/** GET API: Get course structure for a language */
const getCourseStructure = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language_id } = req.params;
        const courseStructure = yield lesson_service_1.default.getCourseStructure(language_id);
        if (!courseStructure) {
            return (0, http_status_1.sendBadRequestResponse)(res, 'Language not found or no lessons available.');
        }
        (0, http_status_1.sendSuccessResponse)(res, 'Course structure retrieved successfully.', courseStructure);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve course structure.', error);
        next(error);
    }
});
/** GET API: Get course structure for a language by name */
const getCourseStructureByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language_name } = req.params;
        const courseStructure = yield lesson_service_1.default.getCourseStructureByName(language_name);
        if (!courseStructure) {
            return (0, http_status_1.sendBadRequestResponse)(res, 'Language not found or no lessons available.');
        }
        (0, http_status_1.sendSuccessResponse)(res, 'Course structure retrieved successfully.', courseStructure);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve course structure.', error);
        next(error);
    }
});
// ==================== LESSON SECTION CONTROLLERS ====================
/** GET API: Get all lesson sections */
const getAllLessonSections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, language_id } = req.query;
        const sections = yield lesson_service_1.default.getAllLessonSections(search, language_id);
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson sections retrieved successfully.', sections);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lesson sections.', error);
        next(error);
    }
});
/** GET API: Get all lesson sections with pagination */
const getAllLessonSectionsPaginated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search, language_id } = req.query;
        const result = yield lesson_service_1.default.getAllLessonSectionsPaginated(Number(page), Number(limit), search, language_id);
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson sections retrieved successfully.', result);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lesson sections.', error);
        next(error);
    }
});
/** GET API: Get lesson section by ID */
const getLessonSectionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const section = yield lesson_service_1.default.findLessonSectionById(id);
        if (!section) {
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson section not found.');
        }
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson section retrieved successfully.', section);
    }
    catch (error) {
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to retrieve lesson section.', error);
        next(error);
    }
});
/** POST API: Create new lesson section */
const createLessonSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { language_id, title, description, section_order, is_published } = req.body;
        // Check if section with same order in language already exists
        const existingSections = yield lesson_service_1.default.getAllLessonSections(undefined, language_id);
        const sectionExists = existingSections.some(section => section.language_id === language_id && section.section_order === section_order);
        if (sectionExists) {
            yield transaction.rollback();
            return (0, http_status_1.sendConflictErrorResponse)(res, 'Section with this order already exists for this language!');
        }
        // Prepare section data
        const sectionData = {
            language_id,
            title,
            description,
            section_order: section_order || 0,
            is_published: is_published || false
        };
        // Create section
        const section = yield lesson_service_1.default.createLessonSection(sectionData, transaction);
        if (!section) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create lesson section.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson section created successfully.', section);
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to create lesson section.', error);
        next(error);
    }
});
/** PUT API: Update lesson section */
const updateLessonSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        const { language_id, title, description, section_order, is_published } = req.body;
        // Check if section exists
        const existingSection = yield lesson_service_1.default.findLessonSectionById(id);
        if (!existingSection) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson section not found.');
        }
        // Check if another section with same order exists for the same language (excluding current one)
        if (section_order && language_id) {
            const allSections = yield lesson_service_1.default.getAllLessonSections(undefined, language_id);
            const sectionExists = allSections.some(section => section.id !== id && section.language_id === language_id && section.section_order === section_order);
            if (sectionExists) {
                yield transaction.rollback();
                return (0, http_status_1.sendConflictErrorResponse)(res, 'Section with this order already exists for this language!');
            }
        }
        // Update section
        const updateData = { language_id, title, description, section_order, is_published };
        const isUpdated = yield lesson_service_1.default.updateLessonSection(id, updateData, transaction);
        if (!isUpdated) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update lesson section.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson section updated successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to update lesson section.', error);
        next(error);
    }
});
/** DELETE API: Delete lesson section */
const deleteLessonSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield server_1.sequelize.transaction();
    try {
        const { id } = req.params;
        // Check if section exists
        const existingSection = yield lesson_service_1.default.findLessonSectionById(id);
        if (!existingSection) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Lesson section not found.');
        }
        // Delete section (soft delete)
        const isDeleted = yield lesson_service_1.default.deleteLessonSection(id, transaction);
        if (!isDeleted) {
            yield transaction.rollback();
            return (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete lesson section.');
        }
        yield transaction.commit();
        (0, http_status_1.sendSuccessResponse)(res, 'Lesson section deleted successfully.');
    }
    catch (error) {
        yield transaction.rollback();
        (0, http_status_1.sendBadRequestResponse)(res, 'Failed to delete lesson section.', error);
        next(error);
    }
});
exports.default = {
    // Lesson methods
    getAllLessons,
    getAllLessonsPaginated,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getCourseStructure,
    getCourseStructureByName,
    // Lesson Section methods
    getAllLessonSections,
    getAllLessonSectionsPaginated,
    getLessonSectionById,
    createLessonSection,
    updateLessonSection,
    deleteLessonSection
};
