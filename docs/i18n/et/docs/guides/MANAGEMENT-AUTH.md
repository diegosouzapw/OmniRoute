# Management Authentication (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute'il on **neli mandaatide perekonda**, mis saavad autoriseerida haldusmarsruute.
Need ei ole omavahel asendatavad. Järeldus-API võtmed (`sk-…`) **ei** halda
serverit, välja arvatud juhul, kui neile on selgesõnaliselt antud `manage` või `admin` ulatus.

Kanooniline implementatsioon: `src/lib/api/requireManagementAuth.ts`.

| Mandaat                 | Tüüpiline vorm                       | Loodud kus                                         | Kavandatud kasutusala   | Haldusvõimekus                                                                                       |
| :---------------------- | :----------------------------------- | :------------------------------------------------- | :---------------------- | :--------------------------------------------------------------------------------------------------- |
| Armatuurlaua JWT seanss | `auth_token` küpsis                  | Armatuurlaua sisselogimine                         | Brauseri kasutajaliides | Täielik armatuurlaua haldus, vastavalt CSRF-ile, lokaalsusele ja alati kaitstud marsruudi reeglitele |
| CLI masina-ID token     | sisemine / lokaalne                  | CLI alglaadimine (`omniroute` samal masinal)       | Kohalik CLI             | Ainult kohalik haldus                                                                                |
| Ulatuslik pääsmetoken   | `oma_live_…`                         | **Seaded → Pääsmetokenid** või `omniroute connect` | Kaug-CLI ja haldus-API  | Peab vastama marsruudi nõutavale `read`, `write` või `admin` ulatusele                               |
| Järeldus-API võti       | `sk-…` (ja muud API-võtme prefiksid) | **API haldur / API võtmed**                        | `/v1/*` järeldus        | **Puudub**, välja arvatud juhul, kui võtme metaandmed sisaldavad `manage` või `admin`                |

`oma_` mandaadid on haldus-/CLI-mandaadid. Need **ei ole** järeldus-API võtmed.

Kui serveri jaoks on sisselogimine/API-võtme autentimine keelatud, võivad mõned haldusmarsruudid
aktsepteerida autentimata kõnesid. Ainult kohalikud ja alati kaitstud marsruudid rakendavad
endiselt oma reegleid. Seetõttu ei ole ühegi mandaadi esitamine universaalselt
kohustuslik ja selle omamine ei ole universaalselt piisav ilma nõutava
ulatuse ja marsruudi lokaalsuseta.

Seotud: [Kaugrežiim](./REMOTE-MODE.md) (kuidas `oma_live_…` kaug-CLI jaoks vermitakse).

---

## Ulatuse maatriksid

