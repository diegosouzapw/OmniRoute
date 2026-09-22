# CORS Configuration & Security (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

Az OmniRoute egyetlen, központi engedélyezési listával szabályozza, hogy mely
**böngészőeredetek** olvashatják a más eredetű válaszokat. A modell
**alapértelmezés szerint mindent tilt**: egyetlen eredet sem engedélyezett, amíg
kifejezetten fel nem veszi. Ez az oldal bemutatja, hogyan történik az engedélyezési
lista feloldása, mit tesz ténylegesen elérhetővé a `CORS_ALLOW_ALL=true` (és ami
fontosabb, mit **nem**), hogyan konfigurálható biztonságosan a fejlesztési és az
éles környezet, valamint milyen futásidejű figyelmeztetést jelenít meg az
irányítópult, amikor helyettesítő karakteres engedélyezés van érvényben.

**Hiteles forrás:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Az engedélyezési lista egyszer, a köztes
rétegben (`src/server/authz/pipeline.ts`) kerül alkalmazásra — az egyes
útvonalkezelők maguk nem állítják be az `Access-Control-Allow-Origin` fejlécet.

## Az eredet feloldásának módja

A köztes réteg minden kérésnél a következő sorrendben számítja ki az
`Access-Control-Allow-Origin` értékét:

