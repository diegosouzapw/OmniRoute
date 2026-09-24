# Self-Hosted Runner Box Operations (.113 pool) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den egenhostade poolen (`self-hosted, omni-release` på alla åtta runners; `omni-build` på två) körs på **.113**-servern.
Uppmätt 2026-08-28 (efteranalys av v3.8.50, del III):

| resurs    | värde                                                                                                           | vad det innebär för schemaläggningen                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 kärnor** (var 16 GB när det här dokumentet först skrevs)                                           | en `next-build` når som mest **~14 GB** → 2 samtidiga tunga byggen mättar servern, 3 slår ut den (2026-08-28 06:42Z: last 56, två jobb förlorades) |
| swap      | 15 GB                                                                                                           | den växlade sig igenom publiceringen av v3.8.50; belastningen syns i `/proc/pressure/memory`                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                           | allt som placeras där förbrukar minne; rester rensas efter 3 h                                                                                     |
| disk      | 188 GB                                                                                                          | `_work`-utcheckningar från 8 runners når ~70 GB utan någon gräns                                                                                   |
| runners   | **6 lyssnare**: 4 OmniRoute (1 `omni-build` + 1 endast `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | alla delar på minnet ovan; `omniroute-113-3/-4/-7/-8` är inaktiverade (`systemctl enable --now` aktiverar en igen)                                 |

## Installera städaren (en gång, på servern)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): var 30:e minut, logga till /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` krävs: städaren verifierar att en sökväg är inaktiv genom en ögonblicksbild av öppna
filer innan den tas bort, och utan verktyget tar den inte bort någonting och meddelar detta
(exit 1). Prova först alla ändringar med `--dry-run` — då skrivs exakt vad som skulle
göras ut utan att någonting ändras.

Detta görs vid varje körning: våra egna rester (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) rensas efter **3 h på tmpfs** och 24 h i
`_work/_temp` på disk; en `next-build` som är äldre än 75 min avslutas (inget jobb körs så länge — den
2026-08-27 kördes ett i 70 min efter att GitHub hade förklarat dess jobb förlorat); utcheckningar som är
48 h gamla från runners vars enhet är **stoppad** rensas; varningar ges vid diskanvändning ≥ 85 %, PSI för minne
`full/avg60` ≥ 10 % och fler lyssnare än `MAX_ACTIVE_RUNNERS` (med en
uppdelning mellan omniroute/övriga). Exit 1 = åtgärd krävs; läs loggen.

## Runner-enheter: KillMode

Runnerns standardinställning `KillMode=process` lämnar `Runner.Worker → npm → next-build`
kvar i livet när en enhet stoppas eller startas om — ett föräldralöst bygge fortsätter att förbruka RAM och
CPU utan något anslutet jobb. Varje OmniRoute-enhet har en drop-in-fil
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM skickas först till lyssnaren och SIGKILL till hela cgroup-gruppen vid
`TimeoutStop`. Den börjar gälla nästa gång enheten startas om — starta om **en runner i
taget, endast när den är inaktiv**, med kontrollen av inaktivitet och omstarten i samma kommando.

## Driftsregler

- **Tak för tunga byggen: ETT åt gången — upprätthålls via etikett (sedan 2026-08-29).** Varje jobb
  som kör en fullständig `next build` riktas mot `[self-hosted, omni-build]`, och endast
  **`omniroute-113-5`** har den etiketten (tillagd via runners-API:t — ingen
  omregistrering): `ci.yml` `Build`, `npm-publish.yml` `publish`, båda
  `nightly-release-green`-valideringarna och `docker-publish.yml` **amd64** (hostad
  7 GB gav ResourceExhausted för detta träd — #11976). Docker-delen för arm64 ligger kvar på
  `ubuntu-24.04-arm` (ingen ARM-maskin) med webpack. Docker amd64 använder också webpack:
  Turbopack fick panik för detta träd inuti BuildKit (`TurbopackInternalError:
there must be a path to a root`, körning 33253576569), även med 31 GB; samma
  träds arm64-bygge med webpack på hostad ARM lyckades. `docker-publish` för amd64
  delar samtidighetsgruppen `heavy-build-main` med `ci.yml` `Build`
  (`cancel-in-progress: false`), så det köar till den enda platsen. Docker Engine
  måste finnas på `omniroute-113-5` (`docker info` är det första steget i publiceringsjobbet).
  Två var det tidigare taket, och det var fel för 31 GB: den
  2026-08-29 17:26 UTC fick två samtidiga `next-build`-processer (15.4 GB + 17.2 GB RSS) ned maskinen
  till 5 GB ledigt med 4 GB växlingsutrymme i bruk, och kärnans OOM-hanterare avslutade en av dem — systemd
  registrerade avslutningen på den _andra_ runnerns enhet, `runsvc.sh` skickade SIGKILL till den lyssnaren och
  jobbet där dog med "Runnern har tagit emot en avstängningssignal" (samma text som vid
  OOM på en hostad runner). `omniroute-113-6` behåller endast `omni-release`. Tunga byggen från
  sammanslagningar till `main`, PR:er och nattkörningen serialiseras nu på en enda plats; kön är priset.
  Den andra platsen kommer tillbaka den dag då Proxmox-VM:n får mer RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Lätt pool: `omni-light` (2026-08-29, #11965).** `omniroute-113` och `omniroute-113-2` har
  `omni-light` för jobb som behöver en `next build` endast för backend (~5–6 GB), men inte en fullständig sådan:
  de nattliga jobben för Schemathesis, promptfoo, garak och axe-a11y. De kördes på den hostade runnern med 7 GB och
  dog på `release/v3.8.51` utan att någon övervakade dem. Värsta fallet på maskinen är 2 tunga + 2 lätta ≈
  30 + 12 GB — mer än 31 GB RAM, men inom de 16 GB växlingsutrymme som finns; den verkliga lösningen för marginal är mer RAM
  på Proxmox-VM:n (`tomni-proxmox-113`), vilket höjer etiketternas tak till 3 tunga + 2 lätta.
- **Färre lyssnare avsiktligt.** Fyra OmniRoute-enheter inaktiverades 2026-08-29 — när endast
  `ci.yml` `Build` och nattkörningarna använder maskinen var 8 lyssnare inaktiva, och varje extra lyssnare är en
  potentiell hyresgäst som förbrukar 14 GB. Städjobbets tak är 6 (`MAX_ACTIVE_RUNNERS=6` i cron): det räknar
  varje `Runner.Listener` på maskinen, och OmniHeuris + OmniMind lägger till två utöver våra fyra.
- **Rensa aldrig `/tmp` eller `_work` manuellt medan någon runner är upptagen.** En
  kontroll följd av borttagning, med ett mellanrum mellan de två, gjorde att ett aktivt Build-jobb förlorade sin
  `_work` den 2026-08-27. Städjobbet utför kontrollen och borttagningen i ett enda steg;
  låt det göra det.
- Att stoppa en runner mitt under ett jobb avbryter jobbet (observerat i drift): använd `systemctl stop` endast
  när dess lyssnare inte har någon underordnad `Runner.Worker`-process — och gör det i ett enda kommando.
- Arbetsflöden får inte parkera artefakter i `/tmp` (det ligger i RAM). Ladda ned till
  `$RUNNER_TEMP` (på disk, separat för varje runner) — artefakten `next-build` på 1.3 GB tog 27–32
  minuter att landa på tmpfs och 2 minuter att ladda upp från disk.
- VPS:en `.15` är endast för homologering — den kör aldrig CI-runners.
