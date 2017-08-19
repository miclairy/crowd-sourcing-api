DROP TABLE Authorisation;
DROP TABLE Backers;
DROP TABLE Creators;
DROP TABLE Reward;
DROP TABLE Project;
DROP TABLE Users;

CREATE TABLE Users (
user_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(20) NOT NULL,
location varchar(20),
email varchar(100) NOT NULL,
password varchar(100) NOT NULL,
active boolean DEFAULT true
);

CREATE TABLE Project (
id integer NOT NULL AUTO_INCREMENT,
title varchar(50) NOT NULL UNIQUE,
subtitle varchar(200),
description varchar(200),
imageId integer NOT NULL,
imageUri varchar(200),
image blob,
creationDate timestamp DEFAULT NOW(),
target integer NOT NULL,
currentPledged integer NOT NULL DEFAULT 0,
numberOfBackers integer NOT NULL DEFAULT 0,
open boolean NOT NULL DEFAULT 0,
PRIMARY KEY (id)
);

CREATE TABLE Reward (
reward_id integer NOT NULL AUTO_INCREMENT,
amount integer NOT NULL,
description varchar(200),
project integer NOT NULL,
PRIMARY KEY (reward_id),
FOREIGN KEY (project) REFERENCES Project(id)
);

CREATE TABLE Creators (
id integer NOT NULL AUTO_INCREMENT,
name varchar(30) NOT NULL,
user_id integer,
project integer NOT NULL,
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (project) REFERENCES Project(id),
PRIMARY KEY (id)
);

CREATE TABLE Backers (
pledge_id integer NOT NULL AUTO_INCREMENT,
user_id integer NOT NULL,
amount integer NOT NULL,
anonymous boolean NOT NULL DEFAULT 1,
project_id integer NOT NULL,
FOREIGN KEY (project_id) REFERENCES Project(id),
FOREIGN KEY (user_id) REFERENCES Users(user_id),
PRIMARY KEY (pledge_id)
);

CREATE TABLE Authorisation(
token varchar(2000) NOT NULL PRIMARY KEY,
user_id integer NOT NULL,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);