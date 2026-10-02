/* ================= DATA (ubah di sini) ================= */
const FOTO_AMF = ['img/amf-depan.jpg', 'img/amf-controller.jpg', 'img/amf-belakang.jpg'];

// Feeder MDB. Feeder 6 = panel turunan (drill:'sub')
const feeders = [
    // Foto MDB: 5 MCCB EZC100N 40A + 1 MCCB lebih kecil di kanan (label tulisan tangan "RUANG ...").
    // Nama beban selain Feeder 1 dan 6 belum terbaca -> isi sendiri.
    { id: 'f1', name: 'Feeder 1', mcb: 'MCCB 3P 40A', load: 'Ruang Genset' },
    { id: 'f2', name: 'Feeder 2', mcb: 'MCCB 3P 40A', load: 'Beban 2' },
    { id: 'f3', name: 'Feeder 3', mcb: 'MCCB 3P 40A', load: 'Beban 3' },
    { id: 'f4', name: 'Feeder 4', mcb: 'MCCB 3P 40A', load: 'Beban 4' },
    { id: 'f5', name: 'Feeder 5', mcb: 'MCCB 3P 40A', load: 'Beban 5', noLine: true },
    { id: 'f6', name: 'Feeder 6', mcb: 'MCCB 3P 25A', load: 'Panel Ruang Peralatan & Teknisi', drill: 'sub' },
];

// 8 MCB di panel turunan, urut kiri ke kanan.
// f = fasa: 'r' / 's' / 't'  -> SEMENTARA (tebakan bergantian), cek di lapangan.
const subMcbs = [
    { brand: 'Broco', rate: 'C2', f: 'r', load: 'Beban MCB 1' },
    { brand: 'Broco', rate: 'C10', f: 's', load: 'Beban MCB 2' },
    { brand: 'Schneider', rate: 'C10', f: 't', load: 'Beban MCB 3' },
    { brand: 'Merlin Gerin', rate: 'C25', f: 'r', load: 'Beban MCB 4' },
    { brand: 'Schneider', rate: 'C16', f: 's', load: 'Beban MCB 5' },
    { brand: 'Schneider', rate: 'C25', f: 't', load: 'Beban MCB 6' },
    { brand: 'Multi9 NC45a', rate: 'C6', f: 'r', load: 'Beban MCB 7' },
    { brand: 'Schneider', rate: 'C25', f: 's', load: 'Beban MCB 8' },
];

const SPACING = 16; // jarak antar 3 kabel fasa (px)

const INFO = {
    amf: {
        judul: 'Panel Kontrol AMF / ATS',
        spek: [
            ['Controller', 'PLC / smart relay SR2 B201BD, 24 VDC (12 input, 8 output relay). Di foto tampak berlogo Shukaku, bukan ComAp'],
            ['Relay output', 'Telemecanique 24 VDC, berlabel R1-R9'],
            ['Relay 230 VAC', 'Telemecanique, berlabel RA, RB, KA, KB'],
            ['Sensing', 'MCB C6 berlabel PLN R/S/T dan LOAD R/S/T'],
            ['Catu daya', 'Trafo + papan penyearah, dan power supply switching'],
            ['Proteksi surja', 'SPD 3P + N-PE dengan MCB 3P'],
            ['ATS', '2 MCCB 4P bermotor Schneider Compact NS dengan tombol Switch OFF/ON'],
            ['Pengawatan', 'Kawat bertanda kuning-biru, flexible duct hitam, rel DIN dan wiring duct abu-abu'],
        ],
        catatan: 'Dibaca dari foto. Controller diganti dari ComAp InteliLite menjadi PLC SR2 B201BD. Kalau ComAp memang ada, kembalikan baris Controller.',
        foto: [],
    },
    sub: {
        judul: 'Panel Ruang Peralatan & Teknisi',
        spek: [
            ['Suplai', 'MDB Feeder 6'],
            ['Proteksi utama', 'MCCB EasyPact EZC100 25A 3P'],
            ['MCB', '8 buah 1P berderet: 2 Broco (C2, C10), 4 Schneider Domae (C10, C16, C25, C25), 1 Merlin Gerin C25, 1 Multi9 NC45a C6'],
            ['Pintu', '3 lampu indikator + 1 selector switch'],
            ['Sambungan MCCB ke MCB', 'Kabel hitam dilakban menuju terminal atas MCB (tidak ada busbar)'],
            ['Keluaran', 'Terminal block sekitar 11 jalur, dua baris, dengan jumper kabel merah; kabel biru (netral) ke bawah'],
        ],
        catatan: 'Dibaca dari foto. Fasa tiap MCB tidak ditampilkan karena tidak terlihat di foto. Nama beban masih sementara, sesuaikan di script.js (subMcbs).',
        foto: ['img/panel-pintu.jpg', 'img/panel-mccb.jpg', 'img/panel-mcb.jpg'],
    },
    mccb: {
        judul: 'MCCB Utama Panel Turunan',
        spek: [
            ['Merek / seri', 'Merlin Gerin EasyPact EZC100'],
            ['Arus / kutub', '25 A, 3 kutub'],
            ['Standar', 'IEC 60947-2, Ui 690 V'],
            ['Icu / Ics 220-240 V', '25 / 13 kA'],
            ['Icu / Ics 380 V', '18 / 9 kA'],
            ['Icu / Ics 400-415 V', '15 / 8 kA'],
        ],
        catatan: 'Sebagian tulisan seri tertutup handle. Mohon cek langsung.',
        foto: ['img/panel-mccb-dekat.jpg', 'img/panel-mccb.jpg'],
    },
};

