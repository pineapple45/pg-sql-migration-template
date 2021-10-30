const { query } = require('express');
const express = require('express');
const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'postgres',
  password: 'postgres',
});

pool
  .query(
    `
    UPDATE posts
    SET loc = POINT(lng,lat)
    WHERE loc IS null;
  `
  )
  .then(() => {
    console.log('update complete');
    pool.end();
  })
  .catch((err) => {
    console.error(err.message);
  });
