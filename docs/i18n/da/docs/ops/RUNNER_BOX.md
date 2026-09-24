# Self-Hosted Runner Box Operations (.113 pool) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den selvhostede pulje (`self-hosted, omni-release` på alle otte runners; `omni-build` på to) kører på **.113**-maskinen.
Målt 2026-08-28 (v3.8.50-efteranalysen, del III):

| ressource | værdi                                                                                                         | betydning for planlægning                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 kerner** (var 16 GB, da dette dokument først blev skrevet)                                       | én `next-build` topper ved **~14 GB** → 2 samtidige tunge builds mætter maskinen, 3 får den til at gå ned (2026-08-28 06:42Z: belastning 56, to jobs tabt) |
| swap      | 15 GB                                                                                                         | den swappede sig gennem udgivelsen af v3.8.50; presset kan ses i `/proc/pressure/memory`                                                                   |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                         | alt, der placeres der, optager hukommelse; rester ryddes efter 3 t                                                                                         |
| disk      | 188 GB                                                                                                        | `_work`-checkouts fra 8 runners når op på ~70 GB uden nogen grænse                                                                                         |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 kun `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | alle deler ovenstående hukommelse; `omniroute-113-3/-4/-7/-8` er deaktiveret (`systemctl enable --now` aktiverer én igen)                                  |

## Installér oprydningsscriptet (én gang på maskinen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): hvert 30. minut, log til /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` er påkrævet: Oprydningsscriptet bekræfter, at en sti er inaktiv, ved hjælp af ét snapshot af åbne
filer, før stien fjernes, og uden værktøjet fjerner det intet og oplyser dette
(exit 1). Afprøv enhver ændring med `--dry-run` først — det udskriver præcis, hvad det ville
gøre, og ændrer intet.

Det gør følgende ved hver kørsel: rydder vores egne rester (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) efter **3 t på tmpfs** og 24 t på disken i
`_work/_temp`; stopper en `next-build`, der er ældre end 75 min. (ingen jobs kører så længe — den
2026-08-27 kørte én i 70 min., efter at GitHub havde erklæret dens job tabt); fjerner checkouts,
der er ældre end 48 t, fra runners, hvis unit er **stoppet**; advarer ved diskforbrug ≥ 85 %, hukommelses-PSI
`full/avg60` ≥ 10 % og flere listeners end `MAX_ACTIVE_RUNNERS` (med en
opdeling mellem omniroute/andre). Exit 1 = kræver opmærksomhed; læs loggen.

## Runner-enheder: KillMode

Runnerens standardindstilling `KillMode=process` efterlader `Runner.Worker → npm → next-build`
kørende, når en enhed stoppes eller genstartes — et forældreløst build fortsætter med at bruge RAM og
CPU, uden at noget job er tilknyttet. Hver OmniRoute-enhed har en drop-in-fil
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM sendes først til listeneren og SIGKILL til hele cgroup'en ved
`TimeoutStop`. Den træder i kraft ved enhedens næste genstart — genstart **én runner ad
gangen, og kun når den er inaktiv**, med kontrollen af inaktivitet og genstarten i samme kommando.

## Driftsregler

- **Loft for tunge builds: ÉT ad gangen — håndhævet via label (siden 2026-08-29).** Hvert job,
  der kører et fuldt `next build`, målrettes mod `[self-hosted, omni-build]`, og kun
  **`omniroute-113-5`** har denne label (tilføjet via runner-API'et — ingen
  genregistrering): `ci.yml` `Build`, `npm-publish.yml` `publish`, begge
  `nightly-release-green`-valideringer samt **amd64** i `docker-publish.yml` (den hostede
  runner med 7 GB ramte ResourceExhausted på dette træ — #11976). Docker-delen for arm64 forbliver på
  `ubuntu-24.04-arm` (ingen ARM-maskine) med webpack. Docker amd64 bruger også webpack:
  Turbopack gik ned med panic på dette træ inde i BuildKit (`TurbopackInternalError:
there must be a path to a root`, kørsel 33253576569), selv med 31 GB; det samme
  træs arm64-webpack-build lykkedes på hostet ARM. `docker-publish` amd64
  deler concurrency-gruppen `heavy-build-main` med `Build` i `ci.yml`
  (`cancel-in-progress: false`), så det sættes i kø til den ene plads. Docker Engine
  skal være tilgængelig på `omniroute-113-5` (`docker info` er det første trin i publish-jobbet).
  To var det tidligere loft, og det var forkert for 31 GB: den
  2026-08-29 17:26 UTC fik to samtidige `next-build`s (15,4 GB + 17,2 GB RSS) maskinen
  ned på 5 GB ledig plads med 4 GB swap i brug, hvorefter kernen OOM-dræbte det ene — systemd
  registrerede drabet på den _anden_ runners enhed, `runsvc.sh` sendte SIGKILL til den pågældende listener, og
  jobbet på den døde med "Runneren har modtaget et nedlukningssignal" (samme tekst som ved en
  OOM på en hostet runner). `omniroute-113-6` beholder kun `omni-release`. Tunge builds fra
  merges til `main`, PR'er og den natlige kørsel afvikles nu serielt på én plads; køen er prisen.
  Den anden plads vender tilbage den dag, Proxmox-VM'en får mere RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Let pulje: `omni-light` (2026-08-29, #11965).** `omniroute-113` og `omniroute-113-2` har
  `omni-light` til jobs, der kræver et backend-kun-`next build` (~5–6 GB), men ikke et fuldt build: de
  natlige Schemathesis-, promptfoo-, garak- og axe-a11y-jobs. De kørte på den hostede runner med 7 GB og
  døde på `release/v3.8.51`, uden at nogen holdt øje. Værste tilfælde på maskinen er 2 tunge + 2 lette ≈
  30 + 12 GB — over de 31 GB RAM, men inden for de 16 GB swap; den reelle løsning for mere spillerum er mere RAM
  på Proxmox-VM'en (`tomni-proxmox-113`), hvilket ændrer labellofterne til 3 tunge + 2 lette.
- **Færre listeners med vilje.** Fire OmniRoute-enheder blev deaktiveret den 2026-08-29 — når kun
  `Build` i `ci.yml` og de natlige kørsler bruger maskinen, var 8 listeners inaktive, og hver ekstra er en
  potentiel lejer af 14 GB. Janitorens loft er 6 (`MAX_ACTIVE_RUNNERS=6` i cron): den tæller
  hver `Runner.Listener` på maskinen, og OmniHeuris + OmniMind føjer to til vores fire.
- **Ryd aldrig `/tmp` eller `_work` manuelt, mens en runner er optaget.** En
  kontrollér-og-slet-procedure med en pause mellem de to trin var årsagen til, at et aktivt Build-job mistede sit
  `_work` den 2026-08-27. Janitoren udfører kontrollen og fjernelsen i ét trin;
  lad den gøre det.
- Hvis en runner stoppes midt i et job, annulleres jobbet (observeret live): brug kun `systemctl stop`,
  når dens listener ikke har en underordnet `Runner.Worker`-proces — og gør det i én kommando.
- Workflows må ikke parkere artefakter i `/tmp` (det ligger i RAM). Download til
  `$RUNNER_TEMP` (på disk, pr. runner) — `next-build`-artefaktet på 1,3 GB tog 27–32
  minutter om at lande på tmpfs og 2 minutter om at blive uploadet fra disk.
- VPS'en `.15` er kun til homologation — den kører aldrig CI-runnere.
