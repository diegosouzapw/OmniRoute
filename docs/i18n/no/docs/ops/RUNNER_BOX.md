# Self-Hosted Runner Box Operations (.113 pool) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den egenadministrerte puljen (`self-hosted, omni-release` på alle åtte runnerne; `omni-build` på to) kjører på **.113**-maskinen.
Målt 2026-08-28 (etteranalyse av v3.8.50, del III):

| ressurs   | verdi                                                                                                           | hva det betyr for planlegging                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 kjerner** (var 16 GB da dette dokumentet først ble skrevet)                                        | én `next-build` topper på **~14 GB** → 2 samtidige tunge bygg belaster maskinen maksimalt, 3 tar den ned (2026-08-28 06:42Z: belastning 56, to jobber gikk tapt) |
| swap      | 15 GB                                                                                                           | den brukte swap for å komme seg gjennom publiseringen av v3.8.50; minnepress vises i `/proc/pressure/memory`                                                     |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                           | alt som plasseres der, bruker minne; rester ryddes etter 3 t                                                                                                     |
| disk      | 188 GB                                                                                                          | `_work`-utsjekkinger fra 8 runnere når ~70 GB uten noen grense                                                                                                   |
| runnere   | **6 lyttere**: 4 OmniRoute (1 `omni-build` + 1 kun for `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | alle deler minnet ovenfor; `omniroute-113-3/-4/-7/-8` er deaktivert (`systemctl enable --now` aktiverer én igjen)                                                |

## Installer oppryddingsjobben (én gang, på maskinen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): hvert 30. minutt, logg til /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` er påkrevd: Oppryddingsjobben bekrefter at en bane er inaktiv ved hjelp av ett øyeblikksbilde av åpne
filer før den fjernes, og uten verktøyet fjerner den ingenting og melder fra om det
(exit 1). Prøv alle endringer med `--dry-run` først — den skriver ut nøyaktig hva den ville
gjort, uten å endre noe.

Dette gjør den ved hver kjøring: rydder våre egne rester (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) etter **3 t på tmpfs** og 24 t på disk under
`_work/_temp`; avslutter en `next-build` som er eldre enn 75 min (ingen jobb kjører så lenge — den
2026-08-27 kjørte én i 70 min etter at GitHub hadde erklært jobben som tapt); fjerner utsjekkinger som er eldre enn 48 t
for runnere der enheten er **stoppet**; varsler ved diskbruk ≥ 85 %, minne-PSI
`full/avg60` ≥ 10 % og flere lyttere enn `MAX_ACTIVE_RUNNERS` (med en
fordeling mellom omniroute/andre). Exit 1 = krever oppmerksomhet; les loggen.

## Runner-enheter: KillMode

Runnerens standardinnstilling `KillMode=process` lar `Runner.Worker → npm → next-build`
fortsette å kjøre når en enhet stoppes eller startes på nytt — en foreldreløs byggprosess fortsetter å bruke RAM og
CPU uten at noen jobb er tilknyttet. Hver OmniRoute-enhet har en drop-in-fil
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM til lytteren først, deretter SIGKILL til hele cgroup-en ved
`TimeoutStop`. Den trer i kraft ved enhetens neste omstart — start **én runner om
gangen på nytt, og bare når den er inaktiv**, med inaktivitetskontrollen og omstarten i samme kommando.

## Driftsregler

- **Tak for tunge bygg: ÉN om gangen — håndhevet med etikett (siden 2026-08-29).** Hver jobb
  som kjører en full `next build`, bruker `[self-hosted, omni-build]`, og bare
  **`omniroute-113-5`** har denne etiketten (lagt til via runners-API-et — ingen
  ny registrering): `ci.yml` `Build`, `npm-publish.yml` `publish`, begge
  `nightly-release-green`-valideringene og `docker-publish.yml` **amd64** (den driftede
  runneren med 7 GB fikk ResourceExhausted for dette treet — #11976). Docker-delen for arm64 blir værende på
  `ubuntu-24.04-arm` (ingen ARM-maskin) med webpack. Docker amd64 bruker også webpack:
  Turbopack fikk panikk inne i BuildKit for dette treet (`TurbopackInternalError:
there must be a path to a root`, kjøring 33253576569), selv med 31 GB; webpack-byggingen for arm64
  av det samme treet lyktes på driftet ARM. `docker-publish` amd64
  deler samtidighetsgruppen `heavy-build-main` med `ci.yml` `Build`
  (`cancel-in-progress: false`), slik at den stilles i kø for den ene plassen. Docker Engine
  må være på `omniroute-113-5` (`docker info` er det første trinnet i publiseringsjobben).
  To var det forrige taket, og det var feil for 31 GB: 2026-08-29 17:26 UTC førte to
  samtidige `next-build`-prosesser (15,4 GB + 17,2 GB RSS) til at maskinen bare hadde 5 GB ledig,
  med 4 GB swap i bruk, og kjernen OOM-avsluttet én av dem — systemd registrerte
  avslutningen på den _andre_ runnerens enhet, `runsvc.sh` sendte SIGKILL til den lytteren, og
  jobben på den døde med «The runner has received a shutdown signal» (samme tekst som ved
  OOM på en driftet runner). `omniroute-113-6` beholder bare `omni-release`. Tunge bygg fra
  flettinger til `main`, PR-er og nattjobben kjøres nå sekvensielt på én plass; køen er prisen.
  Den andre plassen kommer tilbake den dagen Proxmox-VM-en får mer RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Lettvektsgruppe: `omni-light` (2026-08-29, #11965).** `omniroute-113` og `omniroute-113-2` har
  `omni-light` for jobber som trenger en backend-only `next build` (~5–6 GB), men ikke en full bygging:
  de nattlige jobbene for Schemathesis, promptfoo, garak og axe-a11y. De kjørte på den driftede runneren med 7 GB og
  døde på `release/v3.8.51` uten at noen fulgte med. Verst tenkelige tilfelle på maskinen er 2 tunge + 2 lette ≈
  30 + 12 GB — mer enn 31 GB RAM, men innenfor 16 GB swap; den egentlige løsningen for mer spillerom er mer RAM
  på Proxmox-VM-en (`tomni-proxmox-113`), noe som gjør etikettgrensene til 3 tunge + 2 lette.
- **Færre lyttere med hensikt.** Fire OmniRoute-enheter ble deaktivert 2026-08-29 — når bare
  `ci.yml` `Build` og nattjobbene bruker maskinen, var 8 lyttere inaktive, og hver ekstra lytter er en
  potensiell leietaker på 14 GB. Janitor-grensen er 6 (`MAX_ACTIVE_RUNNERS=6` i cron): den teller
  hver `Runner.Listener` på maskinen, og OmniHeuris + OmniMind legger til to utover våre fire.
- **Rydd aldri `/tmp` eller `_work` manuelt mens en runner er opptatt.** En
  kontroller-og-slett-operasjon med et opphold mellom de to var grunnen til at en aktiv Build-jobb mistet
  `_work` 2026-08-27. Janitor utfører kontrollen og fjerningen i ett trinn;
  la den gjøre det.
- Å stoppe en runner midt i en jobb avbryter jobben (observert i drift): bruk `systemctl stop` bare
  når lytteren ikke har noen underordnet `Runner.Worker`-prosess — og gjør det i én kommando.
- Arbeidsflyter må ikke parkere artefakter i `/tmp` (det er RAM). Last ned til
  `$RUNNER_TEMP` (på disk, per runner) — `next-build`-artefakten på 1,3 GB brukte 27–32
  minutter på å lande på tmpfs og 2 minutter på å lastes opp fra disk.
- `.15`-VPS-en er bare for homologering — den kjører aldri CI-runnere.
