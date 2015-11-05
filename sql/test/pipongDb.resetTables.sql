USE `pipong-test`;

-- MySQL dump 10.13  Distrib 5.5.38, for osx10.6 (i386)proot --no-data pipong
--
-- Host: localhost    Database: pipong
-- ------------------------------------------------------
-- Server version       5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

--
-- Table structure for table `agents`
--

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

--
-- Table structure for table `tables`
--

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

--
-- Table structure for table `games`
--

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

--
-- Table structure for table `locations`
--

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

--
-- Table structure for table `location_managers`
--

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

--
-- Table structure for table `player_tables`
--

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

--
-- Table structure for table `players`
--


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
ALTER TABLE `facebook_mapping`
ADD PRIMARY KEY (`facebook_id`, `player_id`);