1. **`CORS_ALLOW_ALL=true`** (vagy a régi `CORS_ORIGIN=*`) → visszatükrözi a hívó
   `Origin` értékét (vagy `*` értéket használ, ha nincs `Origin` fejléc), és
   beállítja a `Vary: Origin` fejlécet, hogy a gyorsítótárak helyesen működjenek.
   Ugyanez az `applyCorsHeaders()` szűk keresztmetszet a `Vary: Accept-Encoding`
   értéket is hozzáfűzi minden, törzzsel rendelkező 2xx válaszhoz a tokennel
   hitelesített `/v1*`/`/v1beta*` felületen (`relaxForTokenAuth`, RFC 9110 §12.5.5,
   issue #6737), így az alsóbb rétegbeli/megosztott gyorsítótárak helyesen tudják
   megkülönböztetni a tömörített és a tömörítetlen változatokat.
2. Egyébként a kérés `Origin` értéke normalizálásra kerül (kisbetűsítés és a záró
   perjel eltávolítása), majd a rendszer összeveti az **egyesített engedélyezési
   listával**:
   - a **`CORS_ALLOWED_ORIGINS`** környezeti változó — vesszővel elválasztott lista,
     valamint
   - a futásidejű **`corsOrigins`** beállítás (Irányítópult → Biztonság → _CORS által
     engedélyezett eredetek_), amelyet a `setRuntimeAllowedOrigins()` injektál a
     `src/lib/config/runtimeSettings.ts` fájlból.
3. Nincs egyezés → **nem kerül kibocsátásra `Access-Control-Allow-Origin`
   fejléc**. A böngésző blokkolja a más eredetű olvasást. Ez a szándékos,
   alapértelmezés szerint mindent tiltó működés.

| Környezeti változó     | Jelentés                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Az engedélyezendő pontos eredetek CSV-listája (ajánlott).                                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → bármely eredet visszatükrözése (helyettesítő karakter). Csak fejlesztéshez.                        |
| `CORS_ORIGIN`          | Régi beállítás. A `*` a `CORS_ALLOW_ALL` módjára működik; egyetlen érték hozzáadódik az engedélyezési listához. |

## Fenyegetési modell — mit tesz ténylegesen elérhetővé a `CORS_ALLOW_ALL=true`

Az általános OWASP-figyelmeztetést („helyettesítő karakteres CORS = bármely
webhely meghívhatja az API-t”) érdemes komolyan venni, az OmniRoute kitettsége
azonban **szűkebb az általános esetnél**, egy konkrét megvalósítási sajátosság
miatt:

> **A központi `applyCorsHeaders()` soha nem bocsát ki
> `Access-Control-Allow-Credentials` fejlécet.** A böngésző nem teszi elérhetővé a
> _hitelesítési adatokat tartalmazó_ (sütit hordozó), más eredetű választ, hacsak a
> kiszolgáló nem küld `Access-Control-Allow-Credentials: true` fejlécet. Az
> OmniRoute megosztott CORS-útvonala ezt soha nem teszi.

Ez felületenként a következőt jelenti, még `CORS_ALLOW_ALL=true` esetén is:

| Felület                                      | Hitelesítési mechanizmus    | A helyettesítő karakteres CORS hatása                                                                                                                                                                                                                                                        |
| -------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Irányítópult / MANAGEMENT `/api/*`           | Sütialapú munkamenet        | Az eredet visszatükröződik, de az **`Allow-Credentials` hiánya miatt** a böngésző **blokkolja** a hitelesítési adatokat tartalmazó olvasást. Egy rosszindulatú, más eredetű webhely **nem olvashatja** a hitelesített irányítópult-válaszokat, és a munkamenetsüti sem kerül nyilvánosságra. |
| Kliens-API `/v1/*`, `/v1beta/*`              | Bearer / `x-api-key` fejléc | Már eleve megengedő **a kialakításából adódóan** (`relaxForTokenAuth`): a böngészők soha nem csatolják automatikusan az `Authorization`/`x-api-key` értéket, így a támadó oldala nem tudja megadni az Ön kulcsát. A `CORS_ALLOW_ALL` ezt nem bővíti.                                         |
| Nyilvános, csak olvasható (`/api/health`, …) | Nincs                       | Nem érzékeny; a helyettesítő karakter ártalmatlan.                                                                                                                                                                                                                                           |

Így a `CORS_ALLOW_ALL=true` **fennmaradó** kitettsége a következőkre korlátozódik:
(a) a már eleve hitelesítés nélkül hozzáférhető adatok hitelesítési adatok
nélküli, más eredetű **olvasására**, valamint (b) arra, hogy a CORS
**előzetes kérés átmenjen** a felügyeleti útvonalakon — amelyek továbbra is olyan
hitelesítést igényelnek, amelyet egy más eredetű oldal nem tud biztosítani. A
megosztott CORS-útvonalon ez **nem** munkamenet-eltérítési vagy
hitelesítőadat-lopási támadási vektor.

### Egy valódi kivétel — `/api/v1/agents/`

A Cloud-Agent útvonalai
(`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) **saját** CORS-fejléceket
állítanak be (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`), és
**kibocsátják** az `Access-Control-Allow-Origin: <origin>|*` fejlécet az
`Access-Control-Allow-Credentials: true` fejléccel együtt. Ez az egyetlen olyan
felület, ahol az eredet visszatükrözése és a hitelesítési adatok együttesen vannak
jelen, és ez **független a `CORS_ALLOW_ALL` beállítástól**. Ezek a felügyeleti
hitelesítést használó útvonalak (`requireManagementAuth`); azoknak az
üzemeltetőknek, akik a gazdagépen kívülről is elérhetővé teszik az irányítópultot,
tudniuk kell, hogy ez az egyetlen hely, ahol a válaszfejlécek lehetővé teszik a
hitelesítési adatokat tartalmazó, más eredetű olvasást. Ennek explicit
engedélyezési listára szűkítését a jelen CORS-útmutatástól elkülönítve követjük
nyomon.

## Éles környezet ellenőrzőlistája

- **Éles környezetben soha ne állítsa be a `CORS_ALLOW_ALL=true` értéket.** Hagyja beállítatlanul.
- Adjon meg **explicit** eredetlistát — akár a környezeti változóval, akár a Biztonság lap mezőjében:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ha az OmniRoute fordított proxy / alagút (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) mögött fut, a CORS **nem** az egyetlen védelmi mechanizmus — a loopback útvonalvédő
  továbbra is védi a folyamatindításra képes útvonalakat (lásd:
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ne hamisítsa meg az
  `X-Forwarded-For: 127.0.0.1` fejlécet egy 403-as hiba „javításához”; ezzel ismét megnyitná azt az RCE-sebezhetőségi
  osztályt, amelyet az útvonalvédő lezár.
- Ellenőrizze a futásidejű állapotot: az irányítópult egy **állandó borostyánszínű figyelmeztetősávot**
  jelenít meg az Irányítópult → Biztonság → Engedélyezési leltár alatt, amikor a
  `CORS_ALLOW_ALL=true` aktív, a `/api/settings/authz-inventory` pedig egy
  `cors: { allowAll, allowedOrigins }` burkolóobjektumot ad vissza, amelyet a megfigyelőeszközök rendszeresen lekérdezhetnek.

## Fejlesztési kényelem — meghatározott helyi eredetek engedélyezése

Még fejlesztéskor is ritkán van szükség helyettesítő karakterre. Csak a ténylegesen használt fejlesztői kiszolgálókat engedélyezze:

```bash
# Vite (5173) + Next.js (3000) fejlesztői kiszolgálók, amelyek egy helyi OmniRoute-ot hívnak
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Az eredetek összehasonlítása nem érzékeny a kis- és nagybetűkre, a záró perjelet pedig figyelmen kívül hagyja, így a
`http://localhost:3000` és a `http://localhost:3000/` egyenértékű. Ugyanez a CSV
újraindítás nélkül, futásidőben is beállítható az **Irányítópult → Biztonság → Engedélyezett CORS-eredetek** alatt.

## API-kulcsok és sütialapú munkamenetek

- **Bearer / `x-api-key` (a `/v1/*` következtetési felület):** a böngészők ezeket soha nem csatolják
  automatikusan. A CORS itt nem jelent érdemi akadályt — az API-kulcs jelenti
  az akadályt —, ezért ez a felület szándékosan megengedő, hogy a böngészős és
  Electron-kliensek elolvashassák azokat a válaszokat, amelyekhez már egyébként is jogosultságuk van.
- **Sütialapú munkamenet (az irányítópult):** a hiba esetén tiltó alapértelmezés **és**
  az `Access-Control-Allow-Credentials` hiánya védi a megosztott útvonalon. A
  felügyeleti/irányítópulti eredeteket ne vegye fel semmilyen megengedő konfigurációba; ezeknek továbbra is
  szigorúan hiba esetén tiltó módon kell működniük.

## Példa: fordított proxy az OmniRoute előtt

A CORS-t maga az OmniRoute kényszeríti ki, ezért a proxy általában **nem** adhat hozzá és
nem írhat át `Access-Control-*` fejléceket (a kettős fejlécek hibát okoznak a böngészőkben). Végezze el a TLS
lezárását és a továbbítást — az előzetes kérésre az OmniRoute válaszoljon:

```nginx
# nginx — továbbítás az OmniRoute felé; itt NE szúrjon be Access-Control-* fejléceket
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NE állítsa az X-Forwarded-For értékét 127.0.0.1-re — ez hatástalanítja a loopback útvonalvédőt.
}
```

Az engedélyezett böngészőeredeteket az OmniRoute-ban (`CORS_ALLOWED_ORIGINS` vagy a
Biztonság lapon), ne pedig a proxyban állítsa be.

## Forrásfájlok

| Terület                                           | Fájl                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Engedélyezési lista feloldása + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware alkalmazása (egyetlen hiteles forrás)  | `src/server/authz/pipeline.ts`                                       |
| Beállítások → eredetek futásidejű beillesztése    | `src/lib/config/runtimeSettings.ts`                                  |
| Futásidejű állapot az irányítópult számára        | `src/app/api/settings/authz-inventory/route.ts`                      |
| Irányítópult figyelmeztetősávja                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Engedélyezett CORS-eredetek mező                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent útvonalankénti CORS-a (a kivétel)     | `src/lib/cloudAgent/api.ts`                                          |

## Lásd még

- [Útvonalvédelmi szintek](./ROUTE_GUARD_TIERS.md) — loopback-kényszerítés a
  folyamatindításra képes útvonalakhoz (különálló, kiegészítő védelem).
- [Engedélyezési útmutató](../architecture/AUTHZ_GUIDE.md) — a teljes hitelesítési folyamat.
