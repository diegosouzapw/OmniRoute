# Subskrypcje proxy operatora (styl Karing)

> Notatki projektowe i implementacyjne dla operatorowego przepływu subskrypcji
> proxy w OmniRoute. To jest cięcie v1: pojedynczy operator wkleja linki
> subskrypcji, wybiera tryb (global lub rule), a OmniRoute wiąże wynikową pulę
> proxy z istniejącą rezolucją scope. Multi-tenant per-API-key, zaawansowane
> reguły ruchu, wagi per-rule sterowane latencją itd. są jawnie poza zakresem
> i wymienione w §7.

---

## 1. Motywacja

Dziś pula proxy OmniRoute jest ręcznie kuratorowana: każdy węzeł żyje w
`proxy_registry` z ręcznie wpisanym host/port/credentials, a każde powiązanie z
upstreamowymi dispatcherami (account → provider → combo → global → direct) to
ręczny wiersz `proxy_assignments`. Operatorzy, którzy już utrzymują subskrypcję
Clash/V2Ray/sing-box (np. z usługi airport), muszą przepisywać każdy węzeł do
OmniRoute i ponownie je wiązać przy każdej zmianie listy upstream.

Celem v1 jest uczynienie OmniRoute first-class dla subskrypcji
**dostarczanych przez operatora**, podobnie jak Karing / Clash / sing-box
pozwalają wkleić URL `https://...` i zostawić zarządzanie cyklem życia klientowi.

## 2. Historie użytkownika

| #   | Jako     | Chcę                                                                  | Aby                                                                                                                            |
| --- | -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| U1  | Operator | wkleić URL subskrypcji raz                                            | nie przepisywać węzłów przy każdym odświeżeniu airport                                                                         |
| U2  | Operator | włączać/wyłączać subskrypcję                                          | móc wrócić do direct bez usuwania URL                                                                                          |
| U3  | Operator | wybrać tryb **global**                                                | cały ruch każdego providera wychodził przez subskrypcję                                                                        |
| U4  | Operator | wybrać tryb **rule** i wskazać konkretnych providerów                 | tylko wybrani providerzy szli przez proxy; pozostali zostawali direct                                                          |
| U5  | Operator | podać lokalny endpoint SOCKS5 sing-box/clash                          | węzły SS/VMess/Trojan/VLESS (których dispatcher OmniRoute nie mówi natywnie) stawały się używalne przez lokalny mostek kernela |
| U6  | Operator | widzieć status pobrania i niedawną zredagowaną (redacted) sumę węzłów | debugować „dlaczego pusto / błąd” bez wycieku credentials                                                                      |

## 3. Poza zakresem (v1)

- Nadpisania subskrypcji per-API-key (multi-tenant). v1 jest wyłącznie operatorskie.
- Reguły ruchu per-provider poza `global` / `rule-on-selected-providers`.
- Inteligentny routing oparty o latencję między węzłami subskrypcji a innymi pulami
  (istniejące `resolveProxyForConnectionFromRegistry` już to robi dla puli
  globalnej; v1 tylko dokłada do niej węzły subskrypcji).
- Auto-import URL/hasła z nagłówków lub query params.
- Mitygacja SSRF poza endpointami local-core wyłącznie na loopback (sam URL
  subskrypcji jest kontrolowany przez operatora, więc ufamy mu tak samo jak
  dzisiejszym URL-om providerów upstream).

## 4. Architektura

