# Public Credentials Handling (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Източник на истината:** `open-sse/utils/publicCreds.ts`
> **Тестове:** `tests/unit/publicCreds.test.ts`
> **Последна актуализация:** 2026-08-07 — v3.8.50
> **Аудитория:** Инженери, интегриращи доставчици, които разпространяват публични OAuth client_id / client_secret / Firebase Web API ключове в своите публични CLI инструменти.
> **Статус:** **ЗАДЪЛЖИТЕЛНО** за целия нов код, който вгражда идентификатори от външни доставчици.

## Защо съществува това

- [OAuth 2.0 за нативни приложения (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret за инсталирани приложения са публични; PKCE осигурява действителната защита.
- [Firebase API ключове](https://firebase.google.com/docs/projects/api-keys) — идентификаторите на уеб клиенти са публични по замисъл.

OmniRoute трябва да вгражда тези стойности, така че потребителите, които не конфигурират `.env`, все пак да получават работещ OAuth процес веднага. Без вградена резервна стойност доставчиците Gemini / Antigravity спират да работят за всеки потребител, който следва подхода „просто клонирай и стартирай“.

Въпреки това буквални стойности като `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` се откриват от **GitHub Secret Scanning**, **Semgrep** и подобни скенери, базирани на шаблони. Всяко издание се превръща в шумен поток от фалшиви положителни резултати, защитата при изпращане блокира легитимни промени, а операторите спират да се доверяват на потока от предупреждения.

Помощната програма `open-sse/utils/publicCreds.ts` решава едновременно и двете ограничения:

- Вгражда публичния идентификатор като **маскирана чрез XOR последователност от байтове** (без разпознаваем от скенерите шаблон в изходния код).
- Декодира по време на изпълнение чрез `decodePublicCred` / `resolvePublicCred`.
- Открива необработени стойности, които вече следват добре познати префикси (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), и ги пропуска непроменени, така че потребителите с необработени стойности в съществуващия си `.env` да продължат да работят с **нулева необходимост от миграция**.

Това е **обфускация, а не криптиране.** Всеки, който чете изходния код, може да възстанови стойността — което е приемливо, защото стойността е публична по замисъл. Единствената цел е да се избегнат съвпадения с регулярните изрази на скенерите.

## Задължителният шаблон

### 1. Добавяне на нови публични идентификационни данни

Когато трябва да вградите нова стойност, предоставена от външен доставчик, която:

- произхожда от публичен CLI инструмент / настолно приложение / браузърен пакет, **и**
- външният доставчик я документира (или третира) като публичен клиентски идентификатор, **и**
- в противен случай скенер, базиран на шаблони, би я открил (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` и т.н.),

…следвайте този контролен списък:

1. Генерирайте маскираната последователност от байтове:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Добавете нов запис в `EMBEDDED_DEFAULTS` в `open-sse/utils/publicCreds.ts` с **неутрално име на ключа** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` и т.н.). **Не** използвайте имена като `client_secret` или `api_key` в помощната програма — тези думи задействат общите правила на Semgrep за тайни.

3. Добавете `keyof typeof EMBEDDED_DEFAULTS` към публичното обединение от типове (то се извежда автоматично).

4. В потребяващия код заменете твърдо зададения литерал с:

   ```ts
   // единично заместване чрез променлива на средата
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // множество псевдоними на променливи на средата (печели първата непразна стойност)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // без заместване чрез променлива на средата (винаги се използва вградената стойност по подразбиране)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Премахнете литерала от `.env.example` (заменете го с документация само под формата на коментари, която насочва читателите тук):

   ```dotenv
   # ── Доставчик (Google / Firebase / и т.н.) ──
   # Публичните OAuth идентификационни данни са вградени в кода чрез
   # open-sse/utils/publicCreds.ts. Задайте тези променливи само за да използвате свои собствени стойности.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Актуализирайте `tests/unit/publicCreds.test.ts`, като добавите проверка на формата за новия ключ (проверявайте формата, а не буквалната стойност — вижте съществуващите тестове за шаблона).

7. **Никога** не добавяйте литерали `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` в тестови файлове. Използвайте константите `FAKE_*`, съставени от фрагменти чрез `.join("")` (вижте съществуващите тестове).

### 2. Потребители

- **Четете единствено чрез `resolvePublicCred()` / `resolvePublicCredMulti()`** — никога не извиквайте `decodePublicCredBytes()` директно извън помощната програма.
- Помощната програма умишлено е евтина за изпълнение (линейна XOR операция върху байтове) и е безопасно да бъде извиквана при зареждане на модула; стойностите по подразбиране се изчисляват еднократно.
- Стойността от променливата на средата винаги е с предимство. Ако потребител зададе `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, помощната програма пропуска тази необработена стойност без промяна.

### 3. Забранени шаблони

❌ **Никога** не правете никое от следните неща в продукционния код (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ЛОШО: буквалната стойност задейства Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ЛОШО: base64 на литерала — GitHub все още го открива от февруари 2025 г.
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ЛОШО: конкатенация на низове, която сглобява отново шаблона по време на изпълнение
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ЛОШО: hex/ROT13 кодиране — различна обфускация, същият риск от откриване
clientSecret: hexDecode("474f4353..."),
```

Всички те в крайна сметка задействат скенер. Използвайте `resolvePublicCred()`.

❌ **Никога** не добавяйте буквални идентификационни данни в `.env.example`. Потребителите, които се нуждаят от действителни стойности от външния доставчик, могат сами да ги извлекат от публичния CLI инструмент или да използват собствена OAuth регистрация.

❌ **Никога** не отхвърляйте ново предупреждение от сканирането за тайни, без първо да проверите дали идентификационните данни трябва да бъдат преместени в тази помощна програма.

## Свързани контроли

- `RAW_VALUE_PATTERN` в `publicCreds.ts` изброява префиксите, които задействат директно предаване (за обратна съвместимост). Разширявайте го само за документирани формати на публични идентификационни данни, никога за непублични тайни.
- `.env.example` се проверява от скрипта `check-env-doc-sync` в CI — когато премахвате променлива тук, уверете се, че документацията съответства.
- И двата набора от тестове — `npm run test:vitest` и `node --import tsx/esm --test tests/unit/publicCreds.test.ts` — трябва да продължат да преминават успешно.

## Кога да НЕ използвате тази помощна функция

Тази помощна функция е **само** за идентификационни данни, които са:

1. Публично разпространявани от доставчика нагоре по веригата (CLI двоичен файл, браузърен пакет, официална документация).
2. Документирани или категорично подразбиращи се като неповерителни (защитени с PKCE, Firebase Web ключ или подобни).

За всичко останало — токени, издадени от оператора, тайни за отделни клиенти, `client_secret` на собственото ви OAuth приложение, ключове за криптиране, JWT тайни, пароли за бази данни — използвайте **само променливи на средата** (`process.env.FOO`, резервна стойност чрез `||` до празен низ / изрична грешка). Те принадлежат в `.env` и в [криптираното хранилище за идентификационни данни](./COMPLIANCE.md), а не в изходния код.

## Препратки

- [Google: OAuth 2.0 за приложения с вграден клиент](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API ключове за идентификация на клиенти](https://firebase.google.com/docs/projects/api-keys)
- [Поддържани тайни от GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: откриване на base64 при токени (февруари 2025 г.)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit, въвеждащ тази помощна функция: `1a39c31f` — _fix(security): маскиране на публични идентификационни данни от доставчици + централизиране на санирането на грешки_
