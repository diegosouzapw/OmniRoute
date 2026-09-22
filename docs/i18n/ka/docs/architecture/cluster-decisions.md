# Cluster Decisions — Optional Sidecar Profiles (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**სტატუსი:** შეთავაზება (ელოდება @diegosouzapw-ის მიმოხილვას)
**თარიღი:** 2026-06-20
**ბმულები:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## მოკლედ

არსებული 8-სერვისიანი განთავსებისთვის [`docker-compose.yml`](../../docker-compose.yml)-ში ორი არჩევითი compose-პროფილი (`memory`, `bifrost`). ნაგულისხმევი გაშვების ქცევა **უცვლელია**: 3 × `omniroute` რეპლიკა + Caddy + Redis + CliproxyAPI. ორი ახალი პროფილი არჩევითი sidecar-ების სახით ამატებს Qdrant-სა და Bifrost-ს და აქტიურდება `docker compose --profile <name> up` ბრძანებით. **არცერთი არსებული სერვისი არ იშლება ან ჩანაცვლდება.**

## რატომ არის ეს კონსერვატიული მიდგომა

OmniRoute-ის არსებული განთავსების სტრუქტურა უკვე მსუბუქი და გამოცდილია:

- **`redis:7-alpine`** საწარმოო მასშტაბში ამუშავებს მოთხოვნების სიხშირის შეზღუდვისა და ქეშის დატვირთვას.
- **SQLite + sqlite-vec + FTS5** უზრუნველყოფს ლოკალურ მეხსიერებას, ვექტორულ და ტექსტურ ძიებას (იხილეთ [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** უკვე ასრულებს დატვირთვის დამბალანსებლისა და TLS-ის ტერმინატორის როლს ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** უკვე ინტეგრირებულია, როგორც პირველი დონის მარშრუტიზატორი, ფაილში [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar-პროქსი, რომლის გამორთვაც შესაძლებელია `BIFROST_ENABLED` გარემოს ცვლადით — sidecar-ის გვერდის ასავლელად და TS მარშრუტზე გადასასვლელად მიუთითეთ `=0`).

აქ წარმოდგენილი ორი პროფილი არის **მასშტაბირების ვარიანტები იმ განთავსებებისთვის, რომლებიც SQLite-ის ზღვარს აღწევს** — და არა მიგრაციები. ორივე ნაგულისხმევად გამორთულია.

## ორი პროფილი

### `memory` — Qdrant-ის ვექტორული მეხსიერების Sidecar

**როდის უნდა ჩართოთ:**

- ერთ განთავსებაში 1 მილიონზე მეტი embedding (მასშტაბის ზრდასთან ერთად sqlite-vec ნელდება).
- მრავალრეპლიკიანი განთავსება, რომელსაც `omniroute-1/2/3`-ს შორის საერთო ვექტორული მდგომარეობა სჭირდება.
- უკვე გაქვთ გარე Qdrant-კლასტერი (Qdrant Cloud, საკუთარ ინფრასტრუქტურაში).

**რას ამატებს:**

| სერვისი  | იმიჯი                   | პორტები     | შენიშვნები                                         |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ინდექსი; მუდმივი ტომი `omniroute_qdrant_data` |

**აქტივაცია:** პარამეტრების UI-ში ჩართეთ `qdrantEnabled = true` **ან** დააყენეთ გარემოს ცვლადი `QDRANT_HOST=qdrant`. პრიორიტეტულობის წესებისთვის (პარამეტრების ცხრილი → გარემოს ცვლადი → ნაგულისხმევი მნიშვნელობა) იხილეთ [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**გარემოს ცვლადები:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (იხილეთ `.env.example`-ის 1672-1683 სტრიქონები).

### `bifrost` — Bifrost-ის პირველი დონის მარშრუტიზატორის Sidecar

**როდის უნდა ჩართოთ:**

- იყენებთ ≥3 `omniroute` რეპლიკას და გსურთ პროვაიდერების როტაციის ცენტრალიზება ერთ Go-პროცესში.
- გსურთ ყველა რეპლიკის ზემდგომ პროვაიდერებთან გაგზავნილი მოთხოვნების აუდიტისა და ჟურნალირების ერთიანი ზედაპირი.
- გსურთ პირველი დონის მარშრუტიზაციის შრის ჰორიზონტალური მასშტაბირება OmniRoute-ის რეპლიკებისგან დამოუკიდებლად.

**რას ამატებს:**

| სერვისი   | იმიჯი                             | პორტები | შენიშვნები                                                                                       |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go-ზე დაფუძნებული პირველი დონის მარშრუტიზატორი; ჟურნალების მუდმივი ტომი `omniroute_bifrost_logs` |

**აქტივაცია:** `.env.example`-ში დააყენეთ `BIFROST_BASE_URL=http://bifrost:8080`. არსებული sidecar-პროქსის მარშრუტი ფაილში [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (დამატებულია PR #4381-ში) ამას ავტომატურად გამოიყენებს.

**გარემოს ცვლადები:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (იხილეთ `.env.example`-ის 1685-1695 სტრიქონები).

## რას არ აკეთებს ეს PR აშკარად

თავდაპირველ issue-ის განხილვაში განიხილებოდა კლასტერის უფრო მასშტაბური გადაწერა. რეალური სამუშაო დატვირთვის ფორმის აუდიტის შემდეგ, ქვემოთ ჩამოთვლილი კომპონენტები მითითებული მიზეზებით **უარყოფილია**:

| კომპონენტი                           | გადაწყვეტილება | მიზეზი                                                                                                                               |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **ამოღება**    | `redis:7-alpine` უკვე სრულად საკმარისია წარმოების მასშტაბზე სიხშირის შეზღუდვის სამუშაო დატვირთვისთვის; დასაძლევი ზღვარი არ არსებობს. |
| **NATS**                             | **ამოღება**    | `omniroute`-ის თითოეული რეპლიკა ერთი Node.js პროცესია; მრავალპროცესიანი pub/sub სამუშაო დატვირთვა არ არსებობს.                       |
| **PostgreSQL**                       | **ამოღება**    | SQLite + sqlite-vec + FTS5 სამივე გამოყენების შემთხვევას ფარავს; მიგრაციას 97 მიგრაცია და Electron-ის პაკეტირება აბრკოლებს.          |
| **Neo4j**                            | **ამოღება**    | მარშრუტიზაცია 5-ცხრილიანი join-ია; SQLite-ში რეკურსიული CTE საკმარისია.                                                              |
| **MinIO**                            | **ამოღება**    | მრავალმეგაბაიტიანი blob სამუშაო დატვირთვა არ არსებობს; სურათები/აუდიო passthrough-პროქსიებით გადაიცემა.                              |
| **pgvector / pg_ai / pg_textsearch** | **ამოღება**    | იგივე SQLite-ის ზღვართან დაკავშირებული მიზეზი, რაც PostgreSQL-ის შემთხვევაში; pgvector-ის ეკოსისტემა ფრაგმენტირებულია.               |
| **HAProxy / Envoy**                  | **ამოღება**    | Caddy უკვე უზრუნველყოფს LB-სა და TLS-ს; ორივე აშკარად უარყოფილი იყო, როგორც Tier-1 მარშრუტიზატორი (იხილეთ `AGENTS.md`).              |

თუ სამომავლო გამოყენების შემთხვევა რომელიმე მათგანის საჭიროებას დაადასტურებს, ცვლილება სწორედ ამ დოკუმენტში უნდა შევიდეს.

## 4-კვირიანი დანერგვა (დამტკიცების შემთხვევაში)

1. **კვ. 1** — ამ PR-ის გაერთიანება + opt-in პროფილების შემოწმება 3-რეპლიკიან compose სტეკში.
2. **კვ. 2** — Bifrost-ის სრული გააქტიურება OpenAI/Claude/Gemini/Ollama-სთვის (14+-დან 4 პროვაიდერი) sidecar-პროქსის მარშრუტის გამოყენებით: [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (`BIFROST_ENABLED`-ით კონტროლირებადი, შესრულების დროს kill switch-ით გამორთვის შესაძლებლობით).
3. **კვ. 3** — Qdrant-ის მეხსიერების პროფილის ჩართვა ერთ სატესტო დანერგვაში; დაყოვნების სხვაობის გაზომვა sqlite-vec-თან შედარებით.
4. **კვ. 4** — დაკვირვებადობის healthcheck-ები (`docker compose ps`-ის გასვლის კოდები + `wget` smoke-ტესტები); 71 საყრდენი კომპონენტის განახლება ADR-041-ის შესაბამისად.

## ამ PR-ში შეცვლილი ფაილები

| ფაილი                                               | ცვლილება                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 ხაზი: `memory` პროფილი (Qdrant), `bifrost` პროფილი (Bifrost), მუდმივი ტომები, healthcheck-ები.                                                                                                                                             |
| `.env.example`                                      | +24 ხაზი: `QDRANT_*` (6 ცვლადი), `BIFROST_*` (4 ცვლადი).                                                                                                                                                                                       |
| `docs/reference/ENVIRONMENT.md`                     | +6 სტრიქონი 25-ე განყოფილებაში `QDRANT_*` გარემოს ცვლადებისთვის.                                                                                                                                                                               |
| `src/lib/memory/qdrant.ts`                          | +33 ხაზი: გარემოს ცვლადების fallback-ჯაჭვი (პარამეტრები → გარემო → ნაგულისხმევი მნიშვნელობა) `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`-ისთვის. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 ხაზი: 9 ახალი სატესტო შემთხვევა, რომლებიც გარემოს ცვლადების fallback-ის პრიორიტეტულობას აფიქსირებს.                                                                                                                                        |
| `docs/architecture/cluster-decisions.md` (ეს ფაილი) | ახალი — გადაწყვეტილების ჩანაწერი opt-in პროფილებისთვის.                                                                                                                                                                                        |
| `AGENTS.md`                                         | +1 ხაზი: ამ დოკუმენტზე მითითება საცნობარო დოკუმენტაციის ცხრილში.                                                                                                                                                                               |

**შეცვლილი კოდის ჯამი:** 4 საწარმოო ფაილი (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 სატესტო ფაილი (`qdrant-wiring.test.ts`), 2 დოკუმენტაციის ფაილი (`cluster-decisions.md`, `AGENTS.md`).
