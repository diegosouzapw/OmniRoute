# AgentRouter Setup Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) એ Anthropic-સુસંગત રિલે છે, જે Claude અને અન્ય મોડલ્સનું પુનર્વેચાણ કરે છે,
અને ઘણીવાર સીધી Anthropic API કરતાં ઓછી કિંમતે ઉપલબ્ધ કરાવે છે. તેને અધિકૃત Claude Code
ક્લાયન્ટ માટે ડ્રોપ-ઇન `ANTHROPIC_BASE_URL` રિપ્લેસમેન્ટ તરીકે ડિઝાઇન કરવામાં આવ્યું છે,
તેથી તે માત્ર Claude Code વાયર ઇમેજ સાથે મેળ ખાતો ટ્રાફિક જ સ્વીકારે છે (ચોક્કસ
User-Agent, `anthropic-beta` ફ્લૅગ્સ, Stainless SDK હેડર્સ વગેરે).

## ઝડપી શરૂઆત — નેટિવ `agentrouter` પ્રોવાઇડરનો ઉપયોગ કરો (ભલામણ કરેલ)

મોટાભાગના વપરાશકર્તાઓ માટે, **કોઈ ખાસ સેટઅપ જરૂરી નથી**. OmniRoute સંપૂર્ણ Claude Code
વાયર ઇમેજ પહેલેથી જ સમાવિષ્ટ હોય તેવા બિલ્ટ-ઇન `agentrouter` પ્રોવાઇડર સાથે આવે છે (`open-sse/config/providerRegistry.ts` → `agentrouter`
જુઓ). તેનો ઉપયોગ કરવા માટે:

1. **Dashboard → Providers → Add Provider** ખોલો.
2. યાદીમાંથી **AgentRouter** પસંદ કરો.
3. તમારી `sk-...` API કી પેસ્ટ કરો અને સાચવો.

બસ એટલું જ — કોઈ એન્વાયર્નમેન્ટ વેરિએબલ્સ નહીં, કોઈ કસ્ટમ પ્રોવાઇડર પ્રકાર નહીં. બિલ્ટ-ઇન મોડલ્સમાં
`claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, અને
`deepseek-v3.2` સામેલ છે.

આ માર્ગદર્શિકાનો બાકીનો ભાગ **અદ્યતન પદ્ધતિ**ને આવરે છે: `anthropic-compatible-cc-*`
પ્રોવાઇડર પ્રકારનો ઉપયોગ. વાયર ઇમેજ પર વધુ નિયંત્રણની જરૂર હોય ત્યારે તેનો ઉપયોગ કરો
— ઉદાહરણ તરીકે, નેટિવ પ્રોવાઇડર રજિસ્ટ્રીમાં હજી સમાવિષ્ટ ન હોય તેવા અન્ય AgentRouter-શૈલીના
રિલે સાથે કનેક્ટ કરતી વખતે, અથવા બેઝ URL, ચેટ પાથ અથવા હેડર સેટને ઓવરરાઇડ કરતી વખતે.

---

## અદ્યતન: Claude Code સુસંગત પ્રોવાઇડર પ્રકાર દ્વારા કનેક્ટ કરવું

OmniRoute, **Claude Code સુસંગત** પ્રોવાઇડર પ્રકાર (`anthropic-compatible-cc-*`) દ્વારા
AgentRouter (અને સમાન રિલે)ને પણ સપોર્ટ કરે છે, જે યોગ્ય વાયર ઇમેજ સાથે
Anthropic Messages APIનો ઉપયોગ કરે છે. `https://agentrouter.org` તરફ નિર્દેશ કરતો સામાન્ય
`openai-compatible-chat` પ્રોવાઇડર **કામ કરશે નહીં** — અપસ્ટ્રીમ WAF એવી રિક્વેસ્ટ્સને
નકારે છે જે Claude Code જેવી દેખાતી નથી.

---

## પૂર્વજરૂરિયાતો

- AgentRouter એકાઉન્ટ અને API કી. નવા સાઇનઅપ્સને પ્રોજેક્ટના [README](../README.md)માંની
  એફિલિએટ લિંક દ્વારા મફત ક્રેડિટ્સ મળે છે.
- `ENABLE_CC_COMPATIBLE_PROVIDER` ફીચર ફ્લૅગ સક્ષમ રાખીને ચાલતું OmniRoute
  (નીચે જુઓ).

## 1. CC-સુસંગત પ્રોવાઇડર પ્રકાર સક્ષમ કરો

Claude Code સુસંગત પ્રોવાઇડર પ્રકારને ફીચર ફ્લૅગ પાછળ રાખવામાં આવ્યો છે, કારણ કે તે
અધિકૃત Claude Code ક્લાયન્ટ સાથે અત્યંત મળતો ટ્રાફિક મોકલે છે. OmniRoute શરૂ કરતાં પહેલાં
એન્વાયર્નમેન્ટ વેરિએબલ સેટ કરીને તેને સક્ષમ કરો:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker ઉદાહરણ:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

