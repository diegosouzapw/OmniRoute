# README (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇪🇹 [am](../am/README.md) · 🇸🇦 [ar](../ar/README.md) · 🇦🇿 [az](../az/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇧🇩 [bn](../bn/README.md) · 🇧🇦 [bs](../bs/README.md) · 🇨🇿 [cs](../cs/README.md) · 🇩🇰 [da](../da/README.md) · 🇩🇪 [de](../de/README.md) · 🇬🇷 [el](../el/README.md) · 🇪🇸 [es](../es/README.md) · 🇪🇪 [et](../et/README.md) · 🇮🇷 [fa](../fa/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇮🇪 [ga](../ga/README.md) · 🇮🇳 [gu](../gu/README.md) · 🇳🇬 [ha](../ha/README.md) · 🇮🇱 [he](../he/README.md) · 🇮🇳 [hi](../hi/README.md) · 🇭🇷 [hr](../hr/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇦🇲 [hy](../hy/README.md) · 🇮🇩 [id](../id/README.md) · 🇳🇬 [ig](../ig/README.md) · 🇮🇹 [it](../it/README.md) · 🇯🇵 [ja](../ja/README.md) · 🇬🇪 [ka](../ka/README.md) · 🇰🇭 [km](../km/README.md) · 🇮🇳 [kn](../kn/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇱🇹 [lt](../lt/README.md) · 🇱🇻 [lv](../lv/README.md) · 🇮🇳 [ml](../ml/README.md) · 🇮🇳 [mr](../mr/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇲🇹 [mt](../mt/README.md) · 🇲🇲 [my](../my/README.md) · 🇳🇵 [ne](../ne/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇳🇴 [no](../no/README.md) · 🇮🇳 [or](../or/README.md) · 🇮🇳 [pa](../pa/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇱🇰 [si](../si/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇸🇮 [sl](../sl/README.md) · 🇷🇸 [sr](../sr/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇰🇪 [sw](../sw/README.md) · 🇮🇳 [ta](../ta/README.md) · 🇮🇳 [te](../te/README.md) · 🇹🇭 [th](../th/README.md) · 🇹🇷 [tr](../tr/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇵🇰 [ur](../ur/README.md) · 🇺🇿 [uz](../uz/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇳🇬 [yo](../yo/README.md) · 🇨🇳 [zh-CN](../zh-CN/README.md) · 🇹🇼 [zh-TW](../zh-TW/README.md)

---

<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="Панель управления OmniRoute" width="820"/>

<br/>
<br/>

# 🚀 OmniRoute — бесплатный ИИ-шлюз

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — программируйте без остановки. Любой ИИ-инструмент → 375 провайдеров, более 150 из которых бесплатны, через единую конечную точку. Claude Code, Codex, Cursor, Cline, Copilot и Antigravity получают доступ к БЕСПЛАТНЫМ Claude / GPT / Gemini с автоматическим переключением при сбое. Многоуровневое сжатие RTK + Caveman экономит 15–95% токенов (в среднем ~89%) — забудьте о лимитах. 375 ИИ-провайдеров · более 150 бесплатных тарифов · ~1,62 млрд бесплатных токенов в месяц · 21 стратегия маршрутизации · начните с $0."/>

</div>

<div align="center">

## 💰 ~1,62 млрд токенов в месяц в бесплатных тарифах сторонних провайдеров

</div>

> **Подключайте собственные аккаунты провайдеров.** Это приблизительный совокупный объём отдельно доступных бесплатных тарифов сторонних провайдеров, а не токены, предоставляемые OmniRoute. Зарегистрируйтесь, при необходимости получите учётные данные и подключите доступных вам провайдеров; каждый провайдер самостоятельно определяет свои лимиты, доступность и условия.
>
> Объединять бесплатные тарифы вручную сложно: десятки SDK, десятки ограничений частоты запросов и никакого понимания, какой объём вам действительно доступен. OmniRoute каталогизирует **471 запись о бесплатных тарифах в 34 ключах возобновляемых пулов** и рассчитывает общий объём токенов на основе **17 пулов с опубликованным положительным месячным бюджетом и пяти лимитов Groq для отдельных моделей**, исключая повторный учёт общих пулов. Квоты, которые становятся доступны только после региональной проверки личности (сейчас это ModelScope), отображаются отдельно — ещё ~6 млн после региональной верификации личности — и никогда не включаются в общий показатель. Результат всегда доступен на панели управления (`/dashboard/free-tiers`).

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="Карточка бюджета бесплатных тарифов OmniRoute: стабильно ~1,62 млрд бесплатных токенов в месяц и до ~2,22 млрд в первый месяц с учётом бонусов за регистрацию, получаемых из 34 документированных ключей возобновляемых пулов, охватывающих 471 каталогизированную запись о бесплатных тарифах за одной конечной точкой. Честный расчёт с исключением повторного учёта пулов — каждый общий пул учитывается один раз, включая 17 возобновляемых пулов с опубликованным положительным месячным бюджетом токенов и пять лимитов Groq для отдельных моделей; 12 провайдеров помечены как нежелательные в каталоге рисков, связанных с условиями использования, а решение остаётся за вами. Шкала бюджета включает Mistral 1 млрд, Nara 210 млн, LLM7 150 млн, xKiro 150 млн, Groq 30 млн (пять лимитов для отдельных моделей) и более мелкие пулы, а бонусы за регистрацию в первый месяц и постоянно бесплатные провайдеры без ограничения по токенам отображаются отдельно, чтобы они никогда не завышали общий показатель. Актуальные данные об использованных и оставшихся токенах доступны на /dashboard/free-tiers."/>

