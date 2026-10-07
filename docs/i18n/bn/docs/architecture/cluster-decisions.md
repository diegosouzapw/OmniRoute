# Cluster Decisions — Optional Sidecar Profiles (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**অবস্থা:** প্রস্তাব (এখনও @diegosouzapw-এর পর্যালোচনার অপেক্ষায়)
**তারিখ:** 2026-06-20
**রেফারেন্স:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## সংক্ষেপে

[`docker-compose.yml`](../../docker-compose.yml)-এ বিদ্যমান 8-সার্ভিস ডিপ্লয়মেন্টের জন্য দুটি অপ্ট-ইন compose প্রোফাইল (`memory`, `bifrost`)। ডিফল্টভাবে চালু করার আচরণ **অপরিবর্তিত**: 3 × `omniroute` রেপ্লিকা + Caddy + Redis + CliproxyAPI। নতুন দুটি প্রোফাইল ঐচ্ছিক sidecar হিসেবে Qdrant এবং Bifrost যোগ করে, যা `docker compose --profile <name> up` দ্বারা নিয়ন্ত্রিত। **বিদ্যমান কোনো সার্ভিস সরানো বা প্রতিস্থাপন করা হয়নি।**

## কেন এটি রক্ষণশীল

OmniRoute-এর বিদ্যমান ডিপ্লয়মেন্ট কাঠামো ইতিমধ্যেই হালকা এবং পরীক্ষিত:

