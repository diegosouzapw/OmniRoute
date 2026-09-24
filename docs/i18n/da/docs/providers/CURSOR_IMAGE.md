# Cursor Image Generation (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute gør Cursor-abonnementets **billedgenerering** tilgængelig på `POST /v1/images/generations` via samme udbyder-id som chat: `cursor` (alias `cu`).

| Felt                 | Værdi                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-id | `cursor`                                                                                |
| Format               | `cursor-agent-image`                                                                    |
| Godkendelse          | Samme OAuth-/API-nøgleforbindelse som chat (`provider_connections.provider = "cursor"`) |
| Modeller             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                               |

## Hvorfor Agent CLI

Cursor-chat i OmniRoute bruger `agent.v1.AgentService/Run` (protobuf). Denne sti **afviser** indbyggede klientværktøjer (shell, write, …). Billedgenerering er et Cursor-specifikt værktøj, der køres af **`agent` CLI** mod licensen. Billedhåndteringen starter derfor `agent` med en låst prompt og et midlertidigt arbejdsområde pr. anmodning (samme struktur som community-baserede licensbroer) og returnerer derefter OpenAI-kompatibel `b64_json`.

## Adgangsbegrænsning (ufravigelige regler nr. 15 + 17)

Dette er det eneste `IMAGE_PROVIDERS`-format, der starter en underproces (`agent`-
binærfilen). Da `POST /v1/images/generations` deles af ca. 40 andre billedudbydere,
som ikke starter processer, og som eksterne klienter legitimt bruger, klassificeres
hele ruten **ikke** som `LOCAL_ONLY` — i stedet håndhæver
`handleCursorAgentImageGeneration` sin egen adgangskontrol ved hjælp af den betroede
`AUTHZ_HEADER_PEER_LOCALITY`-afgørelse, som authz-pipelinen angiver på hver anmodning
(ud fra den faktiske TCP-modpart og aldrig den manipulerbare `Host`-header): Kun
`loopback`- og `lan`-klienter kan nå processtarten. Alle andre (herunder en lækket
API-nøgle, der genbruges via en offentlig tunnel) modtager `403`, før der foretages
opslag af legitimationsoplysninger eller startes en proces. Se
`src/server/authz/policies/management.ts` for den samme politik, der anvendes på resten
af `LOCAL_ONLY`-niveauet.

## Samtidighedskontrollen er på modulniveau (begrænsning til én instans)

`CURSOR_IMG_MAX_CONCURRENT` håndhæves af en tæller/kø i hukommelsen, som er afgrænset
til Node-modulinstansen (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Den begrænser korrekt samtidige starter af `agent` inden for én OmniRoute-proces, men
koordinerer **ikke** på tværs af flere processer/instanser, der deler den samme
Cursor-licens (f.eks. en installation med flere replikaer) — hver instans håndhæver
sin egen uafhængige grænse. For en installation med én instans (standarden) er dette
præcist. Horisontalt skalerede installationer bør angive en konservativ værdi for
`CURSOR_IMG_MAX_CONCURRENT` pr. instans eller dirigere Cursor-billedtrafik til en
enkelt instans.

## Krav

1. En tilsluttet Cursor-konto i kontrolpanelet (OAuth eller `crsr_…`-API-nøgle).
2. Binærfilen Cursor Agent skal være tilgængelig for OmniRoute-processen:
   - miljøvariablen `CURSOR_AGENT_BIN=/path/to/agent`, eller
   - `~/.local/bin/agent`, eller
   - `providerSpecificData.agentBin` på Cursor-forbindelsen.

Valgfri finjustering:

| Miljøvariabel               | Standard                   | Betydning                            |
| --------------------------- | -------------------------- | ------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                   | Tidsgrænse pr. billede               |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                        | Samtidighedskontrol for delt licens  |
| `CURSOR_IMG_MODEL`          | (anmodningsmodel / `auto`) | Tilsidesæt CLI-parameteren `--model` |

## Eksempel

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Genereringen tager typisk 1–2 minutter. Brug helst en intern netværkssti. Edge-proxyer med timeout på ca. 100 sekunder vil fejle.

## LiteLLM

Registrer en billedmodel med `mode: image_generation`, `api_base: http://omniroute:20128/v1` og `model: openai/cursor/auto` (eller blot `cursor/auto`, afhængigt af din LiteLLM-version).
