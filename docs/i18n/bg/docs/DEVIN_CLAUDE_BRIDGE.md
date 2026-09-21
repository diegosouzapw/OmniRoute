# Devin Claude Bridge (Български)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` позволява на реалната среда за изпълнение на Claude Code да използва локалната крайна точка на OmniRoute за Anthropic
Messages, докато официалният Devin CLI предоставя отговори от модела през ACP stdio. Той
не променя съществуващите доставчици Anthropic, Claude OAuth, Claude Web или `devin-cli`.

> **Текущо състояние: фиксирана версия на Claude Code `2.1.258`; последната записана офлайн
> проверка и проверка в реална среда са извършени с `2.1.220`.** Фиксираната версия `2.1.220` завърши три изолирани сценария чрез Devin CLI
> `3000.2.17` и модела `swe-1-7-lightning`; този последен тест в реална среда потвърди управлявани от клиента операции `Read`,
> `Edit` и `Bash`, успешни резултати от `npm test`, откриване на проектни команди и умения,
> маршрутизиране само към Devin и липса на изходящ трафик към Claude. След това фиксираната версия беше повишена до `2.1.258`
> (поколението на CLI, което идентичността на Claude в OmniRoute имитира, и първата линия, която включва
> вградена поддръжка за нивото Fable 5.1). С новата фиксирана версия инсталационният слой и `claude --version` бяха
> проверени върху фиксирания базов образ, а пакетът от модулни тестове на моста, `compose config` и
> статичното доказателство за изолация преминават успешно — но офлайн сценарият с имитация и пакетът
> от три сценария в реална среда все още не са изпълнени повторно. Изпълнете ги повторно (вижте „Обновяване на фиксираните инструменти“), преди да разчитате на
> моста с тази фиксирана версия.

## Архитектура

```text
Claude Code 2.1.258 (изолиран Linux контейнер без root права)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (доставчик във формат Claude, без удостоверяване)
  -> devin acp --agent-type summarizer (официален ACP stdio, без инструменти на Devin)
  -> акаунт в Devin в специализирания том devin-auth
```

Стандартният ACP агент на официалния CLI може да изпълнява свои собствени инструменти, затова този мост не го
използва. Той стартира фиксирания ACP агент `summarizer`, чийто официален CLI режим няма инструменти, и
оформя сериализираната Anthropic заявка като следа от изпълнението. Когато е необходимо друго действие,
управлявано от Claude, отговорът трябва да съдържа точно една клиентска обвивка за инструмент. Всеки ACP
`tool_call` или `tool_call_update` се отхвърля, преди отговорът да може да бъде отчетен като
успешен.

Сериализаторът в `open-sse/executors/devin-agentic/serializer.ts` запазва `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` и
инструментите, предоставени от Claude Code. Изображенията и неизвестните блокове предизвикват изрична грешка. Големите резултати от инструменти
използват видим маркер за съкращаване.

Парсерът приема една самостоятелна обвивка `<tool>{...}</tool>` за всеки ход на модела. Той проверява
името спрямо списъка с инструменти в заявката, валидира аргументите спрямо JSON Schema на съответния инструмент,
отхвърля смесването на описателен текст и действия и позволява една ограничена поправка. След това Claude Code
изпълнява получения Anthropic `tool_use` локално и изпраща `tool_result` обратно чрез
OmniRoute.

## Изолация и модел на заплахите

Инсталацията, акаунтът и конфигурацията на Claude на хоста са извън обхвата и се считат за
забранени. Услугите на Compose:

- работят като UID/GID `10001:10001`, с файлова система на основния дял само за четене, премахнати права и
  `no-new-privileges`;
- използват частна директория `/home/bridge`, специализиран том за конфигурацията на Claude, изолирани данни на OmniRoute
  и отделен том `devin-auth`;
- монтират само временни работни пространства/доказателства `.sandbox`;
- не монтират домашната директория на хоста, Keychain, SSH, идентификационни данни за облачни услуги или Docker socket;
- създават изрично зададени среди и премахват променливите за Anthropic API/OAuth/маршрутизиране;
- насочват извеждането на Claude Code само към `http://omniroute:20128` с ключ само за локална употреба.

Офлайн профилът използва вътрешна мрежа. В профила за реална среда OmniRoute достига
официалните крайни точки на Devin само чрез `network-guard`; несвързаните местоназначения се отказват.
Claude Code има отделна защита за забрана на целия изходящ трафик и може да достига само локалната услуга OmniRoute
чрез `NO_PROXY`. Одитните файлове на защитите се монтират само от съответния им защитен процес. Скриптовете
проверяват собствеността на файловете, режима, броя връзки и всяко решение, преди да експортират
доказателства без токени.

