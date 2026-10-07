# Cursor Image Generation (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, ചാറ്റിനായി ഉപയോഗിക്കുന്ന അതേ പ്രൊവൈഡർ id ആയ `cursor` (`cu` എന്ന അപരനാമം) വഴി `POST /v1/images/generations`-ൽ Cursor പ്ലാനിലെ **ഇമേജ് ജനറേഷൻ** ലഭ്യമാക്കുന്നു.

| ഫീൽഡ്                | മൂല്യം                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                 |
| ഫോർമാറ്റ്            | `cursor-agent-image`                                                                     |
| ഓതന്റിക്കേഷൻ         | ചാറ്റിലേതിന് സമാനമായ OAuth / API-key കണക്ഷൻ (`provider_connections.provider = "cursor"`) |
| മോഡലുകൾ              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                |

## Agent CLI ഉപയോഗിക്കുന്നത് എന്തുകൊണ്ട്

OmniRoute-ലെ Cursor ചാറ്റ് `agent.v1.AgentService/Run` (protobuf) ഉപയോഗിക്കുന്നു. ആ പാത ബിൽറ്റ്-ഇൻ ക്ലയന്റ് ടൂളുകളെ (shell, write, …) **നിരസിക്കുന്നു**. ഇമേജ് ജനറേഷൻ എന്നത് സീറ്റിനെതിരെ **`agent` CLI** നിർവഹിക്കുന്ന Cursor-നേറ്റീവ് ടൂളാണ്. അതിനാൽ, ഇമേജ് ഹാൻഡ്ലർ ലോക്ക് ചെയ്ത പ്രോംപ്റ്റും ഓരോ അഭ്യർത്ഥനയ്ക്കുമുള്ള താൽക്കാലിക വർക്ക്സ്പേസും ഉപയോഗിച്ച് `agent` ആരംഭിക്കുന്നു (കമ്മ്യൂണിറ്റി സീറ്റ് ബ്രിഡ്ജുകളുടെ അതേ ഘടനയിൽ), തുടർന്ന് OpenAI-അനുയോജ്യമായ `b64_json` നൽകുന്നു.

## ആക്സസ് നിയന്ത്രണം (കർശന നിയമങ്ങൾ #15 + #17)

ചൈൽഡ് പ്രോസസ് (`agent` ബൈനറി) ആരംഭിക്കുന്ന ഒരേയൊരു `IMAGE_PROVIDERS` ഫോർമാറ്റ് ഇതാണ്. `POST /v1/images/generations` എന്നത് റിമോട്ട് കോളർമാർ നിയമാനുസൃതമായി ഉപയോഗിക്കുന്ന, പ്രോസസ് ആരംഭിക്കാത്ത മറ്റ് ഏകദേശം 40 ഇമേജ് പ്രൊവൈഡർമാർ പങ്കിടുന്നതിനാൽ, മുഴുവൻ റൂട്ടും **`LOCAL_ONLY`** ആയി വർഗ്ഗീകരിച്ചിട്ടില്ല — പകരം, എല്ലാ അഭ്യർത്ഥനകളിലും authz പൈപ്പ്ലൈൻ രേഖപ്പെടുത്തുന്ന വിശ്വസനീയമായ `AUTHZ_HEADER_PEER_LOCALITY` വിധി ഉപയോഗിച്ച് `handleCursorAgentImageGeneration` സ്വന്തം ഗേറ്റ് നടപ്പാക്കുന്നു (സ്പൂഫ് ചെയ്യാവുന്ന `Host` ഹെഡറിൽ നിന്നല്ല, യഥാർഥ TCP പിയറിൽ നിന്നാണ് ഇത് ലഭിക്കുന്നത്): `loopback`, `lan` കോളർമാർക്ക് മാത്രമേ പ്രോസസ് ആരംഭിക്കുന്ന ഘട്ടത്തിലെത്താനാകൂ; മറ്റെല്ലാവർക്കും (പൊതു ടണലിലൂടെ വീണ്ടും ഉപയോഗിക്കപ്പെടുന്ന ചോർന്ന API കീ ഉൾപ്പെടെ) ക്രെഡൻഷ്യൽ ലുക്കപ്പോ പ്രോസസ് ആരംഭിക്കലോ നടക്കുന്നതിന് മുമ്പ് `403` ലഭിക്കും. ശേഷിക്കുന്ന `LOCAL_ONLY` ടയറിൽ പ്രയോഗിച്ചിരിക്കുന്ന ഇതേ നയത്തിനായി `src/server/authz/policies/management.ts` കാണുക.

