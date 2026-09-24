# AgentRouter Setup Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) är en Anthropic-kompatibel relätjänst som säljer vidare
Claude och andra modeller, ofta till lägre priser än Anthropics direkta API. Den är
utformad som en direkt ersättning för `ANTHROPIC_BASE_URL` i den officiella Claude Code-
klienten, så den accepterar endast trafik som överensstämmer med Claude Codes nätverksprofil
(specifik User-Agent, `anthropic-beta`-flaggor, Stainless SDK-rubriker osv.).

## Snabbstart — använd den inbyggda `agentrouter`-leverantören (rekommenderas)

För de flesta användare krävs **ingen särskild konfiguration**. OmniRoute levereras med en
inbyggd `agentrouter`-leverantör där hela Claude Code-nätverksprofilen redan är inbyggd (se
`open-sse/config/providerRegistry.ts` → `agentrouter`). Så här använder du den:

1. Öppna **Dashboard → Providers → Add Provider**.
2. Välj **AgentRouter** i listan.
3. Klistra in din `sk-...`-API-nyckel och spara.

Det var allt — inga miljövariabler och ingen anpassad leverantörstyp. De inbyggda modellerna
omfattar `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` och
`deepseek-v3.2`.

Resten av den här guiden beskriver den **avancerade metoden**: att använda leverantörstypen
`anthropic-compatible-cc-*`. Använd den när du behöver mer kontroll
över nätverksprofilen — till exempel när du ansluter till andra relätjänster av AgentRouter-typ
som ännu inte finns i det inbyggda leverantörsregistret, eller när du åsidosätter
bas-URL:en, chattsökvägen eller uppsättningen rubriker.

---

## Avancerat: anslutning via den Claude Code-kompatibla leverantörstypen

OmniRoute stöder även AgentRouter (och liknande relätjänster) via den **Claude Code-
kompatibla** leverantörstypen (`anthropic-compatible-cc-*`), som använder
Anthropic Messages API med rätt nätverksprofil. En generell
`openai-compatible-chat`-leverantör som pekar på `https://agentrouter.org` kommer
**inte** att fungera — den överordnade WAF:en avvisar begäranden som inte ser ut att komma från Claude
Code.

---

## Förutsättningar

- Ett AgentRouter-konto och en API-nyckel. Nya registreringar får kostnadsfria krediter via partnerlänken
  i projektets [README](../README.md).
- OmniRoute körs med funktionsflaggan `ENABLE_CC_COMPATIBLE_PROVIDER` aktiverad
  (se nedan).

## 1. Aktivera den CC-kompatibla leverantörstypen

Den Claude Code-kompatibla leverantörstypen styrs av en funktionsflagga eftersom den
skickar trafik som nära efterliknar den officiella Claude Code-klienten. Aktivera den genom att
ange en miljövariabel innan OmniRoute startas:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-exempel:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Efter omstarten visar kontrollpanelen alternativet **Add Claude Code Compatible** utöver
de befintliga flödena för OpenAI-kompatibla och Anthropic-kompatibla leverantörer.

## 2. Skapa leverantören i kontrollpanelen

1. Öppna **Dashboard → Providers → Add Provider**.
2. Välj **Add Claude Code Compatible** (visas endast när flaggan ovan är aktiverad).
3. Fyll i fälten:

| Fält        | Värde                                                                 |
| ----------- | --------------------------------------------------------------------- |
| Namn        | `AgentRouter` (eller valfri etikett)                                  |
| Prefix      | `agentrouter` (lättläst alias som visas i loggar och kontrollpanelen) |
| Bas-URL     | `https://agentrouter.org`                                             |
| Chattsökväg | `/v1/messages?beta=true` (standard — lämna oförändrad)                |

> Den kanoniska modellidentifieraren använder fortfarande leverantörsnodens fullständiga ID
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefixet** är bara ett visningsalias
> som löses upp av `src/lib/usage/callLogs.ts` för mer lättlästa loggar.

4. (Valfritt) Klistra in din API-nyckel i fältet **Validate** och klicka på **Check** för att
   bekräfta anslutningen innan du sparar.
5. Klicka på **Add**.

När leverantören har skapats öppnar du den och lägger till en **Connection** med din AgentRouter-API-
nyckel (`sk-...`). Anslutningens `test_status` bör ändras till `active`.

## 3. Använd den via en combo eller direkt

Referera till modellen genom att använda leverantörens prefix som namnrymd:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Det kanoniska modell-ID:t `anthropic-compatible-cc-{uuid}/claude-opus-4-6` fungerar också
och är det som visas i databasen och combo-konfigurationen.

