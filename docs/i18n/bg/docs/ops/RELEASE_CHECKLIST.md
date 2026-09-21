# Release Checklist (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последна актуализация:** 2026-08-28 — v3.8.51
> Опростен процес за издаване, който използва уменията на Claude Code за автоматизация.
>
> **Поддържайте опашката/клона в изправно състояние между изданията:** вижте [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейството `/green-prs` + `npm run check:release-green` + `/babysit` + изпълнение всяка нощ). Периодичното
> изпълнение на това — и особено **преди** този контролен списък — гарантира, че PR заявката за изданието започва в изправно състояние.

## Накратко

```bash
# 1. Увеличете версията + генерирайте CHANGELOG (умение)
/version-bump-cc patch    # или minor/major

# 2. Изпълнете локално проверката за качество
npm run check              # lint + тестове
npm run test:coverage      # пълна проверка на покритието (60/60/60/60)

# 3. Компилирайте и направете базова проверка
npm run build
npm run test:e2e           # незадължително, но препоръчително

# 4. Генерирайте изданието (умение)
/generate-release-cc

# 5. Разположете (умение)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Заснемете доказателства за изданието (умение)
/capture-release-evidences-cc
```

## Доверено публикуване в npm (по подразбиране от v3.8.51) — поетапно при заявка, директно като резервен вариант

`npm-publish.yml` публикува чрез **доверено публикуване в npm (OIDC)** по подразбиране:
задачата `stage-npm` (хоствана от GitHub) обменя id-token на GitHub за краткосрочни идентификационни
данни за npm за конкретното изпълнение — без дългосрочен npm токен в тайните на хранилището, без подкана за 2FA, с прикачен произход.
Това е заобикалянето, което npm допуска сега, когато токените, пропускащи 2FA, се извеждат от употреба;
то възстановява напълно автоматичния процес, който проектът имаше до v3.8.48, като същевременно запазва
гаранцията на WS1.3 (изтекъл токен не може самостоятелно да публикува — няма токен).

**Еднократна настройка (собственик):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: собственик `diegosouzapw`, хранилище `OmniRoute`, работен процес `npm-publish.yml`
(среда: няма). Докато това не бъде настроено, автоматичната стъпка се проваля с `ENEEDAUTH`:
стартирайте отново с `publish_mode=staged` (по-долу) или `direct`.

### Поетапно публикуване (при заявка — `publish_mode=staged`)

Работният процес npm-publish вече не публикува директно: той стартира пакетирания tarball
(`check:pack-boot`) и след това изпълнява `npm stage publish` — точните байтове се съхраняват в
регистъра, но **не могат да бъдат инсталирани**, докато собственикът не ги одобри. Човешката 2FA проверка е преместена
СЛЕД доказателството, а не преди него.

**Процес за собственика, след като работният процес стане успешен:**

1. `npm stage list omniroute` — намерете идентификатора на етапа (той се отпечатва и в обобщението на работния процес).
2. Проверете поетапно публикуваните байтове (препоръчително): `npm stage download <id>`, след което инсталирайте
   изтегления tarball във временен префикс и го стартирайте (`npm run check:pack-boot` автоматизира
   същата проверка пакетиране→инсталиране→стартиране в CI).
3. `npm stage approve <id>` — подканата за 2FA Е самото публикуване. `npm stage reject <id>` отхвърля съдържанието.
4. Предпазна мрежа след публикуване: проверяващият механизъм след публикуване (WS1.4 от плана за v3.8.49) инсталира
   публикуваната версия от публичния регистър в чист контейнер и я стартира.

**Авариен резервен вариант:** `workflow_dispatch` с `publish_mode=direct` възстановява
наследеното незабавно `npm publish` (използвайте го само ако самото поетапно публикуване не работи правилно; запишете причината).

**Еднократно подсилване на сигурността (собственик, npmjs.com):** конфигурирайте Trusted Publisher за
`omniroute` в режим само за поетапно публикуване, така че изтекъл дългосрочен токен да не може да изпълни `npm publish`
директно от никъде — CI може само да подготвя изданието; единствено 2FA на собственика го публикува.

