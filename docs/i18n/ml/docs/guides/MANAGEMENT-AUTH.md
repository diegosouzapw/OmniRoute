# Management Authentication (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-ന് മാനേജ്മെൻ്റ് റൂട്ടുകൾക്ക് അംഗീകാരം നൽകാൻ കഴിയുന്ന **നാല് ക്രെഡൻഷ്യൽ കുടുംബങ്ങൾ** ഉണ്ട്.
അവ പരസ്പരം മാറ്റാവുന്നവയല്ല. ഇൻഫറൻസ് API കീകൾ (`sk-…`) സെർവറിനെ നിയന്ത്രിക്കുന്നില്ല,
അവയ്ക്ക് `manage` അല്ലെങ്കിൽ `admin` സ്കോപ്പ് വ്യക്തമായി അനുവദിച്ചിട്ടില്ലെങ്കിൽ.

കാനോനിക്കൽ നടപ്പാക്കൽ: `src/lib/api/requireManagementAuth.ts`.

| ക്രെഡൻഷ്യൽ               | സാധാരണ രൂപം                          | എവിടെയാണ് സൃഷ്ടിച്ചത്                                              | ഉദ്ദേശിച്ച ഉപയോഗം              | മാനേജ്മെൻ്റ് കഴിവ്                                                                                                        |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| ഡാഷ്ബോർഡ് JWT സെഷൻ       | `auth_token` കുക്കി                  | ഡാഷ്ബോർഡ് ലോഗിൻ                                                    | ബ്രൗസർ UI                      | CSRF, ലോക്കാലിറ്റി, എല്ലായ്പ്പോഴും സംരക്ഷിക്കപ്പെട്ട റൂട്ട് നിയമങ്ങൾ എന്നിവയ്ക്ക് വിധേയമായി പൂർണ്ണ ഡാഷ്ബോർഡ് മാനേജ്മെൻ്റ് |
| CLI മെഷീൻ-ഐഡി ടോക്കൺ     | ആന്തരികം / ലോക്കൽ                    | CLI ബൂട്ട്സ്ട്രാപ്പ് (ഒരേ മെഷീനിൽ `omniroute`)                     | ലോക്കൽ CLI                     | ലോക്കൽ മാനേജ്മെൻ്റ് മാത്രം                                                                                                |
| സ്കോപ്പ്ഡ് ആക്സസ് ടോക്കൺ | `oma_live_…`                         | **ക്രമീകരണങ്ങൾ → ആക്സസ് ടോക്കണുകൾ** അല്ലെങ്കിൽ `omniroute connect` | റിമോട്ട് CLI, മാനേജ്മെൻ്റ് API | റൂട്ടിന് ആവശ്യമായ `read`, `write`, അല്ലെങ്കിൽ `admin` സ്കോപ്പ് പാലിക്കണം                                                  |
| ഇൻഫറൻസ് API കീ           | `sk-…` (മറ്റ് API-കീ പ്രിഫിക്സുകളും) | **API മാനേജർ / API കീകൾ**                                          | `/v1/*` ഇൻഫറൻസ്                | കീ മെറ്റാഡാറ്റയിൽ `manage` അല്ലെങ്കിൽ `admin` ഉൾപ്പെടുന്നില്ലെങ്കിൽ **ഒന്നുമില്ല**                                        |

`oma_` ക്രെഡൻഷ്യലുകൾ മാനേജ്മെൻ്റ്/CLI ക്രെഡൻഷ്യലുകളാണ്. അവ ഇൻഫറൻസ് API കീകൾ **അല്ല**.

ലോഗിൻ/API-കീ ഓതൻ്റിക്കേഷൻ സെർവറിനായി പ്രവർത്തനരഹിതമാക്കുകയാണെങ്കിൽ, ചില മാനേജ്മെൻ്റ് റൂട്ടുകൾക്ക്
അംഗീകാരമില്ലാത്ത കോളുകൾ സ്വീകരിക്കാൻ കഴിഞ്ഞേക്കും. ലോക്കൽ-മാത്രം, എല്ലായ്പ്പോഴും സംരക്ഷിക്കപ്പെട്ട റൂട്ടുകൾ
അവയുടെ സ്വന്തം നിയമങ്ങൾ ഇപ്പോഴും പ്രയോഗിക്കുന്നു. അതിനാൽ, ഈ ക്രെഡൻഷ്യലുകളിൽ ഒന്ന് ഹാജരാക്കുന്നത്
സാർവത്രികമായി നിർബന്ധമല്ല, കൂടാതെ ആവശ്യമായ സ്കോപ്പും റൂട്ട് ലോക്കാലിറ്റിയും ഇല്ലാതെ ഒന്ന് കൈവശം
വെക്കുന്നത് സാർവത്രികമായി പര്യാപ്തവുമല്ല.