/* ===== TAMBAHAN: info komponen dari foto panel (tanpa foto) ===== */
const I = (judul, spek, catatan) => ({
    judul, spek, foto: [],
    catatan: catatan || 'Dibaca dari foto panel. Mohon cek di lapangan.',
});

Object.assign(INFO, {
    // ----- Panel Input / kWh meter -----
    input: I('Panel Input / kWh Meter', [
        ['Enclosure', 'Box besi abu-abu, ada louver ventilasi di sisi dan bercak karat di dinding dan pintu'],
        ['kWh meter', 'Analog (piringan), merek FOD, tipe FF25H (terbaca samar), penutup transparan'],
        ['Data meter', '3x230/400 V, 15 A, 50 Hz, kelas 1.0, buatan 2009'],
        ['No. seri', '902033316 (terbaca samar)'],
        ['Pembacaan', '18246.0 kWh (saat foto diambil)'],
        ['Proteksi', 'MCCB Merlin Gerin Compact NS (terbaca NS160 N), 3P, trip unit TM 125 D (thermal-magnetic, sekitar 125 A), ada tombol setelan arus biru'],
        ['CT', '3 buah biru tipe jendela (kabel tembus), tiap CT bersegel, rasio tidak terbaca'],
        ['Kabel daya', 'Kabel hitam besar berselubung merah (R), kuning (S), hitam (T)'],
        ['Terminal', 'Terminal block 4 jalur (R, S, T, N), kabel ukur ke terminal kWh meter'],
        ['Keluaran', 'Kabel kuning dan hijau-kuning (PE) turun ke panel berikutnya'],
    ], 'Dibaca dari foto. Banyak sarang laba-laba dan karat, kabel bawah menumpuk. Mohon cek rasio CT dan rating MCCB (sebelumnya terbaca NS100).'),
    // ----- MDB -----
    mdbmccb: I('MCCB Utama MDB', [
        ['Merek / seri', 'Merlin Gerin EasyPact EZC250N'],
        ['Arus / kutub', '250 A, 3P'],
        ['Kabel masuk', 'Kabel besar berselubung merah (R), kuning (S), hitam (T)'],
        ['Pembumian', 'Kabel PE hijau-kuning besar di sisi kiri panel; kabel hitam besar di sebelahnya (dugaan netral)'],
        ['Keluaran', 'Turun ke busbar R (merah), S (kuning), T (hitam)'],
    ]),
    mdbmcb: I('MCB Kontrol MDB', [
        ['Merek / seri', 'Merlin Gerin Multi9 NC45a'],
        ['Jumlah', '3 unit 1P (R, S, T), rating terbaca samar (kemungkinan C6)'],
        ['Pemasangan', 'Berdampingan, dijumper di terminal atas, dipasang di samping MCCB utama'],
        ['Fungsi', 'Dugaan: suplai tegangan ke alat ukur dan lampu indikator di pintu'],
    ]),
    mdbbus: I('Busbar MDB', [
        ['Busbar', 'R (oranye-merah), S (kuning), T (hitam), N (biru tua)'],
        ['Bar tembaga kiri', 'Dua bar tembaga berinsulator merah di sisi kiri (N dan PE)'],
        ['CT', '3 buah kotak hitam tipe busbar dengan cover transparan, satu per fasa'],
        ['Feeder', 'Tiap feeder disambung dari busbar lewat kabel hitam kecil berjumper ke MCCB'],
    ], 'Dibaca dari foto. Ada bercak karat/korosi di area bawah dekat MCCB feeder.'),
    mdbukur: I('Alat Ukur & Indikator Pintu MDB', [
        ['Ampere meter', '3 buah analog panel (casing putih, bodi belakang hitam, terminal di belakang), untuk fasa R, S, T; dipasang bersama CT'],
        ['Lampu indikator', '3 pilot lamp LED modular (hijau, oranye, merah), terminal X1/X2; ketiganya menyala saat foto'],
        ['Selector switch', '2 cam switch putar biru, tertulis SA16 (terbaca samar); satu unit tampak 4 kontak'],
        ['Pengawatan pintu', 'Kabel hitam dirapikan dengan kabel tie, disambung ke CT, MCB kontrol, dan selector'],
        ['Enclosure', 'Stiker "Wall Mounting Enclosure", tanda CE'],
        ['Tanda', 'Stiker hijau bernomor 21 pada salah satu ampere meter'],
    ], 'Fungsi tiap selector dan arti warna lampu belum dipastikan.'),
    mdbn: I('Netral (N)', [
        ['Bar', 'Bar tembaga di sisi kiri MDB, berinsulator merah'],
        ['Kabel', 'Kabel hitam besar dari sisi kiri (dugaan netral)'],
    ]),
    mdbpe: I('Grounding (PE)', [
        ['Bar', 'Bar tembaga di sisi kiri MDB'],
        ['Kabel', 'Kabel hijau-kuning besar dari atas'],
        ['Ke tanah', 'Kabel tembaga anyam (braided) di kanan bawah menuju pembumian'],
    ]),
    mdbfeed: I('Feeder MDB (MCCB)', [
        ['Merek / seri', 'Merlin Gerin EasyPact EZC100N'],
        ['Rating', '40 A, 3P (5 unit pertama); unit paling kanan lebih kecil'],
        ['Pemasangan', 'Dipasang berderet di papan kayu penyangga'],
        ['Label', 'Tulisan tangan "RUANG ..." di papan kayu (sebagian terbaca: RUANG GENSET, RUANG TEKNISI)'],
        ['Kabel keluar', 'Kuning, hitam, hijau-kuning (PE) dan biru (N) menuju beban'],
    ], 'Rating dan nama beban tiap feeder perlu dicek satu per satu di lapangan.'),

    // ----- Isi panel ATS / AMF -----
    mccbm: I('MCCB ATS (bermotor)', [
        ['Merek / seri', 'Schneider Compact NS dengan modul motor'],
        ['Jumlah', '2: satu sisi PLN, satu sisi genset (dugaan)'],
        ['Kutub', '4P (N, R, S, T): kedua unit memiliki 4 kaki busbar'],
        ['Modul motor', 'Tombol merah "Switch OFF" dan hitam "Switch ON"'],
        ['Kabel kontrol', 'Kabel putih/kecil ke modul motor lewat flexible duct hitam'],
    ]),
    atsbus: I('Busbar ATS', [
        ['Busbar horizontal', '4 lajur: R (merah), S (kuning), T (hitam), N (biru tua)'],
        ['Jalur vertikal', 'Tiga kelompok: ke MCCB kiri, ke terminal keluaran (tengah), ke MCCB kanan'],
        ['Isolasi', 'Busbar berwarna per fasa, ujung bersleeve merah'],
        ['Tambahan', 'Beberapa CT/sensor abu-abu dan modul DIN abu-abu di dekat kabel bawah'],
    ], 'Dibaca dari foto. Banyak kabel kecil dan flexible duct berantakan di bagian bawah.'),
    sens: I('MCB Sensing', [
        ['Merek / tipe', 'Merlin Gerin C6, 1P, 230 V~, 4500 A, IEC 898'],
        ['Label', 'PLN R, PLN S, PLN T (3 unit) dan LOAD R, LOAD S, LOAD T (3 unit), tulisan tangan'],
        ['MCB tambahan', 'Shukaku SKU-899 C2, 230/400 V~ 50 Hz, 4500 A, IEC 60898, buatan China; tuas 0-OFF'],
        ['Kode produksi', 'N0907 tercetak di bodi MCB'],
        ['Penomoran kawat', 'Atas: 1, 3, 5 dan 11, 12, 13; bawah: 2, 4, 6 dan 0.1, 0.2, 0.3'],
        ['Fungsi', 'Dugaan: proteksi saluran sensing tegangan PLN dan beban'],
    ]),
    r230: I('Relay 230 VAC', [
        ['Merek', 'Telemecanique (Schneider), relay interface dengan lampu/tuas uji merah'],
        ['Tegangan kumparan', '230 V 50/60 Hz'],
        ['Kontak', 'Soket IEC/NEMA 4 kontak (terminal 11-14, 21-24, 31-34, 41-44); kumparan A1/A2'],
        ['Jumlah / label', '4 unit: RA, RB, KA, KB (tulisan tangan)'],
    ], 'Fungsi tiap relay belum dipastikan. Isi setelah dicek di wiring.'),
    psu: I('Catu Daya', [
        ['Trafo', 'Trafo besar dengan papan penyearah (PCB kuning, resistor dan heatsink)'],
        ['Terminal trafo', 'Terminal block 6 jalur dengan penanda kawat 1, 8, 0, 2'],
        ['Power supply', 'Switching, casing logam berlubang, ada terminal kuning; dugaan keluaran 24 VDC'],
    ]),
    plc: I('PLC SR2 B201BD', [
        ['Tipe', 'Smart relay Zelio Logic SR2 B201BD (tertera di bodi); di bodi juga tampak logo Shukaku'],
        ['Catu', '24 VDC (terminal +/- di bagian atas)'],
        ['Input', '12: I1-I6 dan IB-IG (IB-IG bisa analog atau 24 VDC)'],
        ['Output', '8 relay: O1-O8'],
        ['Layar / tombol', 'LCD dengan tombol Menu/Ok dan tombol navigasi'],
        ['Pengawatan', 'Kawat bertanda kuning-biru'],
    ]),
    r24: I('Relay 24 VDC', [
        ['Merek', 'Telemecanique (Schneider), relay interface dengan tuas uji'],
        ['Tegangan kumparan', '24 VDC'],
        ['Kontak', 'Soket IEC/NEMA 4 kontak per relay'],
        ['Jumlah / label', '10 unit di rel, label tulisan tangan R1-R9 (sebagian samar)'],
        ['Pengawatan', 'Kawat bertanda kuning-biru, terhubung ke output PLC'],
        ['Fungsi', 'Dugaan: dikendalikan output PLC untuk transfer ATS dan start/stop genset'],
    ]),
    spd: I('SPD (Surge Protective Device)', [
        ['Susunan', '3 modul fasa oranye + 1 modul N-PE biru, dipasang rel DIN'],
        ['Tegangan kerja (Uc)', 'Sekitar 280 V (terbaca samar)'],
        ['Arus', 'Sekitar 10 kA (In) dan 100 kA (maks), Up < 2 kV (terbaca samar, cek)'],
        ['Art. no.', '5097 05x pada modul fasa (angka terakhir samar); modul N-PE bernomor lain'],
        ['Indikator', 'LED hijau status (normal) dengan penanda "defekt" untuk rusak; ada terminal sinyal L/N di bawah'],
        ['Pendamping', 'MCB 3P putih di sebelah kiri SPD, kabel PE hijau-kuning ke bawah'],
    ]),
});


