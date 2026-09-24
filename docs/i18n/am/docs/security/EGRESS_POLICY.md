# Egress IP Family Policy (IPv4/IPv6) (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ወደ ውጭ የሚላክ ትራፊክን ለእያንዳንዱ proxy ወደ አንድ IP family — `auto`፣ `ipv4` ወይም `ipv6` — ይወስኑ፤ በዚህም IPv6-only egress ሳይታወቅ ወደ IPv4 ተመልሶ እንዳያፈስ።**

> **የእውነት ምንጭ፦** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute እያንዳንዱ proxy **የአድራሻ-family egress መመሪያ** እንዲኖረው ያስችላል። በነባሪነት OS IPv4 ወይም IPv6ን (dual-stack፣ "Happy Eyeballs") ይመርጣል። መመሪያውን ወደ `ipv4` ወይም `ipv6` ሲያዘጋጁ፣ OmniRoute በዚያ proxy በኩል የሚደረጉ ሁሉንም ግንኙነቶች በተመረጠው family ላይ ይወስናል፤ ወደ ሌላኛው family ከመመለስ ይልቅ **በተዘጋ ሁኔታ ይከሽፋል**።

ይህ ገጽ መመሪያው ምን እንደሆነ፣ ለምን እንደሚያስፈልግ፣ የት እንደሚዋቀር እና runtime እንዴት እንደሚፈታው ይገልጻል።

---

## የይዘት ማውጫ

