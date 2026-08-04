---
title: "Tryb zdalny — steruj zdalnym OmniRoute z laptopa"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Tryb zdalny

Uruchom CLI `omniroute` na laptopie, podczas gdy samo OmniRoute działa gdzie indziej
(VPS, serwer domowy, inna maszyna w Tailnet). Logujesz się raz przez
`omniroute connect`, a odtąd **każde** polecenie CLI celuje w ten zdalny
serwer — te same komendy, ten sam wynik, tylko wykonane względem zdalnego hosta.

Nie ma drugiego narzędzia do instalacji: tryb zdalny to zwykłe CLI `omniroute`
plus tokeny dostępu ze **scope**.

```bash
npm install -g omniroute                 # the normal CLI
omniroute connect 192.168.0.15           # log in (password → scoped token)
omniroute models list                    # ← now lists the REMOTE server's models
omniroute configure codex                # ← writes a local Codex profile from the remote catalog
```

---

## Jak to działa

```
your laptop                              remote OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (password → token)         │
│  context: vps      │ ───────────────►  │ mints a scoped access token    │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ every management route, scope- │
│ writes configs     │ ◄───────────────  │ checked per the token's scope  │
│ LOCALLY            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksty** przechowują po jednym serwerze (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` przełącza aktywny serwer; `default` to lokalny.
- **Tokeny dostępu** (`oma_live_…`) autoryzują polecenia zarządzające. Są
  odrębne od kluczy API do inferencji (`sk-…`, używanych dla `/v1/chat/completions`).
- Po stronie serwera zapisywany jest tylko hash SHA-256 tokena. Tekst jawny pokazywany jest
  **raz**, przy utworzeniu.

---

## Łączenie

### Hasłem zarządzania (bootstrap)

```bash
omniroute connect 192.168.0.15
# Management password for http://192.168.0.15:20128: ********
# ✔ Connected to http://192.168.0.15:20128 — context '192.168.0.15' (scope: admin)
```

Przepływ z hasłem domyślnie wystawia token **admin** (masz hasło, więc
i tak masz pełną kontrolę). Zawęż scope przez `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcje: `--port <p>` (gdy host nie ma portu), `--name <ctx>` (nazwa kontekstu),
`--scope read|write|admin`. Pełny URL jest honorowany bez zmian:
`omniroute connect https://omni.example.com`.

### Wcześniej wygenerowanym tokenem

Wygeneruj token ze scope w dashboardzie (lub przez `omniroute tokens create`) i
wklej go — hasło nie jest potrzebne:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI waliduje go przez `GET /api/cli/whoami` i zapisuje jako aktywny kontekst.

---

## Scope

Trzy poziomy, hierarchicznie (`admin ⊃ write ⊃ read`):

| Scope   | Co może                                                                                |
| ------- | -------------------------------------------------------------------------------------- |
| `read`  | listowanie/podgląd — `models list`, `providers status`, `logs`, `usage`, `cost`        |
| `write` | read **+** konfiguracja/zastosowanie — `setup-codex`, `keys add`, `config set`, combos |
| `admin` | write **+** zarządzanie — CRUD `tokens`, dodawanie providerów, services, policy, oauth |

Serwer wywnioskuje wymagany scope każdej trasy z metody HTTP
(`GET`→read, mutacje→write) oraz z allowlisty admin dla wrażliwych powierzchni
(`/api/cli/tokens`, mutacje `/api/providers`, `/api/oauth`, `/api/services`, …).
Token z niewystarczającym scope dostaje `403` z jasnym komunikatem.

> Trasy uruchamiające procesy (`/api/services/*`, `/api/mcp/*`, …) pozostają
> **tylko-loopback** — zdalny token nigdy do nich nie dotrze, niezależnie od scope.

---

## Podłączanie Antigravity na zdalnej instalacji

Antigravity używa ekranu zgody Google firstparty/nativeapp. Google wydaje
kod autoryzacji tylko wtedy, gdy **przekierowanie loopback**
(`http://127.0.0.1:<port>/callback`) jest **osiągalne z przeglądarki, która
zatwierdza logowanie**. Na zdalnym VPS ten loopback żyje na
serwerze, nie na Twojej maszynie, więc ekran zgody **wisi w nieskończoność i nigdy
nie emituje kodu** — zwykły fallback „wklej URL callbacku” nie ma czego
wkleić. (To ograniczenie po stronie Google: ten sam hang występuje w każdym proxy
używającym dołączonego klienta desktop Antigravity, nie tylko w OmniRoute.)

