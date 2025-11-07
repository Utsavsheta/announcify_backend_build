"use strict";
require("dotenv/config");
const { createServer } = require("http");
const { App } = require("./app");
const { initializeDatabase } = require("./config/database");
const { initMySQLModels } = require("./models/index.model");
const { runSeeds } = require("./seeders/index.seeder");
const validateEnv = require("./utils/validate-env");

const app = new App();
const handler = app.express;

(async () => {
  try {
    console.log("Initializing database connection...");
    const sequelize = await initializeDatabase();

    console.log("Initializing models...");
    initMySQLModels(sequelize);

    console.log("Syncing database...");
    await sequelize.sync({ alter: true });
    console.log("✅ Sequelize OK - Database synced");

    if (validateEnv.SEED === true) {
      await runSeeds(sequelize);
      console.log("🌱 Seeds completed");
    }

  } catch (err) {
    console.error("❌ Error initializing server:", err);
  }
})();

// ✅ Export express handler for Vercel
module.exports = handler;
