# Termux Headless Setup (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute boleh dijalankan sebagai pelayan tanpa antara muka grafik pada Android melalui Termux. Aplikasi desktop Electron tidak disokong dalam Termux, tetapi papan pemuka web dan API yang serasi dengan OpenAI boleh digunakan daripada pelayar setempat atau daripada peranti lain pada rangkaian yang sama.

## Prasyarat

Pasang Termux daripada F-Droid atau keluaran GitHub, kemudian kemas kini pakej dan pasang alat binaan yang diperlukan oleh kebergantungan natif seperti `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versi Node.js:** OmniRoute memerlukan Node `>=22.22.2 <23 || >=24.0.0 <27` (sepadan dengan `engines` dalam `package.json` / `SUPPORTED_NODE_RANGE`). `nodejs-lts` Termux biasanya menyediakan Node 20 LTS, yang **tidak lagi disokong** — sebaliknya, pasang `pkg install nodejs` (semasa) dan sahkan bahawa `node --version` melaporkan versi dalam siri 22.x/24.x+.

Jika kompilasi pakej natif gagal, jalankan semula perintah `pkg install` di atas dan kemudian cuba semula pemasangan OmniRoute.

## Pemasangan

Jalankan terus pakej terbaharu yang telah diterbitkan:

```bash
npx -y omniroute@latest
```

Anda juga boleh memasangnya secara global:

```bash
npm install -g omniroute
omniroute
```

## Menjalankan

Mulakan OmniRoute dalam mod pelayan tanpa antara muka grafik:

```bash
omniroute
```

atau:

```bash
npx omniroute
```

Papan pemuka tersedia pada:

```text
http://localhost:20128
```

Buka URL tersebut dalam pelayar Android. Jika anda menjalankan klien dalam Termux, gunakan hos dan port yang sama sebagai URL asas yang serasi dengan OpenAI.

## Pelaksanaan Latar Belakang

Untuk proses latar belakang yang ringkas:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Untuk menghentikannya:

```bash
pkill -f omniroute
```

Untuk permulaan automatik selepas peranti dibut, pasang tambahan Termux:Boot dan cipta skrip but:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Pengoptimuman bateri Android boleh menghentikan proses latar belakang yang berjalan lama. Nyahdayakan pengoptimuman bateri untuk Termux jika pelayan dijangka kekal dalam talian.

## Akses Daripada Peranti Lain

Cari alamat IP telefon pada rangkaian WiFi:

```bash
ip addr show wlan0
```

Kemudian buka papan pemuka daripada peranti lain:

```text
http://PHONE_IP:20128
```

Contohnya:

```text
http://192.168.1.50:20128
```

Pastikan telefon dan klien berada pada rangkaian dipercayai yang sama. Jika anda mendedahkan OmniRoute di luar telefon, dayakan kunci API dan pengesahan papan pemuka.

## Direktori Data

Secara lalai, OmniRoute menyimpan data di bawah direktori utama Termux, mengikut tingkah laku laluan data sisi pelayan yang sama seperti pada Linux. Untuk meletakkan pangkalan data di lokasi yang ditetapkan secara eksplisit:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Batasan

- Electron tidak berjalan dalam Termux.
- Tiada dulang sistem atau penyepaduan desktop.
- Persediaan ini adalah untuk pelayan sahaja: gunakan papan pemuka pelayar.
- Kebergantungan natif mungkin perlu dikompil secara setempat.
- Peranti Android dengan memori rendah mungkin perlu menggunakan lebih sedikit permintaan serentak.
- Ciri sijil MITM/sistem mungkin memerlukan konfigurasi stor kepercayaan pada peringkat Android di luar Termux.

## Penyelesaian Masalah

### Platform tidak disokong: android (setiap permintaan mengembalikan HTTP 500)

**Gejala:** `omniroute` / `omniroute serve` memaparkan `✔ OmniRoute is running!`, tetapi setiap permintaan papan pemuka atau API mengembalikan `500 Internal Server Error` tanpa butiran. `~/.omniroute/logs/application/app.log` kekal kosong, `APP_LOG_LEVEL=debug` tidak memaparkan apa-apa yang berguna dan badan respons ialah teks biasa (`Internal Server Error`) tanpa butiran JSON.

**Punca:** Sesetengah binaan Termux/Node melaporkan `process.platform === "android"`. `getCacheDirectory()` Next.js tidak mengendalikan platform tersebut: ia memerlukan `~/.cache` (atau direktori tmp generik) untuk _sedia_ wujud; jika tidak, ia akan gagal ketika memuatkan cangkuk instrumentasi dengan:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Oleh sebab cangkuk tersebut tidak pernah dimuatkan, pengelogan tidak pernah bermula — ralat 500 itu kelihatan mustahil untuk didiagnosis. OmniRoute mencipta `~/.cache` (dan menetapkan `XDG_CACHE_HOME` apabila belum ditetapkan) dalam titik masuk CLI sebelum Next.js bermula supaya pemeriksaan ini berjaya pada Android/Termux.

**Penyelesaian yang disokong (tanpa menampal pakej):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Pada binaan OmniRoute semasa, CLI melakukannya secara automatik pada Android/Termux — pemasangan baharu melalui `npx -y omniroute@latest` / pemasangan global sepatutnya tidak memerlukan langkah manual tersebut. Jika anda masih melihat ralat selepas menaik taraf, cipta `~/.cache` sekali seperti di atas dan mulakan semula.

**Jangan** tampal `dist/server.js` untuk memaksa `process.platform = "linux"`. Tampalan pakej sedemikian akan ditulis ganti pada setiap pemasangan semula/naik taraf dan tidak diperlukan sebaik sahaja direktori cache wujud.

### Ralat Binaan better-sqlite3

Pasang rantaian alat binaan Termux:

```bash
pkg install nodejs python build-essential
```

Kemudian jalankan semula:

```bash
npx -y omniroute@latest
```

### Port Sudah Digunakan

Semak proses yang sedang mendengar pada port lalai:

```bash
ss -ltnp | grep 20128
```

Hentikan proses lama:

```bash
pkill -f omniroute
```

### Papan Pemuka Tidak Boleh Dicapai Daripada Peranti Lain

Sahkan kedua-dua peranti berada pada rangkaian WiFi yang sama, kemudian uji daripada Termux:

```bash
curl http://localhost:20128
```

Jika akses setempat berfungsi tetapi akses LAN tidak berfungsi, semak pengasingan hotspot/WiFi Android dan sebarang tembok api atau profil VPN pada telefon.
