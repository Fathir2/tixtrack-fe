# TixTrack - Sistem Manajemen Tiket

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

TixTrack adalah aplikasi web frontend yang dibangun dengan React untuk mengelola dan melacak tiket dukungan pelanggan. Aplikasi ini menyediakan antarmuka yang bersih dan modern bagi pengguna untuk membuat tiket dan bagi admin untuk mengelola semua tiket yang masuk.

## ✨ Fitur Utama

- **Otentikasi Pengguna**: Sistem login dan registrasi yang aman.
- **Dashboard Berbasis Peran**:
  - **Admin**: Melihat statistik keseluruhan, daftar semua tiket, dan ringkasan aktivitas.
  - **User**: Melihat statistik tiket pribadi dan daftar tiket yang telah dibuat.
- **Manajemen Tiket**:
  - Membuat tiket baru dengan judul, deskripsi, prioritas, dan lampiran gambar.
  - Melihat detail tiket, termasuk riwayat balasan.
  - Menambahkan balasan pada tiket.
  - Mengubah status tiket (untuk admin).
  - Menghapus tiket (untuk user pada tiket miliknya).
- **Antarmuka Responsif**: Desain yang dapat beradaptasi dengan baik di perangkat desktop maupun mobile.
- **Pencarian & Filter**: Kemampuan untuk mencari tiket dan memfilternya berdasarkan status atau prioritas.
- **Halaman FAQ**: Halaman informatif yang dapat dicari dan dikategorikan untuk membantu pengguna.
- **Notifikasi Real-time**: Menggunakan `react-hot-toast` untuk feedback instan kepada pengguna.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: React Context API
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📂 Struktur Proyek

Struktur folder proyek ini dirancang agar mudah diskalakan dan dipelihara.

```
/src
├── assets/         # Aset statis seperti gambar dan SVG
├── components/     # Komponen UI yang dapat digunakan kembali
│   ├── Auth/
│   ├── common/
│   ├── FAQ/
│   ├── Navigation/
│   └── Tickets/
├── context/        # React Context untuk state global (misal: AuthContext)
├── data/           # Data statis atau mock data (misal: faqData)
├── hooks/          # Custom hooks untuk logika yang dapat digunakan kembali
├── pages/          # Komponen yang mewakili halaman/rute
├── services/       # Logika untuk berinteraksi dengan API eksternal
└── utils/          # Fungsi utilitas pembantu
```

## 🚀 Memulai Proyek

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

### Prasyarat

- [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/your-username/tixtrack-fe.git
    cd tixtrack-fe
    ```

2.  **Install dependensi:**

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variable:**
    Buat file `.env` di root proyek dan tambahkan URL base API backend Anda.

    ```env
    # .env
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

4.  **Jalankan server development:**

    ```bash
    npm run dev
    # atau
    yarn dev
    ```

5.  Buka browser Anda dan navigasi ke `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

## 📜 Skrip yang Tersedia

- `npm run dev`: Menjalankan aplikasi dalam mode development.
- `npm run build`: Mem-build aplikasi untuk production ke folder `dist`.
- `npm run preview`: Menjalankan aplikasi yang sudah di-build secara lokal.

---

© 2025 TixTrack

```<!-- filepath: c:\xampp\htdocs\TixTrack-Project\tixtrack-fe\README.md -->
# TixTrack - Sistem Manajemen Tiket

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

TixTrack adalah aplikasi web frontend yang dibangun dengan React untuk mengelola dan melacak tiket dukungan pelanggan. Aplikasi ini menyediakan antarmuka yang bersih dan modern bagi pengguna untuk membuat tiket dan bagi admin untuk mengelola semua tiket yang masuk.

## ✨ Fitur Utama

- **Otentikasi Pengguna**: Sistem login dan registrasi yang aman.
- **Dashboard Berbasis Peran**:
  - **Admin**: Melihat statistik keseluruhan, daftar semua tiket, dan ringkasan aktivitas.
  - **User**: Melihat statistik tiket pribadi dan daftar tiket yang telah dibuat.
- **Manajemen Tiket**:
  - Membuat tiket baru dengan judul, deskripsi, prioritas, dan lampiran gambar.
  - Melihat detail tiket, termasuk riwayat balasan.
  - Menambahkan balasan pada tiket.
  - Mengubah status tiket (untuk admin).
  - Menghapus tiket (untuk user pada tiket miliknya).
- **Antarmuka Responsif**: Desain yang dapat beradaptasi dengan baik di perangkat desktop maupun mobile.
- **Pencarian & Filter**: Kemampuan untuk mencari tiket dan memfilternya berdasarkan status atau prioritas.
- **Halaman FAQ**: Halaman informatif yang dapat dicari dan dikategorikan untuk membantu pengguna.
- **Notifikasi Real-time**: Menggunakan `react-hot-toast` untuk feedback instan kepada pengguna.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: React Context API
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📂 Struktur Proyek

Struktur folder proyek ini dirancang agar mudah diskalakan dan dipelihara.

```

/src
├── assets/ # Aset statis seperti gambar dan SVG
├── components/ # Komponen UI yang dapat digunakan kembali
│ ├── Auth/
│ ├── common/
│ ├── FAQ/
│ ├── Navigation/
│ └── Tickets/
├── context/ # React Context untuk state global (misal: AuthContext)
├── data/ # Data statis atau mock data (misal: faqData)
├── hooks/ # Custom hooks untuk logika yang dapat digunakan kembali
├── pages/ # Komponen yang mewakili halaman/rute
├── services/ # Logika untuk berinteraksi dengan API eksternal
└── utils/ # Fungsi utilitas pembantu

````

## 🚀 Memulai Proyek

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

### Prasyarat

- [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/your-username/tixtrack-fe.git
    cd tixtrack-fe
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variable:**
    Buat file `.env` di root proyek dan tambahkan URL base API backend Anda.

    ```env
    # .env
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

4.  **Jalankan server development:**
    ```bash
    npm run dev
    # atau
    yarn dev
    ```

5.  Buka browser Anda dan navigasi ke `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

## 📜 Skrip yang Tersedia

- `npm run dev`: Menjalankan aplikasi dalam mode development.
- `npm run build`: Mem-build aplikasi untuk production ke folder `dist`.
- `npm run preview`: Menjalankan aplikasi yang sudah di-build secara lokal.

---

© 2025 TixTrack
````
