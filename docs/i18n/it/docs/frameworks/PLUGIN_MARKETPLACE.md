# Plugin Marketplace (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte autorevole:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute include un sistema di plugin in stile WordPress. I plugin sono
directory autonome, ciascuna con un manifest `plugin.json` e un file di ingresso,
che si agganciano alla pipeline delle richieste (`onRequest` / `onResponse` /
`onError`) e agli eventi del ciclo di vita (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

Il **Marketplace dei plugin** costituisce il livello di rilevamento sopra tale
sistema. Espone un catalogo consultabile di plugin installabili. Per impostazione
predefinita, il catalogo è un piccolo registro iniziale integrato; un operatore
può configurarlo affinché utilizzi l'URL di un registro remoto personalizzato,
nel qual caso il recupero è protetto da una misura anti-SSRF con risoluzione DNS
(vedere [Sicurezza](#security)).

Ogni route dei plugin è accessibile **solo tramite loopback** (livello 1 —
`LOCAL_ONLY`): i plugin caricano ed eseguono codice in processi figlio, pertanto
le route non sono raggiungibili da origini non loopback, indipendentemente
dall'autenticazione. Vedere
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Funzionamento complessivo

```
Dashboard (/dashboard/plugins)
  ├─ Scheda "Installati"   → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (disinstallazione)
  └─ Scheda "Marketplace" → GET /api/plugins/marketplace
                              → listMarketplacePlugins()
                                ├─ nessun URL personalizzato → SEED_REGISTRY integrato
                                └─ URL personalizzato → protezione SSRF isSafeMarketplaceUrl()
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Livello del registro** — `src/lib/plugins/marketplace.ts`: elenca ed esegue
  ricerche nel catalogo, utilizzando il registro iniziale come fallback in caso
  di qualsiasi errore.
- **Livello del ciclo di vita** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`): installazione, aggiornamento, attivazione, disattivazione,
  disinstallazione, scansione e caricamento all'avvio.
- **Livello del manifest** — `src/lib/plugins/manifest.ts`: schema Zod e valori
  predefiniti per `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: rileva i plugin presenti sul disco
  nella directory dei plugin.
- **Loader** — `src/lib/plugins/loader.ts`: avvia ciascun plugin in un processo
  figlio isolato e gestisce le chiamate agli hook tramite IPC.

## Catalogo del Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) restituisce un
elenco di oggetti `MarketplaceEntry`:

| Campo         | Tipo     | Note                                               |
| ------------- | -------- | -------------------------------------------------- |
| `name`        | string   | Nome del plugin in formato kebab-case              |
| `version`     | string   | semver                                             |
| `description` | string   | Breve riepilogo                                    |
| `author`      | string   | Autore / organizzazione                            |
| `license`     | string   | Identificativo della licenza in stile SPDX         |
| `downloadUrl` | string   | URL di download della fonte (può essere vuoto)     |
| `repository`  | string?  | URL facoltativo del repository                     |
| `tags`        | string[] | Tag per ricerca/filtro                             |
| `downloads`   | number   | Numero di download                                 |
| `rating`      | number   | 0–5                                                |
| `verified`    | boolean  | Indica se la voce è contrassegnata come verificata |
| `lastUpdated` | string   | Stringa di data in formato simile a ISO            |

Quando non è configurato alcun URL di registro personalizzato, il catalogo
corrisponde al `SEED_REGISTRY` integrato (attualmente `request-logger`,
`rate-limiter`, `cost-tracker` e `theme-manager`). Il registro iniziale è sempre
disponibile: se un registro remoto configurato non è raggiungibile, restituisce
uno stato diverso da `200` oppure restituisce un corpo non riconosciuto,
`listMarketplacePlugins()` registra un avviso e utilizza come fallback l'elenco
iniziale.

> Nota: il **catalogo** del Marketplace (consultazione/ricerca) è collegato end
> to end, ma l'**installazione** con un solo clic dal catalogo non è ancora
> implementata: il pulsante "Installa" della dashboard relativo a una voce del
> Marketplace mostra attualmente un avviso "disponibile prossimamente".
> Attualmente, l'installazione avviene tramite il flusso di installazione da
> percorso locale (`POST /api/plugins`) e il rilevamento su disco
> (`POST /api/plugins/scan`).

## API REST

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`) **e** sono
accessibili solo tramite loopback — `/api/plugins` e `/api/plugins/` sono elencati in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metodo | Descrizione                                                              |
| -------------------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Elenca i plugin installati (filtro `?status=` opzionale)                 |
| `/api/plugins`                   | POST   | Installa un plugin da un percorso locale assoluto                        |
| `/api/plugins/scan`              | POST   | Analizza la directory dei plugin e registra nuovi plugin                 |
| `/api/plugins/marketplace`       | GET    | Elenca le voci del catalogo del marketplace                              |
| `/api/plugins/[name]`            | GET    | Ottiene i dettagli del plugin installato                                 |
| `/api/plugins/[name]`            | DELETE | Disinstalla un plugin                                                    |
| `/api/plugins/[name]/activate`   | POST   | Attiva (carica + registra gli hook)                                      |
| `/api/plugins/[name]/deactivate` | POST   | Disattiva (esegue `onDeactivate`, annulla la registrazione degli hook)   |
| `/api/plugins/[name]/config`     | GET    | Ottiene la configurazione del plugin + il relativo schema                |
| `/api/plugins/[name]/config`     | PUT    | Aggiorna la configurazione del plugin (convalidata rispetto allo schema) |

Il filtro `status` di `GET /api/plugins` accetta uno dei seguenti valori:
`installed` / `active` / `inactive` / `error`. Un valore non valido restituisce `400`.

### Elencare i plugin installati

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installare da un percorso locale

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Il `path` deve essere **assoluto** e non può contenere segmenti di attraversamento `..` né
byte nulli (vincolo applicato da Zod). La directory sorgente deve contenere un
`plugin.json` valido (oppure essere la directory padre di una che lo contiene). In caso di successo, la risposta è `201` e include la
riga del plugin installato.

### Esplorare il marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aggiornare la configurazione del plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` convalida ogni valore fornito rispetto al
`configSchema` del plugin (dichiarato nel manifest): i campi `number` rispettano `min`/`max`,
mentre i campi `select` devono corrispondere all'`enum` dichiarato. Le chiavi non presenti nello schema
sono consentite.

## Configurazione

### Directory dei plugin

I plugin si trovano nella directory dei dati di OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o qualsiasi file indicato da manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determina tale directory in
tre passaggi:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando impostata — viene utilizzata alla lettera, indipendentemente dal valore di `HOME`. Questa è
   l'opzione esplicita per Docker/K8s, dove l'albero dei plugin viene montato tramite bind in un percorso
   che in genere non ha nulla a che fare con la directory home del container (#11827).
2. `<home>/.omniroute/plugins`, dove `<home>` deriva dalle variabili d'ambiente `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando il processo non esporta alcuna directory home.

La directory determinata viene registrata una volta all'avvio come `scanner.dir_resolved`, indicando
l'input selezionato (`OMNIROUTE_PLUGINS_DIR`, `home` o `no-home-fallback`): in questo modo, un'immagine
che finisce silenziosamente al passaggio 3 lo segnala, anziché riportare soltanto un elenco di plugin vuoto.
`POST /api/plugins/scan` rileva qualsiasi sottodirectory che contenga un
`plugin.json` valido e la registra; la stessa directory è la radice in cui
`pluginManager.install()` copia i plugin, quindi un override sposta insieme rilevamento e
installazione.

> **`OMNIROUTE_PLUGINS_DIR` non è `OMNIROUTE_PLUGIN_PATH`.** Quest'ultima viene letta solo dal
> loader dei plugin di comando della CLI (`bin/cli/plugins.mjs`) per individuare i pacchetti npm `omniroute-cmd-*`
> che aggiungono sottocomandi a `omniroute`: non ha alcun effetto sullo scanner runtime
> descritto qui. Per questo aspetto, consultare [PLUGINS.md](./PLUGINS.md).

### URL personalizzato del registro del marketplace

La sorgente del catalogo del marketplace viene letta dall'impostazione `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` legge `settings.pluginMarketplaceUrl`). Quando
è impostata su un URL `http(s)`, `listMarketplacePlugins()` recupera tale URL e accetta
sia un array JSON di voci al livello principale, sia un oggetto con un array `plugins`;
le voci prive di un `name` di tipo stringa vengono escluse. Quando l'impostazione non è definita (oppure quando il recupero
non supera la protezione SSRF / restituisce una risposta non valida), viene utilizzato il registro seed
integrato.

La scheda "Marketplace" della dashboard espone un campo per questo URL (letto tramite
`GET /api/settings`).

> Nota sull'implementazione: l'azione "Save" della dashboard invia
> `pluginMarketplaceUrl` a `PATCH /api/settings`. Al momento della stesura, questa
> chiave non è dichiarata in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), quindi verifica la persistenza nella tua
> release prima di farvi affidamento: il percorso di **lettura** (`getSettings()` →
> `listMarketplacePlugins()`) rispetta la chiave una volta che questa è presente nell'archivio delle
> impostazioni.

