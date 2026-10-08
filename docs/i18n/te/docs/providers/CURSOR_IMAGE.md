# Cursor Image Generation (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, చాట్కు ఉపయోగించే అదే provider id అయిన `cursor` (alias `cu`) ద్వారా `POST /v1/images/generations` వద్ద Cursor ప్లాన్ **చిత్ర సృష్టి**ని అందుబాటులో ఉంచుతుంది.

| ఫీల్డ్               | విలువ                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                   |
| ఫార్మాట్             | `cursor-agent-image`                                                                       |
| ప్రామాణీకరణ          | చాట్కు ఉపయోగించే అదే OAuth / API-key కనెక్షన్ (`provider_connections.provider = "cursor"`) |
| మోడళ్లు              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                  |

## Agent CLI ఎందుకు

OmniRouteలో Cursor చాట్ `agent.v1.AgentService/Run` (protobuf)ను ఉపయోగిస్తుంది. ఆ మార్గం అంతర్నిర్మిత క్లయింట్ సాధనాలను (shell, write, …) **తిరస్కరిస్తుంది**. చిత్ర సృష్టి అనేది seatకు వ్యతిరేకంగా **`agent` CLI** ద్వారా అమలు చేయబడే Cursor-స్థానిక సాధనం. అందువల్ల చిత్ర హ్యాండ్లర్, లాక్ చేసిన ప్రాంప్ట్ మరియు ప్రతి అభ్యర్థనకు ప్రత్యేకమైన తాత్కాలిక workspaceతో `agent`ను ప్రారంభిస్తుంది (community seat bridges మాదిరిగానే), ఆపై OpenAIకు అనుకూలమైన `b64_json`ను అందిస్తుంది.

## యాక్సెస్ పరిమితి (కఠిన నియమాలు #15 + #17)

child processను (`agent`
binary) ప్రారంభించే ఏకైక `IMAGE_PROVIDERS` ఫార్మాట్ ఇదే. `POST /v1/images/generations`ను రిమోట్ కాలర్లు సముచితంగా ఉపయోగించే, processలను ప్రారంభించని మరో ~40
చిత్ర ప్రొవైడర్లు పంచుకుంటున్నందున, మొత్తం routeను **`LOCAL_ONLY`**గా
వర్గీకరించలేదు — బదులుగా `handleCursorAgentImageGeneration`, authz pipeline ప్రతి
అభ్యర్థనపై ముద్రించే విశ్వసనీయ `AUTHZ_HEADER_PEER_LOCALITY` తీర్పును ఉపయోగించి తన
స్వంత gateను అమలు చేస్తుంది (నిజమైన TCP peer నుండి; సులభంగా మోసపూరితంగా మార్చగల
`Host` header నుండి ఎప్పుడూ కాదు): `loopback` మరియు `lan` కాలర్లు మాత్రమే spawnను
చేరుకోగలరు; మిగతా వారందరికీ (public tunnel ద్వారా మళ్లీ ఉపయోగించిన లీకైన API keyతో సహా)
ఏదైనా credential lookup లేదా process spawn జరగడానికి ముందే `403` లభిస్తుంది. మిగిలిన
`LOCAL_ONLY` tierకు వర్తించే ఇదే policy కోసం
`src/server/authz/policies/management.ts`ను చూడండి.

## Concurrency gate module స్థాయిలో ఉంటుంది (single-instance పరిమితి)

`CURSOR_IMG_MAX_CONCURRENT`, Node module instanceకు పరిమితమైన in-memory counter/queue ద్వారా
అమలు చేయబడుతుంది (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
ఇది ఒక OmniRoute processలో ఏకకాలంలో జరిగే `agent` spawnలను సరిగ్గా పరిమితం చేస్తుంది,
కానీ ఒకే Cursor seatను పంచుకునే అనేక processలు/instanceల మధ్య
(ఉదా. multi-replica deployment) సమన్వయం చేయదు — ప్రతి instance తన స్వంత స్వతంత్ర పరిమితిని అమలు చేస్తుంది.
single-instance deploymentకు (డిఫాల్ట్) ఇది ఖచ్చితంగా పనిచేస్తుంది; horizontally scaled
deploymentలు ప్రతి instanceకు `CURSOR_IMG_MAX_CONCURRENT`ను పరిమితంగా ఉంచాలి లేదా
Cursor చిత్ర ట్రాఫిక్ను ఒకే instanceకు మళ్లించాలి.

## అవసరాలు

1. dashboardలో కనెక్ట్ చేసిన Cursor ఖాతా (OAuth లేదా `crsr_…` API key).
2. OmniRoute processకు అందుబాటులో ఉన్న Cursor Agent binary:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, లేదా
   - `~/.local/bin/agent`, లేదా
   - Cursor connectionలో `providerSpecificData.agentBin`.

ఐచ్ఛిక సర్దుబాట్లు:

| Env                         | డిఫాల్ట్                      | అర్థం                            |
| --------------------------- | ----------------------------- | -------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                      | ప్రతి చిత్రానికి wall clock సమయం |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                           | Shared-seat concurrency gate     |
| `CURSOR_IMG_MODEL`          | (అభ్యర్థనలోని model / `auto`) | CLI `--model`ను override చేయండి  |

## ఉదాహరణ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

చిత్ర సృష్టికి సాధారణంగా 1–2 నిమిషాలు పడుతుంది. అంతర్గత network pathను ఉపయోగించడం ఉత్తమం; ~100s timeoutలు ఉన్న edge proxyలు విఫలమవుతాయి.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, మరియు `model: openai/cursor/auto`తో (లేదా మీ LiteLLM versionను బట్టి కేవలం `cursor/auto`) ఒక image modelను నమోదు చేయండి.