// ----- Panel turunan (Ruang Peralatan & Teknisi): detail 8 MCB dari foto -----
Object.assign(INFO, {
    subkabel: I('Sambungan MCCB ke MCB', [
        ['Bentuk', 'Kabel hitam dikelompokkan dan dilakban hitam, keluar dari 3 terminal bawah MCCB'],
        ['Tujuan', 'Terminal atas 8 MCB 1P, disambung dengan jumper kabel'],
        ['Kabel lain', 'Kabel coklat/pink dan hitam melintas di sisi kanan; kabel biru tampak ke terminal atas MCB Broco'],
        ['Busbar', 'Tidak ada busbar pada panel ini'],
    ], 'Dibaca dari foto. Kabel biru biasanya netral, tapi tampak di sisi atas MCB Broco. Mohon cek di lapangan.'),
});
[
    ['Broco C2', ['Merek / tipe', 'Broco C2, 1P'], '230 V~, 4500 A, IEC 60898, SNI, kode LMK 17302C', 'Merah'],
    ['Broco C10', ['Merek / tipe', 'Broco C10, 1P'], '230 V~, 4500 A, IEC 60898, SNI, kode LMK 17310C', 'Merah'],
    ['Schneider Domae C10', ['Merek / tipe', 'Schneider Electric Domae C10, 1P'], '230 V~, 4500 A, kelas 3, kode 11341SNI', 'Oranye'],
    ['Merlin Gerin C25', ['Merek / tipe', 'Merlin Gerin C25 (seri Domae DOM11344SNI), 1P'], '230 V~, 4500 A, IEC 898, kode produksi N0751', 'Oranye'],
    ['Schneider Domae C16', ['Merek / tipe', 'Schneider Electric Domae C16, 1P'], '230 V~, 4500 A, kelas 3, kode 11342SNI', 'Oranye'],
    ['Schneider Domae C25', ['Merek / tipe', 'Schneider Electric Domae C25, 1P'], '230 V~, 4500 A, kelas 3, kode 11344SNI', 'Oranye'],
    ['Multi9 NC45a C6', ['Merek / tipe', 'Merlin Gerin Multi9 NC45a C6, 1P'], '230/400 V~, 4500 A (kelas 3), 12000 tertera di bodi, SNI, tertulis SPLN 108 dan IEC 898 (terbaca samar)', 'Hitam, bertanda I-ON'],
    ['Schneider Domae C25', ['Merek / tipe', 'Schneider Electric Domae C25, 1P'], '230 V~, 4500 A, kelas 3, kode 1134xSNI (terbaca samar)', 'Oranye'],
].forEach((d, i) => {
    INFO['sm' + (i + 1)] = I('MCB ' + (i + 1) + ' · ' + d[0], [
        d[1],
        ['Posisi', 'Urutan ke-' + (i + 1) + ' dari kiri'],
        ['Data tertera', d[2]],
        ['Tuas', d[3]],
    ]);
});

