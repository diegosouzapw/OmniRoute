# SQLite Runtime Resolution (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute risolve il proprio driver SQLite all'avvio tramite una catena di fallback in 5 passaggi:

1. **`better-sqlite3` incluso** (tramite `dependencies` in `package.json`)
   — il più veloce, binario nativo, installato da `npm install` quando sono presenti gli strumenti di compilazione.

2. **`better-sqlite3` installato a runtime** (in `~/.omniroute/runtime/`)
   — installato in modo differito alla prima esecuzione **OPPURE** da `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Convalida i magic byte del file nativo `.node` (ELF / Mach-O / PE) prima del caricamento
   per proteggersi da binari corrotti o destinati alla piattaforma sbagliata.

3. **`node:sqlite`** (libreria standard di Node ≥22.5) — non richiede una compilazione nativa; viene utilizzato quando
   entrambi i percorsi di better-sqlite3 falliscono. Set di funzionalità limitato.

4. **`sql.js`** (WASM) — fallback finale. Funziona ovunque, ma è più lento
   e scrive i dati a intervalli anziché in modo sincrono.

## Perché questa complessità?

- **EBUSY su Windows**: `npm install -g omniroute@latest` può non riuscire se il file
  `better_sqlite3.node` della versione precedente è bloccato da un processo in esecuzione. L'installazione
  a runtime in `~/.omniroute/runtime/` evita la cache npm globale.
- **Assenza di strumenti di compilazione**: alcuni ambienti (Windows aziendale senza VS Build
  Tools, immagini Docker minimali) non possono compilare `better-sqlite3`. Il programma di installazione
  a runtime recupera un binario precompilato dal registro npm; i driver di fallback
  garantiscono che OmniRoute possa comunque avviarsi anche se l'operazione non riesce.
- **Sistemi isolati dalla rete**: se il registro npm non è raggiungibile, `node:sqlite`
  o `sql.js` garantiscono le funzionalità di base.

## Convalida dei magic byte

Prima di caricare un file `.node` installato a runtime, OmniRoute legge i primi 8
byte e li confronta con i magic byte noti delle piattaforme:

| Piattaforma            | Byte (hex)    | Etichetta   |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64 bit BE        | `FE ED FA CF` | `macho`     |
| macOS 64 bit LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (universale) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

Un magic byte non corrispondente → il file viene ignorato e il fallback prosegue al passaggio successivo.

## Verifica del driver attivo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Controllo manuale

```bash
# Ignora il riscaldamento post-installazione (per installazioni CI rapide)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forza la reinstallazione di better-sqlite3 a runtime
rm -rf ~/.omniroute/runtime
omniroute  # verrà reinstallato al prossimo avvio

# Verifica quale driver è attivo
omniroute config db-info  # (se il comando CLI esiste)
```

## Riferimenti

Implementazione:

- `bin/cli/runtime/magicBytes.mjs` — funzioni di supporto per la convalida dei magic byte dei binari
- `bin/cli/runtime/sqliteRuntime.mjs` — risolutore a runtime in 5 passaggi + programma di installazione differita
- `bin/cli/runtime/index.mjs` — orchestratore di avvio (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm successivo all'installazione (riscaldamento non bloccante)
- `src/lib/db/core.ts` — esportazioni di `ensureDbInitialized()` / `getDriverInfo()`

## Topologia a singolo writer (HA non supportata)

La catena di fallback dei driver descritta sopra viene comunque eseguita in **un solo processo**. Con SQLite
predefinito, OmniRoute è un sistema a **singolo writer**:

- Non collegare due repliche di OmniRoute allo stesso file `storage.sqlite`.
- Un riavvio del container, un deployment Recreate, un OOM kill o un riavvio dovuto a HEALTHCHECK interrompe
  ogni sessione SSE in corso. Nel percorso standard non è previsto alcun drenaggio delle sessioni.
- Una verifica di liveness dell'orchestratore che considera una risposta lenta di `/healthz` come un arresto anomalo terminerà l'unica
  replica. Preferire una verifica di liveness TCP + una verifica di readiness HTTP su `/healthz`. Consultare la
  [Guida Docker — disponibilità](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  e i [consigli per le probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
