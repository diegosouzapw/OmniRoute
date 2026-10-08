# Egress IP Family Policy (IPv4/IPv6) (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **එක් එක් proxy සඳහා outbound traffic එක තනි IP family එකකට — `auto`, `ipv4`, හෝ `ipv6` — සීමා කරන්න, එවිට IPv6-only egress එකක් කිසිවිටෙකත් නිහඬව IPv4 වෙත ආපසු කාන්දු නොවේ.**

> **සත්යයේ මූලාශ්රය:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute මඟින් එක් එක් proxy එකට **ලිපින-family egress නියෝගයක්** තබාගැනීමට ඉඩ සලසයි. පෙරනිමියෙන් OS එක IPv4 හෝ IPv6 තෝරාගනී (dual-stack, "Happy Eyeballs"). ඔබ නියෝගය `ipv4` හෝ `ipv6` ලෙස සැකසූ විට, OmniRoute එම proxy එක හරහා සිදුවන සෑම සම්බන්ධතාවක්ම තෝරාගත් family එකට සීමා කරන අතර අනෙක් family එක වෙත ආපසු යාම වෙනුවට **fail-closed** වේ.

මෙම පිටුව නියෝගය කුමක්ද, එය පවතින්නේ ඇයි, ඔබ එය වින්යාස කරන්නේ කොතැනද, සහ runtime එක එය resolve කරන්නේ කෙසේද යන්න ලේඛනගත කරයි.

---

## පටුන

