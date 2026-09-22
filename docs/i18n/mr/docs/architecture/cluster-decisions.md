# Cluster Decisions — Optional Sidecar Profiles (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**स्थिती:** प्रस्ताव ( @diegosouzapw यांच्या पुनरावलोकनाच्या प्रतीक्षेत)
**दिनांक:** 2026-06-20
**संदर्भ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## थोडक्यात

[`docker-compose.yml`](../../docker-compose.yml) मधील विद्यमान 8-सेवा डिप्लॉयमेंटसाठी दोन वैकल्पिक compose प्रोफाइल (`memory`, `bifrost`). डीफॉल्ट स्टार्टअप वर्तन **अपरिवर्तित** आहे: 3 × `omniroute` प्रतिकृती + Caddy + Redis + CliproxyAPI. ही दोन नवीन प्रोफाइल Qdrant आणि Bifrost यांना वैकल्पिक sidecars म्हणून जोडतात आणि ती `docker compose --profile <name> up` द्वारे सक्षम केली जातात. **कोणतीही विद्यमान सेवा काढून टाकलेली किंवा बदललेली नाही.**

## हा दृष्टिकोन सावध का आहे

OmniRoute ची विद्यमान डिप्लॉयमेंट रचना आधीपासूनच सुटसुटीत आणि सिद्ध आहे:

- **`redis:7-alpine`** उत्पादन स्तरावरील rate-limit/cache कार्यभार हाताळते.
- **SQLite + sqlite-vec + FTS5** स्थानिक memory + vector + text-search गरजा पूर्ण करतात ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) पहा).
- **Caddy** आधीपासूनच LB + TLS terminator आहे ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** हे [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) मध्ये Tier-1 router म्हणून आधीपासूनच एकत्रित केलेले आहे (`BIFROST_ENABLED` env var द्वारे kill switch असलेला sidecar proxy — sidecar वगळून TS मार्गावर जाण्यासाठी `=0` सेट करा).

येथील दोन प्रोफाइल ही **SQLite ची क्षमता अपुरी पडणाऱ्या डिप्लॉयमेंटसाठी scale-out पर्याय आहेत** — migrations नाहीत. दोन्ही डीफॉल्टनुसार बंद आहेत.

## दोन प्रोफाइल

### `memory` — Qdrant Vector Memory Sidecar

**केव्हा सक्षम करावे:**

- प्रत्येक डिप्लॉयमेंटमध्ये > 1M embeddings असतील तेव्हा (मोठ्या प्रमाणावर sqlite-vec मंद होऊ लागते).
- `omniroute-1/2/3` मध्ये सामायिक vector state आवश्यक असलेले multi-replica डिप्लॉयमेंट.
- तुमच्याकडे आधीपासूनच बाह्य Qdrant cluster आहे (Qdrant Cloud, on-prem).

**हे काय जोडते:**

| सेवा     | Image                   | Ports       | नोंदी                                                 |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; persistent volume `omniroute_qdrant_data` |

**सक्रियकरण:** Settings UI मध्ये `qdrantEnabled = true` करा **किंवा** `QDRANT_HOST=qdrant` env सेट करा. प्राधान्य नियमांसाठी [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) पहा (settings table → env var → default).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` मधील 1672-1683 ओळी पहा).

### `bifrost` — Bifrost Tier-1 Router Sidecar

**केव्हा सक्षम करावे:**

- तुम्ही ≥3 `omniroute` प्रतिकृती चालवत असाल आणि provider rotation एका Go process मध्ये केंद्रीकृत करू इच्छित असाल.
- तुम्हाला सर्व प्रतिकृतींमधील upstream-provider विनंत्यांसाठी एकच audit/logging पृष्ठभाग हवा असेल.
- तुम्हाला OmniRoute प्रतिकृतींपासून स्वतंत्रपणे Tier-1 routing layer चे horizontal scaling हवे असेल.

**हे काय जोडते:**

| सेवा      | Image                             | Ports  | नोंदी                                                                    |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-आधारित Tier-1 router; persistent logs volume `omniroute_bifrost_logs` |

**सक्रियकरण:** `.env.example` मध्ये `BIFROST_BASE_URL=http://bifrost:8080` सेट करा. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) येथील विद्यमान sidecar proxy route (PR #4381 मध्ये जोडलेला) हे आपोआप वापरेल.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` मधील 1685-1695 ओळी पहा).

## हा PR स्पष्टपणे काय करत नाही

मूळ इश्यू थ्रेडमध्ये मोठ्या क्लस्टर पुनर्लेखनाचा प्रस्ताव मांडण्यात आला होता. प्रत्यक्ष वर्कलोडच्या स्वरूपाचे ऑडिट केल्यानंतर, खालील पर्याय दिलेल्या कारणांमुळे **नाकारले** आहेत:

