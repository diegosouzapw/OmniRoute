# Management Authentication (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **četiri porodice akreditiva** koje mogu autorizovati rute za upravljanje.
Nisu međusobno zamenljivi. API ključevi za inferencu (`sk-…`) NE upravljaju
serverom osim ako im nije eksplicitno dodeljen `manage` ili `admin` opseg.

Kanonska implementacija: `src/lib/api/requireManagementAuth.ts`.

| Akreditiv                  | Tipičan oblik                          | Kreiran gde                                                | Namena                            | Mogućnost upravljanja                                                                               |
| :------------------------- | :------------------------------------- | :--------------------------------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------- |
| JWT sesija kontrolne table | `auth_token` kolačić                   | Prijava na kontrolnu tablu                                 | Korisnički interfejs pretraživača | Potpuno upravljanje kontrolnom tablom, podložno CSRF-u, lokalitetu i pravilima uvek zaštićenih ruta |
| CLI token ID-a mašine      | interni / lokalni                      | CLI pokretanje (`omniroute` na istoj mašini)               | Lokalni CLI                       | Samo lokalno upravljanje                                                                            |
| Opsežni pristupni token    | `oma_live_…`                           | **Podešavanja → Pristupni tokeni** ili `omniroute connect` | Udaljeni CLI i API za upravljanje | Mora zadovoljiti zahtevani `read`, `write` ili `admin` opseg rute                                   |
| API ključ za inferencu     | `sk-…` (i drugi prefiksi API ključeva) | **API menadžer / API ključevi**                            | inferenca `/v1/*`                 | **Nijedna** osim ako metapodaci ključa ne uključuju `manage` ili `admin`                            |

`oma_` akreditivi su akreditivi za upravljanje/CLI. Oni NISU API ključevi za inferencu.

Ako je prijava/API-ključ autentifikacija onemogućena za server, neke rute za upravljanje mogu
prihvatiti neautentifikovane pozive. Rute samo za lokalno korišćenje i uvek zaštićene rute i dalje primenjuju
sopstvena pravila. Predstavljanje jednog od ovih akreditiva stoga nije univerzalno
obavezno, a posedovanje jednog nije univerzalno dovoljno bez zahtevanog
opsega i lokaliteta rute.

Povezano: [Remote Mode](./REMOTE-MODE.md) (kako se `oma_live_…` izdaje za udaljeni CLI).

---

## Matrice opsega

