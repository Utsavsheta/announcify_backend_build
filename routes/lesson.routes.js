"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = __importDefault(require("../controllers/lesson.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_validator_middleware_1 = require("../middlewares/schema-validator.middleware");
const lesson_validation_1 = require("../validations/lesson.validation");
const router = (0, express_1.Router)();
// ==================== LESSON ROUTES ====================
// Public routes (no authentication required)
router.get('/course/:language_id', lesson_controller_1.default.getCourseStructure);
router.get('/course/name/:language_name', lesson_controller_1.default.getCourseStructureByName);
// Admin routes (authentication and admin role required)
router.get('/all', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonGetAllSchema, 'query'), lesson_controller_1.default.getAllLessons);
router.get('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonGetAllPaginatedSchema, 'query'), lesson_controller_1.default.getAllLessonsPaginated);
router.get('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), lesson_controller_1.default.getLessonById);
router.post('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonCreateSchema, 'body'), lesson_controller_1.default.createLesson);
router.put('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonUpdateSchema, 'body'), lesson_controller_1.default.updateLesson);
router.delete('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), lesson_controller_1.default.deleteLesson);
// ==================== LESSON SECTION ROUTES ====================
// Admin routes for lesson sections
router.get('/sections/all', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonSectionGetAllSchema, 'query'), lesson_controller_1.default.getAllLessonSections);
router.get('/sections/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonSectionGetAllPaginatedSchema, 'query'), lesson_controller_1.default.getAllLessonSectionsPaginated);
router.get('/sections/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), lesson_controller_1.default.getLessonSectionById);
router.post('/sections/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonSectionCreateSchema, 'body'), lesson_controller_1.default.createLessonSection);
router.put('/sections/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), (0, schema_validator_middleware_1.validateSchema)(lesson_validation_1.lessonSectionUpdateSchema, 'body'), lesson_controller_1.default.updateLessonSection);
router.delete('/sections/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.checkRole)(['ADMIN']), lesson_controller_1.default.deleteLessonSection);
exports.default = router;
