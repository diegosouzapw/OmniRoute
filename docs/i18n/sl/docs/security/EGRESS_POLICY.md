# Egress IP Family Policy (IPv4/IPv6) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Odhodni promet za vsak posredniški strežnik pripnite na eno družino IP — `auto`, `ipv4` ali `ipv6` — tako da se izhod, ki uporablja samo IPv6, nikoli neopazno ne preusmeri nazaj na IPv4.**

> **Vir resnice:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute omogoča, da ima vsak posredniški strežnik svojo **direktivo družine naslovov za izhodni promet**. Privzeto operacijski sistem izbere IPv4 ali IPv6 (dvojni sklad, »Happy Eyeballs«). Ko direktivo nastavite na `ipv4` ali `ipv6`, OmniRoute vsako povezavo prek tega posredniškega strežnika pripne na izbrano družino in **varno zavrne povezavo**, namesto da bi preklopil na drugo družino.

Na tej strani je opisano, kaj je ta direktiva, zakaj obstaja, kje jo nastavite in kako jo izvajalno okolje razreši.

---

## Kazalo

- [Kaj je to](#what-it-is)
- [Zakaj obstaja](#why-it-exists)
- [Tri vrednosti](#the-three-values)
- [Kako jo nastaviti](#how-to-configure-it)
- [Kako se razreši `auto`](#how-auto-resolves)
- [Kako se uveljavita `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Združljivost s SOCKS5](#socks5-compatibility)
- [Obnašanje z varno zavrnitvijo](#fail-closed-behavior)
- [Podatkovni model](#data-model)
- [Povezana dokumentacija](#related-documentation)

---

## Kaj je to

Vsak posredniški strežnik v registru ima polje `family` s tremi možnimi vrednostmi, ki jih preverja naštevanje Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Privzeta vrednost polja je `"auto"`, kar ohranja prejšnje delovanje z dvojnim skladom. Če ga nastavite na `ipv4` ali `ipv6`, se družina povezave za ta posredniški strežnik pripne na izbrano vrednost.

Direktiva se povsod normalizira z eno samo pomožno funkcijo, zato se vsaka neznana vrednost pretvori v `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Zakaj obstaja

Uvedeno v zahtevku za vključitev sprememb [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Glavni razlogi:

| Težava                                              | Kaj direktiva odpravi                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uhajanje izhoda, namenjenega samo IPv6, na IPv4** | Ko ima gostitelj posredniškega strežnika zapise A in AAAA (ali pa operacijski sistem daje prednost IPv4), lahko Happy Eyeballs vzpostavi izhodno povezavo prek IPv4, čeprav želite pot, ki uporablja samo IPv6. Pripenjanje na `ipv6` to uhajanje prepreči.                                                                                                                  |
| **Preklic zaradi anomalij pri skupnem izhodu**      | Ponudniki z rotacijo (codex/openai) prekličejo žetone, kadar veliko računov pri velikem obsegu uporablja **isti** izhodni IP. Nadzorovanje družine izhodnih naslovov pomaga ohranjati račune na ločenih in predvidljivih izhodnih poteh (glejte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) za diagnostiko izhodnega naslova IP, ki se uporablja skupaj s tem). |
| **Determinističen izhod za skladnost/preizkušanje** | Kadar morate zagotoviti, da promet izhaja prek določene družine, `auto` ne zadostuje.                                                                                                                                                                                                                                                                                        |

Direktiva je namenoma določena **za vsak posredniški strežnik posebej** in ne globalno — različni posredniški strežniki v vaši skupini imajo lahko različne pravilnike.

---

## Tri vrednosti

| Vrednost | Oznaka v uporabniškem vmesniku | Vedenje                                                                                                                                                                                                 |
| -------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`   | `Samodejno (dvojni sklad)`     | Operacijski sistem izbere družino. Pri gostitelju posredniškega strežnika, podanem kot naslov IP, je družina določena z naslovom; pri imenu gostitelja sta mogoči obe družini. To je privzeta vrednost. |
| `ipv4`   | `Samo IPv4`                    | Omeji povezavo na IPv4. Povezava se varno prekine, če gostitelj posredniškega strežnika nima zapisa IPv4 (A).                                                                                           |
| `ipv6`   | `Samo IPv6`                    | Omeji povezavo na IPv6. Povezava se varno prekine, če gostitelj posredniškega strežnika nima zapisa IPv6 (AAAA).                                                                                        |

Nizi uporabniškega vmesnika so v `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Kako nastaviti družino

### Nadzorna plošča

Izbirnik je v obrazcu za posredniški strežnik na zavihku **Proxy Pool**:

1. Odprite **Nadzorna plošča → Nastavitve → Posredniški strežnik → Proxy Pool**
2. Dodajte ali uredite posredniški strežnik
3. Na spustnem seznamu **Družina IP** izberite `Samodejno (dvojni sklad)`, `Samo IPv4` ali `Samo IPv6`
4. Shranite

Kontrolnik izrisuje `ProxyRegistryManager.tsx` (vgrajen v `proxy/ProxyPoolTab.tsx`).

### API

Polje `family` je del podatkovnih vsebin za ustvarjanje/posodabljanje registra posredniških strežnikov. Preverjata ga `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`), obravnavata pa ga `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Ustvari posredniški strežnik, omejen na IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Spremeni obstoječi posredniški strežnik tako, da uporablja samo IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Isto polje sprejema tudi vgrajeni objekt konfiguracije posredniškega strežnika, ki se uporablja za vnose nadrejenih posredniških strežnikov (`upstream_proxy_config.family`, glejte [Podatkovni model](#data-model)).

Za preostali del API-ja za ustvarjanje, branje, posodabljanje, brisanje in dodeljevanje posredniških strežnikov glejte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Kako se razreši `auto`

Ko je `family` nastavljen na `auto`, OmniRoute **ne** doda nobene direktive — URL posredniškega strežnika se uporabi takšen, kot je, družina povezave pa se določi samodejno.

Med sestavljanjem URL-ja (`proxyConfigToUrl` / `normalizeProxyUrl` v `open-sse/utils/proxyDispatcher.ts`) posredniški strežnik z nastavitvijo `auto` ustvari navaden URL brez označevalca:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Med posredovanjem (`resolveDispatcherFamily`) se `auto` razreši v družino naslova IP, kadar je gostitelj podan kot naslov IP, oziroma v `null` (operacijski sistem naj odloči), kadar je gostitelj podan z imenom:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null za ime gostitelja → izbere operacijski sistem
  // ...
}
```

Torej:

- `auto` + gostitelj, podan kot naslov IP (`192.0.2.1` / `[2001:db8::1]`) → družina tega naslova.
- `auto` + ime gostitelja → `null` → standardno razreševanje z dvojnim skladom operacijskega sistema.

---

## Kako se uveljavljata `ipv4` / `ipv6`

Direktiva, ki ni `auto`, se prenese kot en sam sintetični označevalec poizvedbe — `?family=ipv4` ali `?family=ipv6` — ki se enkrat doda normaliziranemu URL-ju posredniškega strežnika. `normalizeProxyUrl` skrbno odstrani in znova doda ta označevalec natanko enkrat, zato nikoli ne pokvari razčlenjevanja vrat.

Ko se ustvari razpošiljevalnik, se označevalec prebere in pretvori v konkretno družino povezave. Če je gostitelj naslov IP iz **nasprotne** družine, OmniRoute sproži izjemo (ob protislovju se povezava varno zavrne):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Konkretna družina se nato fiksira na povezovalniku:

- **Posredniški strežniki HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — onemogoči Happy Eyeballs, zato se povezava vzpostavi samo z izbrano družino.
- **Posredniški strežniki SOCKS5**: povezovalnik po meri posreduje `socket_options: { family, autoSelectFamily: false }` odjemalcu SOCKS (glejte [Združljivost s SOCKS5](#socks5-compatibility)).

---

## Združljivost s SOCKS5

Fiksiranje družine deluje s posredniškimi strežniki SOCKS5, vendar standardni `fetch-socks` ne izpostavlja možnosti vtičnice, ki so potrebne za fiksiranje družine posredniškega skoka. OmniRoute zato vključuje lasten povezovalnik:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Vsa razpošiljanja SOCKS5 potekajo prek `createSocksDispatcherWithFamily` ne glede na `family` (vključno z `null` / `auto` pri imenu gostitelja): `buildSocksFamilySocketOptions(null)` vrne `{}`, uporabljena pa je ista pot `SocksClient.createConnection` + TLS `buildConnector` s fiksiranjem prek `socket_options`, tako da Happy Eyeballs pri pravilniku izhodnega prometa, omejenem na IPv6, ne more izbrati IPv4.

Podpora za SOCKS5 je privzeto omogočena (onemogočite jo lahko z `ENABLE_SOCKS5_PROXY=false`); glejte [PROXY_GUIDE.md → Okoljske spremenljivke](../ops/PROXY_GUIDE.md#environment-variables).

---

## Varno zavračanje ob napaki

Namen direktive je, da povezavo **zavrne**, namesto da bi neopazno uporabila napačno družino. To zagotavljata dva varnostna mehanizma:

1. **Protislovje z dobesednim naslovom** — direktiva, ki je v nasprotju z gostiteljem, podanim kot naslov IP, sproži izjemo med ustvarjanjem razpošiljevalnika (`resolveDispatcherFamily`, prikazan zgoraj).

2. **Predhodno preverjanje DNS za ime gostitelja** — pri posredniškem strežniku z imenom gostitelja in fiksirano družino `proxyFetch.ts` prek `assertHostnameSupportsFamily` **pred** začetkom izhodnega prometa preveri, ali ima ime gostitelja zapis v zahtevani družini:

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

   Ob neuspehu `proxyFetch.ts` napako označi z `code = "PROXY_FAMILY_UNAVAILABLE"` in `statusCode = 503`. Tudi neuspešno razreševanje DNS se obravnava po načelu varnega zavračanja (izhodni promet se zavrne).

Pri gostiteljih, podanih kot naslov IP, se predhodno preverjanje DNS ne izvede — njihova družina je neločljivo določena in ne zahteva poizvedbe.

---

## Podatkovni model

Stolpec `family` je bil z migracijo `099_proxy_family.sql` dodan v **dve** tabeli:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktiva za posamezen posredniški strežnik za vnose v registru (`src/lib/db/proxies.ts`). Poizvedbe za razreševanje izberejo `family` skupaj z drugimi stolpci posredniškega strežnika, manjkajoča vrednost oziroma vrednost, ki ni niz, pa se pretvori v `"auto"`.
- `upstream_proxy_config.family` — direktiva za vnose nadrejenih posredniških strežnikov (`src/lib/db/upstreamProxy.ts`) z enako privzeto vrednostjo `"auto"`.

Ko razrešeni objekt posredniškega strežnika vsebuje vrednost `family`, ki ni `auto`, `proxyConfigToUrl` doda oznako `?family=`, tako da se nastavitev ohrani vse do razpošiljevalnika.

---

## Sorodna dokumentacija

> 📖 **Sorodna dokumentacija:**
>
> - [Vodnik po posredniških strežnikih](../ops/PROXY_GUIDE.md) — celoten sistem posredniških strežnikov: operacije CRUD registra, štiristopenjsko razreševanje, rotacija, preverjanje stanja in referenčna dokumentacija API-ja
> - `docs/security/STEALTH_GUIDE.md` (git; ni vključeno v `/docs`) — plasti prstnega odtisa TLS in prstnega odtisa CLI, ki delujeta nad posredniškim strežnikom
> - [Ravni varovanja poti](./ROUTE_GUARD_TIERS.md) — uveljavljanje povratne zanke za poti, ki so dostopne samo lokalno
