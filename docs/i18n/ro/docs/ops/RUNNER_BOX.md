# Self-Hosted Runner Box Operations (.113 pool) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pool-ul self-hosted (`self-hosted, omni-release` pe toate cele opt runner-e; `omni-build` pe două) rulează pe mașina **.113**.
Măsurat la 2026-08-28 (analiza post-mortem v3.8.50, Partea III):

| resursă   | valoare                                                                                                                       | ce înseamnă pentru planificare                                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 de nuclee** (erau 16 GB când a fost scris inițial acest document)                                                | un `next-build` atinge un vârf de **~14 GB** → 2 build-uri solicitante simultane saturează mașina, iar 3 o blochează (2026-08-28 06:42Z: încărcare 56, două joburi pierdute) |
| swap      | 15 GB                                                                                                                         | a reușit să finalizeze publicarea v3.8.50 folosind intens swap-ul; presiunea este vizibilă în `/proc/pressure/memory`                                                        |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                                         | orice este stocat acolo ocupă memorie; fișierele reziduale sunt eliminate după 3 h                                                                                           |
| disc      | 188 GB                                                                                                                        | checkout-urile `_work` ale celor 8 runner-e ajung la ~70 GB fără nicio limită                                                                                                |
| runner-e  | **6 procese de ascultare**: 4 OmniRoute (1 `omni-build` + 1 exclusiv `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | toate partajează memoria de mai sus; `omniroute-113-3/-4/-7/-8` sunt dezactivate (`systemctl enable --now` reactivează unul)                                                 |

## Instalarea utilitarului de curățare (o singură dată, pe mașină)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): la fiecare 30 min, jurnal în /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` este obligatoriu: utilitarul de curățare confirmă că o cale este inactivă folosind un instantaneu al fișierelor
deschise înainte de a o elimina, iar fără acest instrument nu elimină nimic și raportează acest lucru
(exit 1). Testați mai întâi orice modificare cu `--dry-run` — acesta afișează exact ce ar face
și nu modifică nimic.

Ce face la fiecare rulare: elimină fișierele reziduale proprii (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) după **3 h pe tmpfs** și după 24 h pe discul
`_work/_temp`; oprește forțat un `next-build` mai vechi de 75 min (niciun job nu rulează atât de mult — la
2026-08-27, unul a rulat 70 min după ce GitHub declarase jobul său pierdut); elimină checkout-urile mai vechi de 48 h
ale runner-elor a căror unitate este **oprită**; emite alerte când utilizarea discului este ≥ 85 %, PSI pentru memorie
`full/avg60` este ≥ 10 % și există mai multe procese de ascultare decât `MAX_ACTIVE_RUNNERS` (cu o
defalcare omniroute/altele). Exit 1 = este necesară intervenția; consultați jurnalul.

## Unități runner: KillMode

Valoarea implicită `KillMode=process` a runnerului lasă `Runner.Worker → npm → next-build`
în viață atunci când o unitate este oprită sau repornită — un build orfan continuă să consume RAM și
CPU fără niciun job atașat. Fiecare unitate OmniRoute include un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
cu `KillMode=mixed`: SIGTERM mai întâi către listener, apoi SIGKILL către întregul cgroup la
`TimeoutStop`. Acesta intră în vigoare la următoarea repornire a unității — reporniți **câte un runner,
numai când este inactiv**, cu verificarea stării de inactivitate și repornirea în aceeași comandă.

## Reguli de operare

- **Limita pentru build-uri grele: UNUL singur simultan — impusă prin etichetă (din 2026-08-29).** Fiecare job
  care execută un `next build` complet vizează `[self-hosted, omni-build]`, iar numai
  **`omniroute-113-5`** are această etichetă (adăugată prin API-ul runnerilor — fără
  reînregistrare): `ci.yml` `Build`, `npm-publish.yml` `publish`, ambele
  validări `nightly-release-green` și **amd64** din `docker-publish.yml` (runnerul găzduit
  de 7 GB a întâmpinat ResourceExhausted pe acest arbore — #11976). Ramura Docker arm64 rămâne pe
  `ubuntu-24.04-arm` (nu există o mașină ARM) cu webpack. Docker amd64 folosește, de asemenea, webpack:
  Turbopack a intrat în panică pe acest arbore în interiorul BuildKit (`TurbopackInternalError:
there must be a path to a root`, execuția 33253576569), chiar și cu 31 GB; build-ul
  webpack arm64 al aceluiași arbore pe ARM găzduit a reușit. `docker-publish` amd64
  folosește același grup de concurență `heavy-build-main` ca `Build` din `ci.yml`
  (`cancel-in-progress: false`), astfel încât intră în coadă pentru singurul slot. Docker Engine
  trebuie să fie pe `omniroute-113-5` (`docker info` este primul pas al jobului de publicare).
  Două era limita anterioară și era greșită pentru 31 GB: pe
  2026-08-29 la 17:26 UTC, două procese `next-build` simultane (15,4 GB + 17,2 GB RSS) au redus memoria
  liberă a mașinii la 5 GB, cu 4 GB de swap utilizați, iar mecanismul OOM al kernelului a omorât unul dintre ele — systemd
  a înregistrat oprirea în unitatea _celuilalt_ runner, `runsvc.sh` a trimis SIGKILL acelui listener, iar
  jobul de pe acesta a eșuat cu „The runner has received a shutdown signal” (același text ca în cazul unui
  OOM pe un runner găzduit). `omniroute-113-6` păstrează numai `omni-release`. Build-urile grele provenite din
  îmbinări în `main`, PR-uri și execuția nocturnă sunt acum serializate pe un singur slot; coada este prețul plătit.
  Al doilea slot revine în ziua în care VM-ul Proxmox primește mai mult RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool ușor: `omni-light` (2026-08-29, #11965).** `omniroute-113` și `omniroute-113-2` au
  eticheta `omni-light` pentru joburile care necesită un `next build` numai pentru backend (~5–6 GB), dar nu unul complet:
  joburile nocturne Schemathesis, promptfoo, garak și axe-a11y. Acestea rulau pe runnerul găzduit de 7 GB și
  au eșuat pe `release/v3.8.51` fără ca cineva să le monitorizeze. Cazul cel mai nefavorabil pe mașină este 2 grele + 2 ușoare ≈
  30 + 12 GB — peste cei 31 GB de RAM, dar în limita celor 16 GB de swap; soluția reală pentru marja de siguranță este mai mult RAM
  pe VM-ul Proxmox (`tomni-proxmox-113`), ceea ce transformă limitele impuse prin etichete în 3 grele + 2 ușoare.
- **Mai puțini listeneri în mod intenționat.** Patru unități OmniRoute au fost dezactivate pe 2026-08-29 — având în vedere că numai
  `Build` din `ci.yml` și execuțiile nocturne folosesc mașina, 8 listeneri erau inactivi, iar fiecare listener suplimentar este un
  potențial consumator de 14 GB. Limita janitorului este 6 (`MAX_ACTIVE_RUNNERS=6` în cron): acesta numără
  fiecare `Runner.Listener` de pe mașină, iar OmniHeuris + OmniMind adaugă doi la cei patru ai noștri.
- **Nu curățați niciodată manual `/tmp` sau `_work` cât timp vreun runner este ocupat.** O
  verificare urmată de ștergere, cu un interval între cele două, este motivul pentru care un job Build activ și-a pierdut
  directorul `_work` pe 2026-08-27. Janitorul efectuează verificarea și eliminarea într-un singur pas;
  lăsați-l să facă acest lucru.
- Oprirea unui runner în timpul unui job anulează jobul (observat în direct): folosiți `systemctl stop` numai
  atunci când listenerul său nu are niciun proces copil `Runner.Worker` — și faceți acest lucru într-o singură comandă.
- Workflow-urile nu trebuie să stocheze artefacte în `/tmp` (acesta se află în RAM). Descărcați în
  `$RUNNER_TEMP` (pe disc, separat pentru fiecare runner) — artefactului `next-build` de 1,3 GB i-au trebuit 27–32
  de minute pentru a ajunge pe tmpfs și 2 minute pentru a fi încărcat de pe disc.
- VPS-ul `.15` este destinat numai omologării — nu rulează niciodată runneri CI.
