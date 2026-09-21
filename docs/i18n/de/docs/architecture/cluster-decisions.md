# Cluster Decisions — Optional Sidecar Profiles (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** Vorschlag (wartet auf Prüfung durch @diegosouzapw)
**Datum:** 2026-06-20
**Referenzen:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kurzfassung

Zwei optionale Compose-Profile (`memory`, `bifrost`) für die bestehende Bereitstellung mit 8 Diensten in [`docker-compose.yml`](../../docker-compose.yml). Das standardmäßige Startverhalten bleibt **unverändert**: 3 × `omniroute`-Replikate + Caddy + Redis + CliproxyAPI. Die beiden neuen Profile fügen Qdrant und Bifrost als optionale Sidecars hinzu, die über `docker compose --profile <name> up` aktiviert werden. **Kein bestehender Dienst wird entfernt oder ersetzt.**

## Warum dieser Ansatz konservativ ist

Die bestehende Bereitstellungsarchitektur von OmniRoute ist bereits schlank und bewährt:

- **`redis:7-alpine`** verarbeitet die Rate-Limit- und Cache-Workloads im Produktionsmaßstab.
- **SQLite + sqlite-vec + FTS5** decken lokalen Speicher sowie Vektor- und Textsuche ab (siehe [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** fungiert bereits als Load Balancer und TLS-Terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ist bereits als Tier-1-Router in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) integriert (Sidecar-Proxy mit Notausschalter über die Umgebungsvariable `BIFROST_ENABLED` — auf `=0` setzen, um den Sidecar zu umgehen und auf den TS-Pfad zurückzufallen).

Die beiden Profile sind **Skalierungsoptionen für Bereitstellungen, die an die Grenzen von SQLite stoßen** — keine Migrationen. Beide sind standardmäßig deaktiviert.

## Die beiden Profile

### `memory` — Qdrant-Sidecar für Vektorspeicher

**Wann sollte es aktiviert werden:**

- > 1 Mio. Embeddings pro Bereitstellung (sqlite-vec wird bei dieser Größenordnung langsamer).
- Bereitstellung mit mehreren Replikaten, die einen gemeinsamen Vektorstatus für `omniroute-1/2/3` benötigt.
- Es ist bereits ein externer Qdrant-Cluster vorhanden (Qdrant Cloud, On-Premises).

**Was hinzugefügt wird:**

| Dienst   | Image                   | Ports       | Hinweise                                                |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-Index; persistentes Volume `omniroute_qdrant_data` |

**Aktivierung:** `qdrantEnabled = true` in der Einstellungsoberfläche aktivieren **oder** die Umgebungsvariable `QDRANT_HOST=qdrant` setzen. Die Prioritätsregeln (Einstellungstabelle → Umgebungsvariable → Standardwert) sind unter [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) beschrieben.

**Umgebungsvariablen:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (siehe Zeilen 1672–1683 in `.env.example`).

### `bifrost` — Bifrost-Sidecar als Tier-1-Router

**Wann sollte es aktiviert werden:**

- Es werden ≥3 `omniroute`-Replikate ausgeführt und die Provider-Rotation soll zentral in einem einzigen Go-Prozess erfolgen.
- Es soll eine zentrale Audit-/Protokollierungsoberfläche für Anfragen an vorgelagerte Provider über alle Replikate hinweg geben.
- Die Tier-1-Routingebene soll unabhängig von den OmniRoute-Replikaten horizontal skaliert werden.

**Was hinzugefügt wird:**

| Dienst    | Image                             | Ports  | Hinweise                                                                           |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-basierter Tier-1-Router; persistentes Protokoll-Volume `omniroute_bifrost_logs` |

**Aktivierung:** `BIFROST_BASE_URL=http://bifrost:8080` in `.env.example` setzen. Die bestehende Sidecar-Proxy-Route unter [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (hinzugefügt in PR #4381) übernimmt diese Einstellung automatisch.

**Umgebungsvariablen:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (siehe Zeilen 1685–1695 in `.env.example`).

## Was dieser PR ausdrücklich NICHT tut

Im ursprünglichen Issue-Thread wurde eine umfangreichere Überarbeitung des Clusters erwogen. Nach Prüfung der tatsächlichen Workload-Struktur werden die folgenden Komponenten aus den jeweils angegebenen Gründen **abgelehnt**:

| Komponente                           | Entscheidung  | Begründung                                                                                                                    |
| ------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **VERWORFEN** | `redis:7-alpine` ist für den Rate-Limit-Workload im Produktionsmaßstab bereits ausreichend; es gibt keine Kapazitätsgrenze.   |
| **NATS**                             | **VERWORFEN** | Jede `omniroute`-Replik ist ein einzelner Node.js-Prozess; es existiert kein prozessübergreifender Pub/Sub-Workload.          |
| **PostgreSQL**                       | **VERWORFEN** | SQLite + sqlite-vec + FTS5 decken alle 3 Anwendungsfälle ab; 97 Migrationen + Electron-Paketierung verhindern eine Migration. |
| **Neo4j**                            | **VERWORFEN** | Das Routing besteht aus einem Join über 5 Tabellen; ein rekursiver CTE unter SQLite ist ausreichend.                          |
| **MinIO**                            | **VERWORFEN** | Es gibt keinen Multi-MB-Blob-Workload; Bilder/Audiodaten werden über Passthrough-Proxys weitergeleitet.                       |
| **pgvector / pg_ai / pg_textsearch** | **VERWORFEN** | Gleicher Grund hinsichtlich der SQLite-Kapazitätsgrenze wie bei PostgreSQL; das pgvector-Ökosystem ist fragmentiert.          |
| **HAProxy / Envoy**                  | **VERWORFEN** | Caddy übernimmt bereits LB + TLS; beide wurden ausdrücklich als Tier-1-Router abgelehnt (siehe `AGENTS.md`).                  |

Sollte ein zukünftiger Anwendungsfall eine dieser Komponenten rechtfertigen, ist dieses Dokument entsprechend anzupassen.

## 4-wöchiger Rollout (bei Genehmigung)

1. **Woche 1** — Diesen PR mergen + Verifizierung der Opt-in-Profile mit einem Compose-Stack aus 3 Repliken.
2. **Woche 2** — Vollständige Aktivierung von Bifrost für OpenAI/Claude/Gemini/Ollama (4 von mehr als 14 Anbietern) über die Sidecar-Proxy-Route unter [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (durch `BIFROST_ENABLED` geschützt und zur Laufzeit per Kill-Switch deaktivierbar).
3. **Woche 3** — Qdrant-Memory-Profil in einem einzelnen Test-Deployment aktivieren; Latenzunterschied gegenüber sqlite-vec messen.
4. **Woche 4** — Observability-Healthchecks (`docker compose ps`-Exitcodes + `wget`-Smoke-Tests); Aktualisierung der 71 Säulen gemäß ADR-041.

## In diesem PR geänderte Dateien

| Datei                                                  | Änderung                                                                                                                                                                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                   | +30 Zeilen: Profil `memory` (Qdrant), Profil `bifrost` (Bifrost), persistente Volumes, Healthchecks.                                                                                                                                       |
| `.env.example`                                         | +24 Zeilen: `QDRANT_*` (6 Variablen), `BIFROST_*` (4 Variablen).                                                                                                                                                                           |
| `docs/reference/ENVIRONMENT.md`                        | +6 Zeilen in Abschnitt 25 für die `QDRANT_*`-Umgebungsvariablen.                                                                                                                                                                           |
| `src/lib/memory/qdrant.ts`                             | +33 Zeilen: Fallback-Kette für Umgebungsvariablen (Einstellungen → Umgebung → Standardwert) für `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 Zeilen: 9 neue Testfälle zur Festlegung der Fallback-Priorität für Umgebungsvariablen.                                                                                                                                                 |
| `docs/architecture/cluster-decisions.md` (diese Datei) | NEU — Entscheidungsprotokoll für die Opt-in-Profile.                                                                                                                                                                                       |
| `AGENTS.md`                                            | +1 Zeile: Verweis auf dieses Dokument in der Tabelle der Referenzdokumentation.                                                                                                                                                            |

**Netto betroffener Code:** 4 Produktionsdateien (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 Testdatei (`qdrant-wiring.test.ts`), 2 Dokumentationsdateien (`cluster-decisions.md`, `AGENTS.md`).
