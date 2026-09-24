# Cluster Decisions — Optional Sidecar Profiles (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Állapot:** javaslat (@diegosouzapw felülvizsgálatára vár)
**Dátum:** 2026-06-20
**Hivatkozások:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Röviden

Két opcionálisan bekapcsolható compose-profil (`memory`, `bifrost`) a [`docker-compose.yml`](../../docker-compose.yml) meglévő, 8 szolgáltatásból álló telepítéséhez. Az alapértelmezett indítási viselkedés **változatlan**: 3 × `omniroute` replika + Caddy + Redis + CliproxyAPI. A két új profil opcionális sidecarként adja hozzá a Qdrantot és a Bifrostot, amelyek a `docker compose --profile <name> up` paranccsal kapcsolhatók be. **Egyetlen meglévő szolgáltatás sem kerül eltávolításra vagy lecserélésre.**

## Miért konzervatív ez a megközelítés?

Az OmniRoute meglévő telepítési felépítése már most is karcsú és bevált:

- A **`redis:7-alpine`** éles környezetben, nagy terhelés mellett kezeli a sebességkorlátozási és gyorsítótárazási feladatokat.
- Az **SQLite + sqlite-vec + FTS5** biztosítja a helyi memóriát, valamint a vektoros és szöveges keresést (lásd: [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- A **Caddy** már jelenleg is terheléselosztóként és TLS-végpontként működik ([`docker-compose.yml`](../../docker-compose.yml)).
- A **Bifrost** már integrálva van 1. szintű útválasztóként a [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) fájlban (sidecar proxy, amely a `BIFROST_ENABLED` környezeti változóval kikapcsolható — a `=0` érték megkerüli a sidecart, és a TS-alapú útvonalat használja).

Az itt bemutatott két profil **horizontális skálázási lehetőséget kínál azokhoz a telepítésekhez, amelyek elérik az SQLite korlátait** — nem migrációkról van szó. Alapértelmezés szerint mindkettő ki van kapcsolva.

## A két profil

### `memory` — Qdrant vektormemória-sidecar

**Mikor érdemes bekapcsolni:**

- Telepítésenként több mint 1 millió beágyazás esetén (a sqlite-vec nagy léptékben lassulni kezd).
- Olyan több replikás telepítésnél, amelynek megosztott vektorállapotra van szüksége az `omniroute-1/2/3` példányok között.
- Ha már rendelkezik külső Qdrant-fürttel (Qdrant Cloud vagy helyszíni telepítés).

**Mit ad hozzá:**

| Szolgáltatás | Rendszerkép             | Portok      | Megjegyzések                                       |
| ------------ | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant`     | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-index; állandó kötet: `omniroute_qdrant_data` |

**Aktiválás:** állítsa a `qdrantEnabled = true` értéket a Beállítások felhasználói felületén, **vagy** állítsa be a `QDRANT_HOST=qdrant` környezeti változót. A precedenciaszabályokat (beállítási tábla → környezeti változó → alapértelmezett érték) lásd a [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) fájlban.

**Környezeti változók:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (lásd a `.env.example` 1672–1683. sorát).

### `bifrost` — Bifrost 1. szintű útválasztó sidecar

**Mikor érdemes bekapcsolni:**

- Ha legalább 3 `omniroute` replikát futtat, és egyetlen Go-folyamatban szeretné központosítani a szolgáltatók rotációját.
- Ha egyetlen auditálási és naplózási felületet szeretne az összes replika upstream szolgáltatói kéréseihez.
- Ha az 1. szintű útválasztási réteget az OmniRoute replikáitól függetlenül szeretné horizontálisan skálázni.

**Mit ad hozzá:**

| Szolgáltatás | Rendszerkép                       | Portok | Megjegyzések                                                                |
| ------------ | --------------------------------- | ------ | --------------------------------------------------------------------------- |
| `bifrost`    | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-alapú 1. szintű útválasztó; állandó naplókötet: `omniroute_bifrost_logs` |

**Aktiválás:** állítsa be a `BIFROST_BASE_URL=http://bifrost:8080` értéket a `.env.example` fájlban. A [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) fájlban található meglévő sidecar proxyútvonal (amelyet a PR #4381 adott hozzá) automatikusan használni fogja ezt.

**Környezeti változók:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (lásd a `.env.example` 1685–1695. sorát).

## Amit ez a PR kifejezetten NEM tesz meg

Az eredeti hibajegy szálában felmerült egy nagyobb klaszter-átalakítás. A tényleges terhelési profil felülvizsgálata után az alábbiakat a megadott okokból **elvetettük**:

| Komponens                            | Döntés      | Indoklás                                                                                                                                |
| ------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ELVETVE** | A `redis:7-alpine` már most is megfelelő az éles környezet méretében jelentkező sebességkorlátozási terheléshez; nincs elérendő korlát. |
| **NATS**                             | **ELVETVE** | Minden `omniroute` replika egyetlen Node.js-folyamat; nincs többfolyamatos közzétételi/feliratkozási terhelés.                          |
| **PostgreSQL**                       | **ELVETVE** | Az SQLite + sqlite-vec + FTS5 mindhárom használati esetet lefedi; 97 migráció és az Electron-csomagolás akadályozza a migrációt.        |
| **Neo4j**                            | **ELVETVE** | Az útválasztás egy 5 táblás összekapcsolás; a rekurzív CTE SQLite-on elegendő.                                                          |
| **MinIO**                            | **ELVETVE** | Nincs több MB-os binárisobjektum-terhelés; a képek és a hanganyagok módosítás nélküli proxyn keresztülhaladó adatok.                    |
| **pgvector / pg_ai / pg_textsearch** | **ELVETVE** | Ugyanaz az SQLite-korlátozással kapcsolatos indok, mint a PostgreSQL esetében; a pgvector ökoszisztémája széttagolt.                    |
| **HAProxy / Envoy**                  | **ELVETVE** | A Caddy már biztosít terheléselosztást és TLS-t; mindkettőt kifejezetten elvetettük első szintű útválasztóként (lásd: `AGENTS.md`).     |

Ha egy jövőbeli használati eset indokolttá teszi ezek valamelyikét, ezt a dokumentumot kell módosítani.

## 4 hetes bevezetés (jóváhagyás esetén)

1. **1. hét** — A PR beolvasztása + az opcionális profilok ellenőrzése egy 3 replikás Compose-veremmel.
2. **2. hét** — A Bifrost teljes körű aktiválása az OpenAI/Claude/Gemini/Ollama szolgáltatókhoz (a több mint 14 szolgáltatóból 4) az oldalkocsi-proxy útvonal használatával: [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (a `BIFROST_ENABLED` szabályozza, futásidőben vészkapcsolóval leállítható).
3. **3. hét** — A Qdrant memóriaprofil engedélyezése egyetlen teszttelepítésben; a késleltetés változásának mérése a sqlite-vec megoldáshoz képest.
4. **4. hét** — Megfigyelhetőségi állapotellenőrzések (`docker compose ps` kilépési kódok + `wget` gyors ellenőrzések); a 71 pillér frissítése az ADR-041 szerint.

## Ebben a PR-ben módosított fájlok

| Fájl                                                 | Módosítás                                                                                                                                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 sor: `memory` profil (Qdrant), `bifrost` profil (Bifrost), tartós kötetek, állapotellenőrzések.                                                                                                                                         |
| `.env.example`                                       | +24 sor: `QDRANT_*` (6 változó), `BIFROST_*` (4 változó).                                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                      | +6 sor a 25. szakaszban a `QDRANT_*` környezeti változókhoz.                                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                           | +33 sor: környezetiváltozó-tartaléklánc (beállítások → környezet → alapértelmezés) a `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` változókhoz. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 sor: 9 új teszteset, amelyek rögzítik a környezetiváltozó-tartaléklánc elsőbbségi sorrendjét.                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (ez a fájl) | ÚJ — döntési jegyzőkönyv az opcionális profilokról.                                                                                                                                                                                         |
| `AGENTS.md`                                          | +1 sor: hivatkozás erre a dokumentumra a referenciadokumentációs táblázatban.                                                                                                                                                               |

**Érintett kód nettó mennyisége:** 4 éles fájl (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 tesztfájl (`qdrant-wiring.test.ts`), 2 dokumentációs fájl (`cluster-decisions.md`, `AGENTS.md`).
