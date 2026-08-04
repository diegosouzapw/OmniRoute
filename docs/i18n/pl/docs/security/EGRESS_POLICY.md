---
title: "Polityka rodziny IP egress (IPv4/IPv6)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Polityka rodziny IP egress (IPv4/IPv6)

> **Przypnij ruch wychodzący do jednej rodziny IP — `auto`, `ipv4` lub `ipv6` — per proxy, żeby egress tylko-IPv6 nigdy cicho nie wyciekał z powrotem na IPv4.**

> **Source of truth:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute pozwala każdemu proxy nieść **dyrektywę egress rodziny adresów**. Domyślnie system operacyjny wybiera IPv4 lub IPv6 (dual-stack, „Happy Eyeballs”). Gdy ustawisz dyrektywę na `ipv4` lub `ipv6`, OmniRoute przypina każde połączenie przez to proxy do wybranej rodziny i **fails closed** (odmawia), zamiast robić fallback na drugą rodzinę.

Ta strona dokumentuje, czym jest dyrektywa, po co istnieje, gdzie się ją konfiguruje i jak runtime ją rozwiązuje.

---

## Spis treści

- [Czym to jest](#czym-to-jest)
- [Dlaczego istnieje](#dlaczego-istnieje)
- [Trzy wartości](#trzy-wartości)
- [Jak to skonfigurować](#jak-to-skonfigurować)
- [Jak rozwiązuje się `auto`](#jak-rozwiązuje-się-auto)
- [Jak egzekwowane są `ipv4` / `ipv6`](#jak-egzekwowane-są-ipv4--ipv6)
- [Kompatybilność SOCKS5](#kompatybilność-socks5)
- [Zachowanie fail-closed](#zachowanie-fail-closed)
- [Model danych](#model-danych)
- [Powiązana dokumentacja](#powiązana-dokumentacja)

---

## Czym to jest

Każde proxy w rejestrze ma pole `family` z trzema możliwymi wartościami, walidowanymi przez enum Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Pole domyślnie ma wartość `"auto"`, co zachowuje wcześniejsze zachowanie dual-stack. Ustawienie na `ipv4` lub `ipv6` przypina rodzinę połączenia (connect family) dla tego proxy.

Dyrektywa jest normalizowana wszędzie przez jeden helper, więc dowolna nieznana wartość zwija się do `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Dlaczego istnieje

Wprowadzone w PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemy motywujące:

| Problem                                         | Co naprawia dyrektywa                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Egress tylko-IPv6 wyciekający na IPv4**       | Gdy host proxy ma zarówno rekordy A, jak i AAAA (albo OS preferuje IPv4), Happy Eyeballs może nawiązać połączenie po IPv4 nawet gdy zamierzasz ścieżkę tylko-IPv6. Przypięcie `ipv6` usuwa ten wyciek.                                                                                                                                                      |
| **Revocation przy anomalii shared-egress**      | Rotujące providery (codex/openai) unieważniają tokeny, gdy wiele kont wychodzi przez **ten sam** IP przy wysokim wolumenie. Kontrola rodziny egress jest częścią utrzymania kont na odrębnych, przewidywalnych ścieżkach egress (zob. [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) pod kątem diagnostyki egress-IP, która idzie w parze z tym). |
| **Deterministyczny egress na compliance/testy** | Gdy musisz zagwarantować, że ruch wychodzi określoną rodziną, `auto` nie wystarcza.                                                                                                                                                                                                                                                                         |

Dyrektywa jest celowo **per-proxy**, a nie globalna — różne proxy w puli mogą mieć różne polityki.

---

## Trzy wartości

| Wartość | Etykieta UI         | Zachowanie                                                                                                                                           |
| ------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`  | `Auto (dual-stack)` | OS wybiera rodzinę. Dla hosta proxy będącego literałem IP rodzina wynika z literału; dla hostname obie rodziny są dopuszczalne. To domyślna wartość. |
| `ipv4`  | `IPv4 only`         | Przypina połączenie do IPv4. Fails closed, jeśli host proxy nie ma rekordu IPv4 (A).                                                                 |
| `ipv6`  | `IPv6 only`         | Przypina połączenie do IPv6. Fails closed, jeśli host proxy nie ma rekordu IPv6 (AAAA).                                                              |

Stringi UI są w `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Jak to skonfigurować

### Dashboard

Selektor jest w formularzu proxy zakładki **Proxy Pool**:

1. Otwórz **Dashboard → Settings → Proxy → Proxy Pool**
2. Dodaj lub edytuj proxy
3. Ustaw dropdown **IP family** na `Auto (dual-stack)`, `IPv4 only` lub `IPv6 only`
4. Zapisz

Kontrolka jest renderowana przez `ProxyRegistryManager.tsx` (montowany w `proxy/ProxyPoolTab.tsx`).

### API

Pole `family` jest częścią payloadów create/update rejestru proxy, walidowanych przez `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) i obsługiwanych przez `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Create an IPv6-only proxy
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Change an existing proxy to IPv4-only
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

To samo pole jest też akceptowane przez inline obiekt konfiguracji proxy używany przy wpisach upstream-proxy (`upstream_proxy_config.family`, zob. [Model danych](#model-danych)).

Reszta API CRUD/assignment proxy: [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Jak rozwiązuje się `auto`

Gdy `family` to `auto`, OmniRoute **nie** dokleja żadnej dyrektywy — URL proxy jest używany as-is, a rodzina połączenia wynika wewnętrznie.

W czasie budowy URL (`proxyConfigToUrl` / `normalizeProxyUrl` w `open-sse/utils/proxyDispatcher.ts`) proxy `auto` daje zwykły URL bez markera:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", { allowSocks5 });
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

W czasie dispatchu (`resolveDispatcherFamily`) `auto` rozwiązuje się do wewnętrznej rodziny hosta będącego literałem IP albo do `null` (decyduje OS) dla hostname:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null for a hostname → OS picks
  // ...
}
```

Zatem:

- `auto` + host literał IP (`192.0.2.1` / `[2001:db8::1]`) → rodzina tego literału.
- `auto` + hostname → `null` → standardowa dual-stack rezolucja OS.

---

## Jak egzekwowane są `ipv4` / `ipv6`

Dyrektywa inna niż `auto` podróżuje jako jeden syntetyczny marker query — `?family=ipv4` lub `?family=ipv6` — doklejany raz do znormalizowanego URL proxy. `normalizeProxyUrl` ostrożnie usuwa i ponownie dokleja ten marker dokładnie raz, żeby nigdy nie psuć parsowania portu.

Gdy budowany jest dispatcher, marker jest odczytywany i zamieniany na konkretną rodzinę połączenia. Jeśli host to literał IP **przeciwnej** rodziny, OmniRoute rzuca wyjątek (sprzeczność = fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Konkretna rodzina jest potem przypinana na connectorze:

- **Proxy HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — wyłącza Happy Eyeballs, więc wybierana jest wyłącznie wskazana rodzina.
- **Proxy SOCKS5**: niestandardowy connector przekazuje `socket_options: { family, autoSelectFamily: false }` do klienta SOCKS (zob. [Kompatybilność SOCKS5](#kompatybilność-socks5)).

---

## Kompatybilność SOCKS5

Pin rodziny działa z proxy SOCKS5, ale stockowe `fetch-socks` nie udostępnia opcji socket potrzebnych do przypięcia rodziny hopu proxy. OmniRoute dostarcza własny connector do tego:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`createProxyDispatcher` wybiera connector w zależności od tego, czy rodzina jest przypięta:

- `family === null` (czyli `auto` nad hostname) → stockowe `socksDispatcher` z `fetch-socks`.
- `family === 4 | 6` → `createSocksDispatcherWithFamily`, które przekazuje `socket_options` do `SocksClient.createConnection`, żeby Happy Eyeballs nie wybrał IPv4 przy polityce egress tylko-IPv6.

Sam support SOCKS5 jest domyślnie włączony (opt-out przez `ENABLE_SOCKS5_PROXY=false`); zob. [PROXY_GUIDE.md → Environment Variables](../ops/PROXY_GUIDE.md#environment-variables).

---

## Zachowanie fail-closed

Cały sens dyrektywy to **odmowa**, a nie cichy fallback na złą rodzinę. Egzekwują to dwa guardy:

1. **Sprzeczność literału** — dyrektywa sprzeczna z hostem będącym literałem IP rzuca wyjątek przy budowie dispatchera (`resolveDispatcherFamily`, pokazane wyżej).

2. **Pre-flight DNS hostname** — dla proxy z hostname i przypiętą rodziną `proxyFetch.ts` weryfikuje, że hostname faktycznie ma rekord w wymaganej rodzinie **przed** egressem, przez `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   Przy niepowodzeniu `proxyFetch.ts` oznacza błąd jako `code = "PROXY_FAMILY_UNAVAILABLE"` i `statusCode = 503`. Niepowodzenie rezolucji DNS jest również traktowane jako fail-closed (odmowa egressu).

Hosty będące literałami IP to no-op dla pre-flight DNS — ich rodzina wynika z literału i nie wymaga lookupu.

---

## Model danych

Kolumna `family` została dodana migracją `099_proxy_family.sql` do **dwóch** tabel:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — dyrektywa per-proxy dla wpisów rejestru (`src/lib/db/proxies.ts`). Zapytania rezolucji wybierają `family` obok pozostałych kolumn proxy, a brakująca/nie-stringowa wartość jest coercowana do `"auto"`.
- `upstream_proxy_config.family` — dyrektywa dla wpisów upstream-proxy (`src/lib/db/upstreamProxy.ts`), z tym samym domyślnym `"auto"`.

Gdy rozwiązany obiekt proxy niesie nie-`auto` `family`, `proxyConfigToUrl` dokleja marker `?family=`, żeby pin przetrwał aż do dispatchera.

---

## Powiązana dokumentacja

> 📖 **Powiązana dokumentacja:**
>
> - [Proxy Guide](../ops/PROXY_GUIDE.md) — pełny system proxy: CRUD rejestru, 4-poziomowa rezolucja, rotacja, health checking, referencja API
> - [Stealth Guide](./STEALTH_GUIDE.md) — warstwy fingerprint TLS i CLI fingerprint jadące na wierzchu proxy
> - [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — egzekwowanie loopback dla tras tylko-lokalnych
