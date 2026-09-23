# CORS Configuration & Security (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

ഒരൊറ്റ കേന്ദ്രീകൃത അനുവദനീയ പട്ടികയിൽ നിന്ന് ക്രോസ്-ഒറിജിൻ പ്രതികരണങ്ങൾ വായിക്കാൻ ഏതൊക്കെ **ബ്രൗസർ ഒറിജിനുകൾക്ക്** അനുമതിയുണ്ടെന്ന് OmniRoute നിയന്ത്രിക്കുന്നു. ഈ മാതൃക **സ്ഥിരസ്ഥിതിയായി fail-closed** ആണ്:
നിങ്ങൾ വ്യക്തമായി അനുവദിക്കുന്നതുവരെ ഒരു ഒറിജിനും അനുവദിക്കപ്പെടില്ല. അനുവദനീയ പട്ടിക എങ്ങനെ
നിർണ്ണയിക്കപ്പെടുന്നു, `CORS_ALLOW_ALL=true` യഥാർത്ഥത്തിൽ എന്താണ് വെളിപ്പെടുത്തുന്നത് (അതിലും പ്രധാനമായി, എന്താണ്
വെളിപ്പെടുത്താത്തത്), ഡെവലപ്മെന്റ്, പ്രൊഡക്ഷൻ പരിതസ്ഥിതികൾ എങ്ങനെ സുരക്ഷിതമായി ക്രമീകരിക്കാം, wildcard സജീവമായിരിക്കുമ്പോൾ
ഡാഷ്ബോർഡ് പ്രദർശിപ്പിക്കുന്ന റൺടൈം മുന്നറിയിപ്പ് എന്നിവ ഈ പേജ് വിശദീകരിക്കുന്നു.

**ആധികാരിക ഉറവിടം:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). അനുവദനീയ പട്ടിക മിഡിൽവെയറിൽ
(`src/server/authz/pipeline.ts`) ഒരിക്കൽ മാത്രമാണ് പ്രയോഗിക്കുന്നത് — ഓരോ റൂട്ടിലെയും ഹാൻഡ്ലറുകൾ സ്വയം
`Access-Control-Allow-Origin` സജ്ജീകരിക്കുന്നില്ല.

## ഒരു ഒറിജിൻ എങ്ങനെ നിർണ്ണയിക്കപ്പെടുന്നു

ഓരോ അഭ്യർത്ഥനയ്ക്കും മിഡിൽവെയർ `Access-Control-Allow-Origin` മൂല്യം
ഈ ക്രമത്തിൽ കണക്കാക്കുന്നു:

1. **`CORS_ALLOW_ALL=true`** (അല്ലെങ്കിൽ പഴയ `CORS_ORIGIN=*`) → വിളിക്കുന്നയാളുടെ
   `Origin` അതേപടി തിരികെ നൽകുന്നു (`Origin` ഹെഡർ ഇല്ലെങ്കിൽ `*`), കൂടാതെ കാഷുകൾ ശരിയായി പ്രവർത്തിക്കാൻ
   `Vary: Origin` നൽകുന്നു. അതേ `applyCorsHeaders()` നിയന്ത്രണബിന്ദു, ടോക്കൺ ഉപയോഗിച്ച് ഓതന്റിക്കേറ്റ് ചെയ്ത
   `/v1*`/`/v1beta*` പ്രതലത്തിലെ ബോഡിയുള്ള എല്ലാ 2xx പ്രതികരണങ്ങളിലും
   `Vary: Accept-Encoding` ചേർക്കുന്നു (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737). അതിനാൽ
   ഡൗൺസ്ട്രീം/പങ്കിട്ട കാഷുകൾക്ക് കംപ്രസ് ചെയ്തതും കംപ്രസ് ചെയ്യാത്തതുമായ
   വകഭേദങ്ങൾ ശരിയായി വേർതിരിച്ചറിയാൻ കഴിയും.
