# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Panduan ini mendokumentasikan standar emas infrastruktur jaringan untuk melindungi**OmniRoute**dan mengekspos aplikasi Anda ke internet dengan aman,**tanpa membuka port apa pun (Zero Inbound)**.## What was done on your VM?

Kami mengaktifkan OmniRoute dalam mode**Split-Port**melalui PM2:

-**Port `20128`:**Menjalankan**hanya API**`/v1`. -**Port `20129`:**Berjalan**hanya Dasbor Administratif**.

Selain itu, layanan internal memerlukan `REQUIRE_API_KEY=true`, yang berarti tidak ada agen yang dapat menggunakan titik akhir API tanpa mengirimkan "Token Pembawa" sah yang dihasilkan di tab Kunci API Dasbor.

Hal ini memungkinkan kita membuat dua aturan jaringan yang sepenuhnya independen. Di sinilah**Terowongan Cloudflare (cloudflared)**berperan.---

## 1. How to Create the Tunnel in Cloudflare

Utilitas `cloudflared` sudah terinstal di mesin Anda. Ikuti langkah-langkah berikut di cloud:

1. Akses dasbor**Cloudflare Zero Trust**Anda (one.dash.cloudflare.com).
2. Di menu sebelah kiri, buka**Jaringan > Terowongan**.
3. Klik**Tambahkan Terowongan**, pilih**Cloudflared**, dan beri nama `OmniRoute-VM`.
4. Ini akan menghasilkan perintah di layar yang disebut "Instal dan jalankan konektor".**Anda hanya perlu menyalin Token (string panjang setelah `--token`)**.
5. Masuk melalui SSH ke mesin virtual Anda (atau Terminal Proxmox) dan jalankan: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Masih di layar Tunnel yang baru dibuat, buka tab**Public Hostnames**dan tambahkan**dua**rute, dengan memanfaatkan pemisahan yang kami buat:### Route 1: Secure API (Limited)

-**Subdomain:**`api` -**Domain:**`yourglobal.com` (pilih domain asli Anda) -**Jenis Layanan:**`HTTP` -**URL:**`127.0.0.1:20128` _(Port API internal)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomain:**`omniroute` atau `panel` -**Domain:**`yourglobal.com` -**Jenis Layanan:**`HTTP` -**URL:**`127.0.0.1:20129` _(Aplikasi Internal/port Visual)_

Pada titik ini, konektivitas "Fisik" teratasi. Sekarang mari kita lindungi itu.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Tidak ada kata sandi lokal yang melindungi dasbor Anda lebih baik daripada menghapus akses sepenuhnya dari internet terbuka.

1. Di dasbor Zero Trust, buka**Akses > Aplikasi > Tambahkan aplikasi**.
2. Pilih**Dihosting sendiri**.
3. Di**Nama aplikasi**, masukkan `Panel OmniRoute`.
4. Di**Domain aplikasi**, masukkan `omniroute.yourglobal.com` (Sama dengan yang Anda gunakan di "Rute 2").
5. Klik**Berikutnya**.
6. Di**Tindakan aturan**, pilih `Izinkan`. Untuk nama Aturan, masukkan `Hanya Admin`.
7. Di**Sertakan**, di bawah tarik-turun "Pemilih", pilih `Email` dan ketik email Anda, misalnya `admin@spgeo.com.br`.
8. Simpan (`Tambahkan aplikasi`).

> **Apa yang terjadi:**Jika Anda mencoba membuka `omniroute.yourglobal.com`, aplikasi tersebut tidak lagi masuk ke aplikasi OmniRoute Anda! Itu mendarat di layar Cloudflare yang elegan meminta Anda memasukkan email Anda. Hanya jika Anda (atau email yang Anda masukkan) mengetik di sana, Anda akan menerima kode 6 digit sementara di Outlook/Gmail yang membuka kunci terowongan ke port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard tidak berlaku untuk rute API (`api.yourglobal.com`), karena merupakan akses terprogram melalui alat otomatis (agen) tanpa browser. Untuk ini, kami akan menggunakan Firewall (WAF) utama Cloudflare.

1. Akses**Dasbor Cloudflare Normal**(dash.cloudflare.com) dan buka Domain Anda.
2. Di menu sebelah kiri, buka**Keamanan > WAF > Aturan pembatasan tarif**.
3. Klik**Buat aturan**. 4.**Nama:**`Anti-Penyalahgunaan API OmniRoute` 5.**Jika permintaan masuk cocok...**
   - Pilih Bidang: `Nama Host`
   - Operator: `sama dengan`
   - Nilai: `api.yourglobal.com`
4. Di bawah**Dengan karakteristik yang sama:**Simpan `IP`.
5. Untuk batasannya (Limit): -**Bila permintaan melebihi:**`50` -**Periode:**`1 menit`
6. Pada akhirnya, di bawah**Tindakan**: `Blokir` dan putuskan apakah pemblokiran berlangsung selama 1 menit atau 1 jam. 9.**Menerapkan**.

> **Apa dampaknya:**Tidak seorang pun dapat mengirim lebih dari 50 permintaan dalam jangka waktu 60 detik ke URL API Anda. Karena Anda menjalankan beberapa agen dan konsumsi di belakangnya sudah mencapai batas kecepatan dan melacak token, ini hanyalah ukuran di Lapisan Tepi Internet yang melindungi Instans Lokal Anda agar tidak turun karena tekanan termal bahkan sebelum lalu lintas turun ke terowongan.---

## Finalization

1. VM Anda**tidak memiliki port terbuka**di `/etc/ufw`.
2. OmniRoute hanya berkomunikasi dengan HTTPS keluar (`cloudflared`) dan tidak menerima TCP langsung dari dunia.
3. Permintaan Anda ke OpenAI dikaburkan karena kami mengonfigurasinya secara global untuk melewati Proxy SOCKS5 (Cloud tidak peduli dengan SOCKS5 karena datangnya Inbound).
4. Dasbor web Anda memiliki otentikasi 2 Faktor dengan Email.
5. API Anda dibatasi tarifnya oleh Cloudflare dan hanya memperdagangkan Token Pembawa.
