DROP TABLE Users;
DROP TABLE Project;
DROP TABLE Reward;
DROP TABLE Creators;
DROP TABLE Backers;
DROP TABLE Progress;


CREATE TABLE Users (
user_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(20) NOT NULL,
location varchar(20),
email varchar(100) NOT NULL,
password varchar(100) NOT NULL
);

CREATE TABLE Progress (
progress_id integer NOT NULL AUTO_INCREMENT,
target integer NOT NULL,
currentPledged integer NOT NULL,
numberOfBackers integer NOT NULL,
PRIMARY KEY (progress_id)
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

CREATE TABLE Creators (
id integer NOT NULL,
name varchar(30) NOT NULL,
user_id integer,
project integer NOT NULL,
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (project) REFERENCES Project(project_id),
PRIMARY KEY (id)
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
imageId integer NOT NULL AUTO_INCREMENT,
creationDate integer,
creator integer NOT NULL,
reward integer NOT NULL,
progress integer NOT NULL,
FOREIGN KEY (creator) REFERENCES Users(user_id),
FOREIGN KEY (reward) REFERENCES Reward(reward_id),
FOREIGN KEY (progress) REFERENCES Progress(progress_id),
FOREIGN KEY (reward) REFERENCES Reward(reward_id),
PRIMARY KEY (project_id)
);