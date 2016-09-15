"use strict";

const mysql = require('mysql');
const Promise = require('bluebird');
var using = Promise.using; // resource management
Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

// If have multiple environments, uncomment 2 lines below
// const config = require('../config/db-' + app.env + '.json');
const config = require('../config/db-development.json');
const pool = mysql.createPool(config.db);

// Release used to return connection to pool
function getSqlConnection() {
  return pool.getConnectionAsync().disposer(function(connection) {
    connection.release();
  });
};

// Generic query function to take in queries
function query(command) {
  return using(getSqlConnection(), function (connection) {
    return connection.queryAsync(command);
  });
};

module.exports = {
  query: query
};