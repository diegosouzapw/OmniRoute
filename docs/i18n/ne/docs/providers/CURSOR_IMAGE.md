# Cursor Image Generation (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute ले च्याटकै समान provider id `cursor` (उपनाम `cu`) मार्फत `POST /v1/images/generations` मा Cursor योजनाको **छवि निर्माण** उपलब्ध गराउँछ।

| फिल्ड                | मान                                                                            |
| -------------------- | ------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` id | `cursor`                                                                       |
| ढाँचा                | `cursor-agent-image`                                                           |
| प्रमाणीकरण           | च्याटकै समान OAuth / API-key जडान (`provider_connections.provider = "cursor"`) |
| मोडेलहरू             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                      |

## Agent CLI किन

OmniRoute मा Cursor च्याटले `agent.v1.AgentService/Run` (protobuf) प्रयोग गर्छ। उक्त मार्गले अन्तर्निर्मित क्लाइन्ट उपकरणहरू (shell, write, …) **अस्वीकार गर्छ**। छवि निर्माण भनेको seat विरुद्ध **`agent` CLI** द्वारा कार्यान्वयन गरिने Cursor-मूल उपकरण हो। त्यसैले छवि ह्यान्डलरले सुरक्षित रूपमा निश्चित गरिएको prompt र प्रत्येक अनुरोधका लागि छुट्टै अस्थायी workspace सहित `agent` सुरु गर्छ (community seat bridges कै संरचनामा), त्यसपछि OpenAI-सङ्गत `b64_json` फर्काउँछ।

## पहुँच प्रतिबन्ध (कडा नियमहरू #15 + #17)

यो child process (`agent` binary) सुरु गर्ने एकमात्र `IMAGE_PROVIDERS` ढाँचा हो। `POST /v1/images/generations` लाई टाढाका कलरहरूले वैध रूपमा प्रयोग गर्ने अन्य करिब 40 वटा process सुरु नगर्ने छवि प्रदायकहरूले पनि साझा गर्ने भएकाले, सम्पूर्ण route लाई **`LOCAL_ONLY`** का रूपमा वर्गीकृत गरिएको छैन—यसको सट्टा `handleCursorAgentImageGeneration` ले authz pipeline ले प्रत्येक अनुरोधमा राख्ने विश्वसनीय `AUTHZ_HEADER_PEER_LOCALITY` निर्णय प्रयोग गरी आफ्नै gate लागू गर्छ (वास्तविक TCP peer बाट, सजिलै नक्कल गर्न सकिने `Host` header बाट कहिल्यै होइन): केवल `loopback` र `lan` कलरहरू spawn सम्म पुग्न सक्छन्; अन्य सबैले (सार्वजनिक tunnel मार्फत पुनः प्रयोग गरिएको चुहिएको API key सहित) कुनै पनि credential खोजी वा process spawn हुनुअघि `403` पाउँछन्। बाँकी `LOCAL_ONLY` तहमा लागू गरिएको समान नीतिका लागि `src/server/authz/policies/management.ts` हेर्नुहोस्।

## Concurrency gate मोड्युल-स्तरीय छ (एकल-instance सीमा)

`CURSOR_IMG_MAX_CONCURRENT` लाई Node module instance (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) को दायरामा रहेको in-memory counter/queue द्वारा लागू गरिन्छ। यसले एउटा OmniRoute process भित्रका समकालीन `agent` spawn हरूलाई सही रूपमा सीमित गर्छ, तर समान Cursor seat साझा गर्ने धेरै process/instance हरूबीच समन्वय **गर्दैन** (जस्तै, multi-replica deployment)—प्रत्येक instance ले आफ्नै स्वतन्त्र सीमा लागू गर्छ। एकल-instance deployment (पूर्वनिर्धारित) का लागि यो सटीक हुन्छ; तेर्सो रूपमा scale गरिएका deployment हरूले प्रत्येक instance मा `CURSOR_IMG_MAX_CONCURRENT` लाई न्यून राख्नुपर्छ वा Cursor छवि traffic लाई एउटै instance तर्फ route गर्नुपर्छ।

## आवश्यकताहरू

1. dashboard मा जडान गरिएको Cursor खाता (OAuth वा `crsr_…` API key)।
2. OmniRoute process का लागि उपलब्ध Cursor Agent binary:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, वा
   - `~/.local/bin/agent`, वा
   - Cursor जडानमा `providerSpecificData.agentBin`।

वैकल्पिक समायोजन:

| Env                         | पूर्वनिर्धारित            | अर्थ                             |
| --------------------------- | ------------------------- | -------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                  | प्रति-छवि wall clock             |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                       | साझा-seat concurrency gate       |
| `CURSOR_IMG_MODEL`          | (अनुरोधको model / `auto`) | CLI `--model` लाई override गर्ने |

## उदाहरण

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

निर्माणमा सामान्यतया 1–2 मिनेट लाग्छ। आन्तरिक network path लाई प्राथमिकता दिनुहोस्; करिब 100s timeout भएका edge proxy हरू असफल हुनेछन्।

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, र `model: openai/cursor/auto` (वा तपाईंको LiteLLM version अनुसार उपसर्गरहित `cursor/auto`) सहित image model दर्ता गर्नुहोस्।
