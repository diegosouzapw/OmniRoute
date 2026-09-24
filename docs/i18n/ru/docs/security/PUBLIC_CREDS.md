# Public Credentials Handling (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Источник истины:** `open-sse/utils/publicCreds.ts`
> **Тесты:** `tests/unit/publicCreds.test.ts`
> **Последнее обновление:** 2026-08-07 — v3.8.50
> **Аудитория:** Инженеры, интегрирующие провайдеры, которые распространяют публичные OAuth client_id / client_secret / Firebase Web API keys в своих общедоступных CLI.
> **Статус:** **ОБЯЗАТЕЛЬНО** для всего нового кода, в который встраиваются идентификаторы сторонних поставщиков.

## Зачем это нужно

- [OAuth 2.0 для нативных приложений (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret для установленных приложений являются публичными; фактическую безопасность обеспечивает PKCE.
- [Ключи Firebase API](https://firebase.google.com/docs/projects/api-keys) — идентификаторы веб-клиентов являются публичными по своей природе.

OmniRoute должен встраивать эти значения, чтобы пользователи, которые не настраивают `.env`, всё равно получали готовый к работе OAuth-процесс сразу после запуска. Без встроенного резервного значения провайдеры Gemini / Antigravity перестают работать у любого пользователя, который следует сценарию «просто клонировать и запустить».

Однако буквальные значения наподобие `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` обнаруживаются средствами **GitHub Secret Scanning**, **Semgrep** и аналогичными сканерами на основе шаблонов. Каждый выпуск превращается в шумный поток ложных срабатываний, защита отправки блокирует допустимые коммиты, а операторы перестают доверять потоку предупреждений.

Вспомогательный модуль `open-sse/utils/publicCreds.ts` одновременно решает обе задачи:

- Встраивает публичный идентификатор как **последовательность байтов, маскированную с помощью XOR** (в исходном коде отсутствует шаблон, распознаваемый сканерами).
- Декодирует значение во время выполнения через `decodePublicCred` / `resolvePublicCred`.
- Обнаруживает исходные значения, уже соответствующие общеизвестным префиксам (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), и передаёт их без изменений, поэтому существующие `.env` пользователей с исходными значениями продолжат работать **без какой-либо миграции**.

Это **обфускация, а не шифрование.** Любой, кто прочитает исходный код, сможет восстановить значение — и это нормально, поскольку значение по своей природе является публичным. Единственная цель — избежать совпадений с регулярными выражениями сканеров.

## Обязательный шаблон

### 1. Добавление новых публичных учётных данных

Если вам необходимо встроить новое значение, предоставленное сторонним поставщиком, которое:

- поступает из общедоступного CLI / настольного приложения / браузерного пакета, **и**
- документируется (или рассматривается) сторонним поставщиком как публичный идентификатор клиента, **и**
- в противном случае будет обнаружено сканером шаблонов (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` и т. д.),

…выполните следующие действия:

1. Сгенерируйте маскированную последовательность байтов:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Добавьте новую запись в `EMBEDDED_DEFAULTS` в `open-sse/utils/publicCreds.ts` с **нейтральным именем ключа** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` и т. д.). **Не** используйте во вспомогательном модуле имена наподобие `client_secret` или `api_key` — эти слова активируют универсальные правила Semgrep для обнаружения секретов.

3. Добавьте `keyof typeof EMBEDDED_DEFAULTS` в публичное объединение типов (оно выводится автоматически).

4. В коде-потребителе замените жёстко заданный литерал следующим:

   ```ts
   // переопределение одной переменной окружения
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // несколько псевдонимов переменных окружения (используется первое непустое значение)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // без переопределения переменной окружения (всегда используется встроенное значение по умолчанию)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Удалите литерал из `.env.example` (замените его документацией только в виде комментариев, направляющей читателей сюда):

   ```dotenv
   # ── Провайдер (Google / Firebase / и т. д.) ──
   # Публичные учётные данные OAuth встроены в код через
   # open-sse/utils/publicCreds.ts. Задавайте эти переменные только для использования собственных значений.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Обновите `tests/unit/publicCreds.test.ts`, добавив проверку формы для нового ключа (проверяйте формат, а не буквальное значение — используйте шаблон из существующих тестов).

7. **Никогда** не добавляйте литералы `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` в тестовые файлы. Используйте константы `FAKE_*`, собранные из фрагментов с помощью `.join("")` (см. существующие тесты).

### 2. Потребители

- **Считывайте значения только через `resolvePublicCred()` / `resolvePublicCredMulti()`** — никогда не вызывайте `decodePublicCredBytes()` напрямую за пределами вспомогательного модуля.
- Вспомогательный модуль намеренно нетребователен к ресурсам (линейная операция XOR над байтами), и его безопасно вызывать во время загрузки модуля; значения по умолчанию вычисляются один раз.
- Переопределение через переменную окружения всегда имеет приоритет. Если пользователь задаёт `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, вспомогательный модуль передаёт это исходное значение без изменений.

### 3. Запрещённые шаблоны

❌ **Никогда** не делайте ничего из перечисленного ниже в рабочем коде (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ПЛОХО: буквальное значение активирует Secret Scanning и Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ПЛОХО: литерал в base64 — GitHub всё равно обнаруживает его с февраля 2025 года
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ПЛОХО: конкатенация строк, повторно собирающая шаблон во время выполнения
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ПЛОХО: кодирование в hex/ROT13 — другая обфускация, но тот же риск обнаружения
clientSecret: hexDecode("474f4353..."),
```

Все эти варианты в конечном итоге приводят к срабатыванию сканера. Используйте `resolvePublicCred()`.

❌ **Никогда** не добавляйте буквальные значения учётных данных в `.env.example`. Пользователи, которым нужны реальные значения стороннего поставщика, могут самостоятельно извлечь их из общедоступного CLI или использовать собственную регистрацию OAuth.

❌ **Никогда** не отклоняйте новое предупреждение сканирования секретов, не проверив предварительно, следует ли перенести эти учётные данные в данный вспомогательный модуль.

## Связанные механизмы контроля

- `RAW_VALUE_PATTERN` в `publicCreds.ts` перечисляет префиксы, при которых значение возвращается без преобразования (для обратной совместимости). Расширяйте его только для документированных форматов публичных учётных данных и никогда — для проприетарных секретов.
- `.env.example` контролируется CI-скриптом `check-env-doc-sync` — удаляя переменную здесь, убедитесь, что документация приведена в соответствие.
- Наборы тестов `npm run test:vitest` и `node --import tsx/esm --test tests/unit/publicCreds.test.ts` должны продолжать успешно проходить.

## Когда НЕ следует использовать этот вспомогательный модуль

Этот вспомогательный модуль предназначен **только** для учётных данных, которые:

1. Публично распространяются вышестоящим поставщиком (CLI-бинарник, браузерный бандл, официальная документация).
2. Документированы или явно подразумеваются как неконфиденциальные (защищённые PKCE, ключ Firebase Web и аналогичные).

Для всего остального — токенов, выданных оператором, секретов отдельных арендаторов, `client_secret` вашего собственного OAuth-приложения, ключей шифрования, секретов JWT, паролей баз данных — используйте **только переменные окружения** (`process.env.FOO`, резервное значение `||` в виде пустой строки или явная ошибка). Они должны храниться в `.env` и [зашифрованном хранилище учётных данных](./COMPLIANCE.md), а не в исходном коде.

## Ссылки

- [Google: OAuth 2.0 для нативных приложений](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-ключи для идентификации клиентов](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: секреты, поддерживаемые сканированием секретов](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: обнаружение токенов в формате base64 (февраль 2025 г.)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Коммит, добавивший этот вспомогательный модуль: `1a39c31f` — _fix(security): маскировка публичных учётных данных вышестоящих поставщиков и централизация очистки ошибок_
