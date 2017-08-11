DROP TABLE User;
DROP TABLE Project;
DROP TABLE Reward;
DROP TABLE Creators;
DROP TABLE Backers;
DROP TABLE Progress;


CREATE TABLE User(
user_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(20) NOT NULL,
location varchar(20),
email varchar(100) NOT NULL,
password varchar(100) NOT NULL
);

CREATE TABLE Progress(
progress_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
target integer NOT NULL,
currentPledged integer NOT NULL,
numberOfBackers integer NOT NULL
);

CREATE TABLE Backers(
pledge_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id integer NOT NULL,
amount integer NOT NULL,
anonymous boolean NOT NULL,
project_id integer NOT NULL,
FOREIGN KEY (project_id) REFERENCES User(project_id),
FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Creators(
id integer NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL,
user integer,
project integer NOT NULL,
FOREIGN KEY (user) REFERENCES User(user_id),
FOREIGN KEY (project) REFERENCES Project(project_id),
);

CREATE TABLE Reward(
reward_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
amount integer NOT NULL,
description varchar(200)
);

CREATE TABLE Project(
project_id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
title varchar(50) NOT NULL UNIQUE,
subtitle varchar(200),
description varchar(200),
imageUri varchar(100),
imageId integer NOT NULL AUTO_INCREMENT,
creationDate integer,
creator integer NOT NULL,
reward integer NOT NULL,
progress integer NOT NULL,
FOREIGN KEY (creator) REFERENCES User(user_id),
FOREIGN KEY (reward) REFERENCES Reward(reward_id),
FOREIGN KEY (progress) REFERENCES Progress(progress_id),
FOREIGN KEY (reward) REFERENCES Reward(reward_id),
);



