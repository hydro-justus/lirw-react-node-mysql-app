const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ALB health check
app.get('/health', (req, res) => {
   res.status(200).send('OK');
});

// CloudFront/API health check
app.get('/api/health', (req, res) => {
   res.status(200).send('OK');
});

// Connect to MySQL
db.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
   }
   console.log('Connected to MySQL Database');
});

// API routes
app.use('/api', routes);

module.exports = app;