- **`redis:7-alpine`** প্রোডাকশন স্কেলে rate-limit/cache ওয়ার্কলোড পরিচালনা করে।
- **SQLite + sqlite-vec + FTS5** স্থানীয় মেমরি + ভেক্টর + টেক্সট সার্চের চাহিদা পূরণ করে ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) দেখুন)।
- **Caddy** ইতিমধ্যেই LB + TLS টার্মিনেটর ([`docker-compose.yml`](../../docker-compose.yml))।
- **Bifrost** ইতিমধ্যেই [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-এ Tier-1 রাউটার হিসেবে সমন্বিত (sidecar প্রক্সি, যার kill switch হলো `BIFROST_ENABLED` env var — sidecar বাইপাস করে TS পাথে ফিরে যেতে `=0` সেট করুন)।

এখানকার দুটি প্রোফাইল হলো **SQLite-এর সীমায় পৌঁছে যাওয়া ডিপ্লয়মেন্টগুলোর জন্য scale-out বিকল্প** — মাইগ্রেশন নয়। দুটিই ডিফল্টভাবে বন্ধ।

## দুটি প্রোফাইল

### `memory` — Qdrant ভেক্টর মেমরি Sidecar

**কখন চালু করবেন:**

- প্রতি ডিপ্লয়মেন্টে > 1M এম্বেডিং (বৃহৎ স্কেলে sqlite-vec ধীর হতে শুরু করে)।
- এমন multi-replica ডিপ্লয়মেন্ট, যেখানে `omniroute-1/2/3`-এর মধ্যে শেয়ার করা ভেক্টর স্টেট প্রয়োজন।
- আপনার কাছে ইতিমধ্যেই একটি বাহ্যিক Qdrant ক্লাস্টার রয়েছে (Qdrant Cloud, on-prem)।

**এটি যা যোগ করে:**

| সার্ভিস  | ইমেজ                    | পোর্ট       | নোট                                                 |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ইনডেক্স; স্থায়ী ভলিউম `omniroute_qdrant_data` |

**সক্রিয়করণ:** Settings UI-তে `qdrantEnabled = true` করুন **অথবা** `QDRANT_HOST=qdrant` env সেট করুন। অগ্রাধিকারের নিয়মগুলোর জন্য [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) দেখুন (settings টেবিল → env var → ডিফল্ট)।

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`-এর 1672-1683 লাইন দেখুন)।

### `bifrost` — Bifrost Tier-1 রাউটার Sidecar

**কখন চালু করবেন:**

- আপনি ≥3টি `omniroute` রেপ্লিকা চালান এবং একটি একক Go প্রসেসে provider rotation কেন্দ্রীভূত করতে চান।
- সব রেপ্লিকাজুড়ে upstream-provider অনুরোধের জন্য একটি একক audit/logging ইন্টারফেস চান।
- OmniRoute রেপ্লিকাগুলো থেকে স্বাধীনভাবে Tier-1 রাউটিং স্তরের অনুভূমিক স্কেলিং চান।

**এটি যা যোগ করে:**

| সার্ভিস   | ইমেজ                              | পোর্ট  | নোট                                                                 |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-ভিত্তিক Tier-1 রাউটার; স্থায়ী লগ ভলিউম `omniroute_bifrost_logs` |

**সক্রিয়করণ:** `.env.example`-এ `BIFROST_BASE_URL=http://bifrost:8080` সেট করুন। [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-এ বিদ্যমান sidecar প্রক্সি রুটটি (PR #4381-এ যোগ করা হয়েছে) এটি স্বয়ংক্রিয়ভাবে গ্রহণ করবে।

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`-এর 1685-1695 লাইন দেখুন)।

## এই PR স্পষ্টভাবে যা করে না

মূল ইস্যু থ্রেডে আরও বৃহৎ পরিসরের ক্লাস্টার পুনর্লিখনের প্রস্তাব উঠেছিল। প্রকৃত ওয়ার্কলোডের ধরন পর্যালোচনা করার পর, নিচেরগুলো উল্লিখিত কারণগুলোর জন্য **প্রত্যাখ্যাত** হয়েছে:

| কম্পোনেন্ট                           | সিদ্ধান্ত | কারণ                                                                                                                        |
| ------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **বাদ**   | প্রোডাকশন স্কেলের রেট-লিমিট ওয়ার্কলোডের জন্য `redis:7-alpine` ইতোমধ্যেই যথেষ্ট; অতিক্রম করার মতো কোনো সীমা নেই।            |
| **NATS**                             | **বাদ**   | প্রতিটি `omniroute` রেপ্লিকা একটি একক Node.js প্রসেস; কোনো মাল্টি-প্রসেস pub/sub ওয়ার্কলোড নেই।                            |
| **PostgreSQL**                       | **বাদ**   | SQLite + sqlite-vec + FTS5 তিনটি ব্যবহারের ক্ষেত্রই কভার করে; 97টি মাইগ্রেশন + Electron প্যাকেজিং মাইগ্রেশনে বাধা দেয়।     |
| **Neo4j**                            | **বাদ**   | রাউটিং হলো 5-টেবিলের একটি join; SQLite-এ recursive CTE যথেষ্ট।                                                              |
| **MinIO**                            | **বাদ**   | কোনো মাল্টি-MB blob ওয়ার্কলোড নেই; ছবি/অডিও passthrough proxy হিসেবে কাজ করে।                                              |
| **pgvector / pg_ai / pg_textsearch** | **বাদ**   | PostgreSQL-এর মতো একই SQLite-সীমাবদ্ধতার কারণ; pgvector ইকোসিস্টেম খণ্ডিত।                                                  |
| **HAProxy / Envoy**                  | **বাদ**   | Caddy ইতোমধ্যেই LB + TLS পরিচালনা করে; দুটিকেই Tier-1 router হিসেবে স্পষ্টভাবে প্রত্যাখ্যান করা হয়েছে (`AGENTS.md` দেখুন)। |

ভবিষ্যতের কোনো ব্যবহারের ক্ষেত্র এগুলোর কোনো একটির কার্যকারিতা প্রমাণ করলে, এই ডকুমেন্টেই তা সংশোধন করতে হবে।

## 4-সপ্তাহের রোলআউট (অনুমোদিত হলে)

1. **সপ্তাহ 1** — এই PR মার্জ করা + 3-রেপ্লিকার compose stack দিয়ে opt-in profile যাচাই।
2. **সপ্তাহ 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-এর sidecar proxy route ব্যবহার করে OpenAI/Claude/Gemini/Ollama-এর জন্য Bifrost সম্পূর্ণ সক্রিয়করণ (14+ provider-এর মধ্যে 4টি) (`BIFROST_ENABLED` দ্বারা নিয়ন্ত্রিত, রানটাইমে kill switch দিয়ে বন্ধ করা যায়)।
3. **সপ্তাহ 3** — একটি একক টেস্ট ডিপ্লয়মেন্টে Qdrant memory profile সক্রিয় করা; sqlite-vec-এর তুলনায় latency delta পরিমাপ করা।
4. **সপ্তাহ 4** — Observability healthcheck (`docker compose ps` exit code + `wget` smoke test); ADR-041 অনুযায়ী 71-pillar refresh।

## এই PR-এ পরিবর্তিত ফাইলসমূহ

| ফাইল                                               | পরিবর্তন                                                                                                                                                                                                       |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 লাইন: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volume, healthcheck।                                                                                                              |
| `.env.example`                                     | +24 লাইন: `QDRANT_*` (6টি var), `BIFROST_*` (4টি var)।                                                                                                                                                         |
| `docs/reference/ENVIRONMENT.md`                    | `QDRANT_*` env var-এর জন্য সেকশন 25-এ +6টি সারি।                                                                                                                                                               |
| `src/lib/memory/qdrant.ts`                         | +33 লাইন: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`-এর জন্য env-var fallback chain (settings → env → default)। |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 লাইন: env-var fallback-এর অগ্রাধিকার নির্দিষ্ট করে 9টি নতুন test case।                                                                                                                                     |
| `docs/architecture/cluster-decisions.md` (এই ফাইল) | নতুন — opt-in profile-এর জন্য decision record।                                                                                                                                                                 |
| `AGENTS.md`                                        | +1 লাইন: reference documentation table-এ এই ডকুমেন্টের pointer।                                                                                                                                                |

**সর্বমোট পরিবর্তিত কোড:** 4টি production file (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1টি test file (`qdrant-wiring.test.ts`), 2টি doc file (`cluster-decisions.md`, `AGENTS.md`)।
