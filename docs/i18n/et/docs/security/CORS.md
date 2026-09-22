# CORS Configuration & Security (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute määrab ühe tsentraliseeritud lubatud loendi abil, millised **brauseri päritolud** võivad lugeda päritoluüleste päringute vastuseid. Mudel on **vaikimisi suletud**:
ühtegi päritolu ei lubata enne, kui te selle selgesõnaliselt lubate. Sellel lehel kirjeldatakse, kuidas lubatud loend
lahendatakse, mida `CORS_ALLOW_ALL=true` tegelikult avalikustab (ja mis veelgi olulisem, mida see
**ei avalikusta**), kuidas arendus- ja tootmiskeskkonda turvaliselt seadistada ning käitusaegset hoiatust,
mida juhtpaneel kuvab, kui metamärk on aktiivne.

**Tõeallikas:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Lubatud loendit rakendatakse üks kord
vahevaras (`src/server/authz/pipeline.ts`) — marsruudipõhised töötlejad ei määra
`Access-Control-Allow-Origin` päist ise.

## Kuidas päritolu lahendatakse

Iga päringu puhul arvutab vahevara `Access-Control-Allow-Origin` väärtuse
järgmises järjekorras:

1. **`CORS_ALLOW_ALL=true`** (või pärandseadistus `CORS_ORIGIN=*`) → tagastab kutsuja
   `Origin` väärtuse (või `*`, kui `Origin` päis puudub) koos päisega `Vary: Origin`,
   et vahemälud töötaksid korrektselt. Sama `applyCorsHeaders()` kitsaskoht lisab
   `Vary: Accept-Encoding` ka igale kehaga 2xx-vastusele loapõhise autentimisega
   `/v1*`/`/v1beta*` pinnal (`relaxForTokenAuth`, RFC 9110 §12.5.5, probleem #6737), et
   allavoolu- ja jagatud vahemälud saaksid tihendatud ning tihendamata
   variante korrektselt eristada.
2. Vastasel juhul päringu `Origin` normaliseeritakse (teisendatakse väiketähtedeks ja
   eemaldatakse lõpus olev kaldkriips) ning võrreldakse **ühendatud lubatud loendiga**:
   - keskkonnamuutuja **`CORS_ALLOWED_ORIGINS`** — komadega eraldatud loend ja
   - käitusaegne seadistus **`corsOrigins`** (Juhtpaneel → Turvalisus → _CORS-i lubatud
     päritolud_), mis sisestatakse funktsiooni `setRuntimeAllowedOrigins()` kaudu failist
     `src/lib/config/runtimeSettings.ts`.
3. Vaste puudub → **`Access-Control-Allow-Origin` päist ei väljastata**. Brauser
   blokeerib päritoluülese lugemise. See on ettenähtud vaikimisi suletud käitumine.

| Keskkonnamuutuja       | Tähendus                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Lubatavate täpsete päritolude CSV-loend (soovitatav).                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → tagastab mis tahes päritolu (metamärk). Ainult arenduseks.                       |
| `CORS_ORIGIN`          | Pärandseadistus. `*` käitub nagu `CORS_ALLOW_ALL`; üksik väärtus lisatakse lubatud loendisse. |

## Ohumudel — mida `CORS_ALLOW_ALL=true` tegelikult avalikustab

Üldist OWASP-i hoiatust („metamärgiga CORS = iga sait saab teie API-t kutsuda”) tasub
tõsiselt võtta, kuid OmniRoute'i kokkupuutepind on **üldisest olukorrast kitsam**,
sest rakendusel on üks konkreetne omadus:

> **Keskne `applyCorsHeaders()` ei väljasta kunagi päist
> `Access-Control-Allow-Credentials`.** Brauser ei tee _autenditud_
> (küpsist sisaldavat) päritoluülest vastust loetavaks, kui server ei saada päist
> `Access-Control-Allow-Credentials: true`. OmniRoute'i ühine CORS-i tee ei tee
> seda kunagi.

See tähendab iga pinna kohta järgmist, isegi kui `CORS_ALLOW_ALL=true`:

| Pind                                       | Autentimismehhanism        | Metamärgiga CORS-i mõju                                                                                                                                                                                                                        |
| ------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Juhtpaneel / HALDUS `/api/*`               | Küpsiseseanss              | Päritolu tagastatakse, kuid **ilma päiseta `Allow-Credentials`** brauser **blokeerib** autenditud vastuse lugemise. Pahatahtlik päritoluülene sait **ei saa lugeda** teie autenditud juhtpaneeli vastuseid ning seansiküpsist ei avalikustata. |
| Kliendi API `/v1/*`, `/v1beta/*`           | Bearer- / `x-api-key` päis | Juba **olemuslikult** lubav (`relaxForTokenAuth`): brauserid ei lisa päiseid `Authorization`/`x-api-key` kunagi automaatselt, seega ei saa ründaja leht teie võtit edastada. `CORS_ALLOW_ALL` ei laienda seda.                                 |
| Avalik kirjutuskaitstud (`/api/health`, …) | Puudub                     | Pole tundlik; metamärk on kahjutu.                                                                                                                                                                                                             |

Seega piirdub `CORS_ALLOW_ALL=true` **jääkkokkupuude** järgmisega: (a)
juba autentimist mittevajavate andmete autentimata päritoluülesed **lugemised** ja (b)
CORS-i **eelkontrolli läbimise** võimaldamine haldusmarsruutidel — need nõuavad endiselt autentimist,
mida päritoluülene leht ei saa pakkuda. See **ei ole** ühisel CORS-i teel seansi kaaperdamise ega
mandaatide varastamise vektor.

### Üks tegelik erand — `/api/v1/agents/`

Cloud-Agenti marsruudid (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) määravad
oma **CORS-i päised**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ning **väljastavad**
`Access-Control-Allow-Origin: <origin>|*` koos päisega
`Access-Control-Allow-Credentials: true`. See on ainus pind, kus
päritolu tagastamine ja mandaadid esinevad koos, ning see on **sõltumatu seadistusest
`CORS_ALLOW_ALL`**. Need marsruudid kasutavad haldusautentimist
(`requireManagementAuth`); operaatorid, kes teevad juhtpaneeli kohalikust hostist väljaspool kättesaadavaks, peaksid
teadma, et see on ainus koht, kus vastuse päised lubavad päritoluülest autenditud lugemist.
Selle piiramine selgesõnalise lubatud loendiga on jälgimisel
sellest CORS-i juhendist eraldi.

## Tootmiskeskkonna kontrollnimekiri

- **Ärge kunagi määrake tootmiskeskkonnas väärtust `CORS_ALLOW_ALL=true`.** Jätke see määramata.
- Määrake **selgesõnaline** päritoluallikate loend — kas keskkonnamuutuja või vahekaardi Turvalisus välja kaudu:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Kui OmniRoute töötab pöördproksi / tunneli (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) taga, **ei ole** CORS teie ainus kaitsemeede — loopback-marsruudi
  kaitse turvab endiselt protsesside käivitamist võimaldavaid marsruute (vt
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ärge võltsige päist
  `X-Forwarded-For: 127.0.0.1`, et 403 viga „parandada“; see avab uuesti RCE-klassi
  turvaaugu, mille marsruudikaitse sulgeb.
- Kontrollige käitusaegset olekut: juhtpaneel kuvab **püsivat merevaigukollast riba**
  asukohas Juhtpaneel → Turvalisus → Autoriseerimise inventuur alati, kui
  `CORS_ALLOW_ALL=true` on aktiivne, ning `/api/settings/authz-inventory` tagastab
  struktuuri `cors: { allowAll, allowedOrigins }`, mida seiretööriistad saavad pärida.

## Arenduse mugavus — konkreetsete kohalike päritoluallikate lubamine

Isegi arenduskeskkonnas vajate metamärki harva. Lubage ainult kasutatavad arendusserverid:

```bash
# Vite'i (5173) + Next.js-i (3000) arendusserverid, mis kutsuvad kohalikku OmniRoute'i
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Päritoluallikaid võrreldakse tõstutundetult ja lõpus olevat kaldkriipsu eiratakse, seega
`http://localhost:3000` ja `http://localhost:3000/` on samaväärsed. Sama CSV-loendi
saab määrata käitusajal asukohas **Juhtpaneel → Turvalisus → CORS-i lubatud päritoluallikad** ilma
taaskäivitamiseta.

## API-võtmed võrreldes küpsiseseanssidega

- **Bearer / `x-api-key` (`/v1/*` järeldusliides):** brauserid ei lisa
  neid kunagi automaatselt. CORS ei ole siin sisuline tõke — tõkkeks on API-võti —
  mistõttu on see liides teadlikult liberaalne, et brauseri- ja
  Electroni kliendid saaksid lugeda vastuseid, millele neil on juba õigus.
- **Küpsiseseanss (juhtpaneel):** seda kaitseb vaikimisi ligipääsu keelav seadistus **ja**
  päise `Access-Control-Allow-Credentials` puudumine ühisel teel. Ärge lisage
  haldusliidese ega juhtpaneeli päritoluallikaid ühelegi liberaalsele seadistusele; nende puhul peab
  vaikimisi ligipääs olema alati rangelt keelatud.

## Näide: pöördproksi OmniRoute'i ees

CORS-i jõustab OmniRoute ise, seega ei tohiks proksi üldjuhul päiseid
`Access-Control-*` lisada ega ümber kirjutada (topeltpäised põhjustavad brauserites tõrkeid). Lõpetage TLS
ja edastage päring — laske OmniRoute'il eelpäringule vastata:

```nginx
# nginx — edasta OmniRoute'i; ÄRA sisesta siin päiseid Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # ÄRA määra X-Forwarded-For väärtuseks 127.0.0.1 — see nurjab loopback-marsruudi kaitse.
}
```

Määrake brauseri lubatud päritoluallikad OmniRoute'is (`CORS_ALLOWED_ORIGINS` või
vahekaardil Turvalisus), mitte proksis.

## Lähtefailid

| Valdkond                                          | Fail                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Lubatud loendi lahendamine + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Vahevara rakendamine (ainus tõeallikas)           | `src/server/authz/pipeline.ts`                                       |
| Seaded → käitusaegne päritoluallikate sisestamine | `src/lib/config/runtimeSettings.ts`                                  |
| Käitusaegne olek juhtpaneeli jaoks                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Juhtpaneeli hoiatusriba                           | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS-i lubatud päritoluallikate väli              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agenti marsruudipõhine CORS (erand)         | `src/lib/cloudAgent/api.ts`                                          |

## Vaata ka

- [Marsruudivalvurite tasemed](./ROUTE_GUARD_TIERS.md) — tagasisideaadressi kasutamise jõustamine
  protsesse käivitada võimaldavate marsruutide puhul (eraldi täiendav kontrollimeede).
- [Autoriseerimisjuhend](../architecture/AUTHZ_GUIDE.md) — täielik autentimis- ja autoriseerimiskonveier.