ബന്ധപ്പെട്ടത്: [റിമോട്ട് മോഡ്](./REMOTE-MODE.md) (ഒരു റിമോട്ട് CLI-യ്ക്കായി `oma_live_…` എങ്ങനെ മിൻ്റ് ചെയ്യുന്നു).

---

## സ്കോപ്പ് മാട്രിക്സുകൾ

API-കീ മാനേജ്മെൻ്റ് സ്കോപ്പുകളും ആക്സസ്-ടോക്കൺ സ്കോപ്പുകളും വ്യത്യസ്ത പദാവലികളാണ്.
MCP ടൂൾ സ്കോപ്പുകൾ ഒരു മൂന്നാമത്തെ പദാവലിയാണ്, താഴെയുള്ള പട്ടികകളിലെ ഏതെങ്കിലും ഫംഗ്ഷനുകളേക്കാൾ `scopeMatches` ഉപയോഗിച്ചാണ് ഇത് പരിശോധിക്കുന്നത്. വശങ്ങളിലായി:
[മൂന്ന് സ്കോപ്പ് നെയിംസ്പേസുകൾ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### ആക്സസ് ടോക്കൺ സ്കോപ്പുകൾ (`oma_live_…`)

| സ്കോപ്പ് | സാധാരണ പ്രവർത്തനങ്ങൾ                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| `read`   | ടോക്കണിന് കാണാൻ അനുവാദമുള്ള ലിസ്റ്റ്/സ്റ്റാറ്റസ് GET-കൾ                             |
| `write`  | അഡ്മിന് താഴെയുള്ള മ്യൂട്ടേഷനുകൾ (സൃഷ്ടിക്കുക/അപ്ഡേറ്റ് ചെയ്യുക/ഇല്ലാതാക്കുക)        |
| `admin`  | പൂർണ്ണ റിമോട്ട് CLI / കണക്റ്റ് ടോക്കൺ (പാസ്വേഡ് ബൂട്ട്സ്ട്രാപ്പ് ഇവിടെ ഡിഫോൾട്ടാണ്) |

`read` ഉള്ള ഒരു ടോക്കണിന് `write` റൂട്ട് വിളിക്കാൻ കഴിയില്ല. റൺടൈം സന്ദേശ രൂപം:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-കീ മാനേജ്മെൻ്റ് സ്കോപ്പുകൾ

| സ്കോപ്പ്     | അർത്ഥം                                                                               |
| ------------ | ------------------------------------------------------------------------------------ |
| (ഒന്നുമില്ല) | അനുമാനം മാത്രം. മാനേജ്മെൻ്റ് റൂട്ടുകൾ 403 നൽകുന്നു.                                  |
| `manage`     | മാനേജ്മെൻ്റ് API (`requireManagementAuth` API-കീ ബ്രാഞ്ചിന് സമാനമായ ഗേറ്റ്)          |
| `admin`      | `hasManageScope` നെ തൃപ്തിപ്പെടുത്തുന്നു (മാനേജ്മെൻ്റ് ശേഷിയുള്ളതായി കണക്കാക്കുന്നു) |

API കീസ് / API മാനേജർ UI-ൽ കീയിൽ `manage` പ്രവർത്തനക്ഷമമാക്കുക. നിങ്ങൾ മനഃപൂർവ്വം ആ സ്കോപ്പ് അനുവദിച്ചില്ലെങ്കിൽ ഓട്ടോമേഷനായി ഒരു ചാറ്റ് ക്ലയൻ്റ് കീ വീണ്ടും ഉപയോഗിക്കരുത്.

---

## എങ്ങനെ സൃഷ്ടിക്കുകയും റദ്ദാക്കുകയും ചെയ്യാം

### ഡാഷ്ബോർഡ് JWT സെഷൻ

1. `/login` തുറന്ന് മാനേജ്മെന്റ് പാസ്വേഡ് ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക (ആദ്യ ബൂട്ടിൽ `INITIAL_PASSWORD`).
2. `auth_token` കുക്കി HttpOnly ആണ്. ബ്രൗസർ ഡാഷ്ബോർഡ് അത് സ്വയമേവ ഉപയോഗിക്കുന്നു.
3. `/api/auth/logout` വഴി ലോഗ് ഔട്ട് ചെയ്യുക. പകർത്താൻ ദീർഘകാലം നിലനിൽക്കുന്ന രഹസ്യമൊന്നുമില്ല.

### CLI മെഷീൻ-ID ടോക്കൺ

1. സെർവറുള്ള **അതേ ഹോസ്റ്റിൽ** `omniroute` പ്രവർത്തിപ്പിക്കുക (ലൂപ്പ്ബാക്ക്).
2. CLI, `~/.omniroute/`-ന് കീഴിൽ ഒരു മെഷീൻ-ID ടോക്കൺ ബൂട്ട്സ്ട്രാപ്പ് ചെയ്യുന്നു (chmod 600).
3. ഇത് മറ്റൊരു മെഷീനിൽ നിന്ന് പ്രവർത്തിക്കില്ല. റിമോട്ട് CLI-ക്കായി ഒരു ആക്സസ് ടോക്കൺ ഉപയോഗിക്കുക.

### സ്കോപ്പ് ചെയ്ത ആക്സസ് ടോക്കൺ (`oma_live_…`)

1. ഡാഷ്ബോർഡ്: **Settings → Access Tokens** → സൃഷ്ടിക്കുക (പേര് + സ്കോപ്പ്). **രഹസ്യം ഒരിക്കൽ മാത്രമേ കാണിക്കൂ.**
2. അല്ലെങ്കിൽ CLI: `omniroute connect <host>` (പാസ്വേഡ് → ടോക്കൺ). [റിമോട്ട് മോഡ്](./REMOTE-MODE.md) കാണുക.
3. ഹെഡർ: `Authorization: Bearer oma_live_…`
4. അതേ Access Tokens പേജിൽ നിന്ന് റദ്ദാക്കുക (അല്ലെങ്കിൽ CLI കോൺടെക്സ്റ്റ് ഇല്ലാതാക്കുക).
5. സെർവർ ഒരു ഹാഷ് മാത്രമാണ് സംഭരിക്കുന്നത്. പ്ലെയിൻടെക്സ്റ്റിനെ ഒരു പാസ്വേഡ് പോലെ കൈകാര്യം ചെയ്യുക.

### `manage` സ്കോപ്പുള്ള API കീ

1. ഡാഷ്ബോർഡ്: **API Manager / API Keys** → ഒരു കീ സൃഷ്ടിക്കുകയോ എഡിറ്റ് ചെയ്യുകയോ ചെയ്യുക → `manage` (അല്ലെങ്കിൽ `admin`) പ്രവർത്തനക്ഷമമാക്കുക.
2. ഹെഡർ: `Authorization: Bearer sk-…` (കീയുടെ യഥാർത്ഥ പ്രിഫിക്സ്).
3. അതേ UI-യിൽ കീ റദ്ദാക്കുകയോ `manage` നീക്കം ചെയ്യുകയോ ചെയ്യുക.
4. CLI അല്ലാത്ത ഓട്ടോമേഷനായി കുറഞ്ഞ അനുമതി മാത്രം നൽകുക: GET-മാത്രം ജോലികൾക്ക് `read` ആക്സസ് ടോക്കൺ തിരഞ്ഞെടുക്കുക; കോളർക്ക് `/v1`-ഉം മാനേജ്മെന്റും ഉപയോഗിക്കേണ്ടിവരുമ്പോൾ മാത്രം API കീയിൽ `manage` ഉപയോഗിക്കുക.

---

## ഹെഡർ ഫോർമാറ്റ്

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

മാനേജ്മെന്റ് ക്രെഡൻഷ്യലുകൾ URL പാത്തിലോ ക്വറി സ്ട്രിങ്ങിലോ ഉൾപ്പെടുത്തരുത്. മാനേജ്മെന്റ്
ഓതന്റിക്കേഷൻ ഹെഡർ/കുക്കി വഴി മാത്രമാണ്.

---

## പകർത്തി ഉപയോഗിക്കാവുന്ന ഉദാഹരണങ്ങൾ

വായിക്കാൻ മാത്രം (പ്രൊവൈഡറുകളെ പട്ടികപ്പെടുത്തുക). ഒരു `read` ആക്സസ് ടോക്കൺ ഉപയോഗിക്കുക:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

മാറ്റങ്ങൾ വരുത്താൻ (ഒരു പ്രൊവൈഡർ കണക്ഷൻ സൃഷ്ടിക്കുക). `write`/`admin` ആക്സസ് ടോക്കൺ അല്ലെങ്കിൽ
`manage` സ്കോപ്പുള്ള API കീ ഉപയോഗിക്കുക:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ഇൻഫറൻസ് (മാനേജ്മെന്റിനുള്ളതല്ല). സാധാരണ API കീ; `manage` ആവശ്യമില്ല:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## നിലവിലെ റൺടൈം പിശകുകൾ (രഹസ്യങ്ങൾ പ്രതിധ്വനിക്കരുത്)

| സാഹചര്യം                                         | സാധാരണ നില | സന്ദേശം (ശുദ്ധീകരിച്ചത്)                                             |
| ------------------------------------------------ | ---------- | -------------------------------------------------------------------- |
| ക്രെഡൻഷ്യൽ ഇല്ല                                  | 401        | `Authentication required`                                            |
| അസാധുവായ/കാലഹരണപ്പെട്ട `oma_live_…`              | 401        | `Invalid or expired access token`                                    |
| `manage`/`admin` ഇല്ലാത്ത സാധുവായ API കീ         | 403        | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| ഒരു മാനേജ്മെൻ്റ് റൂട്ടിലെ അസാധുവായ സാധാരണ API കീ | 403        | `Invalid management token`                                           |
| ആക്സസ് ടോക്കൺ സ്കോപ്പ് വളരെ കുറവാണ്              | 403        | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" എന്നതിനർത്ഥം ബെയറർ ഒരു മാനേജ്മെൻ്റ് ക്രെഡൻഷ്യലായി സ്വീകരിക്കപ്പെട്ടില്ല എന്നാണ്. ഏത് കുടുംബത്തെയാണ് മിൻ്റ് ചെയ്യേണ്ടതെന്ന് ഇത് നിങ്ങളോട് പറയുന്നില്ല. മുകളിലുള്ള പട്ടിക ഉപയോഗിക്കുക: ഇൻഫറൻസ് കീകൾക്ക് `manage` സ്കോപ്പ് ആവശ്യമാണ്; റിമോട്ട് CLI-ക്ക് `oma_live_…` ആവശ്യമാണ്; ഡാഷ്ബോർഡ് സെഷൻ കുക്കി ഉപയോഗിക്കുന്നു.

---

## ശുപാർശ ചെയ്യുന്ന ഏറ്റവും കുറഞ്ഞ പ്രത്യേകാവകാശ തിരഞ്ഞെടുപ്പ്

| വിളിക്കുന്നയാൾ                                         | ഉപയോഗം                                                  |
| :----------------------------------------------------- | :------------------------------------------------------ |
| ബ്രൗസർ                                                 | ഡാഷ്ബോർഡ് സെഷൻ                                          |
| സെർവർ ഹോസ്റ്റിലെ CLI                                   | മെഷീൻ ടോക്കൺ                                            |
| ഒരു റിമോട്ട് സെർവറുമായി സംസാരിക്കുന്ന ലാപ്ടോപ്പിലെ CLI | `omniroute connect`-ൽ നിന്നുള്ള `oma_live_…`            |
| CI / സ്ക്രിപ്റ്റുകൾ (മാനേജ്മെന്റിന് മാത്രം)            | പ്രവർത്തിക്കുന്ന ഏറ്റവും ചെറിയ സ്കോപ്പുള്ള `oma_live_…` |
| `/v1` ഉം `/api` ഉം വിളിക്കേണ്ട CI                      | `manage` ഉള്ള API കീ **അല്ലെങ്കിൽ** രണ്ട് ക്രെഡൻഷ്യലുകൾ |
