"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonSection = void 0;
const sequelize_1 = require("sequelize");
const language_model_1 = require("./language.model");
const lesson_model_1 = require("./lesson.model");
class LessonSection extends sequelize_1.Model {
    static initModel(connection) {
        LessonSection.init({
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
            title: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            section_order: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
            tableName: 'lesson_section',
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
        LessonSection.belongsTo(language_model_1.Language, {
            foreignKey: 'language_id',
            as: 'language'
        });
        // Association with Lessons
        LessonSection.hasMany(lesson_model_1.Lesson, {
            foreignKey: 'section_id',
            as: 'lessons'
        });
    }
}
exports.LessonSection = LessonSection;
