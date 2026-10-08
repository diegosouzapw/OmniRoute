# Egress IP Family Policy (IPv4/IPv6) (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Յուրաքանչյուր պրոքսիի համար ելքային տրաֆիկը ամրագրեք մեկ IP ընտանիքի՝ `auto`, `ipv4` կամ `ipv6`, որպեսզի միայն IPv6 ելքը երբեք աննկատ չվերադառնա IPv4-ի։**

> **Ճշմարտության աղբյուր՝** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute-ը թույլ է տալիս յուրաքանչյուր պրոքսիի համար սահմանել **հասցեների ընտանիքի ելքային տրաֆիկի հրահանգ**։ Լռելյայն օպերացիոն համակարգն ընտրում է IPv4 կամ IPv6 (երկակի ստեկ, «Happy Eyeballs»)։ Երբ հրահանգը սահմանում եք որպես `ipv4` կամ `ipv6`, OmniRoute-ը տվյալ պրոքսիով անցնող յուրաքանչյուր կապ ամրագրում է ընտրված ընտանիքին և այլ ընտանիքին վերադառնալու փոխարեն **փակվում է սխալի դեպքում**։

Այս էջը նկարագրում է, թե ինչ է այդ հրահանգը, ինչու է այն գոյություն ունենում, որտեղ կարող եք կարգավորել այն և ինչպես է կատարման միջավայրն այն լուծարկում։

---

## Բովանդակություն

