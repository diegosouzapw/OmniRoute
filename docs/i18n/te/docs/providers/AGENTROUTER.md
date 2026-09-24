# AgentRouter Setup Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) అనేది Anthropic-అనుకూల రిలే. ఇది Claude మరియు ఇతర మోడల్లను తరచుగా ప్రత్యక్ష Anthropic API కంటే తక్కువ ధరలకు తిరిగి విక్రయిస్తుంది. అధికారిక Claude Code క్లయింట్కు డ్రాప్-ఇన్ `ANTHROPIC_BASE_URL` ప్రత్యామ్నాయంగా ఇది రూపొందించబడింది. అందువల్ల Claude Code వైర్ ఇమేజ్కు సరిపోలే ట్రాఫిక్ను మాత్రమే ఇది అంగీకరిస్తుంది (నిర్దిష్ట User-Agent, `anthropic-beta` ఫ్లాగ్లు, Stainless SDK హెడర్లు మొదలైనవి).

## త్వరిత ప్రారంభం — స్థానిక `agentrouter` ప్రొవైడర్ను ఉపయోగించండి (సిఫార్సు చేయబడింది)

చాలా మంది వినియోగదారులకు **ప్రత్యేక సెటప్ అవసరం లేదు**. పూర్తి Claude Code వైర్ ఇమేజ్ ముందుగానే అంతర్నిర్మితంగా ఉన్న `agentrouter` ప్రొవైడర్ను OmniRoute అందిస్తుంది (`open-sse/config/providerRegistry.ts` → `agentrouter` చూడండి). దాన్ని ఉపయోగించడానికి:

1. **Dashboard → Providers → Add Provider** తెరవండి.
2. జాబితా నుండి **AgentRouter** ఎంచుకోండి.
3. మీ `sk-...` API కీని అతికించి, సేవ్ చేయండి.

అంతే — పర్యావరణ వేరియబుల్లు లేదా అనుకూల ప్రొవైడర్ రకం అవసరం లేదు. అంతర్నిర్మిత మోడల్లలో `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, మరియు `deepseek-v3.2` ఉన్నాయి.

ఈ మార్గదర్శకంలోని మిగిలిన భాగం **అధునాతన మార్గాన్ని** వివరిస్తుంది: `anthropic-compatible-cc-*` ప్రొవైడర్ రకాన్ని ఉపయోగించడం. వైర్ ఇమేజ్పై మీకు మరింత నియంత్రణ అవసరమైనప్పుడు దీన్ని ఉపయోగించండి — ఉదాహరణకు, స్థానిక ప్రొవైడర్ రిజిస్ట్రీలో ఇంకా లేని ఇతర AgentRouter-శైలి రిలేలకు కనెక్ట్ చేస్తున్నప్పుడు లేదా బేస్ URL, చాట్ పాత్ లేదా హెడర్ సమితిని ఓవర్రైడ్ చేస్తున్నప్పుడు.

---

## అధునాతనం: Claude Code అనుకూల ప్రొవైడర్ రకం ద్వారా కనెక్ట్ చేయడం

సరైన వైర్ ఇమేజ్తో Anthropic Messages APIని ఉపయోగించే **Claude Code అనుకూల** ప్రొవైడర్ రకం (`anthropic-compatible-cc-*`) ద్వారా OmniRoute, AgentRouterకు (మరియు ఇలాంటి రిలేలకు) కూడా మద్దతు ఇస్తుంది. `https://agentrouter.org`ను సూచించే సాధారణ `openai-compatible-chat` ప్రొవైడర్ **పని చేయదు** — Claude Codeలా కనిపించని అభ్యర్థనలను అప్స్ట్రీమ్ WAF తిరస్కరిస్తుంది.

---

## ముందస్తు అవసరాలు

- AgentRouter ఖాతా మరియు API కీ. కొత్తగా సైన్ అప్ చేసుకునే వారికి ప్రాజెక్ట్ [README](../README.md)లోని అనుబంధ లింక్ ద్వారా ఉచిత క్రెడిట్లు లభిస్తాయి.
- `ENABLE_CC_COMPATIBLE_PROVIDER` ఫీచర్ ఫ్లాగ్ ప్రారంభించబడిన OmniRoute (క్రింద చూడండి).

## 1. CC-అనుకూల ప్రొవైడర్ రకాన్ని ప్రారంభించండి

Claude Code అనుకూల ప్రొవైడర్ రకం, అధికారిక Claude Code క్లయింట్ను దగ్గరగా అనుకరించే ట్రాఫిక్ను పంపుతుంది కాబట్టి, ఇది ఒక ఫీచర్ ఫ్లాగ్ వెనుక నియంత్రించబడుతుంది. OmniRouteను ప్రారంభించే ముందు పర్యావరణ వేరియబుల్ను సెట్ చేయడం ద్వారా దీన్ని ప్రారంభించండి:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker ఉదాహరణ:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

పునఃప్రారంభించిన తర్వాత, ఇప్పటికే ఉన్న OpenAI-అనుకూల మరియు Anthropic-అనుకూల విధానాలకు అదనంగా డ్యాష్బోర్డ్లో **Add Claude Code Compatible** ఎంపిక కనిపిస్తుంది.

