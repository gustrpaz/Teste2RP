CREATE DATABASE DBTESTE
GO

USE DBTESTE
GO

CREATE TABLE UserType(
IdUserType INT PRIMARY KEY Identity NOT NULL,
TitleUserType varchar(50) NOT NULL
);
GO

CREATE TABLE UserName(
 IdUser INT PRIMARY KEY Identity NOT NULL,
 IdUserType INT FOREIGN KEY REFERENCES UserType(IdUserType),
 UserName varchar(256) NOT NULL,
 Email varchar(256) NOT NULL UNIQUE,
 Passwd varchar(100),
 Status BIT NOT NULL
);
GO



