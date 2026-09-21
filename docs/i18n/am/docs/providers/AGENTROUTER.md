# AgentRouter Setup Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ከAnthropic ጋር ተኳሃኝ የሆነ፣ Claude እና ሌሎች ሞዴሎችን ብዙውን ጊዜ ከቀጥታው Anthropic API ባነሰ ዋጋ እንደገና የሚሸጥ የማስተላለፊያ አገልግሎት ነው።
ለኦፊሴላዊው Claude Code ደንበኛ ያለ ለውጥ እንደሚተካ `ANTHROPIC_BASE_URL` ሆኖ የተነደፈ በመሆኑ፣ ከClaude Code የግንኙነት ቅርጽ ጋር የሚዛመድ ትራፊክን ብቻ ይቀበላል (የተወሰነ
User-Agent፣ `anthropic-beta` ጠቋሚዎች፣ Stainless SDK ራስጌዎች፣ ወዘተ)።

## ፈጣን መጀመሪያ — ቤተኛውን `agentrouter` አቅራቢ ይጠቀሙ (የሚመከር)

ለአብዛኛዎቹ ተጠቃሚዎች **ምንም ልዩ ቅንብር አያስፈልግም**። OmniRoute ሙሉው የClaude Code የግንኙነት ቅርጽ ቀድሞውኑ የተካተተበትን አብሮገነብ
`agentrouter` አቅራቢ ይዞ ይመጣል (`open-sse/config/providerRegistry.ts` → `agentrouter` ይመልከቱ)። እሱን ለመጠቀም፦

1. **ዳሽቦርድ → አቅራቢዎች → አቅራቢ አክል**ን ይክፈቱ።
2. ከዝርዝሩ **AgentRouter**ን ይምረጡ።
3. የ`sk-...` API ቁልፍዎን ይለጥፉና ያስቀምጡ።

ይህን ብቻ ነው — ምንም የአካባቢ ተለዋዋጮች ወይም ብጁ የአቅራቢ ዓይነት አያስፈልጉም። አብሮገነብ ሞዴሎች
`claude-opus-4-6`፣ `claude-haiku-4-5-20251001`፣ `glm-5.1` እና
`deepseek-v3.2`ን ያካትታሉ።

የቀረው የዚህ መመሪያ ክፍል **የላቀውን አካሄድ** ይሸፍናል፦ የ
`anthropic-compatible-cc-*` አቅራቢ ዓይነትን መጠቀም። በግንኙነት ቅርጹ ላይ የበለጠ ቁጥጥር ሲያስፈልግዎ ይህን ይጠቀሙ — ለምሳሌ፣ ገና በቤተኛው የአቅራቢዎች መዝገብ ውስጥ ካልተካተቱ ሌሎች ከAgentRouter ጋር ተመሳሳይ የሆኑ የማስተላለፊያ አገልግሎቶች ጋር ሲገናኙ፣ ወይም መሠረታዊ URLን፣ የውይይት ዱካውን ወይም የራስጌዎችን ስብስብ ሲሽሩ።

---

## የላቀ፦ በClaude Code ተኳሃኝ የአቅራቢ ዓይነት መገናኘት

OmniRoute በትክክለኛው የግንኙነት ቅርጽ Anthropic Messages APIን በሚጠቀመው **Claude Code
ተኳሃኝ** የአቅራቢ ዓይነት (`anthropic-compatible-cc-*`) በኩል AgentRouterን (እና ተመሳሳይ የማስተላለፊያ አገልግሎቶችን) ይደግፋል። ወደ `https://agentrouter.org` የሚያመለክት አጠቃላይ
`openai-compatible-chat` አቅራቢ **አይሠራም** — የላይኛው WAF እንደClaude
Code የማይመስሉ ጥያቄዎችን ውድቅ ያደርጋል።

---

## ቅድመ ሁኔታዎች

- የAgentRouter መለያ እና API ቁልፍ። አዲስ የሚመዘገቡ ተጠቃሚዎች በፕሮጀክቱ [README](../README.md) ውስጥ ባለው የአጋርነት አገናኝ ነፃ ክሬዲት ያገኛሉ።
- OmniRoute የ`ENABLE_CC_COMPATIBLE_PROVIDER` ባህሪ ጠቋሚ ነቅቶለት እየሠራ መሆን
  (ከታች ይመልከቱ)።

## 1. ከCC ጋር ተኳሃኝ የሆነውን የአቅራቢ ዓይነት ያንቁ