/* ================= BUILD LEVEL ================= */
function buildMain() {
    const nodes = {
        pln: { t: 'PLN', s: '380 V · 3 fasa', c: 'src on' },
        gen: { t: 'Genset', s: 'Standby', c: 'src' },
        input: { t: 'Panel Input', s: 'kWh meter · 3 CT · MCCB', info: 'input' },
        ats: { t: 'ATS', s: 'Transfer otomatis', drill: 'ats' },
        amf: { t: 'Panel Kontrol AMF', s: 'PLC SR2 B201BD', c: 'ctl', info: 'amf' },
        mdb: { t: 'MDB', s: feeders.length + ' feeder', c: 'mdb', drill: 'mdb' },
    };
    const E = [
        { from: 'pln', to: 'input', type: 'power' },
        { from: 'gen', to: 'input', type: 'power', standby: true },
        { from: 'input', to: 'ats', type: 'power' },
        { from: 'ats', to: 'mdb', type: 'power' },
        { from: 'amf', to: 'ats', type: 'control', label: 'Perintah transfer' },
        { from: 'amf', to: 'gen', type: 'control', label: 'Start / Stop', sdx: 15, off: 14 },
        { from: 'pln', to: 'amf', type: 'control', label: 'Sensing tegangan PLN', sdx: -25, edx: -15, off: 40 },
    ];
    const loadIds = feeders.map(f => {
        const id = 'ld_' + f.id;
        nodes[id] = { t: f.load, s: 'dari ' + f.name, c: 'sm', drill: f.drill };
        if (!f.noLine) E.push({ from: 'mdb', to: id, type: 'power' });
        return id;
    });
    return { nodes, E, rows: [['pln', 'gen'], ['input'], ['ats', 'amf'], ['mdb'], loadIds] };
}