## 2. డ్యాష్బోర్డ్లో ప్రొవైడర్ను సృష్టించండి

1. **Dashboard → Providers → Add Provider** తెరవండి.
2. **Add Claude Code Compatible** ఎంచుకోండి (పైన పేర్కొన్న ఫ్లాగ్ సెట్ చేసినప్పుడు మాత్రమే ఇది కనిపిస్తుంది).
3. ఫీల్డ్లను పూరించండి:

| ఫీల్డ్     | విలువ                                                               |
| ---------- | ------------------------------------------------------------------- |
| పేరు       | `AgentRouter` (లేదా ఏదైనా లేబుల్)                                   |
| ప్రిఫిక్స్ | `agentrouter` (లాగ్లు మరియు డ్యాష్బోర్డ్లో చూపబడే సులభమైన మారుపేరు) |
| బేస్ URL   | `https://agentrouter.org`                                           |
| చాట్ పాత్  | `/v1/messages?beta=true` (డిఫాల్ట్ — అలాగే ఉంచండి)                  |

> ప్రామాణిక మోడల్ ఐడెంటిఫైయర్ ఇప్పటికీ పూర్తి ప్రొవైడర్ నోడ్ IDని
> (`anthropic-compatible-cc-{uuid}/{model}`) ఉపయోగిస్తుంది. **ప్రిఫిక్స్** అనేది మరింత సులభంగా అర్థమయ్యే లాగ్ అవుట్పుట్ కోసం `src/lib/usage/callLogs.ts` ద్వారా పరిష్కరించబడే ప్రదర్శన
> మారుపేరు మాత్రమే.

4. (ఐచ్ఛికం) సేవ్ చేయడానికి ముందు కనెక్టివిటీని నిర్ధారించడానికి **Validate** ఫీల్డ్లో మీ API కీని అతికించి, **Check** క్లిక్ చేయండి.
5. **Add** క్లిక్ చేయండి.

సృష్టించిన తర్వాత, ప్రొవైడర్ను తెరిచి మీ AgentRouter API కీతో (`sk-...`) ఒక **Connection**ను జోడించండి. కనెక్షన్ యొక్క `test_status` విలువ `active`గా మారాలి.

## 3. కాంబో ద్వారా లేదా నేరుగా ఉపయోగించండి

