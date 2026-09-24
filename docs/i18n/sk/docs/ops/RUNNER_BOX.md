# Self-Hosted Runner Box Operations (.113 pool) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Samoobslužný fond (`self-hosted, omni-release` na všetkých ôsmich runneroch; `omni-build` na dvoch) beží na serveri **.113**.
Merané 2026-08-28 (retrospektíva v3.8.50, časť III):

| prostriedok | hodnota                                                                                                        | čo to znamená pre plánovanie                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **31 GB / 32 jadier** (keď bol tento dokument prvýkrát napísaný, bolo to 16 GB)                                | jeden `next-build` dosahuje špičku **~14 GB** → 2 súbežné náročné zostavenia zahltia server, 3 ho znefunkčnia (2026-08-28 06:42Z: záťaž 56, dve úlohy stratené) |
| swap        | 15 GB                                                                                                          | publikovanie v3.8.50 zvládol pomocou swapovania; tlak je viditeľný v `/proc/pressure/memory`                                                                    |
| `/tmp`      | **12 GB tmpfs = RAM**                                                                                          | čokoľvek uložené na tomto mieste zaberá pamäť; zvyšky sa odstraňujú po 3 h                                                                                      |
| disk        | 188 GB                                                                                                         | pracovné kópie `_work` z 8 runnerov dosahujú bez obmedzenia ~70 GB                                                                                              |
| runnery     | **6 listenerov**: 4 OmniRoute (1 `omni-build` + 1 iba `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | všetky zdieľajú vyššie uvedenú pamäť; `omniroute-113-3/-4/-7/-8` sú zakázané (`systemctl enable --now` jeden z nich znova spustí)                               |

## Inštalácia upratovacieho skriptu (jednorazovo, na serveri)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): každých 30 min, zapisovať do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je povinný: upratovací skript pred odstránením overí nečinnosť cesty pomocou jednej snímky otvorených
súborov; bez tohto nástroja nič neodstráni a oznámi to
(exit 1). Každú zmenu najprv vyskúšajte s `--dry-run` — vypíše presne, čo by
urobil, a ničoho sa nedotkne.

Čo robí pri každom spustení: odstraňuje naše vlastné zvyšky (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) po **3 h v tmpfs** a po 24 h v diskovom
`_work/_temp`; ukončuje proces `next-build` starší ako 75 min (žiadna úloha nebeží tak dlho — dňa
2026-08-27 jedna bežala 70 min po tom, ako GitHub označil jej úlohu za stratenú); odstraňuje pracovné
kópie staršie ako 48 h patriace runnerom, ktorých jednotka je **zastavená**; upozorňuje pri využití disku ≥ 85 %, hodnote PSI pamäte
`full/avg60` ≥ 10 % a vyššom počte listenerov než `MAX_ACTIVE_RUNNERS` (s rozdelením na
omniroute/ostatné). Exit 1 = vyžaduje sa pozornosť; prečítajte si protokol.

## Jednotky runnera: KillMode

Predvolené nastavenie runnera `KillMode=process` ponechá procesy `Runner.Worker → npm → next-build`
spustené aj po zastavení alebo reštartovaní jednotky — osirotený build naďalej spotrebúva RAM a
CPU bez priradenej úlohy. Každá jednotka OmniRoute má doplnkovú konfiguráciu
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s nastavením `KillMode=mixed`: najprv SIGTERM pre listener a pri
`TimeoutStop` SIGKILL pre celú cgroup. Nastavenie sa prejaví pri nasledujúcom reštarte jednotky — reštartujte
**naraz iba jeden runner a len vtedy, keď je nečinný**, pričom kontrola nečinnosti aj reštart musia byť v rovnakom príkaze.

## Prevádzkové pravidlá

- **Limit náročných buildov: JEDEN naraz — vynútené labelom (od 2026-08-29).** Každá úloha,
  ktorá spúšťa úplný `next build`, cieli na `[self-hosted, omni-build]`, pričom tento label má iba
  **`omniroute-113-5`** (pridaný cez API runnerov — bez
  opätovnej registrácie): `ci.yml` `Build`, `npm-publish.yml` `publish`, obe
  validácie `nightly-release-green` a **amd64** v `docker-publish.yml` (hostovaný runner
  so 7 GB skončil pre tento strom chybou ResourceExhausted — #11976). Vetva Dockeru pre arm64 zostáva na
  `ubuntu-24.04-arm` (žiadny ARM server) s webpackom. Docker pre amd64 tiež používa webpack:
  Turbopack pri tomto strome zlyhal v BuildKite (`TurbopackInternalError:
there must be a path to a root`, beh 33253576569) aj s 31 GB; build toho istého
  stromu pre arm64 s webpackom na hostovanom ARM runneri uspel. `docker-publish` pre amd64
  zdieľa concurrency group `heavy-build-main` s úlohou `Build` v `ci.yml`
  (`cancel-in-progress: false`), takže čaká vo fronte na jediné miesto. Docker Engine
  musí byť na `omniroute-113-5` (`docker info` je prvým krokom publikačnej
  úlohy). Predchádzajúci limit bol dva a pre 31 GB bol nesprávny: dňa
  2026-08-29 o 17:26 UTC dva súbežné procesy `next-build` (15,4 GB + 17,2 GB RSS) znížili voľnú pamäť servera
  na 5 GB, pričom sa používali 4 GB swapu, a jadro prostredníctvom OOM ukončilo jeden z nich — systemd
  pripísal ukončenie jednotke _druhého_ runnera, `runsvc.sh` ukončil tento listener signálom SIGKILL a
  jeho úloha skončila správou „The runner has received a shutdown signal“ (rovnaký text ako pri
  OOM hostovaného runnera). `omniroute-113-6` si ponecháva iba `omni-release`. Náročné buildy po
  zlúčení do `main`, z PR a z nočného behu sa teraz vykonávajú sériovo na jednom mieste; čakanie vo fronte je daňou za toto obmedzenie.
  Druhé miesto sa vráti v deň, keď virtuálny stroj Proxmox dostane viac RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool pre ľahké úlohy: `omni-light` (2026-08-29, #11965).** `omniroute-113` a `omniroute-113-2` majú
  label `omni-light` pre úlohy, ktoré potrebujú iba backendový `next build` (~5–6 GB), nie však úplný build:
  nočné úlohy Schemathesis, promptfoo, garak a axe-a11y. Bežali na hostovanom runneri so 7 GB a
  na `release/v3.8.51` skončili bez toho, aby si to niekto všimol. Najhorší prípad na serveri je 2 náročné + 2 ľahké ≈
  30 + 12 GB — viac než 31 GB RAM, ale v rámci 16 GB swapu; skutočným riešením na získanie rezervy je viac RAM
  vo virtuálnom stroji Proxmox (`tomni-proxmox-113`), čo zmení limity labelov na 3 náročné + 2 ľahké.
- **Zámerne menej listenerov.** Štyri jednotky OmniRoute boli 2026-08-29 zakázané — keď server používali iba
  `Build` z `ci.yml` a nočné behy, 8 listenerov bolo nečinných a každý ďalší predstavuje potenciálneho
  nájomníka so spotrebou 14 GB. Limit janitora je 6 (`MAX_ACTIVE_RUNNERS=6` v crone): počíta
  každý proces `Runner.Listener` na serveri, pričom OmniHeuris + OmniMind pridávajú k našim štyrom ďalšie dva.
- **Nikdy ručne nečistite `/tmp` ani `_work`, kým je ktorýkoľvek runner zaneprázdnený.**
  Kontrola nasledovaná po časovom odstupe odstránením spôsobila, že aktívna úloha Build prišla
  2026-08-27 o svoj adresár `_work`. Janitor vykonáva kontrolu a odstránenie v jednom kroku;
  nechajte to naňho.
- Zastavenie runnera uprostred úlohy túto úlohu zruší (overené v prevádzke): `systemctl stop` použite iba
  vtedy, keď jeho listener nemá podradený proces `Runner.Worker` — a vykonajte to v jednom príkaze.
- Workflowy nesmú ukladať artefakty do `/tmp` (nachádza sa v RAM). Sťahujte ich do
  `$RUNNER_TEMP` (na disku, samostatne pre každý runner) — uloženie 1,3 GB artefaktu `next-build` na tmpfs trvalo 27–32
  minút, zatiaľ čo jeho nahratie z disku trvalo 2 minúty.
- VPS `.15` slúži iba na homologizáciu — nikdy na ňom nebežia CI runnery.
