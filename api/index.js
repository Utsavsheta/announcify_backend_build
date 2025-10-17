// api/index.js
const serverless = require('serverless-http');
const expressApp = require('../src/express-app');

module.exports = serverless(expressApp);
