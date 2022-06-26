USE DBTESTE;
GO

INSERT INTO UserType(TitleUserType)
values('Administrador'),('Root'),('Geral');


INSERT INTO UserName(IdUserType,UserName, Email, Passwd, Status)
values(2,'Rose','rosemary@gmail.com','Senai@132',0),
(1,'Rezende','rezende@gmail.com','rezende@132',1),
(3,'Daniel','daniel@gmail.com','daniel@132',1);


-- Selects :

SELECT * FROM UserName;
SELECT * FROM UserType;
