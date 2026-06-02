-- Értekelések a filmekre a felhasználó által, az értékelések adatai
CREATE TABLE Ertekeles(
ID int AUTO_INCREMENT PRIMARY KEY,
Pont INT,
Velemeny VARCHAR(1000),
Datum DATE,
filmID INT,
felhID INT,
FOREIGN KEY(filmID) REFERENCES Film(ID) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (felhID) REFERENCES Felhasznalo(ID) ON UPDATE CASCADE ON DELETE CASCADE 
);

