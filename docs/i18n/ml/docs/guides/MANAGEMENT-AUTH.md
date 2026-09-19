# Management Authentication (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-ൽ മാനേജ്മെന്റ് റൂട്ടുകൾക്ക് അംഗീകാരം നൽകാൻ കഴിയുന്ന **നാല് ക്രെഡൻഷ്യൽ കുടുംബങ്ങൾ** ഉണ്ട്.
അവ പരസ്പരം മാറ്റി ഉപയോഗിക്കാനാവില്ല. വ്യക്തമായി `manage` അല്ലെങ്കിൽ `admin` സ്കോപ്പ് അനുവദിച്ചിട്ടില്ലെങ്കിൽ, ഇൻഫറൻസ് API കീകൾ (`sk-…`) സെർവറിനെ മാനേജ് ചെയ്യില്ല.

കാനോണിക്കൽ ഇംപ്ലിമെന്റേഷൻ: `src/lib/api/requireManagementAuth.ts`.

| ക്രെഡൻഷ്യൽ                   | സാധാരണ രൂപം                                 | സൃഷ്ടിക്കുന്ന സ്ഥലം                                         | ഉദ്ദേശിച്ച ഉപയോഗം                     | മാനേജ്മെന്റ് ശേഷി                                                                                                               |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ഡാഷ്ബോർഡ് JWT സെഷൻ           | `auth_token` കുക്കി                         | ഡാഷ്ബോർഡ് ലോഗിൻ                                             | ബ്രൗസർ UI                             | CSRF, ലോക്കാലിറ്റി, എല്ലായ്പ്പോഴും പരിരക്ഷിക്കപ്പെടുന്ന റൂട്ട് നിയമങ്ങൾ എന്നിവയ്ക്ക് വിധേയമായി സമ്പൂർണ്ണ ഡാഷ്ബോർഡ് മാനേജ്മെന്റ് |
| CLI മെഷീൻ-ID ടോക്കൺ          | ഇന്റേണൽ / ലോക്കൽ                            | CLI ബൂട്ട്സ്ട്രാപ്പ് (അതേ മെഷീനിലെ `omniroute`)             | ലോക്കൽ CLI                            | ലോക്കൽ മാനേജ്മെന്റ് മാത്രം                                                                                                      |
| സ്കോപ്പ് ചെയ്ത ആക്സസ് ടോക്കൺ | `oma_live_…`                                | **Settings → Access Tokens** അല്ലെങ്കിൽ `omniroute connect` | റിമോട്ട് CLI-യും മാനേജ്മെന്റ് API-യും | റൂട്ടിന് ആവശ്യമായ `read`, `write`, അല്ലെങ്കിൽ `admin` സ്കോപ്പ് നിർബന്ധമായും പാലിക്കണം                                           |
| ഇൻഫറൻസ് API കീ               | `sk-…` (കൂടാതെ മറ്റ് API-കീ പ്രിഫിക്സുകളും) | **API Manager / API Keys**                                  | `/v1/*` ഇൻഫറൻസ്                       | കീയുടെ മെറ്റാഡാറ്റയിൽ `manage` അല്ലെങ്കിൽ `admin` ഉൾപ്പെട്ടിട്ടില്ലെങ്കിൽ **ഒന്നുമില്ല**                                        |

`oma_` ക്രെഡൻഷ്യലുകൾ മാനേജ്മെന്റ്/CLI ക്രെഡൻഷ്യലുകളാണ്. അവ ഇൻഫറൻസ് API കീകൾ **അല്ല**.

സെർവറിനായി ലോഗിൻ/API-കീ ഓതന്റിക്കേഷൻ പ്രവർത്തനരഹിതമാക്കിയിട്ടുണ്ടെങ്കിൽ, ചില മാനേജ്മെന്റ് റൂട്ടുകൾ ഓതന്റിക്കേഷൻ ഇല്ലാത്ത കോളുകൾ സ്വീകരിച്ചേക്കാം. ലോക്കൽ-മാത്രം റൂട്ടുകളും എല്ലായ്പ്പോഴും പരിരക്ഷിക്കപ്പെടുന്ന റൂട്ടുകളും അപ്പോഴും അവയുടെ സ്വന്തം നിയമങ്ങൾ പ്രയോഗിക്കും. അതിനാൽ, ഈ ക്രെഡൻഷ്യലുകളിൽ ഒന്ന് നൽകുന്നത് എല്ലായിടത്തും നിർബന്ധമല്ല; അതുപോലെ, ആവശ്യമായ സ്കോപ്പും റൂട്ട് ലോക്കാലിറ്റിയും ഇല്ലാതെ ഒരെണ്ണം കൈവശമുള്ളത് എല്ലായിടത്തും മതിയാവുകയുമില്ല.

ബന്ധപ്പെട്ടത്: [റിമോട്ട് മോഡ്](./REMOTE-MODE.md) (ഒരു റിമോട്ട് CLI-ക്കായി `oma_live_…` എങ്ങനെ സൃഷ്ടിക്കപ്പെടുന്നു).

---

## സ്കോപ്പ് മാട്രിക്സുകൾ

ഈ രണ്ട് സ്കോപ്പ് പദാവലികൾ **വ്യത്യസ്തമാണ്**. അവ കൂട്ടിക്കലർത്തരുത്.

### ആക്സസ് ടോക്കൺ സ്കോപ്പുകൾ (`oma_live_…`)

