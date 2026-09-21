# Cluster Decisions — Optional Sidecar Profiles (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** prijedlog (čeka se pregled korisnika @diegosouzapw)
**Datum:** 2026-06-20
**Reference:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Ukratko

Dva izborna compose profila (`memory`, `bifrost`) za postojeću implementaciju s 8 servisa u datoteci [`docker-compose.yml`](../../docker-compose.yml). Zadano ponašanje pri pokretanju ostaje **nepromijenjeno**: 3 × replike servisa `omniroute` + Caddy + Redis + CliproxyAPI. Dva nova profila dodaju Qdrant i Bifrost kao izborne pomoćne servise, aktivirane naredbom `docker compose --profile <name> up`. **Nijedan postojeći servis nije uklonjen ni zamijenjen.**

## Zašto je ovaj pristup konzervativan

Postojeća struktura implementacije OmniRoutea već je učinkovita i dokazana:

- **`redis:7-alpine`** obrađuje ograničavanje stope zahtjeva i predmemoriranje na produkcijskoj razini.
- **SQLite + sqlite-vec + FTS5** pokrivaju lokalnu memoriju, vektorsko i tekstualno pretraživanje (pogledajte [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** već služi kao raspoređivač opterećenja i terminator TLS-a ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** je već integriran kao usmjerivač razine Tier-1 u datoteci [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (pomoćni proxy s prekidačem za isključivanje putem varijable okruženja `BIFROST_ENABLED` — postavite `=0` kako biste zaobišli pomoćni servis i prešli na TS putanju).

Ova dva profila predstavljaju **opcije horizontalnog skaliranja za implementacije koje dosegnu ograničenja SQLitea** — nisu migracije. Oba su zadano isključena.

## Dva profila

### `memory` — pomoćni servis Qdrant za vektorsku memoriju

**Kada ga uključiti:**

- > 1M ugrađivanja po implementaciji (sqlite-vec počinje usporavati pri većem opsegu).
- Implementacija s više replika kojoj je potrebno dijeljeno vektorsko stanje između `omniroute-1/2/3`.
- Već imate vanjski Qdrant klaster (Qdrant Cloud, lokalna infrastruktura).

**Što dodaje:**

| Servis   | Slika                   | Portovi     | Napomene                                            |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indeks; trajni volumen `omniroute_qdrant_data` |

**Aktivacija:** uključite `qdrantEnabled = true` u korisničkom sučelju postavki **ili** postavite varijablu okruženja `QDRANT_HOST=qdrant`. Pravila prioriteta (tablica postavki → varijabla okruženja → zadana vrijednost) opisana su u datoteci [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Varijable okruženja:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (pogledajte retke 1672-1683 u datoteci `.env.example`).

### `bifrost` — pomoćni servis Bifrost kao usmjerivač razine Tier-1

**Kada ga uključiti:**

- Izvodite ≥3 replike servisa `omniroute` i želite centralizirati rotaciju pružatelja u jednom Go procesu.
- Želite jedinstvenu površinu za reviziju i zapisivanje zahtjeva prema vanjskim pružateljima iz svih replika.
- Želite horizontalno skaliranje sloja usmjeravanja Tier-1 neovisno o replikama OmniRoutea.

**Što dodaje:**

| Servis    | Slika                             | Portovi | Napomene                                                                             |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Usmjerivač Tier-1 temeljen na Gou; trajni volumen zapisnika `omniroute_bifrost_logs` |

**Aktivacija:** postavite `BIFROST_BASE_URL=http://bifrost:8080` u datoteci `.env.example`. Postojeća ruta pomoćnog proxyja u datoteci [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dodana u PR-u #4381) automatski će preuzeti tu vrijednost.

**Varijable okruženja:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (pogledajte retke 1685-1695 u datoteci `.env.example`).

## Što ovaj PR izričito NE radi

U izvornoj raspravi o problemu predloženo je opsežnije preuređenje klastera. Nakon analize stvarnog oblika radnog opterećenja, sljedeće se mogućnosti **odbijaju** iz navedenih razloga:

| Komponenta                           | Odluka     | Razlog                                                                                                                               |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **ODBACI** | `redis:7-alpine` već je prikladan za radno opterećenje ograničavanja stope na produkcijskoj razini; nema granice koju treba probiti. |
| **NATS**                             | **ODBACI** | Svaka replika `omniroute` jedan je Node.js proces; ne postoji viš-procesno pub/sub radno opterećenje.                                |
| **PostgreSQL**                       | **ODBACI** | SQLite + sqlite-vec + FTS5 pokrivaju sva 3 slučaja upotrebe; 97 migracija + Electron pakiranje onemogućuju migraciju.                |
| **Neo4j**                            | **ODBACI** | Usmjeravanje je spajanje 5 tablica; rekurzivni CTE u SQLiteu je dovoljan.                                                            |
| **MinIO**                            | **ODBACI** | Ne postoji radno opterećenje s blobovima od više MB; slike i zvuk prosljeđuju se putem proxyja.                                      |
| **pgvector / pg_ai / pg_textsearch** | **ODBACI** | Isti razlog ograničenja SQLitea kao i za PostgreSQL; ekosustav pgvectora fragmentiran je.                                            |
| **HAProxy / Envoy**                  | **ODBACI** | Caddy već obavlja raspodjelu opterećenja + TLS; oba su izričito odbačena kao usmjerivači razine 1 (pogledajte `AGENTS.md`).          |

Ako budući slučaj upotrebe potvrdi potrebu za nekom od ovih mogućnosti, ovaj je dokument mjesto za izmjenu odluke.

## Uvođenje tijekom 4 tjedna (ako bude odobreno)

1. **1. tj.** — Uključivanje ovog PR-a + provjera profila koji se aktiviraju po izboru uz compose stog s 3 replike.
2. **2. tj.** — Potpuna aktivacija Bifrosta za OpenAI/Claude/Gemini/Ollama (4 od 14+ pružatelja) putem bočne proxy rute na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (kontrolirano varijablom `BIFROST_ENABLED`, uz mogućnost isključivanja tijekom izvođenja).
3. **3. tj.** — Profil memorije Qdrant omogućen u jednoj testnoj implementaciji; mjerenje razlike u latenciji u odnosu na sqlite-vec.
4. **4. tj.** — Provjere ispravnosti opservabilnosti (izlazni kodovi naredbe `docker compose ps` + brzi testovi naredbom `wget`); osvježavanje 71 stupa prema ADR-041.

## Datoteke izmijenjene u ovom PR-u

| Datoteka                                                | Izmjena                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 redaka: profil `memory` (Qdrant), profil `bifrost` (Bifrost), trajni volumeni, provjere ispravnosti.                                                                                                                                             |
| `.env.example`                                          | +24 retka: `QDRANT_*` (6 varijabli), `BIFROST_*` (4 varijable).                                                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                         | +6 redaka u odjeljku 25 za varijable okruženja `QDRANT_*`.                                                                                                                                                                                           |
| `src/lib/memory/qdrant.ts`                              | +33 retka: lanac zamjenskih vrijednosti varijabli okruženja (postavke → okruženje → zadana vrijednost) za `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 redaka: 9 novih testnih slučajeva koji utvrđuju redoslijed prvenstva zamjenskih vrijednosti varijabli okruženja.                                                                                                                                 |
| `docs/architecture/cluster-decisions.md` (ova datoteka) | NOVO — zapis odluke za profile koji se aktiviraju po izboru.                                                                                                                                                                                         |
| `AGENTS.md`                                             | +1 redak: poveznica na ovaj dokument u tablici referentne dokumentacije.                                                                                                                                                                             |

**Neto izmijenjeni kod:** 4 produkcijske datoteke (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testna datoteka (`qdrant-wiring.test.ts`), 2 dokumentacijske datoteke (`cluster-decisions.md`, `AGENTS.md`).
