// api/index.js
const serverless = require('serverless-http');
const app = require('../src/app');   // <-- IMPORTANT: import app, NOT server.js

// optional: quick health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

module.exports = serverless(app);
