# Self-Hosted Runner Box Operations (.113 pool) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Der selbst gehostete Pool (`self-hosted, omni-release` auf allen acht Runnern; `omni-build` auf zwei) läuft auf dem **.113**-Server.
Gemessen am 2026-08-28 (Postmortem zu v3.8.50, Teil III):

| Ressource  | Wert                                                                                                             | Bedeutung für die Planung                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **31 GB / 32 Kerne** (beim erstmaligen Verfassen dieses Dokuments waren es 16 GB)                                | Ein `next-build` erreicht Spitzenwerte von **~14 GB** → 2 parallele ressourcenintensive Builds lasten den Server aus, 3 legen ihn lahm (2026-08-28 06:42Z: Last 56, zwei Jobs verloren) |
| Swap       | 15 GB                                                                                                            | Die Veröffentlichung von v3.8.50 gelang nur unter starker Swap-Nutzung; der Speicherdruck ist in `/proc/pressure/memory` sichtbar                                                       |
| `/tmp`     | **12 GB tmpfs = RAM**                                                                                            | Alles, was dort abgelegt wird, belegt Arbeitsspeicher; Überreste werden nach 3 h bereinigt                                                                                              |
| Festplatte | 188 GB                                                                                                           | `_work`-Checkouts von 8 Runnern erreichen ohne Begrenzung ~70 GB                                                                                                                        |
| Runner     | **6 Listener**: 4 OmniRoute (1 `omni-build` + 1 nur für `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | Alle teilen sich den oben genannten Arbeitsspeicher; `omniroute-113-3/-4/-7/-8` sind deaktiviert (`systemctl enable --now` reaktiviert jeweils einen)                                   |

## Janitor installieren (einmalig auf dem Server)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): alle 30 Minuten, Protokollierung nach /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` ist erforderlich: Der Janitor weist anhand einer Momentaufnahme der geöffneten
Dateien nach, dass ein Pfad inaktiv ist, bevor er ihn entfernt. Ohne dieses Werkzeug
entfernt er nichts und meldet dies entsprechend (Exit-Code 1). Jede Änderung zuerst
mit `--dry-run` testen — dabei wird exakt ausgegeben, was ausgeführt würde, ohne
irgendetwas zu verändern.

Was bei jedem Lauf geschieht: Eigene Überreste (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) werden nach **3 h auf tmpfs** und nach 24 h im
Verzeichnis `_work/_temp` auf der Festplatte bereinigt; ein `next-build`, der älter
als 75 Minuten ist, wird beendet (kein Job läuft so lange — am 2026-08-27 lief einer
noch 70 Minuten weiter, nachdem GitHub den zugehörigen Job bereits als verloren
eingestuft hatte); 48 h alte Checkouts von Runnern, deren Unit **gestoppt** ist,
werden entfernt; Warnungen werden bei einer Festplattenbelegung ≥ 85 %, einem
Speicher-PSI-Wert `full/avg60` ≥ 10 % sowie bei mehr Listenern als
`MAX_ACTIVE_RUNNERS` ausgegeben (einschließlich einer Aufschlüsselung nach
omniroute/sonstigen Listenern). Exit-Code 1 = Eingreifen erforderlich; das Protokoll
prüfen.

## Runner-Units: KillMode

Das standardmäßige `KillMode=process` des Runners lässt `Runner.Worker → npm → next-build`
weiterlaufen, wenn eine Unit gestoppt oder neu gestartet wird — ein verwaister Build verbraucht
weiterhin RAM und CPU, ohne dass ihm ein Job zugeordnet ist. Jede OmniRoute-Unit verfügt über ein Drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
mit `KillMode=mixed`: zuerst SIGTERM an den Listener, dann bei
`TimeoutStop` SIGKILL an die gesamte cgroup. Es wird beim nächsten Neustart der Unit wirksam — starten Sie
**jeweils nur einen Runner und nur im Leerlauf** neu, wobei sich die Leerlaufprüfung und der Neustart
im selben Befehl befinden müssen.

## Betriebsregeln

- **Obergrenze für umfangreiche Builds: EINER gleichzeitig — per Label durchgesetzt (seit 2026-08-29).** Jeder Job,
  der einen vollständigen `next build` ausführt, zielt auf `[self-hosted, omni-build]`, und nur
  **`omniroute-113-5`** trägt dieses Label (über die Runners-API hinzugefügt — keine
  erneute Registrierung): `ci.yml` `Build`, `npm-publish.yml` `publish`, beide
  `nightly-release-green`-Validierungen und `docker-publish.yml` **amd64** (beim gehosteten
  Runner mit 7 GB trat für diesen Tree ResourceExhausted auf — #11976). Der arm64-Docker-Zweig bleibt
  mit webpack auf `ubuntu-24.04-arm` (keine ARM-Maschine). Docker amd64 verwendet ebenfalls webpack:
  Turbopack geriet bei diesem Tree innerhalb von BuildKit in Panik (`TurbopackInternalError:
there must be a path to a root`, Lauf 33253576569), selbst mit 31 GB; der arm64-webpack-Build
  desselben Trees war auf gehostetem ARM erfolgreich. `docker-publish` amd64
  teilt sich die Concurrency-Gruppe `heavy-build-main` mit `ci.yml` `Build`
  (`cancel-in-progress: false`), sodass der Job auf den einzigen Slot wartet. Docker Engine
  muss auf `omniroute-113-5` vorhanden sein (`docker info` ist der erste Schritt des Publish-Jobs).
  Zwei war die vorherige Obergrenze, und sie war für 31 GB falsch: Am
  2026-08-29 um 17:26 UTC reduzierten zwei gleichzeitig laufende `next-build`s (15,4 GB + 17,2 GB RSS)
  den freien Speicher der Maschine auf 5 GB, während 4 GB Swap belegt waren, woraufhin der Kernel
  einen der Prozesse per OOM-Kill beendete — systemd verbuchte den Kill bei der Unit des _anderen_
  Runners, `runsvc.sh` beendete diesen Listener per SIGKILL, und der dort ausgeführte Job brach mit
  „The runner has received a shutdown signal“ ab (derselbe Text wie bei einem OOM auf einem
  gehosteten Runner). `omniroute-113-6` behält ausschließlich `omni-release`. Umfangreiche Builds aus
  `main`-Merges, PRs und dem nächtlichen Lauf werden nun über einen einzigen Slot serialisiert; die
  Warteschlange ist der Preis dafür. Der zweite Slot kehrt zurück, sobald die Proxmox-VM mehr RAM
  erhält (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool für leichte Jobs: `omni-light` (2026-08-29, #11965).** `omniroute-113` und `omniroute-113-2` tragen
  `omni-light` für Jobs, die nur einen backendseitigen `next build` (~5–6 GB), aber keinen vollständigen
  Build benötigen: die nächtlichen Schemathesis-, promptfoo-, garak- und axe-a11y-Jobs. Sie liefen auf dem
  gehosteten Runner mit 7 GB und brachen auf `release/v3.8.51` ab, ohne dass jemand es bemerkte. Im
  ungünstigsten Fall laufen auf der Maschine 2 umfangreiche + 2 leichte Builds ≈ 30 + 12 GB — mehr als
  die 31 GB RAM, aber innerhalb der 16 GB Swap; die eigentliche Lösung für mehr Reserve ist zusätzlicher
  RAM für die Proxmox-VM (`tomni-proxmox-113`), wodurch sich die Label-Obergrenzen auf 3 umfangreiche +
  2 leichte Builds erhöhen.
- **Bewusst weniger Listener.** Vier OmniRoute-Units wurden am 2026-08-29 deaktiviert — da nur
  `ci.yml` `Build` und die nächtlichen Läufe die Maschine verwenden, waren 8 Listener im Leerlauf, und
  jeder weitere ist ein potenzieller Verbraucher von 14 GB. Die Obergrenze des Janitors beträgt 6
  (`MAX_ACTIVE_RUNNERS=6` in cron): Er zählt jeden `Runner.Listener` auf der Maschine, und OmniHeuris +
  OmniMind steuern zwei zu unseren vier bei.
- **Bereinigen Sie niemals `/tmp` oder `_work` manuell, während irgendein Runner beschäftigt ist.**
  Eine Prüfung mit anschließender Löschung und einer Lücke zwischen beiden Vorgängen führte dazu, dass
  ein laufender Build-Job am 2026-08-27 sein `_work` verlor. Der Janitor führt die Prüfung und das
  Entfernen in einem einzigen Schritt durch; überlassen Sie es ihm.
- Das Stoppen eines Runners während eines Jobs bricht den Job ab (im Live-Betrieb beobachtet):
  `systemctl stop` nur dann ausführen, wenn sein Listener keinen untergeordneten `Runner.Worker`-Prozess
  hat — und dies in einem einzigen Befehl tun.
- Workflows dürfen keine Artefakte in `/tmp` ablegen (es liegt im RAM). Laden Sie sie nach
  `$RUNNER_TEMP` herunter (pro Runner auf der Festplatte) — das 1,3 GB große `next-build`-Artefakt
  benötigte 27–32 Minuten, um auf dem tmpfs zu landen, und 2 Minuten für den Upload von der Festplatte.
- Der VPS `.15` dient ausschließlich der Homologation — dort laufen niemals CI-Runner.
