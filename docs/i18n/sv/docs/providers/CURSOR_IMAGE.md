# Cursor Image Generation (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute tillhandahåller Cursor-planens **bildgenerering** på `POST /v1/images/generations` via samma leverantörs-id som för chatt: `cursor` (alias `cu`).

| Fält                 | Värde                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-id | `cursor`                                                                                     |
| Format               | `cursor-agent-image`                                                                         |
| Autentisering        | Samma OAuth-/API-nyckelanslutning som för chatt (`provider_connections.provider = "cursor"`) |
| Modeller             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                    |

## Varför Agent CLI används

Cursor-chatt i OmniRoute använder `agent.v1.AgentService/Run` (protobuf). Den sökvägen **avvisar** inbyggda klientverktyg (skal, skrivning, …). Bildgenerering är ett Cursor-internt verktyg som körs av **`agent` CLI** mot användarplatsen. Bildhanteraren startar därför `agent` med en låst prompt och en temporär arbetsyta per begäran (med samma upplägg som community-bryggor för användarplatser) och returnerar sedan OpenAI-kompatibel `b64_json`.

## Åtkomstbegränsning (hårda regler nr 15 och 17)

Detta är det enda `IMAGE_PROVIDERS`-formatet som startar en underordnad process (binärfilen `agent`). Eftersom `POST /v1/images/generations` delas av cirka 40 andra bildleverantörer som inte startar processer och som fjärranropare har legitima skäl att använda, klassificeras inte hela routen som `LOCAL_ONLY`. I stället tillämpar `handleCursorAgentImageGeneration` en egen spärr med hjälp av det betrodda `AUTHZ_HEADER_PEER_LOCALITY`-beslut som authz-pipelinen stämplar på varje begäran (baserat på den faktiska TCP-motparten, aldrig det förfalskningsbara `Host`-huvudet): endast anropare från `loopback` och `lan` får nå processstarten. Alla andra (inklusive om en läckt API-nyckel återanvänds via en offentlig tunnel) får `403` innan någon uppslagning av autentiseringsuppgifter eller processstart sker. Se `src/server/authz/policies/management.ts` för samma policy som tillämpas på resten av `LOCAL_ONLY`-nivån.

## Samtidighetsspärren är på modulnivå (begränsning till en enda instans)

`CURSOR_IMG_MAX_CONCURRENT` tillämpas med en minnesbaserad räknare/kö som är begränsad till Node-modulinstansen (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Den begränsar korrekt samtidiga starter av `agent` inom en OmniRoute-process, men samordnar **inte** mellan flera processer/instanser som delar samma Cursor-användarplats (t.ex. en distribution med flera repliker) – varje instans tillämpar sin egen oberoende gräns. För en distribution med en enda instans (standard) är detta exakt. Horisontellt skalade distributioner bör använda ett konservativt värde för `CURSOR_IMG_MAX_CONCURRENT` per instans eller dirigera Cursor-bildtrafik till en enda instans.

## Krav

1. Ett anslutet Cursor-konto i kontrollpanelen (OAuth eller API-nyckeln `crsr_…`).
2. Binärfilen Cursor Agent måste vara tillgänglig för OmniRoute-processen:
   - miljövariabeln `CURSOR_AGENT_BIN=/path/to/agent`, eller
   - `~/.local/bin/agent`, eller
   - `providerSpecificData.agentBin` på Cursor-anslutningen.

Valfri finjustering:

| Miljövariabel               | Standardvärde          | Betydelse                                 |
| --------------------------- | ---------------------- | ----------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`               | Väggklockstid per bild                    |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                    | Samtidighetsspärr för delad användarplats |
| `CURSOR_IMG_MODEL`          | (begärd modell/`auto`) | Åsidosätt `--model` för CLI               |

## Exempel

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Genereringen tar vanligtvis 1–2 minuter. Föredra en intern nätverkssökväg; edge-proxyservrar med tidsgränser på cirka 100 sekunder kommer att misslyckas.

## LiteLLM

Registrera en bildmodell med `mode: image_generation`, `api_base: http://omniroute:20128/v1` och `model: openai/cursor/auto` (eller enbart `cursor/auto`, beroende på din LiteLLM-version).
