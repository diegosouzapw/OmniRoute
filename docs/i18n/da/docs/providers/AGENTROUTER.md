# AgentRouter Setup Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) er en Anthropic-kompatibel relaytjeneste, der videresælger
Claude og andre modeller, ofte til lavere priser end Anthropics direkte API. Den er
designet som en direkte erstatning for `ANTHROPIC_BASE_URL` til den officielle Claude Code-
klient, så den accepterer kun trafik, der matcher Claude Codes wire-format (specifik
User-Agent, `anthropic-beta`-flag, Stainless SDK-headere osv.).

## Hurtig start — brug den indbyggede `agentrouter`-udbyder (anbefales)

For de fleste brugere kræves der **ingen særlig opsætning**. OmniRoute leveres med en indbygget
`agentrouter`-udbyder, hvor det fulde Claude Code-wire-format allerede er indbygget (se
`open-sse/config/providerRegistry.ts` → `agentrouter`). Sådan bruger du den:

1. Åbn **Dashboard → Providers → Add Provider**.
2. Vælg **AgentRouter** på listen.
3. Indsæt din `sk-...`-API-nøgle, og gem.

Det er alt — ingen miljøvariabler og ingen brugerdefineret udbydertype. De indbyggede modeller
omfatter `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` og
`deepseek-v3.2`.

Resten af denne vejledning beskriver den **avancerede metode**: brug af
udbydertypen `anthropic-compatible-cc-*`. Brug den, når du har brug for mere kontrol
over wire-formatet — for eksempel når du opretter forbindelse til andre AgentRouter-lignende
relæer, som endnu ikke findes i det indbyggede udbyderregister, eller når du tilsidesætter
basis-URL'en, chatstien eller headersættet.

---

## Avanceret: Opret forbindelse via den Claude Code-kompatible udbydertype

OmniRoute understøtter også AgentRouter (og lignende relæer) via den **Claude Code-
kompatible** udbydertype (`anthropic-compatible-cc-*`), som kommunikerer med
Anthropic Messages API'et ved hjælp af det korrekte wire-format. En generisk
`openai-compatible-chat`-udbyder, der peger på `https://agentrouter.org`, vil
**ikke** fungere — den opstrøms WAF afviser anmodninger, der ikke ligner Claude
Code.

---

## Forudsætninger

- En AgentRouter-konto og API-nøgle. Nye tilmeldinger får gratis kreditter via affiliate-
  linket i projektets [README](../README.md).
- OmniRoute, der kører med funktionsflaget `ENABLE_CC_COMPATIBLE_PROVIDER` aktiveret
  (se nedenfor).

## 1. Aktivér den CC-kompatible udbydertype

Den Claude Code-kompatible udbydertype er beskyttet af et funktionsflag, fordi den
sender trafik, som nøje efterligner den officielle Claude Code-klient. Aktivér den ved at
indstille en miljøvariabel, før OmniRoute startes:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-eksempel:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Efter genstart viser dashboardet valgmuligheden **Add Claude Code Compatible** ud over
de eksisterende OpenAI-kompatible og Anthropic-kompatible arbejdsgange.

## 2. Opret udbyderen i dashboardet

1. Åbn **Dashboard → Providers → Add Provider**.
2. Vælg **Add Claude Code Compatible** (kun synlig, når flaget ovenfor er indstillet).
3. Udfyld felterne:

| Felt      | Værdi                                                                    |
| --------- | ------------------------------------------------------------------------ |
| Navn      | `AgentRouter` (eller en valgfri etiket)                                  |
| Præfiks   | `agentrouter` (brugervenligt alias, der vises i logfiler og dashboardet) |
| Basis-URL | `https://agentrouter.org`                                                |
| Chatsti   | `/v1/messages?beta=true` (standard — behold den uændret)                 |

> Den kanoniske modelidentifikator bruger stadig det fulde udbydernode-id
> (`anthropic-compatible-cc-{uuid}/{model}`). **Præfikset** er blot et visningsalias,
> som fortolkes af `src/lib/usage/callLogs.ts` for at give mere læsevenligt logoutput.

4. (Valgfrit) Indsæt din API-nøgle i feltet **Validate**, og klik på **Check** for at
   bekræfte forbindelsen, før du gemmer.
5. Klik på **Add**.

Når udbyderen er oprettet, skal du åbne den og tilføje en **Connection** med din AgentRouter-API-
nøgle (`sk-...`). Forbindelsens `test_status` bør skifte til `active`.

## 3. Brug den via en kombination eller direkte

