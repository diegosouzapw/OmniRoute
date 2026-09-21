# Egress IP Family Policy (IPv4/IPv6) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Chiquvchi trafikni har bir proksi uchun bitta IP oilasiga — `auto`, `ipv4` yoki `ipv6` — biriktiring, shunda faqat IPv6 orqali chiqish hech qachon sezdirmasdan IPv4’ga qaytib ketmaydi.**

> **Haqiqiy manba:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute har bir proksiga **manzillar oilasi bo‘yicha chiqish direktivasi**ni biriktirish imkonini beradi. Standart holatda operatsion tizim IPv4 yoki IPv6’ni tanlaydi (ikki stekli, "Happy Eyeballs"). Direktivani `ipv4` yoki `ipv6` qilib belgilaganingizda, OmniRoute ushbu proksi orqali o‘tadigan har bir ulanishni tanlangan oilaga biriktiradi va boshqa oilaga qaytish o‘rniga **yopiq holatda xatoga uchraydi**.

Ushbu sahifada direktiva nima ekani, u nima uchun mavjudligi, uni qayerda sozlash va bajarilish vaqtida u qanday aniqlanishi bayon etiladi.

---

## Mundarija

- [Bu nima](#what-it-is)
- [U nima uchun mavjud](#why-it-exists)
- [Uchta qiymat](#the-three-values)
- [Uni qanday sozlash kerak](#how-to-configure-it)
- [`auto` qanday aniqlanadi](#how-auto-resolves)
- [`ipv4` / `ipv6` qanday majburiy qo‘llanadi](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 bilan moslik](#socks5-compatibility)
- [Yopiq holatda xatoga uchrash xatti-harakati](#fail-closed-behavior)
- [Ma’lumotlar modeli](#data-model)
- [Tegishli hujjatlar](#related-documentation)

---

## Bu nima

Reyestrdagi har bir proksida uchta mumkin bo‘lgan qiymatga ega `family` maydoni mavjud bo‘lib, u Zod enum orqali tekshiriladi:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Maydonning standart qiymati `"auto"` bo‘lib, u avvalgi ikki stekli xatti-harakatni saqlab qoladi. Uni `ipv4` yoki `ipv6` qilib belgilash ushbu proksi uchun ulanish oilasini biriktiradi.

Direktiva hamma joyda yagona yordamchi orqali normallashtiriladi, shuning uchun har qanday noma’lum qiymat `auto` qiymatiga keltiriladi:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## U nima uchun mavjud

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) doirasida joriy etilgan. Bunga sabab bo‘lgan muammolar:

| Muammo                                                  | Direktiva nimani tuzatadi                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Faqat IPv6 orqali chiqishning IPv4’ga sizib o‘tishi** | Proksi xosti bir vaqtning o‘zida A va AAAA yozuvlariga ega bo‘lsa (yoki operatsion tizim IPv4’ni afzal ko‘rsa), Happy Eyeballs hatto faqat IPv6 yo‘lidan foydalanmoqchi bo‘lganingizda ham IPv4 orqali ulanishi mumkin. `ipv6`’ga biriktirish bu sizib o‘tishni bartaraf etadi.                                                                                                     |
| **Umumiy chiqishdagi anomaliya sababli bekor qilish**   | Rotatsiyalanuvchi provayderlar (codex/openai) ko‘plab hisoblar yuqori hajmda **bir xil** IP orqali chiqsa, tokenlarni bekor qiladi. Chiqish oilasini boshqarish hisoblarni alohida va oldindan aytish mumkin bo‘lgan chiqish yo‘llarida saqlashning bir qismidir (bunga bog‘liq chiqish IP diagnostikasi uchun [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) ga qarang). |
| **Muvofiqlik/sinov uchun deterministik chiqish**        | Trafik muayyan oila orqali chiqishini kafolatlashingiz kerak bo‘lsa, `auto` yetarli emas.                                                                                                                                                                                                                                                                                           |

Direktiva ataylab global emas, **har bir proksi uchun alohida** qo‘llanadi — to‘plamingizdagi turli proksilar turli siyosatlarga ega bo‘lishi mumkin.

---

## Uchta qiymat

| Qiymat | UI yorligʻi               | Xatti-harakat                                                                                                                                                               |
| ------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Avtomatik (ikki stekli)` | OS oilani tanlaydi. IP literalidan iborat proksi xosti uchun oila literalning oʻziga xosdir; xost nomi uchun esa har ikkala oiladan foydalanish mumkin. Bu standart qiymat. |
| `ipv4` | `Faqat IPv4`              | Ulanishni IPv4 bilan cheklaydi. Agar proksi xostida IPv4 (A) yozuvi boʻlmasa, xavfsiz tarzda ulanishni rad etadi.                                                           |
| `ipv6` | `Faqat IPv6`              | Ulanishni IPv6 bilan cheklaydi. Agar proksi xostida IPv6 (AAAA) yozuvi boʻlmasa, xavfsiz tarzda ulanishni rad etadi.                                                        |

UI satrlari `src/i18n/messages/en.json` faylida joylashgan (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Uni qanday sozlash kerak

### Boshqaruv paneli

Tanlash elementi **Proxy Pool** varagʻidagi proksi formasida joylashgan:

1. **Dashboard → Settings → Proxy → Proxy Pool** boʻlimini oching
2. Proksi qoʻshing yoki mavjudini tahrirlang
3. **IP oilasi** ochiluvchi roʻyxatini `Avtomatik (ikki stekli)`, `Faqat IPv4` yoki `Faqat IPv6` qiymatiga oʻrnating
4. Saqlang

Boshqaruv elementi `ProxyRegistryManager.tsx` tomonidan render qilinadi (`proxy/ProxyPoolTab.tsx` ichida ulanadi).

### API

`family` maydoni proksi reyestrini yaratish/yangilash yuklamalarining bir qismi boʻlib, `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) orqali tekshiriladi va `POST` / `PATCH /api/v1/management/proxies` tomonidan qayta ishlanadi:

```bash
# Faqat IPv6 ishlatadigan proksi yaratish
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Mavjud proksini faqat IPv4 ishlatadigan qilib oʻzgartirish
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Xuddi shu maydon yuqori oqim proksi yozuvlari uchun ishlatiladigan ichki proksi konfiguratsiyasi obyekti tomonidan ham qabul qilinadi (`upstream_proxy_config.family`, [Maʼlumotlar modeli](#data-model)ga qarang).

Proksi CRUD/tayinlash API qismining qolgan tafsilotlari uchun [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)ga qarang.

---

## `auto` qanday aniqlanadi

`family` qiymati `auto` boʻlsa, OmniRoute hech qanday direktiva qoʻshmaydi — proksi URL manzili oʻz holicha ishlatiladi va ulanish oilasi ichki xususiyatlarga koʻra aniqlanadi.

URL yaratish vaqtida (`open-sse/utils/proxyDispatcher.ts` ichidagi `proxyConfigToUrl` / `normalizeProxyUrl`) `auto` proksi hech qanday belgisiz oddiy URL hosil qiladi:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Dispetcherga uzatish vaqtida (`resolveDispatcherFamily`) `auto` IP-literal xostning ichki oilasiga yoki xost nomi uchun `null` qiymatiga (OS tanlashiga ruxsat berish) aniqlanadi:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // xost nomi uchun null → OS tanlaydi
  // ...
}
```

Demak:

- `auto` + IP-literal xost (`192.0.2.1` / `[2001:db8::1]`) → shu literalning oilasi.
- `auto` + xost nomi → `null` → OS tomonidan standart ikki stekli aniqlash.

---

## `ipv4` / `ipv6` qanday majburiy qoʻllanadi

`auto` boʻlmagan direktiva normallashtirilgan proksi URL manziliga bir marta qoʻshiladigan yagona sunʼiy soʻrov belgisi — `?family=ipv4` yoki `?family=ipv6` — sifatida uzatiladi. `normalizeProxyUrl` ushbu belgini aynan bir marta olib tashlash va qayta qoʻshishga eʼtibor beradi, shu sababli u portni tahlil qilishni hech qachon buzmaydi.

Dispatcher yaratilganda belgi oʻqiladi va aniq ulanish oilasiga aylantiriladi. Agar xost **qarama-qarshi** oiladagi IP literal boʻlsa, OmniRoute xatolik chiqaradi (ziddiyatda yopiq rad etish qoʻllanadi):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proksi oilasi direktivasi ${directive} ${literal === 6 ? "IPv6" : "IPv4"} literal xostiga zid`
  );
}
```

Soʻngra aniq oila ulagichda qatʼiy belgilanadi:

- **HTTP/HTTPS proksilari** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs mexanizmini oʻchiradi, natijada faqat tanlangan oila orqali ulanish amalga oshiriladi.
- **SOCKS5 proksilari**: maxsus ulagich `socket_options: { family, autoSelectFamily: false }` parametrini SOCKS mijoziga uzatadi ([SOCKS5 mosligi](#socks5-compatibility) boʻlimiga qarang).

---

## SOCKS5 mosligi

Oilani qatʼiy belgilash SOCKS5 proksilari bilan ishlaydi, biroq standart `fetch-socks` proksi bosqichining oilasini qatʼiy belgilash uchun zarur boʻlgan soket parametrlarini taqdim etmaydi. Shu sababli OmniRoute oʻz ulagichi bilan birga taqdim etiladi:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Barcha SOCKS5 joʻnatmalari `family` qiymatidan qatʼi nazar (jumladan, xost nomi uchun `null` / `auto`) `createSocksDispatcherWithFamily` orqali oʻtadi: `buildSocksFamilySocketOptions(null)` funksiyasi `{}` qaytaradi va ayni `SocksClient.createConnection` + TLS `buildConnector` yoʻli `socket_options` orqali qatʼiy belgilash bilan ishlatiladi, shuning uchun Happy Eyeballs faqat IPv6 chiqish siyosati uchun IPv4ʼni tanlay olmaydi.

SOCKS5 qoʻllab-quvvatlashi birlamchi holatda yoqilgan (`ENABLE_SOCKS5_PROXY=false` orqali undan voz kechish mumkin); [PROXY_GUIDE.md → Muhit oʻzgaruvchilari](../ops/PROXY_GUIDE.md#environment-variables) boʻlimiga qarang.

---

## Yopiq rad etish xatti-harakati

Direktivaning asosiy maqsadi notoʻgʻri oilaga sezdirmasdan qaytish oʻrniga ulanishni **rad etish**dir. Buni ikkita himoya mexanizmi taʼminlaydi:

1. **Literal ziddiyati** — IP-literal xostga zid boʻlgan direktiva dispatcher yaratilayotganda xatolik chiqaradi (yuqorida koʻrsatilgan `resolveDispatcherFamily`).

2. **Xost nomi uchun dastlabki DNS tekshiruvi** — oilasi qatʼiy belgilangan xost nomli proksi uchun `proxyFetch.ts` tashqi tarmoqqa chiqishdan **oldin** `assertHostnameSupportsFamily` orqali xost nomida talab qilingan oilaga mansub yozuv mavjudligini tekshiradi:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proksi xosti ${host} uchun ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} yozuvi mavjud emas; ` +
         `faqat ${family === 6 ? "IPv6" : "IPv4"} orqali chiqish rad etilmoqda (yopiq rad etish)`
     );
   }
   ```

   Xatolik yuz berganda `proxyFetch.ts` xatoga `code = "PROXY_FAMILY_UNAVAILABLE"` va `statusCode = 503` belgilarini qoʻshadi. DNS aniqlashdagi xatolik ham xuddi shunday yopiq rad etish sifatida koʻrib chiqiladi (tashqi tarmoqqa chiqish rad etiladi).

IP-literal xostlar uchun dastlabki DNS tekshiruvi hech qanday amal bajarmaydi — ularning oilasi ichki xususiyat boʻlib, qidiruvni talab qilmaydi.

---

## Maʼlumotlar modeli

`family` ustuni `099_proxy_family.sql` migratsiyasi orqali **ikkita** jadvalga qoʻshilgan:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — reyestr yozuvlari uchun har bir proksiga alohida direktiva (`src/lib/db/proxies.ts`). Aniqlash soʻrovlari boshqa proksi ustunlari bilan birga `family` ustunini ham tanlaydi, mavjud boʻlmagan yoki satr boʻlmagan qiymat esa `"auto"` qiymatiga majburan oʻzgartiriladi.
- `upstream_proxy_config.family` — yuqori oqim proksi yozuvlari uchun direktiva (`src/lib/db/upstreamProxy.ts`), xuddi shu `"auto"` standart qiymati bilan.

Aniqlangan proksi obyekti `auto` boʻlmagan `family` qiymatiga ega boʻlsa, `proxyConfigToUrl` ushbu belgilangan qiymat dispetchergacha saqlanib qolishi uchun `?family=` markerini qoʻshadi.

---

## Tegishli hujjatlar

> 📖 **Tegishli hujjatlar:**
>
> - [Proksi qoʻllanmasi](../ops/PROXY_GUIDE.md) — toʻliq proksi tizimi: reyestr CRUD amallari, 4 darajali aniqlash, rotatsiya, holatni tekshirish, API maʼlumotnomasi
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` tarkibiga kompilyatsiya qilinmaydi) — proksi ustida ishlaydigan TLS raqamli izi va CLI raqamli izi qatlamlari
> - [Yoʻnalish himoyasi darajalari](./ROUTE_GUARD_TIERS.md) — faqat mahalliy yoʻnalishlar uchun loopback talabini taʼminlash
