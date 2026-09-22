# CORS Configuration & Security (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute valdo, kuriems **naršyklės šaltiniams** leidžiama skaityti atsakymus iš kitų šaltinių,
naudodama vieną centralizuotą leidžiamų šaltinių sąrašą. Pagal numatytąją nuostatą modelis
**neleidžia prieigos**: joks šaltinis nėra leidžiamas, kol jo aiškiai neįtraukiate. Šiame puslapyje aprašoma, kaip
nustatomas leidžiamas šaltinis, ką iš tikrųjų atveria `CORS_ALLOW_ALL=true` (ir, svarbiausia, ko
jis **neatveria**), kaip saugiai konfigūruoti kūrimo ir gamybinę aplinkas bei vykdymo metu rodomas įspėjimas,
kurį prietaisų skydelis pateikia, kai įjungtas pakaitos simbolis.

**Pirminis tiesos šaltinis:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Leidžiamų šaltinių sąrašas pritaikomas vieną kartą
tarpinėje programinėje įrangoje (`src/server/authz/pipeline.ts`) — atskirų maršrutų apdorojimo funkcijos pačios nenustato
`Access-Control-Allow-Origin`.

## Kaip nustatomas šaltinis

Kiekvienai užklausai tarpinė programinė įranga apskaičiuoja `Access-Control-Allow-Origin` reikšmę
tokia tvarka:

