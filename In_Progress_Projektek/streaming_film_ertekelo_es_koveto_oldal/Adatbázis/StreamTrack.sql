-- --------------------------------------------------------
-- Gazdagép:                     127.0.0.1
-- Szerver verzió:               10.4.32-MariaDB - mariadb.org binary distribution
-- Szerver OS:                   Win64
-- HeidiSQL Verzió:              12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Adatbázis struktúra mentése a streamtrack.
CREATE DATABASE IF NOT EXISTS `streamtrack` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `streamtrack`;

-- Struktúra mentése tábla streamtrack. ertekeles
CREATE TABLE IF NOT EXISTS `ertekeles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Pont` int(11) DEFAULT NULL,
  `Velemeny` varchar(1000) DEFAULT NULL,
  `Datum` date DEFAULT NULL,
  `filmID` int(11) DEFAULT NULL,
  `felhID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `filmID` (`filmID`),
  KEY `felhID` (`felhID`),
  CONSTRAINT `ertekeles_ibfk_1` FOREIGN KEY (`filmID`) REFERENCES `film` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ertekeles_ibfk_2` FOREIGN KEY (`felhID`) REFERENCES `felhasznalo` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla streamtrack. felhasznalo
CREATE TABLE IF NOT EXISTS `felhasznalo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Jelszo` varchar(60) NOT NULL,
  `FelhNev` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `FelhNev` (`FelhNev`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla streamtrack. film
CREATE TABLE IF NOT EXISTS `film` (
  `Cim` varchar(200) NOT NULL,
  `Leiras` varchar(1000) DEFAULT NULL,
  `Hossz` int(11) DEFAULT NULL,
  `Evad` int(11) DEFAULT NULL,
  `Resz` int(11) DEFAULT NULL,
  `Tipus` varchar(20) NOT NULL,
  `plakatKep` blob NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla streamtrack. streamingplatform
CREATE TABLE IF NOT EXISTS `streamingplatform` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nev` varchar(100) NOT NULL,
  `LogoUrl` varchar(1000) NOT NULL,
  `filmId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `filmId` (`filmId`),
  CONSTRAINT `streamingplatform_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `film` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Az adatok exportálása nem lett kiválasztva.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
