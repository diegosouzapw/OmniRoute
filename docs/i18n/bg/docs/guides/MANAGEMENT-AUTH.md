# Management Authentication (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute има **четири семейства идентификационни данни**, които могат да разрешават достъп до маршрутите за управление.
Те не са взаимозаменяеми. Ключовете за Inference API (`sk-…`) **не** управляват
сървъра, освен ако изрично не им е предоставен обхват `manage` или `admin`.

Канонична имплементация: `src/lib/api/requireManagementAuth.ts`.

| Идентификационни данни                 | Типична форма                            | Къде се създават                                               | Предназначение                    | Възможности за управление                                                                       |
| -------------------------------------- | ---------------------------------------- | -------------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| JWT сесия на таблото                   | Бисквитка `auth_token`                   | Вход в таблото                                                 | Уеб интерфейс                     | Пълно управление през таблото съобразно правилата за CSRF, локалност и винаги защитени маршрути |
| CLI токен за идентификатор на машината | вътрешен / локален                       | Първоначално настройване на CLI (`omniroute` на същата машина) | Локален CLI                       | Само локално управление                                                                         |
| Токен за достъп с обхват               | `oma_live_…`                             | **Настройки → Токени за достъп** или `omniroute connect`       | Отдалечен CLI и API за управление | Трябва да удовлетворява изисквания от маршрута обхват `read`, `write` или `admin`               |
| Ключ за Inference API                  | `sk-…` (и други префикси за API ключове) | **Мениджър на API / API ключове**                              | Извеждане чрез `/v1/*`            | **Никакви**, освен ако метаданните на ключа не включват `manage` или `admin`                    |

Идентификационните данни `oma_` са предназначени за управление/CLI. Те **не** са ключове за Inference API.

Ако удостоверяването чрез вход/API ключ е деактивирано за сървъра, някои маршрути за управление може да
приемат неудостоверени заявки. Маршрутите, които са само локални или винаги защитени, продължават да прилагат
собствените си правила. Следователно предоставянето на едни от тези идентификационни данни не е задължително
във всички случаи, а притежаването им не е достатъчно във всички случаи без необходимия
обхват и изискваната от маршрута локалност.

Свързана тема: [Отдалечен режим](./REMOTE-MODE.md) (как се издава `oma_live_…` за отдалечен CLI).

---

## Матрици на обхватите

