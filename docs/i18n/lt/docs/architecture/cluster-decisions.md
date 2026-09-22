# Cluster Decisions — Optional Sidecar Profiles (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Būsena:** pasiūlymas (laukiama @diegosouzapw peržiūros)
**Data:** 2026-06-20
**Nuorodos:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Trumpai

Du pasirenkami „Compose“ profiliai (`memory`, `bifrost`), skirti esamam 8 paslaugų diegimui faile [`docker-compose.yml`](../../docker-compose.yml). Numatytoji paleidimo elgsena **nesikeičia**: 3 × `omniroute` replikos + Caddy + Redis + CliproxyAPI. Du naujieji profiliai prideda Qdrant ir Bifrost kaip pasirenkamas pagalbines paslaugas, įjungiamas naudojant `docker compose --profile <name> up`. **Jokia esama paslauga nepašalinama ir nepakeičiama.**

## Kodėl šis sprendimas yra konservatyvus

Esama „OmniRoute“ diegimo struktūra jau yra taupi ir pasiteisinusi:

- **`redis:7-alpine`** produkcinėje aplinkoje apdoroja užklausų dažnio ribojimo ir podėlio darbo krūvį.
- **SQLite + sqlite-vec + FTS5** užtikrina vietinę atmintį, vektorių saugojimą ir tekstinę paiešką (žr. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** jau naudojamas kaip apkrovos balansavimo priemonė ir TLS užbaigimo taškas ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** jau integruotas kaip 1 lygio maršruto parinktuvas faile [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (pagalbinis tarpinis serveris su išjungimo mechanizmu per `BIFROST_ENABLED` aplinkos kintamąjį — nustatykite `=0`, kad apeitumėte pagalbinę paslaugą ir pereitumėte prie TS kelio).

Abu šie profiliai yra **mastelio didinimo parinktys diegimams, pasiekusiems SQLite ribas**, o ne migracijos. Pagal numatytąsias nuostatas abu yra išjungti.

## Du profiliai

### `memory` — Qdrant vektorinės atminties pagalbinė paslauga

**Kada įjungti:**

- Daugiau nei 1 mln. įterpinių viename diegime (esant tokiam mastui sqlite-vec pradeda lėtėti).
- Kelių replikų diegimui reikia bendros vektorių būsenos tarp `omniroute-1/2/3`.
- Jau turite išorinį Qdrant klasterį („Qdrant Cloud“ arba vietinį).

**Kas pridedama:**

| Paslauga | Atvaizdis               | Prievadai   | Pastabos                                                |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indeksas; nuolatinis tomas `omniroute_qdrant_data` |

**Aktyvinimas:** Nustatymų naudotojo sąsajoje įjunkite `qdrantEnabled = true` **arba** nustatykite aplinkos kintamąjį `QDRANT_HOST=qdrant`. Pirmenybės taisykles (nustatymų lentelė → aplinkos kintamasis → numatytoji reikšmė) rasite faile [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Aplinkos kintamieji:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (žr. `.env.example` 1672–1683 eilutes).

### `bifrost` — Bifrost 1 lygio maršruto parinktuvo pagalbinė paslauga

**Kada įjungti:**

- Naudojate ≥3 `omniroute` replikas ir norite centralizuoti paslaugų teikėjų rotaciją viename Go procese.
- Norite vienos audito ir žurnalų sąsajos aukštesnio lygmens paslaugų teikėjų užklausoms iš visų replikų.
- Norite horizontaliai plėsti 1 lygio maršruto parinkimo sluoksnį nepriklausomai nuo „OmniRoute“ replikų.

**Kas pridedama:**

| Paslauga  | Atvaizdis                         | Prievadai | Pastabos                                                                                     |
| --------- | --------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`    | Go pagrįstas 1 lygio maršruto parinktuvas; nuolatinis žurnalų tomas `omniroute_bifrost_logs` |

**Aktyvinimas:** faile `.env.example` nustatykite `BIFROST_BASE_URL=http://bifrost:8080`. Esamas pagalbinio tarpinio serverio maršrutas faile [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (pridėtas PR #4381) automatiškai naudos šią reikšmę.

**Aplinkos kintamieji:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (žr. `.env.example` 1685–1695 eilutes).

## Ko šis PR aiškiai NEDARO

Pradinėje problemos aptarimo gijoje buvo pasiūlytas platesnis klasterio perrašymas. Įvertinus faktinį darbo krūvio pobūdį, toliau pateikti variantai yra **atmesti** dėl nurodytų priežasčių:

| Komponentas                          | Sprendimas  | Priežastis                                                                                                                          |
| ------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ATMESTI** | `redis:7-alpine` jau visiškai tinka užklausų dažnio ribojimo darbo krūviui gamybinėje aplinkoje; nėra ribos, kurią reikėtų įveikti. |
| **NATS**                             | **ATMESTI** | Kiekviena `omniroute` replika yra vienas Node.js procesas; kelių procesų publikavimo / prenumeravimo darbo krūvio nėra.             |
| **PostgreSQL**                       | **ATMESTI** | SQLite + sqlite-vec + FTS5 apima visus 3 naudojimo atvejus; migraciją blokuoja 97 migracijos ir Electron paketavimas.               |
| **Neo4j**                            | **ATMESTI** | Maršruto parinkimas yra 5 lentelių junginys; pakanka rekursyviosios CTE su SQLite.                                                  |
| **MinIO**                            | **ATMESTI** | Nėra kelių MB dvejetainių objektų darbo krūvio; vaizdai ir garsas perduodami per tarpinius serverius nekeičiami.                    |
| **pgvector / pg_ai / pg_textsearch** | **ATMESTI** | Ta pati SQLite ribos priežastis kaip ir PostgreSQL atveju; pgvector ekosistema fragmentuota.                                        |
| **HAProxy / Envoy**                  | **ATMESTI** | Caddy jau atlieka apkrovos balansavimą ir TLS; abu buvo aiškiai atmesti kaip 1-os pakopos maršruto parinktuvai (žr. `AGENTS.md`).   |

Jei būsimas naudojimo atvejis pagrįs vieno iš šių variantų poreikį, šį dokumentą reikės atitinkamai papildyti.

## 4 savaičių diegimo planas (jei patvirtinta)

1. **1 sav.** — Sulieti šį PR ir patikrinti pasirenkamuosius profilius naudojant 3 replikų compose rinkinį.
2. **2 sav.** — Visiškai aktyvinti Bifrost, skirtą OpenAI/Claude/Gemini/Ollama (4 iš 14+ teikėjų), naudojant pagalbinio tarpinio serverio maršrutą [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (valdomą per `BIFROST_ENABLED`, su galimybe išjungti vykdymo metu).
3. **3 sav.** — Įjungti Qdrant atminties profilį viename bandomajame diegime; išmatuoti delsos skirtumą, palyginti su sqlite-vec.
4. **4 sav.** — Stebimumo būklės patikros (`docker compose ps` išėjimo kodai + `wget` baziniai testai); 71 ramsčio atnaujinimas pagal ADR-041.

## Šiame PR pakeisti failai

| Failas                                                | Pakeitimas                                                                                                                                                                                                                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                  | +30 eilučių: `memory` profilis (Qdrant), `bifrost` profilis (Bifrost), nuolatiniai tomai, būklės patikros.                                                                                                                                                  |
| `.env.example`                                        | +24 eilutės: `QDRANT_*` (6 kintamieji), `BIFROST_*` (4 kintamieji).                                                                                                                                                                                         |
| `docs/reference/ENVIRONMENT.md`                       | +6 eilutės 25 skyriuje, skirtos `QDRANT_*` aplinkos kintamiesiems.                                                                                                                                                                                          |
| `src/lib/memory/qdrant.ts`                            | +33 eilutės: aplinkos kintamųjų atsarginių reikšmių grandinė (nustatymai → aplinka → numatytoji reikšmė), skirta `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`      | +88 eilutės: 9 nauji testavimo atvejai, užfiksuojantys aplinkos kintamųjų atsarginių reikšmių pirmumą.                                                                                                                                                      |
| `docs/architecture/cluster-decisions.md` (šis failas) | NAUJAS — pasirenkamųjų profilių sprendimų įrašas.                                                                                                                                                                                                           |
| `AGENTS.md`                                           | +1 eilutė: nuoroda į šį dokumentą informacinės dokumentacijos lentelėje.                                                                                                                                                                                    |

**Iš viso paliesta kodo:** 4 gamybiniai failai (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testų failas (`qdrant-wiring.test.ts`), 2 dokumentacijos failai (`cluster-decisions.md`, `AGENTS.md`).
