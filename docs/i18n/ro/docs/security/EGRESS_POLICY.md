# Egress IP Family Policy (IPv4/IPv6) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fixați traficul de ieșire la o singură familie IP — `auto`, `ipv4` sau `ipv6` — pentru fiecare proxy, astfel încât o ieșire exclusiv IPv6 să nu revină niciodată în mod neobservat la IPv4.**

> **Sursa de referință:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute permite fiecărui proxy să aibă o **directivă privind familia de adrese pentru traficul de ieșire**. În mod implicit, sistemul de operare alege IPv4 sau IPv6 (dual-stack, „Happy Eyeballs”). Când setați directiva la `ipv4` sau `ipv6`, OmniRoute fixează fiecare conexiune prin acel proxy la familia aleasă și **eșuează în mod închis**, în loc să revină la cealaltă familie.

Această pagină documentează ce este directiva, de ce există, unde o configurați și cum o rezolvă componenta de execuție.

---

## Cuprins

- [Ce este](#what-it-is)
- [De ce există](#why-it-exists)
- [Cele trei valori](#the-three-values)
- [Cum se configurează](#how-to-configure-it)
- [Cum este rezolvată valoarea `auto`](#how-auto-resolves)
- [Cum sunt impuse valorile `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Compatibilitate SOCKS5](#socks5-compatibility)
- [Comportamentul de eșec închis](#fail-closed-behavior)
- [Modelul de date](#data-model)
- [Documentație asociată](#related-documentation)

---

## Ce este

Fiecare proxy din registru are un câmp `family` cu trei valori posibile, validate printr-un enum Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Valoarea implicită a câmpului este `"auto"`, ceea ce păstrează comportamentul dual-stack anterior. Setarea acestuia la `ipv4` sau `ipv6` fixează familia de conectare pentru proxy-ul respectiv.

Directiva este normalizată pretutindeni printr-o singură funcție ajutătoare, astfel încât orice valoare necunoscută este redusă la `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## De ce există

Introdusă în PR-ul [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problemele care au motivat introducerea sa:

| Problemă                                                    | Ce rezolvă directiva                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Scurgerea traficului de ieșire exclusiv IPv6 către IPv4** | Atunci când o gazdă proxy are atât înregistrări A, cât și AAAA (sau sistemul de operare preferă IPv4), Happy Eyeballs poate stabili conexiunea de ieșire prin IPv4 chiar dacă intenționați să utilizați o rută exclusiv IPv6. Fixarea la `ipv6` elimină această scurgere.                                                                                                                                                            |
| **Revocarea cauzată de anomalii ale ieșirii partajate**     | Furnizorii cu rotație (codex/openai) revocă tokenurile atunci când multe conturi generează un volum ridicat de trafic prin **aceeași** adresă IP. Controlarea familiei pentru traficul de ieșire contribuie la menținerea conturilor pe rute de ieșire distincte și previzibile (consultați [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) pentru diagnosticarea adreselor IP de ieșire asociată acestei funcționalități). |
| **Ieșire deterministă pentru conformitate/testare**         | Atunci când trebuie să garantați că traficul iese printr-o anumită familie, `auto` nu este suficient.                                                                                                                                                                                                                                                                                                                                |

Directiva este în mod intenționat **per proxy**, nu globală — diferitele proxy-uri din grupul dumneavoastră pot avea politici diferite.

---

## Cele trei valori

| Valoare | Etichetă UI             | Comportament                                                                                                                                                                                                            |
| ------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`  | `Automat (stivă duală)` | Sistemul de operare alege familia. Pentru o gazdă proxy specificată printr-un literal IP, familia este intrinsecă literalului; pentru un nume de gazdă, ambele familii sunt eligibile. Aceasta este valoarea implicită. |
| `ipv4`  | `Doar IPv4`             | Fixează conexiunea la IPv4. Conexiunea este refuzată dacă gazda proxy nu are nicio înregistrare IPv4 (A).                                                                                                               |
| `ipv6`  | `Doar IPv6`             | Fixează conexiunea la IPv6. Conexiunea este refuzată dacă gazda proxy nu are nicio înregistrare IPv6 (AAAA).                                                                                                            |

Șirurile UI se află în `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Cum se configurează

### Panoul de control

Selectorul se află în formularul proxy din fila **Proxy Pool**:

1. Deschideți **Dashboard → Settings → Proxy → Proxy Pool**
2. Adăugați sau editați un proxy
3. Setați lista derulantă **Familie IP** la `Automat (stivă duală)`, `Doar IPv4` sau `Doar IPv6`
4. Salvați

Controlul este redat de `ProxyRegistryManager.tsx` (montat în `proxy/ProxyPoolTab.tsx`).

### API

Câmpul `family` face parte din sarcinile utile pentru crearea/actualizarea registrului proxy, este validat de `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) și este gestionat de `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Creează un proxy exclusiv IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Schimbă un proxy existent pentru a utiliza exclusiv IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Același câmp este acceptat și de obiectul de configurare proxy inline utilizat pentru intrările de proxy din amonte (`upstream_proxy_config.family`, consultați [Modelul de date](#data-model)).

Pentru restul API-ului CRUD/de atribuire pentru proxy, consultați [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Cum se rezolvă `auto`

Când `family` este `auto`, OmniRoute **nu** adaugă nicio directivă — URL-ul proxy este utilizat ca atare, iar familia conexiunii este determinată intrinsec.

În momentul construirii URL-ului (`proxyConfigToUrl` / `normalizeProxyUrl` în `open-sse/utils/proxyDispatcher.ts`), un proxy `auto` generează un URL simplu, fără marcaj:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

În momentul expedierii (`resolveDispatcherFamily`), `auto` se rezolvă la familia intrinsecă a unei gazde specificate printr-un literal IP sau la `null` (sistemul de operare decide) pentru un nume de gazdă:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null pentru un nume de gazdă → sistemul de operare alege
  // ...
}
```

Așadar:

- `auto` + gazdă specificată printr-un literal IP (`192.0.2.1` / `[2001:db8::1]`) → familia literalului respectiv.
- `auto` + nume de gazdă → `null` → rezoluție standard cu stivă duală a sistemului de operare.

---

## Cum sunt impuse `ipv4` / `ipv6`

O directivă diferită de `auto` este transmisă ca un singur marcator sintetic de interogare — `?family=ipv4` sau `?family=ipv6` — adăugat o singură dată la URL-ul normalizat al proxy-ului. `normalizeProxyUrl` elimină și readaugă cu atenție acest marcator exact o singură dată, astfel încât să nu afecteze niciodată analizarea portului.

Când este construit dispecerul, marcatorul este citit și convertit într-o familie concretă de conexiune. Dacă gazda este un literal IP din familia **opusă**, OmniRoute generează o eroare (în caz de contradicție, conexiunea este refuzată implicit):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Familia concretă este apoi fixată în conector:

- **Proxy-uri HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — dezactivează Happy Eyeballs, astfel încât să fie apelată numai familia aleasă.
- **Proxy-uri SOCKS5**: un conector personalizat transmite `socket_options: { family, autoSelectFamily: false }` către clientul SOCKS (consultați [Compatibilitatea SOCKS5](#socks5-compatibility)).

---

## Compatibilitatea SOCKS5

Fixarea familiei funcționează cu proxy-uri SOCKS5, însă versiunea standard a `fetch-socks` nu expune opțiunile de socket necesare pentru fixarea familiei conexiunii către proxy. OmniRoute include propriul conector în acest scop:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Toate transmisiile SOCKS5 trec prin `createSocksDispatcherWithFamily`, indiferent de valoarea `family` (inclusiv `null` / `auto` pentru un nume de gazdă): `buildSocksFamilySocketOptions(null)` produce `{}`, iar aceeași cale `SocksClient.createConnection` + TLS `buildConnector` este utilizată cu fixarea prin `socket_options`, astfel încât Happy Eyeballs să nu poată alege IPv4 pentru o politică de trafic de ieșire exclusiv IPv6.

Suportul SOCKS5 este activat implicit (poate fi dezactivat prin `ENABLE_SOCKS5_PROXY=false`); consultați [PROXY_GUIDE.md → Variabile de mediu](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportament de refuz implicit

Scopul directivei este de a **refuza** conexiunea, în loc să recurgă în mod silențios la familia greșită. Două mecanisme de protecție impun acest comportament:

1. **Contradicție cu un literal** — o directivă care contrazice o gazdă specificată printr-un literal IP generează o eroare la construirea dispecerului (`resolveDispatcherFamily`, prezentat mai sus).

2. **Verificare DNS preliminară a numelui de gazdă** — pentru un proxy specificat printr-un nume de gazdă și cu o familie fixată, `proxyFetch.ts` verifică dacă numele de gazdă are efectiv o înregistrare în familia necesară **înainte** de a iniția traficul de ieșire, prin `assertHostnameSupportsFamily`:

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

   În caz de eșec, `proxyFetch.ts` etichetează eroarea cu `code = "PROXY_FAMILY_UNAVAILABLE"` și `statusCode = 503`. În mod similar, un eșec de rezoluție DNS este tratat prin refuz implicit (traficul de ieșire este refuzat).

Gazdele specificate prin literali IP nu necesită verificarea DNS preliminară — familia lor este intrinsecă și nu necesită nicio interogare.

---

## Model de date

Coloana `family` a fost adăugată prin migrarea `099_proxy_family.sql` în **două** tabele:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — directiva specifică fiecărui proxy pentru intrările din registru (`src/lib/db/proxies.ts`). Interogările de rezoluție selectează `family` împreună cu celelalte coloane ale proxy-ului, iar o valoare lipsă sau care nu este de tip șir este convertită la `"auto"`.
- `upstream_proxy_config.family` — directiva pentru intrările proxy-ului din amonte (`src/lib/db/upstreamProxy.ts`), cu aceeași valoare implicită `"auto"`.

Atunci când un obiect proxy rezolvat conține o valoare `family` diferită de `auto`, `proxyConfigToUrl` adaugă marcajul `?family=`, astfel încât fixarea să fie păstrată până la dispecer.

---

## Documentație asociată

> 📖 **Documentație asociată:**
>
> - [Ghidul proxy-urilor](../ops/PROXY_GUIDE.md) — sistemul proxy complet: operații CRUD pentru registru, rezoluție pe 4 niveluri, rotație, verificarea stării și referință API
> - `docs/security/STEALTH_GUIDE.md` (git; nu este compilat în `/docs`) — nivelurile pentru amprenta TLS și amprenta CLI care funcționează peste proxy
> - [Nivelurile de protecție a rutelor](./ROUTE_GUARD_TIERS.md) — impunerea utilizării interfeței loopback pentru rutele exclusiv locale
