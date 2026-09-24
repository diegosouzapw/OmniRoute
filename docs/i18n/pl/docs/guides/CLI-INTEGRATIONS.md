# CLI Integrations (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute udostępnia rodzinę poleceń `setup-*`, które konfigurują narzędzie CLI
do programowania (Codex, Claude Code, OpenCode, Cline, …), aby używało OmniRoute jako zaplecza — dzięki czemu
narzędzie komunikuje się z **jednym** punktem końcowym, a OmniRoute kieruje żądania do właściwego dostawcy z
automatycznym przełączaniem awaryjnym. Każde polecenie odczytuje **aktualny** katalog modeli z działającej
instancji OmniRoute (lokalnej lub zdalnej) i zapisuje plik konfiguracyjny danego narzędzia na **Twoim**
komputerze. Klucz API jest wskazywany za pomocą zmiennej środowiskowej wszędzie tam, gdzie narzędzie
to obsługuje. Polecenia zapisujące lokalny dla narzędzia plik środowiskowy zostały wskazane poniżej.

Dostępny jest również uniwersalny program uruchamiający — `omniroute run <target>` — który uruchamia
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` lub `gemini` z
wstrzykniętymi odpowiednimi zmiennymi środowiskowymi, bez zapisywania jakiejkolwiek konfiguracji. Cele i ich
aliasy pochodzą z kanonicznego manifestu `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), a `omniroute completion` udostępnia te
same nazwy celów pochodzące z manifestu. Starsze programy uruchamiające przeznaczone dla poszczególnych narzędzi —
`omniroute launch` (Claude Code) i `omniroute launch-codex` (Codex) — pozostają
dostępne.

Dodawanie dostawców jest dostępne w tym samym kontekście lokalnym lub zdalnym. Poniższe
polecenia korzystające przede wszystkim z API oddzielają uwierzytelnianie administracyjne od danych
uwierzytelniających dostawcy i nigdy nie wyświetlają danych uwierzytelniających w ustrukturyzowanych danych wyjściowych:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

W skryptach preferuj `--credential-stdin` lub `--credential-env`; opcja `--credential`
pozostaje dostępna do kontrolowanego użytku lokalnego. Polecenie `providers remove` wymaga opcji `--yes` w
terminalu nieinteraktywnym, a wszystkie pięć poleceń respektuje aktywny kontekst lub
globalne opcje `--base-url`/`--api-key`.

Informacje o jednorazowej, ręcznej konfiguracji bazowej dwóch najbardziej rozbudowanych integracji znajdziesz w
szczegółowych przewodnikach dotyczących poszczególnych narzędzi:

- [Konfiguracja Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfiguracja Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Tryb zdalny](./REMOTE-MODE.md) — sterowanie zdalną instancją OmniRoute (VPS / Tailnet) z laptopa
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozszerzenie OmniCopilot; może ono również uruchamiać te
  polecenia `setup-*` z poziomu edytora

---

## Tabela zbiorcza

Każde polecenie respektuje **aktywny kontekst** (ustawiany za pomocą `omniroute connect`; zobacz
[Tryb zdalny](./REMOTE-MODE.md)) lub jawne opcje `--remote <url> --api-key <key>`.
„Lokalnie a zdalnie” poniżej oznacza: bez podania opcji używany jest adres `http://localhost:20128`;
z opcją `--remote` (lub aktywnym kontekstem zdalnym) katalog jest pobierany z danego
serwera, a konfiguracja jest zapisywana lokalnie.

