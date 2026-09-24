# AgentRouter Setup Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) wata hanyar isar da buƙatu ce mai dacewa da Anthropic wadda ke sake sayar da
Claude da sauran samfura, sau da yawa a farashi mai rahusa fiye da Anthropic API kai tsaye. An
ƙera ta a matsayin madadin `ANTHROPIC_BASE_URL` da za a iya amfani da shi kai tsaye ga
abokin cinikin Claude Code na hukuma, don haka tana karɓar zirga-zirgar da ta dace da siffar sadarwar Claude Code kawai (takamaiman
User-Agent, tutocin `anthropic-beta`, taken Stainless SDK, da sauransu).

## Farawa cikin sauri — yi amfani da mai samar da `agentrouter` na asali (an ba da shawarar haka)

Ga yawancin masu amfani, **ba a buƙatar wani saiti na musamman**. OmniRoute yana zuwa da
mai samar da `agentrouter` da aka gina a ciki tare da cikakkiyar siffar sadarwar Claude Code da aka riga aka haɗa (duba
`open-sse/config/providerRegistry.ts` → `agentrouter`). Don amfani da shi:

1. Buɗe **Dashboard → Providers → Add Provider**.
2. Zaɓi **AgentRouter** daga jerin.
3. Liƙa maɓallin API ɗinka na `sk-...` sannan ka adana.

Shi ke nan — babu masu sauyin muhalli, babu nau'in mai samarwa na musamman. Samfuran da aka gina a ciki
sun haɗa da `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, da
`deepseek-v3.2`.

Sauran wannan jagorar yana bayani ne kan **hanyar ci-gaba**: amfani da nau'in mai samarwa na
`anthropic-compatible-cc-*`. Yi amfani da wannan idan kana buƙatar ƙarin iko
kan siffar sadarwar — misali, lokacin haɗawa da wasu hanyoyin isar da buƙatu irin na AgentRouter
waɗanda ba su riga sun kasance a cikin kundin masu samarwa na asali ba, ko lokacin maye gurbin
URL na tushe, hanyar tattaunawa, ko saitin take.

---

## Ci-gaba: haɗawa ta nau'in mai samarwa mai dacewa da Claude Code

OmniRoute kuma yana tallafa wa AgentRouter (da makamantan hanyoyin isar da buƙatu) ta nau'in mai samarwa
**mai dacewa da Claude Code** (`anthropic-compatible-cc-*`), wanda ke sadarwa da
Anthropic Messages API ta amfani da madaidaiciyar siffar sadarwa. Mai samarwa na gama-gari na
`openai-compatible-chat` da aka nuna masa `https://agentrouter.org`
**ba zai** yi aiki ba — WAF na ɓangaren sama yana ƙin buƙatun da ba su yi kama da Claude
Code ba.

---

## Abubuwan da ake buƙata

- Asusun AgentRouter da maɓallin API. Sabbin masu rajista suna samun kiredit kyauta ta hanyar mahaɗin haɗin gwiwa
  da ke cikin [README](../README.md) na aikin.
- OmniRoute yana gudana tare da kunna tutar fasalin `ENABLE_CC_COMPATIBLE_PROVIDER`
  (duba ƙasa).

## 1. Kunna nau'in mai samarwa mai dacewa da CC

An sanya nau'in mai samarwa mai dacewa da Claude Code a bayan tutar fasali saboda yana
aika zirga-zirgar da ke kwaikwayon abokin cinikin Claude Code na hukuma sosai. Kunna shi ta
saita wani sauyin muhalli kafin fara OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Misalin Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Bayan sake farawa, dashboard zai nuna zaɓin **Add Claude Code Compatible** ban da
hanyoyin OpenAI-compatible da Anthropic-compatible da ake da su.

## 2. Ƙirƙiri mai samarwar a cikin dashboard

1. Buɗe **Dashboard → Providers → Add Provider**.
2. Zaɓi **Add Claude Code Compatible** (ana ganinsa ne kawai idan an saita tutar da ke sama).
3. Cika filayen:

| Fili      | Ƙima                                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| Suna      | `AgentRouter` (ko kowace alama)                                                        |
| Prefix    | `agentrouter` (laƙabi mai sauƙin fahimta da ake nunawa a cikin rajistoci da dashboard) |
| Base URL  | `https://agentrouter.org`                                                              |
| Chat path | `/v1/messages?beta=true` (na asali — bar shi yadda yake)                               |

> Har yanzu cikakken mai gano samfurin yana amfani da cikakken ID na mahaɗin mai samarwa
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefix** laƙabin nuni ne kawai
> wanda `src/lib/usage/callLogs.ts` ke warwarewa domin samar da fitowar rajista mai sauƙin fahimta.

4. (Na zaɓi) Liƙa maɓallin API ɗinka a filin **Validate** sannan ka danna **Check** don
   tabbatar da haɗin kafin adanawa.
5. Danna **Add**.

Da zarar an ƙirƙira shi, buɗe mai samarwar sannan ka ƙara **Connection** tare da maɓallin API
na AgentRouter (`sk-...`). Ya kamata `test_status` na haɗin ya koma `active`.

