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
      jenis: "Panel",
      keterangan: "Panel penerima daya masukan yang menyalurkan listrik dari sumber PLN menuju switch pemindah (ATS)."
    },
    "ats": {
      nama: "ATS (Automatic Transfer Switch)",
      jenis: "Proteksi & Pengalih",
      keterangan: "Perangkat otomatis yang berpindah menghubungkan beban antara PLN dan Genset secara aman tanpa tumpang tindih."
    },
    "panel-output": {
      nama: "Panel Output",
      jenis: "Panel",
      keterangan: "Panel distribusi utama yang menerima daya bersih dari ATS untuk disalurkan ke sistem pengaman instalasi."
    },
    "mccb-main": {
      nama: "MCCB Main Output",
      jenis: "Proteksi",
      keterangan: "Pemutus sirkuit utama (Molded Case Circuit Breaker) untuk mengamankan sistem dari beban lebih dan korsleting."
    },
    "rst-pembagian": {
      nama: "RST Pembagian",
      jenis: "Distribusi",
      keterangan: "Rel busbar pembagian fasa listrik (Fasa R, S, dan T) untuk membagi suplai daya merata ke gedung-gedung kantor."
    },
    "gedung-a": {
      nama: "Gedung A",
      jenis: "Gedung (Beban)",
      keterangan: "Blok bangunan perkantoran A yang menerima suplai daya dari busbar RST pembagian."
    },
    "gedung-b": {
      nama: "Gedung B",
      jenis: "Gedung (Beban)",
      keterangan: "Blok bangunan perkantoran B yang menerima suplai daya dari busbar RST pembagian."
    },
    "gedung-c": {
      nama: "Gedung C",
      jenis: "Gedung (Beban)",
      keterangan: "Blok bangunan perkantoran C yang menerima suplai daya dari busbar RST pembagian."
    },
    "gedung-d": {
      nama: "Gedung D",
      jenis: "Gedung (Beban)",
      keterangan: "Blok bangunan perkantoran D yang menerima suplai daya dari busbar RST pembagian."
    }
  };

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

    // 1. Perbarui teks pada panel informasi di sebelah kanan
    compName.textContent = data.nama;
    compType.textContent = data.jenis;
    compDesc.textContent = data.keterangan;

    // 2. Sembunyikan pesan awal 'empty state' dan tampilkan detail informasi
    emptyState.classList.add("hidden");
    detailBox.classList.remove("hidden");

    // 3. Atur tanda aktif visual pada diagram SVG
    // Hapus kelas 'active' dari semua komponen terlebih dahulu
    nodeElements.forEach(node => {
      node.classList.remove("active");
    });

    // Berikan kelas 'active' hanya pada komponen yang sedang diklik
    elemenTerpilih.classList.add("active");
  }

  /* --------------------------------------------------------
     4. MENAMBAHKAN EVENT LISTENER (INTERAKSI KLIK)
     --------------------------------------------------------
     Kita melakukan perulangan (loop) ke semua elemen komponen SVG.
     Setiap komponen diberi perintah: 'Jika diklik, jalankan fungsi tampilkanDetail'.
  */
  nodeElements.forEach(node => {
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
