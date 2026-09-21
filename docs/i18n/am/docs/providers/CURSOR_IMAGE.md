# Cursor Image Generation (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute በ `POST /v1/images/generations` ላይ የCursor ዕቅድ **ምስል ማመንጨትን** ከውይይት ጋር በተመሳሳይ የአቅራቢ መለያ፣ `cursor` (ተለዋጭ ስም `cu`) በኩል ያቀርባል።

| መስክ                   | እሴት                                                                                |
| --------------------- | ---------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` መለያ | `cursor`                                                                           |
| ቅርጸት                  | `cursor-agent-image`                                                               |
| ማረጋገጫ                 | ከውይይት ጋር ተመሳሳይ የOAuth / API-key ግንኙነት (`provider_connections.provider = "cursor"`) |
| ሞዴሎች                  | `cursor/auto`፣ `cursor/composer-2`፣ `cursor/composer-2.5`                          |

## Agent CLI ለምን ያስፈልጋል

በOmniRoute ውስጥ የCursor ውይይት `agent.v1.AgentService/Run`ን (protobuf) ይጠቀማል። ያ መንገድ አብሮገነብ የደንበኛ መሳሪያዎችን (shell፣ write፣ …) **አይቀበልም**። ምስል ማመንጨት በመቀመጫው ላይ ባለው **`agent` CLI** የሚከናወን የCursor ቤተኛ መሳሪያ ነው። ስለዚህ የምስል ተቆጣጣሪው `agent`ን በተቆለፈ ጥያቄ እና ለእያንዳንዱ ጥያቄ በሚዘጋጅ ጊዜያዊ የሥራ ቦታ (ከማህበረሰብ መቀመጫ ድልድዮች ጋር ተመሳሳይ ቅርጽ) እንደ ንዑስ ሂደት ያስነሳዋል፤ ከዚያም ከOpenAI ጋር ተኳኋኝ የሆነ `b64_json` ይመልሳል።

## የመዳረሻ ገደብ (ጥብቅ ደንቦች #15 + #17)

ይህ ንዑስ ሂደት (`agent`
binary) የሚያስነሳ ብቸኛው የ`IMAGE_PROVIDERS` ቅርጸት ነው። `POST /v1/images/generations` የርቀት ጠሪዎች በሕጋዊነት በሚጠቀሙባቸው ወደ 40 በሚጠጉ ሌሎች ንዑስ ሂደት የማያስነሱ
የምስል አቅራቢዎች የሚጋራ በመሆኑ፣ አጠቃላይ መስመሩ **not**
`LOCAL_ONLY` ተብሎ አልተመደበም — በምትኩ `handleCursorAgentImageGeneration` የauthz ሂደት በእያንዳንዱ ጥያቄ ላይ የሚያስቀምጠውን የታመነ `AUTHZ_HEADER_PEER_LOCALITY` ውሳኔ
(ከእውነተኛው TCP አቻ የሚመጣ፣ በማጭበርበር ሊቀየር ከሚችለው `Host` ራስጌ ፈጽሞ ያልሆነ) በመጠቀም የራሱን
በር ያስፈጽማል፤ የንዑስ ሂደቱን ማስነሳት መድረስ የሚችሉት `loopback` እና `lan` ጠሪዎች ብቻ ናቸው፤ ሌሎች ሁሉ (በወል ቱነል በኩል እንደገና ጥቅም ላይ የዋለ የወጣ API keyን ጨምሮ) ማንኛውም የማረጋገጫ መረጃ ፍለጋ ወይም የሂደት ማስነሳት ከመከናወኑ በፊት `403` ያገኛሉ። በተቀረው የ`LOCAL_ONLY` ደረጃ ላይ ስለሚተገበረው ተመሳሳይ
መመሪያ `src/server/authz/policies/management.ts`ን ይመልከቱ።

## የተመሳሳይ ጊዜ አፈጻጸም በር በሞጁል ደረጃ ነው (የነጠላ ኢንስታንስ ገደብ)

`CURSOR_IMG_MAX_CONCURRENT` በNode ሞጁል ኢንስታንስ
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) ወሰን ውስጥ ባለ የማህደረ ትውስታ ቆጣሪ/ወረፋ አማካኝነት ይተገበራል።
በአንድ የOmniRoute ሂደት ውስጥ በተመሳሳይ ጊዜ የሚነሱ የ`agent` ንዑስ ሂደቶችን በትክክል ይገድባል፣ ነገር ግን
ተመሳሳዩን የCursor መቀመጫ በሚጋሩ በርካታ ሂደቶች/ኢንስታንሶች
(ለምሳሌ፣ ባለብዙ-ቅጂ ስርጭት) መካከል **አያስተባብርም** — እያንዳንዱ ኢንስታንስ የራሱን ገለልተኛ ገደብ ያስፈጽማል።
ለነጠላ-ኢንስታንስ ስርጭት (ነባሪው) ይህ ትክክለኛ ነው፤ በአግድም የተስፋፉ
ስርጭቶች `CURSOR_IMG_MAX_CONCURRENT`ን በእያንዳንዱ ኢንስታንስ ወግ አጥባቂ አድርገው ሊያቆዩት ወይም
የCursor ምስል ትራፊክን ወደ አንድ ኢንስታንስ ሊያስተላልፉ ይገባል።

## መስፈርቶች

1. በዳሽቦርዱ ውስጥ የተገናኘ የCursor መለያ (OAuth ወይም `crsr_…` API key)።
2. ለOmniRoute ሂደት የCursor Agent binary ተደራሽ መሆን አለበት፦
   - env `CURSOR_AGENT_BIN=/path/to/agent`፣ ወይም
   - `~/.local/bin/agent`፣ ወይም
   - በCursor ግንኙነት ላይ `providerSpecificData.agentBin`።

አማራጭ ማስተካከያ፦

| Env                         | ነባሪ                 | ትርጉም                        |
| --------------------------- | ------------------- | --------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`            | ለእያንዳንዱ ምስል የግድግዳ ሰዓት       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                 | የጋራ መቀመጫ የተመሳሳይ ጊዜ አፈጻጸም በር |
| `CURSOR_IMG_MODEL`          | (የጥያቄ ሞዴል / `auto`) | የCLI `--model`ን መሻር         |

## ምሳሌ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ማመንጨት በተለምዶ 1–2 ደቂቃ ይወስዳል። የውስጥ አውታረ መረብ መንገድን ይምረጡ፤ የ~100s ጊዜ ማብቂያ ያላቸው የጠርዝ ፕሮክሲዎች ይሳካላቸዋል።

## LiteLLM

የምስል ሞዴልን በ`mode: image_generation`፣ `api_base: http://omniroute:20128/v1` እና `model: openai/cursor/auto` (ወይም እንደ LiteLLM ስሪትዎ አጠቃቀም ባዶ `cursor/auto`) ይመዝግቡ።
