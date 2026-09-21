# AgentRouter Setup Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) er et Anthropic-kompatibelt mellomledd som videreselger
Claude og andre modeller, ofte til lavere priser enn Anthropics direkte API. Det er
utformet som en direkte `ANTHROPIC_BASE_URL`-erstatning for den offisielle Claude Code-
klienten, så det godtar bare trafikk som samsvarer med kommunikasjonsprofilen til Claude Code
(spesifikk User-Agent, `anthropic-beta`-flagg, Stainless SDK-headere osv.).

## Hurtigstart — bruk den innebygde `agentrouter`-leverandøren (anbefalt)

For de fleste brukere kreves **ingen spesiell konfigurasjon**. OmniRoute leveres med en innebygd
`agentrouter`-leverandør der hele kommunikasjonsprofilen til Claude Code allerede er integrert (se
`open-sse/config/providerRegistry.ts` → `agentrouter`). Slik bruker du den:

1. Åpne **Kontrollpanel → Leverandører → Legg til leverandør**.
2. Velg **AgentRouter** fra listen.
3. Lim inn API-nøkkelen din av typen `sk-...`, og lagre.

Det er alt — ingen miljøvariabler, ingen egendefinert leverandørtype. Innebygde modeller
inkluderer `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` og
`deepseek-v3.2`.

Resten av denne veiledningen dekker den **avanserte fremgangsmåten**: bruk av
leverandørtypen `anthropic-compatible-cc-*`. Bruk denne når du trenger mer kontroll
over kommunikasjonsprofilen — for eksempel ved tilkobling til andre AgentRouter-lignende
mellomledd som ennå ikke finnes i det innebygde leverandørregisteret, eller når du vil overstyre
basis-URL-en, chatbanen eller headersettet.

---

## Avansert: koble til via den Claude Code-kompatible leverandørtypen

OmniRoute støtter også AgentRouter (og lignende mellomledd) via den **Claude Code-
kompatible** leverandørtypen (`anthropic-compatible-cc-*`), som kommuniserer med
Anthropic Messages API ved hjelp av riktig kommunikasjonsprofil. En generell
`openai-compatible-chat`-leverandør som peker på `https://agentrouter.org`, vil
**ikke** fungere — den overordnede WAF-en avviser forespørsler som ikke ser ut som de kommer fra Claude
Code.

---

## Forutsetninger

- En AgentRouter-konto og API-nøkkel. Nye registreringer får gratiskreditt via partner-
  lenken i prosjektets [README](../README.md).
- OmniRoute må kjøre med funksjonsflagget `ENABLE_CC_COMPATIBLE_PROVIDER` aktivert
  (se nedenfor).

## 1. Aktiver den CC-kompatible leverandørtypen

Den Claude Code-kompatible leverandørtypen styres av et funksjonsflagg fordi den
sender trafikk som i stor grad etterligner den offisielle Claude Code-klienten. Aktiver den ved å
angi en miljøvariabel før du starter OmniRoute:

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

Etter omstart viser kontrollpanelet alternativet **Legg til Claude Code-kompatibel** i
tillegg til de eksisterende OpenAI-kompatible og Anthropic-kompatible arbeidsflytene.

## 2. Opprett leverandøren i kontrollpanelet

1. Åpne **Kontrollpanel → Leverandører → Legg til leverandør**.
2. Velg **Legg til Claude Code-kompatibel** (bare synlig når flagget ovenfor er angitt).
3. Fyll ut feltene:

| Felt      | Verdi                                                                     |
| --------- | ------------------------------------------------------------------------- |
| Navn      | `AgentRouter` (eller en valgfri etikett)                                  |
| Prefiks   | `agentrouter` (brukervennlig alias som vises i logger og kontrollpanelet) |
| Basis-URL | `https://agentrouter.org`                                                 |
| Chatbane  | `/v1/messages?beta=true` (standard — la stå uendret)                      |

> Den kanoniske modellidentifikatoren bruker fortsatt den fullstendige node-ID-en for leverandøren
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefiks** er bare et visnings-
> alias som løses av `src/lib/usage/callLogs.ts` for mer brukervennlig loggvisning.

4. (Valgfritt) Lim inn API-nøkkelen din i feltet **Valider**, og klikk på **Kontroller** for å
   bekrefte tilkoblingen før du lagrer.
5. Klikk på **Legg til**.

Når den er opprettet, åpner du leverandøren og legger til en **Tilkobling** med AgentRouter-API-
nøkkelen din (`sk-...`). Tilkoblingens `test_status` skal endres til `active`.

## 3. Bruk den via en kombinasjon eller direkte

Referer til modellen ved å bruke leverandørens prefiks som navneområde:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Den kanoniske modell-ID-en `anthropic-compatible-cc-{uuid}/claude-opus-4-6` fungerer også
og er den som vises i databasen og kombinasjonskonfigurasjonen.

