# CORS Configuration & Security (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontroliše koja **izvorišta pregledača** mogu da čitaju odgovore između različitih izvorišta
pomoću jedinstvene, centralizovane liste dozvoljenih izvorišta. Model je **podrazumevano zatvoren**:
nijedno izvorište nije dozvoljeno dok ga izričito ne omogućite. Ova stranica opisuje kako se lista dozvoljenih
izvorišta razrešava, šta `CORS_ALLOW_ALL=true` zaista izlaže (i, što je važno, šta
**ne izlaže**), kako bezbedno konfigurisati razvojno i produkciono okruženje i upozorenje tokom izvršavanja
koje kontrolna tabla prikazuje kada je džoker aktivan.

**Izvor istine:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Lista dozvoljenih izvorišta primenjuje se jednom, u
posredničkom softveru (`src/server/authz/pipeline.ts`) — obrađivači pojedinačnih ruta ne postavljaju
samostalno `Access-Control-Allow-Origin`.

## Kako se izvorište razrešava

Za svaki zahtev posrednički softver izračunava vrednost `Access-Control-Allow-Origin`
sledećim redosledom:

1. **`CORS_ALLOW_ALL=true`** (ili zastareli `CORS_ORIGIN=*`) → vraća pošiljaočevo
   `Origin` izvorište (ili `*` kada zaglavlje `Origin` ne postoji), uz `Vary: Origin`
   kako bi keširanje ostalo ispravno. Ista centralna tačka `applyCorsHeaders()` takođe dodaje
   `Vary: Accept-Encoding` svakom 2xx odgovoru sa telom na površini
   `/v1*`/`/v1beta*` autentifikovanoj tokenom (`relaxForTokenAuth`, RFC 9110 §12.5.5, problem #6737), kako bi
   nizvodni/deljeni keševi mogli ispravno da razlikuju komprimovane od nekomprimovanih
   varijanti.
2. U suprotnom, `Origin` zahteva se normalizuje (pretvara u mala slova, uklanja se
   završna kosa crta) i poredi sa **objedinjenom listom dozvoljenih izvorišta**:
   - promenljiva okruženja **`CORS_ALLOWED_ORIGINS`** — lista razdvojena zarezima, i
   - podešavanje **`corsOrigins`** tokom izvršavanja (Kontrolna tabla → Bezbednost → _Dozvoljena CORS
     izvorišta_), koje se prosleđuje putem `setRuntimeAllowedOrigins()` iz
     `src/lib/config/runtimeSettings.ts`.
3. Nema podudaranja → **zaglavlje `Access-Control-Allow-Origin` se ne emituje**. Pregledač
   blokira čitanje između različitih izvorišta. Ovo je predviđeno podrazumevano zatvoreno ponašanje.

| Promenljiva okruženja  | Značenje                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV lista tačnih izvorišta koja treba dozvoliti (preporučeno).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → vraća bilo koje izvorište (džoker). Samo za razvoj.                                              |
| `CORS_ORIGIN`          | Zastarelo. `*` se ponaša kao `CORS_ALLOW_ALL`; pojedinačna vrednost dodaje se na listu dozvoljenih izvorišta. |

## Model pretnji — šta `CORS_ALLOW_ALL=true` zaista izlaže

Generičko OWASP upozorenje („CORS sa džokerom = bilo koja lokacija može da pozove vaš API“) treba
shvatiti ozbiljno, ali izloženost OmniRoute-a je **uža nego u generičkom slučaju**,
zbog jedne konkretne implementacione činjenice:

> **Centralna funkcija `applyCorsHeaders()` nikada ne emituje
> `Access-Control-Allow-Credentials`.** Pregledač neće izložiti odgovor između različitih izvorišta
> _sa akreditivima_ (koji sadrži kolačiće), osim ako server pošalje
> `Access-Control-Allow-Credentials: true`. Deljena CORS putanja OmniRoute-a to nikada
> ne radi.

Šta to znači za svaku površinu, čak i uz `CORS_ALLOW_ALL=true`:

| Površina                                  | Mehanizam autentifikacije      | Efekat CORS džokera                                                                                                                                                                                                                          |
| ----------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kontrolna tabla / UPRAVLJANJE `/api/*`    | Sesija zasnovana na kolačiću   | Izvorište se vraća, ali **bez `Allow-Credentials`** pregledač **blokira** čitanje sa akreditivima. Zlonamerna lokacija sa drugog izvorišta **ne može da čita** vaše autentifikovane odgovore kontrolne table, a kolačić sesije nije izložen. |
| Klijentski API `/v1/*`, `/v1beta/*`       | Bearer / zaglavlje `x-api-key` | Već je dopuštajuće **po dizajnu** (`relaxForTokenAuth`): pregledači nikada automatski ne dodaju `Authorization`/`x-api-key`, pa stranica napadača ne može da prosledi vaš ključ. `CORS_ALLOW_ALL` ovo ne proširuje.                          |
| Javno, samo za čitanje (`/api/health`, …) | Nema                           | Nije osetljivo; džoker je bezopasan.                                                                                                                                                                                                         |

Prema tome, **preostala** izloženost opcije `CORS_ALLOW_ALL=true` ograničena je na: (a)
čitanje već neautentifikovanih podataka između različitih izvorišta **bez akreditiva** i (b)
omogućavanje prolaska CORS **preliminarnog zahteva** na upravljačkim rutama — koje i dalje zahtevaju autentifikaciju
koju stranica sa drugog izvorišta ne može da obezbedi. To **nije** vektor za preotimanje sesije ili
krađu akreditiva na deljenoj CORS putanji.

### Jedan stvarni izuzetak — `/api/v1/agents/`

Cloud-Agent rute (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) postavljaju
sopstvena CORS zaglavlja
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **emituju**
`Access-Control-Allow-Origin: <origin>|*` zajedno sa
`Access-Control-Allow-Credentials: true`. Ovo je jedina površina na kojoj
vraćanje izvorišta i akreditivi postoje istovremeno i ona je **nezavisna od
`CORS_ALLOW_ALL`**. Ove rute su autentifikovane za upravljanje
(`requireManagementAuth`); operateri koji izlažu kontrolnu tablu van lokalnog računara treba da
imaju u vidu da je ovo jedino mesto gde zaglavlja odgovora dozvoljavaju čitanje
sa akreditivima između različitih izvorišta. Njeno ograničavanje na eksplicitnu listu dozvoljenih izvorišta prati se
odvojeno od ovih smernica za CORS.

## Контролна листа за продукционо окружење

- **Никада не постављајте `CORS_ALLOW_ALL=true` у продукционом окружењу.** Оставите га неподешеним.
- Поставите **експлицитну** листу извора — било путем променљиве окружења било путем поља на картици Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ако OmniRoute ради иза реверзног проксија / тунела (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **није** једина контрола — заштита рута за локалну
  петљу и даље штити руте које могу да покрећу процесе (погледајте
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Немојте лажирати
  `X-Forwarded-For: 127.0.0.1` да бисте „исправили“ грешку 403; тиме се поново
  отвара класа RCE рањивости коју заштита рута затвара.
- Потврдите стање током извршавања: контролна табла приказује **трајни банер боје ћилибара**
  у Dashboard → Security → Authorization Inventory кад год је
  `CORS_ALLOW_ALL=true` активно, а `/api/settings/authz-inventory` враћа
  омотач `cors: { allowAll, allowedOrigins }` који алати за надзор могу периодично да проверавају.

## Погодност током развоја — дозволите одређене локалне изворе

Чак и током развоја ретко вам је потребан џокер. Дозволите само развојне сервере које користите:

```bash
# Развојни сервери Vite (5173) + Next.js (3000) који позивају локални OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Извори се упоређују без обзира на величину слова, а завршна коса црта се занемарује, тако да су
`http://localhost:3000` и `http://localhost:3000/` еквивалентни. Иста CSV листа
може се подесити током извршавања у **Dashboard → Security → CORS Allowed Origins** без
поновног покретања.

## API кључеви у односу на сесије са колачићима

- **Bearer / `x-api-key` (површина за закључивање `/v1/*`):** прегледачи их никада не прилажу
  аутоматски. CORS овде није значајна препрека — API кључ представља
  препреку — због чега је та површина намерно пермисивна како би прегледачки и
  Electron клијенти могли да читају одговоре на које већ имају право.
- **Сесија са колачићима (контролна табла):** заштићена је подразумеваним режимом који у случају
  грешке забрањује приступ **и** одсуством заглавља `Access-Control-Allow-Credentials` на дељеној
  путањи. Немојте укључивати изворе за управљање/контролну таблу у било коју пермисивну
  конфигурацију; за њих приступ мора остати строго подразумевано забрањен.

## Пример: реверзни прокси испред OmniRoute-а

CORS примењује сам OmniRoute, тако да прокси углавном **не би требало** да додаје или
преписује заглавља `Access-Control-*` (дуплирана заглавља ометају прегледаче). Завршите TLS
и проследите захтев — препустите OmniRoute-у да одговори на прелиминарни захтев:

```nginx
# nginx — проследите ка OmniRoute-у; овде НЕ убацујте Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # НЕ постављајте X-Forwarded-For на 127.0.0.1 — тиме се онемогућава заштита рута за локалну петљу.
}
```

Подесите дозвољене изворе прегледача у OmniRoute-у (`CORS_ALLOWED_ORIGINS` или на картици
Security), а не у проксију.

## Изворне датотеке

| Област                                              | Датотека                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Разрешавање листе дозвољених + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Примена посредничког софтвера (једини извор истине) | `src/server/authz/pipeline.ts`                                       |
| Settings → убацивање извора током извршавања        | `src/lib/config/runtimeSettings.ts`                                  |
| Статус током извршавања за контролну таблу          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Банер упозорења на контролној табли                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Поље CORS Allowed Origins                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS по рути за Cloud-Agent (изузетак)              | `src/lib/cloudAgent/api.ts`                                          |

## Види такође

- [Нивои заштите рута](./ROUTE_GUARD_TIERS.md) — примена ограничења на loopback интерфејс за
  руте које могу да покрећу процесе (засебна, комплементарна контрола).
- [Водич за ауторизацију](../architecture/AUTHZ_GUIDE.md) — комплетан процес аутентификације и ауторизације.
