-- MySQL dump 10.13  Distrib 5.5.38, for osx10.6 (i386)proot --no-data pipong
--
-- Host: localhost    Database: pipong
-- ------------------------------------------------------
-- Server version       5.5.38

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
CREATE TABLE IF NOT EXISTS `agents` (
  `id`                INT(10) UNSIGNED        NOT NULL AUTO_INCREMENT,
  `aud`               CHAR(32)
                      COLLATE utf8_unicode_ci NOT NULL
  COMMENT 'jwt client id',
  `secret`            CHAR(32)
                      COLLATE utf8_unicode_ci NOT NULL
  COMMENT 'jwt client secret',
  `name`              VARCHAR(30)
                      COLLATE utf8_unicode_ci NOT NULL,
  `status`            TINYINT(4)              NOT NULL DEFAULT '1'
  COMMENT '0:inactive, 1:active',
  `created_date`      DATE                    NOT NULL,
  `created_unix_time` INT(10) UNSIGNED        NOT NULL,
  `updated_date`      DATE                             DEFAULT NULL,
  `updated_unix_time` INT(10) UNSIGNED                 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aud` (`aud`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;


--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id`                      INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `table_id`                INT(10) UNSIGNED NOT NULL,
  `player_1_id`             INT(10) UNSIGNED NOT NULL,
  `player_1_offense_points` INT(10) UNSIGNED NOT NULL,
  `player_1_defense_points` INT(10) UNSIGNED NOT NULL,
  `player_1_final_status`   CHAR(1)
                            COLLATE utf8_unicode_ci   DEFAULT NULL
  COMMENT 'W,L,F (forfeit)',
  `player_2_id`             INT(10) UNSIGNED NOT NULL,
  `player_2_offense_points` INT(10) UNSIGNED NOT NULL,
  `player_2_defense_points` INT(10) UNSIGNED NOT NULL,
  `player_2_final_status`   CHAR(1)
                            COLLATE utf8_unicode_ci   DEFAULT NULL
  COMMENT 'W,L,F (forfeit)',
  `status`                  INT(10) UNSIGNED          DEFAULT NULL,
  `created_date`            DATE             NOT NULL,
  `created_unix_time`       INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id`                INT(10) UNSIGNED        NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(100)
                      COLLATE utf8_unicode_ci NOT NULL,
  `uri`               VARCHAR(255)
                      COLLATE utf8_unicode_ci NOT NULL,
  `created_date`      DATE                    NOT NULL,
  `created_unix_time` INT(10) UNSIGNED        NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_managers`
--

DROP TABLE IF EXISTS `location_managers`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_managers` (
  `player_id`         INT(10) UNSIGNED NOT NULL,
  `location_id`       INT(10) UNSIGNED NOT NULL,
  `created_date`      DATE             NOT NULL,
  `created_unix_time` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY `location_manager` (`player_id`, `location_id`),
  FOREIGN KEY (`player_id`) REFERENCES `players` (`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `player_tables`
--

DROP TABLE IF EXISTS `player_tables`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_tables` (
  `player_id`         INT(10) UNSIGNED    NOT NULL,
  `table_id`          INT(10) UNSIGNED    NOT NULL,
  `status`            TINYINT(3) UNSIGNED NOT NULL,
  `created_date`      DATE                NOT NULL,
  `created_unix_time` INT(10) UNSIGNED    NOT NULL,
  PRIMARY KEY (`player_id`, `table_id`),
  FOREIGN KEY (`player_id`) REFERENCES `players` (`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `id`                INT(10) UNSIGNED        NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(30)
                      COLLATE utf8_unicode_ci NOT NULL,
  `username`          VARCHAR(60)
                      COLLATE utf8_unicode_ci NOT NULL,
  `avatar_1`          VARCHAR(15)
                      COLLATE utf8_unicode_ci NOT NULL,
  `avatar_2`          VARCHAR(15)
                      COLLATE utf8_unicode_ci NOT NULL,
  `email`             VARCHAR(255)
                      COLLATE utf8_unicode_ci NOT NULL,
  `password`          VARCHAR(60)
                      COLLATE utf8_unicode_ci NOT NULL,
  `wins`              INT(10) UNSIGNED        NOT NULL,
  `losses`            INT(10) UNSIGNED        NOT NULL,
  `created_date`      DATE                    NOT NULL,
  `created_unix_time` INT(10) UNSIGNED        NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `facebook_mapping`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facebook_mapping` (
  `facebook_id` VARCHAR(20)
                COLLATE utf8_unicode_ci NOT NULL,
  `player_id`   INT(10) UNSIGNED        NOT NULL,

  FOREIGN KEY (`player_id`) REFERENCES `players` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `facebook_mapping`
ADD PRIMARY KEY (`facebook_id`, `player_id`);

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tables` (
  `id`                INT(10) UNSIGNED        NOT NULL AUTO_INCREMENT,
  `agent_id`          INT(10) UNSIGNED        NOT NULL,
  `location_id`       INT(10) UNSIGNED        NOT NULL,
  `short_code`        CHAR(6)
                      COLLATE utf8_unicode_ci NOT NULL,
  `created_date`      DATE                    NOT NULL,
  `created_unix_time` INT(10) UNSIGNED        NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`)
    ON DELETE CASCADE

)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2015-09-29 17:18:45
