# Cursor Image Generation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute tilbyr Cursor-planens **bildegenerering** på `POST /v1/images/generations` gjennom samme leverandør-ID som chat: `cursor` (alias `cu`).

| Felt                 | Verdi                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-ID | `cursor`                                                                                |
| Format               | `cursor-agent-image`                                                                    |
| Autentisering        | Samme OAuth-/API-nøkkeltilkobling som chat (`provider_connections.provider = "cursor"`) |
| Modeller             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                               |

## Hvorfor Agent CLI

Cursor-chat i OmniRoute bruker `agent.v1.AgentService/Run` (protobuf). Denne metoden **avviser** innebygde klientverktøy (shell, write, …). Bildegenerering er et Cursor-integrert verktøy som kjøres av **`agent` CLI** mot lisensplassen. Bildebehandleren starter derfor `agent` med en låst ledetekst og et midlertidig arbeidsområde per forespørsel (samme oppsett som fellesskapsbaserte lisensplassbroer), og returnerer deretter OpenAI-kompatibel `b64_json`.

## Tilgangsbegrensning (ufravikelige regler nr. 15 og 17)

Dette er det eneste `IMAGE_PROVIDERS`-formatet som starter en underprosess (`agent`-binærfilen). Fordi `POST /v1/images/generations` deles av rundt 40 andre bildeleverandører som ikke starter prosesser, og som eksterne kallere legitimt bruker, klassifiseres ikke hele ruten som **`LOCAL_ONLY`**. I stedet håndhever `handleCursorAgentImageGeneration` sin egen tilgangskontroll ved hjelp av den klarerte `AUTHZ_HEADER_PEER_LOCALITY`-avgjørelsen som autorisasjonsprosessen merker hver forespørsel med (basert på den faktiske TCP-motparten, aldri det forfalskbare `Host`-hodet): Bare kallere fra `loopback` og `lan` kan starte prosessen. Alle andre (inkludert en lekket API-nøkkel som gjenbrukes gjennom en offentlig tunnel) får `403` før det utføres legitimasjonsoppslag eller prosessoppstart. Se `src/server/authz/policies/management.ts` for den samme policyen brukt på resten av `LOCAL_ONLY`-nivået.

## Samtidighetskontrollen er på modulnivå (begrensning for enkeltinstanser)

`CURSOR_IMG_MAX_CONCURRENT` håndheves av en teller/kø i minnet som er avgrenset til Node-modulinstansen (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Den begrenser antallet samtidige `agent`-prosesser korrekt innenfor én OmniRoute-prosess, men koordinerer **ikke** mellom flere prosesser/instanser som deler samme Cursor-lisensplass (f.eks. en distribusjon med flere replikaer) — hver instans håndhever sin egen uavhengige grense. For en distribusjon med én instans (standarden) er dette nøyaktig. Horisontalt skalerte distribusjoner bør bruke en konservativ verdi for `CURSOR_IMG_MAX_CONCURRENT` per instans eller rute Cursor-bildetrafikk til én enkelt instans.

## Krav

1. En tilkoblet Cursor-konto i kontrollpanelet (OAuth eller API-nøkkel av typen `crsr_…`).
2. Cursor Agent-binærfilen må være tilgjengelig for OmniRoute-prosessen:
   - miljøvariabelen `CURSOR_AGENT_BIN=/path/to/agent`, eller
   - `~/.local/bin/agent`, eller
   - `providerSpecificData.agentBin` på Cursor-tilkoblingen.

Valgfri finjustering:

| Miljøvariabel               | Standard                            | Betydning                                 |
| --------------------------- | ----------------------------------- | ----------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                            | Maksimal kjøretid per bilde               |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                                 | Samtidighetskontroll for delt lisensplass |
| `CURSOR_IMG_MODEL`          | (modell fra forespørselen / `auto`) | Overstyr `--model` for CLI                |

## Eksempel

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generering tar vanligvis 1–2 minutter. Bruk helst en intern nettverksrute. Kantproxyer med tidsavbrudd på rundt 100 sekunder vil mislykkes.

## LiteLLM

Registrer en bildemodell med `mode: image_generation`, `api_base: http://omniroute:20128/v1` og `model: openai/cursor/auto` (eller bare `cursor/auto`, avhengig av LiteLLM-versjonen din).
