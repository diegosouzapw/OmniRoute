# Self-Hosted Runner Box Operations (.113 pool) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

# Operacije na Self-Hosted Runner mašini (.113 pool)

Self-hosted pool (`self-hosted, omni-release` na svih osam runnera; `omni-build` na dva) radi na **.113** mašini.
Izmjereno 28.08.2026. (v3.8.50 postmortem, Parte III):

| resurs    | vrijednost                                                                                                     | šta to znači za zakazivanje                                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 jezgre** (bilo je 16 GB kada je ovaj dokument prvi put napisan)                                   | jedan `next-build` dostiže vrhunac na **~14 GB** → 2 istovremena teška builda zasićuju mašinu, 3 je obaraju (28.08.2026. 06:42Z: opterećenje 56, dva posla izgubljena) |
| swap      | 15 GB                                                                                                          | koristio je swap tokom objavljivanja v3.8.50; pritisak se vidi u `/proc/pressure/memory`                                                                               |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                          | sve što je tu smješteno je u memoriji; ostaci se čiste nakon 3 h                                                                                                       |
| disk      | 188 GB                                                                                                         | `_work` checkoutovi 8 runnera dostižu ~70 GB bez ograničenja                                                                                                           |
| runneri   | **6 listenera**: 4 OmniRoute (1 `omni-build` + 1 `omni-release`-only + 2 `omni-light`) + OmniHeuris + OmniMind | svi dijele gore navedenu memoriju; `omniroute-113-3/-4/-7/-8` su onemogućeni (`systemctl enable --now` vraća jedan u rad)                                              |

## Instalacija janitora (jednokratno, na mašini)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): svakih 30 min, loguj u /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je neophodan: janitor dokazuje da je putanja neaktivna pomoću jednog snimka otvorenih datoteka prije nego što je ukloni, a bez ovog alata ne uklanja ništa i to prijavljuje (exit 1). Isprobajte bilo kakvu izmjenu prvo sa `--dry-run` — ispisuje tačno šta bi uradio i ne dira ništa.

Šta radi pri svakom pokretanju: čisti naše vlastite ostatke (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) nakon **3 h na tmpfs** i 24 h na disku `_work/_temp`; ubija `next-build` stariji od 75 min (nijedan posao ne traje toliko dugo — 27.08.2026. jedan je radio 70 min nakon što je GitHub proglasio posao izgubljenim); uklanja 48 sati stare checkoutove runnera čija je jedinica **zaustavljena**; upozorava na disk ≥ 85 %, memorijski PSI `full/avg60` ≥ 10 %, i više listenera nego `MAX_ACTIVE_RUNNERS` (sa pregledom omniroute/ostalo). Exit 1 = potrebna pažnja; pročitajte log.

## Runner jedinice: KillMode

Podrazumevani `KillMode=process` za runner ostavlja `Runner.Worker → npm → next-build`
aktivnim kada se jedinica zaustavi ili ponovo pokrene — proces izgradnje (build) ostaje siroče i
nastavlja da troši RAM i CPU bez dodeljenog posla. Svaka OmniRoute jedinica sadrži drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
sa `KillMode=mixed`: prvo SIGTERM za listener, a zatim SIGKILL za celu cgroup grupu pri
`TimeoutStop`. Ovo stupa na snagu pri sledećem ponovnom pokretanju jedinice — ponovo pokrenite
**jedan po jedan runner, samo kada su neaktivni (idle)**, uz proveru neaktivnosti i ponovno
pokretanje u istoj komandi.

## Pravila rada

