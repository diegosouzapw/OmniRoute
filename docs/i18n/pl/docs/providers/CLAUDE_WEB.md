---
title: "Dostawcy — Claude Web"
version: 3.8.49
lastUpdated: 2026-07-14
---

# Dostawcy — Claude Web

## `claude-web`

`claude-web` wysyła żądania czatu w formacie OpenAI przez uwierzytelnioną sesję przeglądarki
`claude.ai`. Executor normalizuje dostarczone cookie, rozstrzyga jedną uwierzytelnioną
organizację, przygotowuje stan konwersacji, wybiera transport bezpośredni lub przeglądarkowy
i ściśle tłumaczy upstreamową odpowiedź SSE. Orkiestracja znajduje się w
`open-sse/executors/claude-web.ts:320`.

> **Nowy w dostawcach Web Cookie?**
>
> Przeczytaj **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, aby poznać ogólny proces konfiguracji, wskazówki dotyczące uwierzytelniania, ograniczenia i rozwiązywanie problemów, zanim przejdziesz do tego przewodnika specyficznego dla dostawcy.

### Katalog modeli

Rejestr dostawcy udostępnia obecnie dokładnie te siedem statycznych identyfikatorów modeli
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modelu                   | Nazwa wyświetlana       |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamiczne odkrywanie modeli nie jest zaimplementowane dla tego dostawcy. Powyższa lista to
katalog runtime.

### Poświadczenia i rozstrzyganie organizacji

Podaj pełny nagłówek Cookie z `claude.ai` albo samą wartość sesji. Same wartości sesji są
normalizowane do `sessionKey`; pozostałe cookie są zachowywane, jeśli zostaną podane. Executor
przyjmuje cookie przez `cookie` lub `apiKey` oraz
odczytuje opcjonalne wartości `deviceId` i `orgId` z danych połączenia
(`open-sse/executors/claude-web.ts:72`).

Jeśli `orgId` jest nieobecne, executor wywołuje `GET https://claude.ai/api/organizations` i używa pierwszej
organizacji zwróconej przez uwierzytelnioną sesję Claude Web
(`open-sse/executors/claude-web.ts:141`). Zamyka się awaryjnie (fail closed), gdy nie zostanie
zwrócona żadna prawidłowa organizacja, zgłasza odrzuconą autoryzację sesji jako 401 i rozróżnia
wyzwanie Cloudflare od błędu uwierzytelniania.

### Operacje konwersacji

Opcjonalny obiekt najwyższego poziomu `claude_web` jest ścisły. Nieznane pola są odrzucane. Jego
akceptowane pola są zdefiniowane w `open-sse/executors/claude-web/session.ts:50`:

| Pole                  | Znaczenie                                                |
| --------------------- | -------------------------------------------------------- |
| `operation`           | domyślnie `completion`; użyj `retry` dla tury ponowienia |
| `conversation_id`     | Jawny UUID istniejącej konwersacji                       |
| `parent_message_uuid` | Jawny UUID nadrzędnej wiadomości asystenta               |
| `timezone`            | Prawidłowa nazwa strefy czasowej IANA                    |
| `locale`              | Strukturalnie poprawny locale                            |
| `tool_states`         | Opcjonalna tablica stanów narzędzi konta, max 128 wpisów |

Przygotowane żądania używają jednego z dwóch endpointów upstream
(`open-sse/executors/claude-web.ts:203`):

- Nowa tura lub tura kontynuacyjna wysyła POST do
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ponowienie wysyła POST do
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Nowa tura zawiera `create_conversation_params`. Buforowana lub jawnie powiązana tura kontynuacyjna
zawiera `parent_message_uuid` i pomija `create_conversation_params`. Ponowienie wymaga zarówno
stanu konwersacji, jak i wiadomości nadrzędnej oraz nie wysyła promptu
(`open-sse/executors/claude-web/session.ts:254`). Nowe konwersacje otwierają uwierzytelniony
UI pod `/new`; buforowane lub jawnie powiązane kontynuacje otwierają dokładną stronę konwersacji
(`open-sse/executors/claude-web/session.ts:324`).

Stan konwersacji to pamięciowy cache kluczowany zakresem konta SHA-256 oraz kanonicznym
transkryptem wywołującego. Wpisy wygasają po 30 minutach, a cache jest ograniczony do 5000 wpisów
(`open-sse/executors/claude-web/session.ts:12`). Stan jest zatwierdzany dopiero po tym, jak ścisły
parser strumienia zaobserwuje `message_stop`; restart procesu go usuwa. Przy chybieniu cache
żądanie wielowiadomościowe jest serializowane do jednego promptu odzyskiwania zamiast cichego
porzucania wcześniejszych wiadomości.

Locale i strefa czasowa używają następującej kolejności pierwszeństwa: wartość `claude_web` z żądania, wartość połączenia,
wartość runtime, a następnie `en-US` dla locale lub `UTC` dla strefy czasowej
(`open-sse/executors/claude-web/session.ts:218`).

### Narzędzia i payloady żądań

Żądania bezpośrednie transformują wyłącznie strukturalnie poprawne narzędzia funkcji OpenAI
dostarczone przez wywołującego. Nie ma sfabrykowanej statycznej domyślnej listy narzędzi
(`open-sse/executors/claude-web/payload.ts:102`).