> Анимированная сводка страницы `/dashboard/free-tiers` с актуальными данными. Полная методология (исключение повторного учёта пулов, уровни бонусов, условия провайдеров): **[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**.
>
> <sub>Эти показатели каждые две недели повторно проверяются по актуальному каталогу и **могут меняться в обе стороны**: если провайдер закрывает бесплатный тариф, показатель снижается; если появляется новый — растёт. Мы публикуем фактический результат расчётов каталога, а не округлённый в большую сторону наилучший вариант.</sub>

<br/>

<div align="center">

<h3>

⭐ Поставьте звезду репозиторию, если OMNIROUTE помог вам сэкономить и упростил вашу работу.

</h3>

[![Звёзды](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![Место в рейтинге истории звёзд](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)
[![olud.ai](https://olud.ai/badge.php?tool=diegosouzapw-omniroute)](https://olud.ai/project/diegosouzapw-omniroute.html)

### 💬 Присоединяйтесь к сообществу

**👋 Подпишитесь на сопровождающего проекта, чтобы первыми узнавать о новых провайдерах, выпусках и советах:**

[![Подписаться на Диего в LinkedIn](https://img.shields.io/badge/Follow_Diego_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diegosouzapw/)
[![Подписаться на @diegosouzapw в GitHub](https://img.shields.io/github/followers/diegosouzapw?style=for-the-badge&logo=github&logoColor=white&label=Follow%20on%20GitHub&color=181717)](https://github.com/diegosouzapw)

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp — международное сообщество](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)
[![WhatsApp — Бразилия](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)
[![Веб-сайт](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**Вопросы, советы по провайдерам, план развития и поддержка → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 Международное сообщество](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4) / [🇧🇷 Бразилия](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4) / [Портал](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)**

<br/>

## 📈 Шлюз продолжает расти

<div align="center">

|                               |          v3.8.50          | **v3.8.51** |      `v3.8.53+`       |
| ----------------------------- | :-----------------------: | :---------: | :-------------------: |
| 🌐 Провайдеры                 |            352            |   **358**   |          375          |
| 🧠 Уникальные ID чат-моделей  |           1320            |  **1374**   |         1475          |
| 🖼️ Мост модальностей          | 🆕 зрение + аудио + видео |      ✓      |           ✓           |
| 📡 Бесплатный каталог Radar   |       🆕 по желанию       |      ✓      |           ✓           |
| ⚖️ Планирование с учётом квот |      🆕 Quota-Share       |      ✓      |           ✓           |
| 📊 Телеметрия квот            |   🆕 в реальном времени   |      ✓      |           ✓           |
| 🧰 Headless-режим             |             —             |      —      | 🆕 `serve --headless` |
| 🛤️ Инфраструктура рельсов LTS |             —             |      —      |   🆕 каналы релизов   |
| 🔎 API поиска моделей         |             —             |      —      | 🆕 `/v1/models/query` |

**→ [План развития](ROADMAP.md) — едем по рельсам к `v3.9.0 LTS`**

</div>

<br/>

## 🧩 Доступность

[![версия npm](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![Загрузки NPM за месяц](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Загрузки Docker](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Загрузки Electron](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

<table>
  <tr>
    <td align="right"><b>🚀 Начало работы</b></td>
    <td align="center"><a href="#-quick-start">🚀 Быстрый старт</a></td>
    <td align="center"><a href="#-more-install-methods--docker-source-pnpm-arch">📦 Установка</a></td>
    <td align="center"><a href="#first-run">🆓 Подключение провайдера</a></td>
  </tr>
  <tr>
    <td align="right"><b>💡 Знакомство</b></td>
    <td align="center"><a href="#-the-promise">💥 Обещание</a></td>
    <td align="center"><a href="#-why-omniroute">🤔 Почему OmniRoute</a></td>
    <td align="center"><a href="#-what-sets-omniroute-apart">🏆 Отличительные особенности</a></td>
  </tr>
  <tr>
    <td align="right"><b>⚙️ Возможности</b></td>
    <td align="center"><a href="#-combos--the-flagship">🎯 Комбо</a></td>
    <td align="center"><a href="#-375-ai-providers--153-catalog-marked-free">🌐 Провайдеры</a></td>
    <td align="center"><a href="#-full-cli--a2a--mcp">🔌 CLI и MCP</a></td>
  </tr>
  <tr>
    <td align="right"></td>
    <td align="center"><a href="#%EF%B8%8F-save-1595-tokens--automatically">🗜️ Сжатие</a></td>
    <td align="center"><a href="#%EF%B8%8F-where-omniroute-runs--anywhere">🖥️ Где запускается</a></td>
    <td align="center"><a href="#-private--local-first">🔒 Конфиденциальность</a></td>
  </tr>
  <tr>
    <td align="right"><b>👀 Демонстрация</b></td>
    <td align="center"><a href="#-omniroute-in-action">🎬 В действии</a></td>
    <td align="center"><a href="#-whats-new">✨ Что нового</a></td>
    <td align="center"><a href="#-compatible-clis--coding-agents">🤖 Совместимые CLI</a></td>
  </tr>
  <tr>
    <td align="right"><b>💚 Поддержка</b></td>
    <td align="center"><a href="#-support-omniroute">💚 Поддержать / Пожертвовать</a></td>
    <td align="center"><a href="#-community--help">💬 Сообщество</a></td>
    <td align="center"><a href="#-sponsors">💖 Спонсоры</a></td>
  </tr>
  <tr>
    <td align="right"><b>📦 Проект</b></td>
    <td align="center"><a href="#%EF%B8%8F-tech-stack">🛠️ Технологический стек</a></td>
    <td align="center"><a href="#-documentation">📖 Документация</a></td>
    <td align="center"><a href="#-900-contributors">👥 Участники</a></td>
  </tr>
</table>

</div>

<div align="center">
  <b>🌐 На 67 языках</b>
  <br/><br/>
  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="English (en)" title="English (en)"></a>
  <a href="docs/i18n/pt-BR/README.md"><img src="docs/assets/flags/br.svg" width="30" alt="Português — Brasil (pt-BR)" title="Português — Brasil (pt-BR)"></a>
  <a href="docs/i18n/pt/README.md"><img src="docs/assets/flags/pt.svg" width="30" alt="Português (pt)" title="Português (pt)"></a>
  <a href="docs/i18n/es/README.md"><img src="docs/assets/flags/es.svg" width="30" alt="Español (es)" title="Español (es)"></a>
  <a href="docs/i18n/fr/README.md"><img src="docs/assets/flags/fr.svg" width="30" alt="Français (fr)" title="Français (fr)"></a>
  <a href="docs/i18n/it/README.md"><img src="docs/assets/flags/it.svg" width="30" alt="Italiano (it)" title="Italiano (it)"></a>
  <a href="docs/i18n/de/README.md"><img src="docs/assets/flags/de.svg" width="30" alt="Deutsch (de)" title="Deutsch (de)"></a>
  <a href="docs/i18n/nl/README.md"><img src="docs/assets/flags/nl.svg" width="30" alt="Nederlands (nl)" title="Nederlands (nl)"></a>
  <a href="docs/i18n/ru/README.md"><img src="docs/assets/flags/ru.svg" width="30" alt="Русский (ru)" title="Русский (ru)"></a>
  <a href="docs/i18n/uk-UA/README.md"><img src="docs/assets/flags/ua.svg" width="30" alt="Українська (uk-UA)" title="Українська (uk-UA)"></a>
  <a href="docs/i18n/pl/README.md"><img src="docs/assets/flags/pl.svg" width="30" alt="Polski (pl)" title="Polski (pl)"></a>
  <a href="docs/i18n/cs/README.md"><img src="docs/assets/flags/cz.svg" width="30" alt="Čeština (cs)" title="Čeština (cs)"></a>
  <a href="docs/i18n/sk/README.md"><img src="docs/assets/flags/sk.svg" width="30" alt="Slovenčina (sk)" title="Slovenčina (sk)"></a>
  <a href="docs/i18n/ro/README.md"><img src="docs/assets/flags/ro.svg" width="30" alt="Română (ro)" title="Română (ro)"></a>
  <a href="docs/i18n/hu/README.md"><img src="docs/assets/flags/hu.svg" width="30" alt="Magyar (hu)" title="Magyar (hu)"></a>
  <a href="docs/i18n/bg/README.md"><img src="docs/assets/flags/bg.svg" width="30" alt="Български (bg)" title="Български (bg)"></a>
  <a href="docs/i18n/da/README.md"><img src="docs/assets/flags/dk.svg" width="30" alt="Dansk (da)" title="Dansk (da)"></a>
  <a href="docs/i18n/fi/README.md"><img src="docs/assets/flags/fi.svg" width="30" alt="Suomi (fi)" title="Suomi (fi)"></a>
  <a href="docs/i18n/no/README.md"><img src="docs/assets/flags/no.svg" width="30" alt="Norsk (no)" title="Norsk (no)"></a>
  <a href="docs/i18n/sv/README.md"><img src="docs/assets/flags/se.svg" width="30" alt="Svenska (sv)" title="Svenska (sv)"></a>
  <a href="docs/i18n/zh-CN/README.md"><img src="docs/assets/flags/cn.svg" width="30" alt="中文 — 简体 (zh-CN)" title="中文 — 简体 (zh-CN)"></a>
  <a href="docs/i18n/zh-TW/README.md"><img src="docs/assets/flags/tw.svg" width="30" alt="中文 — 繁體 (zh-TW)" title="中文 — 繁體 (zh-TW)"></a>
  <a href="docs/i18n/ja/README.md"><img src="docs/assets/flags/jp.svg" width="30" alt="日本語 (ja)" title="日本語 (ja)"></a>
  <a href="docs/i18n/ko/README.md"><img src="docs/assets/flags/kr.svg" width="30" alt="한국어 (ko)" title="한국어 (ko)"></a>
  <a href="docs/i18n/th/README.md"><img src="docs/assets/flags/th.svg" width="30" alt="ไทย (th)" title="ไทย (th)"></a>
  <a href="docs/i18n/vi/README.md"><img src="docs/assets/flags/vn.svg" width="30" alt="Tiếng Việt (vi)" title="Tiếng Việt (vi)"></a>
  <a href="docs/i18n/id/README.md"><img src="docs/assets/flags/id.svg" width="30" alt="Bahasa Indonesia (id)" title="Bahasa Indonesia (id)"></a>
  <a href="docs/i18n/ms/README.md"><img src="docs/assets/flags/my.svg" width="30" alt="Bahasa Melayu (ms)" title="Bahasa Melayu (ms)"></a>
  <a href="docs/i18n/phi/README.md"><img src="docs/assets/flags/ph.svg" width="30" alt="Filipino (phi)" title="Filipino (phi)"></a>
  <a href="docs/i18n/hi/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="हिन्दी (hi)" title="हिन्दी (hi)"></a>
  <a href="docs/i18n/gu/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ગુજરાતી (gu)" title="ગુજરાતી (gu)"></a>
  <a href="docs/i18n/mr/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="मराठी (mr)" title="मराठी (mr)"></a>
  <a href="docs/i18n/ta/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="தமிழ் (ta)" title="தமிழ் (ta)"></a>
  <a href="docs/i18n/te/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="తెలుగు (te)" title="తెలుగు (te)"></a>
  <a href="docs/i18n/bn/README.md"><img src="docs/assets/flags/bd.svg" width="30" alt="বাংলা (bn)" title="বাংলা (bn)"></a>
  <a href="docs/i18n/ur/README.md"><img src="docs/assets/flags/pk.svg" width="30" alt="اردو (ur)" title="اردو (ur)"></a>
  <a href="docs/i18n/fa/README.md"><img src="docs/assets/flags/ir.svg" width="30" alt="فارسی (fa)" title="فارسی (fa)"></a>
  <a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/sa.svg" width="30" alt="العربية (ar)" title="العربية (ar)"></a>
  <a href="docs/i18n/he/README.md"><img src="docs/assets/flags/il.svg" width="30" alt="עברית (he)" title="עברית (he)"></a>
  <a href="docs/i18n/tr/README.md"><img src="docs/assets/flags/tr.svg" width="30" alt="Türkçe (tr)" title="Türkçe (tr)"></a>
  <a href="docs/i18n/az/README.md"><img src="docs/assets/flags/az.svg" width="30" alt="Azərbaycan (az)" title="Azərbaycan (az)"></a>
  <a href="docs/i18n/sw/README.md"><img src="docs/assets/flags/tz.svg" width="30" alt="Kiswahili (sw)" title="Kiswahili (sw)"></a>
  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="Ελληνικά (el)" title="Ελληνικά (el)"></a>
  <a href="docs/i18n/hr/README.md"><img src="docs/assets/flags/hr.svg" width="30" alt="Hrvatski (hr)" title="Hrvatski (hr)"></a>
  <a href="docs/i18n/sr/README.md"><img src="docs/assets/flags/rs.svg" width="30" alt="Српски (sr)" title="Српски (sr)"></a>
  <a href="docs/i18n/lt/README.md"><img src="docs/assets/flags/lt.svg" width="30" alt="Lietuvių (lt)" title="Lietuvių (lt)"></a>
  <a href="docs/i18n/et/README.md"><img src="docs/assets/flags/ee.svg" width="30" alt="Eesti (et)" title="Eesti (et)"></a>
  <a href="docs/i18n/lv/README.md"><img src="docs/assets/flags/lv.svg" width="30" alt="Latviešu (lv)" title="Latviešu (lv)"></a>
  <a href="docs/i18n/sl/README.md"><img src="docs/assets/flags/si.svg" width="30" alt="Slovenščina (sl)" title="Slovenščina (sl)"></a>
  <a href="docs/i18n/mt/README.md"><img src="docs/assets/flags/mt.svg" width="30" alt="Malti (mt)" title="Malti (mt)"></a>
  <a href="docs/i18n/ga/README.md"><img src="docs/assets/flags/ie.svg" width="30" alt="Gaeilge (ga)" title="Gaeilge (ga)"></a>
  <a href="docs/i18n/kn/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ಕನ್ನಡ (kn)" title="ಕನ್ನಡ (kn)"></a>
  <a href="docs/i18n/ml/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="മലയാളം (ml)" title="മലയാളം (ml)"></a>
  <a href="docs/i18n/or/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ଓଡ଼ିଆ (or)" title="ଓଡ଼ିଆ (or)"></a>
  <a href="docs/i18n/pa/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ਪੰਜਾਬੀ (pa)" title="ਪੰਜਾਬੀ (pa)"></a>
  <a href="docs/i18n/ne/README.md"><img src="docs/assets/flags/np.svg" width="30" alt="नेपाली (ne)" title="नेपाली (ne)"></a>
  <a href="docs/i18n/si/README.md"><img src="docs/assets/flags/lk.svg" width="30" alt="සිංහල (si)" title="සිංහල (si)"></a>
  <a href="docs/i18n/my/README.md"><img src="docs/assets/flags/mm.svg" width="30" alt="မြန်မာ (my)" title="မြန်မာ (my)"></a>
  <a href="docs/i18n/km/README.md"><img src="docs/assets/flags/kh.svg" width="30" alt="ខ្មែរ (km)" title="ខ្មែរ (km)"></a>
  <a href="docs/i18n/ha/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Hausa (ha)" title="Hausa (ha)"></a>
  <a href="docs/i18n/yo/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Yorùbá (yo)" title="Yorùbá (yo)"></a>
  <a href="docs/i18n/ig/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Igbo (ig)" title="Igbo (ig)"></a>
  <a href="docs/i18n/am/README.md"><img src="docs/assets/flags/et.svg" width="30" alt="አማርኛ (am)" title="አማርኛ (am)"></a>
  <a href="docs/i18n/uz/README.md"><img src="docs/assets/flags/uz.svg" width="30" alt="Oʻzbekcha (uz)" title="Oʻzbekcha (uz)"></a>
  <a href="docs/i18n/ka/README.md"><img src="docs/assets/flags/ge.svg" width="30" alt="ქართული (ka)" title="ქართული (ka)"></a>
  <a href="docs/i18n/hy/README.md"><img src="docs/assets/flags/am.svg" width="30" alt="Հայերեն (hy)" title="Հայերեն (hy)"></a>
  <a href="docs/i18n/bs/README.md"><img src="docs/assets/flags/ba.svg" width="30" alt="Bosanski (bs)" title="Bosanski (bs)"></a>
</div>

<br/>
<br/>

<div align="center">

<a id="first-run"></a>

## 🆓 Установите, подключите провайдера, затем маршрутизируйте через одну конечную точку

</div>

<img src="./docs/diagrams/works-zero-config.svg" width="100%" alt="Три шага: установите и запустите OmniRoute, подключите подходящего провайдера со своим аккаунтом или API-ключом, затем направьте свой инструмент на localhost:20128/v1, используя API-ключ OmniRoute и модель auto. Маршрутизация зависит от доступных подходящих подключений и лимитов провайдера."/>

```bash
# После подключения провайдера скопируйте свой ключ OmniRoute из Dashboard → Endpoints:
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

<sub>`auto` требует подходящего маршрута. У свежей установки может не быть подходящих бесключевых целей, а бесключевой провайдер может отклонять сторонних клиентов. Провайдеры с пометкой `tos: avoid`, включая Kiro, по умолчанию исключены из автоматической маршрутизации; подключение аккаунта не отменяет эту настройку. Перед выбором провайдера см. [Руководство по бесплатным тарифам](docs/getting-started/FREE-TIERS-GUIDE.md).</sub>

<sub>📦 Готовые скрипты быстрого старта для **Python, Node.js, PHP и cURL** → [`examples/quickstart/`](examples/quickstart/)</sub>

<br/>

<div align="center">

# 💥 Обещание

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="Обещание — одна конечная точка и 375 провайдеров. Автоматический фолбэк сохраняет маршрутизацию, пока доступна другая здоровая цель. Шесть столпов: устойчивый фолбэк по 375 провайдерам · до 95% экономии токенов на подходящих рабочих нагрузках · старт за $0 с 150+ бесплатными тарифами и 51 провайдером с повторяющимися/бесключевыми бесплатными предложениями навсегда · 37 интеграций с CLI/агентами через один конфиг · совместимость с OpenAI, Claude, Gemini и Responses API на /v1 · продакшн-контроль, включая предохранители (circuit breakers), TLS stealth, 110 инструментов MCP, A2A, память, guardrails, evals и 56,000+ статических тестовых деклараций в 7,800+ отслеживаемых тестовых файлах."/>

<br/>
<br/>

<div align="center">

# 🤔 Почему OmniRoute?

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="Почему OmniRoute — хватит жонглировать 10 панелями управления, мёртвыми API-ключами и неожиданными счетами. Десять ежедневных болей против решений: квота истекает неиспользованной → максимизируйте подписки; лимиты посреди кодинга → 4-уровневый автофолбэк (Subscription → API → Cheap → Free); вывод инструментов сжигает токены → сжатие RTK + Caveman (15–95%); дорогие API → маршрутизация с оптимизацией затрат; у каждого инструмента своя настройка → одна конечная точка, одна панель управления; ИИ заблокирован → 3-уровневый прокси + TLS stealth; мёртвые ключи → 3-слойная устойчивость (предохранители, охлаждение ключей, блокировка модели); команда делит одну подписку → пулы ключей с квотами справедливого распределения; промпты уходят через чужое облако → local-first с шифрованием ключей AES-256-GCM; нет видимости расходов → живая аналитика (использование, квоты, экономия, задержка p95)."/>

<div align="center">

<img src="./docs/diagrams/tier-cascade.svg" width="100%" alt="Поток запроса OmniRoute: ваша IDE или CLI (Claude Code, Cursor, Cline…) вызывает одну локальную конечную точку (http://localhost:20128/v1); Smart Router OmniRoute (сжатие RTK + Caveman, 21 стратегия маршрутизации, предохранители, TLS stealth, MCP, A2A, guardrails) может переключаться между 4 уровнями провайдеров, пока доступна подходящая здоровая цель — Уровень 1 Subscription, Уровень 2 API Key, Уровень 3 Cheap и Уровень 4 Free."/>

</div>

<br/>

<div align="center">

## 🤝 Поддерживается нашими друзьями из Open Source

</div>

<p align="center">
  <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — Передовая разведка · 2.8T параметров · контекст 1M токенов"/>
  </a>
</p>

> **Хотите присоединиться в качестве друга Open Source?** Это компании, которые поддерживают открытый исходный код и помогают OmniRoute развиваться — и мы публично сообщаем, куда идет каждый токен, который они нам дают. Свяжитесь с нами: [diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/providers/kimi-logomark-dark.svg">
          <img src="public/providers/kimi-logomark-light.svg" width="64" alt="Kimi (Moonshot AI)"/>
        </picture>
      </a>
      <br/><b>Kimi</b><br/><sub>Moonshot AI</sub><br/><br/>
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="Основатель-друг Open Source"/>
    </td>
    <td>
      Благодарим <b>Kimi (Moonshot AI)</b>, нашего основателя-друга Open Source, за поддержку этого проекта! Kimi — это лаборатория ИИ, стоящая за семействами моделей K2 и K3 с открытым весом — <b>Kimi K3</b> предоставляет окно контекста в 1M токенов, нативное зрение и передовое кодирование за долю цены закрытых моделей, и работает из коробки с Claude Code, Codex и каждым инструментом кодирования, который обслуживает OmniRoute.
      <br/><br/>
      <b>Что обеспечивает поддержка Kimi:</b> Кредиты API Kimi обеспечивают работу конвейера выпуска OmniRoute, проверенного ИИ — этап *проверки слияния на базе Kimi K3*, который проверяет каждый pull request перед его отправкой — плюс ежедневную разработку функций. Первоклассная поддержка Kimi поставляется по обоим каналам: прямой <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">Kimi API</a> (<code>kimi-k3</code>) и <a href="https://www.kimi.ai/code?aff=omniroute">план кодирования Kimi Code</a> (OAuth и API key). OmniRoute также является первым бразильским проектом с открытым исходным кодом в программе поддержки Kimi. <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute"><b>Получите Kimi API key с 15% дополнительными кредитами →</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://cheaperinference.com/?utm_source=omniroute">
        <img src="./public/providers/cli-generic.svg" width="64" alt="Cheaper Inference"/>
      </a>
      <br/><b>Cheaper Inference</b><br/><sub>cheaperinference.com</sub><br/><br/>
      <img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="Друг Open Source"/>
    </td>
    <td>
      Благодарим <b>Cheaper Inference</b>, друга Open Source OmniRoute, за поддержку этого проекта! Cheaper Inference — это шлюз с ранжированием по стоимости, который перепродает 42 передовые модели — Claude, GPT-5.x, Gemini, Kimi K3, GLM, DeepSeek, Grok и MiniMax — через единую OpenAI-совместимую конечную точку, маршрутизируя каждый запрос к самому дешевому подходящему провайдеру, никогда не взимая плату выше прейскурантной цены производителя модели.
      <br/><br/>
      <b>Первоклассная поддержка в OmniRoute:</b> Chat Completions, нативная конечная точка <code>/v1/responses</code>, зрение, вызов инструментов и 3 модели изображений (<code>grok-imagine</code>, <code>nano-banana-pro</code>, <code>nano-banana-2</code>, доступные как <code>cheaperinference/&lt;model&gt;</code>). <a href="https://cheaperinference.com/?utm_source=omniroute"><b>Получить API key →</b></a>
    </td>
  </tr>
</table>

<sub>Ссылки с тегом <code>aff=omniroute</code> являются партнерскими ссылками. Они финансируют проект без дополнительных затрат для вас.</sub>

<br/>

<details open>
<summary><sub><b>🎟️ Партнерские акции</b> — бесплатные купоны на регистрацию от провайдеров, которых мы не спонсируем (нажмите, чтобы развернуть)</sub></summary>

<sub><i>Этот раздел предназначен только для реферальных/купонных кодов. Спонсируемые партнерства находятся в разделе **🤝 Поддерживается нашими друзьями из Open Source** выше. OmniRoute не имеет спонсорства или партнерства с провайдерами, перечисленными здесь — это публичные купоны, которые может использовать любой желающий.</i></sub>

<table>
  <tr>
    <td align="center" width="120">
      <a href="https://agentrouter.org/register?aff=70LM">
        <img src="./public/providers/cli-generic.svg" width="32" alt="AgentRouter"/>
      </a>
      <br/><sub><b>AgentRouter</b></sub><br/><sub>agentrouter.org</sub>
    </td>
    <td>
      <sub><b><a href="https://agentrouter.org/register?aff=70LM">AgentRouter</a></b> — партнерская регистрация · <b>$100 бесплатных кредитов</b> при регистрации (бесплатный сервер, ожидайте более высокой задержки — лучше всего для тестирования, не для продакшена). Первоклассная поддержка в OmniRoute с <b>v3.8.50</b>: Chat Completions, Anthropic-совместимый формат данных и OpenAI-совместимый путь. Доступные модели включают <code>claude-opus-4-8</code>, <code>claude-opus-5</code>, <code>gpt-5.6-sol</code> и другие. <b><a href="https://agentrouter.org/register?aff=70LM">Заберите свои $100 →</a></b></sub>
      <br/><br/>
      <sub>⚠️ <i>Партнерская ссылка — OmniRoute не имеет спонсорства или партнерства с этим провайдером.</i></sub>
    </td>
  </tr>
</table>

<sub>Знаете другого провайдера с щедрым бесплатным купоном на регистрацию, который принесет пользу пользователям OmniRoute? Откройте issue, и мы добавим его сюда.</sub>

</details>

<br/>

<div align="center">

## 🎯 Комбо — флагманская возможность

</div>

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="Анимированные примеры для 18 из 21 стратегии маршрутизации комбо — по одной плитке на стратегию: priority, fill-first, weighted, round-robin, p2c, least-used, random, strict-random, cost-optimized, headroom, reset-window, reset-aware, context-relay, context-optimized, lkgp, auto, fusion, pipeline. Стратегии cache-optimized, quota-weighted и expiry-first не анимированы; в таблице ниже описаны все 21."/>

> **Комбо** — это цепочка моделей, между которыми OmniRoute переключается **автоматически**. Если квота исчерпана, провайдер недоступен или расходы резко возрастают, комбо может перейти к следующей подходящей и исправной модели. 🛡️

### ⚡ Без настройки — просто используйте `auto`

Создавать комбо не нужно. Укажите `auto` (или один из его вариантов) в качестве модели, и OmniRoute сформирует виртуальное комбо из подключённых провайдеров, оценивая их в реальном времени:

<table>
  <tr><th align="left">ID модели</th><th align="left">Что оптимизируется</th></tr>
  <tr><td align="left" nowrap><code>auto</code></td><td align="left">🎯 Сбалансированный вариант по умолчанию (LKGP — продолжает использовать последнего успешно сработавшего провайдера)</td></tr>
  <tr><td align="left" nowrap><code>auto/coding</code></td><td align="left">🧑💻 Приоритет качества при генерации кода</td></tr>
  <tr><td align="left" nowrap><code>auto/fast</code></td><td align="left">⚡ Сначала минимальная задержка</td></tr>
  <tr><td align="left" nowrap><code>auto/cheap</code></td><td align="left">💰 Сначала минимальная стоимость токена</td></tr>
  <tr><td align="left" nowrap><code>auto/subscription</code></td><td align="left">🎟️ Только уже оплаченная квота подписки — закрытый отказ, без перехода на тарифицируемый резервный вариант (<a href="./docs/routing/SUBSCRIPTION_LADDER.md">руководство</a>)</td></tr>
  <tr><td align="left" nowrap><code>auto/thrifty</code></td><td align="left">🪜 Сначала квота тарифного плана, затем по одной ступени к самым дешёвым платным вариантам — возврат к плану после сброса квоты (<a href="./docs/routing/SUBSCRIPTION_LADDER.md">руководство</a>)</td></tr>
  <tr><td align="left" nowrap><code>auto/offline</code></td><td align="left">🔋 Сначала максимальный запас квоты / лимита запросов</td></tr>
  <tr><td align="left" nowrap><code>auto/smart</code></td><td align="left">🔭 Приоритет качества + 10% запросов для поиска более подходящих моделей</td></tr>
  <tr><td align="left" nowrap><code>auto/lkgp</code></td><td align="left">📌 Явное закрепление за последним успешно сработавшим провайдером</td></tr>
  <tr><td align="left" nowrap><code>auto/chaos</code></td><td align="left">🧪 Параллельная отправка запросов группе моделей (по одной на провайдера, по умолчанию 5) с возвратом одного ответа; один восходящий вызов на каждую модель группы, без инъекции сбоев</td></tr>
</table>

##

### 🔀 Или создайте собственный вариант — 21 стратегия маршрутизации

Все **21** стратегия — комбинируйте их на каждом этапе комбо:

<table>
  <tr>
    <th>#</th>
    <th align="left">Стратегия</th>
    <th align="left">Как она работает</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td nowrap><code>priority</code></td>
    <td>Упорядоченный список с приоритетом первой цели — каждая исчерпывается перед переходом к следующей 🥇</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td nowrap><code>fill-first</code></td>
    <td>Полное использование квоты каждой цели перед переходом к следующей</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td nowrap><code>weighted</code></td>
    <td>Случайный выбор с учётом веса каждой цели</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td nowrap><code>round-robin</code></td>
    <td>Циклический перебор целей по порядку</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td nowrap><code>p2c</code></td>
    <td>Случайная балансировка нагрузки методом выбора из двух вариантов</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td nowrap><code>least-used</code></td>
    <td>Выбор цели с наименьшей текущей нагрузкой</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td nowrap><code>random</code></td>
    <td>Равномерный случайный выбор (без повторов)</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td nowrap><code>strict-random</code></td>
    <td>Случайный выбор с сохранением повторов 🎲</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td nowrap><code>cost-optimized</code></td>
    <td>Минимизация стоимости запроса в $ по актуальным ценам каталога 💸</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td nowrap><code>headroom</code></td>
    <td>Выбор цели с наибольшим остатком квоты</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td nowrap><code>quota-weighted</code></td>
    <td>Пропуск аккаунтов с исчерпанной квотой, затем выбор пропорционально оставшейся квоте ÷ текущей нагрузке — существующие диалоги остаются закреплёнными ⚖️</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td nowrap><code>reset-window</code></td>
    <td>Предпочтение цели, окно квоты которой сбросится раньше остальных</td>
  </tr>
  <tr>
    <td align="center">13</td>
    <td nowrap><code>reset-aware</code></td>
    <td>Ранжирование по времени сброса квоты — сначала короткие окна 📊</td>
  </tr>
  <tr>
    <td align="center">14</td>
    <td nowrap><code>context-relay</code></td>
    <td>Передача контекста между целями для длительных диалогов 🧠</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td nowrap><code>context-optimized</code></td>
    <td>Выбор наиболее подходящей цели для текущего размера контекста</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td nowrap><code>cache-optimized</code></td>
    <td>Закрепление каждого повторно используемого префикса промпта за одним аккаунтом — для максимального количества попаданий в кэш промптов 🎯</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td nowrap><code>lkgp</code></td>
    <td>Последний успешно сработавший маршрут — закрепляет запросы за последним успешным провайдером, а затем переключается на резервные правила</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td nowrap><code>auto</code></td>
    <td>Оценка всех подключений в реальном времени по 16 факторам 🤖</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td nowrap><code>fusion</code></td>
    <td>Параллельная отправка запросов группе моделей + модель-судья синтезирует единый ответ 🧬</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td nowrap><code>pipeline</code></td>
    <td>Цепочка этапов — выход каждой цели передаётся следующей 🔗</td>
  </tr>
  <tr>
    <td align="center">21</td>
    <td nowrap><code>expiry-first</code></td>
    <td>Сначала расходует аккаунт, чья квота иначе сгорела бы неиспользованной: первым идёт аккаунт с наибольшим остатком и ближайшим сбросом ⏳</td>
  </tr>
</table>

<sub>Движок Auto-Combo оценивает каждого кандидата по **16 факторам** (работоспособность, квота, стоимость, задержка, соответствие задаче, качество, доступность сессии…) — см. [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md).</sub>

##

### 🧱 Отказоустойчивость встроена (3 независимых уровня)

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="Отказоустойчивость OmniRoute — 3 независимых уровня самовосстановления, подходящий уровень для каждого типа сбоя. Уровень 1 — автоматический выключатель провайдера (весь провайдер): срабатывает только при 408/5xx, пороговые значения — OAuth 8× / API-ключ 12× / локальный 2×, сбрасывается через 60s/30s/15s с переходом к пробному запросу в состоянии HALF-OPEN, отложенное восстановление; пока состояние OPEN, комбинация перенаправляет запросы к следующему провайдеру. Уровень 2 — период ожидания соединения (один ключ/аккаунт): базовый интервал 5s для OAuth / 3s для API-ключа, экспоненциальная задержка ×2 с защитой от лавинообразных запросов, при 429 учитывается Retry-After, успешный запрос очищает всё состояние ошибок; ключ в периоде ожидания пропускается, а остальные ключи продолжают обслуживать запросы. Уровень 3 — блокировка модели (одна модель): 429 для отдельной модели, локальная ошибка 404 или запреты режима блокируют только эту модель — но никогда не всё соединение. Терминальные состояния (заблокирован, истёк срок действия, исчерпаны кредиты) предназначены для вмешательства оператора, а не для временного ожидания."/>

<sub>📖 [Движок Auto-Combo](docs/routing/AUTO-COMBO.md) · [Руководство по отказоустойчивости](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

## 🏆 Что отличает OmniRoute

</div>

<img src="./docs/diagrams/comparison-table.svg" width="100%" alt="Что отличает OmniRoute — актуальный на определённую дату обзор 13 возможностей в сравнении с 9router, OpenRouter, CLIProxyAPI и LiteLLM. OmniRoute: 375 провайдеров, более 150 встроенных бесплатных тарифов, 21 стратегия маршрутизации, 12-компонентное сжатие токенов, встроенный MCP-сервер со 110 инструментами, протокол агентов A2A, постоянная память, защитные механизмы, облачные агенты, маскировка отпечатка TLS, Desktop/Termux/PWA и 67 языков интерфейса. OmniRoute распространяется по лицензии MIT и поддерживает самостоятельное развёртывание. Возможности и показатели конкурентов могут измениться; см. методологию по ссылке."/>

<sub>📊 Полная методология и подробное сравнение каждой функции с 9router, OpenRouter, CLIProxyAPI и LiteLLM → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

## 💚 Поддержать OmniRoute

OmniRoute распространяется по лицензии MIT и разрабатывается открыто. Если он экономит ваше время или деньги, вот как можно помочь ему оставаться независимым — выберите подходящий вариант. Спонсорская поддержка никогда не влияет на приоритет маршрутизации; она даёт видимость, а не место в рейтинге.

<table>
  <tr><td nowrap>⭐ <b>Поставить звезду репозиторию</b></td><td>Бесплатно — действительно помогает повысить видимость</td><td><a href="https://github.com/diegosouzapw/OmniRoute">Поставить звезду OmniRoute</a></td></tr>
  <tr><td nowrap>🐙 <b>GitHub Sponsors</b></td><td>Разовый или ежемесячный платёж · без комиссии платформы</td><td><a href="https://github.com/sponsors/diegosouzapw">github.com/sponsors/diegosouzapw</a></td></tr>
  <tr><td nowrap>☕ <b>Ko-fi</b></td><td>Быстрое разовое пожертвование, регистрация для спонсора не требуется</td><td><a href="https://ko-fi.com/diegosouzapw">ko-fi.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🧋 <b>Buy Me a Coffee</b></td><td>Небольшой неформальный знак поддержки</td><td><a href="https://www.buymeacoffee.com/diegosouzapw">buymeacoffee.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🖐 <b>Liberapay</b></td><td>Регулярные пожертвования · некоммерческая платформа · открытый исходный код</td><td><a href="https://liberapay.com/diegosouzapw">liberapay.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🇧🇷 <b>PIX</b> (Бразилия)</td><td>Мгновенно, без комиссии</td><td>ключ и QR-код ниже</td></tr>
  <tr><td nowrap>₿ <b>Криптовалюта</b></td><td>BTC · ETH · USDT-TRC20 · USDC-Solana</td><td>адреса ниже</td></tr>
</table>

**🇧🇷 PIX** — мгновенно, без комиссии (Бразилия)

<img src="docs/assets/pix-qr.png" width="140" align="right" alt="QR-код OmniRoute для PIX"/>

Ключ (случайный): `5d865059-bc44-483a-962d-43ceb80126eb`

Pix copia-e-cola:

```
00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD
```

<br clear="right"/>

<details>
<summary><b>₿ Криптовалюта</b> — BTC · ETH · USDT-TRC20 · USDC-Solana (нажмите, чтобы развернуть)</summary>

<table>
  <tr><td nowrap><b>₿ BTC</b></td><td nowrap>Bitcoin (SegWit)</td><td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td></tr>
  <tr><td nowrap><b>Ξ ETH</b></td><td nowrap>Ethereum (ERC20)</td><td><code>0x64Cf6B68A6Ff34288e89172950a2d00102337a84</code></td></tr>
  <tr><td nowrap><b>₮ USDT</b></td><td nowrap>Tron (TRC20)</td><td><code>TKAF41JpuQrHbKTnsQa9svJE2T192Hvsc2</code></td></tr>
  <tr><td nowrap><b>$ USDC</b></td><td nowrap>Solana</td><td><code>2emNNZzVVWQc3FQ2wk9M6qXUQmW8AKdjjL174fXR28Tu</code></td></tr>
</table>

<sub>⚠️ Отправляйте каждую монету только через указанную сеть — отправка через неверную сеть может привести к потере средств.</sub>

</details>

🐛 Нашли ошибку или хотите поделиться отзывом? Создайте [обсуждение](https://github.com/diegosouzapw/OmniRoute/discussions).

<br/>

<p><strong>Примечания для разработчиков:</strong> Во время npm install/postinstall проект может создать локальный файл <code>.env</code> для удобства разработчика. Этот файл намеренно игнорируется через <code>.gitignore</code> (см. <code>.gitignore</code>) и никогда не должен попадать в коммиты — если он был случайно добавлен в коммит, замените все раскрытые секреты и удалите файл из истории. Рекомендации по управлению локальными файлами окружения и секретами см. в <a href="docs/DEVELOPER-ENVIRONMENT.md">docs/DEVELOPER-ENVIRONMENT.md</a>.</p>

## 📡 Радар OmniRoute

Основной показатель бесплатного уровня по-прежнему составляет **~1,62 млрд токенов в месяц** согласно приведённому выше документированному каталогу с устранением дублирования пулов. Временные приветственные кредиты провайдеров могут отдельно увеличить объём в первый месяц до **~2,22 млрд**. Radar — это необязательное подписанное дополнение к каталогу для тех, кому нужна более актуальная информация о доступности бесплатных моделей между выпусками OmniRoute; каталог сообщества и все существующие бесплатные функции остаются бесплатными.

Сторонники проекта могут получать актуальный каталог и сведения о дополнительных предложениях провайдеров. Его отдельный изменяемый верхний предел составляет **не более приблизительно 3 млрд токенов в месяц** в зависимости от доступности провайдеров. Этот предел не гарантируется: провайдеры могут в любое время изменять квоты, требования к участникам, модели или регионы.

Radar используется по желанию и выполняет только GET-запросы. Клиент OmniRoute не отправляет запросы пользователей, данные о трафике, конфигурацию провайдеров, телеметрию использования или локальное состояние скрытия объявлений. Узнать о требованиях к участникам и ознакомиться с текущим каталогом можно на странице **[radar.omniroute.online/planos](https://radar.omniroute.online/planos)**.

<br/>

<div align="center">

## ✨ Что нового

</div>

> Недавние ключевые изменения от **v3.8.20 → v3.8.53**. Полная история в [`CHANGELOG.md`](CHANGELOG.md).

- **⚖️ `quota-weighted` маршрутизация** — 20-я стратегия комбо пропускает исчерпанные аккаунты, затем выбирает среди остальных пропорционально остатку квоты ÷ текущей нагрузке, сохраняя привязку существующих диалогов. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🧰 Headless-режим** — `omniroute serve --headless` (или `OMNIROUTE_HEADLESS=1`) запускает только прокси-движок `/v1/*`, а дашборд и подсистемы, относящиеся только к дашборду, отключены. → [Headless Mode](docs/guides/HEADLESS.md)
- **🔎 Обнаружение моделей** — `/v1/models` фильтрует по возможностям, контексту, типу и тексту, а `POST /v1/models/query` возвращает короткий детерминированный список с той же видимостью для каждого ключа. → [API Reference](docs/reference/API_REFERENCE.md)
- **🔑 Управление маршрутизацией для каждого ключа** — привяжите API-ключ к одной модели или комбо с помощью `forcedModel`, а также атомарно добавляйте или удаляйте модели и комбо ключа (`/api/keys/{id}/access`). → [API Reference](docs/reference/API_REFERENCE.md) · [OpenAPI](docs/openapi.yaml)
- **🛡️ Более тонкое управление PII** — выбор по типам, до 20 проверенных пользовательских шаблонов маскирования и счётчики обнаружения по типам; само маскирование по-прежнему включается по желанию. → [Guardrails](docs/security/GUARDRAILS.md)
- **🌍 67 языков** — дашборд, зеркала документации и CLI; `npm run i18n:add-locale` добавляет язык повсюду одной командой. → [i18n Guide](docs/guides/I18N.md)
- **🎛️ OmniConductor** — входящее делегирование A2A вашему парку агентов, навыки Conductor в Agent Card и панель на дашборде с голосовым чатом Faro с кнопкой push-to-talk. → [A2A Server](docs/frameworks/A2A-SERVER.md)
- **🛂 Адаптивный допуск и защита от перегрузки** — тяжёлые чат-запросы ставятся в очередь вместо ответа 503, а атомарные скользящие аренды RPM выделяются на каждое соединение. → [Resilience Guide](docs/architecture/RESILIENCE_GUIDE.md)
- **🗂️ Канонический порядок `/v1/models`** — один непрерывный сгруппированный по провайдеру блок на каждого провайдера (комбо закреплены первыми), стабильный для любого источника каталога. → [API Reference](docs/reference/API_REFERENCE.md)
- **🗜️ Усиление сжатия** — защита от раздувания, включённая по умолчанию, наборы Caveman для DE / FR / JA + китайского (вэньянь), фильтры RTK для Gradle и .NET. → [Compression](docs/compression/COMPRESSION_ENGINES.md)
- **💸 Честная стоимость фиксированных тарифов** — провайдеры подписок / тарифов для программирования показывают **$0** в аналитике затрат; бюджет, квота и маршрутизация продолжают оценивать. → [API Reference](docs/reference/API_REFERENCE.md)
- **⚖️ Маршрутизация Quota-Share** — справедливо делит квоту общего аккаунта между ключами пула, работая по принципу сохранения загрузки, поэтому простаивающие доли передаются другим. → [Resilience Guide](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 Настройка CLI/агентов одной командой** — 15 зарегистрированных команд `setup-*`; `omniroute run` запускает 7 CLI (Claude Code, Codex, Aider, Goose, OpenCode, Qwen Code, Gemini CLI); `omniroute configure` поддерживает 11 целей с интерактивным выбором провайдера+модели и избранным для каждого контекста. → [CLI Integrations](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ Удалённый режим** — управляйте удалённым OmniRoute с помощью токенов с ограниченной областью (`connect` / `contexts` / `tokens`) + помощник OAuth `antigravity` для установок на VPS. → [Remote Mode](docs/guides/REMOTE-MODE.md)
- **🧭 Более умная авто-маршрутизация** — комбо `auto/<category>:<tier>`, **Fusion** (панель моделей + судья), маршрутизация с учётом задачи, переопределения модели / режима / бюджета в USD для каждого запроса. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ Подключаемое сжатие** — 12 компонуемых движков + Compression Studios: LLMLingua-2, двухуровневый Ultra, omniglyph, контроль точности на каждом шаге, GCF v3.2, редактор с перетаскиванием и изменением порядка. → [Compression](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ Прозрачное расшифровывание MITM (TPROXY)** — перехватывайте CLI, игнорирующие переменные окружения прокси, с CA для каждого SNI + установщиком доверенного хранилища. → [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 Телеметрия затрат повсюду** — заголовки стоимости/использования `X-OmniRoute-*` на каждом эндпоинте, заголовок экономии при попадании в кеш, квоты расходов в USD для каждого ключа. → [API Reference](docs/reference/API_REFERENCE.md)
- **🧠 Память, которой вы управляете** — отключена по умолчанию, включаемые по желанию векторная квантизация int8 + типизированное затухание, `x-omniroute-no-memory` для каждого запроса. → [Memory](docs/frameworks/MEMORY.md)
- **🛡️ Безопасность** — защита от prompt-injection на каждом LLM-маршруте (набор для red-team), включаемое по желанию ограждение для маскирования учётных данных (скрывает утёкшие API-ключи/секреты в обоих направлениях), бесплатный веб-поиск DuckDuckGo как последний вариант и необязательный шлюз входа OIDC для дашборда (вход по паролю всегда остаётся доступен). → [Guardrails](docs/security/GUARDRAILS.md)
- **🖼️ Новые эндпоинты** — `/v1/ocr` (Mistral OCR) и `/v1/audio/translations` (в стиле Whisper) дополняют медийные возможности. → [API Reference](docs/reference/API_REFERENCE.md)
- **🎨 Генерация изображений / видео / аудио** — единый API для медиа: xAI Grok Imagine и видео Novita AI, ComfyUI, Magnific, Adobe Firefly, Segmind и речевые провайдеры, такие как ElevenLabs. → [API Reference](docs/reference/API_REFERENCE.md)
- **🌍 Развёртывание и эксплуатация** — `basePath` обратного прокси, автоопределение языка браузера, отслеживание устройств по ключам, доверие MITM без root, локализация zh-TW. → [Environment](docs/reference/ENVIRONMENT.md)
- **🤝 Больше провайдеров и агентов** — облачные агенты (Codex Cloud, Cursor, Devin, Jules), Grok Build (xAI) со входом через браузер + OAuth, полноценная карточка Ollama, Claude Opus 5 и Sonnet 5, официальное партнёрство с Kimi (Code/Web/Moonshot), Zed, Requesty, SenseNova, Yuanbao, Agnes AI… и обновлённый **каталог на 375 провайдеров**. → [Providers](docs/reference/PROVIDER_REFERENCE.md)
- **📡 Прозрачность маршрутизации** — каждый ответ содержит заголовок `X-OmniRoute-Decision` с указанием стратегии/провайдера/задержки, которая его обслужила; новая стратегия комбо `cache-optimized` + фактор `cacheAffinity` Auto-Combo направляют повторные запросы обратно в соединение, удерживающее кешированный префикс; а эндпоинт только для чтения `/v1/auto-combo/{channel}/candidates` раскрывает живой пул кандидатов канала `auto/*`. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **⚡ Локальная производительность и инфраструктура** — локальный Redis в один клик, деплоеры relay для Cloudflare Workers / Deno Deploy, Bifrost и Mux как управляемые встроенные сервисы. → [Встроенные сервисы](docs/frameworks/EMBEDDED-SERVICES.md)
- **🧩 Также в комплекте** — фреймворк плагинов и маркетплейс, фреймворки навыков Omni/Agent/GitHub, интеграция с Obsidian vault (22 инструмента MCP), OpenAI-совместимые Batch и Files API, семантический кэш ответов, геймификация с таблицами лидеров, обнаружение ACP-агентов (15 встроенных агентов), планируемый экспорт логов в BigQuery, параллельное мультимодельное распределение `auto/chaos`, мост для Telegram-бота, встроенный менеджер версий и рейтинги бесплатных провайдеров по LMArena-ELO. → [Документация](docs/README.md)

<br/>

<div align="center">

## 🤖 Совместимые CLI и агенты для программирования

> Одна конфигурация — `http://localhost:20128/v1` — и **любая** ИИ-среда разработки или CLI работает с бесплатными и недорогими моделями.

<div align="center">
<table>
  <tr>
    <td align="center" width="76"><a href="https://github.com/anthropics/claude-code"><img src="./public/providers/claude.svg" width="40" alt="Claude Code"/><br/><sub><b>Claude Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/openai/codex"><img src="./public/providers/codex.svg" width="40" alt="Codex CLI"/><br/><sub><b>Codex CLI</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/cline.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cline.svg" width="40" alt="Cline"/></picture><br/><sub><b>Cline</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/Kilo-Org/kilocode"><img src="./public/providers/cli-generic.svg" width="40" alt="Kilo Code"/><br/><sub><b>Kilo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/Zoo-Code-Org/Zoo-Code"><img src="./public/providers/cli-generic.svg" width="40" alt="Zoo Code"/><br/><sub><b>Zoo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><img src="./public/providers/continue.svg" width="40" alt="Continue"/><br/><sub><b>Continue</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Aider"/><br/><sub><b>Aider</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="ForgeCode"/><br/><sub><b>ForgeCode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="jcode"/><br/><sub><b>jcode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/deepseek.svg" width="40" alt="DeepSeek TUI"/><br/><sub><b>DeepSeek TUI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="CodeWhale"/><br/><sub><b>CodeWhale</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/anomalyco/opencode"><img src="./public/providers/cli-generic.svg" width="40" alt="OpenCode"/><br/><sub><b>OpenCode</b></sub><br/><sub>                           </sub></a></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Factory Droid"/><br/><sub><b>Factory Droid</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/copilot.svg" width="40" alt="GitHub Copilot CLI"/><br/><sub><b>Copilot CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cursor.svg" width="40" alt="Cursor CLI"/><br/><sub><b>Cursor CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Smelt"/><br/><sub><b>Smelt</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Pi (pi-coding-agent)"/><br/><sub><b>Pi</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/grok.svg" width="40" alt="Grok Build (xAI)"/><br/><sub><b>Grok Build</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/nousresearch.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nousresearch.svg" width="40" alt="Hermes Agent (Nous Research)"/></picture><br/><sub><b>Hermes Agent</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/openclaw.svg" width="40" alt="OpenClaw"/><br/><sub><b>OpenClaw</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/goose.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/goose.svg" width="40" alt="Goose"/></picture><br/><sub><b>Goose</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Open Interpreter"/><br/><sub><b>Open Interpreter</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Warp AI"/><br/><sub><b>Warp AI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://deyin.ai"><img src="./public/deyin.svg" width="40" alt="deyin.ai"/><br/><sub><b>deyin.ai</b></sub><br/><sub>                           </sub></a></td>
  </tr>
</table>
</div>

<div align="center">
<b>＋ также работает с</b> · Agent Deck · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>любым инструментом, совместимым с OpenAI</b>
</div>

<sub>📖 Настройка каждого из всех 37 инструментов (27 CLI для написания кода + 10 CLI-агентов) → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 Плагин OpenCode → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

**Запускайте любой поддерживаемый CLI через OmniRoute одной командой** — без создания файлов конфигурации,
с передачей учётных данных отдельному процессу и изолированным временным домашним каталогом для Qwen/Gemini:

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Или выберите провайдера и модель в интерактивном режиме и сохраните собственную конфигурацию инструмента:
omniroute configure codex          # также: claude opencode qwen aider goose gemini cline continue kilo 5dive
```

Каждая команда учитывает активный удалённый контекст (`omniroute connect <host>`), `--dry-run`
показывает точные переменные окружения и аргументы без выполнения, а `--api-key-env NAME` позволяет не сохранять секреты
в истории командной оболочки. → [Интеграции CLI](docs/guides/CLI-INTEGRATIONS.md)

<br/>

<div align="center">

## 🌐 375 ИИ-провайдеров — 153 отмечены в каталоге как бесплатные

</div>

> **375 зарегистрированных провайдеров** в канонических коллекциях чатов, медиа, поиска, локальных моделей, облачных агентов и систем, включая **153 провайдера с метаданными обнаружения `hasFree: true`**. Реестр чат-моделей охватывает **239 провайдеров / 3 059 уникальных пар «провайдер — модель» / 1 475 исходных идентификаторов моделей**; отдельный каталог бесплатных квот содержит **471 строку для отдельных моделей**, **34 возобновляемых пула** и **51 провайдера с возобновляемым либо бессрочным бесплатным доступом без ключа**. Эти показатели намеренно рассчитываются по разным базам; определения и расчёты с устранением дубликатов пулов приведены в разделах [Справочник провайдеров](docs/reference/PROVIDER_REFERENCE.md) и [Бесплатные тарифы](docs/reference/FREE_TIERS.md).

<div align="center">

### 🏢 Все ведущие лаборатории — через единую конечную точку

<table>
  <tr>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/openai.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/openai.svg" width="40" alt="OpenAI"/></picture><br/><sub>OpenAI</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/claude-color.svg" width="40" alt="Anthropic"/><br/><sub>Anthropic</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/gemini-color.svg" width="40" alt="Gemini"/><br/><sub>Gemini</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/grok.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/grok.svg" width="40" alt="xAI Grok"/></picture><br/><sub>xAI Grok</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/deepseek-color.svg" width="40" alt="DeepSeek"/><br/><sub>DeepSeek</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/mistral-color.svg" width="40" alt="Mistral"/><br/><sub>Mistral</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qwen-color.svg" width="40" alt="Qwen"/><br/><sub>Qwen</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/meta-color.svg" width="40" alt="Meta Llama"/><br/><sub>Meta Llama</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/groq.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/groq.svg" width="40" alt="Groq"/></picture><br/><sub>Groq</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nvidia-color.svg" width="40" alt="NVIDIA"/><br/><sub>NVIDIA</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/minimax-color.svg" width="40" alt="MiniMax"/><br/><sub>MiniMax</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cohere-color.svg" width="40" alt="Cohere"/><br/><sub>Cohere</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/perplexity-color.svg" width="40" alt="Perplexity"/><br/><sub>Perplexity</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/huggingface-color.svg" width="40" alt="Hugging Face"/><br/><sub>HuggingFace</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/together-color.svg" width="40" alt="Together"/><br/><sub>Together</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/fireworks-color.svg" width="40" alt="Fireworks"/><br/><sub>Fireworks</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cloudflare-color.svg" width="40" alt="Cloudflare"/><br/><sub>Cloudflare</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/baidu-color.svg" width="40" alt="Baidu"/><br/><sub>Baidu</sub><br/><sub>                           </sub></td>
  </tr>
</table>

<sub>…и ещё более 350 — каждая иконка загружается в реальном времени из каталога провайдеров панели управления. 📖 [Справочник провайдеров](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 Бесплатно навсегда — $0, банковская карта не требуется

<table>
  <tr>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="OpenCode Zen"/><br/><b>OpenCode Zen</b><br/><sub>DeepSeek V4, Nemotron 3<br/>Без ограничения токенов</sub></td>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="Kilo Code"/><br/><b>Kilo Code</b><br/><sub>Автомаршрутизатор, Tencent Hy3<br/>Бесплатно навсегда</sub></td>
    <td align="center" width="150"><img src="./public/providers/requesty.svg" width="42" alt="Requesty"/><br/><b>Requesty</b><br/><sub>GPT-OSS 120B, Nemotron<br/>Бесплатно навсегда</sub></td>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/siliconcloud-color.svg" width="42" alt="SiliconFlow"/><br/><b>SiliconFlow</b><br/><sub>DeepSeek V3.2 / R1<br/>Бесплатный тариф</sub></td>
    <td align="center" width="150"><img src="./public/providers/zhipu.svg" width="42" alt="Z.AI GLM"/><br/><b>Z.AI GLM</b><br/><sub>GLM-4.7 / 4.5-Flash<br/>Бесплатно навсегда</sub></td>
    <td align="center" width="150"><img src="./public/providers/baidu.svg" width="42" alt="Baidu ERNIE"/><br/><b>Baidu ERNIE</b><br/><sub>ERNIE 4.0<br/>Бесплатно навсегда</sub></td>
  </tr>
  <tr>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="42" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Qwen3-Max, Kimi-K2<br/>БЕСПЛАТНО без ограничений</sub></td>
    <td align="center" width="150"><img src="./public/providers/pollinations.svg" width="42" alt="Pollinations"/><br/><b>Pollinations</b><br/><sub>GPT, Llama, Claude<br/>Ключ не требуется</sub></td>
    <td align="center" width="150"><img src="./public/providers/cloudflare.svg" width="42" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>Более 50 моделей<br/>10 тыс. нейронов в день</sub></td>
    <td align="center" width="150"><img src="./public/providers/nvidia.svg" width="42" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>GLM, MiniMax<br/>~40 RPM бесплатно</sub></td>
    <td align="center" width="150"><img src="./public/providers/cerebras.svg" width="42" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>GLM 4.7, GPT-OSS<br/>Одноразовый кредит $5; требуется карта</sub></td>
    <td align="center" width="150"><img src="./public/providers/openrouter.svg" width="42" alt="OpenRouter"/><br/><b>OpenRouter</b><br/><sub>Модели :free<br/>+$10 → более высокий RPM</sub></td>
  </tr>
</table>

📖 Полный машиночитаемый каталог → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

## 🖥️ Где работает OmniRoute — везде

</div>

> То же приложение, ваше устройство, ваши правила. От глобальной установки через npm до **вашего телефона** с помощью Termux.

<table>
  <tr><th align="left">Платформа</th><th align="left">Установка</th><th align="left">Особенности</th></tr>
  <tr><td align="left" nowrap>📦 <b>npm (глобально)</b></td><td align="left" nowrap><code>npm install -g omniroute</code></td><td align="left">Одна команда, любая ОС</td></tr>
  <tr><td align="left" nowrap>🐳 <b>Docker</b></td><td align="left" nowrap><code>docker run … diegosouzapw/omniroute</code></td><td align="left">Мультиархитектурная поддержка <b>AMD64 + ARM64</b></td></tr>
  <tr><td align="left" nowrap>🖥️ <b>Десктопное приложение (Electron)</b></td><td align="left" nowrap><code>npm run electron:build</code></td><td align="left">Нативное окно + системный трей — <b>Windows / macOS / Linux</b></td></tr>
  <tr><td align="left" nowrap>🎩 <b>Строка меню (OmniRouteTray)</b></td><td align="left" nowrap><code>brew install --cask zoispag/tap/omniroute-tray</code></td><td align="left">Контролирует и автоматически обновляет сервер — <b>macOS</b></td></tr>
  <tr><td align="left" nowrap>💪 <b>ARM</b></td><td align="left" nowrap>нативная поддержка <code>arm64</code></td><td align="left">Raspberry Pi, ARM-серверы, Apple Silicon</td></tr>
  <tr><td align="left" nowrap>📱 <b>Android (Termux)</b></td><td align="left" nowrap><code>pkg install nodejs && npx -y omniroute</code></td><td align="left">Работает <b>на вашем телефоне</b> круглосуточно и без root-прав</td></tr>
  <tr><td align="left" nowrap>📲 <b>PWA</b></td><td align="left" nowrap>«Добавить на главный экран»</td><td align="left">Полноэкранный режим, офлайн-работа, установка из браузера</td></tr>
  <tr><td align="left" nowrap>🧩 <b>Плагин OpenCode</b></td><td align="left" nowrap><code>@omniroute/opencode-provider</code></td><td align="left">Нативная интеграция с OpenCode</td></tr>
  <tr><td align="left" nowrap>🤖 <b>VS Code Copilot Chat</b></td><td align="left" nowrap>установите расширение <b>OmniCopilot</b></td><td align="left">Все модели OmniRoute в нативном списке выбора Copilot Chat — стабильная версия и Insiders</td></tr>
  <tr><td align="left" nowrap>🛠️ <b>Из исходного кода</b></td><td align="left" nowrap><code>npm install && npm run dev</code></td><td align="left">Изменяйте код и вносите свой вклад</td></tr>
</table>

<sub>📖 [Руководство по Docker](docs/guides/DOCKER_GUIDE.md) · [Десктопное приложение](electron/README.md) · [Приложение для строки меню](https://github.com/zoispag/omniroute-tray) · [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

### 🧩 Новинка: OmniRoute внутри нативного Copilot Chat в VS Code

</div>

> Никакой новой боковой панели и нового интерфейса чата — каждая модель, предоставляемая OmniRoute, отображается прямо в
> **уже знакомом вам списке выбора моделей Copilot Chat**. Начиная с VS Code 1.122 модели провайдеров работают
> без входа в GitHub и подписки Copilot — режим агента, вызов инструментов и обработка изображений
> доступны бесплатно.

Установите расширение **[OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)**, укажите
адрес вашего сервера OmniRoute (по умолчанию `localhost:20128`), затем откройте Copilot Chat → список выбора моделей
→ **Управление моделями…** → **OmniRoute**.

<table>
  <tr><th align="left">Магазин</th><th align="left">Ссылка</th><th align="left">Совместимость</th></tr>
  <tr><td align="left" nowrap>🧩 <b>VS Code Marketplace</b></td><td align="left"><a href="https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot">Установить →</a></td><td align="left">VS Code — стабильная версия и Insiders</td></tr>
  <tr><td align="left" nowrap>🔓 <b>Open VSX Registry</b></td><td align="left"><a href="https://open-vsx.org/extension/diegosouzapw/omnicopilot">Установить →</a></td><td align="left">Cursor, Windsurf, VSCodium, Theia, code-server, Gitpod, Antigravity, Kiro…</td></tr>
</table>

В редакторе откройте представление **Расширения**, найдите **"OmniRoute"** и нажмите **Установить**
— в обоих магазинах всё работает одинаково. Исходный код, задачи и руководство по публикации находятся в
[diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot).

<sub>📖 [Руководство по VS Code Copilot Chat](docs/guides/VSCODE-COPILOT.md) — настройка, содержимое списка выбора, панель управления во вкладке, устранение неполадок</sub>

<br/>

<div align="center">

### 🎩 Новинка: OmniRouteTray — ваш шлюз в строке меню

</div>

> `omniroute serve` лучше всего работает постоянно. **[OmniRouteTray](https://github.com/zoispag/omniroute-tray)**
> превращает его в приложение для строки меню macOS, которое можно один раз настроить и забыть: оно запускает сервер, поддерживает его работу
> после перезагрузок, обновляет его на месте и предоставляет доступ к текущему бюджету токенов одним щелчком — **без
> постоянно открытого окна терминала и без необходимости следить за `npm install -g omniroute`.**

Приложение создано с помощью [Tauri v2](https://v2.tauri.app/) (ядро на Rust пренебрежимо малого размера) и поставляется
с собственной подписанной средой выполнения Node 24, а также управляет отдельной установкой OmniRoute, поэтому не конфликтует с вашими
глобальными `node`/`bun`. Оно **использует существующие конфигурацию и базу данных из `~/.omniroute/`** — это
тот же OmniRoute, который вы уже запускаете, только теперь в шляпе. 🎩

<table>
  <tr><th align="left">Что оно делает</th><th align="left">Как</th></tr>
  <tr><td align="left" nowrap>🟢 <b>Контролирует сервер</b></td><td align="left">Запускает <code>omniroute serve</code> и подключается к уже работающему экземпляру вместо создания дубликата</td></tr>
  <tr><td align="left" nowrap>📊 <b>Использование в реальном времени</b></td><td align="left">Индикаторы квот провайдеров, лимиты Claude на сеанс и неделю с обратным отсчётом до сброса, разбивка расходов за 30 дней</td></tr>
  <tr><td align="left" nowrap>🔄 <b>Автоматически обновляется на месте</b></td><td align="left">Поэтапная установка, атомарная замена, откат при сбое — всегда самая новая версия</td></tr>
  <tr><td align="left" nowrap>🚀 <b>Запускается при входе в систему</b></td><td align="left">Необязательный запуск при входе; только в строке меню, без значка в Dock</td></tr>
  <tr><td align="left" nowrap>🩺 <b>Диагностика и журналы</b></td><td align="left">Диагностика одним щелчком и доступ к журналам сервера</td></tr>
</table>

```sh
brew install --cask zoispag/tap/omniroute-tray
```

<sub>Предпочитаете скачать? Загрузите последнюю версию <code>.dmg</code> из раздела
<a href="https://github.com/zoispag/omniroute-tray/releases">Релизы</a>. Исходный код, сообщения о проблемах и документация
по сборке доступны в <a href="https://github.com/zoispag/omniroute-tray">zoispag/omniroute-tray</a>.
<br/>💛 Проект сообщества от <a href="https://github.com/zoispag">@zoispag</a> — неофициальный выпуск OmniRoute.</sub>

<br/>

<div align="center">

## 🔒 Приватность и локальная работа прежде всего

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="Приватность и локальная работа прежде всего — шлюз и плоскость управления OmniRoute работают на вашем компьютере. Запросы отправляются вышестоящему провайдеру, выбранному для каждого запроса; OmniRoute не добавляет промежуточный облачный узел для обработки запросов, а телеметрия по умолчанию отключена. Учётные данные шифруются при хранении с помощью AES-256-GCM; средства защиты включают разграничение областей действия API-ключей, фильтрацию IP-адресов, ограничения частоты запросов, защиту от инъекций в промпты, очистку заголовков вышестоящих сервисов, опциональное удаление персональных данных, безопасные сообщения об ошибках и локальный журнал аудита SQLite. OmniRoute распространяется по лицензии MIT и поддерживает самостоятельный хостинг."/>

<sub>📖 [Авторизация](docs/architecture/AUTHZ_GUIDE.md) · [Защитные механизмы](docs/security/GUARDRAILS.md) · [Соответствие требованиям](docs/security/COMPLIANCE.md)</sub>

<br/>

<div align="center">

## 🔌 Полноценный CLI + A2A и MCP

</div>

> Помимо сервера, OmniRoute предоставляет **полноценный центр управления из командной строки** с **более чем 80 командами**, а также открытые агентские протоколы, позволяющие ИИ-агенту управлять им **самостоятельно**.

### ⌨️ Настоящий CLI (а не только `start`)

```bash
omniroute               # запуск шлюза и панели управления (порт 20128)
omniroute chat          # интерактивный TUI-клиент чата (слеш-команды: /model /combo /skill /memory)
omniroute setup         # пошаговый мастер первого запуска
omniroute doctor        # диагностика провайдеров, портов и нативных зависимостей
```

### 🛰️ Удалённый режим — запускайте CLI здесь, а OmniRoute — на VPS

OmniRoute работает на сервере? Управляйте им с ноутбука с помощью **того же CLI**. Один раз войдите
с токеном доступа с ограниченными правами — после этого все команды будут выполняться на удалённом сервере.

```bash
omniroute connect 192.168.0.15            # пароль → токен с ограниченными правами, сохранённый как контекст
omniroute models                         # ← выполняется на УДАЛЁННОМ сервере
omniroute configure codex                 # ← выбирает удалённую модель и создаёт локальный профиль Codex
omniroute tokens create --name ci --scope read   # выпускает токены с более узкими правами для других машин
omniroute contexts use default            # ← переключение обратно на локальный сервер
```

Токены имеют области доступа `read` / `write` / `admin`; маршруты, запускающие процессы, доступны только через loopback-интерфейс.
<sub>📖 [Удалённый режим](docs/guides/REMOTE-MODE.md)</sub>

<div align="left">

<img src="./docs/diagrams/cli-terminal.svg" width="50%" alt="Анимированная демонстрация CLI OmniRoute в терминале — omniroute providers list, omniroute combo list и omniroute health — с последовательным обзором 89 команд верхнего уровня: providers · oauth · keys · combo · nodes · models · cache · compression · cost · usage · quota · health · resilience · telemetry · logs · audit · mcp · a2a · cloud · memory · skills · eval · tunnel · backup · sync · webhooks · policy · pricing · translator · simulate …"/>

</div>

### 🤝 Подключите агента — и он сможет управлять самим OmniRoute

Предоставьте доступ к OmniRoute через **MCP**, **A2A**, **REST API**, **вебхуки** или **удалённый CLI** — любой совместимый агент (или ваш собственный код) получит полный контроль над шлюзом: маршрутизацией, провайдерами, комбинациями, кешем, сжатием и памятью — автономно. Приведённые ниже HTTP-эндпоинты доступны по адресу `http://localhost:20128`.

<table>
  <tr><th align="left">Интерфейс</th><th align="left">Эндпоинт / команда</th><th align="left">Назначение</th></tr>
  <tr><td align="left" nowrap>🧰 <b>MCP (stdio)</b></td><td align="left" nowrap><code>omniroute --mcp</code></td><td align="left">Подключение к Claude Desktop, Cursor или любому MCP-клиенту</td></tr>
  <tr><td align="left" nowrap>🌊 <b>MCP (HTTP)</b></td><td align="left" nowrap><code>/api/mcp/stream</code></td><td align="left">Удалённый MCP — <b>110 инструментов</b>, 33 области доступа (принудительное применение включается отдельно), полный журнал аудита</td></tr>
  <tr><td align="left" nowrap>📡 <b>MCP (SSE)</b></td><td align="left" nowrap><code>/api/mcp/sse</code></td><td align="left">Потоковый транспорт MCP</td></tr>
  <tr><td align="left" nowrap>🤝 <b>A2A</b></td><td align="left" nowrap><code>/.well-known/agent.json</code></td><td align="left">Взаимодействие между агентами, <b>JSON-RPC 2.0</b> + SSE, 6 навыков</td></tr>
  <tr><td align="left" nowrap>🌐 <b>REST API</b></td><td align="left" nowrap><code>/v1/*</code></td><td align="left">Совместимый с OpenAI интерфейс — чат, эмбеддинги, изображения, аудио, OCR</td></tr>
  <tr><td align="left" nowrap>🔔 <b>Вебхуки</b></td><td align="left" nowrap><code>/api/webhooks</code></td><td align="left">Отправка событий запросов и квот в Slack, Discord, Telegram или на любой URL</td></tr>
  <tr><td align="left" nowrap>🛰️ <b>Удалённый CLI</b></td><td align="left" nowrap><code>omniroute connect <host></code></td><td align="left">Управление удалённым экземпляром с помощью токенов доступа с ограниченными правами</td></tr>
</table>

```bash
# Предоставить Claude Code полный набор инструментов OmniRoute через MCP:
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

<sub>📖 [Сервер MCP](docs/frameworks/MCP-SERVER.md) · [Сервер A2A](docs/frameworks/A2A-SERVER.md) · [Агентские протоколы](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)</sub>

<br/>

<div align="center">

## 🗜️ Экономьте 15–95% токенов — автоматически

</div>

### 📖 Как это работает — конвейер, архитектура и расчёт экономии

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="Конвейер сжатия OmniRoute: пример клиентского запроса из 10 000 токенов, проходящего через 12 компонуемых движков — Session-Dedup, CCR, Lite, RTK, Responses Tool Output, Headroom, Relevance, Caveman, Aggressive, LLMLingua-2, Ultra и OmniGlyph — и в приведённом примере последовательного применения поступающего провайдеру в объёме около 1 080 токенов. Структурированный контент защищён средствами сохранения и проверками точности на каждом этапе; явно включённые режимы с потерями или экспериментальные режимы могут преобразовывать подходящий контент."/>

Стандартная последовательная комбинация выполняет `RTK → Caveman`. Когда оба движка обрабатывают одну и ту же полезную нагрузку инструмента или контекста, экономия суммируется:

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

Блоки кода, URL-адреса, JSON и структурированные данные **всегда защищены** механизмом сохранения.

> **Зачем использовать много токенов, если достаточно нескольких?** Каждый запрос проходит через конвейер сжатия OmniRoute **прозрачно** — никаких изменений на стороне клиента. Теперь это **стек из 12 компонуемых движков**, которые запускаются по порядку и могут сочетаться в каждой комбинации маршрутизации, развивая идеи из [RTK](https://github.com/rtk-ai/rtk), [Caveman](https://github.com/JuliusBrussee/caveman) (⭐ 90K+), [LLMLingua-2](https://github.com/microsoft/LLMLingua) и [Troglodita](https://github.com/leninejunior/troglodita) (PT-BR).

### 🧱 Стек из 12 движков

Движки запускаются в порядке конвейера; каждый из них можно независимо включать, отключать и настраивать для каждой комбинации:

<table>
  <tr><th align="center">#</th><th align="left">Движок</th><th align="left">Что он делает</th></tr>
  <tr><td align="center" nowrap>1</td><td align="left" nowrap><b>Session-Dedup</b></td><td align="left">Удаляет контент, повторяющийся в разных репликах (с адресацией по содержимому, между репликами)</td></tr>
  <tr><td align="center" nowrap>2</td><td align="left" nowrap><b>CCR</b></td><td align="left">Архивирует большие блоки за маркерами извлечения с загрузкой по требованию</td></tr>
  <tr><td align="center" nowrap>3</td><td align="left" nowrap><b>Lite</b></td><td align="left">Удаляет лишние пробелы и сокращает URL-адреса изображений (базовый режим с минимальной задержкой)</td></tr>
  <tr><td align="center" nowrap>4</td><td align="left" nowrap><b>RTK</b></td><td align="left">Интеллектуальная фильтрация, дедупликация и усечение результатов инструментов (с учётом команд)</td></tr>
  <tr><td align="center" nowrap>5</td><td align="left" nowrap><b>Responses Tool Output</b></td><td align="left">Сжатие JSON прежде всего без потерь, а также ограниченное диагностическое сжатие вывода оболочки, патчей, поиска и сборки (Responses API)</td></tr>
  <tr><td align="center" nowrap>6</td><td align="left" nowrap><b>Headroom</b></td><td align="left">Табличное уплотнение массивов JSON без потерь (~30%) с помощью встроенного кодека <b>GCF</b></td></tr>
  <tr><td align="center" nowrap>7</td><td align="left" nowrap><b>Relevance</b></td><td align="left">Экстрактивная оценка предложений относительно последнего запроса пользователя</td></tr>
  <tr><td align="center" nowrap>8</td><td align="left" nowrap><b>Caveman</b></td><td align="left">Сжатие прозы на основе правил (~65–75% для выходного текста)</td></tr>
  <tr><td align="center" nowrap>9</td><td align="left" nowrap><b>Aggressive</b></td><td align="left">Суммаризация и постепенное устаревание старых реплик</td></tr>
  <tr><td align="center" nowrap>10</td><td align="left" nowrap><b>LLMLingua-2</b></td><td align="left">Семантическое сокращение с помощью машинного обучения через MobileBERT ONNX — безопасное для кода, асинхронное</td></tr>
  <tr><td align="center" nowrap>11</td><td align="left" nowrap><b>Ultra</b></td><td align="left">Эвристическое сокращение токенов с необязательным уровнем малой модели (SLM)</td></tr>
  <tr><td align="center" nowrap>12</td><td align="left" nowrap><b>OmniGlyph</b></td><td align="left">Экспериментальное кодирование контекста в виде изображения для протестированной Claude Fable 5 при прямом подключении к Anthropic; преобразователи GPT 5.6 пока работают в отказобезопасном закрытом режиме до получения подтверждений от провайдера. Четыре профиля сжатия (по умолчанию агрессивный, сбалансированный, безопасный для программирования, без преобразований) (наиболее агрессивный; включается явно)</td></tr>
</table>

Блоки кода, URL-адреса и структурированные данные **всегда сохраняются** побайтно. **Предустановки в один клик** объединяют движки:

<table>
  <tr><th align="left">Режим</th><th align="left">Экономия</th><th align="left">Лучше всего подходит для</th></tr>
  <tr><td align="left" nowrap>🪶 <b>Lite</b></td><td align="left" nowrap>~15%</td><td align="left">Безопасный режим по умолчанию для постоянного использования</td></tr>
  <tr><td align="left" nowrap>🪨 <b>Standard (Caveman)</b></td><td align="left" nowrap>~30%</td><td align="left">Повседневной разработки</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Aggressive</b></td><td align="left" nowrap>~50%</td><td align="left">Длительных сеансов с интенсивным использованием инструментов</td></tr>
  <tr><td align="left" nowrap>🔥 <b>Ultra</b></td><td align="left" nowrap>~75%</td><td align="left">Максимальной экономии</td></tr>
  <tr><td align="left" nowrap>🧰 <b>RTK</b></td><td align="left" nowrap>60–90%</td><td align="left">Вывода оболочки, тестов, сборки и git</td></tr>
  <tr><td align="left" nowrap>🔗 <b>Stacked (RTK → Caveman)</b></td><td align="left" nowrap><b>78–95%</b></td><td align="left">Смешанных запросов и журналов инструментов</td></tr>
</table>

**Реальный пример — режим Standard:**

> **До (69 токенов):** _«Вероятная причина повторного рендеринга вашего компонента React заключается в том, что вы создаёте новую ссылку на объект при каждом цикле рендеринга. Когда вы передаёте встроенный объект как свойство, поверхностное сравнение React каждый раз воспринимает его как другой объект, что вызывает повторный рендеринг. Я рекомендую использовать useMemo для мемоизации объекта»._
>
> **После (19 токенов):** _«При каждом рендеринге создаётся новая ссылка на объект. Встроенный объект-свойство = новая ссылка = повторный рендеринг. Оберните в useMemo»._
>
> **Тот же ответ. На 72% меньше токенов. Никакой потери точности.** ✅

**Пример на PT-BR — режим [Troglodita](https://github.com/leninejunior/troglodita):**

> **До (42 токена):** _"Проблема в том, что компонент ре-рендерится, потому что на каждом цикле рендеринга создаётся новая ссылка на объект. Я бы рекомендовал использовать useMemo."_
>
> **После (12 токенов):** _"Ре-рендер: новая ссылка каждый цикл (inline-объект пересоздаётся). Использовать `useMemo`."_
>
> **Тот же ответ. ~70% меньше токенов. Техническая точность сохранена.** ✅

<br/>

### 🎚️ За пределами движков — стили вывода, адаптивный регулятор и управление на уровне запроса

12 движков выше сжимают то, что идёт **внутрь**. Ещё три слоя определяют **как**, **когда** и что получается **на выходе**:

- **🪄 Стили вывода** _(управление по оси вывода)_ — добавляют детерминированные, безопасные для кэша инструкции, формирующие ответ; комбинируются, каждый с интенсивностью `lite` / `full` / `ultra`. Добавление стиля — одна строка в реестре:
  - **Лаконичный текст** — убрать воду / артикли / осторожные формулировки; техническая суть остаётся точной.
  - **Меньше кода** — YAGNI «ленивого сеньора»: минимальное работающее изменение, никаких незапрошенных каркасов.
  - **Ponytail (ленивый сеньор)** — подниматься по лестнице YAGNI, исправлять первопричину, минимальный работающий diff.
  - **У меня СДВГ (сначала действие)** — вперёд идёт следующее действие, шаги пронумерованы, один конкретный следующий шаг, без вступлений.
  - **Лаконичный CJK (文言)** — сверхлаконичный стиль классического китайского (включается только для локали `zh`).
- **🎯 Адаптивный бюджет контекста** _(регулятор)_ — вместо одного порога токенов вкл/выкл наращивать самые дешёвые и наименее разрушительные движки ровно настолько, насколько нужно, чтобы **уместиться в контекстное окно модели**. Политика: `reserve-output` (по умолчанию, с учётом модели) · `percentage` · `absolute`. Режим: `floor` (гарантировать вписывание) · `replace-autotrigger` (ваш явный выбор побеждает) · `off` (устаревший порог).
- **🎛️ Где решается сжатие** _(приоритет, от высшего к низшему)_ — заголовок `x-omniroute-compression` на уровне запроса › переопределение в routing-combo › активный именованный профиль › адаптивный / авто-триггер › значение панели по умолчанию › выкл. Применённый план возвращается в заголовке ответа `X-OmniRoute-Compression: <mode>; source=<source>`.

Авто-триггер по порогу токенов, включение адаптивного регулятора, закрепление именованного профиля, разовая настройка на запрос или назначение конвейера на routing-combo — что лучше подходит под нагрузку. Опциональный офлайн-**стенд для оценки** (`npm run eval:compression`) измеряет точность против экономии на зафиксированном корпусе перед тем, как вы продвигаете изменение.

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ Быстрый старт

</div>

**1) Установка и запуск**

```bash
npm install -g omniroute
omniroute
```

> 💡 Видите `npm warn ERESOLVE` или предупреждения о peer-зависимостях? [Они безвредны](docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated).
> **Используете npm 11 или новее?** npm может блокировать скрипты жизненного цикла пакета, если они не разрешены. `postinstall` OmniRoute (`node scripts/build/postinstall.mjs`) необходим для подготовки его нативных файлов среды выполнения. Разрешите пакеты, перечисленные в предупреждении npm, при глобальной установке. Для набора пакетов, указанного в OmniRoute 3.8.53:
>
> ```bash
> npm install -g --allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild omniroute
> ```
>
> Чтобы переиспользовать этот список разрешений для будущих глобальных установок, настройте его один раз, а затем устанавливайте как обычно:
>
> ```bash
> npm config set allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild --location=user
> npm install -g omniroute
> ```
>
> Список зависимостей может меняться от релиза к релизу; если npm сообщает другой список, используйте имена пакетов из этого предупреждения. Разрешение пакета позволяет выполнять его установочные скрипты.
> **Используете Gemini Web или другого провайдера с веб-cookie?** Пакет npm включает
> Playwright, но не его бинарник Chromium. См. заметку
> [Настройка Playwright Chromium](docs/guides/TROUBLESHOOTING.md#gemini-web-and-playwright-chromium)
> перед первым запросом к веб-провайдеру.

Панель управления по адресу `http://localhost:20128` · API по адресу `http://localhost:20128/v1`.

**2) Подключите подходящего провайдера, используя свой аккаунт**

Панель управления → **Providers** → выберите провайдера, чьи текущие условия и квота подходят под ваш сценарий → добавьте его API-ключ или пройдите процесс создания аккаунта. Бесплатные тарифы могут требовать регистрации, одобрения или способа оплаты. Ознакомьтесь с [руководством по бесплатным тарифам](docs/getting-started/FREE-TIERS-GUIDE.md); доступ без ключа не гарантируется, а провайдеры с пометкой `tos: avoid` по умолчанию исключены из `auto`.

**3) Настройте свой инструмент разработки**

```txt
Base URL: http://localhost:20128/v1
API Key:  [скопировать из Dashboard → Endpoints]
Model:    auto            (маршрутизирует среди подходящих подключений — или выберите provider/model)
```

**4) Проверьте, что всё работает**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Вы должны увидеть список подключённых моделей. 🎉 Вот и всё — начинайте писать код, а OmniRoute сам маршрутизирует запросы и делает fallback за вас.

Если ваш клиент не может отправлять пользовательские заголовки, OmniRoute также предоставляет совместимые псевдонимы с токеном:

```txt
Каталог OpenAI:   http://localhost:20128/vscode/YOUR_KEY/
Модели OpenAI:    http://localhost:20128/vscode/YOUR_KEY/models
Чат OpenAI:       http://localhost:20128/vscode/YOUR_KEY/chat/completions
Responses OpenAI: http://localhost:20128/vscode/YOUR_KEY/responses
Чат Ollama:       http://localhost:20128/vscode/YOUR_KEY/api/chat
Теги Ollama:      http://localhost:20128/vscode/YOUR_KEY/api/tags
```

Используйте их только для клиентов, которые не могут передать `Authorization: Bearer ...`. Аутентификация через заголовок остаётся предпочтительным режимом.

<br/>

## 📦 Другие способы установки — Docker, исходный код, pnpm, Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

Тег `:latest` соответствует самой новой **опубликованной** стабильной версии SemVer. Он не отслеживает ветку git `main`. Для GitOps закрепляйте тег `:X.Y.Z`. См. [каналы выпусков Docker](docs/guides/DOCKER_GUIDE.md#release-channels). В образе задано значение **`OMNIROUTE_MEMORY_MB=1024`**. Этого достаточно для панели управления и непродолжительных чатов. **Агенты для программирования** (`POST /v1/responses` из Claude Code, Codex, Grok, …) требуют значительно большего объёма кучи V8, иначе при двух перекрывающихся длинных контекстах процесс завершается с `FATAL ERROR` примерно на 12 ГиБ. Выделяйте контейнеру больше памяти, чем размер кучи (нативные буферы размещаются за пределами V8):

| Рабочая нагрузка                                  | Куча (`-e OMNIROUTE_MEMORY_MB`) | Контейнер (`--memory`) |
| ------------------------------------------------- | ------------------------------- | ---------------------- |
| Панель управления / лёгкий чат                    | `1024` (по умолчанию в образе)  | ≥2 ГиБ                 |
| Один агент для программирования                   | `8192`                          | ≥10 ГиБ                |
| Два одновременных длинных запроса `/v1/responses` | `10240`–`12288`                 | ≥12–16 ГиБ             |

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

Полная таблица: [руководство по Docker — оперативная память во время выполнения](docs/guides/DOCKER_GUIDE.md#runtime-ram-for-coding-agents).

> **Канал предварительных выпусков Docker:** `diegosouzapw/omniroute:next` и
> `diegosouzapw/omniroute:next-web` отслеживают текущую ветку `release/v*`
> по умолчанию. Эти изменяемые теги предназначены только для тестирования ещё не выпущенных исправлений и
> **не поддерживаются в рабочей среде**. См.
> [каналы выпусков Docker](docs/guides/DOCKER_GUIDE.md#release-channels).

**🥟 Bun**

Стандартные `bun install` и глобальная установка (`bun install -g omniroute`) поддерживаются благодаря определению среды выполнения Bun:

- **Встроенный `bun:sqlite`**: при запуске в Bun OmniRoute использует встроенный драйвер Bun `bun:sqlite`, а в Node.js переключается на `better-sqlite3` или `sql.js`.
- **Автоматический выбор сборщика Webpack при разработке**: режим разработки (`bun run dev`) автоматически определяет Bun и отключает Turbopack в пользу Webpack, чтобы предотвратить несовместимость нативных привязок V8. Производственные сборки (`bun run build`) учитывают `OMNIROUTE_USE_TURBOPACK` точно так же, как в Node: по умолчанию используется Turbopack, а `OMNIROUTE_USE_TURBOPACK=0` включает сборку с Webpack (`Dockerfile.bun` предоставляет эту настройку как `--build-arg`).
- **Специализированный Dockerfile для Bun**: многоэтапный `Dockerfile.bun` для производственных развёртываний на нативном Bun (`docker build -f Dockerfile.bun -t omniroute:bun .`).

```bash
# Установка и запуск с Bun
bun install
bun run dev
```

**🛠️ Из исходного кода**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux (AUR)**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix (Flake)**

```bash
# Использование flakes Nix
nix develop
npm run dev

# Или использование devbox
devbox run npm run dev
```

📖 [Руководство по Docker](docs/guides/DOCKER_GUIDE.md) — профили Compose, HTTPS через Caddy, туннели Cloudflare.

**🦭 Podman**

```bash
# 1. Подготовьте каталог данных, подключаемый через bind mount
mkdir -p data

# 2. Только для Linux и локального rootless Podman (никогда не для удалённого клиента Podman Machine):
podman unshare chown 1000:1000 ./data

# 3. Задайте подсказку среды выполнения, соберите локальный образ Compose и запустите его
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d --build
```

В macOS или Windows Podman использует удалённую Podman Machine: пропустите `podman unshare` и
следуйте [рекомендациям по каталогу данных для вашей топологии](contrib/podman/README.md#data-directory-permissions-by-topology).

📖 [Руководство по Podman](contrib/podman/README.md) — сборки Compose, Podman Machine и
настройка Quadlet с Linux/systemd.

**⚡ Более быстрая и компактная установка (без нативной сборки)**

Нативный движок SQLite (`better-sqlite3`) является **необязательной** зависимостью, поэтому глобальная
установка никогда не блокируется из-за компиляции из исходного кода: используется предварительно собранный бинарный файл, если он соответствует
вашей платформе/версии Node, а в противном случае выполняется прозрачное переключение на движок на чистом JS
(`node:sqlite` в Node 22+ либо встроенный WASM-модуль `sql.js`) — инструменты сборки не требуются.

Чтобы полностью пропустить нативную инициализацию после установки (для CI, безголовых или медленных систем):

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 также пропускает её
```

Для максимально быстрой установки рекомендуется **pnpm** (контентно-адресуемое хранилище + жёсткие ссылки — см. выше).
Для безголового запуска без панели управления используйте профиль Docker `base` (см. выше) или
[руководство по Termux](docs/guides/TERMUX_GUIDE.md). CLI и веб-панель обслуживаются одним и тем же
процессом на одном порту, поэтому отдельного пакета только для CLI сейчас нет.

<br/>

<div align="center">

# 🎬 OmniRoute в действии

</div>

## 📹 Видеоруководства

<div align="center">

<sub>Снимок панели на 2026-10-18 · Исходный каталог: YT 1.352 | TT 334 | IG 290 · Актуальность (дни): YT 5 | TT 48 | IG 49</sub>

<table>
  <tr>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Da8ZthUPK98/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nick_saraev&font=montserrat&bold=true" alt="Instagram Reel — nick_saraev" width="300"/>
      </a><br/>
      <b>🎬 #1 — Instagram</b><br/>
      <sub>nick_saraev — 3,042,474 просмотров</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Dbp7wv_CIO0/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nnapier7&font=montserrat&bold=true" alt="Instagram Reel — nnapier7" width="300"/>
      </a><br/>
      <b>🎬 #2 — Instagram</b><br/>
      <sub>nnapier7 — 1,454,535 просмотров</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.youtube.com/watch?v=NJ0TQ-pyMDY">
        <img src="https://img.youtube.com/vi/NJ0TQ-pyMDY/maxresdefault.jpg" alt="YouTube — Amidia AI & Tech" width="300"/>
      </a><br/>
      <b>🎬 #3 — YouTube</b><br/>
      <sub>Amidia AI & Tech — 794,974 просмотров</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DaSs65mMrHk/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+theopenstack&font=montserrat&bold=true" alt="Instagram Reel — theopenstack" width="300"/>
      </a><br/>
      <b>🎬 #4 — Instagram</b><br/>
      <sub>theopenstack — 692,419 просмотров</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.tiktok.com/@migue.baena/video/7670919268216622358">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=TikTok+%7C+migue.baena&font=montserrat&bold=true" alt="TikTok — migue.baena" width="300"/>
      </a><br/>
      <b>🎬 #5 — TikTok</b><br/>
      <sub>migue.baena — 685,788 просмотров</sub>
    </td>
  </tr>
</table>

</div>

**Полный рейтинг (дедуплицированные канонические URL, `v > 0`, наибольший охват):**

| #1                                                                                     | #2                                                                                  | #3                                                                                      | #4                                                                                    | #5                                                                                                  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [nick_saraev — Instagram](https://www.instagram.com/reel/Da8ZthUPK98/) — **3,042,474** | [nnapier7 — Instagram](https://www.instagram.com/reel/Dbp7wv_CIO0/) — **1,454,535** | [Amidia AI & Tech — YouTube](https://www.youtube.com/watch?v=NJ0TQ-pyMDY) — **794,974** | [theopenstack — Instagram](https://www.instagram.com/reel/DaSs65mMrHk/) — **692,419** | [migue.baena — TikTok](https://www.tiktok.com/@migue.baena/video/7670919268216622358) — **685,788** |

| #6                                                                                                      | #7                                                                                                  | #8                                                                                     | #9                                                                                        | #10                                                                                 |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [milesreevesai — TikTok](https://www.tiktok.com/@milesreevesai/video/7667980059189366019) — **620,400** | [nikothetech — TikTok](https://www.tiktok.com/@nikothetech/video/7671890769665477918) — **610,803** | [Vaibhav Sisinty — YouTube](https://www.youtube.com/watch?v=QucgvbO5gsM) — **509,281** | [buildwithai.club — Instagram](https://www.instagram.com/reel/DbIt9AjK7-U/) — **347,652** | [nivedan.ai — Instagram](https://www.instagram.com/reel/DbIrCksJiqq/) — **331,973** |

Канонические метрики на 2026-10-18: **1.976 уникальных видео** · **20.220.289 известных просмотров** (`v > 0`) · **1.210 каналов/профилей по платформам**. Исходная панель содержит 1.976 строк (YouTube 1.352 = 740 длинных видео + 612 Shorts · TikTok 334 · Instagram 290); после нормализации по каноническому URL, при которой сохраняется наибольшее количество просмотров для каждого видео, дубликатов не осталось. Сбор данных YouTube заморожен на 2026-10-13 (квота API была исчерпана с 14 по 18/10), а TikTok/Instagram — на 2026-09-02 (нет кредитов для сбора данных); для 76 видео количество просмотров по-прежнему отсутствует.

> 🎬 **Сняли видео об OmniRoute?** Создайте [задачу](https://github.com/diegosouzapw/OmniRoute/issues/new) или начните [обсуждение](https://github.com/diegosouzapw/OmniRoute/discussions), указав ссылку, — и мы добавим его сюда.

<br/>

<div align="center">

# 📧 Сообщество и помощь

> Всё в одном месте — следите за публикациями сопровождающего, общайтесь с сообществом или создайте задачу.

| Канал                                            | Где / как                                                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 💼 **LinkedIn** — подписаться на сопровождающего | [linkedin.com/in/diegosouzapw](https://www.linkedin.com/in/diegosouzapw/)                                                    |
| 🐙 **GitHub** — следить за релизами и советами   | [@diegosouzapw](https://github.com/diegosouzapw)                                                                             |
| 💬 **Discord**                                   | [discord.gg/U47eFqAXCn](https://discord.gg/U47eFqAXCn)                                                                       |
| ✈️ **Telegram**                                  | [t.me/omnirouteOficial](https://t.me/omnirouteOficial)                                                                       |
| 🟢 **WhatsApp — 🌍 весь мир**                    | [вступить в группу](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)                                         |
| 🟢 **WhatsApp — 🇧🇷 Бразилия**                    | [вступить в группу](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)                                         |
| 🌍 **Веб-сайт**                                  | [omniroute.online](https://omniroute.online)                                                                                 |
| 🌍 **🌍Сообщество StHub OmniRoute (бесплатно)**  | [портал StHub](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)                        |
| 📦 **Исходный код**                              | [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)                                               |
| 🐛 **Сообщить об ошибке**                        | [создать обращение](https://github.com/diegosouzapw/OmniRoute/issues) — приложите вывод `npm run system-info`                |
| 🤝 **Внести вклад**                              | [CONTRIBUTING.md](CONTRIBUTING.md) · [Модель ветвления и релизов](docs/ops/BRANCHING_MODEL.md) · выберите `good first issue` |
| 💚 **Поддержать проект**                         | [Способы поддержки ↑](#-support-omniroute) · [GitHub Sponsors](https://github.com/sponsors/diegosouzapw)                     |

</div>

---

<br/>
<div align="center">

## 🛠️ Технологический стек

</div>

<table>
  <tr><th align="left">Слой</th><th align="left">Технология</th></tr>
  <tr><td nowrap><b>Среда выполнения</b></td><td>Node.js 22.x / 24.x LTS — <code>&gt;=22.22.2 &lt;23 || &gt;=24.0.0 &lt;27</code></td></tr>
  <tr><td nowrap><b>Язык</b></td><td>TypeScript 6.0 — <b>100% TypeScript</b> в <code>src/</code> и <code>open-sse/</code> (без <code>any</code> в ядре с v2.0)</td></tr>
  <tr><td nowrap><b>Фреймворк</b></td><td>Next.js 16 + React 19 + Tailwind CSS 4</td></tr>
  <tr><td nowrap><b>База данных</b></td><td>better-sqlite3 (SQLite, журналирование WAL) + LowDB (устаревший JSON) — 147 доменных модулей, 209 миграций</td></tr>
  <tr><td nowrap><b>Память</b></td><td>Полнотекстовый поиск SQLite FTS5 + int8-квантованные векторные эмбеддинги, типизированное затухание</td></tr>
  <tr><td nowrap><b>Схемы</b></td><td>Zod 4 — валидация ввода-вывода инструментов MCP + контракты API</td></tr>
  <tr><td nowrap><b>Протоколы</b></td><td>MCP (stdio / HTTP / SSE) + A2A v0.3 (JSON-RPC 2.0 + SSE)</td></tr>
  <tr><td nowrap><b>Потоковая передача</b></td><td>Server-Sent Events (SSE) + мост WebSocket (<code>/v1/ws</code>)</td></tr>
  <tr><td nowrap><b>Сжатие</b></td><td>Конвейер из 12 движков — RTK, Caveman, LLMLingua-2 (MobileBERT ONNX), GCF, OmniGlyph</td></tr>
  <tr><td nowrap><b>Аутентификация и безопасность</b></td><td>OAuth 2.0 (PKCE) + JWT + API-ключи + аутентификация MCP с ограниченными областями · AES-256-GCM при хранении · DOMPurify</td></tr>
  <tr><td nowrap><b>Маскировка</b></td><td>wreq-js — имитация TLS-отпечатков JA3 / JA4, трёхуровневый прокси</td></tr>
  <tr><td nowrap><b>Отказоустойчивость</b></td><td>Размыкатель цепи, экспоненциальная задержка, защита от «громового стада», самовосстановление auto-combo</td></tr>
  <tr><td nowrap><b>Логирование</b></td><td>pino — структурированные JSON-логи с контекстом запроса</td></tr>
  <tr><td nowrap><b>Тестирование</b></td><td>Раннер тестов Node.js + Vitest — <b>56,000+ статических объявлений тестов</b> в 7,800+ отслеживаемых тестовых файлах (модульные, интеграционные, E2E, безопасность, экосистема)</td></tr>
  <tr><td nowrap><b>Платформы</b></td><td>Десктоп (Electron) · Android (Termux) · PWA (любой браузер)</td></tr>
  <tr><td nowrap><b>CI/CD</b></td><td>GitHub Actions — автопубликация в npm + Docker Hub при релизе</td></tr>
  <tr><td nowrap><b>Ссылки</b></td><td><a href="https://omniroute.online">Сайт</a> · <a href="https://www.npmjs.com/package/omniroute">npm</a> · <a href="https://hub.docker.com/r/diegosouzapw/omniroute">Docker Hub</a></td></tr>
</table>

<div align="center">

<br/>

## 📖 Документация

</div>

### 📘 Начало работы

<table>
  <tr><th align="left">Документ</th><th align="left">Описание</th></tr>
  <tr><td nowrap><b><a href="docs/guides/USER_GUIDE.md">Руководство пользователя</a></b></td><td>Провайдеры, комбинации, интеграция с CLI, развертывание</td></tr>
  <tr><td nowrap><b><a href="docs/guides/SETUP_GUIDE.md">Руководство по настройке</a></b></td><td>Все способы установки, конфигурации инструментов CLI, настройка протоколов, оптимизация тайм-аутов</td></tr>
  <tr><td nowrap><b><a href="docs/reference/CLI-TOOLS.md">Руководство по инструментам CLI</a></b></td><td>Настройка отдельных инструментов: Claude Code, Codex, Cursor, Cline, OpenClaw, Kilo, Copilot</td></tr>
  <tr><td nowrap><b><a href="docs/guides/REMOTE-MODE.md">Удаленный режим</a></b></td><td>Управление удаленным экземпляром OmniRoute (VPS) из CLI на ноутбуке с помощью токенов доступа с ограниченной областью действия</td></tr>
  <tr><td nowrap><b><a href="docs/guides/CLAUDE-CODE-CONFIGURATION.md">Конфигурация Claude Code</a></b></td><td>Подключение Claude Code к OmniRoute (локальному или удаленному) с помощью <code>launch</code> и профилей для отдельных моделей</td></tr>
  <tr><td nowrap><b><a href="README.md#-quick-start">Быстрый старт</a></b></td><td>3 шага: установка → подключение → настройка</td></tr>
</table>

### 🔧 Эксплуатация и развертывание

<table>
  <tr><th align="left">Документ</th><th align="left">Описание</th></tr>
  <tr><td nowrap><b><a href="docs/guides/DOCKER_GUIDE.md">Руководство по Docker</a></b></td><td>Docker run, профили Compose, Caddy HTTPS, туннели, теги образов</td></tr>
  <tr><td nowrap><b><a href="contrib/podman/README.md">Руководство по Podman</a></b></td><td>Интеграция Quadlet с systemd, podman-compose, SELinux</td></tr>
  <tr><td nowrap><b><a href="docs/ops/VM_DEPLOYMENT_GUIDE.md">Развертывание на ВМ</a></b></td><td>Полное руководство: настройка ВМ + nginx + Cloudflare</td></tr>
  <tr><td nowrap><b><a href="docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md">Развертывание на Fly.io</a></b></td><td>Развертывание на Fly.io с постоянным хранилищем</td></tr>
  <tr><td nowrap><b><a href="docs/guides/TERMUX_GUIDE.md">Руководство по Termux</a></b></td><td>Запуск OmniRoute на Android через Termux</td></tr>
  <tr><td nowrap><b><a href="docs/guides/PWA_GUIDE.md">Руководство по PWA</a></b></td><td>Установка прогрессивного веб-приложения, кеширование, архитектура</td></tr>
  <tr><td nowrap><b><a href="docs/guides/UNINSTALL.md">Руководство по удалению</a></b></td><td>Полное удаление для всех способов установки</td></tr>
  <tr><td nowrap><b><a href="docs/reference/ENVIRONMENT.md">Конфигурация окружения</a></b></td><td>Полный перечень переменных и справочных сведений для <code>.env</code></td></tr>
</table>

### 🧠 Возможности и архитектура

<table>
  <tr><th align="left">Документ</th><th align="left">Описание</th></tr>
  <tr><td nowrap><b><a href="docs/architecture/ARCHITECTURE.md">Архитектура</a></b></td><td>Архитектура системы, поток данных и внутреннее устройство</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_GUIDE.md">Руководство по сжатию</a></b></td><td>Конвейер с 7 вариантами: выкл. / легкий / стандартный / агрессивный / ультра / RTK / составной</td></tr>
  <tr><td nowrap><b><a href="docs/compression/RTK_COMPRESSION.md">Сжатие RTK</a></b></td><td>Сжатие вывода команд, фильтры, доверие, проверка, восстановление необработанного вывода</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_ENGINES.md">Механизмы сжатия</a></b></td><td>Caveman, RTK, составные конвейеры, интерфейсы панели управления/API/MCP</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_RULES_FORMAT.md">Формат правил сжатия</a></b></td><td>Схемы пакетов правил JSON для фильтров Caveman и RTK</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_LANGUAGE_PACKS.md">Языковые пакеты сжатия</a></b></td><td>Определение языка и создание пакетов правил Caveman</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/RESILIENCE_GUIDE.md">Руководство по отказоустойчивости</a></b></td><td>Автоматические выключатели, периоды ожидания, очередь, предотвращение лавинообразных запросов, подмена TLS</td></tr>
  <tr><td nowrap><b><a href="docs/routing/AUTO-COMBO.md">Механизм Auto-Combo</a></b></td><td>Оценка по 16 факторам, наборы режимов, самовосстановление</td></tr>
  <tr><td nowrap><b><a href="docs/ops/PROXY_GUIDE.md">Руководство по прокси</a></b></td><td>Трехуровневая система прокси, маркетплейс 1proxy, операции CRUD с реестром</td></tr>
  <tr><td nowrap><b><a href="docs/reference/FREE_TIERS.md">Бесплатные тарифы</a></b></td><td>Сводный каталог: 34 документированных регулярно возобновляемых пула / 471 каталогизированная запись бесплатного уровня</td></tr>
  <tr><td nowrap><b><a href="docs/guides/FEATURES.md">Галерея возможностей</a></b></td><td>Визуальный обзор панели управления со снимками экрана</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/CODEBASE_DOCUMENTATION.md">Документация кодовой базы</a></b></td><td>Понятный новичкам обзор кодовой базы</td></tr>
</table>

### 🤖 Протоколы и API

<table>
  <tr><th align="left">Документ</th><th align="left">Описание</th></tr>
  <tr><td nowrap><b><a href="docs/reference/API_REFERENCE.md">Справочник API</a></b></td><td>Все конечные точки с примерами</td></tr>
  <tr><td nowrap><b><a href="docs/openapi.yaml">Спецификация OpenAPI</a></b></td><td>Спецификация OpenAPI 3.0</td></tr>
  <tr><td nowrap><b><a href="open-sse/mcp-server/README.md">Сервер MCP</a></b></td><td>110 инструментов MCP, конфигурации IDE, клиенты Python/TS/Go</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/MCP-SERVER.md">Руководство по серверу MCP</a></b></td><td>Установка MCP, транспорты и справочник инструментов</td></tr>
  <tr><td nowrap><b><a href="src/lib/a2a/README.md">Сервер A2A</a></b></td><td>Протокол JSON-RPC 2.0, навыки, потоковая передача, управление задачами</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/A2A-SERVER.md">Руководство по серверу A2A</a></b></td><td>Карточка агента A2A, задачи, навыки и потоковая передача</td></tr>
</table>

### 📋 Проект и качество

<table>
  <tr><th align="left">Документ</th><th align="left">Описание</th></tr>
  <tr><td nowrap><b><a href="CONTRIBUTING.md">Участие в разработке</a></b></td><td>Настройка среды разработки и рекомендации</td></tr>
  <tr><td nowrap><b><a href="docs/ops/BRANCHING_MODEL.md">Модель ветвления и выпусков</a></b></td><td>На какие ветки нацелены PR (<code>release/*</code>) и что означают <code>main</code> и теги</td></tr>
  <tr><td nowrap><b><a href="CHANGELOG.md">Журнал изменений</a></b></td><td>Полная история выпусков по версиям</td></tr>
  <tr><td nowrap><b><a href="SECURITY.md">Политика безопасности</a></b></td><td>Сообщение об уязвимостях и практики обеспечения безопасности</td></tr>
  <tr><td nowrap><b><a href="docs/guides/I18N.md">Руководство по i18n</a></b></td><td>Поддержка 67 языков, процесс перевода, RTL</td></tr>
  <tr><td nowrap><b><a href="docs/ops/RELEASE_CHECKLIST.md">Контрольный список выпуска</a></b></td><td>Этапы проверки перед выпуском</td></tr>
  <tr><td nowrap><b><a href="docs/ops/COVERAGE_PLAN.md">План покрытия</a></b></td><td>Стратегия тестового покрытия для более чем 56 000 статических объявлений тестов в более чем 7 800 отслеживаемых тестовых файлах</td></tr>
</table>

<br/>

<div align="center">

# ⭐ Лучшие участники

> OmniRoute развивается благодаря увлечённому сообществу открытого исходного кода. Эти люди внесли выдающийся вклад, который напрямую влияет на качество, стабильность и распространение проекта. **Спасибо.**

### Внешние участники по количеству слитых pull request

<table>
  <tr><th align="center">Место</th><th align="left">Участник</th><th align="center">Слитые PR</th><th align="right">~Изменённых строк</th></tr>
  <tr><td align="center">1</td><td align="left"><a href="https://github.com/maxmad64bis"><b>maxmad64bis</b></a></td><td align="center">371</td><td align="right">25,326,561</td></tr>
  <tr><td align="center">2</td><td align="left"><a href="https://github.com/HouMinXi"><b>HouMinXi</b></a></td><td align="center">269</td><td align="right">13,456,272</td></tr>
  <tr><td align="center">3</td><td align="left"><a href="https://github.com/backryun"><b>backryun</b></a></td><td align="center">210</td><td align="right">270,562</td></tr>
  <tr><td align="center">4</td><td align="left"><a href="https://github.com/oyi77"><b>oyi77</b></a></td><td align="center">190</td><td align="right">411,243</td></tr>
  <tr><td align="center">5</td><td align="left"><a href="https://github.com/pacocartones"><b>pacocartones</b></a></td><td align="center">174</td><td align="right">78,276</td></tr>
  <tr><td align="center">6</td><td align="left"><a href="https://github.com/JxnLexn"><b>JxnLexn</b></a></td><td align="center">151</td><td align="right">3,562,936</td></tr>
  <tr><td align="center">6</td><td align="left"><a href="https://github.com/KooshaPari"><b>KooshaPari</b></a></td><td align="center">151</td><td align="right">5,972,314</td></tr>
  <tr><td align="center">8</td><td align="left"><a href="https://github.com/rdself"><b>rdself</b></a></td><td align="center">145</td><td align="right">80,663</td></tr>
  <tr><td align="center">9</td><td align="left"><a href="https://github.com/RaviTharuma"><b>RaviTharuma</b></a></td><td align="center">123</td><td align="right">500,065</td></tr>
  <tr><td align="center">10</td><td align="left"><a href="https://github.com/herjarsa"><b>herjarsa</b></a></td><td align="center">88</td><td align="right">230,872</td></tr>
  <tr><td align="center">11</td><td align="left"><a href="https://github.com/hartmark"><b>hartmark</b></a></td><td align="center">84</td><td align="right">2,849,554</td></tr>
  <tr><td align="center">12</td><td align="left"><a href="https://github.com/jonlwheat2-gif"><b>jonlwheat2-gif</b></a></td><td align="center">67</td><td align="right">68,548</td></tr>
  <tr><td align="center">13</td><td align="left"><a href="https://github.com/artickc"><b>artickc</b></a></td><td align="center">62</td><td align="right">43,502</td></tr>
  <tr><td align="center">14</td><td align="left"><a href="https://github.com/chirag127"><b>chirag127</b></a></td><td align="center">52</td><td align="right">6,661</td></tr>
  <tr><td align="center">15</td><td align="left"><a href="https://github.com/xz-dev"><b>xz-dev</b></a></td><td align="center">50</td><td align="right">245,976</td></tr>
  <tr><td align="center">16</td><td align="left"><a href="https://github.com/xiaoyaner0201"><b>xiaoyaner0201</b></a></td><td align="center">47</td><td align="right">33,626</td></tr>
  <tr><td align="center">17</td><td align="left"><a href="https://github.com/woodsonl"><b>woodsonl</b></a></td><td align="center">46</td><td align="right">809,391</td></tr>
  <tr><td align="center">18</td><td align="left"><a href="https://github.com/rqzbeh"><b>rqzbeh</b></a></td><td align="center">44</td><td align="right">147,896</td></tr>
  <tr><td align="center">19</td><td align="left"><a href="https://github.com/QuangBlue"><b>QuangBlue</b></a></td><td align="center">43</td><td align="right">13,112</td></tr>
  <tr><td align="center">20</td><td align="left"><a href="https://github.com/MumuTW"><b>MumuTW</b></a></td><td align="center">40</td><td align="right">26,093</td></tr>
</table>

<sub>Статистика собрана 2026-10-18 15:09:09 UTC по актуальной вершине <code>release/v3.8.52</code> — <code>656f01cb43</code>. Постраничная статистика GitHub GraphQL содержит 9,191 слитый PR: 3,834 от владельца репозитория, 229 от Dependabot, 6 от других ботов/приложений и <b>5,122 внешних PR от 835 уникальных участников</b>. «Изменённые строки» — это сумма добавлений и удалений по данным GitHub, включающая сгенерированные файлы, lock-файлы, каталоги, переводы и документацию; это объём изменений, а не количество авторских строк кода. Для 49 PR GitHub сообщает о различиях объёмом более 500,000 строк (например, #13399, добавляющий одного провайдера, содержит 2,347 изменённых файлов), что завышает некоторые приведённые выше итоги. При равных результатах участники делят одно место.</sub>

### Коммиты, атрибутированные GitHub

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/maxmad64bis">
        <img src="https://github.com/maxmad64bis.png" width="40" style="border-radius:50%" alt="Dizzle"/><br/>
        <b>Dizzle</b>
      </a><br/>
      <sub>🥇 367 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/HouMinXi">
        <img src="https://github.com/HouMinXi.png" width="40" style="border-radius:50%" alt="Bob.Hou"/><br/>
        <b>Bob.Hou</b>
      </a><br/>
      <sub>🥈 269 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="Paijo"/><br/>
        <b>Paijo</b>
      </a><br/>
      <sub>🥉 229 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🏅 202 коммита, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png" width="40" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>🏅 174 коммита, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/RaviTharuma">
        <img src="https://github.com/RaviTharuma.png" width="40" style="border-radius:50%" alt="Ravi Tharuma"/><br/>
        <b>Ravi Tharuma</b>
      </a><br/>
      <sub>🏅 126 коммитов, учтённых GitHub</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/hartmark">
        <img src="https://github.com/hartmark.png" width="40" style="border-radius:50%" alt="Markus Hartung"/><br/>
        <b>Markus Hartung</b>
      </a><br/>
      <sub>🏅 114 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="Randi"/><br/>
        <b>Randi</b>
      </a><br/>
      <sub>🏅 108 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 87 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris"/><br/>
        <b>Chris</b>
      </a><br/>
      <sub>🏅 70 коммитов, учтённых GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/KooshaPari">
        <img src="https://github.com/KooshaPari.png" width="40" style="border-radius:50%" alt="Koosha Paridehpour"/><br/>
        <b>Koosha Paridehpour</b>
      </a><br/>
      <sub>🏅 68 коммитов, учтённых GitHub</sub>
    </td>
  </tr>
</table>

<sub>Повторно проверено 2026-10-18 14:44:45 UTC: коммиты, учтённые GitHub и указанные API участников репозитория для ветки <code>release/v3.8.52</code> по умолчанию. API вернул 849 идентификаторов (429 пользователей, 2 бота, 418 анонимных); из этой таблицы исключены сопровождающий проекта, боты и анонимные идентификаторы, при этом сохранены одинаковые места в рейтинге. Она отличается как от приведённого выше рейтинга объединённых PR, так и от приведённой ниже статистики метаданных Git.</sub>

> 🙏 Функции, исправления ошибок и улучшения инфраструктуры, созданные этими участниками, — **неотъемлемая часть** того, что делает OmniRoute надёжным и функционально богатым. Важны каждый запрос на включение изменений, каждый тестовый сценарий и каждый файл перевода i18n. Открытое программное обеспечение создаётся такими людьми, как они.

</div>

---

<br/>

## 💖 Спонсоры

<div align="center">

Огромное спасибо людям, которые финансируют OmniRoute из собственного кармана — каждый вклад помогает проекту оставаться бесплатным, независимым и продолжать развиваться.

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/drewbitt">
        <img src="https://github.com/drewbitt.png?size=140" width="72" style="border-radius:50%" alt="Andrew"/><br/>
        <b>Andrew</b>
      </a><br/>
      <sub>💛 Активный ежемесячный спонсор</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/psylligent">
        <img src="https://github.com/psylligent.png?size=140" width="72" style="border-radius:50%" alt="Vlad I"/><br/>
        <b>Vlad I</b>
      </a><br/>
      <sub>💛 Активный ежемесячный спонсор</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/xiaoyaner0201">
        <img src="https://github.com/xiaoyaner0201.png?size=140" width="72" style="border-radius:50%" alt="小妍儿"/><br/>
        <b>小妍儿</b>
      </a><br/>
      <sub>💛 Активный ежемесячный спонсор</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/Guilsc">
        <img src="https://github.com/Guilsc.png?size=140" width="72" style="border-radius:50%" alt="Guilherme Costa"/><br/>
        <b>Guilherme Costa</b>
      </a><br/>
      <sub>💛 Активный разовый спонсор</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/TheVingance">
        <img src="https://github.com/TheVingance.png?size=140" width="72" style="border-radius:50%" alt="Henrique Triches Iurkiv"/><br/>
        <b>Henrique Iurkiv</b>
      </a><br/>
      <sub>💛 Активный разовый спонсор</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/somesh-ghaturle">
        <img src="https://github.com/somesh-ghaturle.png?size=140" width="72" style="border-radius:50%" alt="Somesh Ghaturle"/><br/>
        <b>Somesh Ghaturle</b>
      </a><br/>
      <sub>💛 Активный разовый спонсор</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/Kolonie-AI">
        <img src="https://github.com/Kolonie-AI.png?size=140" width="72" style="border-radius:50%" alt="Kolonie AI"/><br/>
        <b>Kolonie AI</b>
      </a><br/>
      <sub>💛 Поддержал проект разовым взносом в прошлом</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/igormorais123">
        <img src="https://github.com/igormorais123.png?size=140" width="72" style="border-radius:50%" alt="Professor Igor Morais Vasconcelos"/><br/>
        <b>Prof. Igor Morais</b>
      </a><br/>
      <sub>💛 Поддержал проект разовым взносом в прошлом</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/PixmaNts">
        <img src="https://github.com/PixmaNts.png?size=140" width="72" style="border-radius:50%" alt="Pixma"/><br/>
        <b>Pixma</b>
      </a><br/>
      <sub>💛 Поддержал проект разовым взносом в прошлом</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png?size=140" width="72" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>💛 Поддержал проект разовым взносом в прошлом</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/longtao77">
        <img src="https://github.com/longtao77.png?size=140" width="72" style="border-radius:50%" alt="longtao"/><br/>
        <b>longtao</b>
      </a><br/>
      <sub>💛 Поддержал проект разовым взносом в прошлом</sub>
    </td>
  </tr>
</table>

<sub>… и другим людям, предпочитающим сохранять конфиденциальность 💛</sub>

<sub>Данные о публичных спонсорах GitHub повторно проверены 2026-10-18 через GitHub Sponsors GraphQL API: 11 публичных спонсорских взносов (6 активных, 5 прошлых) из 14 в общей сложности. Статус GitHub <code>isActive</code> определяет приведённые выше пометки об активности; публичные пользователи, ранее оказавшие разовую поддержку, по-прежнему упомянуты с благодарностью, а частные спонсоры остаются анонимными. Пожертвования через Ko-fi, Buy Me a Coffee, Liberapay, PIX и в криптовалюте не указаны, поскольку для них нет публичной записи о спонсоре.</sub>

<b><a href="https://github.com/sponsors/diegosouzapw">💖 Стать спонсором →</a></b> — каждый доллар помогает OmniRoute оставаться бесплатным и независимым.

</div>

<br/>

<div align="center">

## 👥 Более 900 участников

</div>

[![Участники](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=993&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

<sub>Проверено 2026-10-18 на актуальной вершине <code>release/v3.8.52</code> — коммите <code>ad160ab2d1</code> (6 826 коммитов): <b>993 нормализованные Git-идентичности реальных людей</b> — 707 указаны как авторы коммитов (включая сопровождающего), а 286 встречаются только в явно заданных строках <code>Co-authored-by</code>. При подсчёте учитывается <code>.mailmap</code>, адреса электронной почты сравниваются без учёта регистра, числовые и обычные noreply-адреса GitHub объединяются только в том случае, если они соответствуют одному и тому же имени пользователя; исключены 26 идентичностей ботов, агентов, сервисов и заполнителей, а обычные адреса электронной почты не объединяются лишь на основании совпадения отображаемых имён. В аудите от 2026-08-24 было опубликовано число 639; повторное применение этого метода к базовому коммиту того аудита <code>ac02c5b42f</code> даёт 619, поэтому рост обусловлен появлением новых участников, а не менее строгой методикой.</sub>

### Как внести вклад

1. Создайте форк репозитория
2. Создайте ветку от вершины **активной** ветки `release/vX.Y.Z` (не от `main`) — см. [Модель ветвления и выпуска релизов](docs/ops/BRANCHING_MODEL.md)
3. Создайте ветку для своей функции (`git checkout -b feat/amazing-feature`)
4. Зафиксируйте изменения (`git commit -m 'feat: add amazing feature'`)
5. Отправьте ветку (`git push origin feat/amazing-feature`)
6. Откройте Pull Request с **базовой веткой = соответствующая ветка `release/vX.Y.Z`**

Подробные рекомендации см. в [CONTRIBUTING.md](CONTRIBUTING.md).

### Выпуск новой версии

```bash
# Создайте релиз — публикация в npm произойдёт автоматически
VERSION=x.y.z
gh release create "v${VERSION}" --title "v${VERSION}" --generate-notes
```

<br/>

<div align="center">

## 📊 Звёзды

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="График истории звёзд" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
 </picture>
</a>

<br/>

<div align="center">

## 🌍 StarMapper

<a href="https://starmapper.bruniaux.com/diegosouzapw/omniroute">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=light" />
    <img alt="StarMapper" src="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute" />
  </picture>
</a>
</div>

<br/>

<div align="center">

## 🙏 Благодарности

</div>

OmniRoute стоит на плечах гигантов. Проект начался как форк **[9router](https://github.com/decolua/9router)** и TypeScript-порт проекта на Go **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — а затем каждая из перечисленных ниже подсистем была вдохновлена проектом с открытым исходным кодом, который реализовал соответствующую идею раньше. Каждый из них сформировал конкретную часть OmniRoute. Так мы благодарим их всех. 🙏

> ⭐ количество звёзд проверено через REST API GitHub 18 октября 2026 года — поддержите эти проекты звёздами. Указанные значения представляют собой точный снимок на конкретную дату и со временем, естественно, изменятся.

### 🧬 Происхождение и шлюз

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/decolua/9router">9router</a></b></td><td align="center">31,004</td><td>Исходный проект, на котором основан этот форк, — здесь он расширен мультимодальными API и полностью переписан на TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></b></td><td align="center">55,591</td><td>Реализация на Go, вдохновившая этот порт на JavaScript / TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/BerriAI/litellm">LiteLLM</a></b></td><td align="center">61,482</td><td>ИИ-шлюз, чей общедоступный набор данных о ценах используется для синхронизации нашего учёта затрат, а модель нормализации провайдеров повлияла на нашу маршрутизацию.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuuyy/codex-chatgpt-web">codex-chatgpt-web</a></b></td><td align="center">14,526</td><td>Исходный код под лицензией MIT, адаптированный во встроенный мост ChatGPT Web → Codex Responses, включая адаптеры браузерных сессий, формирования ответов, учёта использования и веб-поиска.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Alishahryar1/free-claude-code">free-claude-code</a></b></td><td align="center">61,430</td><td>Шаблоны, перенесённые в восстановление потоковой передачи, псевдонимы без рассуждений, резервный веб-поиск, ограничения скользящего окна, редактирование конфиденциальных данных в журналах и усиленные сценарии запуска.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/standardagents/composer-api">composer-api</a></b></td><td align="center">346</td><td>Шаблоны Cursor Composer для выбора инструментов, ограничений вывода и фиксации вызовов инструментов, адаптированные для нативного исполнителя Cursor.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ndycode/codex-multi-auth">codex-multi-auth</a></b></td><td align="center">553</td><td>Шаблоны повторного входа и ротации токенов обновления, перенесённые в повторную аутентификацию Codex OAuth.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ex-machina-co/opencode-anthropic-auth">opencode-anthropic-auth</a></b></td><td align="center">558</td><td>Совместимые с Claude Code настройки преобразований по умолчанию и поведение заголовков биллинга, обобщённые в управляемом конфигурацией мосте OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/520mmxx/grok2api-merged">grok2api-merged</a></b></td><td align="center">2</td><td>Сопоставления моделей Grok, генератор Statsig с имитацией TypeError, параметры запросов и устройств по умолчанию, а также обработчик ответов NDJSON были существенно адаптированы для исполнителя Grok Web в OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/TQZHR/grok2api">TQZHR/grok2api</a></b></td><td align="center">706</td><td>Основной транзитивный источник кода для grok2api-merged; его реализации моделей, заголовков, полезных нагрузок, Statsig и обработчиков сохранены в линии происхождения Grok Web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/chenyme/grok2api">chenyme/grok2api</a></b></td><td align="center">7,819</td><td>Базовый исходный код под лицензией MIT для полезной нагрузки Grok и параметров устройств по умолчанию, генератора Statsig и обработчика <code>result.response</code>, прошедший через TQZHR и grok2api-merged.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuzhaii/grok2api-pro">grok2api-pro</a></b></td><td align="center">27</td><td>Транзитивный источник, указанный grok2api-merged для слоя пула прокси; OmniRoute сохраняет упоминание об этом происхождении, но не заявляет о переносе пула прокси в свой ограниченный исполнитель Grok Web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/CNFlyCat/GrokProxy">GrokProxy</a></b></td><td align="center">51</td><td>Его прокси Grok с аутентификацией по cookie и шаблон потоковой передачи <code>result.response.token</code> повлияли на транспорт Grok Web в OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lianying1716/GrokBridge">GrokBridge</a></b></td><td align="center">5</td><td>При создании первоначальной реализации Grok Web учитывалась его архитектура вышестоящего HTTP/браузерного взаимодействия; прямой HTTP-маршрут основан на GrokProxy, поэтому об отдельном переносе кода не заявляется.</td></tr>
</table>

### 🗜️ Сжатие контекста и токенов — движки

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он вдохновил OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/JuliusBrussee/caveman">Caveman</a></b></td><td align="center">113,396</td><td>Вирусный проект «зачем использовать много токенов, когда мало токенов хватает» — его философия пещерной речи лежит в основе нашего стандартного режима сжатия и более 30 правил удаления слов-паразитов и сокращения текста.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/rtk-ai/rtk">RTK – Rust Token Killer</a></b></td><td align="center">83,835</td><td>Высокопроизводительное сжатие вывода команд — послужило источником идей для нашего движка RTK, DSL фильтрации JSON, восстановления исходного вывода и многоступенчатого конвейера RTK → Caveman.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/headroomlabs-ai/headroom">headroom</a></b></td><td align="center">75,741</td><td>Обратимое сжатие контекста (SmartCrusher) — вдохновило нас на создание движка <code>headroom</code> и шаблона маркера извлечения <code>ccr</code>.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/microsoft/LLMLingua">LLMLingua</a></b></td><td align="center">6,757</td><td>Исследование сжатия промптов (LLMLingua / LLMLingua-2) — вдохновило нас на создание асинхронного, безопасного для кода и отказоустойчивого движка <code>llmlingua</code>.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atjsh/llmlingua-2-js">llmlingua-2-js</a></b></td><td align="center">32</td><td>Порт для JS/ONNX (MobileBERT / XLM-RoBERTa), используемый в качестве бэкенда на рабочих потоках для нашего движка LLMLingua.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/leninejunior/troglodita">Troglodita</a></b></td><td align="center">50</td><td>Сжатие токенов для pt-BR — лежит в основе нашего языкового пакета pt-BR: сокращение плеоназмов и удаление слов-паразитов с учётом грамматики бразильского варианта португальского языка.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/DietrichGebert/ponytail">ponytail</a></b></td><td align="center">166,731</td><td>Вирусный навык YAGNI-программирования «ленивого старшего разработчика» — вдохновил нас на создание стиля вывода <b>less-code</b>: ориентация на минимальное работающее изменение, сокращающая объём _генерируемого_ кода (аналог лаконичной прозы Caveman для выходных данных).</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ayghri/i-have-adhd">i-have-adhd</a></b></td><td align="center">57,628</td><td>Его ориентированный на действия и удобный для людей с СДВГ стиль ответов был адаптирован в лаконичный стиль вывода OmniRoute на пяти языках.</td></tr>
</table>

### 🧩 Компактные форматы, исследования токенов и инструменты с учётом кода

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он вдохновил OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/toon-format/toon">TOON</a></b></td><td align="center">25,509</td><td>Объектная нотация, ориентированная на токены, — её столбцовая модель с заголовком и строками определила устройство нашего этапа табличного уплотнения.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf">GCF – Graph Compact Format</a></b></td><td align="center">59</td><td>Её компактный формат графов и архитектура универсальных профилей повлияли на табличное уплотнение OmniRoute и формат кодека Headroom.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf-typescript">gcf-typescript</a></b></td><td align="center">4</td><td>Реализация на TypeScript под лицензией MIT, непосредственно встроенная и расширенная в качестве кодека универсального профиля Headroom.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ooples/token-optimizer-mcp">token-optimizer-mcp</a></b></td><td align="center">551</td><td>Кэш Brotli/SQLite и дельта контекста для каждого сеанса — вдохновили нас на создание движка <code>session-dedup</code>.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Mibayy/token-savior">token-savior</a></b></td><td align="center">1,182</td><td>Уплотнение вывода Bash и профили MCP — вдохновили нас на строгий отказ от неэффективного сжатия и сокращение манифестов инструментов MCP.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ppgranger/token-saver">token-saver</a></b></td><td align="center">154</td><td>Сжатие вывода с учётом содержимого и типа файла, предусматривающее отказ при неудаче, — подтвердило правильность нашей диспетчеризации по типам и пропуска сжатия при недостаточном выигрыше.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/alexgreensh/token-optimizer">token-optimizer</a></b></td><td align="center">2,595</td><td>«Найдите токены-призраки» — его шаблон выгрузки с восстанавливаемым дескриптором повлиял на наш подход к выгрузке CCR.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Shweta-Mishra-ai/tokenmizer">TokenMizer</a></b></td><td align="center">33</td><td>Проектная основа с графом сеанса и дедупликацией строк между репликами, повлиявшая на архитектуру нашего механизма дедупликации сеансов.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jessefreitas/OmniCompress">OmniCompress</a></b></td><td align="center">3</td><td>Столбцовый JSON на Rust, адресуемое по содержимому извлечение и дедупликация между сообщениями — подтвердили правильность архитектуры наших движков <code>headroom</code>/<code>ccr</code>/<code>session-dedup</code> и устойчивого для кэширования инварианта «сжатая форма не зависит от позиции».</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atlassian-labs/mcp-compressor">mcp-compressor</a></b></td><td align="center">133</td><td>Сжатие схем и описаний инструментов MCP — повлияло на наше сокращение количества элементов в манифестах инструментов MCP.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/pdavis68/RepoMapper">RepoMapper</a></b></td><td align="center">217</td><td>Ранжирование карт репозиториев в стиле Aider — повлияло на наши исследования карт репозиториев и ранжирования результатов поиска.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/mrsimpson/quiet-shell-mcp">quiet-shell-mcp</a></b></td><td align="center">4</td><td>Декларативное сокращение вывода оболочки через MCP — подтвердило правильность нашего декларативного уплотнения вывода Bash.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/dsherret/ts-morph">ts-morph</a></b></td><td align="center">6,205</td><td>Инструментарий TypeScript Compiler API — вдохновил нас на основанное на парсере удаление комментариев с сохранением строковых и шаблонных литералов, а также литералов регулярных выражений.</td></tr>
</table>

### 🧠 Память и RAG

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/mem0ai/mem0">Mem0</a></b></td><td align="center">67,385</td><td>Универсальный слой памяти — его модель прокси как границы записи и чтения определила архитектуру нашей памяти.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/letta-ai/letta">Letta (MemGPT)</a></b></td><td align="center">25,179</td><td>Агенты с отслеживанием состояния и многоуровневой памятью — послужили источником вдохновения для нашей многоуровневой модели управления и восстановления контекста (CCR).</td></tr>
  <tr><td nowrap><b><a href="https://github.com/onestardao/WFGY">WFGY</a></b></td><td align="center">1,800</td><td>Таксономия ProblemMap, охватывающая 16 регулярно возникающих режимов отказа RAG/LLM, — общий словарь терминов в нашем руководстве по устранению неполадок.</td></tr>
</table>

### 🛰️ Инспекция трафика, MITM и прозрачный прокси

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/chouzz/llm-interceptor">llm-interceptor</a></b></td><td align="center">79</td><td>MITM-перехват и анализ трафика между помощниками по программированию и LLM легли в основу первоначальных требований к Traffic Inspector. Четыре ранее заимствованных модуля — объединение SSE, нормализация диалогов, маскирование секретов и очистка заголовков — были заменены независимыми реализациями с чистого листа, основанными на общедоступных стандартах протоколов. Два компонента сквозной передачи трафика хоста (<code>passthrough.ts</code> и <code>_internal/bypass.cjs</code>) остаются внутренними реализациями OmniRoute, классифицированными независимо; они не переписывались в рамках этой замены.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/InterceptSuite/ProxyBridge">ProxyBridge</a></b></td><td align="center">6,814</td><td>Прозрачная маршрутизация через прокси для отдельных процессов — послужила источником вдохновения для нашего отказоустойчивого завершения MITM, тайм-аутов бездействия сокетов, атрибуции процессов через <code>/proc</code> и перехвата TPROXY.</td></tr>
</table>

### 📚 Данные моделей, наблюдаемость и пользовательский интерфейс

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/anomalyco/models.dev">models.dev</a></b></td><td align="center">7,286</td><td>Открытая база данных спецификаций, цен и возможностей моделей ИИ — встроенная синхронизация с нашим каталогом моделей.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/xyflow/xyflow">React Flow / xyflow</a></b></td><td align="center">38,705</td><td>Библиотека узловых графов, лежащая в основе наших работающих в реальном времени студий Compression Studio и Combo/Routing Studio.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langchain-ai/langgraph">LangGraph</a></b></td><td align="center">43,443</td><td>Визуализация графа рабочего процесса в реальном времени в LangGraph Studio послужила источником вдохновения для представления каскадов в реальном времени в наших студиях.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langfuse/langfuse">Langfuse</a></b></td><td align="center">35,990</td><td>Его модель наблюдаемости «трассировка → интервал → генерация» определила каскадное представление в нашей Compression Studio.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/kiali/kiali">Kiali</a></b></td><td align="center">3,645</td><td>Наблюдаемость за сервисной сеткой Istio — послужила источником вдохновения для наших индикаторов автоматического выключателя и визуализации рёбер с ошибками в Routing/Combo Studio.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lobehub/lobe-icons">lobe-icons</a></b></td><td align="center">2,615</td><td>Логотипы брендов ИИ/LLM, используемые для отображения значков поставщиков на всей нашей панели управления.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lipis/flag-icons">flag-icons</a></b></td><td align="center">12,473</td><td>Предоставляет SVG-флаги под лицензией MIT, используемые в переключателе языков README.</td></tr>
</table>

### 🛡️ Безопасность

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/tldrsec/awesome-secure-defaults">awesome-secure-defaults</a></b></td><td align="center">722</td><td>Курируемый список библиотек с безопасными настройками по умолчанию, которым мы руководствуемся при выборе средств безопасности (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink).</td></tr>
</table>

### 🧭 Дополнительные инструменты

<table>
  <tr><th align="left">Проект</th><th align="center">⭐</th><th align="left">Как он повлиял на OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/BlockRunAI/ClawRouter">ClawRouter</a></b></td><td align="center">6,628</td><td>Послужил источником вдохновения для дедупликации запросов, аварийного бесплатного резервного варианта, подключаемых стратегий Auto-Combo и многоязычной классификации намерений.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lbjlaq/Antigravity-Manager">Antigravity-Manager</a></b></td><td align="center">32,333</td><td>Его переназначение моделей с учётом учётных записей, проверка пути к исполняемому файлу и логика меток тарифных планов легли в основу среды выполнения Antigravity в OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jlcodes99/vscode-antigravity-cockpit">vscode-antigravity-cockpit</a></b></td><td align="center">4,850</td><td>Его компактный формат обратного отсчёта до сброса квоты послужил источником вдохновения для соответствующего отображения лимитов поставщика в OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/iOfficeAI/AionUi">AionUi</a></b></td><td align="center">33,611</td><td>Его интеграции ACP послужили источником вдохновения для автоматического обнаружения установленных CLI-агентов в OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/steipete/CodexBar">CodexBar</a></b></td><td align="center">22,616</td><td>Помог выявить интерфейс квот Grok Build; затем OmniRoute независимо проверил и исправил актуальный формат обмена данными.</td></tr>
</table>

## 📄 Лицензия

Лицензия MIT — подробности в [LICENSE](LICENSE).

---

<div align="center">

**[⬆ Наверх](#-omniroute)** · Сделано с ❤️ для сообщества open-source ИИ.

<sub>OmniRoute v3.8.53 · Node ≥22.22.2 · Лицензия MIT · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- GitHub Discussions включены для вопросов и ответов сообщества -->