- **Ograničenje za teške buildove: JEDAN po jedan — primenjuje se putem oznake (od 29.08.2026.).** Svaki posao
  koji pokreće puni `next build` cilja `[self-hosted, omni-build]`, i samo
  **`omniroute-113-5`** nosi tu oznaku (dodato putem runners API-ja — bez ponovne registracije):
  `ci.yml` `Build`, `npm-publish.yml` `publish`, obe `nightly-release-green`
  validacije, i `docker-publish.yml` **amd64** (hosted 7 GB ResourceExhausted na ovom stablu — #11976).
  Arm64 Docker deo ostaje na `ubuntu-24.04-arm` (nema ARM mašine) sa webpack-om. Docker amd64
  takođe koristi webpack: Turbopack na ovom stablu je izazvao paniku unutar BuildKit-a
  (`TurbopackInternalError: there must be a path to a root`, run 33253576569) čak i sa 31 GB;
  isti arm64 webpack build na hosted ARM-u je uspeo. `docker-publish` amd64
  deli `heavy-build-main` grupu konkurentnosti sa `ci.yml` `Build`
  (`cancel-in-progress: false`), tako da se postavlja u red na taj jedan slot. Docker Engine
  mora biti na `omniroute-113-5` (`docker info` je prvi korak publish posla).
  Dva je bilo prethodno ograničenje i bilo je pogrešno za 31 GB: 29.08.2026. u 17:26 UTC dva istovremena
  `next-build`-a (15.4 GB + 17.2 GB RSS) dovela su mašinu na 5 GB slobodnog prostora sa 4 GB swap-a
  u upotrebi i kernel je ubio jedan od njih (OOM-killed) — systemd je zabeležio ubijanje na jedinici
  _drugog_ runnera, `runsvc.sh` je poslao SIGKILL tom listeneru, a posao na njemu je umro sa porukom
  "The runner has received a shutdown signal" (isti tekst kao kod hosted-runner OOM-a).
  `omniroute-113-6` zadržava samo `omni-release`. Teški buildovi iz `main` merge-ova, PR-ova i
  nightly verzija se sada serijalizuju na jednom slotu; red čekanja je cena.
  Drugi slot se vraća onog dana kada Proxmox VM dobije više RAM-a (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Light pool: `omni-light` (29.08.2026., #11965).** `omniroute-113` i `omniroute-113-2` nose
  `omni-light` za poslove kojima je potreban samo backend `next build` (~5–6 GB), ali ne i puni:
  nightly Schemathesis, promptfoo, garak i axe-a11y poslovi. Oni su radili na hosted 7 GB runneru i
  umirali na `release/v3.8.51` bez nadzora. Najgori slučaj na mašini je 2 teška + 2 laka ≈
  30 + 12 GB — preko 31 GB RAM-a, unutar 16 GB swap-a; pravo rešenje za prostor je više RAM-a
  na Proxmox VM-u (`tomni-proxmox-113`), što pretvara ograničenja oznaka u 3 teška + 2 laka.
- **Namerno manje listenera.** Četiri OmniRoute jedinice su onemogućene 29.08.2026. — sa samo
  `ci.yml` `Build` i nightly poslovima koji koriste mašinu, 8 listenera je bilo neaktivno, a svaki
  dodatni je potencijalni zakupac od 14 GB. Ograničenje za janitora je 6 (`MAX_ACTIVE_RUNNERS=6` u cron-u):
  on broji svaki `Runner.Listener` na mašini, a OmniHeuris + OmniMind dodaju dva na naša četiri.
- **Nikada ne čistite `/tmp` ili `_work` ručno dok je bilo koji runner zauzet.** Provera-pa-brisanje
  sa razmakom između to dvoje je način na koji je Build posao uživo izgubio svoj
  `_work` 27.08.2026. Janitor obavlja proveru i uklanjanje u jednom koraku; pustite ga.
- Zaustavljanje runnera usred posla otkazuje posao (primećeno uživo): `systemctl stop` koristite
  samo kada njegov listener nema `Runner.Worker` dete — i uradite to u jednoj komandi.
- Workflow-ovi ne smeju parkirati artefakte u `/tmp` (to je RAM). Preuzmite u
  `$RUNNER_TEMP` (na disku, po runneru) — artefaktu `next-build` od 1.3 GB je trebalo 27–32
  minuta da sleti na tmpfs i 2 minuta za upload sa diska.
- `.15` VPS je samo za homologaciju — nikada ne pokreće CI runnere.