function buildMDB() {
    const nodes = {
        src: { t: 'Dari ATS', s: 'Sumber: MDB', c: 'sm' },
        mccb: { t: 'MCCB Utama', s: '3P', info: 'mdbmccb' },
        mcb: { t: 'MCB Kontrol', s: 'Sumber: MDB', c: 'sm', info: 'mdbmcb' },
        bus: { t: 'Busbar R-S-T', s: 'Rel tembaga R · S · T', c: 'busb', info: 'mdbbus' },
        n: { t: 'Neutral (N)', s: '', c: 'bar', info: 'mdbn' },
        ukur: { t: 'Alat Ukur Pintu', s: '3 ampere meter · 3 lampu · 2 selector', c: 'ctl', info: 'mdbukur' },
        ct: { t: 'CT 3 buah', s: 'Satu per fasa di busbar', c: 'ctl', info: 'mdbbus' },
        pe: { t: 'Grounding (PE)', s: '', c: 'bar', info: 'mdbpe' },
    };
    const E = [
        { from: 'src', to: 'mccb', type: 'power' },
        { from: 'mccb', to: 'mcb', type: 'power' },
        { from: 'mcb', to: 'ukur', type: 'control' },
        { from: 'ct', to: 'ukur', type: 'control' },
    ];
    E.push({ from: 'mccb', to: 'bus', type: 'power' });
    const fIds = feeders.map(f => {
        nodes[f.id] = { t: f.name, s: f.mcb + ' → ' + f.load, c: 'sm', drill: f.drill, info: f.drill ? undefined : 'mdbfeed' };
        if (!f.noLine) E.push({ from: 'bus', to: f.id, type: 'power', align: true });
        return f.id;
    });
    return { nodes, E, rows: [['src'], ['mccb', 'mcb', 'ukur', 'ct'], ['bus'], fIds, ['n', 'pe']] };
}