પુનઃપ્રારંભ કર્યા પછી, ડૅશબોર્ડ હાલના OpenAI-સુસંગત અને Anthropic-સુસંગત પ્રવાહો ઉપરાંત
**Add Claude Code Compatible** વિકલ્પ દર્શાવે છે.

## 2. ડૅશબોર્ડમાં પ્રોવાઇડર બનાવો

1. **Dashboard → Providers → Add Provider** ખોલો.
2. **Add Claude Code Compatible** પસંદ કરો (ઉપરનો ફ્લૅગ સેટ થયેલો હોય ત્યારે જ દેખાય છે).
3. ફીલ્ડ્સ ભરો:

| ફીલ્ડ     | મૂલ્ય                                                      |
| --------- | ---------------------------------------------------------- |
| નામ       | `AgentRouter` (અથવા કોઈપણ લેબલ)                            |
| પ્રીફિક્સ | `agentrouter` (લૉગ્સ અને ડૅશબોર્ડમાં દર્શાવાતું સરળ ઉપનામ) |
| બેઝ URL   | `https://agentrouter.org`                                  |
| ચેટ પાથ   | `/v1/messages?beta=true` (ડિફૉલ્ટ — જેમ છે તેમ રહેવા દો)   |

> કેનોનિકલ મોડલ ઓળખકર્તા હજી પણ સંપૂર્ણ પ્રોવાઇડર નોડ IDનો ઉપયોગ કરે છે
> (`anthropic-compatible-cc-{uuid}/{model}`). **પ્રીફિક્સ** માત્ર ડિસ્પ્લે
> ઉપનામ છે, જેને વધુ સુગમ લૉગ આઉટપુટ માટે `src/lib/usage/callLogs.ts` દ્વારા રિઝૉલ્વ કરવામાં આવે છે.

4. (વૈકલ્પિક) તમારી API કી **Validate** ફીલ્ડમાં પેસ્ટ કરો અને સાચવતાં પહેલાં
   કનેક્ટિવિટીની પુષ્ટિ કરવા માટે **Check** પર ક્લિક કરો.
5. **Add** પર ક્લિક કરો.

બનાવ્યા પછી, પ્રોવાઇડર ખોલો અને તમારી AgentRouter API કી (`sk-...`) સાથે
**Connection** ઉમેરો. કનેક્શનનું `test_status` `active` થવું જોઈએ.

## 3. કોમ્બો મારફતે અથવા સીધો તેનો ઉપયોગ કરો

તમારા પ્રદાતાના પ્રીફિક્સને નેમસ્પેસ તરીકે ઉપયોગ કરીને મોડેલનો સંદર્ભ આપો:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

