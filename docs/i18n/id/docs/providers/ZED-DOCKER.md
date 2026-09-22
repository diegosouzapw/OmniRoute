# Zed IDE Integration in Docker Environments (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Saat OmniRoute berjalan di dalam Docker, alur standar "Impor dari Zed Keychain" gagal
karena kontainer tidak dapat mengakses daemon keychain OS host (libsecret di Linux,
Keychain di macOS, Credential Manager di Windows), dan direktori konfigurasi Zed pada
sistem berkas host secara default tidak terlihat dari dalam kontainer.

## Mengapa Impor Keychain Gagal di Docker

Dua masalah penghambat terjadi di dalam kontainer:

1. **Isolasi sistem berkas** — `isZedInstalled()` mencari `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), atau lokasi yang setara di Windows. Lokasi ini
   berada di host dan tidak tersedia kecuali dipasang secara eksplisit sebagai volume.
2. **Isolasi IPC** — Bahkan saat direktori konfigurasi dipasang, modul native `keytar`
   berkomunikasi dengan layanan keychain OS melalui soket Unix atau sesi D-Bus.
   Keduanya tidak diteruskan ke dalam kontainer secara default, sehingga pembacaan kredensial
   selalu gagal.

OmniRoute mendeteksi lingkungan Docker melalui dua heuristik:

- Keberadaan `/.dockerenv` (ditulis oleh daemon Docker saat kontainer dimulai).
- Kemunculan string `docker` dalam `/proc/1/cgroup` (Linux cgroup v1).

Saat salah satu heuristik terpicu, rute impor mengembalikan HTTP 422 dengan
`zedDockerEnvironment: true` dan pesan yang mengarahkan Anda ke tab Impor Token Manual.

## Menggunakan Tab Impor Token Manual

1. Buka **Dasbor → Penyedia → Zed**.
2. Panel **Impor Token Manual** muncul di bawah kartu impor keychain. Saat
   OmniRoute mendeteksi Docker, panel ini otomatis terbuka setelah upaya pertama
   untuk mengimpor keychain gagal.
3. Pilih penyedia dari menu tarik-turun (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, atau DeepSeek).
4. Tempelkan kunci API ke kolom kata sandi.
5. Klik **Impor**.

Kunci disimpan sebagai koneksi penyedia baru dengan nama
`Zed Manual Import (<provider>)`.

## Lokasi Zed Menyimpan Kunci API di Host

Zed menyimpan kunci penyedia AI dalam keychain OS menggunakan nama layanan seperti
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, dan sebagainya. Untuk mengambilnya guna
diimpor secara manual, lihat di:

**Linux**

```
~/.config/zed/settings.json
```

Bagian `language_models` berisi konfigurasi penyedia. Kunci yang disimpan ke
keychain melalui UI Zed tidak tersedia sebagai teks biasa dalam `settings.json`; ambil kunci tersebut
melalui penampil keychain seperti GNOME Keyring / Seahorse, atau dengan menjalankan:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Entri keychain dapat ditemukan di **Keychain Access.app** dengan mencari `zed`.

## Opsi Pemasangan Volume (Lanjutan)

Anda dapat secara opsional memasang direktori konfigurasi Zed ke dalam kontainer sebagai hanya-baca.
Hal ini tidak mengatasi masalah keychain, tetapi mungkin berguna untuk fitur mendatang yang membaca
nilai konfigurasi Zed yang bukan rahasia (misalnya, preferensi model).

```yaml
# Cuplikan docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (hapus komentar pada baris ini sebagai gantinya)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Mendatang: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Catatan: penggantian melalui variabel lingkungan `ZED_CONFIG_PATH` belum diimplementasikan.
Cuplikan ini disediakan sebagai referensi saat fitur tersebut ditambahkan.

## API Impor Manual

Endpoint impor manual juga dapat dipanggil secara langsung:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // opsional
}
```

Jika berhasil, endpoint tersebut mengembalikan:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Pemecahan Masalah

| Gejala                                | Penyebab                       | Solusi                               |
| ------------------------------------- | ------------------------------ | ------------------------------------ |
| 422 + `zedDockerEnvironment: true`    | Berjalan di dalam Docker       | Gunakan tab Impor Token Manual       |
| 404 + `zedInstalled: false`           | Zed tidak terinstal di host    | Instal Zed atau gunakan impor manual |
| 403 + akses keychain ditolak          | OS menolak akses keychain      | Berikan izin pada prompt OS          |
| 404 + layanan keychain tidak tersedia | `libsecret` tidak ada di Linux | Instal `libsecret-1-dev`             |
