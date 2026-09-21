# Self-Hosted Runner Box Operations (.113 pool) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

De self-hosted pool (`self-hosted, omni-release` op alle acht runners; `omni-build` op twee) draait op de **.113**-machine.
Gemeten op 2026-08-28 (postmortem van v3.8.50, deel III):

| resource  | waarde                                                                                                           | wat dit betekent voor de planning                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 cores** (was 16 GB toen dit document voor het eerst werd geschreven)                                | één `next-build` piekt op **~14 GB** → 2 gelijktijdige zware builds verzadigen de machine, 3 halen hem onderuit (2026-08-28 06:42Z: load 56, twee jobs verloren) |
| swap      | 15 GB                                                                                                            | de publicatie van v3.8.50 werd met intensief swapgebruik voltooid; de druk is zichtbaar in `/proc/pressure/memory`                                               |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                            | alles wat daar wordt geplaatst, gebruikt geheugen; restanten worden na 3 uur opgeruimd                                                                           |
| schijf    | 188 GB                                                                                                           | `_work`-check-outs van 8 runners bereiken zonder limiet ~70 GB                                                                                                   |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 alleen `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | ze delen allemaal het bovenstaande geheugen; `omniroute-113-3/-4/-7/-8` zijn uitgeschakeld (`systemctl enable --now` brengt er één terug)                        |

## De janitor installeren (eenmalig, op de machine)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): elke 30 minuten, loggen naar /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` is vereist: de janitor controleert aan de hand van één momentopname van
open bestanden of een pad inactief is voordat het wordt verwijderd. Zonder deze
tool verwijdert hij niets en meldt hij dat ook (exit 1). Probeer elke wijziging
eerst met `--dry-run` — dit toont exact wat er zou gebeuren en wijzigt niets.

Wat hij bij elke uitvoering doet: onze eigen restanten (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) opruimen na **3 uur op tmpfs** en na 24 uur in
`_work/_temp` op schijf; een `next-build` beëindigen die ouder is dan 75 minuten
(geen enkele job duurt zo lang — op 2026-08-27 draaide er één nog 70 minuten nadat
GitHub de bijbehorende job als verloren had aangemerkt); check-outs ouder dan 48
uur verwijderen van runners waarvan de unit **gestopt** is; waarschuwen bij
schijfgebruik ≥ 85%, memory PSI `full/avg60` ≥ 10% en meer listeners dan
`MAX_ACTIVE_RUNNERS` (met een uitsplitsing tussen omniroute en overige).
Exit 1 = aandacht vereist; lees het logbestand.

## Runner-units: KillMode

De standaardinstelling `KillMode=process` van de runner laat `Runner.Worker → npm → next-build`
doorlopen wanneer een unit wordt gestopt of opnieuw gestart — een verweesde build blijft RAM en
CPU verbruiken zonder dat er een job aan gekoppeld is. Elke OmniRoute-unit heeft een drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
met `KillMode=mixed`: eerst SIGTERM naar de listener en vervolgens SIGKILL naar de volledige cgroup bij
`TimeoutStop`. Dit wordt van kracht bij de volgende herstart van de unit — herstart **één runner
tegelijkertijd, alleen wanneer deze inactief is**, met de controle op inactiviteit en de herstart in dezelfde opdracht.

## Operationele regels

