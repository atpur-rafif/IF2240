DROP DATABASE IF EXISTS DuhFun;
CREATE DATABASE DuhFun;

USE DuhFun;
CREATE TABLE pengunjung (
	id_pengunjung VARCHAR(255),
	nama_lengkap VARCHAR(255),
	alamat_jalan VARCHAR(255),
	alamat_kota VARCHAR(255),
	alamat_provinsi VARCHAR(255),
	alamat_email VARCHAR(255),
	PRIMARY KEY (id_pengunjung)
);