```
            ┌─────────────────────────────────────────┐
            │  dashboard / settings / 代理 / 订阅代理   │
            │  (client component, SubscriptionTab)    │
            └──────────────────┬──────────────────────┘
                               │ fetch
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │  /api/v1/management/proxy-subscriptions                │
   │  ├ GET    list                                        │
   │  ├ POST   create                                      │
   │  ├ GET    /:id                                        │
   │  ├ PATCH  /:id                                        │
   │  ├ DELETE /:id                                        │
   │  ├ POST   /:id/refresh                                │
   │  └ GET    /:id/nodes                                  │
   └────────────────────────┬───────────────────────────────┘
                            │ uses
                            ▼
   ┌────────────────────────────────────────────────────────┐
   │  src/lib/proxySubscription/                           │
   │  ├ parse.ts          (Clash YAML / V2Ray JSON / URIs) │
   │  ├ subscriptionService.ts                              │
   │  │   CRUD, sync, apply, unapply, scheduler            │
   │  └ index.ts          (barrel)                          │
   └──────────┬─────────────────────────────┬───────────────┘
              │ upsert/scope-bind            │ DB
              ▼                              ▼
   ┌─────────────────────────┐    ┌──────────────────────────┐
   │  proxy_registry          │    │  proxy_subscriptions     │
   │  (existing) +             │    │  (NEW — subscription     │
   │  subscription_id column  │    │   metadata + scheduler   │
   │  + status/health checks  │    │   state)                 │
   └─────────────────────────┘    └──────────────────────────┘
              │
              ▼ (existing)
   resolveProxyForConnectionFromRegistry
   hasBlockingProxyAssignment (fail-closed)
   proxyDispatcher (open-sse/utils/proxyDispatcher)
```

Kluczowa decyzja projektowa: **nie wymyślamy nowego scope ani pipeline’u routingu**.
Upsertujemy węzły pochodzące z subskrypcji do `proxy_registry` z `source =
'subscription'` + `subscription_id`, a następnie `applySubscription()` przechodzi
istniejące API `addProxyToScopePool(scope, scopeId, proxyId)`. Dzięki temu:

- Istniejąca rotacja, health checki i strażniki fail-closed działają „za darmo”.
- Istniejące dashboardy (ProxyPoolTab, SourceToggleBar, GlobalConfigTab) działają
  bez zmian — węzły subskrypcji po prostu pojawiają się w puli z odznaką `source`.
- Usunięcie/wyłączenie subskrypcji czysto usuwa jej powiązania bez
  ruszania ręcznych proxy.

## 5. Model danych

### 5.1 Nowa tabela `proxy_subscriptions`

| Column                    | Type                             | Notes                                                                  |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `id`                      | TEXT PK                          | UUID                                                                   |
| `name`                    | TEXT NOT NULL                    | nazwa wyświetlana                                                      |
| `url`                     | TEXT NOT NULL                    | URL subskrypcji                                                        |
| `enabled`                 | INTEGER NOT NULL DEFAULT 0       | 1 = aktywna                                                            |
| `mode`                    | TEXT NOT NULL DEFAULT `'global'` | `'global'` lub `'rule'`                                                |
| `rule_providers`          | TEXT NULL                        | tablica JSON ID providerów (tylko mode='rule')                         |
| `local_core_endpoint`     | TEXT NULL                        | loopback SOCKS5/HTTP dla SS/VMess/itd. (np. `socks5://127.0.0.1:2080`) |
| `update_interval_minutes` | INTEGER NOT NULL DEFAULT 60      | kadencja odświeżania w tle                                             |
| `last_fetched_at`         | TEXT NULL                        | znacznik czasu ISO ostatniego udanego pobrania                         |
| `status`                  | TEXT NOT NULL DEFAULT `'empty'`  | `'ok'` / `'error'` / `'empty'`                                         |
| `error`                   | TEXT NULL                        | ostatni tekst błędu / ostrzeżenia (zredagowany)                        |
| `last_nodes`              | TEXT NULL                        | tablica JSON, zredagowane podsumowania węzłów                          |
| `created_at`              | TEXT NOT NULL                    | ISO                                                                    |
| `updated_at`              | TEXT NOT NULL                    | ISO                                                                    |

Indeks: `idx_proxy_subscriptions_enabled (enabled)` na tick schedulera.

### 5.2 Rozszerzone `proxy_registry`

Dodana jedna kolumna:

| Column            | Type      | Notes                                                                                |
| ----------------- | --------- | ------------------------------------------------------------------------------------ |
| `subscription_id` | TEXT NULL | FK z konwencji (bez wymuszanego FK; wiersz subskrypcji żyje w `proxy_subscriptions`) |

Istniejące wiersze po upgrade: `subscription_id = NULL`, zachowanie bez zmian.
Migracja: `ALTER TABLE proxy_registry ADD COLUMN subscription_id TEXT;`
(stosowana jako `131_proxy_subscriptions.sql`, idempotentna dzięki semantyce
`ALTER` w migration runnerze).

