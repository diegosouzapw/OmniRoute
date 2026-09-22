# Cursor Image Generation (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

Inilalantad ng OmniRoute ang **pagbuo ng larawan** ng Cursor plan sa `POST /v1/images/generations` gamit ang parehong provider id gaya ng chat: `cursor` (alias na `cu`).

| Field                | Value                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                        |
| Format               | `cursor-agent-image`                                                                            |
| Auth                 | Parehong koneksyon ng OAuth / API key gaya ng chat (`provider_connections.provider = "cursor"`) |
| Models               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                       |

## Bakit ang Agent CLI

Ginagamit ng Cursor chat sa OmniRoute ang `agent.v1.AgentService/Run` (protobuf). **Tinatanggihan** ng path na iyon ang mga built-in na client tool (shell, write, …). Ang pagbuo ng larawan ay isang Cursor-native na tool na isinasagawa ng **`agent` CLI** gamit ang seat. Samakatuwid, pinapatakbo ng image handler ang `agent` gamit ang isang naka-lock na prompt at pansamantalang workspace para sa bawat request (kaparehong anyo ng mga community seat bridge), at pagkatapos ay nagbabalik ng OpenAI-compatible na `b64_json`.

## Paghihigpit sa access (Hard Rules #15 + #17)

Ito lamang ang format ng `IMAGE_PROVIDERS` na nagpapatakbo ng child process (ang `agent`
binary). Dahil ang `POST /v1/images/generations` ay pinagsasaluhan ng ~40 iba pang image
provider na hindi nagpapatakbo ng process at lehitimong ginagamit ng mga remote caller,
ang buong route ay **hindi** inuuri bilang `LOCAL_ONLY` — sa halip, nagpapatupad ang
`handleCursorAgentImageGeneration` ng sarili nitong gate gamit ang pinagkakatiwalaang
`AUTHZ_HEADER_PEER_LOCALITY` verdict na inilalagay ng authz pipeline sa bawat request
(mula sa tunay na TCP peer, at hindi kailanman mula sa napeke na `Host` header): tanging
mga caller na `loopback` at `lan` lamang ang maaaring umabot sa pag-spawn; ang lahat ng
iba pa (kabilang ang isang na-leak na API key na muling ginamit sa isang pampublikong
tunnel) ay makakatanggap ng `403` bago mangyari ang anumang credential lookup o
process spawn. Tingnan ang `src/server/authz/policies/management.ts` para sa parehong
patakarang inilalapat sa natitirang bahagi ng `LOCAL_ONLY` tier.

## Nasa antas ng module ang concurrency gate (limitasyon ng iisang instance)

Ang `CURSOR_IMG_MAX_CONCURRENT` ay ipinapatupad ng isang in-memory na counter/queue na
nakatalaga sa instance ng Node module
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Wasto nitong nililimitahan ang magkakasabay na pag-spawn ng `agent` sa loob ng iisang
proseso ng OmniRoute, ngunit **hindi** ito nakikipag-coordinate sa maraming
proseso/instance na gumagamit ng parehong Cursor seat (hal. isang multi-replica na
deployment) — ipinapatupad ng bawat instance ang sarili nitong hiwalay na limitasyon.
Para sa single-instance na deployment (ang default), eksakto ito; sa mga horizontally
scaled na deployment, dapat panatilihing konserbatibo ang
`CURSOR_IMG_MAX_CONCURRENT` sa bawat instance o i-route ang Cursor image traffic sa
iisang instance.

## Mga kinakailangan

1. Isang nakakonektang Cursor account sa dashboard (OAuth o `crsr_…` API key).
2. Ang Cursor Agent binary na available sa proseso ng OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, o
   - `~/.local/bin/agent`, o
   - `providerSpecificData.agentBin` sa koneksyon ng Cursor.

Opsyonal na pag-tune:

| Env                         | Default                  | Kahulugan                                |
| --------------------------- | ------------------------ | ---------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Wall clock para sa bawat larawan         |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Concurrency gate ng pinagsasaluhang seat |
| `CURSOR_IMG_MODEL`          | (request model / `auto`) | I-override ang CLI `--model`             |

## Halimbawa

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Karaniwang tumatagal nang 1–2 minuto ang pagbuo. Mas mainam ang internal network path; mabibigo ang mga edge proxy na may ~100s na timeout.

## LiteLLM

Magrehistro ng image model gamit ang `mode: image_generation`, `api_base: http://omniroute:20128/v1`, at `model: openai/cursor/auto` (o ang simpleng `cursor/auto` depende sa iyong bersyon ng LiteLLM).
