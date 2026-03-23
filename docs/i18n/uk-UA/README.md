<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — безкоштовний ШІ-шлюз

### Ніколи не припиняйте кодувати. Розумна маршрутизація до **БЕЗКОШТОВНИХ і недорогих моделей штучного інтелекту** з автоматичним резервним копіюванням.

_Ваш універсальний API-проксі — одна кінцева точка, понад 36 провайдерів, нуль простоїв._

**Завершення чату • Вбудовування • Генерація зображень • Аудіо • Реранжування • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Безкоштовний постачальник AI для ваших улюблених агентів кодування

_Підключіть будь-який інструмент IDE або CLI на основі штучного інтелекту через OmniRoute — безкоштовний шлюз API для необмеженого програмування._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Усі агенти підключаються через <code>http://localhost:20128/v1</code> або <code>http://cloud.omniroute.online/v1</code> — одна конфігурація, необмежена кількість моделей і квота</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Чому OmniRoute?

**Припиніть витрачати гроші та досягати лімітів:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Квота підписки закінчується без використання кожного місяця
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Обмеження швидкості перешкоджають кодуванню в середині
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Дорогі API ($20-50/місяць за постачальника)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ручне перемикання між провайдерами

**OmniRoute вирішує цю проблему:**

- ✅ **Збільште кількість підписок** - Відстежуйте квоту, використовуйте кожен біт перед скиданням
- ✅ **Автоматичний резерв** - Підписка → Ключ API → Дешево → Безкоштовно, без простоїв
- ✅ **Кілька облікових записів** - Циклічний цикл між обліковими записами кожного постачальника
- ✅ **Універсальний** - Працює з Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, будь-яким інструментом CLI

---

## 📧 Підтримка

> 💬 **Приєднуйтесь до нашої спільноти!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — отримуйте допомогу, діліться порадами та будьте в курсі подій.

- **Веб-сайт**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Оригінальний проект**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Як це працює

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Що вирішує OmniRoute — 30 реальних проблем і варіантів використання

> **Кожен розробник, який використовує інструменти штучного інтелекту, щодня стикається з цими проблемами.** OmniRoute було створено, щоб вирішити їх усі — від перевитрати коштів до регіональних блокувань, від порушених потоків OAuth до операцій протоколу та спостережуваності підприємства.

<details>
<summary><b>💸 1. «Я плачу за дорогу підписку, але мене все одно переривають через обмеження» </b></summary>

Розробники платять 20–200 доларів на місяць за Claude Pro, Codex Pro або GitHub Copilot. Навіть якщо платити, квота має максимальну межу — 5 годин використання, тижневі ліміти або ліміти за хвилину. У середині сеансу кодування постачальник перестає відповідати, а розробник втрачає швидкість і продуктивність.

**Як це вирішує OmniRoute:**

- **Smart 4-Tier Fallback** — якщо квота підписки закінчується, автоматично перенаправляється до API Key → Дешево → Безкоштовно без ручного втручання
- **Відстеження квот у реальному часі** — показує споживання токенів у реальному часі зі зворотним відліком скидання (5 годин, щодня, щотижня)
- **Підтримка кількох облікових записів** — кілька облікових записів у кожного постачальника з автоматичним циклічним перебором — коли один закінчується, перемикається на наступний
- **Користувацькі комбінації** — резервні ланцюжки, які можна налаштувати, із 6 стратегіями балансування (спочатку заповнення, циклічний, P2C, випадковий, найменш використовуваний, економічно оптимізований)
- **Бізнес-квоти Codex** — Моніторинг квот робочого простору бізнесу/команди безпосередньо на інформаційній панелі

</details>

<details>
<summary><b>🔌 2. «Мені потрібно використовувати кілька постачальників, але кожен має різний API» </b></summary>

OpenAI використовує один формат, Claude (Anthropic) використовує інший, Gemini ще інший. Якщо розробник хоче перевірити моделі від різних постачальників або повернутися до них, йому потрібно переналаштувати SDK, змінити кінцеві точки, мати справу з несумісними форматами. Спеціальні постачальники (FriendLI, NIM) мають нестандартні кінцеві точки моделі.

**Як це вирішує OmniRoute:**

- **Уніфікована кінцева точка** — один `http://localhost:20128/v1` служить проксі для всіх 36+ постачальників
- **Переклад форматів** — автоматичний і прозорий: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — видаляє нестандартні поля (`x_groq`, `usage_breakdown`, `service_tier`), які порушують роботу OpenAI SDK v1.83+
- **Нормалізація ролі** — перетворює `developer` → `system` для постачальників, які не є OpenAI; `system` → `user` для GLM/ERNIE
- **Think Tag Extraction** — витягує блоки `<think>` із таких моделей, як DeepSeek R1, у стандартизований `reasoning_content`
- **Структурований вихід для Gemini** — `json_schema` → `responseMimeType`/`responseSchema` автоматичне перетворення
- **`stream` за замовчуванням — `false`** — відповідає специфікації OpenAI, уникаючи неочікуваних SSE у Python/Rust/Go SDK.

</details>

<details>
<summary><b>🌐 3. «Мій постачальник штучного інтелекту блокує мій регіон/країну» </b></summary>

Такі постачальники, як OpenAI/Codex, блокують доступ із певних географічних регіонів. Користувачі отримують помилки на зразок `unsupported_country_region_territory` під час з’єднань OAuth і API. Це особливо засмучує розробників із країн, що розвиваються.

**Як це вирішує OmniRoute:**

- **3-рівнева конфігурація проксі-сервера** — налаштовується проксі-сервер на 3 рівнях: глобальний (увесь трафік), для кожного постачальника (лише один постачальник) і для кожного підключення/ключа
- **Значки проксі-сервера з кольоровим кодуванням** — Візуальні індикатори: 🟢 глобальний проксі, 🟡 проксі-сервер постачальника, 🔵 проксі-сервер підключення, завжди показує IP-адресу
- **Обмін маркерами OAuth через проксі** — потік OAuth також проходить через проксі, вирішуючи `unsupported_country_region_territory`
- **Тестування з’єднання через проксі** — тестування з’єднання використовує налаштований проксі (без прямого обходу)
- **Підтримка SOCKS5** — повна підтримка проксі SOCKS5 для вихідної маршрутизації
- **TLS Fingerprint Spoofing** — TLS-відбиток, як у браузері, через `wreq-js` для обходу виявлення ботів

</details>

<details>
<summary><b>🆓 4. «Я хочу використовувати ШІ для кодування, але в мене немає грошей» </b></summary>

Не кожен може платити 20–200 доларів на місяць за підписку на AI. Студентам, розробникам із країн, що розвиваються, любителям і фрілансерам потрібен доступ до якісних моделей за нульовою ціною.

**Як це вирішує OmniRoute:**