Dashboard wykrywa to, zanim ugrzęźniesz: otwarcie **Providers → Antigravity →
Connect** z adresu innego niż localhost zamienia ogólne powiadomienie „skopiuj URL callbacku”
na dwa poniższe rozwiązania, każde z już wypełnionym hostem i portem.
(Adres LAN się liczy — `192.168.x.x` nie jest localhostem z punktu widzenia tego callbacku.)

Są dwa obsługiwane sposoby podłączenia Antigravity do zdalnego OmniRoute.

### Opcja A — lokalny helper logowania (zalecane)

Uruchom OAuth na **własnym komputerze**, gdzie `127.0.0.1` jest osiągalne, i wklej
wynik do zdalnego dashboardu. Helper rozmawia tylko z Google — **nie**
potrzebuje dostępu sieciowego do VPS, więc działa nawet za firewallami.

```bash
# On your LOCAL machine (needs Node.js + a browser):
npx omniroute login antigravity
#   ↳ opens the Google consent in your browser, captures the callback on a local
#     loopback port, exchanges it, and prints a one-line credential blob:
#
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Następnie w **zdalnym** dashboardzie: **Providers → Antigravity → Connect** i
wklej blob `omniroute-cred-v1.…` w pole **Step 2** (akceptuje albo
URL callbacku, albo blob poświadczeń). OmniRoute dekoduje go, uruchamia onboarding Cloud Code
po stronie serwera i utrwala połączenie.

> Blob zawiera refresh token — traktuj go jak hasło. Jest wysyłany raz
> przez połączenie z dashboardem i przechowywany zaszyfrowany w spoczynku.

Flagi: `--no-browser` (wypisz URL zamiast auto-otwierania), `--port <n>`
(przypnij port loopback), `--timeout <ms>`.

### Opcja B — tunel SSH local-forward

Jeśli masz dostęp SSH do VPS, przekieruj port dashboardu tak, by
callback loopback wracał do serwera przez tunel:

```bash
# On your LOCAL machine:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# then open http://localhost:20128 in your LOCAL browser and connect Antigravity
# normally — the 127.0.0.1:20128/callback redirect now reaches the VPS via SSH.
```

Ponieważ trafiasz do dashboardu jako `localhost:20128`, zgoda Google
kończy się, a callback trafia na serwer przez ten sam tunel —
bez bloba. Trzymaj tunel otwarty, aż połączenie pokaże się jako aktywne.

W przeciwieństwie do providerów z fixed-loopback poniżej, **wystarczy jedno przekierowanie**:
callback Antigravity jedzie na porcie samego dashboardu, więc nie ma drugiego
portu specyficznego dla providera do tunelowania.

> W pełni headlessowa alternatywa (bez helpera, bez tunelu) to skonfigurowanie **własnych**
> poświadczeń Google OAuth web + publicznego base URL; zobacz zmienne środowiskowe OAuth
> providera. Dwie powyższe opcje nie wymagają dodatkowej konfiguracji Google.

---

## Podłączanie Codex / Grok na zdalnej instalacji (providery fixed-loopback)

Codex, xAI (`xai-oauth`) i Grok CLI (`grok-cli`) rejestrują **stały** loopback
`redirect_uri` w upstreamowej aplikacji OAuth. OmniRoute nie może go zmienić — provider
zawsze odsyła przeglądarkę na ten sam zahardkodowany adres:

| Provider    | Stały callback, na który przekierowuje provider |
| ----------- | ----------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`           |
| `xai-oauth` | `http://127.0.0.1:56121/callback`               |
| `grok-cli`  | `http://127.0.0.1:56122/callback`               |

`localhost` oznacza tam **maszynę z przeglądarką**, podczas gdy serwer callback PKCE
OmniRoute nasłuchuje na loopbacku **serwera**. Otwórz dashboard pod adresem LAN
jak `http://192.168.0.15:20128` i te dwa się nie spotkają: kod autoryzacji
trafia na `localhost:1455` Twojego laptopa, gdzie nic nie nasłuchuje,
a provider kończy logowanie niepowodzeniem bez pokazania błędu.

