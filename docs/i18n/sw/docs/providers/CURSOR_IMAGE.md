# Cursor Image Generation (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute huwezesha **utengenezaji wa picha** wa mpango wa Cursor kwenye `POST /v1/images/generations` kupitia kitambulisho kilekile cha mtoa huduma kama gumzo: `cursor` (lakabu `cu`).

| Sehemu                             | Thamani                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Kitambulisho cha `IMAGE_PROVIDERS` | `cursor`                                                                                             |
| Umbizo                             | `cursor-agent-image`                                                                                 |
| Uthibitishaji                      | Muunganisho uleule wa OAuth / ufunguo wa API kama gumzo (`provider_connections.provider = "cursor"`) |
| Miundo                             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                            |

## Kwa nini Agent CLI

Gumzo la Cursor katika OmniRoute hutumia `agent.v1.AgentService/Run` (protobuf). Njia hiyo **hukataa** zana zilizojengewa ndani za mteja (shell, write, …). Utengenezaji wa picha ni zana asili ya Cursor inayotekelezwa na **CLI ya `agent`** dhidi ya nafasi ya leseni. Kwa hivyo, kishughulikiaji cha picha huanzisha `agent` kwa kidokezo kilichofungwa na nafasi ya kazi ya muda kwa kila ombi (kwa muundo sawa na madaraja ya nafasi za leseni ya jumuiya), kisha hurejesha `b64_json` inayooana na OpenAI.

## Kizuizi cha ufikiaji (Kanuni Ngumu #15 + #17)

Hili ndilo umbizo pekee la `IMAGE_PROVIDERS` linaloanzisha mchakato mtoto (faili tekelezi ya `agent`). Kwa sababu `POST /v1/images/generations` hutumiwa kwa pamoja na watoa huduma wengine takribani 40 wa picha ambao hawaanzishi michakato na ambao wapigaji simu wa mbali huwatumia kihalali, njia nzima **haijaainishwa** kama `LOCAL_ONLY` — badala yake, `handleCursorAgentImageGeneration` hutekeleza kizuizi chake yenyewe kwa kutumia uamuzi unaoaminika wa `AUTHZ_HEADER_PEER_LOCALITY` ambao mchakato wa authz huweka kwenye kila ombi (kutokana na rika halisi la TCP, kamwe si kichwa cha `Host` kinachoweza kughushiwa): ni wapigaji simu wa `loopback` na `lan` pekee wanaoweza kufikia uanzishaji wa mchakato; wengine wote (ikiwemo ufunguo wa API uliovuja na kutumiwa tena kupitia handaki la umma) hupokea `403` kabla ya utafutaji wowote wa kitambulisho au uanzishaji wa mchakato kufanyika. Angalia `src/server/authz/policies/management.ts` kwa sera hiyohiyo inayotumika kwa sehemu nyingine ya daraja la `LOCAL_ONLY`.

## Kizuizi cha urudufishaji kiko katika kiwango cha moduli (kikomo cha instansi moja)

`CURSOR_IMG_MAX_CONCURRENT` hutekelezwa na kihesabu/foleni ya ndani ya kumbukumbu iliyowekewa upeo wa instansi ya moduli ya Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Huweka kikomo kwa usahihi kwa uanzishaji wa michakato ya `agent` unaofanyika kwa wakati mmoja ndani ya mchakato mmoja wa OmniRoute, lakini **hairatibu** kati ya michakato/instansi nyingi zinazotumia nafasi ileile ya leseni ya Cursor (kwa mfano, usambazaji wenye nakala nyingi) — kila instansi hutekeleza kikomo chake huru. Kwa usambazaji wa instansi moja (chaguo-msingi), hiki ni sahihi kabisa; usambazaji uliopanuliwa mlalo unapaswa kuweka `CURSOR_IMG_MAX_CONCURRENT` katika kiwango cha tahadhari kwa kila instansi au kuelekeza trafiki ya picha za Cursor kwenye instansi moja.

## Mahitaji

1. Akaunti ya Cursor iliyounganishwa katika dashibodi (OAuth au ufunguo wa API wa `crsr_…`).
2. Faili tekelezi ya Cursor Agent ipatikane kwa mchakato wa OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, au
   - `~/.local/bin/agent`, au
   - `providerSpecificData.agentBin` kwenye muunganisho wa Cursor.

Urekebishaji wa hiari:

| Env                         | Chaguo-msingi             | Maana                                                       |
| --------------------------- | ------------------------- | ----------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                  | Muda halisi wa kila picha                                   |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                       | Kizuizi cha urudufishaji wa nafasi ya leseni inayoshirikiwa |
| `CURSOR_IMG_MODEL`          | (muundo wa ombi / `auto`) | Batilisha `--model` ya CLI                                  |

## Mfano

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Utengenezaji kwa kawaida huchukua dakika 1–2. Pendelea njia ya mtandao wa ndani; proksi za ukingoni zenye muda wa kuisha wa takribani sekunde 100 zitashindwa.

## LiteLLM

Sajili muundo wa picha kwa `mode: image_generation`, `api_base: http://omniroute:20128/v1`, na `model: openai/cursor/auto` (au `cursor/auto` pekee kulingana na toleo lako la LiteLLM).
