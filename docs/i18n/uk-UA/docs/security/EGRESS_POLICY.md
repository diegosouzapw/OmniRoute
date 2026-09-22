# Egress IP Family Policy (IPv4/IPv6) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Закріплюйте вихідний трафік за одним сімейством IP-адрес — `auto`, `ipv4` або `ipv6` — для кожного проксі, щоб вихід лише через IPv6 ніколи непомітно не перемикався назад на IPv4.**

> **Джерело істини:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute дає змогу визначати для кожного проксі **директиву сімейства адрес для вихідного трафіку**. За замовчуванням операційна система вибирає IPv4 або IPv6 (подвійний стек, «Happy Eyeballs»). Якщо встановити для директиви значення `ipv4` або `ipv6`, OmniRoute закріплює кожне з’єднання через цей проксі за вибраним сімейством і **блокує з’єднання в разі помилки**, а не перемикається на інше сімейство.

На цій сторінці описано, що являє собою ця директива, навіщо вона потрібна, де її налаштовувати та як середовище виконання визначає її значення.

---

## Зміст

- [Що це таке](#what-it-is)
- [Навіщо це потрібно](#why-it-exists)
- [Три значення](#the-three-values)
- [Як це налаштувати](#how-to-configure-it)
- [Як визначається `auto`](#how-auto-resolves)
- [Як забезпечується використання `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Сумісність із SOCKS5](#socks5-compatibility)
- [Поведінка з блокуванням у разі помилки](#fail-closed-behavior)
- [Модель даних](#data-model)
- [Пов’язана документація](#related-documentation)

---

## Що це таке

Кожен проксі в реєстрі має поле `family` із трьома можливими значеннями, які перевіряються за допомогою переліку Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

За замовчуванням поле має значення `"auto"`, що зберігає попередню поведінку з подвійним стеком. Якщо встановити значення `ipv4` або `ipv6`, сімейство для підключення через цей проксі буде закріплено відповідно.

Директива всюди нормалізується за допомогою єдиної допоміжної функції, тому будь-яке невідоме значення перетворюється на `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Навіщо це потрібно

Функціональність додано в PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Основні проблеми, які спонукали до її впровадження:

| Проблема                                                                  | Що виправляє директива                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Витік вихідного трафіку лише для IPv6 через IPv4**                      | Якщо хост проксі має одночасно записи A та AAAA (або операційна система надає перевагу IPv4), Happy Eyeballs може встановити вихідне з’єднання через IPv4, навіть якщо передбачається використання шляху лише через IPv6. Закріплення `ipv6` усуває цей витік.                                                                                                                                                                                           |
| **Відкликання через аномалію спільної вихідної IP-адреси**                | Провайдери з ротацією (codex/openai) відкликають токени, коли багато облікових записів створюють великий обсяг вихідного трафіку через **одну й ту саму** IP-адресу. Керування сімейством вихідних адрес допомагає утримувати облікові записи на окремих, передбачуваних шляхах вихідного трафіку (див. [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts), де описано діагностику вихідних IP-адрес, що використовується разом із цією функцією). |
| **Детермінований вихідний трафік для відповідності вимогам і тестування** | Якщо потрібно гарантувати, що трафік виходить через конкретне сімейство адрес, значення `auto` недостатньо.                                                                                                                                                                                                                                                                                                                                              |

Директива навмисно застосовується **окремо до кожного проксі**, а не глобально — різні проксі у вашому пулі можуть мати різні політики.

---

## Три значення

| Значення | Мітка в UI          | Поведінка                                                                                                                                                                       |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`   | `Авто (dual-stack)` | ОС вибирає сімейство. Для хоста проксі, заданого IP-літералом, сімейство визначається самим літералом; для імені хоста доступні обидва сімейства. Це значення за замовчуванням. |
| `ipv4`   | `Лише IPv4`         | Прив’язує з’єднання до IPv4. Завершується помилкою, якщо хост проксі не має запису IPv4 (A).                                                                                    |
| `ipv6`   | `Лише IPv6`         | Прив’язує з’єднання до IPv6. Завершується помилкою, якщо хост проксі не має запису IPv6 (AAAA).                                                                                 |

Рядки UI містяться в `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Як це налаштувати

### Панель керування

Селектор розташований у формі проксі на вкладці **Пул проксі**:

1. Відкрийте **Панель керування → Налаштування → Проксі → Пул проксі**
2. Додайте або відредагуйте проксі
3. У розкривному списку **Сімейство IP** виберіть `Авто (dual-stack)`, `Лише IPv4` або `Лише IPv6`
4. Збережіть

Елемент керування відтворюється компонентом `ProxyRegistryManager.tsx` (змонтованим у `proxy/ProxyPoolTab.tsx`).

### API

Поле `family` є частиною даних запитів створення/оновлення реєстру проксі, перевіряється за допомогою `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) та обробляється через `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Створити проксі лише для IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Перевести наявний проксі в режим лише IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Це саме поле також підтримується вбудованим об’єктом конфігурації проксі, який використовується для записів висхідного проксі (`upstream_proxy_config.family`, див. [Модель даних](#data-model)).

Щодо решти API CRUD/призначення проксі див. [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Як визначається `auto`

Коли `family` має значення `auto`, OmniRoute **не** додає жодної директиви — URL-адреса проксі використовується без змін, а сімейство з’єднання визначається автоматично.

Під час побудови URL-адреси (`proxyConfigToUrl` / `normalizeProxyUrl` у `open-sse/utils/proxyDispatcher.ts`) проксі зі значенням `auto` створює звичайну URL-адресу без маркера:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Під час диспетчеризації (`resolveDispatcherFamily`) значення `auto` перетворюється на внутрішньо визначене сімейство хоста, заданого IP-літералом, або на `null` (дозволити ОС вибрати) для імені хоста:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null для імені хоста → вибирає ОС
  // ...
}
```

Отже:

- `auto` + хост, заданий IP-літералом (`192.0.2.1` / `[2001:db8::1]`) → сімейство цього літерала.
- `auto` + ім’я хоста → `null` → стандартне dual-stack-визначення засобами ОС.

---

## Як забезпечується дотримання `ipv4` / `ipv6`

Директива, відмінна від `auto`, передається як єдиний синтетичний маркер запиту — `?family=ipv4` або `?family=ipv6` — який один раз додається до нормалізованої URL-адреси проксі. `normalizeProxyUrl` обережно видаляє та повторно додає цей маркер рівно один раз, щоб він ніколи не порушував розбір порту.

Під час створення диспетчера маркер зчитується та перетворюється на конкретне сімейство підключення. Якщо хост є IP-літералом **протилежного** сімейства, OmniRoute генерує виняток (у разі суперечності застосовується принцип fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Директива сімейства проксі ${directive} суперечить хосту — IP-літералу ${literal === 6 ? "IPv6" : "IPv4"}`
  );
}
```

Після цього конкретне сімейство фіксується в конекторі:

- **Проксі HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — вимикає Happy Eyeballs, тож підключення встановлюється лише через вибране сімейство.
- **Проксі SOCKS5**: спеціальний конектор передає `socket_options: { family, autoSelectFamily: false }` клієнту SOCKS (див. [Сумісність із SOCKS5](#сумісність-із-socks5)).

---

## Сумісність із SOCKS5

Фіксація сімейства працює з проксі SOCKS5, але стандартний `fetch-socks` не надає доступу до параметрів сокета, необхідних для фіксації сімейства проксі-переходу. Для цього OmniRoute постачається із власним конектором:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Усі надсилання через SOCKS5 проходять через `createSocksDispatcherWithFamily` незалежно від `family` (зокрема `null` / `auto` для імені хоста): `buildSocksFamilySocketOptions(null)` повертає `{}`, а той самий шлях `SocksClient.createConnection` + TLS `buildConnector` використовується з фіксацією через `socket_options`, щоб Happy Eyeballs не міг вибрати IPv4 для політики вихідного трафіку, яка дозволяє лише IPv6.

Підтримку SOCKS5 за замовчуванням увімкнено (її можна вимкнути через `ENABLE_SOCKS5_PROXY=false`); див. [PROXY_GUIDE.md → Змінні середовища](../ops/PROXY_GUIDE.md#environment-variables).

---

## Поведінка fail-closed

Головне призначення директиви — **відмовити** в підключенні, а не непомітно перейти до неправильного сімейства. Це забезпечують дві перевірки:

1. **Суперечність із IP-літералом** — директива, яка суперечить хосту у вигляді IP-літерала, генерує виняток під час створення диспетчера (`resolveDispatcherFamily`, показано вище).

2. **Попередня DNS-перевірка імені хоста** — для проксі з іменем хоста та зафіксованим сімейством `proxyFetch.ts` **до** надсилання вихідного трафіку перевіряє через `assertHostnameSupportsFamily`, чи справді ім’я хоста має запис потрібного сімейства:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Хост проксі ${host} не має запису ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"}; ` +
         `вихідний трафік лише через ${family === 6 ? "IPv6" : "IPv4"} відхилено (fail-closed)`
     );
   }
   ```

   У разі невдачі `proxyFetch.ts` позначає помилку за допомогою `code = "PROXY_FAMILY_UNAVAILABLE"` і `statusCode = 503`. Помилка DNS-резолвінгу також обробляється за принципом fail-closed (вихідний трафік відхиляється).

Для хостів у вигляді IP-літералів попередня DNS-перевірка не виконує жодних дій — їхнє сімейство є невіддільною властивістю адреси й не потребує пошуку.

---

## Модель даних

Стовпець `family` було додано міграцією `099_proxy_family.sql` до **двох** таблиць:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — директива для кожного проксі в записах реєстру (`src/lib/db/proxies.ts`). Запити розв’язання вибирають `family` разом з іншими стовпцями проксі, а відсутнє або нерядкове значення приводиться до `"auto"`.
- `upstream_proxy_config.family` — директива для записів висхідного проксі (`src/lib/db/upstreamProxy.ts`) із тим самим значенням за замовчуванням `"auto"`.

Коли розв’язаний об’єкт проксі містить значення `family`, відмінне від `auto`, `proxyConfigToUrl` додає маркер `?family=`, щоб фіксація зберігалася на всьому шляху до диспетчера.

---

## Пов’язана документація

> 📖 **Пов’язана документація:**
>
> - [Посібник із проксі](../ops/PROXY_GUIDE.md) — повна система проксі: CRUD реєстру, 4-рівневе розв’язання, ротація, перевірка працездатності, довідник API
> - `docs/security/STEALTH_GUIDE.md` (git; не компілюється до `/docs`) — рівні відбитків TLS і CLI, що працюють поверх проксі
> - [Рівні захисту маршрутів](./ROUTE_GUARD_TIERS.md) — примусове використання loopback для маршрутів, доступних лише локально
