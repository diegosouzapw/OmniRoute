# AgentRouter Setup Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) යනු Anthropic සමඟ අනුකූල relay සේවාවක් වන අතර, එය Claude සහ අනෙකුත් models බොහෝ විට සෘජු Anthropic API එකට වඩා අඩු මිලකට නැවත අලෙවි කරයි. එය නිල Claude Code client සඳහා සෘජුවම භාවිත කළ හැකි `ANTHROPIC_BASE_URL` ආදේශකයක් ලෙස නිර්මාණය කර ඇති බැවින්, Claude Code wire image එකට ගැළපෙන traffic පමණක් පිළිගනී (නිශ්චිත User-Agent, `anthropic-beta` flags, Stainless SDK headers ආදිය).

## ඉක්මන් ආරම්භය — ස්වදේශීය `agentrouter` provider එක භාවිත කරන්න (නිර්දේශිතයි)

බොහෝ පරිශීලකයන් සඳහා, **විශේෂ සැකසුමක් අවශ්ය නොවේ**. සම්පූර්ණ Claude Code wire image එක දැනටමත් ඇතුළත් කර ඇති built-in `agentrouter` provider එකක් සමඟ OmniRoute නිකුත් වේ (`open-sse/config/providerRegistry.ts` → `agentrouter` බලන්න). එය භාවිත කිරීමට:

1. **Dashboard → Providers → Add Provider** විවෘත කරන්න.
2. ලැයිස්තුවෙන් **AgentRouter** තෝරන්න.
3. ඔබගේ `sk-...` API key එක අලවා සුරකින්න.

එපමණයි — environment variables හෝ custom provider type එකක් අවශ්ය නොවේ. Built-in models අතර `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, සහ `deepseek-v3.2` ඇතුළත් වේ.

මෙම මාර්ගෝපදේශයේ ඉතිරි කොටස **උසස් ක්රමය** ආවරණය කරයි: `anthropic-compatible-cc-*` provider type එක භාවිත කිරීම. Wire image එක පිළිබඳ වැඩි පාලනයක් අවශ්ය විට එය භාවිත කරන්න — උදාහරණයක් ලෙස, තවමත් ස්වදේශීය provider registry එකෙහි නොමැති වෙනත් AgentRouter ආකාරයේ relays වෙත සම්බන්ධ වන විට, හෝ base URL, chat path, හෝ header කට්ටලය අභිබවා සකසන විට.

---

## උසස්: Claude Code සමඟ අනුකූල provider type එක හරහා සම්බන්ධ වීම

නිවැරදි wire image එක සමඟ Anthropic Messages API භාවිත කරන **Claude Code compatible** provider type එක (`anthropic-compatible-cc-*`) හරහාද OmniRoute, AgentRouter (සහ සමාන relays) සඳහා සහය දක්වයි. `https://agentrouter.org` වෙත යොමු කළ සාමාන්ය `openai-compatible-chat` provider එකක් **ක්රියා නොකරයි** — Claude Code ලෙස නොපෙනෙන requests upstream WAF එක විසින් ප්රතික්ෂේප කරයි.

---

## පූර්ව අවශ්යතා

- AgentRouter account එකක් සහ API key එකක්. නව ලියාපදිංචිවීම් සඳහා project [README](../README.md) හි ඇති affiliate link එක හරහා නොමිලේ credits ලැබේ.
- `ENABLE_CC_COMPATIBLE_PROVIDER` feature flag එක සක්රීය කර OmniRoute ක්රියාත්මක වීම (පහත බලන්න).

## 1. CC-compatible provider type එක සක්රීය කරන්න

Claude Code compatible provider type එක නිල Claude Code client එක ඉතා සමීපව අනුකරණය කරන traffic යවන බැවින්, එය feature flag එකක් මඟින් පාලනය වේ. OmniRoute ආරම්භ කිරීමට පෙර environment variable එකක් සැකසීමෙන් එය සක්රීය කරන්න:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker උදාහරණය:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

නැවත ආරම්භ කිරීමෙන් පසු, පවතින OpenAI-compatible සහ Anthropic-compatible flows වලට අමතරව dashboard එකෙහි **Add Claude Code Compatible** විකල්පයක් පෙන්වයි.

