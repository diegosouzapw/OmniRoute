# CORS Configuration & Security (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute nadzoruje, kateri **izvori brskalnika** lahko berejo odgovore med različnimi izvori
z enega samega, centraliziranega seznama dovoljenih izvorov. Model je **privzeto zaprt**:
noben izvor ni dovoljen, dokler ga izrecno ne omogočite. Ta stran opisuje, kako se seznam dovoljenih
izvorov razrešuje, kaj `CORS_ALLOW_ALL=true` dejansko izpostavi (in, kar je pomembno, česa
**ne** izpostavi), kako varno konfigurirati razvojno in produkcijsko okolje ter opozorilo med izvajanjem,
ki ga nadzorna plošča prikaže, ko je aktiven nadomestni znak.

**Vir resnice:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Seznam dovoljenih izvorov se uporabi enkrat, v
vmesni programski opremi (`src/server/authz/pipeline.ts`) — obdelovalniki posameznih poti ne nastavljajo
glave `Access-Control-Allow-Origin` sami.

## Kako se razreši izvor

Vmesna programska oprema za vsako zahtevo izračuna vrednost `Access-Control-Allow-Origin`
v naslednjem vrstnem redu:

1. **`CORS_ALLOW_ALL=true`** (ali podedovani `CORS_ORIGIN=*`) → vrne klicateljev
   `Origin` (ali `*`, kadar glava `Origin` ni prisotna), skupaj z `Vary: Origin`,
   da predpomnilniki ostanejo pravilni. Ista osrednja točka `applyCorsHeaders()` prav tako doda
   `Vary: Accept-Encoding` vsakemu odgovoru 2xx s telesom na območju
   `/v1*`/`/v1beta*`, overjenem z žetonom (`relaxForTokenAuth`, RFC 9110 §12.5.5, težava #6737), da
   lahko nadaljnji/skupni predpomnilniki pravilno razlikujejo med stisnjenimi in nestisnjenimi
   različicami.
2. V nasprotnem primeru se `Origin` zahteve normalizira (pretvori v male črke, končna poševnica
   pa se odstrani) in primerja z **združenim seznamom dovoljenih izvorov**:
   - spremenljivka okolja **`CORS_ALLOWED_ORIGINS`** — seznam, ločen z vejicami, in
   - izvajalna nastavitev **`corsOrigins`** (Nadzorna plošča → Varnost → _Dovoljeni izvori
     CORS_), vstavljena prek `setRuntimeAllowedOrigins()` iz
     `src/lib/config/runtimeSettings.ts`.
3. Ni ujemanja → **glava `Access-Control-Allow-Origin` se ne odda**. Brskalnik
   blokira branje med različnimi izvori. To je predvideno privzeto zaprto vedenje.

| Spremenljivka okolja   | Pomen                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | Seznam natančnih dovoljenih izvorov, ločen z vejicami (priporočeno).                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → vrni kateri koli izvor (nadomestni znak). Samo za razvoj.                                 |
| `CORS_ORIGIN`          | Podedovano. `*` se vede kot `CORS_ALLOW_ALL`; posamezna vrednost se doda na seznam dovoljenih izvorov. |

## Model groženj — kaj `CORS_ALLOW_ALL=true` dejansko izpostavi

Splošno opozorilo OWASP ("CORS z nadomestnim znakom = katero koli spletno mesto lahko kliče vaš API") je vredno
jemati resno, vendar je izpostavljenost OmniRoute **ožja kot v splošnem primeru**,
zaradi enega konkretnega dejstva implementacije:

> **Osrednji `applyCorsHeaders()` nikoli ne odda glave
> `Access-Control-Allow-Credentials`.** Brskalnik ne bo razkril _overjenega_
> odgovora med različnimi izvori (ki vsebuje piškotke), razen če strežnik pošlje
> `Access-Control-Allow-Credentials: true`. Skupna pot CORS v OmniRoute tega nikoli
> ne stori.

Kaj to pomeni za posamezna območja, tudi pri `CORS_ALLOW_ALL=true`:

| Območje                                  | Mehanizem overjanja              | Učinek CORS z nadomestnim znakom                                                                                                                                                                                                 |
| ---------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna plošča / MANAGEMENT `/api/*`    | Seja s piškotki                  | Izvor se vrne, vendar brskalnik **brez `Allow-Credentials` blokira** overjeno branje. Zlonamerno spletno mesto drugega izvora **ne more prebrati** vaših overjenih odgovorov nadzorne plošče, sejni piškotek pa ni izpostavljen. |
| Odjemalski API `/v1/*`, `/v1beta/*`      | Žeton Bearer / glava `x-api-key` | Že namensko permissiven **po zasnovi** (`relaxForTokenAuth`): brskalniki nikoli samodejno ne dodajo `Authorization`/`x-api-key`, zato napadalčeva stran ne more posredovati vašega ključa. `CORS_ALLOW_ALL` tega ne razširi.     |
| Javno, samo za branje (`/api/health`, …) | Brez                             | Neobčutljivo; nadomestni znak je neškodljiv.                                                                                                                                                                                     |

**Preostala** izpostavljenost zaradi `CORS_ALLOW_ALL=true` je tako omejena na: (a)
neoverjena branja med različnimi izvori za podatke, ki so že brez overjanja, in (b)
omogočanje uspešne **predhodne zahteve** CORS na upravljavskih poteh — ki še vedno zahtevajo overjanje,
ki ga stran drugega izvora ne more zagotoviti. Na skupni poti CORS to **ni** vektor za ugrabitev seje ali
krajo poverilnic.

### Ena dejanska izjema — `/api/v1/agents/`

Poti Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nastavljajo
**lastne** glave CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) in **oddajo**
`Access-Control-Allow-Origin: <origin>|*` skupaj z
`Access-Control-Allow-Credentials: true`. To je edino območje, kjer
vračanje izvora in poverilnice obstajajo sočasno, ter je **neodvisno od
`CORS_ALLOW_ALL`**. Te poti so overjene za upravljanje
(`requireManagementAuth`); skrbniki, ki nadzorno ploščo izpostavijo zunaj gostitelja, se morajo
zavedati, da je to edino mesto, kjer glave odgovora dovoljujejo overjeno branje med različnimi
izvori. Omejitev na izrecni seznam dovoljenih izvorov se obravnava
ločeno od teh smernic CORS.