- **Вбудовані безкоштовні постачальники рівня** — Вбудована підтримка 100% безкоштовних постачальників: iFlow (8 необмежених моделей), Qwen (3 необмежені моделі), Kiro (Claude безкоштовно), Gemini CLI (180K/місяць безкоштовно)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Безкоштовні комбінації** — ланцюжок `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 доларів США/місяць без простоїв
- **Безкоштовні кредити NVIDIA NIM** — інтегровано 1000 безкоштовних кредитів
- **Стратегія оптимізації витрат** — стратегія маршрутизації, яка автоматично вибирає найдешевшого доступного постачальника

</details>

<details>
<summary><b>🔒 5. «Мені потрібно захистити свій ШІ-шлюз від несанкціонованого доступу» </b></summary>

Коли шлюз штучного інтелекту надається мережі (LAN, VPS, Docker), будь-хто, хто має адресу, може використовувати токени/квоту розробника. Без захисту API вразливі до неправильного використання, швидкого впровадження та зловживання.

**Як це вирішує OmniRoute:**

- **Керування ключами API** — генерація, ротація та визначення обсягу для кожного постачальника за допомогою спеціальної сторінки `/dashboard/api-manager`
- **Дозволи на рівні моделі** — обмежте ключі API певними моделями (`openai/*`, шаблони узагальнення) із перемикачем «Дозволити все»/«Обмежити»
- **API Endpoint Protection** — вимагати ключ для `/v1/models` і блокувати певних постачальників зі списку
- **Auth Guard + CSRF Protection** — усі маршрути інформаційної панелі захищені проміжним програмним забезпеченням `withAuth` + маркерами CSRF
- **Обмежувач швидкості** — обмеження швидкості за IP-адресою з настроюваними вікнами
- **IP Filtering** — список дозволених/чорних адрес для контролю доступу
- **Prompt Injection Guard** — очищення від шкідливих шаблонів підказок
- **Шифрування AES-256-GCM** — облікові дані зашифровані в стані спокою

</details>

<details>
<summary><b>🛑 6. «Мій постачальник не працює, і я втратив потік кодування» </b></summary>

Постачальники AI можуть стати нестабільними, повертати помилки 5xx або досягати тимчасових обмежень швидкості. Якщо розробник залежить від одного постачальника, вони перериваються. Без автоматичних вимикачів повторні спроби можуть призвести до збою програми.

**Як це вирішує OmniRoute:**

- **Автоматичний вимикач для кожного постачальника** — автоматичне розмикання/замикання з настроюваними пороговими значеннями та часом відновлення (закрито/розімкнуто/напіврозімкнуто)
- **Exponential Backoff** — прогресивні затримки повторних спроб
- **Anti-Thundering Herd** — Mutex + захист семафора від одночасних повторних штормів
- **Комбіновані запасні ланцюги** — якщо основний постачальник виходить з ладу, автоматично проходить через ланцюжок без втручання.
- **Combo Circuit Breaker** — автоматично вимикає несправні постачальники в комбінованому ланцюжку
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Health Dashboard** — Моніторинг безвідмовної роботи, стани автоматичного вимикача, блокування, статистика кешу, затримка p50/p95/p99

</details>

<details>
<summary><b>🔧 7. «Налаштування кожного інструменту штучного інтелекту є виснажливим і повторюваним процесом» </b></summary>

Розробники використовують Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Кожному інструменту потрібна інша конфігурація (кінцева точка API, ключ, модель). Перенастроювання при зміні постачальника чи моделі – марна трата часу.

**Як це вирішує OmniRoute:**

- **Панель інструментів CLI** — спеціальна сторінка з налаштуванням одним клацанням для Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — генерує `chatLanguageModels.json` для коду VS із масовим вибором моделі
- **Майстер адаптації** — 4-етапне налаштування для тих, хто вперше користується
- **Одна кінцева точка, усі моделі** — налаштуйте `http://localhost:20128/v1` один раз, отримайте доступ до 36+ постачальників

</details>

<details>
<summary><b>🔑 8. «Керування токенами OAuth від кількох постачальників — це пекло» </b></summary>

Claude Code, Codex, Gemini CLI, Copilot — усі використовують OAuth 2.0 із терміном дії маркерів. Розробникам необхідно постійно проходити повторну автентифікацію, мати справу з `client_secret is missing`, `redirect_uri_mismatch` і збоями на віддалених серверах. OAuth у LAN/VPS є особливо проблематичним.

**Як це вирішує OmniRoute:**

- **Auto Token Refresh** — маркери OAuth оновлюються у фоновому режимі до завершення терміну дії
- **Вбудований OAuth 2.0 (PKCE)** — автоматичний потік для Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — кілька облікових записів на постачальника за допомогою вилучення токенів JWT/ID
- **OAuth LAN/Remote Fix** — виявлення приватної IP-адреси для `redirect_uri` + ручний режим URL-адреси для віддалених серверів
- **OAuth за Nginx** — використовує `window.location.origin` для зворотної сумісності проксі
- **Remote OAuth Guide** — покроковий посібник для облікових даних Google Cloud на VPS/Docker

</details>

<details>
<summary><b>📊 9. «Я не знаю, скільки я витрачаю і куди» </b></summary>

Розробники використовують кілька платних постачальників, але не мають єдиного уявлення про витрати. Кожен постачальник має власну платіжну панель, але немає консолідованого перегляду. Несподівані витрати можуть накопичитися.

**Як це вирішує OmniRoute:**

- **Інформаційна панель аналізу витрат** — відстеження вартості кожного токена та керування бюджетом для кожного постачальника
- **Бюджетні обмеження на рівень** — максимальна сума витрат на рівень, що запускає автоматичний відкат
- **Конфігурація ціни за модель** — налаштовувані ціни за модель
- **Статистика використання за ключ API** — кількість запитів і позначка часу останнього використання для кожного ключа
- **Інформаційна панель аналітики** — картки зі статистичними даними, діаграма використання моделі, таблиця постачальників із показниками успіху та затримкою

</details>

<details>
<summary><b>🐛 10. «Я не можу діагностувати помилки та проблеми під час викликів ШІ» </b></summary>

Коли виклик не вдається, розробник не знає, чи це було обмеження швидкості, прострочений маркер, неправильний формат чи помилка постачальника. Фрагментовані журнали на різних терміналах. Без спостережливості налагодження відбувається методом проб і помилок.

**Як це вирішує OmniRoute:**

- **Інформаційна панель уніфікованих журналів** — 4 вкладки: журнали запитів, журнали проксі, журнали аудиту, консоль
- **Console Log Viewer** — засіб перегляду терміналу в режимі реального часу з кольоровими рівнями, автопрокручуванням, пошуком, фільтром
- **Проксі-журнали SQLite** — постійні журнали, які залишаються після перезапуску сервера
- **Translator Playground** — 4 режими налагодження: Playground (переклад формату), Chat Tester (туди й назад), Test Bench (пакет), Live Monitor (у реальному часі)
- **Запит телеметрії** — затримка p50/p95/p99 + трасування X-Request-Id
- **Логування на основі файлів із ротацією** — консольний перехоплювач записує все в журнал JSON із ротацією на основі розміру

</details>

<details>
<summary><b>🏗️ 11. «Розгортання та підтримка шлюзу є складною справою» </b></summary>

Встановлення, налаштування та обслуговування проксі ШІ в різних середовищах (локальне, VPS, Docker, хмара) є трудомістким. Такі проблеми, як жорстко закодовані шляхи, `EACCES` у каталогах, конфлікти портів і кросплатформні збірки, додають тертя.

**Як це вирішує OmniRoute:**

- **npm global install** — `npm install -g omniroute && omniroute` — готово
- **Мультиплатформенний Docker** — нативний AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Профілі створення Docker** — `base` (без інструментів CLI) і `cli` (з Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — рідна програма для Windows/macOS/Linux із системним треєм, автозапуском, офлайн-режимом
- **Режим розділеного порту** — API та інформаційна панель на окремих портах для розширених сценаріїв (зворотний проксі, мережа контейнерів)
- **Cloud Sync** — синхронізація налаштувань між пристроями через Cloudflare Workers
- **Резервне копіювання БД** — автоматичне резервне копіювання, відновлення, експорт та імпорт усіх налаштувань

</details>

<details>
<summary><b>🌍 12. «Інтерфейс лише англійською мовою, і моя команда не розмовляє англійською» </b></summary>

Команди в неангломовних країнах, особливо в Латинській Америці, Азії та Європі, стикаються з інтерфейсами лише англійською мовою. Мовні бар’єри зменшують адаптацію та збільшують кількість помилок конфігурації.

**Як це вирішує OmniRoute:**

- **Інформаційна панель i18n — 30 мов** — перекладено всі 500+ клавіш, включаючи арабську, болгарську, датську, німецьку, іспанську, фінську, французьку, іврит, гінді, угорську, індонезійську, італійську, японську, корейську, малайську, голландську, норвезьку, польську, португальську (PT/BR), румунську, російську, словацьку, шведську, тайську, українську, в’єтнамську, китайська, філіппінська, англійська
- **Підтримка RTL** — підтримка арабської та івриту справа наліво
- **Багатомовні файли README** — 30 повних перекладів документації
- **Вибір мови** — значок глобуса в заголовку для перемикання в реальному часі

</details>

<details>
<summary><b>🔄 13. «Мені потрібно більше, ніж чат — мені потрібні вставки, зображення, аудіо» </b></summary>

ШІ — це не просто завершення чату. Розробникам потрібно генерувати зображення, транскрибувати аудіо, створювати вбудовування для RAG, змінювати рейтинг документів і модерувати вміст. Кожен API має різну кінцеву точку та формат.

**Як це вирішує OmniRoute:**

- **Вбудовування** — `/v1/embeddings` із 6 постачальниками та 9+ моделями
- **Генерація зображень** — `/v1/images/generations` із 10 постачальниками та понад 20 моделями (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Текст у відео** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) і SD WebUI
- **Текст у музику** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Транскрипція аудіо** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Перетворення тексту в мовлення** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT + існуючі постачальники
- **Модерації** — `/v1/moderations` — Перевірки безпеки вмісту
- **Переранжування** — `/v1/rerank` — Переранжування релевантності документа
- **Responses API** — повна підтримка `/v1/responses` для Codex

</details>

<details>
<summary><b>🧪 14. «У мене немає можливості перевірити та порівняти якість різних моделей» </b></summary>

Розробники хочуть знати, яка модель найкраще підходить для їхнього випадку використання — код, переклад, міркування — але порівнювати вручну повільно. Інтегрованих інструментів оцінювання не існує.

**Як це вирішує OmniRoute:**

- **Оцінки LLM** — Золотий набір тестів із 10 попередньо завантаженими випадками, що охоплюють привітання, математику, географію, генерацію коду, відповідність JSON, переклад, уцінку, відмову безпеки
- **4 стратегії збігу** — `exact`, `contains`, `regex`, `custom` (функція JS)
- **Translator Playground Test Bench** — Пакетне тестування з кількома входами та очікуваними результатами, порівняння між постачальниками
- **Chat Tester** — повний цикл із візуальним відтворенням відповідей
- **Live Monitor** — потік усіх запитів, що проходять через проксі, у реальному часі

</details>

<details>
<summary><b>📈 15. «Мені потрібно масштабувати без втрати продуктивності» </b></summary>

Оскільки кількість запитів зростає, без кешування ті самі запитання створюють дублюючі витрати. Без ідемпотентності, дублікат запитів обробки відходів. Необхідно дотримуватися обмежень тарифів для кожного постачальника.

**Як це вирішує OmniRoute:**

- **Семантичний кеш** — дворівневий кеш (підпис + семантичний) зменшує вартість і затримку
- **Request Idempotency** — вікно дедуплікації 5 с для ідентичних запитів
- **Виявлення ліміту швидкості** — RPM для кожного постачальника, мінімальний розрив і максимальне одночасне відстеження
- **Обмеження швидкості, які можна редагувати** — налаштування за замовчуванням у Параметрах → Стійкість із наполегливістю
- **API Key Validation Cache** — 3-рівневий кеш для продуктивності
- **Інформаційна панель справності з телеметрією** — затримка p50/p95/p99, статистика кешу, час роботи

</details>

<details>
<summary><b>🤖 16. «Я хочу глобально контролювати поведінку моделі» </b></summary>

Розробники, які хочуть, щоб усі відповіді відповідали певною мовою, з певним тоном або хочуть обмежити маркери міркування. Налаштовувати це в кожному інструменті/запиті є недоцільним.

**Як це вирішує OmniRoute:**

- **Впровадження системної підказки** — глобальна підказка застосовується до всіх запитів
- **Thinking Budget Validation** — Контроль розподілу токенів міркувань за запитом (прохідний, автоматичний, спеціальний, адаптивний)
- **6 стратегій маршрутизації** — глобальні стратегії, які визначають спосіб розподілу запитів
- **Wildcard Router** — шаблони `provider/*` динамічно маршрутизують до будь-якого постачальника
- **Увімкнути/вимкнути комбо** — перемикайте комбо безпосередньо з інформаційної панелі
- **Перемикнути постачальника** — увімкнути/вимкнути всі з’єднання для постачальника одним клацанням миші
- **Заблоковані постачальники** — виключити певних постачальників зі списку `/v1/models`

</details>

<details>
<summary><b>🧰 17. «Мені потрібні інструменти MCP як першокласні можливості продукту» </b></summary>

Багато шлюзів ШІ розкривають MCP лише як приховану деталь реалізації. Командам потрібен видимий, керований рівень операцій.

**Як це вирішує OmniRoute:**

- MCP з’являється на панелі навігації та на вкладці протоколу кінцевої точки
- Спеціальна сторінка керування MCP із процесом, інструментами, обсягами й аудитом
- Вбудований швидкий запуск для `omniroute --mcp` і адаптація клієнта

</details>

<details>
<summary><b>🧠 18. «Мені потрібна оркестровка A2A із синхронізацією + шляхи завдань потоку» </b></summary>

Робочі процеси агента потребують як прямих відповідей, так і тривалого потокового виконання з контролем життєвого циклу.

**Як це вирішує OmniRoute:**

- Кінцева точка A2A JSON-RPC (`POST /a2a`) з `message/send` і `message/stream`
- Потокова передача SSE з розповсюдженням стану терміналу
- API життєвого циклу завдань для `tasks/get` і `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. «Мені потрібна реальна справність процесу MCP, а не вгаданий статус» </b></summary>

Операційним групам потрібно знати, чи справді MCP активний, а не лише те, чи доступний API.

**Як це вирішує OmniRoute:**

- Файл серцевого ритму виконання з PID, часовими мітками, транспортом, кількістю інструментів і режимом області
- API статусу MCP, що поєднує серцебиття + останню активність
- Картки стану інтерфейсу користувача для процесу/часу безперебійної роботи/свіжості пульсу

</details>

<details>
<summary><b>📋 20. «Мені потрібне виконання інструменту MCP з можливістю перевірки» </b></summary>

Коли інструменти змінюють конфігурацію або запускають операційні дії, командам потрібна криміналістична відстежуваність.

**Як це вирішує OmniRoute:**

— Журнал аудиту з підтримкою SQLite для викликів інструментів MCP

- Фільтри за інструментом, успіхом/невдачею, ключем API та розбивкою на сторінки
- Таблиця аудиту інформаційної панелі + кінцеві точки статистики для автоматизації

</details>

<details>
<summary><b>🔐 21. «Мені потрібні обмежені дозволи MCP для інтеграції» </b></summary>

Різні клієнти повинні мати мінімальний доступ до категорій інструментів.

**Як це вирішує OmniRoute:**

- 9 детальних областей MCP для контрольованого доступу до інструменту
- Застосування обсягу та видимість в інтерфейсі користувача керування MCP
- Безпечна поза за замовчуванням для робочих інструментів

</details>

<details>
<summary><b>⚙️ 22. «Мені потрібен оперативний контроль без перерозподілу» </b></summary>

Командам потрібні швидкі зміни часу виконання під час інцидентів або витрат.

**Як це вирішує OmniRoute:**

- Перемикання комбо-активації безпосередньо з інформаційної панелі MCP
- Застосовуйте профілі стійкості з попередньо визначених пакетів політик
- Скинути стан автоматичного вимикача з тієї ж панелі керування

</details>

<details>
<summary><b>🔄 23. «Мені потрібна видимість і скасування життєвого циклу завдання A2A» </b></summary>

Без видимості життєвого циклу інциденти завдань стає важко сортувати.

**Як це вирішує OmniRoute:**

— Список завдань/фільтрування за станом/навиками з розбивкою на сторінки

- Деталізація метаданих завдань, подій і артефактів
- Кінцева точка скасування завдання та дія інтерфейсу користувача з підтвердженням

</details>

<details>
<summary><b>🌊 24. «Мені потрібні активні показники потоку для завантаження A2A» </b></summary>

Робочі процеси потокової передачі вимагають оперативного розуміння паралельності та живих з’єднань.

**Як це вирішує OmniRoute:**

— Лічильники активних потоків інтегровані в статус A2A

- Мітка часу останнього завдання та підрахунок стану
- Картки інформаційної панелі A2A для моніторингу операцій у реальному часі

</details>

<details>
<summary><b>🪪 25. «Мені потрібне стандартне виявлення агентів для клієнтів» </b></summary>

Зовнішнім клієнтам і оркестрантам потрібні машинозчитувані метадані для адаптації.

**Як це вирішує OmniRoute:**

- Картка агента розкрита на `/.well-known/agent.json`
- Можливості та навички, показані в інтерфейсі користувача користувача
- API стану A2A включає метадані виявлення для автоматизації

</details>

<details>
<summary><b>🧭 26. «Мені потрібна можливість виявлення протоколу в UX продукту» </b></summary>

Якщо користувачі не можуть виявити поверхні протоколу, якість впровадження та підтримки падає.

**Як це вирішує OmniRoute:**

— Записи бічної панелі для MCP і A2A

- Сторінка кінцевої точки Вкладка протоколів із швидким запуском і статусом
- Посилання з огляду на спеціальні інформаційні панелі керування

</details>

<details>
<summary><b>🧪 27. «Мені потрібна наскрізна перевірка протоколу з реальними клієнтами» </b></summary>

Пробних тестів недостатньо для перевірки сумісності протоколу перед випуском.

**Як це вирішує OmniRoute:**

- Комплект E2E, який завантажує програму та використовує реальний клієнтський транспорт MCP SDK
- Клієнт A2A перевіряє потоки виявлення, надсилання, потокової передачі, отримання та скасування
- Перехресна перевірка тверджень щодо аудиту MCP та API завдань A2A

</details>

<details>
<summary><b>📡 28. «Мені потрібна уніфікована можливість спостереження через усі інтерфейси» </b></summary>

Поділ спостережуваності за протоколом створює сліпі зони та довший MTTR.

**Як це вирішує OmniRoute:**

- Уніфіковані інформаційні панелі/журнали/аналітика в одному продукті
- Справність + аудит + телеметрія запитів на рівнях OpenAI, MCP і A2A
- Операційні API для статусу та автоматизації

</details>

<details>
<summary><b>💼 29. «Мені потрібне одне середовище виконання для проксі + інструментів + оркестровки агента» </b></summary>

Запуск багатьох окремих служб збільшує експлуатаційні витрати та частоту збоїв.

**Як це вирішує OmniRoute:**

- OpenAI-сумісний проксі, сервер MCP і сервер A2A в одному стеку
- Спільна автентифікація, стійкість, зберігання даних і можливість спостереження
- Послідовна модель політики на всіх поверхнях взаємодії

</details>

<details>
<summary><b>🚀 30. «Мені потрібно надсилати агентські робочі процеси без розповсюдження клею-коду» </b></summary>

Команди втрачають швидкість під час з’єднання кількох спеціальних служб і сценаріїв.

**Як це вирішує OmniRoute:**

- Уніфікована стратегія кінцевих точок для клієнтів і агентів
  — Вбудовані інтерфейси керування протоколами та шляхи перевірки диму
- Основи, готові до виробництва (безпека, журналювання, стійкість, резервне копіювання)

</details>

### Приклади Playbooks

**Playbook A: Максимальна кількість платної підписки + дешеве резервне копіювання**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: стек кодування без витрат**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: резервний ланцюжок 24/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Операції агента з MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Швидкий старт

**1. Встановити глобально:**

```bash
npm install -g omniroute
omniroute
```

🎉 Інформаційна панель відкривається в `http://localhost:20128`

| Команда                 | Опис                                           |
| ----------------------- | ---------------------------------------------- |
| `omniroute`             | Запустити сервер (порт за замовчуванням 20128) |
| `omniroute --port 3000` | Використовувати спеціальний порт               |
| `omniroute --no-open`   | Не відкривати автоматично браузер              |
| `omniroute --help`      | Показати довідку                               |

**2. Підключіть БЕЗКОШТОВНОГО провайдера:**

Інформаційна панель → Постачальники → Підключити **Claude Code** або **Antigravity** → Вхід OAuth → Готово!

**3. Використовуйте у своєму інструменті CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Ось і все!** Почніть кодувати з БЕЗКОШТОВНИМИ моделями ШІ.

**Альтернатива — запустити з джерела:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Докер

OmniRoute доступний як загальнодоступний образ Docker на [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Швидкий біг:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**З файлом середовища:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Використання Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Зображення               | Тег      | Розмір  | Опис                       |
| ------------------------ | -------- | ------- | -------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 МБ | Останній стабільний випуск |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 МБ | Поточна версія             |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Короткий огляд цін

| Рівень             | Постачальник     | Вартість                        | Скидання квоти                | Найкраще для                 |
| ------------------ | ---------------- | ------------------------------- | ----------------------------- | ---------------------------- |
| **💳 ПІДПИСКА**    | Клод Код (Pro)   | 20 доларів США на місяць        | 5 годин + щотижня             | Вже підписані                |
|                    | Codex (Plus/Pro) | $20-200/міс                     | 5 годин + щотижня             | Користувачі OpenAI           |
|                    | Gemini CLI       | **БЕЗКОШТОВНО**                 | 180 тис./місяць + 1 тис./день | всі!                         |
|                    | Копілот GitHub   | $10-19/міс                      | Щомісяця                      | Користувачі GitHub           |
| **🔑 КЛЮЧ API**    | NVIDIA NIM       | **БЕЗКОШТОВНО** (1000 кредитів) | Одноразова                    | Безкоштовне тестування рівня |
|                    | DeepSeek         | Оплата за використання          | Жодного                       | Краща ціна/якість            |
|                    | Groq             | Безкоштовний рівень + платний   | Оцінка обмежена               | Надшвидкий висновок          |
|                    | xAI (Грок)       | Оплата за використання          | Жодного                       | Моделі Grok                  |
|                    | Містраль         | Безкоштовний рівень + платний   | Оцінка обмежена               | Європейський ШІ              |
|                    | OpenRouter       | Оплата за використання          | Жодного                       | 100+ моделей                 |
| **💰 ДЕШЕВО**      | GLM-4.7          | $0,6/1 млн                      | Щодня о 10 ранку              | Резервне копіювання бюджету  |
|                    | MiniMax M2.1     | $0,2/1 млн                      | 5-годинний роликовий          | Найдешевший варіант          |
|                    | Кімі К2          | 9 $/міс квартира                | 10 млн токенів/міс            | Передбачувана вартість       |
| **🆓 БЕЗКОШТОВНО** | iFlow            | $0                              | Необмежений                   | 8 моделей безкоштовно        |
|                    | Квен             | $0                              | Необмежений                   | 3 моделі безкоштовно         |
|                    | Кіро             | $0                              | Необмежений                   | Клод безкоштовно             |

**💡 Порада професіонала:** Почніть із Gemini CLI (180 тис. безкоштовно/місяць) + iFlow (необмежено безкоштовно) = 0 доларів США!

---

## 💡 Основні характеристики

### 🧠 Основна маршрутизація та інтелект

| Особливість                                  | Що він робить                                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 🎯 **Розумний 4-рівневий резервний варіант** | Авто-маршрут: Підписка → Ключ API → Дешево → Безкоштовно                                                         |
| 📊 **Відстеження квот у реальному часі**     | Підрахунок живих токенів + скидання зворотного відліку для кожного постачальника                                 |
| 🔄 **Формат перекладу**                      | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro seamless + відповідь санація                                            |
| 👥 **Підтримка кількох облікових записів**   | Кілька облікових записів на постачальника з інтелектуальним вибором                                              |
| 🔄 **Автоматичне оновлення токенів**         | Маркери OAuth оновлюються автоматично з повторною спробою                                                        |
| 🎨 **Користувацькі комбо**                   | 6 стратегій: спочатку заповнює, циклічний, p2c, випадковий, найменш використовуваний, оптимізований за витратами |
| 🧩 **Користувацькі моделі**                  | Додайте будь-який ідентифікатор моделі до будь-якого постачальника                                               |
| 🌐 **Wildcard Router**                       | Динамічно направляйте шаблони `provider/*` до будь-якого постачальника                                           |
| 🧠 **Мислення про бюджет**                   | Наскрізний, автоматичний, настроюваний і адаптивний режими для моделей міркування                                |
| 🔀 **Model Aliases**                         | Auto-forward deprecated model IDs to current replacements (built-in + custom)                                    |
| ⚡ **Background Degradation**                | Auto-route background tasks (titles, summaries) to cheaper models                                                |
| 💬 **Швидке впровадження системи**           | Глобальне системне підказка застосовується до всіх запитів                                                       |
| 📄 **API відповідей**                        | Повна підтримка OpenAI Responses API (`/v1/responses`) для Codex                                                 |

### 🎵 Мультимодальні API

| Особливість                        | Що він робить                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Створення зображень**         | `/v1/images/generations` — 4 провайдери, 9+ моделей                                                                                                                        |
| 📐 **Вбудовування**                | `/v1/embeddings` — 6 провайдерів, 9+ моделей                                                                                                                               |
| 🎤 **Транскрипція аудіо**          | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Створення тексту в мовлення** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Модерації**                   | `/v1/moderations` — Перевірка безпеки вмісту                                                                                                                               |
| 🔀 **Переранжування**              | `/v1/rerank` — Переранжування релевантності документа                                                                                                                      |

### 🛡️ Стійкість і безпека

| Особливість                           | Що він робить                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔌 **Автоматичний вимикач**           | Автоматичне відкриття/закриття для кожного постачальника з настроюваними пороговими значеннями        |
| 🛡️ **Anti-Thundering Herd**           | Mutex + обмеження швидкості семафора для постачальників ключів API                                    |
| 🧠 **Семантичний кеш**                | Дворівневий кеш (підпис + семантика) зменшує вартість і затримку                                      |
| ⚡ **Запит на ідемпотентність**       | 5-секундне вікно дедупляції для дублікатів запитів                                                    |
| 🔒 **Підробка відбитків пальців TLS** | Обійти виявлення ботів на основі TLS через wreq-js                                                    |
| 🌐 **IP-фільтрація**                  | Білий/чорний список для керування доступом API                                                        |
| 📊 **Редаговані ліміти ставок**       | Конфігурація RPM, мінімальний проміжок і максимальна одночасність на рівні системи                    |
| 💾 **Rate Limit Persistence**         | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness                          |
| 🔄 **Token Refresh Resilience**       | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                                |
| 🛡 **API Endpoint Protection**        | Аутентифікація + блокування постачальника для кінцевої точки `/models`                                |
| 🔒 **Видимість проксі**               | Кольорові значки: 🟢 глобальний, 🟡 постачальник, 🔵 кожне підключення з відображенням IP             |
| 🌐 **3-рівнева конфігурація проксі**  | Налаштуйте проксі-сервери на глобальному рівні, на рівні кожного постачальника чи кожного підключення |

### 📊 Спостережливість і аналітика

| Особливість                          | Що він робить                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 📝 **Подати запит на реєстрацію**    | Режим налагодження з повними журналами запитів/відповідей                                                    |
| 💾 **Журнали проксі SQLite**         | Постійні журнали проксі зберігаються після перезавантаження сервера                                          |
| 📊 **Інформаційна панель аналітики** | На основі Recharts: картки статистики, діаграма використання моделей, таблиця провайдерів                    |
| 📈 **Відстеження прогресу**          | Увімкніть події прогресу SSE для потокового передавання                                                      |
| 🧪 **Оцінки LLM**                    | Тестування золотого набору з 4 стратегіями матчу                                                             |
| 🔍 **Надіслати запит на телеметрію** | агрегація затримок p50/p95/p99 + трасування X-Request-Id                                                     |
| 📋 **Інформаційна панель журналів**  | Уніфікована сторінка з 4 вкладками: журнали запитів, журнали проксі, журнали аудиту, консоль                 |
| 🖥️ **Перегляд журналу консолі**      | Переглядач у режимі реального часу у стилі терміналу з фільтром рівнів, пошуком, автоматичним прокручуванням |
| 📑 **Логування на основі файлів**    | Перехоплювач консолі захоплює весь вихід у файл журналу JSON із обертанням                                   |
| 🏥 **Інформаційна панель здоров’я**  | Час роботи системи, стани автоматичного вимикача, блокування, статистика кешу                                |
| 💰 **Відстеження витрат**            | Управління бюджетом + конфігурація ціноутворення для кожної моделі                                           |

### ☁️ Розгортання та синхронізація

| Особливість                                 | Що він робить                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| 💾 **Хмарна синхронізація**                 | Синхронізація конфігурації між пристроями через Cloudflare Workers                  |
| 🌐 **Розгортайте будь-де**                  | Localhost, VPS, Docker, Cloudflare Workers                                          |
| 🔑 **Керування ключами API**                | Генерувати, обертати та використовувати ключі API для кожного постачальника         |
| 🧙 **Майстер адаптації**                    | 4-етапне покрокове налаштування для користувачів, які вперше                        |
| 🔧 **Інформаційна панель інструментів CLI** | Налаштувати в один клік Claude, Codex, Cline, OpenClaw, Kilo, Antigravity           |
| 🔄 **Резервне копіювання БД**               | Автоматичне резервне копіювання, відновлення, експорт і імпорт для всіх налаштувань |
| 🌐 **Інтернаціоналізація**                  | Повний i18n із next-intl — підтримка англійської та португальської (Бразилія)       |
| 🌍 **Вибір мови**                           | Значок глобуса в заголовку для перемикання мов у реальному часі (🇺🇸/🇧🇷)             |
| 📂 **Каталог користувацьких даних**         | `DATA_DIR` змінна env для перевизначення типового шляху зберігання `~/.omniroute`   |

<details>
<summary><b>📖 Деталі функції</b></summary>

### 🎯 Smart 4-Tier Fallback

Створюйте комбо з автоматичним резервним варіантом:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Відстеження квот у реальному часі

- Споживання токенів на постачальника
- Скидання зворотного відліку (5 годин, щодня, щотижня)
- Оцінка вартості платних рівнів
- Щомісячні звіти про витрати

### 🔄 Переклад формату

Плавний переклад між форматами:

- **OpenAI** ↔ **Клод** ↔ **Близнюки** ↔ **Відповіді OpenAI**
- Ваш інструмент CLI надсилає формат OpenAI → OmniRoute перекладає → Постачальник отримує рідний формат
- Працює з будь-яким інструментом, який підтримує спеціальні кінцеві точки OpenAI
- **Дезінфікація відповіді** — видаляє нестандартні поля для суворої сумісності з OpenAI SDK
- **Нормалізація ролі** — `developer` → `system` для не-OpenAI; `system` → `user` для моделей GLM/ERNIE
- **Вилучення тегів мислення** — `<think>` блоків → `reasoning_content` для моделей мислення
- **Структурований вихід** — `json_schema` → Gemini `responseMimeType`/`responseSchema`

### 👥 Підтримка кількох облікових записів

- Додайте кілька облікових записів для кожного постачальника
- Автоматична циклічна або пріоритетна маршрутизація
- Повернення до наступного облікового запису, коли досягається квота

### 🔄 Автоматичне оновлення токенів

- Маркери OAuth автоматично оновлюються до закінчення терміну дії
- Повторна автентифікація вручну не потрібна
- Бездоганний досвід у всіх постачальників

### 🎨 Спеціальні комбо

- Створюйте необмежену кількість комбінацій моделей
- 6 стратегій: спочатку заповнюй, циклічна, сила двох варіантів, випадкова, найменш використовувана, оптимізована за витратами
- Діліться комбо на різних пристроях за допомогою Cloud Sync

### 🏥 Інформаційна панель здоров'я

- Статус системи (час роботи, версія, використання пам'яті)
- Стани автоматичного вимикача для кожного постачальника (замкнуто/розімкнуто/напіврозімкнуто)
- Статус обмеження швидкості та активні блокування
  — Статистика кешу підписів
- Телеметрія затримки (p50/p95/p99) + кеш підказок
- Скинути стан здоров'я одним клацанням миші

### 🔧 Ігровий майданчик для перекладачів

OmniRoute містить потужний вбудований Translator Playground із **4 режимами** для налагодження, тестування та моніторингу перекладів API:

| Режим                    | Опис                                                                                                                                                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Ігровий майданчик** | Прямий переклад формату — вставте будь-яке тіло запиту API та миттєво подивіться, як OmniRoute перекладає його між форматами постачальників (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Включає приклади шаблонів і автоматичне визначення формату. |
| **💬 Тестер чату**       | Надсилайте справжні запити в чат через OmniRoute і переглядайте повну інформацію: ваші дані, перекладений запит, відповідь постачальника та перекладену відповідь. Безцінний для перевірки комбінованої маршрутизації.                              |
| **🧪 Тестовий стенд**    | Режим пакетного тестування — визначте кілька тестів із різними вхідними та очікуваними результатами, запустіть їх усі одночасно та порівняйте результати між постачальниками та моделями.                                                           |
| **📱 Live Monitor**      | Моніторинг запитів у режимі реального часу — спостерігайте за вхідними запитами, коли вони проходять через OmniRoute, переглядайте трансляції форматів у реальному часі та миттєво виявляйте проблеми.                                              |

**Доступ:** Інформаційна панель → Перекладач (бічна панель)

### 💾 Cloud Sync

- Синхронізація постачальників, комбінацій і налаштувань на всіх пристроях
- Автоматична фонова синхронізація
- Безпечне зашифроване сховище

</details>

## 🧪 Оцінки (Evals)

OmniRoute містить вбудовану систему оцінювання для перевірки якості відповіді LLM на відповідність золотому набору. Доступ до нього через **Аналітика → Оцінки** на інформаційній панелі.

### Вбудований Золотий набір

Попередньо завантажений "Золотий набір OmniRoute" містить 10 тестів, які охоплюють:

- Привітання, математика, географія, генерація коду
- Відповідність формату JSON, переклад, розмітка
- Відмова безпеки (шкідливий контент), підрахунок, булева логіка

### Стратегії оцінювання

| Стратегія  | Опис                                                           | Приклад                          |
| ---------- | -------------------------------------------------------------- | -------------------------------- |
| `exact`    | Вихідні дані повинні точно відповідати                         | `"4"`                            |
| `contains` | Вихідні дані повинні містити підрядок (незалежно від регістру) | `"Paris"`                        |
| `regex`    | Вихідні дані мають відповідати шаблону регулярного виразу      | `"1.*2.*3"`                      |
| `custom`   | Спеціальна функція JS повертає true/false                      | `(output) => output.length > 10` |

---

## 📖 Посібник із налаштування

<details>
<summary><b>💳 Постачальники підписки</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Професійна порада:** використовуйте Opus для складних завдань, Sonnet для швидкості. OmniRoute відстежує квоту на модель!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (БЕЗКОШТОВНО 180K/місяць!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Найкраще:** Величезний безкоштовний рівень! Використовуйте це перед платними рівнями.

### Копілот GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Постачальники ключів API</b></summary>

### NVIDIA NIM (БЕЗКОШТОВНІ 1000 кредитів!)

1. Зареєструйтесь: [build.nvidia.com](https://build.nvidia.com)
2. Отримайте безкоштовний ключ API (1000 кредитів включено)
3. Інформаційна панель → Додати постачальника → NVIDIA NIM:
   - Ключ API: `nvapi-your-key`

**Моделі:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` та понад 50 інших

**Порада професіонала:** OpenAI-сумісний API — бездоганно працює з перекладом формату OmniRoute!

### DeepSeek

1. Зареєструйтеся: [platform.deepseek.com](https://platform.deepseek.com)
2. Отримайте ключ API
3. Інформаційна панель → Додати постачальника → DeepSeek

**Моделі:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (доступний безкоштовний рівень!)

1. Зареєструйтеся: [console.groq.com](https://console.groq.com)
2. Отримайте ключ API (включає безкоштовний рівень)
3. Інформаційна панель → Додати постачальника → Groq

**Моделі:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Професійна порада:** Надшвидкий висновок — найкращий для кодування в реальному часі!

### OpenRouter (100+ моделей)

1. Зареєструйтеся: [openrouter.ai](https://openrouter.ai)
2. Отримайте ключ API
3. Інформаційна панель → Додати провайдера → OpenRouter

**Моделі:** Отримуйте доступ до понад 100 моделей від усіх основних постачальників за допомогою єдиного ключа API.

</details>

<details>
<summary><b>💰 Дешеві постачальники (резервні)</b></summary>

### GLM-4.7 (щоденне скидання, $0,6/1 млн)

1. Зареєструйтеся: [Zhipu AI](https://open.bigmodel.cn/)
2. Отримайте ключ API від Coding Plan
3. Інформаційна панель → Додати ключ API:
   - Постачальник: `glm`
   - Ключ API: `your-key`

**Використовуйте:** `glm/glm-4.7`

**Професійна порада:** План кодування пропонує 3x квоту за 1/7 вартості! Скидання щодня о 10:00.

### MiniMax M2.1 (5 годин скидання, $0,20/1 млн)

1. Зареєструйтеся: [MiniMax](https://www.minimax.io/)
2. Отримайте ключ API
3. Інформаційна панель → Додати ключ API

**Використовуйте:** `minimax/MiniMax-M2.1`

**Порада:** Найдешевший варіант для довгого контексту (1 млн токенів)!

### Kimi K2 ($9/місяць)

1. Підпишіться: [Moonshot AI](https://platform.moonshot.ai/)
2. Отримайте ключ API
3. Інформаційна панель → Додати ключ API

**Використання:** `kimi/kimi-latest`

**Професійна порада:** Фіксовані 9 доларів США на місяць за 10 мільйонів токенів = 0,90 доларів США за 1 млн. ефективних витрат!

</details>

<details>
<summary><b>🆓 БЕЗКОШТОВНІ постачальники (аварійне резервне копіювання)</b></summary>

### iFlow (8 БЕЗКОШТОВНИХ моделей)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 БЕЗКОШТОВНІ моделі)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Кіро (Клод БЕЗКОШТОВНО)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Створення комбо</b></summary>

### Приклад 1: максимізація підписки → дешеве резервне копіювання

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Приклад 2: лише безкоштовно (нульова вартість)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 Інтеграція CLI</b></summary>

### Курсор IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Клод Код

Використовуйте сторінку **Інструменти CLI** на інформаційній панелі для налаштування одним клацанням миші або редагуйте `~/.claude/settings.json` вручну.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Варіант 1 — Інформаційна панель (рекомендовано):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Варіант 2 — вручну:** Редагувати `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Примітка:** OpenClaw працює лише з локальним OmniRoute. Використовуйте `127.0.0.1` замість `localhost`, щоб уникнути проблем із вирішенням IPv6.

### Cline / Продовжити / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Усунення несправностей

<details>
<summary><b>Натисніть, щоб розгорнути посібник з усунення несправностей</b></summary>

**"Мовна модель не надавала повідомлень"**

- Квота постачальника вичерпана → Перевірте систему відстеження квот на інформаційній панелі
- Рішення: скористайтеся комбінованим альтернативним варіантом або перейдіть на дешевший рівень

**Обмеження швидкості**

— Вичерпана квота на підписку → Повернення до GLM/MiniMax

- Додати комбо: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Термін дії маркера OAuth минув**

— Автоматично оновлено OmniRoute

- Якщо проблеми не зникають: Інформаційна панель → Постачальник → Повторне підключення

**Високі витрати**

- Перевірте статистику використання в Інформаційній панелі → Витрати
- Переключіть основну модель на GLM/MiniMax
- Використовуйте безкоштовний рівень (Gemini CLI, iFlow) для некритичних завдань

**Інформаційна панель відкривається через неправильний порт**

- Встановити `PORT=20128` та `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Помилки хмарної синхронізації**

- Переконайтеся, що `BASE_URL` вказує на ваш запущений екземпляр
- Перевірте `CLOUD_URL` вказує на очікувану кінцеву точку хмари
- Зберігайте значення `NEXT_PUBLIC_*` у відповідності зі значеннями на стороні сервера

**Перший вхід не працює**

- Перевірте `INITIAL_PASSWORD` в `.env`
- Якщо не встановлено, резервний пароль – `123456`

**Немає журналів запитів**

- Установіть `ENABLE_REQUEST_LOGS=true` в `.env`

**Тест з’єднання показує «Недійсне» для OpenAI-сумісних постачальників**

- Багато постачальників не розкривають кінцеву точку `/models`
- OmniRoute v1.0.6+ включає резервну перевірку через завершення чату
- Переконайтеся, що базова URL-адреса містить суфікс `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ ВАЖЛИВО для використання OmniRoute у віддаленому VPS/Docker/сервері**

### OAuth

Провідники **Antigravity** і **Gemini CLI** використовують **Google OAuth 2.0** для автентифікації. Google вимагає, щоб `redirect_uri` не використовував fluxo OAuth, який **exatamente** має URI перед кадастрадами без додатка Google Cloud Console.

Оскільки повноваження OAuth embutidas, OmniRoute не встановлено в кадастрадах **apenas para `localhost`**. Якщо ви маєте доступ до OmniRoute у віддаленому сервері (наприклад: `https://omniroute.meuservidor.com`), або Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Рішення: налаштуйте власні облікові записи OAuth

Потрібно точно написати **Ідентифікатор клієнта OAuth 2.0** у Google Cloud Console через URI вашого сервера.

#### Passo a passo

**1. Доступ до Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 ID клієнта**

- Натисніть **"+ Створити облікові дані"** → **"Ідентифікатор клієнта OAuth"**
- Tipo de aplicativo: **"Веб-програма"**
- Назва: escolha qualquer nome (наприклад: `OmniRoute Remote`)

**3. Додайте як авторизовані URI перенаправлення**

Без поля **"Авторизовані URI перенаправлення"**, додайте:

```
https://seu-servidor.com/callback
```

> Замініть `seu-servidor.com` домен або IP на свій сервер (включно з необхідним портом, наприклад: `http://45.33.32.156:20128/callback`).

**4. Зберегти електронну копію як ідентифікацію**

Наприклад, Google показує **Ідентифікатор клієнта** і **Секрет клієнта**.

**5. Налаштувати як variáveis de ambiente**

Немає `.env` (або наших варіантів середовища Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Інформаційна панель → Постачальники → Антигравітація (або Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a authenticação funcionará.

---

### Тимчасове вирішення проблеми (необхідне налаштування облікових записів)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute скидає URL-адресу авторизації Google
2. Якщо ви авторизуєтеся, перенаправлення даних Google для `localhost` (неможливо віддалено від сервера)
3. **Скопіюйте повну URL-адресу** для переходу до вашого браузера (повідомте, що сторінка не створена)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Натисніть **"Підключити"**

> Este workaround funciona porque o código de autorização na URL é válido independente do redirect ter carregado ou não.

</details>

---

## 🛠️

- **Серед виконання**: Node.js 18–22 LTS (⚠️ Node.js 24+ **не підтримується** — рідні двійкові файли `better-sqlite3` несумісні)
- **Мова**: TypeScript 5.9 — **100% TypeScript** для `src/` та `open-sse/` (версія 1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **База даних**: LowDB (JSON) + SQLite (стан домену + журнали проксі)
- **Потокове передавання**: події, надіслані сервером (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + ключі API
- **Тестування**: програма для тестування Node.js (368+ модульних тестів)
- **CI/CD**: дії GitHub (автоматична публікація npm + Docker Hub після випуску)
- **Веб-сайт**: [omniroute.online](https://omniroute.online)
- **Пакет**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Стійкість**: автоматичний вимикач, експоненціальна віддача, захист від громового стада, підробка TLS

---

## 📖 Документація

| Документ                                     | Опис                                                  |
| -------------------------------------------- | ----------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Постачальники, комбо, інтеграція CLI, розгортання     |
| [API Reference](docs/API_REFERENCE.md)       | Усі кінцеві точки з прикладами                        |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Загальні проблеми та рішення                          |
| [Architecture](docs/ARCHITECTURE.md)         | Архітектура системи та внутрішні                      |
| [Contributing](CONTRIBUTING.md)              | Розробка установки та рекомендацій                    |
| [OpenAPI Spec](docs/openapi.yaml)            | Специфікація OpenAPI 3.0                              |
| [Security Policy](SECURITY.md)               | Повідомлення про вразливості та методи безпеки        |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Повний посібник: налаштування VM + nginx + Cloudflare |
| [Features Gallery](docs/FEATURES.md)         | Огляд інформаційної панелі зі знімками екрана         |

### 📸 Попередній перегляд інформаційної панелі

<details>
<summary><b>Натисніть, щоб переглянути знімки панелі інструментів</b></summary>

| Сторінка                 | Скріншот                                          |
| ------------------------ | ------------------------------------------------- |
| **Постачальники**        | ![Providers](docs/screenshots/01-providers.png)   |
| **Комбінації**           | ![Combos](docs/screenshots/02-combos.png)         |
| **Аналітика**            | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Здоров'я**             | ![Health](docs/screenshots/04-health.png)         |
| **Перекладач**           | ![Translator](docs/screenshots/05-translator.png) |
| **Налаштування**         | ![Settings](docs/screenshots/06-settings.png)     |
| **Інструменти CLI**      | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Журнали використання** | ![Usage](docs/screenshots/08-usage.png)           |
| **Кінцева точка**        | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute має **заплановано понад 210 функцій** на кількох етапах розробки. Ось ключові області:

| Категорія                        | Заплановані особливості | Основні моменти                                                                                                           |
| -------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Маршрутизація та інтелект** | 25+                     | Маршрутизація з найменшою затримкою, маршрутизація на основі тегів, попередній перегляд квот, вибір облікового запису P2C |
| 🔒 **Безпека та відповідність**  | 20+                     | Захист SSRF, маскування облікових даних, обмеження швидкості для кінцевої точки, визначення обсягу ключа керування        |
| 📊 **Спостережливість**          | 15+                     | Інтеграція OpenTelemetry, моніторинг квот у реальному часі, відстеження витрат на модель                                  |
| 🔄 **Інтеграція постачальників** | 20+                     | Реєстр динамічної моделі, час відновлення провайдера, Codex із кількома обліковими записами, розбір квоти Copilot         |
| ⚡ **Виконання**                 | 15+                     | Подвійний рівень кешу, кеш запитів, кеш відповідей, потокове підтримання активності, пакетний API                         |
| 🌐 **Екосистема**                | 10+                     | API WebSocket, гаряче перезавантаження конфігурації, розподілене сховище конфігурацій, комерційний режим                  |

### 🔜 Незабаром

- 🔗 **Інтеграція OpenCode** — власна підтримка постачальника для IDE кодування OpenCode AI
- 🔗 **Інтеграція TRAE** — повна підтримка інфраструктури розробки TRAE AI
- 📦 **Batch API** — асинхронна пакетна обробка масових запитів
- 🎯 **Маршрутизація на основі тегів** — Маршрутизація запитів на основі спеціальних тегів і метаданих
- 💰 **Стратегія найнижчої вартості** — автоматично вибирайте найдешевшого доступного постачальника

> 📝 Повні специфікації функцій доступні в [link](docs/new-features/) (217 детальних специфікацій)

---

## 👥 Автори

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Як зробити внесок

1. Розгалужте репозиторій
2. Створіть свою гілку функцій (`git checkout -b feature/amazing-feature`)
3. Зафіксуйте свої зміни (`git commit -m 'Add amazing feature'`)
4. Push до відділення (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

Див. [CONTRIBUTING.md](CONTRIBUTING.md), щоб отримати докладні вказівки.

### Випуск нової версії

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Зоряна історія

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Подяка

Особлива подяка **[9router](https://github.com/decolua/9router)** від **[decolua](https://github.com/decolua)** — оригінального проекту, який надихнув цей форк. OmniRoute спирається на цю неймовірну основу завдяки додатковим функціям, мультимодальним API і повному перепису TypeScript.

Особлива подяка **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — оригінальній реалізації Go, яка надихнула цей порт JavaScript.

---

## 📄 Ліцензія

Ліцензія Массачусетського технологічного інституту – подробиці див. [LICENSE](LICENSE).

---

<div align="center">
  <sub>Створено з ❤️ для розробників, які працюють у режимі 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
