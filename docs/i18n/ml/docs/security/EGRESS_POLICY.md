# Egress IP Family Policy (IPv4/IPv6) (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ഓരോ പ്രോക്സിക്കും ഔട്ട്ബൗണ്ട് ട്രാഫിക്കിനെ ഒരൊറ്റ IP ഫാമിലിയിലേക്ക് — `auto`, `ipv4`, അല്ലെങ്കിൽ `ipv6` — പിൻ ചെയ്യുക; അതുവഴി IPv6-മാത്രമുള്ള എഗ്രസ് ഒരിക്കലും നിശ്ശബ്ദമായി IPv4-ലേക്ക് തിരികെ ചോർന്നുപോകില്ല.**

> **ആധികാരിക ഉറവിടം:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

ഓരോ പ്രോക്സിക്കും ഒരു **അഡ്രസ്-ഫാമിലി എഗ്രസ് നിർദ്ദേശം** നൽകാൻ OmniRoute അനുവദിക്കുന്നു. സ്ഥിരസ്ഥിതിയായി OS IPv4 അല്ലെങ്കിൽ IPv6 തിരഞ്ഞെടുക്കുന്നു (ഡ്യുവൽ-സ്റ്റാക്ക്, "Happy Eyeballs"). നിർദ്ദേശം `ipv4` അല്ലെങ്കിൽ `ipv6` ആയി സജ്ജീകരിക്കുമ്പോൾ, OmniRoute ആ പ്രോക്സിയിലൂടെയുള്ള എല്ലാ കണക്ഷനുകളെയും തിരഞ്ഞെടുത്ത ഫാമിലിയിലേക്ക് പിൻ ചെയ്യുകയും മറ്റൊരു ഫാമിലിയിലേക്ക് ഫാൾബാക്ക് ചെയ്യുന്നതിന് പകരം **സുരക്ഷിതമായി പരാജയപ്പെടുകയും** ചെയ്യുന്നു.

ഈ നിർദ്ദേശം എന്താണ്, അത് എന്തുകൊണ്ട് നിലവിലുണ്ട്, എവിടെയാണ് അത് കോൺഫിഗർ ചെയ്യുന്നത്, റൺടൈം അത് എങ്ങനെ പരിഹരിക്കുന്നു എന്നിവ ഈ പേജ് രേഖപ്പെടുത്തുന്നു.

---

## ഉള്ളടക്കപ്പട്ടിക

