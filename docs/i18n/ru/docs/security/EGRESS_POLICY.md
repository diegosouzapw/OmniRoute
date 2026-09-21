# Egress IP Family Policy (IPv4/IPv6) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Закрепляйте исходящий трафик за одним семейством IP-адресов — `auto`, `ipv4` или `ipv6` — отдельно для каждого прокси, чтобы исходящий трафик, предназначенный только для IPv6, никогда незаметно не переключался обратно на IPv4.**

> **Источник истины:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute позволяет назначить каждому прокси **директиву семейства адресов для исходящего трафика**. По умолчанию операционная система выбирает IPv4 или IPv6 (двойной стек, «Happy Eyeballs»). Если задать для директивы значение `ipv4` или `ipv6`, OmniRoute закрепляет все соединения через этот прокси за выбранным семейством и **завершает работу с ошибкой**, не переключаясь на другое семейство.

На этой странице описано, что представляет собой эта директива, зачем она нужна, где её настраивать и как среда выполнения определяет её значение.

---

## Содержание

- [Что это такое](#what-it-is)
- [Зачем это нужно](#why-it-exists)
- [Три значения](#the-three-values)
- [Как это настроить](#how-to-configure-it)
- [Как разрешается `auto`](#how-auto-resolves)
- [Как обеспечивается использование `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Совместимость с SOCKS5](#socks5-compatibility)
- [Поведение с запретом переключения](#fail-closed-behavior)
- [Модель данных](#data-model)
- [Связанная документация](#related-documentation)

---

## Что это такое

У каждого прокси в реестре есть поле `family` с тремя возможными значениями, проверяемыми с помощью перечисления Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

По умолчанию поле имеет значение `"auto"`, сохраняющее прежнее поведение двойного стека. Значение `ipv4` или `ipv6` закрепляет семейство подключений для этого прокси.

Директива повсеместно нормализуется с помощью единой вспомогательной функции, поэтому любое неизвестное значение преобразуется в `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Зачем это нужно

Функциональность представлена в PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Причины её появления:

| Проблема                                                                           | Что исправляет директива                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Утечка исходящего трафика, предназначенного только для IPv6, в IPv4**            | Если у хоста прокси есть записи как A, так и AAAA (или операционная система предпочитает IPv4), Happy Eyeballs может установить исходящее соединение через IPv4, даже если предполагается путь только через IPv6. Закрепление `ipv6` предотвращает такую утечку.                                                                                                                                                                                              |
| **Отзыв токенов из-за аномалий общего исходящего IP-адреса**                       | Провайдеры с ротацией (codex/openai) отзывают токены, когда множество учётных записей при высокой нагрузке используют для исходящего трафика **один и тот же** IP-адрес. Управление семейством исходящих адресов помогает распределять учётные записи по разным предсказуемым маршрутам исходящего трафика (см. диагностику исходящих IP-адресов в [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts), которая используется совместно с этой функцией). |
| **Детерминированный исходящий трафик для соответствия требованиям и тестирования** | Когда необходимо гарантировать, что трафик выходит через конкретное семейство адресов, значения `auto` недостаточно.                                                                                                                                                                                                                                                                                                                                          |

Директива намеренно задаётся **для каждого прокси отдельно**, а не глобально: разные прокси в вашем пуле могут иметь разные политики.

---

## Три значения

| Значение | Метка в интерфейсе  | Поведение                                                                                                                                                                   |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`   | `Авто (dual-stack)` | ОС выбирает семейство. Для хоста прокси, заданного IP-литералом, семейство определяется самим литералом; для имени хоста доступны оба семейства. Это значение по умолчанию. |
| `ipv4`   | `Только IPv4`       | Ограничивает подключение семейством IPv4. Завершается ошибкой, если у хоста прокси отсутствует запись IPv4 (A).                                                             |
| `ipv6`   | `Только IPv6`       | Ограничивает подключение семейством IPv6. Завершается ошибкой, если у хоста прокси отсутствует запись IPv6 (AAAA).                                                          |

Строки интерфейса находятся в `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Настройка

### Панель управления

Селектор находится в форме прокси на вкладке **Пул прокси**:

1. Откройте **Панель управления → Настройки → Прокси → Пул прокси**
2. Добавьте или отредактируйте прокси
3. В раскрывающемся списке **Семейство IP** выберите `Авто (dual-stack)`, `Только IPv4` или `Только IPv6`
4. Сохраните изменения

Элемент управления отображается компонентом `ProxyRegistryManager.tsx` (подключённым в `proxy/ProxyPoolTab.tsx`).

### API

Поле `family` входит в данные запросов создания и обновления реестра прокси, проверяется схемами `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) и обрабатывается запросами `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Создание прокси только для IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Переключение существующего прокси в режим только IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Это же поле принимается во встроенном объекте конфигурации прокси, используемом для записей вышестоящего прокси (`upstream_proxy_config.family`, см. [Модель данных](#data-model)).

Остальную информацию об API для операций CRUD и назначения прокси см. в [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Как разрешается `auto`

Когда для `family` задано значение `auto`, OmniRoute **не** добавляет никаких директив — URL-адрес прокси используется без изменений, а семейство подключения определяется автоматически.

При формировании URL (`proxyConfigToUrl` / `normalizeProxyUrl` в `open-sse/utils/proxyDispatcher.ts`) прокси со значением `auto` получает обычный URL без маркера:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Во время диспетчеризации (`resolveDispatcherFamily`) значение `auto` разрешается в семейство, соответствующее IP-литералу хоста, или в `null` (позволяя ОС выбрать семейство) для имени хоста:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null для имени хоста → выбор делает ОС
  // ...
}
```

Итого:

- `auto` + хост, заданный IP-литералом (`192.0.2.1` / `[2001:db8::1]`) → семейство этого литерала.
- `auto` + имя хоста → `null` → стандартное dual-stack-разрешение средствами ОС.

---

## Как применяются `ipv4` / `ipv6`

Директива, отличная от `auto`, передаётся как единственный синтетический маркер запроса — `?family=ipv4` или `?family=ipv6` — однократно добавляемый к нормализованному URL прокси. `normalizeProxyUrl` аккуратно удаляет и повторно добавляет этот маркер ровно один раз, чтобы он никогда не нарушал разбор порта.

При создании диспетчера маркер считывается и преобразуется в конкретное семейство подключений. Если хост является IP-литералом **противоположного** семейства, OmniRoute выбрасывает исключение (при противоречии используется принцип fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Затем конкретное семейство закрепляется за коннектором:

- **HTTP/HTTPS-прокси** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — отключает Happy Eyeballs, поэтому подключение устанавливается только через выбранное семейство.
- **SOCKS5-прокси**: пользовательский коннектор передаёт `socket_options: { family, autoSelectFamily: false }` в SOCKS-клиент (см. [Совместимость с SOCKS5](#совместимость-с-socks5)).

---

## Совместимость с SOCKS5

Закрепление семейства работает с SOCKS5-прокси, однако стандартный `fetch-socks` не предоставляет доступ к параметрам сокета, необходимым для закрепления семейства прокси-перехода. Для этого OmniRoute поставляется с собственным коннектором:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Все SOCKS5-подключения проходят через `createSocksDispatcherWithFamily` независимо от значения `family` (включая `null` / `auto` при использовании имени хоста): `buildSocksFamilySocketOptions(null)` возвращает `{}`, а тот же путь `SocksClient.createConnection` + TLS `buildConnector` используется с закреплением через `socket_options`, чтобы Happy Eyeballs не мог выбрать IPv4 для политики исходящего трафика, допускающей только IPv6.

Сама поддержка SOCKS5 включена по умолчанию (её можно отключить с помощью `ENABLE_SOCKS5_PROXY=false`); см. [PROXY_GUIDE.md → Переменные окружения](../ops/PROXY_GUIDE.md#environment-variables).

---

## Поведение Fail-Closed

Основная цель директивы — **отказать**, а не незаметно переключиться на неподходящее семейство. Это обеспечивается двумя проверками:

1. **Противоречие IP-литерала** — директива, противоречащая хосту в виде IP-литерала, вызывает исключение при создании диспетчера (`resolveDispatcherFamily`, показанная выше).

2. **Предварительная DNS-проверка имени хоста** — для прокси, заданного именем хоста, с закреплённым семейством `proxyFetch.ts` **до** отправки исходящего трафика проверяет через `assertHostnameSupportsFamily`, что у имени хоста действительно есть запись требуемого семейства:

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

   При ошибке `proxyFetch.ts` помечает её значениями `code = "PROXY_FAMILY_UNAVAILABLE"` и `statusCode = 503`. Ошибка разрешения DNS также обрабатывается по принципу fail-closed (исходящий трафик блокируется).

Для хостов в виде IP-литералов предварительная DNS-проверка ничего не делает: их семейство определяется самим адресом и не требует поиска.

---

## Модель данных

Столбец `family` был добавлен миграцией `099_proxy_family.sql` в **две** таблицы:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — директива для отдельного прокси в записях реестра (`src/lib/db/proxies.ts`). Запросы разрешения выбирают `family` вместе с другими столбцами прокси, а отсутствующее или нестроковое значение преобразуется в `"auto"`.
- `upstream_proxy_config.family` — директива для записей вышестоящего прокси (`src/lib/db/upstreamProxy.ts`) с тем же значением по умолчанию `"auto"`.

Когда разрешённый объект прокси содержит значение `family`, отличное от `auto`, функция `proxyConfigToUrl` добавляет маркер `?family=`, чтобы закреплённое значение сохранялось на всём пути до диспетчера.

---

## Связанная документация

> 📖 **Связанная документация:**
>
> - [Руководство по прокси](../ops/PROXY_GUIDE.md) — полное описание системы прокси: CRUD реестра, четырёхуровневое разрешение, ротация, проверка работоспособности, справочник API
> - `docs/security/STEALTH_GUIDE.md` (git; не включается в `/docs`) — уровни отпечатков TLS и CLI, работающие поверх прокси
> - [Уровни защиты маршрутов](./ROUTE_GUARD_TIERS.md) — ограничение доступа через loopback-интерфейс для маршрутов, доступных только локально