| Polecenie                  | Narzędzie                  | Co zapisuje                                                                                                                                                                             | Kluczowe flagi                                                                                                                             | Lokalnie czy zdalnie |
| -------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI           | `~/.codex/<name>.config.toml` — jeden profil na każdy zgodny model tekstowy (`codex --profile <name>`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oba tryby            |
| `omniroute setup-claude`   | Claude Code                | `~/.claude/profiles/<name>/settings.json` — jeden profil na każdy pasujący model (`CLAUDE_CONFIG_DIR`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oba tryby            |
| `omniroute setup-opencode` | OpenCode (zgodny z OpenAI) | `~/.config/opencode/opencode.json` — dostawca `omniroute` ze wszystkimi modelami z katalogu (`opencode -m omniroute/<model>`)                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oba tryby            |
| `omniroute setup-cline`    | Cline                      | `~/.cline/data/{globalState,secrets}.json` (tryb CLI) + wyświetla ustawienia rozszerzenia VS Code                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oba tryby            |
| `omniroute setup-kilo`     | Kilo Code                  | `~/.local/share/kilo/auth.json` (CLI) + scala `kilocode.*` z plikiem `settings.json` VS Code, jeśli istnieje                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oba tryby            |
| `omniroute setup-continue` | Continue / CLI `cn`        | `~/.continue/config.yaml` — modele `provider: openai`, klucz za pośrednictwem `${{ secrets.OMNIROUTE_API_KEY }}`                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba tryby            |
| `omniroute setup-cursor`   | Cursor                     | Nic — wyświetla instrukcje do wykonania w aplikacji (konfiguracja Cursor to nieprzejrzysta baza SQLite)                                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oba tryby            |
| `omniroute setup-roo`      | Roo Code                   | `~/.omniroute/roo-settings.json` (dokument do importu) + ustawia `roo-cline.autoImportSettingsPath`, jeśli istnieje plik `settings.json` VS Code                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oba tryby            |
| `omniroute setup-crush`    | Crush                      | `~/.config/crush/crush.json` — dostawca `openai-compat`, klucz za pośrednictwem `$OMNIROUTE_API_KEY`                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba tryby            |
| `omniroute setup-goose`    | Goose                      | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + wyświetla instrukcje konfiguracji środowiska                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba tryby            |
| `omniroute setup-aider`    | Aider                      | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + wyświetla instrukcje konfiguracji środowiska                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba tryby            |
| `omniroute setup-qwen`     | Qwen Code                  | `~/.qwen/settings.json` — tablica V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` w `~/.qwen/.env`                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oba tryby            |
| `omniroute setup-5dive`    | 5dive (flota agentów)      | Nic w `$HOME` — zapisuje **profil uwierzytelniania** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) za pomocą `5dive agent auth set`; wymaga uprawnień roota, działa na hoście floty    | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oba tryby            |
| `omniroute run <target>`   | Uruchamianie (ogólne)      | Nic — uruchamia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` z odpowiednim środowiskiem i argumentami; Qwen i Gemini używają tymczasowego, izolowanego katalogu domowego | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba tryby            |
| `omniroute launch`         | Claude Code                | Nic — uruchamia `claude` z ustawionymi zmiennymi `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                            | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba tryby            |
| `omniroute launch-codex`   | OpenAI Codex CLI           | Nic — uruchamia `codex` z dostawcą `omniroute` przekazanym za pomocą flag `-c`                                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba tryby            |

Uwagi dotyczące flag (zweryfikowane w kodzie źródłowym polecenia):

- `--remote <url>` — pobiera katalog ze zdalnego OmniRoute (zastępuje `--port`
  i aktywny kontekst). `--api-key <key>` dostarcza dane uwierzytelniające dla tego
  serwera (domyślnie zmienna środowiskowa `OMNIROUTE_API_KEY` lub token aktywnego kontekstu).
- `--only <patterns>` — podciągi rozdzielone przecinkami; zachowuje tylko identyfikatory modeli,
  które pasują (np. `--only glm,kimi`). Dostępne w `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — wyświetla dokładnie to, co zostałoby zapisane, bez modyfikowania
  systemu plików. Dostępne w każdym poleceniu `setup-*` **z wyjątkiem** `setup-cursor`
  (które nigdy nie zapisuje pliku).
- `--model <id>` — wymagane (lub wybierane interaktywnie) dla narzędzi bez
  automatycznego wykrywania modeli: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Narzędzia te
  akceptują również `--yes` w przypadku uruchomień nieinteraktywnych (co wymaga wtedy `--model`).
  `setup-opencode` przyjmuje `--model`, aby ustawić domyślny model najwyższego poziomu.
- `--model <id>` w `omniroute run` jest przekazywane zgodnie z konfiguracją poszczególnych celów
  w manifeście (`bin/cli/cli-manifest.mjs`): **aider** otrzymuje `--model openai/<id>`, a
  **opencode** `--model omniroute/<id>` (prefiks jest dodawany tylko wtedy, gdy identyfikator
  jeszcze go nie zawiera); **qwen** i **gemini** otrzymują identyfikator bez zmian;
  **claude** otrzymuje go przez `ANTHROPIC_MODEL`, **goose** przez `GOOSE_MODEL`, a
  **codex** przez argumenty `-c model_providers.omniroute.*`. **Qwen jest jedynym celem
  uruchomieniowym, który bezwzględnie wymaga `--model`** — `omniroute run qwen` bez tej flagi
  kończy działanie z kodem `2` i jednoznacznym komunikatem o błędzie.
- `--port <port>` — lokalny port OmniRoute (domyślnie `20128`, ignorowany, gdy ustawiono
  `--remote`). Dostępne we wszystkich poleceniach `setup-*` i obu programach uruchamiających.
- Kody zakończenia `omniroute run`: kod zakończenia podrzędnego CLI jest przekazywany
  bez zmian; `2` = nieprawidłowe argumenty (nieobsługiwany cel, brak wymaganego
  `--model`, blokada kontenera); `127` = plik wykonywalny celu nie znajduje się w `PATH`;
  `130`/`143`/`129`, gdy uruchomienie zostanie zakończone przez `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = inny błąd uruchamiania w czasie wykonywania.
- Oba programy uruchamiające (`launch`, `launch-codex`) akceptują `--profile <name>`, aby wybrać
  profil zapisany przez `setup-claude` / `setup-codex`, a także argumenty przekazywane
  do bazowego pliku wykonywalnego `claude` / `codex`.

Interaktywny selektor jest również współdzielony przez procedury konfiguracji:

```bash
# Wybierz z aktywnego lokalnego lub zdalnego katalogu modeli i skonfiguruj cel.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` obecnie deleguje działanie do przetestowanych procedur dla `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` i `5dive`.
Pozycje katalogu przeznaczone wyłącznie dla IDE,
MITM oraz poradników nadal korzystają z jawnych procedur `setup-*`/ręcznych i
nie są przedstawiane jako cele możliwe do uruchomienia.

> `setup-opencode` to **lekka, zgodna z openai** integracja OpenCode.
> Istnieje również bogatsza integracja oparta na wtyczce — `omniroute setup opencode` — która
> instaluje `@omniroute/opencode-plugin`. Są to różne polecenia; powyższa tabela
> opisuje `setup-opencode`.
>
> Wtyczka jest dostępna w dwóch pakietach, po jednym dla każdej głównej wersji OpenCode,
> ponieważ oba mechanizmy ładowania oczekują różnych punktów wejścia:
> `@omniroute/opencode-plugin` dla OpenCode v1 oraz
> `@omniroute/opencode-plugin-v2` dla OpenCode v2. Pakiet v2 jest nowy
> (`0.1.0`) i korzysta z kontraktu hosta, który nadal się zmienia, dlatego odczytuje
> strukturę umieszczaną przez OpenCode w wersji roboczej katalogu, zamiast zakładać jej format.
> Aby go zainstalować, dodaj wpis `plugins` do `opencode.json`; `omniroute setup opencode`
> nadal instaluje pakiet v1. Opcje i kolejność wyszukiwania danych uwierzytelniających opisano
> w pliku README pakietu.

---

## Użycie lokalne

Gdy OmniRoute działa na `localhost:20128`, wystarczy uruchomić polecenie konfiguracji dla swojego
narzędzia. Katalog jest pobierany z lokalnego serwera.

```bash
# Codex: zapisz profil dla każdego dopasowanego modelu w ~/.codex/
omniroute setup-codex
codex --profile glm52            # użyj wygenerowanego profilu

# Claude Code: zapisz profile dla poszczególnych modeli, a następnie uruchom jeden z nich
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapisz dostawcę zgodnego z OpenAI wraz ze wszystkimi modelami z katalogu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odwołanie przez {env:OMNIROUTE_API_KEY}, nigdy nie jest zapisywany na dysku
opencode -m omniroute/glm/glm-5.2 "..."

# Narzędzia bez automatycznego wykrywania wymagają jawnego wskazania modelu:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Podgląd bez zapisywania czegokolwiek:
omniroute setup-continue --dry-run
```

Uruchomienie bez zapisywania jakiejkolwiek konfiguracji (wyłącznie przez wstrzykiwanie zmiennych środowiskowych):

```bash
omniroute launch                 # Claude Code → lokalny OmniRoute
omniroute launch-codex           # Codex CLI → lokalny OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "odpowiedz OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "odpowiedz OK"
omniroute run qwen --model glm/glm-5.2 -- -p "odpowiedz OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "odpowiedz OK"

# Jawna ścieżka polecenia: przekaż bez zmian wszystko, co znajduje się po --
omniroute run claude -- --print-system-prompt "przejrzyj te różnice"
```

---

## Użycie zdalne

Skieruj dowolne polecenie konfiguracji do zdalnego OmniRoute za pomocą `--remote` i `--api-key`. Katalog
zostanie pobrany ze zdalnego serwera, a konfiguracja zapisana na komputerze lokalnym.

```bash
# OpenCode ze zdalnym VPS-em, zachowaj tylko modele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # najpierw wyeksportuj OMNIROUTE_API_KEY

# Profile Codex ze zdalnego katalogu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Uruchom CLI bezpośrednio względem zdalnego serwera
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Zamiast za każdym razem przekazywać `--remote`/`--api-key`, zaloguj się raz i pozwól, aby
**aktywny kontekst** dostarczał je automatycznie:

```bash
omniroute connect 192.168.0.15        # generuje token o ograniczonym zakresie i zapisuje kontekst
omniroute setup-codex                 # ← teraz używa zdalnego katalogu
omniroute setup-opencode              # ← tak samo
omniroute launch                      # ← Claude Code względem zdalnego serwera
```

Informacje o kontekstach, zakresach i zarządzaniu tokenami zawiera dokument [Tryb zdalny](./REMOTE-MODE.md).

---

## Floty agentów 5dive

[5dive](https://5dive.ai) uruchamia flotę długo działających agentów programistycznych, z których każdy jest
jednostką systemd działającą na własnym koncie użytkownika systemu Unix. Samo w sobie nie jest to CLI do programowania, dlatego
`omniroute run` nie ma czego uruchamiać — `5dive` jest celem **wyłącznie konfiguracyjnym**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Obie formy zapisują jeden **profil uwierzytelniania** 5dive, a każde stanowisko `claude` powiązane z tym
profilem komunikuje się następnie z OmniRoute. Dla tego celu charakterystyczne są trzy kwestie:

- **Polecenie działa na hoście floty jako użytkownik root.** Polecenia 5dive operują na lokalnych jednostkach systemd
  oraz katalogu stanu należącym do użytkownika root; tryb zdalny nie jest dostępny. Procedura uruchamia się ponownie przez
  `sudo`, jeśli nie działa już jako root (`--no-sudo` wyłącza to zachowanie i zamiast tego wyświetla
  polecenie).
- **Punkt końcowy musi używać `https://`, chyba że jest adresem pętli zwrotnej.** Klucz API agenta
  jest przesyłany pod ten adres URL przy każdym żądaniu, a 5dive odrzuca nieszyfrowany punkt końcowy poza hostem.
  Prywatny adres LAN nie stanowi wyjątku.
- **Model przypisany bezpośrednio do każdego stanowiska ma pierwszeństwo przed profilem.** Profil zawiera
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ale stanowisko nadal przypisane do standardowego
  identyfikatora modelu zakończy swoją pierwszą turę błędem _„Wystąpił problem z wybranym modelem”_.
  Przekaż `--agent <name>` (można powtórzyć), aby przypisać modele również do stanowisk; w przeciwnym razie procedura wyświetli
  odpowiednie polecenie.

Klucz API jest przekazywany do 5dive przez **stdin** (`--api-key=-`), dzięki czemu nigdy nie pojawia się
w wynikach polecenia `ps`.

Skierowanie profilu do **kombinacji** OmniRoute zamiast do pojedynczego modelu zapewnia
flocie przełączanie awaryjne między dostawcami: gdy główny punkt końcowy przestał całkowicie działać w trakcie tury
podczas przebiegu zarejestrowanego w
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent ukończył
pozostałe kroki przy użyciu dostawcy zapasowego, nie ujawniając awarii.

---

## Konwencje bazowego adresu URL (które narzędzia wymagają `/v1`)

OmniRoute udostępnia interfejs OpenAI pod `/v1`, interfejs Anthropic w katalogu głównym,
a natywny interfejs Gemini pod `/v1beta`. Każda integracja jest skonfigurowana zgodnie z formatem,
którego oczekuje jej narzędzie (zweryfikowano w kodzie źródłowym polecenia):

| Integracja                                                                 | Zapisywany bazowy URL | `/v1`?                                      |
| -------------------------------------------------------------------------- | --------------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | katalog główny        | Nie — Cline dodaje `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | katalog główny        | Nie — Goose dodaje ścieżkę                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | katalog główny        | Nie — LiteLLM dodaje `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | z `/v1`               | Tak                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | katalog główny        | Nie — Claude Code dodaje `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | z `/v1`               | Tak                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | z `/v1`               | Tak                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | katalog główny        | Nie — SDK dodaje `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` w profilu uwierzytelniania)            | katalog główny        | Nie — Claude Code dodaje `/v1/messages`     |

---

## Zachowywanie natywnych zależności podczas aktualizacji: `--include=optional`

Podczas aktualizacji za pomocą `omniroute update` (po potwierdzeniu lub z opcją `--apply`)
OmniRoute uruchamia instalację z wbudowaną opcją `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

**Nie** jest to opcja przekazywana do `omniroute update` — aktualizator zawsze stosuje ją
automatycznie. Gwarantuje ona, że `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, stos SLM LLMLingua) zostaną zachowane po aktualizacji, nawet jeśli konfiguracja npm
zawiera ustawienie `omit=optional`, które w przeciwnym razie bez ostrzeżenia usunęłoby natywny
sterownik SQLite oraz integrację z systemowym magazynem kluczy. Aby wyświetlić dokładne polecenie bez jego wykonywania:

```bash
omniroute update --dry-run
# [PRÓBA GENERALNA] Zostałoby uruchomione: npm install -g omniroute@latest --include=optional
```

Inne opcje `omniroute update` (zweryfikowane w kodzie źródłowym): `--check` (kod wyjścia 1, jeśli
wersja jest nieaktualna), `--apply` (instalacja bez pytania o potwierdzenie), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI za pośrednictwem `omniroute run gemini`

Kontrakt zweryfikowano względem `@google/gemini-cli` 0.50.0: CLI respektuje
`GOOGLE_GEMINI_BASE_URL` i wysyła żądania `POST /v1beta/models/<model>:generateContent`
(oraz `:streamGenerateContent?alt=sse`) pod ten adres — dokładnie tak działa natywny
interfejs Gemini w OmniRoute (`/v1beta`). `omniroute run gemini` konfiguruje to automatycznie:

- `GOOGLE_GEMINI_BASE_URL` → aktywny bazowy adres URL OmniRoute (katalog główny, bez `/v1`);
- `GEMINI_API_KEY` → ustalone dane uwierzytelniające OmniRoute (opcja/środowisko/kontekst);
- **tymczasowy, izolowany `GEMINI_CLI_HOME`**, którego plik `.gemini/settings.json`
  wybiera uwierzytelnianie `gemini-api-key`, dzięki czemu zapisana sesja Google OAuth (Code Assist)
  nigdy nie zastąpi uruchomienia skierowanego do OmniRoute — katalog jest usuwany po zakończeniu;
- **higiena środowiska**: ze środowiska procesu potomnego usuwane są zmienne `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` oraz `GOOGLE_GENAI_USE_GCA` (które przekierowałyby
  uwierzytelnianie do Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` jest
  ustawiane jako dodatkowe zabezpieczenie — pozostałe cele `run` są traktowane tak samo
  w odniesieniu do właściwych im kolidujących zmiennych;
- dodanie `--model <id>` na podstawie `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Mechanizm ochrony zaufania do obszaru roboczego Gemini nadal obowiązuje w trybie bez interfejsu — należy
samodzielnie przekazać `--skip-trust` (lub interaktywnie oznaczyć katalog jako zaufany); program uruchamiający
celowo go nie omija. Ten mechanizm uruchamiania jest niezależny od **rejestracji ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), która pozostaje integracją protokołu agentów dla
`/dashboard/acp-agents`.

---

## Rzeczywisty test dymny (opcjonalny)

Deterministyczne testy regresyjne planu uruchamiania są wykonywane w CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Aby zweryfikować RZECZYWISTE pliki binarne względem RZECZYWISTEGO
serwera OmniRoute, dostępny jest opcjonalny mechanizm testowy w
`tests/integration/upstream-cli-smoke.int.test.ts`. Nigdy nie uruchamia się on automatycznie
(każdy podtest jest pomijany, chyba że ustawiono `RUN_CLI_SMOKE=1`), przekazuje dane uwierzytelniające przez NAZWĘ
zmiennej środowiskowej (nigdy przez jej wartość), usuwa ciągi przypominające klucze z wszelkich zapisanych danych wyjściowych, pomija
cele, których plik binarny nie jest zainstalowany, oraz klasyfikuje niepowodzenia jako
uwierzytelnianie / usługa nadrzędna / konfiguracja zamiast zwykłej wartości logicznej:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcjonalnie: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ogranicza zakres testu;
`OMNIROUTE_SMOKE_TIMEOUT_MS` zastępuje 120-sekundowy limit czasu dla każdego celu.

---

## Zobacz także

- [Konfiguracja Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — bardziej szczegółowy przewodnik po Claude Code
- [Konfiguracja Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorazowa konfiguracja podstawowa `[model_providers.omniroute]`
- [Tryb zdalny](./REMOTE-MODE.md) — konteksty, tokeny dostępu o ograniczonym zakresie i sterowanie zdalnym serwerem
- [Dokumentacja narzędzi CLI](../reference/CLI-TOOLS.md) — pełny katalog obsługiwanych narzędzi i stron panelu
- [Przewodnik konfiguracji](./SETUP_GUIDE.md) — metody instalacji i proces wdrożenia przy pierwszym uruchomieniu
