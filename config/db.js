/**
 * Created by cba62 on 6/08/17.
 */

const mysql = require('mysql');
const fs = require("fs");

const state = {
    pool: null
};

exports.connect = function (done) {
  state.pool = mysql.createPool({
      user: 'seng365cba62',
      password: "secret",
      host: process.env.SENG365_MYSQL_HOST || 'localhost',
      port: process.env.SENG365_MYSQL_PORT || 6033,
      database: "mysql",
      multipleStatements: true
  });


  conn(function (connection) {
     fs.readFile("createTables.sql", "utf-8", function (er, tablesSql) {
             connection.query(tablesSql, function (err, result) {
                 if (err){
                     done(err);
                 }
                 connection.query("SELECT * FROM Users", function (err, rows) {
                     if (rows.length == 0){
                         fs.readFile("populateDatabase.sql", "utf-8", function (er, dataSql) {
                             connection.query(dataSql, function (err, result) {
                                 console.log(err);
                             });
                         });
                     }
                 });

                     done();
             })
         });

      });

};

async function conn(done) {

    state.pool.getConnection(function (err, connection) {
        if (err) {
            conn(done);
        } else {
            done(connection)
        }
    });
}

exports.get = function () {
    return state.pool;
};

