# Parking Application

This is a parking application based on a ticketing system using Node.js for the backend and Vue.js for the frontend.

## Features
- Create, retrieve, update, and delete parking tickets.
- Store ticket information in a SQLite database.
- Automatic Number Plate Recognition (ANPR) support (under development).

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation
1. Clone the repository.
2. Run `npm install` in the project directory.
3. Start the server with `npm start` or use `npm run dev` for development mode with auto-restart.

### Database
The application uses SQLite, which is a file-based database that requires no separate server installation.
- Database file is created automatically as `parking.db` in the project root
- All ticket data is stored in the `tickets` table

### Usage
- Use the API endpoints to manage parking tickets:
  - `POST /api/tickets` - Create a new ticket
  - `GET /api/tickets` - Get all tickets
  - `GET /api/tickets/:id` - Get ticket by ID
  - `PATCH /api/tickets/:id` - Update a ticket
  - `DELETE /api/tickets/:id` - Delete a ticket

## License
This project is licensed under the MIT License.

# Sistem Manajemen Parkir dengan ANPR

Sistem manajemen parkir modern dengan fitur Automatic Number Plate Recognition (ANPR) untuk mengelola parkir kendaraan secara efisien.

## Daftar Isi
- Pendahuluan
- Fitur Utama
- Panduan Pengguna
- Panduan untuk Petugas Parkir
- Panduan untuk Admin
- Instalasi
- Konfigurasi
- Pemeliharaan
- ANPR & Pencocokan Gambar
- Spesifikasi Sistem

## Pendahuluan
Sistem Manajemen Parkir dengan ANPR adalah solusi modern untuk mengelola area parkir dengan efisien. Sistem ini menggunakan teknologi pengenalan plat nomor otomatis (ANPR) untuk mencatat kendaraan yang masuk dan keluar, serta dilengkapi dengan berbagai fitur manajemen dan pelaporan.

## Fitur Utama
- Pengenalan Plat Nomor Otomatis (ANPR)
- Manajemen Parkir Real-time
- Sistem Pembayaran Digital
- Pelaporan dan Analitik
- Manajemen Pengguna
- Backup dan Restore Data
- Log Aktivitas
- Dashboard Interaktif

## ANPR & Pencocokan Gambar
Sistem ini menggunakan teknologi Automatic Number Plate Recognition (ANPR) untuk mendeteksi dan membaca plat nomor kendaraan secara otomatis.

### Cara Kerja ANPR
1. **Pengambilan Gambar**
   - Kamera menangkap gambar kendaraan saat masuk area parkir
   - Gambar dioptimalkan untuk pengenalan plat nomor

2. **Deteksi Plat Nomor**
   - Algoritma pendeteksi lokasi plat nomor pada gambar
   - Sistem memisahkan area plat nomor dari gambar utama

3. **Pengenalan Karakter (OCR)**
   - Optical Character Recognition mengubah gambar plat menjadi teks
   - Sistem memproses dan memvalidasi format plat nomor

4. **Pencocokan Gambar**
   - Saat kendaraan keluar, sistem mengambil gambar baru
   - Plat nomor dideteksi dan dicocokkan dengan data masuk
   - Sistem menghitung durasi parkir dan biaya

### Fitur Pencocokan Gambar
- **Verifikasi Visual**: Petugas dapat memverifikasi kecocokan gambar kendaraan masuk dan keluar
- **Penyimpanan Gambar**: Semua gambar disimpan untuk referensi dan audit
- **Deteksi Anomali**: Sistem menandai ketidakcocokan antara plat nomor masuk dan keluar
- **Tingkat Kepercayaan**: Menampilkan persentase keyakinan hasil pengenalan plat nomor
- **Koreksi Manual**: Petugas dapat mengoreksi hasil pengenalan jika terjadi kesalahan

