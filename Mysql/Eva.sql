CREATE DATABASE eva;

USE eva;


CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `pass` varchar(15) DEFAULT NULL,
	level varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
 
CREATE TABLE `Clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(60) DEFAULT NULL,
  `addres` VARCHAR(120) DEFAULT NULL,
	phone varchar(15) DEFAULT NULL,
	typeCard varchar(15) DEFAULT NULL,
	numberCard varchar(15) DEFAULT NULL,
	idLogin varchar(15) DEFAULT NULL,
	status varchar(15) DEFAULT 'activa',
  PRIMARY KEY (`id`)
)

 











SELECT * FROM almacen WHERE almacen = 'Gaveta'

SELECT DISTINCT Producto,Clave FROM almacen

SELECT Producto FROM almacen WHERE DISTINCT Producto

INSERT INTO gaveta (Clave,Producto) SELECT DISTINCT Clave,Producto FROM almacen

UPDATE almacen SET Stock = 0, StockMin = 0, StockMax = 0, StockUsado = 0 WHERE almacen = 'Gaveta'

INSERT INTO almacen (Clave,Producto,Almacen) SELECt  Clave,Producto,Almacen FROM gaveta

SELECT * FROM productoflotante

SELECT Stock FROM almacen WHERE Producto = 'Producto_Prueba' AND Almacen = 'Gaveta'
/********************************************************************/

CREATE TABLE `requisiciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Folio` varchar(15) DEFAULT NULL,
  `Clave` varchar(15) DEFAULT NULL,
  `Producto` varchar(200) DEFAULT NULL,
  `CantidadReq` int(11) DEFAULT (0),
   `OT` varchar(10) DEFAULT NULL,
  `Comentarios` varchar(250) DEFAULT NULL,
  `EmpleadoReq` varchar(50) DEFAULT NULL,
  `Planta` varchar(50) DEFAULT NULL,
  `Estatus` varchar(20) DEFAULT NULL,
    `FechaReq` datetime DEFAULT (CURDATE()),
  PRIMARY KEY (`id`)
).