2. അല്ലാത്തപക്ഷം, അഭ്യർത്ഥനയിലെ `Origin` നോർമലൈസ് ചെയ്യുന്നു (ചെറിയക്ഷരങ്ങളാക്കി, അവസാനത്തെ സ്ലാഷ്
   നീക്കംചെയ്ത്), തുടർന്ന് **ലയിപ്പിച്ച അനുവദനീയ പട്ടികയുമായി** പൊരുത്തപ്പെടുത്തുന്നു:
   - env **`CORS_ALLOWED_ORIGINS`** — കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പട്ടിക, കൂടാതെ
   - റൺടൈം **`corsOrigins`** ക്രമീകരണം (Dashboard → Security → _CORS Allowed
     Origins_), `src/lib/config/runtimeSettings.ts`-ൽ നിന്നുള്ള
     `setRuntimeAllowedOrigins()` വഴി ചേർക്കുന്നത്.
3. പൊരുത്തമില്ല → **`Access-Control-Allow-Origin` ഹെഡർ പുറപ്പെടുവിക്കില്ല**. ബ്രൗസർ
   ക്രോസ്-ഒറിജിൻ വായന തടയുന്നു. ഉദ്ദേശിച്ചിട്ടുള്ള fail-closed സ്ഥിരസ്ഥിതി ഇതാണ്.

| Env var                | അർത്ഥം                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | അനുവദിക്കേണ്ട കൃത്യമായ ഒറിജിനുകളുടെ CSV (ശുപാർശ ചെയ്യുന്നത്).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → ഏത് ഒറിജിനും അതേപടി തിരികെ നൽകുക (wildcard). ഡെവലപ്മെന്റിൽ മാത്രം.                         |
| `CORS_ORIGIN`          | പഴയത്. `*`, `CORS_ALLOW_ALL` പോലെ പ്രവർത്തിക്കുന്നു; ഒരൊറ്റ മൂല്യം അനുവദനീയ പട്ടികയിൽ ചേർക്കപ്പെടുന്നു. |

## ഭീഷണി മാതൃക — `CORS_ALLOW_ALL=true` യഥാർത്ഥത്തിൽ എന്താണ് വെളിപ്പെടുത്തുന്നത്

പൊതുവായ OWASP മുന്നറിയിപ്പ് ("wildcard CORS = ഏത് സൈറ്റിനും നിങ്ങളുടെ API വിളിക്കാം") ഗൗരവമായി
എടുക്കേണ്ടതാണ്. എന്നാൽ ഒരു വ്യക്തമായ ഇംപ്ലിമെന്റേഷൻ വസ്തുത കാരണം OmniRoute-ന്റെ അപകടസാധ്യത
**പൊതുവായ സാഹചര്യത്തേക്കാൾ പരിമിതമാണ്**:

> **കേന്ദ്ര `applyCorsHeaders()` ഒരിക്കലും
> `Access-Control-Allow-Credentials` പുറപ്പെടുവിക്കുന്നില്ല.** സെർവർ
> `Access-Control-Allow-Credentials: true` അയയ്ക്കാത്തപക്ഷം, ഒരു _ക്രെഡൻഷ്യൽ ഉൾപ്പെട്ട_
> (കുക്കി ഉൾക്കൊള്ളുന്ന) ക്രോസ്-ഒറിജിൻ പ്രതികരണം ബ്രൗസർ ലഭ്യമാക്കില്ല. OmniRoute-ന്റെ പങ്കിട്ട CORS പാത
> ഒരിക്കലും അങ്ങനെ ചെയ്യുന്നില്ല.

`CORS_ALLOW_ALL=true` ആയിരിക്കുമ്പോൾ പോലും, ഓരോ പ്രതലത്തിലും ഇതിന്റെ അർത്ഥം:

