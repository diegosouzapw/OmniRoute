# Egress IP Family Policy (IPv4/IPv6) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Pripnite odchádzajúcu komunikáciu k jednej rodine IP adries — `auto`, `ipv4` alebo `ipv6` — pre každý proxy server, aby odchádzajúca komunikácia iba cez IPv6 nikdy nepozorovane neunikla späť na IPv4.**

> **Zdroj pravdy:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute umožňuje každému proxy serveru niesť **direktívu rodiny adries pre odchádzajúcu komunikáciu**. V predvolenom nastavení vyberá IPv4 alebo IPv6 operačný systém (dual-stack, „Happy Eyeballs“). Keď direktívu nastavíte na `ipv4` alebo `ipv6`, OmniRoute pripne každé pripojenie cez daný proxy server k zvolenej rodine a **bezpečne zlyhá** namiesto návratu k druhej rodine.

Táto stránka dokumentuje, čo táto direktíva znamená, prečo existuje, kde ju môžete nakonfigurovať a ako ju prostredie za behu vyhodnocuje.

---

## Obsah

- [Čo to je](#what-it-is)
- [Prečo to existuje](#why-it-exists)
- [Tri hodnoty](#the-three-values)
- [Ako to nakonfigurovať](#how-to-configure-it)
- [Ako sa vyhodnocuje `auto`](#how-auto-resolves)
- [Ako sa vynucujú `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Kompatibilita so SOCKS5](#socks5-compatibility)
- [Správanie bezpečného zlyhania](#fail-closed-behavior)
- [Dátový model](#data-model)
- [Súvisiaca dokumentácia](#related-documentation)

---

## Čo to je

Každý proxy server v registri má pole `family` s tromi možnými hodnotami, ktoré overuje enum Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Predvolená hodnota poľa je `"auto"`, čím sa zachováva predchádzajúce dual-stack správanie. Nastavenie na `ipv4` alebo `ipv6` pripne rodinu pripojenia pre daný proxy server.

Direktíva sa všade normalizuje prostredníctvom jednej pomocnej funkcie, takže každá neznáma hodnota sa zmení na `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Prečo to existuje

Zavedené v PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Dôvody zavedenia:

| Problém                                                         | Čo direktíva rieši                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Únik odchádzajúcej komunikácie určenej iba pre IPv6 na IPv4** | Keď má hostiteľ proxy servera záznamy A aj AAAA (alebo operačný systém uprednostňuje IPv4), mechanizmus Happy Eyeballs môže vytvoriť odchádzajúce pripojenie cez IPv4 aj vtedy, keď zamýšľate cestu iba cez IPv6. Pripnutie `ipv6` tento únik odstráni.                                                                                                                                                |
| **Zrušenie prístupu v dôsledku anomálie zdieľaného výstupu**    | Poskytovatelia s rotáciou (codex/openai) rušia tokeny, keď mnoho účtov odosiela veľký objem komunikácie cez **rovnakú** IP adresu. Riadenie rodiny výstupných adries pomáha udržať účty na odlišných, predvídateľných výstupných trasách (pozrite si [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts), kde nájdete diagnostiku výstupných IP adries, ktorá sa používa spolu s touto funkciou). |
| **Deterministický výstup na účely súladu/testovania**           | Keď musíte zaručiť, že komunikácia odchádza cez konkrétnu rodinu, `auto` nestačí.                                                                                                                                                                                                                                                                                                                      |

Direktíva je zámerne definovaná **pre každý proxy server**, nie globálne — rôzne proxy servery vo vašej skupine môžu mať odlišné pravidlá.

---

## Tri hodnoty

| Hodnota | Označenie v používateľskom rozhraní | Správanie                                                                                                                                                                                   |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`  | `Automaticky (dual-stack)`          | Rodinu vyberie operačný systém. Pri hostiteľovi proxy zadanom ako IP literál je rodina daná samotným literálom; pri názve hostiteľa možno použiť obe rodiny. Toto je predvolené nastavenie. |
| `ipv4`  | `Iba IPv4`                          | Obmedzí pripojenie na IPv4. Ak hostiteľ proxy nemá záznam IPv4 (A), pripojenie sa bezpečne odmietne.                                                                                        |
| `ipv6`  | `Iba IPv6`                          | Obmedzí pripojenie na IPv6. Ak hostiteľ proxy nemá záznam IPv6 (AAAA), pripojenie sa bezpečne odmietne.                                                                                     |

Reťazce používateľského rozhrania sa nachádzajú v `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Ako to nakonfigurovať

### Ovládací panel

Selektor sa nachádza vo formulári proxy na karte **Fond proxy**:

1. Otvorte **Ovládací panel → Nastavenia → Proxy → Fond proxy**
2. Pridajte alebo upravte proxy
3. Nastavte rozbaľovaciu ponuku **Rodina IP** na `Automaticky (dual-stack)`, `Iba IPv4` alebo `Iba IPv6`
4. Uložte zmeny

Ovládací prvok vykresľuje `ProxyRegistryManager.tsx` (pripojený v `proxy/ProxyPoolTab.tsx`).

### API

Pole `family` je súčasťou dátových častí požiadaviek na vytvorenie a aktualizáciu registra proxy, overuje sa pomocou `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) a spracúva sa pomocou `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Vytvorenie proxy iba s protokolom IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Zmena existujúcej proxy na proxy iba s protokolom IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Rovnaké pole prijíma aj vnorený objekt konfigurácie proxy používaný pre položky upstream proxy (`upstream_proxy_config.family`, pozrite si [Dátový model](#data-model)).

Informácie o zvyšnej časti rozhrania API na vytváranie, čítanie, aktualizáciu, odstraňovanie a priraďovanie proxy nájdete v dokumente [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Ako sa vyhodnocuje `auto`

Keď má `family` hodnotu `auto`, OmniRoute **nepridáva** žiadnu direktívu — URL adresa proxy sa použije bez zmeny a rodina pripojenia sa určí na základe jej vlastností.

Pri zostavovaní URL adresy (`proxyConfigToUrl` / `normalizeProxyUrl` v `open-sse/utils/proxyDispatcher.ts`) proxy s hodnotou `auto` vytvorí obyčajnú URL adresu bez značky:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Pri odosielaní (`resolveDispatcherFamily`) sa hodnota `auto` vyhodnotí ako vnútorná rodina hostiteľa zadaného ako IP literál alebo ako `null` (rozhodnutie sa ponechá na operačný systém) pri názve hostiteľa:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null pre názov hostiteľa → vyberie operačný systém
  // ...
}
```

Teda:

- `auto` + hostiteľ zadaný ako IP literál (`192.0.2.1` / `[2001:db8::1]`) → rodina daného literálu.
- `auto` + názov hostiteľa → `null` → štandardné dual-stack rozlíšenie operačným systémom.

---

## Ako sa vynucujú `ipv4` / `ipv6`

Direktíva iná než `auto` sa prenáša ako jediný syntetický značkovač dopytu — `?family=ipv4` alebo `?family=ipv6` — ktorý sa raz pridá k normalizovanej adrese URL proxy servera. Funkcia `normalizeProxyUrl` tento značkovač opatrne odstráni a presne raz ho znova pridá, aby nikdy nenarušil spracovanie portu.

Pri vytváraní dispečera sa značkovač načíta a skonvertuje na konkrétnu rodinu pripojenia. Ak je hostiteľ IP literálom **opačnej** rodiny, OmniRoute vyvolá výnimku (pri rozpore sa uplatní bezpečné odmietnutie):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Direktíva rodiny proxy servera ${directive} je v rozpore s hostiteľom zadaným ako literál ${literal === 6 ? "IPv6" : "IPv4"}`
  );
}
```

Konkrétna rodina sa potom pevne nastaví v konektore:

- **Proxy servery HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — vypne Happy Eyeballs, takže sa pripojenie nadviaže výhradne cez zvolenú rodinu.
- **Proxy servery SOCKS5**: vlastný konektor odovzdá `socket_options: { family, autoSelectFamily: false }` klientovi SOCKS (pozrite si časť [Kompatibilita so SOCKS5](#kompatibilita-so-socks5)).

---

## Kompatibilita so SOCKS5

Pevné nastavenie rodiny funguje s proxy servermi SOCKS5, ale štandardný balík `fetch-socks` nesprístupňuje možnosti socketu potrebné na pevné nastavenie rodiny proxy spojenia. OmniRoute preto poskytuje vlastný konektor:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Všetky požiadavky SOCKS5 prechádzajú cez `createSocksDispatcherWithFamily` bez ohľadu na hodnotu `family` (vrátane `null` / `auto` pri názve hostiteľa): `buildSocksFamilySocketOptions(null)` vráti `{}` a použije sa rovnaká cesta `SocksClient.createConnection` + TLS `buildConnector` s pevným nastavením cez `socket_options`, aby Happy Eyeballs nemohol pri politike odchádzajúcej komunikácie výhradne cez IPv6 zvoliť IPv4.

Samotná podpora SOCKS5 je predvolene zapnutá (možno ju vypnúť pomocou `ENABLE_SOCKS5_PROXY=false`); pozrite si [PROXY_GUIDE.md → Premenné prostredia](../ops/PROXY_GUIDE.md#environment-variables).

---

## Správanie s bezpečným odmietnutím

Zmyslom direktívy je **odmietnuť** spojenie namiesto tichého prechodu na nesprávnu rodinu. Toto správanie vynucujú dve kontroly:

1. **Rozpor s literálom** — direktíva, ktorá je v rozpore s hostiteľom zadaným ako IP literál, vyvolá výnimku pri vytváraní dispečera (`resolveDispatcherFamily`, uvedené vyššie).

2. **Predbežná kontrola DNS názvu hostiteľa** — pri hostiteľovi proxy servera zadanom názvom a s pevne nastavenou rodinou súbor `proxyFetch.ts` **pred** odoslaním komunikácie pomocou `assertHostnameSupportsFamily` overí, či má názov hostiteľa záznam v požadovanej rodine:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Hostiteľ proxy servera ${host} nemá záznam ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"}; ` +
         `odmieta sa odchádzajúca komunikácia výhradne cez ${family === 6 ? "IPv6" : "IPv4"} (bezpečné odmietnutie)`
     );
   }
   ```

   Pri zlyhaní súbor `proxyFetch.ts` označí chybu hodnotami `code = "PROXY_FAMILY_UNAVAILABLE"` a `statusCode = 503`. Zlyhanie rozlíšenia DNS sa takisto spracuje ako bezpečné odmietnutie (odchádzajúca komunikácia sa odmietne).

Pri hostiteľoch zadaných ako IP literály sa predbežná kontrola DNS nevykonáva — ich rodina je daná priamo a nevyžaduje vyhľadávanie.

---

## Dátový model

Stĺpec `family` bol pridaný migráciou `099_proxy_family.sql` do **dvoch** tabuliek:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktíva pre každý proxy server v záznamoch registra (`src/lib/db/proxies.ts`). Dopyty na rozlíšenie vyberajú `family` spolu s ostatnými stĺpcami proxy servera a chýbajúca hodnota alebo hodnota, ktorá nie je reťazcom, sa skonvertuje na `"auto"`.
- `upstream_proxy_config.family` — direktíva pre záznamy upstream proxy serverov (`src/lib/db/upstreamProxy.ts`) s rovnakou predvolenou hodnotou `"auto"`.

Keď rozlíšený objekt proxy servera obsahuje inú hodnotu `family` než `auto`, funkcia `proxyConfigToUrl` pridá značku `?family=`, aby sa explicitné nastavenie zachovalo až po dispečer.

---

## Súvisiaca dokumentácia

> 📖 **Súvisiaca dokumentácia:**
>
> - [Príručka k proxy serverom](../ops/PROXY_GUIDE.md) — kompletný systém proxy serverov: operácie CRUD registra, 4-úrovňové rozlíšenie, rotácia, kontrola stavu, referencia API
> - `docs/security/STEALTH_GUIDE.md` (git; nie je skompilovaný do `/docs`) — vrstvy odtlačku TLS a odtlačku CLI, ktoré fungujú nad proxy serverom
> - [Úrovne ochrany trás](./ROUTE_GUARD_TIERS.md) — vynútenie loopbacku pre trasy dostupné iba lokálne
