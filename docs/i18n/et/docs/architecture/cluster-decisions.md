# Cluster Decisions — Optional Sidecar Profiles (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Olek:** ettepanek (ootab @diegosouzapw ülevaatust)
**Kuupäev:** 2026-06-20
**Viited:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Lühidalt

Kaks valikulist Compose'i profiili (`memory`, `bifrost`) olemasolevale 8 teenusega juurutusele failis [`docker-compose.yml`](../../docker-compose.yml). Vaikimisi käivitamise käitumine jääb **muutmata**: 3 × `omniroute` replika + Caddy + Redis + CliproxyAPI. Kaks uut profiili lisavad Qdranti ja Bifrosti valikuliste külgkonteineritena, mis aktiveeritakse käsuga `docker compose --profile <name> up`. **Ühtegi olemasolevat teenust ei eemaldata ega asendata.**

## Miks see on konservatiivne

OmniRoute'i olemasolev juurutuslahendus on juba ressursisäästlik ja end tõestanud:

- **`redis:7-alpine`** käitleb tootmiskeskkonna mastaabis päringusageduse piiramise ja vahemälu töökoormust.
- **SQLite + sqlite-vec + FTS5** katavad kohaliku mälu, vektorotsingu ja tekstiotsingu (vt [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** toimib juba koormusjaoturi ja TLS-i terminaatorina ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** on juba integreeritud 1. taseme ruuterina failis [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (külgkonteineri puhverserver, millel on keskkonnamuutuja `BIFROST_ENABLED` kaudu väljalülituslüliti — määrake `=0`, et külgkonteinerist mööduda ja kasutada TS-i teed).

Need kaks profiili on **horisontaalse skaleerimise valikud juurutustele, mis jõuavad SQLite'i piirini** — mitte migratsioonid. Mõlemad on vaikimisi välja lülitatud.

## Kaks profiili

### `memory` — Qdranti vektormälu külgkonteiner

**Millal sisse lülitada:**

- > 1M manustust juurutuse kohta (sqlite-vec hakkab suures mastaabis aeglustuma).
- Mitme replikaga juurutus, mis vajab replikate `omniroute-1/2/3` vahel jagatud vektorolekut.
- Teil on juba väline Qdranti klaster (Qdrant Cloud, kohapealne).

**Mida see lisab:**

| Teenus   | Tõmmis                  | Pordid      | Märkused                                       |
| -------- | ----------------------- | ----------- | ---------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-indeks; püsiköide `omniroute_qdrant_data` |

**Aktiveerimine:** määrake seadete kasutajaliideses `qdrantEnabled = true` **või** määrake keskkonnamuutuja `QDRANT_HOST=qdrant`. Prioriteedireegleid (seadete tabel → keskkonnamuutuja → vaikeväärtus) vt failist [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Keskkonnamuutujad:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (vt `.env.example` ridu 1672–1683).

### `bifrost` — Bifrosti 1. taseme ruuteri külgkonteiner

**Millal sisse lülitada:**

- Käitate ≥3 `omniroute` replikat ja soovite teenusepakkujate roteerimise tsentraliseerida ühte Go protsessi.
- Soovite kõigi replikate üleselt ühtset auditi- ja logimisliidest ülesvoolu teenusepakkujatele saadetavate päringute jaoks.
- Soovite 1. taseme marsruutimiskihi horisontaalset skaleerimist OmniRoute'i replikatest sõltumatult.

**Mida see lisab:**

| Teenus    | Tõmmis                            | Pordid | Märkused                                                             |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-põhine 1. taseme ruuter; püsiv logiköide `omniroute_bifrost_logs` |

**Aktiveerimine:** määrake failis `.env.example` väärtus `BIFROST_BASE_URL=http://bifrost:8080`. Olemasolev külgkonteineri puhverserveri marsruut failis [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (lisatud PR-is #4381) võtab selle automaatselt kasutusele.

**Keskkonnamuutujad:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (vt `.env.example` ridu 1685–1695).

## Mida see PR sõnaselgelt EI tee

Algses probleemi arutelulõimes pakuti välja suurem klastri ümberkirjutamine. Pärast tegeliku töökoormuse iseloomu auditeerimist on järgmised lahendused toodud põhjustel **tagasi lükatud**:

| Komponent                            | Otsus       | Põhjus                                                                                                                                 |
| ------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **LOOBUDA** | `redis:7-alpine` sobib juba tootmiskoormuse mahus päringusageduse piiramise töökoormuseks; ületatavat lage pole.                       |
| **NATS**                             | **LOOBUDA** | Iga `omniroute` replika on üks Node.js-i protsess; mitme protsessiga pub/sub-töökoormust ei ole.                                       |
| **PostgreSQL**                       | **LOOBUDA** | SQLite + sqlite-vec + FTS5 katavad kõik 3 kasutusjuhtu; 97 migratsiooni + Electroni pakendamine takistavad migratsiooni.               |
| **Neo4j**                            | **LOOBUDA** | Marsruutimine on 5 tabeli ühendamine; SQLite'i rekursiivne CTE on piisav.                                                              |
| **MinIO**                            | **LOOBUDA** | Mitme MB suuruste blobide töökoormust pole; pildid/heli läbivad vahendusserverit muutmata kujul.                                       |
| **pgvector / pg_ai / pg_textsearch** | **LOOBUDA** | Sama SQLite'i lae põhjus nagu PostgreSQL-i puhul; pgvectori ökosüsteem on killustunud.                                                 |
| **HAProxy / Envoy**                  | **LOOBUDA** | Caddy juba tegeleb koormuse tasakaalustamise ja TLS-iga; mõlemad lükati sõnaselgelt tagasi 1. taseme marsruuteritena (vt `AGENTS.md`). |

Kui mõni tulevane kasutusjuht tõestab mõne neist vajalikuks, tuleb seda dokumenti täiendada.

## 4-nädalane juurutus (kui heaks kiidetakse)

1. **1. nädal** — Ühenda see PR + kontrolli lubatavaid profiile 3 replikaga compose-virnas.
2. **2. nädal** — Bifrosti täielik aktiveerimine OpenAI/Claude/Gemini/Ollama jaoks (4 pakkujat 14+ seast), kasutades külgkonteineri puhverserveri marsruuti [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (juhitud muutujaga `BIFROST_ENABLED`, käitusajal väljalülitatav).
3. **3. nädal** — Qdranti mäluprofiil lubatakse ühes testjuurutuses; mõõda latentsuse erinevust võrreldes sqlite-veciga.
4. **4. nädal** — Jälgitavuse tervisekontrollid (`docker compose ps` väljumiskoodid + `wget` suitsutestid); 71 samba värskendus vastavalt ADR-041-le.

## Selles PR-is muudetud failid

| Fail                                                | Muudatus                                                                                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 rida: `memory` profiil (Qdrant), `bifrost` profiil (Bifrost), püsivad andmekandjad, tervisekontrollid.                                                                                                                      |
| `.env.example`                                      | +24 rida: `QDRANT_*` (6 muutujat), `BIFROST_*` (4 muutujat).                                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                     | +6 rida jaotises 25 keskkonnamuutujate `QDRANT_*` jaoks.                                                                                                                                                                        |
| `src/lib/memory/qdrant.ts`                          | +33 rida: keskkonnamuutujate varuahel (seaded → keskkond → vaikeväärtus) muutujatele `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 rida: 9 uut testjuhtu, mis fikseerivad keskkonnamuutujate varuväärtuste eelistusjärjekorra.                                                                                                                                 |
| `docs/architecture/cluster-decisions.md` (see fail) | UUS — lubatavate profiilide otsustuslogi.                                                                                                                                                                                       |
| `AGENTS.md`                                         | +1 rida: viide sellele dokumendile viitedokumentatsiooni tabelis.                                                                                                                                                               |

**Muudetud kood kokku:** 4 tootmisfaili (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testifail (`qdrant-wiring.test.ts`), 2 dokumentatsioonifaili (`cluster-decisions.md`, `AGENTS.md`).
