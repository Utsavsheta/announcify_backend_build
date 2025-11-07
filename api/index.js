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
require("dotenv/config");
const app_1 = require("../app");
const database_1 = require("../config/database");
const index_model_1 = require("../models/index.model");
const validate_env_1 = require("../utils/validate-env");
let sequelizeInstance = null;
let appInstance = null;
// Initialize database connection (cached for serverless)
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    if (appInstance && sequelizeInstance) {
        return { app: appInstance, sequelize: sequelizeInstance };
    }
    try {
        // Initialize database connection
        console.log('Initializing database connection...');
        sequelizeInstance = yield database_1.initializeDatabase();
        // Initialize models
        console.log('Initializing models...');
        index_model_1.initMySQLModels(sequelizeInstance);
        // Sync database (use force: false in production, alter: true for schema updates)
        console.log('Syncing database...');
        yield sequelizeInstance.sync({ alter: false });
        console.log('✅ Sequelize OK - Database synchronized successfully');
        // Create app instance
        appInstance = new app_1.App();
        return { app: appInstance, sequelize: sequelizeInstance };
    }
    catch (err) {
        console.error('❌ Error initializing app:', err);
        throw err;
    }
});
// Export Vercel serverless function
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { app } = yield initializeApp();
        return app.express(req, res);
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

