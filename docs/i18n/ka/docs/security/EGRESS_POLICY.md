# Egress IP Family Policy (IPv4/IPv6) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **თითოეული პროქსისთვის გამავალი ტრაფიკი მიამაგრეთ ერთ IP ოჯახს — `auto`, `ipv4` ან `ipv6` — რათა მხოლოდ IPv6-ის მქონე გამავალმა კავშირმა შეუმჩნევლად არასდროს გადაინაცვლოს უკან IPv4-ზე.**

> **ჭეშმარიტების წყარო:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute თითოეულ პროქსის ანიჭებს **მისამართების ოჯახის გამავალი კავშირის დირექტივას**. ნაგულისხმევად, IPv4-სა და IPv6-ს შორის არჩევანს ოპერაციული სისტემა აკეთებს (ორმაგი სტეკი, „Happy Eyeballs“). როდესაც დირექტივას `ipv4`-ზე ან `ipv6`-ზე აყენებთ, OmniRoute ამ პროქსის გავლით ყველა კავშირს არჩეულ ოჯახზე ამაგრებს და სხვა ოჯახზე გადართვის ნაცვლად **დახურულად ასრულებს შეცდომით**.

ამ გვერდზე აღწერილია, რა არის ეს დირექტივა, რატომ არსებობს, სად ხდება მისი კონფიგურაცია და როგორ ამუშავებს მას შესრულების გარემო.

---

## სარჩევი