### 5.3 Izolacja testów rozszerzonego `proxy_subscriptions`

Migration runner stosuje nowe migracje automatycznie; jedyne miejsca, które
muszą znać nową kolumnę, to `types.ts` i `mappers.ts` (po jednym dodatkowym
polu) oraz `proxies.ts` (3 instrukcje SQL: INSERT/UPDATE/SELECT).

## 6. Tryby

### 6.1 Tryb global

- Pula powiązana z `scope='global', scope_id=NULL`.
- Ustawienie `proxyEnabled` wymuszane na `true`, gdy aktywna jest jakakolwiek
  subskrypcja (lub jakiekolwiek globalne proxy spoza subskrypcji).
- Cały ruch providerów wychodzi przez pulę subskrypcji, z rotacją/health
  stosowanymi przez istniejące `resolveProxyForConnectionFromRegistry`.

### 6.2 Tryb rule

- Pula powiązana z `scope='provider', scope_id=<selected provider id>` dla każdego
  wybranego providera.
- Providerzy spoza listy przechodzą na direct (własne proxy na poziomie
  providera albo brak proxy).
- Przełączenie subskrypcji z global → rule najpierw wywołuje `unapplySubscription`,
  by odłączyć poprzednie powiązania globalne, a potem ponownie synchronizuje.

## 7. Wsparcie protokołów

Istniejący `proxyDispatcher` mówi tylko **http / https / socks5 / vercel /
deno / cloudflare**. v1 idzie za tym:

| Parser-detected type              | Goes into pool directly? | Needs `localCoreEndpoint`?             |
| --------------------------------- | ------------------------ | -------------------------------------- |
| `http` / `https`                  | yes                      | no                                     |
| `socks5`                          | yes                      | no                                     |
| `ss` / `ssr`                      | no                       | yes (sing-box/clash → loopback SOCKS5) |
| `vmess` / `vless`                 | no                       | yes                                    |
| `trojan`                          | no                       | yes                                    |
| `hysteria` / `tuic` / `wireguard` | no                       | yes                                    |
| `relay` (vercel/deno/cloudflare)  | yes                      | no                                     |

Bez `localCoreEndpoint` węzły klasy SS pojawiają się w statusie jako
ostrzeżenie, ale **nie są routowane**. To odpowiada polityce „fail-closed, ale
nie kłam o możliwościach”: nigdy cicho nie gubimy ruchu; raportujemy
nieroutowalne węzły i zostawiamy decyzję operatorowi.

## 8. Parser (`src/lib/proxySubscription/parse.ts`)

Ręcznie napisany, bez zewnętrznej zależności. Akceptowane wejścia:

1. **Clash / Clash.Meta YAML** — tablica `proxies:`, z dispatch po `type`.
2. **Lista URI owinięta Base64** — `parseSubscription` wykrywa base64 po długości
   i zestawie znaków, dekoduje, potem parsuje URI.
3. **JSON-array-of-URI w stylu V2RayN** — używa URI `vmess://` / `vless://`.
4. **Zwykła lista URI** — `ss://`, `vmess://`, `vless://`, `trojan://`,
   `hysteria://`, `tuic://`, `wireguard://`, `socks5://`, `http(s)://`.

Wyjście:

```ts
type ParsedSubscription = {
  nodes: DirectlyUsableNode[]; // http/https/socks5/relay
  needsCore: NeedsCoreNode[]; // ss/vmess/... — redacted summary
  rawProtocols: string[]; // for diagnostics
  parserWarnings: string[]; // per-line parse errors, redacted
};

type DirectlyUsableNode = {
  name: string;
  type: "http" | "https" | "socks5" | "vercel" | "deno" | "cloudflare";
  host: string;
  port: number;
  username?: string;
  password?: string;
};
```

`redactedNodeSummary` zwraca serializowalną do JSON tablicę `{name, type,
host, port, hasCredentials}` z pominiętymi credentials. To trafia do
`last_nodes` na potrzeby UI operatora.

## 9. Bezpieczeństwo

- **SSRF na `localCoreEndpoint`**: jedyna powierzchnia SSRF to lokalny
  endpoint core (sam URL subskrypcji dostarcza operator). Dozwolone
  hosty: `127.0.0.1`, `::1`, `localhost`. Każdy inny host jest odrzucany przy
  parsowaniu ze statusem `subscription_needs_core_endpoint_invalid`.
