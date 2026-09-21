# Egress IP Family Policy (IPv4/IPv6) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Фиксирайте изходящия трафик към едно IP семейство — `auto`, `ipv4` или `ipv6` — за всяко прокси, така че изходяща връзка само през IPv6 никога да не преминава незабелязано обратно към IPv4.**

> **Източник на истина:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute позволява всяко прокси да има **директива за IP семейството на изходящата връзка**. По подразбиране операционната система избира IPv4 или IPv6 (дву-стеков режим, „Happy Eyeballs“). Когато зададете директивата на `ipv4` или `ipv6`, OmniRoute фиксира всяка връзка през това прокси към избраното семейство и **прекратява връзката при неуспех**, вместо да премине към другото семейство.

Тази страница описва какво представлява директивата, защо съществува, къде се конфигурира и как се разрешава по време на изпълнение.

---

## Съдържание

- [Какво представлява](#what-it-is)
- [Защо съществува](#why-it-exists)
- [Трите стойности](#the-three-values)
- [Как да я конфигурирате](#how-to-configure-it)
- [Как се разрешава `auto`](#how-auto-resolves)
- [Как се налагат `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Съвместимост със SOCKS5](#socks5-compatibility)
- [Поведение с прекратяване при неуспех](#fail-closed-behavior)
- [Модел на данните](#data-model)
- [Свързана документация](#related-documentation)

---

## Какво представлява

Всяко прокси в регистъра има поле `family` с три възможни стойности, валидирани чрез Zod enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Стойността по подразбиране на полето е `"auto"`, което запазва предишното дву-стеково поведение. Задаването му на `ipv4` или `ipv6` фиксира семейството за свързване на това прокси.

Директивата се нормализира навсякъде чрез една помощна функция, така че всяка неизвестна стойност се свежда до `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Защо съществува

Въведена е в PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Основните проблеми, довели до създаването ѝ:

| Проблем                                                           | Какво коригира директивата                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Изходяща връзка само през IPv6 преминава към IPv4**             | Когато хостът на проксито има едновременно A и AAAA записи (или операционната система предпочита IPv4), Happy Eyeballs може да установи изходяща връзка през IPv4 дори когато е предвиден път само през IPv6. Фиксирането към `ipv6` предотвратява това изтичане.                                                                                                                                     |
| **Отнемане на достъп поради аномалия при споделен изходящ адрес** | Доставчиците с ротация (codex/openai) анулират токени, когато много акаунти изпращат голям обем трафик през **един и същ** IP адрес. Управлението на семейството на изходящата връзка спомага акаунтите да използват отделни, предвидими изходящи пътища (вижте [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) за диагностиката на изходящия IP адрес, която се използва съвместно с това). |
| **Детерминистична изходяща връзка за съответствие/тестване**      | Когато трябва да гарантирате, че трафикът излиза през определено семейство, `auto` не е достатъчно.                                                                                                                                                                                                                                                                                                   |

Директивата умишлено е **за всяко отделно прокси**, а не глобална — различните проксита във вашия пул могат да имат различни правила.

---

## Трите стойности

| Стойност | Етикет в потребителския интерфейс | Поведение                                                                                                                                                                                                         |
| -------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`   | `Автоматично (двустеково)`        | Операционната система избира адресното семейство. При прокси хост, зададен като IP литерал, семейството е присъщо на литерала; при име на хост са допустими и двете семейства. Това е стойността по подразбиране. |
| `ipv4`   | `Само IPv4`                       | Ограничава връзката до IPv4. Прекратява със затворено състояние, ако прокси хостът няма IPv4 (A) запис.                                                                                                           |
| `ipv6`   | `Само IPv6`                       | Ограничава връзката до IPv6. Прекратява със затворено състояние, ако прокси хостът няма IPv6 (AAAA) запис.                                                                                                        |

Низовете за потребителския интерфейс се намират в `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Как да го конфигурирате

### Табло за управление

Селекторът се намира във формуляра за прокси в раздела **Пул от проксита**:

1. Отворете **Табло за управление → Настройки → Прокси → Пул от проксита**
2. Добавете или редактирайте прокси
3. Задайте падащото меню **IP семейство** на `Автоматично (двустеково)`, `Само IPv4` или `Само IPv6`
4. Запазете

Контролата се визуализира от `ProxyRegistryManager.tsx` (монтирана в `proxy/ProxyPoolTab.tsx`).

### API

Полето `family` е част от данните за създаване/актуализиране на регистъра на проксита, валидирани от `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) и обработвани от `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Създаване на прокси само с IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Промяна на съществуващо прокси към режим само с IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Същото поле се приема и от вградения обект за конфигурация на прокси, използван за записи за прокси към по-високо ниво (`upstream_proxy_config.family`, вижте [Модел на данните](#data-model)).

За останалата част от API за CRUD операции и присвояване на проксита вижте [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Как се разрешава `auto`

Когато `family` е `auto`, OmniRoute **не** добавя никаква директива — URL адресът на проксито се използва без промени, а адресното семейство на връзката се определя по присъщите характеристики.

При изграждането на URL адреса (`proxyConfigToUrl` / `normalizeProxyUrl` в `open-sse/utils/proxyDispatcher.ts`) прокси с `auto` създава обикновен URL адрес без маркер:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

При диспечиране (`resolveDispatcherFamily`) `auto` се разрешава до присъщото семейство на хост, зададен като IP литерал, или до `null` (операционната система решава) при име на хост:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null при име на хост → операционната система избира
  // ...
}
```

Следователно:

- `auto` + хост, зададен като IP литерал (`192.0.2.1` / `[2001:db8::1]`) → семейството на този литерал.
- `auto` + име на хост → `null` → стандартно двустеково разрешаване от операционната система.

---

## Как се налагат `ipv4` / `ipv6`

Директива, различна от `auto`, се предава като един синтетичен маркер в заявката — `?family=ipv4` или `?family=ipv6` — добавен еднократно към нормализирания URL адрес на проксито. `normalizeProxyUrl` внимателно премахва и добавя отново този маркер точно веднъж, така че никога да не нарушава разпознаването на порта.

Когато диспечерът се създава, маркерът се прочита и преобразува в конкретно семейство за свързване. Ако хостът е IP литерал от **противоположното** семейство, OmniRoute хвърля грешка (при противоречие се прилага fail-closed поведение):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

След това конкретното семейство се фиксира в конектора:

- **HTTP/HTTPS проксита** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — деактивира Happy Eyeballs, така че връзката да се установява единствено чрез избраното семейство.
- **SOCKS5 проксита**: персонализиран конектор предава `socket_options: { family, autoSelectFamily: false }` към SOCKS клиента (вижте [Съвместимост със SOCKS5](#socks5-compatibility)).

---

## Съвместимост със SOCKS5

Фиксирането на семейството работи със SOCKS5 проксита, но стандартният `fetch-socks` не предоставя опциите на сокета, необходими за фиксиране на семейството на връзката към проксито. За тази цел OmniRoute включва собствен конектор:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Всички SOCKS5 заявки минават през `createSocksDispatcherWithFamily`, независимо от `family` (включително `null` / `auto` при име на хост): `buildSocksFamilySocketOptions(null)` връща `{}`, а същият път през `SocksClient.createConnection` + TLS `buildConnector` се използва с фиксиране чрез `socket_options`, така че Happy Eyeballs да не може да избере IPv4 при политика за изходящ трафик само през IPv6.

Самата поддръжка на SOCKS5 е активирана по подразбиране (може да бъде изключена чрез `ENABLE_SOCKS5_PROXY=false`); вижте [PROXY_GUIDE.md → Променливи на средата](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-Closed поведение

Основната цел на директивата е връзката да бъде **отказана**, вместо без предупреждение да се премине към неправилното семейство. Това се налага от две проверки:

1. **Противоречие с литерал** — директива, която противоречи на IP адрес, зададен като литерал за хост, предизвиква грешка при създаването на диспечера (`resolveDispatcherFamily`, показана по-горе).

2. **Предварителна DNS проверка на името на хоста** — при прокси с име на хост и фиксирано семейство `proxyFetch.ts` проверява чрез `assertHostnameSupportsFamily` дали името на хоста действително има запис от изискваното семейство **преди** изпращането на изходящ трафик:

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

   При неуспех `proxyFetch.ts` маркира грешката с `code = "PROXY_FAMILY_UNAVAILABLE"` и `statusCode = 503`. Неуспешното DNS разрешаване също се третира чрез fail-closed поведение (изходящият трафик се отказва).

При хостове, зададени като IP литерали, предварителната DNS проверка не извършва нищо — тяхното семейство е присъщо и не изисква търсене.

---

## Модел на данните

Колоната `family` беше добавена чрез миграцията `099_proxy_family.sql` към **две** таблици:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — директивата за всяко отделно прокси за записите в регистъра (`src/lib/db/proxies.ts`). Заявките за разрешаване избират `family` заедно с останалите колони на проксито, а липсваща стойност или стойност, която не е низ, се преобразува в `"auto"`.
- `upstream_proxy_config.family` — директивата за записите на проксито нагоре по веригата (`src/lib/db/upstreamProxy.ts`) със същата стойност по подразбиране `"auto"`.

Когато разрешен прокси обект съдържа стойност на `family`, различна от `auto`, `proxyConfigToUrl` добавя маркера `?family=`, така че фиксираната настройка да се запази по целия път до диспечера.

---

## Свързана документация

> 📖 **Свързана документация:**
>
> - [Ръководство за проксита](../ops/PROXY_GUIDE.md) — цялостната прокси система: CRUD операции с регистъра, разрешаване на 4 нива, ротация, проверки на изправността, справочник за API
> - `docs/security/STEALTH_GUIDE.md` (git; не е компилиран в `/docs`) — слоевете за TLS отпечатък и отпечатък на CLI, които работят върху проксито
> - [Нива на защита на маршрутите](./ROUTE_GUARD_TIERS.md) — налагане на loopback за маршрути, достъпни само локално