- [რა არის ეს](#what-it-is)
- [რატომ არსებობს](#why-it-exists)
- [სამი მნიშვნელობა](#the-three-values)
- [როგორ დავაკონფიგურიროთ](#how-to-configure-it)
- [როგორ განისაზღვრება `auto`](#how-auto-resolves)
- [როგორ ხდება `ipv4` / `ipv6`-ის იძულებითი გამოყენება](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-თან თავსებადობა](#socks5-compatibility)
- [დახურულად შეცდომით დასრულების ქცევა](#fail-closed-behavior)
- [მონაცემთა მოდელი](#data-model)
- [დაკავშირებული დოკუმენტაცია](#related-documentation)

---

## რა არის ეს

რეესტრში თითოეულ პროქსის აქვს `family` ველი სამი შესაძლო მნიშვნელობით, რომლებიც Zod-ის ჩამონათვლით მოწმდება:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ველის ნაგულისხმევი მნიშვნელობაა `"auto"`, რაც ორმაგი სტეკის წინა ქცევას ინარჩუნებს. მისი `ipv4`-ზე ან `ipv6`-ზე დაყენება ამ პროქსისთვის დაკავშირების ოჯახს აფიქსირებს.

დირექტივა ყველგან ერთი დამხმარე ფუნქციის მეშვეობით ნორმალიზდება, ამიტომ ნებისმიერი უცნობი მნიშვნელობა `auto`-მდე დაიყვანება:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## რატომ არსებობს

დაინერგა PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)-ში. ამის განმაპირობებელი პრობლემებია:

| პრობლემა                                                         | რას აგვარებს დირექტივა                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **მხოლოდ IPv6-ის მქონე გამავალი კავშირიდან IPv4-ზე გაჟონვა**     | როდესაც პროქსი-ჰოსტს აქვს როგორც A, ისე AAAA ჩანაწერები (ან ოპერაციული სისტემა უპირატესობას IPv4-ს ანიჭებს), Happy Eyeballs-ს შეუძლია გამავალი კავშირი IPv4-ის მეშვეობით დაამყაროს მაშინაც კი, როდესაც მხოლოდ IPv6-ის მარშრუტი გაქვთ განზრახული. `ipv6`-ზე მიმაგრება ამ გაჟონვას გამორიცხავს.                                                                                                      |
| **საერთო გამავალი კავშირის ანომალიის გამო გაუქმება**             | როტაციის მქონე პროვაიდერები (codex/openai) ტოკენებს აუქმებენ, როდესაც ბევრი ანგარიშიდან დიდი მოცულობის ტრაფიკი **ერთი და იმავე** IP-ით გადის. გამავალი კავშირის ოჯახის კონტროლი ანგარიშებისთვის განსხვავებული და პროგნოზირებადი გამავალი მარშრუტების შენარჩუნების ნაწილია (ამასთან დაკავშირებული გამავალი IP-ის დიაგნოსტიკისთვის იხილეთ [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)). |
| **დეტერმინისტული გამავალი კავშირი შესაბამისობის/ტესტირებისთვის** | როდესაც აუცილებელია იმის გარანტირება, რომ ტრაფიკი კონკრეტული ოჯახის მეშვეობით გავა, `auto` საკმარისი არ არის.                                                                                                                                                                                                                                                                                      |

დირექტივა განზრახ არის განსაზღვრული **თითოეული პროქსისთვის** და არა გლობალურად — თქვენს პულში სხვადასხვა პროქსის შეიძლება განსხვავებული პოლიტიკა ჰქონდეს.

---

## სამი მნიშვნელობა

| მნიშვნელობა | UI-ის წარწერა             | ქცევა                                                                                                                                                          |
| ----------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`      | `ავტომატური (dual-stack)` | ოჯახს OS ირჩევს. IP-ლიტერალური პროქსი-ჰოსტისთვის ოჯახი თავად ლიტერალით განისაზღვრება; ჰოსტის სახელისთვის ორივე ოჯახი დასაშვებია. ეს ნაგულისხმევი მნიშვნელობაა. |
| `ipv4`      | `მხოლოდ IPv4`             | კავშირს IPv4-ზე აფიქსირებს. თუ პროქსი-ჰოსტს IPv4 (A) ჩანაწერი არ აქვს, კავშირი უსაფრთხოდ იბლოკება.                                                             |
| `ipv6`      | `მხოლოდ IPv6`             | კავშირს IPv6-ზე აფიქსირებს. თუ პროქსი-ჰოსტს IPv6 (AAAA) ჩანაწერი არ აქვს, კავშირი უსაფრთხოდ იბლოკება.                                                          |

UI-ის სტრიქონები განთავსებულია `src/i18n/messages/en.json`-ში (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## როგორ დავაკონფიგურიროთ

### მართვის პანელი

ამომრჩეველი მდებარეობს **Proxy Pool** ჩანართის პროქსის ფორმაში:

1. გახსენით **Dashboard → Settings → Proxy → Proxy Pool**
2. დაამატეთ ან ჩაასწორეთ პროქსი
3. **IP family** ჩამოსაშლელ სიაში აირჩიეთ `ავტომატური (dual-stack)`, `მხოლოდ IPv4` ან `მხოლოდ IPv6`
4. შეინახეთ

კონტროლს რენდერს უკეთებს `ProxyRegistryManager.tsx` (`proxy/ProxyPoolTab.tsx`-ში დამონტაჟებული).

### API

`family` ველი პროქსი-რეესტრის შექმნის/განახლების payload-ების ნაწილია, მოწმდება `createProxyRegistrySchema` / `updateProxyRegistrySchema`-ის მიერ (`src/shared/validation/schemas.ts`) და მუშავდება `POST` / `PATCH /api/v1/management/proxies`-ის მიერ:

```bash
# შექმენით მხოლოდ IPv6-ის პროქსი
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# არსებული პროქსი შეცვალეთ მხოლოდ IPv4-ზე
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

იგივე ველი ასევე მიიღება upstream-proxy ჩანაწერებისთვის გამოყენებულ inline პროქსის კონფიგურაციის ობიექტში (`upstream_proxy_config.family`, იხილეთ [მონაცემთა მოდელი](#data-model)).

პროქსის CRUD/მინიჭების API-ის დანარჩენი ნაწილისთვის იხილეთ [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## როგორ განისაზღვრება `auto`

როდესაც `family` არის `auto`, OmniRoute **არ** ამატებს არანაირ დირექტივას — პროქსის URL გამოიყენება უცვლელად, ხოლო კავშირის ოჯახი შინაგანად განისაზღვრება.

URL-ის აგების დროს (`proxyConfigToUrl` / `normalizeProxyUrl` ფაილში `open-sse/utils/proxyDispatcher.ts`) `auto` პროქსი ქმნის ჩვეულებრივ URL-ს მარკერის გარეშე:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

დისპეტჩერიზაციის დროს (`resolveDispatcherFamily`) `auto` განისაზღვრება როგორც IP-ლიტერალური ჰოსტის შინაგანი ოჯახი, ან `null` (არჩევანი OS-ს დარჩეს) ჰოსტის სახელისთვის:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ჰოსტის სახელისთვის null → ირჩევს OS
  // ...
}
```

ამრიგად:

- `auto` + IP-ლიტერალური ჰოსტი (`192.0.2.1` / `[2001:db8::1]`) → ამ ლიტერალის ოჯახი.
- `auto` + ჰოსტის სახელი → `null` → OS-ის სტანდარტული dual-stack გარჩევა.

---

## როგორ ხდება `ipv4` / `ipv6`-ის იძულებითი გამოყენება

არა-`auto` დირექტივა გადაიცემა ერთი სინთეზური მოთხოვნის მარკერის სახით — `?family=ipv4` ან `?family=ipv6` — რომელიც ნორმალიზებულ პროქსის URL-ს ერთხელ ემატება. `normalizeProxyUrl` ამ მარკერს ფრთხილად შლის და ზუსტად ერთხელ ხელახლა ამატებს, რათა მან პორტის დამუშავება არასოდეს დააზიანოს.

დისპეტჩერის აგებისას მარკერი იკითხება და კავშირის კონკრეტულ ოჯახად გარდაიქმნება. თუ ჰოსტი **საპირისპირო** ოჯახის IP ლიტერალია, OmniRoute გამონაკლისს აგდებს (წინააღმდეგობის შემთხვევაში მოქმედება იკრძალება):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] პროქსის ოჯახის დირექტივა ${directive} წინააღმდეგობაშია ${literal === 6 ? "IPv6" : "IPv4"} ლიტერალურ ჰოსტთან`
  );
}
```

შემდეგ კონკრეტული ოჯახი კონექტორზე ფიქსირდება:

- **HTTP/HTTPS პროქსები** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — თიშავს Happy Eyeballs-ს, რათა კავშირი მხოლოდ არჩეული ოჯახის გამოყენებით დამყარდეს.
- **SOCKS5 პროქსები**: მორგებული კონექტორი SOCKS კლიენტს გადასცემს `socket_options: { family, autoSelectFamily: false }`-ს (იხილეთ [SOCKS5-თან თავსებადობა](#socks5-compatibility)).

---

## SOCKS5-თან თავსებადობა

ოჯახის ფიქსაცია SOCKS5 პროქსებთან მუშაობს, თუმცა სტანდარტული `fetch-socks` არ იძლევა წვდომას სოკეტის იმ პარამეტრებზე, რომლებიც პროქსის ეტაპისთვის ოჯახის დასაფიქსირებლადაა საჭირო. ამისთვის OmniRoute-ს საკუთარი კონექტორი მოჰყვება:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

ყველა SOCKS5 გაგზავნა `createSocksDispatcherWithFamily`-ის გავლით ხდება, `family`-ის მნიშვნელობის მიუხედავად (ჰოსტის სახელზე `null` / `auto`-ს ჩათვლით): `buildSocksFamilySocketOptions(null)` აბრუნებს `{}`-ს, ხოლო იგივე `SocksClient.createConnection` + TLS `buildConnector` გზა გამოიყენება `socket_options`-ის ფიქსაციით, რათა Happy Eyeballs-მა მხოლოდ IPv6-ზე გათვლილი გამავალი ტრაფიკის პოლიტიკისთვის IPv4 ვერ აირჩიოს.

თავად SOCKS5-ის მხარდაჭერა ნაგულისხმევად ჩართულია (გამორთვა შესაძლებელია `ENABLE_SOCKS5_PROXY=false`-ის მეშვეობით); იხილეთ [PROXY_GUIDE.md → გარემოს ცვლადები](../ops/PROXY_GUIDE.md#environment-variables).

---

## შეცდომისას წვდომის აკრძალვის ქცევა

დირექტივის მთავარი დანიშნულებაა, რომ სისტემამ არასწორ ოჯახზე შეუმჩნევლად გადართვის ნაცვლად კავშირი **უარყოს**. ამას ორი დამცავი მექანიზმი უზრუნველყოფს:

1. **ლიტერალთან წინააღმდეგობა** — დირექტივა, რომელიც IP-ლიტერალურ ჰოსტს ეწინააღმდეგება, დისპეტჩერის აგების დროს გამონაკლისს აგდებს (`resolveDispatcherFamily`, ნაჩვენებია ზემოთ).

2. **ჰოსტის სახელის წინასწარი DNS შემოწმება** — ფიქსირებული ოჯახის მქონე ჰოსტის სახელის პროქსისთვის `proxyFetch.ts` გამავალი კავშირის დამყარებამდე `assertHostnameSupportsFamily`-ის მეშვეობით ამოწმებს, რეალურად აქვს თუ არა ჰოსტის სახელს საჭირო ოჯახის ჩანაწერი:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] პროქსის ჰოსტს ${host} არ აქვს ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} ჩანაწერი; ` +
         `უარყოფილია მხოლოდ ${family === 6 ? "IPv6" : "IPv4"}-ზე გამავალი კავშირი (შეცდომისას წვდომის აკრძალვა)`
     );
   }
   ```

   წარუმატებლობის შემთხვევაში `proxyFetch.ts` შეცდომას ანიჭებს `code = "PROXY_FAMILY_UNAVAILABLE"` და `statusCode = 503` მნიშვნელობებს. DNS-ის ამოხსნის შეცდომაც ანალოგიურად განიხილება, როგორც შეცდომისას წვდომის აკრძალვა (გამავალი კავშირი უარყოფილია).

IP-ლიტერალური ჰოსტებისთვის წინასწარი DNS შემოწმება არაფერს აკეთებს — მათი ოჯახი ჩაშენებულადაა განსაზღვრული და მოძიებას არ საჭიროებს.

---

## მონაცემთა მოდელი

`family` სვეტი `099_proxy_family.sql` მიგრაციით **ორ** ცხრილს დაემატა:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — თითოეული პროქსისთვის განსაზღვრული დირექტივა რეესტრის ჩანაწერებში (`src/lib/db/proxies.ts`). ამოხსნის მოთხოვნები სხვა პროქსი-სვეტებთან ერთად `family`-საც ირჩევს, ხოლო არარსებული ან არასტრიქონული მნიშვნელობა იძულებით გარდაიქმნება `"auto"`-დ.
- `upstream_proxy_config.family` — ზედა დონის პროქსის ჩანაწერებისთვის განკუთვნილი დირექტივა (`src/lib/db/upstreamProxy.ts`), იგივე `"auto"` ნაგულისხმევი მნიშვნელობით.

როდესაც ამოხსნილი პროქსის ობიექტის `family` მნიშვნელობა არ არის `auto`, `proxyConfigToUrl` ამატებს `?family=` მარკერს, რათა ფიქსირებული მნიშვნელობა დისპეტჩერამდე უცვლელად მივიდეს.

---

## დაკავშირებული დოკუმენტაცია

> 📖 **დაკავშირებული დოკუმენტაცია:**
>
> - [პროქსის სახელმძღვანელო](../ops/PROXY_GUIDE.md) — პროქსის სრული სისტემა: რეესტრის CRUD, 4-დონიანი ამოხსნა, როტაცია, მდგომარეობის შემოწმება, API-ის ცნობარი
> - `docs/security/STEALTH_GUIDE.md` (git-ში; `/docs`-ში არ კომპილირდება) — TLS-ის ანაბეჭდისა და CLI-ის ანაბეჭდის შრეები, რომლებიც პროქსის თავზე მუშაობს
> - [მარშრუტის დამცავის დონეები](./ROUTE_GUARD_TIERS.md) — loopback-ის სავალდებულო გამოყენება მხოლოდ ლოკალური მარშრუტებისთვის
