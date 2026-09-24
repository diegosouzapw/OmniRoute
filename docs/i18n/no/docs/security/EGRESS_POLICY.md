# Egress IP Family Policy (IPv4/IPv6) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fest utgående trafikk til én IP-familie — `auto`, `ipv4` eller `ipv6` — per proxy, slik at utgående trafikk som kun skal bruke IPv6, aldri utilsiktet lekker tilbake til IPv4.**

> **Autoritativ kilde:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute lar hver proxy ha et **direktiv for adressefamilien til utgående trafikk**. Som standard velger operativsystemet IPv4 eller IPv6 (dobbelstakk, «Happy Eyeballs»). Når du setter direktivet til `ipv4` eller `ipv6`, fester OmniRoute alle tilkoblinger gjennom denne proxyen til den valgte familien og **avviser tilkoblingen** i stedet for å falle tilbake til den andre familien.

Denne siden dokumenterer hva direktivet er, hvorfor det finnes, hvor du konfigurerer det, og hvordan kjøretidsmiljøet løser det.

---

## Innholdsfortegnelse

- [Hva det er](#what-it-is)
- [Hvorfor det finnes](#why-it-exists)
- [De tre verdiene](#the-three-values)
- [Slik konfigurerer du det](#how-to-configure-it)
- [Slik løses `auto`](#how-auto-resolves)
- [Slik håndheves `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-kompatibilitet](#socks5-compatibility)
- [Avvisning ved feil](#fail-closed-behavior)
- [Datamodell](#data-model)
- [Relatert dokumentasjon](#related-documentation)

---

## Hva det er

Hver proxy i registeret har et `family`-felt med tre mulige verdier, validert av en Zod-enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Feltets standardverdi er `"auto"`, som bevarer den tidligere dobbelstakkoppførselen. Hvis det settes til `ipv4` eller `ipv6`, festes tilkoblingsfamilien for denne proxyen.

Direktivet normaliseres overalt gjennom én enkelt hjelpefunksjon, slik at enhver ukjent verdi reduseres til `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Hvorfor det finnes

Introdusert i PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemene som motiverte funksjonen:

| Problem                                                       | Hva direktivet løser                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utgående trafikk som kun skal bruke IPv6, lekker til IPv4** | Når en proxyvert har både A- og AAAA-poster (eller operativsystemet foretrekker IPv4), kan Happy Eyeballs opprette utgående forbindelser over IPv4 selv når du ønsker en ren IPv6-bane. Ved å feste til `ipv6` fjernes denne lekkasjen.                                                                                                                                                            |
| **Tilbakekalling ved avvik i delt utgående trafikk**          | Roterende leverandører (codex/openai) tilbakekaller tokener når mange kontoer sender store mengder trafikk gjennom den **samme** IP-adressen. Kontroll over familien for utgående trafikk bidrar til å holde kontoer på separate og forutsigbare utgående baner (se [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) for diagnostikk av utgående IP-adresser som brukes sammen med dette). |
| **Deterministisk utgående trafikk for samsvar/testing**       | Når du må garantere at trafikken går ut via en bestemt familie, er ikke `auto` tilstrekkelig.                                                                                                                                                                                                                                                                                                      |

Direktivet gjelder med hensikt **per proxy**, ikke globalt — ulike proxyer i samlingen din kan ha forskjellige policyer.

---

## De tre verdiene

| Verdi  | Etikett i brukergrensesnittet | Atferd                                                                                                                                                                        |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Automatisk (dobbeltstakk)`   | Operativsystemet velger familien. For en proxyvert angitt som en IP-literal er familien iboende i literalen. For et vertsnavn kan begge familier brukes. Dette er standarden. |
| `ipv4` | `Kun IPv4`                    | Låser tilkoblingen til IPv4. Avviser tilkoblingen hvis proxyverten ikke har noen IPv4-oppføring (A).                                                                          |
| `ipv6` | `Kun IPv6`                    | Låser tilkoblingen til IPv6. Avviser tilkoblingen hvis proxyverten ikke har noen IPv6-oppføring (AAAA).                                                                       |

Tekstene for brukergrensesnittet ligger i `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Slik konfigurerer du det

### Kontrollpanel

Velgeren finnes i proxyskjemaet under fanen **Proxy Pool**:

1. Åpne **Dashboard → Settings → Proxy → Proxy Pool**
2. Legg til eller rediger en proxy
3. Sett rullegardinmenyen **IP-familie** til `Automatisk (dobbeltstakk)`, `Kun IPv4` eller `Kun IPv6`
4. Lagre

Kontrollen gjengis av `ProxyRegistryManager.tsx` (montert i `proxy/ProxyPoolTab.tsx`).

### API

Feltet `family` er en del av nyttelastene for oppretting/oppdatering av proxyregisteret, valideres av `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) og håndteres av `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Opprett en proxy som bare bruker IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Endre en eksisterende proxy til bare å bruke IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Det samme feltet godtas også av det innebygde proxykonfigurasjonsobjektet som brukes for oppføringer for oppstrømsproxy (`upstream_proxy_config.family`, se [Datamodell](#data-model)).

For resten av API-et for CRUD-operasjoner og tilordning av proxyer, se [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Slik løses `auto`

Når `family` er `auto`, legger OmniRoute **ikke** til noe direktiv — proxy-URL-en brukes som den er, og tilkoblingsfamilien bestemmes iboende.

Når URL-en bygges (`proxyConfigToUrl` / `normalizeProxyUrl` i `open-sse/utils/proxyDispatcher.ts`), gir en `auto`-proxy en vanlig URL uten markør:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Ved videresending (`resolveDispatcherFamily`) løses `auto` til den iboende familien til en IP-literal vert, eller `null` (la operativsystemet bestemme) for et vertsnavn:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null for et vertsnavn → operativsystemet velger
  // ...
}
```

Dermed gjelder følgende:

- `auto` + IP-literal vert (`192.0.2.1` / `[2001:db8::1]`) → familien til den aktuelle literalen.
- `auto` + vertsnavn → `null` → standard dobbeltstakk-oppløsning i operativsystemet.

---

## Slik håndheves `ipv4` / `ipv6`

Et direktiv som ikke er `auto`, overføres som én enkelt syntetisk spørringsmarkør — `?family=ipv4` eller `?family=ipv6` — som legges til én gang i den normaliserte proxy-URL-en. `normalizeProxyUrl` sørger for å fjerne og legge til denne markøren på nytt nøyaktig én gang, slik at den aldri ødelegger porttolkingen.

Når dispatcheren bygges, leses markøren og konverteres til en konkret tilkoblingsfamilie. Hvis verten er en IP-litteral fra den **motsatte** familien, utløser OmniRoute en feil (motsigelser håndteres som fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Den konkrete familien bindes deretter til tilkoblingskomponenten:

- **HTTP/HTTPS-proxyer** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — deaktiverer Happy Eyeballs, slik at det bare opprettes forbindelse via den valgte familien.
- **SOCKS5-proxyer**: En egendefinert tilkoblingskomponent sender `socket_options: { family, autoSelectFamily: false }` videre til SOCKS-klienten (se [SOCKS5-kompatibilitet](#socks5-kompatibilitet)).

---

## SOCKS5-kompatibilitet

Familiebindingen fungerer med SOCKS5-proxyer, men standardversjonen av `fetch-socks` eksponerer ikke socket-alternativene som trengs for å binde familien til proxyhoppet. OmniRoute leveres med sin egen tilkoblingskomponent for dette:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Alle SOCKS5-dispatcher går gjennom `createSocksDispatcherWithFamily` uavhengig av `family` (inkludert `null` / `auto` over et vertsnavn): `buildSocksFamilySocketOptions(null)` gir `{}`, og den samme banen med `SocksClient.createConnection` + TLS `buildConnector` brukes med binding via `socket_options`, slik at Happy Eyeballs ikke kan velge IPv4 for en utgående policy som bare tillater IPv6.

Selve SOCKS5-støtten er aktivert som standard (kan velges bort via `ENABLE_SOCKS5_PROXY=false`); se [PROXY_GUIDE.md → Miljøvariabler](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-closed-atferd

Hele poenget med direktivet er å **avvise** i stedet for å falle tilbake til feil familie uten varsel. To kontroller håndhever dette:

1. **Litteral motsigelse** — et direktiv som motsier en IP-litteral vert, utløser en feil når dispatcheren bygges (`resolveDispatcherFamily`, vist ovenfor).

2. **DNS-forhåndskontroll av vertsnavn** — for en vertsnavnproxy med en bundet familie kontrollerer `proxyFetch.ts` at vertsnavnet faktisk har en oppføring i den påkrevde familien **før** utgående trafikk tillates, via `assertHostnameSupportsFamily`:

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

   Ved feil merker `proxyFetch.ts` feilen med `code = "PROXY_FAMILY_UNAVAILABLE"` og `statusCode = 503`. En DNS-oppløsningsfeil behandles på samme måte som fail-closed (utgående trafikk avvises).

IP-litterale verter er en no-op for DNS-forhåndskontrollen — familien deres er iboende og krever ikke noe oppslag.

---

## Datamodell

Kolonnen `family` ble lagt til av migreringen `099_proxy_family.sql` i **to** tabeller:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktivet per proxy for registeroppføringer (`src/lib/db/proxies.ts`). Spørringer for oppløsning velger `family` sammen med de andre proxykolonnene, og en manglende verdi eller en verdi som ikke er en streng, konverteres til `"auto"`.
- `upstream_proxy_config.family` — direktivet for oppstrømsproxyoppføringer (`src/lib/db/upstreamProxy.ts`), med samme standardverdi `"auto"`.

Når et oppløst proxyobjekt har en `family` som ikke er `auto`, legger `proxyConfigToUrl` til markøren `?family=`, slik at bindingen bevares helt frem til dispatcheren.

---

## Relatert dokumentasjon

> 📖 **Relatert dokumentasjon:**
>
> - [Proxyveiledning](../ops/PROXY_GUIDE.md) — hele proxysystemet: CRUD-operasjoner for registeret, oppløsning på fire nivåer, rotasjon, helsekontroll og API-referanse
> - `docs/security/STEALTH_GUIDE.md` (git; ikke kompilert inn i `/docs`) — lag for TLS-fingeravtrykk og CLI-fingeravtrykk som ligger oppå proxyen
> - [Nivåer for rutebeskyttelse](./ROUTE_GUARD_TIERS.md) — håndheving av loopback for ruter som kun er lokale
