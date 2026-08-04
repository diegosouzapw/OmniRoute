---
title: "Rozwiązywanie problemów"
version: 3.8.49
lastUpdated: 2026-07-15
---

# Rozwiązywanie problemów

> **Dla użytkowników**: Szukasz szybkich poprawek? Zobacz [Szybki przewodnik](#quick-reference) poniżej.

🌐 **Languages:** 🇺🇸 [English](./TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/TROUBLESHOOTING.md) | 🇪🇸 [Español](../i18n/es/docs/guides/TROUBLESHOOTING.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/TROUBLESHOOTING.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/TROUBLESHOOTING.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/TROUBLESHOOTING.md)

Typowe problemy i rozwiązania dla OmniRoute.

---

## Szybki przewodnik

**Nowy w OmniRoute?** Zacznij tutaj — te wskazówki rozwiązują 90% problemów:

| Widzę to                | Co to oznacza                      | Co zrobić                                                                             |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| "Can't connect"         | OmniRoute nie działa               | Uruchom `omniroute` lub `docker restart omniroute`                                    |
| "Invalid API key"       | Klucz jest błędny lub wygasł       | Skopiuj ponownie klucz ze strony providera                                            |
| "Rate limit exceeded"   | Wysyłasz zbyt wiele żądań          | Poczekaj 1 minutę albo użyj `model: "auto"` do automatycznego fallbacku               |
| "Quota exceeded"        | Wykorzystałeś darmowy/płatny limit | Podłącz więcej providerów albo użyj darmowych (Kiro, Pollinations)                    |
| "Slow responses"        | Provider jest obciążony lub daleko | Użyj `model: "auto/fast"` albo podłącz szybszego providera (Groq, Cerebras)           |
| "Wrong provider used"   | `auto` wybrał innego providera     | To normalne! `auto` wybiera najlepszy. Wymuś providera przez `model: "openai/gpt-4o"` |
| "502 Bad Gateway"       | Provider nie działa                | Poczekaj i spróbuj ponownie albo użyj `model: "auto"`, by przełączyć providera        |
| "401 Unauthorized"      | Błędne poświadczenia               | Sprawdź klucz API albo ponownie uwierzytelnij się przez OAuth                         |
| "429 Too Many Requests" | Limit zapytań                      | Poczekaj 1 minutę albo podłącz więcej providerów                                      |

**Nadal utknąłeś?** Zobacz [szczegółowe rozwiązywanie problemów](#detailed-troubleshooting) poniżej albo zapytaj na [Discord](https://discord.gg/U47eFqAXCn).

---

## Szczegółowe rozwiązywanie problemów

---

## Szybkie poprawki

| Problem                                                    | Rozwiązanie                                                                                                                                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pierwsze logowanie nie działa                              | Ustaw `INITIAL_PASSWORD` w `.env` (brak wbudowanego domyślnego hasła)                                                                                                      |
| Dashboard otwiera się na złym porcie                       | Ustaw `PORT=20128` i `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                                         |
| Brak logów na dysku                                        | Ustaw `APP_LOG_TO_FILE=true` i sprawdź, czy przechwytywanie call logów jest włączone                                                                                       |
| EACCES: permission denied                                  | Ustaw `DATA_DIR=/path/to/writable/dir`, by nadpisać `~/.omniroute`                                                                                                         |
| Strategia routingu się nie zapisuje                        | Zaktualizuj do najnowszej wersji v3.x (poprawka schematu Zod dla trwałości ustawień była w wcześniejszych wersjach)                                                        |
| Crash logowania / pusta strona                             | Sprawdź wersję Node.js — zobacz [Kompatybilność Node.js](#nodejs-compatibility) poniżej                                                                                    |
| `dlopen` / `slice is not valid mach-o file` (macOS)        | Uruchom `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — zobacz [przebudowa natywnego modułu na macOS](#macos-native-module-rebuild) poniżej |
| Proxy "fetch failed"                                       | Upewnij się, że konfiguracja proxy jest na właściwym poziomie — zobacz [Problemy z proxy](#proxy-issues) poniżej                                                           |
| Docker `curl: (56) Recv failure: Connection reset by peer` | Bindowanie portu Dockera może lądować na IPv6. Użyj `-p 127.0.0.1:20128:20128`, by wymusić IPv4, albo przetestuj `curl -4`. Zobacz [Docker IPv6](#docker-ipv6) poniżej     |
| Antywirus kwarantannuje `README.md`                        | Fałszywy alarm — zobacz [Fałszywe alarmy antywirusa](#antivirus-false-positives) poniżej                                                                                   |
| Kaspersky oznacza aplikację Desktop jako Trojan            | Behawioralny fałszywy alarm na niepodpisanym instalatorze — zobacz [Fałszywe alarmy antywirusa](#antivirus-false-positives) poniżej                                        |

---

## Fałszywe alarmy antywirusa

<a name="antivirus-false-positives"></a>

### Avast/AVG kwarantannuje `README.md` z `MD:HttpRequest-inf[Susp]`

**To fałszywy alarm. Nic nie jest zainfekowane i nie trzeba nic robić.**

Avast i AVG używają heurystyki, która oznacza pliki plain-text/Markdown zawierające wiele
linków wyglądających jak żądania HTTP. `README.md` OmniRoute jest w paczce npm (jest
wymieniony w `package.json` → `files`), więc ląduje w `node_modules/omniroute/README.md` przy
instalacji globalnej — i zawiera ok. 15 przykładów `http://localhost:20128/...` (endpointy MCP
HTTP/SSE, URL A2A `.well-known` oraz snippety `curl`). Taka gęstość linków wystarcza,
by uruchomić heurystykę.

Jeśli zaczęło się dopiero niedawno: plik nie zmienił się jakościowo. README rozrosło się o
tabelę endpointów (dodano MCP HTTP + SSE + A2A) i więcej przykładów `curl`, co przekroczyło
próg.

Plik to bierna dokumentacja bez żadnej wykonywalnej treści. Możesz bezpiecznie przywrócić go
z kwarantanny.

**Co zrobić:**

1. **Zatrzymaj powiadomienia** — wyklucz katalog instalacji w antywirusie
   (Avast: Settings → Exceptions), dodając globalną ścieżkę `node_modules` i/lub katalog
   danych OmniRoute (`~/.omniroute/`).
2. **Zgłoś fałszywy alarm** — <https://www.avast.com/false-positive-file-form.php>,
   dołączając skwarantannowany `README.md`. To poprawka, która pomaga wszystkim, bo to
   heurystyka producenta nadmiernie reaguje na plik tekstowy.

**Dlaczego nie „naprawiamy” tego po naszej stronie:** przykłady to wyłącznie `http://localhost`, a
localhost nie może być `https` bez tarcia z self-signed certificate. Przekręcanie dokumentacji, by
obejść heurystykę jednego producenta, zaszkodziłoby każdemu czytelnikowi przez błąd skanera.

### Kaspersky oznacza aplikację Desktop jako `PDM:Trojan.Win32.Generic`

**To fałszywy alarm z heurystyki behawioralnej. Nic nie jest zainfekowane.** Prefiks
`PDM:` u Kaspersky oznacza werdykt z Proactive Defense Module (System Watcher),
który ocenia, _co robi_ instalator, a nie dopasowuje go do znanego malware. Gdy
się uruchomi, Kaspersky „cofa” całą instalację — usuwa pliki, które już
zapisał — więc aplikacja kończy uszkodzona lub znika.

Pliki, które oznacza, to standardowe części zadeklarowanych, open-source zależności
spakowanych z aplikacją desktop, na przykład:

- `resources/app/.build/next/node_modules/playwright-<hash>/lib/…/agentParser.js` oraz
  `workerProcessEntry.js` — [Playwright](https://playwright.dev), biblioteka automatyzacji
  przeglądarki używana do logowania providera w aplikacji i chatu opartego o przeglądarkę.
- `resources/app/.build/next/node_modules/tls-client-node-<hash>/bin/tls-client-windows-64-<ver>.dll`
  — natywny binarium z `tls-client-node`, używane do HTTP tolerancyjnego na Cloudflare u części
  providerów web.

**Dlaczego się odpala:** instalator Windows **nie jest jeszcze podpisany kodem**, więc niepodpisany
instalator NSIS ma zerową reputację, a heurystyki behawioralne działają na maksymalnej agresji. W połączeniu
z dołączonym natywnym DLL i setkami plików `.js` zapisywanych pod
`%LOCALAPPDATA%\Programs\OmniRoute` (w tym katalogi paczek z sufiksem hasha z
buildu standalone Next.js) to wystarcza, by uruchomić heurystykę. Podpis kodu jest planowany;
dopóki nie wyląduje, nowe wydania mogą to powtarzać.

**Co zrobić:**

1. **Najpierw zweryfikuj pobranie** (wyklucza spreparowany plik). Każde wydanie publikuje
   `latest.yml`, którego pole `sha512` (base64) obejmuje instalator `OmniRoute.Setup.<version>.exe`.
   W PowerShell, z folderu z instalatorem:
   ```powershell
   $b = [System.Security.Cryptography.SHA512]::Create().ComputeHash(
     [System.IO.File]::ReadAllBytes("$PWD\OmniRoute.Setup.<version>.exe"))
   [Convert]::ToBase64String($b)
   ```
   Wynik musi pasować do `latest.yml` → `sha512`. Jeśli nie, usuń plik i
   pobierz ponownie wyłącznie ze [strony wydań GitHub](https://github.com/diegosouzapw/OmniRoute/releases).
2. **Przywróć + wyklucz** — przywróć cofnięte elementy z kwarantanny i dodaj wykluczenie
   dla `%LOCALAPPDATA%\Programs\OmniRoute` (Kaspersky → Settings → Threats and Exclusions),
   potem zainstaluj ponownie.
3. **Zgłoś fałszywy alarm** — <https://opentip.kaspersky.com/>. Zgłoszenia FP od użytkowników
   realnie przyspieszają allowlisting.

---

## Kompatybilność Node.js

<a name="nodejs-compatibility"></a>

### Strona logowania się crashuje albo pokazuje błąd "Module self-registration"

**Przyczyna:** Uruchamiasz wersję Node.js poza zatwierdzonym bezpiecznym progiem runtime OmniRoute. Najczęstszy przypadek to starszy patch Node 22 lub 24 poniżej wymaganego przez OmniRoute zabezpieczonego progu.

**Objawy:**

- Strona logowania pokazuje pusty ekran albo błąd serwera
- Konsola pokazuje `Error: Module did not self-register` lub podobne błędy natywnych bindingów
- Strona logowania pokazuje **pomarańczowy baner ostrzegawczy** z Twoją wersją Node, jeśli runtime jest poza wspieraną bezpieczną polityką

**Naprawa:**

1. Zainstaluj wspieraną wersję Node.js LTS (zalecane: Node.js 24.x):
   ```bash
   nvm install 24
   nvm use 24
   ```
2. Sprawdź wersję: `node --version` powinno pokazać `v24.0.0` lub nowszą na linii LTS 24.x
3. Zainstaluj ponownie OmniRoute: `npm install -g omniroute`
4. Uruchom ponownie: `omniroute`

> **Wspierane bezpieczne wersje:** `>=22.22.2 <23` lub `>=24.0.0 <27`. Node.js 24.x LTS (Krypton) i Node.js 26 są w pełni wspierane.

### macOS: `dlopen` / "slice is not valid mach-o file"

<a name="macos-native-module-rebuild"></a>

**Przyczyna:** Po globalnym `npm install -g omniroute` natywne binarium `better-sqlite3` w paczce mogło zostać skompilowane pod inną architekturę lub ABI Node.js niż lokalnie uruchomione. To częste na macOS (Apple Silicon i Intel), gdy prebuilt nie pasuje do środowiska.

**Objawy:**

- Serwer pada od razu przy starcie z błędem `dlopen`
- Błąd zawiera `slice is not valid mach-o file`
- Pełny przykład:

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**Naprawa — przebuduj pod lokalne środowisko (bez obniżania Node.js):**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **Uwaga:** To rekompiluje natywny binding względem lokalnej wersji Node.js i architektury CPU, usuwając niedopasowanie binarium. Oficjalnie wspierany zakres runtime to **`>=22.22.2 <23` lub `>=24.0.0 <27`** (`SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`, zgodny z polem `engines` w `package.json`). Node.js 24.x LTS (Krypton) i Node.js 26 są w pełni wspierane z `better-sqlite3` v12.x.

---

## Problemy z proxy

<a name="proxy-issues"></a>

### Walidacja providera pokazuje "fetch failed"

**Przyczyna:** Endpoint walidacji klucza API (`POST /api/providers/validate`) wcześniej omijał konfigurację proxy, co powodowało błędy w środowiskach wymagających routingu przez proxy.

**Naprawa (v3.5.5+):** To już naprawione. Walidacja providera idzie przez `runWithProxyContext`, automatycznie honorując proxy na poziomie providera i globalne.

### Health check tokena kończy się "fetch failed"

**Przyczyna:** Tło odświeżania tokenów OAuth nie rozwiązywało konfiguracji proxy per połączenie.

**Naprawa (v3.5.5+):** Scheduler health check tokenów rozwiązuje teraz config proxy per połączenie przed odświeżeniem. Zaktualizuj do v3.5.5+.

### Proxy SOCKS5 zwraca "invalid onRequestStart method"

**Przyczyna:** Na Node.js 22 dispatcher undici@8 jest niekompatybilny z wbudowanym `fetch()` w Node.

**Naprawa (v3.5.5+):** OmniRoute używa teraz własnego `fetch()` z undici, gdy aktywny jest dispatcher proxy, co daje spójne zachowanie. Zaktualizuj do v3.5.5+.

### Proxy MITM pod WSL: aplikacje desktop na hoście Windows nie są przechwytywane

**Przyczyna:** Proxy MITM i jego certyfikat CA instalują się w środowisku, w którym działa OmniRoute. Pod WSL to gość Linux, a aplikacje AI desktop (Kiro, Trae, Copilot, Zed, …) działają na hoście Windows. Aplikacje hosta nie ufają magazynowi certyfikatów gościa i nie idą przez systemowe proxy gościa, więc przechwytywanie desktop tam nie działa.

**Rekomendacja:** Uruchamiaj OmniRoute natywnie na tym samym OS co aplikacje desktop, które chcesz przechwytywać (Windows dla aplikacji Windows; analogicznie macOS/Linux). Trzymanie OmniRoute w WSL przy celowaniu w aplikacje hosta wymaga ręcznego zaufania wygenerowanemu certyfikatowi CA na hoście Windows i wskazania ustawień sieci/proxy każdej aplikacji hosta na endpoint proxy WSL — to nieobsługiwana, krucha konfiguracja.

---

## Problemy z providerami

### "Language model did not provide messages"

**Przyczyna:** Wyczerpany limit (quota) providera.

**Naprawa:**

1. Sprawdź tracker quota w dashboardzie
2. Użyj combo z warstwami fallback
3. Przełącz na tańszy/darmowy tier

### Limitowanie zapytań (rate limiting)

**Przyczyna:** Wyczerpany limit subskrypcji.

**Naprawa:**

- Dodaj fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/qwen3.8-max-preview`
- Użyj GLM/MiniMax jako taniego backupu

### Wygasły token OAuth

OmniRoute automatycznie odświeża tokeny. Jeśli problemy trwają:

1. Dashboard → Provider → Reconnect
2. Usuń i dodaj ponownie połączenie providera

### Kiro multi-account: drugie konto unieważnia pierwsze

**Przyczyna:** Backend Kiro wymusza jedną aktywną sesję na rejestrację klienta OIDC.
Gdy dwa konta dzielą ten sam zarejestrowany klient (połączenia zaimportowane przed v3.8.0),
odświeżenie tokena jednego konta unieważnia refresh token drugiego.

**Naprawa (v3.8.0+):** Zaimportuj ponownie dotknięte połączenia.
Od v3.8.0 każde nowe połączenie Kiro utworzone przez **Import Token**,
**Google/GitHub social login** albo **Auto-Import** automatycznie rejestruje własny
dedykowany klient OIDC. Połączenie jest więc w pełni izolowane i odświeżenie jednego
konta nie wpływa na żadne inne.

Połączenia zaimportowane _przed_ v3.8.0 nie mają rejestracji klienta per połączenie.
Nadal używają współdzielonego endpointu odświeżania social-auth.
Aby uzyskać izolację, usuń stare połączenie z Dashboard → Providers i dodaj je ponownie
przez którykolwiek z trzech flow importu.

Pełne szczegóły i instrukcja krok po kroku dodawania dwóch kont Kiro obok siebie:
[`docs/guides/KIRO_SETUP.md`](./KIRO_SETUP.md).

---

## Problemy z chmurą

### Błędy Cloud Sync

1. Sprawdź, czy `BASE_URL` wskazuje na działającą instancję (np. `http://localhost:20128`)
2. Sprawdź, czy `CLOUD_URL` wskazuje na endpoint chmury (np. `https://omniroute.dev`)
3. Utrzymuj wartości `NEXT_PUBLIC_*` zgodne z wartościami po stronie serwera

### Cloud `stream=false` zwraca 500

**Objaw:** `Unexpected token 'd'...` na endpoincie chmury przy wywołaniach bez streamingu.

**Przyczyna:** Upstream zwraca payload SSE, a klient oczekuje JSON.

**Obejście:** Użyj `stream=true` przy bezpośrednich wywołaniach chmury. Lokalny runtime ma fallback SSE→JSON.

### Chmura mówi Connected, ale "Invalid API key"

1. Utwórz świeży klucz z lokalnego dashboardu (`/api/keys`)
2. Uruchom cloud sync: Enable Cloud → Sync Now
3. Stare/niesynchroniczne klucze nadal mogą zwracać `401` w chmurze

---

## Problemy z Dockerem

### Docker IPv6 / Connection Reset

<a name="docker-ipv6"></a>

**Objawy:** `curl http://localhost:20128/v1/models` zwraca `curl: (56) Recv failure: Connection reset by peer`. Dashboard i endpointy bez auth działają, ale endpointy z auth padają — wygląda to jak problem z auth, ale nim nie jest.

**Przyczyna:** `docker run -p 20128:20128` publikuje zarówno na `0.0.0.0` (IPv4), jak i `::` (IPv6), ale proces w kontenerze nasłuchuje tylko na IPv4. Na hostach, gdzie `localhost` najpierw rozwiązuje się do `::1`, połączenie ląduje na opublikowanym porcie IPv6 bez listenera → connection reset.

**Naprawa:**

1. **Szybka diagnostyka:** Uruchom `curl -4 http://localhost:20128/v1/models`. Jeśli działa z `-4`, a bez niego nie — masz niedopasowanie bindu IPv6.
2. **Trwała poprawka:** Wymuś IPv4 przez `-p 127.0.0.1:20128:20128` w `docker run`:
   ```bash
   docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
     -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
   ```
   To wymusza bind IPv4 i dodatkowo nie eksponuje proxy na wszystkich interfejsach hosta.

---

### Narzędzie CLI pokazuje Not Installed

1. Sprawdź pola runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Tryb portable: użyj image target `runner-cli` (bundlowane CLI)
3. Tryb host mount: ustaw `CLI_EXTRA_PATHS` i zamontuj katalog bin hosta jako read-only
4. Jeśli `installed=true` i `runnable=false`: binarium znaleziono, ale healthcheck nie przeszedł

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
2. Przełącz model primary na GLM/MiniMax
3. Używaj darmowego tieru (Qoder, Kiro) do zadań niekrytycznych
4. Ustaw budżety kosztów per klucz API: Dashboard → API Keys → Budget

---

## Debugowanie

### Włącz pliki logów

Ustaw `APP_LOG_TO_FILE=true` w pliku `.env`. Logi aplikacji trafiają do `logs/`.
Artefakty żądań są przechowywane w `${DATA_DIR}/call_logs/`, gdy pipeline call logów jest
włączony w ustawieniach.
Gdy przechwytywanie pipeline jest włączone, ustaw `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS=false`, by pominąć
payloady chunków streamu, albo dostroić `CALL_LOG_PIPELINE_MAX_SIZE_KB`, by zmienić limit artefaktów w KB.

### Sprawdź health providera

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Przechowywanie runtime

- Stan główny: `${DATA_DIR}/storage.sqlite` (providerzy, combo, aliasy, klucze, ustawienia)
- Użycie: tabele SQLite w `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opcjonalnie `${DATA_DIR}/call_logs/`
- Logi aplikacji: `<repo>/logs/...` (gdy `APP_LOG_TO_FILE=true`)
- Artefakty call logów: `${DATA_DIR}/call_logs/YYYY-MM-DD/...`, gdy pipeline call logów jest włączony

Akcja **Clean history** na stronie Request Logs czyści `call_logs`, legacy
`request_detail_logs` oraz lokalny katalog artefaktów `${DATA_DIR}/call_logs/`.

---

## Problemy z circuit breakerem

### Provider utknął w stanie OPEN

Gdy circuit breaker providera jest OPEN, żądania są blokowane do wygaśnięcia cooldownu.

**Naprawa:**

1. Idź do **Dashboard → Settings → Resilience**
2. Sprawdź kartę circuit breakera dla dotkniętego providera
3. Kliknij **Reset All**, by wyczyścić wszystkie breakery, albo poczekaj na wygaśnięcie cooldownu
4. Przed resetem upewnij się, że provider faktycznie jest dostępny

### Provider wciąż wyzwala circuit breaker

Jeśli provider wielokrotnie wchodzi w stan OPEN:

1. Sprawdź **Dashboard → Health → Provider Health** pod kątem wzorca błędów
2. Idź do **Settings → Resilience → Provider Profiles** i podnieś próg awarii
3. Sprawdź, czy provider zmienił limity API albo wymaga ponownej autentykacji
4. Przejrzyj telemetrię latency — wysoka latency może dawać błędy timeout

---

## Problemy z transkrypcją audio

### Błąd "Unsupported model"

- Upewnij się, że używasz właściwego prefiksu: `deepgram/nova-3` lub `assemblyai/best`
- Sprawdź, czy provider jest podłączony w **Dashboard → Providers**

### Transkrypcja zwraca pusto albo pada

- Sprawdź wspierane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Sprawdź, czy rozmiar pliku mieści się w limitach providera (zwykle < 25MB)
- Sprawdź ważność klucza API na karcie providera

---

## Debugowanie Translatora

Użyj **Dashboard → Translator**, by debugować problemy z tłumaczeniem formatów:

| Tryb             | Kiedy używać                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Playground**   | Porównaj formaty wejścia/wyjścia obok siebie — wklej padające żądanie, by zobaczyć tłumaczenie |
| **Chat Tester**  | Wyślij live wiadomości i sprawdź pełny payload request/response wraz z nagłówkami              |
| **Test Bench**   | Uruchom testy batch po kombinacjach formatów, by znaleźć zepsute tłumaczenia                   |
| **Live Monitor** | Obserwuj przepływ żądań w czasie rzeczywistym, by złapać przerywane problemy z tłumaczeniem    |

### Typowe problemy z formatami

- **Tagi thinking się nie pojawiają** — Sprawdź, czy docelowy provider wspiera thinking i ustawienie thinking budget
- **Tool calls znikają** — Niektóre tłumaczenia formatów mogą obcinać nieobsługiwane pola; sprawdź w trybie Playground
- **Brak system prompt** — Claude i Gemini inaczej obsługują system prompt; sprawdź wynik tłumaczenia
- **SDK zwraca surowy string zamiast obiektu** — Rozwiązane w v1.x; sanitizer odpowiedzi usuwa niestandardowe pola (`x_groq`, `usage_breakdown` itd.), które powodują błędy walidacji Pydantic w OpenAI SDK. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **GLM/ERNIE odrzuca rolę `system`** — Rozwiązane w v1.x; normalizer ról automatycznie scala wiadomości system do user dla niekompatybilnych modeli. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **Rola `developer` nierozpoznana** — Rozwiązane w v1.x; automatycznie konwertowana na `system` dla providerów innych niż OpenAI. Jeśli nadal to widzisz na v3.x+, zgłoś issue.
- **`json_schema` nie działa z Gemini** — Rozwiązane w v1.x; `response_format` jest teraz konwertowane na `responseMimeType` + `responseSchema` Gemini. Jeśli nadal to widzisz na v3.x+, zgłoś issue.

---

## Ustawienia Resilience

### Auto rate-limit się nie uruchamia

- Auto rate-limit dotyczy tylko providerów z kluczem API (nie OAuth/subskrypcja)
- Sprawdź, czy w **Settings → Resilience → Provider Profiles** auto-rate-limit jest włączony
- Sprawdź, czy provider zwraca statusy `429` lub nagłówki `Retry-After`

### Strojenie exponential backoff

Profile providerów wspierają te ustawienia:

- **Base delay** — Początkowy czas oczekiwania po pierwszej awarii (domyślnie: 1s)
- **Max delay** — Górny limit czasu oczekiwania (domyślnie: 30s)
- **Multiplier** — O ile rośnie opóźnienie przy kolejnych awariach (domyślnie: 2x)

### Anti-thundering herd

Gdy wiele równoległych żądań trafia w rate-limitowanego providera, OmniRoute używa mutex + auto rate-limiting, by serializować żądania i zapobiec kaskadowym awariom. To automatyczne dla providerów z kluczem API.

---

## Opcjonalna taksonomia awarii RAG / LLM (16 problemów)

Część użytkowników OmniRoute stawia gateway przed stackami RAG lub agentów. W takich setupach często widać dziwny wzorzec: OmniRoute wygląda na zdrowy (providerzy w górze, profile routingu OK, brak alertów rate limit), a końcowa odpowiedź i tak jest zła.

W praktyce te incydenty zwykle pochodzą z downstream pipeline RAG, a nie z samego gatewaya.

Jeśli chcesz wspólnego słownika do opisu tych awarii, możesz użyć WFGY ProblemMap — zewnętrznego zasobu tekstowego na licencji MIT, który definiuje szesnaście powtarzających się wzorców awarii RAG / LLM. Na wysokim poziomie obejmuje:

- drift retrieval i zepsute granice kontekstu
- puste lub nieaktualne indeksy i magazyny wektorowe
- niedopasowanie embedding vs semantyka
- składanie promptów i problemy z oknem kontekstu
- zapaść logiki i nadmiernie pewne odpowiedzi
- awarie długich łańcuchów i koordynacji agentów
- drift pamięci multi-agent i ról
- problemy z deploymentem i kolejnością bootstrapu

Idea jest prosta:

1. Przy badaniu złej odpowiedzi zbierz:
   - zadanie użytkownika i request
   - route lub combo providera w OmniRoute
   - kontekst RAG użyty downstream (pobrane dokumenty, tool calls itd.)
2. Zmapuj incydent na jeden lub dwa numery WFGY ProblemMap (`No.1` … `No.16`).
3. Zapisz numer we własnym dashboardzie, runbooku lub trackerze incydentów obok logów OmniRoute.
4. Użyj odpowiadającej strony WFGY, by zdecydować, czy zmienić stack RAG, retriever, czy strategię routingu.

Pełny tekst i konkretne recepty są tutaj (licencja MIT, sam tekst):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Możesz pominąć tę sekcję, jeśli nie uruchamiasz pipeline’ów RAG ani agentów za OmniRoute.

---

## Znane problemy v3.8.0

Problemy specyficzne dla wydania v3.8.0 i aktualne obejścia. Gdy poprawka wyląduje w późniejszym patchu, wpis zostanie zaktualizowany lub usunięty.

### Flow OAuth Windsurf pada z 401

**Objawy:**

- "401 unauthorized" podczas kończenia flow OAuth Windsurf z dashboardu
- Karta providera Windsurf zostaje w stanie "needs reconnection" po callbacku

**Przyczyny:**

- Brakująca lub pusta zmienna env `WINDSURF_FIREBASE_API_KEY`
- `WINDSURF_API_KEY` źle skonfigurowany albo wskazuje na stary token
- Lokalny firewall/proxy blokuje callback OAuth

**Naprawa:**

1. Sprawdź, czy `WINDSURF_FIREBASE_API_KEY` i `WINDSURF_API_KEY` są ustawione w `.env`
2. Zrestartuj OmniRoute, by nowe wartości env weszły w życie
3. Ponów flow OAuth z **Dashboard → Providers → Windsurf → Reconnect**

### Awaria auth Devin CLI

**Objawy:**

- "Devin CLI not found" lub "auth failed" przy wywołaniu narzędzi opartych o Devin
- Sprawdzenie runtime CLI raportuje `installed=false`

**Przyczyny:**

- `CLI_DEVIN_BIN` wskazuje na nieistniejącą ścieżkę
- Devin CLI nie jest zainstalowany na hoście

**Naprawa:**

1. Zainstaluj Devin CLI dla swojej platformy
2. Ustaw `CLI_DEVIN_BIN=/usr/local/bin/devin` (lub rzeczywistą ścieżkę) w `.env`
3. Zrestartuj OmniRoute i przetestuj ponownie z **Dashboard → CLI Tools**

### Cooldown modelu utknął (ręczny reset)

**Objawy:**

- Model pozostaje na liście cooldown nawet po upływie czasu wygaśnięcia
- Żądania wciąż pomijają model w routingu combo mimo że timestamp jest w przeszłości

**Ręczny reset:**

- **Dashboard:** **Settings → Model Cooldowns** → kliknij **Re-enable** na dotkniętej karcie
- **API:** `DELETE /api/resilience/model-cooldowns` z nagłówkami management auth

### Połączenie providera Command Code pada z 403

**Objawy:**

- 403 przy teście połączenia providera Command Code
- Karta providera pokazuje "unauthorized" po świeżym dodaniu

**Przyczyna:** Flow OAuth nie dokończył się (callback nie dotarł albo token nie został zapisany).

**Naprawa:**

- Uruchom `omniroute providers` z CLI, by ponownie odpalić flow OAuth, albo
- Ponów OAuth z **Dashboard → Providers → Command Code → Reconnect**

### ModelScope zwraca agresywne cooldowny 429

**Objawy:**

- Bardzo krótkie lub natychmiastowe cooldowny na ModelScope po małej serii żądań
- Routing combo pomija ModelScope wcześniej niż oczekiwano

**Przyczyna:** ModelScope emituje providero-specyficzne nagłówki `Retry-After`. v3.8.0 ma dedykowaną obsługę tych nagłówków, więc starsze wersje odczytują je jako ogólne wskazówki rate-limit.

**Naprawa:**

- Upewnij się, że jesteś na v3.8.0 lub nowszej
- Sprawdź, czy przełącznik `useUpstream429BreakerHints` jest włączony w **Settings → Resilience**

### Brak `OMNIROUTE_WS_BRIDGE_SECRET` w produkcji

**Objawy:**

- 401 na każdym żądaniu mostu WebSocket Codex/Responses na zdalnym hoście produkcyjnym
- Handshake mostu WebSocket zamyka się zaraz po connect

**Przyczyna:** Brak zmiennej env `OMNIROUTE_WS_BRIDGE_SECRET` w środowisku produkcyjnym.

**Naprawa:**

1. Wygeneruj losowy sekret: `openssl rand -hex 32`
2. Ustaw `OMNIROUTE_WS_BRIDGE_SECRET=<random-secret>` w env serwera produkcyjnego (i każdego klienta łączącego się z mostem)
3. Zrestartuj OmniRoute

### Responses API: tryb background zdegradowany do synchronicznego

**Objawy:**

- Logowane ostrzeżenie: `background mode degraded to synchronous`
- Żądanie z `background: true` zwraca zwykłą synchroniczną odpowiedź zamiast handle joba background

**Przyczyna:** v3.8.0 celowo degraduje `background: true` w Responses API do wykonania synchronicznego z ostrzeżeniem. Pełne asynchroniczne tło to przyszła dostawa.

**Naprawa:**

- Dostosuj klienta, by wywoływał bez `background`, albo
- Poczekaj na późniejsze wydanie z pełnym trybem async background (śledź changelog)

---

## Nadal utknąłeś?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektura**: Zobacz [`docs/architecture/ARCHITECTURE.md`](../architecture/ARCHITECTURE.md) po szczegóły wewnętrzne
- **API Reference**: Zobacz [`docs/reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) po wszystkie endpointy
- **Health Dashboard**: Sprawdź **Dashboard → Health** pod kątem statusu systemu na żywo
- **Translator**: Użyj **Dashboard → Translator** do debugowania problemów z formatami
