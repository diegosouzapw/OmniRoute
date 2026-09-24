# AgentRouter Setup Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ni huduma ya upitishaji inayooana na Anthropic ambayo huuza tena
Claude na modeli nyingine, mara nyingi kwa bei ya chini kuliko API ya moja kwa moja ya Anthropic. Imeundwa
kama mbadala wa moja kwa moja wa `ANTHROPIC_BASE_URL` kwa kiteja rasmi cha Claude Code,
kwa hivyo inakubali tu trafiki inayolingana na muundo wa mawasiliano wa Claude Code (User-Agent mahususi,
alama za `anthropic-beta`, vichwa vya Stainless SDK, n.k.).

## Mwanzo wa haraka — tumia mtoa huduma asilia wa `agentrouter` (inapendekezwa)

Kwa watumiaji wengi, **hakuna usanidi maalum unaohitajika**. OmniRoute huja na
mtoa huduma wa `agentrouter` aliyejengewa ndani, ambaye tayari ana muundo kamili wa mawasiliano wa Claude Code (angalia
`open-sse/config/providerRegistry.ts` → `agentrouter`). Ili kuutumia:

1. Fungua **Dashibodi → Watoa Huduma → Ongeza Mtoa Huduma**.
2. Chagua **AgentRouter** kutoka kwenye orodha.
3. Bandika ufunguo wako wa API wa `sk-...` na uhifadhi.

Ni hivyo tu — hakuna vigeu vya mazingira wala aina maalum ya mtoa huduma. Modeli zilizojengewa ndani
zinajumuisha `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, na
`deepseek-v3.2`.

Sehemu iliyosalia ya mwongozo huu inaelezea **njia ya kina**: kutumia aina ya mtoa huduma ya
`anthropic-compatible-cc-*`. Tumia hii unapohitaji udhibiti zaidi
juu ya muundo wa mawasiliano — kwa mfano, unapounganisha na huduma nyingine za upitishaji zinazofanana na AgentRouter
ambazo bado hazipo kwenye sajili asilia ya watoa huduma, au unapobatilisha
URL ya msingi, njia ya gumzo, au seti ya vichwa.

---

## Kwa kina: kuunganisha kupitia aina ya mtoa huduma inayooana na Claude Code

OmniRoute pia inasaidia AgentRouter (na huduma zinazofanana za upitishaji) kupitia aina ya mtoa huduma
**inayooana na Claude Code** (`anthropic-compatible-cc-*`), ambayo hutumia
Anthropic Messages API ikiwa na muundo sahihi wa mawasiliano. Mtoa huduma wa kawaida wa
`openai-compatible-chat` unaoelekezwa kwenye `https://agentrouter.org`
**hautafanya kazi** — WAF ya upande wa juu hukataa maombi ambayo hayaonekani kama yametoka Claude
Code.

---

## Mahitaji ya awali

- Akaunti ya AgentRouter na ufunguo wa API. Watumiaji wapya wanaojisajili hupata salio la bila malipo kupitia kiungo cha ushirika
  kwenye [README](../README.md) ya mradi.
- OmniRoute inayoendeshwa huku alama ya kipengele ya `ENABLE_CC_COMPATIBLE_PROVIDER` ikiwa imewashwa
  (angalia hapa chini).

## 1. Washa aina ya mtoa huduma inayooana na CC

Aina ya mtoa huduma inayooana na Claude Code imewekewa kikomo kwa kutumia alama ya kipengele kwa sababu
hutuma trafiki inayofanana sana na kiteja rasmi cha Claude Code. Iwashe kwa
kuweka kigeu cha mazingira kabla ya kuanzisha OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Mfano wa Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Baada ya kuwasha upya, dashibodi huonyesha chaguo la **Ongeza Inayooana na Claude Code** pamoja na
michakato iliyopo inayooana na OpenAI na inayooana na Anthropic.

## 2. Unda mtoa huduma kwenye dashibodi

1. Fungua **Dashibodi → Watoa Huduma → Ongeza Mtoa Huduma**.
2. Chagua **Ongeza Inayooana na Claude Code** (huonekana tu wakati alama iliyo hapo juu imewekwa).
3. Jaza sehemu hizi:

| Sehemu        | Thamani                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| Jina          | `AgentRouter` (au lebo yoyote)                                             |
| Kiambishi     | `agentrouter` (jina mbadala linaloonyeshwa kwenye kumbukumbu na dashibodi) |
| URL ya msingi | `https://agentrouter.org`                                                  |
| Njia ya gumzo | `/v1/messages?beta=true` (chaguo-msingi — iache kama ilivyo)               |

> Kitambulishi sanifu cha modeli bado hutumia kitambulisho kamili cha nodi ya mtoa huduma
> (`anthropic-compatible-cc-{uuid}/{model}`). **Kiambishi** ni jina mbadala la kuonyesha
> tu, linalotatuliwa na `src/lib/usage/callLogs.ts` ili kutoa matokeo ya kumbukumbu yanayosomeka kwa urahisi zaidi.

4. (Si lazima) Bandika ufunguo wako wa API kwenye sehemu ya **Thibitisha** na ubofye **Kagua** ili
   kuthibitisha muunganisho kabla ya kuhifadhi.
5. Bofya **Ongeza**.

Baada ya kuundwa, fungua mtoa huduma na uongeze **Muunganisho** kwa kutumia ufunguo wako wa API wa AgentRouter
(`sk-...`). `test_status` ya muunganisho inapaswa kubadilika kuwa `active`.

## 3. Itumie kupitia combo au moja kwa moja

