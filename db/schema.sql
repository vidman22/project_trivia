CREATE DATABASE scoreboard;


USE scoreboard;

CREATE TABLE `scores` (
ID int NOT NULL AUTO_INCREMENT,
username varchar(50) NOT NULL,
score  int NOT NULL,
Dated TIMESTAMP NOT NULL,
PRIMARY Key (ID)
);