### Pengaturan ANPR
- **Kalibrasi Kamera**: Pengaturan posisi dan fokus kamera untuk hasil optimal
- **Sensitivitas Deteksi**: Mengatur tingkat sensitivitas algoritma pendeteksi
- **Ambang Batas Kepercayaan**: Menentukan nilai minimum kepercayaan untuk hasil yang valid
- **Format Plat Nomor**: Konfigurasi format plat nomor sesuai standar regional

### Pemecahan Masalah
- **Pencahayaan Buruk**: Sistem menyediakan penyesuaian gambar otomatis
- **Plat Nomor Rusak**: Prosedur alternatif untuk plat yang sulit dibaca
- **Kegagalan Deteksi**: Langkah-langkah troubleshooting untuk masalah pengenalan

## Panduan Pengguna
### Panduan untuk Petugas Parkir
1. **Login ke Sistem**
   - Buka aplikasi di browser
   - Masukkan username dan password yang diberikan
   - Klik tombol "Masuk"
2. **Mencatat Kendaraan Masuk**
   - Di halaman utama, klik "Kendaraan Masuk"
   - Arahkan kamera ke plat nomor kendaraan
   - Sistem akan otomatis mendeteksi plat nomor
   - Verifikasi hasil deteksi
   - Pilih jenis kendaraan
   - Klik "Simpan" untuk mencetak tiket
3. **Mencatat Kendaraan Keluar**
   - Scan tiket parkir atau masukkan nomor tiket
   - Sistem akan menampilkan informasi kendaraan
   - Verifikasi plat nomor kendaraan
   - Sistem akan menghitung biaya parkir
   - Proses pembayaran:
     - Pilih metode pembayaran
     - Masukkan jumlah yang diterima
     - Klik "Proses Pembayaran"
     - Cetak struk pembayaran
4. **Menangani Kasus Khusus**
   - **Tiket Hilang**:
     - Klik "Tiket Hilang"
     - Masukkan plat nomor kendaraan
     - Verifikasi dengan foto kendaraan
     - Proses sesuai prosedur tiket hilang
   - **Kendaraan Menginap**:
     - Gunakan menu "Kendaraan Menginap"
     - Ikuti prosedur tarif menginap
5. **Laporan Harian**
   - Di akhir shift, buka menu "Laporan Shift"
   - Verifikasi semua transaksi
   - Cetak laporan shift
   - Serahkan ke supervisor

### Panduan untuk Admin
1. **Dashboard Admin**
   - Akses Dashboard:
     - Login sebagai admin
     - Lihat statistik real-time:
       - Jumlah kendaraan
       - Pendapatan
       - Slot tersedia
       - Grafik tren
2. **Manajemen Pengguna**
   - **Menambah Pengguna Baru**:
     - Buka menu "Kelola Pengguna"
     - Klik "Tambah Pengguna"
     - Isi informasi:
       - Username
       - Password
       - Role (Admin/Petugas)
       - Informasi pribadi
     - Klik "Simpan"
   - **Mengelola Pengguna**:
     - Edit informasi pengguna
     - Reset password
     - Nonaktifkan akun
     - Atur hak akses
3. **Manajemen Parkir**
   - **Pengaturan Tarif**:
     - Buka menu "Pengaturan Tarif"
     - Atur tarif berdasarkan:
       - Jenis kendaraan
       - Durasi
       - Tarif khusus
   - **Manajemen Slot**:
     - Atur jumlah slot
     - Monitor okupansi
     - Atur zona parkir
4. **Laporan dan Analisis**
   - **Laporan Keuangan**:
     - Buka menu "Laporan"
     - Pilih jenis laporan
     - Atur periode
     - Export ke Excel/PDF
   - **Analisis Data**:
     - Lihat tren parkir
     - Analisis pendapatan
     - Monitor kinerja sistem
5. **Backup dan Maintenance**
   - **Backup Data**:
     - Buka menu "Backup"
     - Pilih jenis backup
     - Atur jadwal backup
     - Download/restore backup
   - **Log Aktivitas**:
     - Monitor aktivitas sistem
     - Filter log berdasarkan:
       - Waktu
       - Pengguna
       - Jenis aktivitas
     - Export log