## 3. Yi amfani da shi ta hanyar combo ko kai tsaye

Koma zuwa samfurin ta amfani da prefix na mai samarwarka a matsayin namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Canonical model ID ɗin `anthropic-compatible-cc-{uuid}/claude-opus-4-6` shi ma yana aiki
kuma shi ne abin da yake bayyana a rumbun bayanai da saitunan combo.

Ko kuma ƙara shi zuwa combo domin routing, fallback, da sarrafa quota kamar kowane
mai samarwa.

---

## Cikakkun bayanan wire image

Don tunani, cc-compatible bridge yana aika waɗannan a kowace upstream
request (duba `open-sse/services/claudeCodeCompatible.ts`):

| Header                                                | Ƙima                                                                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                       | `Bearer <api-key>`                                                                                                  |
| `User-Agent`                                          | `claude-cli/2.1.258 (external, sdk-cli)`                                                                            |
| `anthropic-version`                                   | `2023-06-01`                                                                                                        |
| `anthropic-beta`                                      | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                            |
| Kunna/kashe redact-thinking beta na kowace connection | Yana ƙara `redact-thinking-2026-02-12` ga upstreams waɗanda ke buƙatar ɓoyayyun thinking streams musamman           |
| Kunna/kashe summarized thinking na kowace connection  | Yana ƙara `display: "summarized"` zuwa CC Compatible thinking requests waɗanda ba su riga sun saita display mode ba |
| `anthropic-dangerous-direct-browser-access`           | `true`                                                                                                              |
| `x-app`                                               | `cli`                                                                                                               |
| `X-Stainless-*`                                       | Headers daban-daban na Stainless SDK (harshe, sigar package, OS, arch, da sauransu)                                 |

Wannan shi ne abin da ke ba requests damar wuce upstream WAF / whitelist na clients.

---

## Magance matsaloli

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Request ɗinka bai
yi daidai da Claude Code wire image ba. Wannan yana faruwa idan an saita mai samarwar
a matsayin `openai-compatible-chat` maimakon `anthropic-compatible-cc`, ko kuma idan ba a
saita flag ɗin `ENABLE_CC_COMPATIBLE_PROVIDER=true` a lokacin farawa ba.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token mara inganci". Wire image ɗin daidai ne amma an ƙi API key. Ƙirƙiri
sabon key a dashboard na AgentRouter sannan ka sabunta connection.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Moderation hook na AgentRouter ya ƙi abun cikin request ɗin, ko kuma
tsarin key ɗin bai ba da izinin samfurin da aka nema ba. Gwada wani prompt ko model daban;
tuntuɓi tallafin AgentRouter idan ana ci gaba da toshe prompt marar cutarwa.

**`[400]: content-blocked` kawai a kan takamaiman models** — Yawancin tsare-tsaren AgentRouter suna
ba da izinin wani ɓangare ne kawai na models (misali `claude-opus-4-6`). Sauran model IDs suna mayar da
`unauthorized_client_error` duk da cewa key ɗin yana aiki. Duba models ɗin da
tsarinka ya ƙunsa a dashboard na AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` daga omniroute logs** —
Upstream ya mayar da body wanda ba JSON ba ne (yawanci shafin kuskuren HTML daga WAF).
Wannan yawanci yana nufin request ɗin bai taɓa isa AgentRouter backend ba — sake tabbatar da cewa
provider ID yana farawa da `anthropic-compatible-cc-` (lura da dash na ƙarshe —
duba `CLAUDE_CODE_COMPATIBLE_PREFIX` a cikin `open-sse/services/claudeCodeCompatible.ts`)
kuma an kunna feature flag ɗin.

**`unauthorized client detected` / Shafin kuskuren HTML duk da cewa wani AgentRouter
provider ya riga ya kasance** — mai yiwuwa kana da **fiye da ɗaya** AgentRouter provider
kuma request ɗinka yana zuwa wanda ba daidai ba. Idan akwai ragowar wanda aka ƙirƙira da hannu
`anthropic-compatible-*` (wanda ba `cc` ba) ko `openai-compatible-chat-*` provider da aka
ƙirƙira da prefix ɗin `agentrouter`, zai iya mallakar `agentrouter/<model>` model
IDs (kuma combos na iya komawa gare shi ta node ID), don haka traffic zai bi hanyar wannan provider —
wanda ke aika generic User-Agent kuma a ƙi shi — maimakon built-in
`agentrouter` provider wanda ya riga ya zo da wire image daidai. Duba inda
model ɗin yake resolve a zahiri a cikin omniroute logs (`ROUTING` tag yana nuna
`agentrouter/<model> → <providerId>/<model>`); idan `<providerId>` ba
`agentrouter` ba ne, haɗa komai a kan native provider: sa combos su nuna zuwa
`agentrouter/<model>` (providerId `agentrouter`) sannan ka share duplicate
compatible providers. Native provider ɗin ba ya buƙatar saitin wire-image kuma ba ya buƙatar
`customUserAgent`.

---

## Duba kuma

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Bayanan haɗa mai samar da Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Kundin masu samarwa na matakin kyauta
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Aiwatar da hoton waya
