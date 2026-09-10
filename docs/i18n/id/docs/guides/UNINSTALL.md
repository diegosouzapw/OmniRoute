# OmniRoute — Panduan Mencopot Pemasangan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/UNINSTALL.md) · 🇸🇦 [ar](../../../ar/docs/guides/UNINSTALL.md) · 🇦🇿 [az](../../../az/docs/guides/UNINSTALL.md) · 🇧🇬 [bg](../../../bg/docs/guides/UNINSTALL.md) · 🇧🇩 [bn](../../../bn/docs/guides/UNINSTALL.md) · 🇨🇿 [cs](../../../cs/docs/guides/UNINSTALL.md) · 🇩🇰 [da](../../../da/docs/guides/UNINSTALL.md) · 🇩🇪 [de](../../../de/docs/guides/UNINSTALL.md) · 🇪🇸 [es](../../../es/docs/guides/UNINSTALL.md) · 🇮🇷 [fa](../../../fa/docs/guides/UNINSTALL.md) · 🇫🇮 [fi](../../../fi/docs/guides/UNINSTALL.md) · 🇫🇷 [fr](../../../fr/docs/guides/UNINSTALL.md) · 🇮🇳 [gu](../../../gu/docs/guides/UNINSTALL.md) · 🇮🇱 [he](../../../he/docs/guides/UNINSTALL.md) · 🇮🇳 [hi](../../../hi/docs/guides/UNINSTALL.md) · 🇭🇺 [hu](../../../hu/docs/guides/UNINSTALL.md) · 🇮🇹 [it](../../../it/docs/guides/UNINSTALL.md) · 🇯🇵 [ja](../../../ja/docs/guides/UNINSTALL.md) · 🇰🇷 [ko](../../../ko/docs/guides/UNINSTALL.md) · 🇮🇳 [mr](../../../mr/docs/guides/UNINSTALL.md) · 🇲🇾 [ms](../../../ms/docs/guides/UNINSTALL.md) · 🇳🇱 [nl](../../../nl/docs/guides/UNINSTALL.md) · 🇳🇴 [no](../../../no/docs/guides/UNINSTALL.md) · 🇵🇭 [phi](../../../phi/docs/guides/UNINSTALL.md) · 🇵🇱 [pl](../../../pl/docs/guides/UNINSTALL.md) · 🇵🇹 [pt](../../../pt/docs/guides/UNINSTALL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/UNINSTALL.md) · 🇷🇴 [ro](../../../ro/docs/guides/UNINSTALL.md) · 🇷🇺 [ru](../../../ru/docs/guides/UNINSTALL.md) · 🇸🇰 [sk](../../../sk/docs/guides/UNINSTALL.md) · 🇸🇪 [sv](../../../sv/docs/guides/UNINSTALL.md) · 🇰🇪 [sw](../../../sw/docs/guides/UNINSTALL.md) · 🇮🇳 [ta](../../../ta/docs/guides/UNINSTALL.md) · 🇮🇳 [te](../../../te/docs/guides/UNINSTALL.md) · 🇹🇭 [th](../../../th/docs/guides/UNINSTALL.md) · 🇹🇷 [tr](../../../tr/docs/guides/UNINSTALL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/UNINSTALL.md) · 🇵🇰 [ur](../../../ur/docs/guides/UNINSTALL.md) · 🇻🇳 [vi](../../../vi/docs/guides/UNINSTALL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/UNINSTALL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/UNINSTALL.md)

---

Panduan ini menjelaskan cara mencopot pemasangan OmniRoute dari sistem Anda secara bersih.

---

## Mencopot Pemasangan dengan Cepat (v3.6.2+)

OmniRoute menyediakan dua skrip bawaan untuk penghapusan yang bersih:

### Pertahankan Data Anda

```bash
npm run uninstall
```

Perintah ini menghapus aplikasi OmniRoute tetapi **mempertahankan** basis data, konfigurasi, kunci API, dan pengaturan penyedia Anda di `~/.omniroute/`. Gunakan ini jika Anda berencana memasang ulang nanti dan ingin menyimpan pengaturan yang ada.

### Penghapusan Penuh

```bash
npm run uninstall:full
```

Perintah ini menghapus aplikasi **dan menghapus secara permanen** semua data:

- Basis data (`storage.sqlite`)
- Konfigurasi penyedia dan kunci API
- Berkas cadangan
- Berkas log
- Semua berkas di direktori `~/.omniroute/`

> ⚠️ **Peringatan:** `npm run uninstall:full` tidak dapat dibatalkan. Semua koneksi penyedia, combo, kunci API, dan riwayat penggunaan Anda akan dihapus secara permanen.

---

## Mencopot Pemasangan Secara Manual

### Instalasi Global NPM

```bash
# Remove the global package
npm uninstall -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### Instalasi Global pnpm

```bash
pnpm uninstall -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# Stop and remove the container
docker stop omniroute
docker rm omniroute

# Remove the volume (deletes all data)
docker volume rm omniroute-data

# (Optional) Remove the image
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# Stop and remove containers
docker compose down

# Also remove volumes (deletes all data)
docker compose down -v
```

### Aplikasi Desktop Electron

**Windows:**

- Buka `Settings → Apps → OmniRoute → Uninstall`
- Atau jalankan uninstaller NSIS dari direktori instalasi

**macOS:**

- Seret `OmniRoute.app` dari `/Applications` ke Trash
- Hapus data: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Hapus berkas AppImage
- Hapus data: `rm -rf ~/.omniroute`

### Instalasi dari Sumber (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Direktori Data

OmniRoute menyimpan data di lokasi-lokasi berikut secara default:

| Platform      | Jalur Default                 | Pengganti                 |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Berkas di dalam direktori data

| Berkas/Direktori     | Deskripsi                                             |
| -------------------- | ----------------------------------------------------- |
| `storage.sqlite`     | Basis data utama (penyedia, combo, pengaturan, kunci) |
| `storage.sqlite-wal` | Write-ahead log SQLite (sementara)                    |
| `storage.sqlite-shm` | Shared memory SQLite (sementara)                      |
| `call_logs/`         | Arsip payload permintaan                              |
| `backups/`           | Cadangan basis data otomatis                          |
| `log.txt`            | Log permintaan lama (opsional)                        |

---

## Verifikasi Penghapusan Lengkap

Setelah mencopot pemasangan, verifikasi bahwa tidak ada berkas yang tersisa:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

Jika ada proses yang masih berjalan, hentikan dengan perintah berikut:

```bash
pkill -f omniroute
```
