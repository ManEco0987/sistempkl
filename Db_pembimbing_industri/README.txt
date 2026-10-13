SISTEM PKL SISWA - PANEL PEMBIMBING INDUSTRI (FRONTEND: HTML + CSS + JavaScript)

Cara menjalankan: buka index.html di browser (tanpa server/backend).
Desain, layout, dan gaya visual PERSIS SAMA dengan panel Admin (style.css tidak diubah).
Yang berbeda hanya menu dan fitur, disesuaikan untuk peran Pembimbing Industri:

Halaman (hash route):
#dashboard      - Ringkasan cepat: siswa bimbingan, jurnal menunggu, tugas berjalan, notifikasi
#notifikasi     - Jurnal/tugas/nilai yang perlu ditindak lanjuti
#siswa          - Siswa Bimbingan (Mentee List): profil, posisi/divisi, kontak guru sekolah
#jurnal         - Jurnal Harian (Logbook): validasi Setujui/Revisi, lihat dokumentasi
#absensi        - Absensi & Kehadiran: jam masuk/pulang, status hadir/izin/sakit/alpa
#tugas          - Tugas (Task Manager): beri tugas, status To Do/In Progress/Done, ulasan
#nilai          - Penilaian & Evaluasi: hard skill + soft skill, catatan kualitatif, kirim ke sekolah
#chat           - Komunikasi langsung dengan siswa bimbingan
#profil         - Profil pembimbing (perusahaan, jabatan, kontak) & ganti password

Data: disimpan di localStorage browser (kunci pkl_pembimbing_db_v1).
Reset data: hapus localStorage situs ini (DevTools > Application) lalu muat ulang.

Berkas: index.html (kerangka + sidebar), style.css (desain, sama persis byte-by-byte dengan versi Admin terbaru),
script.js (semua logika & menu Pembimbing Industri).

CATATAN PERUBAHAN
- style.css disamakan persis dengan style.css panel Admin terbaru (termasuk komponen Edit Profil mobile-style).
- Menu "Profil Saya" (juga klik nama di pojok kanan atas, #profil): foto, nama lengkap, jabatan, no. HP, ganti kata sandi — tampilan sama seperti Edit Profil Admin.
- Header (nama & avatar pojok kanan atas) kini otomatis mengikuti data profil pembimbing yang tersimpan.
