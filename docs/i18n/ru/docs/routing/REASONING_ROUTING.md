# Reasoning Routing (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Правила маршрутизации рассуждений расширяют существующую маршрутизацию моделей и комбинаций. Если ни одно активное правило не совпадает, существующее поведение, связанное с рассуждением, суффиксами, настройками соединения по умолчанию и преобразованиями провайдера, остаётся без изменений.

## Управление

Управление правилами доступно в разделе **Настройки → Глобальная маршрутизация**. Редактор API-ключей предоставляет тот же интерфейс управления, отфильтрованный по выбранному ключу.

API управления доступен через следующие маршруты:

- `GET` и `POST` по адресу `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` и `DELETE` по адресу `/api/settings/reasoning-routing-rules/[id]`
- `POST` по адресу `/api/settings/reasoning-routing-rules/simulate`

Все маршруты используют `requireManagementAuth`. Входные данные проверяются с помощью схем из `src/shared/validation/schemas/reasoningRouting.ts`. Симулятор никогда не выполняет вызов вышестоящего сервиса.

## Разрешение правил

На раннем этапе оценки выбирается ровно одно правило. Области действия проверяются в следующем порядке:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

В пределах области действия сначала побеждает правило с более высоким `priority`, затем точное совпадение модели имеет приоритет над glob-шаблоном, после чего применяется стабильная сортировка по `createdAt` и `id`. `requestTags` считываются исключительно из `metadata.tags` и поддерживают сопоставление по принципу `any` или `all`.

Правило `connection` оценивается только в том случае, если ни одно правило не победило на раннем этапе и уже выбрано конкретное соединение с провайдером. Оно может изменять только уровень усилий и бюджет.

## Уровень усилий и бюджет

`sourceEffort` принимает значения `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` и `ultra`. `missing` означает, что запрос не содержит ни дискретного уровня усилий, ни переключателя рассуждений, ни бюджета рассуждений. Поэтому сигнал, содержащий только бюджет, соответствует исключительно значению `any`.

`effortMode` имеет три варианта:

- `inherit` сохраняет заданный клиентом уровень усилий, но по-прежнему позволяет изменить модель или комбинацию.
- `default` устанавливает `targetEffort` только при отсутствии явно заданного сигнала рассуждений.
- `force` заменяет дискретный уровень усилий значением `targetEffort`.

Независимо от этого `budgetAction` может иметь значение `preserve`, `remove` или `set`. Сочетание `force` со значением `none` удаляет все распознаваемые поля уровня усилий и бюджета. Сочетание `none` с `set` недопустимо.

Запросы, направленные к моделям с известной несовместимостью, отклоняются до вызова вышестоящего сервиса. Для целевых комбинаций несовместимые элементы удаляются; если после этого не остаётся ни одного элемента, запрос возвращает статус `400`. Если данные о возможностях неизвестны, формируется предупреждение, а правило остаётся активным.

## Безопасность и транспорты

Исходная и целевая модель либо исходная и целевая комбинация по-прежнему подчиняются существующей политике API-ключей. Правило рассуждений никогда не расширяет разрешения на модели, комбинации или квоты.

Механизм интегрирован в Chat Completions, Responses, Anthropic Messages и внутренний WebSocket-маршрут Codex. WebSocket-маршрут принимает в качестве целевых только модели Codex; целевые комбинации через него не выполняются. Решение правила сохраняется без секретных данных в существующей трассировке маршрута.

## Хранение данных

Миграция `src/lib/db/migrations/126_reasoning_routing_rules.sql` создаёт таблицу `reasoning_routing_rules`. Правила ссылаются на сохранённые API-ключи, комбинации и соединения с провайдерами. При удалении связанных объектов соответствующие правила очищаются. Слой доступа к базе данных в `src/lib/db/reasoningRoutingRules.ts` поддерживает инвалидируемый кеш для пути обработки запросов.

Правила включаются в резервные копии SQLite, полный экспорт базы данных и пакет синхронизации конфигурации. `reconcileReasoningRulesForSync` отключает импортированные правила с отсутствующими ссылками и сообщает о таких конфликтах.
