# AgentRouter Setup Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) is een Anthropic-compatibele relay die
Claude en andere modellen doorverkoopt, vaak tegen lagere prijzen dan de rechtstreekse Anthropic API. Deze is
ontworpen als een directe `ANTHROPIC_BASE_URL`-vervanging voor de officiële Claude Code-
client en accepteert daarom alleen verkeer dat overeenkomt met de wire-image van Claude Code (specifieke
User-Agent, `anthropic-beta`-flags, Stainless SDK-headers, enz.).

## Snel aan de slag — gebruik de ingebouwde `agentrouter`-provider (aanbevolen)

Voor de meeste gebruikers is **geen speciale configuratie vereist**. OmniRoute wordt geleverd met een ingebouwde
`agentrouter`-provider waarin de volledige wire-image van Claude Code al is opgenomen (zie
`open-sse/config/providerRegistry.ts` → `agentrouter`). Om deze te gebruiken:

1. Open **Dashboard → Providers → Add Provider**.
2. Selecteer **AgentRouter** in de lijst.
3. Plak uw `sk-...`-API-sleutel en sla deze op.

Dat is alles — geen omgevingsvariabelen, geen aangepast providertype. Ingebouwde modellen
omvatten `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` en
`deepseek-v3.2`.

De rest van deze handleiding behandelt het **geavanceerde traject**: het gebruik van het
providertype `anthropic-compatible-cc-*`. Gebruik dit wanneer u meer controle nodig hebt
over de wire-image — bijvoorbeeld wanneer u verbinding maakt met andere AgentRouter-achtige
relays die nog niet in het ingebouwde providerregister staan, of wanneer u de
basis-URL, het chatpad of de headerset wilt overschrijven.

---

## Geavanceerd: verbinding maken via het Claude Code-compatibele providertype

OmniRoute ondersteunt AgentRouter (en vergelijkbare relays) ook via het **Claude Code-
compatibele** providertype (`anthropic-compatible-cc-*`), dat de
Anthropic Messages API met de juiste wire-image gebruikt. Een generieke
`openai-compatible-chat`-provider die naar `https://agentrouter.org` verwijst,
werkt **niet** — de bovenliggende WAF weigert verzoeken die er niet uitzien als verzoeken van Claude
Code.

---

## Vereisten

- Een AgentRouter-account en API-sleutel. Nieuwe registraties ontvangen gratis tegoed via de affiliate-
  link in de [README](../README.md) van het project.
- Een actieve OmniRoute-instantie waarbij de featureflag `ENABLE_CC_COMPATIBLE_PROVIDER` is ingeschakeld
  (zie hieronder).

## 1. Schakel het CC-compatibele providertype in

Het Claude Code-compatibele providertype is afgeschermd met een featureflag, omdat het
verkeer verzendt dat sterk overeenkomt met dat van de officiële Claude Code-client. Schakel het in door
vóór het starten van OmniRoute een omgevingsvariabele in te stellen:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-voorbeeld:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Na het opnieuw opstarten toont het dashboard naast de bestaande OpenAI-compatibele en
Anthropic-compatibele trajecten ook de optie **Add Claude Code Compatible**.

## 2. Maak de provider aan in het dashboard

1. Open **Dashboard → Providers → Add Provider**.
2. Kies **Add Claude Code Compatible** (alleen zichtbaar wanneer de bovenstaande flag is ingesteld).
3. Vul de velden in:

| Veld      | Waarde                                                                                    |
| --------- | ----------------------------------------------------------------------------------------- |
| Naam      | `AgentRouter` (of een ander label)                                                        |
| Prefix    | `agentrouter` (gebruiksvriendelijke alias die in logs en het dashboard wordt weergegeven) |
| Basis-URL | `https://agentrouter.org`                                                                 |
| Chatpad   | `/v1/messages?beta=true` (standaard — laat dit ongewijzigd)                               |

> De canonieke model-id gebruikt nog steeds de volledige node-ID van de provider
> (`anthropic-compatible-cc-{uuid}/{model}`). De **Prefix** is slechts een weergave-
> alias die door `src/lib/usage/callLogs.ts` wordt omgezet voor gebruiksvriendelijkere loguitvoer.

4. Plak (optioneel) uw API-sleutel in het veld **Validate** en klik op **Check** om
   de verbinding te bevestigen voordat u opslaat.
5. Klik op **Add**.

Open na het aanmaken de provider en voeg een **Connection** toe met uw AgentRouter-API-
sleutel (`sk-...`). De `test_status` van de verbinding moet veranderen in `active`.

## 3. Gebruik het via een combo of rechtstreeks

Verwijs naar het model met het voorvoegsel van je provider als namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