## Sicurezza

### Livello della route — solo loopback

I plugin eseguono codice in processi figlio generati, pertanto l'intera superficie
`/api/plugins` è classificata come `LOCAL_ONLY` (Livello 1). L'applicazione del
vincolo di loopback viene eseguita incondizionatamente **prima** di qualsiasi
controllo di autenticazione, quindi un token di gestione trapelato che raggiunga
la macchina tramite un tunnel non può comunque installare, attivare o
disinstallare un plugin. Consultare
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) e le
Regole rigide n. 15 / n. 17.

### Protezione SSRF del registro del marketplace

L'URL di un registro personalizzato è una configurazione influenzabile da un
autore di attacchi, quindi prima di recuperarlo `listMarketplacePlugins()` lo
sottopone a due livelli di controllo:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rifiuta tutto ciò che non usa `http:` / `https:`.
   - Rifiuta gli host letterali privati/loopback/link-local/ULA (IPv4 **e** IPv6,
     inclusi quelli con mapping IPv4) tramite la funzione canonica `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Risolve **entrambi** i record `A` e `AAAA` e rifiuta l'URL se **qualsiasi**
     indirizzo risolto è privato, impedendo l'aggiramento tramite nome host
     pubblico → IP privato.
   - **Nega in caso di errore**: un errore di risoluzione DNS comporta il rifiuto
     dell'URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): applica nuovamente al momento
   del recupero la protezione dell'URL limitata agli indirizzi pubblici e
   **blocca i reindirizzamenti** (impedendo un pivot `30x` da pubblico a
   privato).

Un URL che non supera uno dei due livelli non interrompe la richiesta: il
marketplace ripiega silenziosamente sul registro seed integrato e registra un
avviso.

> Questa protezione è stata rafforzata nella PR n. 3774 specificamente per
> risolvere sia A sia AAAA e utilizzare la funzione canonica `isPrivateHost`
> anziché un controllo limitato a IPv4.

### Isolamento dell'esecuzione dei plugin

- **Isolamento dei processi** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  avvia ogni plugin in un processo figlio Node.js separato e comunica tramite
  IPC. Le chiamate agli hook prevedono un timeout con escalation da `SIGTERM` a
  `SIGKILL`.
- **Elenco consentito delle variabili di ambiente** — il processo figlio riceve
  solo un insieme autorizzato di variabili di ambiente; l'insieme più ampio
  viene concesso solo quando il manifest richiede l'autorizzazione `env`.
- **Contenimento dei percorsi** — installazione/aggiornamento/disinstallazione
  verificano che la directory del plugin e `manifest.main` vengano risolti
  **all'interno** della radice gestita dei plugin prima di qualsiasi copia o
  eliminazione ricorsiva (protezione contro percorsi del DB manomessi e
  attraversamento `../` in `manifest.main`). L'attivazione risolve i link
  simbolici tramite `realpath` e rifiuta di caricare un punto di ingresso che
  fuoriesca dalla directory del plugin.
- **Vincolo di integrità facoltativo** — un manifest può dichiarare un campo
  `integrity` (`sha256-<base64>`, formato SRI). Quando presente, il loader
  verifica l'hash del file di ingresso al momento del caricamento e rifiuta
  l'attivazione in caso di mancata corrispondenza. Si tratta di un rilevamento
  facoltativo delle manomissioni, **non** di un confine di sicurezza: il routing
  limitato al loopback e il modello delle autorizzazioni costituiscono i
  confini effettivi.

## Manifest (`plugin.json`)

Convalidato da `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Note                                                                     |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| `name`             | string    | Obbligatorio; kebab-case (`^[a-z0-9-]+$`), 1–100 caratteri               |
| `version`          | string    | Obbligatorio; semver (`MAJOR.MINOR.PATCH`)                               |
| `description`      | string?   | ≤ 500 caratteri                                                          |
| `author`           | string?   | ≤ 200 caratteri                                                          |
| `license`          | string?   | Valore predefinito: `MIT`                                                |
| `main`             | string?   | File di ingresso; valore predefinito: `index.js`                         |
| `source`           | enum?     | `local` \| `marketplace` (valore predefinito: `local`)                   |
| `tags`             | string[]? | Tag di ricerca                                                           |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | object?   | Booleani che dichiarano quali hook implementa il plugin                  |
| `skills`           | object[]? | Definizioni facoltative delle skill                                      |
| `enabledByDefault` | boolean?  | Attivazione automatica all'installazione                                 |
| `configSchema`     | object?   | Mappa dei campi di configurazione (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Vincolo facoltativo `sha256-<base64>` per il file di ingresso            |

Le autorizzazioni sono definite dall'enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Flusso del ciclo di vita

```
install (POST /api/plugins, percorso)
  → analizza/valida il manifest → copia nell'area di staging → verifica che main sia all'interno della directory
  → rinomina atomicamente in ~/.omniroute/plugins/<name> → inserisce la riga nel DB
  → esegue onInstall → se enabledByDefault: attiva

activate (POST /api/plugins/{name}/activate)
  → verifica del contenimento tramite realpath → loadPlugin() (avvia un processo figlio)
  → registra gli hook dichiarati → status = "active" → esegue onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → esegue onDeactivate (PRIMA di annullare la registrazione) → annulla la registrazione degli hook
  → termina il processo figlio → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → disattiva se attivo → esegue onUninstall
  → eliminazione ricorsiva, con verifica del contenimento, della directory del plugin → elimina la riga dal DB
```

La riesecuzione di `install` su una directory la cui versione del manifest è **strettamente
più recente** rispetto alla versione installata esegue automaticamente l'aggiornamento (reinstallazione pulita; la configurazione viene ripristinata
ai valori predefiniti). Una versione uguale o precedente viene rifiutata.

