# Cluster Decisions — Optional Sidecar Profiles (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**നില:** നിർദ്ദേശം (@diegosouzapw അവലോകനത്തിനായി കാത്തിരിക്കുന്നു)
**തീയതി:** 2026-06-20
**റഫറൻസുകൾ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## ചുരുക്കത്തിൽ

[`docker-compose.yml`](../../docker-compose.yml)-ൽ നിലവിലുള്ള 8-സേവന വിന്യാസത്തിനായി രണ്ട് ഓപ്റ്റ്-ഇൻ compose പ്രൊഫൈലുകൾ (`memory`, `bifrost`). ഡിഫോൾട്ട്-up പെരുമാറ്റം **മാറ്റമില്ലാതെ** തുടരുന്നു: 3 × `omniroute` റെപ്ലിക്കകൾ + Caddy + Redis + CliproxyAPI. `docker compose --profile <name> up` വഴി സജീവമാക്കാവുന്ന ഓപ്ഷണൽ sidecar-കളായി പുതിയ രണ്ട് പ്രൊഫൈലുകൾ Qdrant-ഉം Bifrost-ഉം ചേർക്കുന്നു. **നിലവിലുള്ള ഒരു സേവനവും നീക്കം ചെയ്യുകയോ മാറ്റിസ്ഥാപിക്കുകയോ ചെയ്യുന്നില്ല.**

## ഇത് യാഥാസ്ഥിതികമായ സമീപനമാകുന്നത് എന്തുകൊണ്ട്

OmniRoute-ന്റെ നിലവിലുള്ള വിന്യാസഘടന ഇതിനകം തന്നെ ലളിതവും തെളിയിക്കപ്പെട്ടതുമാണ്:

