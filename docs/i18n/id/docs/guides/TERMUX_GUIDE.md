# Termux Headless Setup (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute dapat dijalankan sebagai server headless di Android melalui Termux. Aplikasi desktop Electron tidak didukung di Termux, tetapi dasbor web dan API yang kompatibel dengan OpenAI dapat diakses dari browser lokal atau dari perangkat lain di jaringan yang sama.

## Prasyarat

Instal Termux dari F-Droid atau rilis GitHub, lalu perbarui paket dan instal alat build yang diperlukan oleh dependensi native seperti `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versi Node.js:** OmniRoute memerlukan Node `>=22.22.2 <23 || >=24.0.0 <27` (sesuai dengan `engines` di `package.json` / `SUPPORTED_NODE_RANGE`). `nodejs-lts` milik Termux biasanya menyediakan Node 20 LTS, yang **sudah tidak didukung** — instal `pkg install nodejs` (versi saat ini) sebagai gantinya dan pastikan `node --version` menampilkan versi 22.x/24.x+.

Jika kompilasi paket native gagal, jalankan ulang perintah `pkg install` di atas, lalu coba kembali menginstal OmniRoute.

## Instalasi

Jalankan paket terbaru yang telah dipublikasikan secara langsung:

```bash
npx -y omniroute@latest
```

Anda juga dapat menginstalnya secara global:

```bash
npm install -g omniroute
omniroute
```

## Menjalankan

Mulai OmniRoute dalam mode server headless:

```bash
omniroute
```

atau:

```bash
npx omniroute
```

Dasbor tersedia di:

```text
http://localhost:20128
```

Buka URL tersebut di browser Android. Jika Anda menjalankan klien di dalam Termux, gunakan host dan port yang sama sebagai URL dasar yang kompatibel dengan OpenAI.

## Eksekusi di Latar Belakang

Untuk proses latar belakang sederhana:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Untuk menghentikannya:

```bash
pkill -f omniroute
```

Untuk memulai secara otomatis setelah perangkat dinyalakan, instal add-on Termux:Boot dan buat skrip boot:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Pengoptimalan baterai Android dapat menghentikan proses latar belakang yang berjalan lama. Nonaktifkan pengoptimalan baterai untuk Termux jika server diharapkan tetap online.

## Akses dari Perangkat Lain

Temukan alamat IP ponsel di jaringan WiFi:

```bash
ip addr show wlan0
```

Kemudian buka dasbor dari perangkat lain:

```text
http://PHONE_IP:20128
```

Contoh:

```text
http://192.168.1.50:20128
```

Pastikan ponsel dan klien berada di jaringan tepercaya yang sama. Jika Anda mengekspos OmniRoute ke luar ponsel, aktifkan kunci API dan autentikasi dasbor.

## Direktori Data

Secara default, OmniRoute menyimpan data di bawah direktori home Termux, mengikuti perilaku jalur data sisi server yang sama seperti di Linux. Untuk menempatkan basis data di lokasi tertentu:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Keterbatasan

- Electron tidak berjalan di Termux.
- Tidak ada baki sistem atau integrasi desktop.
- Penyiapan ini hanya untuk server: gunakan dasbor browser.
- Dependensi native mungkin perlu dikompilasi secara lokal.
- Perangkat Android dengan memori rendah mungkin memerlukan lebih sedikit permintaan serentak.
- Fitur sertifikat MITM/sistem mungkin memerlukan konfigurasi trust store tingkat Android di luar Termux.

## Pemecahan Masalah

### Platform tidak didukung: android (setiap permintaan menghasilkan HTTP 500)

**Gejala:** `omniroute` / `omniroute serve` menampilkan `✔ OmniRoute is running!`, tetapi setiap permintaan dasbor atau API menghasilkan respons polos `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` tetap kosong, `APP_LOG_LEVEL=debug` tidak menampilkan informasi yang berguna, dan isi respons berupa teks biasa (`Internal Server Error`) tanpa detail JSON.

**Penyebab:** Beberapa build Termux/Node melaporkan `process.platform === "android"`. `getCacheDirectory()` milik Next.js tidak menangani platform tersebut: fungsi ini mengharuskan `~/.cache` (atau direktori tmp generik) _sudah_ ada, jika tidak, proses akan gagal saat memuat hook instrumentasi dengan pesan:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Karena hook tidak pernah dimuat, pencatatan log tidak pernah dimulai — kesalahan 500 tampak sepenuhnya tidak dapat didiagnosis. OmniRoute membuat `~/.cache` (dan menetapkan `XDG_CACHE_HOME` jika belum ditetapkan) di entrypoint CLI sebelum Next.js dimulai agar pemeriksaan ini berhasil di Android/Termux.

**Solusi yang didukung (tanpa menambal paket):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Pada build OmniRoute saat ini, CLI melakukan hal ini secara otomatis di Android/Termux — instalasi baru melalui `npx -y omniroute@latest` / instalasi global seharusnya tidak memerlukan langkah manual tersebut. Jika Anda masih melihat kesalahan setelah melakukan peningkatan versi, buat `~/.cache` satu kali seperti di atas, lalu mulai ulang.

**Jangan** menambal `dist/server.js` untuk memaksa `process.platform = "linux"`. Tambalan paket semacam itu akan ditimpa pada setiap instalasi ulang/peningkatan versi dan tidak diperlukan setelah direktori cache tersedia.

### Kesalahan Build better-sqlite3

Instal toolchain build Termux:

```bash
pkg install nodejs python build-essential
```

Kemudian jalankan ulang:

```bash
npx -y omniroute@latest
```

### Port Sudah Digunakan

Periksa proses yang sedang mendengarkan di port default:

```bash
ss -ltnp | grep 20128
```

Hentikan proses lama:

```bash
pkill -f omniroute
```

### Dasbor Tidak Dapat Diakses dari Perangkat Lain

Pastikan kedua perangkat berada di jaringan WiFi yang sama, lalu lakukan pengujian dari Termux:

```bash
curl http://localhost:20128
```

Jika akses lokal berfungsi tetapi akses LAN tidak, periksa isolasi hotspot/WiFi Android serta profil firewall atau VPN apa pun di ponsel.
