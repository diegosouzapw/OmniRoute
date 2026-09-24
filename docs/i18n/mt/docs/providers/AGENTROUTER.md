# AgentRouter Setup Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) huwa relay kompatibbli ma’ Anthropic li jerġa’ jbigħ
Claude u mudelli oħra, ħafna drabi bi prezzijiet orħos mill-API diretta ta’ Anthropic. Huwa
ddisinjat bħala sostitut dirett ta’ `ANTHROPIC_BASE_URL` għall-klijent uffiċjali Claude Code,
għalhekk jaċċetta biss traffiku li jaqbel mal-immaġni tal-protokoll ta’ Claude Code (User-Agent
speċifiku, flags `anthropic-beta`, headers tal-Stainless SDK, eċċ.).

## Bidu rapidu — uża l-fornitur nattiv `agentrouter` (rakkomandat)

Għall-biċċa l-kbira tal-utenti, **ma hija meħtieġa l-ebda konfigurazzjoni speċjali**. OmniRoute jiġi b’fornitur
`agentrouter` integrat bl-immaġni sħiħa tal-protokoll ta’ Claude Code diġà inkluża (ara
`open-sse/config/providerRegistry.ts` → `agentrouter`). Biex tużah:

1. Iftaħ **Dashboard → Providers → Add Provider**.
2. Agħżel **AgentRouter** mil-lista.
3. Waħħal il-kjavi API `sk-...` tiegħek u ssejvja.

Dak kollox — l-ebda varjabbli tal-ambjent, u l-ebda tip ta’ fornitur personalizzat. Il-mudelli integrati
jinkludu `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, u
`deepseek-v3.2`.

Il-bqija ta’ din il-gwida tkopri l-**metodu avvanzat**: l-użu tat-tip ta’ fornitur
`anthropic-compatible-cc-*`. Użah meta jkollok bżonn aktar kontroll
fuq l-immaġni tal-protokoll — pereżempju, meta tikkonnettja ma’ relays oħra simili għal AgentRouter
li għadhom mhumiex fir-reġistru nattiv tal-fornituri, jew meta tissostitwixxi
l-URL bażi, il-path taċ-chat, jew is-sett ta’ headers.

---

## Avvanzat: konnessjoni permezz tat-tip ta’ fornitur kompatibbli ma’ Claude Code

OmniRoute jappoġġa wkoll AgentRouter (u relays simili) permezz tat-tip ta’ fornitur
**kompatibbli ma’ Claude Code** (`anthropic-compatible-cc-*`), li juża l-
Anthropic Messages API bl-immaġni korretta tal-protokoll. Fornitur ġeneriku
`openai-compatible-chat` li jipponta lejn `https://agentrouter.org`
**mhux** se jaħdem — il-WAF upstream jirrifjuta talbiet li ma jidhrux bħal dawk ta’ Claude
Code.

---

## Prerekwiżiti

- Kont ta’ AgentRouter u kjavi API. Reġistrazzjonijiet ġodda jiksbu krediti b’xejn permezz tal-link
  tal-affiljat fil-[README](../README.md) tal-proġett.
- OmniRoute jaħdem bil-feature flag `ENABLE_CC_COMPATIBLE_PROVIDER` attivat
  (ara hawn taħt).

## 1. Attiva t-tip ta’ fornitur kompatibbli ma’ CC

It-tip ta’ fornitur kompatibbli ma’ Claude Code huwa kkontrollat minn feature flag minħabba li
jibgħat traffiku li jixbah ħafna lil dak tal-klijent uffiċjali Claude Code. Attivah billi
tissettja varjabbli tal-ambjent qabel tibda OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Eżempju b’Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Wara li terġa’ tibda, id-dashboard juri għażla **Add Claude Code Compatible**
flimkien mal-flussi eżistenti kompatibbli ma’ OpenAI u kompatibbli ma’ Anthropic.

## 2. Oħloq il-fornitur fid-dashboard

1. Iftaħ **Dashboard → Providers → Add Provider**.
2. Agħżel **Add Claude Code Compatible** (tidher biss meta l-flag ta’ hawn fuq ikun issettjat).
3. Imla l-oqsma:

| Qasam         | Valur                                                     |
| ------------- | --------------------------------------------------------- |
| Isem          | `AgentRouter` (jew kwalunkwe tikketta)                    |
| Prefiss       | `agentrouter` (alias faċli muri fil-logs u fid-dashboard) |
| URL bażi      | `https://agentrouter.org`                                 |
| Path taċ-chat | `/v1/messages?beta=true` (default — ħallih kif inhu)      |

> L-identifikatur kanoniku tal-mudell xorta juża l-ID sħiħ tan-node tal-fornitur
> (`anthropic-compatible-cc-{uuid}/{model}`). Il-**Prefiss** huwa biss alias għall-wiri
> riżolt minn `src/lib/usage/callLogs.ts` biex ir-riżultati fil-log ikunu aktar faċli biex jinqraw.

4. (Fakultattiv) Waħħal il-kjavi API tiegħek fil-qasam **Validate** u kklikkja **Check** biex
   tikkonferma l-konnettività qabel tissejvja.
5. Ikklikkja **Add**.

Ladarba jinħoloq, iftaħ il-fornitur u żid **Connection** bil-kjavi API
ta’ AgentRouter tiegħek (`sk-...`). Il-`test_status` tal-konnessjoni għandu jinbidel għal `active`.

## 3. Użah permezz ta’ combo jew direttament

Irreferi għall-mudell billi tuża l-prefiss tal-fornitur tiegħek bħala namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

