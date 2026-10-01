/* =====================================================================
   TAMBAHAN script.js - komponen & informasi dari 6 foto panel
   Ada 5 bagian (A sampai E). Tempel sesuai petunjuk di tiap bagian.
   Semua isi dibaca dari foto -> cek lagi di lapangan.
   ===================================================================== */


/* ---------- A. GANTI baris 'amf:' di dalam INFO dengan ini ---------- */
amf: {
    judul: 'Panel Kontrol AMF / ATS',
    spek: [
        ['Controller', 'PLC / smart relay SR2 B201BD, 24 VDC (12 input, 8 output relay). Di foto tampak berlogo Shukaku, bukan ComAp'],
        ['Relay output', 'Telemecanique 24 VDC, berlabel R1-R9'],
        ['Relay 230 VAC', 'Telemecanique, berlabel RA, RB, KA, KB'],
        ['Sensing', 'MCB C6 berlabel PLN R/S/T dan LOAD R/S/T'],
        ['Catu daya', 'Trafo + papan penyearah, dan power supply switching'],
        ['Proteksi surja', 'SPD 3P + N-PE dengan MCB 3P'],
        ['ATS', '2 MCCB bermotor Schneider Compact NS'],
    ],
    catatan: 'Dibaca dari foto. Controller diganti dari ComAp InteliLite menjadi PLC SR2 B201BD. Kalau ComAp memang ada, kembalikan baris Controller.',
    foto: [],
},


/* ---------- B. TEMPEL di bawah blok INFO (setelah "};" penutup INFO) ---------- */
const I = (judul, spek, catatan) => ({
    judul, spek, foto: [],
    catatan: catatan || 'Dibaca dari foto panel. Mohon cek di lapangan.',
});

Object.assign(INFO, {
    // ----- Panel Input (foto A6) -----
    input: I('Panel Input / kWh Meter', [
        ['kWh meter', 'Analog 3 fasa 3x230/400 V, 50 Hz, pengukuran tak langsung'],
        ['Pembacaan', '18246 (saat foto diambil)'],
        ['CT', '3 buah (biru), satu per fasa'],
        ['Proteksi', 'MCCB Merlin Gerin Compact NS100N, 3P'],
        ['Terminal', 'Terminal block 4 jalur (R, S, T, N), kabel ukur ke kWh meter'],
        ['Kabel daya', 'Selubung merah (R), kuning (S), hitam (T); PE hijau-kuning'],
    ]),

    // ----- MDB (foto A1, A2) -----
    mdbmccb: I('MCCB Utama MDB', [
        ['Merek / seri', 'Merlin Gerin EasyPact EZC250'],
        ['Arus / kutub', '250 A, 3P'],
        ['Kabel masuk', 'R (selubung merah), S (kuning), T (hitam)'],
        ['Pembumian', 'Kabel PE hijau-kuning besar dari atas'],
    ]),
    mdbmcb: I('MCB Kontrol MDB', [
        ['Merek / seri', 'Merlin Gerin Multi9 NC45a'],
        ['Jumlah', '3 unit 1P (R, S, T), rating tidak terbaca'],
        ['Fungsi', 'Dugaan: suplai tegangan ke alat ukur dan lampu di pintu'],
    ]),
    mdbbus: I('Busbar & Pengukuran MDB', [
        ['Busbar', 'R (merah), S (kuning), T (hitam), netral; bar PE/N di sisi kiri'],
        ['CT', '3 buah, satu per fasa, dipasang di busbar'],
        ['Pintu', '3 ampere meter analog, 3 lampu indikator (hijau, oranye, merah), 2 selector switch putar biru'],
        ['Feeder keluar', '6 MCCB EZC100 terlihat di foto (di web baru 5 feeder)'],
    ]),

    // ----- Isi panel ATS / AMF (foto A3, A4, A5) -----
    mccbm: I('MCCB ATS (bermotor)', [
        ['Merek / seri', 'Schneider Compact NS dengan motor mekanisme'],
        ['Jumlah', '2: sisi PLN dan sisi genset (dugaan)'],
        ['Kutub', 'Sisi kiri tampak 4P, sisi kanan 3P'],
        ['Indikasi', 'Label Switch OFF / ON pada modul motor'],
    ]),
    sens: I('MCB Sensing', [
        ['Merek', 'Merlin Gerin C6, 1P'],
        ['Label', 'PLN R, PLN S, PLN T dan LOAD R, LOAD S, LOAD T'],
        ['MCB tambahan', 'Shukaku SKU-899 C2, 230/400 V, tuas 0-OFF'],
        ['Fungsi', 'Dugaan: proteksi saluran sensing tegangan PLN dan beban'],
    ]),
    r230: I('Relay 230 VAC', [
        ['Merek', 'Telemecanique, kumparan 230 V 50/60 Hz'],
        ['Label', 'RA, RB, KA, KB'],
        ['Dudukan', 'Soket IEC/NEMA'],
    ], 'Fungsi tiap relay belum dipastikan. Isi setelah dicek di wiring.'),
    psu: I('Catu Daya', [
        ['Trafo', 'Trafo + papan penyearah (PCB kuning, ada heatsink)'],
        ['Power supply', 'Switching, casing logam berlubang, dugaan keluaran 24 VDC'],
        ['Terminal', 'Terminal block dengan penanda kawat kuning'],
    ]),
    plc: I('PLC SR2 B201BD', [
        ['Tipe', 'Smart relay gaya Zelio Logic SR2 B201BD'],
        ['Catu', '24 VDC'],
        ['Input', 'I1-I6 dan IB-IG (12), analog atau 24 VDC'],
        ['Output', 'O1-O8, relay'],
        ['Layar', 'LCD dengan tombol Menu/Ok'],
    ]),
    r24: I('Relay 24 VDC', [
        ['Merek', 'Telemecanique, kumparan 24 VDC'],
        ['Label', 'R1-R9 (sekitar 10 unit, sebagian label tidak terbaca)'],
        ['Fungsi', 'Dugaan: dikendalikan output PLC untuk transfer ATS dan start/stop genset'],
    ]),
    spd: I('SPD', [
        ['Tipe', 'Surge arrester 3P + N-PE'],
        ['Art. no.', '5097 055 (tertera di modul)'],
        ['Tegangan', 'Sekitar 280 V'],
        ['Indikator', 'LED kondisi (normal / rusak)'],
        ['Pendamping', 'MCB 3P putih di sebelahnya'],
    ]),
});


