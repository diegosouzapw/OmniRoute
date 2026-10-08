# Remote Mode (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Uruchamiaj CLI `omniroute` na swoim laptopie, podczas gdy sam OmniRoute działa gdzieś indziej
(na VPS-ie, serwerze domowym lub innym urządzeniu w Twojej sieci Tailnet). Logujesz się raz za pomocą
`omniroute connect`, a od tego momentu **każde** polecenie CLI jest kierowane do tego zdalnego
serwera — te same polecenia, te same dane wyjściowe, tylko wykonywane na serwerze zdalnym.

Nie trzeba instalować drugiego narzędzia: tryb zdalny to zwykły CLI `omniroute`
oraz **tokeny dostępu** z określonym zakresem uprawnień.

```bash
npm install -g omniroute                 # standardowy CLI
omniroute connect 192.168.0.15           # logowanie (hasło → token z określonym zakresem)
omniroute models list                    # ← teraz wyświetla modele ZDALNEGO serwera
omniroute configure codex                # ← zapisuje lokalny profil Codex ze zdalnego katalogu
```

---

## Jak to działa

```
Twój laptop                              zdalny OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (hasło → token)            │
│  kontekst: vps     │ ───────────────►  │ generuje token dostępu         │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ każda trasa zarządzania jest   │
│ zapisuje konfig.   │ ◄───────────────  │ sprawdzana wg zakresu tokenu   │
│ LOKALNIE           │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksty** przechowują po jednym serwerze (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` przełącza aktywny serwer; `default` oznacza serwer lokalny.
- **Tokeny dostępu** (`oma_live_…`) autoryzują polecenia zarządzania. Różnią się
  od kluczy API do inferencji (`sk-…`, używanych dla `/v1/chat/completions`).
- Po stronie serwera przechowywany jest wyłącznie skrót SHA-256 tokenu. Token w postaci jawnego tekstu jest wyświetlany
  **tylko raz**, podczas tworzenia.

---

## Łączenie

### Za pomocą hasła zarządzania (konfiguracja początkowa)

```bash
omniroute connect 192.168.0.15
# Hasło zarządzania dla http://192.168.0.15:20128: ********
# ✔ Połączono z http://192.168.0.15:20128 — kontekst „192.168.0.15” (zakres: admin)
```

Przepływ wykorzystujący hasło domyślnie generuje token **admin** (skoro masz hasło,
masz już pełną kontrolę). Ogranicz zakres za pomocą `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcje: `--port <p>` (gdy host nie zawiera portu), `--name <ctx>` (nazwa kontekstu),
`--scope read|write|admin`. Pełny adres URL jest używany bez zmian:
`omniroute connect https://omni.example.com`.

### Za pomocą wcześniej wygenerowanego tokenu

Wygeneruj token z określonym zakresem w panelu administracyjnym (lub za pomocą `omniroute tokens create`) i
wklej go — hasło nie jest potrzebne:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI weryfikuje go za pomocą `GET /api/cli/whoami` i zapisuje jako aktywny kontekst.

---

## Zakresy uprawnień

Trzy poziomy o strukturze hierarchicznej (`admin ⊃ write ⊃ read`):

| Zakres  | Dostępne operacje                                                                            |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | wyświetlanie/inspekcja — `models list`, `providers status`, `logs`, `usage`, `cost`          |
| `write` | odczyt **+** konfiguracja/zastosowanie — `setup-codex`, `keys add`, `config set`, kombinacje |
| `admin` | zapis **+** zarządzanie — CRUD `tokens`, dodawanie dostawców, usługi, zasady, oauth          |

