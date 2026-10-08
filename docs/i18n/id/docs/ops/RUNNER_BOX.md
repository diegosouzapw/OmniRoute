# Self-Hosted Runner Box Operations (.113 pool) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pool yang di-host sendiri (`self-hosted, omni-release` pada kedelapan runner; `omni-build` pada dua runner) berjalan di mesin **.113**.
Diukur pada 2026-08-28 (postmortem v3.8.50, Bagian III):

| sumber daya | nilai                                                                                                           | artinya bagi penjadwalan                                                                                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **31 GB / 32 core** (sebelumnya 16 GB saat dokumen ini pertama kali ditulis)                                    | satu `next-build` mencapai puncak **~14 GB** → 2 build berat yang berjalan bersamaan membuat mesin mencapai kapasitas maksimum, 3 membuatnya tumbang (2026-08-28 06:42Z: beban 56, dua job hilang) |
| swap        | 15 GB                                                                                                           | mesin berhasil menyelesaikan publikasi v3.8.50 dengan melakukan swap; tekanan terlihat di `/proc/pressure/memory`                                                                                  |
| `/tmp`      | **tmpfs 12 GB = RAM**                                                                                           | apa pun yang disimpan di sana menggunakan memori; sisa-sisa akan dibersihkan setelah 3 jam                                                                                                         |
| disk        | 188 GB                                                                                                          | checkout `_work` dari 8 runner mencapai ~70 GB tanpa batas                                                                                                                                         |
| runner      | **6 listener**: 4 OmniRoute (1 `omni-build` + 1 khusus `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | semuanya berbagi memori di atas; `omniroute-113-3/-4/-7/-8` dinonaktifkan (`systemctl enable --now` akan mengaktifkan kembali salah satunya)                                                       |

## Instal janitor (satu kali, pada mesin)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): setiap 30 menit, catat log ke /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` diperlukan: janitor memastikan suatu path sedang tidak digunakan melalui satu snapshot file
yang terbuka sebelum menghapusnya, dan tanpa alat ini, janitor tidak menghapus apa pun serta memberi tahu
hal tersebut (exit 1). Uji setiap perubahan dengan `--dry-run` terlebih dahulu — opsi ini mencetak secara persis tindakan yang akan
dilakukan tanpa mengubah apa pun.

Yang dilakukan pada setiap eksekusi: membersihkan sisa-sisa milik kita sendiri (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) setelah **3 jam di tmpfs** dan 24 jam di
`_work/_temp` pada disk; menghentikan `next-build` yang berumur lebih dari 75 menit (tidak ada job yang berjalan selama itu — pada
2026-08-27, satu job berjalan selama 70 menit setelah GitHub menyatakan job tersebut hilang); membersihkan
checkout berumur 48 jam dari runner yang unitnya **dihentikan**; mengirim peringatan saat penggunaan disk ≥ 85%, PSI memori
`full/avg60` ≥ 10%, dan jumlah listener melebihi `MAX_ACTIVE_RUNNERS` (dengan perincian
omniroute/lainnya). Exit 1 = perlu perhatian; baca log.

## Unit runner: KillMode

`KillMode=process` bawaan runner membiarkan `Runner.Worker → npm → next-build`
tetap hidup saat unit dihentikan atau dimulai ulang — build yatim piatu terus menghabiskan RAM dan
CPU tanpa job yang terhubung. Setiap unit OmniRoute memiliki drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
dengan `KillMode=mixed`: SIGTERM dikirimkan terlebih dahulu ke listener, lalu SIGKILL ke seluruh cgroup saat
`TimeoutStop`. Konfigurasi ini mulai berlaku saat unit dimulai ulang berikutnya — mulai ulang **satu runner
pada satu waktu, hanya saat idle**, dengan pemeriksaan idle dan proses mulai ulang dalam perintah yang sama.

## Aturan operasional

- **Batas build berat: SATU pada satu waktu — diberlakukan melalui label (sejak 2026-08-29).** Setiap job
  yang menjalankan `next build` penuh menargetkan `[self-hosted, omni-build]`, dan hanya
  **`omniroute-113-5`** yang memiliki label tersebut (ditambahkan melalui API runner — tanpa
  pendaftaran ulang): `ci.yml` `Build`, `npm-publish.yml` `publish`, kedua validasi
  `nightly-release-green`, dan `docker-publish.yml` **amd64** (hosted
  7 GB mengalami ResourceExhausted pada tree ini — #11976). Bagian Docker arm64 tetap menggunakan
  `ubuntu-24.04-arm` (tidak ada mesin ARM) dengan webpack. Docker amd64 juga menggunakan webpack:
  Turbopack pada tree ini mengalami panic di dalam BuildKit (`TurbopackInternalError:
there must be a path to a root`, run 33253576569), bahkan dengan 31 GB; build webpack arm64
  dari tree yang sama pada ARM hosted berhasil. `docker-publish` amd64
  berbagi concurrency group `heavy-build-main` dengan `ci.yml` `Build`
  (`cancel-in-progress: false`), sehingga masuk antrean untuk satu slot tersebut. Docker Engine
  harus tersedia di `omniroute-113-5` (`docker info` adalah langkah pertama job publish).
  Dua adalah batas sebelumnya dan batas itu keliru untuk 31 GB: pada
  2026-08-29 17:26 UTC, dua `next-build` yang berjalan bersamaan (RSS 15,4 GB + 17,2 GB) membuat mesin
  hanya memiliki 5 GB ruang bebas dengan 4 GB swap sedang digunakan, dan OOM kernel menghentikan salah satunya — systemd
  mencatat penghentian tersebut pada unit runner _lainnya_, `runsvc.sh` mengirimkan SIGKILL ke listener itu, dan
  job yang berjalan padanya gagal dengan pesan "The runner has received a shutdown signal" (teks yang sama seperti
  OOM pada hosted runner). `omniroute-113-6` hanya mempertahankan `omni-release`. Build berat dari
  merge `main`, PR, dan proses nightly kini dijalankan secara serial pada satu slot; antrean adalah konsekuensinya.
  Slot kedua dapat digunakan kembali saat VM Proxmox mendapatkan lebih banyak RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool ringan: `omni-light` (2026-08-29, #11965).** `omniroute-113` dan `omniroute-113-2` memiliki
  `omni-light` untuk job yang memerlukan `next build` khusus backend (~5–6 GB), tetapi bukan build penuh:
  job nightly Schemathesis, promptfoo, garak, dan axe-a11y. Job-job tersebut berjalan pada runner hosted 7 GB dan
  gagal di `release/v3.8.51` tanpa ada yang memantau. Skenario terburuk pada mesin ini adalah 2 build berat + 2 build ringan ≈
  30 + 12 GB — melampaui RAM 31 GB, tetapi masih dalam kapasitas swap 16 GB; solusi sesungguhnya untuk ruang cadangan adalah menambah RAM
  pada VM Proxmox (`tomni-proxmox-113`), yang mengubah batas berbasis label menjadi 3 build berat + 2 build ringan.
- **Lebih sedikit listener memang disengaja.** Empat unit OmniRoute dinonaktifkan pada 2026-08-29 — karena hanya
  `ci.yml` `Build` dan proses nightly yang menggunakan mesin tersebut, 8 listener menganggur dan setiap listener tambahan merupakan
  calon penyewa 14 GB. Batas janitor adalah 6 (`MAX_ACTIVE_RUNNERS=6` di cron): janitor menghitung
  setiap `Runner.Listener` pada mesin, dan OmniHeuris + OmniMind menambahkan dua listener ke empat listener milik kami.
- **Jangan pernah membersihkan `/tmp` atau `_work` secara manual saat runner mana pun sedang sibuk.** Pola
  periksa-lalu-hapus dengan jeda di antara keduanya menyebabkan job Build yang sedang berjalan kehilangan
  `_work` pada 2026-08-27. Janitor melakukan pemeriksaan dan penghapusan dalam satu langkah;
  biarkan janitor yang menanganinya.
- Menghentikan runner di tengah job akan membatalkan job tersebut (diamati secara langsung): gunakan `systemctl stop` hanya
  saat listener-nya tidak memiliki proses anak `Runner.Worker` — dan lakukan dalam satu perintah.
- Workflow tidak boleh menyimpan artefak di `/tmp` (lokasi tersebut menggunakan RAM). Unduh ke
  `$RUNNER_TEMP` (di disk, terpisah untuk setiap runner) — artefak `next-build` sebesar 1,3 GB membutuhkan waktu 27–32
  menit untuk masuk ke tmpfs dan 2 menit untuk diunggah dari disk.
- VPS `.15` hanya untuk homologasi — jangan pernah menjalankan runner CI.