## കൺകറൻസി ഗേറ്റ് മൊഡ്യൂൾ-തലത്തിലാണ് (ഒറ്റ ഇൻസ്റ്റൻസ് പരിമിതി)

`CURSOR_IMG_MAX_CONCURRENT` എന്നത് Node മൊഡ്യൂൾ ഇൻസ്റ്റൻസിന്റെ പരിധിയിലുള്ള ഇൻ-മെമ്മറി കൗണ്ടർ/ക്യൂ വഴിയാണ് നടപ്പാക്കുന്നത് (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). ഒരൊറ്റ OmniRoute പ്രോസസിനുള്ളിലെ ഒരേസമയം നടക്കുന്ന `agent` പ്രോസസ് ആരംഭിക്കലുകൾ ഇത് കൃത്യമായി പരിമിതപ്പെടുത്തുന്നു, എന്നാൽ ഒരേ Cursor സീറ്റ് പങ്കിടുന്ന ഒന്നിലധികം പ്രോസസുകൾ/ഇൻസ്റ്റൻസുകൾക്കിടയിൽ ഇത് ഏകോപനം നടത്തില്ല (ഉദാഹരണത്തിന്, ഒന്നിലധികം റെപ്ലിക്കകളുള്ള ഡിപ്ലോയ്മെന്റ്) — ഓരോ ഇൻസ്റ്റൻസും സ്വന്തം സ്വതന്ത്ര പരിധി നടപ്പാക്കുന്നു. ഒറ്റ ഇൻസ്റ്റൻസുള്ള ഡിപ്ലോയ്മെന്റിന് (ഡിഫോൾട്ട്) ഇത് കൃത്യമാണ്; തിരശ്ചീനമായി സ്കെയിൽ ചെയ്ത ഡിപ്ലോയ്മെന്റുകൾ ഓരോ ഇൻസ്റ്റൻസിലെയും `CURSOR_IMG_MAX_CONCURRENT` യാഥാസ്ഥിതികമായി നിലനിർത്തുകയോ Cursor ഇമേജ് ട്രാഫിക് ഒരൊറ്റ ഇൻസ്റ്റൻസിലേക്ക് റൂട്ട് ചെയ്യുകയോ വേണം.

## ആവശ്യകതകൾ

1. ഡാഷ്ബോർഡിൽ കണക്റ്റ് ചെയ്ത Cursor അക്കൗണ്ട് (OAuth അല്ലെങ്കിൽ `crsr_…` API കീ).
2. OmniRoute പ്രോസസിന് ലഭ്യമായ Cursor Agent ബൈനറി:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, അല്ലെങ്കിൽ
   - `~/.local/bin/agent`, അല്ലെങ്കിൽ
   - Cursor കണക്ഷനിലെ `providerSpecificData.agentBin`.

ഐച്ഛിക ക്രമീകരണം:

| Env                         | ഡിഫോൾട്ട്                     | അർത്ഥം                              |
| --------------------------- | ----------------------------- | ----------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                      | ഓരോ ഇമേജിനുമുള്ള വാൾ-ക്ലോക്ക് സമയം  |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                           | പങ്കിട്ട സീറ്റിനുള്ള കൺകറൻസി ഗേറ്റ് |
| `CURSOR_IMG_MODEL`          | (അഭ്യർത്ഥനയിലെ മോഡൽ / `auto`) | CLI `--model` ഓവർറൈഡ് ചെയ്യുക       |

## ഉദാഹരണം

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ജനറേഷന് സാധാരണയായി 1–2 മിനിറ്റ് എടുക്കും. ആന്തരിക നെറ്റ്വർക്ക് പാതയ്ക്ക് മുൻഗണന നൽകുക; ഏകദേശം 100 സെക്കൻഡ് ടൈംഔട്ടുള്ള എഡ്ജ് പ്രോക്സികൾ പരാജയപ്പെടും.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, `model: openai/cursor/auto` എന്നിവ ഉപയോഗിച്ച് ഒരു ഇമേജ് മോഡൽ രജിസ്റ്റർ ചെയ്യുക (അല്ലെങ്കിൽ നിങ്ങളുടെ LiteLLM പതിപ്പിനെ ആശ്രയിച്ച് `cursor/auto` മാത്രം ഉപയോഗിക്കുക).