Serwer określa zakres wymagany przez każdą trasę na podstawie metody HTTP
(`GET`→read, modyfikacje→write) oraz listy dozwolonych operacji administracyjnych dla wrażliwych obszarów
(modyfikacje `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token o niewystarczającym zakresie otrzymuje odpowiedź `403` z jasnym komunikatem.

> Trasy uruchamiające procesy (`/api/services/*`, `/api/mcp/*`, …) pozostają
> dostępne **wyłącznie przez interfejs loopback** — zdalny token nigdy nie uzyska do nich dostępu, niezależnie od zakresu.

---

## Łączenie Antigravity w instalacji zdalnej

Antigravity korzysta z ekranu zgody Google typu firstparty/nativeapp. Google
udostępnia kod autoryzacyjny tylko wtedy, gdy **przekierowanie zwrotne loopback**
(`http://127.0.0.1:<port>/callback`) jest **osiągalne z przeglądarki, w której
zatwierdzane jest logowanie**. W przypadku instalacji na zdalnym VPS ten adres
loopback znajduje się na serwerze, a nie na Twoim komputerze, więc ekran zgody
**zawiesza się na zawsze i nigdy nie zwraca kodu** — standardowy mechanizm awaryjny
„wklej adres URL wywołania zwrotnego” nie ma niczego do wklejenia. (Jest to
ograniczenie po stronie Google: takie samo zawieszenie występuje w każdym proxy,
które korzysta z dołączonego klienta desktopowego Antigravity, nie tylko w
OmniRoute).

Panel wykrywa ten problem, zanim utkniesz: otwarcie **Dostawcy → Antigravity →
Połącz** z adresu innego niż localhost zastępuje ogólny komunikat „skopiuj adres URL
wywołania zwrotnego” dwoma poniższymi rozwiązaniami, w których host i port są już
uzupełnione. (Adres LAN również się liczy — w kontekście tego wywołania zwrotnego
`192.168.x.x` nie jest adresem localhost).

Istnieją dwa obsługiwane sposoby połączenia Antigravity ze zdalnym OmniRoute.

### Opcja A — lokalny pomocnik logowania (zalecane)

Uruchom OAuth na **własnym komputerze**, na którym adres `127.0.0.1` jest osiągalny.
Pomocnik komunikuje się bezpośrednio z Google, dzięki czemu proces wyrażania zgody
może zostać ukończony tam, gdzie wersja dostępna w panelu nie jest w stanie tego
zrobić.

**Jeśli masz już aktywne połączenie** (`omniroute connect <host>`), nie musisz
niczego kopiować — pomocnik sam dostarczy dane uwierzytelniające do tej instalacji:

```bash
# Na Twoim komputerze LOKALNYM (wymaga Node.js i przeglądarki):
omniroute connect 192.168.0.15        # jednorazowo — generuje token kontekstu z uprawnieniami administratora
npx omniroute login antigravity
#   ↳ otwiera ekran zgody Google, przechwytuje wywołanie zwrotne na lokalnym porcie loopback,
#     wymienia je i wysyła dane uwierzytelniające metodą POST do aktywnego kontekstu:
#
#   Połączono Antigravity pod adresem http://192.168.0.15:20128 (połączenie abc123).
#   Nie trzeba niczego wklejać — możesz zamknąć ten terminal.
```

Wysłanie następuje automatycznie, gdy aktywny kontekst wskazuje na inny komputer.
Możesz je wymusić w dowolnym kierunku za pomocą `--push` / `--no-push` albo wskazać
konkretny kontekst za pomocą `--context <name>`.

**Jeśli Twój komputer nie może połączyć się z VPS** (zapora sieciowa, brak SSH,
odizolowane stanowisko), pomocnik nadal zadziała — _potrzebuje_ jedynie dostępu do
Google. Użyj `--no-push` albo po prostu pozwól, aby wysyłanie się nie powiodło:
zamiast odrzucić ukończoną już autoryzację, pomocnik wyświetli blob.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Następnie w **zdalnym** panelu przejdź do: **Dostawcy → Antigravity → Połącz** i wklej
blob `omniroute-cred-v1.…` w polu **Krok 2** (akceptuje ono zarówno adres URL
wywołania zwrotnego, jak i blob danych uwierzytelniających). OmniRoute go zdekoduje,
przeprowadzi proces wdrażania Cloud Code po stronie serwera i trwale zapisze
połączenie.

> Blob zawiera token odświeżania — traktuj go jak hasło. W wariancie z wysyłaniem
> jest przesyłany jednokrotnie przez uwierzytelnione połączenie kontekstu; w wariancie
> z wklejaniem — przez połączenie z panelem. W obu przypadkach jest przechowywany
> w postaci zaszyfrowanej, a po pomyślnym wysłaniu nigdy nie zostaje wyświetlony
> w terminalu.

Flagi: `--no-browser` (wyświetla adres URL zamiast automatycznie go otwierać),
`--port <n>` (ustawia port loopback), `--timeout <ms>`, `--push` / `--no-push`
(nadpisuje automatyczne dostarczanie), `--context <name>` (wskazuje konkretny
kontekst).

### Opcja B — tunel z lokalnym przekierowaniem SSH

Jeśli masz dostęp do VPS przez SSH, przekieruj port panelu tak, aby wywołanie zwrotne
loopback trafiało z powrotem do serwera przez tunel:

```bash
# Na Twoim komputerze LOKALNYM:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# następnie otwórz http://localhost:20128 w LOKALNEJ przeglądarce i połącz Antigravity
# w zwykły sposób — przekierowanie 127.0.0.1:20128/callback dociera teraz do VPS przez SSH.
```

Ponieważ otwierasz panel jako `localhost:20128`, proces wyrażania zgody Google
zostaje ukończony, a wywołanie zwrotne jest dostarczane do serwera przez ten sam
tunel — blob nie jest potrzebny. Nie zamykaj tunelu, dopóki połączenie nie zostanie
oznaczone jako aktywne.

W przeciwieństwie do opisanych poniżej dostawców ze stałym adresem loopback
**wystarczy jedno przekierowanie**: wywołanie zwrotne Antigravity korzysta z portu
samego panelu, więc nie trzeba tunelować drugiego portu specyficznego dla dostawcy.

> W pełni bezobsługową alternatywą (bez pomocnika i bez tunelu) jest skonfigurowanie
> **własnych** webowych danych uwierzytelniających Google OAuth oraz publicznego
> bazowego adresu URL; zobacz zmienne środowiskowe OAuth dostawcy. Dwie powyższe
> opcje nie wymagają dodatkowej konfiguracji Google.

---

## Łączenie Codex / Grok ze zdalną instalacją (dostawcy ze stałym adresem loopback)

Codex, xAI (`xai-oauth`) i Grok CLI (`grok-cli`) rejestrują **stały** adres loopback
`redirect_uri` w swojej nadrzędnej aplikacji OAuth. OmniRoute nie może go zmienić —
dostawca zawsze przekierowuje przeglądarkę z powrotem na ten sam, zakodowany na stałe adres:

| Dostawca    | Stały adres zwrotny, na który przekierowuje dostawca |
| ----------- | ---------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                    |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                    |

`localhost` oznacza tutaj **maszynę, na której działa przeglądarka**, natomiast serwer
wywołania zwrotnego PKCE OmniRoute nasłuchuje na interfejsie loopback **serwera**.
Gdy otworzysz panel pod adresem w sieci LAN, takim jak `http://192.168.0.15:20128`,
te dwa punkty nigdy się nie połączą: kod autoryzacyjny zostanie dostarczony do
`localhost:1455` Twojego laptopa, gdzie nic nie nasłuchuje, a dostawca przerwie
logowanie bez wyświetlenia błędu.

Panel wykrywa to przed otwarciem wyskakującego okna i zamiast dopuszczać do
bezgłośnego niepowodzenia logowania, wyświetla polecenie tunelowania (#8046).

### Rozwiązanie — przekieruj **oba** porty

```bash
# Na maszynie, na której działa PRZEGLĄDARKA:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# następnie przejdź do http://localhost:20128 i stamtąd połącz Codex
```

Wymagane są dwa przekierowania, a przekierowanie tylko jednego portu nadal nie zadziała:

- **`20128`** (port panelu) sprawia, że źródło jest rzeczywiście lokalnym hostem,
  co jest warunkiem uruchomienia przez OmniRoute serwera wywołania zwrotnego PKCE —
  źródło w sieci LAN nigdy nie dociera do tej gałęzi.
- **`1455`** (stały port wywołania zwrotnego dostawcy) to miejsce, do którego
  przekierowywana jest przeglądarka; musi on zostać przesłany przez tunel do
  interfejsu loopback serwera.

Podczas łączenia z xAI lub Grok CLI zamień `1455` na `56121`/`56122`, a `20128`
na rzeczywisty port panelu. Pozostaw tunel otwarty, dopóki połączenie nie zostanie
wyświetlone jako aktywne.

> **Brak dostępu SSH?** Codex i Grok CLI akceptują również wklejony token — służy
> do tego karta **Wklej klucz API** / **Importuj auth.json** w oknie dialogowym
> połączenia. Ta metoda nie korzysta z wywołania zwrotnego loopback, dlatego działa
> z dowolnego źródła. Codex akceptuje dodatkowo sam token dostępu lub dane sesji
> `~/.codex/auth.json`.

---

## Zarządzanie tokenami

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ wyświetla sekret TYLKO RAZ — skopiuj go teraz
omniroute tokens list                 # zamaskowane: identyfikator, nazwa, zakres, prefiks, stan, data wygaśnięcia
omniroute tokens revoke <id|prefix>   # natychmiast unieważnij
omniroute tokens scopes               # objaśnij trzy zakresy
```

Polecenia `tokens` wymagają poświadczenia **administratora**. Tokenami można
również zarządzać w panelu w sekcji **Ustawienia → Tokeny dostępu** (tworzenie,
unieważnianie, jednorazowe kopiowanie).

---

## Konfigurowanie narzędzia CLI do programowania ze zdalnego katalogu

`omniroute configure` odczytuje aktualny katalog modeli **aktywnego serwera**
i zapisuje konfigurację na **Twojej** maszynie.

```bash
omniroute configure codex
#   Dostawcy: glm, kmc, ollamacloud, opencode-go, …
#   Dostawca: glm
#   Identyfikator modelu: glm/glm-5.2
#   ✔ Zapisano ~/.codex/glm52.config.toml
#   Użycie:  codex --profile glm52

# tryb nieinteraktywny
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# umieść często używany model na początku interaktywnego selektora
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Selektor przechowuje w lokalnym pliku `model-preferences.json` wyłącznie
identyfikatory modeli (nigdy adresy URL ani poświadczenia), z podziałem na kontekst
i docelowe narzędzie CLI. Ulubione są wyświetlane przed ostatnimi wyborami; użyj
`--unfavorite`, aby usunąć wybrany model z listy dla danego kontekstu i narzędzia
docelowego.

Zapisany profil odwołuje się do klucza wnioskowania za pomocą zmiennej środowiskowej
(`OMNIROUTE_API_KEY`) — sekret nigdy nie jest zapisywany na dysku. Informacje
o jednorazowej konfiguracji bazowej Codex (blok `[model_providers.omniroute]`)
znajdziesz w pliku [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Uruchamianie narzędzia CLI względem serwera zdalnego (bez zapisywania konfiguracji)

`omniroute run <target>` również uwzględnia aktywny kontekst: zdalny bazowy adres
URL i poświadczenie kontekstu są wstrzykiwane wyłącznie do uruchamianego procesu.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → serwer zdalny
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Wyświetl dokładny podgląd uruchamianego procesu (tylko NAZWY KLUCZY środowiska, nigdy wartości):
omniroute run codex --dry-run --json
```

Cele: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(jedno źródło: `bin/cli/cli-manifest.mjs`). Qwen i Gemini działają z tymczasowym,
izolowanym katalogiem domowym, który jest usuwany po zakończeniu, dzięki czemu
uruchomienie nigdy nie modyfikuje konfiguracji Twoich osobistych narzędzi ani
nie powoduje przenikania do niej danych.

### Polecenia konfiguracji dla poszczególnych narzędzi CLI

Każde obsługiwane narzędzie CLI ma polecenie konfiguracji dostosowane do pracy
zdalnej (wszystkie uwzględniają aktywny kontekst albo opcje
`--remote <url> --api-key <key>`):

| CLI         | Polecenie                  | Co zapisuje                                                                                                                                                                                         |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profile `~/.codex/<name>.config.toml` (dla każdego modelu)                                                                                                                                          |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (dla każdego modelu)                                                                                                                                      |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — dostawca `omniroute` zgodny z OpenAI, ze wszystkimi modelami z katalogu (uruchom `opencode -m omniroute/<model>`)                                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (tryb CLI) + wyświetla ustawienia rozszerzenia VS Code do wklejenia (zgodne z OpenAI, bazowy adres URL **bez** `/v1`)                                    |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + ustawienia VS Code `kilocode.*` — zgodne z OpenAI, bazowy adres URL **z** `/v1`                                                                             |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **z** `/v1`, klucz przez `${{ secrets.OMNIROUTE_API_KEY }}`                                                |
| Cursor      | `omniroute setup-cursor`   | wyświetla kroki do wykonania w aplikacji (Settings → Models → Override OpenAI Base URL **z** `/v1` + klucz + model). Konfiguracja Cursor to nieprzejrzysta baza SQLite — tylko panel czatu          |
| Roo Code    | `omniroute setup-roo`      | zapisuje plik JSON do importu w Roo (`~/.omniroute/roo-settings.json`) + ustawia `roo-cline.autoImportSettingsPath` + wyświetla kroki w interfejsie (zgodne z OpenAI, bazowy adres URL **z** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — dostawca `openai-compat`, `base_url` **z** `/v1`, klucz przez `$OMNIROUTE_API_KEY`                                                                                   |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + instrukcja konfiguracji środowiska                                                          |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + instrukcja konfiguracji środowiska (`aider --message --yes`)                                                         |
| Qwen Code   | `omniroute setup-qwen`     | wpis V4 `modelProviders.openai` w `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` w `~/.qwen/.env`                                                                                                    |

```bash
# OpenCode (dostawca zgodny z OpenAI, wszystkie modele z katalogu, zdalny VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # zachowaj tylko pasujące modele
opencode -m omniroute/glm/glm-5.2 "..."          # najpierw wyeksportuj OMNIROUTE_API_KEY
```

> OpenCode oferuje również bogatszą integrację za pomocą **wtyczki**: `omniroute setup opencode`
> (obsługującą teraz zdalne połączenia przez `--remote`), która instaluje `@omniroute/opencode-plugin`.
> `setup-opencode` jest lekką alternatywą zgodną z OpenAI. Klucz API
> jest wskazywany przez `{env:OMNIROUTE_API_KEY}` — nigdy nie jest zapisywany na dysku.
>
> W OpenCode v2 użyj zamiast tego `@omniroute/opencode-plugin-v2`: ten sam katalog,
> inny kontrakt modułu ładującego. Gdy integracja jest połączona, wtyczka odczytuje klucz z własnego magazynu
> poświadczeń OpenCode, dzięki czemu zdalna brama w ogóle nie wymaga klucza w
> `opencode.json`.

---

## Zarządzanie kontekstami (przełączanie między serwerami)

**Kontekst** to zapisany serwer (baseUrl + dane uwierzytelniające + zakres). Polecenie `omniroute connect`
tworzy kontekst i ustawia go jako aktywny; od tego momentu każde polecenie jest kierowane do tego kontekstu. Kontekstami można zarządzać
i przełączać się między nimi za pomocą `omniroute contexts`:

```bash
omniroute contexts list            # wszystkie konteksty; aktywny jest oznaczony symbolem ●
omniroute contexts current         # aktywny serwer, stan uwierzytelnienia i zakres
```

```text
  | Nazwa   | Bazowy URL                | Uwierzytelnianie | Zakres | Opis
● | vps     | http://100.67.86.91:20128 | token            | admin  | Zdalny OmniRoute (…)
  | default | http://localhost:20128    | ✗                |        |
```

**Przełączanie serwerów** — każde kolejne polecenie korzysta z aktywnego kontekstu:

```bash
omniroute contexts use vps         # → wszystkie polecenia są teraz kierowane do zdalnego VPS
omniroute tokens list              #   (wykonywane na VPS)

omniroute contexts use default     # → powrót do localhost
omniroute tokens list              #   (wykonywane na serwerze lokalnym)
```

**Ręczne dodawanie kontekstu** (zamiast `connect`), wyświetlanie szczegółów lub zmiana nazwy:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # pełne szczegóły jednego kontekstu
omniroute contexts rename staging stg
```

**Usuwanie kontekstu** — wymaga potwierdzenia; przekaż `--yes`, aby je pominąć
(wymagane w skryptach / nieinteraktywnych powłokach, które w przeciwnym razie bezpiecznie odrzucą operację):

```bash
omniroute contexts remove stg --yes
```

> Kontekstu `default` (localhost) nie można usunąć. Usunięcie aktywnego kontekstu powoduje powrót
> do `default`. Wskazówka: usunięcie kontekstu usuwa jedynie **lokalnie** zapisane dane uwierzytelniające —
> aby faktycznie odebrać dostęp, unieważnij token na serwerze za pomocą `omniroute tokens revoke <id>`.

**Eksportowanie / importowanie** kontekstów (np. w celu przeniesienia ich między komputerami). Eksportowane dane domyślnie nie zawierają
danych uwierzytelniających, w tym danych przechowywanych w zapasowym magazynie plikowym. Użyj jawnie
`--include-secrets`, gdy potrzebna jest przenośna kopia zapasowa zawierająca dane uwierzytelniające:

```bash
omniroute contexts export --out contexts.json     # dane zredagowane; domyślne miejsce docelowe: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # nadpisanie; użyj --merge, aby zachować istniejące dane
omniroute contexts migrate --yes                  # przeniesienie starszych tokenów w postaci zwykłego tekstu do pęku kluczy
```

Opcja `--include-secrets` przed eksportem rozwiązuje odwołania do pęku kluczy i zgłasza błąd, jeśli nie można
odczytać któregokolwiek ze wskazanych poświadczeń. Opcja `--no-secrets` ma zawsze pierwszeństwo.
Pliki eksportu są zapisywane atomowo z trybem `0600`. Jawny eksport
zawierający dane poufne należy traktować jako materiał tajny. W systemach bez interfejsu graficznego, w których nie jest dostępny użyteczny
pęk kluczy systemu operacyjnego, CLI korzysta awaryjnie z pliku `config.json` z trybem `0600` i wyświetla
jednorazowe ostrzeżenie; w tym trybie domyślny eksport nadal nie zawiera danych poufnych.

---

## Szybki test kompleksowy

Gotowy do skopiowania i wklejenia cykl pozwalający zweryfikować od podstaw konfigurację zdalną — połączenie, utworzenie
tokena o określonym zakresie, skierowanie polecenia, powrót do poprzedniego kontekstu i usunięcie konfiguracji. Zastąp
`192.168.0.15` nazwą hosta/adresem IP swojego serwera (Tailscale, LAN lub publicznym
adresem URL `https://…`).

```bash
# 1. Połącz się (hasło → token administratora zapisany jako kontekst, który staje się aktywny)
omniroute connect 192.168.0.15                 # lub: --key oma_live_xxxx  (bez hasła)
omniroute contexts current                     # wyświetla zdalny serwer i zakres

# 2. Użyj go — polecenia administracyjne są teraz wykonywane na serwerze zdalnym
omniroute tokens create --name laptop --scope read   # utwórz token o węższym zakresie
omniroute tokens list                                 # zamaskowana lista ze zdalnego serwera

# 3. Przełączaj się między kontekstami
omniroute contexts use default                 # → lokalny
omniroute contexts use 192-168-0-15            # → ponownie zdalny (nazwa z `contexts list`)

# 4. Usuń konfigurację. UWAGA: `contexts remove` usuwa tylko LOKALNE dane uwierzytelniające —
#    NIE unieważnia tokena na serwerze. Jeśli chcesz faktycznie odebrać dostęp,
#    najpierw unieważnij token po stronie serwera.
omniroute tokens revoke <id|prefix>            # odbiera dostęp na serwerze
omniroute contexts remove 192-168-0-15 --yes   # usuń lokalny kontekst (nawet jeśli jest aktywny → nastąpi powrót do default), bez pytania
```

> Opcja `--yes` sprawia, że `contexts remove` działa nieinteraktywnie (jest wymagana w skryptach/CI; bez
> niej nieinteraktywna powłoka bezpiecznie odrzuci operację zamiast się zawiesić). Usunięcie
> **aktywnego** kontekstu powoduje automatyczny powrót do `default`.

---

## Uwagi dotyczące bezpieczeństwa

- Token w postaci jawnej jest wyświetlany tylko raz; zapisywany jest wyłącznie skrót SHA-256 (tak samo jak w przypadku kluczy API).
- `omniroute connect` korzysta z tej samej blokady przed atakami brute-force oraz rejestrowania audytowego co logowanie.
- Do transportu preferuj HTTPS lub Tailnet; sam host domyślnie używa `http://`
  dla wygody w sieci LAN/Tailscale — aby użyć TLS, podaj pełny adres URL `https://…`.
- Preferowany lokalny plik kontekstu to `~/.omniroute/config.json` (`chmod 600`),
  zawierający wyłącznie `credentialRef`; sam token jest przechowywany w pęku
  kluczy systemu operacyjnego (`keytar`) i nigdy nie jest wypisywany w logach. Instalacje bez interfejsu
  użytkownika, które nie mają działającego natywnego pęku kluczy, korzystają z tego samego pliku z uprawnieniami `0600`
  jako jawnie wskazanego rozwiązania awaryjnego i jednorazowo wyświetlają
  ostrzeżenie. Po zainstalowaniu backendu pęku kluczy użyj polecenia
  `omniroute contexts migrate --yes`.

---

## Endpointy API (dokumentacja)

| Metoda | Trasa                 | Uwierzytelnianie  | Zakres                          |
| ------ | --------------------- | ----------------- | ------------------------------- |
| POST   | `/api/cli/connect`    | hasło zarządzania | — (publiczny, chroniony hasłem) |
| GET    | `/api/cli/whoami`     | token dostępu     | odczyt                          |
| GET    | `/api/cli/tokens`     | token dostępu     | administrator                   |
| POST   | `/api/cli/tokens`     | token dostępu     | administrator                   |
| DELETE | `/api/cli/tokens/:id` | token dostępu     | administrator                   |

Pełne schematy znajdują się w pliku [openapi.yaml](../openapi.yaml).