Opsezi za upravljanje API ključevima i opsezi pristupnih tokena su različiti rečnici.
Opsezi MCP alata su treći rečnik, proveravaju se pomoću `scopeMatches` umesto
bilo koje funkcije u tabelama ispod. Uporedo:
[Tri imenska prostora opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Opsezi pristupnog tokena (`oma_live_…`)

| Opseg   | Tipične operacije                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------------- |
| `read`  | GET zahtevi za listanje/status koje token sme da vidi                                                |
| `write` | Mutacije (kreiranje/ažuriranje/brisanje) ispod administratorskog nivoa                               |
| `admin` | Potpuni daljinski CLI / token za povezivanje (podrazumevane vrednosti za pokretanje lozinke su ovde) |

Token sa `read` ne može pozvati `write` rutu. Oblik poruke tokom izvršavanja:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Opsezi za upravljanje API ključevima

| Opseg     | Značenje                                                                      |
| --------- | ----------------------------------------------------------------------------- |
| (nijedan) | Samo zaključivanje. Rute za upravljanje vraćaju 403.                          |
| `manage`  | API za upravljanje (ista kapija kao `requireManagementAuth` grana API ključa) |
| `admin`   | Takođe zadovoljava `hasManageScope` (tretira se kao sposoban za upravljanje)  |

Omogućite `manage` na ključu u korisničkom interfejsu API Keys / API Manager.
Nemojte ponovo koristiti ključ klijenta za ćaskanje za automatizaciju osim ako namerno niste dodelili taj opseg.

---

## Како креирати и опозвати

### Dashboard JWT сесија

1. Отворите `/login` и пријавите се лозинком за управљање (`INITIAL_PASSWORD` при првом покретању).
2. Колачић `auth_token` је HttpOnly. Контролна табла у прегледачу га аутоматски користи.
3. Одјавите се путем `/api/auth/logout`. Не постоји дуготрајна тајна коју треба копирати.

### CLI machine-id токен

1. Покрените `omniroute` на **истом хосту** као сервер (loopback).
2. CLI иницијализује machine-id токен у `~/.omniroute/` (chmod 600).
3. Ово **не** функционише са другог рачунара. За удаљени CLI користите приступни токен.

### Приступни токен са опсегом (`oma_live_…`)

1. Контролна табла: **Подешавања → Приступни токени** → креирајте токен (назив + опсег). **Тајна се приказује само једном.**
2. Или CLI: `omniroute connect <host>` (лозинка → токен). Погледајте [Удаљени режим](./REMOTE-MODE.md).
3. Заглавље: `Authorization: Bearer oma_live_…`
4. Опозовите га на истој страници Приступни токени (или избришите CLI контекст).
5. Сервер чува само хеш. Са отвореним текстом поступајте као са лозинком.

### API кључ са опсегом `manage`

1. Контролна табла: **Менаџер API-ја / API кључеви** → креирајте или измените кључ → омогућите `manage` (или `admin`).
2. Заглавље: `Authorization: Bearer sk-…` (стварни префикс кључа).
3. Опозовите кључ или уклоните `manage` у истом корисничком интерфејсу.
4. За аутоматизацију која не користи CLI примените начело најмањих привилегија: за послове који користе само GET захтеве изаберите приступни токен са опсегом `read`; користите `manage` на API кључу само када позивалац мора да комуницира и са `/v1` и са интерфејсом за управљање.

---

## Формат заглавља

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Немојте стављати акредитиве за управљање у путању URL-а или у параметре упита. Аутентификација за управљање дозвољена је само путем заглавља/колачића.

---

## Примери за копирање и лепљење

Само за читање (листа провајдера). Користите приступни токен са опсегом `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Измена (креирање везе са провајдером). Користите приступни токен са опсегом `write`/`admin` или API кључ са опсегом `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Инференција (није управљање). Обичан API кључ; `manage` није потребан:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutne greške pri izvršavanju (ne prikazivati tajne)

| Situacija                                        | Tipičan status | Poruka (sanitizovana)                                                |
| :----------------------------------------------- | :------------- | :------------------------------------------------------------------- |
| Nema akreditiva                                  | 401            | `Authentication required`                                            |
| Nevažeći/istekao `oma_live_…`                    | 401            | `Invalid or expired access token`                                    |
| Važeći API ključ bez `manage`/`admin`            | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nevažeći običan API ključ na ruti za upravljanje | 403            | `Invalid management token`                                           |
| Opseg pristupnog tokena je prenizak              | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Nevažeći token za upravljanje“ znači da nosilac **nije** prihvaćen kao akreditiv za upravljanje. To vam **ne** govori koju porodicu da kreirate. Koristite gornju tabelu: ključevi za inferenciju zahtevaju `manage` opseg; udaljeni CLI zahteva `oma_live_…`; kontrolna tabla koristi kolačić sesije.

---

## Preporučeni izbor najmanjih privilegija

| Pozivalac                                            | Upotreba                                           |
| :--------------------------------------------------- | :------------------------------------------------- |
| Pretraživač                                          | Sesija kontrolne table                             |
| CLI na hostu servera                                 | Mašinski token                                     |
| CLI na laptopu koji komunicira sa udaljenim serverom | `oma_live_…` iz `omniroute connect`                |
| CI / skripte (samo za upravljanje)                   | `oma_live_…` sa najmanjim opsegom koji funkcioniše |
| CI koji mora pozvati i `/v1` i `/api`                | API ključ sa `manage` **ili** dve akreditacije     |
