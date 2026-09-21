/**
 * ========================================================
 * SCRIPT.JS - LOGIKA INTERAKTIF PEMETAAN LISTRIK
 * ========================================================
 * Kode ini menggunakan JavaScript dasar (Vanilla JS) tanpa library luar.
 * Dibuat terstruktur dan diberi komentar agar mudah dipelajari oleh pemula.
 */

// Menjalankan kode setelah seluruh dokumen HTML selesai dimuat oleh browser
document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     1. DATA INFORMASI KOMPONEN KELISTRIKAN
     --------------------------------------------------------
     Objek ini menyimpan daftar informasi dari setiap komponen.
     Key (kunci) pada objek ini harus sama persis dengan atribut
     'data-id' yang ada di tag <g> pada file index.html.
  */
  const dataKomponen = {
    "pln": {
      nama: "PLN (Perusahaan Listrik Negara)",
      jenis: "Sumber Listrik",
      keterangan: "Sumber listrik utama dari jaringan utilitas publik untuk menyuplai kebutuhan daya kantor."
    },
    "genset": {
      nama: "Genset (Generator Set)",
      jenis: "Sumber Listrik",
      keterangan: "Sumber listrik cadangan (backup) yang beroperasi secara otomatis saat sumber utama PLN padam."
    },
    "panel-input-ats": {
      nama: "Panel Input ATS",
      jenis: "Panel Masukan",
      keterangan: "Panel penerima daya masukan yang menyalurkan listrik dari sumber PLN menuju switch pemindah (ATS)."
    },
    "ats": {
      nama: "ATS (Automatic Transfer Switch)",
      jenis: "Proteksi & Pengalih",
      keterangan: "Perangkat otomatis yang berpindah menghubungkan beban antara PLN dan Genset secara aman tanpa tumpang tindih."
    },
    "mdb-01": {
      nama: "MDB-01",
      jenis: "Main Distribution Board",
      fungsi: "Panel distribusi utama yang menerima suplai listrik dan membaginya ke 5 feeder/beban.",
      sistem: "3 Phase",
      komponenUtama: [
        "MCCB Utama",
        "MCB Kontrol/Auxiliary",
        "Busbar 3 Fasa",
        "5 Outgoing Feeder",
        "Sistem Netral",
        "Sistem Grounding"
      ]
    },
    "mccb-main": {
      nama: "MCCB Utama",
      jenis: "Proteksi Utama",
      fungsi: "Proteksi utama MDB",
      status: "Aktif"
    },
    "mcb-aux": {
      nama: "MCB Kontrol/Auxiliary",
      jenis: "Proteksi Kontrol",
      fungsi: "Sirkuit kontrol/auxiliary",
      status: "Aktif"
    },
    "rst-pembagian": {
      nama: "Busbar 3 Fasa",
      jenis: "Distribusi Daya",
      sistem: "3 Phase",
      fungsi: "Distribusi daya dari MCCB ke outgoing feeder"
    },
    "feeder-1": {
      nama: "FEEDER 1",
      jenis: "Outgoing Feeder",
      status: "Aktif",
      sumber: "MDB-01",
      tujuan: "Belum ditentukan",
      beban: "Belum ditentukan"
    },
    "feeder-2": {
      nama: "FEEDER 2",
      jenis: "Outgoing Feeder",
      status: "Aktif",
      sumber: "MDB-01",
      tujuan: "Belum ditentukan",
      beban: "Belum ditentukan"
    },
    "feeder-3": {
      nama: "FEEDER 3",
      jenis: "Outgoing Feeder",
      status: "Aktif",
      sumber: "MDB-01",
      tujuan: "Belum ditentukan",
      beban: "Belum ditentukan"
    },
    "feeder-4": {
      nama: "FEEDER 4",
      jenis: "Outgoing Feeder",
      status: "Aktif",
      sumber: "MDB-01",
      tujuan: "Belum ditentukan",
      beban: "Belum ditentukan"
    },
    "feeder-5": {
      nama: "FEEDER 5",
      jenis: "Outgoing Feeder",
      status: "Aktif",
      sumber: "MDB-01",
      tujuan: "Belum ditentukan",
      beban: "Belum ditentukan"
    }
  };

  // Kompatibilitas jika panel-output masih dipanggil
  dataKomponen["panel-output"] = dataKomponen["mdb-01"];

  /* --------------------------------------------------------
     2. MENGAMBIL ELEMEN HTML (DOM SELECTION)
     --------------------------------------------------------
     Kita mengambil elemen-elemen dari halaman agar bisa diubah
     secara dinamis menggunakan JavaScript.
  */
  // Mengambil semua kotak komponen di dalam SVG (memiliki class 'node')
  const nodeElements = document.querySelectorAll(".node");

  // Mengambil elemen panel informasi di sidebar
  const emptyState = document.getElementById("empty-state");
  const detailBox = document.getElementById("detail-box");
  const compName = document.getElementById("comp-name");
  const compType = document.getElementById("comp-type");
  const compExtraDetails = document.getElementById("comp-extra-details");
  const compDescContainer = document.getElementById("comp-desc-container");
  const compDescLabel = document.getElementById("comp-desc-label");
  const compDesc = document.getElementById("comp-desc");

  /* --------------------------------------------------------
     3. FUNGSI UNTUK MENAMPILKAN INFORMASI KOMPONEN
     --------------------------------------------------------
     Fungsi ini dipanggil saat salah satu komponen diklik.
  */
  function tampilkanDetail(idKomponen, elemenTerpilih) {
    // Cari data komponen berdasarkan id
    const data = dataKomponen[idKomponen];

    if (!data) {
      console.warn("Data komponen tidak ditemukan untuk ID:", idKomponen);
      return;
    }

    // 1. Perbarui nama dan jenis pada panel informasi di sebelah kanan
    compName.textContent = data.nama;
    compType.textContent = data.jenis;

    // 2. Bersihkan atribut detail tambahan sebelumnya
    if (compExtraDetails) {
      compExtraDetails.innerHTML = "";

      // Render atribut spesifikasi (Sistem, Status, Sumber, Tujuan, Beban) jika tersedia
      const specItems = [];
      if (data.sistem) {
        specItems.push({ label: "Sistem", val: `<span class="badge-system">${data.sistem}</span>` });
      }
      if (data.status) {
        specItems.push({ label: "Status", val: `<span class="badge-status-active">${data.status}</span>` });
      }
      if (data.sumber) {
        specItems.push({ label: "Sumber", val: data.sumber });
      }
      if (data.tujuan) {
        specItems.push({ label: "Tujuan", val: data.tujuan });
      }
      if (data.beban) {
        specItems.push({ label: "Beban", val: data.beban });
      }

      if (specItems.length > 0) {
        const specGrid = document.createElement("div");
        specGrid.className = "info-spec-grid";
        specItems.forEach(item => {
          const row = document.createElement("div");
          row.className = "info-spec-item";
          row.innerHTML = `
            <span class="info-spec-label">${item.label}</span>
            <span class="info-spec-val">${item.val}</span>
          `;
          specGrid.appendChild(row);
        });
        compExtraDetails.appendChild(specGrid);
      }

      // Render daftar Komponen Utama (untuk MDB-01) jika tersedia
      if (data.komponenUtama && Array.isArray(data.komponenUtama)) {
        const listSection = document.createElement("div");
        listSection.className = "info-row";
        listSection.innerHTML = `
          <span class="info-label">Komponen Utama</span>
          <ul class="comp-list">
            ${data.komponenUtama.map(item => `
              <li class="comp-list-item">
                <span class="comp-list-bullet">&#9679;</span>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        `;
        compExtraDetails.appendChild(listSection);
      }
    }

    // 3. Tampilkan Fungsi atau Keterangan Singkat
    if (compDescContainer && compDesc) {
      if (data.fungsi) {
        compDescContainer.classList.remove("hidden");
        if (compDescLabel) compDescLabel.textContent = "Fungsi";
        compDesc.textContent = data.fungsi;
      } else if (data.keterangan) {
        compDescContainer.classList.remove("hidden");
        if (compDescLabel) compDescLabel.textContent = "Keterangan Singkat";
        compDesc.textContent = data.keterangan;
      } else {
        compDescContainer.classList.add("hidden");
      }
    }

    // 4. Sembunyikan pesan awal 'empty state' dan tampilkan detail informasi
    emptyState.classList.add("hidden");
    detailBox.classList.remove("hidden");

    // 5. Atur tanda aktif visual pada diagram SVG
    // Hapus kelas 'active' dari semua komponen terlebih dahulu
    const allNodes = document.querySelectorAll(".node");
    allNodes.forEach(node => {
      node.classList.remove("active");
    });

    // Berikan kelas 'active' pada komponen yang memiliki data-id yang cocok
    const matchingNodes = document.querySelectorAll(`.node[data-id="${idKomponen}"]`);
    if (matchingNodes.length > 0) {
      matchingNodes.forEach(node => node.classList.add("active"));
    } else if (elemenTerpilih) {
      elemenTerpilih.classList.add("active");
    }
  }

  /* --------------------------------------------------------
     4. MENAMBAHKAN EVENT LISTENER (INTERAKSI KLIK)
     --------------------------------------------------------
     Kita melakukan perulangan (loop) ke semua elemen komponen SVG.
     Setiap komponen diberi perintah: 'Jika diklik, jalankan fungsi tampilkanDetail'.
  */
  const clickableNodes = document.querySelectorAll(".node");
  clickableNodes.forEach(node => {
    // Event ketika mouse mengklik elemen komponen
    node.addEventListener("click", () => {
      const idKomponen = node.getAttribute("data-id");
      tampilkanDetail(idKomponen, node);
    });

    // Menambahkan aksesibilitas keyboard (tombol Enter atau Spasi)
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const idKomponen = node.getAttribute("data-id");
        tampilkanDetail(idKomponen, node);
      }
    });
  });

});
