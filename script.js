/* ================= DATA (ubah di sini) ================= */
const FOTO_AMF = ['img/amf-depan.jpg', 'img/amf-controller.jpg', 'img/amf-belakang.jpg'];

// Feeder MDB. Feeder 5 = panel turunan (drill:'sub')
const feeders = [
    { id: 'f1', name: 'Feeder 1', mcb: 'MCB 3P 32A', load: 'Beban 1' },
    { id: 'f2', name: 'Feeder 2', mcb: 'MCB 3P 32A', load: 'Beban 2' },
    { id: 'f3', name: 'Feeder 3', mcb: 'MCB 3P 32A', load: 'Beban 3' },
    { id: 'f4', name: 'Feeder 4', mcb: 'MCB 3P 32A', load: 'Beban 4' },
    { id: 'f5', name: 'Feeder 5', mcb: 'MCCB 3P 25A', load: 'Panel Ruang Peralatan & Teknisi', drill: 'sub' },
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
        judul: 'Panel Kontrol AMF',
        spek: [
            ['Controller', 'ComAp InteliLite AMF 25'],
            ['Fungsi', 'Deteksi PLN padam, start genset, perintah transfer ATS, stop genset'],
            ['Mode', 'Off / Manual / Auto / Test'],
            ['Sensing', 'Tegangan PLN dan genset'],
            ['Output', 'Start/Stop genset, kontaktor ATS'],
        ],
        catatan: 'Sebagian isi dibaca dari foto. Mohon cek dengan kondisi lapangan.',
        foto: FOTO_AMF,
    },
    sub: {
        judul: 'Panel Ruang Peralatan & Teknisi',
        spek: [
            ['Suplai', 'MDB Feeder 5'],
            ['Proteksi utama', 'MCCB EasyPact EZC100 25A 3P'],
            ['MCB', '8 buah, 1 kutub (Broco, Schneider Domae, Merlin Gerin)'],
            ['Pintu', '3 lampu indikator + 1 selector switch'],
            ['Keluaran', 'Terminal block dengan jumper merah, menuju beban ruangan'],
        ],
        catatan: 'Pembagian fasa (R/S/T) tiap MCB dan nama beban masih sementara. Sesuaikan di script.js (subMcbs).',
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

/* ================= BUILD LEVEL ================= */
function buildMain() {
    const nodes = {
        pln: { t: 'PLN', s: '380 V · 3 fasa', c: 'src on' },
        gen: { t: 'Genset', s: 'Standby', c: 'src' },
        input: { t: 'Panel Input', s: 'Isolator / proteksi' },
        ats: { t: 'ATS', s: 'Transfer otomatis' },
        amf: { t: 'Panel Kontrol AMF', s: 'ComAp InteliLite AMF 25', c: 'ctl', info: 'amf' },
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
        E.push({ from: 'mdb', to: id, type: 'power' });
        return id;
    });
    return { nodes, E, rows: [['pln', 'gen'], ['input'], ['ats', 'amf'], ['mdb'], loadIds] };
}

function buildMDB() {
    const nodes = {
        src: { t: 'Dari ATS', s: 'Sumber: MDB', c: 'sm' },
        mccb: { t: 'MCCB Utama', s: '3P' },
        mcb: { t: 'MCB Kontrol', s: 'Sumber: MDB', c: 'sm' },
        bus: { t: 'Busbar R-S-T', s: '', c: 'busb', bus: true },
        n: { t: 'Neutral (N)', s: '', c: 'bar' },
        pe: { t: 'Grounding (PE)', s: '', c: 'bar' },
    };
    const E = [
        { from: 'src', to: 'mccb', type: 'power' },
        { from: 'mccb', to: 'mcb', type: 'power' },
    ];
    ['r', 's', 't'].forEach((c, i) =>
        E.push({ from: 'mccb', to: 'bus', type: 'power', col: c, sdx: (i - 1) * SPACING, edx: (i - 1) * SPACING }));
    const fIds = feeders.map(f => {
        nodes[f.id] = { t: f.name, s: f.mcb + ' → ' + f.load, c: 'sm', drill: f.drill };
        ['r', 's', 't'].forEach((c, i) =>
            E.push({ from: 'bus', to: f.id, type: 'power', col: c, align: true, sdx: (i - 1) * SPACING, edx: (i - 1) * SPACING }));
        return f.id;
    });
    return { nodes, E, rows: [['src'], ['mccb', 'mcb'], ['bus'], fIds, ['n', 'pe']] };
}

function buildSub() {
    const nodes = {
        src: { t: 'Panel Ruang Peralatan & Teknisi', s: 'Dari MDB · Feeder 5', c: 'sm', info: 'sub' },
        mccb: { t: 'MCCB Utama', s: 'EasyPact EZC100 · 25A 3P', info: 'mccb' },
        bus: { t: 'Busbar R-S-T', s: '', c: 'busb', bus: true },
    };
    const E = [
        { from: 'src', to: 'mccb', type: 'power' },
    ];
    ['r', 's', 't'].forEach((c, i) =>
        E.push({ from: 'mccb', to: 'bus', type: 'power', col: c, sdx: (i - 1) * SPACING, edx: (i - 1) * SPACING }));
    const mIds = [], lIds = [];
    subMcbs.forEach((m, i) => {
        const mid = 'm' + (i + 1), lid = 'l' + (i + 1);
        nodes[mid] = { t: m.brand + ' ' + m.rate, s: '1P · fasa ' + m.f.toUpperCase(), c: 'sm ph-' + m.f };
        nodes[lid] = { t: m.load, s: 'dari MCB ' + (i + 1), c: 'sm ph-' + m.f, info: m.info };
        E.push({ from: 'bus', to: mid, type: 'power', col: m.f, align: true });
        E.push({ from: mid, to: lid, type: 'power', col: m.f });
        mIds.push(mid); lIds.push(lid);
    });
    return { nodes, E, rows: [['src'], ['mccb'], ['bus'], mIds, lIds] };
}

const LEVELS = { main: buildMain, mdb: buildMDB, sub: buildSub };
const TITLES = { main: 'Utama', mdb: 'Utama › MDB', sub: 'Utama › MDB › Panel Turunan' };
const PARENT = { mdb: 'main', sub: 'mdb' };

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
        path.setAttribute('class', 'e ' + e.type + (e.standby ? ' standby' : '') + (e.col ? ' col-' + e.col : ''));
        path.setAttribute('marker-end', 'url(#ar)');
        svg.appendChild(path);
        e.el = path;
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
