# Remote Mode (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute മറ്റെവിടെയെങ്കിലും പ്രവർത്തിക്കുമ്പോൾ (ഒരു VPS, ഹോം സർവർ, നിങ്ങളുടെ Tailnet-ലെ മറ്റൊരു മെഷീൻ), നിങ്ങളുടെ ലാപ്ടോപ്പിൽ `omniroute` CLI പ്രവർത്തിപ്പിക്കുക. `omniroute connect` ഉപയോഗിച്ച് ഒരിക്കൽ ലോഗിൻ ചെയ്താൽ, അതിനുശേഷം **എല്ലാ** CLI കമാൻഡുകളും ആ റിമോട്ട് സർവറിനെയാണ് ലക്ഷ്യമിടുക — അതേ കമാൻഡുകൾ, അതേ ഔട്ട്പുട്ട്, പക്ഷേ റിമോട്ടിൽ പ്രവർത്തിപ്പിക്കുന്നു.

ഇൻസ്റ്റാൾ ചെയ്യാൻ രണ്ടാമതൊരു ടൂൾ ഇല്ല: റിമോട്ട് മോഡ് എന്നത് സാധാരണ `omniroute` CLI-യും സ്കോപ്പ് ചെയ്ത **ആക്സസ് ടോക്കണുകളും** ചേർന്നതാണ്.

```bash
npm install -g omniroute                 # സാധാരണ CLI
omniroute connect 192.168.0.15           # ലോഗിൻ ചെയ്യുക (പാസ്വേഡ് → സ്കോപ്പ് ചെയ്ത ടോക്കൺ)
omniroute models list                    # ← ഇപ്പോൾ റിമോട്ട് സർവറിലെ മോഡലുകൾ പട്ടികപ്പെടുത്തുന്നു
omniroute configure codex                # ← റിമോട്ട് കാറ്റലോഗിൽനിന്ന് ഒരു ലോക്കൽ Codex പ്രൊഫൈൽ എഴുതുന്നു
```

---

## ഇത് പ്രവർത്തിക്കുന്ന വിധം

```
നിങ്ങളുടെ ലാപ്ടോപ്പ്                       റിമോട്ട് OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (പാസ്വേഡ് → ടോക്കൺ)       │
│  context: vps      │ ───────────────►  │ സ്കോപ്പ് ചെയ്ത ആക്സസ് ടോക്കൺ  │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ ഓരോ മാനേജ്മെന്റ് റൂട്ടിലും,   │
│ കോൺഫിഗുകൾ          │ ◄───────────────  │ ടോക്കണിന്റെ സ്കോപ്പനുസരിച്ച്    │
│ ലോക്കലായി എഴുതുന്നു │                   │ പരിശോധിക്കുന്നു                │
└────────────────────┘                   └───────────────────────────────┘
```