**Процедура при повреден артефакт (без промяна):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
като стандартна първа реакция (отнема минути и е обратима); `npm unpublish` само в рамките на прозореца от 72 часа/без зависими пакети
и никога като първа стъпка. Docker: никога не презаписвайте етикет на версия — връщането назад означава
пренасочване на `latest` към последния изправен digest.

**Docker Hub `latest` (задължително при всяко публикуване на стабилна SemVer версия):**
работният процес `docker-publish` трябва да маркира **едновременно** `X.Y.Z` и, когато
`should-promote-latest.sh` потвърди, че това е най-високата стабилна SemVer версия, `:latest`
със **същия digest**. След задачата: digest на `latest` в Hub трябва да е равен на digest на новата
SemVer версия, а `last_updated` трябва да е актуализиран. Не оставяйте `:latest` да сочи към по-стара
компилация, докато бележките по изданието описват корекции, които съществуват само в git. Бързите
настройки с Compose използват `:latest`; GitOps трябва да продължи да фиксира `X.Y.Z`. Вижте
[Канали за издания на Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Бърза писта за спешни корекции (етикет `hotfix`)

PR с етикет `hotfix` пропуска тежката CI матрица (E2E с 9 сегмента, праг за покритие,
quality-gate, quality-extended) и запазва бързите проверки с висока сигнална стойност: компилация,
сегменти от модулни тестове, интеграционни тестове, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и проверката за стартиране от tarball (`check:pack-boot`). Цел: успешно завършване за ≤15 мин вместо ~33 мин.

**Правила за допускане — изискват се и четирите (по модела на аварийните писти на Chromium/VS Code/Node):**

1. **Сериозност**: продукционната среда не работи — публикуван артефакт се срива при стартиране /
   корекция по сигурността / всеки потребител на изданието е засегнат. „Важно“ не означава „неработещо“.
2. **Правомощия**: само собственикът на хранилището поставя етикета `hotfix`. Етикетът Е
   одобрението — никога не го поставяйте сами на PR от кампания.
3. **Доказателства**: описанието на PR съдържа връзка към предишното напълно успешно изпълнение на тежките проверки (пакета,
   който пропуснатите задачи биха валидирали повторно), както и към собствения тест на корекцията, който първо е неуспешен, а след това успешен.
4. **Обхват**: само cherry-pick — минималната корекция, без рефакториране и без съпътстващи промени.

Пропуснатите проверки за покритие/праг се валидират повторно при следващото пълно изпълнение в
клона на изданието (непрекъснато успешно състояние на изданието) — пистата пропуска ИЗЧАКВАНЕТО, но никога валидирането.
Промени само в тестове (всички файлове са в `tests/`, нито един не е в `tests/e2e/`) пропускат E2E
матрицата автоматично, без никакъв етикет.

## Подробен контролен списък

### Преди изданието

- [ ] Всички PR-и, предназначени за това издание, са слети в `release/vX.Y.0`
- [ ] Всички отворени елементи в Linear/системата за задачи за тази версия са затворени или преместени към следващия етап
- [ ] CI е успешен в клона `release/vX.Y.0`
- [ ] Няма маркери `TODO(release)` в кода: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовият Docker образ е актуален (в момента `node:24.15.0-trixie-slim`)

### Версия и регистър на промените

- [ ] Изпълнете `/version-bump-cc <patch|minor|major>` (умение на Claude Code)
  - Актуализира версиите в `package.json`, `electron/package.json`
  - Генерира отново `CHANGELOG.md` от git комитите след последния таг
  - Актуализира значките в README.md
- [ ] Прегледайте ръчно CHANGELOG.md и при нужда изчистете съобщенията на комитите
- [ ] Уверете се, че най-новият semver раздел в `CHANGELOG.md` съответства на версията в `package.json`
- [ ] Запазете `## [Unreleased]` като първи раздел в регистъра на промените за предстоящата работа
- [ ] Актуализирайте `docs/openapi.yaml` → `info.version` трябва да съответства на версията в `package.json`

### Качество на кода

- [ ] `npm run lint` — 0 грешки (предупрежденията са съществували предварително)
- [ ] `npm run typecheck:core` — без проблеми
- [ ] `npm run typecheck:noimplicit:core` — без проблеми (строг режим)
- [ ] `npm run check:cycles` — няма циклични зависимости
- [ ] `npm run check:any-budget:t11` — в рамките на бюджета
- [ ] `npm run check:route-validation:t06` — без проблеми
- [ ] `npm run check:node-runtime` — спазена е минималната поддържана версия на средата за изпълнение (`>=22.22.2 <23`, `>=24.0.0 <27`, съгласно `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; съгласувано с `engines` в `package.json`)

### Тестване

- [ ] `npm run test:unit` — успешно
- [ ] `npm run test:vitest` — успешно (MCP сървър, autoCombo, кеш)
- [ ] `npm run test:coverage` — изпълнен праг 60/60/60/60 (изрази/редове/функции/разклонения)
- [ ] `npm run test:integration` — успешно (ако промените засягат БД / обработчици)
- [ ] `npm run test:combo:matrix` — успешно (матрица от комбинирани стратегии: доказва детерминистично решенията за избор на всичките 19 публични стратегии за маршрутизиране; изпълнява се при промени в комбинираното маршрутизиране, разрешаването на стратегии или резервната логика)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **незадължително/ръчно** (условна smoke проверка с реални външни услуги; зарежда моментна снимка на БД само за четене от VPS `root@192.168.0.15`; използва реални доставчици, изразходва кредити; никога не се изпълнява в CI; пропуска се безпроблемно без условието)
- [ ] `npm run test:combo:live:vps` — **незадължително/ръчно** (VPS smoke проверка на живо от фаза 3: 7 HTTP сценария срещу работещия сървър `.15` чрез чист Node ESM; изисква `ssh root@192.168.0.15`; създава/изтрива само комбинации `__live_test__*`; използва реални доставчици; никога не се изпълнява в CI)
- [ ] `npm run test:e2e` — успешно (промени в потребителския интерфейс)
- [ ] `npm run test:protocols:e2e` — успешно (промени в MCP/A2A)
- [ ] `npm run test:ecosystem` — успешно

### Hooks (проверени чрез Husky)

Husky hooks се намират в `.husky/` и се изпълняват автоматично при git операции.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** бързи детерминистични проверки — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активирани на 2026-06-13). Умишлено изключва `test:unit` (бавен; покрива се от CI задачата `test-unit`).
  - Изпълнете `npm run test:unit` ръчно, преди да изпратите клонове на издания.

Ако hook е неуспешен: коригирайте основния проблем, не го заобикаляйте с `--no-verify`.

### Conventional Commits

Всички комити, предназначени за изданието, трябва да следват формата `type(scope): subject`.

**Валидни типове:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Валидни обхвати:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Несъвместими промени: добавете долен колонтитул `BREAKING CHANGE:` или `!` след обхвата (напр. `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` преминава успешно (стартира се автоматично от pre-commit)
- [ ] `npm run check:docs-all` преминава успешно (обща проверка: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завършва с код 0 — договорът за променливите на средата между кода ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` е запазен
- [ ] `npm run check:doc-links` завършва с код 0 — няма невалидни вътрешни препратки в markdown след преструктурирането
- [ ] `docs/architecture/ARCHITECTURE.md` е прегледан за разминавания в съхранението/средата за изпълнение
- [ ] `docs/guides/TROUBLESHOOTING.md` е прегледан за разминавания в променливите на средата и оперативните процедури
- [ ] Ако `.env.example` е променен: `docs/reference/ENVIRONMENT.md` е актуализиран
- [ ] Ако новата функционалност има потребителски интерфейс: тя е спомената в `docs/guides/USER_GUIDE.md`
- [ ] Ако новата функционалност има API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` са актуализирани
- [ ] Ако новата функционалност е модул: съществува отделен `docs/<MODULE>.md`
- [ ] Ако има несъвместима промяна: `docs/guides/TROUBLESHOOTING.md` съдържа бележка за миграция

### i18n

- [ ] `npm run i18n:check` завършва с код 0 — състоянието на преводите (`.i18n-state.json`) е синхронизирано с изходната документация (няма отклонили се източници в строг режим; предупрежденията в режим warn са приемливи за промени в документацията в последния момент, но резултатът трябва да е 0 преди създаване на етикет)
- [ ] `npm run i18n:check-ui-coverage` завършва с код 0 — всеки език на потребителския интерфейс покрива или надвишава минималния праг от 80%
- [ ] `npm run i18n:sync-ui:dry` отчита 0 липсващи ключа във всички 42 езикови конфигурации
- [ ] Ако изходната документация на английски език е променена, изпълнете `npm run i18n:run` (изисква `OMNIROUTE_TRANSLATION_API_KEY` в `.env`) преди създаване на етикет
- [ ] Приносите към преводите могат да бъдат отложени за следващата версия, ако са незначителни (проследете ги в CHANGELOG)

### Миграции на базата данни

- [ ] Ако `src/lib/db/migrations/` съдържа нови файлове:
  - [ ] Всяка миграция е идемпотентна (`CREATE TABLE IF NOT EXISTS` и т.н.)
  - [ ] Миграциите са обвити в транзакции
  - [ ] Номерирани са правилно (без пропуски в последователността)
- [ ] Тествайте при чиста инсталация: изтрийте `~/.omniroute/omniroute.db` и изпълнете `npm run dev`
- [ ] Тествайте при съществуваща инсталация: архивирайте базата данни, изпълнете миграцията и проверете схемата
- [ ] WAL файловете (`-wal`, `-shm`) се обработват правилно, ако миграцията презаписва таблици

### Каталог на доставчиците (валидиран чрез Zod)

- [ ] Zod схемата в `src/shared/constants/providers.ts` е валидна при зареждане
  - [ ] Всички доставчици имат задължителните полета (`id`, `label`, `kind` и т.н.)
  - [ ] За новите безплатни доставчици е зададено `freeNote`
  - [ ] OAuth доставчиците имат `oauthConfig`, регистриран в `src/lib/oauth/constants/oauth.ts`
- [ ] Ако е добавен нов доставчик: има съответстващ изпълнител в `open-sse/executors/`
- [ ] Ако форматът не е OpenAI: има преобразувател в `open-sse/translator/`
- [ ] Моделите са регистрирани в `open-sse/config/providerRegistry.ts`
- [ ] Модулните тестове в `tests/unit/` покриват класифицирането и маршрутизирането на доставчиците

### Настолно приложение (Electron)

Ако `electron/` е променена:

- [ ] `npm run electron:smoke:packaged` преминава успешно
- [ ] Компилациите са тествани за поне една от следните цели: `:win`, `:mac`, `:linux`
- [ ] Сертификатите за подписване на код не са изтекли (ако се използва подписване)
- [ ] Версията в `electron/package.json` съвпада с тази в основния `package.json`
- [ ] Указателят на канала за автоматично актуализиране е обновен, ако версията се публикува в `stable`

### Структура на компилацията

Хранилището използва три отделни изходни директории — никога не ги смесвайте:

| Директория | Предназначение                                                           | Проследява ли се?       |
| ---------- | ------------------------------------------------------------------------ | ----------------------- |
| `src/`     | Изходен код на приложението (TypeScript / TSX)                           | Да                      |
| `.build/`  | Междинни файлове от компилацията — резултат от `next build` (`distDir`)  | Не (игнорира се от git) |
| `dist/`    | Пакет за npm, готов за разпространение — сглобен от `assembleStandalone` | Не (игнорира се от git) |

> **Бележка за оператора:** директорията на образа в отдалечения VPS остава `/usr/lib/node_modules/omniroute/app/`.
> Преместен е само изходът от компилацията **в хранилището** (`app/` → `dist/`). Уменията за внедряване синхронизират чрез rsync
> съдържанието на `dist/` в отдалечената директория `app/` — не са необходими промени в пътищата на VPS.

**Поток с единична компилация:**

```
npm run build:release
  └─ rm -rf .build dist          (почистване)
  └─ next build → .build/next/   (междинни файлове)
  └─ assembleStandalone          (копира standalone + static + public + natives → dist/)
  └─ записва dist/BUILD_SHA       (контролен маркер за HEAD)
```

НЕ изпълнявайте `npm run build`, последвано от отделно `npm run build:cli`, за внедряване — използвайте
`npm run build:release`, което извършва чиста повторна компилация + създаване на контролен маркер с една команда.

### Валидиране на артефакта

- [ ] `npm run build:release` завършва успешно и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` не открива проблеми — няма `app.__qa_backup`, `scripts/scratch`, `package-lock.json` или други локални остатъчни файлове
- [ ] `dist/server.js` съществува след компилацията

### Създаване на етикет и издание

- [ ] Изпълнете `/generate-release-cc` (умение на Claude Code):
  - Създава етикет `vX.Y.Z`
  - Изпраща етикета и клона
  - Създава GitHub Release с описание от регистъра на промените
  - Прикачва инсталационните файлове на Electron (ако са създадени)
- [ ] Или ръчно:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Внедряване

Уменията за внедряване използват олекотения поток чрез rsync — без `npm pack`, без `npm i -g`:

- [ ] Използвайте умението за внедряване, което съответства на целта:
  - `/deploy-vps-local-cc` — локален VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — и двата
- [ ] Преди внедряване потвърдете, че `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Компилацията трябва да се изпълни там, където `node_modules` е реална директория (основното работно копие или worktree с изпълнено `npm ci` — НЕ worktree със символна връзка)
- [ ] Извършете базов тест на внедрения екземпляр:
  - Отворете `/dashboard/health` → проверете дали низът на версията съвпада с изданието
  - Изпълнете заявка към `/v1/chat/completions` чрез известен доставчик
  - Проверете дали `/api/monitoring/health` връща прекъсвачи на веригата със състояние `CLOSED`
  - Потвърдете, че MCP транспортите отговарят (`/mcp` HTTP, `/mcp-sse` SSE)

### След издаването

- [ ] Изпълнете `/capture-release-evidences-cc` (умение на Claude Code)
  - Заснема WebP екранни снимки/записи на новите функционалности
  - Прикачва ги към бележките по изданието / публикацията в блога
- [ ] Актуализирайте GitHub Discussions / Discord с обявление за изданието
- [ ] Отворете етап за следващата версия
- [ ] Ако е критично: закачете дискусията или публикувайте в `news.json` за банер в приложението

### Условия за публично стартиране на Radar

Обявлението за Radar умишлено е записано с `active: false`. Активирането е отделна
промяна, която се прави, след като има доказателства за всяка точка по-долу:

- [ ] Всички подредени един върху друг PR-и за Radar са слети и CI за върха на изданието е успешен
- [ ] Разположете и направете базова проверка на OSS маршрутите на Radar, като `RADAR_ENABLED` все още е изключено по подразбиране
- [ ] Направете базова проверка на `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на посочения хост на Radar
- [ ] Запишете самоличността/контактите/адреса на оператора и одобрения от собственика правен преглед в частната услуга
- [ ] Тествайте Stripe Checkout и подписания webhook само в тестов режим
- [ ] Тествайте едно криптирано изпращане на транзакционен имейл с одобрения подател/домейн
- [ ] Докажете възстановяване от резервно копие и едно наблюдавано изследователско изпълнение с ограничен бюджет
- [ ] Одобрете политиката за преглед на BRL/PIX, преди да приемате доказателства за дарения
- [ ] Активирайте публичния Checkout само след изпълнението на предходните условия, след което активирайте новия идентификатор в `news.json`
- [ ] Проверете дали банерът на началната страница използва локализиран текст и дали нов идентификатор се появява отново, след като по-стар идентификатор бъде отхвърлен

## Базова проверка на вградените услуги (v3.8.4+)

Преди публикуване на версия, която включва промени по вградените услуги, проверете:

### Стартиране с нова БД (открива конфликти между миграции — добавено след спешната корекция на v3.8.4)

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
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` визуализира собствения потребителски интерфейс на 9Router през проксито (без директен iframe към `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` връща `{ keyRotated: true }` и услугата се рестартира безпроблемно
- [ ] `POST /api/services/9router/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` връща SSE поток със събитие `snapshot`, съдържащо последните редове
- [ ] Инсталирането в среда без `npm` в PATH връща 500 с разбираемо съобщение за грешка (без проследяване на стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` връща 200 за по-малко от 2 min
- [ ] `POST /api/services/cliproxy/start` връща 200 и `state: "running"` за по-малко от 30 s
- [ ] `GET /api/services/cliproxy/status` отчита `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` връща SSE поток

### Регресия в сигурността

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` връща `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` връща `403 LOCAL_ONLY`
- [ ] Отговорите за грешки от `/api/services/*` не съдържат `err.stack` или абсолютни файлови пътища

## Проверки за v3.8.0+

Преди публикуване на която и да е версия v3.8.x проверете и следните елементи:

- [ ] `omniroute --tray` се стартира на macOS (systray2 е инсталиран в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се стартира на Linux (изисква DISPLAY; разбираема грешка, ако не е зададена)
- [ ] `omniroute --tray` се стартира на Windows (PowerShell NotifyIcon, без допълнителни двоични файлове)
- [ ] `omniroute config tray enable` създава запис за автоматично стартиране; деактивирането го премахва
- [ ] `npm install -g omniroute@<this-version>` изпълнява postinstall без фатално прекъсване
- [ ] При актуализиране се запазват незадължителните зависимости: `omniroute update --apply` и автоматичният инструмент за актуализиране
      изпълняват `npm install -g … --include=optional`, така че `optionalDependencies` (better-sqlite3,
      keytar, tls-client и SLM стекът на llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) да се запазят след актуализация. SLM нивото ultra с `modelPath` също изисква модела
      tinybert, който се изтегля автоматично в `${DATA_DIR}/models/llmlingua` при първото използване. След това postinstall
      (`scripts/build/colocateOptionals.mjs`) разполага незадължителните зависимости на SLM на едно място в
      `dist/node_modules`, така че worker процесът да зарежда ЕДИН ЕДИНСТВЕН екземпляр на `@huggingface/transformers` ^4.2.0
      — самостоятелното проследяване пакетира само transformers, но не и динамично импортираните
      незадължителни зависимости, така че без това worker процесът би заредил llmlingua-2 с transformers от основния пакет
      и SLM нивото би преминало неусетно към режим fail-open.
- [ ] `omniroute status` работи без `.env` (път чрез CLI токен, само през loopback)
- [ ] `curl http://localhost:20128/api/shutdown` връща 401 (маршрут, който винаги е защитен)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` връща 401 (защита за loopback)
- [ ] При първото стартиране SQLite runtime се разрешава като `bundled` (пакетираният двоичен файл е валиден за платформата)
- [ ] SQLite runtime преминава към `runtime`, когато `node_modules/better-sqlite3` бъде изтрита
- [ ] Интелигентният MCP филтър компресира реалния изход от `playwright-mcp browser_snapshot` (намаление с ≥50%)
- [ ] Всички 10 файла `skills/omniroute*/SKILL.md` са публично достъпни чрез необработен GitHub URL
- [ ] При първоначална настройка съветникът за въвеждане показва стъпката от обиколката на нивата „Как работи“
- [ ] Компонентът за покритие на нивата в началното табло показва броя на конфигурираните/активните нива

---

## Връщане към предишна версия

Ако изданието има критичен проблем:

1. `gh release edit vX.Y.Z --prerelease` (маркира го като непоследно)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (само ако все още не е възприето от потребителите)
3. Или: спешна корекция в `release/vX.Y.0` → коригиращо издание `vX.Y.(Z+1)`
4. Незабавно уведомете в GitHub Discussions и Discord

## Строги правила

- Никога не правете commit директно в `main`
- Никога не използвайте `git push --force` към `main` или клонове `release/*`
- Никога не пропускайте Husky hooks (`--no-verify`)
- Никога не добавяйте в commit тайни, идентификационни данни или `.env` файлове
- Покритието трябва да остане ≥60/60/60/60 (оператори/редове/функции/разклонения)
- Винаги включвайте или актуализирайте тестовете при промяна на продукционен код в `src/`, `open-sse/`, `electron/` или `bin/`

## Автоматизирана проверка за синхронизация

Изпълнете локално защитната проверка за синхронизация на документацията, преди да отворите PR:

```bash
npm run check:docs-sync
```

CI също изпълнява тази проверка в `.github/workflows/ci.yml` (задачата за lint).
