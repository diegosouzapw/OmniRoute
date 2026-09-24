# Public Credentials Handling (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Извор истине:** `open-sse/utils/publicCreds.ts`
> **Тестови:** `tests/unit/publicCreds.test.ts`
> **Последње ажурирање:** 2026-08-07 — v3.8.50
> **Публика:** Инжењери који интегришу добављаче чији јавни CLI алати садрже јавне OAuth client_id / client_secret вредности / Firebase Web API кључеве.
> **Статус:** **ОБАВЕЗНО** за сав нови кôд који уграђује идентификаторе узводних добављача.

## Зашто ово постоји

- [OAuth 2.0 за изворне апликације (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret вредности за инсталиране апликације су јавне; PKCE пружа стварну безбедност.
- [Firebase API кључеви](https://firebase.google.com/docs/projects/api-keys) — Идентификатори веб-клијената су јавни по дизајну.

OmniRoute мора да угради ове вредности како би корисници који не конфигуришу `.env` ипак добили функционалан OAuth ток без додатног подешавања. Без уграђене резервне вредности, добављачи Gemini / Antigravity престају да раде за сваког корисника који прати приступ „само клонирај и покрени“.

Међутим, дословне вредности као што су `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` препознају **GitHub Secret Scanning**, **Semgrep** и слични скенери образаца. Свако издање постаје бучан низ лажно позитивних резултата, заштита при слању блокира легитимне измене, а оператери престају да верују току упозорења.

Помоћни модул `open-sse/utils/publicCreds.ts` истовремено решава оба ограничења:

- Уграђује јавни идентификатор као **XOR-маскиран низ бајтова** (у изворном коду нема обрасца који скенер може да препозна).
- Декодира га током извршавања помоћу `decodePublicCred` / `resolvePublicCred`.
- Препознаје необрађене вредности које већ прате добро познате префиксе (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) и прослеђује их непромењене, тако да корисницима са необрађеним вредностима у постојећој `.env` датотеци све наставља да ради **без икакве миграције**.

Ово је **обфускација, а не шифровање.** Свако ко чита изворни кôд може да поврати вредност — што је прихватљиво јер је вредност по дизајну јавна. Једини циљ је да се избегну подударања са регуларним изразима скенера.

## Обавезни образац

### 1. Додавање новог јавног акредитива

Када треба да уградите нову вредност коју је обезбедио узводни добављач и која:

- потиче из јавног CLI алата / десктоп апликације / пакета за прегледач, **и**
- коју узводни добављач документује (или третира) као јавни идентификатор клијента, **и**
- коју би скенер образаца иначе препознао (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, итд.),

…пратите ову контролну листу:

1. Генеришите маскирани низ бајтова:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Додајте нову ставку у `EMBEDDED_DEFAULTS` у датотеци `open-sse/utils/publicCreds.ts` са **неутралним називом кључа** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, итд.). У помоћном модулу **немојте** користити називе као што су `client_secret` или `api_key` — те речи активирају Semgrep правила за генеричке тајне.

3. Додајте `keyof typeof EMBEDDED_DEFAULTS` јавном унијском типу (изводи се аутоматски).

4. У потрошачком коду замените чврсто уписану дословну вредност следећим:

   ```ts
   // једна замена из окружења
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // више псеудонима из окружења (користи се први који није празан)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // без замене из окружења (увек се користи уграђена подразумевана вредност)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Уклоните дословну вредност из `.env.example` (замените је документацијом која садржи само коментаре и упућује читаоце овде):

   ```dotenv
   # ── Добављач (Google / Firebase / итд.) ──
   # Јавни OAuth акредитиви уграђени су у кôд преко
   # open-sse/utils/publicCreds.ts. Поставите ове променљиве само ако желите да користите сопствене.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Ажурирајте `tests/unit/publicCreds.test.ts` тако што ћете додати проверу облика за нови кључ (проверите формат, а не дословну вредност — погледајте постојеће тестове за образац).

7. **Никада** немојте додавати дословне вредности `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` у тестне датотеке. Користите константе `FAKE_*` састављене од фрагмената помоћу `.join("")` (погледајте постојеће тестове).

### 2. Потрошачи

- **Читајте искључиво преко `resolvePublicCred()` / `resolvePublicCredMulti()`** — никада немојте директно позивати `decodePublicCredBytes()` изван помоћног модула.
- Помоћни модул је намерно једноставан и јефтин (линеарни XOR бајтова) и безбедно га је позивати при учитавању модула; подразумеване вредности израчунавају се једном.
- Вредност из окружења увек има предност. Ако корисник постави `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, помоћни модул прослеђује ту необрађену вредност без измена.

### 3. Забрањени обрасци

❌ **Никада** немојте радити ништа од следећег у продукционом коду (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ЛОШЕ: дословна вредност активира Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ЛОШЕ: base64 облик дословне вредности — GitHub га и даље открива од фебруара 2025.
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ЛОШЕ: надовезивање ниски које поново саставља образац током извршавања
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ЛОШЕ: hex/ROT13 кодирање — другачија обфускација, исти ризик од откривања
clientSecret: hexDecode("474f4353..."),
```

Све ово на крају активира скенер. Користите `resolvePublicCred()`.

❌ **Никада** немојте додавати дословне акредитиве у `.env.example`. Корисници којима су потребне стварне вредности узводног добављача могу сами да их издвоје из јавног CLI алата или да користе сопствену OAuth регистрацију.

❌ **Никада** немојте занемарити ново упозорење скенера тајни пре него што проверите да ли акредитив треба преместити у овај помоћни модул.

## Повезане контроле

- `RAW_VALUE_PATTERN` у `publicCreds.ts` набраја префиксе који активирају директно прослеђивање (ретрокомпатибилност). Проширујте га само за документоване формате јавних акредитива, никада за власничке тајне.
- `.env.example` се проверава у CI скрипти `check-env-doc-sync` — када овде уклоните променљиву, уверите се да је документација усклађена.
- Оба скупа тестова, `npm run test:vitest` и `node --import tsx/esm --test tests/unit/publicCreds.test.ts`, морају остати успешна.

## Када НЕ треба користити ову помоћну функцију

Ова помоћна функција је **искључиво** за акредитиве који су:

1. Јавно дистрибуирани од стране изворног добављача (CLI бинарна датотека, пакет за прегледач, званична документација).
2. Документовани или јасно назначени као неповерљиви (заштићени PKCE-ом, Firebase Web кључ или слично).

За све остало — токене које издаје оператер, тајне специфичне за закупца, `client_secret` ваше OAuth апликације, кључеве за шифровање, JWT тајне, лозинке за базе података — користите **искључиво променљиве окружења** (`process.env.FOO`, резервну вредност `||` постављену на празно / експлицитну грешку). Њихово место је у `.env` и [шифрованом складишту акредитива](./COMPLIANCE.md), а не у изворном коду.

## Референце

- [Google: OAuth 2.0 за изворне апликације](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API кључеви за идентификацију клијента](https://firebase.google.com/docs/projects/api-keys)
- [GitHub тајне које подржава Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: откривање base64 кодираних токена (фебруар 2025.)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Комит којим је уведена ова помоћна функција: `1a39c31f` — _fix(security): маскирање јавних изворних акредитива + централизација санитизације грешака_
