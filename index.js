import mariadb from "mariadb";
import { readFileSync } from "fs";
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
			masukan: faker.lorem.sentence()
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
			kapasitas: faker.number.int({ min: 10, max: 500 }),
			tanggal: faker.date.anytime().toISOString().split('T')[0]
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
			nama_lengkap: fullname,
			alamat_jalan: faker.location.streetAddress(),
			alamat_kota: faker.location.city(),
			alamat_provinsi: faker.location.state(),
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
			harga: faker.number.int({ min: 10, max: 100 }) * 1000,
			kategori: faker.word.noun()
		}
	},
	transaksi: (id_pengunjung) => {
		return {
			id_pengunjung,
			tanggal: faker.date.anytime().toISOString().split('T')[0],
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

const objectToInsertQuery = (table, object) => {
	let attribute = [];
	let value = [];
	Object.entries(object).forEach(([k, v]) => {
		attribute.push(k)
		if (typeof v === "string") v = `"${v}"`
		value.push(v)
	})
	return `INSERT INTO ${table} (${attribute.join(",")}) VALUE (${value.join(",")});`
}

const pool = mariadb.createPool({
	user: "root",
	password: "root",
	multipleStatements: true,
});

const connection = await pool.getConnection();

const ddl = readFileSync("ddl.sql", "utf8");
await connection.query(ddl);
await connection.query("USE DuhFun");

let query = ""

// pengunjung
console.log("Started inserting pengunjung")
query = ""
for (let i = 0; i < 100; ++i) {
	query += objectToInsertQuery("pengunjung",
		generator.pengunjung())
}
const listIdPengunjung = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting pengunjung")

// nomor_telepon
console.log("Started inserting nomor_telepon_pengunjung")
query = ""
for (const idPengunjung of listIdPengunjung) {
	const count = faker.number.int({ min: 1, max: 5 })
	for (let i = 0; i < count; ++i)
		query +=
			objectToInsertQuery("nomor_telepon_pengunjung",
				generator.nomor_telepon_pengunjung(idPengunjung))
}
await connection.query(query)
console.log("Finished inserting nomor_telepon_pengunjung")

// masukan
console.log("Started inserting masukan")
query = ""
for (const idPengunjung of listIdPengunjung) {
	const count = faker.number.int({ min: 1, max: 3 })
	for (let i = 0; i < count; ++i)
		query += objectToInsertQuery("masukan",
			generator.masukan(idPengunjung))
}
await connection.query(query)
console.log("Finished inserting masukan")

// pengunjung fast track
console.log("Started inserting fast_track")
query = ""
for (const idPengunjung of listIdPengunjung) {
	if (!faker.datatype.boolean({ probability: 0.2 })) continue
	query += objectToInsertQuery("pengunjung_fast_track",
		generator.pengunjung_fast_track(idPengunjung))
}
await connection.query(query)
console.log("Finished inserting fast_track")

// wahana
console.log("Started inserting wahana")
query = ""
for (let i = 0; i < 20; ++i) {
	query += objectToInsertQuery("wahana",
		generator.wahana())
}
const listIdWahana = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting wahana")

// grup antrian
console.log("Started inserting grup_antrian")
query = ""
for (let i = 0; i < 10; ++i) {
	for (const idWahana of listIdWahana) {
		query += objectToInsertQuery("grup_antrian",
			generator.grup_antrian(idWahana))
	}
}
const listIdGrupAntrian = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting grup_antrian")

// antrian
console.log("Started inserting antrian")
query = ""
for (const idGrupAntrian of listIdGrupAntrian) {
	const count = faker.number.int({ min: 50, max: listIdPengunjung.length })
	const randomized = faker.helpers.shuffle(listIdPengunjung)

	for (let i = 0; i < count; ++i) {
		query += objectToInsertQuery("antrian",
			generator.antrian(idGrupAntrian, randomized[i], i + 1))
	}
}
await connection.query(query)
console.log("Finished inserting antrian")

// shift
console.log("Started inserting shift")
query = ""
for (let i = 0; i < 20; ++i) {
	query += objectToInsertQuery("shift",
		generator.shift())
}
const listIdShift = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting shift")

// pegawai
console.log("Started inserting pegawai")
query = ""
for (let i = 0; i < 20; ++i) {
	query += objectToInsertQuery("pegawai",
		generator.pegawai())
}
const listIdPegawai = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting pegawai")

// nomor_telepon_pegawai
console.log("Started inserting nomor_telepon_pegawai")
query = ""
for (const idPegawai of listIdPegawai) {
	const count = faker.number.int({ min: 1, max: 5 })
	for (let i = 0; i < count; ++i)
		query +=
			objectToInsertQuery("nomor_telepon_pegawai",
				generator.nomor_telepon_pegawai(idPegawai))
}
await connection.query(query)
console.log("Finished inserting nomor_telepon_pegawai")

// menjaga
console.log("Started inserting menjaga")
query = ""
for (const idShift of listIdShift) {
	if (listIdWahana.length > listIdPegawai)
		throw "Not enough employee for all rides"

	const randomized = faker.helpers.arrayElements(listIdPegawai, { min: listIdWahana.length })

	let i = 0;
	for (const idWahana of listIdWahana) {
		query += objectToInsertQuery("menjaga",
			generator.menjaga(idShift, randomized[i], idWahana))
		i += 1;
	}

	const randomizedRides = faker.helpers.shuffle(listIdWahana)
	let j = 0;
	while (i < randomized.length) {
		query += objectToInsertQuery("menjaga",
			generator.menjaga(idShift, randomized[i], randomizedRides[j]))
		++i;
		j = (j + 1) % randomizedRides.length;
	}
}
await connection.query(query)
console.log("Finished inserting menjaga")

// souvenir
console.log("Started inserting souvenir")
query = ""
for (let i = 0; i < 20; ++i) {
	query += objectToInsertQuery("souvenir",
		generator.souvenir())
}
const listIdSouvenir = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting souvenir")

// transaksi
console.log("Started inserting transaksi")
query = ""
for (const idPengunjung of listIdPengunjung) {
	const count = faker.number.int({ min: 0, max: 5 })
	for (let i = 0; i < count; ++i) {
		query += objectToInsertQuery("transaksi",
			generator.transaksi(idPengunjung))
	}
}
const listIdTransaksi = (await connection.query(query)).map(v => Number(v.insertId))
console.log("Finished inserting transaksi")

// list_barang
console.log("Started inserting list_barang")
query = ""
for (const idTransaksi of listIdTransaksi) {
	const count = faker.number.int({ min: 0, max: Math.min(5, listIdSouvenir.length) })
	const randomized = faker.helpers.shuffle(listIdSouvenir)
	for (let i = 0; i < count; ++i) {
		query += objectToInsertQuery("list_barang",
			generator.list_barang(idTransaksi, randomized[i]))
	}
}
await connection.query(query)
console.log("Finished inserting list_barang")

await connection.end();
await pool.end();
