# AgentRouter Setup Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

Ang [AgentRouter](https://agentrouter.org) ay isang relay na compatible sa Anthropic na muling nagbebenta ng
Claude at iba pang mga modelo, kadalasan sa mas mababang presyo kaysa sa direktang Anthropic API. Ito ay
idinisenyo bilang drop-in na kapalit ng `ANTHROPIC_BASE_URL` para sa opisyal na Claude Code
client, kaya tumatanggap lamang ito ng trapikong tumutugma sa wire image ng Claude Code (partikular na
User-Agent, mga flag na `anthropic-beta`, mga header ng Stainless SDK, atbp.).

## Mabilisang pagsisimula — gamitin ang native na `agentrouter` provider (inirerekomenda)

Para sa karamihan ng mga user, **walang kinakailangang espesyal na setup**. May kasamang built-in na
`agentrouter` provider ang OmniRoute na naka-bake in na ang buong wire image ng Claude Code (tingnan ang
`open-sse/config/providerRegistry.ts` → `agentrouter`). Upang gamitin ito:

1. Buksan ang **Dashboard → Providers → Add Provider**.
2. Piliin ang **AgentRouter** mula sa listahan.
3. I-paste ang iyong `sk-...` API key at i-save.

Iyon lang — walang mga environment variable, walang custom na uri ng provider. Kabilang sa mga built-in na modelo
ang `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, at
`deepseek-v3.2`.

Tinatalakay ng natitirang bahagi ng gabay na ito ang **advanced na paraan**: paggamit sa uri ng provider na
`anthropic-compatible-cc-*`. Gamitin ito kapag kailangan mo ng higit na kontrol
sa wire image — halimbawa, kapag kumokonekta sa iba pang mga relay na tulad ng AgentRouter
na wala pa sa native na provider registry, o kapag ino-override ang
base URL, chat path, o hanay ng mga header.

---

## Advanced: pagkonekta sa pamamagitan ng uri ng provider na compatible sa Claude Code

Sinusuportahan din ng OmniRoute ang AgentRouter (at mga katulad na relay) sa pamamagitan ng uri ng provider na **compatible sa Claude Code**
(`anthropic-compatible-cc-*`), na gumagamit ng
Anthropic Messages API na may tamang wire image. Ang generic na
`openai-compatible-chat` provider na nakaturo sa `https://agentrouter.org` ay
**hindi** gagana — tinatanggihan ng upstream WAF ang mga request na hindi mukhang nagmula sa Claude
Code.

---

## Mga kinakailangan

- Isang AgentRouter account at API key. Makakakuha ang mga bagong nag-sign up ng mga libreng credit sa pamamagitan ng affiliate
  link sa [README](../README.md) ng proyekto.
- Gumaganang OmniRoute na naka-enable ang feature flag na `ENABLE_CC_COMPATIBLE_PROVIDER`
  (tingnan sa ibaba).

## 1. I-enable ang uri ng provider na compatible sa CC

Ang uri ng provider na compatible sa Claude Code ay nasa likod ng isang feature flag dahil
nagpapadala ito ng trapikong lubos na ginagaya ang opisyal na Claude Code client. I-enable ito sa pamamagitan ng
pagtatakda ng environment variable bago simulan ang OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Halimbawa sa Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Pagkatapos mag-restart, ipapakita ng dashboard ang opsyong **Add Claude Code Compatible** bukod
sa mga umiiral na flow na compatible sa OpenAI at Anthropic.

## 2. Gumawa ng provider sa dashboard

1. Buksan ang **Dashboard → Providers → Add Provider**.
2. Piliin ang **Add Claude Code Compatible** (makikita lamang kapag nakatakda ang flag sa itaas).
3. Punan ang mga field:

| Field     | Value                                                                          |
| --------- | ------------------------------------------------------------------------------ |
| Name      | `AgentRouter` (o anumang label)                                                |
| Prefix    | `agentrouter` (madaling gamiting alias na ipinapakita sa mga log at dashboard) |
| Base URL  | `https://agentrouter.org`                                                      |
| Chat path | `/v1/messages?beta=true` (default — iwanang gaya nito)                         |

> Ginagamit pa rin ng canonical na model identifier ang buong provider node ID
> (`anthropic-compatible-cc-{uuid}/{model}`). Ang **Prefix** ay isang display
> alias lamang na nire-resolve ng `src/lib/usage/callLogs.ts` para sa mas madaling basahing output ng log.

4. (Opsyonal) I-paste ang iyong API key sa field na **Validate** at i-click ang **Check** upang
   kumpirmahin ang connectivity bago i-save.
5. I-click ang **Add**.

Kapag nagawa na, buksan ang provider at magdagdag ng **Connection** gamit ang iyong AgentRouter API
key (`sk-...`). Dapat maging `active` ang `test_status` ng connection.

## 3. Gamitin ito sa pamamagitan ng combo o nang direkta

I-reference ang modelo gamit ang prefix ng iyong provider bilang namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Gumagana rin ang canonical model ID na `anthropic-compatible-cc-{uuid}/claude-opus-4-6`
at ito ang lumalabas sa database at configuration ng combo.

O idagdag ito sa isang combo para sa routing, fallback, at pamamahala ng quota tulad ng
iba pang provider.

---

## Mga detalye ng wire image

Bilang sanggunian, ipinapadala ng cc-compatible bridge ang sumusunod sa bawat upstream
request (tingnan ang `open-sse/services/claudeCodeCompatible.ts`):

| Header                                      | Value                                                                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                                                     |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                               |
| `anthropic-version`                         | `2023-06-01`                                                                                                                           |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                               |
| Per-connection redact-thinking beta toggle  | Idinaragdag ang `redact-thinking-2026-02-12` para sa mga upstream na partikular na nangangailangan ng mga na-redact na thinking stream |
| Per-connection summarized thinking toggle   | Idinaragdag ang `display: "summarized"` sa mga CC Compatible thinking request na wala pang nakatakdang display mode                    |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                                                 |
| `x-app`                                     | `cli`                                                                                                                                  |
| `X-Stainless-*`                             | Iba't ibang Stainless SDK header (wika, bersyon ng package, OS, architecture, atbp.)                                                   |

Ito ang nagbibigay-daan upang makalusot ang mga request sa upstream WAF / whitelist ng client.

---

## Pag-troubleshoot

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Hindi tumugma ang iyong
request sa wire image ng Claude Code. Nangyayari ito kapag naka-configure ang provider
bilang `openai-compatible-chat` sa halip na `anthropic-compatible-cc`, o kapag hindi itinakda
ang flag na `ENABLE_CC_COMPATIBLE_PROVIDER=true` sa pagsisimula.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Di-wastong token". Tama ang wire image ngunit tinanggihan ang API key. Bumuo ng
bagong key sa dashboard ng AgentRouter at i-update ang connection.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Tinanggihan ng moderation hook ng AgentRouter ang nilalaman ng request, o hindi
pinahihintulutan ng plan ng key ang hinihiling na modelo. Sumubok ng ibang prompt o modelo;
makipag-ugnayan sa suporta ng AgentRouter kung palaging bina-block ang isang hindi mapaminsalang prompt.

**`[400]: content-blocked` sa mga partikular na modelo lamang** — Karamihan sa mga plan ng
AgentRouter ay nagpapahintulot lamang ng subset ng mga modelo (hal. `claude-opus-4-6`). Ang ibang
model ID ay nagbabalik ng `unauthorized_client_error` kahit valid ang key. Tingnan sa dashboard
ng AgentRouter kung aling mga modelo ang saklaw ng iyong plan.

**`Invalid JSON response from provider (reset after Ns)` mula sa mga log ng omniroute** —
Nagbalik ang upstream ng body na hindi JSON (karaniwang HTML error page mula sa WAF).
Karaniwan itong nangangahulugang hindi nakarating ang request sa backend ng AgentRouter — muling
suriin na nagsisimula sa `anthropic-compatible-cc-` ang provider ID (pansinin ang dash sa hulihan —
tingnan ang `CLAUDE_CODE_COMPATIBLE_PREFIX` sa `open-sse/services/claudeCodeCompatible.ts`)
at naka-enable ang feature flag.

**`unauthorized client detected` / HTML error page kahit mayroon nang AgentRouter
provider** — malamang na mayroon kang **higit sa isang** AgentRouter provider
at napupunta ang iyong request sa maling provider. Kung may natirang manu-manong ginawang
`anthropic-compatible-*` (hindi `cc`) o `openai-compatible-chat-*` provider na
ginawa gamit ang prefix na `agentrouter`, maaari nitong angkinin ang mga model ID na
`agentrouter/<model>` (at maaaring i-reference ito ng mga combo ayon sa node ID), kaya napupunta
ang traffic sa provider na iyon — na nagpapadala ng generic na User-Agent at tinatanggihan —
sa halip na sa built-in na `agentrouter` provider na may kasama nang tamang wire image. Tingnan
sa mga log ng omniroute kung saan talaga nagre-resolve ang modelo (ipinapakita ng tag na `ROUTING`
ang `agentrouter/<model> → <providerId>/<model>`); kung ang `<providerId>` ay hindi
`agentrouter`, pagsama-samahin ang mga ito sa native provider: ituro ang mga combo sa
`agentrouter/<model>` (providerId `agentrouter`) at burahin ang mga duplicate na
compatible provider. Hindi kailangan ng native provider ng anumang configuration ng wire image
o `customUserAgent`.

---

## Tingnan din

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Mga tala sa integrasyon ng provider na Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalogo ng mga
  provider na may libreng tier
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementasyon ng wire image