## Database

Tabella `plugins` (migrazione `076_create_plugins.sql`):

| Colonna         | Tipo    | Note                                                               |
| --------------- | ------- | ------------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                               |
| `name`          | TEXT    | Univoco                                                            |
| `version`       | TEXT    | semver; valore predefinito `1.0.0`                                 |
| `description`   | TEXT    | Facoltativo                                                        |
| `author`        | TEXT    | Facoltativo                                                        |
| `license`       | TEXT    | Valore predefinito `MIT`                                           |
| `main`          | TEXT    | File di ingresso; valore predefinito `index.js`                    |
| `source`        | TEXT    | Valore predefinito `local`                                         |
| `tags`          | TEXT    | Array JSON; valore predefinito `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                   |
| `enabled`       | INT     | 0/1; valore predefinito 0                                          |
| `manifest`      | TEXT    | JSON completo del manifest                                         |
| `config`        | TEXT    | JSON; valore predefinito `{}`                                      |
| `config_schema` | TEXT    | JSON; valore predefinito `{}`                                      |
| `hooks`         | TEXT    | Array JSON dei nomi degli hook dichiarati; valore predefinito `[]` |
| `permissions`   | TEXT    | Array JSON; valore predefinito `[]`                                |
| `plugin_dir`    | TEXT    | Directory di installazione assoluta                                |
| `error_message` | TEXT    | Impostato quando `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                  |
| `updated_at`    | TEXT    | `datetime('now')`                                                  |
| `activated_at`  | TEXT    | Impostato all'attivazione                                          |

Le metriche e i dati analitici dei plugin vengono registrati in tabelle aggiuntive
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

La pagina della dashboard all'indirizzo `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) presenta due schede:

- **Installati** — elenca i plugin installati con i relativi hook dichiarati, un
  interruttore per attivarli/disattivarli, un pulsante di disinstallazione e un'azione "Cerca plugin"
  (`POST /api/plugins/scan`).
- **Marketplace** — mostra il catalogo restituito da `GET /api/plugins/marketplace` con un
  campo per impostare l'URL del registro personalizzato.

La pagina di configurazione di ciascun plugin si trova all'indirizzo `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vedi anche

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  perché `/api/plugins` è accessibile solo da loopback (Livello 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — il framework correlato per le skill
  (`src/lib/skills/`); i plugin possono dichiarare skill nel proprio manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrazioni in uscita
  basate su eventi
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  il pattern `buildErrorBody()` utilizzato da ogni route dei plugin per le risposte di errore