De canonieke model-ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` werkt ook
en is wat in de database en de combo-configuratie wordt weergegeven.

Je kunt het ook aan een combo toevoegen voor routering, fallback en quotabeheer,
net als elke andere provider.

---

## Details van de wire image

Ter referentie: de cc-compatibele bridge verzendt het volgende bij elk upstream-
verzoek (zie `open-sse/services/claudeCodeCompatible.ts`):

| Header                                               | Waarde                                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                      | `Bearer <api-key>`                                                                                                   |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                             |
| `anthropic-version`                                  | `2023-06-01`                                                                                                         |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                             |
| Redact-thinking-bètaschakelaar per verbinding        | Voegt `redact-thinking-2026-02-12` toe voor upstreams die specifiek geredigeerde thinking-streams vereisen           |
| Schakelaar voor samengevatte thinking per verbinding | Voegt `display: "summarized"` toe aan CC Compatible-thinking-verzoeken waarvoor nog geen weergavemodus was ingesteld |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                               |
| `x-app`                                              | `cli`                                                                                                                |
| `X-Stainless-*`                                      | Diverse Stainless SDK-headers (taal, pakketversie, besturingssysteem, architectuur enz.)                             |

Hierdoor kunnen verzoeken de upstream-WAF/client-whitelist passeren.

---

## Probleemoplossing

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Je verzoek kwam
niet overeen met de Claude Code-wire image. Dit gebeurt wanneer de provider is
geconfigureerd als `openai-compatible-chat` in plaats van
`anthropic-compatible-cc`, of wanneer de vlag
`ENABLE_CC_COMPATIBLE_PROVIDER=true` niet was ingesteld bij het opstarten.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Ongeldig token". De wire image is correct, maar de API-sleutel wordt geweigerd.
Genereer een nieuwe sleutel in het AgentRouter-dashboard en werk de verbinding bij.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — De moderatiehook van AgentRouter heeft de inhoud van het verzoek
geweigerd, of het abonnement van de sleutel staat het aangevraagde model niet toe.
Probeer een andere prompt of een ander model; neem contact op met de ondersteuning
van AgentRouter als een onschuldige prompt consequent wordt geblokkeerd.

**`[400]: content-blocked` alleen bij specifieke modellen** — De meeste
AgentRouter-abonnementen staan slechts een subset van modellen toe (bijvoorbeeld
`claude-opus-4-6`). Andere model-ID's retourneren `unauthorized_client_error`,
ook al is de sleutel geldig. Controleer in het AgentRouter-dashboard welke modellen
onder je abonnement vallen.

**`Invalid JSON response from provider (reset after Ns)` in de omniroute-logs** —
De upstream retourneerde een niet-JSON-body (doorgaans een HTML-foutpagina van de
WAF). Dit betekent meestal dat het verzoek de AgentRouter-backend nooit heeft
bereikt — controleer opnieuw of de provider-ID begint met
`anthropic-compatible-cc-` (let op het afsluitende streepje — zie
`CLAUDE_CODE_COMPATIBLE_PREFIX` in
`open-sse/services/claudeCodeCompatible.ts`) en of de feature flag is ingeschakeld.

**`unauthorized client detected` / HTML-foutpagina, ook al bestaat er al een
AgentRouter-provider** — waarschijnlijk heb je **meer dan één** AgentRouter-provider
en komt je verzoek bij de verkeerde terecht. Als er een achtergebleven, handmatig
gemaakte `anthropic-compatible-*`-provider (zonder `cc`) of
`openai-compatible-chat-*`-provider met het voorvoegsel `agentrouter` is
aangemaakt, kan deze eigenaar zijn van de model-ID's `agentrouter/<model>` (en
combo's kunnen ernaar verwijzen via de node-ID), waardoor verkeer naar die provider
wordt gerouteerd — die een generieke User-Agent verzendt en wordt geweigerd — in
plaats van naar de ingebouwde `agentrouter`-provider, die al met de juiste wire
image wordt geleverd. Controleer in de omniroute-logs waar het model daadwerkelijk
naartoe wordt omgezet (de tag `ROUTING` toont
`agentrouter/<model> → <providerId>/<model>`); als `<providerId>` niet
`agentrouter` is, consolideer dan op de native provider: laat combo's verwijzen
naar `agentrouter/<model>` (providerId `agentrouter`) en verwijder de dubbele
compatibele providers. De native provider heeft geen configuratie voor de wire
image en geen `customUserAgent` nodig.

---

## Zie ook

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Integratieopmerkingen voor de Claude Web-provider
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catalogus van providers
  met een gratis abonnement
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementatie van afbeeldingen via het wire-protocol
