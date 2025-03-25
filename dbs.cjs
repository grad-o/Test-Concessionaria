require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
module.exports = sql
async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}
getPgVersion();
