# Egress IP Family Policy (IPv4/IPv6) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Vežite odlazni saobraćaj za jednu IP familiju — `auto`, `ipv4` ili `ipv6` — po proksiju, tako da izlaz koji podržava samo IPv6 nikada neprimetno ne pređe nazad na IPv4.**

> **Izvor istine:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute omogućava da svaki proksi sadrži **direktivu za familiju izlazne adrese**. Operativni sistem podrazumevano bira IPv4 ili IPv6 (dvostruki stek, „Happy Eyeballs“). Kada direktivu postavite na `ipv4` ili `ipv6`, OmniRoute vezuje svaku vezu preko tog proksija za izabranu familiju i **bezbedno prekida vezu** umesto da pređe na drugu familiju.

Ova stranica objašnjava šta je ova direktiva, zašto postoji, gde je konfigurišete i kako je izvršno okruženje razrešava.

---

## Sadržaj

- [Šta je ovo](#what-it-is)
- [Zašto postoji](#why-it-exists)
- [Tri vrednosti](#the-three-values)
- [Kako se konfiguriše](#how-to-configure-it)
- [Kako se `auto` razrešava](#how-auto-resolves)
- [Kako se primenjuju `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Kompatibilnost sa SOCKS5](#socks5-compatibility)
- [Ponašanje bezbednog prekida](#fail-closed-behavior)
- [Model podataka](#data-model)
- [Povezana dokumentacija](#related-documentation)

---

## Šta je ovo

Svaki proksi u registru ima polje `family` sa tri moguće vrednosti, koje se validiraju pomoću Zod nabrajanja:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Podrazumevana vrednost polja je `"auto"`, čime se zadržava prethodno ponašanje dvostrukog steka. Postavljanjem na `ipv4` ili `ipv6` familija povezivanja za taj proksi vezuje se za izabranu vrednost.

Direktiva se svuda normalizuje pomoću jedne pomoćne funkcije, tako da se svaka nepoznata vrednost svodi na `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Zašto postoji

Uvedeno u PR-u [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemi koji su motivisali ovu funkcionalnost:

| Problem                                             | Šta direktiva rešava                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Curenje izlaza koji podržava samo IPv6 ka IPv4**  | Kada host proksija ima i A i AAAA zapise (ili operativni sistem daje prednost IPv4 protokolu), Happy Eyeballs može uspostaviti izlaznu vezu preko IPv4 čak i kada nameravate da koristite putanju isključivo preko IPv6. Vezivanje za `ipv6` uklanja to curenje.                                                                                                                           |
| **Opozivanje zbog anomalije deljenog izlaza**       | Provajderi sa rotacijom (codex/openai) opozivaju tokene kada veliki broj naloga izlazi preko **iste** IP adrese pri velikom obimu saobraćaja. Kontrola familije izlaza doprinosi zadržavanju naloga na zasebnim, predvidljivim izlaznim putanjama (pogledajte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) za dijagnostiku izlazne IP adrese koja se koristi zajedno sa ovim). |
| **Deterministički izlaz za usklađenost/testiranje** | Kada morate da garantujete da saobraćaj izlazi preko određene familije, `auto` nije dovoljan.                                                                                                                                                                                                                                                                                              |

Direktiva je namerno definisana **po proksiju**, a ne globalno — različiti proksiji u vašem skupu mogu imati različite politike.

---

## Три вредности

| Вредност | Ознака у корисничком интерфејсу | Понашање                                                                                                                                                                   |
| -------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`   | `Аутоматски (двоструки стек)`   | ОС бира фамилију. За хост проксија задат IP литералом, фамилија је својствена самом литералу; за име хоста, обе фамилије испуњавају услове. Ово је подразумевана вредност. |
| `ipv4`   | `Само IPv4`                     | Ограничава везу на IPv4. Безбедно одбија повезивање ако хост проксија нема IPv4 (A) запис.                                                                                 |
| `ipv6`   | `Само IPv6`                     | Ограничава везу на IPv6. Безбедно одбија повезивање ако хост проксија нема IPv6 (AAAA) запис.                                                                              |

Ниске корисничког интерфејса налазе се у `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Како се конфигурише

### Контролна табла

Селектор се налази у обрасцу за прокси на картици **Скуп проксија**:

1. Отворите **Контролна табла → Подешавања → Прокси → Скуп проксија**
2. Додајте или измените прокси
3. Подесите падајућу листу **IP фамилија** на `Аутоматски (двоструки стек)`, `Само IPv4` или `Само IPv6`
4. Сачувајте

Контролу приказује `ProxyRegistryManager.tsx` (монтиран у `proxy/ProxyPoolTab.tsx`).

### API

Поље `family` део је корисног садржаја за креирање/ажурирање регистра проксија, а валидирају га `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) и обрађују `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Креирај прокси који користи само IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Промени постојећи прокси тако да користи само IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Исто поље прихвата и угнежђени објекат конфигурације проксија који се користи за уносе узводног проксија (`upstream_proxy_config.family`, погледајте [Модел података](#data-model)).

За остатак API-ја за CRUD операције и доделу проксија погледајте [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Како се разрешава `auto`

Када је `family` подешено на `auto`, OmniRoute **не** додаје ниједну директиву — URL проксија користи се такав какав јесте, а фамилија везе одређује се на основу самог хоста.

При формирању URL-а (`proxyConfigToUrl` / `normalizeProxyUrl` у `open-sse/utils/proxyDispatcher.ts`), прокси са вредношћу `auto` даје обичан URL без ознаке:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

При усмеравању (`resolveDispatcherFamily`), `auto` се разрешава у фамилију својствену хосту задатом IP литералом или у `null` (оперативни систем одлучује) за име хоста:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null за име хоста → ОС бира
  // ...
}
```

Дакле:

- `auto` + хост задат IP литералом (`192.0.2.1` / `[2001:db8::1]`) → фамилија тог литерала.
- `auto` + име хоста → `null` → стандардно разрешавање двоструког стека од стране ОС-а.

---

## Како се примењују `ipv4` / `ipv6`

Директива која није `auto` преноси се као један синтетички маркер упита — `?family=ipv4` или `?family=ipv6` — који се једном додаје нормализованом URL-у проксија. `normalizeProxyUrl` пажљиво уклања и поново додаје овај маркер тачно једном, тако да никада не наруши рашчлањивање порта.

Када се диспечер направи, маркер се чита и претвара у конкретну фамилију везе. Ако је хост IP литерал **супротне** фамилије, OmniRoute изазива грешку (у случају противречности примењује се затворено одбијање):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Конкретна фамилија се затим фиксира на конектору:

- **HTTP/HTTPS проксији** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — онемогућава Happy Eyeballs, тако да се веза успоставља искључиво преко изабране фамилије.
- **SOCKS5 проксији**: прилагођени конектор прослеђује `socket_options: { family, autoSelectFamily: false }` SOCKS клијенту (погледајте [Компатибилност са SOCKS5](#socks5-compatibility)).

---

## Компатибилност са SOCKS5

Фиксирање фамилије ради са SOCKS5 проксијима, али стандардни `fetch-socks` не излаже опције сокета потребне за фиксирање фамилије прокси везе. OmniRoute зато испоручује сопствени конектор:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Сви SOCKS5 захтеви пролазе кроз `createSocksDispatcherWithFamily` без обзира на `family` (укључујући `null` / `auto` преко имена хоста): `buildSocksFamilySocketOptions(null)` даје `{}`, а иста путања `SocksClient.createConnection` + TLS `buildConnector` користи се са фиксирањем преко `socket_options`, тако да Happy Eyeballs не може да изабере IPv4 за политику излазног саобраћаја која дозвољава само IPv6.

Сама подршка за SOCKS5 подразумевано је омогућена (може се искључити помоћу `ENABLE_SOCKS5_PROXY=false`); погледајте [PROXY_GUIDE.md → Променљиве окружења](../ops/PROXY_GUIDE.md#environment-variables).

---

## Понашање затвореног одбијања

Сврха директиве је да **одбије** везу уместо да неприметно пређе на погрешну фамилију. То обезбеђују две заштите:

1. **Противречност литерала** — директива која је у супротности са хостом задатим као IP литерал изазива грешку приликом прављења диспечера (`resolveDispatcherFamily`, приказан изнад).

2. **Прелиминарна DNS провера имена хоста** — за прокси наведен именом хоста са фиксираном фамилијом, `proxyFetch.ts` проверава да ли име хоста заиста има запис у захтеваној фамилији **пре** слања излазног саобраћаја, помоћу `assertHostnameSupportsFamily`:

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

   У случају неуспеха, `proxyFetch.ts` означава грешку вредностима `code = "PROXY_FAMILY_UNAVAILABLE"` и `statusCode = 503`. Неуспешно DNS разрешавање такође се третира као затворено одбијање (излазни саобраћај се одбија).

За хостове задате као IP литерали прелиминарна DNS провера не ради ништа — њихова фамилија је својствена самој адреси и није потребно никакво претраживање.

---

## Модел података

Колона `family` додата је миграцијом `099_proxy_family.sql` у **две** табеле:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — директива за сваки појединачни прокси у уносима регистра (`src/lib/db/proxies.ts`). Упити за разрешавање бирају `family` заједно са осталим колонама проксија, а вредност која недостаје или није типа string конвертује се у `"auto"`.
- `upstream_proxy_config.family` — директива за уносе узводног проксија (`src/lib/db/upstreamProxy.ts`), са истом подразумеваном вредношћу `"auto"`.

Када разрешени објекат проксија садржи вредност `family` која није `auto`, `proxyConfigToUrl` додаје ознаку `?family=` како би задата вредност била очувана све до диспечера.

---

## Повезана документација

> 📖 **Повезана документација:**
>
> - [Водич за прокси](../ops/PROXY_GUIDE.md) — комплетан систем проксија: CRUD регистра, разрешавање на 4 нивоа, ротација, провера исправности, референца API-ја
> - `docs/security/STEALTH_GUIDE.md` (git; није укључено у `/docs`) — слојеви TLS отиска и CLI отиска који се примењују поврх проксија
> - [Нивои заштите рута](./ROUTE_GUARD_TIERS.md) — примена loopback ограничења за руте доступне само локално
