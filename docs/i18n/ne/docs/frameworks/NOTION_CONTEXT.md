# Notion Context Source (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **प्रामाणिक स्रोत:** `src/lib/notion/api.ts` (REST क्लाइन्ट), `src/lib/db/notion.ts`
> (टोकन भण्डारण), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP उपकरण),
> `src/app/api/settings/notion/route.ts` (सेटिङ्स API)। उपकरण दर्ता र स्कोप
> जडान `open-sse/mcp-server/server.ts` मा रहन्छ।

## यो के हो

OmniRoute ले **Notion** कार्यस्थानलाई **सन्दर्भ स्रोत** का रूपमा जडान गर्न सक्छ — यो एजेन्टहरूले अन्तर्निर्मित MCP सर्भरमार्फत पहुँच गर्ने पढ्न/लेख्न मिल्ने ज्ञान भण्डार हो। Notion
एकीकरण टोकन कन्फिगर गरिसकेपछि, MCP उपकरणहरूले LLM लाई पृष्ठ र डेटाबेसहरू खोज्न,
पृष्ठको सामग्री र ब्लक ट्रीहरू पढ्न, फिल्टर/क्रमबद्धतासहित डेटाबेसहरू क्वेरी गर्न, र नयाँ
ब्लकहरू थप्न दिन्छन् — यी सबै OmniRoute मार्फत प्रोक्सी गरिन्छ (पुनः प्रयास, टाइमआउट, र त्रुटि वर्गीकरणसहित),
त्यसैले मोडेलले Notion API लाई कहिल्यै प्रत्यक्ष रूपमा प्रयोग गर्दैन।

यो एकीकरण आधिकारिक Notion REST API माथिको पातलो र सुदृढ र्यापर हो
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`)। क्लाइन्ट
(`src/lib/notion/api.ts`) ले निम्न सुविधाहरू थप्छ:

- `429` र `5xx` का लागि **घाताङ्कीय ब्याकअफसहित पुनः प्रयास** (बढीमा 3 प्रयास)।
- `AbortController` मार्फत **55-सेकेन्डको अनुरोध टाइमआउट**।
- **टाइप गरिएको त्रुटि वर्गीकरण** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, `retry after`
  सङ्केतहरू पालना गर्छ), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`।
- बाहिर देखाउनुअघि स्ट्याक-ट्रेसजस्ता अंशहरू हटाउने **सन्देश सफाइ**।

## सेटअप

Notion टोकनका लागि **कुनै environment variable छैन** — यसलाई
`src/lib/db/notion.ts` मार्फत SQLite `key_value` तालिकामा (namespace `notion`, key `integration_token`)
भण्डारण गरिन्छ। यसलाई Endpoint ड्यासबोर्डको **Context Sources** ट्याबबाट
(`ObsidianSourceCard` को सहोदर `NotionSourceCard`), वा सेटिङ्स REST API मार्फत कन्फिगर गर्नुहोस्।

> [!NOTE]
> यो टोकन **Notion आन्तरिक एकीकरण टोकन** हो। यहाँ एकीकरण सिर्जना गर्नुहोस्:
> <https://www.notion.com/my-integrations>, त्यसपछि OmniRoute ले पहुँच गर्नुपर्ने
> पृष्ठ/डेटाबेसहरू उक्त एकीकरणसँग साझेदारी गर्नुहोस् (Notion को अनुमति मोडेल साझेदारीमा आधारित छ,
> सम्पूर्ण कार्यस्थानमा होइन)।

### REST मार्फत कन्फिगर गर्ने

```bash
# एकीकरण टोकन सुरक्षित गर्नुहोस् र प्रमाणीकरण गर्नुहोस् (POST ले परीक्षण खोज जारी गरेर प्रमाणीकरण गर्छ)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# जडान स्थिति जाँच गर्नुहोस्
curl http://localhost:20128/api/settings/notion

# जडान विच्छेद गर्नुहोस् (भण्डारण गरिएको टोकन हटाउँछ)
curl -X DELETE http://localhost:20128/api/settings/notion
```

यी तीनै विधिका लागि ड्यासबोर्ड प्रमाणीकरण (`isAuthenticated`) आवश्यक हुन्छ। `POST` मा,
OmniRoute ले टोकन सुरक्षित गर्छ र तुरुन्तै 1-नतिजाको परीक्षण खोज चलाउँछ; यदि Notion ले
त्रुटि वस्तु फर्कायो भने टोकन हटाइन्छ र कल `400` सहित असफल हुन्छ।

## MCP उपकरणहरू (6)

`open-sse/mcp-server/tools/notionTools.ts` मा परिभाषित छन्। कल गर्ने समयमा
`getNotionToken()` मार्फत टोकन समाधान गरिन्छ; कुनै पनि टोकन कन्फिगर नगरिएको भए उपकरणले
`"Notion एकीकरण टोकन कन्फिगर गरिएको छैन। यसलाई Settings > Context Sources मा सेट गर्नुहोस्।"` त्रुटि फ्याँक्छ।

