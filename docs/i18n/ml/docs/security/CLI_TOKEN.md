# CLI Machine-ID Token (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## അവലോകനം

OmniRoute CLI കമാൻഡുകൾ പ്രാദേശിക മാനേജ്മെന്റ് API-യുമായി പ്രാമാണീകരിക്കുന്നത്
`x-omniroute-cli-token` അഭ്യർത്ഥനാ ഹെഡർ വഴി അയയ്ക്കുന്ന
`HMAC-SHA256(machine-id, salt)` ടോക്കൺ ഉപയോഗിച്ചാണ്.

ഓരോ തവണ പ്രവർത്തിപ്പിക്കുമ്പോഴും ഉപയോക്താവ് JWT അല്ലെങ്കിൽ പാസ്വേഡ് നൽകേണ്ടതില്ലാതെ
മാനേജ്മെന്റ് എൻഡ്പോയിന്റുകൾ വിളിക്കാൻ CLI ഉപകമാൻഡുകളെ (`omniroute status`,
`omniroute providers` തുടങ്ങിയവ) ഇത് അനുവദിക്കുന്നു.

## ഇത് പ്രവർത്തിക്കുന്ന വിധം

1. `getMachineTokenSync()`, `node-machine-id` വഴി ഹാർഡ്വെയർ മെഷീൻ ID വായിക്കുന്നു
   (പരാജയപ്പെടുകയാണെങ്കിൽ ശൂന്യമായ സ്ട്രിംഗ് ഉപയോഗിക്കുന്നു, ഇതിലൂടെ CLI പ്രാമാണീകരണം
   പ്രവർത്തനരഹിതമാകുന്നു).
2. ഇത് `HMAC-SHA256(machine_id, salt)` കണക്കാക്കി പൂർണ്ണമായ 64-പ്രതീകങ്ങളുള്ള
   ഹെക്സ് ഡൈജസ്റ്റ് മടക്കി നൽകുന്നു — ഈ മെഷീനുമായി ബന്ധിപ്പിച്ചിട്ടുള്ള, നിർണായകവും
   തിരിച്ച് കണ്ടെത്താനാവാത്തതുമായ ഒരു ടോക്കൺ.
3. പരിഹരിക്കപ്പെട്ട ലക്ഷ്യസ്ഥാനം വ്യക്തമായ ഒരു ലൂപ്പ്ബാക്ക് URL (`localhost`,
   `127.0.0.0/8`, അല്ലെങ്കിൽ ലൂപ്പ്ബാക്ക് IPv6) ആയിരിക്കുമ്പോൾ മാത്രം CLI ടോക്കൺ
   `x-omniroute-cli-token` ആയി അയയ്ക്കുന്നു. ടോക്കൺ ഉൾക്കൊള്ളുന്ന അഭ്യർത്ഥനകൾ
   `redirect: error` ഉപയോഗിക്കുന്നതിനാൽ, ഒരു പ്രാദേശിക റീഡയറക്ടിന് അത് മറ്റൊരു
   ഒറിജിനിലേക്ക് ഫോർവേഡ് ചെയ്യാനാവില്ല. റിമോട്ട് കോൺടെക്സ്റ്റുകൾ പകരം
   സ്കോപ്പ് ചെയ്ത ആക്സസ് ടോക്കണുകൾ ഉപയോഗിക്കുന്നു. ടോക്കൺ നിർമാണം ലഭ്യമല്ലെങ്കിൽ,
   CLI ഹെഡർ ഒഴിവാക്കുകയും ശൂന്യമായ ടോക്കണിനെ സാധുവായി കണക്കാക്കുന്നതിനുപകരം
   `omniroute doctor` പരാജയം റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യുന്നു.
4. സെർവർ (`src/server/authz/policies/management.ts`) അതേ സാൾട്ട് ഉപയോഗിച്ച്
   പ്രതീക്ഷിക്കുന്ന ടോക്കൺ വീണ്ടും കണക്കാക്കുകയും സമയത്തെ അടിസ്ഥാനമാക്കിയുള്ള
   വേർതിരിച്ചെടുക്കൽ തടയാൻ `timingSafeEqual` വഴി താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു.

## സുരക്ഷാ സവിശേഷതകൾ