Du kan också lägga till den i en combo för routning, reservhantering och kvothantering precis som vilken annan
leverantör som helst.

---

## Information om wire image

Som referens skickar den cc-kompatibla bryggan följande med varje request till uppströmsleverantören
(se `open-sse/services/claudeCodeCompatible.ts`):

| Header                                           | Värde                                                                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `Authorization`                                  | `Bearer <api-key>`                                                                                                       |
| `User-Agent`                                     | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                 |
| `anthropic-version`                              | `2023-06-01`                                                                                                             |
| `anthropic-beta`                                 | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                 |
| Beta-växling för redact-thinking per anslutning  | Lägger till `redact-thinking-2026-02-12` för uppströmsleverantörer som uttryckligen kräver maskerade tankeströmmar       |
| Växling för sammanfattat tänkande per anslutning | Lägger till `display: "summarized"` i CC Compatible-förfrågningar om tänkande som inte redan har angett ett visningsläge |
| `anthropic-dangerous-direct-browser-access`      | `true`                                                                                                                   |
| `x-app`                                          | `cli`                                                                                                                    |
| `X-Stainless-*`                                  | Diverse headers från Stainless SDK (språk, paketversion, operativsystem, arkitektur osv.)                                |

Detta gör att förfrågningar kan passera uppströmsleverantörens WAF/klientvitlista.

---

## Felsökning

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Din förfrågan
matchade inte Claude Codes wire image. Detta inträffar när leverantören är konfigurerad
som `openai-compatible-chat` i stället för `anthropic-compatible-cc`, eller när
flaggan `ENABLE_CC_COMPATIBLE_PROVIDER=true` inte angavs vid start.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Ogiltig token". Wire image är korrekt, men API-nyckeln avvisas. Generera en
ny nyckel i AgentRouter-instrumentpanelen och uppdatera anslutningen.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouters modereringshook avvisade innehållet i förfrågan, eller så
tillåter nyckelns abonnemang inte den begärda modellen. Prova en annan prompt eller modell;
kontakta AgentRouter-supporten om en ofarlig prompt konsekvent blockeras.

**`[400]: content-blocked` endast för specifika modeller** — De flesta AgentRouter-abonnemang
tillåter endast en delmängd av modellerna (t.ex. `claude-opus-4-6`). Andra modell-ID:n returnerar
`unauthorized_client_error` även om nyckeln är giltig. Kontrollera vilka modeller som
omfattas av ditt abonnemang i AgentRouter-instrumentpanelen.

**`Invalid JSON response from provider (reset after Ns)` i omniroute-loggarna** —
Uppströmsleverantören returnerade ett svar som inte var JSON (vanligtvis en HTML-felsida från WAF).
Det innebär oftast att förfrågan aldrig nådde AgentRouter-backendservern — kontrollera igen att
leverantörs-ID:t börjar med `anthropic-compatible-cc-` (observera det avslutande bindestrecket —
se `CLAUDE_CODE_COMPATIBLE_PREFIX` i `open-sse/services/claudeCodeCompatible.ts`)
och att funktionsflaggan är aktiverad.

**`unauthorized client detected`/HTML-felsida trots att en AgentRouter-
leverantör redan finns** — du har sannolikt **fler än en** AgentRouter-leverantör
och din förfrågan når fel leverantör. Om en kvarvarande manuellt skapad
`anthropic-compatible-*`-leverantör (utan `cc`) eller `openai-compatible-chat-*`-leverantör
skapades med prefixet `agentrouter` kan den äga modell-ID:na `agentrouter/<model>`
(och combos kan referera till den via nod-ID), vilket innebär att trafiken routas till den leverantören —
som skickar en generisk User-Agent och avvisas — i stället för till den inbyggda
`agentrouter`-leverantören, som redan använder rätt wire image. Kontrollera vart modellen
faktiskt matchas i omniroute-loggarna (`ROUTING`-taggen visar
`agentrouter/<model> → <providerId>/<model>`); om `<providerId>` inte är
`agentrouter` ska du samla allt hos den inbyggda leverantören: rikta combos till
`agentrouter/<model>` (providerId `agentrouter`) och ta bort de duplicerade
kompatibla leverantörerna. Den inbyggda leverantören behöver ingen wire image-konfiguration och ingen
`customUserAgent`.

---

## Se även

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Integrationsanteckningar för Claude Web-leverantören
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog över leverantörer
  med kostnadsfria nivåer
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementering av wire image
