# Cluster Decisions — Optional Sidecar Profiles (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**स्थिति:** प्रस्ताव ( @diegosouzapw की समीक्षा की प्रतीक्षा में)
**दिनांक:** 2026-06-20
**संदर्भ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## संक्षेप में

[`docker-compose.yml`](../../docker-compose.yml) में मौजूदा 8-सर्विस डिप्लॉयमेंट के लिए दो वैकल्पिक compose प्रोफ़ाइल (`memory`, `bifrost`)। डिफ़ॉल्ट-अप व्यवहार **अपरिवर्तित** है: 3 × `omniroute` प्रतिकृतियाँ + Caddy + Redis + CliproxyAPI। दो नई प्रोफ़ाइल वैकल्पिक sidecar के रूप में Qdrant और Bifrost जोड़ती हैं, जिन्हें `docker compose --profile <name> up` द्वारा सक्षम किया जाता है। **किसी भी मौजूदा सर्विस को हटाया या बदला नहीं गया है।**

## यह रूढ़िवादी क्यों है

OmniRoute की मौजूदा डिप्लॉयमेंट संरचना पहले से ही हल्की और प्रमाणित है:

- **`redis:7-alpine`** प्रोडक्शन स्तर पर रेट-लिमिट/कैश वर्कलोड संभालता है।
- **SQLite + sqlite-vec + FTS5** स्थानीय मेमोरी + वेक्टर + टेक्स्ट-सर्च को कवर करते हैं ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) देखें)।
- **Caddy** पहले से ही LB + TLS टर्मिनेटर है ([`docker-compose.yml`](../../docker-compose.yml))।
- **Bifrost** पहले से ही [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) में Tier-1 राउटर के रूप में एकीकृत है (`BIFROST_ENABLED` env var के माध्यम से किल स्विच वाला sidecar प्रॉक्सी — sidecar को बायपास करने और TS पथ पर जाने के लिए `=0` सेट करें)।

यहाँ दी गई दोनों प्रोफ़ाइल उन डिप्लॉयमेंट के लिए **स्केल-आउट विकल्प हैं जो SQLite की सीमा तक पहुँच जाते हैं** — ये माइग्रेशन नहीं हैं। दोनों डिफ़ॉल्ट रूप से बंद हैं।

## दोनों प्रोफ़ाइल

### `memory` — Qdrant वेक्टर मेमोरी Sidecar

**कब चालू करें:**

- प्रति डिप्लॉयमेंट > 1M एम्बेडिंग (sqlite-vec बड़े पैमाने पर धीमा होने लगता है)।
- ऐसा मल्टी-रेप्लिका डिप्लॉयमेंट जिसे `omniroute-1/2/3` के बीच साझा वेक्टर स्थिति की आवश्यकता हो।
- आपके पास पहले से कोई बाहरी Qdrant क्लस्टर है (Qdrant Cloud, ऑन-प्रिमाइसेस)।

**यह क्या जोड़ता है:**

| सर्विस   | इमेज                    | पोर्ट       | टिप्पणियाँ                                           |
| -------- | ----------------------- | ----------- | ---------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW इंडेक्स; स्थायी वॉल्यूम `omniroute_qdrant_data` |

