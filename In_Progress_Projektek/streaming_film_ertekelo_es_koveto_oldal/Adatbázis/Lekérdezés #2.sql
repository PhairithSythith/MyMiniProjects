-- Filmeket és sorozatokat tartalmazó tábla
CREATE TABLE Film(
Cim VARCHAR(200) NOT NULL,
Leiras VARCHAR(1000),
Hossz INT,
Evad INT,
Resz INT,
Tipus VARCHAR(20) NOT NULL,
plakatKep BLOB NOT NULL,
ID int AUTO_INCREMENT PRIMARY KEY 
);


