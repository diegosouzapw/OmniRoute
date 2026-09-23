# Developer environment notes (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Halaman ini menerangkan tingkah laku `.env` setempat projek dan cara mengendalikan fail persekitaran serta rahsia semasa membangunkan OmniRoute.

## Tingkah laku postinstall .env

Projek mungkin menjana fail `.env` setempat semasa `npm install` / `postinstall` untuk kemudahan pembangun. Fail ini hanya bertujuan untuk pembangunan dan pengujian setempat dan tidak boleh sekali-kali dikomit kepada kawalan versi.

Perkara utama:

- `.gitignore` repositori sudah mengabaikan fail `.env*` (lihat entri `.gitignore`). Jangan alih keluar atau ubah peraturan tersebut melainkan anda sengaja mahu mengomit fail contoh tertentu dan mempunyai proses yang didokumenkan untuknya.
- Jika rahsia sebenar terkomit secara tidak sengaja kepada repo, tukar/batalkan kelayakan tersebut dengan segera dan alih keluarnya daripada sejarah repositori (contohnya, menggunakan `git filter-repo` atau aliran kerja pemulihan yang setara). Hubungi pemilik keselamatan/hubungan jika anda memerlukan bantuan.
- Untuk CI dan pengeluaran, gunakan rahsia CI atau pengurus rahsia (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, dsb.) dan bukannya mengomit rahsia ke dalam fail.

## Aliran kerja setempat yang disyorkan

- Simpan `.env` dalam ruang kerja setempat anda sahaja. Gunakan `.env.example` (sudah dijejaki) untuk mendokumenkan pemboleh ubah yang diperlukan dan nilai contoh yang boleh diterima.
- Apabila menjalankan ujian secara setempat yang memerlukan nilai seakan rahsia, utamakan nilai ruang letak sintetik atau kunci sementara yang dijana semasa masa jalan dan bukannya kelayakan sebenar.
- Tambahkan komen ringkas dalam ujian yang menggunakan nilai ruang letak supaya penyemak memahami bahawa lekapan tersebut adalah sintetik.

## Catatan pengimbas

- Sesetengah aset terkompil atau binari (cth., blob WASM base64 terbenam) boleh mengandungi subrentetan ASCII yang kelihatan seperti kelayakan dan mungkin mencetuskan pengimbas rahsia berasaskan teks. Jika aset ini sah, sama ada tandakannya dalam senarai dibenarkan pengimbas atau kecualikan direktori tersebut dalam konfigurasi pengimbas.

## Jika anda menemui kebocoran

1. Tukar/batalkan kunci tersebut dengan segera.
2. Alih keluar rahsia daripada sejarah dan lakukan push paksa pada cabang yang telah dibersihkan jika perlu.
3. Maklumkan kepada penyelenggara dan ikuti senarai semak tindak balas insiden organisasi anda.