- [ഇത് എന്താണ്](#what-it-is)
- [ഇത് എന്തുകൊണ്ട് നിലവിലുണ്ട്](#why-it-exists)
- [മൂന്ന് മൂല്യങ്ങൾ](#the-three-values)
- [ഇത് എങ്ങനെ കോൺഫിഗർ ചെയ്യാം](#how-to-configure-it)
- [`auto` എങ്ങനെ പരിഹരിക്കപ്പെടുന്നു](#how-auto-resolves)
- [`ipv4` / `ipv6` എങ്ങനെ നിർബന്ധിതമാക്കപ്പെടുന്നു](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 അനുയോജ്യത](#socks5-compatibility)
- [സുരക്ഷിത-പരാജയ പെരുമാറ്റം](#fail-closed-behavior)
- [ഡാറ്റാ മോഡൽ](#data-model)
- [ബന്ധപ്പെട്ട ഡോക്യുമെന്റേഷൻ](#related-documentation)

---

## ഇത് എന്താണ്

രജിസ്ട്രിയിലെ ഓരോ പ്രോക്സിക്കും സാധ്യമായ മൂന്ന് മൂല്യങ്ങളുള്ള ഒരു `family` ഫീൽഡ് ഉണ്ട്; ഇത് ഒരു Zod enum ഉപയോഗിച്ച് സാധൂകരിക്കുന്നു:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ഫീൽഡിന്റെ സ്ഥിരസ്ഥിതി `"auto"` ആണ്; ഇത് മുമ്പുണ്ടായിരുന്ന ഡ്യുവൽ-സ്റ്റാക്ക് പെരുമാറ്റം നിലനിർത്തുന്നു. ഇത് `ipv4` അല്ലെങ്കിൽ `ipv6` ആയി സജ്ജീകരിക്കുന്നത് ആ പ്രോക്സിക്കായുള്ള കണക്ഷൻ ഫാമിലിയെ പിൻ ചെയ്യുന്നു.

അജ്ഞാതമായ ഏതൊരു മൂല്യവും `auto` ആയി ചുരുങ്ങുന്നുവെന്ന് ഉറപ്പാക്കാൻ, ഒരൊറ്റ ഹെൽപ്പറിലൂടെ നിർദ്ദേശം എല്ലായിടത്തും നോർമലൈസ് ചെയ്യപ്പെടുന്നു:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## ഇത് എന്തുകൊണ്ട് നിലവിലുണ്ട്

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)-ൽ അവതരിപ്പിച്ചു. ഇതിന് പ്രേരണയായ പ്രശ്നങ്ങൾ:

| പ്രശ്നം                                                 | നിർദ്ദേശം പരിഹരിക്കുന്നത്                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-മാത്രമുള്ള എഗ്രസ് IPv4-ലേക്ക് ചോർന്നുപോകുന്നത്** | ഒരു പ്രോക്സി ഹോസ്റ്റിന് A, AAAA റെക്കോർഡുകൾ രണ്ടും ഉള്ളപ്പോൾ (അല്ലെങ്കിൽ OS IPv4-ന് മുൻഗണന നൽകുമ്പോൾ), നിങ്ങൾ IPv6-മാത്രമുള്ള പാത ഉദ്ദേശിച്ചാലും Happy Eyeballs-ന് IPv4 വഴി പുറത്തേക്ക് കണക്റ്റ് ചെയ്യാം. `ipv6` പിൻ ചെയ്യുന്നത് ആ ചോർച്ച ഇല്ലാതാക്കുന്നു.                                                                                                                                    |
| **പങ്കിട്ട എഗ്രസ് അസാധാരണത്വം മൂലമുള്ള റദ്ദാക്കൽ**      | നിരവധി അക്കൗണ്ടുകൾ ഉയർന്ന വോള്യത്തിൽ **ഒരേ** IP വഴി എഗ്രസ് ചെയ്യുമ്പോൾ, റൊട്ടേറ്റിംഗ് പ്രൊവൈഡർമാർ (codex/openai) ടോക്കണുകൾ റദ്ദാക്കുന്നു. അക്കൗണ്ടുകളെ വ്യത്യസ്തവും പ്രവചനീയവുമായ എഗ്രസ് പാതകളിൽ നിലനിർത്തുന്നതിന്റെ ഭാഗമാണ് എഗ്രസ് ഫാമിലി നിയന്ത്രിക്കുന്നത് (ഇതിനൊപ്പം പ്രവർത്തിക്കുന്ന എഗ്രസ്-IP ഡയഗ്നോസ്റ്റിക്കുകൾക്കായി [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) കാണുക). |
| **കംപ്ലയൻസ്/ടെസ്റ്റിംഗിനായുള്ള നിർണായക എഗ്രസ്**         | ട്രാഫിക് ഒരു നിർദ്ദിഷ്ട ഫാമിലിയിലൂടെ പുറത്തേക്ക് പോകുന്നുവെന്ന് ഉറപ്പുനൽകേണ്ടപ്പോൾ, `auto` മതിയാകില്ല.                                                                                                                                                                                                                                                                                        |

ഈ നിർദ്ദേശം മനഃപൂർവം **ഓരോ പ്രോക്സിക്കും വെവ്വേറെ** ആണ്, ആഗോളമല്ല — നിങ്ങളുടെ പൂളിലെ വ്യത്യസ്ത പ്രോക്സികൾക്ക് വ്യത്യസ്ത നയങ്ങൾ ഉണ്ടായിരിക്കാം.

---

## മൂന്ന് മൂല്യങ്ങൾ

| മൂല്യം | UI ലേബൽ                       | പ്രവർത്തനം                                                                                                                                                         |
| ------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `സ്വയമേവ (ഡ്യുവൽ-സ്റ്റാക്ക്)` | OS ഫാമിലി തിരഞ്ഞെടുക്കുന്നു. IP ലിറ്ററൽ പ്രോക്സി ഹോസ്റ്റിന്, ഫാമിലി ലിറ്ററലിൽ തന്നെ അന്തർലീനമാണ്; ഹോസ്റ്റ്നെയിമിന്, രണ്ട് ഫാമിലികളും ഉപയോഗിക്കാം. ഇതാണ് ഡിഫോൾട്ട്. |
| `ipv4` | `IPv4 മാത്രം`                 | കണക്ഷൻ IPv4-ലേക്ക് നിശ്ചയിക്കുന്നു. പ്രോക്സി ഹോസ്റ്റിന് IPv4 (A) റെക്കോർഡ് ഇല്ലെങ്കിൽ സുരക്ഷിതമായി പരാജയപ്പെടുന്നു.                                                |
| `ipv6` | `IPv6 മാത്രം`                 | കണക്ഷൻ IPv6-ലേക്ക് നിശ്ചയിക്കുന്നു. പ്രോക്സി ഹോസ്റ്റിന് IPv6 (AAAA) റെക്കോർഡ് ഇല്ലെങ്കിൽ സുരക്ഷിതമായി പരാജയപ്പെടുന്നു.                                             |

UI സ്ട്രിംഗുകൾ `src/i18n/messages/en.json`-ലാണ് (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## ഇത് എങ്ങനെ കോൺഫിഗർ ചെയ്യാം

### ഡാഷ്ബോർഡ്

സെലക്ടർ **Proxy Pool** ടാബിലെ പ്രോക്സി ഫോമിലാണ്:

1. **Dashboard → Settings → Proxy → Proxy Pool** തുറക്കുക
2. ഒരു പ്രോക്സി ചേർക്കുക അല്ലെങ്കിൽ എഡിറ്റ് ചെയ്യുക
3. **IP family** ഡ്രോപ്പ്ഡൗൺ `സ്വയമേവ (ഡ്യുവൽ-സ്റ്റാക്ക്)`, `IPv4 മാത്രം`, അല്ലെങ്കിൽ `IPv6 മാത്രം` എന്നതിലൊന്നായി സജ്ജീകരിക്കുക
4. സേവ് ചെയ്യുക

ഈ കൺട്രോൾ `ProxyRegistryManager.tsx` ആണ് റെൻഡർ ചെയ്യുന്നത് (`proxy/ProxyPoolTab.tsx`-ൽ മൗണ്ട് ചെയ്തിരിക്കുന്നു).

### API

`family` ഫീൽഡ് പ്രോക്സി രജിസ്ട്രിയുടെ create/update പേലോഡുകളുടെ ഭാഗമാണ്. ഇത് `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) ഉപയോഗിച്ച് വാലിഡേറ്റ് ചെയ്യുകയും `POST` / `PATCH /api/v1/management/proxies` കൈകാര്യം ചെയ്യുകയും ചെയ്യുന്നു:

```bash
# IPv6 മാത്രം ഉപയോഗിക്കുന്ന ഒരു പ്രോക്സി സൃഷ്ടിക്കുക
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# നിലവിലുള്ള ഒരു പ്രോക്സിയെ IPv4 മാത്രം ഉപയോഗിക്കുന്നതായി മാറ്റുക
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

അപ്സ്ട്രീം-പ്രോക്സി എൻട്രികൾക്കായി ഉപയോഗിക്കുന്ന ഇൻലൈൻ പ്രോക്സി കോൺഫിഗ് ഒബ്ജക്റ്റും ഇതേ ഫീൽഡ് സ്വീകരിക്കുന്നു (`upstream_proxy_config.family`, [ഡാറ്റ മോഡൽ](#data-model) കാണുക).

പ്രോക്സിയുടെ ശേഷിക്കുന്ന CRUD/അസൈൻമെന്റ് API വിവരങ്ങൾക്ക്, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) കാണുക.

---

## `auto` എങ്ങനെ റിസോൾവ് ചെയ്യുന്നു

`family` എന്നത് `auto` ആയിരിക്കുമ്പോൾ, OmniRoute ഒരു ഡയറക്ടീവും കൂട്ടിച്ചേർക്കുന്നില്ല — പ്രോക്സി URL മാറ്റമില്ലാതെ ഉപയോഗിക്കുകയും കണക്ഷൻ ഫാമിലി അന്തർലീനമായി നിർണ്ണയിക്കപ്പെടുകയും ചെയ്യുന്നു.

URL നിർമ്മിക്കുന്ന സമയത്ത് (`open-sse/utils/proxyDispatcher.ts`-ലെ `proxyConfigToUrl` / `normalizeProxyUrl`), ഒരു `auto` പ്രോക്സി മാർക്കറില്ലാത്ത സാധാരണ URL നൽകുന്നു:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

ഡിസ്പാച്ച് ചെയ്യുന്ന സമയത്ത് (`resolveDispatcherFamily`), `auto` ഒരു IP ലിറ്ററൽ ഹോസ്റ്റിന്റെ അന്തർലീന ഫാമിലിയിലേക്കോ, ഹോസ്റ്റ്നെയിമാണെങ്കിൽ `null`-ലേക്കോ (OS തീരുമാനിക്കട്ടെ) റിസോൾവ് ചെയ്യുന്നു:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ഹോസ്റ്റ്നെയിമിന് null → OS തിരഞ്ഞെടുക്കുന്നു
  // ...
}
```

അതിനാൽ:

- `auto` + IP ലിറ്ററൽ ഹോസ്റ്റ് (`192.0.2.1` / `[2001:db8::1]`) → ആ ലിറ്ററലിന്റെ ഫാമിലി.
- `auto` + ഹോസ്റ്റ്നെയിം → `null` → സാധാരണ ഡ്യുവൽ-സ്റ്റാക്ക് OS റിസൊല്യൂഷൻ.

---

## `ipv4` / `ipv6` എങ്ങനെ നിർബന്ധമാക്കപ്പെടുന്നു

`auto` അല്ലാത്ത ഒരു നിർദ്ദേശം ഒറ്റ സിന്തറ്റിക് ക്വറി മാർക്കറായി — `?family=ipv4` അല്ലെങ്കിൽ `?family=ipv6` — നോർമലൈസ് ചെയ്ത പ്രോക്സി URL-ന്റെ അവസാനം ഒരിക്കൽ മാത്രം ചേർക്കപ്പെടുന്നു. പോർട്ട് പാർസിങ് ഒരിക്കലും തകരാറിലാകാതിരിക്കാൻ, ഈ മാർക്കർ കൃത്യമായി ഒരിക്കൽ മാത്രം നീക്കംചെയ്ത് വീണ്ടും ചേർക്കുന്നതിൽ `normalizeProxyUrl` ശ്രദ്ധ പുലർത്തുന്നു.

ഡിസ്പാച്ചർ നിർമ്മിക്കുമ്പോൾ, മാർക്കർ വായിക്കുകയും ഒരു നിർദ്ദിഷ്ട കണക്ഷൻ ഫാമിലിയായി പരിവർത്തനം ചെയ്യുകയും ചെയ്യുന്നു. ഹോസ്റ്റ് **വിപരീത** ഫാമിലിയിലുള്ള ഒരു IP ലിറ്ററൽ ആണെങ്കിൽ, OmniRoute ഒരു പിശക് എറിയുന്നു (വൈരുദ്ധ്യമുണ്ടെങ്കിൽ fail-closed ആകുന്നു):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

തുടർന്ന് നിർദ്ദിഷ്ട ഫാമിലി കണക്ടറിൽ പിൻ ചെയ്യപ്പെടുന്നു:

- **HTTP/HTTPS പ്രോക്സികൾ** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs പ്രവർത്തനരഹിതമാക്കുന്നതിനാൽ തിരഞ്ഞെടുത്ത ഫാമിലിയിലേക്ക് മാത്രമേ ഡയൽ ചെയ്യൂ.
- **SOCKS5 പ്രോക്സികൾ**: ഒരു കസ്റ്റം കണക്ടർ `socket_options: { family, autoSelectFamily: false }` എന്നത് SOCKS ക്ലയന്റിലേക്ക് കൈമാറുന്നു ([SOCKS5 അനുയോജ്യത](#socks5-compatibility) കാണുക).

---

## SOCKS5 അനുയോജ്യത

ഫാമിലി പിൻ SOCKS5 പ്രോക്സികളുമായി പ്രവർത്തിക്കുന്നു, എന്നാൽ പ്രോക്സി ഹോപ്പിന്റെ ഫാമിലി പിൻ ചെയ്യാൻ ആവശ്യമായ സോക്കറ്റ് ഓപ്ഷനുകൾ സാധാരണ `fetch-socks` ലഭ്യമാക്കുന്നില്ല. അതിനായി OmniRoute സ്വന്തം കണക്ടർ നൽകുന്നു:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`family` ഏതായാലും (`null` / ഒരു ഹോസ്റ്റ്നെയിമിലൂടെയുള്ള `auto` ഉൾപ്പെടെ), എല്ലാ SOCKS5 ഡിസ്പാച്ചുകളും `createSocksDispatcherWithFamily` വഴിയാണ് കടന്നുപോകുന്നത്: `buildSocksFamilySocketOptions(null)` `{}` നൽകുന്നു, കൂടാതെ IPv6-മാത്രമുള്ള എഗ്രസ് നയത്തിനായി Happy Eyeballs-ന് IPv4 തിരഞ്ഞെടുക്കാൻ കഴിയാത്തവിധം `socket_options` പിൻ ചെയ്തുകൊണ്ട് അതേ `SocksClient.createConnection` + TLS `buildConnector` പാത ഉപയോഗിക്കുന്നു.

SOCKS5 പിന്തുണ സ്വതവേ പ്രവർത്തനക്ഷമമാണ് (`ENABLE_SOCKS5_PROXY=false` വഴി ഒഴിവാക്കാം); [PROXY_GUIDE.md → പരിസ്ഥിതി വേരിയബിളുകൾ](../ops/PROXY_GUIDE.md#environment-variables) കാണുക.

---

## Fail-Closed പെരുമാറ്റം

തെറ്റായ ഫാമിലിയിലേക്ക് നിശ്ശബ്ദമായി ഫാൾബാക്ക് ചെയ്യുന്നതിനു പകരം അത് **നിരസിക്കുക** എന്നതാണ് ഈ നിർദ്ദേശത്തിന്റെ പ്രധാന ഉദ്ദേശ്യം. രണ്ട് ഗാർഡുകൾ ഇത് നിർബന്ധമാക്കുന്നു:

1. **ലിറ്ററൽ വൈരുദ്ധ്യം** — ഒരു IP-ലിറ്ററൽ ഹോസ്റ്റുമായി വൈരുദ്ധ്യമുള്ള നിർദ്ദേശം ഡിസ്പാച്ചർ നിർമ്മിക്കുന്ന സമയത്ത് ഒരു പിശക് എറിയുന്നു (`resolveDispatcherFamily`, മുകളിൽ കാണിച്ചിരിക്കുന്നു).

2. **ഹോസ്റ്റ്നെയിം പ്രീ-ഫ്ലൈറ്റ് DNS പരിശോധന** — പിൻ ചെയ്ത ഫാമിലിയുള്ള ഒരു ഹോസ്റ്റ്നെയിം പ്രോക്സിക്കായി, എഗ്രസ് ചെയ്യുന്നതിന് **മുമ്പ്** ആവശ്യമായ ഫാമിലിയിൽ ഹോസ്റ്റ്നെയിമിന് യഥാർഥത്തിൽ ഒരു റെക്കോർഡ് ഉണ്ടെന്ന് `proxyFetch.ts`, `assertHostnameSupportsFamily` വഴി പരിശോധിക്കുന്നു:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   പരാജയപ്പെട്ടാൽ, `proxyFetch.ts` പിശകിന് `code = "PROXY_FAMILY_UNAVAILABLE"` എന്നും `statusCode = 503` എന്നും ടാഗ് ചെയ്യുന്നു. DNS റെസല്യൂഷൻ പരാജയവും സമാനമായി fail-closed ആയി കണക്കാക്കപ്പെടുന്നു (എഗ്രസ് നിരസിക്കുന്നു).

IP-ലിറ്ററൽ ഹോസ്റ്റുകൾക്ക് DNS പ്രീ-ഫ്ലൈറ്റ് യാതൊരു പ്രവർത്തനവും നടത്തില്ല — അവയുടെ ഫാമിലി അവയിൽത്തന്നെ അന്തർലീനമായതിനാൽ ലുക്കപ്പ് ആവശ്യമില്ല.

---

## ഡാറ്റാ മോഡൽ

`099_proxy_family.sql` മൈഗ്രേഷൻ വഴി **രണ്ട്** ടേബിളുകളിൽ `family` കോളം ചേർത്തു:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — രജിസ്ട്രി എൻട്രികൾക്കുള്ള ഓരോ പ്രോക്സിയുടെയും നിർദ്ദേശം (`src/lib/db/proxies.ts`). റെസല്യൂഷൻ ക്വറികൾ മറ്റ് പ്രോക്സി കോളങ്ങൾക്കൊപ്പം `family` തിരഞ്ഞെടുക്കുന്നു; മൂല്യം ഇല്ലെങ്കിലോ സ്ട്രിംഗ് അല്ലെങ്കിലോ അത് `"auto"` ആയി നിർബന്ധിതമായി മാറ്റുന്നു.
- `upstream_proxy_config.family` — അപ്സ്ട്രീം-പ്രോക്സി എൻട്രികൾക്കുള്ള നിർദ്ദേശം (`src/lib/db/upstreamProxy.ts`), ഇതിലും അതേ `"auto"` ഡിഫോൾട്ടാണ്.

റെസോൾവ് ചെയ്ത ഒരു പ്രോക്സി ഒബ്ജക്റ്റിൽ `auto` അല്ലാത്ത `family` ഉണ്ടെങ്കിൽ, ആ പിൻ ഡിസ്പാച്ചർ വരെ നിലനിൽക്കുന്നതിനായി `proxyConfigToUrl`, `?family=` മാർക്കർ ചേർക്കുന്നു.

---

## അനുബന്ധ ഡോക്യുമെന്റേഷൻ

> 📖 **അനുബന്ധ ഡോക്യുമെന്റേഷൻ:**
>
> - [പ്രോക്സി ഗൈഡ്](../ops/PROXY_GUIDE.md) — സമ്പൂർണ്ണ പ്രോക്സി സിസ്റ്റം: രജിസ്ട്രി CRUD, 4-തല റെസല്യൂഷൻ, റൊട്ടേഷൻ, ആരോഗ്യ പരിശോധന, API റഫറൻസ്
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs`-ലേക്ക് കംപൈൽ ചെയ്തിട്ടില്ല) — പ്രോക്സിക്ക് മുകളിൽ പ്രവർത്തിക്കുന്ന TLS ഫിംഗർപ്രിന്റ്, CLI ഫിംഗർപ്രിന്റ് ലെയറുകൾ
> - [റൂട്ട് ഗാർഡ് ടിയറുകൾ](./ROUTE_GUARD_TIERS.md) — ലോക്കൽ-ഒൺലി റൂട്ടുകൾക്കുള്ള ലൂപ്പ്ബാക്ക് നിർബന്ധനം
