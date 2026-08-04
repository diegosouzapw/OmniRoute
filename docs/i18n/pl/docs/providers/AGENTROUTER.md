---
title: "Przewodnik konfiguracji AgentRouter"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik konfiguracji AgentRouter

[AgentRouter](https://agentrouter.org) to przekaźnik zgodny z Anthropic, który odsprzedaje
Claude i inne modele, często w niższych cenach niż bezpośrednie API Anthropic. Jest
zaprojektowany jako zamiennik typu drop-in dla `ANTHROPIC_BASE_URL` oficjalnego klienta Claude Code,
dlatego akceptuje wyłącznie ruch pasujący do obrazu sieciowego Claude Code (określony
User-Agent, flagi `anthropic-beta`, nagłówki Stainless SDK itd.).

## Szybki start — użyj natywnego providera `agentrouter` (zalecane)

Dla większości użytkowników **nie jest wymagana żadna specjalna konfiguracja**. OmniRoute dostarcza wbudowany
provider `agentrouter` z pełnym obrazem sieciowym Claude Code już wbudowanym (zob.
`open-sse/config/providerRegistry.ts` → `agentrouter`). Aby go użyć:

1. Otwórz **Dashboard → Providers → Add Provider**.
2. Wybierz **AgentRouter** z listy.
3. Wklej swój klucz API `sk-...` i zapisz.

To wszystko — bez zmiennych środowiskowych, bez niestandardowego typu providera. Wbudowane modele
obejmują `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` oraz
`deepseek-v3.2`.

Pozostała część tego przewodnika opisuje **ścieżkę zaawansowaną**: użycie typu providera
`anthropic-compatible-cc-*`. Skorzystaj z niej, gdy potrzebujesz większej kontroli
nad obrazem sieciowym — na przykład przy łączeniu z innymi przekaźnikami w stylu AgentRouter,
których jeszcze nie ma w natywnym rejestrze providerów, albo przy nadpisywaniu
base URL, ścieżki chatu lub zestawu nagłówków.

---

## Zaawansowane: połączenie przez typ providera zgodny z Claude Code

OmniRoute obsługuje też AgentRouter (i podobne przekaźniki) przez typ providera **Claude Code
compatible** (`anthropic-compatible-cc-*`), który mówi językiem
Anthropic Messages API z prawidłowym obrazem sieciowym. Generyczny provider
`openai-compatible-chat` wskazujący na `https://agentrouter.org`
**nie** zadziała — upstreamowy WAF odrzuca żądania, które nie wyglądają jak Claude
Code.

---

## Wymagania wstępne

- Konto AgentRouter i klucz API. Nowi użytkownicy otrzymują darmowe kredyty przez link
  afiliacyjny w [README](../README.md) projektu.
- OmniRoute uruchomione z włączoną flagą funkcji `ENABLE_CC_COMPATIBLE_PROVIDER`
  (patrz poniżej).

## 1. Włącz typ providera CC-compatible

Typ providera zgodny z Claude Code jest za flagą funkcji, ponieważ
wysyła ruch bardzo zbliżony do oficjalnego klienta Claude Code. Włącz go,
ustawiając zmienną środowiskową przed uruchomieniem OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Przykład Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Po restarcie dashboard udostępnia opcję **Add Claude Code Compatible**
oprócz istniejących przepływów OpenAI-compatible i Anthropic-compatible.

## 2. Utwórz providera w dashboardzie

1. Otwórz **Dashboard → Providers → Add Provider**.
2. Wybierz **Add Claude Code Compatible** (widoczne tylko przy ustawionej powyższej fladze).
3. Wypełnij pola:

| Field     | Value                                                   |
| --------- | ------------------------------------------------------- |
| Name      | `AgentRouter` (lub dowolna etykieta)                    |
| Prefix    | `agentrouter` (przyjazny alias w logach i dashboardzie) |
| Base URL  | `https://agentrouter.org`                               |
| Chat path | `/v1/messages?beta=true` (domyślne — zostaw bez zmian)  |

> Kanoniczny identyfikator modelu nadal używa pełnego ID węzła providera
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefix** to tylko alias
> wyświetlania rozwiązywany przez `src/lib/usage/callLogs.ts` dla czytelniejszych logów.

4. (Opcjonalnie) Wklej klucz API w polu **Validate** i kliknij **Check**, aby
   potwierdzić łączność przed zapisaniem.
5. Kliknij **Add**.

Po utworzeniu otwórz providera i dodaj **Connection** z kluczem API AgentRouter
(`sk-...`). Pole `test_status` połączenia powinno zmienić się na `active`.

## 3. Użyj przez combo lub bezpośrednio

Odwołuj się do modelu, używając prefiksu providera jako przestrzeni nazw:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanoniczne ID modelu `anthropic-compatible-cc-{uuid}/claude-opus-4-6` również działa
i jest tym, co pojawia się w bazie danych oraz w konfiguracji combo.

Możesz też dodać je do combo na potrzeby routingu, fallbacku i zarządzania limitami
jak każdego innego providera.

---

## Szczegóły obrazu sieciowego

Dla odniesienia mostek cc-compatible wysyła na każde żądanie upstream
następujące elementy (zob. `open-sse/services/claudeCodeCompatible.ts`):

| Header                                      | Value                                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                       |
| `User-Agent`                                | `claude-cli/2.1.219 (external, sdk-cli)`                                                                 |
| `anthropic-version`                         | `2023-06-01`                                                                                             |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                 |
| Per-connection redact-thinking beta toggle  | Dodaje `redact-thinking-2026-02-12` dla upstreamów, które wymagają redagowanych strumieni thinking       |
| Per-connection summarized thinking toggle   | Dodaje `display: "summarized"` do żądań thinking CC Compatible, które nie ustawiły jeszcze trybu display |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                   |
| `x-app`                                     | `cli`                                                                                                    |
| `X-Stainless-*`                             | Różne nagłówki Stainless SDK (lang, wersja pakietu, OS, arch itd.)                                       |

To właśnie pozwala żądaniom przejść przez upstreamowy WAF / whitelistę klientów.

---

## Rozwiązywanie problemów

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Twoje żądanie nie
pasowało do obrazu sieciowego Claude Code. Dzieje się tak, gdy provider jest skonfigurowany
jako `openai-compatible-chat` zamiast `anthropic-compatible-cc`, albo gdy flaga
`ENABLE_CC_COMPATIBLE_PROVIDER=true` nie została ustawiona przy starcie.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Invalid token". Obraz sieciowy jest poprawny, ale klucz API został odrzucony. Wygeneruj
nowy klucz w dashboardzie AgentRouter i zaktualizuj połączenie.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Hak moderacji AgentRouter odrzucił treść żądania albo
plan klucza nie zezwala na żądany model. Spróbuj innego promptu lub modelu;
skontaktuj się ze wsparciem AgentRouter, jeśli nieszkodliwy prompt jest systematycznie blokowany.

**`[400]: content-blocked` tylko na określonych modelach** — Większość planów AgentRouter
zezwala tylko na podzbiór modeli (np. `claude-opus-4-6`). Inne ID modeli zwracają
`unauthorized_client_error`, mimo że klucz jest ważny. Sprawdź w dashboardzie AgentRouter,
które modele obejmuje Twój plan.

**`Invalid JSON response from provider (reset after Ns)` w logach omniroute** —
Upstream zwrócił ciało nie-JSON (zazwyczaj stronę błędu HTML z WAF).
Zwykle oznacza to, że żądanie w ogóle nie dotarło do backendu AgentRouter — sprawdź ponownie, że
ID providera zaczyna się od `anthropic-compatible-cc-` (zwróć uwagę na końcowy myślnik —
zob. `CLAUDE_CODE_COMPATIBLE_PREFIX` w `open-sse/services/claudeCodeCompatible.ts`)
oraz że flaga funkcji jest włączona.

**`unauthorized client detected` / strona błędu HTML mimo że provider AgentRouter
już istnieje** — prawdopodobnie masz **więcej niż jednego** providera AgentRouter
i żądanie trafia do niewłaściwego. Jeśli pozostał ręcznie utworzony provider
`anthropic-compatible-*` (bez `cc`) lub `openai-compatible-chat-*`
z prefiksem `agentrouter`, może on przejąć ID modeli `agentrouter/<model>`
(a combo mogą się do niego odwoływać po node ID), więc ruch idzie do tego providera —
który wysyła generyczny User-Agent i jest odrzucany — zamiast do wbudowanego
providera `agentrouter`, który już ma poprawny obraz sieciowy. Sprawdź w logach omniroute,
gdzie model faktycznie się rozwiązuje (tag `ROUTING` pokazuje
`agentrouter/<model> → <providerId>/<model>`); jeśli `<providerId>` to nie
`agentrouter`, scentralizuj na natywnym providerze: skieruj combo na
`agentrouter/<model>` (providerId `agentrouter`) i usuń zduplikowane
providery compatible. Natywny provider nie wymaga konfiguracji obrazu sieciowego ani
`customUserAgent`.

---

## Zobacz też

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — notatki o integracji providera Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — katalog providerów
  free-tier
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — implementacja obrazu sieciowego
