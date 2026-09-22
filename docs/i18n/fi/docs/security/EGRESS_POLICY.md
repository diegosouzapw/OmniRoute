# Egress IP Family Policy (IPv4/IPv6) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Kiinnitä lähtevä liikenne välityspalvelinkohtaisesti yhteen IP-perheeseen — `auto`, `ipv4` tai `ipv6` — jotta vain IPv6:ta käyttävä lähtevä yhteys ei koskaan huomaamatta vuoda takaisin IPv4:ään.**

> **Totuuden lähde:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute sallii jokaiselle välityspalvelimelle oman **osoiteperheen lähtevän liikenteen direktiivin**. Oletusarvoisesti käyttöjärjestelmä valitsee IPv4:n tai IPv6:n (kaksipinoinen, "Happy Eyeballs"). Kun asetat direktiiviksi `ipv4` tai `ipv6`, OmniRoute kiinnittää kaikki kyseisen välityspalvelimen kautta kulkevat yhteydet valittuun perheeseen ja **estää yhteyden turvallisesti** sen sijaan, että palaisi käyttämään toista perhettä.

Tällä sivulla kerrotaan, mikä direktiivi on, miksi se on olemassa, missä se määritetään ja miten suoritusympäristö ratkaisee sen.

---

## Sisällysluettelo

