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
	PRIMARY KEY(id_pengunjung)
);

CREATE TABLE nomor_telepon_pengunjung (
	id_pengunjung VARCHAR(255),
	nomor_telepon VARCHAR(64),
	PRIMARY KEY(id_pengunjung, nomor_telepon),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE masukan (
	id_masukan VARCHAR(255),
	id_pengunjung VARCHAR(255),
	nilai INT,
	PRIMARY KEY(id_masukan, id_pengunjung),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE pengunjung_fast_track (
	id_pengunjung VARCHAR(255),
	level_akses VARCHAR(255),
	PRIMARY KEY(id_pengunjung),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE wahana (
	id_wahana VARCHAR(255),
	nama_wahana VARCHAR(255),
	deskripsi_wahana VARCHAR(255),
	PRIMARY KEY(id_wahana)
);

CREATE TABLE grup_antrian (
	id_grup_antrian VARCHAR(255),
	id_wahana VARCHAR(255),
	kapasitas INT,
	PRIMARY KEY(id_grup_antrian),
	FOREIGN KEY(id_wahana) REFERENCES wahana(id_wahana)
);

CREATE TABLE antrian (
	id_grup_antrian VARCHAR(255),
	nomor_antrian VARCHAR(255),
	id_pengunjung VARCHAR(255),
	prediksi_waktu_tunggu INT,
	status_antrian VARCHAR(255),
	PRIMARY KEY(id_grup_antrian),
	FOREIGN KEY(id_grup_antrian) REFERENCES grup_antrian(id_grup_antrian),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE shift (
	id_shift VARCHAR(255),
	mulai TIME,
	selesai TIME,
	PRIMARY KEY(id_shift)
);

CREATE TABLE pegawai (
	id_pegawai VARCHAR(255),
	nik VARCHAR(255),
	alamat_jalan VARCHAR(255),
	alamat_kota VARCHAR(255),
	alamat_provinsi VARCHAR(255),
	PRIMARY KEY(id_pegawai)
);

CREATE TABLE nomor_telepon_pegawai (
	id_pegawai VARCHAR(255),
	nomor_telepon VARCHAR(255),
	PRIMARY KEY(id_pegawai, nomor_telepon),
	FOREIGN KEY(id_pegawai) REFERENCES pegawai(id_pegawai)
);

CREATE TABLE menjaga (
	id_shift VARCHAR(255),
	id_pegawai VARCHAR(255),
	id_wahana VARCHAR(255),
	PRIMARY KEY(id_shift, id_pegawai),
	FOREIGN KEY(id_shift) REFERENCES shift(id_shift),
	FOREIGN KEY(id_pegawai) REFERENCES pegawai(id_pegawai),
	FOREIGN KEY(id_wahana) REFERENCES wahana(id_wahana)
);

CREATE TABLE souvenir (
	id_souvenir VARCHAR(255),
	nama VARCHAR(255),
	harga INT,
	kategori VARCHAR(255),
	PRIMARY KEY(id_souvenir)
);

CREATE TABLE transaksi (
	id_transaksi VARCHAR(255),
	id_pengunjung VARCHAR(255),
	tanggal DATE,
	total INT,
	PRIMARY KEY(id_transaksi),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung)
);

CREATE TABLE list_barang (
	id_transaksi VARCHAR(255),
	id_souvenir VARCHAR(255),
	jumlah VARCHAR(255),
	PRIMARY KEY(id_transaksi, id_souvenir),
	FOREIGN KEY(id_souvenir) REFERENCES souvenir(id_souvenir),
	FOREIGN KEY(id_transaksi) REFERENCES transaksi(id_transaksi)
);
