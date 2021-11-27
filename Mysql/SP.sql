 /*=========================================	REGISTRAR NUEVO CLIENTE=======================================================*/
DELIMITER //
CREATE PROCEDURE `newCustomer`( IN vName varchar(200),IN vAddres varchar(200),IN vPhone varchar(200),IN vtypeCard varchar(200),IN vNip varchar(200),IN vUser varchar(200),IN vPass varchar(200))
BEGIN
SET SQL_SAFE_UPDATES = 0;
	INSERT INTO login(username,pass,level)VALUES(vUser,vPass,'customer');
	SET @Token := (SELECT id From login WHERE username = vUser AND pass = vPass);
	
	INSERT INTO Clientes(Name,addres,phone,typeCard,numberCard,idLogin)VALUES(vName,vAddres,vPhone,vtypeCard,vNip,@Token );
 
END

 /*=========================================	CONSULTAR CLIENTES =======================================================*/
 DELIMITER //
CREATE PROCEDURE `CargarClientes`( )
BEGIN
SELECT C.idLogin, C.Name,C.addres,C.phone,C.typeCard,C.numberCard , U.username, U.pass
	FROM  Clientes AS C
JOIN login AS U ON C.idLogin  = U.id;
 
END
 
  /*=========================================	ACTUALIZAR CLIENTE=======================================================*/
DELIMITER //
CREATE PROCEDURE `ActualizarCliente`( IN vName varchar(200),IN vAddres varchar(200),IN vPhone varchar(200),IN vtypeCard varchar(200),IN vNip varchar(200),IN vUser varchar(200),IN vPass varchar(200),IN vidLogin varchar(200))
BEGIN
SET SQL_SAFE_UPDATES = 0;
	UPDATE login SET username = vUser,pass = vPass WHERE id = vidLogin;
	
 	UPDATE Clientes SET NAME = vName,addres = vAddres,phone = vPhone,typeCard = vtypeCard,numberCard = vNip WHERE idLogin = vidLogin;
END
 