# Thinking Budget (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Табло:** Настройки → **ИИ** → Бюджет за разсъждение  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Изходен код:** `open-sse/services/thinkingBudget.ts`

Бюджетът за разсъждение определя дали OmniRoute **пренаписва клиентските параметри за мисловен процес/разсъждение** по пътя към доставчиците. Той **не** включва или изключва компресирането, маршрутизирането или кеша на подканите.

## Режими

| Режим                               | Какво прави OmniRoute                                                                                                             | Кога да се използва                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (по подразбиране) | Оставя клиентските полета непроменени (`reasoning`, `reasoning_effort`, `thinking` на Claude, `thinking_config` на Gemini и др.). | **Codex / Desktop / всеки клиент, който трябва да управлява усилието + резюметата на разсъжденията.** Задължително за видими панели за мисловния процес, когато клиентът заявява `reasoning.summary`.           |
| **`auto`**                          | **Премахва всички** полета за мисловен процес/разсъждение от тялото на заявката, преди тя да бъде изпратена нагоре по веригата.   | Само когато умишлено искате **доставчикът** да определи стойностите по подразбиране и **не** се нуждаете от управляван от клиента мисловен процес. **Не** означава „автоматично показване на мисловния процес“. |
| **`custom`**                        | Презаписва всяка заявка с фиксиран бюджет от токени за мисловния процес.                                                          | Твърдо ограничение на токените за мисловния процес за целия трафик.                                                                                                                                             |
| **`adaptive`**                      | Мащабира бюджета въз основа на базово усилие, като използва броя на съобщенията, инструментите и дължината на подканата.          | Гъвкав контрол на токените без пълно премахване на намерението на клиента.                                                                                                                                      |

### Какво премахва `auto`

Когато режимът е `auto`, `stripThinkingConfig()` изтрива (наред с други):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` и `output_config.effort`, когато присъства
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ако клиент (напр. Codex Desktop) е изпратил `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` премахва този обект**. Системата нагоре по веригата все още може да таксува някои токени за разсъждение, но често връща **празни или само криптирани** елементи за разсъждение — затова потребителският интерфейс не показва полезен поток на мисловния процес.

## Какво **не** е това

| Функция                                                       | Връзка                                                                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Компресиране** (Caveman, RTK, stacked, …)                   | Отделен конвейер. Работи при всеки режим на бюджета за разсъждение.                                                                                           |
| **Кеш на подкани / семантичен кеш**                           | Отделна функционалност. Не се влияе от режима на бюджета за разсъждение.                                                                                      |
| **Комбинирано маршрутизиране / резервни варианти**            | Отделна функционалност. Не се влияе.                                                                                                                          |
| **Ограничения за токени на API ключове / бюджети за разходи** | Отделна функционалност. Не се влияе.                                                                                                                          |
| **Кеш за повторно възпроизвеждане на разсъждения**            | Повторно вмъкване при множество ходове за стриктни доставчици (DeepSeek, Kimi, Qwen-thinking, …). Не е същото като „показване на мисловния процес“ в Desktop. |
| **Декриптиране на `encrypted_content`**                       | **Невъзможно.** Частните криптирани обекти за разсъждение на OpenAI/Codex са непрозрачни. OmniRoute никога не ги декриптира (#7095 / #7176 / #7304).          |

## Видимо мислене (клиенти Codex / Responses)

За да може клиент да показва текста на разсъжденията, са необходими **всички** от следните условия:

1. Режимът Thinking Budget = **`passthrough`** (или custom/adaptive, който все пак запазва заявките за обобщение достатъчно непроменени за използвания от вас път).
2. Клиентът заявява обобщение, напр. Codex `model_reasoning_summary = "detailed"` / `auto` (не `none`).
3. Услугата нагоре по веригата действително поточно предава `response.reasoning_summary_text.*` (или непразно `reasoning.summary` в елемента).

Ако получавате само „криптирани частни разсъждения“, причината е една от следните:

- режимът е бил **`auto`** (заявката на клиента е била премахната), или
- услугата нагоре по веригата е върнала `encrypted_content` без текст на обобщението (ограничение на доставчика; OmniRoute може да покаже само заместващ текст, а не некриптиран текст).

## Примери за API

```bash
# Прочитане
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Препоръчително за видимост на разсъжденията в Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Схема (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; незадължителни `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Устойчивост / рестартиране

Стойността се съхранява под ключа за настройки `thinkingBudget` и се зарежда при стартиране на процеса (`hydrateThinkingBudgetConfig`). След промяна чрез базата данни или по някои пътища, които не използват API, **рестартирайте процеса OmniRoute**, така че сингълтънът в паметта да съответства на стойността на диска.

## Контролен списък за оператора

- [ ] Потребители на Codex / Desktop: режим = **passthrough**
- [ ] Компресията остава активирана, ако искате да пестите токени при **съобщенията**, а не чрез премахване на разсъжденията
- [ ] Не очаквайте `auto` да „показва повече разсъждения“
- [ ] Обобщенията само в криптиран вид са поведение на **доставчика**; passthrough не може да ги декриптира

## Свързана документация

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — кеш на `reasoning_content` за разговори с няколко хода
- [USER_GUIDE.md](./USER_GUIDE.md) — раздели на таблото за настройки
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — крайни точки за настройки