Du kan også legge den til i en kombinasjon for ruting, reservehåndtering og kvoteadministrasjon, på samme måte som enhver annen
leverandør.

---

## Detaljer om wire image

Til referanse sender den cc-kompatible broen følgende med hver oppstrømsforespørsel
(se `open-sse/services/claudeCodeCompatible.ts`):

| Topptekst                                         | Verdi                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                   | `Bearer <api-key>`                                                                                                        |
| `User-Agent`                                      | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                  |
| `anthropic-version`                               | `2023-06-01`                                                                                                              |
| `anthropic-beta`                                  | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                  |
| Beta-bryter per tilkobling for skjult resonnering | Legger til `redact-thinking-2026-02-12` for oppstrømstjenester som spesifikt krever skjulte resonneringsstrømmer          |
| Bryter per tilkobling for oppsummert resonnering  | Legger til `display: "summarized"` i CC Compatible-resonneringsforespørsler som ikke allerede har angitt en visningsmodus |
| `anthropic-dangerous-direct-browser-access`       | `true`                                                                                                                    |
| `x-app`                                           | `cli`                                                                                                                     |
| `X-Stainless-*`                                   | Ulike topptekster fra Stainless SDK (språk, pakkeversjon, operativsystem, arkitektur osv.)                                |

Dette er det som gjør at forespørsler slipper gjennom den oppstrøms WAF-en / klienttillatelseslisten.

---

## Feilsøking

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Forespørselen din
samsvarte ikke med Claude Code-wire-imaget. Dette skjer når leverandøren er konfigurert
som `openai-compatible-chat` i stedet for `anthropic-compatible-cc`, eller når
flagget `ENABLE_CC_COMPATIBLE_PROVIDER=true` ikke ble angitt ved oppstart.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Ugyldig token». Wire-imaget er korrekt, men API-nøkkelen blir avvist. Generer en
ny nøkkel i AgentRouter-kontrollpanelet og oppdater tilkoblingen.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouters modereringsmekanisme avviste innholdet i forespørselen, eller
nøkkelens abonnement tillater ikke den forespurte modellen. Prøv en annen instruksjon eller modell.
Kontakt AgentRouter-kundestøtten hvis en harmløs instruksjon konsekvent blir blokkert.

**`[400]: content-blocked` bare på bestemte modeller** — De fleste AgentRouter-abonnementer
tillater bare et utvalg modeller (f.eks. `claude-opus-4-6`). Andre modell-ID-er returnerer
`unauthorized_client_error` selv om nøkkelen er gyldig. Kontroller hvilke modeller
abonnementet ditt dekker i AgentRouter-kontrollpanelet.

**`Invalid JSON response from provider (reset after Ns)` i omniroute-loggene** —
Oppstrømstjenesten returnerte en respons som ikke var JSON (vanligvis en HTML-feilside fra WAF-en).
Dette betyr vanligvis at forespørselen aldri nådde AgentRouter-tjenerdelen — kontroller på nytt at
leverandør-ID-en begynner med `anthropic-compatible-cc-` (merk bindestreken på slutten —
se `CLAUDE_CODE_COMPATIBLE_PREFIX` i `open-sse/services/claudeCodeCompatible.ts`)
og at funksjonsflagget er aktivert.

**`unauthorized client detected` / HTML-feilside selv om en AgentRouter-
leverandør allerede finnes** — du har sannsynligvis **mer enn én** AgentRouter-leverandør,
og forespørselen din treffer feil leverandør. Hvis en gjenværende, manuelt opprettet
`anthropic-compatible-*`-leverandør (uten `cc`) eller `openai-compatible-chat-*`-leverandør ble
opprettet med prefikset `agentrouter`, kan den eie modell-ID-ene `agentrouter/<model>`
(og kombinasjoner kan referere til den via node-ID), slik at trafikken rutes til den leverandøren —
som sender en generisk User-Agent og blir avvist — i stedet for den innebygde
`agentrouter`-leverandøren, som allerede leveres med korrekt wire image. Kontroller hvor
modellen faktisk blir slått opp i omniroute-loggene (`ROUTING`-taggen viser
`agentrouter/<model> → <providerId>/<model>`). Hvis `<providerId>` ikke er
`agentrouter`, konsolider på den innebygde leverandøren: pek kombinasjoner mot
`agentrouter/<model>` (providerId `agentrouter`) og slett de dupliserte
kompatible leverandørene. Den innebygde leverandøren trenger ingen wire image-konfigurasjon og ingen
`customUserAgent`.

---

## Se også

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Integrasjonsnotater for Claude Web-leverandøren
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog over leverandører
  med gratisnivå
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementasjon av bildeoverføring