| പ്രതലം                               | ഓതന്റിക്കേഷൻ സംവിധാനം     | wildcard CORS-ന്റെ പ്രഭാവം                                                                                                                                                                                                                                                |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`      | കുക്കി സെഷൻ               | ഒറിജിൻ അതേപടി തിരികെ നൽകുന്നു, എന്നാൽ **`Allow-Credentials` ഇല്ലാത്തതിനാൽ** ബ്രൗസർ ക്രെഡൻഷ്യൽ ഉൾപ്പെട്ട വായന **തടയുന്നു**. ദോഷകരമായ ഒരു ക്രോസ്-ഒറിജിൻ സൈറ്റിന് നിങ്ങളുടെ ഓതന്റിക്കേറ്റ് ചെയ്ത ഡാഷ്ബോർഡ് പ്രതികരണങ്ങൾ **വായിക്കാനാകില്ല**, സെഷൻ കുക്കി വെളിപ്പെടുകയുമില്ല. |
| Client API `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` ഹെഡർ | **രൂപകൽപ്പനപ്രകാരം** ഇതിനകം തന്നെ അനുമതിയുള്ളതാണ് (`relaxForTokenAuth`): ബ്രൗസറുകൾ ഒരിക്കലും `Authorization`/`x-api-key` സ്വയം ചേർക്കില്ല, അതിനാൽ ആക്രമണകാരിയുടെ പേജിന് നിങ്ങളുടെ കീ നൽകാനാകില്ല. `CORS_ALLOW_ALL` ഇത് കൂടുതൽ വിപുലീകരിക്കുന്നില്ല.                       |
| പൊതുവായ read-only (`/api/health`, …) | ഒന്നുമില്ല                | സെൻസിറ്റീവ് അല്ല; wildcard ദോഷരഹിതമാണ്.                                                                                                                                                                                                                                   |

അതിനാൽ `CORS_ALLOW_ALL=true` മൂലം അവശേഷിക്കുന്ന അപകടസാധ്യത ഇവയിൽ മാത്രമായി പരിമിതപ്പെടുന്നു: (a)
ഇതിനകം ഓതന്റിക്കേഷൻ ആവശ്യമില്ലാത്ത ഡാറ്റയുടെ, ക്രെഡൻഷ്യൽ ഉൾപ്പെടാത്ത ക്രോസ്-ഒറിജിൻ **വായനകൾ**, (b)
മാനേജ്മെന്റ് റൂട്ടുകളിൽ CORS **preflight വിജയിക്കാൻ അനുവദിക്കൽ** — എന്നാൽ ഇവയ്ക്ക് ഇപ്പോഴും
ക്രോസ്-ഒറിജിൻ പേജിന് നൽകാനാകാത്ത ഓതന്റിക്കേഷൻ ആവശ്യമാണ്. പങ്കിട്ട CORS പാതയിൽ ഇത്
സെഷൻ ഹൈജാക്ക് ചെയ്യാനോ ക്രെഡൻഷ്യൽ മോഷ്ടിക്കാനോ ഉള്ള മാർഗമല്ല.

### യഥാർത്ഥത്തിലുള്ള ഒരൊറ്റ അപവാദം — `/api/v1/agents/`

Cloud-Agent റൂട്ടുകൾ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) അവയുടെ
**സ്വന്തം** CORS ഹെഡറുകൾ സജ്ജീകരിക്കുന്നു
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`), കൂടാതെ
`Access-Control-Allow-Origin: <origin>|*` എന്നതിനൊപ്പം
`Access-Control-Allow-Credentials: true` **പുറപ്പെടുവിക്കുകയും** ചെയ്യുന്നു. ഒറിജിൻ അതേപടി തിരികെ നൽകലും
ക്രെഡൻഷ്യലുകളും ഒരുമിച്ച് നിലനിൽക്കുന്ന ഒരേയൊരു പ്രതലം ഇതാണ്; ഇത്
`CORS_ALLOW_ALL`-ൽ നിന്ന് **സ്വതന്ത്രവുമാണ്**. ഈ റൂട്ടുകൾ മാനേജ്മെന്റ്-ഓതന്റിക്കേറ്റ് ചെയ്തവയാണ്
(`requireManagementAuth`); ഡാഷ്ബോർഡ് ഹോസ്റ്റിന് പുറത്തേക്ക് തുറന്നുനൽകുന്ന ഓപ്പറേറ്റർമാർ,
പ്രതികരണ ഹെഡറുകൾ ക്രോസ്-ഒറിജിൻ ക്രെഡൻഷ്യൽ ഉൾപ്പെട്ട വായന അനുവദിക്കുന്ന ഒരേയൊരു സ്ഥലം ഇതാണെന്ന്
അറിഞ്ഞിരിക്കണം. ഇത് വ്യക്തമായ ഒരു അനുവദനീയ പട്ടികയിലേക്ക് പരിമിതപ്പെടുത്തുന്നത്
ഈ CORS മാർഗ്ഗനിർദ്ദേശത്തിൽ നിന്ന് വേറെയായി ട്രാക്ക് ചെയ്യപ്പെടുന്നു.