## 2. Dashboard එකෙහි provider එක සාදන්න

1. **Dashboard → Providers → Add Provider** විවෘත කරන්න.
2. **Add Claude Code Compatible** තෝරන්න (ඉහත flag එක සකසා ඇති විට පමණක් දිස් වේ).
3. ක්ෂේත්ර පුරවන්න:

| ක්ෂේත්රය  | අගය                                                          |
| --------- | ------------------------------------------------------------ |
| නම        | `AgentRouter` (හෝ ඕනෑම ලේබලයක්)                              |
| Prefix    | `agentrouter` (logs සහ dashboard එකෙහි පෙන්වන පහසු alias එක) |
| Base URL  | `https://agentrouter.org`                                    |
| Chat path | `/v1/messages?beta=true` (පෙරනිමිය — වෙනස් නොකරන්න)          |

> සම්මත model identifier එක තවමත් සම්පූර්ණ provider node ID එක
> (`anthropic-compatible-cc-{uuid}/{model}`) භාවිත කරයි. **Prefix** යනු වඩාත් පහසුවෙන් කියවිය හැකි log output සඳහා `src/lib/usage/callLogs.ts` මඟින් resolve කරන display
> alias එකක් පමණි.

4. (විකල්ප) සුරැකීමට පෙර සම්බන්ධතාව තහවුරු කිරීමට ඔබගේ API key එක **Validate** ක්ෂේත්රයට අලවා **Check** ක්ලික් කරන්න.
5. **Add** ක්ලික් කරන්න.

නිර්මාණය කළ පසු, provider එක විවෘත කර ඔබගේ AgentRouter API key එක (`sk-...`) සමඟ **Connection** එකක් එක් කරන්න. එම connection එකේ `test_status` අගය `active` බවට පත්විය යුතුය.

## 3. Combo එකක් හරහා හෝ සෘජුවම එය භාවිත කරන්න

ඔබේ සැපයුම්කරුගේ prefix එක namespace එක ලෙස භාවිත කරමින් model එක සඳහන් කරන්න:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

