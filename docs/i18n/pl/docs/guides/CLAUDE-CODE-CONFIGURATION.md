---
title: "Claude Code CLI — konfiguracja z OmniRoute"
version: 3.8.40
lastUpdated: 2026-07-24
---

# Claude Code CLI — konfiguracja z OmniRoute

Skieruj CLI **Claude Code** (`claude`) na OmniRoute — lokalnie lub na zdalny VPS —
z profilami per model, na wzór konfiguracji Codex.

---

## Szybki start

```bash
# Launch Claude Code against a local OmniRoute (auto-detects the active context)
omniroute launch

# Against a remote OmniRoute (after `omniroute connect <host>`, this is automatic)
omniroute launch --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Generate per-model profiles, then launch one
omniroute setup-claude            # writes ~/.claude/profiles/<name>/settings.json
omniroute launch --profile glm52  # Claude Code using glm/glm-5.2 via OmniRoute
```

---

## Jak Claude Code łączy się z bramką

Claude Code korzysta z **Anthropic Messages API** i wskazuje niestandardowy
endpoint przez zmienne środowiskowe (nie ma flagi `--base-url`):

| Zmienna                                      | Przeznaczenie                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ANTHROPIC_BASE_URL`                         | Główny URL bramki (Claude Code dopina `/v1/messages`). **Bez sufiksu `/v1`.**              |
| `ANTHROPIC_AUTH_TOKEN`                       | Wysyłany jako `Authorization: Bearer …` — użyj tokenu dostępu / klucza API OmniRoute       |
| `ANTHROPIC_API_KEY`                          | Alternatywa: wysyłany jako `x-api-key`. Gdy ustawione obie, wygrywa `ANTHROPIC_AUTH_TOKEN` |
| `ANTHROPIC_MODEL`                            | Wymusza konkretny model (nadpisuje domyślny wybór z pickera `/model`)                      |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` → natywny picker `/model` listuje modele `claude*`/`anthropic*` z `/v1/models`         |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS`              | Limit tokenów wyjściowych na odpowiedź (np. `65536`)                                       |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW`            | Próg tokenów dla auto-kompaktowania                                                        |

> Zmienne środowiskowe są odczytywane **raz przy starcie** — po zmianie zrestartuj Claude Code.

`omniroute launch` ustawia to wszystko za Ciebie: rozwiązuje bazowy URL + token
z aktywnego kontekstu (więc `omniroute connect <vps>`, a potem `omniroute launch`
po prostu działa), sprawdza zdrowie serwera i execuje `claude`.

---

## Aliasy discovery — pokaż modele spoza Claude w pickerze `/model`

Discovery modeli bramki w Claude Code listuje tylko identyfikatory zaczynające się od `claude`
lub `anthropic`, więc przy `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` natywny
picker `/model` zwykle pokazuje **tylko** modele Claude/Anthropic z OmniRoute — `kimi/kimi-k2.6`
lub `glm/glm-5.2` się nie pojawią, mimo że routują poprawnie.

OmniRoute może odzwierciedlić dowolny włączony model (i combo) pod identyfikatorem `claude/…`,
aby przeszedł ten filtr i pojawił się w pickerze:

```
kimi/kimi-k2.6            →  claude/kimi/kimi-k2.6      "Kimi K2.6 (OmniRoute)"
glm/glm-5.2              →  claude/glm/glm-5.2         "GLM 5.2 (OmniRoute)"
<combo "custo-otimizado"> →  claude/combo/custo-otimizado
```

Gdy wybierzesz jeden z nich w Claude Code, OmniRoute zdejmuje opakowanie `claude/`
z powrotem do prawdziwego id przed routingiem — autentyczny id `claude/<real-claude-model>`
(właściwy provider Claude OAuth) zawsze pozostaje nietknięty.

**Domyślnie wyłączone** i sterowane trójpoziomową bramką (najbardziej szczegółowy
wygrywa), więc zwykły OmniRoute nie podwaja katalogu dla klientów, które nie używają
Claude Code:

