# Cursor Image Generation (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, चैट के समान ही प्रोवाइडर id `cursor` (उपनाम `cu`) के माध्यम से `POST /v1/images/generations` पर Cursor प्लान की **इमेज जनरेशन** सुविधा उपलब्ध कराता है।

| फ़ील्ड               | मान                                                                              |
| -------------------- | -------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                         |
| फ़ॉर्मैट             | `cursor-agent-image`                                                             |
| प्रमाणीकरण           | चैट के समान OAuth / API-key कनेक्शन (`provider_connections.provider = "cursor"`) |
| मॉडल                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                        |

## Agent CLI क्यों

OmniRoute में Cursor चैट `agent.v1.AgentService/Run` (protobuf) का उपयोग करती है। वह पथ अंतर्निहित क्लाइंट टूल (shell, write, …) को **अस्वीकार** करता है। इमेज जनरेशन Cursor का मूल टूल है, जिसे सीट के विरुद्ध **`agent` CLI** द्वारा निष्पादित किया जाता है। इसलिए इमेज हैंडलर एक लॉक किए गए प्रॉम्प्ट और प्रति-अनुरोध अस्थायी वर्कस्पेस (कम्युनिटी सीट ब्रिज के समान संरचना) के साथ `agent` को स्पॉन करता है, फिर OpenAI-संगत `b64_json` लौटाता है।

## एक्सेस प्रतिबंध (कठोर नियम #15 + #17)

यह एकमात्र `IMAGE_PROVIDERS` फ़ॉर्मैट है जो चाइल्ड प्रोसेस (`agent`
बाइनरी) को स्पॉन करता है। चूँकि `POST /v1/images/generations` को लगभग 40 अन्य,
स्पॉन न करने वाले इमेज प्रोवाइडर साझा करते हैं, जिनका रिमोट कॉलर वैध रूप से उपयोग
करते हैं, इसलिए पूरे रूट को **नहीं** `LOCAL_ONLY` के रूप में वर्गीकृत किया गया है —
इसके बजाय `handleCursorAgentImageGeneration` विश्वसनीय `AUTHZ_HEADER_PEER_LOCALITY`
निर्णय का उपयोग करके अपना स्वयं का गेट लागू करता है, जिसे authz पाइपलाइन प्रत्येक
अनुरोध पर अंकित करती है (वास्तविक TCP पीयर से, कभी भी स्पूफ़ किए जा सकने वाले
`Host` हेडर से नहीं): केवल `loopback` और `lan` कॉलर ही स्पॉन तक पहुँच सकते हैं;
अन्य सभी कॉलर (इसमें सार्वजनिक टनल पर दोबारा उपयोग की गई लीक API key भी शामिल है)
को किसी भी क्रेडेंशियल लुकअप या प्रोसेस स्पॉन से पहले `403` मिलता है। शेष
`LOCAL_ONLY` स्तर पर लागू समान नीति के लिए `src/server/authz/policies/management.ts`
देखें।

## समवर्तीता गेट मॉड्यूल-स्तरीय है (एकल-इंस्टेंस सीमा)

`CURSOR_IMG_MAX_CONCURRENT` को Node मॉड्यूल इंस्टेंस
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) के दायरे वाले
इन-मेमोरी काउंटर/क्यू द्वारा लागू किया जाता है। यह एक OmniRoute प्रोसेस के भीतर
समवर्ती `agent` स्पॉन को सही ढंग से सीमित करता है, लेकिन समान Cursor सीट साझा करने
वाले कई प्रोसेस/इंस्टेंस (जैसे, मल्टी-रेप्लिका डिप्लॉयमेंट) के बीच समन्वय **नहीं**
करता — प्रत्येक इंस्टेंस अपनी स्वतंत्र सीमा लागू करता है। एकल-इंस्टेंस डिप्लॉयमेंट
(डिफ़ॉल्ट) के लिए यह सटीक है; क्षैतिज रूप से स्केल किए गए डिप्लॉयमेंट को प्रत्येक
इंस्टेंस पर `CURSOR_IMG_MAX_CONCURRENT` को कम रखना चाहिए या Cursor इमेज ट्रैफ़िक को
किसी एक इंस्टेंस पर रूट करना चाहिए।

## आवश्यकताएँ

1. डैशबोर्ड में कनेक्ट किया गया Cursor अकाउंट (OAuth या `crsr_…` API key)।
2. OmniRoute प्रोसेस के लिए Cursor Agent बाइनरी उपलब्ध हो:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, या
   - `~/.local/bin/agent`, या
   - Cursor कनेक्शन पर `providerSpecificData.agentBin`।

वैकल्पिक ट्यूनिंग:

| Env                         | डिफ़ॉल्ट               | अर्थ                          |
| --------------------------- | ---------------------- | ----------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`               | प्रति-इमेज वॉल-क्लॉक समय      |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                    | साझा-सीट समवर्तीता गेट        |
| `CURSOR_IMG_MODEL`          | (अनुरोध मॉडल / `auto`) | CLI `--model` को ओवरराइड करें |

## उदाहरण

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

जनरेशन में आमतौर पर 1–2 मिनट लगते हैं। आंतरिक नेटवर्क पथ को प्राथमिकता दें; लगभग 100s टाइमआउट वाले एज प्रॉक्सी विफल हो जाएँगे।

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, और `model: openai/cursor/auto` (या आपके LiteLLM वर्ज़न के आधार पर केवल `cursor/auto`) के साथ एक इमेज मॉडल रजिस्टर करें।