- [ምንድን ነው](#what-it-is)
- [ለምን ያስፈልጋል](#why-it-exists)
- [ሦስቱ እሴቶች](#the-three-values)
- [እንዴት ማዋቀር እንደሚቻል](#how-to-configure-it)
- [`auto` እንዴት እንደሚፈታ](#how-auto-resolves)
- [`ipv4` / `ipv6` እንዴት ተፈጻሚ እንደሚደረጉ](#how-ipv4--ipv6-are-enforced)
- [የSOCKS5 ተኳኋኝነት](#socks5-compatibility)
- [በተዘጋ ሁኔታ የመክሸፍ ባህሪ](#fail-closed-behavior)
- [የውሂብ ሞዴል](#data-model)
- [ተዛማጅ ሰነዶች](#related-documentation)

---

## ምንድን ነው

በregistry ውስጥ ያለ እያንዳንዱ proxy በZod enum የሚረጋገጡ ሦስት ሊሆኑ የሚችሉ እሴቶች ያሉት `family` field አለው፦

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

fieldው የቀድሞውን dual-stack ባህሪ ወደሚጠብቀው `"auto"` በነባሪነት ይዘጋጃል። ወደ `ipv4` ወይም `ipv6` ማዘጋጀት የዚያን proxy የግንኙነት family ይወስናል።

ማንኛውም ያልታወቀ እሴት ወደ `auto` እንዲቀየር፣ መመሪያው በሁሉም ቦታ በአንድ helper አማካኝነት normalize ይደረጋል፦

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## ለምን ያስፈልጋል

በPR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) ተዋውቋል። ይህን ለመፍጠር ምክንያት የሆኑት ችግሮች፦

| ችግር                               | መመሪያው የሚያስተካክለው                                                                                                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **IPv6-only egress ወደ IPv4 መፍሰስ** | አንድ proxy host ሁለቱንም A እና AAAA records ሲኖሩት (ወይም OS IPv4ን ሲመርጥ)፣ IPv6-only path ቢፈልጉም Happy Eyeballs በIPv4 በኩል ወደ ውጭ ግንኙነት ሊጀምር ይችላል። `ipv6`ን መወሰን ያንን ፍሰት ያስወግዳል።                                                                                                                               |
| **የጋራ egress anomaly ስረዛ**        | ብዙ accounts በከፍተኛ volume **በአንድ** IP በኩል egress ሲያደርጉ፣ rotating providers (codex/openai) tokensን ይሰርዛሉ። egress familyን መቆጣጠር accountsን በተለያዩና ሊተነበዩ በሚችሉ egress paths ላይ የማቆየት አካል ነው (ከዚህ ጋር አብረው ለሚሰሩ የegress-IP diagnostics [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)ን ይመልከቱ)። |
| **ለሕግ ተገዢነት/ሙከራ የሚወሰን egress**    | ትራፊክ በተወሰነ family በኩል ወደ ውጭ መሄዱን ማረጋገጥ ሲኖርብዎት፣ `auto` በቂ አይደለም።                                                                                                                                                                                                                                  |

መመሪያው ሆን ተብሎ **ለእያንዳንዱ proxy** እንጂ global እንዳይሆን ተደርጓል — በpoolዎ ውስጥ ያሉ የተለያዩ proxies የተለያዩ policies ሊኖራቸው ይችላል።

---

## ሦስቱ እሴቶች

| እሴት    | የUI መለያ             | ባህሪ                                                                                                                    |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `auto` | `ራስ-ሰር (ባለሁለት-ስታክ)` | OS የIP ቤተሰቡን ይመርጣል። ለIP-ሊተራል ፕሮክሲ አስተናጋጅ፣ ቤተሰቡ በሊተራሉ ውስጥ በተፈጥሮ የተወሰነ ነው፤ ለአስተናጋጅ ስም ደግሞ ሁለቱም ቤተሰቦች ብቁ ናቸው። ይህ ነባሪው ነው። |
| `ipv4` | `IPv4 ብቻ`           | ግንኙነቱን በIPv4 ላይ ይገድባል። የፕሮክሲ አስተናጋጁ የIPv4 (A) መዝገብ ከሌለው ግንኙነቱን በአስተማማኝ ሁኔታ ይከለክላል።                                     |
| `ipv6` | `IPv6 ብቻ`           | ግንኙነቱን በIPv6 ላይ ይገድባል። የፕሮክሲ አስተናጋጁ የIPv6 (AAAA) መዝገብ ከሌለው ግንኙነቱን በአስተማማኝ ሁኔታ ይከለክላል።                                  |

የUI ሕብረቁምፊዎች በ`src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) ውስጥ ይገኛሉ።

---

## እንዴት ማዋቀር እንደሚቻል

### ዳሽቦርድ

መራጩ በ**Proxy Pool** ትር የፕሮክሲ ቅጽ ውስጥ ይገኛል፦

1. **Dashboard → Settings → Proxy → Proxy Pool** ይክፈቱ
2. ፕሮክሲ ያክሉ ወይም ያርትዑ
3. የ**IP ቤተሰብ** ተቆልቋይ ምናሌን ወደ `ራስ-ሰር (ባለሁለት-ስታክ)`፣ `IPv4 ብቻ` ወይም `IPv6 ብቻ` ያቀናብሩ
4. ያስቀምጡ

መቆጣጠሪያው በ`ProxyRegistryManager.tsx` ይሰራል (`proxy/ProxyPoolTab.tsx` ውስጥ የተጫነ)።

### API

የ`family` መስክ የፕሮክሲ መዝገብ መፍጠሪያ/ማዘመኛ payload-ዎች አካል ነው፤ በ`createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) ይረጋገጣል እና በ`POST` / `PATCH /api/v1/management/proxies` ይስተናገዳል፦

```bash
# IPv6-ብቻ ፕሮክሲ ይፍጠሩ
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# ነባር ፕሮክሲን ወደ IPv4-ብቻ ይቀይሩ
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

ይህ መስክ ለupstream-proxy ግቤቶች በሚያገለግለው የውስጥ መስመር ፕሮክሲ ውቅር ነገርም ተቀባይነት አለው (`upstream_proxy_config.family`፣ [የውሂብ ሞዴል](#data-model)ን ይመልከቱ)።

ስለተቀረው የፕሮክሲ CRUD/ምደባ API፣ [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)ን ይመልከቱ።

---

## `auto` እንዴት እንደሚፈታ

`family` `auto` ሲሆን፣ OmniRoute ምንም መመሪያ **አይጨምርም** — የፕሮክሲ URL እንዳለ ጥቅም ላይ ይውላል፣ የግንኙነቱ ቤተሰብም በተፈጥሮ ይወሰናል።

URL በሚገነባበት ጊዜ (`proxyConfigToUrl` / `normalizeProxyUrl` በ`open-sse/utils/proxyDispatcher.ts` ውስጥ)፣ `auto` ፕሮክሲ ምንም ምልክት የሌለው ቀላል URL ያስገኛል፦

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

በመላኪያ ጊዜ (`resolveDispatcherFamily`)፣ `auto` ወደ IP-ሊተራል አስተናጋጅ ተፈጥሯዊ ቤተሰብ ይፈታል፤ ለአስተናጋጅ ስም ደግሞ ወደ `null` (OS እንዲወስን ይተዋል) ይፈታል፦

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ለአስተናጋጅ ስም null → OS ይመርጣል
  // ...
}
```

ስለዚህ፦

- `auto` + IP-ሊተራል አስተናጋጅ (`192.0.2.1` / `[2001:db8::1]`) → የዚያ ሊተራል ቤተሰብ።
- `auto` + የአስተናጋጅ ስም → `null` → መደበኛ ባለሁለት-ስታክ የOS መፍታት።

---

## `ipv4` / `ipv6` እንዴት እንደሚያስገደዱ

`auto` ያልሆነ መመሪያ እንደ አንድ ሰው-ሠራሽ የጥያቄ ምልክት — `?family=ipv4` ወይም `?family=ipv6` — ይተላለፋል፤ ይህም ወደ መደበኛ ቅርጽ በተቀየረው የፕሮክሲ URL ላይ አንድ ጊዜ ይጨመራል። `normalizeProxyUrl` ይህን ምልክት በትክክል አንድ ጊዜ ለማስወገድና እንደገና ለመጨመር ጥንቃቄ ያደርጋል፤ በዚህም የፖርት ትንተናን በፍጹም አያበላሽም።

dispatcher ሲገነባ፣ ምልክቱ ተነቦ ወደ ተጨባጭ የግንኙነት family ይቀየራል። host ከ**ተቃራኒው** family የሆነ IP literal ከሆነ፣ OmniRoute ስህተት ይጥላል (ተቃርኖው fail-closed ነው)፦

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

ከዚያም ተጨባጩ family በconnector ላይ በቋሚነት ይወሰናል፦

- **HTTP/HTTPS ፕሮክሲዎች** (`ProxyAgent`)፦ `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballsን ያሰናክላል፤ ስለዚህ ግንኙነት የሚደረገው በተመረጠው family ብቻ ነው።
- **SOCKS5 ፕሮክሲዎች**፦ ብጁ connector `socket_options: { family, autoSelectFamily: false }`ን ወደ SOCKS client ያስተላልፋል ([የSOCKS5 ተኳኋኝነት](#socks5-compatibility)ን ይመልከቱ)።

---

## የSOCKS5 ተኳኋኝነት

የfamily ቋሚ ምርጫው ከSOCKS5 ፕሮክሲዎች ጋር ይሰራል፤ ነገር ግን መደበኛው `fetch-socks` የፕሮክሲውን hop family በቋሚነት ለመወሰን የሚያስፈልጉትን socket options አያቀርብም። OmniRoute ለዚህ የራሱን connector ያቀርባል፦

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

ሁሉም የSOCKS5 dispatch ሂደቶች `family` ምንም ይሁን ምን (`null` / `auto`ን በhostname ላይ መጠቀምን ጨምሮ) በ`createSocksDispatcherWithFamily` በኩል ያልፋሉ፦ `buildSocksFamilySocketOptions(null)` `{}`ን ይሰጣል፤ እና Happy Eyeballs ለIPv6 ብቻ በተወሰነ egress policy ውስጥ IPv4ን መምረጥ እንዳይችል፣ ተመሳሳዩ `SocksClient.createConnection` + TLS `buildConnector` መንገድ ከ`socket_options` ቋሚ ምርጫ ጋር ጥቅም ላይ ይውላል።

የSOCKS5 ድጋፍ ራሱ በነባሪነት ነቅቷል (በ`ENABLE_SOCKS5_PROXY=false` በኩል ማሰናከል ይቻላል)፤ [PROXY_GUIDE.md → የአካባቢ ተለዋዋጮች](../ops/PROXY_GUIDE.md#environment-variables)ን ይመልከቱ።

---

## Fail-Closed ባህሪ

የመመሪያው ዋና ዓላማ በዝምታ ወደ ተሳሳተው family ከመመለስ ይልቅ **እምቢ ማለት** ነው። ይህን የሚያስገድዱ ሁለት ጥበቃዎች አሉ፦

1. **የliteral ተቃርኖ** — ከIP-literal host ጋር የሚቃረን መመሪያ dispatcher በሚገነባበት ጊዜ ስህተት ይጥላል (`resolveDispatcherFamily`፣ ከላይ ታይቷል)።

2. **የhostname ቅድመ-በረራ DNS ማረጋገጫ** — በቋሚ family ለተወሰነ hostname ፕሮክሲ፣ `proxyFetch.ts` በ`assertHostnameSupportsFamily` በኩል፣ egress ከማድረጉ **በፊት** hostnameው በተፈለገው family ውስጥ በእርግጥ record እንዳለው ያረጋግጣል፦

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

   ሲሳካ ካልቻለ፣ `proxyFetch.ts` ስህተቱን `code = "PROXY_FAMILY_UNAVAILABLE"` እና `statusCode = 503` በሚሉ መለያዎች ይሰይማል። የDNS resolution አለመሳካትም በተመሳሳይ እንደ fail-closed ይቆጠራል (egress ማድረግን ይከለክላል)።

IP-literal hosts ለDNS ቅድመ-በረራ ማረጋገጫ no-op ናቸው — familyያቸው በራሳቸው የተወሰነ ስለሆነ ምንም lookup አያስፈልገውም።

---

## የውሂብ ሞዴል

የ`family` ዓምድ በ`099_proxy_family.sql` ማይግሬሽን ወደ **ሁለት** ሰንጠረዦች ታክሏል፦

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — ለሬጂስትሪ ግቤቶች በእያንዳንዱ ፕሮክሲ ላይ የሚተገበር መመሪያ (`src/lib/db/proxies.ts`)። የመፍትሔ መጠይቆች `family`ን ከሌሎቹ የፕሮክሲ ዓምዶች ጋር ይመርጣሉ፤ የጎደለ ወይም ሕብረቁምፊ ያልሆነ እሴት ወደ `"auto"` ይቀየራል።
- `upstream_proxy_config.family` — ለአፕስትሪም-ፕሮክሲ ግቤቶች መመሪያ (`src/lib/db/upstreamProxy.ts`)፣ በተመሳሳይ `"auto"` ነባሪ እሴት።

መፍትሔ ያገኘ የፕሮክሲ ነገር `auto` ያልሆነ `family` ሲይዝ፣ ይህ ቋሚ ምርጫ እስከ ዲስፓቸሩ ድረስ እንዲቆይ `proxyConfigToUrl` የ`?family=` ምልክትን ያክላል።

---

## ተዛማጅ ሰነዶች

> 📖 **ተዛማጅ ሰነዶች፦**
>
> - [የፕሮክሲ መመሪያ](../ops/PROXY_GUIDE.md) — ሙሉው የፕሮክሲ ስርዓት፦ የሬጂስትሪ CRUD፣ ባለ4-ደረጃ መፍትሔ፣ ማዞር፣ የጤና ምርመራ እና የAPI ማጣቀሻ
> - `docs/security/STEALTH_GUIDE.md` (git፤ ወደ `/docs` አይጠናቀርም) — በፕሮክሲው ላይ ተጨምረው የሚሠሩ የTLS አሻራ እና የCLI አሻራ ንብርብሮች
> - [የመስመር ጠባቂ ደረጃዎች](./ROUTE_GUARD_TIERS.md) — ለአካባቢያዊ-ብቻ መስመሮች የloopback ማስገደጃ
