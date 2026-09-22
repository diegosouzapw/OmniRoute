# Cluster Decisions — Optional Sidecar Profiles (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Statuss:** priekšlikums (gaida @diegosouzapw pārskatīšanu)
**Datums:** 2026-06-20
**Atsauces:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Īsumā

Divi pēc izvēles aktivizējami Compose profili (`memory`, `bifrost`) esošajai 8 servisu izvietošanai failā [`docker-compose.yml`](../../docker-compose.yml). Noklusējuma palaišanas darbība ir **nemainīga**: 3 × `omniroute` replikas + Caddy + Redis + CliproxyAPI. Abi jaunie profili pievieno Qdrant un Bifrost kā neobligātus blakusservisus, kas tiek iespējoti ar `docker compose --profile <name> up`. **Neviens esošais serviss netiek noņemts vai aizstāts.**

## Kāpēc šī ir konservatīva pieeja

OmniRoute esošā izvietošanas arhitektūra jau ir kompakta un pārbaudīta:

- **`redis:7-alpine`** apstrādā pieprasījumu biežuma ierobežošanas un kešatmiņas slodzi produkcijas mērogā.
- **SQLite + sqlite-vec + FTS5** nodrošina lokālo atmiņu, vektoru meklēšanu un teksta meklēšanu (skatiet [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** jau darbojas kā slodzes balansētājs un TLS terminators ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** jau ir integrēts kā 1. līmeņa maršrutētājs failā [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (blakusservisa starpniekserveris ar izslēgšanas slēdzi, izmantojot vides mainīgo `BIFROST_ENABLED` — iestatiet `=0`, lai apietu blakusservisu un pārietu uz TS ceļu).

Abi šeit aprakstītie profili ir **horizontālās mērogošanas iespējas izvietojumiem, kas sasniedz SQLite ierobežojumus**, nevis migrācijas. Abi pēc noklusējuma ir izslēgti.

## Abi profili

### `memory` — Qdrant vektoru atmiņas blakusserviss

**Kad to ieslēgt:**

- > 1M iegulumu vienā izvietojumā (sqlite-vec sāk palēnināties lielā mērogā).
- Vairāku repliku izvietojums, kam nepieciešams kopīgs vektoru stāvoklis starp `omniroute-1/2/3`.
- Jums jau ir ārējs Qdrant klasteris (Qdrant Cloud, lokālajā infrastruktūrā).

**Ko tas pievieno:**

| Serviss  | Attēls                  | Porti       | Piezīmes                                                 |
| -------- | ----------------------- | ----------- | -------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indekss; pastāvīgais sējums `omniroute_qdrant_data` |

**Aktivizēšana:** iestatījumu lietotāja saskarnē pārslēdziet `qdrantEnabled = true` **vai** iestatiet vides mainīgo `QDRANT_HOST=qdrant`. Prioritātes noteikumus (iestatījumu tabula → vides mainīgais → noklusējuma vērtība) skatiet failā [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Vides mainīgie:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (skatiet `.env.example` 1672.–1683. rindu).

### `bifrost` — Bifrost 1. līmeņa maršrutētāja blakusserviss

**Kad to ieslēgt:**

- Jūs darbināt ≥3 `omniroute` replikas un vēlaties centralizēt pakalpojumu sniedzēju rotāciju vienā Go procesā.
- Jūs vēlaties vienotu audita un žurnālu saskarni visu repliku pieprasījumiem augšupējiem pakalpojumu sniedzējiem.
- Jūs vēlaties horizontāli mērogot 1. līmeņa maršrutēšanas slāni neatkarīgi no OmniRoute replikām.

**Ko tas pievieno:**

| Serviss   | Attēls                            | Porti  | Piezīmes                                                                                      |
| --------- | --------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go valodā veidots 1. līmeņa maršrutētājs; pastāvīgais žurnālu sējums `omniroute_bifrost_logs` |

**Aktivizēšana:** failā `.env.example` iestatiet `BIFROST_BASE_URL=http://bifrost:8080`. Esošais blakusservisa starpniekservera maršruts failā [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (pievienots PR #4381) to automātiski izmantos.

**Vides mainīgie:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (skatiet `.env.example` 1685.–1695. rindu).

## Ko šis PR nepārprotami NEDARA

Sākotnējā problēmas apspriešanas pavedienā tika apsvērta plašāka klastera pārveide. Pēc faktiskās darba slodzes rakstura izvērtēšanas tālāk norādītie risinājumi ir **noraidīti** minēto iemeslu dēļ:

| Komponents                           | Lēmums       | Iemesls                                                                                                                         |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **NORAIDĪT** | `redis:7-alpine` jau ir pilnībā piemērots ātruma ierobežošanas darba slodzei produkcijas mērogā; nav robežas, ko pārvarēt.      |
| **NATS**                             | **NORAIDĪT** | Katra `omniroute` replika ir viens Node.js process; nav vairāku procesu pub/sub darba slodzes.                                  |
| **PostgreSQL**                       | **NORAIDĪT** | SQLite + sqlite-vec + FTS5 aptver visus 3 lietojuma gadījumus; migrāciju bloķē 97 migrācijas un Electron pakotņošana.           |
| **Neo4j**                            | **NORAIDĪT** | Maršrutēšana ir 5 tabulu savienojums; rekursīvs CTE risinājumā SQLite ir pietiekams.                                            |
| **MinIO**                            | **NORAIDĪT** | Nav vairāku MB bināro objektu darba slodzes; attēli/audio tiek pārsūtīti caur starpniekserveriem bez apstrādes.                 |
| **pgvector / pg_ai / pg_textsearch** | **NORAIDĪT** | Tas pats SQLite ierobežojuma iemesls kā PostgreSQL gadījumā; pgvector ekosistēma ir sadrumstalota.                              |
| **HAProxy / Envoy**                  | **NORAIDĪT** | Caddy jau nodrošina slodzes balansēšanu + TLS; abi tika nepārprotami noraidīti kā 1. līmeņa maršrutētāji (skatiet `AGENTS.md`). |

Ja kāds nākotnes lietojuma gadījums pamatos kādu no šiem risinājumiem, šis dokuments ir vieta, kur veikt grozījumus.

## 4 nedēļu ieviešanas plāns (ja apstiprināts)

1. **1. ned.** — Apvienot šo PR + pārbaudīt brīvprātīgi iespējojamos profilus ar 3 repliku compose steku.
2. **2. ned.** — Pilnībā aktivizēt Bifrost pakalpojumiem OpenAI/Claude/Gemini/Ollama (4 no 14+ nodrošinātājiem), izmantojot blakusprocesa starpniekservera maršrutu [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (aktivizēšanu kontrolē `BIFROST_ENABLED`, un izpildlaikā to var izslēgt ar avārijas slēdzi).
3. **3. ned.** — Iespējot Qdrant atmiņas profilu vienā testa izvietojumā; izmērīt latentuma atšķirību salīdzinājumā ar sqlite-vec.
4. **4. ned.** — Novērojamības veselības pārbaudes (`docker compose ps` izejas kodi + `wget` dūmu testi); 71 pīlāra atjaunināšana atbilstoši ADR-041.

## Šajā PR mainītie faili

| Fails                                                | Izmaiņas                                                                                                                                                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 rindas: `memory` profils (Qdrant), `bifrost` profils (Bifrost), pastāvīgie sējumi, veselības pārbaudes.                                                                                                                         |
| `.env.example`                                       | +24 rindas: `QDRANT_*` (6 mainīgie), `BIFROST_*` (4 mainīgie).                                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                      | +6 rindas 25. sadaļā `QDRANT_*` vides mainīgajiem.                                                                                                                                                                                  |
| `src/lib/memory/qdrant.ts`                           | +33 rindas: vides mainīgo atkāpšanās ķēde (iestatījumi → vide → noklusējums) mainīgajiem `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 rindas: 9 jauni testa gadījumi, kas fiksē vides mainīgo atkāpšanās prioritāti.                                                                                                                                                  |
| `docs/architecture/cluster-decisions.md` (šis fails) | JAUNS — lēmumu ieraksts par brīvprātīgi iespējojamiem profiliem.                                                                                                                                                                    |
| `AGENTS.md`                                          | +1 rinda: norāde uz šo dokumentu atsauces dokumentācijas tabulā.                                                                                                                                                                    |

**Kopējais skarto koda failu skaits:** 4 produkcijas faili (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testa fails (`qdrant-wiring.test.ts`), 2 dokumentācijas faili (`cluster-decisions.md`, `AGENTS.md`).
