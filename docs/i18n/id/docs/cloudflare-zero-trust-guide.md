# Panduan Lengkap: Cloudflare Tunnel & Zero Trust (Split-Port) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/cloudflare-zero-trust-guide.md) · 🇪🇸 [es](../../es/docs/cloudflare-zero-trust-guide.md) · 🇫🇷 [fr](../../fr/docs/cloudflare-zero-trust-guide.md) · 🇩🇪 [de](../../de/docs/cloudflare-zero-trust-guide.md) · 🇮🇹 [it](../../it/docs/cloudflare-zero-trust-guide.md) · 🇷🇺 [ru](../../ru/docs/cloudflare-zero-trust-guide.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/cloudflare-zero-trust-guide.md) · 🇯🇵 [ja](../../ja/docs/cloudflare-zero-trust-guide.md) · 🇰🇷 [ko](../../ko/docs/cloudflare-zero-trust-guide.md) · 🇸🇦 [ar](../../ar/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [hi](../../hi/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [in](../../in/docs/cloudflare-zero-trust-guide.md) · 🇹🇭 [th](../../th/docs/cloudflare-zero-trust-guide.md) · 🇻🇳 [vi](../../vi/docs/cloudflare-zero-trust-guide.md) · 🇮🇩 [id](../../id/docs/cloudflare-zero-trust-guide.md) · 🇲🇾 [ms](../../ms/docs/cloudflare-zero-trust-guide.md) · 🇳🇱 [nl](../../nl/docs/cloudflare-zero-trust-guide.md) · 🇵🇱 [pl](../../pl/docs/cloudflare-zero-trust-guide.md) · 🇸🇪 [sv](../../sv/docs/cloudflare-zero-trust-guide.md) · 🇳🇴 [no](../../no/docs/cloudflare-zero-trust-guide.md) · 🇩🇰 [da](../../da/docs/cloudflare-zero-trust-guide.md) · 🇫🇮 [fi](../../fi/docs/cloudflare-zero-trust-guide.md) · 🇵🇹 [pt](../../pt/docs/cloudflare-zero-trust-guide.md) · 🇷🇴 [ro](../../ro/docs/cloudflare-zero-trust-guide.md) · 🇭🇺 [hu](../../hu/docs/cloudflare-zero-trust-guide.md) · 🇧🇬 [bg](../../bg/docs/cloudflare-zero-trust-guide.md) · 🇸🇰 [sk](../../sk/docs/cloudflare-zero-trust-guide.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/cloudflare-zero-trust-guide.md) · 🇮🇱 [he](../../he/docs/cloudflare-zero-trust-guide.md) · 🇵🇭 [phi](../../phi/docs/cloudflare-zero-trust-guide.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/cloudflare-zero-trust-guide.md) · 🇨🇿 [cs](../../cs/docs/cloudflare-zero-trust-guide.md) · 🇹🇷 [tr](../../tr/docs/cloudflare-zero-trust-guide.md)

---

Panduan ini mendokumentasikan standar infrastruktur jaringan terbaik untuk mengamankan **OmniRoute** dan mengekspos aplikasi Anda ke internet secara aman, **tanpa membuka satu pun port (Zero Inbound)**.

## Apa yang Telah Dilakukan pada VM Anda?

Kami mengaktifkan OmniRoute dalam mode **Split-Port** melalui PM2:

- **Port \`20128\`:** Menjalankan **hanya API** `/v1`.
- **Port \`20129\`:** Menjalankan **hanya Dashboard** Administratif visual.

Selain itu, layanan internal memerlukan `REQUIRE_API_KEY=true`, yang berarti tidak ada agen yang dapat menggunakan endpoint API tanpa mengirimkan "Bearer Token" yang sah yang dihasilkan dari tab API Keys di Panel.

Hal ini memungkinkan kita membuat dua aturan yang sepenuhnya independen di jaringan. Di sinilah peran **Cloudflare Tunnel (cloudflared)**.

---

## 1. Cara Membuat Terowongan di Cloudflare

Utilitas `cloudflared` sudah terpasang di mesin Anda. Ikuti langkah-langkah berikut di cloud:

1. Akses panel **Cloudflare Zero Trust** Anda (One.dash.cloudflare.com).
2. Di menu sebelah kiri, pergi ke **Networks > Tunnels**.
3. Klik **Add a Tunnel**, pilih **Cloudflared**, dan beri nama `OmniRoute-VM`.
4. Sistem akan menghasilkan perintah di layar bernama "Install and run a connector". **Anda hanya perlu menyalin Token (string panjang setelah `--token`)**.
5. Masuk melalui SSH ke mesin virtual Anda (atau Terminal Proxmox) dan jalankan:
   \`\`\`bash
   # Memulai dan mengikat terowongan secara permanen ke akun Anda
   cloudflared service install TOKEN_PANJANG_ANDA_DI_SINI
   \`\`\`

---

## 2. Mengonfigurasi Perutean (Public Hostnames)

Masih di layar Tunnel yang baru dibuat, buka tab **Public Hostnames** dan tambahkan **dua** rute, memanfaatkan pemisahan yang telah kita lakukan:

### Rute 1: API Aman (Terbatas)

- **Subdomain:** `api`
- **Domain:** `domainanda.com` (pilih domain nyata Anda)
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20128` _(Port internal API)_