| Poziom   | Gdzie                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------ |
| Model    | Strona szczegółów providera → przełącznik per model „Expose in Claude Code”                      |
| Provider | Strona szczegółów providera → przełącznik na poziomie providera (obejmuje wszystkie jego modele) |
| Globalny | Settings → Feature Flags → `EXPOSE_CC_DISCOVERY_ALIASES` (domyślnie wyłączone)                   |

Zmienna środowiskowa `EXPOSE_CC_DISCOVERY_ALIASES` wymusza włączenie poziomu globalnego
i ma pierwszeństwo przed nadpisaniem w dashboardzie (ekran Feature Flags pokazuje wtedy
notatkę „active via environment variable”). Przełączniki per provider i per model
doprecyzowują dalej — np. globalnie wyłączone + provider Kimi włączony eksponuje
tylko modele Kimi.

> ⚠️ **Niezgodność okna w modelach spoza Claude.** Claude Code zakłada okno kontekstu 200K
> dla każdego id, którego nie rozpoznaje (nie odczytuje prawdziwego okna z
> `/v1/models`). Dla modelu z większym oknem (np. Kimi K2 — 256K) ustaw
> `CLAUDE_CODE_AUTO_COMPACT_WINDOW` na wartość poniżej realnego okna modelu, aby
> auto-kompaktowanie nie odpalało się przedwcześnie. Wygenerowane profile powyżej już
> robią to per model.

---

## Blok onboarding w dashboardzie

Karta narzędzia Claude (**Dashboard → CLI Code**) renderuje dokładny fragment `settings.json`
dla tej instancji, obok przycisku info o aliasach discovery, z przyciskiem kopiowania:

```jsonc
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://<your OmniRoute>:20128",
    "ANTHROPIC_AUTH_TOKEN": "<your OmniRoute API key>",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
  },
}
```

Bazowy URL to ten rozwiązany przez kartę (w tym niestandardowe nadpisanie, które wpisałeś), już
znormalizowany — bez sufiksu `/v1`, bez końcowego ukośnika. **Klucz nigdy nie jest renderowany**: blok dostarcza
placeholder, więc zrzut ekranu lub wklejony snippet nie mogą go ujawnić. Wklej swój klucz w jego miejsce.

Dodaj `CLAUDE_CODE_AUTO_COMPACT_WINDOW` w tym samym bloku `env` dla każdego modelu, którego realne
okno kontekstu nie wynosi 200K — Claude Code zakłada 200K dla każdego id, którego nie rozpoznaje, więc
auto-kompaktowanie odpala się w złym momencie (zobacz ostrzeżenie w poprzedniej sekcji).
Builder snippeta też przyjmuje tę wartość, więc caller znający okno docelowego modelu
może wyemitować je bezpośrednio.

Źródło: `src/shared/services/claudeCliConfig.ts::buildClaudeDiscoverySettingsSnippet` (czysty
builder, unit-testowany) renderowany przez `ClaudeGatewayOnboardingBlock`.

---

## Profile (`CLAUDE_CONFIG_DIR`)

Claude Code **nie ma natywnych plików profili** (w przeciwieństwie do `~/.codex/<name>.config.toml` w Codex).
Idiomatyczny mechanizm to `CLAUDE_CONFIG_DIR` — osobny katalog konfiguracji na
profil, każdy z własnym `settings.json`, poświadczeniami, historią i cache.

`omniroute setup-claude` pobiera żywy katalog `/v1/models` i zapisuje jeden
profil na model w `~/.claude/profiles/<name>/settings.json`, używając
**tych samych nazw co `setup-codex`** (`glm52`, `kimi-k27`, `deepseek-pro`, …):

```jsonc
// ~/.claude/profiles/glm52/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "glm/glm-5.2",
  "effortLevel": "xhigh",
  "env": {
    "ANTHROPIC_BASE_URL": "http://192.168.0.15:20128",
    "ANTHROPIC_MODEL": "glm/glm-5.2",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000",
  },
}
```

