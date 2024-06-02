# PROJECT21-KlinikApp-Frontend

## Anggota Grub
- Alfina Fitria
- Alvin Novizar Ram Gonzales
- Nukman Solikhudin
- Rakha Muhammad Nauval
- Alfin Naufal Azhali
- Muhammad Dimas Fadilla

semangat
## Link meet
- SELASA 9:30 - 10:30 http://meet.google.com/ddv-fzui-cgj

## Deadline
- 14 Juni 2024

## Tujuan Proyek
Proyek ini bertujuan untuk membuat sebuah aplikasi Klinik yang akan digunakan secara real. Klinik App memudahkan pengguna dalam mengakses layanan kesehatan dan informasi terkait klinik secara digital.

## Latar Belakang
- Kebutuhan akan akses yang mudah dan cepat terhadap layanan kesehatan.
- Kemudahan akses internet dan perangkat mobile yang semakin luas.
- Keterbatasan waktu dan kesulitan untuk membuat janji atau mendapatkan informasi tentang klinik secara langsung.
- Pentingnya penggunaan teknologi dalam meningkatkan kualitas layanan kesehatan dan kenyamanan pasien.

## Fitur Utama
- Menampilkan informasi tentang layanan klinik, jadwal dokter, dan fasilitas yang tersedia.
- Memfasilitasi pengguna untuk melakukan pendaftaran dan membuat janji temu dengan dokter secara online.
- Memberikan reminder dan notifikasi tentang jadwal janji temu yang sudah dibuat.
- Menyediakan opsi untuk pengguna untuk memberikan umpan balik atau review tentang pengalaman mereka.

## Standard Setup Project
1. **Penamaan Tabel Basis Data:**
   - Format: `tbl_{entitas}s`
   - Contoh: `tbl_users`, `tbl_questions`, `tbl_brands`

2. **Penamaan Router:**
   - Harus diakhiri dengan kata `Controller`.
   - Contoh: `MemberController`

3. **Penamaan View:**
   - Dijadikan dalam satu folder yang berhubungan dengan konten.
   - Contoh:
     ```
     brands/
     ├── add.html
     ├── edit.html
     └── index.html
     ```

4. **Penamaan Project:**
   - Tidak menggunakan spasi, gunakan simbol `-` sebagai pemisah.
   - Contoh: `sistem-manajemen-sekolah`

5. **Gambar Statis:**
   - Masukkan dalam folder `public/img`.
   - Penamaan gambar sesuai dengan konten, gunakan simbol `-` untuk pemisah.
   - Contoh: `logo-gamelab.png`

6. **Gambar Dinamis:**
   - Masukkan ke dalam folder `public/uploads/{nama_folder}`.
   - Format penamaan gambar: `YmdHis-{nama_file}`
   - Contoh: `public/uploads/members/0610202216892-uin.png`

7. **File Assets:**
   - Masukkan pada folder `public/js` dan `public/css`.

8. **Penamaan Konsisten:**
   - File, folder, routes, model, dan controller harus menggunakan Bahasa Inggris.

9. **Penghapusan Data:**
   - Backend hanya update field `archived=1`.
   - Contoh: Saat insert, set `archived=0`.

10. **Pengisian Field Otomatis:**
    - Saat insert: `creation_time` dan `create_id`.
    - Saat update/delete: `update_time` dan `update_id`.

## Standard Quality Project
1. Tidak boleh ada error di view maupun console.
2. Tidak boleh ada tombol atau aksi yang tidak berfungsi.
3. Setiap form input harus fokus ke field pertama.
4. Tambahkan placeholder pada form input.
5. Tambahkan tanda bintang ( * ) pada form input yang wajib diisi.
6. Tambahkan proteksi atau ukuran rekomendasi ketika upload gambar.
7. Tampilan table harus menggunakan DataTable.
8. Setiap angka harus di format `number_format` dan rata kanan.
9. Setiap tanggal harus menggunakan format penanggalan Indonesia.
10. Font size harus seragam.
11. Jarak padding/margin harus rapi.
12. Lebar dan tinggi gambar harus konsisten.
13. Data yang berhubungan dengan backend harus menggunakan ajax dan tampilkan loading bar.
14. Tampilan clean dan rapi, harus responsif.
15. Terdapat fitur Login, Register.
16. Harus sudah menggunakan Autentikasi (Admin dan User).
17. Menampilkan data harus menggunakan tabel yang berelasi (JOIN).
18. Kecepatan query tidak boleh lebih dari 0,5 detik.
19. Pastikan slug dan breadcrumbs sudah sesuai.
    - Contoh:
      - Slug: `localhost/sistem-manajemen-sekolah/news/category`
      - Breadcrumbs: `News / Category`

## Setup Config Server & Automate Script di Sistem Gamelab - Project Detail
Instruksi untuk setup config server dan automate script akan disediakan oleh tim Gamelab. Pastikan untuk mengikuti panduan yang diberikan untuk konfigurasi server yang tepat dan menjalankan script otomatisasi.

## Khusus Project FrontEnd x BackEnd
1. **Penamaan Folder:**
   - Harus dimulai dari huruf kecil.
   - Contoh:
     ```
     backend/
     frontend/
     img/
     ```

2. **Folder Build Default FrontEnd:**
   - Ketika build project FrontEnd, folder default adalah `dist`.
   - Jangan diubah-ubah ataupun di-rename.

## Fitur Wajib
- Dashboard
- Products
- Create Product
- Category
- Brands
- Sub Category
- Print Barcode
- Import Products
- New User
- User List
- Tax (Settings)
- Profile
- Login
- Logout
- *Karena tidak semua fitur dimasukkan, akan ada penyesuaian untuk menampilkan fitur yang sesuai dengan diskusi grub, dan hak akses pengguna.

## Hak Akses
1. **Super Admin:**
   - Muncul semua fitur dan dapat melakukan hapus data.

2. **Admin:**
   - Fitur New User dan User List tidak tampil, tidak dapat melakukan aksi hapus data.

## File Naming
1. **Penamaan Tabel Basis Data:**
   - `tbl_products`

2. **Penamaan Router:**
   - `ProductController`

3. **Penamaan View:**
   - Format: `{folder_konten}-{nama_file}`
   - Contoh: `product-add`

4. **Penamaan Project:**
   - `School-Management-System`

5. **Penamaan Gambar:**
   - Gambar statis: `image01.png`
   - Gambar dinamis: `YmdHis-{nama_file}`

6. **File Assets (CSS, JavaScript):**
   - Folder: `public/js` dan `public/css`

7. **Penamaan File, Folder, Routes, Model, dan Controller:**
   - Konsisten menggunakan Bahasa Inggris.