## പ്രൊഡക്ഷൻ ചെക്ക്ലിസ്റ്റ്

- **പ്രൊഡക്ഷനിൽ ഒരിക്കലും `CORS_ALLOW_ALL=true` സജ്ജീകരിക്കരുത്.** അത് സജ്ജീകരിക്കാതെ വിടുക.
- വ്യക്തമായ ഒരു ഒറിജിൻ ലിസ്റ്റ് സജ്ജീകരിക്കുക — env var അല്ലെങ്കിൽ Security ടാബിലെ ഫീൽഡ് ഉപയോഗിക്കാം:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ഒരു റിവേഴ്സ് പ്രോക്സി / ടണലിന് (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) പിന്നിലാണ് പ്രവർത്തിക്കുന്നതെങ്കിൽ, CORS നിങ്ങളുടെ ഏക നിയന്ത്രണമല്ല —
  loopback route guard, spawn ചെയ്യാൻ കഴിയുന്ന റൂട്ടുകളെ തുടർന്നും സംരക്ഷിക്കുന്നു
  ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) കാണുക). 403 "പരിഹരിക്കാൻ"
  `X-Forwarded-For: 127.0.0.1` വ്യാജമായി സൃഷ്ടിക്കരുത്; അങ്ങനെ ചെയ്യുന്നത് route guard
  തടയുന്ന RCE വിഭാഗത്തെ വീണ്ടും തുറന്നുകൊടുക്കും.
- റൺടൈം നില സ്ഥിരീകരിക്കുക: `CORS_ALLOW_ALL=true` സജീവമായിരിക്കുമ്പോൾ
  Dashboard → Security → Authorization Inventory എന്നതിന് കീഴിൽ ഡാഷ്ബോർഡ്
  **സ്ഥിരമായ ആംബർ ബാനർ** കാണിക്കും; കൂടാതെ മോണിറ്ററിങ് ടൂളുകൾക്ക് പോൾ ചെയ്യാവുന്ന
  `cors: { allowAll, allowedOrigins }` എൻവലപ്പ് `/api/settings/authz-inventory`
  തിരികെ നൽകും.

## ഡെവലപ്മെന്റ് സൗകര്യം — നിർദ്ദിഷ്ട ലോക്കൽ ഒറിജിനുകൾ അനുവദിക്കുക

ഡെവലപ്മെന്റിൽ പോലും wildcard അപൂർവമായേ ആവശ്യമുള്ളൂ. നിങ്ങൾ ഉപയോഗിക്കുന്ന
ഡെവലപ്മെന്റ് സെർവറുകൾ മാത്രം അനുവദിക്കുക:

```bash
# ലോക്കൽ OmniRoute-നെ വിളിക്കുന്ന Vite (5173) + Next.js (3000) ഡെവലപ്മെന്റ് സെർവറുകൾ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ഒടുവിലെ സ്ലാഷ് അവഗണിച്ചുകൊണ്ട്, കേസ് പരിഗണിക്കാതെയാണ് ഒറിജിനുകൾ പൊരുത്തപ്പെടുത്തുന്നത്;
അതിനാൽ `http://localhost:3000`-ഉം `http://localhost:3000/`-ഉം തുല്യമാണ്. അതേ CSV
റീസ്റ്റാർട്ട് ചെയ്യാതെ തന്നെ റൺടൈമിൽ **Dashboard → Security → CORS Allowed Origins**
എന്നതിൽ സജ്ജീകരിക്കാം.

## API കീകളും കുക്കി സെഷനുകളും

- **Bearer / `x-api-key` (`/v1/*` ഇൻഫറൻസ് സർഫേസ്):** ബ്രൗസറുകൾ ഇവ
  ഒരിക്കലും സ്വയമേവ അറ്റാച്ച് ചെയ്യില്ല. ഇവിടെ CORS അർത്ഥവത്തായ ഒരു പ്രതിരോധമല്ല —
  API കീയാണ് പ്രതിരോധം — അതുകൊണ്ടാണ് ബ്രൗസർ, Electron ക്ലയന്റുകൾക്ക് ഇതിനകം
  അവകാശമുള്ള പ്രതികരണങ്ങൾ വായിക്കാനാകുന്ന വിധത്തിൽ ആ സർഫേസ് മനഃപൂർവം
  പെർമിസീവ് ആക്കിയിരിക്കുന്നത്.