- **Limiet voor zware builds: ÉÉN tegelijk — afgedwongen via label (sinds 2026-08-29).** Elke job
  die een volledige `next build` uitvoert, richt zich op `[self-hosted, omni-build]`, en alleen
  **`omniroute-113-5`** heeft dat label (toegevoegd via de runners-API — geen
  herregistratie): `ci.yml` `Build`, `npm-publish.yml` `publish`, beide
  `nightly-release-green`-validaties en `docker-publish.yml` **amd64** (de gehoste
  runner van 7 GB kreeg ResourceExhausted voor deze codebase — #11976). De arm64-Docker-taak blijft op
  `ubuntu-24.04-arm` (geen ARM-machine) met webpack. Docker amd64 gebruikt eveneens webpack:
  Turbopack crashte voor deze codebase binnen BuildKit (`TurbopackInternalError:
there must be a path to a root`, run 33253576569), zelfs met 31 GB; de arm64-webpack-build
  van dezelfde codebase slaagde op gehoste ARM. `docker-publish` amd64
  deelt de concurrencygroep `heavy-build-main` met `ci.yml` `Build`
  (`cancel-in-progress: false`), zodat deze voor het ene slot in de wachtrij komt. Docker Engine
  moet aanwezig zijn op `omniroute-113-5` (`docker info` is de eerste stap van de publicatiejob).
  Twee was de vorige limiet en die was onjuist voor 31 GB: op
  2026-08-29 17:26 UTC zorgden twee gelijktijdige `next-build`s (15,4 GB + 17,2 GB RSS) ervoor dat de machine
  nog maar 5 GB vrij had, met 4 GB swap in gebruik, waarna de kernel er één via OOM beëindigde — systemd
  registreerde de beëindiging bij de unit van de _andere_ runner, `runsvc.sh` beëindigde die listener met SIGKILL en
  de bijbehorende job stopte met "De runner heeft een afsluitsignaal ontvangen" (dezelfde tekst als bij een
  OOM op een gehoste runner). `omniroute-113-6` behoudt alleen `omni-release`. Zware builds van
  `main`-merges, PR's en de nachtelijke build worden nu achter elkaar uitgevoerd op één slot; de wachtrij is de prijs.
  Het tweede slot komt terug zodra de Proxmox-VM meer RAM krijgt (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Lichte pool: `omni-light` (2026-08-29, #11965).** `omniroute-113` en `omniroute-113-2` hebben
  `omni-light` voor jobs die alleen een backend-`next build` nodig hebben (~5–6 GB), maar geen volledige build: de
  nachtelijke Schemathesis-, promptfoo-, garak- en axe-a11y-jobs. Ze draaiden op de gehoste runner van 7 GB en
  vielen uit op `release/v3.8.51` zonder dat iemand toezicht hield. In het slechtste geval zijn er op de machine 2 zware + 2 lichte ≈
  30 + 12 GB — meer dan 31 GB RAM, maar binnen de 16 GB swap; de echte oplossing voor extra speelruimte is meer RAM
  op de Proxmox-VM (`tomni-proxmox-113`), waardoor de labellimieten 3 zware + 2 lichte worden.
- **Bewust minder listeners.** Vier OmniRoute-units zijn op 2026-08-29 uitgeschakeld — omdat alleen
  `ci.yml` `Build` en de nachtelijke jobs de machine gebruiken, waren 8 listeners inactief en is elke extra listener een
  potentiële tenant van 14 GB. De limiet van de janitor is 6 (`MAX_ACTIVE_RUNNERS=6` in cron): deze telt
  elke `Runner.Listener` op de machine, en OmniHeuris + OmniMind voegen er twee toe aan onze vier.
- **Ruim `/tmp` of `_work` nooit handmatig op terwijl een runner bezig is.** Een
  controle gevolgd door verwijdering, met een onderbreking tussen beide, zorgde ervoor dat een actieve Build-job op
  2026-08-27 zijn `_work` verloor. De janitor voert de controle en verwijdering in één stap uit;
  laat die het doen.
- Als een runner midden in een job wordt gestopt, wordt de job geannuleerd (live waargenomen): voer `systemctl stop` alleen uit
  wanneer de listener geen onderliggend `Runner.Worker`-proces heeft — en doe dit in één opdracht.
- Workflows mogen geen artefacten in `/tmp` plaatsen (dit staat in RAM). Download naar
  `$RUNNER_TEMP` (op schijf, per runner) — het duurde 27–32
  minuten om het `next-build`-artefact van 1,3 GB op de tmpfs te plaatsen en 2 minuten om het vanaf schijf te uploaden.
- De `.15`-VPS is uitsluitend voor homologatie — daarop draaien nooit CI-runners.
