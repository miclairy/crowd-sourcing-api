DROP TABLE Backers;
DROP TABLE Creators;
DROP TABLE Project;
DROP TABLE Reward;
DROP TABLE Users;


CREATE TABLE Users (
user_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(20) NOT NULL,
location varchar(20),
email varchar(100) NOT NULL,
password varchar(100) NOT NULL
);

CREATE TABLE Reward (
reward_id integer NOT NULL AUTO_INCREMENT,
amount integer NOT NULL,
description varchar(200),
PRIMARY KEY (reward_id)
);

CREATE TABLE Project (
project_id integer NOT NULL AUTO_INCREMENT,
title varchar(50) NOT NULL UNIQUE,
subtitle varchar(200),
description varchar(200),
imageUri varchar(100),
imageId integer NOT NULL,
creationDate integer,
reward integer NOT NULL,
target integer NOT NULL,
currentPledged integer NOT NULL,
numberOfBackers integer NOT NULL,
FOREIGN KEY (reward) REFERENCES Reward(reward_id),
PRIMARY KEY (project_id)
);

CREATE TABLE Creators (
id integer NOT NULL,
name varchar(30) NOT NULL,
user_id integer,
project integer NOT NULL,
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (project) REFERENCES Project(project_id),
PRIMARY KEY (id)
);

CREATE TABLE Backers (
pledge_id integer NOT NULL AUTO_INCREMENT,
user_id integer NOT NULL,
amount integer NOT NULL,
anonymous boolean NOT NULL,
project_id integer NOT NULL,
FOREIGN KEY (project_id) REFERENCES Project(project_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id),
PRIMARY KEY (pledge_id)
);