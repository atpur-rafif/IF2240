DROP DATABASE IF EXISTS DuhFun;
CREATE DATABASE DuhFun;
USE DuhFun;

CREATE TABLE pengunjung (
	id_pengunjung INT AUTO_INCREMENT,
	nama_lengkap VARCHAR(255),
	alamat_jalan VARCHAR(255),
	alamat_kota VARCHAR(255),
	alamat_provinsi VARCHAR(255),
	alamat_email VARCHAR(255),
	PRIMARY KEY(id_pengunjung)
);

CREATE TABLE nomor_telepon_pengunjung (
	id_pengunjung INT,
	nomor_telepon VARCHAR(64),
	PRIMARY KEY(id_pengunjung, nomor_telepon),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE masukan (
	id_masukan INT AUTO_INCREMENT,
	id_pengunjung INT,
	nilai INT,
	masukan VARCHAR(1023),
	PRIMARY KEY(id_masukan, id_pengunjung),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE pengunjung_fast_track (
	id_pengunjung INT,
	level_akses VARCHAR(255),
	PRIMARY KEY(id_pengunjung),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE wahana (
	id_wahana INT AUTO_INCREMENT,
	nama_wahana VARCHAR(255),
	deskripsi_wahana VARCHAR(255),
	PRIMARY KEY(id_wahana)
);

CREATE TABLE grup_antrian (
	id_grup_antrian INT AUTO_INCREMENT,
	id_wahana INT,
	kapasitas INT,
	tanggal DATETIME,
	PRIMARY KEY(id_grup_antrian),
	FOREIGN KEY(id_wahana) REFERENCES wahana(id_wahana)
);

CREATE TABLE antrian (
	id_grup_antrian INT,
	nomor_antrian INT,
	id_pengunjung INT,
	prediksi_waktu_tunggu INT,
	status_antrian VARCHAR(255),
	PRIMARY KEY(id_grup_antrian, nomor_antrian),
	FOREIGN KEY(id_grup_antrian) REFERENCES grup_antrian(id_grup_antrian),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE shift (
	id_shift INT AUTO_INCREMENT,
	mulai TIME,
	selesai TIME,
	PRIMARY KEY(id_shift)
);

CREATE TABLE pegawai (
	id_pegawai INT AUTO_INCREMENT,
	nik VARCHAR(255),
	nama_lengkap VARCHAR(255),
	alamat_jalan VARCHAR(255),
	alamat_kota VARCHAR(255),
	alamat_provinsi VARCHAR(255),
	PRIMARY KEY(id_pegawai)
);

CREATE TABLE nomor_telepon_pegawai (
	id_pegawai INT AUTO_INCREMENT,
	nomor_telepon VARCHAR(255),
	PRIMARY KEY(id_pegawai, nomor_telepon),
	FOREIGN KEY(id_pegawai) REFERENCES pegawai(id_pegawai)
);

CREATE TABLE menjaga (
	id_shift INT,
	id_pegawai INT,
	id_wahana INT,
	PRIMARY KEY(id_shift, id_pegawai),
	FOREIGN KEY(id_shift) REFERENCES shift(id_shift),
	FOREIGN KEY(id_pegawai) REFERENCES pegawai(id_pegawai),
	FOREIGN KEY(id_wahana) REFERENCES wahana(id_wahana)
);

CREATE TABLE souvenir (
	id_souvenir INT AUTO_INCREMENT,
	nama VARCHAR(255),
	harga INT,
	kategori VARCHAR(255),
	PRIMARY KEY(id_souvenir)
);

CREATE TABLE transaksi (
	id_transaksi INT AUTO_INCREMENT,
	id_pengunjung INT,
	tanggal DATE,
	total INT,
	PRIMARY KEY(id_transaksi),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE list_barang (
	id_transaksi INT,
	id_souvenir INT,
	jumlah VARCHAR(255),
	PRIMARY KEY(id_transaksi, id_souvenir),
	FOREIGN KEY(id_souvenir) REFERENCES souvenir(id_souvenir),
	FOREIGN KEY(id_transaksi) REFERENCES transaksi(id_transaksi)
);
