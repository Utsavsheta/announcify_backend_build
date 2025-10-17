"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const sequelize_1 = require("sequelize");
class Language extends sequelize_1.Model {
    static initModel(connection) {
        Language.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(250),
                allowNull: false,
            },
            logo_url: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            category: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        }, {
            tableName: 'language',
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
    }
}
exports.Language = Language;
