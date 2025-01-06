const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a pool of connections using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgreSQL database successfully!');
  }
  release();
});

// Export the pool for querying the database
module.exports = pool;
