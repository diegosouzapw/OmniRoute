# Thinking Budget (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Панель керування:** Налаштування → **ШІ** → Бюджет міркувань  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Джерело:** `open-sse/services/thinkingBudget.ts`

Бюджет міркувань визначає, чи **перезаписує OmniRoute клієнтські параметри обмірковування/міркування** під час надсилання запитів постачальникам. Він **не** вмикає і не вимикає стиснення, маршрутизацію або кеш підказок.

## Режими

| Режим                      | Що робить OmniRoute                                                                                                   | Коли використовувати                                                                                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (типово) | Залишає клієнтські поля без змін (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` тощо). | **Codex / Desktop / будь-який клієнт, який має керувати інтенсивністю та підсумками міркувань.** Потрібно для видимих панелей міркувань, коли клієнт запитує `reasoning.summary`.               |
| **`auto`**                 | **Видаляє всі** поля обмірковування/міркування з тіла запиту перед надсиланням до постачальника.                      | Лише якщо ви навмисно хочете, щоб **постачальник** сам визначав типові значення, і вам **не** потрібне кероване клієнтом обмірковування. Це **не** означає «автоматично показувати міркування». |
| **`custom`**               | Перезаписує кожен запит, установлюючи фіксований бюджет токенів для обмірковування.                                   | Жорстке обмеження кількості токенів обмірковування для всього трафіку.                                                                                                                          |
| **`adaptive`**             | Масштабує бюджет від базової інтенсивності з урахуванням кількості повідомлень, інструментів і довжини підказки.      | Гнучке керування токенами без повного ігнорування намірів клієнта.                                                                                                                              |

### Що видаляє `auto`

Коли вибрано режим `auto`, `stripThinkingConfig()` видаляє, зокрема:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, а також `output_config.effort`, якщо воно наявне
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Якщо клієнт (наприклад, Codex Desktop) надіслав `reasoning: { effort: "ultra", summary: "detailed" }`, режим **auto видалить цей об’єкт**. Постачальник усе одно може нараховувати плату за деякі токени міркування, але часто повертає **порожні або лише зашифровані** елементи міркувань — тому інтерфейс не показує корисного потоку міркувань.

## Чим це **не є**

| Функція                                        | Взаємозв’язок                                                                                                                                                    |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Стиснення** (Caveman, RTK, stacked, …)       | Окремий конвеєр. Працює в кожному режимі бюджету міркувань.                                                                                                      |
| **Кеш підказок / семантичний кеш**             | Окрема функція. Режим бюджету міркувань на неї не впливає.                                                                                                       |
| **Комбінована маршрутизація / резерви**        | Окрема функція. Режим на неї не впливає.                                                                                                                         |
| **Ліміти токенів API-ключів / бюджети витрат** | Окрема функція. Режим на неї не впливає.                                                                                                                         |
| **Кеш відтворення міркувань**                  | Повторне додавання в багатораундовому режимі для суворих постачальників (DeepSeek, Kimi, Qwen-thinking, …). Це не те саме, що «показувати міркування» в Desktop. |
| **Розшифрування `encrypted_content`**          | **Неможливе.** Приватні блоки міркувань OpenAI/Codex непрозорі. OmniRoute ніколи їх не розшифровує (#7095 / #7176 / #7304).                                      |

## Видиме мислення (клієнти Codex / Responses)

Щоб клієнт показував текст міркувань, потрібні **всі** наведені нижче умови:

1. Режим Thinking Budget = **`passthrough`** (або custom/adaptive, який усе ще зберігає запити підсумків достатньо незмінними для шляху, який ви використовуєте).
2. Клієнт запитує підсумок, наприклад Codex `model_reasoning_summary = "detailed"` / `auto` (не `none`).
3. Висхідний сервіс фактично передає потоком `response.reasoning_summary_text.*` (або непорожній `reasoning.summary` в елементі).

Якщо ви отримуєте лише «зашифровані приватні міркування», це означає, що:

- використовувався режим **`auto`** (запит клієнта було видалено), або
- висхідний сервіс повернув `encrypted_content` без тексту підсумку (обмеження постачальника; OmniRoute може показати лише заповнювач, а не відкритий текст).

## Приклади API

```bash
# Читання
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Рекомендовано для видимості міркувань у Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Схема (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; необов’язкові `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Збереження / перезапуск

Значення зберігається під ключем налаштувань `thinkingBudget` і завантажується під час запуску процесу (`hydrateThinkingBudgetConfig`). Після зміни через БД або деякі шляхи поза API **перезапустіть процес OmniRoute**, щоб стан синглтона в пам’яті відповідав даним на диску.

## Контрольний список оператора

- [ ] Для користувачів Codex / Desktop: режим = **passthrough**
- [ ] Залиште стиснення ввімкненим, якщо хочете заощаджувати токени в **повідомленнях**, а не шляхом видалення міркувань
- [ ] Не очікуйте, що `auto` «показуватиме більше міркувань»
- [ ] Підсумки лише в зашифрованому вигляді — це поведінка **постачальника**; passthrough не може їх розшифрувати

## Пов’язана документація

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — кеш `reasoning_content` для багатораундових діалогів
- [USER_GUIDE.md](./USER_GUIDE.md) — вкладки панелі налаштувань
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — кінцеві точки налаштувань