| घटक                                  | निर्णय   | कारण                                                                                                                     |
| ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **वगळा** | उत्पादन स्तरावरील रेट-लिमिट वर्कलोडसाठी `redis:7-alpine` आधीपासूनच पुरेसे आहे; मोडावी अशी कोणतीही मर्यादा नाही.          |
| **NATS**                             | **वगळा** | प्रत्येक `omniroute` प्रतिकृती ही एकच Node.js प्रक्रिया आहे; कोणतेही मल्टी-प्रोसेस pub/sub वर्कलोड अस्तित्वात नाही.      |
| **PostgreSQL**                       | **वगळा** | SQLite + sqlite-vec + FTS5 हे तिन्ही उपयोगप्रकार हाताळतात; 97 मायग्रेशन्स + Electron पॅकेजिंगमुळे स्थलांतर अवरुद्ध होते. |
| **Neo4j**                            | **वगळा** | रूटिंग हे 5-टेबल जॉइन आहे; SQLite वरील recursive CTE पुरेसा आहे.                                                         |
| **MinIO**                            | **वगळा** | कोणतेही मल्टी-MB ब्लॉब वर्कलोड नाही; प्रतिमा/ऑडिओ हे पासथ्रू प्रॉक्सी आहेत.                                              |
| **pgvector / pg_ai / pg_textsearch** | **वगळा** | PostgreSQL प्रमाणेच SQLite-मर्यादेचे कारण; pgvector परिसंस्था विखंडित आहे.                                               |
| **HAProxy / Envoy**                  | **वगळा** | Caddy आधीपासूनच LB + TLS करते; दोन्हींना Tier-1 राउटर म्हणून स्पष्टपणे नाकारले आहे (`AGENTS.md` पहा).                    |

भविष्यातील एखाद्या उपयोगप्रकाराने यांपैकी कोणताही पर्याय योग्य असल्याचे सिद्ध केल्यास, या दस्तऐवजात सुधारणा करावी.

## 4-आठवड्यांचे रोलआउट (मंजूर झाल्यास)

1. **आठवडा 1** — हा PR मर्ज करा + 3-प्रतिकृती compose स्टॅकसह ऑप्ट-इन प्रोफाइल्सची पडताळणी करा.
2. **आठवडा 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) येथील साइडकार प्रॉक्सी रूट वापरून OpenAI/Claude/Gemini/Ollama साठी Bifrost पूर्णपणे सक्रिय करा (14+ पैकी 4 प्रदाते) (`BIFROST_ENABLED` द्वारे नियंत्रित, रनटाइममध्ये किल-स्विचद्वारे बंद करता येणारे).
3. **आठवडा 3** — एका चाचणी डिप्लॉयमेंटमध्ये Qdrant मेमरी प्रोफाइल सक्षम करा; sqlite-vec च्या तुलनेत लेटन्सीमधील फरक मोजा.
4. **आठवडा 4** — निरीक्षणक्षमतेसाठी हेल्थचेक्स (`docker compose ps` एक्झिट कोड्स + `wget` स्मोक टेस्ट्स); ADR-041 नुसार 71-पिलर रिफ्रेश.

## या PR मध्ये बदललेल्या फाइल्स

| फाइल                                               | बदल                                                                                                                                                                                                                        |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 ओळी: `memory` प्रोफाइल (Qdrant), `bifrost` प्रोफाइल (Bifrost), पर्सिस्टंट व्हॉल्यूम्स, हेल्थचेक्स.                                                                                                                     |
| `.env.example`                                     | +24 ओळी: `QDRANT_*` (6 व्हेरिएबल्स), `BIFROST_*` (4 व्हेरिएबल्स).                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                    | `QDRANT_*` एन्व्हायर्नमेंट व्हेरिएबल्ससाठी विभाग 25 मध्ये +6 पंक्ती.                                                                                                                                                       |
| `src/lib/memory/qdrant.ts`                         | +33 ओळी: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` साठी एन्व्हायर्नमेंट-व्हेरिएबल फॉलबॅक साखळी (सेटिंग्ज → env → डीफॉल्ट). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 ओळी: एन्व्हायर्नमेंट-व्हेरिएबल फॉलबॅक प्राधान्यक्रम निश्चित करणारी 9 नवीन चाचणी प्रकरणे.                                                                                                                               |
| `docs/architecture/cluster-decisions.md` (ही फाइल) | नवीन — ऑप्ट-इन प्रोफाइल्ससाठी निर्णय नोंद.                                                                                                                                                                                 |
| `AGENTS.md`                                        | +1 ओळ: संदर्भ दस्तऐवजीकरण तक्त्यात या दस्तऐवजाचा दुवा.                                                                                                                                                                     |

**एकूण स्पर्श केलेला कोड:** 4 उत्पादन फाइल्स (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 चाचणी फाइल (`qdrant-wiring.test.ts`), 2 दस्तऐवज फाइल्स (`cluster-decisions.md`, `AGENTS.md`).
