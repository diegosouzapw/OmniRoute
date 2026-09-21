# CORS Configuration & Security (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrolira koja **izvorišta preglednika** smiju čitati odgovore iz drugih izvorišta
putem jednog centraliziranog popisa dopuštenih izvorišta. Model je **prema zadanim postavkama zatvoren**:
nijedno izvorište nije dopušteno dok ga izričito ne omogućite. Ova stranica opisuje kako se popis dopuštenih
izvorišta razrješava, što `CORS_ALLOW_ALL=true` zapravo izlaže (i, što je važno, što
**ne** izlaže), kako sigurno konfigurirati razvojno i produkcijsko okruženje te upozorenje tijekom izvođenja
koje nadzorna ploča prikazuje kada je zamjenski znak aktivan.

**Izvor istine:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Popis dopuštenih izvorišta primjenjuje se jednom, u
međuprogramu (`src/server/authz/pipeline.ts`) — obrađivači pojedinačnih ruta ne postavljaju
sami `Access-Control-Allow-Origin`.

## Kako se izvorište razrješava

Za svaki zahtjev međuprogram izračunava vrijednost `Access-Control-Allow-Origin`
sljedećim redoslijedom:

1. **`CORS_ALLOW_ALL=true`** (ili naslijeđeni `CORS_ORIGIN=*`) → vraća pozivateljevo
   `Origin` izvorište (ili `*` kada nema zaglavlja `Origin`), uz `Vary: Origin`
   kako bi predmemorije ostale ispravne. Ista kontrolna točka `applyCorsHeaders()` također dodaje
   `Vary: Accept-Encoding` svakom 2xx odgovoru s tijelom na površini `/v1*`/`/v1beta*`
   autentificiranoj tokenom (`relaxForTokenAuth`, RFC 9110 §12.5.5, problem #6737), kako bi
   nizvodne/dijeljene predmemorije mogle ispravno razlikovati komprimirane i nekomprimirane
   inačice.
2. U suprotnom se `Origin` zahtjeva normalizira (pretvara u mala slova i uklanja mu se završna kosa crta)
   te uspoređuje sa **spojenim popisom dopuštenih izvorišta**:
   - varijabla okruženja **`CORS_ALLOWED_ORIGINS`** — popis odvojen zarezima i
   - postavka **`corsOrigins`** tijekom izvođenja (Nadzorna ploča → Sigurnost → _Dopuštena CORS
     izvorišta_), umetnuta putem `setRuntimeAllowedOrigins()` iz
     `src/lib/config/runtimeSettings.ts`.
3. Nema podudaranja → **ne emitira se zaglavlje `Access-Control-Allow-Origin`**. Preglednik
   blokira čitanje iz drugog izvorišta. To je predviđeno zadano ponašanje zatvaranja pristupa.

| Varijabla okruženja    | Značenje                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV popis točnih izvorišta koja se dopuštaju (preporučeno).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → vraća bilo koje izvorište (zamjenski znak). Samo za razvoj.                                   |
| `CORS_ORIGIN`          | Naslijeđeno. `*` se ponaša kao `CORS_ALLOW_ALL`; jedna vrijednost dodaje se na popis dopuštenih izvorišta. |

## Model prijetnji — što `CORS_ALLOW_ALL=true` zapravo izlaže

Generičko upozorenje OWASP-a („CORS sa zamjenskim znakom = bilo koja web-lokacija može pozvati vaš API”) vrijedi
shvatiti ozbiljno, ali izloženost OmniRoutea **uža je od generičkog slučaja**
zbog jedne konkretne implementacijske činjenice:

> **Središnji `applyCorsHeaders()` nikada ne emitira
> `Access-Control-Allow-Credentials`.** Preglednik neće izložiti _autentificirani_
> odgovor iz drugog izvorišta (koji sadrži kolačić) osim ako poslužitelj pošalje
> `Access-Control-Allow-Credentials: true`. OmniRouteov zajednički CORS put to nikada
> ne čini.

To za svaku površinu znači sljedeće, čak i uz `CORS_ALLOW_ALL=true`:

| Površina                                  | Mehanizam autentifikacije      | Učinak CORS-a sa zamjenskim znakom                                                                                                                                                                                                                 |
| ----------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna ploča / MANAGEMENT `/api/*`      | Sesija putem kolačića          | Izvorište se vraća, ali **bez `Allow-Credentials`** preglednik **blokira** autentificirano čitanje. Zlonamjerna web-lokacija iz drugog izvorišta **ne može čitati** autentificirane odgovore vaše nadzorne ploče, a sesijski kolačić nije izložen. |
| Klijentski API `/v1/*`, `/v1beta/*`       | Bearer / zaglavlje `x-api-key` | Već je dopušteno **po dizajnu** (`relaxForTokenAuth`): preglednici nikada automatski ne prilažu `Authorization`/`x-api-key`, stoga napadačeva stranica ne može dostaviti vaš ključ. `CORS_ALLOW_ALL` to ne proširuje.                              |
| Javno, samo za čitanje (`/api/health`, …) | Nema                           | Nije osjetljivo; zamjenski znak je bezopasan.                                                                                                                                                                                                      |

Stoga je **preostala** izloženost postavke `CORS_ALLOW_ALL=true` ograničena na: (a)
neautentificirana čitanja iz drugih izvorišta već javno dostupnih podataka i (b)
omogućavanje prolaska CORS **predzahtjeva** na upravljačkim rutama — koje i dalje zahtijevaju autentifikaciju
koju stranica iz drugog izvorišta ne može pružiti. To **nije** vektor za otmicu sesije ili
krađu vjerodajnica na zajedničkom CORS putu.

### Jedna stvarna iznimka — `/api/v1/agents/`

Rute Cloud-Agenta (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) postavljaju
vlastita CORS zaglavlja
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **emitiraju**
`Access-Control-Allow-Origin: <origin>|*` zajedno s
`Access-Control-Allow-Credentials: true`. To je jedina površina na kojoj
vraćanje izvorišta i vjerodajnice postoje zajedno te je **neovisna o
`CORS_ALLOW_ALL`**. Te su rute autentificirane za upravljanje
(`requireManagementAuth`); operateri koji izlažu nadzornu ploču izvan lokalnog računala trebaju biti
svjesni da je to jedino mjesto na kojem zaglavlja odgovora dopuštaju autentificirano čitanje iz
drugog izvorišta. Ograničavanje na izričit popis dopuštenih izvorišta prati se
odvojeno od ovih CORS smjernica.

## Kontrolni popis za produkciju

- **Nikada ne postavljajte `CORS_ALLOW_ALL=true` u produkciji.** Ostavite tu varijablu nepostavljenom.
- Postavite **izričit** popis izvora — putem varijable okruženja ili polja na kartici Sigurnost:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ako se OmniRoute izvodi iza obrnutog proxyja / tunela (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **nije** jedina kontrola — zaštita ruta za povratnu petlju
  i dalje štiti rute koje mogu pokretati procese (pogledajte
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nemojte krivotvoriti
  `X-Forwarded-For: 127.0.0.1` kako biste „ispravili” pogrešku 403; time se ponovno otvara klasa RCE ranjivosti
  koju zaštita ruta zatvara.
- Potvrdite stanje tijekom izvođenja: nadzorna ploča prikazuje **trajni jantarni natpis**
  u Nadzorna ploča → Sigurnost → Inventar autorizacije kad god je
  `CORS_ALLOW_ALL=true` aktivan, a `/api/settings/authz-inventory` vraća
  omotnicu `cors: { allowAll, allowedOrigins }` koju alati za nadzor mogu periodički provjeravati.

## Praktičnost tijekom razvoja — dopustite određene lokalne izvore

Čak vam je i tijekom razvoja zamjenski znak rijetko potreban. Dopustite samo razvojne poslužitelje koje upotrebljavate:

```bash
# Razvojni poslužitelji Vite (5173) + Next.js (3000) koji pozivaju lokalni OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izvori se uspoređuju bez obzira na velika i mala slova, a završna kosa crta se zanemaruje, pa su
`http://localhost:3000` i `http://localhost:3000/` ekvivalentni. Isti CSV
može se postaviti tijekom izvođenja u **Nadzorna ploča → Sigurnost → Dopušteni CORS izvori** bez
ponovnog pokretanja.

## API ključevi u odnosu na sesije s kolačićima

- **Bearer / `x-api-key` (sučelje za zaključivanje `/v1/*`):** preglednici ih nikada ne prilažu
  automatski. CORS ovdje nije značajna prepreka — prepreka je API ključ
  — zbog čega je to sučelje namjerno permisivno kako bi preglednički i
  Electron klijenti mogli čitati odgovore na koje već imaju pravo.
- **Sesija s kolačićem (nadzorna ploča):** zaštićena je zadanim ponašanjem koje odbija pristup u slučaju pogreške **i**
  izostankom zaglavlja `Access-Control-Allow-Credentials` na zajedničkoj putanji. Ne uključujte
  izvore za upravljanje/nadzornu ploču ni u jednu permisivnu konfiguraciju; za njih se mora i dalje
  strogo primjenjivati odbijanje pristupa u slučaju pogreške.

## Primjer: obrnuti proxy ispred OmniRoutea

CORS provodi sam OmniRoute, stoga proxy u pravilu **ne bi trebao** dodavati ni
prepisivati zaglavlja `Access-Control-*` (dvostruka zaglavlja uzrokuju probleme u preglednicima). Završite TLS
i proslijedite zahtjev — prepustite OmniRouteu da odgovori na predprovjeru:

```nginx
# nginx — proslijedi na OmniRoute; ovdje NEMOJ umetati Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NEMOJ postaviti X-Forwarded-For na 127.0.0.1 — time se zaobilazi zaštita ruta za povratnu petlju.
}
```

Postavite dopuštene izvore preglednika u OmniRouteu (`CORS_ALLOWED_ORIGINS` ili na
kartici Sigurnost), a ne u proxyju.

## Izvorne datoteke

| Područje                                             | Datoteka                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Razrješavanje popisa dopuštenih + `getCorsStatus()`  | `src/server/cors/origins.ts`                                         |
| Primjena posredničkog softvera (jedini izvor istine) | `src/server/authz/pipeline.ts`                                       |
| Postavke → umetanje izvora tijekom izvođenja         | `src/lib/config/runtimeSettings.ts`                                  |
| Stanje tijekom izvođenja za nadzornu ploču           | `src/app/api/settings/authz-inventory/route.ts`                      |
| Natpis upozorenja na nadzornoj ploči                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Polje Dopušteni CORS izvori                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS po ruti za Cloud-Agent (iznimka)                | `src/lib/cloudAgent/api.ts`                                          |

## Vidi također

- [Razine zaštite ruta](./ROUTE_GUARD_TIERS.md) — obavezna primjena loopbacka za
  rute koje mogu pokretati procese (zasebna, komplementarna kontrola).
- [Vodič za autorizaciju](../architecture/AUTHZ_GUIDE.md) — cjeloviti tijek autorizacije.