| സ്കോപ്പ് | സാധാരണ പ്രവർത്തനങ്ങൾ                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| `read`   | ടോക്കണിന് കാണാൻ അനുമതിയുള്ള ലിസ്റ്റ്/സ്റ്റാറ്റസ് GET അഭ്യർത്ഥനകൾ                                  |
| `write`  | അഡ്മിൻ തലത്തിന് താഴെയുള്ള മാറ്റങ്ങൾ (സൃഷ്ടിക്കൽ/അപ്ഡേറ്റ് ചെയ്യൽ/ഇല്ലാതാക്കൽ)                     |
| `admin`  | സമ്പൂർണ്ണ റിമോട്ട് CLI / കണക്ട് ടോക്കൺ (പാസ്വേഡ് ബൂട്ട്സ്ട്രാപ്പ് ഡിഫോൾട്ടായി ഇത് ഉപയോഗിക്കുന്നു) |

`read` ഉള്ള ഒരു ടോക്കണിന് `write` റൂട്ട് വിളിക്കാനാവില്ല. റൺടൈം സന്ദേശത്തിന്റെ രൂപം:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-കീ മാനേജ്മെന്റ് സ്കോപ്പുകൾ

| സ്കോപ്പ്     | അർത്ഥം                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| (ഒന്നുമില്ല) | ഇൻഫറൻസ് മാത്രം. മാനേജ്മെന്റ് റൂട്ടുകൾ 403 നൽകുന്നു.                          |
| `manage`     | മാനേജ്മെന്റ് API (`requireManagementAuth` API-കീ ബ്രാഞ്ചിന്റെ അതേ ഗേറ്റ്)    |
| `admin`      | `hasManageScope`-ഉം പാലിക്കുന്നു (മാനേജ്മെന്റ് ശേഷിയുള്ളതായി കണക്കാക്കുന്നു) |

API Keys / API Manager UI-യിൽ കീയ്ക്കായി `manage` പ്രവർത്തനക്ഷമമാക്കുക. ആ സ്കോപ്പ് ബോധപൂർവം അനുവദിച്ചിട്ടില്ലെങ്കിൽ, ഓട്ടോമേഷനായി ഒരു ചാറ്റ് ക്ലയന്റ് കീ വീണ്ടും ഉപയോഗിക്കരുത്.

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

## നിലവിലെ റൺടൈം പിശകുകൾ (രഹസ്യങ്ങൾ മറുപടിയിൽ ഉൾപ്പെടുത്തരുത്)

| സാഹചര്യം                                        | സാധാരണ സ്റ്റാറ്റസ് | സന്ദേശം (സെൻസിറ്റീവ് വിവരങ്ങൾ നീക്കിയത്)                             |
| ----------------------------------------------- | ------------------ | -------------------------------------------------------------------- |
| ക്രെഡൻഷ്യൽ ഇല്ല                                 | 401                | `Authentication required`                                            |
| അസാധുവായ/കാലഹരണപ്പെട്ട `oma_live_…`             | 401                | `Invalid or expired access token`                                    |
| `manage`/`admin` ഇല്ലാത്ത സാധുവായ API കീ        | 403                | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| ഒരു മാനേജ്മെന്റ് റൂട്ടിൽ അസാധുവായ സാധാരണ API കീ | 403                | `Invalid management token`                                           |
| ആക്സസ് ടോക്കണിന്റെ സ്കോപ്പ് ആവശ്യത്തിലും താഴെ   | 403                | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" എന്നത് ബെയറർ ഒരു മാനേജ്മെന്റ്
ക്രെഡൻഷ്യലായി **അംഗീകരിക്കപ്പെട്ടില്ല** എന്നാണ് അർത്ഥമാക്കുന്നത്. ഏത് വിഭാഗത്തിലുള്ളത് സൃഷ്ടിക്കണമെന്ന് ഇത്
**പറയുന്നില്ല**. മുകളിലുള്ള പട്ടിക ഉപയോഗിക്കുക: ഇൻഫറൻസ് കീകൾക്ക് `manage` സ്കോപ്പ് ആവശ്യമാണ്; റിമോട്ട് CLI-ക്ക്
`oma_live_…` ആവശ്യമാണ്; ഡാഷ്ബോർഡ് സെഷൻ കുക്കി ഉപയോഗിക്കുന്നു.

---

## ശുപാർശ ചെയ്യുന്ന ഏറ്റവും കുറഞ്ഞ പ്രിവിലേജ് തിരഞ്ഞെടുപ്പ്

| കോൾ ചെയ്യുന്ന ഘടകം                                        | ഉപയോഗിക്കേണ്ടത്                                                |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| ബ്രൗസർ                                                    | ഡാഷ്ബോർഡ് സെഷൻ                                                 |
| സെർവർ ഹോസ്റ്റിലെ CLI                                      | മെഷീൻ ടോക്കൺ                                                   |
| റിമോട്ട് സെർവറുമായി ആശയവിനിമയം നടത്തുന്ന ലാപ്ടോപ്പിലെ CLI | `omniroute connect`-ൽ നിന്നുള്ള `oma_live_…`                   |
| CI / സ്ക്രിപ്റ്റുകൾ (മാനേജ്മെന്റിന് മാത്രം)               | പ്രവർത്തിക്കാൻ ആവശ്യമായ ഏറ്റവും ചെറിയ സ്കോപ്പുള്ള `oma_live_…` |
| `/v1`, `/api` എന്നിവ രണ്ടും വിളിക്കേണ്ട CI                | `manage` ഉള്ള API കീ **അല്ലെങ്കിൽ** രണ്ട് ക്രെഡൻഷ്യലുകൾ        |