- **`redis:7-alpine`** പ്രൊഡക്ഷൻ സ്കെയിലിൽ റേറ്റ്-ലിമിറ്റ്/കാഷ് വർക്ക്ലോഡ് കൈകാര്യം ചെയ്യുന്നു.
- **SQLite + sqlite-vec + FTS5** ലോക്കൽ മെമ്മറി + വെക്റ്റർ + ടെക്സ്റ്റ്-സെർച്ച് എന്നിവ ഉൾക്കൊള്ളുന്നു ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) കാണുക).
- **Caddy** ഇതിനകം തന്നെ LB + TLS ടെർമിനേറ്ററാണ് ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ഇതിനകം [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-ൽ Tier-1 റൂട്ടറായി സംയോജിപ്പിച്ചിട്ടുണ്ട് (`BIFROST_ENABLED` env var വഴിയുള്ള കിൽ സ്വിച്ചോടുകൂടിയ sidecar proxy — sidecar മറികടന്ന് TS പാതയിലേക്ക് തുടരാൻ `=0` ആയി സജ്ജമാക്കുക).

ഇവിടെയുള്ള രണ്ട് പ്രൊഫൈലുകളും **SQLite-ന്റെ പരിധിയിലെത്തുന്ന വിന്യാസങ്ങൾക്കുള്ള സ്കെയിൽ-ഔട്ട് ഓപ്ഷനുകളാണ്** — മൈഗ്രേഷനുകളല്ല. രണ്ടും ഡിഫോൾട്ടായി ഓഫാണ്.

## രണ്ട് പ്രൊഫൈലുകൾ

### `memory` — Qdrant വെക്റ്റർ മെമ്മറി Sidecar

**എപ്പോൾ ഓൺ ചെയ്യണം:**

- ഓരോ വിന്യാസത്തിലും > 1M എംബെഡ്ഡിങ്ങുകൾ ഉള്ളപ്പോൾ (സ്കെയിൽ വർധിക്കുമ്പോൾ sqlite-vec മന്ദഗതിയിലാകാൻ തുടങ്ങുന്നു).
- `omniroute-1/2/3`-ലുടനീളം പങ്കിട്ട വെക്റ്റർ സ്റ്റേറ്റ് ആവശ്യമായ മൾട്ടി-റെപ്ലിക്ക വിന്യാസം.
- നിങ്ങൾക്ക് ഇതിനകം ഒരു ബാഹ്യ Qdrant ക്ലസ്റ്റർ ഉണ്ടെങ്കിൽ (Qdrant Cloud, on-prem).

**ഇത് ചേർക്കുന്നത്:**

| സേവനം    | ഇമേജ്                   | പോർട്ടുകൾ   | കുറിപ്പുകൾ                                            |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ഇൻഡക്സ്; സ്ഥിരമായ വോള്യം `omniroute_qdrant_data` |

**സജീവമാക്കൽ:** Settings UI-യിൽ `qdrantEnabled = true` ആക്കുക **അല്ലെങ്കിൽ** `QDRANT_HOST=qdrant` env സജ്ജമാക്കുക. മുൻഗണനാ നിയമങ്ങൾക്കായി [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) കാണുക (സെറ്റിങ്സ് പട്ടിക → env var → ഡിഫോൾട്ട്).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`-ലെ 1672-1683 വരികൾ കാണുക).

### `bifrost` — Bifrost Tier-1 റൂട്ടർ Sidecar

**എപ്പോൾ ഓൺ ചെയ്യണം:**

- നിങ്ങൾ ≥3 `omniroute` റെപ്ലിക്കകൾ പ്രവർത്തിപ്പിക്കുകയും പ്രൊവൈഡർ റൊട്ടേഷൻ ഒരൊറ്റ Go പ്രോസസിൽ കേന്ദ്രീകരിക്കാൻ ആഗ്രഹിക്കുകയും ചെയ്യുമ്പോൾ.
- എല്ലാ റെപ്ലിക്കകളിലുമുള്ള അപ്സ്ട്രീം-പ്രൊവൈഡർ അഭ്യർത്ഥനകൾക്കായി ഒരൊറ്റ ഓഡിറ്റ്/ലോഗിങ് ഉപരിതലം ആഗ്രഹിക്കുമ്പോൾ.
- OmniRoute റെപ്ലിക്കകളിൽ നിന്ന് സ്വതന്ത്രമായി Tier-1 റൂട്ടിങ് ലെയർ തിരശ്ചീനമായി സ്കെയിൽ ചെയ്യാൻ ആഗ്രഹിക്കുമ്പോൾ.

**ഇത് ചേർക്കുന്നത്:**

| സേവനം     | ഇമേജ്                             | പോർട്ടുകൾ | കുറിപ്പുകൾ                                                               |
| --------- | --------------------------------- | --------- | ------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`    | Go-അധിഷ്ഠിത Tier-1 റൂട്ടർ; സ്ഥിരമായ ലോഗ് വോള്യം `omniroute_bifrost_logs` |

**സജീവമാക്കൽ:** `.env.example`-ൽ `BIFROST_BASE_URL=http://bifrost:8080` സജ്ജമാക്കുക. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-ലെ നിലവിലുള്ള sidecar proxy റൂട്ട് (PR #4381-ൽ ചേർത്തത്) ഇത് സ്വയമേവ ഉപയോഗിക്കും.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`-ലെ 1685-1695 വരികൾ കാണുക).

## ഈ PR വ്യക്തമായി ചെയ്യാത്ത കാര്യങ്ങൾ

യഥാർത്ഥ issue thread ഒരു വലിയ cluster പുനർരചന നിർദേശിച്ചിരുന്നു. യഥാർത്ഥ workload ഘടന ഓഡിറ്റ് ചെയ്തതിന് ശേഷം, നൽകിയിരിക്കുന്ന കാരണങ്ങളാൽ ഇനിപ്പറയുന്നവ **നിരസിച്ചിരിക്കുന്നു**:

| ഘടകം                                 | തീരുമാനം       | കാരണം                                                                                                                     |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ഒഴിവാക്കുക** | production scale-ലെ rate-limit workload-ന് `redis:7-alpine` ഇതിനകം മതിയായതാണ്; മറികടക്കേണ്ട പരിധിയൊന്നുമില്ല.             |
| **NATS**                             | **ഒഴിവാക്കുക** | ഓരോ `omniroute` replica-യും ഒരൊറ്റ Node.js process ആണ്; multi-process pub/sub workload നിലവിലില്ല.                        |
| **PostgreSQL**                       | **ഒഴിവാക്കുക** | SQLite + sqlite-vec + FTS5 എന്നിവ 3 use case-കളും ഉൾക്കൊള്ളുന്നു; 97 migrations + Electron packaging migration തടയുന്നു.  |
| **Neo4j**                            | **ഒഴിവാക്കുക** | Routing ഒരു 5-table join ആണ്; SQLite-ലെ recursive CTE മതിയാകും.                                                           |
| **MinIO**                            | **ഒഴിവാക്കുക** | multi-MB blob workload ഇല്ല; images/audio passthrough proxies ആണ്.                                                        |
| **pgvector / pg_ai / pg_textsearch** | **ഒഴിവാക്കുക** | PostgreSQL-ന്റെ അതേ SQLite-ceiling കാരണമാണ്; pgvector ecosystem വിഘടിച്ചിരിക്കുന്നു.                                      |
| **HAProxy / Envoy**                  | **ഒഴിവാക്കുക** | Caddy ഇതിനകം LB + TLS കൈകാര്യം ചെയ്യുന്നു; രണ്ടും Tier-1 routers ആയി വ്യക്തമായി നിരസിക്കപ്പെട്ടവയാണ് (`AGENTS.md` കാണുക). |

ഭാവിയിലെ ഏതെങ്കിലും use case ഇവയിലൊന്നിന്റെ ആവശ്യകത തെളിയിക്കുന്നുവെങ്കിൽ, ഈ doc ആണ് ഭേദഗതി ചെയ്യേണ്ട സ്ഥലം.

## 4-ആഴ്ച rollout (അംഗീകരിച്ചാൽ)

1. **ആഴ്ച 1** — ഈ PR land ചെയ്യുക + 3-replica compose stack ഉപയോഗിച്ച് opt-in profiles പരിശോധിച്ചുറപ്പിക്കുക.
2. **ആഴ്ച 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-ലെ sidecar proxy route ഉപയോഗിച്ച് OpenAI/Claude/Gemini/Ollama-യ്ക്കായി (14+ providers-ൽ 4 എണ്ണം) Bifrost പൂർണ്ണമായി സജീവമാക്കുക (`BIFROST_ENABLED` ഉപയോഗിച്ച് നിയന്ത്രിച്ചിരിക്കുന്നു; runtime-ൽ kill-switch ചെയ്യാം).
3. **ആഴ്ച 3** — ഒരൊറ്റ test deployment-ൽ Qdrant memory profile പ്രവർത്തനക്ഷമമാക്കുക; sqlite-vec-നോടുള്ള latency വ്യത്യാസം അളക്കുക.
4. **ആഴ്ച 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 അനുസരിച്ചുള്ള 71-pillar പുതുക്കൽ.

## ഈ PR-ൽ മാറ്റം വരുത്തിയ files

| File                                              | മാറ്റം                                                                                                                                                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                              | +30 lines: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks.                                                                                                                    |
| `.env.example`                                    | +24 lines: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars).                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                   | `QDRANT_*` env vars-നായി section 25-ൽ +6 rows.                                                                                                                                                                          |
| `src/lib/memory/qdrant.ts`                        | +33 lines: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` എന്നിവയ്ക്കുള്ള env-var fallback chain (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | +88 lines: env-var fallback precedence ഉറപ്പിക്കുന്ന 9 പുതിയ test cases.                                                                                                                                                |
| `docs/architecture/cluster-decisions.md` (ഈ file) | പുതിയത് — opt-in profiles-നുള്ള decision record.                                                                                                                                                                        |
| `AGENTS.md`                                       | +1 line: reference documentation table-ൽ ഈ doc-ലേക്കുള്ള pointer.                                                                                                                                                       |

**മാറ്റം ബാധിച്ച ആകെ code:** 4 production files (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc files (`cluster-decisions.md`, `AGENTS.md`).
