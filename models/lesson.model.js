"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const sequelize_1 = require("sequelize");
const language_model_1 = require("./language.model");
const lesson_section_model_1 = require("./lesson-section.model");
class Lesson extends sequelize_1.Model {
    static initModel(connection) {
        Lesson.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            language_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'language',
                    key: 'id'
                }
            },
            section_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'lesson_section',
                    key: 'id'
                }
            },
            title: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            lesson_number: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
                defaultValue: {}
            },
            is_published: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        }, {
            tableName: 'lesson',
            sequelize: connection,
            freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
    static initHooks() {
    }
    static initAssociations() {
        // Association with Language
        Lesson.belongsTo(language_model_1.Language, {
            foreignKey: 'language_id',
            as: 'language'
        });
        // Association with LessonSection
        Lesson.belongsTo(lesson_section_model_1.LessonSection, {
            foreignKey: 'section_id',
            as: 'section'
        });
    }
}
exports.Lesson = Lesson;
