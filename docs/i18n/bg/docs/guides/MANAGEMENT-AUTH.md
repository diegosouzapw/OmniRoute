# Management Authentication (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute има **четири семейства идентификационни данни**, които могат да разрешават достъп до маршрутите за управление.
Те не са взаимозаменяеми. API ключовете за инференция (`sk-…`) **не** управляват
сървъра, освен ако изрично не им е предоставен обхват `manage` или `admin`.

Канонична имплементация: `src/lib/api/requireManagementAuth.ts`.

| Идентификационни данни   | Типичен формат                           | Къде се създават                                             | Предназначение                    | Възможности за управление                                                                             |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| JWT сесия на таблото     | бисквитка `auth_token`                   | Вход в таблото                                               | Уеб интерфейс                     | Пълно управление през таблото, съобразено с правилата за CSRF, локалност и винаги защитените маршрути |
| CLI токен с machine-id   | вътрешен / локален                       | Първоначална настройка на CLI (`omniroute` на същата машина) | Локален CLI                       | Само локално управление                                                                               |
| Токен за достъп с обхват | `oma_live_…`                             | **Настройки → Токени за достъп** или `omniroute connect`     | Отдалечен CLI и API за управление | Трябва да удовлетворява изисквания от маршрута обхват `read`, `write` или `admin`                     |
| API ключ за инференция   | `sk-…` (и други префикси за API ключове) | **API Manager / API Keys**                                   | Инференция чрез `/v1/*`           | **Никакви**, освен ако метаданните на ключа не включват `manage` или `admin`                          |

Идентификационните данни `oma_` са предназначени за управление/CLI. Те **не** са API ключове за инференция.

Ако удостоверяването чрез вход/API ключ е деактивирано за сървъра, някои маршрути за управление може
да приемат неудостоверени заявки. Маршрутите, които са само локални или винаги защитени, продължават да прилагат
собствените си правила. Следователно представянето на някой от тези идентификационни данни не е задължително
във всички случаи, а притежаването им не е достатъчно във всички случаи без необходимия
обхват и локалност на маршрута.

Свързано: [Отдалечен режим](./REMOTE-MODE.md) (как се издава `oma_live_…` за отдалечен CLI).

---

## Матрици на обхватите

