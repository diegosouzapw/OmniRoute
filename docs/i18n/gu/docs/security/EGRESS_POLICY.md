# Egress IP Family Policy (IPv4/IPv6) (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **દરેક proxy માટે outbound traffic ને એક જ IP family — `auto`, `ipv4`, અથવા `ipv6` — સાથે નિશ્ચિત કરો, જેથી IPv6-only egress ક્યારેય ચૂપચાપ ફરી IPv4 પર લીક ન થાય.**

> **સત્યનો સ્રોત:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute દરેક proxy ને **address-family egress directive** રાખવાની સુવિધા આપે છે. મૂળભૂત રીતે OS IPv4 અથવા IPv6 પસંદ કરે છે (dual-stack, "Happy Eyeballs"). જ્યારે તમે directive ને `ipv4` અથવા `ipv6` પર સેટ કરો છો, ત્યારે OmniRoute તે proxy મારફતે થતા દરેક connection ને પસંદ કરેલી family સાથે નિશ્ચિત કરે છે અને બીજી family પર fallback કરવાને બદલે **બંધ સ્થિતિમાં નિષ્ફળ થાય છે**.

આ પેજ directive શું છે, તે શા માટે અસ્તિત્વમાં છે, તમે તેને ક્યાં configure કરી શકો છો અને runtime તેને કેવી રીતે resolve કરે છે તેનું દસ્તાવેજીકરણ કરે છે.

---

## વિષયસૂચિ