function buildSub() {
    const nodes = {
        src: { t: 'Panel Ruang Peralatan & Teknisi', s: 'Dari MDB · Feeder 6', c: 'sm', info: 'sub' },
        mccb: { t: 'MCCB Utama', s: 'EasyPact EZC100 · 25A 3P', info: 'mccb' },
        bus: { t: 'Sambungan Kabel', s: 'Keluaran MCCB, kabel dilakban, ke 8 MCB', c: 'busb', info: 'subkabel' },
    };
    const E = [
        { from: 'src', to: 'mccb', type: 'power' },
        { from: 'mccb', to: 'bus', type: 'power' },
    ];
    const mIds = [], lIds = [];
    subMcbs.forEach((m, i) => {
        const mid = 'm' + (i + 1), lid = 'l' + (i + 1);
        nodes[mid] = { t: m.brand + ' ' + m.rate, s: '1P · MCB ' + (i + 1), c: 'sm', info: 'sm' + (i + 1) };
        nodes[lid] = { t: m.load, s: 'dari MCB ' + (i + 1), c: 'sm', info: m.info };
        E.push({ from: 'bus', to: mid, type: 'power', align: true });
        E.push({ from: mid, to: lid, type: 'power' });
        mIds.push(mid); lIds.push(lid);
    });
    return { nodes, E, rows: [['src'], ['mccb'], ['bus'], mIds, lIds] };
}

// TAMBAHAN: isi panel ATS / AMF
function buildATS() {
    const nodes = {
        pln: { t: 'Sumber PLN', s: '380 V · 3 fasa', c: 'src on' },
        gen: { t: 'Sumber Genset', s: 'Standby', c: 'src' },
        mp: { t: 'MCCB PLN', s: 'Schneider Compact NS · 4P · bermotor', info: 'mccbm' },
        mg: { t: 'MCCB Genset', s: 'Schneider Compact NS · 4P · bermotor', info: 'mccbm' },
        bus: { t: 'Busbar R-S-T-N', s: '', c: 'busb', bus: true, info: 'atsbus' },
        out: { t: 'Ke MDB', s: 'Keluaran ATS', c: 'sm' },
        spd: { t: 'SPD 3P + N-PE', s: 'Proteksi surja', c: 'sm', info: 'spd' },
        sens: { t: 'MCB Sensing', s: 'C6 · PLN & LOAD R/S/T', c: 'ctl', info: 'sens' },
        psu: { t: 'Catu Daya', s: 'Trafo + power supply', c: 'ctl', info: 'psu' },
        r230: { t: 'Relay 230 VAC', s: 'RA · RB · KA · KB', c: 'ctl', info: 'r230' },
        plc: { t: 'PLC SR2 B201BD', s: '24 VDC · 12 in / 8 out', c: 'ctl', info: 'plc' },
        r24: { t: 'Relay 24 VDC', s: 'R1 - R9', c: 'ctl', info: 'r24' },
    };
    const E = [
        { from: 'pln', to: 'mp', type: 'power' },
        { from: 'gen', to: 'mg', type: 'power', standby: true },
        { from: 'mp', to: 'bus', type: 'power' },
        { from: 'mg', to: 'bus', type: 'power' },
        { from: 'bus', to: 'out', type: 'power' },
        { from: 'bus', to: 'spd', type: 'power' },
        { from: 'sens', to: 'r230', type: 'control' },
        { from: 'r230', to: 'plc', type: 'control' },
        { from: 'psu', to: 'plc', type: 'control' },
        { from: 'plc', to: 'r24', type: 'control', label: 'Output PLC' },
        { from: 'r24', to: 'mp', type: 'control', label: 'Perintah ON/OFF' },
        { from: 'r24', to: 'mg', type: 'control' },
    ];
    return {
        nodes, E,
        rows: [['sens', 'psu'], ['r230'], ['plc'], ['pln', 'gen'], ['mp', 'r24', 'mg'], ['bus'], ['out', 'spd']],
    };
}

const LEVELS = { main: buildMain, mdb: buildMDB, sub: buildSub, ats: buildATS };
const TITLES = { main: 'Utama', mdb: 'Utama › MDB', sub: 'Utama › MDB › Panel Turunan', ats: 'Utama › ATS' };
const PARENT = { mdb: 'main', sub: 'mdb', ats: 'main' };

/* ===== Garis polos: level MDB dan panel turunan (kelas .plain) ===== */
(function () {
    const st = document.createElement('style');
    st.textContent =
        '#wires .e.plain{stroke:#64748b !important;stroke-width:2 !important;stroke-dasharray:none !important;' +
        'marker-end:none !important;animation:none !important;fill:none}' +
        '#wires .e.plain.hl{stroke:#2563eb !important;stroke-width:3.5 !important}' +
        '#wires .e.plain.dim{opacity:.2}';
    document.head.appendChild(st);
})();