L-ID kanoniku tal-mudell `anthropic-compatible-cc-{uuid}/claude-opus-4-6` jaħdem ukoll
u huwa dak li jidher fid-database u fil-konfigurazzjoni tal-combo.

Jew żidu ma’ combo għar-routing, fallback, u l-ġestjoni tal-kwoti bħal kwalunkwe
fornitur ieħor.

---

## Dettalji tal-wire image

Għal referenza, il-bridge kompatibbli ma’ cc jibgħat dan li ġej ma’ kull talba
upstream (ara `open-sse/services/claudeCodeCompatible.ts`):

| Header                                                  | Valur                                                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                         | `Bearer <api-key>`                                                                                            |
| `User-Agent`                                            | `claude-cli/2.1.258 (external, sdk-cli)`                                                                      |
| `anthropic-version`                                     | `2023-06-01`                                                                                                  |
| `anthropic-beta`                                        | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                      |
| Toggle beta ta’ redact-thinking għal kull konnessjoni   | Iżid `redact-thinking-2026-02-12` għal upstreams li speċifikament jeħtieġu streams ta’ ħsieb redatt           |
| Toggle ta’ ħsieb miġbur fil-qosor għal kull konnessjoni | Iżid `display: "summarized"` mat-talbiet CC Compatible ta’ ħsieb li ma kinux diġà stabbilew modalità tal-wiri |
| `anthropic-dangerous-direct-browser-access`             | `true`                                                                                                        |
| `x-app`                                                 | `cli`                                                                                                         |
| `X-Stainless-*`                                         | Diversi headers tal-Stainless SDK (lingwa, verżjoni tal-package, OS, arkitettura, eċċ.)                       |

Dan huwa dak li jippermetti lit-talbiet jgħaddu mill-WAF / whitelist tal-klijenti
tal-upstream.

---

## Soluzzjoni tal-problemi

**`{"error":{"message":"unauthorized client detected, ..."}}`** — It-talba tiegħek
ma qablitx mal-wire image ta’ Claude Code. Dan jiġri meta l-fornitur ikun ikkonfigurat
bħala `openai-compatible-chat` minflok `anthropic-compatible-cc`, jew meta l-flag
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ma jkunx ġie ssettjat waqt l-istartjar.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token invalidu". Il-wire image hija korretta iżda l-API key qed tiġi rrifjutata. Iġġenera
key ġdida fid-dashboard ta’ AgentRouter u aġġorna l-konnessjoni.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Il-hook ta’ moderazzjoni ta’ AgentRouter irrifjuta l-kontenut tat-talba, jew
il-pjan tal-key ma jippermettix il-mudell mitlub. Ipprova prompt jew mudell differenti;
ikkuntattja lill-appoġġ ta’ AgentRouter jekk prompt innoċwu jiġi bblukkat b’mod konsistenti.

**`[400]: content-blocked` fuq mudelli speċifiċi biss** — Il-biċċa l-kbira tal-pjanijiet ta’
AgentRouter jippermettu biss subsett ta’ mudelli (eż. `claude-opus-4-6`). IDs ta’ mudelli
oħra jirritornaw `unauthorized_client_error` minkejja li l-key hija valida. Iċċekkja liema
mudelli jkopri l-pjan tiegħek fid-dashboard ta’ AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` mil-logs ta’ omniroute** —
L-upstream irritorna body mhux JSON (tipikament paġna ta’ żball HTML mill-WAF).
Dan normalment ifisser li t-talba qatt ma waslet għand il-backend ta’ AgentRouter — erġa’
ċċekkja li l-ID tal-fornitur jibda b’`anthropic-compatible-cc-` (innota s-sing fl-aħħar —
ara `CLAUDE_CODE_COMPATIBLE_PREFIX` f’`open-sse/services/claudeCodeCompatible.ts`)
u li l-feature flag huwa attivat.

**`unauthorized client detected` / paġna ta’ żball HTML minkejja li fornitur ta’
AgentRouter diġà jeżisti** — aktarx għandek **aktar minn** fornitur wieħed ta’ AgentRouter
u t-talba tiegħek qed tasal għand dak ħażin. Jekk fornitur magħmul manwalment li jkun fadal,
bħal `anthropic-compatible-*` (mhux `cc`) jew `openai-compatible-chat-*`, ikun
inħoloq bil-prefiss `agentrouter`, dan jista’ jikkontrolla l-IDs tal-mudelli
`agentrouter/<model>` (u l-combos jistgħu jirreferu għalih permezz tal-ID tan-node), u għalhekk
it-traffiku jiġi rrottat lejn dak il-fornitur — li jibgħat User-Agent ġeneriku u jiġi
rrifjutat — minflok lejn il-fornitur integrat `agentrouter` li diġà jinkludi l-wire image
korretta. Iċċekkja fejn fil-fatt jiġi riżolt il-mudell fil-logs ta’ omniroute (it-tag
`ROUTING` turi `agentrouter/<model> → <providerId>/<model>`); jekk `<providerId>` mhuwiex
`agentrouter`, ikkonsolida fuq il-fornitur nattiv: ipponta l-combos lejn
`agentrouter/<model>` (providerId `agentrouter`) u ħassar il-fornituri kompatibbli
duplikati. Il-fornitur nattiv ma jeħtieġ l-ebda konfigurazzjoni tal-wire image u l-ebda
`customUserAgent`.

---

## Ara wkoll

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Noti dwar l-integrazzjoni tal-fornitur Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalgu ta'
  fornituri b'livell bla ħlas
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implimentazzjoni tal-immaġni tal-wire