Dashboard wykrywa to przed otwarciem popup i pokazuje komendę tunelu
zamiast pozwalać na ciche niepowodzenie logowania (#8046).

### Naprawa — przekieruj **oba** porty

```bash
# On the machine running the BROWSER:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# then browse to http://localhost:20128 and connect Codex from there
```

Wymagane są dwa forwardy; forward tylko jednego nadal zawodzi:

- **`20128`** (port dashboardu) sprawia, że origin jest prawdziwym localhostem, co w ogóle
  powoduje, że OmniRoute uruchamia serwer callback PKCE — origin LAN nigdy
  nie wchodzi w tę gałąź.
- **`1455`** (stały port callback providera) to miejsce, dokąd wraca przeglądarka;
  musi być tunelowane do loopbacku serwera.

Zamień `1455` na `56121`/`56122` przy podłączaniu xAI lub Grok CLI, a `20128` na
faktyczny port dashboardu. Trzymaj tunel otwarty, aż połączenie pokaże się jako
aktywne.

> **Brak dostępu SSH?** Codex i Grok CLI akceptują też wklejony token — zakładka **Paste API
> Key** / **Import auth.json** w dialogu connect. Ta ścieżka nie ma callbacku loopback,
> więc działa z dowolnego origin. Codex dodatkowo akceptuje goły access
> token albo blob sesji `~/.codex/auth.json`.

---

## Zarządzanie tokenami

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ prints the secret ONCE — copy it now
omniroute tokens list                 # masked: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # revoke immediately
omniroute tokens scopes               # explain the three scopes
```

Polecenia `tokens` wymagają poświadczenia **admin**. Tokenami możesz też zarządzać w
dashboardzie pod **Settings → Access Tokens** (tworzenie, odwoływanie, kopiowanie raz).

---

## Konfiguracja CLI do kodowania ze zdalnego katalogu

`omniroute configure` czyta żywy katalog modeli **aktywnego serwera** i zapisuje
konfigurację na **Twojej** maszynie.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Wrote ~/.codex/glm52.config.toml
#   Use it:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52
```

Zapisany profil odwołuje się do klucza inferencji przez zmienną env
(`OMNIROUTE_API_KEY`) — sekret nigdy nie trafia na dysk. Jednorazową
bazową konfigurację Codex (blok `[model_providers.omniroute]`) zobacz w
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Polecenia setup per CLI

Każde obsługiwane CLI ma polecenie setup świadome trybu zdalnego (wszystkie honorują aktywny
kontekst albo `--remote <url> --api-key <key>`):

| CLI         | Polecenie                  | Co zapisuje                                                                                                                                                               |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profile `~/.codex/<name>.config.toml` (per model)                                                                                                                         |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (per model)                                                                                                                     |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — provider `omniroute` openai-compatible z każdym modelem z katalogu (uruchom `opencode -m omniroute/<model>`)                         |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (tryb CLI) + wypisuje ustawienia rozszerzenia VS Code do wklejenia (OpenAI-compatible, Base URL **bez** `/v1`)                 |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + ustawienia VS Code `kilocode.*` — OpenAI-compatible, Base URL **z** `/v1`                                                         |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **z** `/v1`, klucz przez `${{ secrets.OMNIROUTE_API_KEY }}`                      |
| Cursor      | `omniroute setup-cursor`   | wypisuje kroki w aplikacji (Settings → Models → Override OpenAI Base URL **z** `/v1` + klucz + model). Konfiguracja Cursor to nieprzezroczyste SQLite — tylko panel czatu |
| Roo Code    | `omniroute setup-roo`      | zapisuje JSON importu Roo (`~/.omniroute/roo-settings.json`) + ustawia `roo-cline.autoImportSettingsPath` + wypisuje kroki UI (OpenAI-compatible, Base URL **z** `/v1`)   |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — provider `openai-compat`, `base_url` **z** `/v1`, klucz przez `$OMNIROUTE_API_KEY`                                                         |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + przepis env                                                       |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + przepis env (`aider --message --yes`)                                                      |
| Qwen Code   | `omniroute setup-qwen`     | wpis V4 `modelProviders.openai` w `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` w `~/.qwen/.env`                                                                          |

```bash
# OpenCode (openai-compatible provider, all catalog models, remote VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # keep only matching models
opencode -m omniroute/glm/glm-5.2 "..."          # export OMNIROUTE_API_KEY first
```

> OpenCode ma też bogatszą integrację **plugin**: `omniroute setup opencode`
> (teraz świadome trybu zdalnego przez `--remote`) instaluje `@omniroute/opencode-plugin`.
> `setup-opencode` to lekka alternatywa openai-compatible. Klucz API
> jest odwoływany przez `{env:OMNIROUTE_API_KEY}` — nigdy nie zapisywany na dysk.

---

## Zarządzanie kontekstami (przełączanie między serwerami)

**Kontekst** to zapisany serwer (baseUrl + poświadczenie + scope). `omniroute connect`
tworzy jeden i czyni go aktywnym; odtąd każde polecenie go celuje. Zarządzaj i
przełączaj je przez `omniroute contexts`:

```bash
omniroute contexts list            # all contexts; the active one is marked ●
omniroute contexts current         # the active server, auth status, scope
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Przełączanie serwerów** — każde kolejne polecenie podąża za aktywnym kontekstem:

```bash
omniroute contexts use vps         # → all commands now hit the remote VPS
omniroute tokens list              #   (runs against the VPS)

omniroute contexts use default     # → back to localhost
omniroute tokens list              #   (runs against the local server)
```

**Dodaj kontekst ręcznie** (zamiast `connect`), podejrzyj lub zmień nazwę:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # full details for one context
omniroute contexts rename staging stg
```

**Usuń kontekst** — pyta o potwierdzenie; podaj `--yes`, by pominąć
(wymagane w skryptach / powłokach nieinteraktywnych, które inaczej bezpiecznie odmawiają):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nie może zostać usunięty. Usunięcie aktywnego kontekstu wraca
> do `default`. Wskazówka: usunięcie kontekstu usuwa tylko **lokalnie** zapisane poświadczenie —
> odwołaj token na serwerze przez `omniroute tokens revoke <id>`, by faktycznie
> unieważnić dostęp.

**Eksport / import** kontekstów (np. przeniesienie między maszynami — sekrety włącznie,
więc ostrożnie z plikiem):

```bash
omniroute contexts export --out contexts.json     # default: stdout
omniroute contexts import contexts.json            # overwrite; --merge to keep existing
```

---

## Szybki test end-to-end

Cykl do skopiowania i wklejenia, by zweryfikować zdalną konfigurację od zera — połącz, wystaw
token ze scope, skieruj polecenie, przełącz z powrotem i posprzątaj. Zamień
`192.168.0.15` na host/IP serwera (Tailscale, LAN albo publiczny
URL `https://…`).

```bash
# 1. Connect (password → admin token, saved as a context that becomes active)
omniroute connect 192.168.0.15                 # or: --key oma_live_xxxx  (no password)
omniroute contexts current                     # shows the remote server + scope

# 2. Use it — management commands now run against the remote
omniroute tokens create --name laptop --scope read   # mint a narrower token
omniroute tokens list                                 # masked list, from the remote

# 3. Switch back and forth
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → remote again (name from `contexts list`)

# 4. Tear down. NOTE: `contexts remove` only deletes the LOCAL credential —
#    it does NOT revoke the token on the server. Revoke server-side first if you
#    want to actually kill access.
omniroute tokens revoke <id|prefix>            # kills access on the server
omniroute contexts remove 192-168-0-15 --yes   # drop the local context (even if active → falls back to default), no prompt
```

> `--yes` czyni `contexts remove` nieinteraktywnym (wymagane w skryptach/CI; bez tego
> powłoka nieinteraktywna bezpiecznie odmawia zamiast wisieć). Usunięcie
> **aktywnego** kontekstu automatycznie wraca do `default`.

---

## Uwagi bezpieczeństwa

- Tekst jawny tokena pokazywany jest raz; utrwalany jest tylko hash SHA-256 (jak u kluczy API).
- `omniroute connect` korzysta z tej samej blokady brute-force logowania + logowania audytowego.
- Preferuj HTTPS albo Tailnet jako transport; goły host domyślnie używa `http://`
  dla wygody LAN/Tailscale — podaj pełny URL `https://…` dla TLS.
- Lokalny plik kontekstów to `~/.omniroute/config.json` (`chmod 600`); tokeny
  nigdy nie są wypisywane w logach (maskowane do prefiksu).

---

## Endpointy API (referencja)

| Metoda | Route                 | Auth              | Scope                            |
| ------ | --------------------- | ----------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | hasło zarządzania | — (publiczne, bramkowane hasłem) |
| GET    | `/api/cli/whoami`     | token dostępu     | read                             |
| GET    | `/api/cli/tokens`     | token dostępu     | admin                            |
| POST   | `/api/cli/tokens`     | token dostępu     | admin                            |
| DELETE | `/api/cli/tokens/:id` | token dostępu     | admin                            |

Zobacz [openapi.yaml](../openapi.yaml) po pełne schematy.
