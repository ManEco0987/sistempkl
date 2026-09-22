SISTEM PKL SISWA - PANEL ADMIN (FRONTEND: HTML + CSS + JavaScript)

Cara menjalankan: buka index.html di browser (tanpa server/backend).
Halaman (hash route): #dashboard, #notifikasi (#notif), #siswa (#daftarSiswa), #nilai (#nilaiSiswa),
#chat, #guru (#daftarGuru), #monitoring, #penempatan (#tempatSiswa), #rekomendasi (#tempatRekomendasi),
#jurusan, #absensi, #berkas (#daftarBerkas), #jurnal.

Data: disimpan di localStorage browser (kunci pkl_db_v2) dengan relasi antar tabel
(siswa -> jurusan/tempat/guru; nilai, absensi, jurnal, monitoring, pesan -> siswa).
Reset data: hapus localStorage situs ini (DevTools > Application) lalu muat ulang.
Struktur data sudah siap dipindah ke API/Laravel (nama tabel & kolom mengikuti relasi database).

Berkas: index.html (kerangka + sidebar), style.css (desain + tambahan di bagian bawah), script.js (semua logika).
Catatan: password pada demo disimpan apa adanya di browser; ganti dengan hash di backend nanti.
