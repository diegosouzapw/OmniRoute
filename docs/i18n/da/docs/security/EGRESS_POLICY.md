# Egress IP Family Policy (IPv4/IPv6) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fastlås udgående trafik til en enkelt IP-familie — `auto`, `ipv4` eller `ipv6` — pr. proxy, så udgående trafik, der kun må bruge IPv6, aldrig ubemærket falder tilbage til IPv4.**

> **Autoritativ kilde:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute lader hver proxy have et **direktiv for adressefamilien for udgående trafik**. Som standard vælger operativsystemet IPv4 eller IPv6 (dual-stack, "Happy Eyeballs"). Når du indstiller direktivet til `ipv4` eller `ipv6`, fastlåser OmniRoute alle forbindelser gennem den pågældende proxy til den valgte familie og **lukker ved fejl** i stedet for at falde tilbage til den anden familie.

Denne side dokumenterer, hvad direktivet er, hvorfor det findes, hvor du konfigurerer det, og hvordan det fortolkes under kørsel.

---

## Indholdsfortegnelse

- [Hvad det er](#what-it-is)
- [Hvorfor det findes](#why-it-exists)
- [De tre værdier](#the-three-values)
- [Sådan konfigureres det](#how-to-configure-it)
- [Sådan fortolkes `auto`](#how-auto-resolves)
- [Sådan håndhæves `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-kompatibilitet](#socks5-compatibility)
- [Lukning ved fejl](#fail-closed-behavior)
- [Datamodel](#data-model)
- [Relateret dokumentation](#related-documentation)

---

## Hvad det er

Hver proxy i registret har et `family`-felt med tre mulige værdier, som valideres af en Zod-enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Feltets standardværdi er `"auto"`, hvilket bevarer den tidligere dual-stack-adfærd. Hvis det indstilles til `ipv4` eller `ipv6`, fastlåses forbindelsesfamilien for den pågældende proxy.

Direktivet normaliseres overalt gennem en enkelt hjælpefunktion, så enhver ukendt værdi reduceres til `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Hvorfor det findes

Introduceret i PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). De bagvedliggende problemer:

| Problem                                                     | Hvad direktivet løser                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Udgående trafik, der kun må bruge IPv6, lækker til IPv4** | Når en proxyvært både har A- og AAAA-poster (eller operativsystemet foretrækker IPv4), kan Happy Eyeballs oprette den udgående forbindelse via IPv4, selvom du ønsker en sti, der udelukkende bruger IPv6. Fastlåsning til `ipv6` forhindrer denne lækage.                                                                                                                                        |
| **Tilbagekaldelse ved anomalier i delt udgående trafik**    | Roterende udbydere (codex/openai) tilbagekalder tokens, når mange konti sender store trafikmængder gennem den **samme** IP. Styring af familien for udgående trafik bidrager til at holde konti på separate, forudsigelige udgående forbindelsesstier (se [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) for den diagnosticering af udgående IP-adresser, der bruges sammen med dette). |
| **Deterministisk udgående trafik til overholdelse/test**    | Når du skal garantere, at trafikken forlader systemet via en bestemt familie, er `auto` ikke tilstrækkeligt.                                                                                                                                                                                                                                                                                      |

Direktivet er med vilje **pr. proxy**, ikke globalt — forskellige proxyer i din pulje kan have forskellige politikker.

---

## De tre værdier

| Værdi  | UI-etiket           | Adfærd                                                                                                                                                                                    |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | Operativsystemet vælger familien. For en proxyvært angivet som en IP-literal er familien iboende i literalen; for et værtsnavn kan begge familier bruges. Dette er standardindstillingen. |
| `ipv4` | `Kun IPv4`          | Låser forbindelsen til IPv4. Afviser forbindelsen, hvis proxyværten ikke har en IPv4-post (A).                                                                                            |
| `ipv6` | `Kun IPv6`          | Låser forbindelsen til IPv6. Afviser forbindelsen, hvis proxyværten ikke har en IPv6-post (AAAA).                                                                                         |

UI-strengene findes i `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Sådan konfigureres det

### Dashboard

Vælgeren findes i proxyformularen på fanen **Proxy Pool**:

1. Åbn **Dashboard → Settings → Proxy → Proxy Pool**
2. Tilføj eller rediger en proxy
3. Indstil rullemenuen **IP-familie** til `Auto (dual-stack)`, `Kun IPv4` eller `Kun IPv6`
4. Gem

Kontrolelementet gengives af `ProxyRegistryManager.tsx` (monteret i `proxy/ProxyPoolTab.tsx`).

### API

Feltet `family` er en del af oprettelses-/opdateringspayloads for proxyregistret, valideres af `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) og håndteres af `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Opret en proxy, der kun bruger IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Skift en eksisterende proxy til kun at bruge IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Det samme felt accepteres også af det indlejrede proxykonfigurationsobjekt, der bruges til upstream-proxyposter (`upstream_proxy_config.family`, se [Datamodel](#data-model)).

Se [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) for resten af API'et til CRUD-handlinger og tildeling af proxyer.

---

## Sådan fortolkes `auto`

Når `family` er `auto`, tilføjer OmniRoute **ikke** noget direktiv — proxy-URL'en bruges, som den er, og forbindelsesfamilien bestemmes iboende.

Når URL'en bygges (`proxyConfigToUrl` / `normalizeProxyUrl` i `open-sse/utils/proxyDispatcher.ts`), resulterer en `auto`-proxy i en almindelig URL uden nogen markør:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Ved afsendelse (`resolveDispatcherFamily`) fortolkes `auto` som den iboende familie for en IP-literalvært eller som `null` (lad operativsystemet vælge) for et værtsnavn:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null for et værtsnavn → operativsystemet vælger
  // ...
}
```

Altså:

- `auto` + IP-literalvært (`192.0.2.1` / `[2001:db8::1]`) → samme familie som literalen.
- `auto` + værtsnavn → `null` → operativsystemets almindelige dual-stack-opslag.

---

## Sådan håndhæves `ipv4` / `ipv6`

Et direktiv, der ikke er `auto`, overføres som en enkelt syntetisk forespørgselsmarkør — `?family=ipv4` eller `?family=ipv6` — som tilføjes én gang til den normaliserede proxy-URL. `normalizeProxyUrl` sørger omhyggeligt for at fjerne og tilføje denne markør igen præcis én gang, så den aldrig ødelægger fortolkningen af porten.

Når dispatcheren oprettes, læses markøren og konverteres til en konkret forbindelsesfamilie. Hvis værten er en IP-literal fra den **modsatte** familie, kaster OmniRoute en fejl (modsigelser håndteres fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Den konkrete familie fastlåses derefter på connectoren:

- **HTTP/HTTPS-proxyer** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — deaktiverer Happy Eyeballs, så der kun oprettes forbindelse via den valgte familie.
- **SOCKS5-proxyer**: En brugerdefineret connector fører `socket_options: { family, autoSelectFamily: false }` videre til SOCKS-klienten (se [SOCKS5-kompatibilitet](#socks5-kompatibilitet)).

---

## SOCKS5-kompatibilitet

Fastlåsning af familien fungerer med SOCKS5-proxyer, men standardudgaven af `fetch-socks` eksponerer ikke de socketindstillinger, der er nødvendige for at fastlåse familien for proxyhoppet. OmniRoute leveres med sin egen connector til dette:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Alle SOCKS5-dispatches går gennem `createSocksDispatcherWithFamily` uanset `family` (herunder `null` / `auto` via et værtsnavn): `buildSocksFamilySocketOptions(null)` giver `{}`, og den samme sti med `SocksClient.createConnection` + TLS `buildConnector` bruges med fastlåsning via `socket_options`, så Happy Eyeballs ikke kan vælge IPv4 for en egress-politik, der kun tillader IPv6.

Selve SOCKS5-understøttelsen er som standard aktiveret (kan fravælges via `ENABLE_SOCKS5_PROXY=false`); se [PROXY_GUIDE.md → Miljøvariabler](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-closed-adfærd

Hele formålet med direktivet er at **afvise** forbindelsen frem for lydløst at falde tilbage til den forkerte familie. To sikkerhedskontroller håndhæver dette:

1. **Modsigelse i en IP-literal** — et direktiv, der er i modstrid med en IP-literal som vært, kaster en fejl, når dispatcheren oprettes (`resolveDispatcherFamily`, vist ovenfor).

2. **DNS-forhåndskontrol af værtsnavn** — for en proxy med et værtsnavn og en fastlåst familie kontrollerer `proxyFetch.ts`, at værtsnavnet faktisk har en post i den påkrævede familie, **før** egress finder sted, via `assertHostnameSupportsFamily`:

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

   Ved fejl mærker `proxyFetch.ts` fejlen med `code = "PROXY_FAMILY_UNAVAILABLE"` og `statusCode = 503`. En DNS-opslagsfejl behandles ligeledes som fail-closed (egress afvises).

IP-literal-værter er en no-op for DNS-forhåndskontrollen — deres familie er iboende og kræver intet opslag.

---

## Datamodel

Kolonnen `family` blev tilføjet af migreringen `099_proxy_family.sql` til **to** tabeller:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — direktivet pr. proxy for poster i registreringsdatabasen (`src/lib/db/proxies.ts`). Forespørgsler til opløsning vælger `family` sammen med de øvrige proxykolonner, og en manglende værdi eller en værdi, der ikke er en streng, konverteres til `"auto"`.
- `upstream_proxy_config.family` — direktivet for upstream-proxyposter (`src/lib/db/upstreamProxy.ts`) med samme standardværdi `"auto"`.

Når et opløst proxyobjekt indeholder en `family`, der ikke er `auto`, tilføjer `proxyConfigToUrl` markøren `?family=`, så fastlåsningen bevares hele vejen til dispatcheren.

---

## Relateret dokumentation

> 📖 **Relateret dokumentation:**
>
> - [Proxyvejledning](../ops/PROXY_GUIDE.md) — komplet proxysystem: CRUD for registreringsdatabasen, opløsning på fire niveauer, rotation, sundhedskontrol og API-reference
> - `docs/security/STEALTH_GUIDE.md` (git; ikke kompileret i `/docs`) — TLS-fingeraftryks- og CLI-fingeraftrykslag, der kører oven på proxyen
> - [Niveauer for rutebeskyttelse](./ROUTE_GUARD_TIERS.md) — håndhævelse af loopback for ruter, der kun er lokale
