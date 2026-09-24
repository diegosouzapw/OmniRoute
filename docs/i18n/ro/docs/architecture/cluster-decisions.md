# Cluster Decisions — Optional Sidecar Profiles (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stare:** propunere (în așteptarea evaluării din partea @diegosouzapw)
**Data:** 2026-06-20
**Referințe:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Pe scurt

Două profiluri Compose opționale (`memory`, `bifrost`) pentru implementarea existentă cu 8 servicii din [`docker-compose.yml`](../../docker-compose.yml). Comportamentul implicit la pornire rămâne **neschimbat**: 3 × replici `omniroute` + Caddy + Redis + CliproxyAPI. Cele două profiluri noi adaugă Qdrant și Bifrost ca servicii auxiliare opționale, activate prin `docker compose --profile <name> up`. **Niciun serviciu existent nu este eliminat sau înlocuit.**

## De ce această abordare este prudentă

Arhitectura existentă a implementării OmniRoute este deja simplă și validată:

- **`redis:7-alpine`** gestionează volumul de lucru pentru limitarea ratei/cache la scară de producție.
- **SQLite + sqlite-vec + FTS5** acoperă memoria locală + vectorii + căutarea în text (consultați [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** este deja balansatorul de încărcare + terminatorul TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** este deja integrat ca router Tier-1 în [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy auxiliar cu mecanism de dezactivare prin variabila de mediu `BIFROST_ENABLED` — setați `=0` pentru a ocoli serviciul auxiliar și a reveni la calea TS).

Cele două profiluri de aici sunt **opțiuni de scalare pentru implementările care ating limita SQLite** — nu migrări. Ambele sunt dezactivate implicit.

## Cele două profiluri

### `memory` — serviciu auxiliar Qdrant pentru memoria vectorială

**Când să îl activați:**

- > 1M de înglobări per implementare (sqlite-vec începe să încetinească la scară mare).
- Implementare cu mai multe replici, care necesită o stare vectorială partajată între `omniroute-1/2/3`.
- Aveți deja un cluster Qdrant extern (Qdrant Cloud, local).

**Ce adaugă:**

| Serviciu | Imagine                 | Porturi     | Note                                                 |
| -------- | ----------------------- | ----------- | ---------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Index HNSW; volum persistent `omniroute_qdrant_data` |

**Activare:** setați `qdrantEnabled = true` în interfața Setări **sau** setați variabila de mediu `QDRANT_HOST=qdrant`. Consultați [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) pentru regulile de prioritate (tabelul de setări → variabila de mediu → valoarea implicită).

**Variabile de mediu:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (consultați liniile 1672-1683 din `.env.example`).

### `bifrost` — serviciu auxiliar Bifrost pentru routerul Tier-1

**Când să îl activați:**

- Rulați ≥3 replici `omniroute` și doriți ca rotația furnizorilor să fie centralizată într-un singur proces Go.
- Doriți un singur punct pentru auditarea/jurnalizarea solicitărilor către furnizorii upstream, pentru toate replicile.
- Doriți scalarea orizontală a nivelului de rutare Tier-1 independent de replicile OmniRoute.

**Ce adaugă:**

| Serviciu  | Imagine                           | Porturi | Note                                                                                |
| --------- | --------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Router Tier-1 bazat pe Go; volum persistent pentru jurnale `omniroute_bifrost_logs` |

**Activare:** setați `BIFROST_BASE_URL=http://bifrost:8080` în `.env.example`. Ruta proxy existentă pentru serviciul auxiliar din [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (adăugată în PR #4381) va prelua automat această valoare.

**Variabile de mediu:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (consultați liniile 1685-1695 din `.env.example`).

## Ce NU face în mod explicit acest PR

Discuția inițială despre problemă propunea o rescriere mai amplă a clusterului. După analizarea formei reale a volumului de lucru, următoarele sunt **respinse** din motivele prezentate:

| Componentă                           | Verdict       | Motiv                                                                                                                                    |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ELIMINARE** | `redis:7-alpine` este deja adecvat pentru volumul de lucru de limitare a ratei la scară de producție; nu există nicio limită de depășit. |
| **NATS**                             | **ELIMINARE** | Fiecare replică `omniroute` este un singur proces Node.js; nu există niciun volum de lucru pub/sub cu mai multe procese.                 |
| **PostgreSQL**                       | **ELIMINARE** | SQLite + sqlite-vec + FTS5 acoperă toate cele 3 cazuri de utilizare; 97 de migrări + împachetarea Electron blochează migrarea.           |
| **Neo4j**                            | **ELIMINARE** | Rutarea este un join între 5 tabele; un CTE recursiv în SQLite este suficient.                                                           |
| **MinIO**                            | **ELIMINARE** | Nu există niciun volum de lucru cu bloburi de mai mulți MB; imaginile/conținutul audio sunt proxy-uri de tip passthrough.                |
| **pgvector / pg_ai / pg_textsearch** | **ELIMINARE** | Același motiv privind limita SQLite ca pentru PostgreSQL; ecosistemul pgvector este fragmentat.                                          |
| **HAProxy / Envoy**                  | **ELIMINARE** | Caddy gestionează deja echilibrarea încărcării + TLS; ambele au fost respinse explicit ca routere Tier-1 (consultați `AGENTS.md`).       |

Dacă un caz de utilizare viitor demonstrează necesitatea uneia dintre acestea, acest document este locul în care trebuie făcută modificarea.

## Lansare pe parcursul a 4 săptămâni (dacă este aprobată)

1. **Săpt. 1** — Integrarea acestui PR + verificarea profilurilor opționale cu o stivă Compose cu 3 replici.
2. **Săpt. 2** — Activarea completă a Bifrost pentru OpenAI/Claude/Gemini/Ollama (4 din peste 14 furnizori), utilizând ruta proxy sidecar de la [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (controlată prin `BIFROST_ENABLED`, cu posibilitatea dezactivării de urgență în timpul rulării).
3. **Săpt. 3** — Profilul de memorie Qdrant activat într-o singură implementare de test; măsurarea diferenței de latență față de sqlite-vec.
4. **Săpt. 4** — Verificări de stare pentru observabilitate (coduri de ieșire `docker compose ps` + teste rapide `wget`); actualizarea celor 71 de piloni conform ADR-041.

## Fișiere modificate în acest PR

| Fișier                                                  | Modificare                                                                                                                                                                                                                                                  |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 de linii: profilul `memory` (Qdrant), profilul `bifrost` (Bifrost), volume persistente, verificări de stare.                                                                                                                                            |
| `.env.example`                                          | +24 de linii: `QDRANT_*` (6 variabile), `BIFROST_*` (4 variabile).                                                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                         | +6 rânduri în secțiunea 25 pentru variabilele de mediu `QDRANT_*`.                                                                                                                                                                                          |
| `src/lib/memory/qdrant.ts`                              | +33 de linii: lanț de valori alternative pentru variabilele de mediu (setări → mediu → valoare implicită) pentru `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 de linii: 9 cazuri noi de testare care fixează precedența valorilor alternative ale variabilelor de mediu.                                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (acest fișier) | NOU — înregistrarea deciziei pentru profilurile opționale.                                                                                                                                                                                                  |
| `AGENTS.md`                                             | +1 linie: referință către acest document în tabelul documentației de referință.                                                                                                                                                                             |

**Cod total modificat:** 4 fișiere de producție (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 fișier de testare (`qdrant-wiring.test.ts`), 2 fișiere de documentație (`cluster-decisions.md`, `AGENTS.md`).
