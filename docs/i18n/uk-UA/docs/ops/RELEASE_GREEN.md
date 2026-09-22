# Release-Green: keeping the queue and release branch green (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Проблема, яку це розв’язує

**Повний набір перевірок** (`.github/workflows/ci.yml` — шарди модульних тестів, vitest, ratchets,
`package-artifact`, SonarQube, E2E) запускається **лише для релізного PR** (PR → `main`). PR, націлені
на `release/**`, проходять **швидкі перевірки** (`quality.yml`: тести, на які впливають зміни за TIA, + перевірка типів + lint)
і, для змін коду, **рекомендаційну** production-збірку. Як наслідок, помилки, що проявляються лише під час релізу, можуть
непомітно накопичуватися в релізній гілці та **вибухати шарами по ~40 хв** під час релізу,
одна за одною.

Сімейство «release-green» існує, щоб **заздалегідь виявляти** ці помилки — перевіряти еквівалент повного
набору перевірок **локально / поза процесом релізу**, у будь-який час, щоб релізний PR був
зеленим уже під час першого запуску CI.

> **Принцип, що не підлягає обговоренню:** ніщо з цього не блокує контриб’ютора. Ми не додаємо обов’язкову
> перевірку, через яку його PR завершується невдало. **Відхилення** (ratchets) має перебазувати мейнтейнер під час релізу —
> це ніколи не є турботою контриб’ютора. Жодна частина **не закриває** PR (привласнення авторства) і не
> **послаблює** тест заради його проходження.

## Сімейство (4 складові) — і як кожна з них запускається незалежно

| Складова                                                                  | Що це                                                                               | Коли запускати                                                       | Область дії                  |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------- |
| **`/green-prs`** (Рішення A)                                              | Запускане на вимогу мейнтейнером сканування **черги відкритих PR**                  | **Незалежно, періодично** — і особливо **перед** `/generate-release` | Уся черга PR → `release/**`  |
| **`/validate-release-green`** (Рішення C — `npm run check:release-green`) | Рушій валідації: відтворює повний набір перевірок для гілки АБО кандидата на злиття | Незалежно, у будь-який час                                           | Конкретна гілка або merge-PR |
| **`/babysit <PR#>`**                                                      | Доводить **активний CI** **одного** PR до зеленого стану                            | Незалежно, для кожного PR                                            | Один PR                      |
| **`nightly-release-green.yml`** (Рішення D)                               | Автоматизований нічний workflow; відкриває issue у разі HARD-помилки                | Автоматично (cron)                                                   | Активна релізна гілка        |

**Коротка відповідь на запитання «це лише для релізів?»:** **ні.** `/green-prs` було розроблено для
**періодичного запуску між релізами**. Незалежний запуск є звичайним способом використання — реліз є лише
моментом, коли такий запуск приносить найбільшу користь.

## Рекомендаційне складання для PR до релізу

`quality.yml` тепер містить `Build (advisory)` для PR із кодом, які не є чернетками, і гілок черги Mergify.
Воно відтворює рецепт продакшн-складання з `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` і `npm run build` з `OMNIROUTE_USE_TURBOPACK=1`. Воно навмисно
не завантажує артефакт складання, оскільки жодне подальше завдання перевірки якості в цьому робочому процесі його не використовує.
Видаліть `continue-on-error` після одного тижня стабільних запусків релізних PR, щоб цей сигнал став
блокувальним шлюзом від PR до релізу.

## Рішення C — `npm run check:release-green` (рушій)

Відтворює перевірку, еквівалентну релізній, для поточного робочого дерева та класифікує кожен негативний результат:

- **HARD** (перевірка типів, помилки лінтингу, модульні тести, vitest, db-rules, public-creds, необов’язковий
  `package-artifact`) → **реальний дефект**; `exit 1`. Виправляється у вихідній гілці (TDD, правило №18).
- **DRIFT** (**попередження** eslint, когнітивна складність, розмір файлу) → відхилення порогових значень, накопичене
  протягом циклу, **не з вини автора внеску**; воно лише фіксується у звіті та **повторно задається супровідником під час
  релізу**. DRIFT **ніколи** не змінює код завершення, тож він нікого не блокує.

```bash
npm run check:release-green                 # поточна гілка (робоче дерево)
node scripts/quality/validate-release-green.mjs --json   # структурований вивід
node scripts/quality/validate-release-green.mjs --quick  # пропускає модульні тести й vitest (лише відхилення, перевірка типів і лінтинг)
node scripts/quality/validate-release-green.mjs --with-build  # включає package-artifact (повільно)
```

Лише діагностує та **звітує** (без автоматичного виправлення). Оркестрація виправлень до успішного стану міститься в
`/green-prs` і `/review-prs`.

## Рішення A — `/green-prs` (сканування черги)

Процедура (коротко — подробиці див. у навичці `green-prs`):

1. **Інвентаризувати** чергу відкритих PR щодо активної релізної гілки.
2. **Класифікувати** кожен PR (життєздатний / вартий відхилення / потребує втручання автора) — PR, варті відхилення або такі, що потребують втручання автора,
   **фіксуються у звіті, але не закриваються** (рішення ухвалює автор).
3. Для кожного життєздатного PR в **ізольованому робочому дереві** (правило №19) синхронізувати PR із верхівкою релізної гілки та виконати
   `npm run check:release-green`:
   - **HARD** → виправити **в гілці автора внеску** через співавторство (це зберігає для автора статус «Merged»),
     повторювати перевірку, доки не буде усунуто всі HARD-помилки.
   - **DRIFT** → залишити без змін; порогові значення буде повторно задано під час релізу.
4. **Надати** таблицю PR × (вердикт, HARD-помилки, виправлено?, DRIFT, чи готовий зараз до релізу?).

Може **підготувати** чергу без злиття; виконує злиття лише за явним запитом — і ніколи не закриває PR.

## Рекомендована періодичність

- Запускайте **`/green-prs` періодично** (наприклад, щотижня) та **завжди перед
  `/generate-release`**.
- Залиште **`nightly-release-green.yml`** (рішення D) як безперервний сигнал: коли він створює
  задачу про HARD-помилку, час запускати сканування.
- Використовуйте **`/validate-release-green`** за потреби для перевірки гілки або конкретного кандидата на злиття.
- Використовуйте **`/babysit <PR#>`**, коли конкретний PR потрібно довести до успішного стану в активному CI.

## Зв’язок із релізом

- `/generate-release` запускає перевірку на **фазі 0 (попередня перевірка)**: повторно задає порогові значення DRIFT і виправляє
  HARD-помилки перед відкриттям релізного PR.
- `/review-prs` використовує шлюз готовності до релізу на етапі ухвалення рішення про злиття (успішна перевірка перед злиттям).

Мета всіх складових однакова: **успішний релізний PR із першого запуску CI** замість послідовного усунення
помилок у 40-хвилинних циклах у день релізу.