Изпълнете независимо доказателството за изолация:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

То валидира топологията, именуваните монтирания, настройките за работа без root права и само за четене, изричното локално маршрутизиране,
липсата на чувствителни променливи на средата, липсата на Docker socket, блокирания достъп до
`api.anthropic.com` и `claude.ai`, избора на доставчик само за Devin и изричната грешка, когато
ACP бекендът е недостъпен.

## Първоначална настройка и нормална употреба

Изградете фиксирания образ:

```bash
./scripts/devin-bridge/build
```

Удостоверете само изолирания том на Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Командата за вход използва официалния процес с ръчно въвеждане на токен, предназначен за отдалечени среди и среди с контейнери. Стойността се въвежда директно в подканата на CLI; тя не се предава като аргумент на процеса, не се записва в Git и не се копира от хоста.

Стартирайте изолираната среда за изпълнение на Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` проверява повторно изолацията, удостоверяването в Devin и откриването на модели, преди да стартира Claude Code в контейнер. Тя никога не изпълнява Claude от хоста. Псевдонимите на моделите могат да бъдат зададени в `.env.devin-bridge`; всяка конфигурирана стойност трябва да запазва префикса `devin-cli-agentic/`.

## Команди за валидиране

Възпроизводимият офлайн процес не изисква акаунт в Devin и няма достъп до интернет по време на изпълнение:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Удостовереният процес на живо с изрично включване е:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Изпълняващият модул за тестовете на живо изчаква между сценариите, за да избегне групово отваряне на ACP сесии, и валидира структурирани събития от потока на Claude, вместо да се доверява на текстови твърдения. Неговите три сценария доказват:

1. директно четене на проекта и анализ на дефекти;
2. реална операция `Edit`, притежавана от клиента операция `Bash` с `npm test` и краен резултат;
3. откриване чрез `/bridge-check` и `bridge-proof`, четене на проекта, още едно успешно, притежавано от клиента изпълнение на `npm test` и завършване без чакащи задачи.

Последната контролна проверка също проверява мрежовия одит на Devin и изисква одитът на изходящия трафик на Claude да остане празен.

## Актуализиране на фиксираните инструменти

Образът фиксира версиите на Node, Claude Code и Devin CLI в `docker/devin-bridge/Dockerfile`. За да ги актуализирате:

1. променете изрично зададените версии;
2. заменете контролните суми на архивите на Devin и за двете архитектури със стойностите за официалния артефакт;
3. изградете образа наново и изпълнете всяка офлайн команда за валидиране;
4. потвърдете версиите в образа;
5. изпълнете отново удостоверения пакет от три сценария на живо.

Не инсталирайте нито един от двата CLI глобално на хоста и не заменяйте проверката чрез контролна сума с непроверено изтегляне.

## Диагностика и почистване

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  показва локалното маршрутизиране и изчистените от чувствителни данни грешки на изпълняващия модул.
- `.sandbox/evidence/mock-acp.jsonl` записва детерминирани фиктивни ACP действия.
- `.sandbox/evidence/claude-stream.jsonl` записва реалното офлайн изпълнение на Claude Code.
- `.sandbox/evidence/live-*.jsonl` записва трите валидирани потока на живо.
- `.sandbox/evidence/egress.jsonl` и `.sandbox/evidence/claude-egress.jsonl` са валидирани копия на одитите на защитните механизми без токени.

Спрете притежаваните контейнери и мрежи, като запазите томовете за вход и конфигурация:

```bash
./scripts/devin-bridge/clean
```

Премахнете цялата среда, притежавана от моста, включително именуваните томове:

```bash
./scripts/devin-bridge/clean --all
```

## Ограничения

- Мостът разчита на фиксираната роля `summarizer` без инструменти, тъй като Devin CLI `3000.2.17`
  не предоставя неутрален ACP агент без инструменти. Адаптерът компенсира междинните отговори
  във формат на резюме, но една ограничена корекция все пак може изрично да се провали.
- ACP повикванията в реално време могат да върнат временни отговори `502`/`504`. Тестовият механизъм
  разпределя сценариите във времето; постоянната грешка запазва затворения режим при отказ и никога
  не избира друг доставчик.
- ACP контекстът се реконструира от всяка Anthropic заявка; няма обвързване с процес или сесия.
- Поддържа се едно извикване на инструмент за всеки отговор на модела; паралелните извиквания се отхвърлят.
- Изображенията изрично не се поддържат. Не се обявява поддръжка за визуални възможности, изходни данни
  от процеса на мислене, контроли за нивото на усилие и контекстен прозорец от 1M.
- SSE използва валидни събития от жизнения цикъл на Anthropic, но те се изпращат след събирането
  на ограничения ACP ход; ACP фрагментите не се препращат поетапно.
