# Supply-Chain Gates (Phase 8 · Block A) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute memublikasikan artefak npm + Docker. Gerbang ini menyediakan provenans,
inventaris (SBOM), dan pemindaian CVE, semuanya OSS, yang diintegrasikan ke dalam alur kerja rilis.
Postur **utamakan-advisori** — saat ini gerbang hanya melaporkan, lalu dipromosikan menjadi pemblokir setelah
rilis hijau pertama.

| Gerbang                | Alat                                           | Lokasi                        | Memblokir?                 | Keluaran                                             |
| ---------------------- | ---------------------------------------------- | ----------------------------- | -------------------------- | ---------------------------------------------------- |
| Provenans SLSA (npm)   | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | hanya jika publikasi gagal | lencana npmjs / `npm audit signatures`               |
| SBOM npm               | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | hanya jika pembuatan gagal | Aset rilis + artefak                                 |
| SBOM image             | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | advisori                   | Artefak CycloneDX                                    |
| CVE Trivy (SARIF)      | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | advisori                   | SARIF (HIGH+CRITICAL) → tab Keamanan                 |
| Gerbang CRITICAL Trivy | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **memblokir**              | `exit-code: '1'` pada CRITICAL yang dapat diperbaiki |
| vulnCount osv          | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **memblokir**              | membatasi `metrics.vulnCount` (arah: turun)          |
| OpenSSF Scorecard      | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | advisori                   | SARIF → Keamanan + lencana                           |

Ratchet CVE image menggunakan **dua langkah** dalam `docker-publish.yml`: langkah SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) menjaga agar HIGH+CRITICAL tetap terlihat di tab Keamanan
tanpa memblokir; langkah _gerbang CRITICAL_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) menggagalkan rilis ketika terdapat CVE CRITICAL **dengan perbaikan yang tersedia**. `ignore-unfixed`
mencegah pemblokiran rilis akibat CVE pada image dasar yang belum memiliki patch upstream.

## ⚠️ Variansi CVE (gerbang pemblokir osv/Trivy)

osv dan Trivy membandingkan dependensi dengan basis data CVE yang **terus bertambah**. Sebuah PR
yang **tidak mengubah dependensi apa pun** dapat tiba-tiba menjadi merah karena CVE baru
diungkapkan pada dependensi yang sudah ada (osv: `vulnCount` terukur > baseline; Trivy: terdapat
CRITICAL baru yang dapat diperbaiki dalam image). **Ini adalah perilaku operasional YANG DIHARAPKAN dari gerbang
CVE pemblokir, bukan regresi produk.**

Ketika osv atau Trivy menjadi merah akibat CVE yang baru diungkapkan, solusinya adalah:

1. **Naikkan versi dependensi yang terdampak** (diutamakan) — tingkatkan ke versi yang telah ditambal melalui `package.json`
   `overrides` (dependensi transitif) atau bangun ulang image menggunakan image dasar yang telah ditambal.
2. **Jika belum ada perbaikan upstream:**
   - **osv:** tetapkan ulang baseline `metrics.vulnCount` dalam `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` tidak mencakup gerbang khusus — edit nilainya secara
     manual, `direction:down`) disertai catatan justifikasi + issue pelacakan.
   - **Trivy:** tambahkan entri dalam `.trivyignore` (ID CVE per baris) disertai komentar
     justifikasi + issue pelacakan. `ignore-unfixed: true` sudah secara otomatis mencakup CVE tanpa
     patch.

Kedua gerbang **dengan aman MELEWATI** (exit 0) ketika alat tidak tersedia atau pengukuran
gagal (osv-scanner tidak ada dalam PATH, osv.dev/jaringan tidak dapat dijangkau, JSON tidak valid) —
kegagalan **pengukuran** tidak pernah memblokir; hanya regresi yang **terukur** yang memblokir.

## Backlog: Advisori Scorecard → memblokir

Setelah rilis hijau pertama dengan pelaporan Scorecard:

- Scorecard: ratchet skor (membekukan skor yang terukur; tidak boleh menurun).

Melengkapi gerbang Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
mengaudit alur kerja itu sendiri; Scorecard mengukur postur repositori secara agregat.