Rejelea modeli ukitumia kiambishi awali cha mtoa huduma wako kama namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kitambulisho sanifu cha modeli `anthropic-compatible-cc-{uuid}/claude-opus-4-6` pia kinafanya kazi
na ndicho kinachoonekana katika hifadhidata na usanidi wa combo.

Au kiongeze kwenye combo kwa ajili ya uelekezaji, mbadala endapo kutatokea hitilafu, na usimamizi wa kiwango cha matumizi kama mtoa huduma mwingine yeyote.

---

## Maelezo ya taswira ya mawasiliano

Kwa marejeleo, daraja linalooana na cc hutuma yafuatayo katika kila ombi la upstream
(tazama `open-sse/services/claudeCodeCompatible.ts`):

| Header                                                  | Thamani                                                                                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                         | `Bearer <api-key>`                                                                                                          |
| `User-Agent`                                            | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                    |
| `anthropic-version`                                     | `2023-06-01`                                                                                                                |
| `anthropic-beta`                                        | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                    |
| Kigeuzi cha beta cha kuficha fikra kwa kila muunganisho | Huongeza `redact-thinking-2026-02-12` kwa upstream zinazohitaji mahususi mitiririko ya fikra iliyofichwa                    |
| Kigeuzi cha fikra zilizofupishwa kwa kila muunganisho   | Huongeza `display: "summarized"` kwenye maombi ya fikra ya CC Compatible ambayo hayakuwa tayari yameweka hali ya uonyeshaji |
| `anthropic-dangerous-direct-browser-access`             | `true`                                                                                                                      |
| `x-app`                                                 | `cli`                                                                                                                       |
| `X-Stainless-*`                                         | Header mbalimbali za Stainless SDK (lugha, toleo la kifurushi, OS, usanifu, n.k.)                                           |

Hiki ndicho kinachowezesha maombi kupita kwenye WAF / orodha ya wateja wanaoruhusiwa ya upstream.

---

## Utatuzi wa matatizo

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ombi lako
halikulingana na taswira ya mawasiliano ya Claude Code. Hili hutokea wakati mtoa huduma amesanidiwa
kama `openai-compatible-chat` badala ya `anthropic-compatible-cc`, au wakati
bendera ya `ENABLE_CC_COMPATIBLE_PROVIDER=true` haikuwekwa wakati wa kuanzisha.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Tokeni batili". Taswira ya mawasiliano ni sahihi lakini API key imekataliwa. Tengeneza
key mpya katika dashibodi ya AgentRouter na usasishe muunganisho.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Kiunganishi cha udhibiti wa maudhui cha AgentRouter kilikataa maudhui ya ombi, au
mpango wa key hauruhusu modeli iliyoombwa. Jaribu prompt au modeli tofauti;
wasiliana na usaidizi wa AgentRouter ikiwa prompt isiyo na madhara inazuiwa mara kwa mara.

**`[400]: content-blocked` kwenye modeli mahususi pekee** — Mipango mingi ya AgentRouter
inaruhusu tu sehemu ya modeli (k.m. `claude-opus-4-6`). Vitambulisho vingine vya modeli hurejesha
`unauthorized_client_error` ingawa key ni halali. Angalia ni modeli zipi
zinazojumuishwa katika mpango wako kwenye dashibodi ya AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` kutoka kwenye kumbukumbu za omniroute** —
Upstream ilirejesha body isiyo ya JSON (kwa kawaida ukurasa wa hitilafu wa HTML kutoka kwa WAF).
Kwa kawaida hii inamaanisha kuwa ombi halikufika kamwe kwenye backend ya AgentRouter — hakikisha tena kwamba
kitambulisho cha mtoa huduma kinaanza na `anthropic-compatible-cc-` (zingatia deshi ya mwisho —
tazama `CLAUDE_CODE_COMPATIBLE_PREFIX` katika `open-sse/services/claudeCodeCompatible.ts`)
na bendera ya kipengele imewezeshwa.

**`unauthorized client detected` / ukurasa wa hitilafu wa HTML ingawa mtoa huduma wa AgentRouter
tayari yupo** — huenda una **zaidi ya mmoja** mtoa huduma wa AgentRouter
na ombi lako linaelekezwa kwa yule asiye sahihi. Ikiwa mtoa huduma wa zamani aliyeundwa kwa mkono wa
`anthropic-compatible-*` (asiye wa `cc`) au `openai-compatible-chat-*`
aliundwa kwa kiambishi awali cha `agentrouter`, anaweza kumiliki vitambulisho vya modeli vya
`agentrouter/<model>` (na combo zinaweza kumrejelea kwa kitambulisho cha nodi), kwa hiyo trafiki inaelekezwa kwa mtoa huduma huyo —
ambaye hutuma User-Agent ya kawaida na kukataliwa — badala ya mtoa huduma asilia wa
`agentrouter` ambaye tayari huja na taswira sahihi ya mawasiliano. Angalia mahali ambapo
modeli inaelekezwa katika kumbukumbu za omniroute (tagi ya `ROUTING` huonyesha
`agentrouter/<model> → <providerId>/<model>`); ikiwa `<providerId>` si
`agentrouter`, unganisha usanidi kwenye mtoa huduma asilia: elekeza combo kwenye
`agentrouter/<model>` (providerId `agentrouter`) na ufute watoa huduma rudufu
wanaooana. Mtoa huduma asilia hahitaji usanidi wa taswira ya mawasiliano wala
`customUserAgent`.

---

## Tazama pia

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Maelezo ya ujumuishaji wa mtoa huduma wa Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Orodha ya watoa huduma wenye kiwango cha bure
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Utekelezaji wa picha kupitia itifaki ya mawasiliano
