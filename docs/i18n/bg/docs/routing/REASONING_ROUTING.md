# Reasoning Routing (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Правилата за маршрутизиране на разсъжденията разширяват съществуващото маршрутизиране по модел и комбинация. Когато няма съвпадащо активно правило,
съществуващото поведение за мислене, суфикс, стойности по подразбиране на връзката и преобразуване от доставчика остава
непроменено.

## Управление

Управлението на правилата е достъпно от **Настройки → Глобално маршрутизиране**. Редакторът на API ключове предоставя
същия интерфейс за управление, филтриран за избрания ключ.

API за управление е достъпен чрез следните маршрути:

- `GET` и `POST` на `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` и `DELETE` на `/api/settings/reasoning-routing-rules/[id]`
- `POST` на `/api/settings/reasoning-routing-rules/simulate`

Всички маршрути използват `requireManagementAuth`. Входните данни се валидират чрез схемите в
`src/shared/validation/schemas/reasoningRouting.ts`. Симулаторът никога не извършва заявка към услуга нагоре по веригата.

## Разрешаване на правила

Ранното оценяване избира точно едно правило. Обхватите се проверяват в следния ред:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

В рамките на даден обхват първо печели по-високият `priority`, последван от точно съвпадение на модела пред glob шаблон,
а след това от стабилното подреждане по `createdAt` и `id`. `requestTags` се четат изключително от `metadata.tags`
и поддържат съвпадение по `any` или `all`.

Правило за `connection` се оценява само когато няма избрано ранно правило и вече е избрана конкретна връзка с доставчик.
То може да променя само усилието и бюджета.

## Усилие и бюджет

`sourceEffort` приема `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` и
`ultra`. `missing` означава, че заявката не съдържа нито дискретно ниво на усилие, нито превключвател за мислене,
нито бюджет за мислене. Следователно сигнал само с бюджет се съпоставя единствено чрез `any`.

`effortMode` има три варианта:

- `inherit` запазва зададеното от клиента усилие, като същевременно позволява промяна на модела или комбинацията.
- `default` задава `targetEffort` само когато няма изрично зададен сигнал за разсъждение.
- `force` заменя дискретното усилие с `targetEffort`.

Независимо от това, `budgetAction` може да бъде `preserve`, `remove` или `set`. `force` с `none` премахва
всички разпознати полета за усилие и бюджет. Комбинацията от `none` и `set` е невалидна.

Заявките към известни несъвместими модели се отхвърлят преди заявката нагоре по веригата. При цели от тип комбинация
несъвместимите записи се премахват; ако не остане нито един, заявката връща статус `400`.
Неизвестни данни за възможностите водят до предупреждение, а правилото остава активно.

## Сигурност и транспорти

Моделът източник и целевият модел или комбинацията източник и целевата комбинация остават предмет на съществуващата политика за API ключове.
Правило за разсъждение никога не разширява разрешенията за модели, комбинации или квоти.

Механизмът е интегриран в Chat Completions, Responses, Anthropic Messages и вътрешния
Codex WebSocket път. WebSocket пътят приема само целеви модели на Codex; цели от тип комбинация не могат да бъдат
изпълнявани там. Решението на правилото се съхранява в съществуващата проследяваща информация за маршрута без поверителни данни.

## Съхранение

Миграцията `src/lib/db/migrations/126_reasoning_routing_rules.sql` създава таблицата
`reasoning_routing_rules`. Правилата препращат към съхранени API ключове, комбинации и връзки с доставчици.
При изтриване свързаните правила се почистват. Слоят за достъп до базата данни в
`src/lib/db/reasoningRoutingRules.ts` поддържа кеш за пътя на заявката, който може да бъде инвалидизиран.

Правилата са включени в резервните копия на SQLite, пълния експорт на базата данни и пакета за синхронизиране на конфигурацията.
`reconcileReasoningRulesForSync` деактивира импортираните правила с липсващи препратки и отчита тези
конфликти.