- **കുക്കി സെഷൻ (ഡാഷ്ബോർഡ്):** fail-closed ഡിഫോൾട്ടും പങ്കിട്ട പാതയിൽ
  `Access-Control-Allow-Credentials` ഇല്ലാത്തതും ഇതിനെ സംരക്ഷിക്കുന്നു.
  ഏതെങ്കിലും പെർമിസീവ് കോൺഫിഗിൽ നിന്ന് മാനേജ്മെന്റ്/ഡാഷ്ബോർഡ് ഒറിജിനുകൾ
  ഒഴിവാക്കുക; അവ കൃത്യമായി fail-closed ആയി തന്നെ തുടരേണ്ടതാണ്.

## ഉദാഹരണം: OmniRoute-ന് മുന്നിലുള്ള റിവേഴ്സ് പ്രോക്സി

CORS നടപ്പാക്കുന്നത് OmniRoute തന്നെയാണ്, അതിനാൽ പ്രോക്സി സാധാരണയായി
`Access-Control-*` ഹെഡറുകൾ ചേർക്കാനോ തിരുത്തിയെഴുതാനോ **പാടില്ല** (ഇരട്ട ഹെഡറുകൾ
ബ്രൗസറുകളുടെ പ്രവർത്തനം തകരാറിലാക്കും). TLS ടെർമിനേറ്റ് ചെയ്ത് ഫോർവേഡ് ചെയ്യുക —
preflight-ന് OmniRoute മറുപടി നൽകട്ടെ:

```nginx
# nginx — OmniRoute-ലേക്ക് ഫോർവേഡ് ചെയ്യുക; ഇവിടെ Access-Control-* ഇൻജക്റ്റ് ചെയ്യരുത്
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For എന്നത് 127.0.0.1 ആയി സജ്ജീകരിക്കരുത് — അത് loopback route guard-നെ പരാജയപ്പെടുത്തും.
}
```

അനുവദിച്ചിട്ടുള്ള ബ്രൗസർ ഒറിജിനുകൾ പ്രോക്സിയിൽ അല്ല, OmniRoute-ൽ
(`CORS_ALLOWED_ORIGINS` അല്ലെങ്കിൽ Security ടാബ്) സജ്ജീകരിക്കുക.

## സോഴ്സ് ഫയലുകൾ

| പരിഗണന                                         | ഫയൽ                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist നിർണയം + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Middleware പ്രയോഗം (സത്യത്തിന്റെ ഏക സ്രോതസ്സ്) | `src/server/authz/pipeline.ts`                                       |
| Settings → റൺടൈം ഒറിജിൻ ഇൻജക്ഷൻ                | `src/lib/config/runtimeSettings.ts`                                  |
| ഡാഷ്ബോർഡിനായുള്ള റൺടൈം നില                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| ഡാഷ്ബോർഡ് മുന്നറിയിപ്പ് ബാനർ                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ഫീൽഡ്                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ഓരോ റൂട്ടിനുമുള്ള Cloud-Agent CORS (ഒഴിവാക്കൽ) | `src/lib/cloudAgent/api.ts`                                          |

## ഇതും കാണുക

- [റൂട്ട് ഗാർഡ് ടിയറുകൾ](./ROUTE_GUARD_TIERS.md) — പ്രോസസുകൾ സൃഷ്ടിക്കാൻ ശേഷിയുള്ള റൂട്ടുകൾക്കായുള്ള ലൂപ്പ്ബാക്ക് നിർബന്ധമാക്കൽ
  (വേറിട്ടതും പരസ്പരപൂരകവുമായ ഒരു നിയന്ത്രണം).
- [അംഗീകാര മാർഗ്ഗനിർദ്ദേശം](../architecture/AUTHZ_GUIDE.md) — സമ്പൂർണ്ണ ഓത്ത് പൈപ്പ്ലൈൻ.