> **Token autoryzacji nigdy nie jest zapisywany w profilu.** Uruchom z
> `omniroute launch --profile <name>` (wstrzykuje `ANTHROPIC_AUTH_TOKEN` z
> aktywnego kontekstu) albo sam wyeksportuj `ANTHROPIC_AUTH_TOKEN` i uruchom
> `CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude`.

**Auto-sync po discovery modeli (opt-in).** OmniRoute może regenerować te same
pliki `~/.claude/profiles/<name>/settings.json` automatycznie, gdy synchronizacja modeli
providera zmienia żywy katalog — więc nowe/przemianowane modele dostają profile bez ponownego
uruchamiania komendy. Jest **domyślnie wyłączone**: włącz z **dashboardu CLI Code** („CLI profile
auto-sync” → Claude Code) albo ustaw `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES=true` (honoruje też
`CLI_ALLOW_CONFIG_WRITES`, domyślnie włączone). Po włączeniu zapisuje tylko pliki profili; nigdy
nie zmienia aktywnej/domyślnej konfiguracji Claude, auth ani `~/.claude/settings.json`.

### Generowanie i używanie profili

```bash
# Local OmniRoute
omniroute setup-claude

# Remote VPS (bakes the VPS URL into every profile)
omniroute setup-claude --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Only some providers
omniroute setup-claude --only glm,kimi

# Preview without writing
omniroute setup-claude --dry-run

# Launch a profile
omniroute launch --profile kimi-k27
```

---

## Poziomy modeli (opcjonalne)

Claude Code routuje do poziomów możliwości. Zmapuj każdy na model OmniRoute przez env /
ustawienia, jeśli chcesz innych providerów per poziom:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm/glm-5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL="kmc/kimi-k2.6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm/glm-4.7-flash"
```

W przeciwnym razie pojedynczy `ANTHROPIC_MODEL` (to, co ustawiają profile) jest używany do wszystkiego.

---

## Tryb zdalny

Po uruchomieniu `omniroute connect <host>` (zobacz
[Tryb zdalny](./REMOTE-MODE.md)), `omniroute launch` i `omniroute setup-claude`
automatycznie celują w ten zdalny serwer i używają jego scoped access token —
bez dodatkowych flag. Nadpisz per wywołanie przez `--remote` / `--api-key`.

---

## Rozwiązywanie problemów

**Claude Code ignoruje bramkę** — potwierdź, że `ANTHROPIC_BASE_URL` **nie ma
`/v1`**, i zrestartuj `claude` (env jest odczytywane raz przy starcie). `omniroute launch`
robi to za Ciebie.

**Picker `/model` jest pusty / brakuje modeli bramki** — wymaga Claude Code
v2.1.219+ oraz `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`. W pickerze pojawiają się tylko ID modeli
`claude*` / `anthropic*`; wymuś dowolny inny model przez
`ANTHROPIC_MODEL=<id>` (właśnie to robią profile).

**`400 Ambiguous model 'claude-…'`** — Claude Code zawsze wysyła **nieprefiksowane**
ID modeli (np. `claude-opus-4-8`), więc gdy podłączeni są zarówno provider Claude Code (`cc/…`), jak i
Claude (`claude/…`), gołe id pasuje do dwóch tras i
OmniRoute odmawia zgadywania. Napraw na jeden z dwóch sposobów: przypnij prefiksowane id przez
`ANTHROPIC_MODEL=cc/claude-opus-4-8` albo włącz **Prefer Claude Code for
unprefixed Claude models** — przełącznik na stronie providera Claude albo
`OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS=true` (domyślnie wyłączone;
zobacz [Environment](../reference/ENVIRONMENT.md)) — wtedy gołe ID `claude-*`
idą do Claude Code. Jawne prefiksy providerów zawsze wygrywają.

**Błędy auth** — profil nie przechowuje tokenu. Użyj `omniroute launch --profile`
(wstrzykuje go) albo wyeksportuj `ANTHROPIC_AUTH_TOKEN`.

**Profile nie izolują** — każdy profil to osobny `CLAUDE_CONFIG_DIR`;
sprawdź, że `echo $CLAUDE_CONFIG_DIR` w sesji wskazuje na
`~/.claude/profiles/<name>`.