API-võtme halduse ulatused ja pääsutokeni ulatused on erinevad sõnavarad.
MCP tööriista ulatused on kolmas sõnavara, mida kontrollitakse `scopeMatches` abil, mitte
kummagi allolevas tabelis oleva funktsiooniga. Kõrvuti:
[Kolm ulatuse nimeruumi](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Pääsutokeni ulatused (`oma_live_…`)

| Ulatus  | Tüüpilised toimingud                                                         |
| ------- | ---------------------------------------------------------------------------- |
| `read`  | Nimekirja/oleku GET-päringud, mida tokenil on lubatud näha                   |
| `write` | Mutatsioonid (loomine/uuendamine/kustutamine) allpool administraatori taset  |
| `admin` | Täielik kaug-CLI / ühenduse token (siin on parooli alglaadimise vaikeseaded) |

Token, millel on `read` ulatus, ei saa kutsuda `write` marsruuti. Käitusaja sõnumi kuju:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-võtme halduse ulatused

| Ulatus   | Tähendus                                                             |
| -------- | -------------------------------------------------------------------- |
| (puudub) | Ainult järeldus. Halduse marsruudid tagastavad 403.                  |
| `manage` | Halduse API (sama värav nagu `requireManagementAuth` API-võtme haru) |
| `admin`  | Rahuldab ka `hasManageScope` (käsitletakse haldusvõimelisena)        |

Luba `manage` võtmel API Keys / API Manageri kasutajaliideses. Ära kasuta
vestlusrakenduse kliendi võtit automatiseerimiseks uuesti, välja arvatud juhul, kui olete selle ulatuse teadlikult andnud.

---

## Loomine ja tühistamine

### Juhtpaneeli JWT-seanss

1. Avage `/login` ja logige sisse haldusparooliga (esmakordsel käivitamisel `INITIAL_PASSWORD`).
2. Küpsis `auth_token` on HttpOnly. Brauseri juhtpaneel kasutab seda automaatselt.
3. Logige välja marsruudi `/api/auth/logout` kaudu. Kopeeritavat pikaajalist saladust ei ole.

### CLI masina ID token

1. Käivitage `omniroute` serveriga **samas hostis** (tagasisideaadressil).
2. CLI algseadistab masina ID tokeni kataloogis `~/.omniroute/` (chmod 600).
3. See **ei** tööta teisest masinast. Kasutage kaug-CLI jaoks pääsutokenit.

### Ulatusega pääsutoken (`oma_live_…`)

1. Juhtpaneel: **Seaded → Pääsutokenid** → loo (nimi + ulatus). **Saladust kuvatakse ainult üks kord.**
2. Või CLI: `omniroute connect <host>` (parool → token). Vaadake jaotist [Kaugrežiim](./REMOTE-MODE.md).
3. Päis: `Authorization: Bearer oma_live_…`
4. Tühistage see samal pääsutokenite lehel (või kustutage CLI kontekst).
5. Server talletab ainult räsi. Käsitlege lihtteksti nagu parooli.

### Ulatusega `manage` API-võti

1. Juhtpaneel: **API-haldur / API-võtmed** → looge või muutke võtit → lubage `manage` (või `admin`).
2. Päis: `Authorization: Bearer sk-…` (võtme tegelik prefiks).
3. Tühistage võti või eemaldage `manage` samas kasutajaliideses.
4. Vähimate õiguste põhimõte automatiseerimise puhul, mis ei kasuta CLI-d: eelistage ainult GET-päringuid tegevate tööde jaoks `read`-pääsutokenit; kasutage API-võtmel ulatust `manage` ainult siis, kui kutsuja peab suhtlema nii `/v1` kui ka haldusliidesega.

---

## Päise vorming

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ärge pange halduse autentimisandmeid URL-i teesse ega päringustringi. Halduse
autentimine toimub ainult päise või küpsise kaudu.

---

## Kopeeritavad näited

Kirjutuskaitstud (teenusepakkujate loendi kuvamine). Kasutage `read` juurdepääsuluba:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Muutmine (teenusepakkuja ühenduse loomine). Kasutage `write`/`admin` juurdepääsuluba või
`manage`-ulatusega API-võtit:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Järeldamine (mitte haldus). Tavaline API-võti, `manage` pole nõutav:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Praegused käitusaja vead (ära kajasta saladusi)

| Olukord                                        | Tavaline staatus | Sõnum (puhastatud)                                                   |
| :--------------------------------------------- | :--------------- | :------------------------------------------------------------------- |
| Puuduvad mandaadid                             | 401              | `Authentication required`                                            |
| Kehtetu/aegunud `oma_live_…`                   | 401              | `Invalid or expired access token`                                    |
| Kehtiv API võti ilma `manage`/`admin` õiguseta | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Kehtetu tavaline API võti haldusmarsruudil     | 403              | `Invalid management token`                                           |
| Pääsutõendi ulatus liiga madal                 | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" tähendab, et kandjat **ei** aktsepteeritud haldusmandaadina. See **ei** ütle teile, millist perekonda luua. Kasutage ülaltoodud tabelit: järeldusvõtmed vajavad `manage` ulatust; kaug-CLI vajab `oma_live_…`; armatuurlaud kasutab seansiküpsist.

---

## Soovitatav vähima privileegi valik

| Kutsuja                                      | Kasutus                                          |
| -------------------------------------------- | ------------------------------------------------ |
| Brauser                                      | Armatuurlaua seanss                              |
| CLI serveri hostis                           | Masina token                                     |
| CLI sülearvutis, mis suhtleb kaugserveriga   | `oma_live_…` käsust `omniroute connect`          |
| CI / skriptid (ainult haldamiseks)           | `oma_live_…` väikseima toimiva ulatusega         |
| CI, mis peab kutsuma nii `/v1` kui ka `/api` | API võti `manage` õigusega **või** kaks mandaati |
