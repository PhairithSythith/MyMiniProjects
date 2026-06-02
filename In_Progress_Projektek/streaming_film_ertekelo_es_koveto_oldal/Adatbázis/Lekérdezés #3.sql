-- Felhasználói adatokat tartalmazó tábla
CREATE TABLE Felhasznalo(
ID intfilm AUTO_INCREMENT PRIMARY KEY,
Jelszo VARCHAR(30) NOT NULL,
FelhNev VARCHAR(50) NOT NULL UNIQUE,
Email VARCHAR(100) NOT NULL );


