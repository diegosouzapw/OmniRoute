# Release Checklist (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последна актуализация:** 2026-08-28 — v3.8.51
> Опростен процес за издаване на версии, който използва уменията на Claude Code за автоматизация.
>
> **Поддържайте опашката/клона в изправно състояние между изданията:** вижте [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейството `/green-prs` + `npm run check:release-green` + `/babysit` + нощно изпълнение). Периодичното
> изпълнение на това — и особено **преди** този контролен списък — гарантира, че PR-ът за изданието започва в изправно състояние.

## Накратко

```bash
# 1. Увеличаване на версията + генериране на CHANGELOG (умение)
/version-bump-cc patch    # или minor/major

# 2. Локално изпълнение на проверките за качество
npm run check              # lint + тестове
npm run test:coverage      # пълна проверка на покритието (60/60/60/60)

# 3. Компилиране и базова проверка
npm run build
npm run test:e2e           # незадължително, но препоръчително

# 4. Генериране на изданието (умение)
/generate-release-cc

# 5. Внедряване (умение)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Събиране на доказателства за изданието (умение)
/capture-release-evidences-cc
```

## Доверено публикуване в npm (по подразбиране от v3.8.51) — поетапно при заявка, директно като резервен вариант

`npm-publish.yml` публикува чрез **npm Trusted Publishing (OIDC)** по подразбиране:
задачата `stage-npm` (хоствана от GitHub) обменя id-token на GitHub за краткосрочни идентификационни
данни за npm за съответното изпълнение — без дългосрочен npm токен в тайните на хранилището, без подкана за 2FA и с приложено удостоверение за произход.
Това е заобикалящият механизъм, който npm позволява сега, когато токените, пропускащи 2FA, постепенно се извеждат от употреба;
той възстановява напълно автоматичния процес, който проектът имаше до v3.8.48, като същевременно запазва
гаранцията на WS1.3 (изтекъл токен не може самостоятелно да публикува — такъв токен няма).

**Еднократна настройка (собственик):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: собственик `diegosouzapw`, хранилище `OmniRoute`, работен процес `npm-publish.yml`
(среда: няма). Докато това не бъде настроено, автоматичната стъпка завършва неуспешно с `ENEEDAUTH`:
стартирайте я повторно с `publish_mode=staged` (по-долу) или `direct`.

### Поетапно публикуване (при заявка — `publish_mode=staged`)

Работният процес за публикуване в npm вече не публикува директно: той стартира пакетирания tarball
(`check:pack-boot`) и след това изпълнява `npm stage publish` — точните байтове се съхраняват временно в
регистъра и **не могат да бъдат инсталирани**, докато собственикът не ги одобри. Човешката 2FA проверка е преместена
СЛЕД доказателството, а не преди него.

**Процес за собственика, след като работният процес завърши успешно:**

1. `npm stage list omniroute` — намерете идентификатора на етапа (той се отпечатва и в обобщението на работния процес).
2. Проверете поетапно съхранените байтове (препоръчително): `npm stage download <id>`, след което инсталирайте
   изтегления tarball във временен префикс и го стартирайте (`npm run check:pack-boot` автоматизира
   същата проверка „пакетиране→инсталиране→стартиране“ в CI).
3. `npm stage approve <id>` — подканата за 2FA Е самото публикуване. `npm stage reject <id>` отхвърля съдържанието.
4. Защитна проверка след публикуване: проверяващият механизъм след публикуването (WS1.4 от плана за v3.8.49) инсталира
   публикуваната версия от публичния регистър в чист контейнер и я стартира.

**Авариен резервен вариант:** `workflow_dispatch` с `publish_mode=direct` възстановява
старото незабавно `npm publish` (използвайте само ако самото поетапно публикуване не работи правилно; запишете причината).

**Еднократно подсилване на сигурността (собственик, npmjs.com):** конфигурирайте Trusted Publisher за
`omniroute` в режим само за поетапно публикуване, така че изтекъл дългосрочен токен да не може да изпълни `npm publish`
директно от никъде — CI може само да подготвя публикацията; единствено 2FA на собственика я издава.

