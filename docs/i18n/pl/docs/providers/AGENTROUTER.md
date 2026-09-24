# AgentRouter Setup Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

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

## Szczegóły danych przesyłanych

Dla porównania most zgodny z cc wysyła następujące dane przy każdym żądaniu nadrzędnym
(zobacz `open-sse/services/claudeCodeCompatible.ts`):

| Nagłówek                                                             | Wartość                                                                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                                      | `Bearer <api-key>`                                                                                                              |
| `User-Agent`                                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                        |
| `anthropic-version`                                                  | `2023-06-01`                                                                                                                    |
| `anthropic-beta`                                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                        |
| Przełącznik beta redagowania rozumowania dla poszczególnych połączeń | Dodaje `redact-thinking-2026-02-12` w przypadku usług nadrzędnych, które wyraźnie wymagają strumieni z redagowanym rozumowaniem |
| Przełącznik podsumowanego rozumowania dla poszczególnych połączeń    | Dodaje `display: "summarized"` do zgodnych z CC żądań rozumowania, w których nie ustawiono jeszcze trybu wyświetlania           |
| `anthropic-dangerous-direct-browser-access`                          | `true`                                                                                                                          |
| `x-app`                                                              | `cli`                                                                                                                           |
| `X-Stainless-*`                                                      | Różne nagłówki zestawu SDK Stainless (język, wersja pakietu, system operacyjny, architektura itp.)                              |

Dzięki temu żądania mogą przechodzić przez nadrzędny WAF / białą listę klientów.

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
