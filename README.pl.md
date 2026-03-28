# 🚀 OmniRoute — darmowa bramka AI

### Nigdy nie przestawaj kodować. Inteligentne przekierowywanie do **BEZPŁATNYCH i tanich modeli AI** z automatycznym powrotem.

_Twój uniwersalny serwer proxy API — jeden punkt końcowy, ponad 67 dostawców, zero przestojów. Teraz z orkiestracją agentów **MCP i A2A**._

**Ukończenie czatu • Osadzanie • Generowanie obrazu • Wideo • Muzyka • Dźwięk • Zmiana rankingu • **Wyszukiwanie w Internecie** • Serwer MCP • Protokół A2A • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Dostępne w:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Co nowego w wersji 3.0.0

> **Aktualizacja z wersji 2.9.5?** — Wszystkie zmiany znajdziesz w [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main).

| Powierzchnia                              | Zmień                                                                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **Bezpieczeństwo CodeQL**              | Naprawiono ponad 10 alertów CodeQL: ponowne wykonanie wielomianu, niepewna losowość, naprawa poprzez wstrzykiwanie powłoki                                                                                               |
| ✅ **Weryfikacja trasy**                  | Wszystkie 176 tras API zostało teraz zweryfikowanych przy użyciu schematów Zoda + `validateBody()` — CI `check:route-validation:t06` karnety                                                                             |
| 🐛 **Wyciek tagu omniModel**              | Wewnętrzne tagi `<omniModel>` nie wyciekają już do klientów w odpowiedziach strumieniowych SSE (#585)                                                                                                                    |
| 🔑 **API kluczy zarejestrowanych**        | Automatyczne udostępnianie kluczy API za pośrednictwem `POST /api/v1/registered-keys` z egzekwowaniem limitów dla dostawcy/konta, idempotencją, pamięcią SHA-256 i opcjonalnym raportowaniem problemów w serwisie GitHub |
| 🎨 **Ikony dostawców**                    | Ponad 130 logo dostawców za pośrednictwem `@lobehub/icons` (SVG) w formacie PNG → ogólny łańcuch awaryjny                                                                                                                |
| 🔄 **Automatyczna synchronizacja modelu** | 24-godzinny harmonogram i ręczny przełącznik interfejsu użytkownika do synchronizacji list modeli dla wbudowanych i niestandardowych dostawców kompatybilnych z OpenAI                                                   |
| 🌐 **OpenCode Zen/Go**                    | Dwóch nowych dostawców od @kang-heewon poprzez PR #530: poziom bezpłatny + poziom subskrypcji przez `OpencodeExecutor`                                                                                                   |
| 🐛 **Gemini CLI OAuth**                   | Błąd, który można podjąć, gdy w Dockerze brakuje `GEMINI_OAUTH_CLIENT_SECRET` (był to tajemniczy błąd Google)                                                                                                            |
| 🐛 **Konfiguracja OpenCode**              | `saveOpenCodeConfig()` teraz poprawnie zapisuje TOML do `XDG_CONFIG_HOME`                                                                                                                                                |
| 🐛 **Nadpisanie przypiętego modelu**      | `body.model` poprawnie ustawiony na `pinnedModel` w przypadku ochrony pamięci podręcznej kontekstu                                                                                                                       |
| 🐛 **Kodeks/pętla Claude**                | `tool_result` bloki są teraz konwertowane na tekst, aby zatrzymać nieskończone pętle                                                                                                                                     |
| 🐛 **Przekierowanie logowania**           | Logowanie nie zawiesza się już po pominięciu konfiguracji hasła                                                                                                                                                          |
| 🐛 **Ścieżki systemu Windows**            | Ścieżki MSYS2/Git-Bash (`/c/...`) automatycznie znormalizowane do `C:\...`                                                                                                                                               |

---

## 🖼️ Panel główny

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Podgląd panelu

<details>
<summary><b>Kliknij, aby zobaczyć zrzuty ekranu panelu kontrolnego</b></summary>

| Strona                    | Zrzut ekranu                                      |
| ------------------------- | ------------------------------------------------- |
| **Dostawcy**              | ![Providers](docs/screenshots/01-providers.png)   |
| **Kombinacje**            | ![Combos](docs/screenshots/02-combos.png)         |
| **Analiza**               | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Zdrowie**               | ![Health](docs/screenshots/04-health.png)         |
| **Tłumacz**               | ![Translator](docs/screenshots/05-translator.png) |
| **Ustawienia**            | ![Settings](docs/screenshots/06-settings.png)     |
| **Narzędzia CLI**         | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Dzienniki użytkowania** | ![Usage](docs/screenshots/08-usage.png)           |
| **Punkty końcowe**        | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Bezpłatny dostawca AI dla Twoich ulubionych agentów kodujących

_Połącz dowolne narzędzie IDE lub CLI oparte na sztucznej inteligencji poprzez OmniRoute — bezpłatną bramę API dla nieograniczonego kodowania._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
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

<sub>📡 Wszyscy agenci łączą się przez <code>http://localhost:20128/v1</code> lub <code>http://cloud.omniroute.online/v1</code> — jedna konfiguracja, nieograniczona liczba modeli i limit</sub>

---

## 🤔 Dlaczego OmniRoute?

**Przestań marnować pieniądze i przekraczać limity:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Limit subskrypcji wygasa niewykorzystany co miesiąc
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Limity szybkości zatrzymują Cię w połowie kodowania
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Drogie interfejsy API (20-50 USD miesięcznie na dostawcę)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ręczne przełączanie pomiędzy dostawcami

**OmniRoute rozwiązuje ten problem:**

- ✅ **Maksymalizuj liczbę subskrypcji** - Śledź limit, wykorzystaj każdy bit przed zresetowaniem
- ✅ **Automatyczny powrót** - Subskrypcja → Klucz API → Tani → Bezpłatny, zero przestojów
- ✅ **Wiele kont** - Praca okrężna pomiędzy kontami każdego dostawcy
- ✅ **Uniwersalny** - Działa z Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw i dowolnym narzędziem CLI

---

## 📧 Wsparcie

> 💬 **Dołącz do naszej społeczności!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Uzyskaj pomoc, dziel się wskazówkami i bądź na bieżąco.

- **Strona internetowa**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Wspieranie**: zobacz [CONTRIBUTING.md](CONTRIBUTING.md), otwórz PR lub wybierz `good first issue`
- **Oryginalny projekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Zgłaszasz błąd?

Otwierając zgłoszenie, uruchom komendę system-info i załącz wygenerowany plik:

```bash
npm run system-info
```

Spowoduje to wygenerowanie pliku `system-info.txt` z wersją Node.js, wersją OmniRoute, szczegółami systemu operacyjnego, zainstalowanymi narzędziami CLI (iflow, gemini, claude, codex, antygrawitacja, droid itp.), statusem Docker/PM2 i pakietami systemowymi — wszystko, czego potrzebujemy, aby szybko odtworzyć problem. Dołącz plik bezpośrednio do swojego zgłoszenia w GitHubie.

---

## 🔄 Jak to działa

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

## 🎯 Co rozwiązuje OmniRoute — 30 rzeczywistych problemów i przypadków użycia

> **Każdy programista korzystający z narzędzi AI codziennie spotyka się z tymi problemami.** OmniRoute został stworzony, aby rozwiązać je wszystkie — od przekroczeń kosztów po blokady regionalne, od zepsutych przepływów OAuth po operacje protokołów i obserwowalność przedsiębiorstwa.

<details>
<summary><b>💸 1. „Płacę za kosztowną subskrypcję, ale nadal przeszkadzają mi limity”</b></summary>

Programiści płacą 20–200 USD miesięcznie za Claude Pro, Codex Pro lub GitHub Copilot. Nawet płacąc, limit ma pułap – 5 godzin użytkowania, limity tygodniowe lub limity stawek za minutę. W połowie sesji kodowania dostawca przestaje odpowiadać, a programista traci płynność i produktywność.

**Jak rozwiązuje to OmniRoute:**

- **Inteligentny 4-poziomowy powrót** — Jeśli limit subskrypcji się wyczerpie, automatycznie przekierowuje do klucza API → Tani → Bezpłatny bez ręcznej interwencji
- **Śledzenie limitów w czasie rzeczywistym** — Pokazuje zużycie tokenów w czasie rzeczywistym z resetowanym odliczaniem (5 godzin, codziennie, co tydzień)
- **Obsługa wielu kont** — Wiele kont na dostawcę z funkcją automatycznego przełączania między kontami — gdy skończy się jedno, następuje przejście do następnego
- **Niestandardowe kombinacje** — Konfigurowalne łańcuchy rezerwowe z 6 strategiami równoważenia (pierwsze wypełnienie, działanie okrężne, P2C, losowe, najrzadziej używane, zoptymalizowane pod względem kosztów)
- **Przydziały biznesowe Kodeksu** — monitorowanie przydziałów przestrzeni roboczej firmy/zespołu bezpośrednio na pulpicie nawigacyjnym

</details>

<details>
<summary><b>🔌 2. „Muszę korzystać z wielu dostawców, ale każdy ma inny interfejs API”</b></summary>

OpenAI używa jednego formatu, Claude (Anthropic) używa innego, Gemini jeszcze innego. Jeśli programista chce przetestować modele od różnych dostawców lub korzystać z nich w trybie awaryjnym, musi ponownie skonfigurować pakiety SDK, zmienić punkty końcowe i poradzić sobie z niekompatybilnymi formatami. Dostawcy niestandardowi (FriendLI, NIM) mają niestandardowe punkty końcowe modelu.

**Jak rozwiązuje to OmniRoute:**

- **Ujednolicony punkt końcowy** — pojedynczy `http://localhost:20128/v1` służy jako serwer proxy dla wszystkich ponad 67 dostawców
- **Tłumaczenie formatu** — Automatyczne i przejrzyste: OpenAI ↔ Claude ↔ Gemini ↔ API odpowiedzi
- **Oczyszczanie odpowiedzi** — usuwa niestandardowe pola (`x_groq`, `usage_breakdown`, `service_tier`), które psują OpenAI SDK v1.83+
- **Normalizacja ról** — Konwertuje `developer` → `system` dla dostawców innych niż OpenAI; `system` → `user` dla GLM/ERNIE
- **Pomyśl o ekstrakcji tagów** — wyodrębnia bloki `<think>` z modeli takich jak DeepSeek R1 do standaryzowanego `reasoning_content`
- **Strukturalne dane wyjściowe dla Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatyczna konwersja
- **`stream` domyślnie to `false`** — Zgodność ze specyfikacją OpenAI, unikanie nieoczekiwanego SSE w pakietach SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. „Mój dostawca AI blokuje mój region/kraj”</b></summary>

Dostawcy tacy jak OpenAI/Codex blokują dostęp z określonych regionów geograficznych. Podczas połączeń OAuth i API użytkownicy otrzymują błędy takie jak `unsupported_country_region_territory`. Jest to szczególnie frustrujące dla programistów z krajów rozwijających się.

**Jak rozwiązuje to OmniRoute:**

- **3-poziomowa konfiguracja serwera proxy** — Konfigurowalny serwer proxy na 3 poziomach: globalny (cały ruch), na dostawcę (tylko jeden dostawca) i na połączenie/klucz
- **Oznaczone kolorami identyfikatory proxy** — Wskaźniki wizualne: 🟢 globalny serwer proxy, 🟡 serwer proxy dostawcy, 🔵 serwer proxy połączenia, zawsze pokazujący adres IP
- **Wymiana tokenów OAuth przez serwer proxy** — Przepływ OAuth przechodzi również przez serwer proxy, rozwiązując problem `unsupported_country_region_territory`
- **Test połączenia przez serwer proxy** — Testy połączenia wykorzystują skonfigurowany serwer proxy (koniec z bezpośrednim obejściem)
- **Obsługa SOCKS5** — Pełna obsługa proxy SOCKS5 dla routingu wychodzącego
- **Podrabianie odcisków palców TLS** — Odcisk palca TLS podobny do przeglądarki za pośrednictwem `wreq-js` w celu ominięcia wykrywania botów
- **🔏 Dopasowanie odcisków palców CLI** — zmienia kolejność nagłówków i pól treści, aby dopasować je do natywnych podpisów binarnych CLI, drastycznie zmniejszając ryzyko oznaczania konta. Adres IP serwera proxy zostaje zachowany — jednocześnie uzyskujesz maskowanie IP ** i** IP

</details>

<details>
<summary><b>🆓 4. „Chcę używać AI do kodowania, ale nie mam pieniędzy”</b></summary>

Nie każdy może zapłacić 20–200 USD miesięcznie za subskrypcje AI. Studenci, programiści z krajów wschodzących, hobbyści i freelancerzy potrzebują dostępu do wysokiej jakości modeli po zerowych kosztach.

**Jak rozwiązuje to OmniRoute:**

- **Wbudowani dostawcy Free Tier** — Natywne wsparcie dla w 100% darmowych dostawców: iFlow (5 nieograniczonych modeli przez OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 nieograniczone modele: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, Vision-model), Kiro (Claude + AWS Builder ID za darmo), Gemini CLI (180 tys. tokenów miesięcznie za darmo)
- **Ollama Cloud** — modele Ollama hostowane w chmurze pod adresem `api.ollama.com` z bezpłatnym poziomem „Lekkie użycie”; użyj przedrostka `ollamacloud/<model>`
- **Kombinacje dostępne wyłącznie bezpłatnie** — Łańcuch `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/miesiąc z zerowymi przestojami
- **Bezpłatny dostęp do NVIDIA NIM** — bezpłatny dostęp dla deweloperów przy ~40 obr./min na zawsze do ponad 70 modeli na stronie build.nvidia.com (przejście z kredytów na same limity szybkości)
- **Strategia zoptymalizowana pod względem kosztów** — Strategia routingu, która automatycznie wybiera najtańszego dostępnego dostawcę

</details>

<details>
<summary><b>🔒 5. „Muszę chronić moją bramę AI przed nieautoryzowanym dostępem”</b></summary>

Podczas udostępniania bramy AI w sieci (LAN, VPS, Docker) każda osoba posiadająca adres może wykorzystać tokeny/przydział programisty. Bez ochrony interfejsy API są podatne na niewłaściwe użycie, natychmiastowe wstrzyknięcie i nadużycia.

**Jak rozwiązuje to OmniRoute:**

- **Zarządzanie kluczami API** — generowanie, rotacja i ustalanie zakresu dla każdego dostawcy z dedykowaną stroną `/dashboard/api-manager`
- **Uprawnienia na poziomie modelu** — Ogranicz klucze API do określonych modeli (`openai/*`, wzorce symboli wieloznacznych), za pomocą przełącznika Zezwalaj na wszystko/Ogranicz
- **API Endpoint Protection** — Wymagaj klucza dla `/v1/models` i blokuj określonych dostawców na liście
- **Auth Guard + ochrona CSRF** — Wszystkie trasy pulpitu nawigacyjnego chronione za pomocą oprogramowania pośredniego `withAuth` + tokenów CSRF
- **Rate Limiter** — Ograniczanie szybkości na IP z konfigurowalnymi oknami
- **Filtrowanie IP** — Lista dozwolonych/blokowanych do kontroli dostępu
- **Szybka ochrona przed wstrzyknięciem** — Oczyszczanie przed złośliwymi wzorcami podpowiedzi
- **Szyfrowanie AES-256-GCM** — Poświadczenia szyfrowane w stanie spoczynku

</details>

<details>
<summary><b>🛑 6. „Mój dostawca przestał działać i straciłem płynność kodowania”</b></summary>

Dostawcy sztucznej inteligencji mogą stać się niestabilni, zwracać błędy 5xx lub przekraczać tymczasowe limity szybkości. Jeśli programista jest zależny od jednego dostawcy, jego praca jest przerywana. Bez wyłączników automatycznych wielokrotne próby mogą spowodować awarię aplikacji.

**Jak rozwiązuje to OmniRoute:**

- **Wyłącznik w zależności od modelu** — Automatyczne otwieranie/zamykanie z konfigurowalnymi progami i czasem schładzania (zamknięty/otwarty/półotwarty), zakres zależny od modelu, aby uniknąć blokad kaskadowych
- **Wykładniczy wycofywanie** — Stopniowe opóźnienia ponownych prób
- **Anti-Thundering Herd** — Mutex + ochrona semaforów przed równoczesnymi burzami ponownych prób
- **Łańcuchy awaryjne typu Combo** — jeśli główny dostawca zawiedzie, automatycznie przejdzie przez łańcuch bez interwencji
- **Wyłącznik automatyczny** — automatycznie wyłącza niesprawnych dostawców w łańcuchu combo
- **Panel stanu** — Monitorowanie czasu pracy, stany wyłączników, blokady, statystyki pamięci podręcznej, opóźnienia p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Konfigurowanie każdego narzędzia AI jest żmudne i powtarzalne”</b></summary>

Programiści używają Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Każde narzędzie wymaga innej konfiguracji (punkt końcowy API, klucz, model). Ponowna konfiguracja w przypadku zmiany dostawcy lub modelu jest stratą czasu.

**Jak rozwiązuje to OmniRoute:**

- ** Panel narzędzi CLI** — Dedykowana strona z konfiguracją jednym kliknięciem dla Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **Generator konfiguracji GitHub Copilot** — Generuje `chatLanguageModels.json` dla kodu VS z zbiorczym wyborem modelu
- **Kreator wprowadzenia** — konfiguracja w 4 krokach dla początkujących użytkowników
- **Jeden punkt końcowy, wszystkie modele** — Skonfiguruj `http://localhost:20128/v1` raz, uzyskaj dostęp do ponad 67 dostawców

</details>

<details>
<summary><b>🔑 8. „Zarządzanie tokenami OAuth od wielu dostawców to piekło”</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — wszystkie korzystają z OAuth 2.0 z wygasającymi tokenami. Programiści muszą stale przeprowadzać ponowne uwierzytelnianie, radzić sobie z `client_secret is missing`, `redirect_uri_mismatch` i awariami na zdalnych serwerach. Szczególnie problematyczny jest protokół OAuth w sieci LAN/VPS.

**Jak rozwiązuje to OmniRoute:**

- **Automatyczne odświeżanie tokenu** — tokeny OAuth odświeżają się w tle przed wygaśnięciem
- **Wbudowany OAuth 2.0 (PKCE)** — Automatyczny przepływ dla Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Wielokontowy OAuth** — wiele kont na dostawcę poprzez ekstrakcję tokenów JWT/ID
- **OAuth LAN/Remote Fix** — Wykrywanie prywatnego adresu IP dla `redirect_uri` + ręczny tryb adresu URL dla serwerów zdalnych
- **OAuth Behind Nginx** — Używa `window.location.origin` w celu zapewnienia zgodności z odwrotnym proxy
- **Przewodnik po zdalnym OAuth** — szczegółowy przewodnik dotyczący danych uwierzytelniających Google Cloud na platformie VPS/Docker

</details>

<details>
<summary><b>📊 9. „Nie wiem, ile i gdzie wydaję”</b></summary>

Programiści korzystają z wielu płatnych dostawców, ale nie mają jednolitego widoku wydatków. Każdy dostawca ma własny pulpit rozliczeniowy, ale nie ma widoku skonsolidowanego. Nieoczekiwane koszty mogą się kumulować.

**Jak rozwiązuje to OmniRoute:**

- **Panel analizy kosztów** — śledzenie kosztów według tokenu i zarządzanie budżetem dla każdego dostawcy
- **Limity budżetowe na poziom** — Pułap wydatków na poziom, który uruchamia automatyczne wycofanie
- **Konfiguracja cen dla poszczególnych modeli** — Ceny dla poszczególnych modeli można konfigurować
- **Statystyki użytkowania na klucz API** — Liczba żądań i znacznik czasu ostatniego użycia na klucz
- **Panel analityczny** — karty statystyk, wykres wykorzystania modelu, tabela dostawców ze wskaźnikami powodzenia i opóźnieniami

</details>

<details>
<summary><b>🐛 10. „Nie mogę diagnozować błędów i problemów w wywołaniach AI”</b></summary>

Gdy połączenie nie powiedzie się, programista nie wie, czy był to limit szybkości, wygasły token, nieprawidłowy format czy błąd dostawcy. Fragmentaryczne dzienniki na różnych terminalach. Bez obserwowalności debugowanie odbywa się metodą prób i błędów.

**Jak rozwiązuje to OmniRoute:**

- **Ujednolicony pulpit nawigacyjny** — 4 karty: Dzienniki żądań, Dzienniki proxy, Dzienniki audytu, Konsola
- **Przeglądarka logów w konsoli** — Przeglądarka działająca w stylu terminala w czasie rzeczywistym z poziomami oznaczonymi kolorami, automatycznym przewijaniem, wyszukiwaniem i filtrowaniem
- **Dzienniki proxy SQLite** — trwałe dzienniki, które przetrwają ponowne uruchomienie serwera
- **Plac zabaw dla tłumaczy** — 4 tryby debugowania: Plac zabaw (tłumaczenie formatu), Tester czatu (w obie strony), Stanowisko testowe (wsadowe), Monitor na żywo (w czasie rzeczywistym)
- **Żądanie telemetrii** — opóźnienie p50/p95/p99 + śledzenie identyfikatora X-Request-Id
- **Logowanie oparte na plikach z rotacją** — Przechwytywacz konsoli przechwytuje wszystko do dziennika JSON z rotacją na podstawie rozmiaru
- **Raport informacji o systemie** — `npm run system-info` generuje `system-info.txt` z pełnym środowiskiem (wersja węzła, wersja OmniRoute, system operacyjny, narzędzia CLI, stan Docker/PM2). Dołącz go podczas zgłaszania problemów w celu natychmiastowej selekcji.

</details>

<details>
<summary><b>🏗️ 11. „Wdrażanie i konserwacja bramy jest skomplikowane”</b></summary>

Instalacja, konfiguracja i utrzymanie serwera proxy AI w różnych środowiskach (lokalnym, VPS, Docker, chmura) jest pracochłonne. Problemy takie jak zakodowane na stałe ścieżki, `EACCES` w katalogach, konflikty portów i kompilacje międzyplatformowe zwiększają tarcia.

**Jak rozwiązuje to OmniRoute:**

- **npm globalna instalacja** — `npm install -g omniroute && omniroute` — gotowe
- **Docker Multi-platform** — natywny AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profile Docker Compose** — `base` (bez narzędzi CLI) i `cli` (z Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Natywna aplikacja dla systemów Windows/macOS/Linux z zasobnikiem systemowym, automatycznym uruchamianiem i trybem offline
- **Tryb Split-Port** — API i pulpit nawigacyjny na oddzielnych portach dla zaawansowanych scenariuszy (odwrotne proxy, sieć kontenerowa)
- **Cloud Sync** — skonfiguruj synchronizację między urządzeniami za pośrednictwem Cloudflare Workers
- **Kopie zapasowe DB** — Automatyczne tworzenie kopii zapasowych, przywracanie, eksportowanie i importowanie wszystkich ustawień

</details>

<details>
<summary><b>🌍 12. „Interfejs jest wyłącznie w języku angielskim, a mój zespół nie mówi po angielsku”</b></summary>

Zespoły w krajach nieanglojęzycznych, szczególnie w Ameryce Łacińskiej, Azji i Europie, mają trudności z interfejsami dostępnymi wyłącznie w języku angielskim. Bariery językowe ograniczają wdrażanie i zwiększają liczbę błędów konfiguracyjnych.

**Jak rozwiązuje to OmniRoute:**

- ** Panel i18n — 30 języków** — Przetłumaczono ponad 500 klawiszy, w tym arabski, bułgarski, duński, niemiecki, hiszpański, fiński, francuski, hebrajski, hindi, węgierski, indonezyjski, włoski, japoński, koreański, malajski, holenderski, norweski, polski, portugalski (PT/BR), rumuński, rosyjski, słowacki, szwedzki, tajski, ukraiński, wietnamski, chiński, filipiński, angielski
- **Obsługa RTL** — obsługa tekstu od prawej do lewej w języku arabskim i hebrajskim
- **Wielojęzyczne pliki README** — 30 kompletnych tłumaczeń dokumentacji
- **Wybór języka** — Ikona kuli ziemskiej w nagłówku umożliwiająca przełączanie w czasie rzeczywistym

</details>

<details>
<summary><b>🔄 13. „Potrzebuję czegoś więcej niż tylko czatu — potrzebuję osadzania, obrazów i dźwięku”</b></summary>

Sztuczna inteligencja to nie tylko ukończenie czatu. Twórcy muszą generować obrazy, transkrybować dźwięk, tworzyć osadzania dla RAG, zmieniać rangę dokumentów i moderować treści. Każdy interfejs API ma inny punkt końcowy i format.

**Jak rozwiązuje to OmniRoute:**

- **Osadzanie** — `/v1/embeddings` z 6 dostawcami i ponad 9 modelami
- **Generowanie obrazu** — `/v1/images/generations` z 10 dostawcami i ponad 20 modelami (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst na wideo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) i SD WebUI
- **Tekst na muzykę** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Transkrypcja audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Zamiana tekstu na mowę** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + obecni dostawcy
- **Moderacje** — `/v1/moderations` — Sprawdzanie bezpieczeństwa treści
- **Reranking** — `/v1/rerank` — Zmiana rankingu trafności dokumentu
- **Responses API** — Pełna obsługa `/v1/responses` dla Codexu

</details>

<details>
<summary><b>🧪 14. „Nie mam możliwości przetestowania i porównania jakości różnych modeli”</b></summary>

Programiści chcą wiedzieć, który model jest najlepszy dla ich przypadku użycia — kodu, tłumaczenia, rozumowania — ale ręczne porównywanie jest powolne. Nie istnieją żadne zintegrowane narzędzia eval.

**Jak rozwiązuje to OmniRoute:**

- **Oceny LLM** — Testowanie złotego zestawu z 10 fabrycznie załadowanymi skrzynkami obejmującymi pozdrowienia, matematykę, geografię, generowanie kodu, zgodność z JSON, tłumaczenie, przeceny, odmowy ze względów bezpieczeństwa
- **4 Strategie dopasowywania** — `exact`, `contains`, `regex`, `custom` (funkcja JS)
- **Stolik testowy dla tłumaczy** — Testowanie wsadowe z wieloma danymi wejściowymi i oczekiwanymi wynikami, porównanie różnych dostawców
- **Tester czatu** — Pełna podróż w obie strony z renderowaniem odpowiedzi wizualnych
- **Live Monitor** — Strumień w czasie rzeczywistym wszystkich żądań przepływających przez serwer proxy

</details>

<details>
<summary><b>📈 15. „Muszę skalować bez utraty wydajności”</b></summary>

W miarę wzrostu liczby żądań bez buforowania tych samych pytań generowane są podwójne koszty. Bez idempotencji zduplikowane żądania przetwarzania odpadów. Należy przestrzegać limitów stawek dla poszczególnych dostawców.

**Jak rozwiązuje to OmniRoute:**

- **Semantyczna pamięć podręczna** — Dwuwarstwowa pamięć podręczna (podpis + semantyka) zmniejsza koszty i opóźnienia
- **Request Idempotency** — okno deduplikacji 5 s dla identycznych żądań
- **Wykrywanie limitów szybkości** — RPM na dostawcę, minimalna przerwa i maksymalne jednoczesne śledzenie
- **Edytowalne limity szybkości** — Konfigurowalne ustawienia domyślne w Ustawieniach → Odporność z trwałością
- **API Key Validation Cache** — 3-warstwowa pamięć podręczna zapewniająca wydajność produkcyjną
- **Panel kontrolny stanu z telemetrią** — opóźnienia p50/p95/p99, statystyki pamięci podręcznej, czas pracy

</details>

<details>
<summary><b>🤖 16. „Chcę kontrolować zachowanie modelu globalnie”</b></summary>

Deweloperzy, którzy chcą wszystkich odpowiedzi w określonym języku, w określonym tonie lub chcą ograniczyć tokeny rozumowania. Konfigurowanie tego w każdym narzędziu/żądaniu jest niepraktyczne.

**Jak rozwiązuje to OmniRoute:**

- **Wstrzykiwanie monitu systemowego** — monit globalny stosowany do wszystkich żądań
- **Przemyślana walidacja budżetu** — Kontrola alokacji tokenów rozumowania na każde żądanie (przejściowe, automatyczne, niestandardowe, adaptacyjne)
- **6 Strategii routingu** — Globalne strategie określające sposób dystrybucji żądań
- **Wildcard Router** — `provider/*` wzorce przesyłają dynamicznie do dowolnego dostawcy
- **Przełączanie kombinacji włącz/wyłącz** — przełączaj kombinacje bezpośrednio z pulpitu nawigacyjnego
- **Przełączanie dostawcy** — Włącz/wyłącz wszystkie połączenia dla dostawcy jednym kliknięciem
- **Zablokowani dostawcy** — wyklucz określonych dostawców z listy `/v1/models`

</details>

<details>
<summary><b>🧰 17. „Potrzebuję narzędzi MCP jako produktów najwyższej klasy”</b></summary>

Wiele bram AI ujawnia MCP jedynie jako ukryty szczegół implementacji. Zespoły potrzebują widocznej, zarządzalnej warstwy operacyjnej.

**Jak rozwiązuje to OmniRoute:**

- MCP pojawia się w panelu nawigacji na desce rozdzielczej i w zakładce protokołu punktu końcowego
- Dedykowana strona zarządzania MCP z procesem, narzędziami, zakresami i audytem
- Wbudowany szybki start dla `omniroute --mcp` i dołączania klientów

</details>

<details>
<summary><b>🧠 18. „Potrzebuję orkiestracji A2A ze ścieżkami zadań synchronizacji i strumienia”</b></summary>

Przepływy pracy agentów wymagają zarówno bezpośrednich odpowiedzi, jak i długotrwałego wykonywania strumieniowego z kontrolą cyklu życia.

**Jak rozwiązuje to OmniRoute:**

- Punkt końcowy A2A JSON-RPC (`POST /a2a`) z `message/send` i `message/stream`
- Przesyłanie strumieniowe SSE z propagacją stanu terminala
- Interfejsy API cyklu życia zadań dla `tasks/get` i `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Potrzebuję prawdziwego stanu procesu MCP, a nie zgadywanego statusu”</b></summary>

Zespoły operacyjne muszą wiedzieć, czy MCP rzeczywiście żyje, a nie tylko, czy można uzyskać dostęp do interfejsu API.

**Jak rozwiązuje to OmniRoute:**

- Plik pulsu środowiska wykonawczego z PID, znacznikami czasu, transportem, liczbą narzędzi i trybem zakresu
- API statusu MCP łączące puls + ostatnią aktywność
- Karty stanu interfejsu użytkownika dotyczące świeżości procesów/czasu pracy/bicia serca

</details>

<details>
<summary><b>📋 20. „Potrzebuję wykonania narzędzia MCP z możliwością audytu”</b></summary>

Gdy narzędzia modyfikują konfigurację lub uruchamiają działania operacyjne, zespoły potrzebują identyfikowalności kryminalistycznej.

**Jak rozwiązuje to OmniRoute:**

- Rejestrowanie audytu wspierane przez SQLite dla wywołań narzędzi MCP
- Filtruje według narzędzia, sukcesu/porażki, klucza API i paginacji
- Tabela audytu pulpitu nawigacyjnego + punkty końcowe statystyk dla automatyzacji

</details>

<details>
<summary><b>🔐 21. „Potrzebuję uprawnień MCP o określonym zakresie na integrację”</b></summary>

Różni klienci powinni mieć najniższy dostęp do kategorii narzędzi.

**Jak rozwiązuje to OmniRoute:**

- 9 szczegółowych zakresów MCP zapewniających kontrolowany dostęp do narzędzi
- Egzekwowanie zakresu i widoczność w interfejsie zarządzania MCP
- Bezpieczna domyślna pozycja dla narzędzi operacyjnych

</details>

<details>
<summary><b>⚙️ 22. „Potrzebuję kontroli operacyjnej bez ponownego wdrażania”</b></summary>

Zespoły potrzebują szybkich zmian w czasie działania podczas incydentów lub zdarzeń kosztowych.

**Jak rozwiązuje to OmniRoute:**

- Aktywacja kombinacji przełączników bezpośrednio z pulpitu nawigacyjnego MCP
- Zastosuj profile odporności ze wstępnie zdefiniowanych pakietów zasad
- Zresetuj stan wyłącznika automatycznego z tego samego panelu operacyjnego

</details>

<details>
<summary><b>🔄 23. „Potrzebuję widoczności i anulowania cyklu życia zadania A2A na żywo”</b></summary>

Bez widoczności cyklu życia zdarzenia związane z zadaniami stają się trudne do segregacji.

**Jak rozwiązuje to OmniRoute:**

- Lista zadań/filtrowanie według stanu/umiejętności z paginacją
- Szczegółowa analiza metadanych zadań, zdarzeń i artefaktów
- Punkt końcowy anulowania zadania i akcja interfejsu użytkownika z potwierdzeniem

</details>

<details>
<summary><b>🌊 24. „Potrzebuję metryk aktywnego strumienia dla obciążenia A2A”</b></summary>

Przepływy pracy związane z przesyłaniem strumieniowym wymagają operacyjnego wglądu w współbieżność i połączenia na żywo.

**Jak rozwiązuje to OmniRoute:**

- Aktywne liczniki strumieni zintegrowane ze statusem A2A
- Znacznik czasu ostatniego zadania i liczba stanów
- Karty pulpitu A2A do monitorowania operacji w czasie rzeczywistym

</details>

<details>
<summary><b>🪪 25. „Potrzebuję standardowego wyszukiwania agentów dla klientów”</b></summary>

Zewnętrzni klienci i koordynatorzy potrzebują metadanych do odczytu maszynowego na potrzeby wdrożenia.

**Jak rozwiązuje to OmniRoute:**

- Karta Agenta ujawniona w `/.well-known/agent.json`
- Możliwości i umiejętności pokazane w interfejsie zarządzania
- Interfejs API stanu A2A zawiera metadane wykrywania do automatyzacji

</details>

<details>
<summary><b>🧭 26. „Potrzebuję wykrywalności protokołu w UX produktu”</b></summary>

Jeśli użytkownicy nie mogą odkryć powierzchni protokołu, spada jakość przyjęcia i wsparcia.

**Jak rozwiązuje to OmniRoute:**

- Skonsolidowana strona **Punkty końcowe** z zakładkami dla punktów końcowych proxy, MCP, A2A i API
- Przełączniki stanu usługi Inline (Online/Offline) dla MCP i A2A
- Linki z przeglądu do dedykowanych zakładek zarządzania

</details>

<details>
<summary><b>🧪 27. „Potrzebuję kompleksowej weryfikacji protokołu z prawdziwymi klientami”</b></summary>

Testy próbne nie wystarczą do sprawdzenia zgodności protokołu przed wydaniem.

**Jak rozwiązuje to OmniRoute:**

- Pakiet E2E, który uruchamia aplikację i wykorzystuje prawdziwy transport klienta MCP SDK
- Testy klienta A2A pod kątem wykrywania, wysyłania, przesyłania strumieniowego, pobierania i anulowania przepływów
- Sprawdzaj twierdzenia względem interfejsów API audytu MCP i zadań A2A

</details>

<details>
<summary><b>📡 28. „Potrzebuję ujednoliconej obserwowalności we wszystkich interfejsach”</b></summary>

Podział obserwowalności według protokołu tworzy martwe punkty i wydłuża MTTR.

**Jak rozwiązuje to OmniRoute:**

- Ujednolicone dashboardy/dzienniki/analizy w jednym produkcie
- Stan + audyt + telemetria żądań w warstwach OpenAI, MCP i A2A
- Operacyjne interfejsy API dla statusu i automatyzacji

</details>

<details>
<summary><b>💼 29. „Potrzebuję jednego środowiska wykonawczego dla serwera proxy + narzędzi + orkiestracji agenta”</b></summary>

Uruchamianie wielu oddzielnych usług zwiększa koszty operacyjne i tryby awarii.

**Jak rozwiązuje to OmniRoute:**

- Serwer proxy zgodny z OpenAI, serwer MCP i serwer A2A w jednym stosie
- Wspólne uwierzytelnianie, odporność, magazyn danych i obserwowalność
- Spójny model polityki na wszystkich płaszczyznach interakcji

</details>

<details>
<summary><b>🚀 30. „Muszę dostarczać przepływy pracy agenta bez niepotrzebnego tworzenia kodu klejącego”</b></summary>

Zespoły tracą prędkość podczas łączenia wielu usług i skryptów ad hoc.

**Jak rozwiązuje to OmniRoute:**

- Ujednolicona strategia dotycząca punktów końcowych dla klientów i agentów
- Wbudowane interfejsy zarządzania protokołami i ścieżki sprawdzania dymu
- Podstawy gotowe do produkcji (bezpieczeństwo, logowanie, odporność, kopie zapasowe)

</details>

### Przykładowe podręczniki (zintegrowane przypadki użycia)

**Poradnik A: maksymalizuj płatną subskrypcję + tanią kopię zapasową**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Poradnik B: stos kodowania o zerowym koszcie**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Poradnik C: łańcuch awaryjny działający 24 godziny na dobę, 7 dni w tygodniu**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Poradnik D: Operacje agenta z MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Zacznij bezpłatnie — zerowy koszt konfiguracji

> Skonfiguruj kodowanie AI w ciągu kilku minut w cenie **0 USD/miesiąc**. Połącz te bezpłatne konta i korzystaj z wbudowanej kombinacji **Free Stack**.

| Krok | Akcja                                                     | Dostawcy odblokowani                                                    |
| ---- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1    | Połącz **Kiro** (identyfikator AWS Builder OAuth)         | Claude Sonnet 4.5, Haiku 4.5 — **bez ograniczeń**                       |
| 2    | Połącz **iFlow** (Google OAuth)                           | myślenie kimi-k2, qwen3-coder-plus, deepseek-r1... — **bez ograniczeń** |
| 3    | Połącz **Qwen** (kod urządzenia)                          | qwen3-coder-plus, qwen3-coder-flash... — **bez ograniczeń**             |
| 4    | Połącz **Gemini CLI** (Google OAuth)                      | gemini-3-flash, gemini-2.5-pro — **180 tys./mc za darmo**               |
| 5    | `/dashboard/combos` → **Szablon darmowego stosu (0 USD)** | Automatycznie okrężnie wszystkich bezpłatnych dostawców                 |

**Wskaż dowolne IDE/CLI na:** `http://localhost:20128/v1` · Klucz API: `any-string` · Gotowe.

> **Opcjonalna dodatkowa ochrona (również bezpłatna):** Klucz API Groq (30 obr./min za darmo), NVIDIA NIM (40 obr./min za darmo, ponad 70 modeli), Cerebras (1 mln tok/dzień), Klucz API LongCat (50 mln tokenów dziennie!), Cloudflare Workers AI (10 tys. neuronów/dzień, ponad 50 modeli).

## ⚡ Szybki start

### 1) Zainstaluj i uruchom

```bash
npm install -g omniroute
omniroute
```

> **Użytkownicy pnpm:** Uruchom `pnpm approve-builds -g` po instalacji, aby włączyć natywne skrypty kompilacji wymagane przez `better-sqlite3` i `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Panel otwiera się pod adresem `http://localhost:20128`, a podstawowy adres URL interfejsu API to `http://localhost:20128/v1`.

| Polecenie               | Opis                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `omniroute`             | Uruchom serwer (`PORT=20128`, API i pulpit nawigacyjny na tym samym porcie) |
| `omniroute --port 3000` | Ustaw port kanoniczny/API na 3000                                           |
| `omniroute --mcp`       | Uruchom serwer MCP (transport stdio)                                        |
| `omniroute --no-open`   | Nie otwieraj automatycznie przeglądarki                                     |
| `omniroute --help`      | Pokaż pomoc                                                                 |

Opcjonalny tryb podzielonego portu:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Połącz dostawców i utwórz swój klucz API

1. Otwórz Panel → `Providers` i podłącz co najmniej jednego dostawcę (klucz OAuth lub API).
2. Otwórz Panel → `Endpoints` i utwórz klucz API.
3. (Opcjonalnie) Otwórz Panel → `Combos` i ustaw łańcuch awaryjny.

### 3) Skieruj swoje narzędzie do kodowania na OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Współpracuje z Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode i pakietami SDK kompatybilnymi z OpenAI.

### 4) Włącz i sprawdź protokoły (v2.0)

**MCP (dla operacji opartych na narzędziach):**

```bash
omniroute --mcp
```

Następnie podłącz swojego klienta MCP przez `stdio` i przetestuj narzędzia takie jak:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (dla przepływów pracy między agentami):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Sprawdź wszystko od początku do końca (zalecane)

```bash
npm run test:protocols:e2e
```

Ten pakiet sprawdza rzeczywiste przepływy klientów MCP i A2A w porównaniu z działającą aplikacją.

### Alternatywa: uruchamianie ze źródła

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Doker

OmniRoute jest dostępny jako publiczny obraz Dockera na [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Szybki bieg:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Z plikiem środowiska:**

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

**Korzystanie z Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Obraz                    | Oznacz   | Rozmiar | Opis                      |
| ------------------------ | -------- | ------- | ------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB | Najnowsza stabilna wersja |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Aktualna wersja           |

---

## 🖥️ Aplikacja komputerowa — offline i zawsze włączona

> 🆕 **NOWOŚĆ!** OmniRoute jest teraz dostępny jako **natywna aplikacja komputerowa** dla systemów Windows, macOS i Linux.

Uruchom OmniRoute jako samodzielną aplikację komputerową — bez terminala, bez przeglądarki i bez Internetu w przypadku modeli lokalnych. Aplikacja oparta na elektronach obejmuje:

- 🖥️ **Okno natywne** — dedykowane okno aplikacji z integracją z zasobnikiem systemowym
- 🔄 **Auto-Start** — Uruchom OmniRoute po zalogowaniu się do systemu
- 🔔 **Powiadomienia natywne** — otrzymuj powiadomienia o wyczerpaniu limitu lub problemach z dostawcami
- ⚡ **Instalacja jednym kliknięciem** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Tryb offline** — Działa całkowicie offline z dołączonym serwerem

### Szybki start

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Taca systemowa

Po zminimalizowaniu OmniRoute znajduje się w zasobniku systemowym i oferuje szybkie akcje:

- Otwórz pulpit nawigacyjny
- Zmień port serwera
- Zamknij aplikację

📖 Pełna dokumentacja: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Ceny w skrócie

| Poziom             | Dostawca                     | Koszt                                | Reset przydziału              | Najlepsze dla                                  |
| ------------------ | ---------------------------- | ------------------------------------ | ----------------------------- | ---------------------------------------------- |
| **💳 SUBSKRYPCJA** | Claude Code (Pro)            | 20 USD/mies.                         | 5h + tygodniowo               | Już subskrybujesz                              |
|                    | Kodeks (Plus/Pro)            | 20-200 $/mies.                       | 5h + tygodniowo               | Użytkownicy OpenAI                             |
|                    | Bliźnięta CLI                | **BEZPŁATNE**                        | 180 tys./mies. + 1 tys./dzień | Wszyscy!                                       |
|                    | Drugi pilot GitHuba          | 10–19 USD/mies.                      | Miesięczne                    | Użytkownicy GitHuba                            |
| **🔑 KLUCZ API**   | NVIDIA NIM                   | **BEZPŁATNE** (na zawsze)            | ~40 obr/min                   | Ponad 70 otwartych modeli                      |
|                    | Cerebra                      | **BEZPŁATNE** (1 mln tok/dzień)      | 60 tys. TPM / 30 obr./min     | Najszybszy na świecie                          |
|                    | Groq                         | **BEZPŁATNE** (30 obr./min)          | 14,4 tys. RPD                 | Ultraszybka Lama/Gemma                         |
|                    | DeepSeek V3.2                | 0,27 USD/1,10 USD za 1 mln           | Brak                          | Najlepsze uzasadnienie ceny/jakości            |
|                    | xAI Grok-4 Szybki            | **0,20 USD/0,50 USD za 1 milion** 🆕 | Brak                          | Najszybsze + wywoływanie narzędzi, ultraniskie |
|                    | xAI Grok-4 (standard)        | 0,20 USD/1,50 USD za 1 milion 🆕     | Brak                          | Rozsądny flagowiec od xAI                      |
|                    | Mistral                      | Bezpłatny okres próbny + płatny      | Stawka ograniczona            | Europejska sztuczna inteligencja               |
|                    | OtwórzRouter                 | Płatność za użycie                   | Brak                          | Łącznie ponad 100 modeli                       |
| **💰 TANIO**       | GLM-5 (przez Z.AI) 🆕        | 0,5 USD/1 mln                        | Codziennie 10:00              | Wyjście 128K, najnowszy flagowiec              |
|                    | GLM-4.7                      | 0,6 USD/1 mln                        | Codziennie 10:00              | Kopia zapasowa budżetu                         |
|                    | MiniMax M2.5 🆕              | Wejście 0,3 USD/1 mln                | 5-godzinne toczenie           | Rozumowanie + zadania agentyczne               |
|                    | MiniMax M2.1                 | 0,2 USD/1 mln                        | 5-godzinne toczenie           | Najtańsza opcja                                |
|                    | Kimi K2.5 (Moonshot API) 🆕  | Płatność za użycie                   | Brak                          | Bezpośredni dostęp do API Moonshot             |
|                    | Kimi K2                      | 9 USD miesięcznie                    | 10 mln tokenów/mies.          | Przewidywalny koszt                            |
| **🆓 DARMOWE**     | iFlow                        | **$0**                               | Nieograniczony                | 5 modeli bez ograniczeń                        |
|                    | Qwen                         | **$0**                               | Nieograniczony                | 4 modele bez ograniczeń                        |
|                    | Kiro                         | **$0**                               | Nieograniczony                | Claude Sonnet/Haiku (konstruktor AWS)          |
|                    | LongCat Flash-Lite 🆕        | **0 $** (50 mln tok/dzień 🔥)        | 1 RPS                         | Największy darmowy limit na Ziemi              |
|                    | Zapylanie AI 🆕              | **$0** (nie jest potrzebny klucz)    | 1 zapotrzebowanie/15 s        | GPT-5, Claude, DeepSeek, Lama 4                |
|                    | AI pracowników Cloudflare 🆕 | **0 $** (10 tys. neuronów/dzień)     | ~150 odp/dzień                | Ponad 50 modeli, globalna przewaga             |
|                    | Scaleway AI 🆕               | **$0** (łącznie 1 milion tokenów)    | Stawka ograniczona            | UE/RODO, Qwen3 235B, Lama 70B                  |

> 🆕 **Dodano nowe modele (marzec 2026 r.):** Rodzina Grok-4 Fast w cenie 0,20 USD/0,50 USD/M (w porównaniu z czasem 1143 ms — 30% szybciej niż Gemini 2.5 Flash), GLM-5 przez Z.AI z mocą wyjściową 128 tys., rozumowanie MiniMax M2.5, zaktualizowana cena DeepSeek V3.2, Kimi K2.5 poprzez bezpośrednie API Moonshot.

**💡 Stos kombinacji 0 $ — kompletna bezpłatna konfiguracja:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**Zerowy koszt. Kodowanie nigdy się nie kończy.** Skonfiguruj to jako jedną kombinację OmniRoute, a wszystkie zmiany awaryjne będą odbywać się automatycznie — bez konieczności ręcznego przełączania.

---

---

## 🆓 Darmowe modele — co tak naprawdę otrzymujesz

> Wszystkie poniższe modele są **100% bezpłatne i nie wymagają żadnej karty kredytowej**. OmniRoute automatycznie wyznacza trasy między nimi, gdy skończy się jeden limit — połącz je wszystkie, aby uzyskać niezniszczalną kombinację za 0 USD.

### 🔵 MODELE CLAUDE (przez Kiro — identyfikator AWS Builder)

| Modelka             | Przedrostek | Limit              | Limit stawki                  |
| ------------------- | ----------- | ------------------ | ----------------------------- |
| `claude-sonnet-4.5` | `kr/`       | **Nieograniczony** | Brak raportu dziennego limitu |
| `claude-haiku-4.5`  | `kr/`       | **Nieograniczony** | Brak raportu dziennego limitu |
| `claude-opus-4.6`   | `kr/`       | **Nieograniczony** | Najnowsze Opus przez Kiro     |

### 🟢 MODELE IFLOW (bezpłatny OAuth — bez karty kredytowej)

| Modelka            | Przedrostek | Limit              | Limit stawki            |
| ------------------ | ----------- | ------------------ | ----------------------- |
| `kimi-k2-thinking` | `if/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `qwen3-coder-plus` | `if/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `deepseek-r1`      | `if/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `minimax-m2.1`     | `if/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `kimi-k2`          | `if/`       | **Nieograniczony** | Brak zgłoszonego limitu |

### 🟡 MODELE QWEN (autoryzacja kodu urządzenia)

| Modelka             | Przedrostek | Limit              | Limit stawki            |
| ------------------- | ----------- | ------------------ | ----------------------- |
| `qwen3-coder-plus`  | `qw/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `qwen3-coder-flash` | `qw/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `qwen3-coder-next`  | `qw/`       | **Nieograniczony** | Brak zgłoszonego limitu |
| `vision-model`      | `qw/`       | **Nieograniczony** | Multimodalny (zdjęcia)  |

### 🟣 GEMINI CLI (Google OAuth)

| Modelka                  | Przedrostek | Limit                                   | Limit stawki     |
| ------------------------ | ----------- | --------------------------------------- | ---------------- |
| `gemini-3-flash-preview` | `gc/`       | **180 tys. tok/miesiąc** + 1 tys./dzień | Reset miesięczny |
| `gemini-2.5-pro`         | `gc/`       | 180 tys./miesiąc (wspólna pula)         | Wysoka jakość    |

### ⚫ NVIDIA NIM (bezpłatny klucz API — build.nvidia.com)

| Poziom                          | Limit dzienny       | Limit stawki    | Notatki                                                              |
| ------------------------------- | ------------------- | --------------- | -------------------------------------------------------------------- |
| Bezpłatny (wersja deweloperska) | Brak limitu tokenów | **~40 obr/min** | Ponad 70 modeli; przejście na czyste limity stawek w połowie 2025 r. |

Popularne darmowe modele: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (bezpłatny klucz API — inference.cerebras.ai)

| Poziom    | Limit dzienny              | Limit stawki              | Notatki                                                         |
| --------- | -------------------------- | ------------------------- | --------------------------------------------------------------- |
| Bezpłatne | **1 mln tokenów dziennie** | 60 tys. TPM / 30 obr./min | Najszybsze na świecie wnioskowanie LLM; resetuje się codziennie |

Dostępne bezpłatnie: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (bezpłatny klucz API — console.groq.com)

| Poziom    | Limit dzienny     | Limit stawki         | Notatki                                         |
| --------- | ----------------- | -------------------- | ----------------------------------------------- |
| Bezpłatne | **14,4 tys. RPD** | 30 obr./min na model | Brak karty kredytowej; 429 w limicie, bez opłat |

Dostępne bezpłatnie: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (bezpłatny klucz API — longcat.chat) 🆕

| Modelka                       | Przedrostek | Dzienny bezpłatny limit    | Notatki                             |
| ----------------------------- | ----------- | -------------------------- | ----------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`       | **50 milionów tokenów** 💥 | Największy darmowy limit w historii |
| `LongCat-Flash-Chat`          | `lc/`       | 500 tys. tokenów           | Czat wieloobrotowy                  |
| `LongCat-Flash-Thinking`      | `lc/`       | 500 tys. tokenów           | Rozumowanie / CoT                   |
| `LongCat-Flash-Thinking-2601` | `lc/`       | 500 tys. tokenów           | Wersja ze stycznia 2026 r.          |
| `LongCat-Flash-Omni-2603`     | `lc/`       | 500 tys. tokenów           | Multimodalny                        |

> 100% za darmo w publicznej wersji beta. Zarejestruj się na [longcat.chat](https://longcat.chat) za pomocą e-maila lub telefonu. Resetuje się codziennie o godzinie 00:00 UTC.

### 🟢Zapylanie AI (nie jest wymagany klucz API) 🆕

| Modelka    | Przedrostek | Limit stawki           | Dostawca za           |
| ---------- | ----------- | ---------------------- | --------------------- |
| `openai`   | `pol/`      | 1 zapotrzebowanie/15 s | GPT-5                 |
| `claude`   | `pol/`      | 1 zapotrzebowanie/15 s | Antropiczny Claude    |
| `gemini`   | `pol/`      | 1 zapotrzebowanie/15 s | Google Bliźnięta      |
| `deepseek` | `pol/`      | 1 zapotrzebowanie/15 s | DeepSeek V3           |
| `llama`    | `pol/`      | 1 zapotrzebowanie/15 s | Meta Lama 4 Zwiadowca |
| `mistral`  | `pol/`      | 1 zapotrzebowanie/15 s | AI Mistrala           |

> ✨ **Zero tarcia:** Bez rejestracji, bez klucza API. Dodaj dostawcę Pollinations z pustym polem klucza i zacznie działać natychmiast.

### 🟠 CLOUDFLARE WORKERS AI (bezpłatny klucz API — cloudflare.com) 🆕

| Poziom    | Codzienne neurony | Równoważne użycie                                      | Notatki                            |
| --------- | ----------------- | ------------------------------------------------------ | ---------------------------------- |
| Bezpłatne | **10 000**        | ~150 LLM odpowiednio / 500 s audio / 15 000 osadzonych | Globalna przewaga, ponad 50 modeli |

Popularne bezpłatne modele: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (darmowy dźwięk!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Wymaga tokenu API + identyfikatora konta od [dash.cloudflare.com](https://dash.cloudflare.com). Zapisz identyfikator konta w ustawieniach dostawcy.

### 🟣 SCALEWAY AI (1 milion darmowych tokenów — Scaleway.com) 🆕

| Poziom    | Bezpłatny limit | Lokalizacja  | Notatki                                            |
| --------- | --------------- | ------------ | -------------------------------------------------- |
| Bezpłatne | **1M tokenów**  | 🇫🇷 Paryż, UE | W ramach limitów nie jest wymagana karta kredytowa |

Dostępne bezpłatnie: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Zgodny z UE/RODO. Uzyskaj klucz API pod adresem [console.scaleway.com](https://console.scaleway.com).

> **💡 Najlepszy darmowy stos (11 dostawców, 0 $ na zawsze):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Zestaw bezpłatnej transkrypcji

> Transkrypcja dowolnego audio/wideo za **0 USD** — Deepgram prowadzi z 200 USD za darmo, awaryjnie AssemblyAI 50 USD, Groq Whisper jako nieograniczona kopia zapasowa w sytuacjach awaryjnych.

| Dostawca          | Darmowe kredyty                  | Najlepszy Model                                   | Limit stawki                           |
| ----------------- | -------------------------------- | ------------------------------------------------- | -------------------------------------- |
| 🟢 **Deepgram**   | **200 $ za darmo** (rejestracja) | `nova-3` — najwyższa dokładność, ponad 30 języków | Brak limitu obrotów na darmowe kredyty |
| 🔵 **AssemblyAI** | **50 $ za darmo** (rejestracja)  | `universal-3-pro` — rozdziały, sentyment, PII     | Brak limitu obrotów na darmowe kredyty |
| 🔴 **Grok**       | **Za darmo na zawsze**           | `whisper-large-v3` — Szept OpenAI                 | 30 obr./min (ograniczona prędkość)     |

**Sugerowana kombinacja w `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Następnie w `/dashboard/media` → zakładka **Transkrypcja**: prześlij dowolny plik audio lub wideo → wybierz punkt końcowy combo → uzyskaj transkrypcję w obsługiwanych formatach.

## 💡 Kluczowe funkcje

OmniRoute v2.0 został zbudowany jako platforma operacyjna, a nie tylko pośrednik przekazujący.

### 🆕 Nowość — ulepszenia inspirowane ClawRouterem (marzec 2026)

| Funkcja                                  | Co to robi                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Szybka Rodzina**             | Modele xAI w cenie 0,20 USD/0,50 USD/M — w teście porównawczym 1143 ms (30% szybsze niż Gemini 2.5 Flash)                                 |
| 🧠 **GLM-5 przez Z.AI**                  | Kontekst wyjściowy 128 tys., 0,5/1 mln USD — najnowszy flagowiec z rodziny GLM                                                            |
| 🔮 **MiniMax M2.5**                      | Rozumowanie + zadania agenta za 0,30 USD/1 milion — znacząca aktualizacja z M2.1                                                          |
| 🎯 **ToolCalling Flag na model**         | Dla każdego modelu `toolCalling: true/false` w rejestrze — AutoCombo pomija modele, które nie obsługują narzędzia                         |
| 🌍 **Wielojęzyczne wykrywanie intencji** | Słowa kluczowe PT/ZH/ES/AR w punktacji AutoCombo — lepszy wybór modelu dla treści innych niż angielski                                    |
| 📊 **Rezerwacje oparte na testach**      | Rzeczywiste opóźnienie p95 na podstawie punktacji kombinacji kanałów żądań na żywo — AutoCombo uczy się na podstawie rzeczywistych danych |
| 🔁 **Poproś o deduplikację**             | Okno deduplikacji oparte na skrótach treści — bezpieczne dla wielu agentów, zapobiega duplikacjom opłat                                   |
| 🔌 **Strategia routera z wtyczką**       | Rozszerzalny interfejs `RouterStrategy` — dodaj niestandardową logikę routingu jako wtyczki                                               |

### 🚀 Poprzednia wersja 2.0.9+ — Plac zabaw, odciski palców CLI i ACP

| Funkcja                                            | Co to robi                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modelowy plac zabaw**                         | Strona panelu kontrolnego do bezpośredniego testowania dowolnego modelu — selektory dostawcy/modelu/punktu końcowego, edytor Monako, przesyłanie strumieniowe, przerywanie, synchronizacja                                                                                                                          |
| 🔏 **Dopasowanie odcisków palców CLI**             | Kolejność nagłówków/treści poszczególnych dostawców zgodna z natywnymi podpisami CLI — przełącz dla każdego dostawcy w Ustawieniach > Zabezpieczenia. **Twój adres IP proxy zostanie zachowany**                                                                                                                    |
| 🤝 **Wsparcie ACP (protokół klienta agenta)**      | Wykrywanie agenta CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 innych), generator procesów, punkt końcowy `/api/acp/agents`                                                                                                                                                                                  |
| 🤖 **Panel agentów AKP**                           | Debugowanie › Strona Agenty — siatka 14 agentów ze statusem instalacji, wersją i niestandardowym formularzem agenta dla dowolnego narzędzia CLI. **Użytkownicy OpenCode** otrzymują przycisk „Pobierz opencode.json”, który automatycznie generuje gotową do użycia konfigurację ze wszystkimi dostępnymi modelami. |
| 🔧 **Model niestandardowy `apiFormat` Trasowanie** | Modele niestandardowe z `apiFormat: "responses"` teraz prawidłowo kierują do tłumacza interfejsu API odpowiedzi                                                                                                                                                                                                     |
| 🏢 **Izolacja przestrzeni roboczej w Kodeksie**    | Wiele obszarów roboczych Codex na e-mail — OAuth poprawnie rozdziela połączenia według identyfikatora obszaru roboczego                                                                                                                                                                                             |
| 🔄 **Automatyczna aktualizacja elektronów**        | Aplikacja komputerowa sprawdza dostępność aktualizacji + automatyczna instalacja przy ponownym uruchomieniu                                                                                                                                                                                                         |

### 🤖 Operacje agentowe i protokołowe (wersja 2.0)

| Funkcja                                          | Co to robi                                                                                                             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| 🔧 **Serwer MCP (16 narzędzi)**                  | Narzędzia IDE/agent za pośrednictwem 3 transportów: stdio, SSE (`/api/mcp/sse`), strumieniowy HTTP (`/api/mcp/stream`) |
| 🤝 **Serwer A2A (JSON-RPC + SSE)**               | Wykonywanie zadań między agentami z przepływami synchronizacji i przesyłania strumieniowego                            |
| 🧭 **Strona skonsolidowanych punktów końcowych** | Strona zarządzania z zakładkami z zakładkami Endpoint Proxy, MCP, A2A i API Endpoints                                  |
| 🎚️ **Przełącza włączanie/wyłączanie usługi**     | Przełączniki ON/OFF dla MCP i A2A z trwałością ustawień (domyślnie: OFF)                                               |
| 🛰️ **Bicie serca środowiska wykonawczego MCP**   | Rzeczywisty status procesu (pid, czas pracy, wiek pulsu, transport, tryb zakresu)                                      |
| 📋 **Ścieżka audytu MCP**                        | Filtrowane dzienniki audytu z informacją o powodzeniu/porażce i przypisaniu klucza                                     |
| 🔐 **Egzekwowanie zakresu MCP**                  | 9 szczegółowych uprawnień zakresu dla kontrolowanego dostępu do narzędzi                                               |
| 📡 **Zarządzanie cyklem życia zadań A2A**        | Wyświetlaj/filtruj zadania, sprawdzaj zdarzenia/artefakty, anuluj uruchomione zadania                                  |
| 📋 **Odkrycie karty agenta**                     | `/.well-known/agent.json` do automatycznego wykrywania klienta                                                         |
| 🧪 **Uprząż testowa protokołu E2E**              | Prawdziwy klient MCP SDK + A2A przepływa w `test:protocols:e2e`                                                        |
| ⚙️ **Kontrola operacyjna**                       | Kombinacja przełączników, zastosuj profile odporności, zresetuj wyłączniki z jednej powierzchni sterującej             |

### 🧠 Trasowanie i inteligencja

| Funkcja                                            | Co to robi                                                                             |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 🎯 **Inteligentny 4-poziomowy powrót**             | Auto-trasa: Subskrypcja → Klucz API → Tanie → Bezpłatne                                |
| 📊 **Śledzenie limitów w czasie rzeczywistym**     | Liczba tokenów na żywo + odliczanie resetowania dla każdego dostawcy                   |
| 🔄 **Tłumaczenie formatu**                         | OpenAI ↔ Claude ↔ Gemini ↔ Odpowiedzi z konwersjami bezpiecznymi dla schematu          |
| 👥 **Obsługa wielu kont**                          | Wiele kont na dostawcę z inteligentnym wyborem                                         |
| 🔄 **Automatyczne odświeżanie tokena**             | Tokeny OAuth odświeżają się automatycznie przy ponownej próbie                         |
| 🎨 **Niestandardowe kombinacje**                   | 6 strategii równoważenia + kontrola łańcucha awaryjnego                                |
| 🌐 **Router z dziką kartą**                        | `provider/*` routing dynamiczny                                                        |
| 🧠 **Myślenie o kontroli budżetu**                 | Limity rozumowania passthrough, automatycznego, niestandardowego i adaptacyjnego       |
| 🔀 **Aliasy modeli**                               | Wbudowane + niestandardowe aliasing modelu i bezpieczeństwo migracji                   |
| ⚡ **Degradacja tła**                              | Kieruj zadania w tle o niskim priorytecie do tańszych modeli                           |
| 🧪 **Inteligentny routing uwzględniający zadania** | Automatyczny wybór modelu według rodzaju treści (kodowanie/wizja/analiza/podsumowanie) |
| 💬 **Wstrzyknięcie monitu systemowego**            | Globalna kontrola zachowania stosowana konsekwentnie                                   |
| 📄 **Zgodność API odpowiedzi**                     | Pełna obsługa `/v1/responses` Codexu i zaawansowanych przepływów pracy agentów         |

### 🎵 Wielomodalne interfejsy API

| Funkcja                            | Co to robi                                                                                                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generowanie obrazu**          | `/v1/images/generations` z backendem w chmurze i lokalnym                                                                                                                         |
| 📐 **Osadzenia**                   | `/v1/embeddings` dla rurociągów wyszukiwania i RAG                                                                                                                                |
| 🎤 **Transkrypcja audio**          | `/v1/audio/transcriptions` — 7 dostawców (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatyczne wykrywanie języka, obsługa MP4/MP3/WAV |
| 🔊 **Zamiana tekstu na mowę**      | `/v1/audio/speech` — 10 dostawców (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) z poprawnymi komunikatami o błędach         |
| 🎬 **Generowanie wideo**           | `/v1/videos/generations` (przepływy pracy ComfyUI + SD WebUI)                                                                                                                     |
| 🎵 **Pokolenie muzyki**            | `/v1/music/generations` (Przepływy pracy w ComfyUI)                                                                                                                               |
| 🛡️ **Moderacje**                   | `/v1/moderations` kontrole bezpieczeństwa                                                                                                                                         |
| 🔀 **Ponowna pozycja**             | `/v1/rerank` dla punktacji trafności                                                                                                                                              |
| 🔍 **Wyszukiwarka internetowa** 🆕 | `/v1/search` — 5 dostawców (Serper, Brave, Perplexity, Exa, Tavily), ponad 6500 bezpłatnych miesięcznie, automatyczne przełączanie awaryjne, pamięć podręczna                     |

### 🛡️ Odporność, bezpieczeństwo i zarządzanie

| Funkcja                                        | Co to robi                                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🔌 **Wyłączniki**                              | Wyłączenie/odzyskiwanie dla każdego modelu z kontrolą progów                                               |
| 🎯 **Modele obsługujące punkt końcowy**        | Modele niestandardowe deklarują obsługiwane punkty końcowe + format API                                    |
| 🛡️ **Stado Przeciw Gromom**                    | Mutex + zabezpieczenia semaforów przy zdarzeniach ponawiania/oceniania                                     |
| 🧠 **Semantyczna + pamięć podręczna podpisów** | Redukcja kosztów/opóźnień dzięki dwóm warstwom pamięci podręcznej                                          |
| ⚡ **Poproś o idempotencję**                   | Zduplikowane okno ochrony                                                                                  |
| 🔒 **Podrabianie odcisków palców TLS**         | Odcisk palca TLS podobny do przeglądarki — **ogranicza wykrywanie botów i oznaczanie kont**                |
| 🔏 **Dopasowanie odcisków palców CLI**         | Pasuje do natywnych sygnatur żądań CLI — **zmniejsza ryzyko bana, zachowując jednocześnie adres IP proxy** |
| 🌐 **Filtrowanie IP**                          | Kontrola listy dozwolonych/blokowanych w przypadku ujawnionych wdrożeń                                     |
| 📊 **Edytowalne limity stawek**                | Konfigurowalne limity na poziomie globalnym/dostawcy z trwałością                                          |
| 🔑 **Zarządzanie kluczami API + zakres**       | Bezpieczne wydawanie/rotacja kluczy oraz kontrola modelu/dostawcy                                          |
| 🛡️ **Chronione `/models`**                     | Opcjonalne bramkowanie uwierzytelniania i ukrywanie dostawcy dla katalogu modeli                           |

### 📊 Obserwacja i analityka

| Funkcja                              | Co to robi                                                            |
| ------------------------------------ | --------------------------------------------------------------------- |
| 📝 **Żądanie + rejestrowanie proxy** | Pełne rejestrowanie żądań/odpowiedzi i proxy                          |
| 📋 **Ujednolicony panel dzienników** | Widoki żądań, proxy, audytu i konsoli na jednej stronie               |
| 🔍 **Poproś o telemetrię**           | Opóźnienie p50/p95/p99 i śledzenie żądań                              |
| 🏥 **Panel zdrowia**                 | Czas pracy, stany wyłączników, blokady, statystyki pamięci podręcznej |
| 💰 **Śledzenie kosztów**             | Kontrola budżetu i widoczność cen dla poszczególnych modeli           |
| 📈 **Wizualizacje analityczne**      | Informacje o użyciu modelu/dostawcy i widoki trendów                  |
| 🧪 **Ramy oceny**                    | Testowanie złotego zestawu z konfigurowalnymi strategiami dopasowania |

### ☁️ Wdrożenie i platforma

| Funkcja                                   | Co to robi                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| 🌐 **Wdrażaj gdziekolwiek**               | Localhost, VPS, Docker, środowiska chmurowe                                            |
| 💾 **Synchronizacja z chmurą**            | Synchronizacja konfiguracji za pośrednictwem pracownika w chmurze                      |
| 🔄 **Kopia zapasowa/Przywracanie**        | Przepływy eksportu/importu i odzyskiwania po awarii                                    |
| 🧙 **Kreator wdrażania**                  | Konfiguracja z przewodnikiem po pierwszym uruchomieniu                                 |
| 🔧 **Panel narzędzi CLI**                 | Konfiguracja popularnych narzędzi do kodowania jednym kliknięciem                      |
| 🎮 **Modelowy plac zabaw**                | Przetestuj dowolnego dostawcę/model/punkt końcowy z poziomu pulpitu nawigacyjnego      |
| 🔏 **Przełączanie linii papilarnych CLI** | Dopasowywanie odcisków palców poszczególnych dostawców w Ustawieniach > Bezpieczeństwo |
| 🌐 **i18n (30 języków)**                  | Pełny pulpit nawigacyjny + obsługa języków dokumentów z pokryciem RTL                  |
| 🧹 **Wyczyść wszystkie modele**           | Czyszczenie listy modeli jednym kliknięciem w szczegółach dostawcy                     |
| 📋 **Szablony wydania**                   | Standaryzowane szablony GitHub dla błędów i funkcji                                    |
| 📂 **Niestandardowy katalog danych**      | `DATA_DIR` zastąpienie lokalizacji przechowywania                                      |

### Funkcja Głębokie nurkowanie

#### Inteligentne rozwiązanie awaryjne z praktyczną kontrolą kosztów

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

W przypadku spadku limitu, szybkości lub kondycji OmniRoute automatycznie przechodzi do następnego kandydata bez konieczności ręcznego przełączania.

#### Zarządzanie protokołami, które jest widoczne i obsługiwane

- MCP + A2A można znaleźć w interfejsie użytkownika i dokumentach (nie są ukryte)
- Interfejsy API stanu protokołu udostępniają aktualne dane operacyjne (`/api/mcp/*`, `/api/a2a/*`)
- Pulpity nawigacyjne zawierają działania dla operacji dnia 2 (przełączniki kombinacji, resetowanie wyłączników, anulowanie zadań)

#### Tłumacz + przepływ pracy z walidacją

Obszar Tłumacza obejmuje:

- **Plac zabaw**: poproś o sprawdzenie transformacji
- **Tester czatu**: pełne żądanie/odpowiedź w obie strony
- **Stanowisko testowe**: wiele przypadków w jednym przebiegu
- **Monitor na żywo**: podgląd ruchu drogowego w czasie rzeczywistym

Plus weryfikacja protokołu z prawdziwymi klientami za pośrednictwem `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Informacje o narzędziach, konfiguracje IDE i przykłady klientów
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Umiejętności, metody JSON-RPC, przesyłanie strumieniowe i cykl życia zadań

## 🧪 Oceny (Ewaluacje)

OmniRoute zawiera wbudowaną platformę ewaluacyjną do testowania jakości odpowiedzi LLM na podstawie złotego zestawu. Uzyskaj do niego dostęp poprzez **Analytics → Evals** na pulpicie nawigacyjnym.

### Wbudowany złoty zestaw

Fabrycznie załadowany „Złoty zestaw OmniRoute” zawiera przypadki testowe dla:

- Pozdrowienia, matematyka, geografia, generowanie kodu
- Zgodność z formatem JSON, tłumaczenie, generowanie przecen
- Odmowa bezpieczeństwa (szkodliwa treść), liczenie, logika boolowska

### Strategie oceny

| Strategia  | Opis                                                                    | Przykład                         |
| ---------- | ----------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Dane wyjściowe muszą dokładnie odpowiadać                               | `"4"`                            |
| `contains` | Dane wyjściowe muszą zawierać podciąg (wielkość liter nie ma znaczenia) | `"Paris"`                        |
| `regex`    | Dane wyjściowe muszą pasować do wzorca wyrażenia regularnego            | `"1.*2.*3"`                      |
| `custom`   | Niestandardowa funkcja JS zwraca wartość prawda/fałsz                   | `(output) => output.length > 10` |

---

## 📖 Przewodnik konfiguracji

### Konfiguracja protokołu (MCP + A2A)

<details>
<summary><b>🧩 Konfiguracja MCP (protokół kontekstu modelu)</b></summary>

Uruchom transport MCP w trybie stdio:

```bash
omniroute --mcp
```

Zalecany przebieg walidacji:

1. Podłącz klienta MCP przez stdio.
2. Uruchom `omniroute_get_health`.
3. Uruchom `omniroute_list_combos`.
4. Otwórz `/dashboard/mcp`, aby potwierdzić puls, aktywność i audyt.

Przydatne API do automatyzacji:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Konfiguracja A2A (Agent2Agent)</b></summary>

Odkryj agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Wyślij zadanie:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Zarządzaj cyklem życia:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Interfejs operacyjny:

- `/dashboard/a2a` dla obserwowalności zadania/stanu/strumienia i działań dymnych

</details>

<details>
<summary><b>🧪 Kompleksowa walidacja protokołu</b></summary>

Sprawdź oba protokoły u prawdziwych klientów:

```bash
npm run test:protocols:e2e
```

To weryfikuje:

- Klient MCP SDK łączy/listuje/wywołuje
- Wykrywanie/wysyłanie/przesyłanie strumieniowe/pobieranie/anulowanie A2A
- Sprawdzaj dane w interfejsach API audytu MCP i zarządzania zadaniami A2A

</details>

<details>
<summary><b>💳 Dostawcy subskrypcji</b></summary>

### Kod Claude’a (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Wskazówka dla profesjonalistów:** używaj Opus do skomplikowanych zadań, a Sonnet do szybkości. OmniRoute śledzi limit na model!

### Kodeks OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Zarządzanie limitami konta Codex (5h + tygodniowo)

Każde konto Codexu ma teraz przełączniki zasad w `Dashboard -> Providers`:

- `5h` (ON/OFF): wymusza politykę 5-godzinnego progu okna.
- `Weekly` (WŁ./WYŁ.): wymuszanie polityki cotygodniowego progu okna.
- Zachowanie progowe: gdy włączone okno osiągnie >=90% wykorzystania, to konto zostanie pominięte.
- Zachowanie rotacyjne: OmniRoute automatycznie kieruje do następnego kwalifikującego się konta Codex.
- Resetowanie zachowania: kiedy dostawca `resetAt` upłynie czas, konto automatycznie stanie się ponownie kwalifikowalne.

Scenariusze:

- `5h ON` + `Weekly ON`: konto jest pomijane, gdy którekolwiek okno osiągnie próg.
- `5h OFF` + `Weekly ON`: tylko użycie tygodniowe może zablokować konto.
- `5h ON` + `Weekly OFF`: tylko 5-godzinne użytkowanie może zablokować konto.
- `resetAt` zaliczony: konto automatycznie ponownie wchodzi do rotacji (nie można go ponownie włączyć ręcznie).

### Gemini CLI (DARMOWE 180 tys./miesiąc!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Najlepsza wartość:** Ogromny darmowy poziom! Użyj tego przed płatnymi poziomami.

### Drugi pilot GitHuba

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
<summary><b>🔑 Dostawcy kluczy API</b></summary>

### NVIDIA NIM (DARMOWY dostęp dla programistów — ponad 70 modeli)

1. Zarejestruj się: [build.nvidia.com](https://build.nvidia.com)
2. Uzyskaj bezpłatny klucz API (w cenie 1000 kredytów)
3. Panel kontrolny → Dodaj dostawcę → NVIDIA NIM:
   - Klucz API: `nvapi-your-key`

**Modele:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` i ponad 50 innych

**Wskazówka dla profesjonalistów:** API zgodne z OpenAI — działa bezproblemowo z tłumaczeniem formatu OmniRoute!

### DeepSeek

1. Zarejestruj się: [platform.deepseek.com](https://platform.deepseek.com)
2. Zdobądź klucz API
3. Panel kontrolny → Dodaj dostawcę → DeepSeek

**Modele:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (dostępny bezpłatny poziom!)

1. Zarejestruj się: [console.groq.com](https://console.groq.com)
2. Uzyskaj klucz API (w cenie bezpłatna warstwa)
3. Panel kontrolny → Dodaj dostawcę → Groq

**Modele:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Wskazówka dla profesjonalistów:** Ultraszybkie wnioskowanie — najlepsze do kodowania w czasie rzeczywistym!

### OpenRouter (ponad 100 modeli)

1. Zarejestruj się: [openrouter.ai](https://openrouter.ai)
2. Zdobądź klucz API
3. Panel kontrolny → Dodaj dostawcę → OpenRouter

**Modele:** Uzyskaj dostęp do ponad 100 modeli wszystkich głównych dostawców za pomocą jednego klucza API.

</details>

<details>
<summary><b>💰 Tani dostawcy (kopia zapasowa)</b></summary>

### GLM-4.7 (reset dzienny, 0,6 USD/1 mln)

1. Zarejestruj się: [Zhipu AI](https://open.bigmodel.cn/)
2. Uzyskaj klucz API z planu kodowania
3. Panel → Dodaj klucz API:
   - Dostawca: `glm`
   - Klucz API: `your-key`

**Użyj:** `glm/glm-4.7`

**Wskazówka dla profesjonalistów:** Plan kodowania oferuje 3× limit przy cenie 1/7! Resetuj codziennie o 10:00.

### MiniMax M2.1 (reset 5 godz., 0,20 USD/1 mln)

1. Zarejestruj się: [MiniMax](https://www.minimax.io/)
2. Zdobądź klucz API
3. Panel → Dodaj klucz API

**Użyj:** `minimax/MiniMax-M2.1`

**Wskazówka dla profesjonalistów:** Najtańsza opcja dla długiego kontekstu (1 milion tokenów)!

### Kimi K2 (9 USD miesięcznie)

1. Subskrybuj: [Moonshot AI](https://platform.moonshot.ai/)
2. Zdobądź klucz API
3. Panel → Dodaj klucz API

**Użyj:** `kimi/kimi-latest`

**Wskazówka dla profesjonalistów:** Naprawiono 9 USD miesięcznie za 10 mln tokenów = efektywny koszt 0,90 USD/1 mln!

</details>

<details>
<summary><b>🆓 BEZPŁATNI dostawcy (awaryjna kopia zapasowa)</b></summary>

### iFlow (5 DARMOWYCH modeli przez OAuth)

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

### Qwen (4 DARMOWE modele poprzez kod urządzenia)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude ZA DARMO)

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
<summary><b>🎨 Twórz kombinacje</b></summary>

### Przykład 1: Maksymalizuj subskrypcję → Tania kopia zapasowa

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Przykład 2: Tylko bezpłatny (zero kosztów)

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
<summary><b>🔧 Integracja z CLI</b></summary>

### IDE kursora

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Kod Claude’a

Użyj strony **Narzędzia CLI** w panelu kontrolnym, aby dokonać konfiguracji jednym kliknięciem, lub edytuj ręcznie `~/.claude/settings.json`.

### Interfejs wiersza polecenia Kodeksu

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Opcja 1 — Panel kontrolny (zalecany):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Opcja 2 — Ręcznie:** Edytuj `~/.openclaw/openclaw.json`:

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

> **Uwaga:** OpenClaw działa tylko z lokalnym OmniRoute. Użyj `127.0.0.1` zamiast `localhost`, aby uniknąć problemów z rozdzielczością IPv6.

### Kliknij / Kontynuuj / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### Otwarty kod

**Krok 1:** Dodaj OmniRoute jako niestandardowego dostawcę:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Krok 2:** Utwórz/edytuj `opencode.json` w katalogu głównym projektu:

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

**Krok 3:** Wybierz model w OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Wskazówka:** dodaj dowolny model dostępny w punkcie końcowym OmniRoute `/v1/models` do sekcji `models`. Użyj formatu `provider/model-id` w panelu kontrolnym OmniRoute.

</details>

---

## 🐛 Rozwiązywanie problemów

<details>
<summary><b>Kliknij, aby rozwinąć przewodnik rozwiązywania problemów</b></summary>

**„Model językowy nie dostarczał komunikatów”**

- Wyczerpany limit dostawcy → Sprawdź moduł śledzenia limitów na pulpicie nawigacyjnym
- Rozwiązanie: użyj kombinacji zastępczej lub przejdź na tańszy poziom

**Ograniczenie szybkości**

- Limit subskrypcji wyczerpany → Powrót do GLM/MiniMax
- Dodaj kombinację: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth wygasł**

- Automatyczne odświeżanie przez OmniRoute
- Jeśli problemy nadal występują: Panel kontrolny → Dostawca → Połącz ponownie

**Wysokie koszty**

- Sprawdź statystyki użytkowania w Panelu → Koszty
- Zmień model podstawowy na GLM/MiniMax
- Korzystaj z bezpłatnej warstwy (Gemini CLI, iFlow) do zadań niekrytycznych

**Porty pulpitu nawigacyjnego/API są nieprawidłowe**

- `PORT` to kanoniczny port bazowy (i domyślnie port API)
- `API_PORT` zastępuje tylko odbiornik API zgodny z OpenAI
- `DASHBOARD_PORT` zastępuje tylko pulpit nawigacyjny/nasłuchiwanie Next.js
- Ustaw `NEXT_PUBLIC_BASE_URL` na swój pulpit nawigacyjny/publiczny adres URL (w przypadku wywołań zwrotnych OAuth)

**Błędy synchronizacji z chmurą**

- Sprawdź, czy `BASE_URL` wskazuje na działającą instancję
- Sprawdź, czy `CLOUD_URL` wskazuje na oczekiwany punkt końcowy w chmurze
- Zachowaj wyrównanie wartości `NEXT_PUBLIC_*` z wartościami po stronie serwera

**Pierwsze logowanie nie działa**

- Sprawdź `INITIAL_PASSWORD` w `.env`
- Jeśli nieustawione, hasło zastępcze to `123456`

**Brak dzienników żądań**

- Ustaw `ENABLE_REQUEST_LOGS=true` w `.env`

**Test połączenia pokazuje „Nieprawidłowy” dla dostawców kompatybilnych z OpenAI**

- Wielu dostawców nie udostępnia punktu końcowego `/models`
- OmniRoute v1.0.6+ zawiera weryfikację awaryjną poprzez uzupełnianie czatu
- Upewnij się, że podstawowy adres URL zawiera przyrostek `/v1`

### 🔐 OAuth na zdalnym serwerze

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Ważne dla użytkowników korzystających z OmniRoute na VPS, Dockerze lub dowolnym serwerze zdalnym**

#### Dlaczego Antigravity / Gemini CLI OAuth nie działa na zdalnych serwerach?

Dostawcy **Antigravity** i **Gemini CLI** korzystają z **Google OAuth 2.0**. Google wymaga, aby wartość `redirect_uri` w przepływie OAuth dokładnie odpowiadała jednemu z wcześniej zarejestrowanych identyfikatorów URI w Google Cloud Console aplikacji.

Poświadczenia OAuth zawarte w OmniRoute są zarejestrowane **tylko dla `localhost`**. Gdy uzyskujesz dostęp do OmniRoute na zdalnym serwerze (np. `https://omniroute.myserver.com`), Google odrzuca uwierzytelnienie za pomocą:

```
Error 400: redirect_uri_mismatch
```

#### Rozwiązanie: skonfiguruj własne dane uwierzytelniające OAuth

Musisz utworzyć **Identyfikator klienta OAuth 2.0** w Google Cloud Console przy użyciu identyfikatora URI swojego serwera.

#### Krok po kroku

**1. Otwórz konsolę Google Cloud**

Przejdź do: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Utwórz nowy identyfikator klienta OAuth 2.0**

- Kliknij **"+ Utwórz dane uwierzytelniające"** → **"Identyfikator klienta OAuth"**
- Typ aplikacji: **"Aplikacja internetowa"**
- Imię: dowolne (np. `OmniRoute Remote`)

**3. Dodaj autoryzowane identyfikatory URI przekierowań**

W polu **„Autoryzowane identyfikatory URI przekierowań”** dodaj:

```
https://your-server.com/callback
```

> Zamień `your-server.com` na domenę lub adres IP swojego serwera (w razie potrzeby podaj port, np. `http://45.33.32.156:20128/callback`).

**4. Zapisz i skopiuj dane uwierzytelniające**

Po utworzeniu Google wyświetli **Identyfikator klienta** i **Tajemnica klienta**.

**5. Ustaw zmienne środowiskowe**

W `.env` (lub zmiennych środowiskowych Dockera):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Uruchom ponownie OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Spróbuj połączyć się ponownie**

Panel kontrolny → Dostawcy → Antygrawitacja (lub Gemini CLI) → OAuth

Google będzie teraz poprawnie przekierowywać do `https://your-server.com/callback`.

---

#### Tymczasowe obejście (bez niestandardowych poświadczeń)

Jeśli nie chcesz teraz konfigurować własnych danych uwierzytelniających, nadal możesz skorzystać z **ręcznego przepływu adresów URL**:

1. OmniRoute otwiera adres URL autoryzacji Google
2. Po autoryzacji Google próbuje przekierować do `localhost` (co kończy się niepowodzeniem na serwerze zdalnym)
3. **Skopiuj pełny adres URL** z paska adresu przeglądarki (nawet jeśli strona się nie ładuje)
4. Wklej ten adres URL w polu pokazanym w trybie połączenia OmniRoute
5. Kliknij **„Połącz”**

> Działa to, ponieważ kod autoryzacyjny w adresie URL jest ważny niezależnie od tego, czy załadowana została strona przekierowująca.

---

<details>
<summary><b>🇧🇷 Wersja w języku portugalskim</b></summary>

#### Por que o OAuth do Antigravity / Gemini CLI falha na zdalnych serwerach?

Sprawdzone **Antigravity** i **Gemini CLI** używane **Google OAuth 2.0** dla autentyczności. O Google, możesz to zrobić `redirect_uri` bez zmiany OAuth seja **exatamente** uma das URI pre-cadastradas no Google Cloud Console do aplikacji.

Jako uwierzytelnienie OAuth zostało wydane przez OmniRoute w cadastradas **apenas dla `localhost`**. Możesz uzyskać dostęp do OmniRoute na serwerze zdalnym (np.: `https://omniroute.meuservidor.com`), lub Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Rozwiązanie: Skonfiguruj suas próprias credenciais OAuth

Precyzyjne żądanie **Identyfikator klienta OAuth 2.0** nie Google Cloud Console poprzez URI do tego serwera.

#### Passo za passo

**1. Dostęp do konsoli Google Cloud**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Wezwij nowy identyfikator klienta OAuth 2.0**

- Kliknij **"+ Utwórz dane uwierzytelniające"** → **"Identyfikator klienta OAuth"**
- Typ aplikacji: **"Aplikacja internetowa"**
- Nazwa: escolha qualquer nom (np.: `OmniRoute Remote`)

**3. Adicione jako autoryzowane identyfikatory URI przekierowań**

Bez komentarza **„Autoryzowane identyfikatory URI przekierowań”**, rada:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio lub IP do seu servidor (w tym porta se necessário, np.: `http://45.33.32.156:20128/callback`).

**4. Zapisz i skopiuj jako poświadczenie**

Após criar, o Google mostrará o **Identyfikator klienta** i o **Tajemnica klienta**.

**5. Skonfiguruj jako variáveis de ambiente**

Nie seu `.env` (lub nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie lub OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Panel kontrolny → Dostawcy → Antygrawitacja (lub Gemini CLI) → OAuth

Agora o Google redirecionará corretamente dla `https://seu-servidor.com/callback` i autentyczna funkcja.

---

#### Obejście tymczasowe (sem configurar credenciais prróprias)

Jeśli chcesz uzyskać dostęp do **podręcznika URL**:

1. OmniRoute abrirá adres URL autoryzacji w Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Skopiuj kompletny adres URL** da barra de endereço do seu przeglądarki (wiadomość que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kliknij je **„Połącz”**

> To obejście funkcji porque o kodigo de autorização na URL é válido niezależny do przekierowania ter carregado ou não.

</details>

---

</details>

## 🛠️ Stos technologii

<details>
<summary><b>Kliknij, aby rozwinąć szczegóły stosu technologii</b></summary>

- **Środowisko wykonawcze**: Node.js 18–22 LTS (⚠️ Node.js 24+ jest **nieobsługiwany** — `better-sqlite3` natywne pliki binarne są niekompatybilne)
- **Język**: TypeScript 5.9 — **100% TypeScript** w `src/` i `open-sse/` (zero `any` w modułach podstawowych od wersji 2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Baza danych**: LowDB (JSON) + SQLite (stan domeny + logi proxy + audyt MCP + decyzje dotyczące routingu)
- **Schematy**: Zod (walidacja we/wy narzędzia MCP, kontrakty API)
- **Protokoły**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: zdarzenia wysyłane przez serwer (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + klucze API + autoryzacja w zakresie MCP
- **Testowanie**: Uruchomienie testów Node.js + Vitest (ponad 900 testów, w tym testy jednostkowe, integracyjne, E2E)
- **CI/CD**: Akcje GitHub (automatyczne publikowanie npm + Docker Hub w momencie wydania)
- **Strona internetowa**: [omniroute.online](https://omniroute.online)
- **Pakiet**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Doker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odporność**: wyłącznik automatyczny, wykładnicze wycofywanie, stado przeciwgrzmotowe, fałszowanie TLS, samonaprawianie automatycznej kombinacji

</details>

---

## 📖 Dokumentacja

| Dokument                                       | Opis                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Dostawcy, kombinacje, integracja CLI, wdrożenie                       |
| [API Reference](docs/API_REFERENCE.md)         | Wszystkie punkty końcowe z przykładami                                |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 narzędzi MCP, konfiguracje IDE, klienci Python/TS/Go               |
| [A2A Server](src/lib/a2a/README.md)            | Protokół JSON-RPC 2.0, umiejętności, streaming, zarządzanie zadaniami |
| [Auto-Combo Engine](docs/auto-combo.md)        | Punktacja 6-czynnikowa, pakiety trybów, samoleczenie                  |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Typowe problemy i rozwiązania                                         |
| [Architecture](docs/ARCHITECTURE.md)           | Architektura systemu i elementy wewnętrzne                            |
| [Contributing](CONTRIBUTING.md)                | Konfiguracja i wytyczne dotyczące programowania                       |
| [OpenAPI Spec](docs/openapi.yaml)              | Specyfikacja OpenAPI 3.0                                              |
| [Security Policy](SECURITY.md)                 | Zgłaszanie luk w zabezpieczeniach i praktyki bezpieczeństwa           |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Kompletny przewodnik: konfiguracja VM + nginx + Cloudflare            |
| [Features Gallery](docs/FEATURES.md)           | Wizualna wycieczka po panelu ze zrzutami ekranu                       |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Etapy sprawdzania poprawności przed wydaniem                          |

---

## 🗺️ Plan działania

OmniRoute ma **ponad 210 funkcji zaplanowanych** w wielu fazach rozwoju. Oto kluczowe obszary:

| Kategoria                        | Planowane funkcje | Najważniejsze                                                                                                                                      |
| -------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing i inteligencja**    | 25+               | Routing z najmniejszym opóźnieniem, routing oparty na tagach, wstępna inspekcja przydziału, wybór konta P2C                                        |
| 🔒 **Bezpieczeństwo i zgodność** | 20+               | Wzmocnienie SSRF, maskowanie poświadczeń, limit szybkości na punkt końcowy, zakres kluczy zarządzania                                              |
| 📊 **Obserwowalność**            | 15+               | Integracja OpenTelemetry, monitorowanie kwot w czasie rzeczywistym, śledzenie kosztów według modelu                                                |
| 🔄 **Integracja dostawców**      | 20+               | Rejestr modeli dynamicznych, czasy odnowienia dostawcy, Kodeks dla wielu kont, analiza przydziału Copilot                                          |
| ⚡ **Wydajność**                 | 15+               | Podwójna warstwa pamięci podręcznej, pamięć podręczna podpowiedzi, pamięć podręczna odpowiedzi, utrzymywanie transmisji strumieniowej, wsadowe API |
| 🌐 **Ekosystem**                 | 10+               | WebSocket API, ładowanie konfiguracji na gorąco, rozproszony magazyn konfiguracji, tryb komercyjny                                                 |

### 🔜 Już wkrótce

- 🔗 **Integracja OpenCode** — natywna obsługa dostawców dla IDE kodowania OpenCode AI
- 🔗 **Integracja z TRAE** — Pełne wsparcie dla platformy rozwojowej TRAE AI
- 📦 **Batch API** — Asynchroniczne przetwarzanie wsadowe dla żądań masowych
- 🎯 **Routing oparty na tagach** — Kieruj żądania na podstawie niestandardowych tagów i metadanych
- 💰 **Strategia najniższych kosztów** — Automatycznie wybierz najtańszego dostępnego dostawcę

> 📝 Pełna specyfikacja funkcji dostępna w [**OMNI_TOKEN_342**](docs/new-features/) (217 szczegółowych specyfikacji)

---

## 👥 Współtwórcy

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Jak wnieść swój wkład

1. Forkuj repozytorium
2. Utwórz gałąź funkcji (`git checkout -b feature/amazing-feature`)
3. Zatwierdź zmiany (`git commit -m 'Add amazing feature'`)
4. Wciśnij do oddziału (`git push origin feature/amazing-feature`)
5. Otwórz żądanie ściągnięcia

Szczegółowe wytyczne można znaleźć w [CONTRIBUTING.md](CONTRIBUTING.md).

### Wydanie nowej wersji

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Historia gwiazd

## Obserwatorzy gwiazd w miarę upływu czasu

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Podziękowania

Specjalne podziękowania dla **[9router](https://github.com/decolua/9router)** autorstwa **[decolua](https://github.com/decolua)** — oryginalnego projektu, który zainspirował ten widelec. OmniRoute opiera się na tym niesamowitym fundamencie dzięki dodatkowym funkcjom, wielomodalnym interfejsom API i pełnemu przepisaniu TypeScriptu.

Specjalne podziękowania dla **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — oryginalnej implementacji Go, która zainspirowała ten port JavaScript.

---

## 📄 Licencja

Licencja MIT — szczegółowe informacje można znaleźć w [LICENSE](LICENSE).

---

<div align="center">
  <sub>Zbudowany z ❤️ dla programistów, którzy kodują 24 godziny na dobę, 7 dni w tygodniu</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- Włączono dyskusje w GitHub dla pytań i odpowiedzi społeczności -->