કેનોનિકલ મોડેલ ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` પણ કાર્ય કરે છે
અને ડેટાબેઝ તથા કોમ્બો કન્ફિગરેશનમાં આ જ દેખાય છે.

અથવા અન્ય કોઈપણ પ્રદાતાની જેમ રૂટિંગ, ફૉલબૅક અને ક્વોટા મેનેજમેન્ટ માટે તેને કોમ્બોમાં ઉમેરો.

---

## વાયર ઇમેજની વિગતો

સંદર્ભ માટે, cc-compatible બ્રિજ દરેક અપસ્ટ્રીમ રિક્વેસ્ટમાં નીચેની માહિતી મોકલે છે
(`open-sse/services/claudeCodeCompatible.ts` જુઓ):

| હેડર                                        | મૂલ્ય                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                          |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                    |
| `anthropic-version`                         | `2023-06-01`                                                                                                |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                    |
| પ્રતિ-કનેક્શન redact-thinking બીટા ટૉગલ     | ખાસ કરીને રિડેક્ટેડ થિંકિંગ સ્ટ્રીમ જરૂરી હોય તેવા અપસ્ટ્રીમ માટે `redact-thinking-2026-02-12` ઉમેરે છે     |
| પ્રતિ-કનેક્શન summarized thinking ટૉગલ      | જે CC Compatible થિંકિંગ રિક્વેસ્ટમાં પહેલેથી ડિસ્પ્લે મોડ સેટ ન હોય તેમાં `display: "summarized"` ઉમેરે છે |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                      |
| `x-app`                                     | `cli`                                                                                                       |
| `X-Stainless-*`                             | વિવિધ Stainless SDK હેડર (ભાષા, પૅકેજ વર્ઝન, OS, આર્કિટેક્ચર વગેરે)                                         |

આના કારણે રિક્વેસ્ટ અપસ્ટ્રીમ WAF / ક્લાયન્ટ વ્હાઇટલિસ્ટમાંથી પસાર થઈ શકે છે.

---

## સમસ્યાનિવારણ

**`{"error":{"message":"unauthorized client detected, ..."}}`** — તમારી રિક્વેસ્ટ
Claude Code વાયર ઇમેજ સાથે મેળ ખાતી નથી. જ્યારે પ્રદાતા
`anthropic-compatible-cc`ને બદલે `openai-compatible-chat` તરીકે કન્ફિગર કરેલો હોય,
અથવા સ્ટાર્ટઅપ વખતે `ENABLE_CC_COMPATIBLE_PROVIDER=true` ફ્લૅગ સેટ ન કરેલો હોય ત્યારે
આવું થાય છે.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"અમાન્ય ટોકન". વાયર ઇમેજ સાચી છે, પરંતુ API કી નકારવામાં આવી છે. AgentRouter
ડૅશબોર્ડમાં નવી કી જનરેટ કરો અને કનેક્શન અપડેટ કરો.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouterના મોડરેશન હૂકે રિક્વેસ્ટની સામગ્રી નકારી છે, અથવા કીના
પ્લાનમાં વિનંતી કરાયેલ મોડેલની પરવાનગી નથી. અલગ પ્રોમ્પ્ટ અથવા મોડેલ અજમાવો;
જો હાનિરહિત પ્રોમ્પ્ટ સતત બ્લૉક થતો હોય તો AgentRouter સપોર્ટનો સંપર્ક કરો.

**`[400]: content-blocked` માત્ર ચોક્કસ મોડેલ પર** — મોટા ભાગના AgentRouter પ્લાન
માત્ર મોડેલોના સબસેટને મંજૂરી આપે છે (દા.ત. `claude-opus-4-6`). કી માન્ય હોવા
છતાં અન્ય મોડેલ ID `unauthorized_client_error` પરત કરે છે. AgentRouter ડૅશબોર્ડમાં
તમારો પ્લાન કયા મોડેલને આવરી લે છે તે તપાસો.

**omniroute લૉગમાં `Invalid JSON response from provider (reset after Ns)`** —
અપસ્ટ્રીમે non-JSON બૉડી પરત કરી છે (સામાન્ય રીતે WAF તરફથી HTML એરર પેજ).
સામાન્ય રીતે તેનો અર્થ એ થાય છે કે રિક્વેસ્ટ AgentRouter બૅકએન્ડ સુધી પહોંચી જ
નથી — ફરી તપાસો કે પ્રદાતા ID `anthropic-compatible-cc-`થી શરૂ થાય છે (અંતનો
ડૅશ નોંધો — `open-sse/services/claudeCodeCompatible.ts`માં
`CLAUDE_CODE_COMPATIBLE_PREFIX` જુઓ) અને ફીચર ફ્લૅગ સક્ષમ છે.

**AgentRouter પ્રદાતા પહેલેથી અસ્તિત્વમાં હોવા છતાં `unauthorized client detected`
/ HTML એરર પેજ** — સંભવતઃ તમારી પાસે **એક કરતાં વધુ** AgentRouter પ્રદાતા છે
અને તમારી રિક્વેસ્ટ ખોટા પ્રદાતા સુધી પહોંચી રહી છે. જો `agentrouter` પ્રીફિક્સ
સાથે બાકી રહેલો હાથેથી બનાવેલો `anthropic-compatible-*` (non-`cc`) અથવા
`openai-compatible-chat-*` પ્રદાતા બનાવવામાં આવ્યો હોય, તો તે
`agentrouter/<model>` મોડેલ ID પર માલિકી ધરાવી શકે છે (અને કોમ્બો તેને node ID
દ્વારા સંદર્ભિત કરી શકે છે), તેથી ટ્રાફિક પહેલેથી જ સાચી વાયર ઇમેજ સાથે આવતા
બિલ્ટ-ઇન `agentrouter` પ્રદાતાને બદલે તે પ્રદાતા તરફ રૂટ થાય છે — જે સામાન્ય
User-Agent મોકલે છે અને નકારવામાં આવે છે. omniroute લૉગમાં મોડેલ વાસ્તવમાં ક્યાં
રિઝૉલ્વ થાય છે તે તપાસો (`ROUTING` ટૅગ
`agentrouter/<model> → <providerId>/<model>` દર્શાવે છે); જો `<providerId>`
`agentrouter` ન હોય, તો નેટિવ પ્રદાતા પર એકીકૃત કરો: કોમ્બોને
`agentrouter/<model>` (providerId `agentrouter`) તરફ પૉઇન્ટ કરો અને ડુપ્લિકેટ
compatible પ્રદાતાઓ ડિલીટ કરો. નેટિવ પ્રદાતાને કોઈ વાયર-ઇમેજ કન્ફિગરેશન કે
`customUserAgent`ની જરૂર નથી.

---

## આ પણ જુઓ

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web પ્રદાતા એકીકરણ નોંધો
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — મફત-સ્તરના પ્રદાતાઓની
  સૂચિ
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — વાયર ઇમેજ અમલીકરણ