የClaude Code ተኳሃኝ የአቅራቢ ዓይነት ከኦፊሴላዊው Claude Code ደንበኛ ጋር በእጅጉ የሚመሳሰል ትራፊክ ስለሚልክ፣ ከባህሪ ጠቋሚ ጀርባ ተደብቋል። OmniRouteን ከማስጀመርዎ በፊት የአካባቢ ተለዋዋጭ በማዋቀር ያንቁት፦

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

የDocker ምሳሌ፦

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

ዳግም ካስጀመሩ በኋላ፣ ዳሽቦርዱ ከነባሮቹ OpenAI-compatible እና Anthropic-compatible ፍሰቶች በተጨማሪ **Claude Code Compatible አክል** የሚል አማራጭ ያሳያል።

## 2. አቅራቢውን በዳሽቦርዱ ውስጥ ይፍጠሩ

1. **ዳሽቦርድ → አቅራቢዎች → አቅራቢ አክል**ን ይክፈቱ።
2. **Claude Code Compatible አክል**ን ይምረጡ (ከላይ ያለው ጠቋሚ ሲዋቀር ብቻ ይታያል)።
3. መስኮቹን ይሙሉ፦

| መስክ       | እሴት                                                 |
| --------- | --------------------------------------------------- |
| ስም        | `AgentRouter` (ወይም ማንኛውም መለያ)                       |
| ቅድመ ቅጥያ   | `agentrouter` (በመዝገቦችና በዳሽቦርዱ ውስጥ የሚታይ ቀላል ተለዋጭ ስም) |
| መሠረታዊ URL | `https://agentrouter.org`                           |
| የውይይት ዱካ  | `/v1/messages?beta=true` (ነባሪ — እንዳለ ይተዉት)          |

> መደበኛው የሞዴል መለያ አሁንም ሙሉውን የአቅራቢ ኖድ መታወቂያ
> (`anthropic-compatible-cc-{uuid}/{model}`) ይጠቀማል። **ቅድመ ቅጥያ**ው ይበልጥ ለወዳጃዊ የመዝገብ ውጤት በ`src/lib/usage/callLogs.ts` የሚፈታ የማሳያ
> ተለዋጭ ስም ብቻ ነው።

4. (አማራጭ) ከማስቀመጥዎ በፊት ግንኙነቱን ለማረጋገጥ API ቁልፍዎን በ**Validate** መስክ ውስጥ ይለጥፉና **Check**ን ጠቅ ያድርጉ።
5. **Add**ን ጠቅ ያድርጉ።

ከተፈጠረ በኋላ፣ አቅራቢውን ይክፈቱና በAgentRouter API ቁልፍዎ (`sk-...`) **Connection** ያክሉ። የግንኙነቱ `test_status` ወደ `active` መቀየር አለበት።

## 3. በጥምር በኩል ወይም በቀጥታ ይጠቀሙበት

የአቅራቢዎን ቅድመ ቅጥያ እንደ namespace በመጠቀም ሞዴሉን ይጥቀሱ፦

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

መደበኛው የሞዴል ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` እንዲሁም ይሠራል፤
በዳታቤዙና በጥምር ውቅሩ ውስጥም የሚታየው ይህ ነው።

ወይም እንደማንኛውም ሌላ አቅራቢ ለማስተላለፍ፣ ለመጠባበቂያ እና ለኮታ አስተዳደር
ወደ ጥምር ያክሉት።

---

## የwire image ዝርዝሮች

ለማጣቀሻ፣ cc-compatible bridge በእያንዳንዱ ወደ upstream በሚላክ ጥያቄ ላይ
የሚከተሉትን ይልካል (`open-sse/services/claudeCodeCompatible.ts`ን ይመልከቱ)፦

| ራስጌ                                         | እሴት                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Authorization`                             | `Bearer <api-key>`                                                                         |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                   |
| `anthropic-version`                         | `2023-06-01`                                                                               |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                   |
| በየግንኙነቱ የredact-thinking beta መቀያየሪያ        | በተለይ redacted thinking streams ለሚፈልጉ upstreams `redact-thinking-2026-02-12`ን ያክላል          |
| በየግንኙነቱ የsummarized thinking መቀያየሪያ         | አስቀድሞ display mode ላልተወሰነላቸው CC Compatible thinking requests `display: "summarized"`ን ያክላል |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                     |
| `x-app`                                     | `cli`                                                                                      |
| `X-Stainless-*`                             | የተለያዩ የStainless SDK ራስጌዎች (ቋንቋ፣ የpackage ስሪት፣ OS፣ አርክቴክቸር፣ ወዘተ)                           |

ጥያቄዎች የupstream WAF / client whitelistን እንዲያልፉ የሚያስችላቸው ይህ ነው።