### Rute 2: Panel Zero Trust (Tertutup)

- **Subdomain:** `omniroute` atau `panel`
- **Domain:** `domainanda.com`
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20129` _(Port internal App/Visual)_

Pada titik ini, konektivitas "fisik" telah terselesaikan. Sekarang kita akan benar-benar mengamankannya.

---

## 3. Mengamankan Panel dengan Zero Trust (Access)

Tidak ada kata sandi lokal yang lebih baik dalam melindungi panel Anda selain menghapus sepenuhnya akses ke panel tersebut dari internet terbuka.

1. Di panel Zero Trust, buka **Access > Applications > Add an application**.
2. Pilih **Self-hosted**.
3. Di **Application name**, masukkan `Panel OmniRoute`.
4. Di **Application domain**, masukkan `omniroute.domainanda.com` (sama dengan yang Anda buat di "Rute 2").
5. Klik **Next**.
6. Di **Rule action**, pilih `Allow`. Beri nama Rule `Admin Saja`.
7. Di **Include**, pada selektor "Selector" pilih `Emails` dan masukkan email Anda, misalnya `admin@domainanda.com`.
8. Simpan (`Add application`).

> **Apa yang terjadi:** Jika Anda mencoba membuka `omniroute.domainanda.com`, Anda tidak akan langsung masuk ke aplikasi OmniRoute! Anda akan disambut halaman Cloudflare yang meminta Anda memasukkan email. Hanya jika email yang Anda masukkan cocok, Anda akan menerima kode sementara 6 digit melalui Outlook/Gmail yang membuka akses ke terowongan menuju port `20129`.

---

## 4. Membatasi dan Melindungi API dengan Rate Limit (WAF)

Dashboard Zero Trust tidak berlaku untuk rute API (`api.domainanda.com`), karena ini adalah akses terprogram melalui alat otomatis (agen) tanpa browser. Untuk ini, kita akan menggunakan Firewall utama (WAF) Cloudflare.

1. Akses **Panel Normal** Cloudflare (dash.cloudflare.com) dan masuk ke Domain Anda.
2. Di menu sebelah kiri, buka **Security > WAF > Rate limiting rules**.
3. Klik **Create rule**.
4. **Name:** `Anti-Penyalahgunaan OmniRoute API`
5. **If incoming requests match...**
   - Pilih di Field: `Hostname`
   - Operator: `equals`
   - Value: `api.domainanda.com`
6. Di **With the same characteristics:** Pertahankan `IP`.
7. Pada batas (Limit):
   - **When requests exceed:** `50`
   - **Period:** `1 minute`
8. Di bagian bawah, pada **Action**: `Block` (Blokir) dan tentukan apakah pemblokiran berlangsung 1 menit atau 1 jam.
9. **Deploy**.

> **Apa yang terjadi:** Tidak ada yang dapat mengirim lebih dari 50 permintaan dalam periode 60 detik ke URL API Anda. Karena Anda menjalankan beberapa agen dan konsumsi di belakangnya sudah mencapai batas laju serta melacak token, ini hanyalah langkah pengamanan di lapisan tepi internet (Edge Layer) yang melindungi instans On-Premises Anda dari kelebihan beban bahkan sebelum trafik melewati terowongan.

---

## Penutup

1. VM Anda **tidak memiliki port yang terbuka** di `/etc/ufw`.
2. OmniRoute hanya berkomunikasi melalui HTTPS keluar (`cloudflared`) dan tidak menerima koneksi TCP langsung dari internet.
3. Permintaan Anda ke OpenAI disamarkan karena dikonfigurasi secara global untuk melewati Proxy SOCKS5 (cloud tidak peduli dengan SOCKS5 karena trafik datang secara Inbound).
4. Panel web Anda memiliki autentikasi 2 faktor melalui Email.
5. API Anda dibatasi lajunya di tepi jaringan oleh Cloudflare dan hanya menerima lalu lintas Bearer Token.