| സവിശേഷത                            | വിശദാംശം                                                                                                                                                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ലൂപ്പ്ബാക്കിൽ മാത്രം**           | സെർവറിന്റെ വിശ്വസനീയമായ പിയർ-ലോക്കാലിറ്റി സ്റ്റാമ്പ് (യഥാർഥ TCP പിയർ വിലാസത്തിൽനിന്ന് നിർണയിക്കുന്നത്) ലൂപ്പ്ബാക്ക് ആണെന്ന് സൂചിപ്പിക്കുമ്പോൾ മാത്രം സ്വീകരിക്കുന്നു. ക്ലയന്റ് നിയന്ത്രിക്കുന്ന `Host` ഹെഡറിനെ ലോക്കാലിറ്റി നിർണയിക്കാൻ ഒരിക്കലും വിശ്വസിക്കുന്നില്ല. |
| **സ്ഥിര-സമയ താരതമ്യം**             | `crypto.timingSafeEqual` ടൈമിംഗ് ആക്രമണങ്ങൾ തടയുന്നു.                                                                                                                                                                                                                 |
| **തിരിച്ച് കണ്ടെത്താനാവാത്തത്**    | HMAC ഔട്ട്പുട്ടിൽനിന്ന് machine-id വീണ്ടെടുക്കാനാവില്ല.                                                                                                                                                                                                               |
| **`always`-പരിരക്ഷിത ബൈപാസ് ഇല്ല** | CLI ടോക്കൺ പരിശോധിക്കുന്നതിന് മുമ്പ് `isAlwaysProtectedPath()` വിലയിരുത്തുന്നു. `/api/shutdown`, `/api/settings/database` എന്നിവയ്ക്ക് എല്ലായ്പ്പോഴും JWT ആവശ്യമാണ്.                                                                                                  |
| **എക്സ്പോർട്ട് ചെയ്യാനാവാത്തത്**   | ടോക്കൺ ഒരിക്കലും ഡിസ്കിലേക്ക് എഴുതുകയോ ലോഗ് ചെയ്യുകയോ ചെയ്യുന്നില്ല.                                                                                                                                                                                                  |

## ഡിഫോൾട്ട് സാൾട്ട് (ഓരോ ഇൻസ്റ്റാളിലും ക്രമരഹിതം)

`OMNIROUTE_CLI_SALT` സജ്ജീകരിച്ചിട്ടില്ലെങ്കിൽ, സാൾട്ട് ഒരിക്കൽ സൃഷ്ടിച്ച്
`<DATA_DIR>/cli-token-salt.json`-ൽ (മോഡ് `0600`) സ്ഥിരമായി സൂക്ഷിക്കുന്ന,
ക്രമരഹിതമായ 64-പ്രതീകങ്ങളുള്ള ഹെക്സ് സ്ട്രിംഗായിരിക്കും — റിപ്പോസിറ്ററിയിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന
`omniroute-cli-auth-v1` എന്ന ലിറ്ററൽ അല്ല. `src/lib/machineToken.ts`-ലെ
`getActiveSalt()`-ഉം `bin/cli/utils/cliToken.mjs`-ലെ അതിന്റെ പകർപ്പും ഒരേ
ഫയൽ വായിക്കുന്നതിനാൽ, ഈ ഇൻസ്റ്റാളിലെ സെർവറും ഓരോ CLI പ്രവർത്തനവും ഒരേ മൂല്യത്തിൽ
ഒത്തുചേരുന്നു; സ്ഥിരമായി സൂക്ഷിച്ച സാൾട്ടോ എൻവയോ ഇതുവരെ സ്ഥാപിക്കാനാകാത്തപ്പോൾ മാത്രം
റിപ്പോസിറ്ററിയിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന ലിറ്ററൽ അവസാന ആശ്രയമായി ഉപയോഗിക്കുന്നു
(ഉദാഹരണത്തിന്, സെർവർ ഇതുവരെ പ്രവർത്തിപ്പിച്ചിട്ടില്ലാത്ത ഒരു പുതിയ CLI-മാത്രമുള്ള ഇൻസ്റ്റാൾ).
ഇത് പഴയ സ്ഥിരമായ ലിറ്ററൽ ഡിഫോൾട്ടിന്റെ ഒരു ദൗർബല്യം പരിഹരിക്കുന്നു:
`/etc/machine-id` സാധാരണയായി എല്ലാവർക്കും വായിക്കാനാകുന്നതാണ്, അതിനാൽ
`OMNIROUTE_CLI_SALT` ഒരിക്കലും സജ്ജീകരിച്ചിട്ടില്ലാത്ത ഓരോ ഇൻസ്റ്റാളിനും ഏതൊരു
പ്രാദേശിക ഉപയോക്താവിനും അതേ ടോക്കൺ നിർമിക്കാനാകുമായിരുന്നു.

## സാൾട്ട് റൊട്ടേഷൻ

കോഡ് മാറ്റങ്ങളില്ലാതെ ഡെറൈവ് ചെയ്ത ടോക്കൺ റൊട്ടേറ്റ് ചെയ്യാൻ `OMNIROUTE_CLI_SALT` സജ്ജമാക്കുക — സ്ഥിരമായി സൂക്ഷിച്ചിരിക്കുന്ന ഓരോ ഇൻസ്റ്റാളേഷനിലെയും സാൾട്ടിനെക്കാൾ ഇതിന് എല്ലായ്പ്പോഴും മുൻഗണനയുണ്ട്. റൊട്ടേഷനുശേഷം, ഈ മെഷീനിലെ എല്ലാ CLI പ്രോസസ്സുകളും പുതിയ ടോക്കൺ സ്വയമേവ ഉപയോഗിക്കും. മുമ്പ് ഡെറൈവ് ചെയ്ത മൂല്യം വെളിപ്പെടുത്തിയിരിക്കാനിടയുള്ള ഒരു പ്രോസസ്-ലിസ്റ്റ് ചോർച്ചയ്ക്കുശേഷം ഇത് ഉപകാരപ്രദമാണ്.