- [તે શું છે](#what-it-is)
- [તે શા માટે અસ્તિત્વમાં છે](#why-it-exists)
- [ત્રણ મૂલ્યો](#the-three-values)
- [તેને કેવી રીતે configure કરવું](#how-to-configure-it)
- [`auto` કેવી રીતે resolve થાય છે](#how-auto-resolves)
- [`ipv4` / `ipv6` કેવી રીતે લાગુ કરવામાં આવે છે](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 સુસંગતતા](#socks5-compatibility)
- [બંધ સ્થિતિમાં નિષ્ફળ થવાનું વર્તન](#fail-closed-behavior)
- [ડેટા મોડેલ](#data-model)
- [સંબંધિત દસ્તાવેજીકરણ](#related-documentation)

---

## તે શું છે

registry માંના દરેક proxy માં ત્રણ સંભવિત મૂલ્યો ધરાવતું `family` field હોય છે, જેને Zod enum દ્વારા validate કરવામાં આવે છે:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

આ field નું મૂળભૂત મૂલ્ય `"auto"` છે, જે અગાઉનું dual-stack વર્તન જાળવી રાખે છે. તેને `ipv4` અથવા `ipv6` પર સેટ કરવાથી તે proxy માટે connect family નિશ્ચિત થાય છે.

directive ને સર્વત્ર એક જ helper દ્વારા normalize કરવામાં આવે છે, જેથી કોઈપણ અજ્ઞાત મૂલ્ય `auto` માં રૂપાંતરિત થાય:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## તે શા માટે અસ્તિત્વમાં છે

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) માં રજૂ કરવામાં આવ્યું. તેને રજૂ કરવા પાછળની સમસ્યાઓ:

| સમસ્યા                                           | directive શું સુધારે છે                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **IPv6-only egress નું IPv4 પર લીક થવું**        | જ્યારે proxy host પાસે A અને AAAA બંને records હોય (અથવા OS IPv4 ને પ્રાધાન્ય આપતું હોય), ત્યારે તમે IPv6-only path ઇચ્છતા હોવા છતાં Happy Eyeballs IPv4 મારફતે બહાર dial કરી શકે છે. `ipv6` નિશ્ચિત કરવાથી તે લીક દૂર થાય છે.                                                                                                                         |
| **shared-egress anomaly ને કારણે revocation**    | જ્યારે ઘણા accounts ઊંચા volume સાથે **સમાન** IP મારફતે egress કરે છે, ત્યારે rotating providers (codex/openai) tokens revoke કરે છે. egress family ને નિયંત્રિત કરવું એ accounts ને અલગ અને અનુમાનિત egress paths પર રાખવાનો એક ભાગ છે (તેની સાથે સંકળાયેલા egress-IP diagnostics માટે [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) જુઓ). |
| **compliance/testing માટે deterministic egress** | જ્યારે તમારે ખાતરી આપવી જરૂરી હોય કે traffic ચોક્કસ family મારફતે બહાર જાય છે, ત્યારે `auto` પૂરતું નથી.                                                                                                                                                                                                                                               |

directive ઇરાદાપૂર્વક global નહીં પરંતુ **દરેક proxy દીઠ** છે — તમારા pool માં અલગ-अलग proxies ની policies અલગ હોઈ શકે છે.

---

## ત્રણ મૂલ્યો

| મૂલ્ય  | UI લેબલ                   | વર્તણૂક                                                                                                                                          |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `સ્વચાલિત (ડ્યુઅલ-સ્ટૅક)` | OS ફૅમિલી પસંદ કરે છે. IP-લિટરલ પ્રૉક્સી હોસ્ટ માટે, ફૅમિલી લિટરલમાં જ અંતર્નિહિત હોય છે; હોસ્ટનેમ માટે, બંને ફૅમિલી પાત્ર હોય છે. આ ડિફૉલ્ટ છે. |
| `ipv4` | `ફક્ત IPv4`               | કનેક્શનને IPv4 પર નિશ્ચિત કરે છે. જો પ્રૉક્સી હોસ્ટ પાસે IPv4 (A) રેકોર્ડ ન હોય, તો સુરક્ષિત રીતે નિષ્ફળ જાય છે.                                 |
| `ipv6` | `ફક્ત IPv6`               | કનેક્શનને IPv6 પર નિશ્ચિત કરે છે. જો પ્રૉક્સી હોસ્ટ પાસે IPv6 (AAAA) રેકોર્ડ ન હોય, તો સુરક્ષિત રીતે નિષ્ફળ જાય છે.                              |

UI સ્ટ્રિંગ્સ `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) માં છે.

---

## તેને કેવી રીતે કૉન્ફિગર કરવું

### ડૅશબોર્ડ

પસંદગીકાર **પ્રૉક્સી પૂલ** ટૅબના પ્રૉક્સી ફૉર્મમાં છે:

1. **ડૅશબોર્ડ → સેટિંગ્સ → પ્રૉક્સી → પ્રૉક્સી પૂલ** ખોલો
2. પ્રૉક્સી ઉમેરો અથવા સંપાદિત કરો
3. **IP ફૅમિલી** ડ્રૉપડાઉનને `સ્વચાલિત (ડ્યુઅલ-સ્ટૅક)`, `ફક્ત IPv4`, અથવા `ફક્ત IPv6` પર સેટ કરો
4. સાચવો

આ કન્ટ્રોલ `ProxyRegistryManager.tsx` દ્વારા રેન્ડર થાય છે (`proxy/ProxyPoolTab.tsx` માં માઉન્ટ કરેલું).

### API

`family` ફીલ્ડ પ્રૉક્સી રજિસ્ટ્રીના બનાવો/અપડેટ કરો પેલોડ્સનો ભાગ છે, જેને `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) દ્વારા માન્ય કરવામાં આવે છે અને `POST` / `PATCH /api/v1/management/proxies` દ્વારા સંચાલિત કરવામાં આવે છે:

```bash
# ફક્ત IPv6 વાપરતી પ્રૉક્સી બનાવો
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# હાલની પ્રૉક્સીને ફક્ત IPv4 પર બદલો
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

આ જ ફીલ્ડ અપસ્ટ્રીમ-પ્રૉક્સી એન્ટ્રીઓ માટે વપરાતા ઇનલાઇન પ્રૉક્સી કૉન્ફિગ ઑબ્જેક્ટ દ્વારા પણ સ્વીકારવામાં આવે છે (`upstream_proxy_config.family`, [ડેટા મૉડેલ](#data-model) જુઓ).

પ્રૉક્સીના બાકીના CRUD/અસાઇનમેન્ટ API માટે, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) જુઓ.

---

## `auto` કેવી રીતે ઉકેલાય છે

જ્યારે `family` નું મૂલ્ય `auto` હોય, ત્યારે OmniRoute કોઈ પણ ડિરેક્ટિવ ઉમેરતું **નથી** — પ્રૉક્સી URL નો જેમ છે તેમ ઉપયોગ થાય છે અને કનેક્ટ ફૅમિલી અંતર્નિહિત રીતે નક્કી થાય છે.

URL બનાવતી વખતે (`open-sse/utils/proxyDispatcher.ts` માં `proxyConfigToUrl` / `normalizeProxyUrl`), `auto` પ્રૉક્સી કોઈ માર્કર વિનાનું સાદું URL આપે છે:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

ડિસ્પૅચ કરતી વખતે (`resolveDispatcherFamily`), `auto` IP-લિટરલ હોસ્ટની અંતર્નિહિત ફૅમિલીમાં ઉકેલાય છે અથવા હોસ્ટનેમ માટે `null` (OS ને નિર્ણય લેવા દો) બને છે:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // હોસ્ટનેમ માટે null → OS પસંદ કરે છે
  // ...
}
```

તેથી:

- `auto` + IP-લિટરલ હોસ્ટ (`192.0.2.1` / `[2001:db8::1]`) → તે લિટરલની ફૅમિલી.
- `auto` + હોસ્ટનેમ → `null` → પ્રમાણભૂત ડ્યુઅલ-સ્ટૅક OS રિઝોલ્યુશન.

---

## `ipv4` / `ipv6` કેવી રીતે લાગુ કરવામાં આવે છે

બિન-`auto` નિર્દેશ એક જ કૃત્રિમ ક્વેરી માર્કર તરીકે પસાર થાય છે — `?family=ipv4` અથવા `?family=ipv6` — જેને સામાન્યકૃત પ્રોક્સી URL સાથે માત્ર એક વાર જોડવામાં આવે છે. `normalizeProxyUrl` આ માર્કરને ચોક્કસ એક જ વાર દૂર કરીને ફરી જોડવાની કાળજી રાખે છે, જેથી તે પોર્ટ પાર્સિંગને ક્યારેય બગાડતું નથી.

ડિસ્પેચર બનાવવામાં આવે ત્યારે, માર્કરને વાંચીને તેને ચોક્કસ કનેક્ટ ફેમિલીમાં રૂપાંતરિત કરવામાં આવે છે. જો હોસ્ટ **વિપરીત** ફેમિલીનું IP લિટરલ હોય, તો OmniRoute ભૂલ ફેંકે છે (વિરોધાભાસ માટે fail-closed વર્તન અપનાવવામાં આવે છે):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

ત્યારબાદ ચોક્કસ ફેમિલીને કનેક્ટર પર નિશ્ચિત કરવામાં આવે છે:

- **HTTP/HTTPS પ્રોક્સીઓ** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballsને અક્ષમ કરે છે, જેથી માત્ર પસંદ કરેલી ફેમિલી સાથે જ કનેક્શન કરવાનો પ્રયાસ થાય.
- **SOCKS5 પ્રોક્સીઓ**: કસ્ટમ કનેક્ટર SOCKS ક્લાયન્ટમાં `socket_options: { family, autoSelectFamily: false }` પસાર કરે છે ([SOCKS5 સુસંગતતા](#socks5-compatibility) જુઓ).

---

## SOCKS5 સુસંગતતા

ફેમિલી પિન SOCKS5 પ્રોક્સીઓ સાથે કાર્ય કરે છે, પરંતુ મૂળભૂત `fetch-socks` પ્રોક્સી હૉપની ફેમિલીને પિન કરવા માટે જરૂરી સૉકેટ વિકલ્પો પ્રદાન કરતું નથી. તેના માટે OmniRoute પોતાનું કનેક્ટર આપે છે:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

બધા SOCKS5 ડિસ્પેચ `family`ને ધ્યાનમાં લીધા વિના `createSocksDispatcherWithFamily` મારફતે જાય છે (હોસ્ટનામ પર `null` / `auto` સહિત): `buildSocksFamilySocketOptions(null)` `{}` આપે છે અને એ જ `SocksClient.createConnection` + TLS `buildConnector` પાથનો ઉપયોગ `socket_options` પિનિંગ સાથે થાય છે, જેથી Happy Eyeballs માત્ર IPv6 ઇગ્રેસ નીતિ માટે IPv4 પસંદ ન કરી શકે.

SOCKS5 સપોર્ટ મૂળભૂત રીતે સક્ષમ હોય છે (`ENABLE_SOCKS5_PROXY=false` દ્વારા તેને અક્ષમ કરી શકાય છે); [PROXY_GUIDE.md → પર્યાવરણ વેરિએબલ્સ](../ops/PROXY_GUIDE.md#environment-variables) જુઓ.

---

## Fail-Closed વર્તન

આ નિર્દેશનો મુખ્ય હેતુ ખોટી ફેમિલી પર ચૂપચાપ પાછા જવાને બદલે તેને **નકારવાનો** છે. બે સુરક્ષા તપાસો આ વર્તન લાગુ કરે છે:

1. **લિટરલ વિરોધાભાસ** — IP-લિટરલ હોસ્ટ સાથે વિરોધાભાસ ધરાવતો નિર્દેશ ડિસ્પેચર બનાવતી વખતે ભૂલ ફેંકે છે (`resolveDispatcherFamily`, ઉપર દર્શાવેલું).

2. **હોસ્ટનામની પૂર્વ-ઉડાન DNS તપાસ** — પિન કરેલી ફેમિલી ધરાવતા હોસ્ટનામ પ્રોક્સી માટે, `proxyFetch.ts` ઇગ્રેસ કરતા **પહેલાં** `assertHostnameSupportsFamily` દ્વારા ચકાસે છે કે હોસ્ટનામ પાસે ખરેખર જરૂરી ફેમિલીનો રેકોર્ડ છે:

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

   નિષ્ફળતા પર, `proxyFetch.ts` ભૂલને `code = "PROXY_FAMILY_UNAVAILABLE"` અને `statusCode = 503`થી ટૅગ કરે છે. DNS રિઝોલ્યુશનની નિષ્ફળતાને પણ fail-closed તરીકે જ ગણવામાં આવે છે (ઇગ્રેસ કરવાનો ઇનકાર થાય છે).

IP-લિટરલ હોસ્ટ માટે DNS પૂર્વ-ઉડાન તપાસ કોઈ કાર્યવાહી કરતી નથી — તેમની ફેમિલી સ્વાભાવિક રીતે નિર્ધારિત હોય છે અને તેને લુકઅપની જરૂર નથી.

---

## ડેટા મોડેલ

`family` કૉલમ માઇગ્રેશન `099_proxy_family.sql` દ્વારા **બે** ટેબલમાં ઉમેરવામાં આવી હતી:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — રજિસ્ટ્રી એન્ટ્રીઓ માટેની પ્રતિ-પ્રોક્સી ડાયરેક્ટિવ (`src/lib/db/proxies.ts`). રિઝોલ્યુશન ક્વેરીઓ અન્ય પ્રોક્સી કૉલમની સાથે `family` પણ પસંદ કરે છે, અને ગેરહાજર/નોન-સ્ટ્રિંગ મૂલ્યને `"auto"`માં રૂપાંતરિત કરવામાં આવે છે.
- `upstream_proxy_config.family` — અપસ્ટ્રીમ-પ્રોક્સી એન્ટ્રીઓ માટેની ડાયરેક્ટિવ (`src/lib/db/upstreamProxy.ts`), સમાન `"auto"` ડિફૉલ્ટ સાથે.

જ્યારે રિઝોલ્વ થયેલ પ્રોક્સી ઑબ્જેક્ટમાં નોન-`auto` `family` હોય છે, ત્યારે `proxyConfigToUrl` `?family=` માર્કર ઉમેરે છે, જેથી પિન ડિસ્પેચર સુધી જળવાઈ રહે.

---

## સંબંધિત દસ્તાવેજીકરણ

> 📖 **સંબંધિત દસ્તાવેજીકરણ:**
>
> - [પ્રોક્સી માર્ગદર્શિકા](../ops/PROXY_GUIDE.md) — સંપૂર્ણ પ્રોક્સી સિસ્ટમ: રજિસ્ટ્રી CRUD, 4-સ્તરીય રિઝોલ્યુશન, રોટેશન, હેલ્થ ચેકિંગ, API સંદર્ભ
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs`માં કમ્પાઇલ કરાયેલ નથી) — પ્રોક્સી પર કાર્યરત TLS ફિંગરપ્રિન્ટ અને CLI ફિંગરપ્રિન્ટ સ્તરો
> - [રૂટ ગાર્ડ સ્તરો](./ROUTE_GUARD_TIERS.md) — માત્ર-સ્થાનિક રૂટ્સ માટે લૂપબૅક અમલીકરણ