Обхватите за управление на API ключове и обхватите на токени за достъп използват различни речници.
Обхватите на MCP инструментите използват трети речник и се проверяват чрез `scopeMatches`, а не чрез
някоя от функциите в таблиците по-долу. Съпоставка:
[Три пространства от имена за обхвати](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Обхвати на токени за достъп (`oma_live_…`)

| Обхват  | Типични операции                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| `read`  | GET заявки за списъци/състояние, които токенът има право да вижда                                                    |
| `write` | Промени (създаване/актуализиране/изтриване) под администраторско ниво                                                |
| `admin` | Пълен отдалечен CLI / токен за свързване (първоначалната настройка чрез парола по подразбиране използва този обхват) |

Токен с `read` не може да извика маршрут с `write`. Формат на съобщението по време на изпълнение:
`Обхватът на токена за достъп '<have>' е недостатъчен; изисква се '<need>'.`

### Обхвати за управление на API ключове

| Обхват   | Значение                                                                                 |
| -------- | ---------------------------------------------------------------------------------------- |
| (няма)   | Само извеждане. Маршрутите за управление връщат 403.                                     |
| `manage` | API за управление (същата проверка като клона за API ключове на `requireManagementAuth`) |
| `admin`  | Също удовлетворява `hasManageScope` (третира се като способен за управление)             |

Активирайте `manage` за ключа в потребителския интерфейс API Keys / API Manager. Не използвайте повторно
ключ за чат клиент за автоматизация, освен ако умишлено не сте му предоставили този обхват.

---

## Как се създават и отнемат

### JWT сесия на таблото

1. Отворете `/login` и влезте с паролата за управление (`INITIAL_PASSWORD` при първото стартиране).
2. Бисквитката `auth_token` е HttpOnly. Таблото в браузъра я използва автоматично.
3. Излезте чрез `/api/auth/logout`. Няма дълготрайна тайна, която да копирате.

### CLI токен с идентификатор на машината

1. Изпълнете `omniroute` на **същия хост** като сървъра (loopback).
2. CLI създава първоначален токен с идентификатор на машината в `~/.omniroute/` (chmod 600).
3. Това **не** работи от друга машина. Използвайте токен за достъп за отдалечен CLI.

### Токен за достъп с обхват (`oma_live_…`)

1. Табло: **Настройки → Токени за достъп** → създаване (име + обхват). **Тайната се показва само веднъж.**
2. Или чрез CLI: `omniroute connect <host>` (парола → токен). Вижте [Отдалечен режим](./REMOTE-MODE.md).
3. Заглавка: `Authorization: Bearer oma_live_…`
4. Отнемете го от същата страница „Токени за достъп“ (или изтрийте CLI контекста).
5. Сървърът съхранява само хеш. Отнасяйте се към стойността в обикновен текст като към парола.

### API ключ с обхват за управление

1. Табло: **API Manager / API Keys** → създайте или редактирайте ключ → активирайте `manage` (или `admin`).
2. Заглавка: `Authorization: Bearer sk-…` (действителният префикс на ключа).
3. Отнемете ключа или премахнете `manage` в същия потребителски интерфейс.
4. За автоматизация, която не използва CLI, прилагайте принципа на минималните привилегии: предпочитайте токен за достъп с `read` за задачи само с GET; използвайте `manage` за API ключ само когато извикващият трябва да комуникира както с `/v1`, така и с интерфейса за управление.

---

## Формат на заглавката

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не поставяйте идентификационни данни за управление в пътя на URL адреса или в низа на заявката. Удостоверяването за управление се извършва само чрез заглавка/бисквитка.

---

## Примери за копиране и поставяне

Само за четене (извеждане на доставчиците). Използвайте Access Token с обхват `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Промяна (създаване на връзка с доставчик). Използвайте Access Token с обхват `write`/`admin` или API ключ с обхват `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Извеждане на резултат от модел (не е управление). Обикновен API ключ, без да се изисква `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Текущи грешки по време на изпълнение (не извеждайте поверителни данни)

| Ситуация                                             | Типичен статус | Съобщение (с премахнати поверителни данни)                                   |
| ---------------------------------------------------- | -------------- | ---------------------------------------------------------------------------- |
| Липсват идентификационни данни                       | 401            | `Изисква се удостоверяване`                                                  |
| Невалиден/изтекъл `oma_live_…`                       | 401            | `Невалиден или изтекъл токен за достъп`                                      |
| Валиден API ключ без `manage`/`admin`                | 403            | `API ключът няма обхват 'manage'. Активирайте го в таблото API Keys.`        |
| Невалиден обикновен API ключ в маршрут за управление | 403            | `Невалиден токен за управление`                                              |
| Твърде ограничен обхват на токена за достъп          | 403            | `Обхватът на токена за достъп '<have>' е недостатъчен; изисква се '<need>'.` |

„Невалиден токен за управление“ означава, че токенът на приносителя **не е** приет като идентификационни данни за управление. Това **не** указва кой тип трябва да генерирате. Използвайте таблицата по-горе: ключовете за извод се нуждаят от обхват `manage`; отдалеченият CLI се нуждае от `oma_live_…`; таблото използва сесийната бисквитка.

---

## Препоръчителен избор с минимални привилегии

| Извикваща страна                              | Използвайте                                                      |
| --------------------------------------------- | ---------------------------------------------------------------- |
| Браузър                                       | Сесия на таблото за управление                                   |
| CLI на хоста на сървъра                       | Машинен токен                                                    |
| CLI на лаптоп, свързващ се с отдалечен сървър | `oma_live_…` от `omniroute connect`                              |
| CI / скриптове (само за управление)           | `oma_live_…` с най-малкия достатъчен обхват                      |
| CI, който трябва да извиква и `/v1`, и `/api` | API ключ с `manage` **или** два отделни идентификатора за достъп |