6. **Pengaturan Sistem**
   - **Konfigurasi Umum**:
     - Pengaturan aplikasi
     - Konfigurasi printer
     - Pengaturan kamera
     - Integrasi sistem
   - **Keamanan**:
     - Atur kebijakan password
     - Monitor login gagal
     - Atur backup otomatis

## Spesifikasi Sistem

### Persyaratan Hardware
- **Server**:
  - Prosesor: Intel Core i5 atau setara (minimal)
  - RAM: 8GB (minimal), 16GB (direkomendasikan)
  - Penyimpanan: 256GB SSD (minimal)
  - Koneksi Jaringan: Ethernet 1Gbps
  - UPS: Direkomendasikan untuk mencegah kehilangan data

- **Perangkat Klien**:
  - Prosesor: Intel Core i3 atau setara
  - RAM: 4GB (minimal)
  - Penyimpanan: 128GB
  - Layar: Minimal 1366x768 resolusi

- **Kamera ANPR**:
  - Resolusi: Minimal 2MP (1080p)
  - Frame Rate: 30fps
  - Koneksi: IP Camera dengan PoE
  - Fitur: IR night vision, weather-resistant

- **Perangkat Pendukung**:
  - Printer Termal untuk tiket dan struk
  - Barcode/QR Scanner
  - Gate Controller (opsional)
  - Display LED untuk informasi slot (opsional)

### Persyaratan Software
- **Sistem Operasi**:
  - Server: Windows Server 2019/2022 atau Linux (Ubuntu 20.04 LTS+)
  - Klien: Windows 10/11, macOS, atau Linux

- **Database**:
  - SQLite (pengembangan)
  - MySQL/MariaDB atau PostgreSQL (produksi)

- **Browser**:
  - Chrome 90+
  - Firefox 88+
  - Edge 90+
  - Safari 14+

- **Framework & Runtime**:
  - Node.js 14+
  - Vue.js 3.2+
  - Express 4.17+

### Persyaratan Jaringan
- **Bandwidth**:
  - Minimal 10Mbps untuk operasi dasar
  - 50Mbps+ untuk sistem dengan banyak kamera ANPR

- **Konektivitas**:
  - LAN untuk koneksi internal
  - Internet untuk backup cloud dan akses jarak jauh
  - Firewall untuk keamanan

- **Arsitektur**:
  - Client-Server
  - API RESTful
  - WebSocket untuk update real-time

### Kapasitas Sistem
- **Jumlah Kendaraan**:
  - Hingga 1000 kendaraan per hari (konfigurasi standar)
  - Dapat ditingkatkan dengan hardware yang lebih baik

- **Penyimpanan Data**:
  - Tiket: ~1KB per tiket
  - Gambar: ~500KB per gambar (2 gambar per kendaraan)
  - Log: ~100KB per hari
  - Total: ~1GB per 1000 kendaraan

- **Backup**:
  - Inkremental: Harian
  - Penuh: Mingguan
  - Retensi: 90 hari

### Keamanan
- **Autentikasi**:
  - Login berbasis peran (Admin, Petugas)
  - Password hashing dengan salt
  - Timeout sesi otomatis

- **Otorisasi**:
  - Kontrol akses berbasis peran
  - Audit trail untuk semua aktivitas

- **Enkripsi**:
  - HTTPS untuk semua komunikasi
  - Enkripsi data sensitif dalam database

- **Kepatuhan**:
  - Sesuai dengan regulasi privasi data
  - Perlindungan data pribadi

### Skalabilitas
- **Vertikal**:
  - Peningkatan spesifikasi server

- **Horizontal**:
  - Penambahan node server
  - Load balancing

- **Modular**:
  - Komponen terpisah untuk ANPR, tiket, pembayaran
  - Arsitektur microservice (untuk pengembangan masa depan)
