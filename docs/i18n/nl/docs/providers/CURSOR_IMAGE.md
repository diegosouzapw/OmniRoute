# Cursor Image Generation (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute biedt **beeldgeneratie** via het Cursor-abonnement aan op `POST /v1/images/generations`, met dezelfde provider-id als voor chat: `cursor` (alias `cu`).

| Veld                 | Waarde                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS`-id | `cursor`                                                                                         |
| Indeling             | `cursor-agent-image`                                                                             |
| Authenticatie        | Dezelfde OAuth-/API-sleutelverbinding als voor chat (`provider_connections.provider = "cursor"`) |
| Modellen             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                        |

## Waarom de Agent CLI

Cursor-chat in OmniRoute gebruikt `agent.v1.AgentService/Run` (protobuf). Dat pad **weigert** ingebouwde clienttools (shell, write, …). Beeldgeneratie is een Cursor-eigen tool die door de **`agent` CLI** wordt uitgevoerd voor de seat. De afbeeldingshandler start daarom `agent` met een vergrendelde prompt en een tijdelijke werkruimte per aanvraag (dezelfde opzet als community-seatbridges) en retourneert vervolgens OpenAI-compatibele `b64_json`.

## Toegangsbeperking (harde regels #15 + #17)

Dit is de enige `IMAGE_PROVIDERS`-indeling die een onderliggend proces start (het binaire
bestand `agent`). Omdat `POST /v1/images/generations` wordt gedeeld door circa 40 andere
afbeeldingsproviders die geen processen starten en die externe aanroepers rechtmatig
gebruiken, is de volledige route **niet** geclassificeerd als `LOCAL_ONLY` — in plaats
daarvan dwingt `handleCursorAgentImageGeneration` een eigen toegangspoort af met behulp
van het vertrouwde `AUTHZ_HEADER_PEER_LOCALITY`-oordeel dat de authz-pijplijn aan elke
aanvraag toevoegt (op basis van de werkelijke TCP-peer, nooit de vervalsbare `Host`-header):
alleen aanroepers vanaf `loopback` en `lan` kunnen het proces starten; alle anderen
(inclusief een gelekte API-sleutel die via een openbare tunnel opnieuw wordt gebruikt)
krijgen een `403` voordat referenties worden opgezocht of een proces wordt gestart. Zie
`src/server/authz/policies/management.ts` voor hetzelfde beleid dat op de rest van de
`LOCAL_ONLY`-laag wordt toegepast.

## De gelijktijdigheidslimiet geldt op moduleniveau (beperking tot één instantie)

`CURSOR_IMG_MAX_CONCURRENT` wordt afgedwongen door een teller/wachtrij in het geheugen
die is gekoppeld aan de Node-module-instantie
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Dit beperkt het aantal gelijktijdig gestarte `agent`-processen binnen één OmniRoute-proces
correct, maar coördineert **niet** tussen meerdere processen/instanties die dezelfde
Cursor-seat delen (bijvoorbeeld een implementatie met meerdere replica's) — elke instantie
dwingt haar eigen onafhankelijke limiet af. Voor een implementatie met één instantie
(de standaardinstelling) is dit exact; horizontaal geschaalde implementaties moeten
`CURSOR_IMG_MAX_CONCURRENT` per instantie conservatief instellen of Cursor-afbeeldingsverkeer
naar één instantie routeren.

## Vereisten

1. Een verbonden Cursor-account in het dashboard (OAuth of een `crsr_…`-API-sleutel).
2. Het binaire bestand Cursor Agent moet beschikbaar zijn voor het OmniRoute-proces:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, of
   - `~/.local/bin/agent`, of
   - `providerSpecificData.agentBin` op de Cursor-verbinding.

Optionele afstemming:

| Omgevingsvariabele          | Standaard                | Betekenis                                     |
| --------------------------- | ------------------------ | --------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Maximale verwerkingstijd per afbeelding       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Gelijktijdigheidslimiet voor de gedeelde seat |
| `CURSOR_IMG_MODEL`          | (aanvraagmodel / `auto`) | Overschrijf `--model` van de CLI              |

## Voorbeeld

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Genereren duurt doorgaans 1–2 minuten. Gebruik bij voorkeur een intern netwerkpad; edgeproxies met time-outs van circa 100 seconden zullen mislukken.

## LiteLLM

Registreer een afbeeldingsmodel met `mode: image_generation`, `api_base: http://omniroute:20128/v1` en `model: openai/cursor/auto` (of alleen `cursor/auto`, afhankelijk van uw LiteLLM-versie).
