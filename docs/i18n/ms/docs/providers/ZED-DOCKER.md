# Zed IDE Integration in Docker Environments (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Apabila OmniRoute berjalan di dalam Docker, aliran standard "Import daripada Rantai Kunci Zed" gagal
kerana bekas tidak dapat mencapai daemon rantai kunci OS hos (`libsecret` pada Linux,
Keychain pada macOS, Credential Manager pada Windows) dan direktori konfigurasi Zed pada
sistem fail hos tidak kelihatan di dalam bekas secara lalai.

## Mengapa Import Rantai Kunci Gagal dalam Docker

Dua isu penghalang berlaku di dalam bekas:

1. **Pengasingan sistem fail** — `isZedInstalled()` mencari `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), atau lokasi yang setara pada Windows. Laluan ini
   berada pada hos dan tidak tersedia melainkan dilekapkan secara eksplisit sebagai volum.
2. **Pengasingan IPC** — Walaupun direktori konfigurasi dilekapkan, modul natif `keytar`
   berkomunikasi dengan perkhidmatan rantai kunci OS melalui soket Unix atau sesi D-Bus.
   Kedua-duanya tidak dijambatani ke dalam bekas secara lalai, jadi pembacaan kelayakan sentiasa gagal.

OmniRoute mengesan persekitaran Docker melalui dua heuristik:

- Kehadiran `/.dockerenv` (ditulis oleh daemon Docker semasa bekas dimulakan).
- Rentetan `docker` muncul dalam `/proc/1/cgroup` (Linux cgroup v1).

Apabila salah satu heuristik dicetuskan, laluan import mengembalikan HTTP 422 dengan
`zedDockerEnvironment: true` dan mesej yang mengarahkan anda ke tab Import Token Manual.

## Menggunakan Tab Import Token Manual

1. Buka **Papan Pemuka → Penyedia → Zed**.
2. Panel **Import Token Manual** muncul di bawah kad import rantai kunci. Apabila
   OmniRoute mengesan Docker, panel ini dikembangkan secara automatik selepas percubaan pertama
   untuk mengimport rantai kunci gagal.
3. Pilih penyedia daripada menu lungsur (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, atau DeepSeek).
4. Tampalkan kunci API dalam medan kata laluan.
5. Klik **Import**.

Kunci tersebut disimpan sebagai sambungan penyedia baharu dengan nama
`Zed Manual Import (<provider>)`.

## Tempat Zed Menyimpan Kunci API pada Hos

Zed menyimpan kunci penyedia AI dalam rantai kunci OS di bawah nama perkhidmatan seperti
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, dan sebagainya. Untuk mendapatkannya bagi import
manual, lihat di:

**Linux**

```
~/.config/zed/settings.json
```

Bahagian `language_models` mengandungi konfigurasi penyedia. Kunci yang disimpan ke
rantai kunci melalui UI Zed tidak berada dalam bentuk teks biasa dalam `settings.json`; dapatkannya melalui
pemapar rantai kunci seperti GNOME Keyring / Seahorse, atau dengan menjalankan:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Entri rantai kunci boleh ditemukan dalam **Keychain Access.app** dengan mencari `zed`.

## Pilihan Lekapan Volum (Lanjutan)

Anda boleh memilih untuk melekapkan direktori konfigurasi Zed secara baca sahaja ke dalam bekas.
Ini tidak menyelesaikan isu rantai kunci tetapi mungkin berguna untuk ciri pada masa hadapan yang membaca
nilai konfigurasi Zed bukan rahsia (contohnya, keutamaan model).

```yaml
# Petikan docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Hos Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Hos macOS (nyahkomen sebagai gantinya)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Masa hadapan: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nota: penggantian melalui pemboleh ubah persekitaran `ZED_CONFIG_PATH` belum dilaksanakan. Petikan ini
disediakan sebagai rujukan apabila ciri tersebut ditambahkan.

## API Import Manual

Titik akhir import manual juga boleh dipanggil secara terus:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Kunci OpenAI Zed saya"   // pilihan
}
```

Apabila berjaya, ia mengembalikan:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Penyelesaian Masalah

| Gejala                                         | Punca                           | Penyelesaian                          |
| ---------------------------------------------- | ------------------------------- | ------------------------------------- |
| 422 + `zedDockerEnvironment: true`             | Berjalan di dalam Docker        | Gunakan tab Import Token Manual       |
| 404 + `zedInstalled: false`                    | Zed tidak dipasang pada hos     | Pasang Zed atau gunakan import manual |
| 403 + akses rantai kunci dinafikan             | OS menafikan akses rantai kunci | Berikan kebenaran dalam gesaan OS     |
| 404 + perkhidmatan rantai kunci tidak tersedia | `libsecret` tiada pada Linux    | Pasang `libsecret-1-dev`              |
