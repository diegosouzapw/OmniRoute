# Egress IP Family Policy (IPv4/IPv6) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Připněte odchozí provoz k jedné rodině IP adres — `auto`, `ipv4` nebo `ipv6` — pro každou proxy, aby odchozí připojení pouze přes IPv6 nikdy nepozorovaně nepřešlo zpět na IPv4.**

> **Zdroj pravdy:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute umožňuje každé proxy nést **direktivu rodiny adres pro odchozí připojení**. Ve výchozím nastavení vybírá IPv4 nebo IPv6 operační systém (duální zásobník, „Happy Eyeballs“). Když direktivu nastavíte na `ipv4` nebo `ipv6`, OmniRoute připne každé připojení přes danou proxy ke zvolené rodině a **při selhání připojení ukončí**, místo aby přešel na druhou rodinu.

Tato stránka popisuje, co tato direktiva představuje, proč existuje, kde ji můžete nakonfigurovat a jak ji běhové prostředí vyhodnocuje.

---

## Obsah

- [Co to je](#what-it-is)
- [Proč to existuje](#why-it-exists)
- [Tři hodnoty](#the-three-values)
- [Jak direktivu nakonfigurovat](#how-to-configure-it)
- [Jak se vyhodnocuje `auto`](#how-auto-resolves)
- [Jak jsou vynucovány hodnoty `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Kompatibilita se SOCKS5](#socks5-compatibility)
- [Chování fail-closed](#fail-closed-behavior)
- [Datový model](#data-model)
- [Související dokumentace](#related-documentation)

---

## Co to je

Každá proxy v registru má pole `family` se třemi možnými hodnotami, které jsou ověřovány pomocí výčtu Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Výchozí hodnotou pole je `"auto"`, což zachovává předchozí chování duálního zásobníku. Nastavení na `ipv4` nebo `ipv6` připne rodinu připojení pro danou proxy.

Direktiva je všude normalizována prostřednictvím jediné pomocné funkce, takže každá neznámá hodnota se převede na `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Proč to existuje

Zavedeno v PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Hlavní důvody:

| Problém                                                                       | Co direktiva řeší                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Únik odchozího provozu určeného pouze pro IPv6 na IPv4**                    | Když má hostitel proxy záznamy A i AAAA (nebo operační systém upřednostňuje IPv4), může Happy Eyeballs navázat odchozí připojení přes IPv4, i když zamýšlíte cestu výhradně přes IPv6. Připnutí k `ipv6` tomuto úniku zabrání.                                                                                                                                                                       |
| **Odvolávání kvůli anomáliím sdíleného odchozího připojení**                  | Poskytovatelé s rotací (codex/openai) odvolávají tokeny, když mnoho účtů ve velkém objemu používá pro odchozí provoz **stejnou** IP adresu. Řízení rodiny odchozího připojení pomáhá udržet účty na odlišných a předvídatelných odchozích trasách (viz diagnostika odchozích IP adres v souboru [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts), která se používá společně s touto funkcí). |
| **Deterministické odchozí připojení pro účely dodržování předpisů/testování** | Pokud musíte zaručit, že provoz bude odcházet přes konkrétní rodinu, `auto` nestačí.                                                                                                                                                                                                                                                                                                                 |

Direktiva je záměrně nastavována **pro každou proxy**, nikoli globálně — různé proxy ve vašem fondu mohou používat různé zásady.

---

## Tři hodnoty

| Hodnota | Popisek v uživatelském rozhraní | Chování                                                                                                                                                                       |
| ------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`  | `Automaticky (dual-stack)`      | Rodinu vybere operační systém. U hostitele proxy zadaného IP literálem je rodina daná samotným literálem; u názvu hostitele lze použít obě rodiny. Toto je výchozí nastavení. |
| `ipv4`  | `Pouze IPv4`                    | Omezí připojení na IPv4. Pokud hostitel proxy nemá žádný záznam IPv4 (A), připojení bezpečně selže.                                                                           |
| `ipv6`  | `Pouze IPv6`                    | Omezí připojení na IPv6. Pokud hostitel proxy nemá žádný záznam IPv6 (AAAA), připojení bezpečně selže.                                                                        |

Řetězce uživatelského rozhraní se nacházejí v `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Jak nastavení nakonfigurovat

### Řídicí panel

Selektor se nachází ve formuláři proxy na kartě **Fond proxy**:

1. Otevřete **Řídicí panel → Nastavení → Proxy → Fond proxy**
2. Přidejte nebo upravte proxy
3. Nastavte rozevírací seznam **Rodina IP** na `Automaticky (dual-stack)`, `Pouze IPv4` nebo `Pouze IPv6`
4. Uložte změny

Tento ovládací prvek vykresluje `ProxyRegistryManager.tsx` (připojený v `proxy/ProxyPoolTab.tsx`).

### API

Pole `family` je součástí dat požadavků pro vytvoření a aktualizaci registru proxy, ověřovaných pomocí `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) a zpracovávaných prostřednictvím `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Vytvoření proxy používající pouze IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Změna existující proxy tak, aby používala pouze IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Stejné pole přijímá také vložený objekt konfigurace proxy používaný pro položky nadřazených proxy (`upstream_proxy_config.family`, viz [Datový model](#data-model)).

Informace o zbývajících operacích CRUD a API pro přiřazování proxy najdete v souboru [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Jak se vyhodnocuje `auto`

Pokud je `family` nastaveno na `auto`, OmniRoute **nepřidává** žádnou direktivu — URL proxy se použije beze změny a rodina připojení se určí inherentně.

Při sestavování URL (`proxyConfigToUrl` / `normalizeProxyUrl` v `open-sse/utils/proxyDispatcher.ts`) vytvoří proxy s nastavením `auto` prostou URL bez značky:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Při odesílání (`resolveDispatcherFamily`) se `auto` vyhodnotí jako inherentní rodina hostitele zadaného IP literálem, nebo jako `null` (volbu provede operační systém) v případě názvu hostitele:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null pro název hostitele → vybírá operační systém
  // ...
}
```

Tedy:

- `auto` + hostitel zadaný IP literálem (`192.0.2.1` / `[2001:db8::1]`) → rodina daného literálu.
- `auto` + název hostitele → `null` → standardní dual-stack překlad názvů operačním systémem.

---

## Jak jsou vynucovány `ipv4` / `ipv6`

Direktiva jiná než `auto` se přenáší jako jediný syntetický parametr dotazu — `?family=ipv4` nebo `?family=ipv6` — připojený právě jednou k normalizované URL proxy. Funkce `normalizeProxyUrl` tento parametr pečlivě odebere a znovu připojí právě jednou, takže nikdy nenaruší parsování portu.

Při sestavování dispatcheru je parametr načten a převeden na konkrétní rodinu připojení. Pokud je hostitel IP literálem **opačné** rodiny, OmniRoute vyvolá výjimku (při rozporu se postupuje metodou fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Konkrétní rodina je poté pevně nastavena na konektoru:

- **Proxy HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — vypne Happy Eyeballs, takže se připojení naváže pouze prostřednictvím zvolené rodiny.
- **Proxy SOCKS5**: vlastní konektor předává `socket_options: { family, autoSelectFamily: false }` klientovi SOCKS (viz [Kompatibilita se SOCKS5](#kompatibilita-se-socks5)).

---

## Kompatibilita se SOCKS5

Pevné nastavení rodiny funguje s proxy SOCKS5, ale standardní `fetch-socks` nezpřístupňuje volby soketu potřebné k pevnému nastavení rodiny pro připojení k proxy. OmniRoute proto obsahuje vlastní konektor:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Všechna předávání požadavků přes SOCKS5 procházejí přes `createSocksDispatcherWithFamily` bez ohledu na hodnotu `family` (včetně `null` / `auto` při použití názvu hostitele): `buildSocksFamilySocketOptions(null)` vrátí `{}` a použije se stejná cesta `SocksClient.createConnection` + TLS `buildConnector` s pevným nastavením pomocí `socket_options`, takže Happy Eyeballs nemůže pro zásadu odchozího provozu omezenou pouze na IPv6 zvolit IPv4.

Samotná podpora SOCKS5 je ve výchozím nastavení zapnutá (lze ji vypnout pomocí `ENABLE_SOCKS5_PROXY=false`); viz [PROXY_GUIDE.md → Proměnné prostředí](../ops/PROXY_GUIDE.md#environment-variables).

---

## Chování fail-closed

Hlavním účelem direktivy je **odmítnout** připojení namísto tichého použití nesprávné rodiny. Toto chování vynucují dvě kontroly:

1. **Rozpor IP literálu** — direktiva, která je v rozporu s hostitelem zadaným jako IP literál, vyvolá výjimku při sestavování dispatcheru (`resolveDispatcherFamily`, viz výše).

2. **Předběžná kontrola DNS názvu hostitele** — u proxy zadané názvem hostitele s pevně nastavenou rodinou soubor `proxyFetch.ts` **před** zahájením odchozího připojení prostřednictvím `assertHostnameSupportsFamily` ověří, zda má název hostitele skutečně záznam požadované rodiny:

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

   Při selhání označí `proxyFetch.ts` chybu pomocí `code = "PROXY_FAMILY_UNAVAILABLE"` a `statusCode = 503`. Selhání překladu DNS je rovněž zpracováno metodou fail-closed (odchozí připojení je odmítnuto).

U hostitelů zadaných jako IP literály předběžná kontrola DNS nic neprovádí — jejich rodina je přímo daná a nevyžaduje vyhledávání.

---

## Datový model

Sloupec `family` byl migrací `099_proxy_family.sql` přidán do **dvou** tabulek:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktiva pro jednotlivé proxy u záznamů v registru (`src/lib/db/proxies.ts`). Dotazy pro rozlišení vybírají `family` společně s ostatními sloupci proxy a chybějící hodnota nebo hodnota, která není řetězcem, je převedena na `"auto"`.
- `upstream_proxy_config.family` — direktiva pro záznamy upstream proxy (`src/lib/db/upstreamProxy.ts`) se stejnou výchozí hodnotou `"auto"`.

Pokud rozlišený objekt proxy obsahuje hodnotu `family`, která není `auto`, funkce `proxyConfigToUrl` připojí značku `?family=`, aby nastavení zůstalo zachováno až k dispečerovi.

---

## Související dokumentace

> 📖 **Související dokumentace:**
>
> - [Průvodce proxy](../ops/PROXY_GUIDE.md) — kompletní systém proxy: operace CRUD registru, čtyřúrovňové rozlišení, rotace, kontroly stavu a reference API
> - `docs/security/STEALTH_GUIDE.md` (git; není zkompilováno do `/docs`) — vrstvy otisku TLS a otisku CLI, které fungují nad proxy
> - [Úrovně ochrany tras](./ROUTE_GUARD_TIERS.md) — vynucení loopbacku pro trasy dostupné pouze lokálně
