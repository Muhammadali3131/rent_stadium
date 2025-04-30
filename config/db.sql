-- Active: 1745317106021@@127.0.0.1@3306@rent_stadium

CREATE DATABASE rent_stadium


use rent_stadium

SHOW TABLES

DROP TABLE users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer', 'admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);
CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `description` TEXT(255),
    `price` DECIMAL(15, 2) NOT NULL,
    `owner_id` INT NOT NULL
);
CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15, 2) NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);
CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

SHOW TABLES

SELECT * FROM users u
LEFT JOIN stadium s ON u.id = s.owner_id
LEFT JOIN images i ON s.id = i.stadion_id
WHERE first_name="Jobir" AND last_name="Sobirov"

SELECT * FROM booking b
LEFT JOIN stadium s ON b.stadion_id = s.id
LEFT JOIN users u ON b.user_id = u.id
WHERE b.booking_date BETWEEN "2020-01-01" AND "2020-06-01"

//------------------------------- Vazifa -------------------------------------------------

SELECT
      f.name AS field_name,
      CONCAT(u.first_name, ' ', u.last_name) AS owner_name
    FROM
      fields f
    LEFT JOIN
      users u ON u.id = f.owner_id
    WHERE
      f.id = ?


    f.name AS field_name,
    f.price_per_hour,
    b.booking_date,
    b.start_time,
    b.end_time,
    TIMESTAMPDIFF(
        SECOND,
        b.start_time,
        b.end_time
    ) / 3600 AS booking_duration
FROM booking b
    JOIN fields f ON b.stadion_id = f.id
WHERE
    f.price_per_hour BETWEEN 1 AND 300
    AND TIMESTAMPDIFF(
        SECOND,
        b.start_time,
        b.end_time
    ) / 3600 > 2
ORDER BY b.booking_date;

//---------------------------------------------------------------------------------------------------------------


SHOW TABLES;

DROP PROCEDURE IF EXISTS getAllUsers

CREATE PROCEDURE IF NOT EXISTS getAllUsers()
BEGIN
    SELECT * FROM users;
END

call getAllUsers()

CREATE PROCEDURE IF NOT EXISTS getUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END

call getUserById(1)

CREATE PROCEDURE IF NOT EXISTS getUserName(IN userId INT, OUT userName VARCHAR(50))
BEGIN
    SELECT first_name into userName FROM users WHERE id = userId;
END

call getUserName(1, @userName)

SELECT @userName

CREATE PROCEDURE IF NOT EXISTS res_out(INOUT res INT)
BEGIN
    SET res = res-10;
END

SET @res = 100

call res_out(@res)

SELECT @res

CREATE PROCEDURE IF NOT EXISTS inc_price(IN stadiumId INT, INOUT price DECIMAL(15,2))
BEGIN
    SET price = (SELECT price + newSum FROM stadium WHERE id = stadiumId);
END

SET @newSum = 100

call inc_price(1, @newSum)

SELECT @newSum

SHOW PROCEDURE STATUS WHERE db = "rent_stadium"

CREATE FUNCTION IF NOT EXISTS myFunc1() RETURNS INT DETERMINISTIC
BEGIN
    DECLARE sum INT DEFAULT 0;
    SELECT count(*) INTO sum FROM stadium;
    return sum;
END

SELECT `myFunc1`()