| उपकरण                        | स्कोप          | विवरण                                                                                 |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | पाठ क्वेरीद्वारा पृष्ठ र डेटाबेसहरू खोज्छ (शीर्षक, ID र URL फर्काउँछ)। पृष्ठाङ्कित।   |
| `notion_get_page`            | `read:notion`  | पृष्ठको ID द्वारा त्यसको सामग्री र मेटाडेटा प्राप्त गर्छ।                             |
| `notion_list_block_children` | `read:notion`  | ब्लक वा पृष्ठका सबै चाइल्ड ब्लकहरू (ब्लक ट्री) सूचीबद्ध गर्छ। पृष्ठाङ्कित।            |
| `notion_query_database`      | `read:notion`  | वैकल्पिक `filter` + `sorts` (Notion API ढाँचा) सहित डेटाबेस क्वेरी गर्छ। पृष्ठाङ्कित। |
| `notion_get_database`        | `read:notion`  | ID द्वारा डेटाबेसको स्किमा/मेटाडेटा प्राप्त गर्छ।                                     |
| `notion_append_blocks`       | `write:notion` | विद्यमान ब्लक वा पृष्ठमा चाइल्ड ब्लकहरू थप्छ (प्रति अनुरोध बढीमा 100 ब्लक)।           |

### इनपुट प्यारामिटरहरू

- `notion_search` — `query` (1–500 वर्ण), `pageSize` (1–100, पूर्वनिर्धारित 20),
  `startCursor` (वैकल्पिक)।
- `notion_get_page` — `pageId` (32-वर्णको हेक्स वा UUID)।
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, पूर्वनिर्धारित 50),
  `startCursor` (वैकल्पिक)।
- `notion_query_database` — `databaseId`, `filter` (वैकल्पिक, Notion फिल्टर ढाँचा),
  `sorts` (वैकल्पिक एरे), `pageSize` (1–100, पूर्वनिर्धारित 50), `startCursor` (वैकल्पिक)।
- `notion_get_database` — `databaseId`।
- `notion_append_blocks` — `blockId`, `children` (ब्लक वस्तुहरूको एरे),
  `after` (वैकल्पिक स्थान)।

### स्कोपहरू

पढ्ने उपकरणहरूलाई `read:notion` र लेख्ने उपकरणलाई `write:notion` आवश्यक हुन्छ।
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` हुँदा मात्र
`open-sse/mcp-server/server.ts` को `withScopeEnforcement()` द्वारा स्कोपहरू लागू गरिन्छ;
कलरका अनुमति प्राप्त स्कोपहरू `OMNIROUTE_MCP_SCOPES` (अल्पविरामले छुट्याइएको) वा
प्रमाणित API key को स्कोप सन्दर्भबाट आउँछन्। पूर्ण स्कोप मोडेलका लागि
[MCP-SERVER.md](./MCP-SERVER.md) हेर्नुहोस्।

## एन्डपोइन्टहरू

| विधि     | पथ                     | उद्देश्य                                        |
| -------- | ---------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/notion` | `{ connected, hasToken }` फर्काउँछ।             |
| `POST`   | `/api/settings/notion` | एकीकरण टोकन सुरक्षित गरी प्रमाणीकरण गर्छ।       |
| `DELETE` | `/api/settings/notion` | जडान विच्छेद गर्छ (भण्डारण गरिएको टोकन हटाउँछ)। |

> यी ड्यासबोर्ड सेटिङ मार्गहरू हुन्। यहाँ **कुनै सार्वजनिक `/v1` Notion प्रोक्सी
> एन्डपोइन्ट छैन** — Notion माथिका MCP उपकरणहरूमार्फत मात्र पहुँच गरिन्छ।

## प्रयोगका अवस्थाहरू

- **ज्ञानमा आधारित जवाफहरू** — जवाफ दिनुअघि एजेन्टलाई कार्यस्थानमा `notion_search` गर्न र
  शीर्ष परिणाममा `notion_get_page` प्रयोग गर्न दिनुहोस्, जसले गर्दा जवाफहरूले वास्तविक आन्तरिक कागजातहरू उद्धृत गर्छन्।
- **डेटाबेसमा आधारित कार्यप्रवाहहरू** — फिल्टरहरू + क्रमबद्धतासहित कार्य/CRM डेटाबेसमा
  `notion_query_database` प्रयोग गर्नुहोस्, त्यसपछि पङ्क्तिहरूको सारांश बनाउनुहोस् वा प्राथमिकता निर्धारण गर्नुहोस्।
- **पुनर्लेखन / लगिङ** — बैठकका टिपोटहरू, रन सारांशहरू वा एजेन्टको आउटपुटलाई
  विद्यमान पृष्ठमा थप्न `notion_append_blocks` प्रयोग गर्नुहोस् (थप्ने मात्र; कुनै विनाशकारी सम्पादन हुँदैन)।
- **संरचना अन्वेषण** — पृष्ठको ब्लक ट्रीमा क्रमशः जान `notion_list_block_children` प्रयोग गर्नुहोस्,
  वा क्वेरी गर्नुअघि डेटाबेसको प्रोपर्टी स्किमा पत्ता लगाउन `notion_get_database` प्रयोग गर्नुहोस्।

## सम्बन्धित

- [MCP सर्भर](./MCP-SERVER.md) — ट्रान्सपोर्टहरू, स्कोप कार्यान्वयन र उपकरणहरूको पूर्ण सूची।
- [Obsidian सन्दर्भ स्रोत](./OBSIDIAN_CONTEXT.md) — अर्को अन्तर्निर्मित सन्दर्भ स्रोत।
- [मेमोरी प्रणाली](./MEMORY.md) — दीर्घकालीन संवादात्मक मेमोरी (पूरक
  सन्दर्भ तह, उपकरणबाट प्राप्त गर्नुको सट्टा स्वचालित रूपमा समावेश गरिन्छ)।