1. **`CORS_ALLOW_ALL=true`** (arba senesnis `CORS_ORIGIN=*`) → grąžina užklausos siuntėjo
   `Origin` reikšmę (arba `*`, kai nėra `Origin` antraštės), kartu su `Vary: Origin`,
   kad podėliai veiktų tinkamai. Tas pats `applyCorsHeaders()` kontrolinis taškas taip pat prideda
   `Vary: Accept-Encoding` prie kiekvieno 2xx atsakymo su turiniu prieigos raktu autentifikuojamoje
   `/v1*`/`/v1beta*` sąsajoje (`relaxForTokenAuth`, RFC 9110 §12.5.5, problema #6737), kad
   tolesni arba bendrinami podėliai galėtų tinkamai atskirti suglaudintus ir nesuglaudintus
   variantus.
2. Priešingu atveju užklausos `Origin` normalizuojamas (paverčiamas mažosiomis raidėmis,
   pašalinamas galinis pasvirasis brūkšnys) ir palyginamas su **sujungtu leidžiamų šaltinių sąrašu**:
   - aplinkos kintamasis **`CORS_ALLOWED_ORIGINS`** — kableliais atskirtas sąrašas, ir
   - vykdymo metu taikomas **`corsOrigins`** nustatymas (prietaisų skydelis → Saugumas → _Leidžiami CORS
     šaltiniai_), perduodamas per `setRuntimeAllowedOrigins()` iš
     `src/lib/config/runtimeSettings.ts`.
3. Atitikties nėra → **`Access-Control-Allow-Origin` antraštė neišsiunčiama**. Naršyklė
   blokuoja skaitymą iš kito šaltinio. Tai yra numatytoji prieigą draudžianti elgsena.

| Aplinkos kintamasis    | Reikšmė                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Tikslių leidžiamų šaltinių CSV sąrašas (rekomenduojama).                                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → grąžinti bet kurį šaltinį (pakaitos simbolis). Tik kūrimo aplinkai.                               |
| `CORS_ORIGIN`          | Senesnis parametras. `*` veikia kaip `CORS_ALLOW_ALL`; viena reikšmė pridedama prie leidžiamų šaltinių sąrašo. |

## Grėsmių modelis — ką iš tikrųjų atveria `CORS_ALLOW_ALL=true`

Į bendrąjį OWASP įspėjimą („CORS pakaitos simbolis = bet kuri svetainė gali iškviesti jūsų API“) verta
žiūrėti rimtai, tačiau OmniRoute pažeidžiamumo sritis yra **siauresnė nei bendruoju atveju**
dėl vieno konkretaus įgyvendinimo ypatumo:

> **Centrinė `applyCorsHeaders()` funkcija niekada neišsiunčia
> `Access-Control-Allow-Credentials`.** Naršyklė nepateiks _su kredencialais_
> (su slapuku) gauto atsakymo iš kito šaltinio, nebent serveris išsiųstų
> `Access-Control-Allow-Credentials: true`. Bendrasis OmniRoute CORS kelias to niekada
> nedaro.

Ką tai reiškia kiekvienai sąsajai, net kai nustatyta `CORS_ALLOW_ALL=true`:

| Sąsaja                                   | Autentifikavimo mechanizmas   | CORS pakaitos simbolio poveikis                                                                                                                                                                                                                   |
| ---------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prietaisų skydelis / MANAGEMENT `/api/*` | Slapuku pagrįsta sesija       | Šaltinis grąžinamas, tačiau **be `Allow-Credentials`** naršyklė **blokuoja** skaitymą su kredencialais. Kenkėjiška kito šaltinio svetainė **negali perskaityti** autentifikuotų prietaisų skydelio atsakymų, o sesijos slapukas neatskleidžiamas. |
| Kliento API `/v1/*`, `/v1beta/*`         | Bearer / `x-api-key` antraštė | Jau yra liberalus **pagal projektą** (`relaxForTokenAuth`): naršyklės niekada automatiškai neprideda `Authorization`/`x-api-key`, todėl užpuoliko puslapis negali pateikti jūsų rakto. `CORS_ALLOW_ALL` šios prieigos neišplečia.                 |
| Viešas tik skaitymui (`/api/health`, …)  | Nėra                          | Duomenys nėra jautrūs; pakaitos simbolis nepavojingas.                                                                                                                                                                                            |

Taigi **likusi** `CORS_ALLOW_ALL=true` keliama rizika apsiriboja: (a)
skaitymu iš kitų šaltinių **be kredencialų**, kai skaitomi ir taip neautentifikuoti duomenys, ir (b)
leidimu sėkmingai atlikti CORS **išankstinę užklausą** valdymo maršrutuose — kuriems vis tiek reikalingas autentifikavimas,
o kito šaltinio puslapis jo suteikti negali. Bendrame CORS kelyje tai **nėra** sesijos užgrobimo ar
kredencialų vagystės vektorius.

### Viena tikra išimtis — `/api/v1/agents/`

Cloud-Agent maršrutai (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nustato
**savo** CORS antraštes
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ir **išsiunčia**
`Access-Control-Allow-Origin: <origin>|*` kartu su
`Access-Control-Allow-Credentials: true`. Tai vienintelė sąsaja, kurioje
šaltinio grąžinimas ir kredencialai naudojami kartu, ir ji **nepriklauso nuo
`CORS_ALLOW_ALL`**. Šiuose maršrutuose naudojamas valdymo autentifikavimas
(`requireManagementAuth`); operatoriai, kurie prietaisų skydelį padaro pasiekiamą už pagrindinio kompiuterio ribų, turėtų
žinoti, kad tai yra vienintelė vieta, kurioje atsakymo antraštės leidžia skaityti iš kito šaltinio
naudojant kredencialus. Jo apribojimas iki aiškaus leidžiamų šaltinių sąrašo stebimas
atskirai nuo šių CORS gairių.

## Produkcinės aplinkos kontrolinis sąrašas

- **Produkcinėje aplinkoje niekada nenustatykite `CORS_ALLOW_ALL=true`.** Palikite šį parametrą nenustatytą.
- Nustatykite **aiškų** leidžiamų šaltinių sąrašą — naudodami aplinkos kintamąjį arba skirtuko „Security“ lauką:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jei „OmniRoute“ veikia už atvirkštinio tarpinio serverio / tunelio („nginx“, „Caddy“, „Cloudflare“
  Tunnel, „Tailscale“), CORS **nėra** vienintelė jūsų apsaugos priemonė — vietinio grįžtamojo ryšio maršrutų
  apsauga vis tiek saugo maršrutus, galinčius paleisti procesus (žr.
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Neklastokite
  `X-Forwarded-For: 127.0.0.1`, kad „ištaisytumėte“ 403 klaidą; taip vėl atveriama RCE klasės spraga,
  kurią uždaro maršrutų apsauga.
- Patikrinkite vykdymo būseną: valdymo skydelyje rodoma **nuolatinė gintaro spalvos reklamjuostė**
  skiltyje Dashboard → Security → Authorization Inventory, kai
  `CORS_ALLOW_ALL=true` yra aktyvus, o `/api/settings/authz-inventory` grąžina
  `cors: { allowAll, allowedOrigins }` apvalkalą, kurį stebėjimo įrankiai gali periodiškai tikrinti.

## Patogumas kuriant — leiskite konkrečius vietinius šaltinius

Net kūrimo aplinkoje pakaitos simbolio prireikia retai. Leiskite tik naudojamus kūrimo serverius:

```bash
# „Vite“ (5173) ir „Next.js“ (3000) kūrimo serveriai, besikreipiantys į vietinį „OmniRoute“
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Šaltiniai lyginami neatsižvelgiant į didžiąsias ir mažąsias raides, o galinis pasvirasis brūkšnys ignoruojamas, todėl
`http://localhost:3000` ir `http://localhost:3000/` yra lygiaverčiai. Tą patį CSV
sąrašą galima nustatyti vykdymo metu skiltyje **Dashboard → Security → CORS Allowed Origins**,
nepaleidžiant sistemos iš naujo.

## API raktai ir slapukų seansai

- **Bearer / `x-api-key` (`/v1/*` išvadų sąsaja):** naršyklės niekada jų neprideda
  automatiškai. CORS čia nėra reikšmingas barjeras — barjeras yra API raktas —
  todėl ši sąsaja sąmoningai yra mažiau ribojama, kad naršyklės ir
  „Electron“ klientai galėtų skaityti atsakymus, kuriuos jie jau turi teisę gauti.
- **Slapukų seansas (valdymo skydelis):** apsaugotas numatytąja uždara nuostata **ir**
  tuo, kad bendrame kelyje nėra `Access-Control-Allow-Credentials`. Neįtraukite
  administravimo / valdymo skydelio šaltinių į jokią mažiau ribojančią konfigūraciją; jiems turi būti taikoma
  būtent uždara numatytoji nuostata.

## Pavyzdys: atvirkštinis tarpinis serveris prieš „OmniRoute“

CORS užtikrina pats „OmniRoute“, todėl tarpinis serveris paprastai **neturėtų** pridėti ar
perrašyti `Access-Control-*` antraščių (dvigubos antraštės sutrikdo naršyklių veikimą). Užbaikite TLS
ir persiųskite užklausą — leiskite „OmniRoute“ atsakyti į išankstinę užklausą:

```nginx
# „nginx“ — persiųskite į „OmniRoute“; čia NEĮTERPKITE Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NENUSTATYKITE X-Forwarded-For į 127.0.0.1 — taip apeinama vietinio grįžtamojo ryšio maršrutų apsauga.
}
```

Leidžiamus naršyklės šaltinius nustatykite „OmniRoute“ (`CORS_ALLOWED_ORIGINS` arba
skirtuke „Security“), o ne tarpiniame serveryje.

## Šaltinio failai

| Sritis                                                              | Failas                                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Leidžiamųjų sąrašo nustatymas ir `getCorsStatus()`                  | `src/server/cors/origins.ts`                                         |
| Tarpinės programinės įrangos taikymas (vienintelis tiesos šaltinis) | `src/server/authz/pipeline.ts`                                       |
| Nustatymai → šaltinių įterpimas vykdymo metu                        | `src/lib/config/runtimeSettings.ts`                                  |
| Vykdymo būsena valdymo skydeliui                                    | `src/app/api/settings/authz-inventory/route.ts`                      |
| Valdymo skydelio įspėjamoji reklamjuostė                            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Leidžiamų CORS šaltinių laukas                                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| „Cloud-Agent“ kiekvieno maršruto CORS (išimtis)                     | `src/lib/cloudAgent/api.ts`                                          |

## Taip pat žr.

- [Maršrutų apsaugos lygiai](./ROUTE_GUARD_TIERS.md) — vietinio grįžtamojo ryšio sąsajos reikalavimų užtikrinimas
  maršrutams, galintiems kurti procesus (atskira, papildanti kontrolės priemonė).
- [Autorizavimo vadovas](../architecture/AUTHZ_GUIDE.md) — visas autentifikavimo ir autorizavimo procesas.