- [Ինչ է այն](#what-it-is)
- [Ինչու է այն գոյություն ունենում](#why-it-exists)
- [Երեք արժեքները](#the-three-values)
- [Ինչպես կարգավորել այն](#how-to-configure-it)
- [Ինչպես է լուծարկվում `auto`-ն](#how-auto-resolves)
- [Ինչպես են պարտադրվում `ipv4` / `ipv6` արժեքները](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 համատեղելիություն](#socks5-compatibility)
- [Սխալի դեպքում փակվելու վարքագիծ](#fail-closed-behavior)
- [Տվյալների մոդել](#data-model)
- [Առնչվող փաստաթղթեր](#related-documentation)

---

## Ինչ է այն

Ռեեստրի յուրաքանչյուր պրոքսի ունի `family` դաշտ՝ երեք հնարավոր արժեքով, որոնք վավերացվում են Zod թվարկմամբ․

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Դաշտի լռելյայն արժեքը `"auto"` է, ինչը պահպանում է նախկին երկակի ստեկի վարքագիծը։ Այն `ipv4` կամ `ipv6` սահմանելը տվյալ պրոքսիի կապի ընտանիքն ամրագրում է համապատասխան արժեքին։

Հրահանգն ամենուր նորմալացվում է մեկ օգնական ֆունկցիայի միջոցով, որպեսզի ցանկացած անհայտ արժեք փոխարինվի `auto`-ով․

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Ինչու է այն գոյություն ունենում

Ներդրվել է PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)-ում։ Հիմնական խնդիրները հետևյալն էին․

| Խնդիր                                                 | Ինչ է շտկում հրահանգը                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Միայն IPv6 ելքի արտահոսք դեպի IPv4**                | Երբ պրոքսիի հոսթն ունի և՛ A, և՛ AAAA գրառումներ (կամ օպերացիոն համակարգը նախընտրում է IPv4-ը), Happy Eyeballs-ը կարող է ելքային կապ հաստատել IPv4-ով, նույնիսկ երբ նախատեսում եք օգտագործել միայն IPv6 ուղի։ `ipv6` ամրագրումը վերացնում է այդ արտահոսքը։                                                                                                                 |
| **Ընդհանուր ելքի անոմալիայի պատճառով չեղարկում**      | Փոփոխվող մատակարարները (codex/openai) չեղարկում են տոկենները, երբ բազմաթիվ հաշիվներ մեծ ծավալով ելքային տրաֆիկ են ուղարկում **նույն** IP-ի միջոցով։ Ելքային ընտանիքի կառավարումը հաշիվները տարբեր, կանխատեսելի ելքային ուղիներում պահելու մի մասն է (դրա հետ զուգակցվող ելքային IP-ի ախտորոշումների համար տե՛ս [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts))։ |
| **Որոշակի ելք՝ համապատասխանության/թեստավորման համար** | Երբ պետք է երաշխավորեք, որ տրաֆիկը դուրս է գալիս որոշակի ընտանիքով, `auto`-ն բավարար չէ։                                                                                                                                                                                                                                                                                  |

Հրահանգը միտումնավոր սահմանվում է **յուրաքանչյուր պրոքսիի համար**, այլ ոչ թե գլոբալ կերպով․ ձեր հավաքածուի տարբեր պրոքսիներ կարող են ունենալ տարբեր քաղաքականություններ։

---

## Երեք արժեքները

| Արժեք  | UI պիտակ                | Վարքագիծ                                                                                                                                                                          |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Ավտոմատ (երկակի ստեկ)` | ՕՀ-ն ընտրում է ընտանիքը։ IP լիտերալով պրոքսի հոսթի դեպքում ընտանիքը որոշվում է հենց լիտերալով, իսկ հոսթի անվան դեպքում երկու ընտանիքներն էլ թույլատրելի են։ Սա լռելյայն արժեքն է։ |
| `ipv4` | `Միայն IPv4`            | Կապը սահմանափակում է IPv4-ով։ Փակ սկզբունքով ձախողվում է, եթե պրոքսի հոսթը չունի IPv4 (A) գրառում։                                                                                |
| `ipv6` | `Միայն IPv6`            | Կապը սահմանափակում է IPv6-ով։ Փակ սկզբունքով ձախողվում է, եթե պրոքսի հոսթը չունի IPv6 (AAAA) գրառում։                                                                             |

UI տողերը գտնվում են `src/i18n/messages/en.json`-ում (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`)։

---

## Ինչպես կարգավորել

### Կառավարման վահանակ

Ընտրիչը գտնվում է **Proxy Pool** ներդիրի պրոքսիի ձևում․

1. Բացեք **Dashboard → Settings → Proxy → Proxy Pool**
2. Ավելացրեք կամ խմբագրեք պրոքսի
3. **IP family** բացվող ցանկում ընտրեք `Auto (dual-stack)`, `IPv4 only` կամ `IPv6 only`
4. Պահպանեք

Կառավարման տարրը ցուցադրվում է `ProxyRegistryManager.tsx`-ի կողմից (միացված է `proxy/ProxyPoolTab.tsx`-ում)։

### API

`family` դաշտը պրոքսիի ռեեստրի ստեղծման/թարմացման օգտակար բեռների մաս է, վավերացվում է `createProxyRegistrySchema` / `updateProxyRegistrySchema`-ի միջոցով (`src/shared/validation/schemas.ts`) և մշակվում է `POST` / `PATCH /api/v1/management/proxies`-ի կողմից․

```bash
# Ստեղծել միայն IPv6 օգտագործող պրոքսի
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Գոյություն ունեցող պրոքսին փոխել միայն IPv4 օգտագործողի
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Նույն դաշտն ընդունվում է նաև վերին հոսքի պրոքսիի գրառումների համար օգտագործվող ներկառուցված պրոքսիի կազմաձևման օբյեկտում (`upstream_proxy_config.family`, տե՛ս [Տվյալների մոդել](#data-model))։

Պրոքսիի CRUD/նշանակման API-ի մնացած մասի համար տե՛ս [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)։

---

## Ինչպես է որոշվում `auto`-ն

Երբ `family`-ն `auto` է, OmniRoute-ը **չի** ավելացնում որևէ հրահանգ․ պրոքսիի URL-ն օգտագործվում է այնպես, ինչպես կա, իսկ կապի ընտանիքը որոշվում է ներհատուկ կերպով։

URL-ի կառուցման պահին (`proxyConfigToUrl` / `normalizeProxyUrl`՝ `open-sse/utils/proxyDispatcher.ts`-ում) `auto` պրոքսին վերադարձնում է սովորական URL՝ առանց նշիչի․

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Ուղարկման պահին (`resolveDispatcherFamily`) `auto`-ն որոշվում է որպես IP լիտերալով հոսթի ներհատուկ ընտանիք կամ `null` (թույլ տալ ՕՀ-ին որոշել)՝ հոսթի անվան դեպքում․

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // Հոսթի անվան դեպքում՝ null → ընտրում է ՕՀ-ն
  // ...
}
```

Այսպիսով՝

- `auto` + IP լիտերալով հոսթ (`192.0.2.1` / `[2001:db8::1]`) → տվյալ լիտերալի ընտանիքը։
- `auto` + հոսթի անուն → `null` → ՕՀ-ի ստանդարտ երկակի ստեկով որոշում։

---

## Ինչպես են պարտադրվում `ipv4` / `ipv6`-ը

Ոչ `auto` հրահանգը փոխանցվում է որպես մեկ սինթետիկ հարցման նշիչ՝ `?family=ipv4` կամ `?family=ipv6`, որը մեկ անգամ ավելացվում է նորմալացված պրոքսի URL-ին։ `normalizeProxyUrl`-ը զգուշորեն հեռացնում և ճիշտ մեկ անգամ կրկին ավելացնում է այս նշիչը, որպեսզի այն երբեք չխաթարի պորտի վերլուծումը։

Դիսպետչերը կառուցելիս նշիչը կարդացվում և փոխակերպվում է միացման կոնկրետ ընտանիքի։ Եթե հոսթը **հակառակ** ընտանիքի IP լիտերալ է, OmniRoute-ը սխալ է նետում (հակասության դեպքում գործում է fail-closed սկզբունքը)․

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Այնուհետև միակցիչի վրա ամրագրվում է կոնկրետ ընտանիքը․

- **HTTP/HTTPS պրոքսիներ** (`ProxyAgent`)՝ `proxyTls: { family, autoSelectFamily: false }` — անջատում է Happy Eyeballs-ը, որպեսզի կապ հաստատվի միայն ընտրված ընտանիքի միջոցով։
- **SOCKS5 պրոքսիներ**՝ հատուկ միակցիչը SOCKS հաճախորդին փոխանցում է `socket_options: { family, autoSelectFamily: false }` (տե՛ս [SOCKS5 համատեղելիություն](#socks5-համատեղելիություն))։

---

## SOCKS5 համատեղելիություն

Ընտանիքի ամրագրումն աշխատում է SOCKS5 պրոքսիների հետ, սակայն ստանդարտ `fetch-socks`-ը հասանելի չի դարձնում այն սոքեթի ընտրանքները, որոնք անհրաժեշտ են պրոքսի անցման ընտանիքն ամրագրելու համար։ Այդ նպատակով OmniRoute-ը ներառում է սեփական միակցիչը․

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Բոլոր SOCKS5 դիսպետչավորումներն անցնում են `createSocksDispatcherWithFamily`-ով՝ անկախ `family`-ից (ներառյալ `null` / `auto`՝ հոսթի անվան դեպքում)․ `buildSocksFamilySocketOptions(null)`-ը վերադարձնում է `{}`, իսկ նույն `SocksClient.createConnection` + TLS `buildConnector` ուղին օգտագործվում է `socket_options`-ի ամրագրմամբ, որպեսզի Happy Eyeballs-ը չկարողանա ընտրել IPv4՝ միայն IPv6 ելքային կապ թույլատրող քաղաքականության դեպքում։

SOCKS5 աջակցությունը լռելյայն միացված է (կարելի է հրաժարվել՝ օգտագործելով `ENABLE_SOCKS5_PROXY=false`)․ տե՛ս [PROXY_GUIDE.md → Միջավայրի փոփոխականներ](../ops/PROXY_GUIDE.md#environment-variables)։

---

## Fail-Closed վարքագիծ

Հրահանգի ամբողջ նպատակը սխալ ընտանիքին լռելյայն անցնելու փոխարեն կապից **հրաժարվելն** է։ Սա ապահովում են երկու պաշտպանիչ ստուգումներ․

1. **Լիտերալի հակասություն** — IP լիտերալ հոսթին հակասող հրահանգը դիսպետչերի կառուցման ժամանակ սխալ է նետում (`resolveDispatcherFamily`, ցուցադրված է վերևում)։

2. **Հոսթի անվան նախնական DNS ստուգում** — ամրագրված ընտանիքով հոսթի անուն ունեցող պրոքսիի դեպքում `proxyFetch.ts`-ը, **նախքան** ելքային կապ հաստատելը, `assertHostnameSupportsFamily`-ի միջոցով ստուգում է, որ հոսթի անունն իսկապես ունի պահանջվող ընտանիքի գրառում․

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

   Ձախողման դեպքում `proxyFetch.ts`-ը սխալին հատկացնում է `code = "PROXY_FAMILY_UNAVAILABLE"` և `statusCode = 503`։ DNS լուծման ձախողումը նույնպես մշակվում է fail-closed սկզբունքով (ելքային կապը մերժվում է)։

IP լիտերալ հոսթերի համար DNS նախնական ստուգումը ոչինչ չի կատարում․ դրանց ընտանիքը ներհատուկ է և որոնում չի պահանջում։

---

## Տվյալների մոդել

`family` սյունակն ավելացվել է `099_proxy_family.sql` միգրացիայի միջոցով **երկու** աղյուսակներում․

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — ռեեստրի գրառումների համար յուրաքանչյուր պրոքսիի առանձին հրահանգը (`src/lib/db/proxies.ts`)։ Լուծման հարցումներն ընտրում են `family`-ն պրոքսիի մյուս սյունակների հետ միասին, իսկ բացակայող կամ տողային տիպ չունեցող արժեքը փոխարկվում է `"auto"`-ի։
- `upstream_proxy_config.family` — վերին մակարդակի պրոքսիի գրառումների հրահանգը (`src/lib/db/upstreamProxy.ts`)՝ նույն `"auto"` լռելյայն արժեքով։

Երբ լուծված պրոքսիի օբյեկտը պարունակում է `auto`-ից տարբեր `family`, `proxyConfigToUrl`-ը կցում է `?family=` նշիչը, որպեսզի ամրագրումը պահպանվի մինչև դիսպետչեր հասնելը։

---

## Առնչվող փաստաթղթեր

> 📖 **Առնչվող փաստաթղթեր․**
>
> - [Պրոքսիի ուղեցույց](../ops/PROXY_GUIDE.md) — պրոքսիի ամբողջական համակարգը՝ ռեեստրի CRUD, 4-մակարդակ լուծում, ռոտացիա, առողջական վիճակի ստուգում, API-ի տեղեկատու
> - `docs/security/STEALTH_GUIDE.md` (git-ում է, չի կազմվում `/docs`-ում) — TLS մատնահետքի և CLI մատնահետքի շերտերը, որոնք գործում են պրոքսիի վերևում
> - [Երթուղու պաշտպանության մակարդակներ](./ROUTE_GUARD_TIERS.md) — loopback-ի պարտադիր կիրառում միայն տեղային երթուղիների համար