- **കോൺടെക്സ്റ്റുകൾ** ഓരോ സർവറിനെയും സംഭരിക്കുന്നു (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` സജീവ സർവർ മാറ്റുന്നു; `default` ലോക്കലാണ്.
- **ആക്സസ് ടോക്കണുകൾ** (`oma_live_…`) മാനേജ്മെന്റ് കമാൻഡുകൾക്ക് അനുമതി നൽകുന്നു. അവ
  ഇൻഫറൻസ് API കീകളിൽനിന്ന് (`sk-…`, `/v1/chat/completions`-നായി ഉപയോഗിക്കുന്നത്) വ്യത്യസ്തമാണ്.
- ഒരു ടോക്കണിന്റെ SHA-256 ഹാഷ് മാത്രമാണ് സർവർ ഭാഗത്ത് സംഭരിക്കുന്നത്. പ്ലെയിൻടെക്സ്റ്റ് സൃഷ്ടിക്കുന്ന സമയത്ത്
  **ഒരിക്കൽ** മാത്രമേ കാണിക്കൂ.

---

## കണക്റ്റ് ചെയ്യുന്നത്

### മാനേജ്മെന്റ് പാസ്വേഡ് ഉപയോഗിച്ച് (ബൂട്ട്സ്ട്രാപ്പ്)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128-നുള്ള മാനേജ്മെന്റ് പാസ്വേഡ്: ********
# ✔ http://192.168.0.15:20128-ലേക്ക് കണക്റ്റ് ചെയ്തു — കോൺടെക്സ്റ്റ് '192.168.0.15' (സ്കോപ്പ്: admin)
```

പാസ്വേഡ് ഫ്ലോ സ്വതവേ ഒരു **admin** ടോക്കൺ സൃഷ്ടിക്കുന്നു (പാസ്വേഡ് നിങ്ങളുടെ കൈവശമുള്ളതിനാൽ,
നിങ്ങൾക്ക് ഇതിനകം പൂർണ്ണ നിയന്ത്രണമുണ്ട്). `--scope` ഉപയോഗിച്ച് സ്കോപ്പ് കുറയ്ക്കുക:

```bash
omniroute connect 192.168.0.15 --scope write
```

ഓപ്ഷനുകൾ: `--port <p>` (ഹോസ്റ്റിൽ പോർട്ട് ഇല്ലാത്തപ്പോൾ), `--name <ctx>` (കോൺടെക്സ്റ്റ് പേര്),
`--scope read|write|admin`. പൂർണ്ണ URL മാറ്റമില്ലാതെ തന്നെ മാനിക്കപ്പെടുന്നു:
`omniroute connect https://omni.example.com`.

### മുൻകൂട്ടി സൃഷ്ടിച്ച ടോക്കൺ ഉപയോഗിച്ച്

ഡാഷ്ബോർഡിൽ (അല്ലെങ്കിൽ `omniroute tokens create` ഉപയോഗിച്ച്) സ്കോപ്പ് ചെയ്ത ഒരു ടോക്കൺ സൃഷ്ടിച്ച്
പേസ്റ്റ് ചെയ്യുക — പാസ്വേഡ് ആവശ്യമില്ല:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI അതിനെ `GET /api/cli/whoami` വഴി സാധൂകരിച്ച് സജീവ കോൺടെക്സ്റ്റായി സംരക്ഷിക്കുന്നു.

---

## സ്കോപ്പുകൾ

ക്രമാനുഗതമായ മൂന്ന് നിലകൾ (`admin ⊃ write ⊃ read`):

| സ്കോപ്പ് | ചെയ്യാനാകുന്നത്                                                                             |
| -------- | ------------------------------------------------------------------------------------------- |
| `read`   | പട്ടികപ്പെടുത്തുക/പരിശോധിക്കുക — `models list`, `providers status`, `logs`, `usage`, `cost` |
| `write`  | read **+** കോൺഫിഗർ ചെയ്യുക/പ്രയോഗിക്കുക — `setup-codex`, `keys add`, `config set`, കോംബോകൾ  |
| `admin`  | write **+** നിയന്ത്രിക്കുക — `tokens` CRUD, പ്രൊവൈഡറുകൾ ചേർക്കൽ, സർവീസുകൾ, പോളിസി, oauth    |

HTTP മെത്തഡിൽനിന്ന് (`GET`→read, മാറ്റങ്ങൾ→write) ഓരോ റൂട്ടിനും ആവശ്യമായ സ്കോപ്പ് സർവർ നിർണ്ണയിക്കുന്നു;
കൂടാതെ സെൻസിറ്റീവ് സർഫേസുകൾക്കായി admin അനുവദനീയ പട്ടികയും ഉപയോഗിക്കുന്നു
(`/api/cli/tokens`, `/api/providers` മാറ്റങ്ങൾ, `/api/oauth`, `/api/services`, …).
ആവശ്യമായ സ്കോപ്പില്ലാത്ത ടോക്കണിന് വ്യക്തമായ സന്ദേശത്തോടൊപ്പം `403` ലഭിക്കും.

> പ്രോസസ്സുകൾ ആരംഭിക്കുന്ന റൂട്ടുകൾ (`/api/services/*`, `/api/mcp/*`, …)
> **loopback-only** ആയി തുടരും — സ്കോപ്പ് ഏതായാലും ഒരു റിമോട്ട് ടോക്കണിന് ഒരിക്കലും അവ ആക്സസ് ചെയ്യാനാകില്ല.

---

## റിമോട്ട് ഇൻസ്റ്റാളേഷനിൽ Antigravity കണക്റ്റ് ചെയ്യുന്നു

Antigravity, Google-ന്റെ firstparty/nativeapp സമ്മത സ്ക്രീൻ ഉപയോഗിക്കുന്നു. **ലൂപ്പ്ബാക്ക് റീഡയറക്ട്**
(`http://127.0.0.1:<port>/callback`) **സൈൻ-ഇൻ അംഗീകരിക്കുന്ന ബ്രൗസറിൽ നിന്ന്
ആക്സസ് ചെയ്യാനാകുമ്പോൾ** മാത്രമേ Google ഓതറൈസേഷൻ കോഡ് നൽകുകയുള്ളൂ. റിമോട്ട് VPS
ഇൻസ്റ്റാളേഷനിൽ ആ ലൂപ്പ്ബാക്ക് നിങ്ങളുടെ മെഷീനിലല്ല, സെർവറിലാണ് നിലനിൽക്കുന്നത്.
അതിനാൽ സമ്മത സ്ക്രീൻ **അനന്തമായി ഹാങ്ങ് ചെയ്യുകയും ഒരിക്കലും കോഡ് നൽകാതിരിക്കുകയും
ചെയ്യുന്നു** — സാധാരണയുള്ള "കോൾബാക്ക് URL ഒട്ടിക്കുക" എന്ന ഫാൾബാക്കിൽ ഒട്ടിക്കാൻ
ഒന്നുമുണ്ടാകില്ല. (ഇത് Google-ന്റെ ഭാഗത്തുള്ള ഒരു നിയന്ത്രണമാണ്: ബണ്ടിൽ ചെയ്ത
Antigravity ഡെസ്ക്ടോപ്പ് ക്ലയന്റ് ഉപയോഗിക്കുന്ന ഏത് പ്രോക്സിയിലും ഇതേ ഹാങ്ങ്
സംഭവിക്കും; OmniRoute-ൽ മാത്രമല്ല.)

നിങ്ങൾ കുടുങ്ങുന്നതിന് മുമ്പുതന്നെ ഡാഷ്ബോർഡ് ഇത് കണ്ടെത്തുന്നു: localhost അല്ലാത്ത
ഒരു വിലാസത്തിൽ നിന്ന് **Providers → Antigravity → Connect** തുറക്കുമ്പോൾ, സാധാരണയുള്ള
"കോൾബാക്ക് URL പകർത്തുക" എന്ന അറിയിപ്പിന് പകരം താഴെയുള്ള രണ്ട് പരിഹാരങ്ങൾ
കാണിക്കും; ഓരോന്നിലും നിങ്ങളുടെ ഹോസ്റ്റും പോർട്ടും മുൻകൂട്ടി പൂരിപ്പിച്ചിരിക്കും.
(ഒരു LAN വിലാസവും ഇതിൽ ഉൾപ്പെടും — ഈ കോൾബാക്കിനെ സംബന്ധിച്ചിടത്തോളം
`192.168.x.x` localhost അല്ല.)

റിമോട്ട് OmniRoute-ലേക്ക് Antigravity കണക്റ്റ് ചെയ്യാൻ പിന്തുണയ്ക്കുന്ന രണ്ട്
മാർഗങ്ങളുണ്ട്.

### ഓപ്ഷൻ A — ലോക്കൽ ലോഗിൻ ഹെൽപ്പർ (ശുപാർശ ചെയ്യുന്നത്)

`127.0.0.1` ആക്സസ് ചെയ്യാനാകുന്ന **നിങ്ങളുടെ സ്വന്തം കമ്പ്യൂട്ടറിൽ** OAuth
പ്രവർത്തിപ്പിക്കുക. ഹെൽപ്പർ Google-മായി നേരിട്ട് ആശയവിനിമയം നടത്തുന്നതിനാൽ,
ഡാഷ്ബോർഡിന്റെ പതിപ്പിന് പൂർത്തിയാക്കാൻ കഴിയാത്തിടത്ത് സമ്മത നടപടിക്രമം പൂർത്തിയാകും.

**നിങ്ങൾ ഇതിനകം കണക്റ്റ് ചെയ്തിട്ടുണ്ടെങ്കിൽ** (`omniroute connect <host>`),
പകർത്തേണ്ടതായി ഒന്നുമില്ല — ഹെൽപ്പർ ക്രെഡൻഷ്യൽ ആ ഇൻസ്റ്റാളേഷനിലേക്ക്
നിങ്ങൾക്കായി എത്തിക്കും:

```bash
# നിങ്ങളുടെ LOCAL മെഷീനിൽ (Node.js + ഒരു ബ്രൗസർ ആവശ്യമാണ്):
omniroute connect 192.168.0.15        # ഒരിക്കൽ — admin-scoped context token സൃഷ്ടിക്കുന്നു
npx omniroute login antigravity
#   ↳ Google സമ്മത സ്ക്രീൻ തുറക്കുന്നു, ലോക്കൽ ലൂപ്പ്ബാക്ക് പോർട്ടിൽ കോൾബാക്ക് സ്വീകരിക്കുന്നു,
#     അത് എക്സ്ചേഞ്ച് ചെയ്യുന്നു, തുടർന്ന് സജീവ കോൺടെക്സ്റ്റിലേക്ക് ക്രെഡൻഷ്യൽ POST ചെയ്യുന്നു:
#
#   http://192.168.0.15:20128-ൽ Antigravity കണക്റ്റ് ചെയ്തു (കണക്ഷൻ abc123).
#   ഒട്ടിക്കേണ്ടതായി ഒന്നുമില്ല — നിങ്ങൾക്ക് ഈ ടെർമിനൽ അടയ്ക്കാം.
```

സജീവ കോൺടെക്സ്റ്റ് മറ്റൊരു മെഷീനിലേക്കാണ് ചൂണ്ടുന്നതെങ്കിൽ പുഷ് സ്വയമേവ നടക്കും.
`--push` / `--no-push` ഉപയോഗിച്ച് ഏതെങ്കിലും രീതി നിർബന്ധമാക്കാം, അല്ലെങ്കിൽ
`--context <name>` ഉപയോഗിച്ച് ഒരു നിർദ്ദിഷ്ട കോൺടെക്സ്റ്റിനെ ലക്ഷ്യമാക്കാം.

**നിങ്ങളുടെ മെഷീനിൽ നിന്ന് VPS ആക്സസ് ചെയ്യാൻ കഴിയുന്നില്ലെങ്കിലും** (ഫയർവാൾ,
SSH ഇല്ല, നെറ്റ്വർക്കിൽ നിന്ന് വേർതിരിച്ച ഡെസ്ക്), ഹെൽപ്പർ തുടർന്നും പ്രവർത്തിക്കും
— അതിന് യഥാർത്ഥത്തിൽ _ആവശ്യമുള്ളത്_ Google മാത്രമാണ്. `--no-push` ഉപയോഗിക്കുക,
അല്ലെങ്കിൽ പുഷ് പരാജയപ്പെടാൻ അനുവദിക്കുക: നിങ്ങൾ ഇതിനകം പൂർത്തിയാക്കിയ
ഓതറൈസേഷൻ ഉപേക്ഷിക്കുന്നതിന് പകരം ബ്ലോബ് പ്രിന്റ് ചെയ്യുന്നതിലേക്ക് അത്
ഫാൾബാക്ക് ചെയ്യും.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

തുടർന്ന്, **റിമോട്ട്** ഡാഷ്ബോർഡിൽ: **Providers → Antigravity → Connect** എന്നതിലേക്ക്
പോയി, `omniroute-cred-v1.…` ബ്ലോബ് **Step 2** ഫീൽഡിൽ ഒട്ടിക്കുക (കോൾബാക്ക് URL
അല്ലെങ്കിൽ ക്രെഡൻഷ്യൽ ബ്ലോബ് — രണ്ടിലേതും അത് സ്വീകരിക്കും). OmniRoute അത്
ഡീകോഡ് ചെയ്യുകയും Cloud Code ഓൺബോർഡിംഗ് സെർവർ ഭാഗത്ത് പ്രവർത്തിപ്പിക്കുകയും
കണക്ഷൻ സ്ഥിരമായി സൂക്ഷിക്കുകയും ചെയ്യും.

> ബ്ലോബിൽ ഒരു റിഫ്രഷ് ടോക്കൺ അടങ്ങിയിരിക്കുന്നു — അതിനെ ഒരു പാസ്വേഡ് പോലെ
> കൈകാര്യം ചെയ്യുക. പുഷ് മാർഗത്തിൽ, നിങ്ങളുടെ കോൺടെക്സ്റ്റിന്റെ ഓതന്റിക്കേറ്റ് ചെയ്ത
> കണക്ഷനിലൂടെ അത് ഒരിക്കൽ അയയ്ക്കപ്പെടും; ഒട്ടിക്കൽ മാർഗത്തിൽ, നിങ്ങളുടെ ഡാഷ്ബോർഡ്
> കണക്ഷനിലൂടെയും. ഏത് രീതിയിലായാലും അത് എൻക്രിപ്റ്റ് ചെയ്ത നിലയിൽ സംഭരിക്കപ്പെടും,
> വിജയകരമായ ഒരു പുഷ് അത് ഒരിക്കലും നിങ്ങളുടെ ടെർമിനലിൽ പ്രിന്റ് ചെയ്യില്ല.

ഫ്ലാഗുകൾ: `--no-browser` (സ്വയമേവ തുറക്കുന്നതിന് പകരം URL പ്രിന്റ് ചെയ്യുക),
`--port <n>` (ലൂപ്പ്ബാക്ക് പോർട്ട് നിശ്ചയിക്കുക), `--timeout <ms>`, `--push` /
`--no-push` (സ്വയമേവയുള്ള ഡെലിവറി അസാധുവാക്കുക), `--context <name>` (ഒരു നിർദ്ദിഷ്ട
കോൺടെക്സ്റ്റിനെ ലക്ഷ്യമാക്കുക).

### ഓപ്ഷൻ B — SSH ലോക്കൽ-ഫോർവേഡ് ടണൽ

നിങ്ങൾക്ക് VPS-ലേക്ക് SSH ആക്സസ് ഉണ്ടെങ്കിൽ, ലൂപ്പ്ബാക്ക് കോൾബാക്ക് ടണലിലൂടെ
സെർവറിലേക്ക് തിരികെ എത്തുന്ന വിധത്തിൽ ഡാഷ്ബോർഡ് പോർട്ട് ഫോർവേഡ് ചെയ്യുക:

```bash
# നിങ്ങളുടെ LOCAL മെഷീനിൽ:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# തുടർന്ന് നിങ്ങളുടെ LOCAL ബ്രൗസറിൽ http://localhost:20128 തുറന്ന് സാധാരണ രീതിയിൽ Antigravity കണക്റ്റ് ചെയ്യുക
# — 127.0.0.1:20128/callback റീഡയറക്ട് ഇപ്പോൾ SSH വഴി VPS-ൽ എത്തും.
```

നിങ്ങൾ ഡാഷ്ബോർഡ് `localhost:20128` ആയി ആക്സസ് ചെയ്യുന്നതിനാൽ, Google സമ്മത
നടപടിക്രമം പൂർത്തിയാകുകയും അതേ ടണലിലൂടെ കോൾബാക്ക് സെർവറിലേക്ക് എത്തുകയും ചെയ്യും
— ബ്ലോബ് ആവശ്യമില്ല. കണക്ഷൻ സജീവമാണെന്ന് കാണിക്കുന്നതുവരെ ടണൽ തുറന്നുവയ്ക്കുക.

താഴെയുള്ള ഫിക്സഡ്-ലൂപ്പ്ബാക്ക് പ്രൊവൈഡർമാരിൽ നിന്ന് വ്യത്യസ്തമായി, ഇവിടെ
**ഒരു ഫോർവേഡ് മാത്രം മതി**: Antigravity കോൾബാക്ക് ഡാഷ്ബോർഡ് പോർട്ട് തന്നെയാണ്
ഉപയോഗിക്കുന്നത്, അതിനാൽ ടണൽ ചെയ്യാൻ പ്രൊവൈഡർ-നിർദ്ദിഷ്ടമായ രണ്ടാമത്തെ പോർട്ട്
ആവശ്യമില്ല.

> പൂർണ്ണമായും ഹെഡ്ലെസ് ആയ മറ്റൊരു മാർഗം (ഹെൽപ്പറോ ടണലോ ഇല്ലാതെ) നിങ്ങളുടെ
> **സ്വന്തം** Google OAuth വെബ് ക്രെഡൻഷ്യലുകളും ഒരു പബ്ലിക് ബേസ് URL-ഉം
> കോൺഫിഗർ ചെയ്യുന്നതാണ്; പ്രൊവൈഡറുടെ OAuth എൻവയോൺമെന്റ് വേരിയബിളുകൾ കാണുക.
> മുകളിലുള്ള രണ്ട് ഓപ്ഷനുകൾക്കും അധിക Google സജ്ജീകരണമൊന്നും ആവശ്യമില്ല.

---

## റിമോട്ട് ഇൻസ്റ്റാളേഷനിൽ Codex / Grok കണക്റ്റ് ചെയ്യൽ (സ്ഥിര-loopback പ്രൊവൈഡറുകൾ)

Codex, xAI (`xai-oauth`), Grok CLI (`grok-cli`) എന്നിവ അവയുടെ upstream OAuth ആപ്പിൽ ഒരു **സ്ഥിരമായ** loopback
`redirect_uri` രജിസ്റ്റർ ചെയ്യുന്നു. OmniRoute-ന് അത് മാറ്റാനാവില്ല — പ്രൊവൈഡർ എല്ലായ്പ്പോഴും ബ്രൗസറിനെ അതേ hardcoded വിലാസത്തിലേക്ക് തിരിച്ചയയ്ക്കുന്നു:

| പ്രൊവൈഡർ    | പ്രൊവൈഡർ റീഡയറക്ട് ചെയ്യുന്ന സ്ഥിര callback |
| ----------- | ------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`       |
| `xai-oauth` | `http://127.0.0.1:56121/callback`           |
| `grok-cli`  | `http://127.0.0.1:56122/callback`           |

അവിടെയുള്ള `localhost` എന്നത് **ബ്രൗസർ പ്രവർത്തിക്കുന്ന മെഷീനെ** സൂചിപ്പിക്കുന്നു, അതേസമയം OmniRoute-ന്റെ PKCE
callback server **സെർവറിന്റെ** loopback-ലാണ് listen ചെയ്യുന്നത്. `http://192.168.0.15:20128` പോലുള്ള ഒരു LAN
വിലാസത്തിൽ dashboard തുറന്നാൽ ഇവ രണ്ടും ഒരിക്കലും ബന്ധപ്പെടില്ല: authorization
code നിങ്ങളുടെ സ്വന്തം ലാപ്ടോപ്പിന്റെ `localhost:1455`-ലേക്ക് എത്തുന്നു, അവിടെ ഒന്നും listen ചെയ്യുന്നില്ല,
കൂടാതെ പിശക് കാണിക്കാതെ തന്നെ പ്രൊവൈഡർ sign-in പരാജയപ്പെടുത്തുന്നു.

popup തുറക്കുന്നതിന് മുമ്പ് തന്നെ dashboard ഇത് കണ്ടെത്തുകയും login നിശ്ശബ്ദമായി പരാജയപ്പെടാൻ അനുവദിക്കുന്നതിനുപകരം
tunnel command കാണിക്കുകയും ചെയ്യുന്നു (#8046).

### പരിഹാരം — **രണ്ട്** port-ുകളും forward ചെയ്യുക

```bash
# BROWSER പ്രവർത്തിക്കുന്ന മെഷീനിൽ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# തുടർന്ന് http://localhost:20128 തുറന്ന് അവിടെനിന്ന് Codex കണക്റ്റ് ചെയ്യുക
```

രണ്ട് forward-ുകളും ആവശ്യമാണ്; ഒന്ന് മാത്രം forward ചെയ്താലും പരാജയപ്പെടും:

- **`20128`** (dashboard port) origin-നെ യഥാർത്ഥ localhost ആക്കുന്നു; ഇതാണ്
  OmniRoute-നെ PKCE callback server ആരംഭിക്കാൻ പ്രേരിപ്പിക്കുന്നത് — ഒരു LAN origin ഒരിക്കലും
  ആ branch-ൽ എത്തില്ല.
- **`1455`** (പ്രൊവൈഡറുടെ സ്ഥിര callback port) എന്നതിലേക്കാണ് ബ്രൗസർ തിരിച്ചയയ്ക്കപ്പെടുന്നത്;
  അത് tunnel വഴി സെർവറിന്റെ loopback-ലേക്ക് എത്തണം.

xAI അല്ലെങ്കിൽ Grok CLI കണക്റ്റ് ചെയ്യുമ്പോൾ `1455`-ന് പകരം `56121`/`56122` ഉപയോഗിക്കുക; കൂടാതെ `20128`-ന് പകരം
നിങ്ങളുടെ യഥാർത്ഥ dashboard port ഉപയോഗിക്കുക. കണക്ഷൻ active ആയി കാണിക്കുന്നതുവരെ tunnel തുറന്നുവെക്കുക.

> **SSH access ഇല്ലേ?** Codex, Grok CLI എന്നിവ pasted token-ഉം സ്വീകരിക്കും — connect dialog-ലെ **Paste API
> Key** / **Import auth.json** tab. ആ രീതിയിൽ loopback
> callback ഇല്ലാത്തതിനാൽ ഏത് origin-ൽ നിന്നും അത് പ്രവർത്തിക്കും. Codex ഒരു bare access
> token അല്ലെങ്കിൽ `~/.codex/auth.json` session blob-ഉം അധികമായി സ്വീകരിക്കുന്നു.

---

## token-ുകൾ കൈകാര്യം ചെയ്യൽ

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ secret ഒരിക്കൽ മാത്രം പ്രിന്റ് ചെയ്യുന്നു — ഇപ്പോൾ തന്നെ അത് പകർത്തുക
omniroute tokens list                 # മറച്ചിരിക്കുന്നു: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # ഉടൻ revoke ചെയ്യുക
omniroute tokens scopes               # മൂന്ന് scope-ുകളും വിശദീകരിക്കുക
```

`tokens` command-ുകൾക്ക് ഒരു **admin** credential ആവശ്യമാണ്. Dashboard-ൽ
**Settings → Access Tokens** എന്നതിന് കീഴിലും token-ുകൾ കൈകാര്യം ചെയ്യാം (സൃഷ്ടിക്കുക, revoke ചെയ്യുക, ഒരിക്കൽ മാത്രം പകർത്തുക).

---

## റിമോട്ട് catalog-ൽ നിന്ന് ഒരു coding CLI ക്രമീകരിക്കൽ

`omniroute configure`, **active server-ന്റെ** live model catalog വായിച്ച്
**നിങ്ങളുടെ** മെഷീനിൽ ഒരു config എഴുതുന്നു.

```bash
omniroute configure codex
#   പ്രൊവൈഡറുകൾ: glm, kmc, ollamacloud, opencode-go, …
#   പ്രൊവൈഡർ: glm
#   Model id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml എഴുതി
#   ഇത് ഉപയോഗിക്കുക:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# പതിവായി ഉപയോഗിക്കുന്ന model-നെ interactive picker-ന്റെ മുകളിൽ നിലനിർത്തുക
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

പ്രാദേശിക `model-preferences.json` file-ൽ picker model ID-കൾ മാത്രം സൂക്ഷിക്കുന്നു
(URL-കളോ credential-ുകളോ ഒരിക്കലും സൂക്ഷിക്കില്ല); അവ context, CLI target എന്നിവയുടെ പരിധിയിലാണ്.
സമീപകാല selection-ുകൾക്ക് മുമ്പായി favorite-ുകൾ കാണിക്കും; തിരഞ്ഞെടുത്ത model-നെ ആ context/target list-ൽ നിന്ന് നീക്കം ചെയ്യാൻ
`--unfavorite` ഉപയോഗിക്കുക.

എഴുതപ്പെടുന്ന profile, env var (`OMNIROUTE_API_KEY`) ഉപയോഗിച്ച് inference key-നെ പരാമർശിക്കുന്നു —
secret ഒരിക്കലും disk-ലേക്ക് എഴുതപ്പെടുന്നില്ല. ഒറ്റത്തവണ നടത്തേണ്ട അടിസ്ഥാന Codex setup-ിനായി
(`[model_providers.omniroute]` block), [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) കാണുക.

### റിമോട്ടിനെതിരെ ഒരു CLI ആരംഭിക്കൽ (config എഴുതാതെ)

`omniroute run <target>` active context-നെയും മാനിക്കുന്നു: remote base URL,
context credential എന്നിവ ആരംഭിക്കുന്ന process-ലേക്ക് മാത്രം inject ചെയ്യപ്പെടുന്നു.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → റിമോട്ട്
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# എന്താണ് ആരംഭിക്കപ്പെടുകയെന്ന് കൃത്യമായി preview ചെയ്യുക (env KEY NAMES മാത്രം, value-കൾ ഒരിക്കലുമില്ല):
omniroute run codex --dry-run --json
```

Target-ുകൾ: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(ഏക source: `bin/cli/cli-manifest.mjs`). Qwen, Gemini എന്നിവ exit ചെയ്യുമ്പോൾ നീക്കം ചെയ്യപ്പെടുന്ന
താൽക്കാലികവും ഒറ്റപ്പെട്ടതുമായ home ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്നു; അതിനാൽ launch നിങ്ങളുടെ സ്വകാര്യ tool configuration-നെ
ഒരിക്കലും സ്പർശിക്കുകയോ — അതിലേക്ക് വിവരങ്ങൾ leak ചെയ്യുകയോ — ഇല്ല.

### ഓരോ CLI-യ്ക്കുമുള്ള setup command-ുകൾ

പിന്തുണയ്ക്കുന്ന ഓരോ CLI-ക്കും remote-aware setup command ഉണ്ട് (എല്ലാം active
context-നെ അല്ലെങ്കിൽ `--remote <url> --api-key <key>`-നെ മാനിക്കുന്നു):

| CLI         | കമാൻഡ്                     | ഇത് എഴുതുന്നത്                                                                                                                                                                                         |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` പ്രൊഫൈലുകൾ (ഓരോ മോഡലിനും)                                                                                                                                                |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (ഓരോ മോഡലിനും)                                                                                                                                               |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — എല്ലാ കാറ്റലോഗ് മോഡലുകളുമുള്ള OpenAI-അനുയോജ്യമായ `omniroute` പ്രൊവൈഡർ (`opencode -m omniroute/<model>` പ്രവർത്തിപ്പിക്കുക)                                        |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI മോഡ്) + ഒട്ടിക്കാനുള്ള VS Code എക്സ്റ്റൻഷൻ ക്രമീകരണങ്ങൾ പ്രിന്റ് ചെയ്യുന്നു (OpenAI-അനുയോജ്യം, `/v1` **ഇല്ലാത്ത** Base URL)                            |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` ക്രമീകരണങ്ങൾ — OpenAI-അനുയോജ്യം, `/v1` **ഉള്ള** Base URL                                                                                  |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1` **ഉള്ള** `apiBase`, `${{ secrets.OMNIROUTE_API_KEY }}` വഴിയുള്ള കീ                                                |
| Cursor      | `omniroute setup-cursor`   | ആപ്പിനുള്ളിലെ ഘട്ടങ്ങൾ പ്രിന്റ് ചെയ്യുന്നു (Settings → Models → `/v1` **ഉള്ള** OpenAI Base URL ഓവർറൈഡ് ചെയ്യുക + കീ + മോഡൽ). Cursor കോൺഫിഗറേഷൻ അതാര്യമായ SQLite ആണ് — ചാറ്റ് പാനൽ മാത്രം               |
| Roo Code    | `omniroute setup-roo`      | ഒരു Roo ഇമ്പോർട്ട് JSON (`~/.omniroute/roo-settings.json`) എഴുതുന്നു + `roo-cline.autoImportSettingsPath` സജ്ജമാക്കുന്നു + UI ഘട്ടങ്ങൾ പ്രിന്റ് ചെയ്യുന്നു (OpenAI-അനുയോജ്യം, `/v1` **ഉള്ള** Base URL) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` പ്രൊവൈഡർ, `/v1` **ഉള്ള** `base_url`, `$OMNIROUTE_API_KEY` വഴിയുള്ള കീ                                                                                   |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `/v1` **ഇല്ലാത്ത** `OPENAI_HOST` + `GOOSE_MODEL`) + എൻവയോൺമെന്റ് നിർദ്ദേശങ്ങൾ                                                                 |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`/v1` **ഇല്ലാത്ത** `openai-api-base` + `model: openai/<id>`) + എൻവയോൺമെന്റ് നിർദ്ദേശങ്ങൾ (`aider --message --yes`)                                                                |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json`-ലെ V4 `modelProviders.openai` എൻട്രി + `~/.qwen/.env`-ലെ `OMNIROUTE_API_KEY`                                                                                                   |

```bash
# OpenCode (OpenAI-അനുയോജ്യമായ പ്രൊവൈഡർ, എല്ലാ കാറ്റലോഗ് മോഡലുകളും, റിമോട്ട് VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # പൊരുത്തപ്പെടുന്ന മോഡലുകൾ മാത്രം നിലനിർത്തുക
opencode -m omniroute/glm/glm-5.2 "..."          # ആദ്യം OMNIROUTE_API_KEY എക്സ്പോർട്ട് ചെയ്യുക
```

> OpenCode-ന് കൂടുതൽ സമ്പന്നമായ ഒരു **പ്ലഗിൻ** സംയോജനവുമുണ്ട്: `omniroute setup opencode`
> (ഇപ്പോൾ `--remote` വഴി റിമോട്ട് പിന്തുണയോടെ) `@omniroute/opencode-plugin` ഇൻസ്റ്റാൾ ചെയ്യുന്നു.
> `setup-opencode` ഭാരം കുറഞ്ഞ OpenAI-അനുയോജ്യമായ ബദലാണ്. API കീ
> `{env:OMNIROUTE_API_KEY}` വഴി റഫറൻസ് ചെയ്യുന്നു — ഒരിക്കലും ഡിസ്കിലേക്ക് എഴുതുന്നില്ല.
>
> OpenCode v2-ൽ, പകരം `@omniroute/opencode-plugin-v2` ഉപയോഗിക്കുക: അതേ കാറ്റലോഗ്,
> വ്യത്യസ്ത ലോഡർ കരാർ. സംയോജനം കണക്റ്റ് ചെയ്തിരിക്കുമ്പോൾ ഇത് OpenCode-ന്റെ സ്വന്തം ക്രെഡൻഷ്യൽ
> സ്റ്റോറിൽനിന്ന് കീ വായിക്കുന്നു, അതിനാൽ ഒരു റിമോട്ട് ഗേറ്റ്വേയ്ക്ക് `opencode.json`-ൽ ഒരു കീയും
> ആവശ്യമില്ല.

---

## കോൺടെക്സ്റ്റുകൾ കൈകാര്യം ചെയ്യൽ (സെർവറുകൾക്കിടയിൽ മാറുക)

ഒരു **കോൺടെക്സ്റ്റ്** എന്നത് സംരക്ഷിച്ചിട്ടുള്ള ഒരു സെർവറാണ് (baseUrl + ക്രെഡൻഷ്യൽ + സ്കോപ്പ്). `omniroute connect`
ഒരെണ്ണം സൃഷ്ടിച്ച് അതിനെ സജീവമാക്കുന്നു; അതിനുശേഷം എല്ലാ കമാൻഡുകളും അതിനെയാണ് ലക്ഷ്യമിടുന്നത്. `omniroute contexts`
ഉപയോഗിച്ച് അവ കൈകാര്യം ചെയ്യുകയും അവയ്ക്കിടയിൽ മാറുകയും ചെയ്യാം:

```bash
omniroute contexts list            # എല്ലാ കോൺടെക്സ്റ്റുകളും; സജീവമായത് ● ഉപയോഗിച്ച് അടയാളപ്പെടുത്തിയിരിക്കുന്നു
omniroute contexts current         # സജീവ സെർവർ, ഓതന്റിക്കേഷൻ നില, സ്കോപ്പ്
```

```text
  | പേര്    | അടിസ്ഥാന URL              | ഓതന്റിക്കേഷൻ | സ്കോപ്പ് | വിവരണം
● | vps     | http://100.67.86.91:20128 | token          | admin   | റിമോട്ട് OmniRoute (…)
  | default | http://localhost:20128    | ✗              |         |
```

**സെർവറുകൾ മാറ്റുക** — തുടർന്നുള്ള എല്ലാ കമാൻഡുകളും സജീവ കോൺടെക്സ്റ്റിനെ പിന്തുടരും:

```bash
omniroute contexts use vps         # → എല്ലാ കമാൻഡുകളും ഇനി റിമോട്ട് VPS-നെയാണ് സമീപിക്കുക
omniroute tokens list              #   (VPS-നെതിരെ പ്രവർത്തിക്കുന്നു)

omniroute contexts use default     # → localhost-ലേക്ക് തിരികെ
omniroute tokens list              #   (ലോക്കൽ സെർവറിനെതിരെ പ്രവർത്തിക്കുന്നു)
```

**ഒരു കോൺടെക്സ്റ്റ് മാനുവലായി ചേർക്കുക** (`connect`-ന് പകരം), പരിശോധിക്കുക, അല്ലെങ്കിൽ പേരുമാറ്റുക:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # ഒരു കോൺടെക്സ്റ്റിന്റെ പൂർണ്ണ വിശദാംശങ്ങൾ
omniroute contexts rename staging stg
```

**ഒരു കോൺടെക്സ്റ്റ് നീക്കംചെയ്യുക** — സ്ഥിരീകരണം ആവശ്യപ്പെടും; അത് ഒഴിവാക്കാൻ `--yes` നൽകുക
(സ്ക്രിപ്റ്റുകൾക്കും / ഇന്ററാക്ടീവ് അല്ലാത്ത ഷെല്ലുകൾക്കും ഇത് ആവശ്യമാണ്; അല്ലെങ്കിൽ അവ സുരക്ഷിതമായി നിരസിക്കും):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) നീക്കംചെയ്യാനാകില്ല. സജീവ കോൺടെക്സ്റ്റ് നീക്കംചെയ്താൽ
> `default`-ലേക്ക് മടങ്ങും. നുറുങ്ങ്: ഒരു കോൺടെക്സ്റ്റ് നീക്കംചെയ്യുന്നത് **ലോക്കലായി** സംരക്ഷിച്ചിട്ടുള്ള ക്രെഡൻഷ്യൽ മാത്രമാണ് ഇല്ലാതാക്കുന്നത് —
> ആക്സസ് യഥാർത്ഥത്തിൽ അവസാനിപ്പിക്കാൻ `omniroute tokens revoke <id>` ഉപയോഗിച്ച് സെർവറിലെ ടോക്കൺ
> അസാധുവാക്കുക.

കോൺടെക്സ്റ്റുകൾ **എക്സ്പോർട്ട് / ഇംപോർട്ട്** ചെയ്യുക (ഉദാ. മെഷീനുകൾക്കിടയിൽ അവ മാറ്റാൻ). OS
കീചെയിൻ ലഭ്യമാകുമ്പോൾ പുതിയ കോൺടെക്സ്റ്റുകൾ ഒരു കീചെയിൻ റഫറൻസ് മാത്രമാണ് സ്ഥിരമായി സൂക്ഷിക്കുന്നത്; ക്രെഡൻഷ്യലുകൾ എക്സ്പോർട്ടിലേക്ക് പകർത്തപ്പെടില്ല:

```bash
omniroute contexts export --out contexts.json     # ഡിഫോൾട്ട്: stdout
omniroute contexts import contexts.json            # പുനരാലേഖനം ചെയ്യുക; നിലവിലുള്ളവ നിലനിർത്താൻ --merge
omniroute contexts migrate --yes                  # പഴയ പ്ലെയിൻടെക്സ്റ്റ് ടോക്കണുകൾ കീചെയിനിലേക്ക് മാറ്റുക
```

ഉപയോഗിക്കാനാകുന്ന OS കീചെയിൻ ഇല്ലാത്ത ഹെഡ്ലെസ് സിസ്റ്റങ്ങളിൽ, CLI
`0600` മോഡിലുള്ള `config.json`-ലേക്ക് മടങ്ങുകയും ഒറ്റത്തവണ മുന്നറിയിപ്പ് പ്രദർശിപ്പിക്കുകയും ചെയ്യും. ആ
ഫോൾബാക്കിൽ നിന്നുള്ള എക്സ്പോർട്ടുകളും (മൈഗ്രേഷനു മുമ്പുള്ള ഏത് പഴയ കോൺഫിഗും) രഹസ്യ വിവരങ്ങളായി കണക്കാക്കുക.

---

## ദ്രുത സമഗ്ര പരിശോധന

ഒരു റിമോട്ട് സജ്ജീകരണം ആദ്യം മുതൽ പരിശോധിക്കാനുള്ള കോപ്പി-പേസ്റ്റ് ലൈഫ്സൈക്കിൾ — കണക്റ്റ് ചെയ്യുക, സ്കോപ്പുള്ള
ടോക്കൺ സൃഷ്ടിക്കുക, ഒരു കമാൻഡ് റൂട്ട് ചെയ്യുക, തിരികെ മാറുക, തുടർന്ന് സജ്ജീകരണം നീക്കംചെയ്യുക.
`192.168.0.15` എന്നത് നിങ്ങളുടെ സെർവറിന്റെ ഹോസ്റ്റ്/IP ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുക (Tailscale, LAN, അല്ലെങ്കിൽ ഒരു പൊതു
`https://…` URL).

```bash
# 1. കണക്റ്റ് ചെയ്യുക (പാസ്വേഡ് → admin ടോക്കൺ, സജീവമാകുന്ന ഒരു കോൺടെക്സ്റ്റായി സംരക്ഷിക്കുന്നു)
omniroute connect 192.168.0.15                 # അല്ലെങ്കിൽ: --key oma_live_xxxx  (പാസ്വേഡ് ആവശ്യമില്ല)
omniroute contexts current                     # റിമോട്ട് സെർവർ + സ്കോപ്പ് കാണിക്കുന്നു

# 2. അത് ഉപയോഗിക്കുക — മാനേജ്മെന്റ് കമാൻഡുകൾ ഇപ്പോൾ റിമോട്ടിനെതിരെ പ്രവർത്തിക്കും
omniroute tokens create --name laptop --scope read   # കൂടുതൽ പരിമിതമായ ഒരു ടോക്കൺ സൃഷ്ടിക്കുക
omniroute tokens list                                 # റിമോട്ടിൽ നിന്നുള്ള മാസ്ക് ചെയ്ത പട്ടിക

# 3. അങ്ങോട്ടും ഇങ്ങോട്ടും മാറുക
omniroute contexts use default                 # → ലോക്കൽ
omniroute contexts use 192-168-0-15            # → വീണ്ടും റിമോട്ട് (`contexts list`-ൽ നിന്നുള്ള പേര്)

# 4. നീക്കംചെയ്യുക. ശ്രദ്ധിക്കുക: `contexts remove` ലോക്കൽ ക്രെഡൻഷ്യൽ മാത്രമാണ് ഇല്ലാതാക്കുന്നത് —
#    ഇത് സെർവറിലെ ടോക്കൺ അസാധുവാക്കുന്നില്ല. ആക്സസ് യഥാർത്ഥത്തിൽ അവസാനിപ്പിക്കണമെങ്കിൽ ആദ്യം
#    സെർവർ ഭാഗത്ത് ടോക്കൺ അസാധുവാക്കുക.
omniroute tokens revoke <id|prefix>            # സെർവറിലെ ആക്സസ് അവസാനിപ്പിക്കുന്നു
omniroute contexts remove 192-168-0-15 --yes   # ലോക്കൽ കോൺടെക്സ്റ്റ് ഒഴിവാക്കുന്നു (സജീവമാണെങ്കിലും → default-ലേക്ക് മടങ്ങും), സ്ഥിരീകരണം ചോദിക്കില്ല
```

> `--yes`, `contexts remove`-നെ ഇന്ററാക്ടീവ് അല്ലാത്തതാക്കുന്നു (സ്ക്രിപ്റ്റുകളിൽ/CI-യിൽ ആവശ്യമാണ്; ഇത് ഇല്ലെങ്കിൽ
> ഒരു ഇന്ററാക്ടീവ് അല്ലാത്ത ഷെൽ പ്രവർത്തനം നിലച്ചുപോകുന്നതിനുപകരം സുരക്ഷിതമായി നിരസിക്കും). **സജീവ**
> കോൺടെക്സ്റ്റ് നീക്കംചെയ്യുന്നത് സ്വയമേവ `default`-ലേക്ക് മടങ്ങും.

---

## സുരക്ഷാ കുറിപ്പുകൾ

- ടോക്കണിന്റെ പ്ലെയിൻടെക്സ്റ്റ് ഒരിക്കൽ മാത്രം കാണിക്കും; SHA-256 ഹാഷ് മാത്രമാണ് സ്ഥിരമായി സൂക്ഷിക്കുന്നത് (API കീകളുടെ കാര്യത്തിലെന്നപോലെ).
- `omniroute connect`, ലോഗിൻ ബ്രൂട്ട്-ഫോഴ്സ് ലോക്കൗട്ടും ഓഡിറ്റ് ലോഗിംഗും പുനരുപയോഗിക്കുന്നു.
- ട്രാൻസ്പോർട്ടിനായി HTTPS അല്ലെങ്കിൽ ഒരു Tailnet ഉപയോഗിക്കുന്നതാണ് അഭികാമ്യം; LAN/Tailscale സൗകര്യത്തിനായി ഹോസ്റ്റ് മാത്രം നൽകിയാൽ അത് ഡിഫോൾട്ടായി `http://` ഉപയോഗിക്കും — TLS-നായി പൂർണ്ണമായ ഒരു `https://…` URL നൽകുക.
- അഭികാമ്യമായ ലോക്കൽ കോൺടെക്സ്റ്റ് ഫയൽ `~/.omniroute/config.json` (`chmod 600`) ആണ്; അതിൽ ഒരു `credentialRef` മാത്രമേ അടങ്ങിയിരിക്കൂ. ടോക്കൺ തന്നെ OS കീചെയിനിൽ (`keytar`) സൂക്ഷിക്കുന്നതിനാൽ ഒരിക്കലും ലോഗുകളിൽ പ്രിന്റ് ചെയ്യപ്പെടില്ല. പ്രവർത്തനക്ഷമമായ നേറ്റീവ് കീചെയിൻ ഇല്ലാത്ത ഹെഡ്ലെസ് ഇൻസ്റ്റാളേഷനുകൾ വ്യക്തമായ ഒരു ഫാൾബാക്കായി അതേ `0600` ഫയൽ ഉപയോഗിക്കുകയും ഒരിക്കൽ മുന്നറിയിപ്പ് നൽകുകയും ചെയ്യും. ഒരു കീചെയിൻ ബാക്കെൻഡ് ഇൻസ്റ്റാൾ ചെയ്ത ശേഷം `omniroute contexts migrate --yes` ഉപയോഗിക്കുക.

---

## API എൻഡ്പോയിന്റുകൾ (റഫറൻസ്)

| രീതി   | റൂട്ട്                | പ്രാമാണീകരണം          | സ്കോപ്പ്                               |
| ------ | --------------------- | --------------------- | -------------------------------------- |
| POST   | `/api/cli/connect`    | മാനേജ്മെന്റ് പാസ്വേഡ് | — (പൊതുവായത്, പാസ്വേഡ് പരിരക്ഷയുള്ളത്) |
| GET    | `/api/cli/whoami`     | ആക്സസ് ടോക്കൺ         | റീഡ്                                   |
| GET    | `/api/cli/tokens`     | ആക്സസ് ടോക്കൺ         | അഡ്മിൻ                                 |
| POST   | `/api/cli/tokens`     | ആക്സസ് ടോക്കൺ         | അഡ്മിൻ                                 |
| DELETE | `/api/cli/tokens/:id` | ആക്സസ് ടോക്കൺ         | അഡ്മിൻ                                 |

പൂർണ്ണ സ്കീമകൾക്കായി [openapi.yaml](../openapi.yaml) കാണുക.
