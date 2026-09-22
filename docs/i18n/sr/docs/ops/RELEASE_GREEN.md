# Release-Green: keeping the queue and release branch green (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Проблем који ово решава

**Потпуна провера** (`.github/workflows/ci.yml` — подељени unit тестови, vitest, контроле регресије,
`package-artifact`, SonarQube, E2E) покреће се **само на PR-у за издање** (PR → `main`). PR-ови усмерени ка
`release/**` добијају **брзе провере** (`quality.yml`: тестови обухваћени TIA анализом + провера типова + lint)
и, за измене кода, **саветодавни** продукциони build. Последица: грешке специфичне за издање и даље могу
неприметно да се гомилају на грани за издање и да **експлодирају у слојевима од по ~40 минута** у време издања,
једна по једна.

„Породица release-green“ постоји да би **предвидела** те грешке — да у било ком тренутку провери еквивалент
потпуне провере **локално / ван процеса издања**, тако да PR за издање буде
зелен већ при првом CI покретању.

> **Принцип о којем нема преговора:** ништа од овога не блокира сарадника. Не додајемо обавезну
> проверу због које његов PR не пролази. **Одступање** (контроле регресије) одржавалац треба поново да базира при издању —
> то никада није брига сарадника. Ниједан део не **затвара** PR (присвајање заслуга), нити
> **ублажава** тест да би прошао.

## Породица (4 дела) — и како се сваки покреће независно

| Део                                                                      | Шта је то                                                                                 | Када се покреће                                                    | Опсег                            |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| **`/green-prs`** (Решење A)                                              | Одржавалац на захтев скенира **ред отворених PR-ова**                                     | **Независно, периодично** — а нарочито **пре** `/generate-release` | Цео ред PR-ова → `release/**`    |
| **`/validate-release-green`** (Решење C — `npm run check:release-green`) | Механизам за валидацију: репродукује потпуну проверу над граном ИЛИ кандидатом за спајање | Независно, у било ком тренутку                                     | Одређена грана или PR за спајање |
| **`/babysit <PR#>`**                                                     | Доводи **активни CI** **једног** PR-а у зелено стање                                      | Независно, за сваки PR                                             | Један PR                         |
| **`nightly-release-green.yml`** (Решење D)                               | Аутоматизовани ноћни workflow; отвара issue при HARD црвеном стању                        | Аутоматски (cron)                                                  | Активна грана за издање          |

**Кратак одговор на питање „да ли је ово само за издања?“:** **не.** `/green-prs` је осмишљен тако да се
покреће **периодично, између издања**. Независно покретање је уобичајени начин коришћења — издање је само
тренутак када његово покретање доноси највише вредности.

## Саветодавна изградња од PR-а до издања

`quality.yml` сада укључује `Build (advisory)` за недрафтоване PR-ове кода и гране Mergify реда.
Она одражава рецепт за продукциону изградњу из `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` и `npm run build` са `OMNIROUTE_USE_TURBOPACK=1`. Намерно
не отпрема артефакт изградње јер га ниједан наредни задатак провере квалитета не користи у овом току рада.
Уклоните `continue-on-error` након једне недеље стабилних покретања PR-ова за издање како би овај сигнал постао
обавезујућа контрола од PR-а до издања.

## Решење C — `npm run check:release-green` (механизам)

Репродукује валидацију еквивалентну издању над тренутним радним стаблом и класификује сваку неуспешну проверу:

- **HARD** (провера типова, грешке линтера, јединични тестови, vitest, db-rules, public-creds, опциони
  `package-artifact`) → **стварни дефект**; `exit 1`. Исправља се на изворној грани (TDD, правило #18).
- **DRIFT** (**упозорења** eslint-а, когнитивна сложеност, величина датотеке) → одступање прагова нагомилано током
  циклуса, **није кривица доприносиоца**; само се пријављује и **одржавалац поново поставља основне вредности при
  издању**. DRIFT **никада** не мења излазни кôд — стога никада никога не блокира.

```bash
npm run check:release-green                 # тренутна грана (радно стабло)
node scripts/quality/validate-release-green.mjs --json   # структурирани излаз
node scripts/quality/validate-release-green.mjs --quick  # прескаче јединичне тестове и vitest (само одступање+провера типова+линтер)
node scripts/quality/validate-release-green.mjs --with-build  # укључује package-artifact (споро)
```

Само дијагностикује и **пријављује** (без аутоматских исправки). Оркестрација исправљања до успешног стања налази се у
`/green-prs` и `/review-prs`.

## Решење A — `/green-prs` (скенирање реда)

Поступак (сажетак — детаље погледајте у вештини `green-prs`):

1. Направите **инвентар** реда отворених PR-ова у односу на активну грану издања.
2. **Тријажирајте** сваки PR (одржив / за одбијање / потребна интервенција аутора) — они за одбијање или интервенцију аутора се
   **пријављују, али не затварају** (аутор одлучује).
3. За сваки одрживи PR, у **изолованом радном стаблу** (правило #19), доведите PR на врх гране издања и покрените
   `npm run check:release-green`:
   - **HARD** → исправите **на грани доприносиоца** уз коауторство (чува ауторов статус „Merged“),
     па поново покрећите док се не отклоне сви HARD проблеми.
   - **DRIFT** → оставите га; основне вредности ће бити поново постављене при издању.
4. **Прикажите** табелу PR × (одлука, HARD проблеми, исправљено?, DRIFT, сада спремно за издање?).

Може да **припреми** ред без спајања; спаја само када се то изричито затражи — и никада не затвара PR.

## Препоручени ритам

- Покрећите **`/green-prs` периодично** (нпр. недељно) и **увек пре
  `/generate-release`**.
- Задржите **`nightly-release-green.yml`** (решење D) као непрекидан сигнал: када отвори
  проблем због HARD неуспеха, време је за скенирање.
- Користите **`/validate-release-green`** по потреби да проверите грану или одређеног кандидата за спајање.
- Користите **`/babysit <PR#>`** када одређени PR треба довести до успешног стања на активном CI-ју.

## Однос према издању

- `/generate-release` позива валидацију у **фази 0 (провера пре покретања)**: поново поставља основне вредности за DRIFT и исправља
  HARD проблеме пре отварања PR-а за издање.
- `/review-prs` користи контролу спремности за издање у кораку одлучивања о спајању (успешне провере пре спајања).

Циљ свих делова је исти: **успешан PR за издање већ при првом покретању CI-ја**, уместо сукцесивног решавања
неуспеха у слојевима од 40 минута на дан издања.