/* ================= STATE ================= */
const $ = s => document.querySelector(s);
const svg = $('#wires'), viewEl = $('#view'), cv = $('#canvas');
let cur = null, curName = 'main', sel = null;

const DEFS = '<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>';

function render(name) {
    curName = name; sel = null;
    cur = LEVELS[name]();
    $('#back').hidden = name === 'main';
    $('#crumb').textContent = TITLES[name];
    viewEl.innerHTML = '';
    cur.rows.forEach(ids => {
        const row = document.createElement('div');
        row.className = 'row' + (ids.includes('amf') ? ' wide' : '') + (ids.includes('bus') ? ' stretch' : '');
        ids.forEach(id => {
            const n = cur.nodes[id], el = document.createElement('div');
            el.className = 'card ' + (n.c || '') + (n.drill ? ' drill' : '');
            el.dataset.id = id;
            el.innerHTML = n.bus
                ? `<b>${n.t}</b><div class="stripes"><i></i><i></i><i></i></div>`
                : `<b>${n.t}</b>${n.s ? `<small>${n.s}</small>` : ''}`;
            row.appendChild(el);
        });
        viewEl.appendChild(row);
    });
    requestAnimationFrame(() => { draw(); paint(); });
}

/* ================= GARIS ================= */
function roundedPath(pts, r = 9) {
    pts = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
        const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1);
        const k = Math.min(r, l1 / 2, l2 / 2);
        if (k < 0.5) { d += `L${x1} ${y1}`; continue; }
        d += `L${x1 - (x1 - x0) / l1 * k} ${y1 - (y1 - y0) / l1 * k}` +
            `Q${x1} ${y1} ${x1 + (x2 - x1) / l2 * k} ${y1 + (y2 - y1) / l2 * k}`;
    }
    const l = pts[pts.length - 1];
    return d + `L${l[0]} ${l[1]}`;
}

function draw() {
    svg.setAttribute('width', cv.scrollWidth);
    svg.setAttribute('height', cv.scrollHeight);
    svg.innerHTML = DEFS;
    const cr = cv.getBoundingClientRect();
    const R = id => {
        const r = cv.querySelector(`[data-id="${id}"]`).getBoundingClientRect();
        return {
            l: r.left - cr.left, r: r.right - cr.left, t: r.top - cr.top, b: r.bottom - cr.top,
            x: (r.left + r.right) / 2 - cr.left, y: (r.top + r.bottom) / 2 - cr.top
        };
    };
    cur.E.forEach((e, i) => {
        const a = R(e.from), b = R(e.to), sd = e.sdx || 0, ed = e.edx || 0;
        let p;
        if (Math.abs(a.y - b.y) < 10) {
            const fw = a.x < b.x;
            p = [[fw ? a.r : a.l, a.y], [fw ? b.l : b.r, b.y]];
        } else if (b.y > a.y) {
            const sx = (e.align ? b.x : a.x) + sd, ym = a.b + (e.off ?? (b.t - a.b) / 2);
            p = [[sx, a.b], [sx, ym], [b.x + ed, ym], [b.x + ed, b.t]];
        } else {
            const ym = b.b + (e.off ?? (a.t - b.b) / 2);
            p = [[a.x + sd, a.t], [a.x + sd, ym], [b.x + ed, ym], [b.x + ed, b.b]];
        }
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', roundedPath(p));
        const plain = curName === 'sub' || curName === 'mdb';
        path.setAttribute('class', 'e ' + e.type + (e.standby ? ' standby' : '') +
            (plain ? ' plain' : (e.col ? ' col-' + e.col : '')));
        if (!plain) path.setAttribute('marker-end', 'url(#ar)');
        svg.appendChild(path);
        e.el = path;
        // titik kecil di ujung garis (penanda sambungan ke komponen tujuan)
        const end = p[p.length - 1];
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', end[0]); dot.setAttribute('cy', end[1]); dot.setAttribute('r', 3);
        svg.appendChild(dot);
        e.dot = dot;
        if (e.label) {
            const pt = path.getPointAtLength(path.getTotalLength() / 2);
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', pt.x + 6); t.setAttribute('y', pt.y - 4);
            t.setAttribute('class', 'lbl'); t.textContent = e.label;
            svg.appendChild(t); e.txt = t;
        }
    });
}

/* ================= SOROT JALUR ================= */
function trace(id) {
    const nodes = new Set([id]), used = new Set(), E = cur.E;
    ['up', 'down'].forEach(dir => {
        const st = [id], seen = new Set([id]);
        while (st.length) {
            const c = st.pop();
            E.forEach((e, i) => {
                if (e.type !== 'power') return;
                const [a, b] = dir === 'up' ? [e.to, e.from] : [e.from, e.to];
                if (a === c) { used.add(i); nodes.add(b); if (!seen.has(b)) { seen.add(b); st.push(b); } }
            });
        }
    });
    E.forEach((e, i) => {
        if (e.type === 'control' && (e.from === id || e.to === id)) {
            used.add(i); nodes.add(e.from); nodes.add(e.to);
        }
    });
    return { nodes, used };
}