**सक्रियण:** Settings UI में `qdrantEnabled = true` करें **या** `QDRANT_HOST=qdrant` env सेट करें। प्राथमिकता नियमों (सेटिंग्स टेबल → env var → डिफ़ॉल्ट) के लिए [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) देखें।

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` की पंक्तियाँ 1672-1683 देखें)।

### `bifrost` — Bifrost Tier-1 राउटर Sidecar

**कब चालू करें:**

- आप ≥3 `omniroute` प्रतिकृतियाँ चलाते हैं और प्रदाता रोटेशन को एकल Go प्रोसेस में केंद्रीकृत करना चाहते हैं।
- आप सभी प्रतिकृतियों में अपस्ट्रीम-प्रदाता अनुरोधों के लिए एकल ऑडिट/लॉगिंग सतह चाहते हैं।
- आप OmniRoute प्रतिकृतियों से स्वतंत्र रूप से Tier-1 रूटिंग परत की हॉरिज़ॉन्टल स्केलिंग चाहते हैं।

**यह क्या जोड़ता है:**

| सर्विस    | इमेज                              | पोर्ट  | टिप्पणियाँ                                                          |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-आधारित Tier-1 राउटर; स्थायी लॉग वॉल्यूम `omniroute_bifrost_logs` |

**सक्रियण:** `.env.example` में `BIFROST_BASE_URL=http://bifrost:8080` सेट करें। [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) पर मौजूद sidecar प्रॉक्सी रूट (PR #4381 में जोड़ा गया) इसे स्वचालित रूप से उपयोग करेगा।

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` की पंक्तियाँ 1685-1695 देखें)।

## यह PR स्पष्ट रूप से क्या नहीं करता है

मूल इश्यू थ्रेड में बड़े क्लस्टर पुनर्लेखन का प्रस्ताव रखा गया था। वास्तविक वर्कलोड संरचना का ऑडिट करने के बाद, निम्नलिखित को दिए गए कारणों से **अस्वीकार** किया गया है:

| घटक                                  | निर्णय    | कारण                                                                                                                     |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **हटाएँ** | उत्पादन स्तर पर रेट-लिमिट वर्कलोड के लिए `redis:7-alpine` पहले से पर्याप्त है; पार करने के लिए कोई सीमा नहीं है।         |
| **NATS**                             | **हटाएँ** | प्रत्येक `omniroute` रेप्लिका एकल Node.js प्रोसेस है; कोई मल्टी-प्रोसेस पब/सब वर्कलोड मौजूद नहीं है।                     |
| **PostgreSQL**                       | **हटाएँ** | SQLite + sqlite-vec + FTS5 सभी 3 उपयोग मामलों को पूरा करते हैं; 97 माइग्रेशन + Electron पैकेजिंग माइग्रेशन को रोकते हैं। |
| **Neo4j**                            | **हटाएँ** | रूटिंग 5-टेबल जॉइन है; SQLite पर रिकर्सिव CTE पर्याप्त है।                                                               |
| **MinIO**                            | **हटाएँ** | कोई मल्टी-MB ब्लॉब वर्कलोड नहीं है; इमेज/ऑडियो पासथ्रू प्रॉक्सी हैं।                                                     |
| **pgvector / pg_ai / pg_textsearch** | **हटाएँ** | PostgreSQL के समान SQLite-सीमा वाला कारण; pgvector इकोसिस्टम खंडित है।                                                   |
| **HAProxy / Envoy**                  | **हटाएँ** | Caddy पहले से LB + TLS करता है; दोनों को स्पष्ट रूप से Tier-1 राउटर के रूप में अस्वीकार किया गया था (`AGENTS.md` देखें)। |

यदि भविष्य में कोई उपयोग मामला इनमें से किसी एक को उपयुक्त सिद्ध करता है, तो संशोधन के लिए यही दस्तावेज़ उपयुक्त स्थान है।

## 4-सप्ताह का रोलआउट (यदि स्वीकृत हो)

1. **सप्ताह 1** — इस PR को मर्ज करना + 3-रेप्लिका compose स्टैक के साथ ऑप्ट-इन प्रोफाइल का सत्यापन।
2. **सप्ताह 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) पर साइडकार प्रॉक्सी रूट का उपयोग करके OpenAI/Claude/Gemini/Ollama (14+ में से 4 प्रदाता) के लिए Bifrost का पूर्ण सक्रियण (`BIFROST_ENABLED` द्वारा नियंत्रित, रनटाइम पर किल-स्विच योग्य)।
3. **सप्ताह 3** — एकल परीक्षण डिप्लॉयमेंट में Qdrant मेमोरी प्रोफाइल सक्षम करना; sqlite-vec की तुलना में लेटेंसी अंतर मापना।
4. **सप्ताह 4** — ऑब्ज़र्वेबिलिटी हेल्थचेक (`docker compose ps` एग्ज़िट कोड + `wget` स्मोक टेस्ट); ADR-041 के अनुसार 71-पिलर रिफ्रेश।

## इस PR में बदली गई फ़ाइलें

| फ़ाइल                                               | बदलाव                                                                                                                                                                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 पंक्तियाँ: `memory` प्रोफाइल (Qdrant), `bifrost` प्रोफाइल (Bifrost), परसिस्टेंट वॉल्यूम, हेल्थचेक।                                                                                                                                  |
| `.env.example`                                      | +24 पंक्तियाँ: `QDRANT_*` (6 वेरिएबल), `BIFROST_*` (4 वेरिएबल)।                                                                                                                                                                         |
| `docs/reference/ENVIRONMENT.md`                     | `QDRANT_*` एनवायरनमेंट वेरिएबल के लिए अनुभाग 25 में +6 पंक्तियाँ।                                                                                                                                                                       |
| `src/lib/memory/qdrant.ts`                          | +33 पंक्तियाँ: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` के लिए एनवायरनमेंट-वेरिएबल फ़ॉलबैक शृंखला (सेटिंग्स → एनवायरनमेंट → डिफ़ॉल्ट)। |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 पंक्तियाँ: एनवायरनमेंट-वेरिएबल फ़ॉलबैक प्राथमिकता को सुनिश्चित करने वाले 9 नए टेस्ट केस।                                                                                                                                            |
| `docs/architecture/cluster-decisions.md` (यह फ़ाइल) | नया — ऑप्ट-इन प्रोफाइल के लिए निर्णय रिकॉर्ड।                                                                                                                                                                                           |
| `AGENTS.md`                                         | +1 पंक्ति: संदर्भ दस्तावेज़ीकरण तालिका में इस दस्तावेज़ का पॉइंटर।                                                                                                                                                                      |

**कुल प्रभावित कोड:** 4 प्रोडक्शन फ़ाइलें (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 टेस्ट फ़ाइल (`qdrant-wiring.test.ts`), 2 दस्तावेज़ फ़ाइलें (`cluster-decisions.md`, `AGENTS.md`)।
