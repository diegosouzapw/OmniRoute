# Management Authentication (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Az OmniRoute **négy hitelesítő adatcsaláddal** rendelkezik, amelyek felhatalmazhatják a felügyeleti útvonalakat.
Ezek nem felcserélhetők. Az Inference API kulcsok (`sk-…`) **nem** kezelik a
szervert, hacsak nem kaptak kifejezetten `manage` vagy `admin` hatókört.

Kanonikus implementáció: `src/lib/api/requireManagementAuth.ts`.

| Hitelesítő adat                         | Tipikus forma                        | Létrehozás helye                                               | Rendeltetésszerű használat    | Felügyeleti képesség                                                                    |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| Irányítópult JWT munkamenet             | `auth_token` süti                    | Irányítópult bejelentkezés                                     | Böngésző UI                   | Teljes irányítópult-kezelés, CSRF, lokalitás és mindig védett útvonal szabályok szerint |
| CLI gép-azonosító token                 | belső / helyi                        | CLI indítás (`omniroute` ugyanazon a gépen)                    | Helyi CLI                     | Csak helyi felügyelet                                                                   |
| Hatókörrel rendelkező hozzáférési token | `oma_live_…`                         | **Beállítások → Hozzáférési tokenek** vagy `omniroute connect` | Távoli CLI és felügyeleti API | Meg kell felelnie az útvonal szükséges `read`, `write` vagy `admin` hatókörének         |
| Inference API kulcs                     | `sk-…` (és egyéb API-kulcs előtagok) | **API Manager / API Keys**                                     | `/v1/*` inference             | **Nincs**, hacsak a kulcs metaadatai nem tartalmazzák a `manage` vagy `admin` hatókört  |

Az `oma_` hitelesítő adatok felügyeleti/CLI hitelesítő adatok. Ezek **nem** inference API kulcsok.

Ha a bejelentkezés/API-kulcs hitelesítés le van tiltva a szerveren, egyes felügyeleti útvonalak
elfogadhatnak hitelesítés nélküli hívásokat. A csak helyi és mindig védett útvonalak továbbra is
alkalmazzák saját szabályaikat. Ezért az egyik ilyen hitelesítő adat bemutatása nem univerzálisan
kötelező, és egy ilyen birtoklása nem univerzálisan elegendő a szükséges hatókör és útvonal lokalitás nélkül.

Kapcsolódó: [Távoli mód](./REMOTE-MODE.md) (hogyan készül az `oma_live_…` egy távoli CLI-hez).

---

## Hatókör mátrixok