మీ ప్రొవైడర్ ప్రిఫిక్స్ను నేమ్స్పేస్గా ఉపయోగించి మోడల్ను సూచించండి:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ప్రామాణిక మోడల్ ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` కూడా పని చేస్తుంది
మరియు డేటాబేస్, కాంబో కాన్ఫిగరేషన్లో కనిపించేది కూడా ఇదే.

లేదా ఇతర ప్రొవైడర్ల మాదిరిగానే రూటింగ్, ఫాల్బ్యాక్ మరియు కోటా నిర్వహణ కోసం
దీన్ని ఒక కాంబోకు జోడించండి.

---

## వైర్ ఇమేజ్ వివరాలు

సూచన కోసం, cc-compatible బ్రిడ్జ్ ప్రతి అప్స్ట్రీమ్ అభ్యర్థనలో కింది వాటిని
పంపుతుంది (`open-sse/services/claudeCodeCompatible.ts` చూడండి):

| హెడర్                                        | విలువ                                                                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                              | `Bearer <api-key>`                                                                                                    |
| `User-Agent`                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                              |
| `anthropic-version`                          | `2023-06-01`                                                                                                          |
| `anthropic-beta`                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                              |
| ప్రతి కనెక్షన్కు redact-thinking బీటా టాగుల్ | ప్రత్యేకంగా రీడాక్ట్ చేసిన థింకింగ్ స్ట్రీమ్లు అవసరమయ్యే అప్స్ట్రీమ్ల కోసం `redact-thinking-2026-02-12`ను జోడిస్తుంది |
| ప్రతి కనెక్షన్కు summarized thinking టాగుల్  | ఇప్పటికే డిస్ప్లే మోడ్ను సెట్ చేయని CC Compatible థింకింగ్ అభ్యర్థనలకు `display: "summarized"`ను జోడిస్తుంది          |
| `anthropic-dangerous-direct-browser-access`  | `true`                                                                                                                |
| `x-app`                                      | `cli`                                                                                                                 |
| `X-Stainless-*`                              | వివిధ Stainless SDK హెడర్లు (భాష, ప్యాకేజీ వెర్షన్, OS, ఆర్కిటెక్చర్ మొదలైనవి)                                        |

అప్స్ట్రీమ్ WAF / క్లయింట్ వైట్లిస్ట్ను అభ్యర్థనలు దాటేందుకు ఇది వీలు కల్పిస్తుంది.

---

## సమస్య పరిష్కారం

**`{"error":{"message":"unauthorized client detected, ..."}}`** — మీ అభ్యర్థన
Claude Code వైర్ ఇమేజ్తో సరిపోలలేదు. ప్రొవైడర్ను `anthropic-compatible-cc`కు బదులుగా
`openai-compatible-chat`గా కాన్ఫిగర్ చేసినప్పుడు లేదా ప్రారంభ సమయంలో
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ఫ్లాగ్ను సెట్ చేయనప్పుడు ఇది జరుగుతుంది.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"చెల్లని టోకెన్". వైర్ ఇమేజ్ సరైనదే, కానీ API కీ తిరస్కరించబడింది. AgentRouter
డ్యాష్బోర్డ్లో కొత్త కీని రూపొందించి కనెక్షన్ను అప్డేట్ చేయండి.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter యొక్క మోడరేషన్ హుక్ అభ్యర్థన కంటెంట్ను తిరస్కరించింది లేదా
ఆ కీకి సంబంధించిన ప్లాన్ అభ్యర్థించిన మోడల్ను అనుమతించదు. వేరే ప్రాంప్ట్ లేదా మోడల్ను
ప్రయత్నించండి; హానికరం కాని ప్రాంప్ట్ నిరంతరం బ్లాక్ అవుతుంటే AgentRouter సపోర్ట్ను సంప్రదించండి.

**నిర్దిష్ట మోడల్లలో మాత్రమే `[400]: content-blocked`** — చాలా AgentRouter ప్లాన్లు
మోడల్లలో కొంత ఉపసమితిని మాత్రమే అనుమతిస్తాయి (ఉదా. `claude-opus-4-6`). కీ చెల్లుబాటులో
ఉన్నప్పటికీ ఇతర మోడల్ IDలు `unauthorized_client_error`ను అందిస్తాయి. మీ ప్లాన్ ఏ మోడల్లను
కవర్ చేస్తుందో AgentRouter డ్యాష్బోర్డ్లో తనిఖీ చేయండి.

**omniroute లాగ్లలో `Invalid JSON response from provider (reset after Ns)`** —
అప్స్ట్రీమ్ JSON కాని బాడీని అందించింది (సాధారణంగా WAF నుండి వచ్చిన HTML ఎర్రర్ పేజీ).
అంటే సాధారణంగా అభ్యర్థన AgentRouter బ్యాకెండ్కు చేరలేదని అర్థం — ప్రొవైడర్ ID
`anthropic-compatible-cc-`తో ప్రారంభమవుతుందో మళ్లీ తనిఖీ చేయండి (చివరి డ్యాష్ను
గమనించండి — `open-sse/services/claudeCodeCompatible.ts`లోని
`CLAUDE_CODE_COMPATIBLE_PREFIX`ను చూడండి), అలాగే ఫీచర్ ఫ్లాగ్ ప్రారంభించబడిందని
నిర్ధారించుకోండి.

**AgentRouter ప్రొవైడర్ ఇప్పటికే ఉన్నప్పటికీ `unauthorized client detected` /
HTML ఎర్రర్ పేజీ** — మీ వద్ద **ఒకటి కంటే ఎక్కువ** AgentRouter ప్రొవైడర్లు ఉండే అవకాశం
ఉంది మరియు మీ అభ్యర్థన తప్పు ప్రొవైడర్కు చేరుతోంది. మిగిలిపోయిన, చేతితో సృష్టించిన
`anthropic-compatible-*` (`cc` కానిది) లేదా `openai-compatible-chat-*` ప్రొవైడర్ను
`agentrouter` ప్రిఫిక్స్తో సృష్టించి ఉంటే, అది `agentrouter/<model>` మోడల్ IDలకు
యజమానిగా ఉండవచ్చు (మరియు కాంబోలు దానిని నోడ్ ID ద్వారా సూచించవచ్చు), కాబట్టి ట్రాఫిక్
ఇప్పటికే సరైన వైర్ ఇమేజ్తో అందించబడే అంతర్నిర్మిత `agentrouter` ప్రొవైడర్కు బదులుగా
ఆ ప్రొవైడర్కు రూట్ అవుతుంది — అది సాధారణ User-Agentను పంపుతుంది మరియు తిరస్కరించబడుతుంది.
omniroute లాగ్లలో మోడల్ వాస్తవంగా ఎక్కడికి రిజాల్వ్ అవుతుందో తనిఖీ చేయండి (`ROUTING`
ట్యాగ్ `agentrouter/<model> → <providerId>/<model>`ను చూపుతుంది); `<providerId>`
`agentrouter` కాకపోతే, స్థానిక ప్రొవైడర్పై ఏకీకృతం చేయండి: కాంబోలను
`agentrouter/<model>`కు (providerId `agentrouter`) పాయింట్ చేసి, నకిలీ compatible
ప్రొవైడర్లను తొలగించండి. స్థానిక ప్రొవైడర్కు వైర్-ఇమేజ్ కాన్ఫిగరేషన్ లేదా
`customUserAgent` అవసరం లేదు.

---

## ఇవి కూడా చూడండి

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web ప్రొవైడర్ సమన్వయ గమనికలు
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — ఉచిత-స్థాయి ప్రొవైడర్
  కేటలాగ్
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — వైర్ ఇమేజ్ అమలు