---

## መላ ፍለጋ

**`{"error":{"message":"unauthorized client detected, ..."}}`** — ጥያቄዎ ከClaude Code wire image ጋር
አልተዛመደም። ይህ የሚከሰተው አቅራቢው በ`anthropic-compatible-cc` ፋንታ
እንደ `openai-compatible-chat` ሲዋቀር፣ ወይም በማስጀመሪያ ጊዜ
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ጠቋሚው ሳይዘጋጅ ሲቀር ነው።

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«ልክ ያልሆነ token»። wire imageው ትክክል ነው፣ ነገር ግን API keyው ውድቅ ተደርጓል። በ
AgentRouter dashboard ውስጥ አዲስ key ይፍጠሩ እና ግንኙነቱን ያዘምኑ።

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — የAgentRouter moderation hook የጥያቄውን ይዘት ውድቅ አድርጎታል፣ ወይም
የkeyው ዕቅድ የተጠየቀውን ሞዴል አይፈቅድም። የተለየ prompt ወይም ሞዴል ይሞክሩ፤
ጉዳት የሌለው prompt በተደጋጋሚ ከታገደ የAgentRouter ድጋፍን ያነጋግሩ።

**`[400]: content-blocked` በተወሰኑ ሞዴሎች ላይ ብቻ** — አብዛኞቹ የAgentRouter ዕቅዶች
የተወሰኑ ሞዴሎችን ብቻ ይፈቅዳሉ (ለምሳሌ `claude-opus-4-6`)። ሌሎች የሞዴል IDዎች
keyው ትክክለኛ ቢሆንም `unauthorized_client_error`ን ይመልሳሉ። ዕቅድዎ የትኞቹን ሞዴሎች
እንደሚሸፍን በAgentRouter dashboard ውስጥ ያረጋግጡ።

**`Invalid JSON response from provider (reset after Ns)` ከomniroute logs** —
upstream JSON ያልሆነ body መልሷል (በተለምዶ ከWAF የመጣ HTML error page)።
ይህ ብዙውን ጊዜ ጥያቄው የAgentRouter backendን ፈጽሞ እንዳልደረሰ ያመለክታል —
የአቅራቢው ID በ`anthropic-compatible-cc-` መጀመሩን እንደገና ያረጋግጡ (ከኋላ ያለውን ሰረዝ
ያስተውሉ — በ`open-sse/services/claudeCodeCompatible.ts` ውስጥ
`CLAUDE_CODE_COMPATIBLE_PREFIX`ን ይመልከቱ)፣ እንዲሁም feature flagው መንቃቱን ያረጋግጡ።

**የAgentRouter አቅራቢ አስቀድሞ ቢኖርም `unauthorized client detected` / HTML error page** —
ምናልባት **ከአንድ በላይ** የAgentRouter አቅራቢ አለዎት እና ጥያቄዎ የተሳሳተውን እያገኘ ነው።
ቀሪ በእጅ የተሠራ `anthropic-compatible-*` (`cc` ያልሆነ) ወይም
`openai-compatible-chat-*` አቅራቢ በ`agentrouter` ቅድመ ቅጥያ ከተፈጠረ፣
የ`agentrouter/<model>` ሞዴል IDዎችን ሊቆጣጠር ይችላል (ጥምሮችም በnode ID ሊጠቅሱት ይችላሉ)፤
ስለዚህ ትራፊኩ ትክክለኛውን wire image አካትቶ ወደሚመጣው አብሮገነብ
`agentrouter` አቅራቢ ፋንታ ወደዚያ አቅራቢ ይመራል — ይህም አጠቃላይ User-Agent
ይልክና ውድቅ ይደረጋል። ሞዴሉ በእርግጥ ወዴት እንደሚፈታ በomniroute logs ውስጥ ያረጋግጡ
(`ROUTING` tag `agentrouter/<model> → <providerId>/<model>`ን ያሳያል)፤ `<providerId>`
`agentrouter` ካልሆነ፣ በnative provider ላይ ያዋህዱ፦ ጥምሮችን ወደ
`agentrouter/<model>` (providerId `agentrouter`) ያመልክቱ እና የተባዙ compatible providersን
ይሰርዙ። native provider ምንም የwire-image ውቅር ወይም
`customUserAgent` አያስፈልገውም።

---

## በተጨማሪ ይመልከቱ

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — የClaude Web አቅራቢ ውህደት ማስታወሻዎች
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — የነፃ ደረጃ አቅራቢዎች
  ማውጫ
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — የምስል በሽቦ ላይ አተገባበር