function paint() {
    const t = sel ? trace(sel) : null;
    cv.querySelectorAll('.card').forEach(c => {
        c.classList.toggle('sel', c.dataset.id === sel);
        c.classList.toggle('dim', !!t && !t.nodes.has(c.dataset.id));
    });
    cur.E.forEach((e, i) => {
        if (!e.el) return;
        const on = t && t.used.has(i);
        e.el.classList.toggle('hl', !!on);
        e.el.classList.toggle('dim', !!t && !on);
        if (e.txt) e.txt.classList.toggle('dim', !!t && !on);
        if (e.dot) {
            const cs = getComputedStyle(e.el);
            e.dot.setAttribute('fill', cs.stroke);
            e.dot.setAttribute('opacity', cs.opacity);
        }
    });
}

function select(id) { sel = sel === id ? null : id; paint(); }

/* ================= EVENT ================= */
viewEl.addEventListener('click', ev => {
    const card = ev.target.closest('.card');
    if (!card) { sel = null; paint(); return; }
    const id = card.dataset.id, n = cur.nodes[id];
    if (n.drill) { render(n.drill); return; }
    select(id);
    if (n.info) openModal(n.info);
});
cv.addEventListener('click', ev => {
    if (ev.target === cv || ev.target.classList.contains('row')) { sel = null; paint(); }
});
$('#back').onclick = () => render(PARENT[curName] || 'main');
window.addEventListener('resize', () => { if (cur) { draw(); paint(); } });
new ResizeObserver(() => { if (cur) { draw(); paint(); } }).observe(viewEl);

/* ================= POPUP ================= */
function openModal(key) {
    const d = INFO[key];
    if (!d) return;
    $('#mbody').innerHTML =
        `<h2>${d.judul}</h2>
     <table>${d.spek.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>
     <div class="note">${d.catatan}</div>
     <div class="photos">${d.foto.map(f => `<img src="${f}" alt="Foto" onerror="this.style.display='none'">`).join('')}</div>`;
    $('#modal').hidden = false;
}
$('#mbody').addEventListener('click', ev => {
    if (ev.target.tagName === 'IMG') { $('#zoom img').src = ev.target.src; $('#zoom').hidden = false; }
});
$('#close').onclick = () => $('#modal').hidden = true;
$('#modal').addEventListener('click', ev => { if (ev.target.id === 'modal') $('#modal').hidden = true; });
$('#zoom').onclick = () => $('#zoom').hidden = true;
document.addEventListener('keydown', ev => {
    if (ev.key !== 'Escape') return;
    if (!$('#zoom').hidden) $('#zoom').hidden = true;
    else if (!$('#modal').hidden) $('#modal').hidden = true;
    else $('#res').hidden = true;
});

/* ================= PENCARIAN ================= */
function searchIndex() {
    const out = [];
    Object.keys(LEVELS).forEach(v => {
        const d = LEVELS[v]();
        Object.entries(d.nodes).forEach(([id, n]) =>
            out.push({ v, id, label: n.t, sub: n.s || '', where: TITLES[v] }));
    });
    return out;
}
function goTo(v, id) {
    if (v !== curName) render(v);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        sel = id; paint();
        const el = cv.querySelector(`[data-id="${id}"]`);
        if (el) el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }));
    $('#res').hidden = true; $('#q').value = '';
}
function doSearch() {
    const q = $('#q').value.trim().toLowerCase(), ul = $('#res');
    if (!q) { ul.hidden = true; return []; }
    const hits = searchIndex().filter(x => (x.label + ' ' + x.sub).toLowerCase().includes(q)).slice(0, 8);
    ul.innerHTML = hits.map((h, i) => `<li data-i="${i}">${h.label}<small>${h.where}</small></li>`).join('')
        || '<li>Tidak ditemukan</li>';
    ul.hidden = false;
    ul.onclick = ev => { const li = ev.target.closest('li[data-i]'); if (li) goTo(hits[li.dataset.i].v, hits[li.dataset.i].id); };
    return hits;
}
$('#q').addEventListener('input', doSearch);
$('#q').addEventListener('keydown', ev => {
    if (ev.key === 'Enter') { const h = doSearch(); if (h[0]) goTo(h[0].v, h[0].id); }
});
document.addEventListener('click', ev => { if (!ev.target.closest('.search')) $('#res').hidden = true; });

render('main');
