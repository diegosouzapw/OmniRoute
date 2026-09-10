# Daftar Periksa Rilis (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

Gunakan daftar periksa ini sebelum memberi tag atau menerbitkan rilis OmniRoute baru.

## Versi dan Changelog

1. Naikkan versi `package.json` (`x.y.z`) di cabang rilis.
2. Pindahkan catatan rilis dari `## [Unreleased]` di `CHANGELOG.md` ke bagian bertanggal:
   - `## [x.y.z] — YYYY-MM-DD`
3. Pertahankan `## [Unreleased]` sebagai bagian changelog pertama untuk pekerjaan mendatang.
4. Pastikan bagian semver terbaru di `CHANGELOG.md` sama dengan versi `package.json`.

## Dokumentasi API

1. Perbarui `docs/reference/openapi.yaml`:
   - `info.version` harus sama dengan versi `package.json`.
2. Validasi contoh endpoint jika kontrak API berubah.

## Dokumentasi Runtime

1. Tinjau `docs/architecture/ARCHITECTURE.md` untuk penyimpangan storage/runtime.
2. Tinjau `docs/guides/TROUBLESHOOTING.md` untuk penyimpangan variabel env dan operasional.
3. Verifikasi bahwa versi Node.js rilis/runtime masih memenuhi batas aman yang didukung:
   - `>=20.20.2 <21` atau `>=22.22.2 <23`
   - `npm run check:node-runtime`
4. Validasi artefak penerbitan npm setelah membangun paket standalone:
   - `npm run build:cli`
   - `npm run check:pack-artifact`
   - konfirmasi tidak ada `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, atau residu lokal lainnya
5. Perbarui dokumentasi terlokalisasi jika dokumentasi sumber berubah secara signifikan.

## Pemeriksaan Otomatis

Jalankan penjaga sinkronisasi secara lokal sebelum membuka PR:

```bash
npm run check:docs-sync
```

CI juga menjalankan pemeriksaan ini di `.github/workflows/ci.yml` (pekerjaan lint).
