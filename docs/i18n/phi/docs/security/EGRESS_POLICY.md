# Egress IP Family Policy (IPv4/IPv6) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **I-pin ang outbound traffic sa iisang IP family — `auto`, `ipv4`, o `ipv6` — para sa bawat proxy, upang ang IPv6-only egress ay hindi kailanman tahimik na bumalik sa IPv4.**

> **Pinagmumulan ng katotohanan:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

Hinahayaan ng OmniRoute na magkaroon ang bawat proxy ng **direktiba sa address-family egress**. Bilang default, ang OS ang pumipili ng IPv4 o IPv6 (dual-stack, "Happy Eyeballs"). Kapag itinakda mo ang direktiba sa `ipv4` o `ipv6`, ipi-pin ng OmniRoute ang bawat koneksyon sa pamamagitan ng proxy na iyon sa napiling family at **nabibigong sarado** sa halip na bumalik sa kabilang family.

Itinatala sa pahinang ito kung ano ang direktiba, bakit ito umiiral, saan ito kino-configure, at paano ito nire-resolve ng runtime.

---

## Talaan ng mga Nilalaman

- [Ano Ito](#what-it-is)
- [Bakit Ito Umiiral](#why-it-exists)
- [Ang Tatlong Value](#the-three-values)
- [Paano Ito I-configure](#how-to-configure-it)
- [Paano Nire-resolve ang `auto`](#how-auto-resolves)
- [Paano Ipinapatupad ang `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Compatibility sa SOCKS5](#socks5-compatibility)
- [Gawi na Fail-Closed](#fail-closed-behavior)
- [Modelo ng Data](#data-model)
- [Kaugnay na Dokumentasyon](#related-documentation)

---

## Ano Ito

Ang bawat proxy sa registry ay may `family` field na may tatlong posibleng value, na vina-validate ng isang Zod enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Ang default ng field ay `"auto"`, na nagpapanatili sa dating dual-stack na gawi. Ang pagtatakda nito sa `ipv4` o `ipv6` ay nagpi-pin sa connect family para sa proxy na iyon.

Sa lahat ng lugar, ginagawang normalized ang direktiba sa pamamagitan ng iisang helper upang ang anumang hindi kilalang value ay maging `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Bakit Ito Umiiral

Ipinakilala sa PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Ang mga problemang nag-udyok dito:

| Problema                                               | Ano ang inaayos ng direktiba                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pagtagas ng IPv6-only egress patungo sa IPv4**       | Kapag ang isang proxy host ay may parehong A at AAAA record (o mas pinipili ng OS ang IPv4), maaaring mag-dial out ang Happy Eyeballs sa pamamagitan ng IPv4 kahit nilalayon mo ang isang IPv6-only na path. Inaalis ng pag-pin sa `ipv6` ang pagtagas na iyon.                                                                                                                                 |
| **Pagbawi dahil sa anomalya ng shared egress**         | Binabawi ng mga rotating provider (codex/openai) ang mga token kapag maraming account ang lumalabas sa **parehong** IP nang maramihan. Bahagi ng pagpapanatili sa mga account sa magkakaiba at predictable na egress path ang pagkontrol sa egress family (tingnan ang [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) para sa mga diagnostic ng egress IP na ginagamit kasabay nito). |
| **Deterministic na egress para sa compliance/testing** | Kapag kailangan mong garantiyahin na lalabas ang traffic sa pamamagitan ng isang partikular na family, hindi sapat ang `auto`.                                                                                                                                                                                                                                                                  |

Sadyang **per-proxy** ang direktiba, hindi global — maaaring magkaroon ng magkakaibang policy ang iba't ibang proxy sa iyong pool.

---

## Ang Tatlong Value

| Value  | Label sa UI               | Gawi                                                                                                                                                               |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `Awtomatiko (dual-stack)` | Pinipili ng OS ang family. Para sa proxy host na IP literal, likas sa literal ang family; para sa hostname, maaaring gamitin ang parehong family. Ito ang default. |
| `ipv4` | `IPv4 lamang`             | Itinatakda ang koneksyon sa IPv4. Hindi nagpapatuloy ang koneksyon kung walang IPv4 (A) record ang proxy host.                                                     |
| `ipv6` | `IPv6 lamang`             | Itinatakda ang koneksyon sa IPv6. Hindi nagpapatuloy ang koneksyon kung walang IPv6 (AAAA) record ang proxy host.                                                  |

Makikita ang mga string ng UI sa `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Paano Ito I-configure

### Dashboard

Makikita ang selector sa proxy form ng tab na **Proxy Pool**:

1. Buksan ang **Dashboard → Settings → Proxy → Proxy Pool**
2. Magdagdag o mag-edit ng proxy
3. Itakda ang dropdown na **IP family** sa `Awtomatiko (dual-stack)`, `IPv4 lamang`, o `IPv6 lamang`
4. I-save

Nire-render ang control ng `ProxyRegistryManager.tsx` (naka-mount sa `proxy/ProxyPoolTab.tsx`).

### API

Ang field na `family` ay bahagi ng mga payload para sa paggawa/pag-update ng proxy registry, vina-validate ng `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) at pinoproseso ng `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Gumawa ng proxy na IPv6 lamang
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Baguhin ang isang kasalukuyang proxy upang maging IPv4 lamang
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Tinatanggap din ang parehong field ng inline proxy config object na ginagamit para sa mga upstream-proxy entry (`upstream_proxy_config.family`, tingnan ang [Modelo ng Data](#data-model)).

Para sa iba pang bahagi ng proxy CRUD/assignment API, tingnan ang [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Paano Nire-resolve ang `auto`

Kapag `auto` ang `family`, **hindi** nagdaragdag ang OmniRoute ng anumang directive — ginagamit ang proxy URL nang walang pagbabago at likas na tinutukoy ang connect family.

Sa oras ng pagbuo ng URL (`proxyConfigToUrl` / `normalizeProxyUrl` sa `open-sse/utils/proxyDispatcher.ts`), nagreresulta ang isang `auto` proxy sa plain URL na walang marker:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Sa oras ng dispatch (`resolveDispatcherFamily`), nire-resolve ang `auto` sa likas na family ng isang IP-literal host, o sa `null` (hayaan ang OS na magpasya) para sa isang hostname:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null para sa hostname → OS ang pipili
  // ...
}
```

Kaya:

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → family ng literal na iyon.
- `auto` + hostname → `null` → karaniwang dual-stack resolution ng OS.

---

## Paano Ipinapatupad ang `ipv4` / `ipv6`

Ang isang direktibang hindi `auto` ay ipinapasa bilang iisang sintetikong query marker — `?family=ipv4` o `?family=ipv6` — na minsang idinaragdag sa na-normalize na proxy URL. Maingat na inaalis at muling idinaragdag ng `normalizeProxyUrl` ang marker na ito nang eksaktong isang beses upang hindi nito masira ang pag-parse ng port.

Kapag binuo ang dispatcher, binabasa ang marker at kino-convert sa isang tiyak na connect family. Kung ang host ay isang IP literal ng **kabaligtarang** family, nagti-throw ang OmniRoute (fail-closed ang kontradiksyon):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Pagkatapos, ipinipin ang tiyak na family sa connector:

- **Mga HTTP/HTTPS proxy** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — hindi nito pinapagana ang Happy Eyeballs upang ang napiling family lamang ang tawagan.
- **Mga SOCKS5 proxy**: ipinapasa ng isang custom connector ang `socket_options: { family, autoSelectFamily: false }` sa SOCKS client (tingnan ang [Compatibility ng SOCKS5](#socks5-compatibility)).

---

## Compatibility ng SOCKS5

Gumagana ang pag-pin ng family sa mga SOCKS5 proxy, ngunit hindi inilalantad ng karaniwang `fetch-socks` ang mga socket option na kinakailangan upang i-pin ang family ng proxy hop. May sariling connector ang OmniRoute para rito:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Dumadaan ang lahat ng SOCKS5 dispatch sa `createSocksDispatcherWithFamily` anuman ang `family` (kabilang ang `null` / `auto` sa isang hostname): nagreresulta ang `buildSocksFamilySocketOptions(null)` sa `{}`, at ginagamit ang parehong landas na `SocksClient.createConnection` + TLS `buildConnector` na may pag-pin ng `socket_options` upang hindi makapili ang Happy Eyeballs ng IPv4 para sa isang IPv6-only na patakaran sa egress.

Naka-enable bilang default ang mismong suporta sa SOCKS5 (maaaring mag-opt out sa pamamagitan ng `ENABLE_SOCKS5_PROXY=false`); tingnan ang [PROXY_GUIDE.md → Mga Environment Variable](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-Closed na Pag-uugali

Ang pangunahing layunin ng direktiba ay **tumanggi** sa halip na tahimik na gumamit ng maling family bilang fallback. Dalawang guard ang nagpapatupad nito:

1. **Kontradiksyon ng literal** — ang isang direktibang sumasalungat sa isang IP-literal na host ay nagti-throw habang binubuo ang dispatcher (`resolveDispatcherFamily`, ipinakita sa itaas).

2. **Pre-flight na DNS check ng hostname** — para sa isang hostname proxy na may naka-pin na family, bine-verify ng `proxyFetch.ts` na talagang may record ang hostname sa kinakailangang family **bago** mag-egress, sa pamamagitan ng `assertHostnameSupportsFamily`:

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

   Kapag nabigo, nilalagyan ng `proxyFetch.ts` ang error ng `code = "PROXY_FAMILY_UNAVAILABLE"` at `statusCode = 503`. Ang pagkabigo sa DNS resolution ay itinuturing din na fail-closed (tumatangging mag-egress).

Walang ginagawa ang DNS pre-flight para sa mga IP-literal na host — likas ang kanilang family at hindi nangangailangan ng lookup.

---

## Modelo ng Data

Idinagdag ang column na `family` ng migration na `099_proxy_family.sql` sa **dalawang** table:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — ang direktiba kada proxy para sa mga entry ng registry (`src/lib/db/proxies.ts`). Pinipili ng mga query sa resolution ang `family` kasama ng iba pang mga column ng proxy, at ang nawawala o hindi string na value ay kino-convert sa `"auto"`.
- `upstream_proxy_config.family` — ang direktiba para sa mga entry ng upstream proxy (`src/lib/db/upstreamProxy.ts`), na may parehong default na `"auto"`.

Kapag ang isang na-resolve na proxy object ay may `family` na hindi `auto`, idinaragdag ng `proxyConfigToUrl` ang marker na `?family=` upang mapanatili ang pin hanggang sa dispatcher.

---

## Kaugnay na Dokumentasyon

> 📖 **Kaugnay na dokumentasyon:**
>
> - [Gabay sa Proxy](../ops/PROXY_GUIDE.md) — kumpletong sistema ng proxy: CRUD ng registry, 4-level na resolution, rotation, pagsusuri ng kalagayan, sanggunian ng API
> - `docs/security/STEALTH_GUIDE.md` (git; hindi kino-compile sa `/docs`) — mga layer ng TLS fingerprint at CLI fingerprint na nakapatong sa proxy
> - [Mga Tier ng Route Guard](./ROUTE_GUARD_TIERS.md) — pagpapatupad ng loopback para sa mga route na local-only
