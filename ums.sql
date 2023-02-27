-- PostgreSQL Databse Document

-- Creating the database

CREATE DATABASE ums;

--Crating the underlying schema

CREATE SCHEMA ums;

--Creating enum gender

CREATE TYPE ums.gender AS ENUM (
    'Male',
    'Female',
    'Other'
);

--Creating enum isDeleted for soft delete

CREATE TYPE ums.isdeleted AS ENUM (
    '0',
    '1'
);

--Creating table users;

CREATE TABLE ums.users (u_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, f_name VARCHAR(20) NOT NULL, m_name VARCHAR(20) NOT NULL, l_name VARCHAR(20) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, contact VARCHAR(10) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, date_of_birth DATE NOT NULL, gender gender default 'Other' not null, Del isdeleted DEFAULT '0');

--Creating table states;

CREATE TABLE ums.states (
  state_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  state_name VARCHAR(50) NOT NULL
);

--Creating table cities which contains key of cities;

CREATE TABLE ums.cities (
  city_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city_name VARCHAR(50) NOT NULL,
  state_id INT NOT NULL,
  FOREIGN KEY (state_id) REFERENCES states(state_id)
);


--Creating table addresses which contains key of users & cities;

CREATE TABLE addresses (
  add_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  u_id INT NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255) NOT NULL,
  landmark VARCHAR(20) NOT NULL,
  zip_code VARCHAR(6) NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (u_id) REFERENCES users(u_id),
  FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