- **Brak outboundu do hostów wewnętrznych operatora** z URL subskrypcji. Pobranie
  URL idzie przez `fetch` Node (ten sam model zaufania co istniejące
  health checki `proxyLatency` i taski ping providerów). Operator
  już ufa URL, bo go wkleił.
- **Fail-closed**: jeśli proxy subskrypcji jest martwe, ale nadal powiązane ze
  scope, `hasBlockingProxyAssignment` zwraca true i ruch kończy się fail-closed —
  zgodnie z istniejącą polityką dla dowolnego proxy z puli. Operator zawsze może
  wyłączyć subskrypcję lub usunąć powiązanie.
- **Brak echa sekretów**: `last_nodes` jest zredagowane; UI nigdy nie odsyła
  sekretów. `password` / `username` są przechowywane zaszyfrowane at rest przez
  istniejący tor szyfrowania `proxy_registry`.
- **Brak zapisu cross-tenant**: trasy API są strzeżone przez `requireManagementAuth`
  (sesja dashboardu LUB klucz API ze scope manage). Nadpisania per-API-key są
  jawnie poza zakresem.

## 10. UI

Nowa podzakładka **"订阅代理"** w `dashboard / settings / 代理`, umieszczona po
„documentation”. Widok listy pokazuje:

- Name + URL (obcięty, pełny URL w atrybucie `title`)
- Odznaka statusu: `ok` / `error` / `empty`
- Przełącznik Enabled (optimistic toggle)
- Przyciski akcji: edit / refresh / delete

Formularz edycji ma:

- Name (tekst, wymagane)
- URL (tekst, wymagane, walidowane jako URL)
- Przełącznik Mode (global / rule)
- Multi-select providerów (widoczny tylko w trybie rule; zasilany z
  `/api/providers`)
- Local core endpoint (tekst, opcjonalny; placeholder `socks5://127.0.0.1:2080`)
- Update interval (liczba, domyślnie 60 minut)
- Przełącznik Enabled

Gdy `status === 'error'`, baner ostrzeżenia inline pokazuje `subscription.error`.
Gdy `status === 'ok'` i są węzły wymagające local core, miękki
baner ostrzeżenia pokazuje, które protokoły pominięto.

## 11. Migracja i rollout

1. Nowa migracja `131_proxy_subscriptions.sql` uruchamia się przy pierwszym otwarciu DB po
   upgrade (auto-wykrywana przez istniejący migration runner).
2. Migracja jest **idempotentna**: `ALTER TABLE … ADD COLUMN …` na już
   zmigrowanej DB to no-op w SQLite, gdy owinięte w ścieżkę runnera
   „ignore duplicate column”. Zob. istniejące precedensy
   `040_oneproxy_proxy_fields.sql` i `093_proxy_enable_toggles.sql`.
3. Bez backfill: istniejące wiersze dostają `subscription_id = NULL`, co serwis
   traktuje jako „manual, not subscription-managed”.
4. UI ukrywa zakładkę przy zerze subskrypcji, ale API jest zawsze
   dostępne — to celowe, by operatorzy headless mogli zarządzać
   subskrypcjami wyłącznie przez API.

## 12. Auto-odświeżanie

`startSubscriptionScheduler()` jest idempotentny i:

- Pomija przeglądarkę (`typeof window !== "undefined"`).
- Pomija przy `NODE_ENV=test`.
- W przeciwnym razie startuje 60s `setInterval`, który:
  - Listuje włączone subskrypcje.
  - Dla każdej liczy `due = now - lastFetchedAt >= updateIntervalMinutes * 60_000`.
  - Wywołuje `syncSubscription` dla zaległych, połykając błędy (logowane).
- Timer interwału ma `.unref()`, więc nigdy nie blokuje wyjścia procesu.

Scheduler startuje przy:

- Pierwszym `GET /api/v1/management/proxy-subscriptions` (otwarcie dashboardu).
- Dowolnym wywołaniu `syncSubscription` (defensywnie — dla ścieżek CLI / automacji,
  które omijają GET).