- [Mikä se on](#what-it-is)
- [Miksi se on olemassa](#why-it-exists)
- [Kolme arvoa](#the-three-values)
- [Miten se määritetään](#how-to-configure-it)
- [Miten `auto` ratkaistaan](#how-auto-resolves)
- [Miten `ipv4` / `ipv6` pakotetaan](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-yhteensopivuus](#socks5-compatibility)
- [Turvallisesti estävä toiminta](#fail-closed-behavior)
- [Tietomalli](#data-model)
- [Aiheeseen liittyvä dokumentaatio](#related-documentation)

---

## Mikä se on

Jokaisella rekisterin välityspalvelimella on `family`-kenttä, jolla on kolme mahdollista Zod-enumeraation validoimaa arvoa:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Kentän oletusarvo on `"auto"`, mikä säilyttää aiemman kaksipinoisen toiminnan. Sen asettaminen arvoon `ipv4` tai `ipv6` kiinnittää kyseisen välityspalvelimen yhteysperheen.

Direktiivi normalisoidaan kaikkialla yhden apufunktion kautta, joten kaikki tuntemattomat arvot muunnetaan arvoksi `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Miksi se on olemassa

Ominaisuus lisättiin PR:ssä [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Sen taustalla olevat ongelmat:

| Ongelma                                                                      | Mitä direktiivi korjaa                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vain IPv6:ta käyttävän lähtevän liikenteen vuotaminen IPv4:ään**           | Kun välityspalvelimen isännällä on sekä A- että AAAA-tietueita (tai käyttöjärjestelmä suosii IPv4:ää), Happy Eyeballs voi muodostaa lähtevän yhteyden IPv4:n kautta, vaikka tarkoituksena olisi käyttää vain IPv6-polkuja. Kiinnitys arvoon `ipv6` poistaa tämän vuodon.                                                                                                                                                      |
| **Jaetun lähtevän liikenteen poikkeamien aiheuttama mitätöinti**             | Vaihtuvat palveluntarjoajat (codex/openai) mitätöivät tunnuksia, kun useat tilit käyttävät lähtevään liikenteeseen **samaa** IP-osoitetta suurilla liikennemäärillä. Lähtevän liikenteen perheen hallinta auttaa pitämään tilit erillisillä ja ennakoitavilla lähtevän liikenteen poluilla (katso tähän liittyvät lähtevän liikenteen IP-diagnostiikat tiedostosta [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)). |
| **Deterministinen lähtevä liikenne vaatimustenmukaisuutta/testausta varten** | Kun on taattava liikenteen lähteminen tietyn perheen kautta, `auto` ei riitä.                                                                                                                                                                                                                                                                                                                                                 |

Direktiivi on tarkoituksella **välityspalvelinkohtainen**, ei globaali — ryhmäsi eri välityspalvelimilla voi olla erilaiset käytännöt.

---

## Kolme arvoa

| Arvo   | Käyttöliittymän tunniste | Toiminta                                                                                                                                                                                                  |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)`      | Käyttöjärjestelmä valitsee osoiteperheen. IP-literaalina annetun välityspalvelimen osoiteperhe määräytyy literaalin perusteella; isäntänimellä molemmat osoiteperheet ovat käytettävissä. Tämä on oletus. |
| `ipv4` | `IPv4 only`              | Pakottaa yhteyden käyttämään IPv4:ää. Yhteyttä ei muodosteta, jos välityspalvelimen isäntänimellä ei ole IPv4 (A) -tietuetta.                                                                             |
| `ipv6` | `IPv6 only`              | Pakottaa yhteyden käyttämään IPv6:ta. Yhteyttä ei muodosteta, jos välityspalvelimen isäntänimellä ei ole IPv6 (AAAA) -tietuetta.                                                                          |

Käyttöliittymän merkkijonot sijaitsevat tiedostossa `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Määrittäminen

### Hallintapaneeli

Valitsin sijaitsee **Proxy Pool** -välilehden välityspalvelinlomakkeessa:

1. Avaa **Dashboard → Settings → Proxy → Proxy Pool**
2. Lisää välityspalvelin tai muokkaa olemassa olevaa
3. Aseta **IP family** -pudotusvalikon arvoksi `Auto (dual-stack)`, `IPv4 only` tai `IPv6 only`
4. Tallenna

Ohjausobjektin renderöi `ProxyRegistryManager.tsx` (liitetty tiedostossa `proxy/ProxyPoolTab.tsx`).

### API

`family`-kenttä kuuluu välityspalvelinrekisterin luonti- ja päivityshyötykuormiin. Sen validoivat `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`), ja sitä käsittelevät `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Luo vain IPv6:ta käyttävä välityspalvelin
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Muuta olemassa oleva välityspalvelin käyttämään vain IPv4:ää
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Sama kenttä hyväksytään myös ylävirran välityspalvelinmerkintöjen käyttämässä upotetussa välityspalvelimen määritysobjektissa (`upstream_proxy_config.family`, katso [Tietomalli](#data-model)).

Lisätietoja muusta välityspalvelinten CRUD- ja kohdistus-API:sta on tiedostossa [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Miten `auto` ratkaistaan

Kun `family` on `auto`, OmniRoute **ei** lisää mitään direktiiviä — välityspalvelimen URL-osoitetta käytetään sellaisenaan, ja yhteyden osoiteperhe määräytyy luontaisesti.

URL-osoitetta muodostettaessa (`proxyConfigToUrl` / `normalizeProxyUrl` tiedostossa `open-sse/utils/proxyDispatcher.ts`) `auto`-välityspalvelin tuottaa tavallisen URL-osoitteen ilman merkintää:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Välityksen aikana (`resolveDispatcherFamily`) `auto` ratkaistaan IP-literaalina annetun isännän luontaiseksi osoiteperheeksi tai arvoksi `null` (käyttöjärjestelmä saa päättää), jos kyseessä on isäntänimi:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // isäntänimelle null → käyttöjärjestelmä valitsee
  // ...
}
```

Siis:

- `auto` + IP-literaalina annettu isäntä (`192.0.2.1` / `[2001:db8::1]`) → kyseisen literaalin osoiteperhe.
- `auto` + isäntänimi → `null` → käyttöjärjestelmän tavallinen dual-stack-nimenselvitys.

---

## Miten `ipv4` / `ipv6` pakotetaan

Muu kuin `auto`-direktiivi välitetään yhtenä synteettisenä kyselymerkintänä — `?family=ipv4` tai `?family=ipv6` — joka lisätään kerran normalisoidun välityspalvelimen URL-osoitteen loppuun. `normalizeProxyUrl` poistaa merkinnän huolellisesti ja lisää sen uudelleen täsmälleen kerran, jotta se ei koskaan häiritse portin jäsentämistä.

Kun dispatcher rakennetaan, merkintä luetaan ja muunnetaan konkreettiseksi yhteysperheeksi. Jos isäntä on **vastakkaisen** perheen IP-literaali, OmniRoute aiheuttaa poikkeuksen (ristiriitatilanteessa toiminta estetään):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Välityspalvelimen perhedirektiivi ${directive} on ristiriidassa ${literal === 6 ? "IPv6" : "IPv4"}-literaali-isännän kanssa`
  );
}
```

Konkreettinen perhe kiinnitetään sitten yhdistimeen:

- **HTTP/HTTPS-välityspalvelimet** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — poistaa Happy Eyeballs -toiminnon käytöstä, joten yhteys muodostetaan vain valitun perheen kautta.
- **SOCKS5-välityspalvelimet**: mukautettu yhdistin välittää `socket_options: { family, autoSelectFamily: false }` -asetuksen SOCKS-asiakasohjelmalle (katso [SOCKS5-yhteensopivuus](#socks5-yhteensopivuus)).

---

## SOCKS5-yhteensopivuus

Perheen kiinnitys toimii SOCKS5-välityspalvelimien kanssa, mutta vakio-`fetch-socks` ei tuo näkyviin välityspalvelinhypyn perheen kiinnittämiseen tarvittavia socket-asetuksia. OmniRoute sisältää tätä varten oman yhdistimensä:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Kaikki SOCKS5-välitykset kulkevat `createSocksDispatcherWithFamily`-toiminnon kautta `family`-arvosta riippumatta (mukaan lukien `null` / `auto` isäntänimellä): `buildSocksFamilySocketOptions(null)` tuottaa `{}`, ja samaa `SocksClient.createConnection` + TLS `buildConnector` -polkua käytetään `socket_options`-kiinnityksen kanssa, jotta Happy Eyeballs ei voi valita IPv4:ää vain IPv6:n sallivalle ulosmenevän liikenteen käytännölle.

SOCKS5-tuki on oletusarvoisesti käytössä (sen voi poistaa käytöstä asetuksella `ENABLE_SOCKS5_PROXY=false`); katso [PROXY_GUIDE.md → Ympäristömuuttujat](../ops/PROXY_GUIDE.md#environment-variables).

---

## Virhetilanteessa estävä toiminta

Direktiivin tarkoituksena on **estää** toiminta sen sijaan, että järjestelmä siirtyisi huomaamatta väärään perheeseen. Tämän varmistaa kaksi suojausta:

1. **Literaaliristiriita** — IP-literaali-isännän kanssa ristiriidassa oleva direktiivi aiheuttaa poikkeuksen dispatcherin luonnin aikana (`resolveDispatcherFamily`, esitetty yllä).

2. **Isäntänimen DNS-ennakkotarkistus** — jos välityspalvelimella on isäntänimi ja kiinnitetty perhe, `proxyFetch.ts` varmistaa `assertHostnameSupportsFamily`-toiminnolla, että isäntänimellä todella on vaaditun perheen tietue, **ennen** ulosmenevän yhteyden muodostamista:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Välityspalvelimen isännällä ${host} ei ole ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} -tietuetta; ` +
         `vain ${family === 6 ? "IPv6" : "IPv4"}:n salliva ulosmenevä liikenne estetään (virhetilanteessa estävä toiminta)`
     );
   }
   ```

   Epäonnistuessa `proxyFetch.ts` merkitsee virheen arvoilla `code = "PROXY_FAMILY_UNAVAILABLE"` ja `statusCode = 503`. Myös DNS-selvityksen epäonnistuminen käsitellään estävästi (ulosmenevää yhteyttä ei sallita).

IP-literaali-isännille DNS-ennakkotarkistus ei tee mitään — niiden perhe on luontainen eikä edellytä hakua.

---

## Tietomalli

`family`-sarake lisättiin migraatiossa `099_proxy_family.sql` **kahteen** tauluun:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — rekisterimerkintöjen välityspalvelinkohtainen direktiivi (`src/lib/db/proxies.ts`). Selvityskyselyt valitsevat `family`-sarakkeen muiden välityspalvelinsarakkeiden ohella, ja puuttuva tai muu kuin merkkijonoarvo muunnetaan arvoksi `"auto"`.
- `upstream_proxy_config.family` — ylävirran välityspalvelinmerkintöjen direktiivi (`src/lib/db/upstreamProxy.ts`), samalla `"auto"`-oletusarvolla.

Kun selvitetyn välityspalvelinobjektin `family`-arvo on jokin muu kuin `auto`, `proxyConfigToUrl` lisää `?family=`-merkinnän, jotta kiinnitys säilyy aina dispatcherille asti.

---

## Aiheeseen liittyvä dokumentaatio

> 📖 **Aiheeseen liittyvä dokumentaatio:**
>
> - [Välityspalvelinopas](../ops/PROXY_GUIDE.md) — koko välityspalvelinjärjestelmä: rekisterin CRUD-toiminnot, nelitasoinen selvitys, kierrätys, kuntotarkistukset ja API-viite
> - `docs/security/STEALTH_GUIDE.md` (git; ei sisälly käännettyyn `/docs`-dokumentaatioon) — TLS-sormenjälki- ja CLI-sormenjälkikerrokset, jotka toimivat välityspalvelimen päällä
> - [Reittisuojausten tasot](./ROUTE_GUARD_TIERS.md) — loopback-pakotus vain paikalliseen käyttöön tarkoitetuille reiteille
