# Egress IP Family Policy (IPv4/IPv6) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Hər proksi üzrə çıxış trafikini tək bir IP ailəsinə — `auto`, `ipv4` və ya `ipv6` — sabitləyin ki, yalnız IPv6 çıxışı heç vaxt səssiz şəkildə yenidən IPv4-ə keçməsin.**

> **Əsas həqiqət mənbəyi:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute hər bir proksinin **ünvan ailəsi üzrə çıxış direktivinə** malik olmasına imkan verir. Standart olaraq əməliyyat sistemi IPv4 və ya IPv6-nı seçir (ikili stek, "Happy Eyeballs"). Direktivi `ipv4` və ya `ipv6` olaraq təyin etdiyiniz zaman OmniRoute həmin proksi vasitəsilə qurulan hər bağlantını seçilmiş ailəyə sabitləyir və digər ailəyə keçmək əvəzinə **qapalı şəkildə xəta verir**.

Bu səhifədə direktivin nə olduğu, nə üçün mövcud olduğu, harada konfiqurasiya edildiyi və icra zamanı necə həll olunduğu izah edilir.

---

## Mündəricat

- [Bu nədir](#what-it-is)
- [Nə üçün mövcuddur](#why-it-exists)
- [Üç dəyər](#the-three-values)
- [Onu necə konfiqurasiya etmək olar](#how-to-configure-it)
- [`auto` necə həll olunur](#how-auto-resolves)
- [`ipv4` / `ipv6` necə məcburi tətbiq olunur](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 uyğunluğu](#socks5-compatibility)
- [Qapalı şəkildə xəta vermə davranışı](#fail-closed-behavior)
- [Məlumat modeli](#data-model)
- [Əlaqəli sənədlər](#related-documentation)

---

## Bu nədir

Reyestrdəki hər proksinin Zod enum-u ilə doğrulanan və üç mümkün dəyərə malik `family` sahəsi var:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Sahənin standart dəyəri əvvəlki ikili stek davranışını qoruyan `"auto"`-dur. Onun `ipv4` və ya `ipv6` olaraq təyin edilməsi həmin proksi üçün bağlantı ailəsini sabitləyir.

Direktiv hər yerdə vahid köməkçi vasitəsilə normallaşdırılır, beləliklə, hər hansı naməlum dəyər `auto`-ya çevrilir:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Nə üçün mövcuddur

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) çərçivəsində təqdim edilib. Buna səbəb olan problemlər:

| Problem                                     | Direktivin həll etdiyi məsələ                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yalnız IPv6 çıxışının IPv4-ə sızması**    | Proksi hostunun həm A, həm də AAAA qeydləri olduqda (və ya əməliyyat sistemi IPv4-ə üstünlük verdikdə), Happy Eyeballs, yalnız IPv6 yolu nəzərdə tutduğunuz halda belə, bağlantını IPv4 üzərindən qura bilər. `ipv6`-ya sabitləmə bu sızmanı aradan qaldırır.                                                                                                                   |
| **Ortaq çıxış anomaliyasına görə ləğvetmə** | Rotasiya edən provayderlər (codex/openai) bir çox hesab yüksək həcmdə **eyni** IP üzərindən çıxdıqda tokenləri ləğv edir. Çıxış ailəsinə nəzarət hesabların fərqli, proqnozlaşdırıla bilən çıxış yollarında saxlanmasının bir hissəsidir (bununla birlikdə istifadə olunan çıxış IP diaqnostikası üçün [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) faylına baxın). |
| **Uyğunluq/sınaq üçün deterministik çıxış** | Trafikin konkret ailə üzərindən çıxdığına zəmanət verməli olduğunuz zaman `auto` kifayət etmir.                                                                                                                                                                                                                                                                                 |

Direktiv qəsdən qlobal deyil, **hər proksi üzrə** təyin edilir — hovuzunuzdakı müxtəlif proksilər fərqli siyasətlərə malik ola bilər.

---

## Üç Dəyər

| Dəyər  | UI etiketi          | Davranış                                                                                                                                                                  |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | Əməliyyat sistemi ailəni seçir. IP literalı olan proksi hostu üçün ailə literalın özündən müəyyən edilir; host adı üçün isə hər iki ailə uyğundur. Bu, standart dəyərdir. |
| `ipv4` | `IPv4 only`         | Bağlantını IPv4 ilə məhdudlaşdırır. Proksi hostunun IPv4 (A) qeydi yoxdursa, bağlantı təhlükəsiz şəkildə uğursuz olur.                                                    |
| `ipv6` | `IPv6 only`         | Bağlantını IPv6 ilə məhdudlaşdırır. Proksi hostunun IPv6 (AAAA) qeydi yoxdursa, bağlantı təhlükəsiz şəkildə uğursuz olur.                                                 |

UI sətirləri `src/i18n/messages/en.json` faylındadır (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Necə Konfiqurasiya Etməli

### İdarəetmə Paneli

Seçim elementi **Proxy Pool** tabındakı proksi formasında yerləşir:

1. **Dashboard → Settings → Proxy → Proxy Pool** bölməsini açın
2. Proksi əlavə edin və ya mövcud proksini redaktə edin
3. **IP family** açılan siyahısını `Auto (dual-stack)`, `IPv4 only` və ya `IPv6 only` olaraq təyin edin
4. Yadda saxlayın

İdarəetmə elementi `ProxyRegistryManager.tsx` tərəfindən render edilir (`proxy/ProxyPoolTab.tsx` daxilində qoşulur).

### API

`family` sahəsi proksi reyestrinin yaratma/yeniləmə sorğularının bir hissəsidir, `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) tərəfindən yoxlanılır və `POST` / `PATCH /api/v1/management/proxies` tərəfindən emal edilir:

```bash
# Yalnız IPv6 istifadə edən proksi yaradın
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Mövcud proksini yalnız IPv4 istifadə edəcək şəkildə dəyişdirin
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Eyni sahə yuxarı axın proksi qeydləri üçün istifadə edilən daxili proksi konfiqurasiya obyekti tərəfindən də qəbul edilir (`upstream_proxy_config.family`, baxın: [Məlumat Modeli](#data-model)).

Proksi CRUD/təyinetmə API-sinin qalan hissəsi üçün [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) sənədinə baxın.

---

## `auto` Necə Müəyyən Edilir

`family` dəyəri `auto` olduqda, OmniRoute heç bir direktiv **əlavə etmir** — proksi URL-i olduğu kimi istifadə edilir və bağlantı ailəsi daxili xüsusiyyətlərə əsasən müəyyən olunur.

URL-in yaradılması zamanı (`open-sse/utils/proxyDispatcher.ts` faylındakı `proxyConfigToUrl` / `normalizeProxyUrl`) `auto` proksisi heç bir marker olmayan sadə URL yaradır:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Dispetçerə ötürülmə zamanı (`resolveDispatcherFamily`) `auto` IP literalı olan hostun daxili ailəsinə və ya host adı üçün `null` dəyərinə (əməliyyat sisteminin qərar verməsinə imkan verir) çevrilir:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // host adı üçün null → əməliyyat sistemi seçir
  // ...
}
```

Beləliklə:

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → həmin literalın ailəsi.
- `auto` + host adı → `null` → əməliyyat sisteminin standart ikili stek həlli.

---

## `ipv4` / `ipv6` Necə Məcburi Tətbiq Olunur

`auto` olmayan direktiv normallaşdırılmış proksi URL-inə yalnız bir dəfə əlavə edilən sintetik sorğu markeri — `?family=ipv4` və ya `?family=ipv6` — kimi ötürülür. `normalizeProxyUrl` bu markeri dəqiq bir dəfə silib yenidən əlavə edir ki, portun təhlilini heç vaxt pozmasın.

Dispetçer yaradılarkən marker oxunur və konkret qoşulma ailəsinə çevrilir. Host **əks** ailəyə aid IP literalıdırsa, OmniRoute xəta atır (ziddiyyət zamanı sistem qapalı qalır):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Daha sonra konkret ailə konnektorda sabitlənir:

- **HTTP/HTTPS proksiləri** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs mexanizmini deaktiv edir, beləliklə yalnız seçilmiş ailə üzrə qoşulma yaradılır.
- **SOCKS5 proksiləri**: fərdi konnektor `socket_options: { family, autoSelectFamily: false }` parametrini SOCKS klientinə ötürür ([SOCKS5 Uyğunluğu](#socks5-compatibility) bölməsinə baxın).

---

## SOCKS5 Uyğunluğu

Ailənin sabitlənməsi SOCKS5 proksiləri ilə işləyir, lakin standart `fetch-socks` proksi keçidinin ailəsini sabitləmək üçün lazım olan soket seçimlərini təqdim etmir. OmniRoute bunun üçün öz konnektorunu təmin edir:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Bütün SOCKS5 göndərişləri `family` dəyərindən asılı olmayaraq (`null` / host adı üzərindən `auto` daxil olmaqla) `createSocksDispatcherWithFamily` vasitəsilə həyata keçirilir: `buildSocksFamilySocketOptions(null)` `{}` qaytarır və Happy Eyeballs mexanizminin yalnız IPv6 çıxış siyasəti üçün IPv4 seçə bilməməsi məqsədilə eyni `SocksClient.createConnection` + TLS `buildConnector` yolu `socket_options` sabitləməsi ilə istifadə olunur.

SOCKS5 dəstəyi standart olaraq aktivdir (`ENABLE_SOCKS5_PROXY=false` vasitəsilə deaktiv edilə bilər); [PROXY_GUIDE.md → Mühit Dəyişənləri](../ops/PROXY_GUIDE.md#environment-variables) bölməsinə baxın.

---

## Xəta Zamanı Qapalı Qalma Davranışı

Direktivin əsas məqsədi yanlış ailəyə səssiz şəkildə keçmək əvəzinə belə keçidi **rədd etməkdir**. Bunu iki qoruyucu mexanizm təmin edir:

1. **Literal ziddiyyəti** — IP-literal hostla ziddiyyət təşkil edən direktiv dispetçerin yaradılması zamanı xəta atır (yuxarıda göstərilən `resolveDispatcherFamily`).

2. **Host adı üçün ilkin DNS yoxlaması** — ailəsi sabitlənmiş host adı proksisi üçün `proxyFetch.ts`, çıxış bağlantısını yaratmazdan **əvvəl** `assertHostnameSupportsFamily` vasitəsilə host adının tələb olunan ailəyə aid qeydinin həqiqətən mövcud olduğunu yoxlayır:

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

   Xəta baş verdikdə `proxyFetch.ts` xətanı `code = "PROXY_FAMILY_UNAVAILABLE"` və `statusCode = 503` ilə işarələyir. DNS ad həllinin uğursuzluğu da eyni qaydada xəta zamanı qapalı qalma kimi qəbul edilir (çıxış bağlantısı rədd edilir).

IP-literal hostlar üçün ilkin DNS yoxlaması heç bir əməliyyat yerinə yetirmir — onların ailəsi öz daxilində müəyyən edilib və axtarış tələb etmir.

---

## Məlumat Modeli

`family` sütunu `099_proxy_family.sql` miqrasiyası ilə **iki** cədvələ əlavə edilib:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — reyestr qeydləri üçün hər proksi üzrə direktivdir (`src/lib/db/proxies.ts`). Həll etmə sorğuları digər proksi sütunları ilə yanaşı `family` sütununu da seçir və çatışmayan/sətir olmayan dəyər `"auto"` dəyərinə çevrilir.
- `upstream_proxy_config.family` — eyni `"auto"` standart dəyəri ilə yuxarı axın proksi qeydləri üçün direktivdir (`src/lib/db/upstreamProxy.ts`).

Həll edilmiş proksi obyekti `auto` olmayan `family` daşıdıqda, `proxyConfigToUrl` `?family=` işarəsini əlavə edir ki, sabitləmə dispatcher-ə qədər bütün yol boyunca qorunsun.

---

## Əlaqəli Sənədlər

> 📖 **Əlaqəli sənədlər:**
>
> - [Proksi Bələdçisi](../ops/PROXY_GUIDE.md) — tam proksi sistemi: reyestr CRUD əməliyyatları, 4 səviyyəli həll etmə, rotasiya, sağlamlıq yoxlaması, API arayışı
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` daxilində yığılmır) — proksinin üzərində işləyən TLS barmaq izi və CLI barmaq izi səviyyələri
> - [Marşrut Mühafizəsi Səviyyələri](./ROUTE_GUARD_TIERS.md) — yalnız lokal marşrutlar üçün loopback tətbiqi
