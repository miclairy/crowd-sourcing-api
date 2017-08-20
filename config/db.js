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
      database: "Assignment1",
      multipleStatements: true
  });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  conn(function (connection) {
     fs.readFile("createTables.sql", "utf-8", function (er, tablesSql) {
         fs.readFile("populateDatabase.sql", "utf-8", function (er, dataSql) {
             connection.query(tablesSql + " " + dataSql, function (err, result) {
                 if (err){
                     done(err);
                 }
                 done();
             })
         });

      });


  });


};

async function conn(done) {

    await sleep(2000);
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

function table_satements() {

    let query = "DROP TABLE Authorisation; " +
"DROP TABLE Backers; " + 
"DROP TABLE Creators; " +
"DROP TABLE Reward; " +
"DROP TABLE Project;"+
"DROP TABLE Users; " +

"CREATE TABLE Users ( " +
"user_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,  " +
"username varchar(20) NOT NULL UNIQUE, " +
"location varchar(20),  " +
"email varchar(100) NOT NULL, " +
"password varchar(100) NOT NULL, " +
"active boolean DEFAULT true); " +

"CREATE TABLE Project ( " +
"id integer NOT NULL AUTO_INCREMENT, " +
"title varchar(50) NOT NULL UNIQUE, " +
"subtitle varchar(200), " +
"description varchar(200), " +
"imageUri varchar(200), " +
"image blob, " +
"creationDate timestamp DEFAULT NOW(), " +
"target integer NOT NULL, " +
"currentPledged integer NOT NULL DEFAULT 0, " +
"numberOfBackers integer NOT NULL DEFAULT 0, " +
"open boolean NOT NULL DEFAULT false, " +
"PRIMARY KEY (id)); " +

"CREATE TABLE Reward ( " +
"reward_id integer NOT NULL AUTO_INCREMENT, " +
"amount integer NOT NULL, " +
"description varchar(200), " +
"project integer NOT NULL, " +
"PRIMARY KEY (reward_id), " +
"FOREIGN KEY (project) REFERENCES Project(id) " +
"); " +

"CREATE TABLE Creators ( " +
"id integer NOT NULL AUTO_INCREMENT, " +
"name varchar(30) NOT NULL, " +
"user_id integer, " +
"project integer NOT NULL, " +
"FOREIGN KEY (user_id) REFERENCES Users(user_id), " +
"FOREIGN KEY (project) REFERENCES Project(id), " +
"PRIMARY KEY (id)); " +

"CREATE TABLE Backers ( " +
"pledge_id integer NOT NULL AUTO_INCREMENT, " +
"user_id integer NOT NULL, " +
"amount integer NOT NULL, " +
"anonymous boolean NOT NULL DEFAULT false, " +
"project_id integer NOT NULL, " +
"FOREIGN KEY (project_id) REFERENCES Project(id), " +
"FOREIGN KEY (user_id) REFERENCES Users(user_id), " +
"PRIMARY KEY (pledge_id)); " +

"CREATE TABLE Authorisation( " +
"token varchar(2000) NOT NULL PRIMARY KEY, " +
"user_id integer NOT NULL, " +
"FOREIGN KEY (user_id) REFERENCES Users(user_id) " +
");" ;

    return query;

}