## 13. Strategia testów

`tests/unit/proxySubscription.parse.test.ts` — 7 czystych przypadków parsera, bez DB,
uruchamialne w <1s:

1. Clash YAML z węzłami `direct` (http) i `needsCore` (ss).
2. Lista URI owinięta Base64 (poprawnie zdekodowana).
3. V2Ray JSON-array-of-URI (vmess / vless).
4. Zwykła lista URI (mieszane protokoły).
5. Outboundy Clash.Meta (socks5).
6. Puste / nieznane wejście → `nodes=[]`, `needsCore=[]`, parserWarnings wypełnione.
7. `redactedNodeSummary` usuwa credentials.

`tests/unit/proxySubscription.service.test.ts` — 4 testy integracyjne używające
`process.env.DATA_DIR` + `core.resetDbInstance()`:

1. **Global**: utwórz włączoną subskrypcję global → `syncSubscription` →
   zweryfikuj wiersze puli w `proxy_registry` z ustawionym `subscription_id` →
   `resolveProxyForConnectionFromRegistry` zwraca jeden z tych wierszy →
   `proxyEnabled` jest true.
2. **Rule**: utwórz włączoną subskrypcję rule na providerze P1 → zweryfikuj, że tylko
   scope P1 jest powiązany, scope P2 nietknięty.
3. **Fail-closed**: URL pobrania subskrypcji jest nieosiągalny → `status='error'`,
   pula pusta, a jeśli kiedykolwiek miała wiersze, są wyczyszczone;
   `hasBlockingProxyAssignment` zwraca false (brak martwych proxy w żadnym scope).
4. **Delete**: usuń subskrypcję → wiersze rejestru dla tej subskrypcji są
   usuwane z `force: true` (ręczne usunięcia nie mogą zablokować kaskady) →
   `proxyEnabled` przeliczone.

Komenda uruchomienia testów:

```bash
node --import tsx/esm \
     --import ./open-sse/utils/setupPolyfill.ts \
     --import ./tests/_setup/isolateDataDir.ts \
     --test \
     tests/unit/proxySubscription.parse.test.ts \
     tests/unit/proxySubscription.service.test.ts
```

## 14. Prace przyszłe (NIE w v1)

- Nadpisania subskrypcji per-API-key (multi-tenant; wymaga tabeli `key_subscription_overrides`).
- Reguły ruchu per-provider z matcherami domen (weszłyby w istniejącą tabelę `interceptionRules`).
- Rotacja ważona latencją między pulami subskrypcji (mamy już `ProxyRotationStrategy = "latency"`; wystarczy wystawić w UI).
- Proxyowanie samego pobrania subskrypcji przez osobny egress (by operatorzy mogli pobierać zza firmowego firewalla).
- Podgląd sparsowanej subskrypcji po stronie przeglądarki przed zapisem (dziś trzeba save → wait → see nodes).

## 15. Pliki dodane / zmienione

**Dodane (nowe):**

- `src/lib/proxySubscription/parse.ts`
- `src/lib/proxySubscription/subscriptionService.ts`
- `src/lib/proxySubscription/index.ts`
- `src/lib/db/migrations/131_proxy_subscriptions.sql`
- `src/app/api/v1/management/proxy-subscriptions/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/refresh/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/nodes/route.ts`
- `src/app/(dashboard)/dashboard/settings/components/proxy/SubscriptionTab.tsx`
- `tests/unit/proxySubscription.parse.test.ts`
- `tests/unit/proxySubscription.service.test.ts`
- `docs/proxy-subscriptions.md` (ten plik)

**Zmodyfikowane (minimalnie):**

- `src/lib/db/proxies/types.ts` — `+ subscriptionId: string | null` na
  `ProxyRegistryRecord`; `+ subscriptionId?: string | null` na `ProxyPayload`.
- `src/lib/db/proxies/mappers.ts` — `mapProxyRow` czyta
  `subscription_id` z wiersza.
- `src/lib/db/proxies.ts` — INSERT / UPDATE / SELECT dodają `subscription_id`.
- `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx` — dodaje
  jedną nową podzakładkę ("订阅代理") + fallback `literal` dla etykiet, których
  jeszcze nie ma w katalogu i18n.
