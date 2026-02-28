# Podręcznik użytkownika

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Kompletny przewodnik dotyczący konfigurowania dostawców, tworzenia kombinacji, integracji narzędzi CLI i wdrażania OmniRoute.

---

## Spis treści

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Ceny w skrócie

| Poziom             | Dostawca            | Koszt             | Reset przydziału              | Najlepsze dla             |
| ------------------ | ------------------- | ----------------- | ----------------------------- | ------------------------- |
| **💳 SUBSKRYPCJA** | Claude Code (Pro)   | 20 USD/mies.      | 5h + tygodniowo               | Już subskrybujesz         |
|                    | Kodeks (Plus/Pro)   | 20-200 $/mies.    | 5h + tygodniowo               | Użytkownicy OpenAI        |
|                    | Bliźnięta CLI       | **BEZPŁATNE**     | 180 tys./mies. + 1 tys./dzień | Wszyscy!                  |
|                    | Drugi pilot GitHuba | 10–19 USD/mies.   | Miesięczne                    | Użytkownicy GitHuba       |
| **🔑 KLUCZ API**   | DeepSeek            | Płać za użycie    | Brak                          | Tanie rozumowanie         |
|                    | Groq                | Płać za użycie    | Brak                          | Ultraszybkie wnioskowanie |
|                    | xAI (Grok)          | Płać za użycie    | Brak                          | Grok 4 rozumowanie        |
|                    | Mistral             | Płać za użycie    | Brak                          | Modele hostowane w UE     |
|                    | Zakłopotanie        | Płać za użycie    | Brak                          | Rozszerzone wyszukiwanie  |
|                    | Razem AI            | Płać za użycie    | Brak                          | Modele open source        |
|                    | Fajerwerki AI       | Płać za użycie    | Brak                          | Obrazy Fast FLUX          |
|                    | Cerebra             | Płać za użycie    | Brak                          | Prędkość w skali opłatka  |
|                    | Spójne              | Płać za użycie    | Brak                          | Polecenie R+RAG           |
|                    | NVIDIA NIM          | Płać za użycie    | Brak                          | Modele korporacyjne       |
| **💰 TANIO**       | GLM-4.7             | 0,6 USD/1 mln     | Codziennie 10:00              | Kopia zapasowa budżetu    |
|                    | MiniMax M2.1        | 0,2 USD/1 mln     | 5-godzinne toczenie           | Najtańsza opcja           |
|                    | Kimi K2             | 9 USD miesięcznie | 10 mln tokenów/mies.          | Przewidywalny koszt       |
| **🆓 DARMOWE**     | iFlow               | 0 dolarów         | Nieograniczony                | 8 modeli za darmo         |
|                    | Qwen                | 0 dolarów         | Nieograniczony                | 3 modele za darmo         |
|                    | Kiro                | 0 dolarów         | Nieograniczony                | Claude wolny              |

**💡 Wskazówka dla profesjonalistów:** Zacznij od zestawu Gemini CLI (180 tys. za darmo/miesiąc) + iFlow (bez ograniczeń za darmo) = koszt 0 USD!

---

## 🎯 Przypadki użycia

### Przypadek 1: „Mam subskrypcję Claude Pro”

**Problem:** Limit wygasa niewykorzystany, limity szybkości podczas intensywnego kodowania

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Przypadek 2: „Chcę zerowych kosztów”

**Problem:** Nie stać Cię na subskrypcje, potrzebujesz niezawodnego kodowania AI

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Przypadek 3: „Potrzebuję kodowania 24 godziny na dobę, 7 dni w tygodniu, bez przerw”

**Problem:** Terminy, nie mogę sobie pozwolić na przestoje

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Przypadek 4: „Chcę DARMOWEJ sztucznej inteligencji w OpenClaw”

**Problem:** Potrzebujesz asystenta AI w aplikacjach do przesyłania wiadomości, całkowicie za darmo

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Konfiguracja dostawcy

### 🔐 Dostawcy subskrypcji

#### Kod Claude’a (Pro/Max)

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

