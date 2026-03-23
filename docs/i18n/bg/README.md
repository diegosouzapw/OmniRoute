# 🚀 OmniRoute — Безплатният AI Gateway

### Никога не спирайте да кодирате. Интелигентно маршрутизиране към **БЕЗПЛАТНИ и евтини AI модели** с автоматичен резервен вариант.

_Вашият универсален API прокси — една крайна точка, 36+ доставчици, нулев престой. Сега с **MCP & A2A** агентска оркестрация._

**Завършвания на чат • Вграждания • Генериране на изображения • Видео • Музика • Аудио • Прекласиране • MCP сървър • A2A протокол • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

<div align="center">

[![npm версия](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Лиценз](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Уебсайт](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Уебсайт](https://omniroute.online) • [🚀 Бърз старт](#-quick-start) • [💡 Функции](#-key-features) • [📖 Документи](#-documentation) • [💰 Ценообразуване](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Налично на:** 🇺🇸 [английски](../../README.md) | 🇧🇷 [Португалски (Бразилия)](../pt-BR/README.md) | 🇪🇸 [Испански] (../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [италиански] (../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी] (../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [маджарски] (../hu/README.md) | 🇮🇩 [бахаса Индонезия](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Нидерландия](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Португалия)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Полски](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [филипински] (../phi/README.md)

---

## 🖼️ Главно табло за управление

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Визуализация на таблото за управление

<details>
<summary><b>Щракнете, за да видите екранни снимки на таблото </b></summary>

| Страница                   | Екранна снимка                                        |
| -------------------------- | ----------------------------------------------------- |
| **Доставчици**             | ![Доставчици](docs/screenshots/01-providers.png)      |
| **Комбота**                | ![Комбота](docs/screenshots/02-combos.png)            |
| **Анализ**                 | ![Анализ](docs/screenshots/03-analytics.png)          |
| **Здраве**                 | ![Здраве](docs/screenshots/04-health.png)             |
| **Преводач**               | ![Преводач](docs/screenshots/05-translator.png)       |
| **Настройки**              | ![Настройки](docs/screenshots/06-settings.png)        |
| **CLI инструменти**        | ![CLI инструменти](docs/screenshots/07-cli-tools.png) |
| **Регистри за използване** | ![Използване](docs/screenshots/08-usage.png)          |
| **Крайна точка**           | ![Крайна точка](docs/screenshots/09-endpoint.png)     |

</details>

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

### 🤖 Безплатен доставчик на AI за вашите любими кодиращи агенти

_Свържете всеки базиран на AI IDE или CLI инструмент чрез OmniRoute — безплатен API шлюз за неограничено кодиране._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/><sub>⭐ 205K</sub>
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
          <b>Кодекс CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Код на Клод </b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Близнаци CLI</b>
        </a><br/>
        <sub>⭐ 94,7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo код </b>
        </a><br/>
        <sub>⭐ 15,5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Всички агенти се свързват чрез <code>http://localhost:20128/v1</code> или <code>http://cloud.omniroute.online/v1</code> — една конфигурация, неограничени модели и квота</sub>

---

## 🤔 Защо OmniRoute?

**Спрете да пилеете пари и да достигате лимити:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Абонаментната квота изтича неизползвана всеки месец
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ограниченията на скоростта ви спират да кодирате по средата
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Скъпи API ($20-50/месец на доставчик)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ръчно превключване между доставчици

**OmniRoute решава това:**

- ✅ **Увеличете максимално абонаментите** - Проследете квотата, използвайте всеки бит преди нулиране
- ✅ **Автоматично възстановяване** - Абонамент → API ключ → Евтино → Безплатно, нулево време на престой
- ✅ **Множество акаунти** - Кръгови сметки между акаунти на доставчик
- ✅ **Универсален** - Работи с Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, всеки CLI инструмент

---

## 📧 Поддръжка> 💬 **Присъединете се към нашата общност!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Получавайте помощ, споделяйте съвети и бъдете в течение.

- **Уебсайт**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Група на общността](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Принос**: Вижте [CONTRIBUTING.md](CONTRIBUTING.md), отворете PR или изберете `good first issue`
- **Оригинален проект**: [9router от decolua](https://github.com/decolua/9router)

---

## 🔄 Как работи

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

## 🎯 Какво решава OmniRoute — 30 реални болни точки и случаи на употреба

> **Всеки разработчик, използващ AI инструменти, се сблъсква с тези проблеми всеки ден.** OmniRoute е създаден, за да разреши всички тях — от преразход на разходите до регионални блокове, от повредени OAuth потоци до операции на протоколи и корпоративна наблюдаемост.

<details>
<summary><b>💸 1. „Плащам за скъп абонамент, но все още ме прекъсват ограничения“ </b></summary>

Разработчиците плащат $20–200/месец за Claude Pro, Codex Pro или GitHub Copilot. Дори и да плащате, квотата има таван — 5 часа използване, седмични лимити или лимити на цените на минута. По средата на сесията на кодиране, доставчикът спира да отговаря и разработчикът губи поток и производителност.

**Как OmniRoute го решава:**

- **Smart 4-Tier Fallback** — Ако квотата за абонамент се изчерпи, автоматично пренасочва към API Key → Евтино → Безплатно с нулева ръчна намеса
- **Проследяване на квоти в реално време** — Показва потреблението на токени в реално време с обратно отброяване за нулиране (5 часа, ежедневно, седмично)
- **Поддръжка на няколко акаунта** — Множество акаунти на доставчик с автоматичен кръгов режим — когато единият свърши, превключва към следващия
- **Персонализирани комбинации** — Възможност за персонализиране на резервни вериги с 6 стратегии за балансиране (първо попълване, кръгово, P2C, произволно, най-малко използвано, оптимизирано по отношение на разходите)
- **Codex Business Quotas** — Мониторинг на квотите на работното пространство на бизнеса/екипа директно в таблото за управление

</details>

<details>
<summary><b>🔌 2. „Трябва да използвам няколко доставчика, но всеки има различен API“ </b></summary>

OpenAI използва един формат, Claude (Anthropic) използва друг, Gemini още един. Ако разработчикът иска да тества модели от различни доставчици или резервен вариант между тях, той трябва да преконфигурира SDK, да промени крайните точки, да се справи с несъвместими формати. Персонализираните доставчици (FriendLI, NIM) имат крайни точки на нестандартен модел.

**Как OmniRoute го решава:**

- **Unified Endpoint** — Единичен `http://localhost:20128/v1` служи като прокси за всички 36+ доставчици
- **Превод на формат** — Автоматично и прозрачно: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — Премахва нестандартните полета (`x_groq`, `usage_breakdown`, `service_tier`), които нарушават OpenAI SDK v1.83+
- **Нормализиране на ролята** — Преобразува `developer` → `system` за доставчици, които не са OpenAI; `system` → `user` за GLM/ERNIE
- **Think Tag Extraction** — Извлича `<think>` блокове от модели като DeepSeek R1 в стандартизирани `reasoning_content`
- **Структуриран изход за Gemini** — `json_schema` → `responseMimeType`/`responseSchema` автоматично преобразуване
- **`stream` по подразбиране е `false`** — Подравнява се със спецификацията на OpenAI, като се избягват неочаквани SSE в SDK на Python/Rust/Go</details>

<details>
<summary><b>🌐 3. „Моят доставчик на AI блокира моя регион/държава“ </b></summary>

Доставчици като OpenAI/Codex блокират достъпа от определени географски региони. Потребителите получават грешки като `unsupported_country_region_territory` по време на OAuth и API връзки. Това е особено разочароващо за разработчиците от развиващите се страни.

**Как OmniRoute го решава:**

- **3-Level Proxy Config** — Конфигурируем прокси на 3 нива: глобално (цял трафик), на доставчик (само един доставчик) и на връзка/ключ
- **Цветно кодирани прокси значки** — Визуални индикатори: 🟢 глобален прокси, 🟡 прокси на доставчик, 🔵 прокси за връзка, винаги показващ IP
- **OAuth Token Exchange Through Proxy** — OAuth потокът също минава през проксито, решавайки `unsupported_country_region_territory`
- **Тестове за връзка чрез прокси** — Тестовете за връзка използват конфигурирания прокси (без повече директен байпас)
- **SOCKS5 Support** — Пълна SOCKS5 прокси поддръжка за изходящо маршрутизиране
- **TLS Fingerprint Spoofing** — подобен на браузър TLS пръстов отпечатък чрез `wreq-js` за заобикаляне на откриването на ботове

</details>

<details>
<summary><b>🆓 4. „Искам да използвам AI за кодиране, но нямам пари“ </b></summary>

Не всеки може да плаща $20-200/месец за абонаменти за AI. Студенти, разработчици от развиващи се страни, любители и фрийлансъри се нуждаят от достъп до качествени модели на нулева цена.

**Как OmniRoute го решава:**

- **Вградени доставчици на безплатни нива** — Вградена поддръжка за 100% безплатни доставчици: iFlow (8 неограничени модела), Qwen (3 неограничени модела), Kiro (Claude безплатно), Gemini CLI (180K/месец безплатно)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Безплатни само комбинации** — Верига `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/месец с нулев престой
- **NVIDIA NIM безплатни кредити** — интегрирани 1000 безплатни кредита
- **Стратегия за оптимизиране на разходите** — Стратегия за маршрутизиране, която автоматично избира най-евтиния наличен доставчик

</details>

<details>
<summary><b>🔒 5. „Трябва да защитя моя AI шлюз от неоторизиран достъп“ </b></summary>

При излагане на AI шлюз към мрежата (LAN, VPS, Docker), всеки с адреса може да използва токените/квотата на разработчика. Без защита приложните програмни интерфейси (API) са уязвими за злоупотреба, незабавно инжектиране и злоупотреба.

**Как OmniRoute го решава:**

- **API Key Management** — Генериране, ротация и обхват за всеки доставчик със специална страница `/dashboard/api-manager`
- **Разрешения на ниво модел** — Ограничете API ключовете до конкретни модели (`openai/*`, шаблони със заместващи символи), с превключвател Разрешаване на всички/Ограничаване
- **API Endpoint Protection** — Изискване на ключ за `/v1/models` и блокиране на определени доставчици от списъка
- **Auth Guard + CSRF Protection** — Всички маршрути на таблото са защитени с `withAuth` мидълуер + CSRF токени
- **Ограничител на скоростта** — Ограничаване на скоростта на IP с конфигурируеми прозорци
- **IP Filtering** — Списък с разрешени/списък с блокирани за контрол на достъпа
- **Prompt Injection Guard** — Дезинфекция срещу злонамерени бързи модели
- **AES-256-GCM криптиране** — Идентификационните данни са криптирани в покой

</details>

<details>
<summary><b>🛑 6. „Доставчикът ми се срина и загубих потока на кодиране“ </b></summary>Доставчиците на AI могат да станат нестабилни, да върнат грешки 5xx или да достигнат временни лимити на скоростта. Ако разработчикът зависи от един доставчик, той е прекъснат. Без прекъсвачи многократните повторни опити могат да сринат приложението.

**Как OmniRoute го решава:**

- **Прекъсвач за всеки доставчик** — Автоматично отваряне/затваряне с конфигурируеми прагове и изчакване (затворено/отворено/полуотворено)
- **Exponential Backoff** — Прогресивни забавяния при повторен опит
- **Anti-Thundering Herd** — Mutex + семафорна защита срещу едновременни повторни бури
- **Combo Fallback Chains** — Ако основният доставчик се провали, автоматично преминава през веригата без намеса
- **Combo Circuit Breaker** — Автоматично деактивира неизправните доставчици в рамките на комбинирана верига
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Health Dashboard** — Мониторинг на времето на работа, състояния на прекъсвачи, блокировки, статистика на кеша, латентност на p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Конфигурирането на всеки AI инструмент е досадно и повтарящо се“ </b></summary>

Разработчиците използват Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Всеки инструмент се нуждае от различна конфигурация (крайна точка на API, ключ, модел). Преконфигурирането при смяна на доставчик или модел е загуба на време.

**Как OmniRoute го решава:**

- **CLI Tools Dashboard** — Специална страница с настройка с едно кликване за Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Генерира `chatLanguageModels.json` за VS код с групов избор на модел
- **Onboarding Wizard** — Насочвана настройка в 4 стъпки за потребители за първи път
- **Една крайна точка, всички модели** — Конфигурирайте `http://localhost:20128/v1` веднъж, достъп до 36+ доставчици

</details>

<details>
<summary><b>🔑 8. „Управлението на OAuth токени от множество доставчици е ад“ </b></summary>

Claude Code, Codex, Gemini CLI, Copilot — всички използват OAuth 2.0 с изтичащи токени. Разработчиците трябва постоянно да се удостоверяват повторно, да се справят с `client_secret is missing`, `redirect_uri_mismatch` и повреди на отдалечени сървъри. OAuth на LAN/VPS е особено проблематичен.

**Как OmniRoute го решава:**

- **Auto Token Refresh** — OAuth токените се опресняват във фонов режим преди изтичане
- **OAuth 2.0 (PKCE) Вграден** — Автоматичен поток за Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Множество акаунти на доставчик чрез JWT/ID извличане на токени
- **OAuth LAN/Remote Fix** — Частно IP откриване за `redirect_uri` + ръчен URL режим за отдалечени сървъри
- **OAuth зад Nginx** — Използва `window.location.origin` за обратна прокси съвместимост
- **Отдалечено ръководство за OAuth** — Ръководство стъпка по стъпка за идентификационни данни на Google Cloud на VPS/Docker

</details>

<details>
<summary><b>📊 9. „Не знам колко харча или къде“ </b></summary>

Разработчиците използват множество платени доставчици, но нямат унифициран поглед върху разходите. Всеки доставчик има собствено табло за таксуване, но няма консолидиран изглед. Неочакваните разходи могат да се натрупат.

**Как OmniRoute го решава:**

- **Табло за анализ на разходите** — Проследяване на разходите за токени и управление на бюджета за доставчик
- **Бюджетни ограничения за ниво** — Таван на разходите за ниво, което задейства автоматично резервно връщане
- **Конфигурация на ценообразуване за модел** — Конфигурируеми цени за модел- **Статистика на използването на API ключ** — Брой заявки и последно използвано клеймо за всеки ключ
- **Табло за управление на анализи** — Статистически карти, диаграма на използването на модела, таблица на доставчика с проценти на успех и закъснение

</details>

<details>
<summary><b>🐛 10. „Не мога да диагностицирам грешки и проблеми в AI повиквания“ </b></summary>

Когато обаждането е неуспешно, разработчикът не знае дали е ограничение на скоростта, изтекъл токен, грешен формат или грешка на доставчика. Фрагментирани регистрационни файлове в различни терминали. Без възможност за наблюдение отстраняването на грешки е метод проба-грешка.

**Как OmniRoute го решава:**

- **Табло за управление на унифицирани регистрационни файлове** — 4 раздела: регистрационни файлове за заявки, регистрационни файлове за прокси, регистрационни файлове за одит, конзола
- **Console Log Viewer** — Преглед в стил терминал в реално време с цветно кодирани нива, автоматично превъртане, търсене, филтър
- **SQLite Proxy Logs** — Постоянни регистрационни файлове, които оцеляват при рестартиране на сървъра
- **Translator Playground** — 4 режима за отстраняване на грешки: Playground (превод на формат), Chat Tester (обиколно пътуване), Test Bench (партида), Live Monitor (в реално време)
- **Заявка за телеметрия** — p50/p95/p99 латентност + проследяване на X-Request-Id
- **Регистриране на базата на файлове с ротация** — Прехващачът на конзолата улавя всичко в JSON журнал с ротация, базирана на размера

</details>

<details>
<summary><b>🏗️ 11. „Внедряването и поддържането на шлюза е сложно“ </b></summary>

Инсталирането, конфигурирането и поддържането на AI прокси в различни среди (локални, VPS, Docker, облак) е трудоемко. Проблеми като твърдо кодирани пътища, `EACCES` в директории, конфликти на портове и междуплатформени компилации добавят триене.

**Как OmniRoute го решава:**

- **глобално инсталиране на npm** — `npm install -g omniroute && omniroute` — готово
- **Docker Multi-Platform** — роден AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (без CLI инструменти) и `cli` (с Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — родно приложение за Windows/macOS/Linux със системна област, автоматично стартиране, офлайн режим
- **Split-Port Mode** — API и табло за управление на отделни портове за разширени сценарии (обратен прокси, контейнерна мрежа)
- **Cloud Sync** — Конфигуриране на синхронизиране между устройства чрез Cloudflare Workers
- **DB Backups** — Автоматично архивиране, възстановяване, експортиране и импортиране на всички настройки

</details>

<details>
<summary><b>🌍 12. „Интерфейсът е само на английски и екипът ми не говори английски“ </b></summary>

Екипите в неанглоговорящите страни, особено в Латинска Америка, Азия и Европа, се затрудняват с интерфейси само на английски. Езиковите бариери намаляват приемането и увеличават грешките в конфигурацията.

**Как OmniRoute го решава:**

- **Dashboard i18n — 30 езика** — Преведени всички 500+ клавиша, включително арабски, български, датски, немски, испански, фински, френски, иврит, хинди, унгарски, индонезийски, италиански, японски, корейски, малайски, холандски, норвежки, полски, португалски (PT/BR), румънски, руски, словашки, шведски, тайландски, украински, виетнамски, китайски, филипински, английски
- **RTL Support** — Поддръжка отдясно наляво за арабски и иврит
- **Многоезични READMEs** — 30 пълни превода на документация
- **Избор на език** — Икона на глобус в заглавката за превключване в реално време</details>

<details>
<summary><b>🔄 13. „Имам нужда от повече от чат — имам нужда от вграждания, изображения, аудио“ </b></summary>

AI не е просто завършване на чат. Разработчиците трябва да генерират изображения, да транскрибират аудио, да създават вграждания за RAG, да прекласират документи и да модерират съдържание. Всеки API има различна крайна точка и формат.

**Как OmniRoute го решава:**

- **Вграждания** — `/v1/embeddings` с 6 доставчика и 9+ модела
- **Генериране на изображения** — `/v1/images/generations` с 10 доставчика и 20+ модела (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Текст към видео** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) и SD WebUI
- **Текст към музика** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Аудио транскрипция** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Текст-към-говор** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + съществуващи доставчици
- **Модерации** — `/v1/moderations` — Проверки за безопасност на съдържанието
- **Прекласиране** — `/v1/rerank` — Прекласиране на уместността на документа
- **API за отговори** — Пълна `/v1/responses` поддръжка за Codex

</details>

<details>
<summary><b>🧪 14. „Нямам начин да тествам и сравнявам качеството между моделите“ </b></summary>

Разработчиците искат да знаят кой модел е най-подходящ за техния случай на употреба – код, превод, разсъждения – но ръчното сравняване е бавно. Не съществуват интегрирани инструменти за оценка.

**Как OmniRoute го решава:**

- **Оценки на LLM** — Тестване със златен комплект с 10 предварително заредени случая, обхващащи поздрави, математика, география, генериране на код, съответствие с JSON, превод, маркдаун, отказ за безопасност
- **4 стратегии за съвпадение** — `exact`, `contains`, `regex`, `custom` (JS функция)
- **Translator Playground Test Bench** — Пакетно тестване с множество входове и очаквани изходи, сравнение между доставчици
- **Chat Tester** — Пълно двупосочно пътуване с визуално изобразяване на отговора
- **Монитор на живо** — Поток в реално време на всички заявки, преминаващи през проксито

</details>

<details>
<summary><b>📈 15. „Трябва да мащабирам, без да губя производителност“ </b></summary>

Тъй като обемът на заявките нараства, без кеширане едни и същи въпроси генерират дублиращи се разходи. Без идемпотентност, дубликат иска обработка на отпадъци. Трябва да се спазват ограниченията за тарифите за всеки доставчик.

**Как OmniRoute го решава:**

- **Семантичен кеш** — Двуслоен кеш (подпис + семантичен) намалява разходите и забавянето
- **Request Idempotency** — 5s прозорец за дедупликация за идентични заявки
- **Rate Limit Detection** — RPM на доставчик, минимална разлика и максимално едновременно проследяване
- **Редактируеми ограничения на скоростта** — Конфигурируеми настройки по подразбиране в Настройки → Устойчивост с постоянство
- **API Key Validation Cache** — 3-степенен кеш за производствена производителност
- **Здравно табло с телеметрия** — p50/p95/p99 латентност, статистика на кеша, ъптайм

</details>

<details>
<summary><b>🤖 16. „Искам да контролирам поведението на модела глобално“ </b></summary>Разработчици, които искат всички отговори на конкретен език, със специфичен тон или искат да ограничат токените за мотивиране. Конфигурирането на това във всеки инструмент/заявка е непрактично.

**Как OmniRoute го решава:**

- **Инжектиране на системна подкана** — Глобална подкана, приложена към всички заявки
- **Thinking Budget Validation** — Разсъждаващ контрол на разпределението на токени за всяка заявка (преминаване, автоматично, персонализирано, адаптивно)
- **6 стратегии за маршрутизиране** — Глобални стратегии, които определят как се разпределят заявките
- **Wildcard Router** — моделите `provider/*` маршрутизират динамично към всеки доставчик
- **Combo Enable/Disable Toggle** — Превключвайте комбинации директно от таблото за управление
- **Превключване на доставчика** — Активирайте/деактивирайте всички връзки за доставчик с едно щракване
- **Блокирани доставчици** — Изключете определени доставчици от списъка `/v1/models`

</details>

<details>
<summary><b>🧰 17. „Имам нужда от MCP инструменти като първокласни продуктови възможности“ </b></summary>

Много AI шлюзове разкриват MCP само като скрит детайл за изпълнение. Екипите се нуждаят от видим, управляем оперативен слой.

**Как OmniRoute го решава:**

- MCP се появява в раздела за навигация на таблото за управление и протокол на крайна точка
- Специализирана страница за управление на MCP с процес, инструменти, обхвати и одит
- Вграден бърз старт за `omniroute --mcp` и включване на клиента

</details>

<details>
<summary><b>🧠 18. „Имам нужда от A2A оркестрация със синхронизиране + пътеки на задачи за поток“ </b></summary>

Работните потоци на агентите се нуждаят както от директни отговори, така и от дълготрайно поточно изпълнение с контрол на жизнения цикъл.

**Как OmniRoute го решава:**

- A2A JSON-RPC крайна точка (`POST /a2a`) с `message/send` и `message/stream`
- SSE поточно предаване с разпространение на състоянието на терминала
- API на жизнения цикъл на задачата за `tasks/get` и `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Имам нужда от реално състояние на MCP процес, а не от познат статус“ </b></summary>

Оперативните екипи трябва да знаят дали MCP действително е жив, а не само дали API е достъпен.

**Как OmniRoute го решава:**

- Сърдечен файл по време на изпълнение с PID, времеви отпечатъци, транспорт, брой инструменти и режим на обхват
- API за състояние на MCP, комбиниращ сърдечен ритъм + скорошна активност
- Карти за състояние на потребителския интерфейс за свежест на процеса/време на работа/пулс

</details>

<details>
<summary><b>📋 20. „Имам нужда от изпълнение на MCP инструмент с възможност за проверка“ </b></summary>

Когато инструментите променят конфигурацията или задействат оперативни действия, екипите се нуждаят от криминалистична проследимост.

**Как OmniRoute го решава:**

- Поддържано от SQLite одитно регистриране за извиквания на MCP инструмент
- Филтрира по инструмент, успех/неуспех, API ключ и пагинация
- Таблица за одит на таблото + статистически крайни точки за автоматизация

</details>

<details>
<summary><b>🔐 21. „Имам нужда от MCP разрешения с обхват за интеграция“ </b></summary>

Различните клиенти трябва да имат най-малко привилегирован достъп до категории инструменти.

**Как OmniRoute го решава:**

- 9 гранулирани MCP обхвата за контролиран достъп до инструмента
- Налагане на обхват и видимост в потребителския интерфейс за управление на MCP
- Безопасна поза по подразбиране за оперативни инструменти

</details>

<details><summary><b>⚙️ 22. „Имам нужда от оперативни контроли без повторно разполагане“ </b></summary>

Екипите се нуждаят от бързи промени във времето на изпълнение по време на инциденти или разходни събития.

**Как OmniRoute го решава:**

- Превключете комбо активирането директно от таблото за управление на MCP
- Прилагайте профили на устойчивост от предварително дефинирани пакети с правила
- Нулирайте състоянието на прекъсвача от същия операционен панел

</details>

<details>
<summary><b>🔄 23. „Имам нужда от видимост и анулиране на жизнения цикъл на задачите A2A на живо“ </b></summary>

Без видимост на жизнения цикъл инцидентите със задачи стават трудни за сортиране.

**Как OmniRoute го решава:**

- Списък със задачи/филтриране по състояние/умение с пагинация
- Разбивка на метаданни, събития и артефакти на задачи
- Крайна точка за анулиране на задача и действие на потребителския интерфейс с потвърждение

</details>

<details>
<summary><b>🌊 24. „Имам нужда от показатели за активен поток за A2A натоварване“ </b></summary>

Поточните работни потоци изискват оперативно вникване в паралелността и живите връзки.

**Как OmniRoute го решава:**

- Броячи на активни потоци, интегрирани в статуса A2A
- Времево клеймо на последната задача и брой на състоянието
- A2A карти на таблото за наблюдение на операциите в реално време

</details>

<details>
<summary><b>🪪 25. „Имам нужда от стандартно откриване на агент за клиенти“ </b></summary>

Външните клиенти и оркестраторите се нуждаят от машинночетими метаданни за включване.

**Как OmniRoute го решава:**

- Карта на агент, изложена на `/.well-known/agent.json`
- Възможности и умения, показани в потребителския интерфейс за управление
- API за състояние A2A включва метаданни за откриване за автоматизация

</details>

<details>
<summary><b>🧭 26. „Имам нужда от откриваемост на протокола в UX на продукта“ </b></summary>

Ако потребителите не могат да открият повърхности на протокола, качеството на приемане и поддръжка пада.

**Как OmniRoute го решава:**

- Записи в страничната лента за MCP и A2A
- Страница с крайна точка Раздел Протоколи с бърз старт и състояние
- Връзки от преглед към специални табла за управление

</details>

<details>
<summary><b>🧪 27. „Имам нужда от валидиране на протокол от край до край с реални клиенти“ </b></summary>

Фалшивите тестове не са достатъчни за валидиране на съвместимостта на протокола преди пускане.

**Как OmniRoute го решава:**

- E2E пакет, който зарежда приложение и използва реален MCP SDK клиентски транспорт
- Клиент A2A тества за потоци откриване, изпращане, поточно предаване, получаване и отмяна
- Кръстосана проверка на твърдения срещу MCP одит и API на A2A задачи

</details>

<details>
<summary><b>📡 28. „Имам нужда от унифицирана наблюдаемост във всички интерфейси“ </b></summary>

Разделянето на наблюдаемостта по протокол създава слепи зони и по-дълъг MTTR.

**Как OmniRoute го решава:**

- Унифицирани табла за управление/логове/аналитика в един продукт
- Здраве + одит + заявка за телеметрия в OpenAI, MCP и A2A слоеве
- Оперативни API за статус и автоматизация

</details>

<details>
<summary><b>💼 29. „Имам нужда от едно време за изпълнение за прокси + инструменти + оркестрация на агенти“ </b></summary>

Изпълнението на много отделни услуги увеличава оперативните разходи и режимите на отказ.

**Как OmniRoute го решава:**- OpenAI-съвместим прокси, MCP сървър и A2A сървър в един стек

- Споделено удостоверяване, устойчивост, съхранение на данни и възможност за наблюдение
- Последователен модел на политика във всички повърхности на взаимодействие

</details>

<details>
<summary><b>🚀 30. „Трябва да изпратя агентски работни потоци без разрастване на лепен код“ </b></summary>

Екипите губят скорост, когато свързват множество ad-hoc услуги и скриптове.

**Как OmniRoute го решава:**

- Единна стратегия за крайни точки за клиенти и агенти
- Вграден потребителски интерфейс за управление на протоколи и пътеки за проверка на дим
- Готови за производство основи (сигурност, регистриране, устойчивост, архивиране)

</details>

### Примерни книги за игри (интегрирани случаи на употреба)

**Playbook A: Увеличете максимално платения абонамент + евтино архивиране**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Стек за кодиране с нулеви разходи**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 винаги включена резервна верига**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Операции на агент с MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Бърз старт

### 1) Инсталирайте и стартирайте

```bash
npm install -g omniroute
omniroute
```

Таблото за управление се отваря на `http://localhost:20128` и основният URL адрес на API е `http://localhost:20128/v1`.

| Команда                 | Описание                                                                     |
| ----------------------- | ---------------------------------------------------------------------------- |
| `omniroute`             | Стартиране на сървър (`PORT=20128`, API и табло за управление на същия порт) |
| `omniroute --port 3000` | Задайте каноничен/API порт на 3000                                           |
| `omniroute --mcp`       | Стартирайте MCP сървър (stdio транспорт)                                     |
| `omniroute --no-open`   | Без автоматично отваряне на браузъра                                         |
| `omniroute --help`      | Показване на помощ                                                           |

Допълнителен режим на разделен порт:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Свържете доставчици и създайте своя API ключ

1. Отворете таблото за управление → `Providers` и свържете поне един доставчик (OAuth или API ключ).
2. Отворете таблото за управление → `Endpoint` и създайте API ключ.
3. (По избор) Отворете таблото за управление → `Combos` и задайте вашата резервна верига.

### 3) Насочете вашия инструмент за кодиране към OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Работи с Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode и OpenAI-съвместими SDK.

### 4) Активиране и валидиране на протоколи (v2.0)

**MCP (за операции, управлявани от инструмент):**

```bash
omniroute --mcp
```

След това свържете вашия MCP клиент през `stdio` и тествайте инструменти като:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (за работни процеси от агент към агент):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Валидирайте всичко от край до край (препоръчително)

```bash
npm run test:protocols:e2e
```

Този пакет валидира реални MCP и A2A клиентски потоци срещу работещо приложение.

### Алтернатива: стартирайте от източника

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Докер

OmniRoute се предлага като публично изображение на Docker в [Docker Hub] (https://hub.docker.com/r/diegosouzapw/omniroute).

**Бързо бягане:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**С файл на средата:**

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

**Използване на Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Изображение              | Етикет   | Размер | Описание                   |
| ------------------------ | -------- | ------ | -------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Най-новата стабилна версия |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | Текуща версия              |

---

## 🖥️

Стартирайте OmniRoute като самостоятелно настолно приложение — без терминал, без браузър, без интернет, необходим за локалните модели. Базираното на Electron приложение включва:

- 🖥️ **Собствен прозорец** — Специален прозорец на приложението с интеграция в системната област
- 🔄 **Автоматично стартиране** — Стартирайте OmniRoute при влизане в системата
- 🔔 **Нативни известия** — Получавайте сигнали за изчерпване на квотата или проблеми с доставчика
- ⚡ **Инсталиране с едно щракване** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Офлайн режим** — Работи напълно офлайн с пакетния сървър

### Бърз старт

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Системна област

Когато е минимизиран, OmniRoute живее в системната област с бързи действия:

- Отворете таблото
- Промяна на сървърния порт
- Излезте от приложението

📖 Пълна документация: [`electron/README.md`](electron/README.md)

---

## 💰 Ценообразуването с един поглед

| Ниво               | Доставчик         | Цена                         | Нулиране на квота       | Най-добро за              |
| ------------------ | ----------------- | ---------------------------- | ----------------------- | ------------------------- |
| **💳 АБОНАМЕНТ**   | Claude Code (Pro) | $20/месец                    | 5 часа + седмично       | Вече сте абонирани        |
|                    | Codex (Plus/Pro)  | $20-200/месец                | 5 часа + седмично       | Потребители на OpenAI     |
|                    | Gemini CLI        | **БЕЗПЛАТНО**                | 180K/месец + 1K/ден     | всички!                   |
|                    | Копилот на GitHub | $10-19/месец                 | Месечно                 | Потребители на GitHub     |
| **🔑 КЛЮЧ ЗА API** | NVIDIA NIM        | **БЕЗПЛАТНО** (1000 кредита) | Еднократно              | Безплатно ниво тестване   |
|                    | DeepSeek          | Плащане при използване       | Няма                    | Най-добра цена/качество   |
|                    | Groq              | Безплатно ниво + платено     | Ограничена скорост      | Свръхбърз извод           |
|                    | xAI (Grok)        | Плащане при използване       | Няма                    | Grok модели               |
|                    | Мистрал           | Безплатно ниво + платено     | Ограничена скорост      | Европейски AI             |
|                    | OpenRouter        | Плащане при използване       | Няма                    | 100+ модела               |
| **💰 ЕВТИНО**      | GLM-4.7           | $0,6/1 милион                | Ежедневно 10 сутринта   | Резервно копие на бюджета |
|                    | MiniMax M2.1      | $0,2/1 милион                | 5-часово търкаляне      | Най-евтиният вариант      |
|                    | Кими К2           | $9/месец апартамент          | 10 милиона токена/месец | Предвидими разходи        |
| **🆓 БЕЗПЛАТНО**   | iFlow             | $0                           | Неограничен             | 8 модела безплатно        |
|                    | Куен              | $0                           | Неограничен             | 3 модела безплатно        |
|                    | Киро              | $0                           | Неограничен             | Клод безплатно            |

**💡 Професионален съвет:** Започнете с Gemini CLI (180K безплатно/месец) + iFlow (неограничено безплатно) комбинация = $0 цена!

---

## 💡 Основни характеристики

OmniRoute v2.0 е създаден като операционна платформа, а не просто релейно прокси.

### 🤖 Операции на агент и протокол (v2.0)| Характеристика | Какво прави |

| ------------------------------------ | -------------------------------------------------------------------------------- |
| 🔧 **MCP сървър (16 инструмента)** | Инструментите за IDE/агент контролират маршрутизиране, здраве, комбинации, ограничения и операции | IDE/agent tools via 3 transports: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`)
| 🤝 **A2A сървър (JSON-RPC + SSE)** | Изпълнение на задачи от агент към агент със синхронизиране и поточно предаване |
| 🧭 **Consolidated Endpoints Page** | Tabbed management page with Endpoint Proxy, MCP, A2A, and API Endpoints tabs |
| 🎚️ **Service Enable/Disable Toggles** | ON/OFF switches for MCP and A2A with settings persistence (default: OFF) |
| 🛰️ **MCP Runtime Heartbeat** | Реално състояние на процеса (pid, време на работа, възраст на сърдечния ритъм, транспорт, режим на обхвата) |
| 📋 **MCP одитна пътека** | Филтрируеми журнали за одит с успех/неуспех и ключово приписване |
| 🔐 **Прилагане на обхват на MCP** | 9 подробни разрешения за обхват за контролиран достъп до инструменти |
| 📡 **A2A Управление на жизнения цикъл на задачите** | Списък/филтриране на задачи, проверка на събития/артефакти, отмяна на изпълнявани задачи |
| 📋 **Откриване на карта на агент** | `/.well-known/agent.json` за автоматично откриване на клиент |
| 🧪 **Протокол E2E Тестова система** | Истински MCP SDK + A2A клиентски потоци в `test:protocols:e2e` |
| ⚙️ **Оперативни контроли** | Превключете комбо, приложете профили на устойчивост, нулирайте прекъсвачите от една контролна повърхност |

### 🧠 Маршрутизиране и разузнаване

| Характеристика                                  | Какво прави                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| 🎯 **Интелигентен 4-степенен резервен вариант** | Автоматичен маршрут: Абонамент → API ключ → Евтини → Безплатно               |
| 📊 **Проследяване на квоти в реално време**     | Брой токени на живо + нулиране на обратното броене на доставчик              |
| 🔄 **Форматиране на превода**                   | OpenAI ↔ Claude ↔ Gemini ↔ Отговори с безопасни за схема преобразувания      |
| 👥 **Поддръжка за множество акаунти**           | Няколко акаунта на доставчик с интелигентен избор                            |
| 🔄 **Автоматично опресняване на токени**        | OAuth токените се опресняват автоматично с повторен опит                     |
| 🎨 **Персонализирани комбинации**               | 6 стратегии за балансиране + резервен контрол на веригата                    |
| 🌐 **Wildcard Router**                          | `provider/*` динамично маршрутизиране                                        |
| 🧠 **Мислене за контрол на бюджета**            | Лимити за преминаване, автоматични, персонализирани и адаптивни разсъждения  |
| 🔀 **Псевдоними на модели**                     | Вграден + персонализиран псевдоним на модела и безопасност на миграцията     |
| ⚡ **Влошаване на фона**                        | Насочване на фонови задачи с нисък приоритет към по-евтини модели            |
| 💬 **Системно бързо инжектиране**               | Глобални контроли на поведението, прилагани последователно                   |
| 📄 **Съвместимост с API за отговори**           | Пълна `/v1/responses` поддръжка за Codex и разширени агентни работни процеси |

### 🎵 Мултимодални API

| Характеристика | Какво прави || -------------------------- | ------------------------------------------------------------ |
| 🖼️ **Генериране на изображения** | `/v1/images/generations` с облак и локален бекенд |
| 📐 **Вграждания** | `/v1/embeddings` за търсене и RAG тръбопроводи |
| 🎤 **Аудио транскрипция** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Текст към говор** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) |
| 🎬 **Видео генериране** | `/v1/videos/generations` (работни процеси ComfyUI + SD WebUI) |
| 🎵 **Музикално поколение** | `/v1/music/generations` (работни процеси на ComfyUI) |
| 🛡️ **Модерации** | `/v1/moderations` проверки за безопасност |
| 🔀 **Прекласиране** | `/v1/rerank` за оценка на уместността |

### 🛡️ Устойчивост, сигурност и управление

| Характеристика                               | Какво прави                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Прекъсвачи**                            | Пътуване/възстановяване на ниво доставчик с прагови контроли                           |
| 🛡️ **Anti-Thundering Herd**                  | Защита на Mutex + семафор при събития за повторен опит/скорост                         |
| 🧠 **Семантичен + кеш на подписа**           | Намаляване на разходите/закъснението с два кеш слоя                                    |
| ⚡ **Искане на идемпотентност**              | Дублиран защитен прозорец                                                              |
| 🔒 **TLS Fingerprint Spoofing**              | По-добра съвместимост с доставчици, филтрирани срещу бот                               |
| 🔏 **CLI Fingerprint Matching**              | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **IP филтриране**                         | Списък с разрешени/списъци с блокирани контроли за открити внедрявания                 |
| 📊 **Редактируеми ограничения на скоростта** | Конфигурируеми глобални/на ниво доставчик ограничения с постоянство                    |
| 🔑 **API Key Management + Scoping**          | Сигурно издаване/ротация на ключове и контроли на модел/доставчик                      |
| 🛡️ **Защитен `/models`**                     | Опционално удостоверяване и скриване на доставчик за каталог на модели                 |

### 📊 Наблюдаемост и анализ

| Характеристика                                                   | Какво прави                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 📝 **Заявка + Регистриране на прокси сървър**                    | Пълно регистриране на заявка/отговор и прокси                            |
| 📋 **Табло за управление на унифицирани регистрационни файлове** | Изгледи на заявка, прокси, одит и конзола на една страница               |
| 🔍 **Заявка за телеметрия**                                      | p50/p95/p99 латентност и проследяване на заявки                          |
| 🏥 **Здравно табло**                                             | Време на работа, състояния на прекъсване, блокировки, статистика на кеша |
| 💰 **Проследяване на разходите**                                 | Контрол на бюджета и видимост на ценообразуването за модел               |
| 📈 **Аналитични визуализации**                                   | Прозрения за използването на модел/доставчик и изгледи на тенденции      |
| 🧪 **Рамка за оценка**                                           | Тестване на златен набор с конфигурируеми стратегии за мач               |

### ☁️ Внедряване и платформа

| Характеристика                            | Какво прави                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- | --- | ----------------------------- | ------------------------------------------------------ |
| 🌐 **Разполагане навсякъде**              | Localhost, VPS, Docker, облачни среди                                     |     | 💾 **Синхронизиране в облак** | Синхронизиране на конфигурацията чрез облачен работник |
| 🔄 **Архивиране/Възстановяване**          | Експорт/импорт и потоци за възстановяване след бедствие                   |
| 🧙 **Съветник за присъединяване**         | Насочвана настройка при първо стартиране                                  |
| 🔧 **CLI Tools Dashboard**                | Настройка с едно щракване за популярни инструменти за кодиране            |
| 🌐 **i18n (30 езика)**                    | Пълно табло за управление + езикова поддръжка на документи с RTL покритие |
| 📂 **Директория с персонализирани данни** | `DATA_DIR` отмяна за място за съхранение                                  |

### Функция Deep Dive

#### Интелигентен резервен вариант с практичен контрол на разходите

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Когато квотата, скоростта или здравето са неуспешни, OmniRoute автоматично преминава към следващия кандидат без ръчно превключване.

#### Управление на протоколи, което е видимо и работещо

- MCP + A2A са откриваеми в UI и документи (не са скрити)
- API за състояние на протокола разкриват оперативни данни на живо (`/api/mcp/*`, `/api/a2a/*`)
- Таблата за управление включват действия за операции от ден 2 (комбо превключвания, нулиране на прекъсвача, анулиране на задача)

#### Преводач + работен процес за валидиране

Зоната за преводач включва:

- **Playground**: поискайте проверки за трансформация
- **Chat Tester**: пълна заявка/отговор двупосочно
- **Тестова стенда**: множество случаи в едно изпълнение
- **Монитор на живо**: изглед на трафика в реално време

Плюс валидиране на протокол с реални клиенти чрез `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Справка за инструмента, IDE конфигурации и примери за клиенти
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Умения, JSON-RPC методи, поточно предаване и жизнен цикъл на задачите

## 🧪 Оценки (Evals)

OmniRoute включва вградена рамка за оценка за тестване на качеството на отговора на LLM спрямо златен набор. Достъп до него чрез **Analytics → Evals** в таблото за управление.

### Вграден златен комплект

Предварително зареденият "OmniRoute Golden Set" съдържа тестови случаи за:

- Поздрави, математика, география, генериране на код
- Съответствие с JSON формат, превод, генериране на маркдаун
- Отказ за безопасност (вредно съдържание), броене, булева логика

### Стратегии за оценка

| Стратегия  | Описание                                                                | Пример                           |
| ---------- | ----------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Изходът трябва да съвпада точно                                         | `"4"`                            |
| `contains` | Изходът трябва да съдържа подниз (без значение за малки и големи букви) | `"Paris"`                        |
| `regex`    | Изходът трябва да съответства на модела на регулярен израз              | `"1.*2.*3"`                      |
| `custom`   | Персонализираната JS функция връща true/false                           | `(output) => output.length > 10` |

---

## 📖 Ръководство за настройка

### Настройка на протокол (MCP + A2A)

<details>
<summary><b>🧩 Настройка на MCP (протокол на контекста на модела) </b></summary>

Стартирайте MCP транспорт в режим stdio:

```bash
omniroute --mcp
```

Препоръчителен поток за валидиране:

1. Свържете вашия MCP клиент през stdio.
2. Стартирайте `omniroute_get_health`.
3. Стартирайте `omniroute_list_combos`.
4. Отворете `/dashboard/mcp`, за да потвърдите сърдечен ритъм, активност и проверка.

Полезни API за автоматизация:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details><summary><b>🤝 Настройка на A2A (Agent2Agent)</b></summary>

Открийте агента:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Изпратете задача:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Управление на жизнения цикъл:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Оперативен потребителски интерфейс:

- `/dashboard/a2a` за видимост на задача/състояние/поток и димни действия

</details>

<details>
<summary><b>🧪 Проверка на протокол от край до край</b></summary>

Валидирайте и двата протокола с реални клиенти:

```bash
npm run test:protocols:e2e
```

Това потвърждава:

- MCP SDK клиент за свързване/списък/обаждане
- A2A откриване/изпращане/поток/получаване/отказ
- Кръстосана проверка на данни в MCP одит и API за управление на задачи A2A

</details>

<details>
<summary><b>💳 Доставчици на абонамент </b></summary>

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

**Професионален съвет:** Използвайте Opus за сложни задачи, Sonnet за скорост. OmniRoute проследява квота за модел!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (БЕЗПЛАТНО 180K/месец!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Най-добра стойност:** Огромно безплатно ниво! Използвайте това преди платените нива.

### Копилот на GitHub

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
<summary><b>🔑 API ключови доставчици</b></summary>

### NVIDIA NIM (БЕЗПЛАТНИ 1000 кредита!)

1. Регистрирайте се: [build.nvidia.com](https://build.nvidia.com)
2. Вземете безплатен API ключ (включени 1000 кредита за изводи)
3. Табло → Добавяне на доставчик → NVIDIA NIM:
   - API ключ: `nvapi-your-key`

**Модели:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` и още 50+

**Професионален съвет:** OpenAI-съвместим API — работи безпроблемно с превода на формати на OmniRoute!

### DeepSeek

1. Регистрирайте се: [platform.deepseek.com](https://platform.deepseek.com)
2. Вземете API ключ
3. Табло → Добавяне на доставчик → DeepSeek

**Модели:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (налично безплатно ниво!)

1. Регистрирайте се: [console.groq.com](https://console.groq.com)
2. Вземете API ключ (включено безплатно ниво)
3. Табло → Добавяне на доставчик → Groq

**Модели:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Професионален съвет:** Изключително бърз извод — най-добър за кодиране в реално време!

### OpenRouter (100+ модела)

1. Регистрирайте се: [openrouter.ai](https://openrouter.ai)
2. Вземете API ключ
3. Табло → Добавяне на доставчик → OpenRouter

**Модели:** Достъп до 100+ модела от всички основни доставчици чрез един API ключ.

</details>

<details>
<summary><b>💰 Евтини доставчици (резервни) </b></summary>

### GLM-4.7 (Ежедневно нулиране, $0,6/1 млн.)

1. Регистрирайте се: [Zhipu AI](https://open.bigmodel.cn/)
2. Вземете API ключ от Coding Plan
3. Табло → Добавяне на API ключ:
   - Доставчик: `glm`
   - API ключ: `your-key`

**Използване:** `glm/glm-4.7`

**Професионален съвет:** Планът за кодиране предлага 3× квота на цена 1/7! Нулирайте всеки ден в 10:00 ч.

### MiniMax M2.1 (5 часа нулиране, $0,20/1 млн.)

1. Регистрирайте се: [MiniMax](https://www.minimax.io/)
2. Вземете API ключ
3. Табло → Добавяне на API ключ

**Използване:** `minimax/MiniMax-M2.1`

**Професионален съвет:** Най-евтината опция за дълъг контекст (1M токени)!

### Kimi K2 ($9/месец фиксиран)

1. Абонирайте се: [Moonshot AI](https://platform.moonshot.ai/)
2. Вземете API ключ
3. Табло → Добавяне на API ключ

**Използване:** `kimi/kimi-latest`

**Професионален съвет:** Фиксирани $9/месец за 10 милиона токена = $0,90/1 милион ефективна цена!

</details>

<details>
<summary><b>🆓 БЕЗПЛАТНИ доставчици (Спешно архивиране)</b></summary>

### iFlow (8 БЕЗПЛАТНИ модела)```bash

Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
if/kimi-k2-thinking
if/qwen3-coder-plus
if/glm-4.7
if/minimax-m2
if/deepseek-r1

````

### Qwen (3 БЕЗПЛАТНИ модела)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
````

### Киро (Клод БЕЗПЛАТНО)

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
<summary><b>🎨 Създаване на комбинации</b></summary>

### Пример 1: Увеличаване на абонамента → Евтино архивиране

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Пример 2: Само безплатно (нулева цена)

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
<summary><b>🔧 CLI интеграция</b></summary>

### Курсор IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Клод Код

Използвайте страницата **CLI Tools** в таблото за управление за конфигурация с едно кликване или редактирайте `~/.claude/settings.json` ръчно.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Вариант 1 — Табло (препоръчително):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Опция 2 — Ръчно:** Редактиране на `~/.openclaw/openclaw.json`:

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

> **Забележка:** OpenClaw работи само с локален OmniRoute. Използвайте `127.0.0.1` вместо `localhost`, за да избегнете проблеми с разрешаването на IPv6.

### Cline / Продължи / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Стъпка 1:** Добавете OmniRoute като персонализиран доставчик:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Стъпка 2:** Създайте/редактирайте `opencode.json` в корена на вашия проект:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Стъпка 3:** Изберете модела в OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Съвет:** Добавете всеки модел, наличен във вашата крайна точка OmniRoute `/v1/models`, към секцията `models`. Използвайте формата `provider/model-id` от таблото за управление на OmniRoute.

</details>

---

## 🐛 Отстраняване на неизправности

<details>
<summary><b>Щракнете, за да разширите ръководството за отстраняване на неизправности</b></summary>

**„Езиковият модел не предостави съобщения“**

- Квотата на доставчика е изчерпана → Проверете инструмента за проследяване на квотата на таблото за управление
- Решение: Използвайте комбо резервен вариант или преминете към по-евтино ниво

**Ограничаване на скоростта**

- Изчерпване на квотата за абонамент → Резервно връщане към GLM/MiniMax
- Добавяне на комбинация: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth токенът е изтекъл**

- Автоматично опресняване от OmniRoute
- Ако проблемите продължават: Табло → Доставчик → Повторно свързване

**Високи разходи**

- Проверете статистическите данни за използването в Табло → Разходи
- Превключете основния модел към GLM/MiniMax
- Използвайте безплатно ниво (Gemini CLI, iFlow) за некритични задачи

**Портовете на таблото/API са грешни**

- `PORT` е каноничният базов порт (и API порт по подразбиране)
- `API_PORT` отменя само OpenAI-съвместим API слушател
- `DASHBOARD_PORT` отменя само слушателя на таблото за управление/Next.js
- Задайте `NEXT_PUBLIC_BASE_URL` на вашето табло за управление/публичен URL (за OAuth обратни извиквания)

**Грешки при синхронизиране в облак**

- Проверете дали `BASE_URL` сочи към вашия работещ екземпляр
- Уверете се, че `CLOUD_URL` сочи към вашата очаквана крайна точка в облака
- Поддържайте стойностите на `NEXT_PUBLIC_*` в съответствие със стойностите от страна на сървъра

**Първото влизане не работи**

- Проверете `INITIAL_PASSWORD` в `.env`
- Ако не е зададена, резервната парола е `123456`

**Няма регистрационни файлове за заявки**

- Задайте `ENABLE_REQUEST_LOGS=true` в `.env`

**Тестът за връзка показва „Невалидно“ за OpenAI-съвместими доставчици**

- Много доставчици не излагат крайна точка `/models`
- OmniRoute v1.0.6+ включва резервно валидиране чрез завършвания на чат
- Уверете се, че основният URL адрес включва суфикс `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ ВАЖНО за ползване на OmniRoute em VPS/Docker/servidor remoto**

#### OAuth

Като удостоверение за OAuth не е OmniRoute estão cadastradas **apenas para `localhost`**. Ако имате достъп до OmniRoute в дистанционния сървър (напр.: `https://omniroute.meuservidor.com`), или Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Решение: Конфигурирайте собствените си права за удостоверяване на OAuth

Изпишете точно **OAuth 2.0 Client ID** без Google Cloud Console чрез URI на вашия сървър.

#### Passo a passo

**1. Достъп до Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Кликнете върху **"+ Създаване на идентификационни данни"** → **"OAuth клиентски идентификатор"**
- Tipo de aplicativo: **"Уеб приложение"**
- Име: escolha qualquer nome (напр.: `OmniRoute Remote`)

**3. Adicione като оторизирани URI адреси за пренасочване**

Без поле **„Оторизирани URI адреси за пренасочване“**, добавете:

```
https://seu-servidor.com/callback
```

> Замяна на `seu-servidor.com` pelo domínio или IP на вашия сървър (включително необходим порт, напр.: `http://45.33.32.156:20128/callback`).

**4. Salve e copie as credenciais**

Например, Google показва **Клиентски идентификатор** и **Клиентска тайна**.

**5. Конфигуриране като variáveis de ambiente**

Нямате `.env` (или нашите варианти на околната среда на Docker):

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

Табло → Доставчици → Антигравитация (или Gemini CLI) → OAuth

Agora или Google пренасочва корекции за `https://seu-servidor.com/callback` и функционира автентичност.

---

#### Временно заобиколно решение (само за конфигуриране на удостоверения)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute премахва URL адрес за авторизация от Google
2. Ако не сте авторизирани, пренасочването на Google е пренасочено за `localhost` (което не е отдалечено от сървъра)
3. **Копирайте пълния URL адрес** от страницата, която искате да прехвърлите в своя браузър (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Щракнете върху **"Свързване"**

> Това заобиколно решение функционира, ако кодът на авторизацията на URL е валиден независимо от пренасочването към пренасочване или не.

</details>

---

## 🛠️

<details>
<summary><b>Щракнете, за да разширите подробностите за технически стек </b></summary>

- **Време на изпълнение**: Node.js 18–22 LTS (⚠️ Node.js 24+ **не се поддържа** — родните двоични файлове на `better-sqlite3` са несъвместими)
- **Език**: TypeScript 5.9 — **100% TypeScript** в `src/` и `open-sse/` (нула `any` в основните модули от v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **База данни**: LowDB (JSON) + SQLite (състояние на домейна + регистрационни файлове на прокси + MCP одит + решения за маршрутизиране)
- **Схеми**: Zod (валидиране на I/O инструмент за MCP, API договори)
- **Протоколи**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Поточно предаване**: Изпратени от сървъра събития (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API ключове + MCP оторизация с обхват
- **Тестване**: Node.js тестов инструмент + Vitest (900+ теста, включително модул, интеграция, E2E)- **CI/CD**: Действия на GitHub (автоматично публикуване на npm + Docker Hub при пускане)
- **Уебсайт**: [omniroute.online](https://omniroute.online)
- **Пакет**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Устойчивост**: прекъсвач, експоненциално отдръпване, анти-гръмотевично стадо, TLS подправяне, автоматично комбинирано самолечение

</details>

---

## 📖 Документация

| Документ                                                      | Описание                                                       |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| [Ръководство на потребителя](docs/USER_GUIDE.md)              | Доставчици, комбинации, CLI интеграция, внедряване             |
| [API справка] (docs/API_REFERENCE.md)                         | Всички крайни точки с примери                                  |
| [MCP сървър] (open-sse/mcp-server/README.md)                  | 16 MCP инструмента, IDE конфигурации, Python/TS/Go клиенти     |
| [A2A сървър] (src/lib/a2a/README.md)                          | JSON-RPC 2.0 протокол, умения, стрийминг, управление на задачи |
| [Автоматичен комбиниран двигател] (docs/auto-combo.md)        | 6-факторно оценяване, пакети с режими, самолечение             |
| [Отстраняване на неизправности](docs/TROUBLESHOOTING.md)      | Често срещани проблеми и решения                               |
| [Архитектура] (docs/ARCHITECTURE.md)                          | Системна архитектура и вътрешност                              |
| [Принос] (CONTRIBUTING.md)                                    | Настройка и насоки за разработка                               |
| [Спецификация на OpenAPI] (docs/openapi.yaml)                 | Спецификация на OpenAPI 3.0                                    |
| [Правила за сигурност](SECURITY.md)                           | Отчитане на уязвимости и практики за сигурност                 |
| [Внедряване на VM] (docs/VM_DEPLOYMENT_GUIDE.md)              | Пълно ръководство: Настройка на VM + nginx + Cloudflare        |
| [Галерия с функции](docs/FEATURES.md)                         | Визуална обиколка на таблото с екранни снимки                  |
| [Списък за проверка на изданието] (docs/RELEASE_CHECKLIST.md) | Стъпки за валидиране преди пускане                             |

---

## 🗺️

OmniRoute има **планирани 210+ функции** в множество фази на разработка. Ето основните области:

| Категория                           | Планирани функции | Акценти                                                                                                                       |
| ----------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Маршрутизиране и разузнаване** | 25+               | Маршрутизиране с най-ниска латентност, маршрутизиране на базата на маркери, предварителен полет на квота, избор на P2C акаунт |
| 🔒 **Сигурност и съответствие**     | 20+               | SSRF укрепване, прикриване на идентификационни данни, ограничение на скоростта за крайна точка, обхват на ключ за управление  |
| 📊 **Наблюдаемост**                 | 15+               | OpenTelemetry интеграция, мониторинг на квоти в реално време, проследяване на разходите за модел                              |
| 🔄 **Интеграции на доставчици**     | 20+               | Регистър на динамичен модел, изчакване на доставчика, Codex за множество акаунти, анализ на квота на Copilot                  |
| ⚡ **Изпълнение**                   | 15+               | Слой с двоен кеш, кеш за подкани, кеш за отговор, поддържане на активността при поточно предаване, партиден API               |
| 🌐 **Екосистема**                   | 10+               | WebSocket API, горещо презареждане на конфигурация, разпределено хранилище за конфигурация, търговски режим                   |

### 🔜 Очаквайте скоро- 🔗 **OpenCode Integration** — Поддръжка на родния доставчик за IDE за кодиране OpenCode AI

- 🔗 **TRAE Integration** — Пълна поддръжка за рамката за разработка на TRAE AI
- 📦 **Batch API** — Асинхронна групова обработка за групови заявки
- 🎯 **Маршрутизиране на базата на етикети** — Маршрутизирайте заявки въз основа на персонализирани тагове и метаданни
- 💰 **Стратегия с най-ниска цена** — Автоматично изберете най-евтиния наличен доставчик

> 📝 Пълните спецификации на функциите са налични в [`docs/new-features/`](docs/new-features/) (217 подробни спецификации)

---

## 👥 Сътрудници

[![Сътрудници](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Как да допринесете

1. Разклонете хранилището
2. Създайте своя клон на функция (`git checkout -b feature/amazing-feature`)
3. Задайте вашите промени (`git commit -m 'Add amazing feature'`)
4. Натиснете до клона (`git push origin feature/amazing-feature`)
5. Отворете заявка за изтегляне

Вижте [CONTRIBUTING.md](CONTRIBUTING.md) за подробни насоки.

### Пускане на нова версия

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Звездна история

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Благодарности

Специални благодарности на **[9router](https://github.com/decolua/9router)** от **[decolua](https://github.com/decolua)** — оригиналният проект, който вдъхнови това разклонение. OmniRoute се основава на тази невероятна основа с допълнителни функции, мултимодални API и пълно пренаписване на TypeScript.

Специални благодарности на **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — оригиналната реализация на Go, която вдъхнови този JavaScript порт.

---

## 📄 Лиценз

Лиценз на MIT – вижте [ЛИЦЕНЗ](LICENSE) за подробности.

---

<div align="center">
  <sub>Създаден с ❤️ за разработчици, които кодират 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub Discussions enabled for community Q&A -->
