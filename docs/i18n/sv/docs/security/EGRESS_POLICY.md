# Egress IP Family Policy (IPv4/IPv6) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Lås utgående trafik till en enda IP-familj — `auto`, `ipv4` eller `ipv6` — per proxy, så att utgående trafik som endast ska använda IPv6 aldrig obemärkt läcker tillbaka till IPv4.**

> **Sanningskälla:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute låter varje proxy ha ett **direktiv för adressfamilj för utgående trafik**. Som standard väljer operativsystemet IPv4 eller IPv6 (dual-stack, ”Happy Eyeballs”). När du ställer in direktivet på `ipv4` eller `ipv6` låser OmniRoute varje anslutning via den proxyn till den valda familjen och **stoppar anslutningen vid fel** i stället för att falla tillbaka till den andra familjen.

Den här sidan dokumenterar vad direktivet är, varför det finns, var du konfigurerar det och hur det hanteras vid körning.

---

## Innehållsförteckning

- [Vad det är](#what-it-is)
- [Varför det finns](#why-it-exists)
- [De tre värdena](#the-three-values)
- [Så konfigurerar du det](#how-to-configure-it)
- [Så matchas `auto`](#how-auto-resolves)
- [Så framtvingas `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-kompatibilitet](#socks5-compatibility)
- [Beteende med stängning vid fel](#fail-closed-behavior)
- [Datamodell](#data-model)
- [Relaterad dokumentation](#related-documentation)

---

## Vad det är

Varje proxy i registret har ett `family`-fält med tre möjliga värden, validerade av en Zod-enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Fältets standardvärde är `"auto"`, vilket bevarar det tidigare dual-stack-beteendet. Om det ställs in på `ipv4` eller `ipv6` låses anslutningsfamiljen för den proxyn.

Direktivet normaliseras överallt genom en enda hjälpfunktion, så att alla okända värden omvandlas till `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Varför det finns

Introducerades i PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemen som låg bakom:

| Problem                                                           | Vad direktivet åtgärdar                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utgående trafik som endast ska använda IPv6 läcker till IPv4**  | När en proxyvärd har både A- och AAAA-poster (eller operativsystemet föredrar IPv4) kan Happy Eyeballs upprätta den utgående anslutningen via IPv4 även när avsikten är att endast använda IPv6. Låsning till `ipv6` eliminerar det läckaget.                                                                                                                                                  |
| **Återkallning på grund av avvikelser vid delad utgående trafik** | Roterande leverantörer (codex/openai) återkallar tokens när många konton skickar stora trafikvolymer via **samma** IP-adress. Kontroll över adressfamiljen för utgående trafik bidrar till att hålla konton på separata, förutsägbara utgående vägar (se [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) för diagnostiken av utgående IP-adresser som används tillsammans med detta). |
| **Deterministisk utgående trafik för efterlevnad/testning**       | När du måste garantera att trafiken lämnar systemet via en viss familj räcker inte `auto`.                                                                                                                                                                                                                                                                                                     |

Direktivet är avsiktligt **per proxy**, inte globalt — olika proxyservrar i din pool kan ha olika policyer.

---

## De tre värdena

| Värde  | Etikett i gränssnittet | Beteende                                                                                                                                                                                 |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)`    | Operativsystemet väljer familj. För en proxyvärd angiven som en IP-litteral är familjen inneboende i litteralen; för ett värdnamn kan båda familjerna användas. Detta är standardvärdet. |
| `ipv4` | `IPv4 only`            | Låser anslutningen till IPv4. Anslutningen nekas om proxyvärden inte har någon IPv4-post (A).                                                                                            |
| `ipv6` | `IPv6 only`            | Låser anslutningen till IPv6. Anslutningen nekas om proxyvärden inte har någon IPv6-post (AAAA).                                                                                         |

Strängarna för användargränssnittet finns i `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Så konfigurerar du det

### Kontrollpanelen

Väljaren finns i proxyformuläret på fliken **Proxypool**:

1. Öppna **Kontrollpanel → Inställningar → Proxy → Proxypool**
2. Lägg till eller redigera en proxy
3. Ställ in listrutan **IP-familj** på `Auto (dual-stack)`, `IPv4 only` eller `IPv6 only`
4. Spara

Kontrollen renderas av `ProxyRegistryManager.tsx` (monterad i `proxy/ProxyPoolTab.tsx`).

### API

Fältet `family` ingår i nyttolasterna för att skapa/uppdatera proxyregistret, valideras av `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) och hanteras av `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Skapa en proxy som endast använder IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Ändra en befintlig proxy så att den endast använder IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Samma fält godtas även av det infogade proxykonfigurationsobjektet som används för uppströmsproxyposter (`upstream_proxy_config.family`, se [Datamodell](#data-model)).

För resten av API:et för CRUD-åtgärder och tilldelning av proxyservrar, se [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Så matchas `auto`

När `family` är `auto` lägger OmniRoute **inte** till något direktiv — proxy-URL:en används som den är och anslutningsfamiljen bestäms inneboende.

När URL:en skapas (`proxyConfigToUrl` / `normalizeProxyUrl` i `open-sse/utils/proxyDispatcher.ts`) ger en `auto`-proxy en vanlig URL utan markör:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Vid dirigering (`resolveDispatcherFamily`) matchas `auto` till den inneboende familjen för en IP-litteral värd, eller till `null` (låt operativsystemet avgöra) för ett värdnamn:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null för ett värdnamn → operativsystemet väljer
  // ...
}
```

Alltså:

- `auto` + IP-litteral värd (`192.0.2.1` / `[2001:db8::1]`) → samma familj som litteralen.
- `auto` + värdnamn → `null` → operativsystemets vanliga dual-stack-matchning.

---

## Så framtvingas `ipv4` / `ipv6`

Ett direktiv som inte är `auto` överförs som en enda syntetisk frågemarkör — `?family=ipv4` eller `?family=ipv6` — som läggs till en gång i den normaliserade proxy-URL:en. `normalizeProxyUrl` ser noggrant till att ta bort och lägga till markören exakt en gång, så att den aldrig stör porttolkningen.

När dispatchern skapas läses markören och konverteras till en konkret anslutningsfamilj. Om värden är en IP-literal av den **motsatta** familjen utlöser OmniRoute ett undantag (motsägelser hanteras genom att neka som standard):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxyns familjedirektiv ${directive} strider mot den literala ${literal === 6 ? "IPv6" : "IPv4"}-värden`
  );
}
```

Den konkreta familjen låses sedan på anslutningskomponenten:

- **HTTP/HTTPS-proxyservrar** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — inaktiverar Happy Eyeballs så att den valda familjen är den enda som anropas.
- **SOCKS5-proxyservrar**: en anpassad anslutningskomponent vidarebefordrar `socket_options: { family, autoSelectFamily: false }` till SOCKS-klienten (se [SOCKS5-kompatibilitet](#socks5-kompatibilitet)).

---

## SOCKS5-kompatibilitet

Familjelåsningen fungerar med SOCKS5-proxyservrar, men standardversionen av `fetch-socks` exponerar inte de socketalternativ som krävs för att låsa familjen för proxyhoppet. OmniRoute tillhandahåller därför en egen anslutningskomponent:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Alla SOCKS5-dispatchningar går via `createSocksDispatcherWithFamily` oavsett `family` (inklusive `null` / `auto` över ett värdnamn): `buildSocksFamilySocketOptions(null)` ger `{}`, och samma sökväg med `SocksClient.createConnection` + TLS `buildConnector` används med låsning via `socket_options`, så att Happy Eyeballs inte kan välja IPv4 för en utgående policy som endast tillåter IPv6.

Själva SOCKS5-stödet är aktiverat som standard (kan väljas bort via `ENABLE_SOCKS5_PROXY=false`); se [PROXY_GUIDE.md → Miljövariabler](../ops/PROXY_GUIDE.md#environment-variables).

---

## Beteende som nekar som standard

Hela poängen med direktivet är att **vägra** i stället för att tyst falla tillbaka på fel familj. Två skyddsmekanismer säkerställer detta:

1. **Literal motsägelse** — ett direktiv som strider mot en IP-literal värd utlöser ett undantag när dispatchern skapas (`resolveDispatcherFamily`, som visas ovan).

2. **Föregående DNS-kontroll av värdnamn** — för en värdnamnsproxy med en låst familj verifierar `proxyFetch.ts` att värdnamnet faktiskt har en post i den familj som krävs **innan** utgående trafik tillåts, via `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxyvärden ${host} har ingen ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"}-post; ` +
         `vägrar ${family === 6 ? "IPv6" : "IPv4"}-exklusiv utgående trafik (neka som standard)`
     );
   }
   ```

   Vid fel märker `proxyFetch.ts` felet med `code = "PROXY_FAMILY_UNAVAILABLE"` och `statusCode = 503`. Ett DNS-uppslagningsfel behandlas på samma sätt genom att neka som standard (utgående trafik vägras).

IP-literala värdar medför ingen åtgärd vid den föregående DNS-kontrollen — deras familj är inneboende och kräver ingen uppslagning.

---

## Datamodell

Kolumnen `family` lades till genom migreringen `099_proxy_family.sql` i **två** tabeller:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktivet per proxy för registerposter (`src/lib/db/proxies.ts`). Uppslagningsfrågor väljer `family` tillsammans med de övriga proxykolumnerna, och ett saknat värde eller ett värde som inte är en sträng omvandlas till `"auto"`.
- `upstream_proxy_config.family` — direktivet för uppströmsproxyposter (`src/lib/db/upstreamProxy.ts`), med samma standardvärde `"auto"`.

När ett uppslaget proxyobjekt har ett `family`-värde som inte är `auto`, lägger `proxyConfigToUrl` till markören `?family=` så att låsningen bevaras hela vägen till dispatchern.

---

## Relaterad dokumentation

> 📖 **Relaterad dokumentation:**
>
> - [Proxyguide](../ops/PROXY_GUIDE.md) — det fullständiga proxysystemet: CRUD för registret, uppslagning i fyra nivåer, rotation, hälsokontroller och API-referens
> - `docs/security/STEALTH_GUIDE.md` (git; kompileras inte till `/docs`) — lager för TLS-fingeravtryck och CLI-fingeravtryck som används ovanpå proxyn
> - [Nivåer för route guards](./ROUTE_GUARD_TIERS.md) — loopback-kontroll för routes som endast är lokala
