"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMySQLModels = void 0;
const user_model_1 = require("./user.model");
const user_media_model_1 = require("./user-media.model");
const language_model_1 = require("./language.model");
const lesson_model_1 = require("./lesson.model");
const lesson_section_model_1 = require("./lesson-section.model");
const initMySQLModels = (connection) => {
    // init models here
    user_model_1.User.initModel(connection);
    user_media_model_1.UserMedia.initModel(connection);
    language_model_1.Language.initModel(connection);
    lesson_section_model_1.LessonSection.initModel(connection);
    lesson_model_1.Lesson.initModel(connection);
    // init associations here
    user_model_1.User.initAssociations();
    user_media_model_1.UserMedia.initAssociations();
    language_model_1.Language.initAssociations();
    lesson_section_model_1.LessonSection.initAssociations();
    lesson_model_1.Lesson.initAssociations();
    // init hooks here
    user_model_1.User.initHooks();
    user_media_model_1.UserMedia.initHooks();
    language_model_1.Language.initHooks();
    lesson_section_model_1.LessonSection.initHooks();
    lesson_model_1.Lesson.initHooks();
};
exports.initMySQLModels = initMySQLModels;
