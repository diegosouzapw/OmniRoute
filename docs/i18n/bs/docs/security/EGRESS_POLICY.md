# Egress IP Family Policy (IPv4/IPv6) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

# Politika porodice izlaznih IP adresa (IPv4/IPv6)

> **Fiksirajte odlazni saobraćaj na jednu IP porodicu — `auto`, `ipv4` ili `ipv6` — po proksiju, tako da IPv6-only izlaz nikada ne procuri neprimjetno nazad na IPv4.**

> **Izvor istine:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute omogućava svakom proksiju da nosi **direktivu za izlaznu porodicu adresa**. Po defaultu, OS bira IPv4 ili IPv6 (dual-stack, "Happy Eyeballs"). Kada postavite direktivu na `ipv4` ili `ipv6`, OmniRoute fiksira svaku konekciju kroz taj proksi na odabranu porodicu i **zatvara se u slučaju greške (fails closed)** umjesto da se vraća na drugu porodicu.

Ova stranica dokumentuje šta je direktiva, zašto postoji, gdje je konfigurišete i kako je runtime razrješava.

---

## Sadržaj

- [Šta je to](#šta-je-to)
- [Zašto postoji](#zašto-postoji)
- [Tri vrijednosti](#tri-vrijednosti)
- [Kako konfigurisati](#kako-konfigurisati)
- [Kako se `auto` razrješava](#kako-se-auto-razrješava)
- [Kako se `ipv4` / `ipv6` sprovode](#kako-se-ipv4--ipv6-su-sprovode)
- [SOCKS5 kompatibilnost](#socks5-kompatibilnost)
- [Ponašanje pri zatvaranju u slučaju greške (Fail-Closed)](#ponašanje-pri-zatvaranju-u-slučaju-greške-fail-closed)
- [Model podataka](#model-podataka)
- [Povezana dokumentacija](#povezana-dokumentacija)

---

## Šta je to

Svaki proksi u registru ima polje `family` sa tri moguće vrijednosti, validirane pomoću Zod enuma:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Polje je po defaultu postavljeno na `"auto"`, što čuva prethodno dual-stack ponašanje. Postavljanje na `ipv4` ili `ipv6` fiksira porodicu konekcije za taj proksi.

Direktiva se normalizuje svuda kroz jedan pomoćni program (helper) tako da se svaka nepoznata vrijednost svodi na `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Zašto postoji

Uvedeno u PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Motivišući problemi:

| Problem                                                | Šta direktiva popravlja                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-only izlaz koji curi na IPv4**                  | Kada proksi host ima i A i AAAA zapise (ili OS preferira IPv4), Happy Eyeballs može uspostaviti vezu preko IPv4 čak i kada namjeravate koristiti IPv6-only putanju. Fiksiranje na `ipv6` uklanja to curenje.                                                                                                                                                      |
| **Opoziv anomalije dijeljenog izlaza (Shared-egress)** | Provajderi koji rotiraju (codex/openai) opozivaju tokene kada mnogi nalozi izlaze kroz **istu** IP adresu pri velikom obimu. Kontrola izlazne porodice je dio održavanja naloga na različitim, predvidljivim izlaznim putanjama (pogledajte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) za dijagnostiku izlaznih IP adresa koja se uparuje sa ovim). |
| **Deterministički izlaz za usklađenost/testiranje**    | Kada morate garantovati da saobraćaj odlazi preko određene porodice, `auto` nije dovoljan.                                                                                                                                                                                                                                                                        |

Direktiva je namjerno **po proksiju**, a ne globalna — različiti proksiji u vašem poolu mogu imati različite politike.

---

## Tri vrijednosti

| Vrijednost | UI oznaka           | Ponašanje                                                                                                                                         |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | `Auto (dual-stack)` | OS bira porodicu. Za IP-literal proxy hosta, porodica je svojstvena literalu; za hostname, obje porodice su prihvatljive. Ovo je zadana postavka. |
| `ipv4`     | `IPv4 only`         | Fiksira vezu na IPv4. Prekida vezu ako proxy host nema IPv4 (A) zapis.                                                                            |
| `ipv6`     | `IPv6 only`         | Fiksira vezu na IPv6. Prekida vezu ako proxy host nema IPv6 (AAAA) zapis.                                                                         |

UI stringovi se nalaze u `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Kako konfigurirati

### Dashboard

Selektor se nalazi u proxy formi kartice **Proxy Pool**:

1. Otvorite **Dashboard → Settings → Proxy → Proxy Pool**
2. Dodajte ili uredite proxy
3. Postavite padajući meni **IP family** na `Auto (dual-stack)`, `IPv4 only` ili `IPv6 only`
4. Spremite

Kontrolu renderuje `ProxyRegistryManager.tsx` (montiran u `proxy/ProxyPoolTab.tsx`).

### API

Polje `family` je dio payload-a za kreiranje/ažuriranje proxy registra, validirano od strane `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) i obrađeno putem `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Kreirajte proxy samo za IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Promijenite postojeći proxy na samo IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Isto polje je također prihvaćeno od strane inline proxy config objekta koji se koristi za upstream-proxy unose (`upstream_proxy_config.family`, pogledajte [Data Model](#data-model)).

Za ostatak proxy CRUD/assignment API-ja, pogledajte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Kako se `auto` razrješava

Kada je `family` postavljen na `auto`, OmniRoute ne dodaje nikakvu direktivu — proxy URL se koristi takav kakav jeste, a porodica povezivanja se određuje intrinzično.

U vrijeme izgradnje URL-a (`proxyConfigToUrl` / `normalizeProxyUrl` u `open-sse/utils/proxyDispatcher.ts`), `auto` proxy daje običan URL bez markera:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

U vrijeme dispečiranja (`resolveDispatcherFamily`), `auto` se razrješava na intrinzičnu porodicu IP-literal hosta, ili `null` (prepustite OS-u da odluči) za hostname:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null za hostname → OS bira
  // ...
}
```

Dakle:

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → porodica tog literala.
- `auto` + hostname → `null` → standardna dual-stack OS rezolucija.

## Kako se primjenjuju `ipv4` / `ipv6`

Direktiva koja nije `auto` putuje kao jedinstvena sintetička oznaka upita — `?family=ipv4` ili `?family=ipv6` — dodata jednom na normalizovani proxy URL. `normalizeProxyUrl` pažljivo uklanja i ponovo dodaje ovu oznaku tačno jednom kako nikada ne bi oštetila parsiranje porta.

Kada se dispatcher izgradi, oznaka se čita i pretvara u konkretnu porodicu povezivanja. Ako je host IP literal **suprotne** porodice, OmniRoute izbacuje grešku (kontradikcija znači fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Direktiva proxy porodice ${directive} je u suprotnosti sa ${literal === 6 ? "IPv6" : "IPv4"} literalnim hostom`
  );
}
```

Konkretna porodica se zatim fiksira na konektoru:

- **HTTP/HTTPS proxyji** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — onemogućava Happy Eyeballs tako da je izabrana porodica jedina koja se poziva.
- **SOCKS5 proxyji**: prilagođeni konektor provlači `socket_options: { family, autoSelectFamily: false }` u SOCKS klijent (pogledajte [SOCKS5 Compatibility](#socks5-compatibility)).

---

## SOCKS5 kompatibilnost

Fiksiranje porodice radi sa SOCKS5 proxyjima, ali standardni `fetch-socks` ne izlaže opcije socket-a potrebne za fiksiranje porodice proxy skoka. OmniRoute za to isporučuje sopstveni konektor:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Sva SOCKS5 slanja idu kroz `createSocksDispatcherWithFamily` bez obzira na `family` (uključujući `null` / `auto` preko hostname-a): `buildSocksFamilySocketOptions(null)` daje `{}`, a isti `SocksClient.createConnection` + TLS `buildConnector` put se koristi sa `socket_options` fiksiranjem tako da Happy Eyeballs ne može izabrati IPv4 za IPv6-only izlaznu politiku.

Sama SOCKS5 podrška je uključena po defaultu (isključivanje putem `ENABLE_SOCKS5_PROXY=false`); pogledajte [PROXY_GUIDE.md → Environment Variables](../ops/PROXY_GUIDE.md#environment-variables).

---

## Ponašanje "fail-closed"

Poenta direktive je da **odbije** umjesto da tiho pređe na pogrešnu porodicu. Dva zaštitna mehanizma ovo sprovode:

1. **Literalna kontradikcija** — direktiva koja je u suprotnosti sa IP-literalnim hostom izbacuje grešku u vrijeme izgradnje dispatchera (`resolveDispatcherFamily`, prikazano iznad).

2. **Hostname pre-flight DNS provjera** — za hostname proxy sa fiksiranom porodicom, `proxyFetch.ts` verifikuje da li hostname zaista ima zapis u traženoj porodici **prije** izlaska, putem `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} nema ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} zapis; ` +
         `odbijanje ${family === 6 ? "IPv6" : "IPv4"}-only izlaza (fail-closed)`
     );
   }
   ```

   U slučaju neuspjeha, `proxyFetch.ts` označava grešku sa `code = "PROXY_FAMILY_UNAVAILABLE"` i `statusCode = 503`. Neuspjeh DNS rezolucije se takođe tretira kao fail-closed (odbijanje izlaska).

IP-literalni hostovi su no-op za DNS pre-flight — njihova porodica je intrinzična i ne zahtijeva pretragu.

---

## Model podataka

Kolona `family` je dodata migracijom `099_proxy_family.sql` u **dvije** tabele:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktiva po proksiju za unose u registru (`src/lib/db/proxies.ts`). Upiti za razrješenje biraju `family` zajedno sa ostalim kolonama proksija, a vrijednost koja nedostaje ili nije string se prinudno pretvara u `"auto"`.
- `upstream_proxy_config.family` — direktiva za unose upstream-proxy (`src/lib/db/upstreamProxy.ts`), sa istom `"auto"` podrazumijevanom vrijednošću.

Kada razriješeni objekat proksija nosi `family` koji nije `auto`, `proxyConfigToUrl` dodaje `?family=` marker tako da pin preživi sve do dispečera.

---

## Povezana dokumentacija

> 📖 **Povezana dokumentacija:**
>
> - [Proxy Guide](../ops/PROXY_GUIDE.md) — kompletan proxy sistem: CRUD registra, razrješenje na 4 nivoa, rotacija, provjera ispravnosti, API referenca
> - `docs/security/STEALTH_GUIDE.md` (git; nije kompajlirano u `/docs`) — TLS fingerprint i CLI fingerprint slojevi koji se nalaze iznad proksija
> - [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback prinuda za rute koje su samo lokalne