**Процедура при повреден артефакт (без промяна):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
като стандартна първа реакция (отнема минути и е обратима); `npm unpublish` само в рамките на 72-часовия прозорец/при липса на зависими
пакети и никога като първа стъпка. Docker: никога не презаписвайте етикет на версия — връщането назад
означава пренасочване на `latest` към последния изправен digest.

**Docker Hub `latest` (задължително при всяко публикуване на стабилна SemVer версия):**
работният процес `docker-publish` трябва да постави етикети **както** `X.Y.Z`, **така и**, когато
`should-promote-latest.sh` потвърди, че това е най-високата стабилна SemVer версия, `:latest`
със **същия digest**. След задачата: digest-ът на `latest` в Hub трябва да съвпада с digest-а на новата
SemVer версия и `last_updated` трябва да е актуализирано. Не оставяйте `:latest` да сочи към по-стара
компилация, докато бележките към изданието описват корекции, които съществуват само в git. Примерните
Compose конфигурации за бърз старт използват `:latest`; GitOps трябва да продължи да фиксира `X.Y.Z`. Вижте
[Канали за издания на Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Бърза писта за спешни корекции (етикет `hotfix`)

PR с етикет `hotfix` пропуска тежката CI матрица (E2E с 9 шарда, праг за покритие,
quality-gate, quality-extended) и запазва бързите проверки с висока сигналност: компилация,
шардове с модулни тестове, интеграционни тестове, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и базовия тест за стартиране от tarball (`check:pack-boot`). Цел: успешно приключване за ≤15 минути вместо за ~33 минути.

**Правила за допускане — изискват се и четирите (по модела на аварийните писти на Chromium/VS Code/Node):**

1. **Сериозност**: продукционната среда не работи — публикуван артефакт се срива при стартиране /
   корекция на уязвимост / всеки потребител на версията е засегнат. „Важно“ не означава „не работи“.
2. **Правомощия**: само собственикът на хранилището поставя етикета `hotfix`. Самият етикет Е
   одобрението — никога не го поставяйте самостоятелно на PR от кампания.
3. **Доказателства**: описанието на PR съдържа връзка към предходното напълно успешно изпълнение на тежкия набор
   (набора, който пропуснатите задачи биха валидирали повторно), както и към собствения тест на корекцията, който първо е неуспешен, а след това успешен.
4. **Обхват**: само cherry-pick — минималната корекция, без рефакториране и без съпътстващи промени.

Пропуснатата проверка на покритието/прага се валидира повторно при следващото пълно изпълнение в
клона за изданието (непрекъснато успешно състояние на изданието) — пистата пропуска ИЗЧАКВАНЕТО, но никога валидирането.
Промени само в тестове (всички файлове са в `tests/`, нито един не е в `tests/e2e/`) пропускат E2E
матрицата автоматично, без етикет.

## Подробен контролен списък

### Преди издаването

- [ ] Всички PR-и, предназначени за тази версия, са слети в `release/vX.Y.0`
- [ ] Всички отворени задачи в Linear/issue за тази версия са затворени или преместени към следващия етап
- [ ] CI е успешен за клона `release/vX.Y.0`
- [ ] Няма маркери `TODO(release)` в кода: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовият Docker образ е актуален (в момента `node:24.15.0-trixie-slim`)

### Версия и регистър на промените

- [ ] Изпълнете `/version-bump-cc <patch|minor|major>` (умение на Claude Code)
  - Актуализира версиите в `package.json`, `electron/package.json`
  - Генерира отново `CHANGELOG.md` от git commit-ите след последния таг
  - Актуализира значките в README.md
- [ ] Прегледайте ръчно CHANGELOG.md и коригирайте съобщенията на commit-ите, ако е необходимо
- [ ] Уверете се, че последната semver секция в `CHANGELOG.md` съвпада с версията в `package.json`
- [ ] Запазете `## [Unreleased]` като първа секция в регистъра на промените за предстоящата работа
- [ ] Актуализирайте `docs/openapi.yaml` → `info.version` трябва да съвпада с версията в `package.json`

### Качество на кода

- [ ] `npm run lint` — 0 грешки (предупрежденията са съществували и преди)
- [ ] `npm run typecheck:core` — без проблеми
- [ ] `npm run typecheck:noimplicit:core` — без проблеми (строг режим)
- [ ] `npm run check:cycles:ratchet` — в рамките на фиксирания лимит `metrics.cycles` (самостоятелното изпълнение на `check:cycles` завършва с код 1 при наличие на какъвто и да е цикъл, #15281)
- [ ] `npm run check:any-budget:t11` — в рамките на бюджета
- [ ] `npm run check:route-validation:t06` — без проблеми
- [ ] `npm run check:node-runtime` — изпълнено е изискването за минимална поддържана среда за изпълнение (`>=22.22.2 <23`, `>=24.0.0 <27`, съгласно `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; съгласувано с `engines` в `package.json`)

### Тестване

- [ ] `npm run test:unit` — успешно
- [ ] `npm run test:vitest` — успешно (MCP сървър, autoCombo, кеш)
- [ ] `npm run test:coverage` — покрит е прагът 60/60/60/60 (оператори/редове/функции/разклонения)
- [ ] `npm run test:integration` — успешно (ако промените засягат DB/обработчици)
- [ ] `npm run test:combo:matrix` — успешно (матрица от combo стратегии: доказва детерминирано решенията за избор на всичките 21 публични стратегии за маршрутизиране; изпълнява се при промени в combo маршрутизирането, определянето на стратегията или резервната логика)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **незадължително/ръчно** (контролиран smoke тест с реални upstream услуги; зарежда snapshot само за четене на DB от VPS `root@192.168.0.15`; използва реални доставчици и изразходва кредити; никога не се изпълнява в CI; пропуска се коректно без активиращата променлива)
- [ ] `npm run test:combo:live:vps` — **незадължително/ръчно** (VPS smoke тест на живо от фаза 3: 7 HTTP сценария срещу работещия сървър `.15` чрез обикновен Node ESM; изисква `ssh root@192.168.0.15`; създава/изтрива само combo конфигурации `__live_test__*`; използва реални доставчици; никога не се изпълнява в CI)
- [ ] `npm run test:e2e` — успешно (промени в UI)
- [ ] `npm run test:protocols:e2e` — успешно (промени в MCP/A2A)
- [ ] `npm run test:ecosystem` — успешно

### Hooks (проверени чрез Husky)

Husky hooks се намират в `.husky/` и се изпълняват автоматично при git операции.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** бързи детерминирани проверки — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активирано на 2026-06-13). Умишлено изключва `test:unit` (бавно; покрива се от CI задачата `test-unit`).
  - Изпълнете ръчно `npm run test:unit`, преди да изпратите release клонове.

Ако даден hook е неуспешен: отстранете основния проблем, не го заобикаляйте с `--no-verify`.

### Conventional Commits

Всички commit-и, предназначени за изданието, трябва да следват формата `type(scope): subject`.

**Валидни типове:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Валидни обхвати:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Несъвместими промени: добавете footer `BREAKING CHANGE:` или `!` след обхвата (напр. `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` е успешно (изпълнява се автоматично от pre-commit)
- [ ] `npm run check:docs-all` е успешно (обща проверка: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завършва с код 0 — договорът за променливите на средата между кода ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` е запазен
- [ ] `npm run check:doc-links` завършва с код 0 — няма повредени вътрешни markdown препратки след преструктурирането
- [ ] `docs/architecture/ARCHITECTURE.md` е прегледан за несъответствия в съхранението/средата за изпълнение
- [ ] `docs/guides/TROUBLESHOOTING.md` е прегледан за несъответствия в променливите на средата и операциите
- [ ] Ако `.env.example` е променен: `docs/reference/ENVIRONMENT.md` е актуализиран
- [ ] Ако новата функционалност има UI: тя е спомената в `docs/guides/USER_GUIDE.md`
- [ ] Ако новата функционалност има API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` са актуализирани
- [ ] Ако новата функционалност е модул: съществува отделен `docs/<MODULE>.md`
- [ ] Ако има несъвместима промяна: `docs/guides/TROUBLESHOOTING.md` съдържа бележка за миграция

### i18n

- [ ] `npm run i18n:check` завършва с код 0 — състоянието на преводите (`.i18n-state.json`) е синхронизирано с изходната документация (няма разминаващи се източници в строг режим; предупреждение в режим warn е приемливо за промени в документацията в последния момент, но резултатът трябва да бъде 0 преди поставянето на таг)
- [ ] `npm run i18n:check-ui-coverage` завършва с код 0 — всяка UI локализация достига или надвишава минималния праг на покритие от 80%
- [ ] `npm run i18n:sync-ui:dry` отчита 0 липсващи ключа във всичките 66 целеви локализации (всяка локализация с изключение на изходната `en`)
- [ ] Ако изходната документация на английски е променена, изпълнете `npm run i18n:run` (изисква `OMNIROUTE_TRANSLATION_API_KEY` в `.env`) преди поставянето на таг
- [ ] Приносите към преводите могат да бъдат отложени за следващото издание, ако са незначителни (отбележете ги в CHANGELOG)

### Миграции на базата данни

- [ ] Ако `src/lib/db/migrations/` съдържа нови файлове:
  - [ ] Всяка миграция е идемпотентна (`CREATE TABLE IF NOT EXISTS` и т.н.)
  - [ ] Миграциите са обвити в транзакции
  - [ ] Номерирани са правилно (без пропуски в последователността)
- [ ] Тествайте при чиста инсталация: изтрийте `~/.omniroute/omniroute.db` и изпълнете `npm run dev`
- [ ] Тествайте при съществуваща инсталация: архивирайте DB, изпълнете миграцията и проверете схемата
- [ ] WAL файловете (`-wal`, `-shm`) се обработват правилно, ако миграцията презаписва таблици

### Каталог на доставчиците (валидирано със Zod)

- [ ] Zod схемата в `src/shared/constants/providers.ts` е валидна при зареждане
  - [ ] Всички доставчици имат задължителните полета (`id`, `label`, `kind` и т.н.)
  - [ ] `freeNote` е зададено за новите безплатни доставчици
  - [ ] OAuth доставчиците имат `oauthConfig`, регистрирана в `src/lib/oauth/constants/oauth.ts`
- [ ] Ако е добавен нов доставчик: съответен изпълнител в `open-sse/executors/`
- [ ] Ако форматът не е OpenAI: транслатор в `open-sse/translator/`
- [ ] Моделите са регистрирани в `open-sse/config/providerRegistry.ts`
- [ ] Модулните тестове в `tests/unit/` покриват класифицирането и маршрутизирането на доставчиците

### Настолно приложение (Electron)

Ако `electron/` е променена:

- [ ] `npm run electron:smoke:packaged` преминава успешно
- [ ] Компилациите са тествани за поне една от `:win`, `:mac`, `:linux`
- [ ] Сертификатите за подписване на кода не са изтекли (ако се използва подписване)
- [ ] Версията в `electron/package.json` съвпада с тази в основния `package.json`
- [ ] Указателят към канала за автоматично обновяване е актуализиран, ако изданието е за `stable`

### Структура на компилацията

Хранилището използва три отделни изходни директории — никога не ги смесвайте:

| Директория | Предназначение                                                          | Проследява ли се?       |
| ---------- | ----------------------------------------------------------------------- | ----------------------- |
| `src/`     | Изходен код на приложението (TypeScript / TSX)                          | Да                      |
| `.build/`  | Междинни файлове от компилацията — резултат от `next build` (`distDir`) | Не (игнорира се от git) |
| `dist/`    | Готов за разпространение npm пакет — сглобен от `assembleStandalone`    | Не (игнорира се от git) |

> **Бележка за оператора:** директорията с образа на отдалечения VPS остава `/usr/lib/node_modules/omniroute/app/`.
> Преместен е само резултатът от компилацията **в хранилището** (`app/` → `dist/`). Уменията за внедряване синхронизират
> съдържанието на `dist/` чрез rsync в отдалечената директория `app/` — не са необходими промени по пътищата във VPS.

**Процес с една компилация:**

```
npm run build:release
  └─ rm -rf .build dist          (почистване)
  └─ next build → .build/next/   (междинни файлове)
  └─ assembleStandalone          (копира standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (контролен маркер за HEAD)
```

НЕ изпълнявайте `npm run build`, последвано от отделно `npm run build:cli`, за внедряване — използвайте
`npm run build:release`, което извършва чисто повторно компилиране и създава контролния маркер с една команда.

### Валидиране на артефактите

- [ ] `npm run build:release` завършва успешно и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` не открива проблеми — няма `app.__qa_backup`, `scripts/scratch`, `package-lock.json` или други локални остатъчни файлове
- [ ] `dist/server.js` съществува след компилацията
- [ ] Незадължителен локален димен тест на пакетираното изпълнение: `npm run dev:candidate -- validate` след `npm run dev:candidate -- build` стартира пакетирания tarball в изолирана `DATA_DIR` и проверява `/api/health` + `/v1/models` (вижте [Препоръчителен процес за принос](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Маркиране и издаване

- [ ] Изпълнете `/generate-release-cc` (умение на Claude Code):
  - Създава етикет `vX.Y.Z`
  - Изпраща етикета и клона
  - Създава GitHub издание с описание на промените
  - Прикачва инсталаторите на Electron (ако са компилирани)
- [ ] Или ръчно:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Внедряване

Уменията за внедряване използват олекотения процес с rsync — без `npm pack` и без `npm i -g`:

- [ ] Използвайте умението за внедряване, което съответства на целта:
  - `/deploy-vps-local-cc` — локален VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — и двата
- [ ] Преди внедряване потвърдете, че `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Компилацията трябва да се изпълни там, където `node_modules` е реална директория (основното работно копие или worktree с изпълнено `npm ci` — НЕ worktree със символна връзка)
- [ ] Направете димен тест на внедрената инстанция:
  - Отворете `/dashboard/health` → проверете дали низът на версията съответства на изданието
  - Изпълнете заявка към `/v1/chat/completions` спрямо познат доставчик
  - Проверете дали `/api/monitoring/health` връща прекъсвачи на веригата със състояние `CLOSED`
  - Потвърдете, че MCP транспортите отговарят (`/mcp` HTTP, `/mcp-sse` SSE)

### След издаването

- [ ] Изпълнете `/capture-release-evidences-cc` (умение на Claude Code)
  - Заснема WebP екранни снимки/записи на новите функционалности
  - Прикачва ги към бележките по изданието / публикацията в блога
- [ ] Актуализирайте GitHub Discussions / Discord със съобщение за изданието
- [ ] Създайте етап за следващата версия
- [ ] Ако е критично: закачете дискусията или публикувайте в `news.json` за банер в приложението

### Контролен етап за публичното стартиране на Radar

Съобщението за Radar умишлено е commit-нато с `active: false`. Активирането е отделна
промяна, след като за всяка от точките по-долу бъдат предоставени доказателства:

- [ ] Всички последователно подредени PR-и за Radar са слети и CI за върховия commit на изданието преминава успешно
- [ ] Внедрете и направете димен тест на OSS маршрутите на Radar, докато `RADAR_ENABLED` все още е изключена по подразбиране
- [ ] Направете димен тест на `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на посочения хост на Radar
- [ ] Запишете самоличността/контакта/адреса на оператора и одобрения от собственика правен преглед в частната услуга
- [ ] Тествайте Stripe Checkout и подписания webhook само в тестов режим
- [ ] Тествайте едно криптирано доставяне на транзакционен имейл с одобрения подател/домейн
- [ ] Докажете възстановяване от резервно копие и едно контролирано изследователско изпълнение с ограничен бюджет
- [ ] Одобрете политиката за преглед на BRL/PIX, преди да приемате доказателства за дарения
- [ ] Активирайте публичния Checkout само след преминаване на предходните контролни етапи, след което активирайте новия идентификатор в `news.json`
- [ ] Проверете дали банерът на началната страница използва локализиран текст и дали нов идентификатор се показва отново, след като по-стар идентификатор е бил отхвърлен

## Smoke тестове за вградени услуги (v3.8.4+)

Преди публикуване на версия, която включва промени по вградените услуги, проверете:

### Стартиране с нова БД (открива конфликти между миграции — добавено след спешната корекция за v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — изчакайте 10 s за стартиране
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` връща `"9router"` (НЕ 404, НЕ 500). Потвърждава, че миграцията `071_services.sql` е приложена и редът е създаден.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` връща 3 реда.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` връща 2 реда (потвърждава, че `070_webhooks_kind_metadata.sql` е приложена).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` преминава успешно — предпазва от бъдещи конфликти.

### 9Router

- [ ] `POST /api/services/9router/install` връща 200 с `installedVersion` за по-малко от 2 min
- [ ] `POST /api/services/9router/start` връща 200 и `state: "running"` за по-малко от 30 s
- [ ] `GET /api/services/9router/status` отчита `health: "healthy"`
- [ ] `POST /v1/chat/completions` с `"model": "9router/auto/..."` връща 200 (маршрутизиране от край до край през 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` визуализира собствения потребителски интерфейс на 9Router вътре в проксито (без директен `127.0.0.1:port` iframe)
- [ ] `POST /api/services/9router/rotate-key` връща `{ keyRotated: true }` и услугата се рестартира безпроблемно
- [ ] `POST /api/services/9router/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` връща SSE поток със събитие `snapshot`, съдържащо скорошни редове
- [ ] Инсталирането в среда без `npm` в PATH връща 500 с разбираемо съобщение за грешка (без stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` връща 200 за по-малко от 2 min
- [ ] `POST /api/services/cliproxy/start` връща 200 и `state: "running"` за по-малко от 30 s
- [ ] `GET /api/services/cliproxy/status` отчита `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` връща SSE поток

### Регресия в сигурността

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` връща `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` връща `403 LOCAL_ONLY`
- [ ] Отговорите с грешки от `/api/services/*` не съдържат `err.stack` или абсолютни файлови пътища

## Проверки за v3.8.0+

Преди публикуване на версия от серията v3.8.x проверете и следното:

- [ ] `omniroute --tray` се стартира на macOS (systray2 е инсталиран в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се стартира на Linux (изисква DISPLAY; разбираема грешка, ако не е зададен)
- [ ] `omniroute --tray` се стартира на Windows (PowerShell NotifyIcon, без допълнителни двоични файлове)
- [ ] `omniroute config tray enable` създава запис за автоматично стартиране; деактивирането го премахва
- [ ] `npm install -g omniroute@<this-version>` изпълнява postinstall без фатално прекратяване
- [ ] Процесът на актуализиране запазва незадължителните зависимости: `omniroute update --apply` и автоматичната актуализация
      изпълняват `npm install -g … --include=optional`, така че `optionalDependencies` (better-sqlite3,
      keytar, tls-client и llmlingua SLM стекът: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) да се запазят след актуализация. Ultra SLM нивото с `modelPath` изисква също
      модела tinybert, който се изтегля автоматично в `${DATA_DIR}/models/llmlingua` при първото използване. След това postinstall
      (`scripts/build/colocateOptionals.mjs`) разполага заедно незадължителните зависимости на SLM в
      `dist/node_modules`, така че worker процесът да използва ЕДИН екземпляр на `@huggingface/transformers` ^4.2.0
      — самостоятелният trace пакетира само transformers, а не динамично импортираните
      незадължителни зависимости, така че без това worker процесът би заредил llmlingua-2 с transformers от основната директория
      и SLM нивото би преминало безшумно към резервен режим.
- [ ] `omniroute status` работи без `.env` (път чрез CLI токен, само през loopback)
- [ ] `curl http://localhost:20128/api/shutdown` връща 401 (маршрут, който винаги е защитен)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` връща 401 (loopback защита)
- [ ] При първото изпълнение SQLite средата се определя като `bundled` (вграденият двоичен файл е валиден за платформата)
- [ ] SQLite средата преминава към `runtime`, когато `node_modules/better-sqlite3` бъде изтрита
- [ ] Интелигентният MCP филтър компресира реален изход от `playwright-mcp browser_snapshot` (намаление с ≥50%)
- [ ] Всичките 10 файла `skills/omniroute*/SKILL.md` са публично достъпни чрез необработен GitHub URL
- [ ] При нова настройка съветникът за първоначално конфигуриране показва стъпката за представяне на нивата „Как работи“
- [ ] Уиджетът за обхват на нивата в началното табло показва броя на конфигурираните/активните елементи

---

## Отделяне на 3.9.0 LTS (репетирано в 3.8.58)

След v3.8.59 следващата версия е 3.9.0, а върхът ѝ става основа на два дългосрочни клона:
`stable/v3` (линията v3 LTS, npm `latest`) и `develop` (v4, повишена до 4.0.0, npm
`nightly`). Моделът на клоновете/каналите, пренасянето напред и етикетите са описани в
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); планът е в [ROADMAP](../../ROADMAP.md) (Фаза 3). Отделянето се изпълнява веднъж;
3.8.58 го репетира от начало до край във fork, а 3.8.59 завършва с
[контролния списък GO/NO-GO](./LTS_GO_NO_GO.md).

### Пробно изпълнение (само за четене, безопасно по всяко време)

```bash
npm run release:dry-run-lts-cut                       # реалното отделяне: 3.9.0 от HEAD, предишен таг v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # фиксиране на изходния commit
```

`scripts/release/dry-run-lts-cut.mjs` не изпълнява нищо: той чете git и `gh` и извежда
цялата последователност — предварителните условия (източникът се намира, изходното хранилище има пълна история —
shallow clone не може да изпрати `stable/v3`, приемащата страна отхвърля пакета при първия
присаден родител, затова първо извършете отделянето от пълен clone или изпълнете `git fetch --unshallow origin` —
предишният таг съществува, `package.json` съдържа целевата версия, отворен е issue с `release-freeze`, няма отворен
issue с `Release branch not green`
за съществуващ release клон — несъществуващ клон се отчита като `?` неизвестен, никога
като зелен — опашката `release` на Mergify е конфигурирана (G11: `queue_rules`, `checks_timeout`,
етикет `queue`), наборът от правила за `release/*` все още блокира изтриването и принудителното изпращане, а
`stable/v3` и `develop` все още не съществуват), двете стъпки за клоновете, кои тригери на
неактивни workflow-и и условия `if:` стават истина (и кои остават блокирани от променлива на хранилището или
фиксирани към каноничното хранилище), очакваните dist-tag-ове (`latest` → 3.9.0, `next` и
`nightly` са празни) и връщането назад. Изходен код `0` = `RESULT: READY`, `1` = неизпълнено блокиращо предварително
условие (`✗`), `2` = грешка при употреба. `--advisory <id,...>` понижава проверка до предупреждение (`!`),
без да я скрива.

Изпълнете пробното изпълнение на реалното отделяне, докато замразяването на release-а за 3.9.0 все още е активно — клоновете се
създават след тага и преди Фаза 12c да отмени замразяването.

### Репетиция с 3.8.58 (само във fork)

```bash
# 1. Пробно изпълнение върху текущия връх с параметри за репетицията
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Изпълнение спрямо отдалечен FORK (origin или всеки remote, чийто URL е на каноничното
#    хранилище, се отказва; всяка стъпка изисква потвърждение в терминала)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Изпробване на неактивните workflow-и във fork-а (workflow_dispatch там, където пробното изпълнение
#    отчита фиксиране към каноничното хранилище), след което връщане назад
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit-ът за повишаване на `develop` се създава чрез git plumbing (работното дърво не се засяга) и повишава
същите пет файла като commit за отваряне на цикъл: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Секцията `[4.0.0]` в
CHANGELOG и нейните i18n копия се отварят впоследствие в `develop`, преди първия му
PR. Скриптът никога не променя npm dist-tag-ове — репетирайте ги с тестов пакет.

### Артефакт за предварителен преглед на PR (изграждане веднъж, повишаване на същите байтове)

`.github/workflows/preview-artifact.yml` изгражда един production tarball от върха на PR и
валидира точно тази компилация (част (a) от #8084). Само за PR-и от същото хранилище; нищо не се публикува.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или добавете етикета `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # инсталиране на предварителния преглед
```

Изпълнението стартира `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, пакетира
tarball-а, стартира `npm run check:pack-boot` (фиктивни тайни, временна директория за данни), пакетира отново и
се проваля, освен ако digest-ът не е идентичен, след което записва `artifact-identity.json` (SHA на върха, SHA на основата,
hash на lockfile-а, платформа, архитектура, node ABI, bundler, политика за компилация —
`scripts/release/artifact-identity.mjs`) и атестира tarball-а в отделен job. Повишаването
на предварителен преглед означава инсталиране на този tarball: никога не изграждайте повторно от изходния код.

### Отделянето (3.9.0, след GO)

1. GO е записано в [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` извежда `RESULT: READY`.
3. Създайте клоновете ръчно в `origin` с командите, изведени от пробното изпълнение —
   скриптът отказва да изпраща към `origin`. За да използвате повторно прегледан commit за `develop`, първо изпълнете
   репетицията с `--execute` върху върха на 3.9.0 спрямо своя fork; тя извежда и двата SHA, а
   същите commit-и могат да бъдат изпратени:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Защитете `stable/v3` и `develop` (набори от правила + опашка за сливане), преди да бъде приета първата PR.
5. Неактивните работни процеси се включват при съществуване на съответния клон: `forward-port.yml` (push към
   `stable/v3`), `validate-stable-pr.yml` (PR-и към `stable/v3`) и `nightly-v4-build.yml`
   (компилира `develop`). Преди пускането задайте тайната `secrets.FORWARD_PORT_TOKEN` на хранилището (така че CI да се изпълнява при
   PR-и за пренасяне напред); нощното публикуване остава изключено, докато собственикът не зададе променливата на хранилището
   `vars.NIGHTLY_PUBLISH` на `true` и npm Trusted Publishing не приеме
   `nightly-v4-build.yml`. Определянето на канала се извършва от `scripts/release/dist-tag.mjs` — същата
   логика за определяне, която използва `npm-publish.yml`.
6. Проверете каналите: `npm view omniroute dist-tags --json` показва `latest` = 3.9.0 и липса на
   `next` / `nightly`, докато не бъде публикувана v4.
7. Връщане назад, ако е необходимо: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   и `npm dist-tag add omniroute@3.8.59 latest`.

---

## Връщане към предишна версия

Ако изданието има критичен проблем:

1. `gh release edit vX.Y.Z --prerelease` (маркира го като непоследно)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (само ако все още не е възприето от потребителите)
3. Или: спешна корекция в `release/vX.Y.0` → коригиращо издание `vX.Y.(Z+1)`
4. Комуникирайте незабавно в GitHub Discussions и Discord

## Строги правила

- Никога не правете директни комити в `main`
- Никога не използвайте `git push --force` към `main` или клонове `release/*`
- Никога не пропускайте Husky hooks (`--no-verify`)
- Никога не включвайте в комити тайни, идентификационни данни или `.env` файлове
- Покритието трябва да остане ≥60/60/60/60 (инструкции/редове/функции/разклонения)
- Винаги добавяйте или актуализирайте тестове, когато променяте продукционен код в `src/`, `open-sse/`, `electron/` или `bin/`

## Автоматизирана проверка за синхронизация

Изпълнете локално проверката за синхронизация на документацията, преди да отворите PR:

```bash
npm run check:docs-sync
```

CI също изпълнява тази проверка в `.github/workflows/ci.yml` (задача за проверка на стила).
