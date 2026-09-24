/* =========================================================
   DATA KOMPONEN
========================================================= */

const componentData = {

    pln: {
        name: "PLN",
        type: "Sumber Utama (Utility)",

        info: [
            ["⚡", "Jenis", "PLN / Utility"],
            ["⚡", "Fungsi", "Sumber listrik utama"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "Sumber eksternal"]
        ],

        description:
            "PLN merupakan sumber utama listrik yang memasok energi listrik ke sistem distribusi gedung."
    },


    genset: {
        name: "Genset",
        type: "Sumber Cadangan (Backup)",

        info: [
            ["⚙", "Jenis", "Generator Set"],
            ["⚡", "Fungsi", "Sumber listrik cadangan"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["●", "Status", "Standby"],
            ["⌂", "Lokasi", "Ruang Genset"]
        ],

        description:
            "Genset berfungsi sebagai sumber listrik cadangan ketika suplai PLN mengalami gangguan."
    },


    panel: {
        name: "Panel Input ATS",
        type: "Panel Masukan",

        info: [
            ["▣", "Jenis", "Panel Input"],
            ["⚡", "Fungsi", "Menerima sumber PLN & Genset"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "Panel Input"]
        ],

        description:
            "Panel Input ATS menjadi titik masuk dua sumber listrik sebelum diteruskan menuju ATS."
    },


    ats: {
        name: "ATS",
        type: "Automatic Transfer Switch",

        info: [
            ["▣", "Jenis", "Automatic Transfer Switch"],
            ["⚡", "Fungsi", "Transfer sumber otomatis"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "Panel ATS"]
        ],

        description:
            "ATS berfungsi memindahkan sumber listrik secara otomatis antara PLN dan Genset ketika terjadi gangguan pada salah satu sumber."
    },


    mccb: {
        name: "MCCB UTAMA",
        type: "Proteksi Utama (MCCB)",

        info: [
            ["▣", "Jenis", "MCCB"],
            ["⚡", "Fungsi", "Proteksi utama"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "Panel Distribusi Utama"]
        ],

        description:
            "MCCB utama digunakan sebagai pengaman dan pemutus utama sebelum daya listrik didistribusikan menuju seluruh feeder."
    },


    mcb: {
        name: "MCB KONTROL",
        type: "Proteksi Kontrol (MCB)",

        info: [
            ["▤", "Jenis", "MCB"],
            ["⚡", "Fungsi", "Proteksi rangkaian kontrol"],
            ["⚡", "Tegangan", "220 V"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "Panel Distribusi Utama"]
        ],

        description:
            "MCB kontrol digunakan untuk melindungi rangkaian kontrol dan peralatan pendukung pada panel distribusi."
    },


    neutral: {
        name: "N — Neutral Bar",
        type: "Neutral Bar",

        info: [
            ["N", "Jenis", "Neutral Bar"],
            ["⚡", "Fungsi", "Penghantar netral"],
            ["⚡", "Sistem", "3 Fasa + Neutral"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Lokasi", "MDB"]
        ],

        description:
            "Neutral bar merupakan titik penghimpunan dan distribusi penghantar netral pada panel distribusi utama."
    },


    pe: {
        name: "PE — Protective Earth",
        type: "Grounding / Protective Earth",

        info: [
            ["PE", "Jenis", "Protective Earth"],
            ["⚡", "Fungsi", "Pengaman grounding"],
            ["⚡", "Sistem", "Protective Earth"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Lokasi", "MDB"]
        ],

        description:
            "PE digunakan sebagai penghantar proteksi dan jalur grounding untuk keselamatan sistem kelistrikan."
    },


    busbar: {
        name: "BUSBAR 3 FASA",
        type: "Busbar Distribusi R-S-T",

        info: [
            ["R", "Fasa", "R"],
            ["S", "Fasa", "S"],
            ["T", "Fasa", "T"],
            ["⚡", "Fungsi", "Distribusi daya"],
            ["●", "Status", "Aktif"],
            ["⌂", "Lokasi", "MDB"]
        ],

        description:
            "Busbar 3 fasa merupakan penghantar utama yang membagi daya dari MCCB utama menuju masing-masing feeder."
    },


    feeder1: {
        name: "FEEDER 1",
        type: "Outgoing Feeder",

        info: [
            ["▤", "Proteksi", "MCCB / MCB"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["→", "Tujuan", "Beban 1"],
            ["●", "Status", "Aktif"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Feeder 1 merupakan jalur distribusi keluar dari MDB yang mengalirkan daya menuju Beban 1."
    },


    feeder2: {
        name: "FEEDER 2",
        type: "Outgoing Feeder",

        info: [
            ["▤", "Proteksi", "MCCB / MCB"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["→", "Tujuan", "Beban 2"],
            ["●", "Status", "Aktif"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Feeder 2 merupakan jalur distribusi keluar dari MDB yang mengalirkan daya menuju Beban 2."
    },


    feeder3: {
        name: "FEEDER 3",
        type: "Outgoing Feeder",

        info: [
            ["▤", "Proteksi", "MCCB / MCB"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["→", "Tujuan", "Beban 3"],
            ["●", "Status", "Aktif"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Feeder 3 merupakan jalur distribusi keluar dari MDB yang mengalirkan daya menuju Beban 3."
    },


    feeder4: {
        name: "FEEDER 4",
        type: "Outgoing Feeder",

        info: [
            ["▤", "Proteksi", "MCCB / MCB"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["→", "Tujuan", "Beban 4"],
            ["●", "Status", "Aktif"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Feeder 4 merupakan jalur distribusi keluar dari MDB yang mengalirkan daya menuju Beban 4."
    },


    feeder5: {
        name: "FEEDER 5",
        type: "Outgoing Feeder",

        info: [
            ["▤", "Proteksi", "MCCB / MCB"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["→", "Tujuan", "Beban 5"],
            ["●", "Status", "Aktif"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Feeder 5 merupakan jalur distribusi keluar dari MDB yang mengalirkan daya menuju Beban 5."
    },


    load1: {
        name: "BEBAN 1",
        type: "Outgoing Feeder",

        info: [
            ["▣", "Jenis", "Beban Listrik"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["←", "Feeder", "Feeder 1"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Beban 1 merupakan titik tujuan akhir dari jalur distribusi Feeder 1."
    },


    load2: {
        name: "BEBAN 2",
        type: "Outgoing Feeder",

        info: [
            ["▣", "Jenis", "Beban Listrik"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["←", "Feeder", "Feeder 2"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Beban 2 merupakan titik tujuan akhir dari jalur distribusi Feeder 2."
    },


    load3: {
        name: "BEBAN 3",
        type: "Outgoing Feeder",

        info: [
            ["▣", "Jenis", "Beban Listrik"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["←", "Feeder", "Feeder 3"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Beban 3 merupakan titik tujuan akhir dari jalur distribusi Feeder 3."
    },


    load4: {
        name: "BEBAN 4",
        type: "Outgoing Feeder",

        info: [
            ["▣", "Jenis", "Beban Listrik"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["←", "Feeder", "Feeder 4"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Beban 4 merupakan titik tujuan akhir dari jalur distribusi Feeder 4."
    },


    load5: {
        name: "BEBAN 5",
        type: "Outgoing Feeder",

        info: [
            ["▣", "Jenis", "Beban Listrik"],
            ["⚡", "Tegangan", "380 / 220 V"],
            ["←", "Feeder", "Feeder 5"],
            ["●", "Status", "Terhubung"],
            ["⌂", "Sumber", "MDB"]
        ],

        description:
            "Beban 5 merupakan titik tujuan akhir dari jalur distribusi Feeder 5."
    }

};


/* =========================================================
   ELEMENT HTML
========================================================= */

const detailName =
    document.getElementById("detailName");

const detailType =
    document.getElementById("detailType");

const detailInfo =
    document.getElementById("detailInfo");

const detailDescription =
    document.getElementById("detailDescription");


/* =========================================================
   TAMPILKAN DETAIL
========================================================= */

function showComponent(id) {

    const data = componentData[id];

    if (!data) return;


    /* Nama */

    detailName.textContent =
        data.name;


    /* Jenis */

    detailType.textContent =
        data.type;


    /* Informasi */

    detailInfo.innerHTML = "";


    data.info.forEach(row => {

        const div =
            document.createElement("div");

        div.className =
            "detail-row";


        div.innerHTML = `

            <span class="detail-row-icon">
                ${row[0]}
            </span>

            <span class="detail-row-key">
                ${row[1]}
            </span>

            <span class="detail-row-colon">
                :
            </span>

            <span class="detail-row-value">
                ${row[2]}
            </span>

        `;


        detailInfo.appendChild(div);

    });


    /* Deskripsi */

    detailDescription.textContent =
        data.description;


    /* Hilangkan selected */

    document
        .querySelectorAll(".component")
        .forEach(el => {

            el.classList.remove("selected");

        });


    /* Tandai komponen yang dipilih */

    document
        .querySelectorAll(
            `[data-component="${id}"]`
        )
        .forEach(el => {

            el.classList.add("selected");

        });

}


/* =========================================================
   CLICK SEMUA KOMPONEN
========================================================= */

document
    .querySelectorAll(".component")
    .forEach(component => {

        component.addEventListener(
            "click",
            function () {

                const id =
                    this.dataset.component;

                showComponent(id);

            }
        );

    });


/* =========================================================
   DEFAULT
========================================================= */

showComponent("mccb");
