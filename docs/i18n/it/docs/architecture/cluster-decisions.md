# Cluster Decisions — Optional Sidecar Profiles (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stato:** proposta (in attesa della revisione di @diegosouzapw)
**Data:** 2026-06-20
**Riferimenti:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## In breve

Due profili Compose opzionali (`memory`, `bifrost`) per il deployment esistente di 8 servizi in [`docker-compose.yml`](../../docker-compose.yml). Il comportamento predefinito di avvio rimane **invariato**: 3 repliche di `omniroute` + Caddy + Redis + CliproxyAPI. I due nuovi profili aggiungono Qdrant e Bifrost come sidecar opzionali, attivabili tramite `docker compose --profile <name> up`. **Nessun servizio esistente viene rimosso o sostituito.**

## Perché questo approccio è prudente

L'architettura di deployment esistente di OmniRoute è già snella e collaudata:

- **`redis:7-alpine`** gestisce il carico di lavoro relativo a rate limiting e cache su scala di produzione.
- **SQLite + sqlite-vec + FTS5** gestiscono memoria locale, vettori e ricerca testuale (vedere [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** è già il bilanciatore del carico e il terminatore TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** è già integrato come router Tier-1 in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar con kill switch tramite la variabile d'ambiente `BIFROST_ENABLED`: impostarla su `=0` per ignorare il sidecar e passare al percorso TS).

I due profili descritti qui sono **opzioni di scalabilità orizzontale per i deployment che raggiungono i limiti di SQLite**, non migrazioni. Entrambi sono disattivati per impostazione predefinita.

## I due profili

### `memory` — sidecar Qdrant per la memoria vettoriale

**Quando attivarlo:**

- Oltre 1 milione di embedding per deployment (sqlite-vec inizia a rallentare su larga scala).
- Deployment con più repliche che richiede uno stato vettoriale condiviso tra `omniroute-1/2/3`.
- Si dispone già di un cluster Qdrant esterno (Qdrant Cloud, on-premise).

**Cosa aggiunge:**

| Servizio | Immagine                | Porte       | Note                                                    |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indice HNSW; volume persistente `omniroute_qdrant_data` |

**Attivazione:** impostare `qdrantEnabled = true` nell'interfaccia delle impostazioni **oppure** impostare la variabile d'ambiente `QDRANT_HOST=qdrant`. Consultare [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) per le regole di precedenza (tabella delle impostazioni → variabile d'ambiente → valore predefinito).

**Variabili d'ambiente:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (vedere le righe 1672-1683 di `.env.example`).

### `bifrost` — sidecar Bifrost per il router Tier-1

**Quando attivarlo:**

- Si eseguono ≥3 repliche di `omniroute` e si desidera centralizzare la rotazione dei provider in un singolo processo Go.
- Si desidera un unico punto di audit e registrazione per le richieste ai provider upstream provenienti da tutte le repliche.
- Si desidera scalare orizzontalmente il livello di routing Tier-1 indipendentemente dalle repliche di OmniRoute.

**Cosa aggiunge:**

| Servizio  | Immagine                          | Porte  | Note                                                                            |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router Tier-1 basato su Go; volume persistente dei log `omniroute_bifrost_logs` |

**Attivazione:** impostare `BIFROST_BASE_URL=http://bifrost:8080` in `.env.example`. La route proxy sidecar esistente in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (aggiunta nella PR #4381) rileverà automaticamente questa impostazione.

**Variabili d'ambiente:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (vedere le righe 1685-1695 di `.env.example`).

## Cosa questa PR esplicitamente NON fa

Nel thread originale dell'issue era stata proposta una riscrittura più ampia del cluster. Dopo aver analizzato l'effettiva tipologia del carico di lavoro, le seguenti opzioni sono state **rifiutate** per i motivi indicati:

| Componente                           | Verdetto     | Motivo                                                                                                                        |
| ------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **SCARTATO** | `redis:7-alpine` è già adeguato al carico di lavoro del rate limiting su scala di produzione; non vi sono limiti da superare. |
| **NATS**                             | **SCARTATO** | Ogni replica di `omniroute` è un singolo processo Node.js; non esiste alcun carico di lavoro pub/sub multiprocesso.           |
| **PostgreSQL**                       | **SCARTATO** | SQLite + sqlite-vec + FTS5 coprono tutti e 3 i casi d'uso; 97 migrazioni e il packaging Electron bloccano la migrazione.      |
| **Neo4j**                            | **SCARTATO** | Il routing consiste in un join su 5 tabelle; una CTE ricorsiva su SQLite è sufficiente.                                       |
| **MinIO**                            | **SCARTATO** | Non esiste alcun carico di lavoro con blob di diversi MB; immagini e audio vengono gestiti da proxy passthrough.              |
| **pgvector / pg_ai / pg_textsearch** | **SCARTATO** | Stesso motivo relativo ai limiti di SQLite indicato per PostgreSQL; l'ecosistema pgvector è frammentato.                      |
| **HAProxy / Envoy**                  | **SCARTATO** | Caddy gestisce già LB + TLS; entrambi sono stati esplicitamente esclusi come router Tier-1 (vedere `AGENTS.md`).              |

Se un futuro caso d'uso dimostrerà la validità di una di queste opzioni, questo documento sarà il punto in cui apportare la modifica.

## Rollout di 4 settimane (se approvato)

1. **Sett. 1** — Integrare questa PR + verificare i profili opt-in con uno stack Compose a 3 repliche.
2. **Sett. 2** — Attivazione completa di Bifrost per OpenAI/Claude/Gemini/Ollama (4 degli oltre 14 provider) tramite il percorso proxy sidecar in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (controllato da `BIFROST_ENABLED`, disattivabile a runtime tramite kill switch).
3. **Sett. 3** — Abilitare il profilo di memoria Qdrant in un singolo deployment di test; misurare la differenza di latenza rispetto a sqlite-vec.
4. **Sett. 4** — Health check di osservabilità (codici di uscita di `docker compose ps` + smoke test con `wget`); aggiornamento dei 71 pilastri secondo ADR-041.

## File modificati in questa PR

| File                                                 | Modifica                                                                                                                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                 | +30 righe: profilo `memory` (Qdrant), profilo `bifrost` (Bifrost), volumi persistenti, health check.                                                                                                                                                   |
| `.env.example`                                       | +24 righe: `QDRANT_*` (6 variabili), `BIFROST_*` (4 variabili).                                                                                                                                                                                        |
| `docs/reference/ENVIRONMENT.md`                      | +6 righe nella sezione 25 per le variabili d'ambiente `QDRANT_*`.                                                                                                                                                                                      |
| `src/lib/memory/qdrant.ts`                           | +33 righe: catena di fallback delle variabili d'ambiente (impostazioni → ambiente → valore predefinito) per `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 righe: 9 nuovi casi di test che fissano la precedenza del fallback delle variabili d'ambiente.                                                                                                                                                     |
| `docs/architecture/cluster-decisions.md` (this file) | NUOVO — registro delle decisioni per i profili opt-in.                                                                                                                                                                                                 |
| `AGENTS.md`                                          | +1 riga: riferimento a questo documento nella tabella della documentazione di riferimento.                                                                                                                                                             |

**Codice interessato complessivamente:** 4 file di produzione (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 file di test (`qdrant-wiring.test.ts`), 2 file di documentazione (`cluster-decisions.md`, `AGENTS.md`).
