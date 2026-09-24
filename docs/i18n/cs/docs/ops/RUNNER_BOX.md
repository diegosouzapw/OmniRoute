# Self-Hosted Runner Box Operations (.113 pool) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Fond samostatně hostovaných runnerů (`self-hosted, omni-release` na všech osmi runnerech; `omni-build` na dvou) běží na stroji **.113**.
Naměřeno 2026-08-28 (postmortem v3.8.50, část III):

| prostředek | hodnota                                                                                                         | význam pro plánování                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **31 GB / 32 jader** (při prvním sepsání tohoto dokumentu to bylo 16 GB)                                        | jeden `next-build` dosahuje maxima **~14 GB** → 2 souběžné náročné buildy stroj vytíží, 3 ho shodí (2026-08-28 06:42Z: load 56, dvě úlohy ztraceny) |
| swap       | 15 GB                                                                                                           | publikování v3.8.50 zvládl za cenu swapování; zatížení je vidět v `/proc/pressure/memory`                                                           |
| `/tmp`     | **12 GB tmpfs = RAM**                                                                                           | cokoli zde uloženého zabírá paměť; zbytky se odstraňují po 3 h                                                                                      |
| disk       | 188 GB                                                                                                          | checkouty `_work` z 8 runnerů dosahují bez omezení ~70 GB                                                                                           |
| runnery    | **6 listenerů**: 4 OmniRoute (1 `omni-build` + 1 pouze `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | všechny sdílejí výše uvedenou paměť; `omniroute-113-3/-4/-7/-8` jsou zakázané (`systemctl enable --now` jeden z nich znovu spustí)                  |

## Instalace úklidového skriptu (jednorázově na stroji)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): každých 30 min, protokol do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` je povinný: úklidový skript před odstraněním ověří nečinnost cesty pomocí jednoho snímku otevřených
souborů; bez tohoto nástroje nic neodstraní a oznámí to
(exit 1). Každou změnu nejprve vyzkoušejte s `--dry-run` — vypíše přesně, co by
provedl, a ničeho se nedotkne.

Co dělá při každém spuštění: odstraňuje naše vlastní zbytky (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) po **3 h na tmpfs** a po 24 h na disku v
`_work/_temp`; ukončí proces `next-build` starší než 75 min (žádná úloha neběží tak dlouho — dne
2026-08-27 jeden běžel 70 min poté, co GitHub jeho úlohu prohlásil za ztracenou); promazává
checkouty starší 48 h u runnerů, jejichž jednotka je **zastavená**; upozorňuje při zaplnění disku ≥ 85 %, paměťovém PSI
`full/avg60` ≥ 10 % a vyšším počtu listenerů než `MAX_ACTIVE_RUNNERS` (s rozdělením na
omniroute/ostatní). Exit 1 = je vyžadována pozornost; přečtěte si protokol.

## Jednotky runnerů: KillMode

Výchozí nastavení runneru `KillMode=process` ponechá při zastavení nebo restartování jednotky
procesy `Runner.Worker → npm → next-build` spuštěné — osiřelé sestavení dál spotřebovává RAM a
CPU, aniž by k němu byla přiřazena úloha. Každá jednotka OmniRoute obsahuje doplňkovou konfiguraci
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
s `KillMode=mixed`: nejprve odešle SIGTERM listeneru a při
`TimeoutStop` odešle SIGKILL celé cgroup. Projeví se to při příštím restartu jednotky — restartujte
**vždy jen jeden runner, pouze když je nečinný**, přičemž kontrola nečinnosti a restart musí být
součástí stejného příkazu.

## Provozní pravidla

- **Limit náročných sestavení: VŽDY jen jedno — vynuceno labelem (od 2026-08-29).** Každá úloha,
  která spouští úplný `next build`, cílí na `[self-hosted, omni-build]`, přičemž tento label má pouze
  **`omniroute-113-5`** (přidán prostřednictvím API runnerů — bez nové
  registrace): `ci.yml` `Build`, `npm-publish.yml` `publish`, obě
  validace `nightly-release-green` a **amd64** v `docker-publish.yml` (hostovaný runner
  se 7 GB skončil pro tento strom chybou ResourceExhausted — #11976). Část Dockeru pro arm64 zůstává na
  `ubuntu-24.04-arm` (není k dispozici žádný ARM stroj) a používá webpack. Docker pro amd64 také používá webpack:
  Turbopack u tohoto stromu uvnitř BuildKitu havaroval (`TurbopackInternalError:
there must be a path to a root`, běh 33253576569), a to i s 31 GB; sestavení stejného
  stromu pro arm64 pomocí webpacku na hostovaném ARM runneru uspělo. `docker-publish` pro amd64
  sdílí skupinu souběžnosti `heavy-build-main` s úlohou `Build` v `ci.yml`
  (`cancel-in-progress: false`), takže čeká ve frontě na jediný slot. Docker Engine
  musí být na `omniroute-113-5` (`docker info` je prvním krokem publikační
  úlohy). Předchozí limit byl dvě úlohy a pro 31 GB byl chybný: dne
  2026-08-29 v 17:26 UTC dvě souběžné instance `next-build` (15,4 GB + 17,2 GB RSS) snížily
  volnou kapacitu stroje na 5 GB při využití 4 GB swapu a kernel jednu z nich ukončil mechanismem OOM — systemd
  zaznamenal ukončení u jednotky _druhého_ runneru, `runsvc.sh` ukončil tento listener signálem SIGKILL a
  jeho úloha skončila zprávou „The runner has received a shutdown signal“ (stejný text jako při
  OOM hostovaného runneru). `omniroute-113-6` si ponechává pouze `omni-release`. Náročná sestavení
  ze sloučení do `main`, PR a nočního běhu se nyní provádějí sériově v jednom slotu; čekání ve frontě je nutná daň.
  Druhý slot se vrátí, až virtuální stroj Proxmox dostane více RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Fond lehkých úloh: `omni-light` (2026-08-29, #11965).** `omniroute-113` a `omniroute-113-2` mají
  label `omni-light` pro úlohy, které potřebují pouze backendové sestavení `next build` (~5–6 GB), nikoli však úplné:
  noční úlohy Schemathesis, promptfoo, garak a axe-a11y. Běžely na hostovaném runneru se 7 GB a
  na `release/v3.8.51` bez povšimnutí selhaly. Nejhorší scénář na stroji jsou 2 náročné + 2 lehké úlohy ≈
  30 + 12 GB — více než 31 GB RAM, ale v rámci 16 GB swapu; skutečným řešením pro dostatečnou rezervu je více RAM
  ve virtuálním stroji Proxmox (`tomni-proxmox-113`), což změní limity dané labely na 3 náročné + 2 lehké úlohy.
- **Záměrně méně listenerů.** Čtyři jednotky OmniRoute byly dne 2026-08-29 zakázány — když stroj používají pouze
  úloha `Build` z `ci.yml` a noční běhy, 8 listenerů bylo nečinných a každý další představuje
  potenciálního spotřebitele 14 GB. Limit úklidové úlohy je 6 (`MAX_ACTIVE_RUNNERS=6` v cronu): započítává
  každý `Runner.Listener` na stroji a OmniHeuris + OmniMind přidávají k našim čtyřem další dva.
- **Nikdy ručně nečistěte `/tmp` ani `_work`, když je některý runner zaneprázdněný.** Postup
  „zkontrolovat a poté s prodlevou smazat“ způsobil, že běžící úloha Build dne
  2026-08-27 přišla o svůj adresář `_work`. Úklidová úloha provádí kontrolu a odstranění v jediném kroku;
  nechte to na ní.
- Zastavení runneru během úlohy tuto úlohu zruší (ověřeno za provozu): `systemctl stop` používejte pouze
  tehdy, když jeho listener nemá žádného potomka `Runner.Worker` — a proveďte to jediným příkazem.
- Workflow nesmějí ukládat artefakty do `/tmp` (je v RAM). Stahujte do
  `$RUNNER_TEMP` (na disku, samostatně pro každý runner) — uložení artefaktu `next-build` o velikosti 1,3 GB
  na tmpfs trvalo 27–32 minut, zatímco jeho nahrání z disku trvalo 2 minuty.
- VPS `.15` slouží pouze k homologaci — nikdy na něm neběží CI runnery.