Обхватите за управление на API ключове и обхватите на токените за достъп използват различна терминология.
Обхватите на MCP инструментите използват трета терминология и се проверяват чрез `scopeMatches`, а не чрез
която и да е от функциите в таблиците по-долу. Съпоставка:
[Три пространства от имена за обхвати](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Обхвати на токените за достъп (`oma_live_…`)

| Обхват  | Типични операции                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| `read`  | GET заявки за списъци/състояние, които токенът има право да вижда                                          |
| `write` | Промени (създаване/актуализиране/изтриване) под административно ниво                                       |
| `admin` | Пълен отдалечен CLI / токен за свързване (първоначалната настройка с парола използва това по подразбиране) |

Токен с `read` не може да извиква маршрут с `write`. Формат на съобщението по време на изпълнение:
`Обхватът на токена за достъп '<have>' е недостатъчен; изисква се '<need>'.`

### Обхвати за управление на API ключове

| Обхват   | Значение                                                                                 |
| -------- | ---------------------------------------------------------------------------------------- |
| (няма)   | Само инференция. Маршрутите за управление връщат 403.                                    |
| `manage` | API за управление (същата проверка като клона за API ключове на `requireManagementAuth`) |
| `admin`  | Също удовлетворява `hasManageScope` (третира се като позволяващ управление)              |

Активирайте `manage` за ключа в интерфейса API Keys / API Manager. Не използвайте повторно
ключ от чат клиент за автоматизация, освен ако умишлено не сте му предоставили този обхват.

---

## Как се създават и отнемат

### JWT сесия на таблото за управление

1. Отворете `/login` и влезте с паролата за управление (`INITIAL_PASSWORD` при първото стартиране).
2. Бисквитката `auth_token` е HttpOnly. Таблото за управление в браузъра я използва автоматично.
3. Излезте чрез `/api/auth/logout`. Няма дълготрайна тайна, която да копирате.

### CLI токен с идентификатор на машината

1. Стартирайте `omniroute` на **същия хост**, на който е сървърът (loopback).
2. CLI автоматично създава токен с идентификатор на машината в `~/.omniroute/` (chmod 600).
3. Това **не** работи от друга машина. За отдалечен CLI използвайте токен за достъп.

### Токен за достъп с обхват (`oma_live_…`)

1. Табло за управление: **Настройки → Токени за достъп** → създайте токен (име + обхват). **Тайната се показва само веднъж.**
2. Или чрез CLI: `omniroute connect <host>` (парола → токен). Вижте [Отдалечен режим](./REMOTE-MODE.md).
3. Заглавка: `Authorization: Bearer oma_live_…`
4. Отнемете го от същата страница за токени за достъп (или изтрийте CLI контекста).
5. Сървърът съхранява само хеш. Третирайте стойността в чист текст като парола.

### API ключ с обхват `manage`

1. Табло за управление: **Управление на API / API ключове** → създайте или редактирайте ключ → активирайте `manage` (или `admin`).
2. Заглавка: `Authorization: Bearer sk-…` (действителният префикс на ключа).
3. Отнемете ключа или премахнете `manage` в същия потребителски интерфейс.
4. За автоматизация, която не използва CLI, прилагайте принципа на най-малките привилегии: предпочитайте токен за достъп с обхват `read` за задачи само с GET; използвайте `manage` за API ключ само когато клиентът трябва да комуникира и с `/v1`, и с интерфейса за управление.

---

## Формат на заглавката

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не поставяйте идентификационни данни за управление в пътя на URL адреса или в низа на заявката. Удостоверяването за управление се извършва само чрез заглавка или бисквитка.

---

## Примери за копиране и поставяне

Само за четене (извеждане на доставчиците). Използвайте токен за достъп с обхват `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Промяна (създаване на връзка с доставчик). Използвайте токен за достъп с обхват `write`/`admin` или API ключ с обхват `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Извеждане (не е управление). Обикновен API ключ, без необходимост от `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Текущи грешки по време на изпълнение (не извеждайте тайни)

| Ситуация                                              | Типичен статус | Съобщение (със заличени чувствителни данни)                          |
| ----------------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| Липсват идентификационни данни                        | 401            | `Authentication required`                                            |
| Невалиден/изтекъл `oma_live_…`                        | 401            | `Invalid or expired access token`                                    |
| Валиден API ключ без `manage`/`admin`                 | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Невалиден обикновен API ключ за маршрут за управление | 403            | `Invalid management token`                                           |
| Обхватът на токена за достъп е недостатъчен           | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ означава, че bearer токенът **не е** приет като идентификационни данни за управление. Това **не** указва кой тип трябва да създадете. Използвайте таблицата по-горе: ключовете за извеждане се нуждаят от обхват `manage`; отдалеченият CLI се нуждае от `oma_live_…`; таблото за управление използва бисквитката на сесията.

---

## Препоръчителен избор с най-малко привилегии

| Извикваща страна                              | Използвайте                                                     |
| --------------------------------------------- | --------------------------------------------------------------- |
| Браузър                                       | Сесия на таблото за управление                                  |
| CLI на хоста на сървъра                       | Машинен токен                                                   |
| CLI на лаптоп, свързващ се с отдалечен сървър | `oma_live_…` от `omniroute connect`                             |
| CI / скриптове (само за управление)           | `oma_live_…` с най-малкия достатъчен обхват                     |
| CI, който трябва да извиква и `/v1`, и `/api` | API ключ с `manage` **или** два отделни идентификационни набора |