/* ---------- C. TEMPEL di atas "const LEVELS = ..." : level baru "Isi ATS" ---------- */
function buildATS() {
    const nodes = {
        pln:  { t: 'Sumber PLN', s: '380 V · 3 fasa', c: 'src on' },
        gen:  { t: 'Sumber Genset', s: 'Standby', c: 'src' },
        mp:   { t: 'MCCB PLN', s: 'Schneider Compact NS · bermotor', info: 'mccbm' },
        mg:   { t: 'MCCB Genset', s: 'Schneider Compact NS · bermotor', info: 'mccbm' },
        bus:  { t: 'Busbar R-S-T-N', s: '', c: 'busb', bus: true },
        out:  { t: 'Ke MDB', s: 'Keluaran ATS', c: 'sm' },
        spd:  { t: 'SPD 3P + N-PE', s: 'Proteksi surja', c: 'sm', info: 'spd' },
        sens: { t: 'MCB Sensing', s: 'C6 · PLN & LOAD R/S/T', c: 'ctl', info: 'sens' },
        psu:  { t: 'Catu Daya', s: 'Trafo + power supply', c: 'ctl', info: 'psu' },
        r230: { t: 'Relay 230 VAC', s: 'RA · RB · KA · KB', c: 'ctl', info: 'r230' },
        plc:  { t: 'PLC SR2 B201BD', s: '24 VDC · 12 in / 8 out', c: 'ctl', info: 'plc' },
        r24:  { t: 'Relay 24 VDC', s: 'R1 - R9', c: 'ctl', info: 'r24' },
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
// lalu UBAH tiga baris ini menjadi:
// const LEVELS = { main: buildMain, mdb: buildMDB, sub: buildSub, ats: buildATS };
// const TITLES = { ..., ats: 'Utama › ATS' };   (tambahkan ats di akhir)
// const PARENT = { mdb: 'main', sub: 'mdb', ats: 'main' };


/* ---------- D. EDIT di buildMain(): hubungkan node ---------- */
// input: { t: 'Panel Input', s: 'Isolator / proteksi', info: 'input' },
// ats:   { t: 'ATS', s: 'Transfer otomatis', drill: 'ats' },


/* ---------- E. EDIT di buildMDB(): hubungkan node ---------- */
// mccb: { t: 'MCCB Utama', s: '3P', info: 'mdbmccb' },
// mcb:  { t: 'MCB Kontrol', s: 'Sumber: MDB', c: 'sm', info: 'mdbmcb' },
// bus:  { t: 'Busbar R-S-T', s: '', c: 'busb', bus: true, info: 'mdbbus' },