```bash
# സ്ഥിരമായ റൊട്ടേഷൻ (ഷെൽ പ്രൊഫൈലിലേക്ക് ചേർക്കുക)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# പുതിയ ടോക്കൺ ഉപയോഗത്തിലുണ്ടെന്ന് പരിശോധിക്കുക
omniroute status
```

## ലെഗസി ഫോർമാറ്റ് (SHA-256, 32 പ്രതീകങ്ങൾ) — ഇപ്പോഴും സ്വീകരിക്കുന്നു

മുകളിലുള്ള HMAC ഫോർമാറ്റിന് മുമ്പ്, CLI അതിന്റെ ടോക്കൺ
`SHA-256(machineId + salt).hex[0..32]` (`bin/cli/utils/cliToken.mjs`-ൽ ഒരു 32-പ്രതീക പ്രിഫിക്സ്; `src/lib/machineToken.ts`-ൽ `getLegacyCliTokenSync`) ആയി ഡെറൈവ് ചെയ്തിരുന്നു.

പിന്നോട്ടുള്ള അനുയോജ്യതയ്ക്കായി സെർവർ **രണ്ട്** ഫോർമാറ്റുകളും സ്വീകരിക്കുന്നു: വെരിഫയർ
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` നിർമ്മിക്കുകയും ഇൻകമിങ് ഹെഡറിനെ ഓരോന്നുമായും `timingSafeEqual` ഉപയോഗിച്ച് താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു
(`src/server/authz/policies/management.ts`, `src/lib/middleware/cliTokenAuth.ts` എന്നിവയിൽ).
അതുകൊണ്ട്, ഒരു ടോക്കൺ 64-പ്രതീക HMAC ഡൈജസ്റ്റുമായോ 32-പ്രതീക ലെഗസി SHA-256 പ്രിഫിക്സുമായോ **ഏതെങ്കിലും ഒന്നുമായി** പൊരുത്തപ്പെടുന്നുവെങ്കിൽ അത് സാധുവാണ്.

**ഒഴിവാക്കൽ:** CLI ടോക്കൺ സംവിധാനം പൂർണ്ണമായും പ്രവർത്തനരഹിതമാക്കാൻ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env അല്ലെങ്കിൽ `.env`) സജ്ജമാക്കുക; തുടർന്ന് എല്ലാ ആക്സസിനും വ്യക്തമായി നൽകിയ API കീ ആവശ്യമാണ്. `machine-id` ഓരോ ഉപയോക്താവിനുമല്ല, ഓരോ ഉപകരണത്തിനുമുള്ളതായതിനാൽ, ഒരേ ഹോസ്റ്റിലെ മറ്റൊരു ഉപയോക്താവിന് അതേ ടോക്കൺ കണക്കാക്കാൻ കഴിയാം; അതിനാൽ മൾട്ടി-യൂസർ ഹോസ്റ്റുകളിൽ ഇത് ശുപാർശ ചെയ്യുന്നു.

## ഫയലുകൾ

| ഫയൽ                                       | ഉദ്ദേശ്യം                                                          |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `src/lib/machineToken.ts`                 | ടോക്കൺ ഡെറൈവേഷൻ (`getMachineTokenSync`)                            |
| `bin/cli/utils/cliToken.mjs`              | അതേ ഡെറൈവേഷന്റെ CLI-വശ മിറർ                                        |
| `<DATA_DIR>/cli-token-salt.json`          | ഓരോ ഇൻസ്റ്റാളേഷനിലെയും സ്ഥിരമായി സൂക്ഷിച്ചിരിക്കുന്ന റാൻഡം സാൾട്ട് |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` സ്ഥിരാങ്കം                                      |
| `src/server/authz/policies/management.ts` | സെർവർ-വശ വെരിഫിക്കേഷൻ                                              |
| `src/server/authz/routeGuard.ts`          | ലൂപ്പ്ബാക്ക് ഹോസ്റ്റ് പരിശോധന (`isLoopbackHost`)                   |

## ഇതും കാണുക

- `docs/security/ROUTE_GUARD_TIERS.md` — റൂട്ട് സംരക്ഷണ ടിയറുകൾ
- `docs/architecture/AUTHZ_GUIDE.md` — പൂർണ്ണ ഓതറൈസേഷൻ പൈപ്പ്ലൈൻ
