# Cursor Image Generation (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute jesponi l-**ġenerazzjoni tal-immaġnijiet** tal-pjan Cursor fuq `POST /v1/images/generations` permezz tal-istess id tal-fornitur bħaċ-chat: `cursor` (magħruf ukoll bħala `cu`).

| Qasam                    | Valur                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| id ta’ `IMAGE_PROVIDERS` | `cursor`                                                                                    |
| Format                   | `cursor-agent-image`                                                                        |
| Awtentikazzjoni          | L-istess konnessjoni OAuth / API key bħaċ-chat (`provider_connections.provider = "cursor"`) |
| Mudelli                  | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Għaliex l-Agent CLI

Iċ-chat ta’ Cursor f’OmniRoute juża `agent.v1.AgentService/Run` (protobuf). Dik ir-rotta **tirrifjuta** l-għodod integrati tal-klijent (shell, write, …). Il-ġenerazzjoni tal-immaġnijiet hija għodda nattiva ta’ Cursor eżegwita mill-**`agent` CLI** permezz tal-post allokat. Għalhekk, il-handler tal-immaġnijiet iniedi `agent` bi prompt imsakkar u workspace temporanju għal kull talba (bl-istess struttura bħall-bridges tal-postijiet allokati tal-komunità), imbagħad jirritorna `b64_json` kompatibbli ma’ OpenAI.

## Restrizzjoni tal-aċċess (Regoli Stretti #15 + #17)

Dan huwa l-uniku format ta’ `IMAGE_PROVIDERS` li jniedi proċess sekondarju (il-binarju
`agent`). Minħabba li `POST /v1/images/generations` huwa kondiviż ma’ madwar 40 fornitur
ieħor tal-immaġnijiet li ma jniedux proċessi u li jintużaw b’mod leġittimu minn klijenti remoti,
ir-rotta kollha kemm hi **mhijiex** ikklassifikata bħala `LOCAL_ONLY` — minflok,
`handleCursorAgentImageGeneration` jinforza l-kontroll tiegħu stess billi juża l-verdett fdat
`AUTHZ_HEADER_PEER_LOCALITY` li l-pipeline tal-awtorizzazzjoni jimmarka fuq kull talba
(mill-peer TCP reali, u qatt mill-header `Host` li jista’ jiġi ffalsifikat): huma biss
il-klijenti `loopback` u `lan` li jistgħu jilħqu l-proċess imniedi; kull ħadd ieħor
(inkluża API key mikxufa u użata mill-ġdid permezz ta’ tunnel pubbliku) jirċievi `403`
qabel ma ssir kwalunkwe tfittxija għall-kredenzjali jew jitnieda xi proċess. Ara
`src/server/authz/policies/management.ts` għall-istess politika applikata għall-bqija
tal-livell `LOCAL_ONLY`.

## Il-kontroll tal-konkorrenza huwa fil-livell tal-modulu (limitazzjoni ta’ istanza waħda)

`CURSOR_IMG_MAX_CONCURRENT` jiġi infurzat permezz ta’ counter/queue fil-memorja, limitat
għall-istanza tal-modulu Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Dan jillimita b’mod korrett it-tnedijiet simultanji ta’ `agent` fi ħdan proċess OmniRoute
wieħed, iżda **ma** jikkoordinax bejn diversi proċessi/istanzi li jaqsmu l-istess post
allokat ta’ Cursor (eż. deployment b’diversi repliki) — kull istanza tinforza l-limitu
indipendenti tagħha. Għal deployment b’istanza waħda (il-konfigurazzjoni predefinita),
dan huwa eżatt; deployments skalati orizzontalment għandhom iżommu
`CURSOR_IMG_MAX_CONCURRENT` konservattiv għal kull istanza jew jidderieġu t-traffiku
tal-immaġnijiet ta’ Cursor lejn istanza waħda.

## Rekwiżiti

1. Kont Cursor ikkonnettjat fid-dashboard (OAuth jew API key `crsr_…`).
2. Il-binarju Cursor Agent irid ikun disponibbli għall-proċess OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, jew
   - `~/.local/bin/agent`, jew
   - `providerSpecificData.agentBin` fuq il-konnessjoni Cursor.

Aġġustamenti fakultattivi:

| Env                         | Valur predefinit            | Tifsira                                      |
| --------------------------- | --------------------------- | -------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Limitu ta’ ħin reali għal kull immaġni       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Kontroll tal-konkorrenza għall-post kondiviż |
| `CURSOR_IMG_MODEL`          | (mudell tat-talba / `auto`) | Jissostitwixxi `--model` tal-CLI             |

## Eżempju

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Il-ġenerazzjoni tipikament tieħu bejn minuta u 2 minuti. Ippreferi rotta interna tan-network; edge proxies b’timeouts ta’ madwar 100 sekonda se jfallu.

## LiteLLM

Irreġistra mudell tal-immaġnijiet b’`mode: image_generation`, `api_base: http://omniroute:20128/v1`, u `model: openai/cursor/auto` (jew sempliċement `cursor/auto`, skont il-verżjoni tiegħek ta’ LiteLLM).