සම්මත model ID එක වන `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ද ක්රියා කරන අතර,
database එකේ සහ combo වින්යාසය තුළ දිස්වන්නේද එයයි.

නැතහොත්, වෙනත් ඕනෑම සැපයුම්කරුවෙකු මෙන් routing, fallback සහ quota කළමනාකරණය සඳහා
එය combo එකකට එක් කරන්න.

---

## Wire image විස්තර

යොමුව සඳහා, cc-compatible bridge එක සෑම upstream request එකක් සමඟම පහත දෑ යවයි
(`open-sse/services/claudeCodeCompatible.ts` බලන්න):

| Header                                             | අගය                                                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `Authorization`                                    | `Bearer <api-key>`                                                                                         |
| `User-Agent`                                       | `claude-cli/2.1.258 (external, sdk-cli)`                                                                   |
| `anthropic-version`                                | `2023-06-01`                                                                                               |
| `anthropic-beta`                                   | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                   |
| එක් connection එකකට redact-thinking beta toggle එක | විශේෂයෙන් redacted thinking streams අවශ්ය කරන upstream සඳහා `redact-thinking-2026-02-12` එක් කරයි          |
| එක් connection එකකට summarized thinking toggle එක  | දැනටමත් display mode එකක් සකසා නොතිබූ CC Compatible thinking requests වෙත `display: "summarized"` එක් කරයි |
| `anthropic-dangerous-direct-browser-access`        | `true`                                                                                                     |
| `x-app`                                            | `cli`                                                                                                      |
| `X-Stainless-*`                                    | විවිධ Stainless SDK headers (භාෂාව, package version එක, OS, architecture එක ආදිය)                          |

Upstream WAF / client whitelist එක හරහා requests ගමන් කිරීමට ඉඩ සලසන්නේ මෙයයි.

---

## දෝෂ නිරාකරණය

**`{"error":{"message":"unauthorized client detected, ..."}}`** — ඔබේ request එක
Claude Code wire image එකට ගැළපුණේ නැත. සැපයුම්කරු `anthropic-compatible-cc` වෙනුවට
`openai-compatible-chat` ලෙස වින්යාස කර ඇති විට, හෝ ආරම්භයේදී
`ENABLE_CC_COMPATIBLE_PROVIDER=true` flag එක සකසා නොතිබූ විට මෙය සිදු වේ.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"වලංගු නොවන token එකකි". Wire image එක නිවැරදි නමුත් API key එක ප්රතික්ෂේප කර ඇත.
AgentRouter dashboard එක තුළ නව key එකක් ජනනය කර connection එක යාවත්කාලීන කරන්න.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter හි moderation hook එක request content එක ප්රතික්ෂේප කර ඇත,
හෝ key එකේ plan එක ඉල්ලා ඇති model එකට අවසර නොදෙයි. වෙනත් prompt එකක් හෝ model එකක්
උත්සාහ කරන්න; හානිකර නොවන prompt එකක් අඛණ්ඩව අවහිර වන්නේ නම් AgentRouter support
අමතන්න.

**`[400]: content-blocked` නිශ්චිත models සඳහා පමණි** — බොහෝ AgentRouter plans
අවසර දෙන්නේ models උපකුලකයකට පමණි (උදා. `claude-opus-4-6`). Key එක වලංගු වුවද
වෙනත් model IDs සඳහා `unauthorized_client_error` ආපසු ලැබේ. AgentRouter dashboard
එක තුළ ඔබේ plan එක ආවරණය කරන models මොනවාදැයි පරීක්ෂා කරන්න.

**omniroute logs තුළින් ලැබෙන `Invalid JSON response from provider (reset after Ns)`** —
Upstream එක JSON නොවන body එකක් ආපසු ලබා දී ඇත (සාමාන්යයෙන් WAF වෙතින් ලැබෙන HTML
error page එකක්). මෙයින් සාමාන්යයෙන් අදහස් වන්නේ request එක AgentRouter backend එක
වෙත කිසිදා ළඟා නොවූ බවයි — provider ID එක `anthropic-compatible-cc-` සමඟ ආරම්භ වන බව
නැවත පරීක්ෂා කරන්න (අග ඇති dash එක සලකන්න —
`open-sse/services/claudeCodeCompatible.ts` තුළ `CLAUDE_CODE_COMPATIBLE_PREFIX` බලන්න)
සහ feature flag එක සක්රීය කර ඇති බව තහවුරු කරන්න.

**AgentRouter provider එකක් දැනටමත් පැවතියද `unauthorized client detected` /
HTML error page එකක් ලැබීම** — බොහෝ විට ඔබ සතුව AgentRouter providers **එකකට වඩා**
ඇත, සහ ඔබේ request එක වැරදි එක වෙත යොමු වෙමින් පවතී. ඉතිරිව ඇති අතින් සාදන ලද
`anthropic-compatible-*` (`cc` නොවන) හෝ `openai-compatible-chat-*` provider එකක්
`agentrouter` prefix එක සමඟ සාදා තිබේ නම්, එයට `agentrouter/<model>` model IDs හි
හිමිකාරිත්වය ලබාගත හැකිය (සහ combos එය node ID එකෙන් සඳහන් කළ හැකිය), එබැවින් traffic
එම provider එක වෙත route වේ — එය සාමාන්ය User-Agent එකක් යවා ප්රතික්ෂේප වේ — නිවැරදි
wire image එක දැනටමත් ඇතුළත් built-in `agentrouter` provider එක වෙත නොවේ. Model එක
සැබැවින්ම resolve වන්නේ කොතැනටදැයි omniroute logs තුළ පරීක්ෂා කරන්න (`ROUTING` tag එක
`agentrouter/<model> → <providerId>/<model>` පෙන්වයි); `<providerId>` එක
`agentrouter` නොවේ නම්, native provider එක මත ඒකාබද්ධ කරන්න: combos
`agentrouter/<model>` වෙත (providerId `agentrouter`) යොමු කර, duplicate compatible
providers මකා දමන්න. Native provider එකට wire-image වින්යාසයක් හෝ
`customUserAgent` එකක් අවශ්ය නොවේ.

---

## මෙයද බලන්න

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web සපයන්නා ඒකාබද්ධ කිරීමේ සටහන්
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — නොමිලේ ස්ථරයේ සපයන්නන්ගේ
  නාමාවලිය
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image ක්රියාත්මක කිරීම