Az API-kulcs felügyeleti hatókörök és a hozzáférési token hatókörök különböző szókincsek.
Az MCP eszköz hatókörök egy harmadik szókincs, amelyet a `scopeMatches` ellenőriz, nem pedig
az alábbi táblázatokban szereplő funkciók. Egymás mellett:
[Három hatókör névtér](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Hozzáférési token hatókörök (`oma_live_…`)

| Hatókör | Tipikus műveletek                                                      |
| ------- | ---------------------------------------------------------------------- |
| `read`  | Listázó/állapot GET kérések, amelyeket a token láthat                  |
| `write` | Módosítások (létrehozás/frissítés/törlés) az admin alatt               |
| `admin` | Teljes távoli CLI / connect token (jelszó indítás alapértelmezett itt) |

Egy `read` hatókörrel rendelkező token nem hívhat `write` útvonalat. Futtatásidejű üzenet formája:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-kulcs felügyeleti hatókörök

| Hatókör  | Jelentés                                                                      |
| -------- | ----------------------------------------------------------------------------- |
| (nincs)  | Csak inference. A felügyeleti útvonalak 403-at adnak vissza.                  |
| `manage` | Felügyeleti API (ugyanaz a kapu, mint a `requireManagementAuth` API-kulcs ág) |
| `admin`  | Kielégíti a `hasManageScope` feltételt is (felügyeletre képesnek tekintve)    |

Engedélyezze a `manage` hatókört a kulcson az API Keys / API Manager UI-ban. Ne használjon újra
egy chat kliens kulcsot automatizáláshoz, hacsak nem szándékosan adta meg azt a hatókört.

---

## Létrehozás és visszavonás

### Irányítópult JWT munkamenet

1.  Nyissa meg a `/login` oldalt, jelentkezzen be a felügyeleti jelszóval (első indításkor az `INITIAL_PASSWORD`).
2.  Az `auth_token` süti HttpOnly. A böngésző irányítópultja automatikusan használja.
3.  Jelentkezzen ki a `/api/auth/logout` címen keresztül. Nincs hosszú élettartamú titok, amit másolni lehetne.

### CLI gépazonosító token

1.  Futtassa az `omniroute` parancsot a szerverrel **azonos gazdagépen** (loopback).
2.  A CLI egy gépazonosító tokent hoz létre a `~/.omniroute/` alatt (chmod 600).
3.  Ez **nem** működik másik gépről. Távoli CLI-hez használjon hozzáférési tokent.

### Hatókörrel rendelkező hozzáférési token (`oma_live_…`)

1.  Irányítópult: **Beállítások → Hozzáférési tokenek** → létrehozás (név + hatókör). **A titok csak egyszer jelenik meg.**
2.  Vagy CLI: `omniroute connect <host>` (jelszó → token). Lásd: [Távoli mód](./REMOTE-MODE.md).
3.  Fejléc: `Authorization: Bearer oma_live_…`
4.  Vonja vissza ugyanazon a Hozzáférési tokenek oldalon (vagy törölje a CLI kontextust).
5.  A szerver csak egy hash-t tárol. Kezelje a nyílt szöveget jelszóként.

### Felügyeleti hatókörű API kulcs

1.  Irányítópult: **API Kezelő / API Kulcsok** → kulcs létrehozása vagy szerkesztése → `manage` (vagy `admin`) engedélyezése.
2.  Fejléc: `Authorization: Bearer sk-…` (a kulcs tényleges előtagja).
3.  Vonja vissza vagy távolítsa el a `manage` jogosultságot ugyanabban a felhasználói felületen.
4.  A legkisebb jogosultság elve az automatizáláshoz, ami nem CLI: preferáljon egy `read` hozzáférési tokent csak GET-feladatokhoz; használjon `manage` jogosultságot egy API kulcson csak akkor, ha a hívónak `/v1` és felügyeleti funkciókat is használnia kell.

---

## Fejléc formátum

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ne tegyen felügyeleti hitelesítő adatokat az URL útvonalba vagy a lekérdezési karakterláncba. A felügyeleti hitelesítés csak fejlécen/sütin keresztül történik.

---

## Másolható példák

Csak olvasható (szolgáltatók listázása). Használjon `read` hozzáférési tokent:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Módosítás (szolgáltatói kapcsolat létrehozása). Használjon `write`/`admin` hozzáférési tokent vagy felügyeleti hatókörű API kulcsot:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Következtetés (nem felügyelet). Hagyományos API kulcs, nincs szükség `manage` jogosultságra:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuális futásidejű hibák (ne írjon ki titkokat)

| Helyzet                                                 | Tipikus állapot | Üzenet (tisztított)                                                  |
| :------------------------------------------------------ | :-------------- | :------------------------------------------------------------------- |
| Nincs hitelesítő adat                                   | 401             | `Authentication required`                                            |
| Érvénytelen/lejárt `oma_live_…`                         | 401             | `Invalid or expired access token`                                    |
| Érvényes API kulcs `manage`/`admin` nélkül              | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Érvénytelen hagyományos API kulcs felügyeleti útvonalon | 403             | `Invalid management token`                                           |
| Túl alacsony hozzáférési token hatókör                  | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

Az "Invalid management token" azt jelenti, hogy a bearer **nem** lett elfogadva felügyeleti hitelesítő adatként. Ez **nem** mondja meg, melyik családot kell létrehozni. Használja a fenti táblázatot: a következtetési kulcsokhoz `manage` hatókör szükséges; a távoli CLI-hez `oma_live_…` szükséges; az irányítópult a munkamenet sütit használja.

---

## Ajánlott legkisebb jogosultságú választás

| Hívó fél                                                        | Használat                                                      |
| :-------------------------------------------------------------- | :------------------------------------------------------------- |
| Böngésző                                                        | Irányítópult munkamenet                                        |
| CLI a szerver gazdagépen                                        | Gép token                                                      |
| CLI laptopon, amely távoli szerverrel kommunikál                | `oma_live_…` az `omniroute connect`-ből                        |
| CI / szkriptek (csak felügyelet)                                | `oma_live_…` a legkisebb működő hatókörrel                     |
| CI, amelynek mindkét `/v1` és `/api` hívást kell kezdeményeznie | API kulcs `manage` jogosultsággal **vagy** két hitelesítő adat |
