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

SELECT * FROM users