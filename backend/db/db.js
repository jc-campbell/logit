// Import required database library (e.g., Knex.js)
import knex from 'knex';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize database connection
const db = knex({
  client: 'pg', // Use 'pg' for PostgreSQL
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'your_db_name'
  }
});

// Test database connection
(async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

export default db;