#### Kodeks OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (DARMOWE 180 tys./miesiąc!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Najlepsza wartość:** Ogromny darmowy poziom! Użyj tego przed płatnymi poziomami.

#### Drugi pilot GitHuba

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Tani dostawcy

#### GLM-4.7 (reset dzienny, 0,6 USD/1 mln)

1. Zarejestruj się: [Zhipu AI](https://open.bigmodel.cn/)
2. Uzyskaj klucz API z planu kodowania
3. Panel → Dodaj klucz API: Dostawca: `glm`, Klucz API: `your-key`

**Zastosuj:** `glm/glm-4.7` — **Wskazówka dla profesjonalistów:** Plan kodowania oferuje 3× limit przy cenie 1/7! Resetuj codziennie o 10:00.

#### MiniMax M2.1 (reset 5 godz., 0,20 USD/1 mln)

1. Zarejestruj się: [MiniMax](https://www.minimax.io/)
2. Uzyskaj klucz API → Panel kontrolny → Dodaj klucz API

**Użyj:** `minimax/MiniMax-M2.1` — **Wskazówka:** Najtańsza opcja dla długiego kontekstu (1 mln tokenów)!

#### Kimi K2 (9 USD miesięcznie)

1. Subskrybuj: [Moonshot AI](https://platform.moonshot.ai/)
2. Uzyskaj klucz API → Panel kontrolny → Dodaj klucz API

**Zastosowanie:** `kimi/kimi-latest` — **Wskazówka dla profesjonalistów:** Stałe 9 USD/miesiąc za 10 mln tokenów = efektywny koszt 0,90 USD/1 mln!

### 🆓 DARMOWE Dostawcy

#### iFlow (8 DARMOWYCH modeli)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 DARMOWE modele)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude ZA DARMO)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombinacje

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

---

## 🔧 Integracja z CLI

### IDE kursora

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Kod Claude’a

Edytuj `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Interfejs wiersza polecenia Kodeksu

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Edytuj `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Lub użyj Dashboardu:** Narzędzia CLI → OpenClaw → Auto-config

### Kliknij / Kontynuuj / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Wdrożenie

### Wdrożenie VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Doker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Informacje na temat trybu zintegrowanego z hostem i plików binarnych CLI można znaleźć w sekcji Docker w głównych dokumentach.

### Zmienne środowiskowe

| Zmienna               | Domyślne                             | Opis                                                                    |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Tajemnica podpisania JWT (**zmiana w produkcji**)                       |
| `INITIAL_PASSWORD`    | `123456`                             | Hasło pierwszego logowania                                              |
| `DATA_DIR`            | `~/.omniroute`                       | Katalog danych (db, wykorzystanie, logi)                                |
| `PORT`                | domyślne ramy                        | Port serwisowy (w przykładach `20128`)                                  |
| `HOSTNAME`            | domyślne ramy                        | Powiąż hosta (domyślnie Docker to `0.0.0.0`)                            |
| `NODE_ENV`            | domyślne środowisko wykonawcze       | Ustaw `production` dla wdrożenia                                        |
| `BASE_URL`            | `http://localhost:20128`             | Wewnętrzny podstawowy adres URL po stronie serwera                      |
| `CLOUD_URL`           | `https://omniroute.dev`              | Podstawowy adres URL punktu końcowego synchronizacji w chmurze          |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Sekret HMAC dla wygenerowanych kluczy API                               |
| `REQUIRE_API_KEY`     | `false`                              | Wymuś klucz API nośnika na `/v1/*`                                      |
| `ENABLE_REQUEST_LOGS` | `false`                              | Włącza dzienniki żądań/odpowiedzi                                       |
| `AUTH_COOKIE_SECURE`  | `false`                              | Wymuś plik cookie uwierzytelniający `Secure` (za odwrotnym proxy HTTPS) |

Aby zapoznać się z pełnym odwołaniem do zmiennej środowiskowej, zobacz [README](../README.md).

---

## 📊 Dostępne modele

<details>
<summary><b>Wyświetl wszystkie dostępne modele</b></summary>

**Kod Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Kodeks (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — BEZPŁATNE: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Kopilot GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 USD/1 mln: `glm/glm-4.7`

**MiniMax (`minimax/`)** — 0,2 USD/1 mln: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — BEZPŁATNIE: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — BEZPŁATNIE: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — ZA DARMO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Zakłopotanie (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Wspólna AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

** Sztuczna inteligencja fajerwerków (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Mózgi (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Spójność (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Zaawansowane funkcje

### Modele niestandardowe

Dodaj dowolny identyfikator modelu do dowolnego dostawcy, nie czekając na aktualizację aplikacji:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Lub użyj Panelu: **Dostawcy → [Dostawca] → Modele niestandardowe**.

### Dedykowane trasy dostawców

Kieruj żądania bezpośrednio do konkretnego dostawcy z walidacją modelu:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Prefiks dostawcy jest dodawany automatycznie, jeśli go brakuje. Niedopasowane modele zwracają `400`.

### Konfiguracja serwera proxy sieci

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Pierwszeństwo:** specyficzne dla klucza → specyficzne dla kombinacji → specyficzne dla dostawcy → globalne → środowisko.

### API katalogu modeli

```bash
curl http://localhost:20128/api/models/catalog
```

Zwraca modele pogrupowane według dostawcy z typami (`chat`, `embedding`, `image`).

### Synchronizacja z chmurą

- Synchronizuj dostawców, kombinacje i ustawienia na różnych urządzeniach
- Automatyczna synchronizacja w tle z limitem czasu + szybka awaria
- Preferuj po stronie serwera `BASE_URL`/`CLOUD_URL` w produkcji

### Inteligencja bramy LLM (faza 9)

- **Semantyczna pamięć podręczna** — automatycznie buforuje dane niestrumieniowe, temperatura = 0 odpowiedzi (pomiń za pomocą `X-OmniRoute-No-Cache: true`)
- **Idempotencja żądania** — Deduplikuje żądania w ciągu 5 sekund za pośrednictwem nagłówka `Idempotency-Key` lub `X-Request-Id`
- **Śledzenie postępu** — Zgoda na zdarzenia SSE `event: progress` poprzez nagłówek `X-OmniRoute-Progress: true`

---

### Plac zabaw dla tłumaczy

Dostęp przez **Panel kontrolny → Tłumacz**. Debuguj i wizualizuj, jak OmniRoute tłumaczy żądania API między dostawcami.

| Tryb                      | Cel                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Plac zabaw**            | Wybierz formaty źródłowe/docelowe, wklej żądanie i natychmiast zobacz przetłumaczone dane wyjściowe |
| **Tester czatu**          | Wysyłaj wiadomości na czacie na żywo przez serwer proxy i sprawdzaj pełny cykl żądań/odpowiedzi     |
| **Stolik testowy**        | Przeprowadź testy wsadowe w wielu kombinacjach formatów, aby sprawdzić poprawność tłumaczenia       |
| **Monitorowanie na żywo** | Oglądaj tłumaczenia w czasie rzeczywistym, gdy żądania przepływają przez serwer proxy               |

**Przypadki użycia:**

- Debugowanie, dlaczego konkretna kombinacja klient/dostawca nie działa
- Sprawdź, czy znaczniki myślenia, wywołania narzędzi i podpowiedzi systemowe są tłumaczone poprawnie
- Porównaj różnice w formatach między formatami OpenAI, Claude, Gemini i Responses API

---

### Strategie routingu

Skonfiguruj za pomocą **Panel kontrolny → Ustawienia → Routing**.

| Strategia                      | Opis                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Najpierw wypełnij**          | Używa kont w kolejności priorytetów — konto podstawowe obsługuje wszystkie żądania, aż będą niedostępne     |
| **Robinowy**                   | Przełącza między wszystkimi kontami z konfigurowalnym limitem stałym (domyślnie: 3 połączenia na konto)     |
| **P2C (potęga dwóch wyborów)** | Wybiera 2 losowe konta i ścieżki do zdrowszego — równoważy obciążenie świadomością zdrowia                  |
| **Losowe**                     | Losowo wybiera konto dla każdego żądania, korzystając z funkcji losowania Fisher-Yates                      |
| **Najrzadziej używane**        | Kieruje do konta z najstarszym `lastUsedAt` znacznikiem czasu, równomiernie rozprowadzając ruch             |
| **Optymalizacja kosztów**      | Kieruje do konta o najniższej wartości priorytetu, optymalizując pod kątem dostawców o najniższych kosztach |

#### Aliasy modeli z symbolami wieloznacznymi

Utwórz wzorce symboli wieloznacznych, aby ponownie przypisać nazwy modeli:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Symbole wieloznaczne obsługują `*` (dowolne znaki) i `?` (pojedynczy znak).

#### Łańcuchy awaryjne

Zdefiniuj globalne łańcuchy awaryjne, które mają zastosowanie do wszystkich żądań:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Odporność i wyłączniki automatyczne

Skonfiguruj za pomocą **Panel kontrolny → Ustawienia → Odporność**.

OmniRoute wdraża odporność na poziomie dostawcy za pomocą czterech komponentów:

1. **Profile dostawców** — konfiguracja dla poszczególnych dostawców dla:
   - Próg awaryjności (ile awarii przed otwarciem)
   - Czas odnowienia
   - Czułość wykrywania limitu szybkości
   - Wykładnicze parametry wycofywania

2. **Edytowalne limity prędkości** — Domyślne ustawienia na poziomie systemu można skonfigurować w panelu kontrolnym:
   - **Żądania na minutę (RPM)** — Maksymalna liczba żądań na minutę na konto
   - **Min. czas między żądaniami** — Minimalna przerwa w milisekundach między żądaniami
   - **Maksymalna liczba jednoczesnych żądań** — Maksymalna liczba jednoczesnych żądań na konto
   - Kliknij **Edytuj**, aby zmodyfikować, a następnie **Zapisz** lub **Anuluj**. Wartości są zachowywane za pośrednictwem interfejsu API odporności.

3. **Wyłącznik** — śledzi awarie według dostawcy i automatycznie otwiera obwód po osiągnięciu progu:
   - **ZAMKNIĘTE** (zdrowe) — Żądania przebiegają normalnie
   - **OTWARTE** — Dostawca jest tymczasowo blokowany po powtarzających się awariach
   - **HALF_OPEN** — Sprawdzanie, czy dostawca odzyskał siły

4. **Zasady i zablokowane identyfikatory** — Pokazuje stan wyłącznika automatycznego i zablokowane identyfikatory z możliwością wymuszonego odblokowania.

5. **Automatyczne wykrywanie limitów szybkości** — Monitoruje nagłówki `429` i `Retry-After`, aby aktywnie zapobiegać przekroczeniu limitów stawek dostawcy.

**Wskazówka dla profesjonalistów:** Użyj przycisku **Resetuj wszystko**, aby wyczyścić wszystkie wyłączniki automatyczne i czasy odnowienia, gdy dostawca wznowi działanie po awarii.

---

### Eksport/import bazy danych

Zarządzaj kopiami zapasowymi baz danych w **Panel kontrolny → Ustawienia → System i pamięć masowa**.

| Akcja                            | Opis                                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Eksportuj bazę danych**        | Pobiera bieżącą bazę danych SQLite jako plik `.sqlite`                                                                                              |
| **Eksportuj wszystko (.tar.gz)** | Pobiera pełne archiwum kopii zapasowych, w tym: bazę danych, ustawienia, kombinacje, połączenia z dostawcami (bez poświadczeń), metadane klucza API |
| **Importuj bazę danych**         | Prześlij plik `.sqlite`, aby zastąpić bieżącą bazę danych. Automatycznie tworzona jest kopia zapasowa przed importem                                |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Weryfikacja importu:** Zaimportowany plik jest sprawdzany pod kątem integralności (sprawdzanie pragma SQLite), wymaganych tabel (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) i rozmiaru (maks. 100MB).

**Przypadki użycia:**

- Przeprowadź migrację OmniRoute pomiędzy maszynami
- Twórz zewnętrzne kopie zapasowe w celu odzyskiwania po awarii
- Udostępniaj konfiguracje pomiędzy członkami zespołu (eksportuj wszystko → udostępnij archiwum)

---

### Panel ustawień

Strona ustawień jest podzielona na 5 zakładek ułatwiających nawigację:

| Zakładka           | Spis treści                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Bezpieczeństwo** | Ustawienia logowania/hasła, kontrola dostępu IP, autoryzacja API dla `/models` i blokowanie dostawców                     |
| **Trasowanie**     | Globalna strategia routingu (6 opcji), aliasy modeli z symbolami wieloznacznymi, łańcuchy awaryjne, domyślne kombinacje   |
| **Odporność**      | Profile dostawców, edytowalne limity stawek, stan wyłącznika, zasady i zablokowane identyfikatory                         |
| **AI**             | Myślenie o konfiguracji budżetu, globalnym wstrzykiwaniu podpowiedzi do systemu, szybkich statystykach pamięci podręcznej |
| **Zaawansowane**   | Globalna konfiguracja proxy (HTTP/SOCKS5)                                                                                 |

---

### Zarządzanie kosztami i budżetem

Dostęp przez **Panel kontrolny → Koszty**.

| Zakładka   | Cel                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| **Budżet** | Ustaw limity wydatków na klucz API z budżetami dziennymi/tygodniowymi/miesięcznymi i śledzeniem w czasie rzeczywistym |
| **Cennik** | Wyświetlaj i edytuj wpisy cen modelu — koszt za 1 tys. tokenów wejścia/wyjścia na dostawcę                            |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Śledzenie kosztów:** Każde żądanie rejestruje użycie tokena i oblicza koszt, korzystając z tabeli cen. Zobacz zestawienia w **Panel kontrolny → Użycie** według dostawcy, modelu i klucza API.

---

### Transkrypcja audio

OmniRoute obsługuje transkrypcję audio za pośrednictwem punktu końcowego kompatybilnego z OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Dostępni dostawcy: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Obsługiwane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Strategie równoważenia kombinacji

Skonfiguruj równoważenie poszczególnych kombinacji w **Panel sterowania → Kombinacje → Utwórz/edytuj → Strategia**.

| Strategia                 | Opis                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| **Równy z każdym**        | Obraca modele sekwencyjnie                                                        |
| **Priorytet**             | Zawsze wypróbowuje pierwszy model; powraca tylko w przypadku błędu                |
| **Losowe**                | Wybiera losowy model z kombinacji dla każdego żądania                             |
| **Ważona**                | Trasy proporcjonalnie na podstawie przypisanych wag do modelu                     |
| **Najrzadziej używane**   | Trasy do modelu z najmniejszą liczbą ostatnich żądań (wykorzystuje metryki kombi) |
| **Optymalizacja kosztów** | Trasy do najtańszego dostępnego modelu (korzysta z tabeli cen)                    |

Globalne ustawienia domyślne kombinacji można ustawić w **Panel sterowania → Ustawienia → Routing → Domyślne ustawienia kombinacji**.

---

### Panel zdrowia

Dostęp przez **Panel kontrolny → Zdrowie**. Przegląd stanu systemu w czasie rzeczywistym za pomocą 6 kart:

| Karta                         | Co to pokazuje                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------- |
| **Stan systemu**              | Czas pracy, wersja, wykorzystanie pamięci, katalog danych                         |
| **Zdrowie dostawcy**          | Stan wyłącznika automatycznego dostawcy (zamknięty/otwarty/półotwarty)            |
| **Limity stawek**             | Aktywne czasy odnowienia limitu szybkości na konto z pozostałym czasem            |
| **Aktywne blokady**           | Dostawcy tymczasowo zablokowani przez politykę blokad                             |
| **Pamięć podręczna podpisów** | Statystyki pamięci podręcznej deduplikacji (aktywne klucze, współczynnik trafień) |
| **Telemetria opóźnień**       | Agregacja opóźnień p50/p95/p99 na dostawcę                                        |

**Wskazówka dla profesjonalistów:** Strona Zdrowie odświeża się automatycznie co 10 sekund. Użyj karty wyłącznika, aby zidentyfikować dostawców, u których występują problemy.
