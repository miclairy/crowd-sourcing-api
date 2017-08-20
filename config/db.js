/**
 * Created by cba62 on 6/08/17.
 */

const mysql = require('mysql');

const state = {
    pool: null
};

exports.connect = function (done) {
  state.pool = mysql.createPool({
      user: 'seng365cba62',
      password: "secret",
      host: process.env.SENG365_MYSQL_HOST || 'localhost',
      port: process.env.SENG365_MYSQL_PORT || 6033,
      database: "Assignment1"
  });

  done();
};

exports.get = function () {
    return state.pool;
};

