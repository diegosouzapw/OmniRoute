# Cluster Decisions — Optional Sidecar Profiles (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stanje:** predlog (čaka na pregled @diegosouzapw)
**Datum:** 2026-06-20
**Reference:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Na kratko

Dva izbirna profila Compose (`memory`, `bifrost`) za obstoječo postavitev z 8 storitvami v [`docker-compose.yml`](../../docker-compose.yml). Privzeto vedenje ob zagonu ostaja **nespremenjeno**: 3 × replike `omniroute` + Caddy + Redis + CliproxyAPI. Nova profila dodata Qdrant in Bifrost kot izbirni stranski storitvi, ki ju omogočite z ukazom `docker compose --profile <name> up`. **Nobena obstoječa storitev ni odstranjena ali zamenjana.**

## Zakaj je ta pristop konservativen

Obstoječa arhitektura postavitve OmniRoute je že vitka in preizkušena:

- **`redis:7-alpine`** pri produkcijski obremenitvi skrbi za omejevanje hitrosti in predpomnjenje.
- **SQLite + sqlite-vec + FTS5** pokrivajo lokalni pomnilnik, vektorsko iskanje in iskanje po besedilu (glejte [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** že deluje kot izenačevalnik obremenitve in zaključevalnik TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** je že integriran kot usmerjevalnik 1. ravni v [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (stranski posredniški strežnik z izklopnim stikalom prek okoljske spremenljivke `BIFROST_ENABLED` — nastavite `=0`, da obidete stransko storitev in preidete na pot TS).

Profila predstavljata **možnosti horizontalnega skaliranja za postavitve, ki dosežejo omejitve SQLite** — ne migracij. Oba sta privzeto izklopljena.

## Profila

### `memory` — stranska storitev Qdrant za vektorski pomnilnik

**Kdaj jo omogočiti:**

- > 1 milijon vdelav na postavitev (sqlite-vec se pri velikem obsegu začne upočasnjevati).
- Postavitev z več replikami, ki potrebuje skupno vektorsko stanje med `omniroute-1/2/3`.
- Že imate zunanjo gručo Qdrant (Qdrant Cloud ali lokalno nameščeno).

**Kaj doda:**

| Storitev | Slika                   | Vrata       | Opombe                                              |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indeks HNSW; trajni nosilec `omniroute_qdrant_data` |

**Aktiviranje:** v uporabniškem vmesniku nastavitev nastavite `qdrantEnabled = true` **ali** nastavite okoljsko spremenljivko `QDRANT_HOST=qdrant`. Za pravila prednosti glejte [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) (tabela nastavitev → okoljska spremenljivka → privzeta vrednost).

**Okoljske spremenljivke:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (glejte vrstice 1672–1683 v `.env.example`).

### `bifrost` — stranska storitev Bifrost za usmerjanje 1. ravni

**Kdaj jo omogočiti:**

- Izvajate ≥3 replike `omniroute` in želite rotacijo ponudnikov centralizirati v enem procesu Go.
- Želite enotno mesto za revizijo in beleženje zahtev do nadrejenih ponudnikov iz vseh replik.
- Želite horizontalno skaliranje usmerjevalne plasti 1. ravni neodvisno od replik OmniRoute.

**Kaj doda:**

| Storitev  | Slika                             | Vrata  | Opombe                                                                                      |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Usmerjevalnik 1. ravni, temelječ na Go; trajni nosilec za dnevnike `omniroute_bifrost_logs` |

**Aktiviranje:** v `.env.example` nastavite `BIFROST_BASE_URL=http://bifrost:8080`. Obstoječa pot stranskega posredniškega strežnika v [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dodana v PR #4381) bo to samodejno zaznala.

**Okoljske spremenljivke:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (glejte vrstice 1685–1695 v `.env.example`).

## Česa ta PR izrecno NE naredi

V prvotni razpravi o težavi je bila predlagana obsežnejša predelava gruče. Po pregledu dejanske oblike delovne obremenitve so naslednje možnosti **zavrnjene** iz navedenih razlogov:

| Komponenta                           | Odločitev    | Razlog                                                                                                                   |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **OPUŠČENO** | `redis:7-alpine` že zadostuje za produkcijsko obremenitev omejevanja hitrosti; ni omejitve, ki bi jo bilo treba preseči. |
| **NATS**                             | **OPUŠČENO** | Vsaka replika `omniroute` je en sam proces Node.js; večprocesna delovna obremenitev pub/sub ne obstaja.                  |
| **PostgreSQL**                       | **OPUŠČENO** | SQLite + sqlite-vec + FTS5 pokrivajo vse 3 primere uporabe; 97 migracij in pakiranje Electron preprečujeta migracijo.    |
| **Neo4j**                            | **OPUŠČENO** | Usmerjanje je združevanje 5 tabel; rekurzivni CTE v SQLite zadostuje.                                                    |
| **MinIO**                            | **OPUŠČENO** | Ni delovne obremenitve z večmegabajtnimi binarnimi objekti; slike/zvok se posredujejo prek posredniških strežnikov.      |
| **pgvector / pg_ai / pg_textsearch** | **OPUŠČENO** | Enak razlog glede omejitev SQLite kot pri PostgreSQL; ekosistem pgvector je razdrobljen.                                 |
| **HAProxy / Envoy**                  | **OPUŠČENO** | Caddy že zagotavlja LB + TLS; oba sta bila izrecno zavrnjena kot usmerjevalnika Tier-1 (glejte `AGENTS.md`).             |

Če prihodnji primer uporabe upraviči katero od teh možnosti, je treba ta dokument ustrezno dopolniti.

## 4-tedenska uvedba (če bo odobrena)

1. **1. teden** — Združitev tega PR-ja + preverjanje profilov s prostovoljno vključitvijo s skladom compose s 3 replikami.
2. **2. teden** — Popolna aktivacija Bifrost za OpenAI/Claude/Gemini/Ollama (4 od več kot 14 ponudnikov) z uporabo stranske posredniške poti na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (nadzorovano z `BIFROST_ENABLED`, z možnostjo izklopa med izvajanjem).
3. **3. teden** — Omogočitev pomnilniškega profila Qdrant v eni preskusni uvedbi; merjenje razlike v zakasnitvi v primerjavi s sqlite-vec.
4. **4. teden** — Preverjanja zdravja opazljivosti (izhodne kode `docker compose ps` + hitri preizkusi `wget`); osvežitev 71 stebrov skladno z ADR-041.

## Datoteke, spremenjene v tem PR-ju

| Datoteka                                               | Sprememba                                                                                                                                                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | +30 vrstic: profil `memory` (Qdrant), profil `bifrost` (Bifrost), trajni nosilci, preverjanja zdravja.                                                                                                                                         |
| `.env.example`                                         | +24 vrstic: `QDRANT_*` (6 spremenljivk), `BIFROST_*` (4 spremenljivke).                                                                                                                                                                        |
| `docs/reference/ENVIRONMENT.md`                        | +6 vrstic v razdelku 25 za okoljske spremenljivke `QDRANT_*`.                                                                                                                                                                                  |
| `src/lib/memory/qdrant.ts`                             | +33 vrstic: veriga nadomestnih vrednosti okoljskih spremenljivk (nastavitve → okolje → privzeto) za `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 vrstic: 9 novih preskusnih primerov, ki določajo prednostni vrstni red nadomestnih vrednosti okoljskih spremenljivk.                                                                                                                       |
| `docs/architecture/cluster-decisions.md` (ta datoteka) | NOVO — zapis odločitve za profile s prostovoljno vključitvijo.                                                                                                                                                                                 |
| `AGENTS.md`                                            | +1 vrstica: kazalec na ta dokument v tabeli referenčne dokumentacije.                                                                                                                                                                          |

**Neto spremenjena koda:** 4 produkcijske datoteke (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 preskusna datoteka (`qdrant-wiring.test.ts`), 2 dokumentacijski datoteki (`cluster-decisions.md`, `AGENTS.md`).
