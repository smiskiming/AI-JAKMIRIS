-- ─────────────────────────────────────────────────────────────
-- JakMiris – Database setup
-- Run this once in phpMyAdmin or MySQL CLI:
--   SOURCE /Applications/MAMP/htdocs/AI JAKMIRIS/php/setup.sql;
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS jakmiris
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jakmiris;

CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120)   NOT NULL,
  email         VARCHAR(191)   NOT NULL,
  phone         VARCHAR(30)    DEFAULT NULL,
  password_hash VARCHAR(255)   NOT NULL,
  created_at    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
