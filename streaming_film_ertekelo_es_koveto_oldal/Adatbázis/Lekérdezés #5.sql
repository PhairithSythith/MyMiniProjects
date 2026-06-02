-- különböző streaming platformokat tartalmazó tábla
CREATE TABLE StreamingPlatform(
ID int AUTO_INCREMENT PRIMARY KEY,
Nev VARCHAR(100) NOT NULL,
LogoUrl VARCHAR(1000) NOT NULL,
filmId INT,
FOREIGN KEY (filmId) REFERENCES Film(ID) ON UPDATE CASCADE ON DELETE SET NULL  
);