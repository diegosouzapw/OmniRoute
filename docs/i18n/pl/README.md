<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — darmowa bramka AI

### Nigdy nie przestawaj kodować. Inteligentne przekierowywanie do **BEZPŁATNYCH i tanich modeli AI** z automatycznym powrotem.

_Twój uniwersalny serwer proxy API — jeden punkt końcowy, ponad 36 dostawców, zero przestojów._

**Uzupełnienia czatu • Osadzania • Generowanie obrazu • Dźwięk • Zmiana rankingu • 100% TypeScript**

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

### 🤖 Bezpłatny dostawca AI dla Twoich ulubionych agentów kodujących

_Połącz dowolne narzędzie IDE lub CLI oparte na sztucznej inteligencji poprzez OmniRoute — bezpłatną bramę API dla nieograniczonego kodowania._

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

<sub>📡 Wszyscy agenci łączą się przez <code>http://localhost:20128/v1</code> lub <code>http://cloud.omniroute.online/v1</code> — jedna konfiguracja, nieograniczona liczba modeli i limit</sub>

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
- **Oryginalny projekt**: [9router by decolua](https://github.com/decolua/9router)

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

- **Ujednolicony punkt końcowy** — pojedynczy `http://localhost:20128/v1` służy jako serwer proxy dla wszystkich ponad 36 dostawców
- **Tłumaczenie formatu** — Automatyczne i przejrzyste: OpenAI ↔ Claude ↔ Gemini ↔ API odpowiedzi
- **Odkażanie odpowiedzi** — usuwa niestandardowe pola (`x_groq`, `usage_breakdown`, `service_tier`), które psują OpenAI SDK v1.83+
- **Normalizacja ról** — Konwertuje `developer` → `system` dla dostawców innych niż OpenAI; `system` → `user` dla GLM/ERNIE
- **Pomyśl o ekstrakcji tagów** — wyodrębnia bloki `<think>` z modeli takich jak DeepSeek R1 do standardowego `reasoning_content`
- **Wyjście strukturalne dla Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatyczna konwersja
- **`stream` domyślnie to `false`** — Zgodność ze specyfikacją OpenAI, unikanie nieoczekiwanego SSE w pakietach SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. „Mój dostawca AI blokuje mój region/kraj”</b></summary>

Dostawcy tacy jak OpenAI/Codex blokują dostęp z określonych regionów geograficznych. Podczas połączeń OAuth i API użytkownicy otrzymują błędy takie jak `unsupported_country_region_territory`. Jest to szczególnie frustrujące dla programistów z krajów rozwijających się.

**Jak rozwiązuje to OmniRoute:**

- **3-poziomowa konfiguracja serwera proxy** — Konfigurowalny serwer proxy na 3 poziomach: globalny (cały ruch), na dostawcę (tylko jeden dostawca) i na połączenie/klucz
- **Oznaczone kolorami identyfikatory proxy** — Wskaźniki wizualne: 🟢 globalny serwer proxy, 🟡 serwer proxy dostawcy, 🔵 serwer proxy połączenia, zawsze pokazujący adres IP
- **Wymiana tokenów OAuth przez serwer proxy** — Przepływ OAuth przechodzi również przez serwer proxy, co rozwiązuje problem `unsupported_country_region_territory`
- **Test połączenia przez serwer proxy** — Testy połączenia wykorzystują skonfigurowany serwer proxy (koniec z bezpośrednim obejściem)
- **Obsługa SOCKS5** — Pełna obsługa proxy SOCKS5 dla routingu wychodzącego
- **Podrabianie odcisków palców TLS** — Odcisk palca TLS podobny do przeglądarki za pośrednictwem `wreq-js` w celu ominięcia wykrywania botów

</details>

<details>
<summary><b>🆓 4. „Chcę używać AI do kodowania, ale nie mam pieniędzy”</b></summary>

Nie każdy może zapłacić 20–200 USD miesięcznie za subskrypcje AI. Studenci, programiści z krajów wschodzących, hobbyści i freelancerzy potrzebują dostępu do wysokiej jakości modeli po zerowych kosztach.

**Jak rozwiązuje to OmniRoute:**

- **Wbudowani dostawcy bezpłatnych poziomów** — Natywne wsparcie dla w 100% darmowych dostawców: iFlow (8 nielimitowanych modeli), Qwen (3 nieograniczone modele), Kiro (Claude za darmo), Gemini CLI (180 tys./miesiąc za darmo)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Kombinacje dostępne wyłącznie bezpłatnie** — Łańcuch `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/miesiąc z zerowymi przestojami
- **Darmowe kredyty NVIDIA NIM** — zintegrowane 1000 darmowych kredytów
- **Strategia zoptymalizowana pod względem kosztów** — Strategia routingu, która automatycznie wybiera najtańszego dostępnego dostawcę

</details>

<details>
<summary><b>🔒 5. „Muszę chronić moją bramę AI przed nieautoryzowanym dostępem”</b></summary>

Podczas udostępniania bramy AI w sieci (LAN, VPS, Docker) każda osoba posiadająca adres może wykorzystać tokeny/przydział programisty. Bez ochrony interfejsy API są podatne na niewłaściwe użycie, natychmiastowe wstrzyknięcie i nadużycia.

**Jak rozwiązuje to OmniRoute:**

- **Zarządzanie kluczami API** — generowanie, rotacja i ustalanie zakresu dla każdego dostawcy za pomocą dedykowanej strony `/dashboard/api-manager`
- **Uprawnienia na poziomie modelu** — Ogranicz klucze API do określonych modeli (`openai/*`, wzorce symboli wieloznacznych), za pomocą przełącznika Zezwalaj na wszystko/Ogranicz
- **API Endpoint Protection** — Wymagaj klucza dla `/v1/models` i blokuj określonych dostawców na liście
- **Auth Guard + ochrona CSRF** — Wszystkie trasy panelu kontrolnego chronione oprogramowaniem pośredniczącym `withAuth` + tokenami CSRF
- **Rate Limiter** — Ograniczanie szybkości na IP z konfigurowalnymi oknami
- **Filtrowanie IP** — Lista dozwolonych/blokowanych do kontroli dostępu
- **Szybka ochrona przed wstrzyknięciem** — Oczyszczanie przed złośliwymi wzorcami podpowiedzi
- **Szyfrowanie AES-256-GCM** — Poświadczenia szyfrowane w stanie spoczynku

</details>

<details>
<summary><b>🛑 6. „Mój dostawca przestał działać i straciłem płynność kodowania”</b></summary>

Dostawcy sztucznej inteligencji mogą stać się niestabilni, zwracać błędy 5xx lub przekraczać tymczasowe limity szybkości. Jeśli programista jest zależny od jednego dostawcy, jego praca jest przerywana. Bez wyłączników automatycznych wielokrotne próby mogą spowodować awarię aplikacji.

**Jak rozwiązuje to OmniRoute:**

- **Wyłącznik automatyczny na dostawcę** — Automatyczne otwieranie/zamykanie z konfigurowalnymi progami i czasem schładzania (zamknięty/otwarty/półotwarty)
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
- **Jeden punkt końcowy, wszystkie modele** — Skonfiguruj `http://localhost:20128/v1` raz, uzyskaj dostęp do ponad 36 dostawców

</details>

<details>
<summary><b>🔑 8. „Zarządzanie tokenami OAuth od wielu dostawców to piekło”</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — wszystkie korzystają z OAuth 2.0 z wygasającymi tokenami. Programiści muszą stale przeprowadzać ponowne uwierzytelnianie, radzić sobie z `client_secret is missing`, `redirect_uri_mismatch` i awariami na zdalnych serwerach. Szczególnie problematyczny jest protokół OAuth w sieci LAN/VPS.

**Jak rozwiązuje to OmniRoute:**

- **Automatyczne odświeżanie tokenu** — tokeny OAuth odświeżają się w tle przed wygaśnięciem
- **Wbudowany OAuth 2.0 (PKCE)** — Automatyczny przepływ dla Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Wielokontowy OAuth** — wiele kont na dostawcę poprzez ekstrakcję tokenów JWT/ID
- **OAuth LAN/remote fix** — wykrywanie prywatnego adresu IP dla `redirect_uri` + ręczny tryb adresu URL dla serwerów zdalnych
- **OAuth Behind Nginx** — wykorzystuje `window.location.origin` w celu zapewnienia zgodności z odwrotnym proxy
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

Gdy połączenie nie powiedzie się, programista nie wie, czy był to limit szybkości, wygasły token, nieprawidłowy format czy błąd dostawcy. Fragmentowane dzienniki na różnych terminalach. Bez obserwowalności debugowanie odbywa się metodą prób i błędów.

**Jak rozwiązuje to OmniRoute:**

- **Ujednolicony pulpit nawigacyjny** — 4 karty: Dzienniki żądań, Dzienniki proxy, Dzienniki audytu, Konsola
- **Przeglądarka logów w konsoli** — Przeglądarka działająca w stylu terminala w czasie rzeczywistym z poziomami oznaczonymi kolorami, automatycznym przewijaniem, wyszukiwaniem i filtrowaniem
- **Dzienniki proxy SQLite** — trwałe dzienniki, które przetrwają ponowne uruchomienie serwera
- **Plac zabaw dla tłumaczy** — 4 tryby debugowania: Plac zabaw (tłumaczenie formatu), Tester czatu (w obie strony), Stanowisko testowe (wsadowe), Monitor na żywo (w czasie rzeczywistym)
- **Żądanie telemetrii** — opóźnienie p50/p95/p99 + śledzenie identyfikatora X-Request-Id
- **Logowanie oparte na plikach z rotacją** — Przechwytywacz konsoli przechwytuje wszystko do dziennika JSON z rotacją na podstawie rozmiaru

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
<summary><b>🔄 13. „Potrzebuję czegoś więcej niż czatu — potrzebuję osadzania, obrazów i dźwięku”</b></summary>

Sztuczna inteligencja to nie tylko ukończenie czatu. Twórcy muszą generować obrazy, transkrybować dźwięk, tworzyć osadzania dla RAG, zmieniać rangę dokumentów i moderować treści. Każdy interfejs API ma inny punkt końcowy i format.

**Jak rozwiązuje to OmniRoute:**

- **Osadzania** — `/v1/embeddings` z 6 dostawcami i ponad 9 modelami
- **Generowanie obrazu** — `/v1/images/generations` z 10 dostawcami i ponad 20 modelami (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst na wideo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) i SD WebUI
- **Tekst na muzykę** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Transkrypcja audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Zamiana tekstu na mowę** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + obecni dostawcy
- **Moderacje** — `/v1/moderations` — Sprawdzanie bezpieczeństwa treści
- **Reranking** — `/v1/rerank` — Zmiana rankingu trafności dokumentu
- **Responses API** — Pełna obsługa `/v1/responses` dla Codexu

</details>

<details>
<summary><b>🧪 14. „Nie mam możliwości przetestowania i porównania jakości pomiędzy modelami”</b></summary>

Programiści chcą wiedzieć, który model jest najlepszy dla ich przypadku użycia — kodu, tłumaczenia, rozumowania — ale ręczne porównywanie jest powolne. Nie istnieją żadne zintegrowane narzędzia eval.

**Jak rozwiązuje to OmniRoute:**

- **Oceny LLM** — Testowanie złotego zestawu z 10 fabrycznie załadowanymi skrzynkami obejmującymi pozdrowienia, matematykę, geografię, generowanie kodu, zgodność z JSON, tłumaczenie, przeceny, odmowy ze względów bezpieczeństwa
- **4 strategie dopasowania** — `exact`, `contains`, `regex`, `custom` (funkcja JS)
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
- **Wildcard Router** — wzorce `provider/*` są przesyłane dynamicznie do dowolnego dostawcy
- **Przełączanie kombinacji włącz/wyłącz** — przełączaj kombinacje bezpośrednio z pulpitu nawigacyjnego
- **Przełączanie dostawcy** — Włącz/wyłącz wszystkie połączenia dla dostawcy jednym kliknięciem
- **Zablokowani dostawcy** — Wyklucz określonych dostawców z listy `/v1/models`

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
<summary><b>🧠 18. „Potrzebuję orkiestracji A2A ze ścieżkami zadań synchronizacji i strumieniowania”</b></summary>

Przepływy pracy agentów wymagają zarówno bezpośrednich odpowiedzi, jak i długotrwałego wykonywania strumieniowego z kontrolą cyklu życia.

**Jak rozwiązuje to OmniRoute:**

- Punkt końcowy A2A JSON-RPC (`POST /a2a`) z `message/send` i `message/stream`
- Przesyłanie strumieniowe SSE z propagacją stanu terminala
  — Interfejsy API cyklu życia zadań dla `tasks/get` i `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Potrzebuję prawdziwego stanu procesu MCP, a nie zgadniętego statusu”</b></summary>

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

- Wspierane przez SQLite rejestrowanie audytu dla wywołań narzędzi MCP
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

- Karta agenta ujawniona pod adresem `/.well-known/agent.json`
- Możliwości i umiejętności pokazane w interfejsie zarządzania
- Interfejs API stanu A2A zawiera metadane wykrywania do automatyzacji

</details>

<details>
<summary><b>🧭 26. „Potrzebuję możliwości wykrycia protokołu w UX produktu”</b></summary>

Jeśli użytkownicy nie mogą odkryć powierzchni protokołu, spada jakość przyjęcia i wsparcia.

**Jak rozwiązuje to OmniRoute:**

- Wpisy na pasku bocznym dla MCP i A2A
- Strona punktu końcowego, zakładka Protokoły z szybkim startem i statusem
- Linki z przeglądu do dedykowanych pulpitów zarządzania

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
<summary><b>📡 28. „Potrzebuję ujednoliconej obserwowalności na wszystkich interfejsach”</b></summary>

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
<summary><b>🚀 30. „Muszę dostarczać agentowe przepływy pracy bez konieczności rozrzucania kodu kleju”</b></summary>

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Szybki start

**1. Zainstaluj globalnie:**

```bash
npm install -g omniroute
omniroute
```

🎉 Panel otwiera się o `http://localhost:20128`

| Polecenie               | Opis                                    |
| ----------------------- | --------------------------------------- |
| `omniroute`             | Uruchom serwer (domyślny port 20128)    |
| `omniroute --port 3000` | Użyj niestandardowego portu             |
| `omniroute --no-open`   | Nie otwieraj automatycznie przeglądarki |
| `omniroute --help`      | Pokaż pomoc                             |

**2. Połącz się z DARMOWYM dostawcą:**

Panel kontrolny → Dostawcy → Połącz **Kod Claude** lub **Antygrawitacja** → Logowanie OAuth → Gotowe!

**3. Użyj w swoim narzędziu CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**To wszystko!** Zacznij kodować za pomocą DARMOWYCH modeli AI.

**Alternatywa — uruchamiana ze źródła:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
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

**Korzystanie z funkcji Docker Compose:**

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

## 💰 Ceny w skrócie

| Poziom             | Dostawca            | Koszt                         | Reset przydziału              | Najlepsze dla                    |
| ------------------ | ------------------- | ----------------------------- | ----------------------------- | -------------------------------- |
| **💳 SUBSKRYPCJA** | Claude Code (Pro)   | 20 USD/mies.                  | 5h + tygodniowo               | Już subskrybujesz                |
|                    | Kodeks (Plus/Pro)   | 20-200 $/mies.                | 5h + tygodniowo               | Użytkownicy OpenAI               |
|                    | Bliźnięta CLI       | **BEZPŁATNE**                 | 180 tys./mies. + 1 tys./dzień | Wszyscy!                         |
|                    | Drugi pilot GitHuba | 10–19 USD/mies.               | Miesięczne                    | Użytkownicy GitHuba              |
| **🔑 KLUCZ API**   | NVIDIA NIM          | **BEZPŁATNE** (1000 kredytów) | Jednorazowe                   | Bezpłatne testowanie poziomów    |
|                    | DeepSeek            | Płatność za użycie            | Brak                          | Najlepsza cena/jakość            |
|                    | Groq                | Poziom bezpłatny + płatny     | Stawka ograniczona            | Ultraszybkie wnioskowanie        |
|                    | xAI (Grok)          | Płatność za użycie            | Brak                          | Modele Groka                     |
|                    | Mistral             | Poziom bezpłatny + płatny     | Stawka ograniczona            | Europejska sztuczna inteligencja |
|                    | OtwórzRouter        | Płatność za użycie            | Brak                          | Ponad 100 modeli                 |
| **💰 TANIO**       | GLM-4.7             | 0,6 USD/1 mln                 | Codziennie 10:00              | Kopia zapasowa budżetu           |
|                    | MiniMax M2.1        | 0,2 USD/1 mln                 | 5-godzinne toczenie           | Najtańsza opcja                  |
|                    | Kimi K2             | 9 USD miesięcznie             | 10 mln tokenów/mies.          | Przewidywalny koszt              |
| **🆓 DARMOWE**     | iFlow               | 0 dolarów                     | Nieograniczony                | 8 modeli za darmo                |
|                    | Qwen                | 0 dolarów                     | Nieograniczony                | 3 modele za darmo                |
|                    | Kiro                | 0 dolarów                     | Nieograniczony                | Claude wolny                     |

**💡 Wskazówka dla profesjonalistów:** Zacznij od zestawu Gemini CLI (180 tys. za darmo/miesiąc) + iFlow (bez ograniczeń za darmo) = koszt 0 USD!

---

## 💡 Kluczowe funkcje

### 🧠 Routing i inteligencja rdzenia

| Funkcja                                        | Co to robi                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 🎯 **Inteligentny 4-poziomowy powrót**         | Auto-trasa: Subskrypcja → Klucz API → Tanie → Bezpłatne                                                          |
| 📊 **Śledzenie limitów w czasie rzeczywistym** | Liczba tokenów na żywo + odliczanie resetowania dla każdego dostawcy                                             |
| 🔄 **Tłumaczenie formatu**                     | OpenAI ↔ Claude ↔ Bliźnięta ↔ Kursor ↔ Kiro bezproblemowo + oczyszczanie odpowiedzi                              |
| 👥 **Obsługa wielu kont**                      | Wiele kont na dostawcę z inteligentnym wyborem                                                                   |
| 🔄 **Automatyczne odświeżanie tokena**         | Tokeny OAuth odświeżają się automatycznie przy ponownej próbie                                                   |
| 🎨 **Niestandardowe kombinacje**               | 6 strategii: najpierw wypełnij, okrężnie, p2c, losowa, najrzadziej używana, zoptymalizowana pod względem kosztów |
| 🧩 **Modele niestandardowe**                   | Dodaj dowolny identyfikator modelu do dowolnego dostawcy                                                         |
| 🌐 **Router z dziką kartą**                    | Dynamicznie kieruj `provider/*` wzorce do dowolnego dostawcy                                                     |
| 🧠 **Myślący budżet**                          | Tryby przekazywania, automatyczne, niestandardowe i adaptacyjne dla modeli wnioskowania                          |
| 🔀 **Model Aliases**                           | Auto-forward deprecated model IDs to current replacements (built-in + custom)                                    |
| ⚡ **Background Degradation**                  | Auto-route background tasks (titles, summaries) to cheaper models                                                |
| 💬 **Wstrzyknięcie monitu systemowego**        | Globalny monit systemowy stosowany do wszystkich żądań                                                           |
| 📄 **API odpowiedzi**                          | Pełna obsługa OpenAI Responses API (`/v1/responses`) dla Codexu                                                  |

### 🎵 Wielomodalne interfejsy API

| Funkcja                       | Co to robi                                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generowanie obrazu**     | `/v1/images/generations` — 4 dostawców, ponad 9 modeli                                                                                                                     |
| 📐 **Osadzenia**              | `/v1/embeddings` — 6 dostawców, ponad 9 modeli                                                                                                                             |
| 🎤 **Transkrypcja audio**     | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Zamiana tekstu na mowę** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderacje**              | `/v1/moderations` — Kontrola bezpieczeństwa treści                                                                                                                         |
| 🔀 **Ponowna pozycja**        | `/v1/rerank` — Zmiana rankingu trafności dokumentu                                                                                                                         |

### 🛡️ Odporność i bezpieczeństwo

| Funkcja                                       | Co to robi                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🔌 **Wyłącznik**                              | Automatyczne otwieranie/zamykanie dla każdego dostawcy z konfigurowalnymi progami           |
| 🛡️ **Stado Przeciw Gromom**                   | Mutex + limit szybkości semaforów dla dostawców kluczy API                                  |
| 🧠 **Pamięć podręczna semantyczna**           | Dwuwarstwowa pamięć podręczna (podpis + semantyka) zmniejsza koszty i opóźnienia            |
| ⚡ **Poproś o idempotencję**                  | Okno deduplikacji 5s dla zduplikowanych żądań                                               |
| 🔒 **Podrabianie odcisków palców TLS**        | Pomiń wykrywanie botów opartych na TLS poprzez wreq-js                                      |
| 🌐 **Filtrowanie IP**                         | Lista dozwolonych/blokowanych dla kontroli dostępu API                                      |
| 📊 **Edytowalne limity stawek**               | Konfigurowalne obroty, minimalna przerwa i maksymalna równowaga na poziomie systemu         |
| 💾 **Rate Limit Persistence**                 | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness                |
| 🔄 **Token Refresh Resilience**               | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                      |
| 🛡 **Ochrona punktu końcowego API**           | Bramkowanie uwierzytelniania + blokowanie dostawcy dla punktu końcowego `/models`           |
| 🔒 **Widoczność proxy**                       | Oznaczone kolorami plakietki: 🟢 globalny, 🟡 dostawca, 🔵 na połączenie z wyświetlaczem IP |
| 🌐 **3-poziomowa konfiguracja serwera proxy** | Skonfiguruj serwery proxy na poziomie globalnym, dla dostawcy lub dla połączenia            |

### 📊 Obserwacja i analityka

| Funkcja                                | Co to robi                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 📝 **Poproś o zalogowanie**            | Tryb debugowania z pełnymi dziennikami żądań/odpowiedzi                                                                   |
| 💾 **Dzienniki proxy SQLite**          | Trwałe dzienniki proxy przetrwają ponowne uruchomienie serwera                                                            |
| 📊 **Panel analityczny**               | Oparte na Recharts: karty statystyk, wykres wykorzystania modelu, tabela dostawców                                        |
| 📈 **Śledzenie postępów**              | Zapisz się na wydarzenia postępu SSE dla transmisji strumieniowej                                                         |
| 🧪 **Oceny LLM**                       | Testowanie złotego seta z 4 strategiami meczowymi                                                                         |
| 🔍 **Poproś o telemetrię**             | Agregacja opóźnień p50/p95/p99 + śledzenie X-Request-Id                                                                   |
| 📋 **Panel logów**                     | Ujednolicona strona z czterema zakładkami: Dzienniki żądań, Dzienniki proxy, Dzienniki audytu, Konsola                    |
| 🖥️ **Przeglądarka logów konsoli**      | Przeglądarka przypominająca terminal w czasie rzeczywistym z filtrem poziomów, wyszukiwaniem i automatycznym przewijaniem |
| 📑 **Rejestrowanie oparte na plikach** | Przechwytywacz konsoli przechwytuje wszystkie dane wyjściowe do pliku dziennika JSON z rotacją                            |
| 🏥 **Panel zdrowia**                   | Czas pracy systemu, stany wyłączników, blokady, statystyki pamięci podręcznej                                             |
| 💰 **Śledzenie kosztów**               | Zarządzanie budżetem + konfiguracja cen dla poszczególnych modeli                                                         |

### ☁️ Wdrożenie i synchronizacja

| Funkcja                              | Co to robi                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 💾 **Synchronizacja z chmurą**       | Synchronizuj konfigurację między urządzeniami za pośrednictwem Cloudflare Workers                       |
| 🌐 **Wdrażaj gdziekolwiek**          | Localhost, VPS, Docker, Pracownicy Cloudflare                                                           |
| 🔑 **Zarządzanie kluczami API**      | Generuj, obracaj i ustalaj zakres kluczy API dla każdego dostawcy                                       |
| 🧙 **Kreator wdrażania**             | Konfiguracja z przewodnikiem w 4 krokach dla początkujących użytkowników                                |
| 🔧 **Panel narzędzi CLI**            | Jednym kliknięciem skonfiguruj Claude, Codex, Cline, OpenClaw, Kilo, Antigravity                        |
| 🔄 **Kopie zapasowe DB**             | Automatyczne tworzenie kopii zapasowych, przywracanie, eksportowanie i importowanie wszystkich ustawień |
| 🌐 **Internacjonalizacja**           | Pełny i18n z next-intl — obsługa języka angielskiego i portugalskiego (Brazylia)                        |
| 🌍 **Wybór języka**                  | Ikona kuli ziemskiej w nagłówku umożliwiająca zmianę języka w czasie rzeczywistym (🇺🇸/🇧🇷)               |
| 📂 **Niestandardowy katalog danych** | `DATA_DIR` env var, aby zastąpić domyślną ścieżkę przechowywania `~/.omniroute`                         |

<details>
<summary><b>📖 Szczegóły funkcji</b></summary>

### 🎯 Inteligentny 4-poziomowy powrót awaryjny

Twórz kombinacje z automatycznym cofaniem:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Śledzenie limitów w czasie rzeczywistym

- Zużycie tokenów na dostawcę
- Zresetuj odliczanie (5-godzinne, dzienne, tygodniowe)
- Szacowanie kosztów dla płatnych poziomów
- Miesięczne raporty wydatków

### 🔄 Tłumaczenie formatu

Płynne tłumaczenie pomiędzy formatami:

- **OpenAI** ↔ **Claude** ↔ **Bliźnięta** ↔ **Odpowiedzi OpenAI**
- Twoje narzędzie CLI wysyła format OpenAI → OmniRoute tłumaczy → Dostawca otrzymuje format natywny
- Działa z każdym narzędziem obsługującym niestandardowe punkty końcowe OpenAI
- **Oczyszczanie odpowiedzi** — Usuwa niestandardowe pola w celu zapewnienia ścisłej zgodności z OpenAI SDK
- **Normalizacja ról** — `developer` → `system` dla innych niż OpenAI; `system` → `user` dla modeli GLM/ERNIE
- **Pomyśl o ekstrakcji tagów** — `<think>` bloki → `reasoning_content` dla modeli myślących
- **Ustrukturyzowane dane wyjściowe** — `json_schema` → Gemini `responseMimeType`/`responseSchema`

### 👥 Obsługa wielu kont

- Dodaj wiele kont na dostawcę
- Automatyczne routing okrężny lub oparty na priorytetach
- Powrót do następnego konta, gdy jedno osiągnie limit

### 🔄 Automatyczne odświeżanie tokena

- Tokeny OAuth są automatycznie odświeżane przed wygaśnięciem
- Nie ma potrzeby ręcznego ponownego uwierzytelniania
- Jednolite doświadczenie u wszystkich dostawców

### 🎨 Niestandardowe kombinacje

- Twórz nieograniczone kombinacje modeli
- 6 strategii: najpierw wypełnij, okrężnie, siła dwóch wyborów, losowa, najrzadziej używana, zoptymalizowana pod względem kosztów
- Udostępniaj kombinacje na różnych urządzeniach dzięki Cloud Sync

### 🏥 Panel zdrowia

- Stan systemu (czas działania, wersja, wykorzystanie pamięci)
- Stany wyłączników według dostawcy (zamknięty/otwarty/półotwarty)
- Stan limitu szybkości i aktywne blokady
- Statystyki pamięci podręcznej podpisów
- Telemetria opóźnień (p50/p95/p99) + pamięć podręczna podpowiedzi
- Zresetuj stan zdrowia jednym kliknięciem

### 🔧 Plac zabaw dla tłumaczy

OmniRoute zawiera potężny, wbudowany plac zabaw dla tłumaczy z **4 trybami** do debugowania, testowania i monitorowania tłumaczeń API:

| Tryb                         | Opis                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Plac zabaw**            | Bezpośrednie tłumaczenie formatu — wklej dowolną treść żądania API i od razu zobacz, jak OmniRoute tłumaczy ją pomiędzy formatami dostawców (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Zawiera przykładowe szablony i automatyczne wykrywanie formatu. |
| **💬 Tester czatu**          | Wysyłaj prawdziwe prośby o czat za pośrednictwem OmniRoute i zobacz pełny przebieg: Twoje dane wejściowe, przetłumaczone żądanie, odpowiedź dostawcy i przetłumaczona odpowiedź z powrotem. Nieocenione przy sprawdzaniu routingu combo.                |
| **🧪 Stanowisko testowe**    | Tryb testowania wsadowego — zdefiniuj wiele przypadków testowych z różnymi danymi wejściowymi i oczekiwanymi wynikami, uruchom je wszystkie na raz i porównaj wyniki u różnych dostawców i modeli.                                                      |
| **📱 Monitorowanie na żywo** | Monitorowanie żądań w czasie rzeczywistym — obserwuj przychodzące żądania przepływające przez OmniRoute, obserwuj na żywo tłumaczenia formatów i natychmiast identyfikuj problemy.                                                                      |

**Dostęp:** Panel → Tłumacz (pasek boczny)

### 💾 Synchronizacja z chmurą

- Synchronizuj dostawców, kombinacje i ustawienia na różnych urządzeniach
- Automatyczna synchronizacja w tle
- Bezpieczne szyfrowane przechowywanie

</details>

## 🧪 Oceny (Ewaluacje)

OmniRoute zawiera wbudowaną platformę ewaluacyjną do testowania jakości odpowiedzi LLM na podstawie złotego zestawu. Uzyskaj do niego dostęp poprzez **Analytics → Evals** na pulpicie nawigacyjnym.

### Wbudowany złoty zestaw

Fabrycznie załadowany „Złoty zestaw OmniRoute” zawiera 10 przypadków testowych obejmujących:

- Pozdrowienia, matematyka, geografia, generowanie kodu
- Zgodność z formatem JSON, tłumaczenie, przecena
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

### NVIDIA NIM (DARMOWE 1000 kredytów!)

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

### iFlow (8 DARMOWYCH modeli)

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

### Qwen (3 DARMOWE modele)

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
<summary><b>🎨 Utwórz kombinacje</b></summary>

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

** Panel otwiera się na złym porcie **

- Ustaw `PORT=20128` i `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

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

### 🔐 OAuth na serwerze zdalnym (zdalna konfiguracja OAuth)

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ WAŻNE dla zwykłych usług OmniRoute w VPS/Docker/serwidor zdalny**

#### OAuth

Sprawdzone **Antigravity** i **Gemini CLI** używane **Google OAuth 2.0** dla autentyczności. O Google, jeśli potrzebujesz `redirect_uri`, aby nie zmieniać protokołu OAuth seja **exatamente** uma das URI pre-cadastradas no Google Cloud Console to aplicativo.

Jako uwierzytelnienie OAuth zostało wydane przez OmniRoute w cadastradas **apenas dla `localhost`**. Możesz uzyskać dostęp do OmniRoute na serwerze zdalnym (np.: `https://omniroute.meuservidor.com`), lub Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Rozwiązanie: Skonfiguruj suas próprias credenciais OAuth

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

### Obejście tymczasowe (sem configurar credenciais prróprias)

Jeśli chcesz uzyskać dostęp do **podręcznika URL**:

1. OmniRoute abrirá adres URL autoryzacji w Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Skopiuj kompletny adres URL** da barra de endereço do seu przeglądarki (wiadomość que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kliknij je **„Połącz”**

> To obejście funkcji porque o kodigo de autorização na URL é válido niezależny do przekierowania ter carregado ou não.

</details>

---

## 🛠️

- **Środowisko wykonawcze**: Node.js 18–22 LTS (⚠️ Node.js 24+ jest **nieobsługiwany** — `better-sqlite3` natywne pliki binarne są niekompatybilne)
- **Język**: TypeScript 5.9 — **100% TypeScript** w `src/` i `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Baza danych**: LowDB (JSON) + SQLite (stan domeny + logi proxy)
- **Streaming**: zdarzenia wysyłane przez serwer (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + klucze API
- **Testowanie**: Uruchomienie testu Node.js (ponad 368 testów jednostkowych)
- **CI/CD**: Akcje GitHub (automatyczne publikowanie npm + Docker Hub w momencie wydania)
- **Strona internetowa**: [omniroute.online](https://omniroute.online)
- **Pakiet**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Doker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odporność**: wyłącznik automatyczny, wykładnicze wycofywanie, stado przeciwgrzmotowe, fałszowanie TLS

---

## 📖 Dokumentacja

| Dokument                                     | Opis                                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Dostawcy, kombinacje, integracja CLI, wdrożenie             |
| [API Reference](docs/API_REFERENCE.md)       | Wszystkie punkty końcowe z przykładami                      |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Typowe problemy i rozwiązania                               |
| [Architecture](docs/ARCHITECTURE.md)         | Architektura systemu i elementy wewnętrzne                  |
| [Contributing](CONTRIBUTING.md)              | Konfiguracja i wytyczne dotyczące programowania             |
| [OpenAPI Spec](docs/openapi.yaml)            | Specyfikacja OpenAPI 3.0                                    |
| [Security Policy](SECURITY.md)               | Zgłaszanie luk w zabezpieczeniach i praktyki bezpieczeństwa |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Kompletny przewodnik: konfiguracja VM + nginx + Cloudflare  |
| [Features Gallery](docs/FEATURES.md)         | Wizualna wycieczka po panelu ze zrzutami ekranu             |

### 📸 Podgląd panelu

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
| **Punkt końcowy**         | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute ma **ponad 210 funkcji zaplanowanych** w wielu fazach rozwoju. Oto kluczowe obszary:

| Kategoria                        | Planowane funkcje                                      | Najważniejsze                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎯 **Endpoint-Aware Models**     | Custom models declare supported endpoints + API format |
| 🧠 **Routing i inteligencja**    | 25+                                                    | Routing z najmniejszym opóźnieniem, routing oparty na tagach, wstępna inspekcja przydziału, wybór konta P2C                                        |
| 🔒 **Bezpieczeństwo i zgodność** | 20+                                                    | Wzmocnienie SSRF, maskowanie poświadczeń, limit szybkości na punkt końcowy, zakres kluczy zarządzania                                              |
| 📊 **Obserwowalność**            | 15+                                                    | Integracja OpenTelemetry, monitorowanie kwot w czasie rzeczywistym, śledzenie kosztów według modelu                                                |
| 🔄 **Integracja dostawców**      | 20+                                                    | Rejestr modeli dynamicznych, czasy odnowienia dostawcy, Kodeks dla wielu kont, analiza przydziału Copilot                                          |
| ⚡ **Wydajność**                 | 15+                                                    | Podwójna warstwa pamięci podręcznej, pamięć podręczna podpowiedzi, pamięć podręczna odpowiedzi, utrzymywanie transmisji strumieniowej, wsadowe API |
| 🌐 **Ekosystem**                 | 10+                                                    | WebSocket API, ładowanie konfiguracji na gorąco, rozproszony magazyn konfiguracji, tryb komercyjny                                                 |

### 🔜 Już wkrótce

- 🔗 **Integracja OpenCode** — natywna obsługa dostawców dla IDE kodowania OpenCode AI
- 🔗 **Integracja z TRAE** — Pełne wsparcie dla platformy rozwojowej TRAE AI
- 📦 **Batch API** — Asynchroniczne przetwarzanie wsadowe dla żądań masowych
- 🎯 **Routing oparty na tagach** — Kieruj żądania na podstawie niestandardowych tagów i metadanych
- 💰 **Strategia najniższych kosztów** — Automatycznie wybierz najtańszego dostępnego dostawcę

> 📝 Pełna specyfikacja funkcji dostępna w [link](docs/new-features/) (217 szczegółowych specyfikacji)

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
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Historia gwiazd

## Stargazers over time

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