## Kontrolni seznam za produkcijo

- **V produkciji nikoli ne nastavite `CORS_ALLOW_ALL=true`.** Pustite ga nenastavljenega.
- Nastavite **izrecen** seznam izvorov — bodisi s spremenljivko okolja bodisi s poljem na zavihku Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Če OmniRoute deluje za obratnim posredniškim strežnikom ali tunelom (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **ni** vaš edini nadzorni mehanizem — varovalo poti za povratno zanko
  še vedno ščiti poti, ki lahko zaganjajo procese (glejte
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ne ponarejajte
  `X-Forwarded-For: 127.0.0.1`, da bi »odpravili« napako 403; s tem znova omogočite razred ranljivosti RCE, ki ga
  varovalo poti preprečuje.
- Preverite stanje izvajalnega okolja: nadzorna plošča prikazuje **stalno jantarno opozorilno pasico**
  pod Dashboard → Security → Authorization Inventory, kadar je
  `CORS_ALLOW_ALL=true` aktiven, `/api/settings/authz-inventory` pa vrne ovoj
  `cors: { allowAll, allowedOrigins }`, ki ga lahko spremljevalna orodja redno preverjajo.

## Priročnost pri razvoju — dovolite določene lokalne izvore

Tudi med razvojem le redko potrebujete nadomestni znak. Dovolite samo razvojne strežnike, ki jih uporabljate:

```bash
# Razvojna strežnika Vite (5173) in Next.js (3000), ki kličeta lokalni OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izvori se primerjajo brez razlikovanja med velikimi in malimi črkami, končna poševnica pa se prezre, zato sta
`http://localhost:3000` in `http://localhost:3000/` enakovredna. Isti seznam CSV
lahko med izvajanjem brez ponovnega zagona nastavite v **Dashboard → Security → CORS Allowed Origins**.

## Ključi API v primerjavi s sejami piškotkov

- **Bearer / `x-api-key` (vmesnik za sklepanje `/v1/*`):** brskalniki jih nikoli ne priložijo
  samodejno. CORS tukaj ni smiselna ovira — ovira je ključ API —
  zato je ta vmesnik namenoma permisiven, da lahko brskalniški odjemalci in odjemalci
  Electron berejo odgovore, do katerih so že upravičeni.
- **Seja piškotka (nadzorna plošča):** zaščitena je s privzeto nastavitvijo, ki ob napaki zavrne dostop, **in**
  z odsotnostjo `Access-Control-Allow-Credentials` na skupni poti. Izvorov za
  upravljanje oziroma nadzorno ploščo ne vključujte v nobeno permisivno konfiguracijo; zanje mora
  brezpogojno ostati privzeto zavračanje dostopa.

## Primer: obratni posredniški strežnik pred OmniRoute

CORS uveljavlja sam OmniRoute, zato posredniški strežnik praviloma **ne sme** dodajati ali
prepisovati glav `Access-Control-*` (podvojene glave povzročajo težave v brskalnikih). Zaključite TLS
in posredujte zahteve — predpoletne zahteve naj obravnava OmniRoute:

```nginx
# nginx — posredujte v OmniRoute; tukaj NE vstavljajte glav Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Ne nastavite X-Forwarded-For na 127.0.0.1 — s tem onemogočite varovalo poti za povratno zanko.
}
```

Dovoljene izvore brskalnikov nastavite v OmniRoute (`CORS_ALLOWED_ORIGINS` ali na
zavihku Security), ne v posredniškem strežniku.

## Izvorne datoteke

| Področje                                              | Datoteka                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| Razreševanje seznama dovoljenih + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Uporaba vmesne programske opreme (en sam vir resnice) | `src/server/authz/pipeline.ts`                                       |
| Settings → vstavljanje izvorov med izvajanjem         | `src/lib/config/runtimeSettings.ts`                                  |
| Stanje izvajalnega okolja za nadzorno ploščo          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Opozorilna pasica nadzorne plošče                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Polje CORS Allowed Origins                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS za posamezne poti Cloud-Agent (izjema)           | `src/lib/cloudAgent/api.ts`                                          |

## Glejte tudi

- [Ravni varovanja poti](./ROUTE_GUARD_TIERS.md) — uveljavljanje povratne zanke za
  poti, ki lahko ustvarjajo procese (ločen, dopolnjujoč nadzor).
- [Vodnik za avtorizacijo](../architecture/AUTHZ_GUIDE.md) — celoten postopek preverjanja avtorizacije.
