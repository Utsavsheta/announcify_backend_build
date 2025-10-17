// src/express-app.js
const { App } = require('./app');

// Instantiate your App class and export the express instance
const appInstance = new App();
module.exports = appInstance.express;
