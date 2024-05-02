import { fakerID_ID as faker } from "@faker-js/faker"

const generator = {
	pengunjung: () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const fullname = faker.person.fullName({ firstName, lastName })
		return {
			nama_lengkap: fullname,
			alamat_jalan: faker.location.streetAddress(),
			alamat_kota: faker.location.city(),
			alamat_provinsi: faker.location.state(),
			alamat_email: faker.internet.email({ firstName, lastName })
		}
	},
	nomor_telepon_pengunjung: (id_pengunjung) => {
		return {
			id_pengunjung,
			nomor_telepon: faker.phone.number()
		}
	},
	masukan: (id_pengunjung) => {
		return {
			id_pengunjung,
			nilai: faker.number.int({ min: 0, max: 5 }),
			rating: faker.lorem.sentence()
		}
	},
	pengunjung_fast_track: (id_pengunjung) => {
		return {
			id_pengunjung,
			level_akses: faker.helpers.arrayElement(["silver", "gold", "platinum"])
		}
	},
	wahana: () => {
		return {
			nama_wahana: faker.word.noun(),
			deskripsi_wahana: faker.lorem.sentence()
		}
	},
	grup_antrian: (id_wahana) => {
		return {
			id_wahana,
			kapasitas: faker.number.int({ min: 10, max: 500 })
		}
	},
	antrian: (id_grup_antrian, id_pengunjung, nomor_antrian) => {
		return {
			id_grup_antrian, id_pengunjung, nomor_antrian,
			prediksi_waktu_tunggu: faker.number.int({ min: 10, max: 100 })
		}
	},
	shift: () => {
		const start = faker.date.anytime().getHours()
		return {
			mulai: start,
			selesai: start + 2
		}
	},
	pegawai: () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const fullname = faker.person.fullName({ firstName, lastName })
		return {
			nik: faker.string.uuid(),
			nama: fullname,
			alamat_jalan: faker.location.streetAddress(),
			alamat_kota: faker.location.city(),
			alamat_provinsi: faker.location.state(),
			alamat_email: faker.internet.email({ firstName, lastName })
		}
	},
	nomor_telepon_pegawai: (id_pegawai) => {
		return {
			id_pegawai,
			nomor_telepon: faker.phone.number()
		}
	},
	menjaga: (id_shift, id_pegawai, id_wahana) => {
		return {
			id_shift, id_pegawai, id_wahana
		}
	},
	souvenir: () => {
		return {
			nama: faker.word.noun(),
			harga: faker.number.int({ min: 10, max: 100 }) * 1000
		}
	},
	transaksi: (id_pengunjung) => {
		return {
			id_pengunjung,
			tanggal: faker.date.anytime(),
			total: faker.number.int({ min: 10, max: 1000 }) * 1000
		}
	},
	list_barang: (id_transaksi, id_souvenir) => {
		return {
			id_souvenir, id_transaksi,
			jumlah: faker.number.int({ min: 1, max: 10 })
		}
	}
}

console.log(
	[
		generator.pengunjung(),
		generator.nomor_telepon_pengunjung(1),
		generator.masukan(1),
		generator.pengunjung_fast_track(1),
		generator.wahana(),
		generator.grup_antrian(1),
		generator.antrian(1, 1, 1),
		generator.shift(),
		generator.pegawai(),
		generator.nomor_telepon_pegawai(1),
		generator.menjaga(1, 1, 1),
		generator.souvenir(),
		generator.transaksi(1),
		generator.list_barang(1, 1)
	]
)

/*
import mariadb from "mariadb";
import { readFileSync } from "fs";

const pool = mariadb.createPool({
	user: "root",
	password: "root",
	multipleStatements: true,
});

const conn = await pool.getConnection();

const ddl = readFileSync("ddl.sql", "utf8");
const ddlResult = await conn.query(ddl);
console.log(ddlResult);

conn.end();
pool.end();
*/
