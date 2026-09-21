# Egress IP Family Policy (IPv4/IPv6) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Prikvačite odlazni promet na jednu obitelj IP adresa — `auto`, `ipv4` ili `ipv6` — zasebno za svaki proxy, tako da izlaz koji podržava samo IPv6 nikada neprimjetno ne procuri natrag na IPv4.**

> **Izvor istine:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute omogućuje da svaki proxy ima **direktivu obitelji adresa za izlazni promet**. Prema zadanim postavkama operacijski sustav odabire IPv4 ili IPv6 (dual-stack, „Happy Eyeballs”). Kada direktivu postavite na `ipv4` ili `ipv6`, OmniRoute prikvačuje svaku vezu putem tog proxyja na odabranu obitelj i **prekida vezu u slučaju neuspjeha** umjesto da se vrati na drugu obitelj.

Ova stranica opisuje što je ta direktiva, zašto postoji, gdje je možete konfigurirati i kako je izvršno okruženje razrješava.

---

## Sadržaj

- [Što je to](#what-it-is)
- [Zašto postoji](#why-it-exists)
- [Tri vrijednosti](#the-three-values)
- [Kako je konfigurirati](#how-to-configure-it)
- [Kako se razrješava `auto`](#how-auto-resolves)
- [Kako se primjenjuju `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Kompatibilnost sa SOCKS5](#socks5-compatibility)
- [Ponašanje prekida u slučaju neuspjeha](#fail-closed-behavior)
- [Podatkovni model](#data-model)
- [Povezana dokumentacija](#related-documentation)

---

## Što je to

Svaki proxy u registru ima polje `family` s trima mogućim vrijednostima, koje se provjeravaju Zod enumeracijom:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Zadana vrijednost polja jest `"auto"`, čime se zadržava prethodno dual-stack ponašanje. Postavljanje na `ipv4` ili `ipv6` prikvačuje obitelj veze za taj proxy.

Direktiva se posvuda normalizira putem jedne pomoćne funkcije, tako da se svaka nepoznata vrijednost svodi na `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Zašto postoji

Uvedeno u PR-u [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemi koji su potaknuli uvođenje:

| Problem                                                 | Što direktiva rješava                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Izlazni promet koji podržava samo IPv6 curi na IPv4** | Kada proxy poslužitelj ima i A i AAAA zapise (ili operacijski sustav daje prednost IPv4), Happy Eyeballs može uspostaviti izlaznu vezu putem IPv4 čak i kada namjeravate upotrebljavati isključivo IPv6. Prikvačivanje na `ipv6` uklanja to curenje.                                                                                                                                    |
| **Opoziv zbog anomalije dijeljenog izlaza**             | Pružatelji s rotacijom (codex/openai) opozivaju tokene kada više računa pri velikom opterećenju izlazi putem **iste** IP adrese. Upravljanje obitelji izlaznih adresa pomaže zadržati račune na zasebnim, predvidljivim izlaznim putovima (pogledajte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) za dijagnostiku izlazne IP adrese koja se upotrebljava zajedno s ovime). |
| **Deterministički izlaz za usklađenost/testiranje**     | Kada morate zajamčiti da promet izlazi putem određene obitelji, `auto` nije dovoljan.                                                                                                                                                                                                                                                                                                   |

Direktiva je namjerno definirana **zasebno za svaki proxy**, a ne globalno — različiti proxyji u vašem skupu mogu imati različita pravila.

---

## Tri vrijednosti

| Vrijednost | Oznaka u korisničkom sučelju | Ponašanje                                                                                                                                                                         |
| ---------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | `Automatski (dual-stack)`    | OS odabire obitelj. Za proxy poslužitelj zadan IP literalom obitelj je određena samim literalom; za naziv poslužitelja mogu se koristiti obje obitelji. Ovo je zadana vrijednost. |
| `ipv4`     | `Samo IPv4`                  | Ograničava vezu na IPv4. Veza se ne uspostavlja ako proxy poslužitelj nema IPv4 (A) zapis.                                                                                        |
| `ipv6`     | `Samo IPv6`                  | Ograničava vezu na IPv6. Veza se ne uspostavlja ako proxy poslužitelj nema IPv6 (AAAA) zapis.                                                                                     |

Tekstovi korisničkog sučelja nalaze se u `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Kako konfigurirati

### Nadzorna ploča

Izbornik se nalazi u obrascu za proxy na kartici **Skup proxy poslužitelja**:

1. Otvorite **Nadzorna ploča → Postavke → Proxy → Skup proxy poslužitelja**
2. Dodajte ili uredite proxy
3. Postavite padajući izbornik **IP obitelj** na `Automatski (dual-stack)`, `Samo IPv4` ili `Samo IPv6`
4. Spremite

Kontrolu prikazuje `ProxyRegistryManager.tsx` (učitan u `proxy/ProxyPoolTab.tsx`).

### API

Polje `family` dio je podataka za stvaranje/ažuriranje registra proxy poslužitelja, a validiraju ga `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) te obrađuju `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Stvaranje proxy poslužitelja koji koristi samo IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Promjena postojećeg proxy poslužitelja tako da koristi samo IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Isto polje prihvaća i ugrađeni objekt konfiguracije proxy poslužitelja koji se upotrebljava za unose nadređenog proxy poslužitelja (`upstream_proxy_config.family`, pogledajte [Model podataka](#data-model)).

Za ostatak API-ja za CRUD operacije i dodjelu proxy poslužitelja pogledajte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Kako se razrješava `auto`

Kada je `family` postavljen na `auto`, OmniRoute **ne** dodaje nikakvu direktivu — URL proxy poslužitelja koristi se neizmijenjen, a obitelj veze određuje se inherentno.

Tijekom izrade URL-a (`proxyConfigToUrl` / `normalizeProxyUrl` u `open-sse/utils/proxyDispatcher.ts`), proxy s vrijednošću `auto` daje običan URL bez oznake:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Tijekom usmjeravanja (`resolveDispatcherFamily`), `auto` se razrješava u inherentnu obitelj poslužitelja zadanog IP literalom ili u `null` (odluku prepušta OS-u) za naziv poslužitelja:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null za naziv poslužitelja → OS odabire
  // ...
}
```

Dakle:

- `auto` + poslužitelj zadan IP literalom (`192.0.2.1` / `[2001:db8::1]`) → obitelj tog literala.
- `auto` + naziv poslužitelja → `null` → standardno dual-stack razrješavanje operacijskog sustava.

---

## Kako se provode `ipv4` / `ipv6`

Direktiva koja nije `auto` prenosi se kao jedna sintetička oznaka upita — `?family=ipv4` ili `?family=ipv6` — koja se jednom dodaje normaliziranom URL-u proxyja. `normalizeProxyUrl` pažljivo uklanja i ponovno dodaje ovu oznaku točno jednom kako nikada ne bi narušila raščlanjivanje porta.

Kada se izgradi dispečer, oznaka se čita i pretvara u konkretnu obitelj veze. Ako je host IP literal **suprotne** obitelji, OmniRoute izbacuje pogrešku (proturječje se obrađuje po načelu uskraćivanja u slučaju pogreške):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Konkretna obitelj zatim se fiksira na konektoru:

- **HTTP/HTTPS proxyji** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — onemogućuje Happy Eyeballs tako da se veza uspostavlja isključivo putem odabrane obitelji.
- **SOCKS5 proxyji**: prilagođeni konektor prosljeđuje `socket_options: { family, autoSelectFamily: false }` SOCKS klijentu (pogledajte [Kompatibilnost sa SOCKS5](#socks5-kompatibilnost)).

---

## Kompatibilnost sa SOCKS5

Fiksiranje obitelji funkcionira sa SOCKS5 proxyjima, ali standardni `fetch-socks` ne izlaže opcije utičnice potrebne za fiksiranje obitelji proxy veze. OmniRoute za to isporučuje vlastiti konektor:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Sva SOCKS5 prosljeđivanja prolaze kroz `createSocksDispatcherWithFamily` bez obzira na `family` (uključujući `null` / `auto` preko naziva hosta): `buildSocksFamilySocketOptions(null)` daje `{}`, a isti put `SocksClient.createConnection` + TLS `buildConnector` koristi se uz fiksiranje putem `socket_options` kako Happy Eyeballs ne bi mogao odabrati IPv4 za izlazno pravilo koje dopušta samo IPv6.

Sama podrška za SOCKS5 uključena je prema zadanim postavkama (može se isključiti putem `ENABLE_SOCKS5_PROXY=false`); pogledajte [PROXY_GUIDE.md → Varijable okruženja](../ops/PROXY_GUIDE.md#environment-variables).

---

## Ponašanje uskraćivanja u slučaju pogreške

Glavna svrha direktive jest **odbiti** vezu umjesto tihog prebacivanja na pogrešnu obitelj. To osiguravaju dvije zaštite:

1. **Proturječje literala** — direktiva koja je u suprotnosti s hostom zadanim kao IP literal izbacuje pogrešku tijekom izgradnje dispečera (`resolveDispatcherFamily`, prikazano iznad).

2. **Prethodna DNS provjera naziva hosta** — za proxy naveden nazivom hosta s fiksiranom obitelji, `proxyFetch.ts` provjerava ima li naziv hosta zapis u traženoj obitelji **prije** izlaznog povezivanja, putem `assertHostnameSupportsFamily`:

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

   U slučaju neuspjeha, `proxyFetch.ts` označava pogrešku s `code = "PROXY_FAMILY_UNAVAILABLE"` i `statusCode = 503`. Neuspjeh DNS razlučivanja također se obrađuje po načelu uskraćivanja u slučaju pogreške (izlazno povezivanje se odbija).

Za hostove zadane kao IP literali prethodna DNS provjera ne poduzima ništa — njihova je obitelj inherentna i nije potrebno traženje.

---

## Podatkovni model

Stupac `family` dodan je migracijom `099_proxy_family.sql` u **dvije** tablice:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktiva po proxyju za unose registra (`src/lib/db/proxies.ts`). Upiti za razrješavanje odabiru `family` zajedno s ostalim stupcima proxyja, a vrijednost koja nedostaje ili nije niz pretvara se u `"auto"`.
- `upstream_proxy_config.family` — direktiva za unose uzvodnog proxyja (`src/lib/db/upstreamProxy.ts`), s istom zadanom vrijednošću `"auto"`.

Kada razriješeni objekt proxyja sadrži vrijednost `family` koja nije `auto`, `proxyConfigToUrl` dodaje oznaku `?family=` kako bi se zadana vrijednost zadržala sve do dispečera.

---

## Povezana dokumentacija

> 📖 **Povezana dokumentacija:**
>
> - [Vodič za proxy](../ops/PROXY_GUIDE.md) — cjelovit sustav proxyja: CRUD registra, razrješavanje na 4 razine, rotacija, provjera ispravnosti, referenca API-ja
> - `docs/security/STEALTH_GUIDE.md` (git; nije ugrađeno u `/docs`) — slojevi TLS otiska i CLI otiska koji se nadograđuju na proxy
> - [Razine zaštite ruta](./ROUTE_GUARD_TIERS.md) — primjena sučelja povratne petlje za rute dostupne samo lokalno