- [එය කුමක්ද](#what-it-is)
- [එය පවතින්නේ ඇයි](#why-it-exists)
- [අගයන් තුන](#the-three-values)
- [එය වින්යාස කරන ආකාරය](#how-to-configure-it)
- [`auto` Resolve වන ආකාරය](#how-auto-resolves)
- [`ipv4` / `ipv6` බලාත්මක කරන ආකාරය](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 ගැළපුම](#socks5-compatibility)
- [Fail-Closed හැසිරීම](#fail-closed-behavior)
- [දත්ත ආකෘතිය](#data-model)
- [අදාළ ලේඛන](#related-documentation)

---

## එය කුමක්ද

registry එකේ ඇති සෑම proxy එකකටම අගයන් තුනක් විය හැකි `family` field එකක් ඇති අතර, එය Zod enum එකක් මඟින් වලංගු කරනු ලැබේ:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

මෙම field එකේ පෙරනිමි අගය `"auto"` වන අතර, එමඟින් පෙර පැවති dual-stack හැසිරීම ආරක්ෂා වේ. එය `ipv4` හෝ `ipv6` ලෙස සැකසීමෙන් එම proxy එක සඳහා connect family එක සීමා වේ.

කිසියම් නොදන්නා අගයක් `auto` බවට හැකිළෙන පරිදි, නියෝගය සෑම තැනකම තනි helper එකක් හරහා normalize කරනු ලැබේ:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## එය පවතින්නේ ඇයි

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) තුළ හඳුන්වා දෙන ලදී. මෙයට හේතු වූ ගැටලු:

| ගැටලුව                                        | නියෝගය මඟින් නිවැරදි කරන දේ                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-only egress එක IPv4 වෙත කාන්දු වීම**   | proxy host එකකට A සහ AAAA records දෙකම ඇති විට (හෝ OS එක IPv4 වෙත ප්රමුඛතාව දෙන විට), ඔබ IPv6-only මාර්ගයක් අදහස් කළත් Happy Eyeballs හට IPv4 හරහා පිටතට සම්බන්ධ විය හැක. `ipv6` වෙත සීමා කිරීමෙන් එම කාන්දුව ඉවත් වේ.                                                                                                                 |
| **හවුල්-egress විෂමතා හේතුවෙන් අවලංගු කිරීම** | බොහෝ accounts විශාල පරිමාවකින් **එකම** IP එක හරහා egress වන විට rotating providers (codex/openai) විසින් tokens අවලංගු කරයි. egress family එක පාලනය කිරීම accounts වෙනස් සහ පුරෝකථනය කළ හැකි egress මාර්ගවල තබාගැනීමේ කොටසකි (මෙයට අනුබද්ධ egress-IP diagnostics සඳහා [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) බලන්න). |
| **අනුකූලතාව/පරීක්ෂණ සඳහා නියත egress**        | traffic එක නිශ්චිත family එකක් හරහා පිටවන බව ඔබ සහතික කළ යුතු විට, `auto` ප්රමාණවත් නොවේ.                                                                                                                                                                                                                                              |

මෙම නියෝගය හිතාමතාම global නොව **එක් එක් proxy සඳහා** වේ — ඔබේ pool එකේ විවිධ proxies සඳහා විවිධ policies තිබිය හැක.

---

## අගයන් තුන

| අගය    | UI ලේබලය            | හැසිරීම                                                                                                                                                     |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | OS එක මඟින් පවුල තෝරයි. IP literal ප්රොක්සි සත්කාරකයක් සඳහා, පවුල එම literal අගයටම ආවේණික වේ; සත්කාරක නාමයක් සඳහා, පවුල් දෙකම සුදුසු වේ. මෙය පෙරනිමි අගයයි. |
| `ipv4` | `IPv4 only`         | සම්බන්ධතාව IPv4 වෙත ස්ථාවර කරයි. ප්රොක්සි සත්කාරකයට IPv4 (A) වාර්තාවක් නොමැති නම් සම්බන්ධතාව ප්රතික්ෂේප කරයි.                                               |
| `ipv6` | `IPv6 only`         | සම්බන්ධතාව IPv6 වෙත ස්ථාවර කරයි. ප්රොක්සි සත්කාරකයට IPv6 (AAAA) වාර්තාවක් නොමැති නම් සම්බන්ධතාව ප්රතික්ෂේප කරයි.                                            |

UI පෙළ `src/i18n/messages/en.json` තුළ පවතී (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## එය වින්යාස කරන්නේ කෙසේද

### උපකරණ පුවරුව

තේරීම්කාරකය **Proxy Pool** පටිත්තේ ප්රොක්සි පෝරමය තුළ ඇත:

1. **Dashboard → Settings → Proxy → Proxy Pool** විවෘත කරන්න
2. ප්රොක්සියක් එක් කරන්න හෝ සංස්කරණය කරන්න
3. **IP family** පතන ලැයිස්තුව `Auto (dual-stack)`, `IPv4 only`, හෝ `IPv6 only` ලෙස සකසන්න
4. සුරකින්න

මෙම පාලකය `ProxyRegistryManager.tsx` මඟින් විදැහුම් කෙරේ (`proxy/ProxyPoolTab.tsx` තුළ ස්ථාපනය කර ඇත).

### API

`family` ක්ෂේත්රය ප්රොක්සි රෙජිස්ට්රි නිර්මාණය/යාවත්කාලීන කිරීමේ payload වල කොටසක් වන අතර, එය `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) මඟින් වලංගු කර `POST` / `PATCH /api/v1/management/proxies` මඟින් හසුරුවනු ලැබේ:

```bash
# IPv6 සඳහා පමණක් වූ ප්රොක්සියක් සාදන්න
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# පවතින ප්රොක්සියක් IPv4 සඳහා පමණක් වන ලෙස වෙනස් කරන්න
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

upstream-proxy ඇතුළත් කිරීම් සඳහා භාවිත කරන inline ප්රොක්සි වින්යාස වස්තුව මඟින් ද එම ක්ෂේත්රය පිළිගනු ලැබේ (`upstream_proxy_config.family`, [දත්ත ආකෘතිය](#data-model) බලන්න).

ප්රොක්සි CRUD/පැවරුම් API හි ඉතිරි කොටස සඳහා, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) බලන්න.

---

## `auto` විසඳෙන ආකාරය

`family` යනු `auto` වූ විට, OmniRoute කිසිදු නියෝගයක් එක් **නොකරයි** — ප්රොක්සි URL එක පවතින ආකාරයෙන්ම භාවිත කෙරෙන අතර සම්බන්ධතා පවුල ආවේණිකව තීරණය වේ.

URL ගොඩනැගීමේ අවස්ථාවේදී (`open-sse/utils/proxyDispatcher.ts` තුළ `proxyConfigToUrl` / `normalizeProxyUrl`), `auto` ප්රොක්සියක් කිසිදු සලකුණක් නොමැති සරල URL එකක් ලබා දෙයි:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

යොමු කිරීමේ අවස්ථාවේදී (`resolveDispatcherFamily`), `auto` යනු IP literal සත්කාරකයක ආවේණික පවුලට හෝ සත්කාරක නාමයක් සඳහා `null` වෙත (OS එකට තීරණය කිරීමට ඉඩ දීම) විසඳේ:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // සත්කාරක නාමයක් සඳහා null → OS එක තෝරයි
  // ...
}
```

එබැවින්:

- `auto` + IP literal සත්කාරකය (`192.0.2.1` / `[2001:db8::1]`) → එම literal අගයේ පවුල.
- `auto` + සත්කාරක නාමය → `null` → සම්මත dual-stack OS නිරාකරණය.

---

## `ipv4` / `ipv6` බලාත්මක කරන ආකාරය

`auto` නොවන විධානයක්, සාමාන්යකරණය කළ proxy URL එකට එක් වරක් පමණක් අමුණන ලද තනි කෘත්රිම query සලකුණක් — `?family=ipv4` හෝ `?family=ipv6` — ලෙස ගමන් කරයි. මෙම සලකුණ කිසි විටෙකත් port විග්රහ කිරීම දූෂිත නොකරන ලෙස, එය හරියටම එක් වරක් ඉවත් කර නැවත ඇමිණීමට `normalizeProxyUrl` සැලකිලිමත් වේ.

dispatcher එක ගොඩනඟන විට, සලකුණ කියවා නිශ්චිත සම්බන්ධතා family එකක් බවට පරිවර්තනය කරයි. host එක **ප්රතිවිරුද්ධ** family එකේ IP literal එකක් නම්, OmniRoute දෝෂයක් නිකුත් කරයි (පරස්පරතාවකදී fail-closed වේ):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

ඉන්පසු නිශ්චිත family එක connector එක මත ස්ථිර කරයි:

- **HTTP/HTTPS proxies** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs අක්රිය කරන බැවින් සම්බන්ධතාව සඳහා භාවිත වන්නේ තෝරාගත් family එක පමණි.
- **SOCKS5 proxies**: අභිරුචි connector එකක් `socket_options: { family, autoSelectFamily: false }`, SOCKS client එක වෙත යොමු කරයි ([SOCKS5 ගැළපුම](#socks5-compatibility) බලන්න).

---

## SOCKS5 ගැළපුම

family එක ස්ථිර කිරීම SOCKS5 proxies සමඟ ක්රියා කරයි, නමුත් සම්මත `fetch-socks` මඟින් proxy hop එකේ family එක ස්ථිර කිරීමට අවශ්ය socket options නිරාවරණය නොකරයි. ඒ සඳහා OmniRoute තමන්ගේම connector එකක් සපයයි:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`family` අගය කුමක් වුවත් (hostname එකක් හරහා `null` / `auto` ඇතුළුව), සියලුම SOCKS5 dispatches `createSocksDispatcherWithFamily` හරහා ගමන් කරයි: `buildSocksFamilySocketOptions(null)` මඟින් `{}` ලැබෙන අතර, IPv6-පමණක් වන egress ප්රතිපත්තියක් සඳහා Happy Eyeballs හට IPv4 තෝරාගත නොහැකි වන ලෙස `socket_options` ස්ථිර කිරීම සමඟ එකම `SocksClient.createConnection` + TLS `buildConnector` මාර්ගය භාවිත කරයි.

SOCKS5 සහාය පෙරනිමියෙන් සක්රියයි (`ENABLE_SOCKS5_PROXY=false` හරහා ඉවත් විය හැක); [PROXY_GUIDE.md → පරිසර විචල්ය](../ops/PROXY_GUIDE.md#environment-variables) බලන්න.

---

## Fail-Closed හැසිරීම

මෙම විධානයේ සමස්ත අරමුණ වන්නේ වැරදි family එක වෙත නිහඬව fallback වීම වෙනුවට එය **ප්රතික්ෂේප කිරීමයි**. මෙය ආරක්ෂක පරීක්ෂා දෙකක් මඟින් බලාත්මක කරයි:

1. **Literal පරස්පරතාව** — IP-literal host එකකට පරස්පර වන විධානයක්, dispatcher එක ගොඩනඟන අවස්ථාවේදී දෝෂයක් නිකුත් කරයි (ඉහත පෙන්වා ඇති `resolveDispatcherFamily`).

2. **Hostname පූර්ව-පියාසර DNS පරීක්ෂාව** — ස්ථිර කළ family එකක් සහිත hostname proxy එකක් සඳහා, egress වීමට **පෙර**, `assertHostnameSupportsFamily` හරහා අවශ්ය family එකේ record එකක් hostname එකට සැබවින්ම තිබේදැයි `proxyFetch.ts` සත්යාපනය කරයි:

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

   අසාර්ථක වුවහොත්, `proxyFetch.ts` දෝෂයට `code = "PROXY_FAMILY_UNAVAILABLE"` සහ `statusCode = 503` යන tags යොදයි. DNS resolution අසාර්ථක වීමක් ද එලෙසම fail-closed ලෙස සලකයි (egress කිරීම ප්රතික්ෂේප කරයි).

IP-literal hosts සඳහා DNS පූර්ව-පියාසර පරීක්ෂාව no-op එකකි — ඒවායේ family එක නෛසර්ගික බැවින් lookup එකක් අවශ්ය නොවේ.

---

## දත්ත ආකෘතිය

`family` තීරුව `099_proxy_family.sql` සංක්රමණය මඟින් වගු **දෙකකට** එක් කරන ලදී:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — රෙජිස්ට්රි ඇතුළත් කිරීම් සඳහා වන එක් එක් ප්රොක්සියට අදාළ නියෝගයයි (`src/lib/db/proxies.ts`). විභේදන විමසුම් අනෙකුත් ප්රොක්සි තීරු සමඟ `family` ද තෝරන අතර, අස්ථානගත හෝ string නොවන අගයක් `"auto"` ලෙස බලයෙන් පරිවර්තනය කෙරේ.
- `upstream_proxy_config.family` — එම `"auto"` පෙරනිමියම සහිත, upstream-proxy ඇතුළත් කිරීම් සඳහා වන නියෝගයයි (`src/lib/db/upstreamProxy.ts`).

විභේදනය කළ ප්රොක්සි වස්තුවක `auto` නොවන `family` අගයක් ඇති විට, එම නියම කිරීම dispatcher දක්වාම පවත්වාගෙන යාම සඳහා `proxyConfigToUrl` විසින් `?family=` සලකුණ එක් කරයි.

---

## අදාළ ලේඛන

> 📖 **අදාළ ලේඛන:**
>
> - [ප්රොක්සි මාර්ගෝපදේශය](../ops/PROXY_GUIDE.md) — සම්පූර්ණ ප්රොක්සි පද්ධතිය: රෙජිස්ට්රි CRUD, මට්ටම් 4ක විභේදනය, භ්රමණය, සෞඛ්ය පරීක්ෂාව, API යොමුව
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` තුළට සම්පාදනය කර නැත) — ප්රොක්සිය මත ක්රියාත්මක වන TLS fingerprint සහ CLI fingerprint ස්තර
> - [මාර්ග ආරක්ෂක මට්ටම්](./ROUTE_GUARD_TIERS.md) — local-only මාර්ග සඳහා loopback බලාත්මක කිරීම
