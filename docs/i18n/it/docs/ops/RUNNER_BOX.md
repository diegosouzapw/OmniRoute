# Self-Hosted Runner Box Operations (.113 pool) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Il pool self-hosted (`self-hosted, omni-release` su tutti e otto i runner; `omni-build` su due) viene eseguito sulla macchina **.113**.
Misurato il 2026-08-28 (post-mortem della v3.8.50, Parte III):

| risorsa   | valore                                                                                                        | implicazioni per la pianificazione                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 core** (erano 16 GB quando questo documento è stato scritto per la prima volta)                  | un `next-build` raggiunge picchi di **~14 GB** → 2 build pesanti simultanee saturano la macchina, 3 la mandano in crash (2026-08-28 06:42Z: carico 56, due job persi) |
| swap      | 15 GB                                                                                                         | è riuscita a completare la pubblicazione della v3.8.50 ricorrendo allo swap; la pressione è visibile in `/proc/pressure/memory`                                       |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                         | tutto ciò che viene lasciato lì occupa memoria; i residui vengono rimossi dopo 3 h                                                                                    |
| disco     | 188 GB                                                                                                        | i checkout `_work` di 8 runner raggiungono ~70 GB senza alcun limite                                                                                                  |
| runner    | **6 listener**: 4 OmniRoute (1 `omni-build` + 1 solo `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | tutti condividono la memoria indicata sopra; `omniroute-113-3/-4/-7/-8` sono disabilitati (`systemctl enable --now` ne riattiva uno)                                  |

## Installare il janitor (una sola volta, sulla macchina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): ogni 30 minuti, registra i log in /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` è obbligatorio: il janitor verifica che un percorso sia inattivo tramite una singola istantanea dei file aperti prima di rimuoverlo; senza questo strumento non rimuove nulla e lo segnala (exit 1). Provare prima qualsiasi modifica con `--dry-run`: mostra esattamente ciò che farebbe senza modificare nulla.

Operazioni eseguite a ogni avvio: elimina i residui generati dal sistema (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) dopo **3 h su tmpfs** e dopo 24 h in `_work/_temp` sul disco; termina un `next-build` che dura da più di 75 min (nessun job richiede così tanto tempo: il 2026-08-27 uno è rimasto in esecuzione per 70 min dopo che GitHub aveva dichiarato perso il relativo job); elimina i checkout risalenti a più di 48 h dei runner la cui unità è **arrestata**; genera avvisi in caso di utilizzo del disco ≥ 85%, PSI della memoria `full/avg60` ≥ 10% e numero di listener superiore a `MAX_ACTIVE_RUNNERS` (con suddivisione tra omniroute e altri). Exit 1 = è richiesto un intervento; consultare il log.

## Unità runner: KillMode

Il valore predefinito `KillMode=process` del runner lascia in vita
`Runner.Worker → npm → next-build` quando un'unità viene arrestata o riavviata:
una build orfana continua a consumare RAM e CPU senza alcun job associato. Ogni
unità OmniRoute contiene un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
con `KillMode=mixed`: prima SIGTERM al listener, poi SIGKILL all'intero cgroup al
raggiungimento di `TimeoutStop`. Diventa effettivo al successivo riavvio
dell'unità: riavviare **un solo runner alla volta, esclusivamente quando è
inattivo**, eseguendo il controllo dello stato di inattività e il riavvio nello
stesso comando.

## Regole operative

- **Limite per le build pesanti: UNA alla volta — applicato tramite etichetta (dal 2026-08-29).** Ogni job
  che esegue un `next build` completo usa come destinazione `[self-hosted, omni-build]` e soltanto
  **`omniroute-113-5`** possiede tale etichetta (aggiunta tramite l'API dei runner, senza
  ripetere la registrazione): `ci.yml` `Build`, `npm-publish.yml` `publish`, entrambe le
  convalide `nightly-release-green` e **amd64** di `docker-publish.yml` (il runner ospitato
  da 7 GB ha generato ResourceExhausted con questo albero — #11976). Il ramo Docker arm64 rimane su
  `ubuntu-24.04-arm` (nessuna macchina ARM) con webpack. Anche Docker amd64 utilizza webpack:
  Turbopack è andato in panic all'interno di BuildKit con questo albero (`TurbopackInternalError:
there must be a path to a root`, esecuzione 33253576569), persino con 31 GB; la build
  arm64 con webpack dello stesso albero sul runner ARM ospitato è riuscita. amd64 di
  `docker-publish` condivide il gruppo di concorrenza `heavy-build-main` con `Build` di
  `ci.yml` (`cancel-in-progress: false`), quindi resta in coda per l'unico slot. Docker Engine
  deve essere presente su `omniroute-113-5` (`docker info` è il primo passaggio del job di
  pubblicazione). Due era il limite precedente ed era errato per 31 GB: il
  2026-08-29 alle 17:26 UTC, due `next-build` simultanee (15,4 GB + 17,2 GB di RSS) hanno portato la macchina
  a 5 GB liberi con 4 GB di swap in uso e il kernel ne ha terminata una tramite OOM; systemd
  ha attribuito l'uccisione all'unità dell'_altro_ runner, `runsvc.sh` ha inviato SIGKILL a quel listener e
  il relativo job è terminato con "Il runner ha ricevuto un segnale di arresto" (lo stesso testo di un
  OOM su un runner ospitato). `omniroute-113-6` mantiene soltanto `omni-release`. Le build pesanti provenienti
  dai merge su `main`, dalle PR e dall'esecuzione notturna ora vengono serializzate su un solo slot; la coda è il prezzo da pagare.
  Il secondo slot tornerà disponibile quando la VM Proxmox riceverà più RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool leggero: `omni-light` (2026-08-29, #11965).** `omniroute-113` e `omniroute-113-2` possiedono
  `omni-light` per i job che richiedono un `next build` solo del backend (~5–6 GB), ma non uno completo: i
  job notturni Schemathesis, promptfoo, garak e axe-a11y. Venivano eseguiti sul runner ospitato da 7 GB e
  sono terminati su `release/v3.8.51` senza che nessuno se ne accorgesse. Il caso peggiore sulla macchina è 2 pesanti + 2 leggere ≈
  30 + 12 GB: oltre i 31 GB di RAM, ma entro i 16 GB di swap; la vera soluzione per ottenere margine è aumentare la RAM
  della VM Proxmox (`tomni-proxmox-113`), trasformando i limiti basati sulle etichette in 3 pesanti + 2 leggere.
- **Meno listener di proposito.** Quattro unità OmniRoute sono state disabilitate il 2026-08-29: dato che soltanto
  `Build` di `ci.yml` e le esecuzioni notturne usavano la macchina, 8 listener erano inattivi e ciascuno di quelli aggiuntivi è un
  potenziale tenant da 14 GB. Il limite del janitor è 6 (`MAX_ACTIVE_RUNNERS=6` in cron): conteggia
  ogni `Runner.Listener` sulla macchina, mentre OmniHeuris + OmniMind ne aggiungono due ai nostri quattro.
- **Non ripulire mai manualmente `/tmp` o `_work` mentre un runner è occupato.** Un
  controllo seguito dall'eliminazione, con un intervallo tra le due operazioni, è il motivo per cui un job Build attivo ha perso la propria
  directory `_work` il 2026-08-27. Il janitor esegue il controllo e la rimozione in un unico passaggio;
  lascia che se ne occupi.
- Arrestare un runner durante un job annulla il job (osservato dal vivo): usare `systemctl stop` soltanto
  quando il suo listener non ha alcun processo figlio `Runner.Worker` ed eseguire l'operazione con un unico comando.
- I workflow non devono depositare artefatti in `/tmp` (si trova in RAM). Scaricare in
  `$RUNNER_TEMP` (su disco, specifico per ogni runner): l'artefatto `next-build` da 1,3 GB ha impiegato 27–32
  minuti per essere scritto sul tmpfs e 2 minuti per essere caricato dal disco.
- Il VPS `.15` è riservato all'omologazione: non esegue mai runner CI.