Referér til modellen ved at bruge din udbyders præfiks som namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Det kanoniske model-id `anthropic-compatible-cc-{uuid}/claude-opus-4-6` fungerer også
og er det, der vises i databasen og kombinationskonfigurationen.

Du kan også føje den til en kombination for routing, fallback og kvotestyring som enhver anden
udbyder.

---

## Detaljer om wire-image

Til reference sender den cc-kompatible bro følgende med hver upstream-
anmodning (se `open-sse/services/claudeCodeCompatible.ts`):

| Header                                              | Værdi                                                                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                     | `Bearer <api-key>`                                                                                                         |
| `User-Agent`                                        | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                   |
| `anthropic-version`                                 | `2023-06-01`                                                                                                               |
| `anthropic-beta`                                    | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                   |
| Redact-thinking-betaindstilling pr. forbindelse     | Tilføjer `redact-thinking-2026-02-12` for upstreams, der specifikt kræver redigerede thinking-streams                      |
| Indstilling for opsummeret thinking pr. forbindelse | Tilføjer `display: "summarized"` til CC Compatible-thinking-anmodninger, der ikke allerede har angivet en visningstilstand |
| `anthropic-dangerous-direct-browser-access`         | `true`                                                                                                                     |
| `x-app`                                             | `cli`                                                                                                                      |
| `X-Stainless-*`                                     | Forskellige Stainless SDK-headere (sprog, pakkeversion, operativsystem, arkitektur osv.)                                   |

Det er dette, der gør det muligt for anmodninger at passere upstream-tjenestens WAF/klient-hvidliste.

---

## Fejlfinding

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Din anmodning
matchede ikke Claude Codes wire-image. Dette sker, når udbyderen er konfigureret
som `openai-compatible-chat` i stedet for `anthropic-compatible-cc`, eller når
flaget `ENABLE_CC_COMPATIBLE_PROVIDER=true` ikke blev angivet ved opstart.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Ugyldigt token". Wire-imaget er korrekt, men API-nøglen afvises. Generér en
ny nøgle i AgentRouter-dashboardet, og opdater forbindelsen.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouters moderations-hook afviste anmodningens indhold, eller
nøglens abonnement tillader ikke den anmodede model. Prøv en anden prompt eller model;
kontakt AgentRouter-support, hvis en harmløs prompt konsekvent blokeres.

**`[400]: content-blocked` kun på bestemte modeller** — De fleste AgentRouter-abonnementer
tillader kun et udvalg af modeller (f.eks. `claude-opus-4-6`). Andre model-id'er returnerer
`unauthorized_client_error`, selvom nøglen er gyldig. Kontrollér, hvilke modeller dit
abonnement dækker, i AgentRouter-dashboardet.

**`Invalid JSON response from provider (reset after Ns)` fra omniroute-loggene** —
Upstream-tjenesten returnerede en body, der ikke var JSON (typisk en HTML-fejlside fra WAF'en).
Dette betyder normalt, at anmodningen aldrig nåede AgentRouter-backenden — kontrollér igen, at
udbyder-id'et begynder med `anthropic-compatible-cc-` (bemærk bindestregen til sidst —
se `CLAUDE_CODE_COMPATIBLE_PREFIX` i `open-sse/services/claudeCodeCompatible.ts`),
og at funktionsflaget er aktiveret.

**`unauthorized client detected` / HTML-fejlside, selvom der allerede findes en
AgentRouter-udbyder** — du har sandsynligvis **mere end én** AgentRouter-udbyder,
og din anmodning rammer den forkerte. Hvis en tilbageværende manuelt oprettet
`anthropic-compatible-*`-udbyder (uden `cc`) eller `openai-compatible-chat-*`-udbyder blev
oprettet med præfikset `agentrouter`, kan den eje model-id'erne `agentrouter/<model>`
(og kombinationer kan referere til den via node-id), så trafikken routes til denne udbyder —
som sender en generisk User-Agent og bliver afvist — i stedet for den indbyggede
`agentrouter`-udbyder, der allerede leveres med det korrekte wire-image. Kontrollér, hvor
modellen faktisk fortolkes, i omniroute-loggene (`ROUTING`-tagget viser
`agentrouter/<model> → <providerId>/<model>`); hvis `<providerId>` ikke er
`agentrouter`, skal du konsolidere på den indbyggede udbyder: Lad kombinationer pege på
`agentrouter/<model>` (providerId `agentrouter`), og slet de duplikerede
kompatible udbydere. Den indbyggede udbyder kræver ingen wire-image-konfiguration og ingen
`customUserAgent`.

---

## Se også

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Integrationsnoter til Claude Web-udbyderen
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog over udbydere
  med gratis niveau
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementering af billedoverførsel
