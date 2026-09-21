# 🌐 OmniRoute Proxy Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Aggira i blocchi geografici, proteggi la tua identità e instrada il traffico AI attraverso qualsiasi proxy, senza alcuna complessità di configurazione.**

OmniRoute include un sistema completo di gestione dei proxy che consente di instradare il traffico verso i provider AI upstream attraverso proxy HTTP, HTTPS o SOCKS5. Che tu ti trovi in una regione soggetta a blocchi, abbia bisogno della rotazione degli IP o desideri un fingerprinting discreto, questa guida tratta ogni aspetto.

---

## Indice

- [Perché usare i proxy?](#perché-usare-i-proxy)
- [Panoramica dell'architettura](#panoramica-dellarchitettura)
- [Sistema proxy a 4 livelli](#sistema-proxy-a-4-livelli)
- [Registro dei proxy (CRUD)](#registro-dei-proxy-crud)
- [Marketplace gratuito 1proxy](#marketplace-gratuito-1proxy)
- [Rotazione dei proxy](#rotazione-dei-proxy)
- [Anti-rilevamento e modalità stealth](#anti-rilevamento-e-modalità-stealth)
- [Modalità proxy upstream](#modalità-proxy-upstream)
- [Interfaccia della dashboard](#interfaccia-della-dashboard)
- [Riferimento API](#riferimento-api)
- [Variabili d'ambiente](#variabili-dambiente)
- [Risoluzione dei problemi](#risoluzione-dei-problemi)

---

## Perché usare i proxy?

Molti provider AI limitano l'accesso in base alla regione geografica. Gli sviluppatori in **Russia, Cina, Iran, Cuba, Turchia** e altri Paesi riscontrano errori come:

```
unsupported_country_region_territory
```

Anche al di fuori delle regioni soggette a blocchi, i proxy sono utili per:

| Caso d'uso                 | Descrizione                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| **Aggiramento geografico** | Accedi a OpenAI, Anthropic, Codex e Copilot da Paesi soggetti a blocchi        |
| **Rotazione degli IP**     | Distribuisci le richieste su più IP per evitare la limitazione della frequenza |
| **Privacy**                | Nascondi il tuo vero IP ai provider upstream                                   |
| **Conformità**             | Instrada il traffico attraverso giurisdizioni specifiche                       |
| **Test**                   | Simula richieste provenienti da regioni diverse                                |

---

## Panoramica dell'architettura

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registro    │    │ Dispatcher   │    │ Fetch (undici)   │  │
│  │ dei proxy   │───▶│ proxy        │───▶│                  │  │
│  │ (SQLite)    │    │ (con cache)  │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sincronizz. │                        │ API del provider │  │
│  │ 1proxy      │                        │ upstream         │  │
│  │ (pool grat.)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Componenti principali

| Componente             | File                                         | Ruolo                                                                 |
| ---------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| **Registro proxy**     | `src/lib/db/proxies.ts`                      | Operazioni CRUD sulle voci proxy e assegnazioni degli ambiti          |
| **Dispatcher proxy**   | `open-sse/utils/proxyDispatcher.ts`          | Crea dispatcher ProxyAgent/SOCKS di `undici` con memorizzazione cache |
| **Fetch proxy**        | `open-sse/utils/proxyFetch.ts`               | Incapsula `fetch()` con l'iniezione del dispatcher proxy              |
| **Route impostazioni** | `src/app/api/settings/proxy/route.ts`        | API legacy per la configurazione proxy (GET/PUT/DELETE)               |
| **Route di gestione**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD del registro (GET/POST/PATCH/DELETE)                         |
| **DB 1proxy**          | `src/lib/db/oneproxy.ts`                     | Persistenza del marketplace di proxy gratuiti                         |

---

## Sistema proxy a 4 livelli

OmniRoute supporta la configurazione dei proxy in **quattro ambiti indipendenti**, risolti in ordine di priorità:

```
Ordine di risoluzione delle priorità (dalla più alta → alla più bassa):

  1. 🔵 Proxy account/connessione  →  per chiave API / connessione OAuth
  2. 🟡 Proxy provider             →  per provider (ad es., tutto il traffico OpenAI)
  3. 🟠 Proxy combinazione         →  per configurazione combinata/di instradamento
  4. 🟢 Proxy globale              →  tutto il traffico, tutti i provider
```

### Come funziona la risoluzione

Quando OmniRoute invia una richiesta a un provider upstream, chiama `resolveProxyForConnectionFromRegistry()`, che controlla ogni livello in ordine:

1. **Livello account** — È stato assegnato un proxy a questo specifico ID di connessione?
2. **Livello provider** — È stato assegnato un proxy a questo provider (ad es., `openai`)?
3. **Livello globale** — È configurato un proxy globale?
4. **Nessun proxy** — Connessione diretta al provider.

Viene usata la prima corrispondenza. Ciò significa che puoi impostare un proxy globale come fallback, ma sostituirlo per provider o connessioni specifici.

### Traffico instradato tramite proxy

| Tipo di traffico             | Tramite proxy? | Note                                           |
| ---------------------------- | -------------- | ---------------------------------------------- |
| Completamenti chat           | ✅             | Tutte le richieste `/v1/chat/completions`      |
| Embedding                    | ✅             | `/v1/embeddings`                               |
| Generazione di immagini      | ✅             | `/v1/images/generations`                       |
| Audio (TTS/STT)              | ✅             | `/v1/audio/*`                                  |
| Scambio di token OAuth       | ✅             | Risolve `unsupported_country_region_territory` |
| Test delle connessioni       | ✅             | Il pulsante "Test Connection" usa il proxy     |
| Aggiornamento dei token      | ✅             | Rinnovo OAuth in background                    |
| Sincronizzazione dei modelli | ✅             | Elenco e rilevamento dei modelli               |

---

## Registro dei proxy (CRUD)

Il registro dei proxy è una tabella SQLite (`proxy_registry`) che memorizza tutti i tuoi proxy. Ogni proxy dispone dei seguenti campi:

| Campo      | Tipo    | Descrizione                                      |
| ---------- | ------- | ------------------------------------------------ |
| `id`       | UUID    | Identificatore univoco                           |
| `name`     | String  | Etichetta leggibile                              |
| `type`     | String  | Protocollo: `http`, `https`, `socks5`            |
| `host`     | String  | Nome host o IP del proxy                         |
| `port`     | Integer | Numero di porta                                  |
| `username` | String  | Nome utente di autenticazione (cifrato a riposo) |
| `password` | String  | Password di autenticazione (cifrata a riposo)    |
| `region`   | String  | Etichetta della regione geografica               |
| `notes`    | String  | Note in formato libero                           |
| `status`   | String  | `active` o `inactive`                            |
| `source`   | String  | `manual` o `oneproxy`                            |

### Creazione di un proxy

**Tramite la dashboard:**

1. Vai a **Settings → Proxy**
2. Fai clic su **Add Proxy**
3. Inserisci il tipo, l'host, la porta e le credenziali di autenticazione facoltative
4. Salva

**Tramite API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aggiornamento di un proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Nota:** Le credenziali vengono mantenute, a meno che non vengano inviate esplicitamente sostituzioni non vuote. L'invio di stringhe vuote per `username`/`password` manterrà i valori memorizzati.

### Eliminazione di un proxy

```bash
# Non riesce se il proxy è assegnato a un qualsiasi ambito
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Forza l'eliminazione (rimuove anche le assegnazioni)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Elenco dei proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Assegnazione dei proxy agli ambiti

```bash
# Assegna all'ambito globale
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Assegna a un provider specifico
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Assegna a una connessione/chiave specifica
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Risoluzione del proxy effettivo

Verifica quale proxy verrebbe utilizzato per una determinata connessione:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Restituisce il proxy risolto con il relativo livello (`account`, `provider` o `global`) e la relativa origine.

### Assegnazione in blocco

Assegna un proxy a più provider o connessioni contemporaneamente:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importazione/esportazione

I proxy sono inclusi nel sistema di **backup/ripristino**. Quando esporti la configurazione di OmniRoute:

1. Vai a **Dashboard → Settings → Backup**
2. Fai clic su **Export** — il registro dei proxy e le assegnazioni sono inclusi
3. Per eseguire il ripristino, fai clic su **Import** e carica il file di backup

Il registro dei proxy supporta anche l'**upsert per host+porta**: se importi un proxy già esistente (stessi host e porta), questo viene aggiornato anziché creare un duplicato.

### Migrazione legacy

Se hai configurato dei proxy in una versione precedente (prima del registro), OmniRoute li migra automaticamente:

```
Archivio key_value legacy → proxy_registry + proxy_assignments
```

Questa operazione viene eseguita una sola volta al primo avvio dopo l'aggiornamento. Usa `migrateLegacyProxyConfigToRegistry({ force: true })` per eseguirla nuovamente.

---

## Marketplace di proxy gratuiti 1proxy

> 🆕 **Contributo di [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute si integra con la piattaforma della community **[1proxy](https://1proxy-api.aitradepulse.com)** per fornire accesso a **centinaia di proxy gratuiti e convalidati** provenienti da tutto il mondo. È la soluzione ideale per gli utenti che non dispongono di una propria infrastruttura proxy.

### Come funziona

```
┌─────────────┐  Sincronizza  ┌─────────────────┐     Ruota     ┌──────────┐
│  API 1proxy │ ────────────▶ │  proxy_registry  │ ────────────▶ │   API    │
│  (esterna)  │  fino a 500   │  source=oneproxy │  per qualità  │ provider │
└─────────────┘     proxy     └─────────────────┘               └──────────┘
```

1. **Sincronizzazione** — OmniRoute recupera i proxy convalidati dall'API di 1proxy
2. **Archiviazione** — I proxy vengono salvati nella stessa tabella `proxy_registry` con `source = 'oneproxy'`
3. **Filtro** — Filtra per protocollo, Paese e punteggio di qualità
4. **Rotazione** — Seleziona il proxy migliore utilizzando strategie basate su qualità, casualità o sequenza
5. **Degradazione automatica** — I proxy non funzionanti subiscono una riduzione del punteggio di qualità; sotto la soglia → vengono contrassegnati come inattivi

### Sincronizzazione dei proxy

**Tramite dashboard:**

1. Vai alla scheda **Impostazioni → 1proxy**
2. Fai clic su **"Sincronizza ora"**
3. Visualizza le statistiche: proxy totali, numero di proxy attivi, qualità media e suddivisione per Paese

**Tramite API:**

```bash
# Avvia la sincronizzazione
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Risposta:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtro dei proxy

```bash
# Filtra per protocollo
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtra per Paese
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtra per punteggio di qualità minimo
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combina i filtri
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Punteggi di qualità dei proxy

Ogni proxy di 1proxy include i seguenti metadati:

| Campo           | Descrizione                                              |
| --------------- | -------------------------------------------------------- |
| `qualityScore`  | Valutazione da 0 a 100 risultante dalla convalida 1proxy |
| `latencyMs`     | Latenza di rete misurata                                 |
| `anonymity`     | `transparent`, `anonymous` oppure `elite`                |
| `googleAccess`  | Indica se il proxy può accedere ai servizi Google        |
| `countryCode`   | Codice Paese ISO di due lettere                          |
| `lastValidated` | Data e ora dell'ultima convalida                         |

I punteggi di qualità vengono modificati dinamicamente:

- **Le richieste non riuscite** riducono il punteggio di 10 punti
- **Il punteggio scende a ≤10** → il proxy viene contrassegnato come `inactive`
- I proxy inattivi vengono esclusi dalla rotazione

### Strategie di rotazione

```bash
# Rotazione per qualità (prima il proxy migliore) — impostazione predefinita
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotazione casuale
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Rotazione sequenziale (prima quello convalidato meno di recente)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit breaker

La sincronizzazione di 1proxy include un circuit breaker integrato:

- Dopo **5 errori di sincronizzazione consecutivi**, gli ulteriori tentativi di sincronizzazione vengono bloccati
- Reimpostalo con: `resetOneproxyCircuitBreaker()` oppure riavvia il server
- Lo stato della sincronizzazione è disponibile tramite `GET /api/settings/oneproxy?action=status`

### Eliminazione dei proxy 1proxy

```bash
# Elimina un singolo proxy 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Elimina TUTTI i proxy 1proxy (i proxy manuali non vengono modificati)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-rilevamento e modalità stealth

OmniRoute non si limita a instradare il traffico attraverso un proxy, ma fa in modo che il traffico appaia legittimo:

### Spoofing dell'impronta digitale TLS

Utilizza `wreq-js` per generare impronte digitali TLS simili a quelle dei browser, aggirando i sistemi di rilevamento dei bot che segnalano gli handshake TLS non provenienti da browser.

### Corrispondenza dell'impronta digitale della CLI

L'**interruttore dell'impronta digitale della CLI** (`Impostazioni → Sicurezza`) riordina le intestazioni HTTP e i campi del corpo JSON affinché corrispondano esattamente alla firma dei binari CLI nativi (Claude Code, Codex, ecc.). Questa funzionalità opera **in aggiunta al** proxy:

```
Il tuo IP (bloccato) → IP del proxy (USA) → API del provider
                        + spoofing TLS
                        + impronta digitale CLI
```

In questo modo ottieni simultaneamente sia il **mascheramento dell'IP** sia l'**autenticità delle richieste**.

### Conservazione dell'IP del proxy

I badge con codifica a colori nella dashboard mostrano quale livello di proxy è attivo:

| Badge | Livello     | Significato                                            |
| ----- | ----------- | ------------------------------------------------------ |
| 🟢    | Globale     | Tutto il traffico passa attraverso questo proxy        |
| 🟡    | Provider    | Solo il traffico di questo provider passa per il proxy |
| 🔵    | Connessione | Questa chiave/account specifica utilizza questo proxy  |

Il badge mostra anche l'IP del proxy risolto per consentirne la verifica.

---

## Modalità del proxy upstream

Per i provider che utilizzano il modello CLIProxyAPI, OmniRoute supporta tre modalità di proxy upstream:

| Modalità      | Descrizione                                                         |
| ------------- | ------------------------------------------------------------------- |
| `native`      | OmniRoute gestisce direttamente l'instradamento proxy (predefinito) |
| `cliproxyapi` | Delega a un'istanza CLIProxyAPI esterna                             |
| `fallback`    | Prova prima la modalità nativa, quindi passa a CLIProxyAPI          |

Configurazione per provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfaccia della dashboard

### Impostazioni → Scheda Proxy

- Configurazione del **proxy globale** (impostato una sola volta per tutto il traffico)
- Sostituzioni del proxy **per provider**
- Assegnazioni del proxy **per connessione**
- **Test della connessione** tramite il proxy configurato
- **Badge con codifica a colori** che mostrano il livello di proxy attivo

### Impostazioni → Scheda 1proxy

- Pulsante **Sincronizza ora** per recuperare proxy gratuiti
- **Schede statistiche**: Totale, Attivi, Qualità media, Ultima sincronizzazione
- **Filtri**: Protocollo, Codice paese, Qualità minima
- **Tabella dei proxy** con host, protocollo, paese, punteggio di qualità, latenza, anonimato e accesso a Google
- Pannello **Stato sincronizzazione** con monitoraggio di operazioni riuscite/non riuscite e conteggio degli errori consecutivi
- **Cancella tutto** per rimuovere tutte le voci di 1proxy

---

## Riferimento API

### API delle impostazioni proxy

| Metodo   | Endpoint                                       | Descrizione                              |
| -------- | ---------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Ottiene la configurazione proxy completa |
| `GET`    | `/api/settings/proxy?level=global`             | Ottiene il proxy globale                 |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Ottiene il proxy del provider            |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Risolve il proxy effettivo               |
| `PUT`    | `/api/settings/proxy`                          | Aggiorna la configurazione proxy         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Rimuove il proxy al livello specificato  |

### API del registro proxy

| Metodo   | Endpoint                                          | Descrizione                       |
| -------- | ------------------------------------------------- | --------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Elenca tutti i proxy              |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Ottiene il proxy tramite ID       |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Ottiene le assegnazioni del proxy |
| `POST`   | `/api/v1/management/proxies`                      | Crea un proxy                     |
| `PATCH`  | `/api/v1/management/proxies`                      | Aggiorna un proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Elimina un proxy                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Forza l'eliminazione              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Esegue l'assegnazione in blocco   |
| `GET`    | `/api/v1/management/proxies/assignments`          | Elenca le assegnazioni            |
| `GET`    | `/api/v1/management/proxies/health`               | Statistiche sullo stato dei proxy |

### API dei tunnel

Per esporre la tua istanza OmniRoute alla rete Internet pubblica (Cloudflare/ngrok/Tailscale), invece di instradare il traffico in uscita attraverso un proxy, consulta [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). L'API REST dei tunnel si trova in `/api/tunnels/{cloudflared,ngrok,tailscale}/*` ed è indipendente dalla catena di proxy in uscita documentata sopra.

### API di 1proxy

| Metodo   | Endpoint                               | Descrizione                                  |
| -------- | -------------------------------------- | -------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Elenca i proxy di 1proxy                     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Ottiene statistiche + stato sincronizzazione |
| `GET`    | `/api/settings/oneproxy?action=status` | Ottiene solo lo stato della sincronizzazione |
| `POST`   | `/api/settings/oneproxy`               | Avvia la sincronizzazione                    |
| `POST`   | `/api/settings/oneproxy/rotate`        | Passa al proxy successivo                    |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Ne elimina uno                               |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Cancella tutto                               |

### API del proxy upstream

| Metodo   | Endpoint                          | Descrizione                                  |
| -------- | --------------------------------- | -------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Ottiene la configurazione del proxy upstream |
| `PUT`    | `/api/upstream-proxy/:providerId` | Imposta la modalità del proxy upstream       |
| `DELETE` | `/api/upstream-proxy/:providerId` | Rimuove la configurazione del proxy upstream |

---

## Variabili d'ambiente

| Variabile             | Valore predefinito | Descrizione                                                                           |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`             | Abilita il supporto per il proxy SOCKS5 (valore predefinito `true` in `.env.example`) |

---

## Risoluzione dei problemi

### "SOCKS5 proxy is disabled"

Imposta `ENABLE_SOCKS5_PROXY=true` nel file `.env` e riavvia.

### Errori "socket hang up" tramite proxy

Questo comportamento è normale con i proxy economici che interrompono le connessioni inattive. OmniRoute gestisce già questa situazione:

- Disabilitando il keep-alive sulle connessioni proxy (`keepAliveTimeout: 1`)
- Disabilitando il pipelining (`pipelining: 0`)
- Memorizzando nella cache i dispatcher per evitare handshake ripetuti

Se il problema persiste, prova un proxy diverso oppure utilizza la funzionalità di rotazione di 1proxy.

### "unsupported_country_region_territory" durante OAuth

Assicurati che il proxy sia configurato **prima** di avviare il flusso OAuth. OmniRoute instrada lo scambio dei token OAuth attraverso il proxy configurato. Imposta prima un proxy globale o a livello di provider, quindi connettiti.

### Il proxy non viene utilizzato

Controlla l'ordine di risoluzione:

1. Verifica con `GET /api/settings/proxy?resolve=your-connection-id`
2. Controlla che lo `status` del proxy sia `active` (non `inactive`)
3. Assicurati che l'ambito di assegnazione del proxy corrisponda alla tua connessione

### Sincronizzazione di 1proxy non riuscita

Controlla lo stato della sincronizzazione:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Se `consecutiveFailures >= 5`, il circuit breaker è scattato. Riavvia il server per reimpostarlo oppure attendi il ripristino manuale.

---

## Schema del database

### Tabella `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' o 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (solo 1proxy)
  latency_ms INTEGER,                        -- millisecondi (solo 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- può accedere a Google? (1proxy)
  last_validated TEXT,                       -- timestamp ISO (1proxy)
  country_code TEXT,                         -- codice ISO di 2 lettere (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabella `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID del provider, ID della connessione o ID della combinazione
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Controllo dello stato dei proxy (v3.8.16+)

Il meccanismo di **errore rapido dei proxy** di OmniRoute (`src/lib/proxyHealth.ts`) rileva i proxy non funzionanti in meno di 2 secondi tramite un rapido controllo della connessione TCP, quindi **memorizza il risultato nella cache** per evitare sovraccarichi a ogni richiesta.

### Come funziona

```
Richiesta ──▶ ProxyHealthCache.get(url)
              │
              ├─ Risultato in cache e recente?  ──▶ restituisci lo stato memorizzato
              │
              └─ Non in cache / obsoleto?  ──▶ connessione TCP a host:port
                                                (timeout: FAST_FAIL_TIMEOUT_MS)
                                                ──▶ memorizza nella cache per HEALTH_CACHE_TTL_MS
                                                ──▶ restituisci il risultato
```

Senza questo meccanismo, un proxy non funzionante bloccherebbe ogni richiesta per l'intera durata di `PROXY_TIMEOUT_MS` (valore predefinito: 30 secondi) prima di restituire un errore.

### Variabili d'ambiente configurabili

| Variabile                    | Valore predefinito | Scopo                                                 |
| ---------------------------- | ------------------ | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`             | Timeout della connessione TCP per ogni controllo      |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`            | Durata della memorizzazione nella cache del risultato |

**Valori consigliati:**

| Scenario                              | Timeout errore rapido | TTL cache | Motivazione                                                                    |
| ------------------------------------- | --------------------- | --------- | ------------------------------------------------------------------------------ |
| Gateway API ad alta velocità          | 1500ms                | 60000ms   | Errore rapido aggressivo, cache più lunga per ridurre i controlli              |
| Nodi distribuiti geograficamente      | 3000ms                | 15000ms   | Le reti più lente richiedono più tempo; cache più breve per un failover rapido |
| Sviluppo / test                       | 1000ms                | 10000ms   | Iterazione rapida sui proxy locali                                             |
| Modalità invisibile / antirilevamento | 2500ms                | 45000ms   | Evita controlli rapidi che potrebbero attivare limiti di frequenza             |

### Ispezione dello stato dei proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Forza un nuovo controllo di un proxy specifico
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Il flag `stale` è `true` quando la voce della cache ha superato `HEALTH_CACHE_TTL_MS` e la richiesta successiva attiverà un nuovo controllo.

### Valori predefiniti per tipo di proxy

Il controllo dello stato utilizza valori predefiniti appropriati in base allo schema dell'URL:

| Schema                     | Porta predefinita |
| -------------------------- | ----------------- |
| `http://`                  | 8080              |
| `https://`                 | 443               |
| `socks5://` / `socks5h://` | 1080              |

Le porte personalizzate nell'URL (`http://host:9999`) hanno sempre la precedenza sul valore predefinito dello schema.

---

## Analisi e osservabilità dei proxy

OmniRoute monitora l'utilizzo di ciascun proxy per aiutare gli operatori a diagnosticare schemi di instradamento, picchi di latenza ed errori ricorrenti.

### Dati monitorati

Per ogni richiesta effettuata tramite un proxy configurato, OmniRoute registra:

| Metrica      | Descrizione                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `proxy_url`  | URL completo del proxy (con le credenziali di autenticazione mascherate) |
| `provider`   | ID del provider upstream (openai, anthropic, ecc.)                       |
| `latency_ms` | Tempo totale di andata e ritorno, incluso l'handshake del proxy          |
| `connect_ms` | Solo il tempo di connessione TCP                                         |
| `status`     | Codice di stato HTTP restituito dall'upstream                            |
| `error`      | Classe dell'errore se la richiesta non è riuscita                        |
| `timestamp`  | ISO 8601 UTC                                                             |

### Accesso ai dati

```bash
# Eventi proxy recenti
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

L'endpoint effettivo è `/api/usage/proxy-logs` (vedere `src/app/api/usage/proxy-logs/route.ts`). Questo endpoint supporta:

- `GET /api/usage/proxy-logs` — recupera i log dei proxy
- `DELETE /api/usage/proxy-logs` — elimina tutti i log dei proxy

Se necessario, le statistiche aggregate possono essere interrogate direttamente dalla tabella `proxy_logs` tramite SQL. L'interfaccia della dashboard può offrire viste aggregate.

### Schemi comuni

**Rilevare un proxy instabile** (alterna tra richieste riuscite e non riuscite):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Individuare i proxy lenti** (latenza p95 > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Albero decisionale della strategia di rotazione

Quando più proxy sono assegnati a un ambito, OmniRoute utilizza una **strategia di rotazione** per scegliere quale usare per ogni richiesta. La strategia viene configurata a livello di ambito (globale, per provider, per account, per combinazione).

### Strategie disponibili

| Strategia               | Quando utilizzarla                        | Compromesso                                                                              |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `quality` (predefinita) | Produzione con proxy di qualità variabile | Privilegia i proxy con valutazioni elevate; può penalizzare quelli con valutazioni basse |
| `random`                | Distribuzione del carico, privacy         | Distribuzione uniforme; ignora gli indicatori di qualità                                 |
| `sequential`            | Debug, test deterministici                | Scorre i proxy in ordine; comportamento facile da comprendere                            |

### Albero decisionale

```
                    Disponi di punteggi di qualità per i tuoi proxy?
                    │
        ┌───────────┴───────────┐
        │                       │
        SÌ                      NO
        │                       │
   Tutti i proxy hanno          │
   una qualità più o meno       │
   equivalente?                 │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
   SÌ        NO               Usa
   │         │              `random`
   │         │              (una distribuzione
   │         │              uniforme genera
   │         │              dati sulla qualità
   │         │              nel tempo)
   │         │
   │    Usa `quality`
   │    (ideale per
   │    qualità variabile)
   │
Usa `random`
(distribuisce il carico
uniformemente)
```

## Esclusione automatica degli errori per i propri proxy

Il pool del marketplace 1proxy riduce già automaticamente la priorità dei proxy non funzionanti (vedere
[Punteggi di qualità dei proxy](#proxy-quality-scores)). Per i
proxy aggiunti **dall'utente** al registro, lo scheduler di controllo in background
(`src/lib/proxyHealth/scheduler.ts`) offre lo stesso comportamento di «esclusione
automatica dalla catena di un membro non funzionante», senza eliminare nulla:

```bash
# .env — disabilita temporaneamente un proxy dopo 3 verifiche consecutive non riuscite e riabilitalo
# automaticamente non appena ricomincia a rispondere alle verifiche.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Come si integra in una catena multi-proxy:

1. Lo scheduler verifica ogni proxy registrato ogni `PROXY_HEALTH_INTERVAL_MS`
   (valore predefinito: 10 min; minimo: 1 min).
2. Dopo `PROXY_AUTO_REMOVE_AFTER` errori **conclusivi** consecutivi (un reale
   errore di connessione; un timeout o un errore 5xx della destinazione della verifica non vengono mai conteggiati, vedere
   [Controllo dello stato dei proxy](#proxy-health-checking-v3816)), lo `status` del proxy viene
   impostato su `dead`.
3. `dead` è uno degli stati esclusi dal filtro degli stati attivi utilizzato dalla
   risoluzione del pool/della rotazione, quindi la rotazione di un ambito (round-robin / casuale / sticky /
   latenza — vedere [Albero decisionale della strategia di rotazione](#rotation-strategy-decision-tree))
   smette immediatamente di assegnare tale proxy alle nuove richieste. Gli altri proxy nel
   pool non vengono interessati e l'intero pool non effettua mai silenziosamente il fallback a una connessione
   diretta; vedere la protezione fail-closed del
   [Sistema proxy a 4 livelli](#4-level-proxy-system).
4. Lo scheduler continua a verificare i proxy `dead` con lo stesso intervallo. La successiva
   verifica riuscita reimposta lo `status` su `active` e il proxy rientra nella rotazione,
   senza che sia necessario aggiungerlo nuovamente manualmente.

Questa funzionalità è deliberatamente **facoltativa e non distruttiva**: per impostazione predefinita, lo scheduler si limita a
conteggiare e registrare gli errori (vedere il criterio C in `decision.ts`) e `PROXY_AUTO_DISABLE`
non elimina mai una riga: a questo serve l'opzione separata e più aggressiva
`PROXY_AUTO_REMOVE`. Se entrambe sono impostate su `true`, prevale `PROXY_AUTO_REMOVE`
(non serve disabilitare temporaneamente un proxy che sta per essere eliminato). Consultare
la documentazione sulla [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) per l'elenco completo
delle variabili.

---

> 📖 **Documentazione correlata:**
>
> - [Guida utente](../guides/USER_GUIDE.md) — Installazione e configurazione generali
> - [Riferimento API](../reference/API_REFERENCE.md) — Documentazione completa dell'API
> - [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) — Tutte le variabili d'ambiente