Żądania przeglądarkowe zamiast tego przechwytują uwierzytelnione żądanie UI i zachowują jego narzędzia konta,
stany narzędzi oraz spersonalizowane style. Przygotowane pola konwersacji, modelu, reasoning, promptu i
UUID wiadomości nadal nadpisują przechwycone żądanie
(`open-sse/executors/claude-web/browserTransport.ts:175`). Szablony przeglądarkowe są zakresowane przez
hash konta, organizacji, cookie, locale i strefy czasowej oraz wygasają po 30 minutach
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Gdy żądanie bezpośrednie nie ma narzędzi
wywołującego, może ponownie użyć tego zakresowanego szablonu; jawne narzędzia wywołującego mają pierwszeństwo
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Wybór transportu

Domyślna ścieżka to `sendClaudeWebDirect()`, która wywołuje `tlsFetchClaude()` ze skonfigurowanym
profilem Chrome 146 i dostarczonym cookie (`open-sse/services/claudeTlsClient.ts:23`). Nie
uruchamia solvera ani nie wytwarza zastępczego cookie.

Ustaw `WEB_COOKIE_USE_BROWSER` na `1`, `true` lub `on`, aby adapter przeglądarkowy
zakresowany do konta stał się transportem podstawowym. Ustaw `OMNIROUTE_BROWSER_POOL` na jedną z tych samych wartości, aby
zezwolić rozpoznanemu wyzwaniu Cloudflare 403 na fallback z transportu bezpośredniego do
adaptera przeglądarkowego (`open-sse/executors/claude-web.ts:195`). Inne błędy HTTP nie
uruchamiają tego fallbacku.

Adapter przeglądarkowy trzyma cookie w tym samym współdzielonym kontekście Playwright, używa zakresowanego
zahashowanego klucza opisanego powyżej i wysyła completion z tego kontekstu
(`open-sse/executors/claude-web/browserTransport.ts:444`). Nigdy nie eksportuje cookie
rozwiązanego w przeglądarce do bezpośredniego klienta TLS. Ponowienia przeglądarkowe wymagają niewygasłego szablonu UI powiązanego z
tym samym faktycznym kontekstem Playwright (`open-sse/executors/claude-web/browserTransport.ts:467`).
Odczyty odpowiedzi przeglądarkowych działają przyrostowo na uwierzytelnionej stronie, honorują anulowanie żądania
i anulują ciało upstream, gdy tylko przekroczy 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Executor zwraca zredagowaną projekcję audytową do współdzielonego loggera żądań: organizacja,
UUID konwersacji i wiadomości, tekst promptu, definicje narzędzi, cookie oraz identyfikatory urządzeń
są wykluczone (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Wyjątki transportu również zwracają ogólny błąd połączenia
zamiast rzuconego komunikatu.

### Zachowanie SSE

`createClaudeWebResponse()` obsługuje ramkowanie LF lub CRLF oraz wieloliniowe pola `data:`. Mapuje
delty tekstu na `content`, delty myślenia na `reasoning_content`, a znane zdarzenia metadanych
na rozszerzenie odpowiedzi `claude_web`. Każde zdarzenie metadanych jest projektowane przez własną listę
dozwolonych pól (`open-sse/executors/claude-web/stream.ts:37`). Metadane
konwersacji, wiadomości nadrzędnej, wiadomości asystenta i operacji są również zwracane w
nagłówkach `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Parser zamyka się awaryjnie przy niepoprawnym JSON, upstreamowych zdarzeniach `error`, nieznanych typach zdarzeń,
nieprawidłowej kolejności, niedopasowaniach bloków treści lub EOF przed `message_stop`. Wyjście strumieniowe
emituje jeden chunk finish i jeden `[DONE]`; wyjście buforowane używa tego samego parsera. Parser traktuje
`message_stop` jako terminalny natychmiast, anuluje końcowe dane upstream i propaguje
anulowanie downstream do czytnika upstream (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Niedomknięte linie SSE i skumulowane zdarzenia
są ograniczone do 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Pliki

| Plik                                                     | Przeznaczenie                               |
| -------------------------------------------------------- | ------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statyczny rejestr modeli dostawcy           |
| `open-sse/executors/claude-web.ts`                       | Orkiestracja executora                      |
| `open-sse/executors/claude-web/payload.ts`               | Transformacja payloadu i narzędzi           |
| `open-sse/executors/claude-web/session.ts`               | Stan tury i cache transkryptu               |
| `open-sse/executors/claude-web/transport.ts`             | Adapter transportu bezpośredniego           |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adapter przeglądarkowy zakresowany do konta |
| `open-sse/executors/claude-web/stream.ts`                | Ścisłe tłumaczenie SSE                      |
| `open-sse/services/claudeTlsClient.ts`                   | Natywny transport TLS                       |
| `open-sse/services/browserPool.ts`                       | Współdzielone konteksty Playwright          |

### Testowanie

Uruchom deterministyczny zestaw Claude Web bez prawdziwych poświadczeń:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Przypadki zależne od Playwright w `tests/unit/claude-web-auto-refresh.test.ts` są jawnie
pomijane. To repozytorium obecnie nie definiuje skryptu live-test Claude Web z poświadczeniami,
więc te pominięte przypadki nie stanowią dowodu runtime.

### Konfiguracja

1. Uruchom OmniRoute przez `npm run dev` lub zbudowaną instalację.
2. Otwórz Dashboard → Providers → Add Provider.
3. Wybierz kategorię Web Cookie oraz Claude Web.
4. Wklej pełny nagłówek Cookie skopiowany z uwierzytelnionego żądania `claude.ai`.
