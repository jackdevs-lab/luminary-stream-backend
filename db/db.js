const { Pool } = require('pg');

// Configure your Neon PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_pK43zDxXoZyb@ep-empty-forest-abty14tx-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});

console.log("📡 db.js loaded");

module.exports = {
  query: (text, params) => pool.query(text, params),
};