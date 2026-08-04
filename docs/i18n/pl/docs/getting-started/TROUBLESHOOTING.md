---
title: "Rozwiązywanie problemów"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Rozwiązywanie problemów

> **Dla użytkowników**: Szukasz szybkich poprawek? Zobacz [Szybki przewodnik](#quick-reference) poniżej.

🌐 **Languages:** 🇺🇸 [English](./TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/TROUBLESHOOTING.md) | 🇪🇸 [Español](../i18n/es/docs/guides/TROUBLESHOOTING.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/TROUBLESHOOTING.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/TROUBLESHOOTING.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/TROUBLESHOOTING.md)

Typowe problemy i rozwiązania dla OmniRoute.

---

## Szybki przewodnik

**Nowy w OmniRoute?** Zacznij tutaj — te wskazówki rozwiązują 90% problemów:

| Widzę to                | Co to oznacza                      | Co zrobić                                                                            |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| "Can't connect"         | OmniRoute nie działa               | Uruchom `omniroute` lub `docker restart omniroute`                                   |
| "Invalid API key"       | Klucz jest błędny lub wygasł       | Skopiuj ponownie klucz ze strony providera                                           |
| "Rate limit exceeded"   | Wysyłasz zbyt wiele żądań          | Poczekaj 1 minutę albo użyj `model: "auto"` do automatycznego fallbacku              |
| "Quota exceeded"        | Wykorzystałeś darmowy/płatny limit | Podłącz więcej providerów albo użyj darmowych (Kiro, Pollinations)                   |
| "Slow responses"        | Provider jest obciążony lub daleko | Użyj `model: "auto/fast"` albo podłącz szybszego providera (Groq, Cerebras)          |
| "Wrong provider used"   | `auto` wybrał innego providera     | To normalne! `auto` wybiera najlepszego. Wymuś konkretnego: `model: "openai/gpt-4o"` |
| "502 Bad Gateway"       | Provider nie działa                | Poczekaj i spróbuj ponownie albo użyj `model: "auto"`, aby przełączyć providera      |
| "401 Unauthorized"      | Błędne dane uwierzytelniające      | Sprawdź klucz API albo ponownie uwierzytelnij się przez OAuth                        |
| "429 Too Many Requests" | Limit zapytań                      | Poczekaj 1 minutę albo podłącz więcej providerów                                     |

**Nadal utknąłeś?** Zobacz [Szybkie poprawki](#quick-fixes) poniżej albo zapytaj na [Discordzie](https://discord.gg/U47eFqAXCn).

---

## Ostrzeżenia npm install (ERESOLVE / peer / deprecated)

Po `npm install -g omniroute` możesz zobaczyć lawinę ostrzeżeń typu `npm warn ERESOLVE`, komunikaty o peer-dependency oraz `deprecated`. **Są one oczekiwane i nieszkodliwe.** Instalacja się powiodła, jeśli w wyniku widać `added <N> packages`.

Ostrzeżenia pochodzą z przestarzałych zakresów peer-dependency w pakietach firm trzecich, których OmniRoute nie kontroluje:

1. **`marked-terminal` chce `marked >=1 <16`, znaleziono `marked@18`** — w praktyce działa poprawnie; zakres peer po stronie upstream jest po prostu nieaktualny.
2. **`deprecated prebuild-install@7.1.3`** — helper do pobierania natywnych binarek. Istotny dopiero później, jeśli provider web-cookie zgłosi brak natywnej binarki `tls-client-node` (osobny problem, nie spowodowany tym ostrzeżeniem).

**Nie trzeba nic robić** — ostrzeżeń nie da się w pełni wyciszyć bez forka pakietów upstream.

---

## Szybkie poprawki

| Problem                                             | Rozwiązanie                                                                                                                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pierwsze logowanie nie działa                       | Ustaw `INITIAL_PASSWORD` w `.env` (brak wbudowanego domyślnego hasła)                                                                                                      |
| Dashboard otwiera się na złym porcie                | Ustaw `PORT=20128` i `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                                         |
| Brak logów na dysku                                 | Ustaw `APP_LOG_TO_FILE=true` i upewnij się, że przechwytywanie call log jest włączone                                                                                      |
| EACCES: permission denied                           | Ustaw `DATA_DIR=/path/to/writable/dir`, aby nadpisać `~/.omniroute`                                                                                                        |
| Strategia routingu się nie zapisuje                 | Zaktualizuj do najnowszego wydania v3.x (poprawka schematu Zod dla persystencji ustawień weszła we wcześniejszych wersjach)                                                |
| Crash logowania / pusta strona                      | Sprawdź wersję Node.js — zobacz [Zgodność z Node.js](#nodejs-compatibility) poniżej                                                                                        |
| `dlopen` / `slice is not valid mach-o file` (macOS) | Uruchom `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — zobacz [przebudowa modułu natywnego na macOS](#macos-native-module-rebuild) poniżej |
| Proxy "fetch failed"                                | Upewnij się, że konfiguracja proxy jest ustawiona na właściwym poziomie — zobacz [Problemy z proxy](#proxy-issues) poniżej                                                 |

---

## Zgodność z Node.js

<a name="nodejs-compatibility"></a>

### Strona logowania się wykrzacza lub pokazuje błąd "Module self-registration"

**Przyczyna:** Uruchamiasz wersję Node.js poniżej zatwierdzonego bezpiecznego poziomu runtime OmniRoute. Najczęstszy przypadek to starszy patch Node 22 lub 24 poniżej wymaganego przez OmniRoute poziomu bezpieczeństwa.

**Objawy:**

- Strona logowania pokazuje pusty ekran lub błąd serwera
- Konsola pokazuje `Error: Module did not self-register` lub podobne błędy natywnych bindingów
- Strona logowania pokazuje **pomarańczowy baner ostrzegawczy** z Twoją wersją Node, jeśli runtime jest poza wspieraną bezpieczną polityką

**Naprawa:**

1. Zainstaluj wspierane wydanie Node.js LTS (zalecane: Node.js 24.x):
   ```bash
   nvm install 24
   nvm use 24
   ```
2. Sprawdź wersję: `node --version` powinno pokazać `v24.0.0` lub nowsze w linii LTS 24.x
3. Zainstaluj ponownie OmniRoute: `npm install -g omniroute`
4. Uruchom ponownie: `omniroute`

> **Wspierane bezpieczne wersje:** `>=22.22.2 <23` lub `>=24.0.0 <27`. Node.js 24.x LTS (Krypton) oraz Node.js 26 są w pełni wspierane.

### macOS: `dlopen` / "slice is not valid mach-o file"

<a name="macos-native-module-rebuild"></a>

**Przyczyna:** Po globalnym `npm install -g omniroute` natywna binarka `better-sqlite3` w pakiecie mogła zostać skompilowana pod inną architekturę lub ABI Node.js niż ta, która działa lokalnie. To częste na macOS (Apple Silicon i Intel), gdy prebuilt nie pasuje do środowiska.

**Objawy:**

- Serwer pada natychmiast przy starcie z błędem `dlopen`
- Błąd zawiera `slice is not valid mach-o file`
- Pełny przykład:

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**Naprawa — przebuduj pod lokalne środowisko (bez downgrade Node.js):**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **Uwaga:** To rekompiluje natywny binding względem lokalnej wersji Node.js i architektury CPU, usuwając niedopasowanie binarki. Oficjalnie wspierany zakres runtime to **`>=22.22.2 <23` lub `>=24.0.0 <27`** (`SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`, zgodny z polem `engines` w `package.json`). Node.js 24.x LTS (Krypton) oraz Node.js 26 są w pełni wspierane z `better-sqlite3` v12.x.

---

## Problemy z proxy

<a name="proxy-issues"></a>

### Walidacja providera pokazuje "fetch failed"

**Przyczyna:** Endpoint walidacji klucza API (`POST /api/providers/validate`) wcześniej omijał konfigurację proxy, co powodowało błędy w środowiskach wymagających routingu przez proxy.

**Naprawa (v3.5.5+):** To już naprawione. Walidacja providera idzie przez `runWithProxyContext` i automatycznie respektuje ustawienia proxy na poziomie providera oraz globalne.

### Token health check kończy się "fetch failed"

**Przyczyna:** Tło odświeżania tokenów OAuth nie rozwiązywało konfiguracji proxy per połączenie.

**Naprawa (v3.5.5+):** Scheduler token health check rozwiązuje teraz config proxy per połączenie przed odświeżeniem. Zaktualizuj do v3.5.5+.

### Proxy SOCKS5 zwraca "invalid onRequestStart method"

**Przyczyna:** Na Node.js 22 dispatcher undici@8 jest niekompatybilny z wbudowaną implementacją `fetch()` w Node.

**Naprawa (v3.5.5+):** OmniRoute używa teraz własnej funkcji `fetch()` z undici, gdy aktywny jest dispatcher proxy, co zapewnia spójne zachowanie. Zaktualizuj do v3.5.5+.

---

## Problemy z providerami

### "Language model did not provide messages"

**Przyczyna:** Wyczerpany limit (quota) providera.

**Naprawa:**

1. Sprawdź tracker limitu w dashboardzie
2. Użyj combo z poziomami fallback
3. Przełącz się na tańszy/darmowy tier

### Rate limiting

**Przyczyna:** Wyczerpany limit subskrypcji.

**Naprawa:**

- Dodaj fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/qwen3.8-max-preview`
- Użyj GLM/MiniMax jako taniego zapasowego

### Wygasły token OAuth

OmniRoute automatycznie odświeża tokeny. Jeśli problemy trwają:

1. Dashboard → Provider → Reconnect
2. Usuń i dodaj ponownie połączenie providera

### Kiro multi-account: drugie konto unieważnia pierwsze

**Przyczyna:** Backend Kiro wymusza jedną aktywną sesję na rejestrację klienta OIDC.
Gdy dwa konta współdzielą tego samego zarejestrowanego klienta (połączenia zaimportowane przed v3.8.0),
odświeżenie tokenu jednego konta unieważnia refresh token drugiego.

**Naprawa (v3.8.0+):** Zaimportuj ponownie dotknięte połączenia.
Od v3.8.0 każde nowe połączenie Kiro utworzone przez **Import Token**,
**Google/GitHub social login** lub **Auto-Import** automatycznie rejestruje własnego
dedykowanego klienta OIDC. Połączenie jest więc w pełni izolowane i odświeżenie jednego
konta nie wpływa na żadne inne.

Połączenia zaimportowane _przed_ v3.8.0 nie niosą rejestracji klienta per połączenie.
Te połączenia nadal używają współdzielonego endpointu odświeżania social-auth.
Aby uzyskać izolację, usuń stare połączenie z Dashboard → Providers i dodaj je ponownie
przez dowolny z trzech przepływów importu.

Pełne szczegóły i instrukcja krok po kroku dodawania dwóch kont Kiro obok siebie:
zobacz [`docs/guides/KIRO_SETUP.md`](../guides/KIRO_SETUP.md).

---

## Problemy z chmurą

### Błędy synchronizacji chmury

1. Sprawdź, czy `BASE_URL` wskazuje na działającą instancję (np. `http://localhost:20128`)
2. Sprawdź, czy `CLOUD_URL` wskazuje na endpoint chmury (np. `https://omniroute.dev`)
3. Utrzymuj wartości `NEXT_PUBLIC_*` zgodne z wartościami po stronie serwera

### Cloud `stream=false` zwraca 500

**Objaw:** `Unexpected token 'd'...` na endpoincie chmury przy wywołaniach bez streamingu.

**Przyczyna:** Upstream zwraca payload SSE, a klient oczekuje JSON.

**Obejście:** Użyj `stream=true` przy bezpośrednich wywołaniach cloud. Lokalny runtime ma fallback SSE→JSON.

### Cloud pokazuje Connected, ale "Invalid API key"

1. Utwórz świeży klucz z lokalnego dashboardu (`/api/keys`)
2. Uruchom synchronizację chmury: Enable Cloud → Sync Now
3. Stare/niesynchronizowane klucze mogą nadal zwracać `401` w chmurze

---

## Problemy z Dockerem

### Narzędzie CLI pokazuje Not Installed

1. Sprawdź pola runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Dla trybu portable: użyj targetu obrazu `runner-cli` (dołączone CLI)
3. Dla trybu host mount: ustaw `CLI_EXTRA_PATHS` i zamontuj katalog bin hosta jako tylko do odczytu
4. Jeśli `installed=true` i `runnable=false`: binarka znaleziona, ale healthcheck się nie powiódł

### Szybka walidacja runtime

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problemy z kosztami

### Wysokie koszty

1. Sprawdź statystyki użycia w Dashboard → Usage
2. Przełącz model główny na GLM/MiniMax
3. Używaj darmowego tieru (Qoder, Kiro) do mniej krytycznych zadań
4. Ustaw budżety kosztów per klucz API: Dashboard → API Keys → Budget

---

## Debugowanie

### Włącz pliki logów

Ustaw `APP_LOG_TO_FILE=true` w pliku `.env`. Logi aplikacji trafiają do `logs/`.
Artefakty żądań są przechowywane w `${DATA_DIR}/call_logs/`, gdy pipeline call log jest
włączony w ustawieniach.
Gdy przechwytywanie pipeline jest włączone, ustaw `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS=false`, aby pominąć
payloady chunków streamu, albo dostrój `CALL_LOG_PIPELINE_MAX_SIZE_KB`, aby zmienić limit artefaktu w KB.

### Sprawdź zdrowie providerów

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Przechowywanie w runtime

- Stan główny: `${DATA_DIR}/storage.sqlite` (providers, combos, aliases, keys, settings)
- Użycie: tabele SQLite w `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opcjonalnie `${DATA_DIR}/call_logs/`
- Logi aplikacji: `<repo>/logs/...` (gdy `APP_LOG_TO_FILE=true`)
- Artefakty call log: `${DATA_DIR}/call_logs/YYYY-MM-DD/...` gdy pipeline call log jest włączony

Akcja **Clean history** na stronie Request Logs czyści `call_logs`, legacy
`request_detail_logs` oraz lokalny katalog artefaktów `${DATA_DIR}/call_logs/`.

---

## Problemy z circuit breakerem

### Provider utknął w stanie OPEN

Gdy circuit breaker providera jest OPEN, żądania są blokowane do wygaśnięcia cooldownu.

**Naprawa:**

1. Przejdź do **Dashboard → Settings → Resilience**
2. Sprawdź kartę circuit breakera dla dotkniętego providera
3. Kliknij **Reset All**, aby wyczyścić wszystkie breakery, albo poczekaj na wygaśnięcie cooldownu
4. Upewnij się, że provider jest faktycznie dostępny przed resetem

### Provider wciąż wyzwala circuit breaker

Jeśli provider wielokrotnie wchodzi w stan OPEN:

1. Sprawdź **Dashboard → Health → Provider Health** pod kątem wzorca awarii
2. Przejdź do **Settings → Resilience → Provider Profiles** i zwiększ próg awarii
3. Sprawdź, czy provider zmienił limity API lub wymaga ponownego uwierzytelnienia
4. Przejrzyj telemetrię opóźnień — wysoka latencja może powodować awarie oparte na timeoutach

---

## Problemy z transkrypcją audio

### Błąd "Unsupported model"

- Upewnij się, że używasz właściwego prefiksu: `deepgram/nova-3` lub `assemblyai/best`
- Sprawdź, czy provider jest podłączony w **Dashboard → Providers**

### Transkrypcja zwraca pusto lub się nie udaje

- Sprawdź wspierane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Upewnij się, że rozmiar pliku mieści się w limitach providera (zazwyczaj < 25MB)
- Sprawdź ważność klucza API na karcie providera

---

## Debugowanie translatora

Użyj **Dashboard → Translator**, aby debugować problemy z tłumaczeniem formatów:

| Tryb             | Kiedy używać                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Playground**   | Porównaj formaty wejścia/wyjścia obok siebie — wklej padające żądanie, by zobaczyć tłumaczenie |
| **Chat Tester**  | Wysyłaj żywe wiadomości i przeglądaj pełny payload request/response wraz z nagłówkami          |
| **Test Bench**   | Uruchamiaj testy wsadowe na kombinacjach formatów, by znaleźć zepsute tłumaczenia              |
| **Live Monitor** | Obserwuj przepływ żądań w czasie rzeczywistym, by wyłapać przerywane problemy z tłumaczeniem   |

### Typowe problemy z formatami

- **Brak tagów thinking** — Sprawdź, czy docelowy provider wspiera thinking i ustawienie thinking budget
- **Znikające tool calls** — Niektóre tłumaczenia formatów mogą usuwać nieobsługiwane pola; sprawdź w trybie Playground
- **Brak system prompt** — Claude i Gemini obsługują system prompts inaczej; sprawdź wynik tłumaczenia
- **SDK zwraca surowy string zamiast obiektu** — Naprawione w v1.x; sanitizer odpowiedzi usuwa niestandardowe pola (`x_groq`, `usage_breakdown` itd.), które powodują błędy walidacji Pydantic w OpenAI SDK. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **GLM/ERNIE odrzuca rolę `system`** — Naprawione w v1.x; normalizer ról automatycznie scala wiadomości system w user dla niekompatybilnych modeli. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **Rola `developer` nierozpoznana** — Naprawione w v1.x; automatycznie konwertowana na `system` dla providerów spoza OpenAI. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **`json_schema` nie działa z Gemini** — Naprawione w v1.x; `response_format` jest teraz konwertowany na `responseMimeType` + `responseSchema` Gemini. Jeśli nadal to widzisz na v3.x+, zgłoś issue.

---

## Ustawienia odporności (Resilience)

### Auto rate-limit się nie uruchamia

- Auto rate-limit dotyczy tylko providerów z kluczem API (nie OAuth/subskrypcja)
- Sprawdź, czy **Settings → Resilience → Provider Profiles** ma włączony auto-rate-limit
- Sprawdź, czy provider zwraca kody `429` lub nagłówki `Retry-After`

### Dostrajanie exponential backoff

Profile providerów wspierają te ustawienia:

- **Base delay** — Początkowy czas oczekiwania po pierwszej awarii (domyślnie: 1s)
- **Max delay** — Górny limit czasu oczekiwania (domyślnie: 30s)
- **Multiplier** — O ile zwiększać opóźnienie przy kolejnych awariach (domyślnie: 2x)

### Anti-thundering herd

Gdy wiele równoległych żądań trafia w providera z limitem zapytań, OmniRoute używa mutexa + auto rate-limiting, aby serializować żądania i zapobiegać awariom kaskadowym. Działa to automatycznie dla providerów z kluczem API.

---

## Opcjonalna taksonomia awarii RAG / LLM (16 problemów)

Część użytkowników OmniRoute stawia bramkę przed stackami RAG lub agentów. W takich setupach często widać dziwny wzorzec: OmniRoute wygląda na zdrowe (providery w górze, profile routingu OK, brak alertów rate limit), a ostateczna odpowiedź i tak jest błędna.

W praktyce te incydenty zwykle pochodzą z downstreamowego pipeline'u RAG, a nie z samej bramki.

Jeśli chcesz wspólnego słownika do opisu tych awarii, możesz użyć WFGY ProblemMap — zewnętrznego zasobu tekstowego na licencji MIT, który definiuje szesnaście powtarzających się wzorców awarii RAG / LLM. Na wysokim poziomie obejmuje:

- drift retrieval i zerwane granice kontekstu
- puste lub nieaktualne indeksy i magazyny wektorów
- niedopasowanie embeddingów do semantyki
- składanie promptów i problemy z oknem kontekstu
- zapaść logiki i nadmiernie pewne odpowiedzi
- awarie długich łańcuchów i koordynacji agentów
- dryf pamięci i ról w multi-agent
- problemy z deploymentem i kolejnością bootstrapu

Idea jest prosta:

1. Gdy badziesz złą odpowiedź, zbierz:
   - zadanie użytkownika i żądanie
   - trasę lub combo providerów w OmniRoute
   - kontekst RAG użyty downstream (pobrane dokumenty, tool calls itd.)
2. Zmapuj incydent na jeden lub dwa numery WFGY ProblemMap (`No.1` … `No.16`).
3. Zapisz numer we własnym dashboardzie, runbooku lub trackerze incydentów obok logów OmniRoute.
4. Użyj odpowiadającej strony WFGY, by zdecydować, czy zmienić stack RAG, retriever, czy strategię routingu.

Pełny tekst i konkretne przepisy są tutaj (licencja MIT, tylko tekst):

- [WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Możesz zignorować tę sekcję, jeśli nie uruchamiasz pipeline'ów RAG ani agentów za OmniRoute.

---

## Znane problemy v3.8.0

Problemy specyficzne dla wydania v3.8.0 i ich obecne obejścia. Gdy poprawka wejdzie w późniejszym patchu, wpis zostanie zaktualizowany lub usunięty.

### Przepływ OAuth Windsurf kończy się 401

**Objawy:**

- "401 unauthorized" podczas kończenia przepływu OAuth Windsurf z dashboardu
- Karta providera Windsurf zostaje w stanie "needs reconnection" po callbacku

**Przyczyny:**

- Brakująca lub pusta zmienna środowiskowa `WINDSURF_FIREBASE_API_KEY`
- `WINDSURF_API_KEY` źle skonfigurowany lub wskazujący na nieaktualny token
- Lokalna zapora/proxy blokuje callback OAuth

**Naprawa:**

1. Sprawdź, że zarówno `WINDSURF_FIREBASE_API_KEY`, jak i `WINDSURF_API_KEY` są ustawione w `.env`
2. Zrestartuj OmniRoute, aby nowe wartości env zostały wczytane
3. Ponów przepływ OAuth z **Dashboard → Providers → Windsurf → Reconnect**

### Błędy auth Devin CLI

**Objawy:**

- "Devin CLI not found" lub "auth failed" przy wywoływaniu narzędzi opartych o Devin
- Sprawdzenie runtime CLI raportuje `installed=false`

**Przyczyny:**

- `CLI_DEVIN_BIN` wskazuje na nieistniejącą ścieżkę
- Devin CLI nie jest zainstalowany na hoście

**Naprawa:**

1. Zainstaluj Devin CLI dla swojej platformy
2. Ustaw `CLI_DEVIN_BIN=/usr/local/bin/devin` (lub rzeczywistą ścieżkę) w `.env`
3. Zrestartuj OmniRoute i przetestuj ponownie w **Dashboard → CLI Tools**

### Cooldown modelu utknął (ręczny reset)

**Objawy:**

- Model pozostaje na liście cooldown nawet po upływie czasu wygaśnięcia
- Żądania nadal pomijają model w routingu combo mimo że znacznik czasu jest w przeszłości

**Ręczny reset:**

- **Dashboard:** **Settings → Model Cooldowns** → kliknij **Re-enable** na dotkniętej karcie
- **API:** `DELETE /api/resilience/model-cooldowns` z nagłówkami auth zarządzania

### Połączenie providera Command Code kończy się 403

**Objawy:**

- 403 przy testowaniu połączenia providera Command Code
- Karta providera pokazuje "unauthorized" po świeżym dodaniu

**Przyczyna:** Przepływ OAuth nie zakończył się (callback nieodebrany lub token niezapisany).

**Naprawa:**

- Uruchom `omniroute providers` z CLI, aby ponownie wywołać przepływ OAuth, albo
- Ponów OAuth z **Dashboard → Providers → Command Code → Reconnect**

### ModelScope zwraca agresywne cooldowny 429

**Objawy:**

- Bardzo krótkie lub natychmiastowe cooldowny na ModelScope po małej serii żądań
- Routing combo pomija ModelScope wcześniej niż oczekiwano

**Przyczyna:** ModelScope emituje specyficzne dla providera nagłówki `Retry-After`. v3.8.0 zawiera dedykowaną obsługę tych nagłówków, więc starsze wersje odczytują je jako generyczne wskazówki rate-limit.

**Naprawa:**

- Upewnij się, że jesteś na v3.8.0 lub nowszej
- Sprawdź, że przełącznik `useUpstream429BreakerHints` jest włączony w **Settings → Resilience**

### Brak OMNIROUTE_WS_BRIDGE_SECRET w produkcji

**Objawy:**

- 401 na każdym żądaniu mostka WebSocket Codex/Responses na zdalnym hoście produkcyjnym
- Handshake mostka WebSocket zamyka się natychmiast po połączeniu

**Przyczyna:** Zmienna środowiskowa `OMNIROUTE_WS_BRIDGE_SECRET` nie jest ustawiona w środowisku produkcyjnym.

**Naprawa:**

1. Wygeneruj losowy sekret: `openssl rand -hex 32`
2. Ustaw `OMNIROUTE_WS_BRIDGE_SECRET=<random-secret>` w env serwera produkcyjnego (oraz każdego klienta łączącego się z mostkiem)
3. Zrestartuj OmniRoute

### Responses API: tryb background zdegradowany do synchronicznego

**Objawy:**

- Zalogowane ostrzeżenie: `background mode degraded to synchronous`
- Żądanie z `background: true` zwraca zwykłą odpowiedź synchroniczną zamiast uchwytu zadania w tle

**Przyczyna:** v3.8.0 celowo degraduje `background: true` w Responses API do wykonania synchronicznego z ostrzeżeniem. Pełne asynchroniczne wykonanie w tle to przyszła funkcjonalność.

**Naprawa:**

- Dostosuj klienta, aby wywoływał bez `background`, albo
- Poczekaj na późniejsze wydanie z pełnym trybem async background (śledź changelog)

---

## Nadal utknąłeś?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektura**: Zobacz [`docs/architecture/ARCHITECTURE.md`](../architecture/ARCHITECTURE.md) po szczegóły wewnętrzne
- **API Reference**: Zobacz [`docs/reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) po wszystkie endpointy
- **Health Dashboard**: Sprawdź **Dashboard → Health** pod kątem statusu systemu w czasie rzeczywistym
- **Translator**: Użyj **Dashboard → Translator** do debugowania problemów z formatami
