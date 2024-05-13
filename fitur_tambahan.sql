CREATE TABLE loker (
	nomor_loker INT,
	ukuran ENUM("small", "medium", "large", "extra-large"),
	status ENUM("disewa", "bebas"),
	PRIMARY KEY(nomor_loker)
);

CREATE TABLE sewa_loker(
	nomor_loker INT,
	id_pengunjung INT,
	tanggal DATE,
	FOREIGN KEY(nomor_loker) REFERENCES loker(nomor_loker),
	FOREIGN KEY(id_pengunjung) REFERENCES pengunjung(id_pengunjung),
	PRIMARY KEY(nomor_loker, tanggal)
);
