# Management Authentication (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Az OmniRoute **négy hitelesítőadat-családot** támogat, amelyek jogosultságot adhatnak a felügyeleti útvonalakhoz.
Ezek nem cserélhetők fel egymással. A következtetési API-kulcsok (`sk-…`) **nem** használhatók a
szerver felügyeletére, kivéve, ha kifejezetten `manage` vagy `admin` hatókört kaptak.

Kanonikus megvalósítás: `src/lib/api/requireManagementAuth.ts`.

| Hitelesítő adat                         | Tipikus forma                      | Létrehozás helye                                               | Rendeltetés                    | Felügyeleti képesség                                                                                                               |
| --------------------------------------- | ---------------------------------- | -------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Irányítópult JWT-munkamenete            | `auth_token` cookie                | Bejelentkezés az irányítópulton                                | Böngészős felhasználói felület | Teljes körű felügyelet az irányítópulton, a CSRF-, lokalitási és mindig védett útvonalakra vonatkozó szabályok figyelembevételével |
| CLI gépazonosító token                  | belső / helyi                      | CLI rendszerindítása (`omniroute` ugyanazon a gépen)           | Helyi CLI                      | Csak helyi felügyelet                                                                                                              |
| Hatókörrel rendelkező hozzáférési token | `oma_live_…`                       | **Beállítások → Hozzáférési tokenek** vagy `omniroute connect` | Távoli CLI és felügyeleti API  | Meg kell felelnie az útvonal által megkövetelt `read`, `write` vagy `admin` hatókörnek                                             |
| Következtetési API-kulcs                | `sk-…` (és más API-kulcs-előtagok) | **API-kezelő / API-kulcsok**                                   | `/v1/*` következtetés          | **Nincs**, kivéve, ha a kulcs metaadatai tartalmazzák a `manage` vagy `admin` hatókört                                             |

Az `oma_` hitelesítő adatok felügyeleti/CLI-hitelesítő adatok. **Nem** következtetési API-kulcsok.

Ha a bejelentkezés/API-kulcsos hitelesítés le van tiltva a szerveren, egyes felügyeleti útvonalak
elfogadhatnak hitelesítés nélküli hívásokat. A csak helyi és a mindig védett útvonalakra továbbra is
a saját szabályaik vonatkoznak. Ezért ezen hitelesítő adatok egyikének megadása nem minden esetben
kötelező, a birtoklása pedig nem minden esetben elegendő a szükséges hatókör és útvonal-lokalitás nélkül.

Kapcsolódó dokumentum: [Távoli mód](./REMOTE-MODE.md) (hogyan jön létre az `oma_live_…` egy távoli CLI számára).

---

## Hatókörmátrixok

Ez a két hatókör-szókészlet **különböző**. Ne keverje őket.

### Hozzáférési tokenek hatókörei (`oma_live_…`)

| Hatókör | Tipikus műveletek                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------- |
| `read`  | Azon listázási/állapotlekérő GET-kérések, amelyek megtekintésére a token jogosult                   |
| `write` | Az adminisztrátori szint alatti módosítások (létrehozás/frissítés/törlés)                           |
| `admin` | Teljes körű távoli CLI / kapcsolódási token (jelszavas rendszerindítás esetén ez az alapértelmezés) |

Egy `read` hatókörű token nem hívhat meg `write` útvonalat. A futásidejű üzenet formája:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-kulcsok felügyeleti hatókörei

| Hatókör  | Jelentés                                                                                    |
| -------- | ------------------------------------------------------------------------------------------- |
| (nincs)  | Csak következtetés. A felügyeleti útvonalak 403-as választ adnak vissza.                    |
| `manage` | Felügyeleti API (ugyanaz az ellenőrzési pont, mint a `requireManagementAuth` API-kulcs-ága) |
| `admin`  | A `hasManageScope` feltételét is teljesíti (felügyeletre alkalmasnak minősül)               |

Engedélyezze a `manage` hatókört a kulcson az API-kulcsok / API-kezelő felhasználói felületén. Ne használjon újra
csevegőklienshez tartozó kulcsot automatizáláshoz, kivéve, ha szándékosan megadta számára ezt a hatókört.

---

## Létrehozás és visszavonás

### Irányítópult JWT-munkamenete

1. Nyissa meg a `/login` oldalt, majd jelentkezzen be a felügyeleti jelszóval (első rendszerindításkor `INITIAL_PASSWORD`).
2. Az `auth_token` cookie HttpOnly. A böngészős irányítópult automatikusan használja.
3. Jelentkezzen ki az `/api/auth/logout` útvonalon keresztül. Nincs másolható, hosszú élettartamú titkos adat.

### CLI gépazonosító token

1. Futtassa az `omniroute` parancsot a szerverrel **azonos gazdagépen** (visszacsatolási interfészen).
2. A CLI létrehoz egy gépazonosító tokent a `~/.omniroute/` alatt (chmod 600).
3. Ez **nem** működik másik gépről. Távoli CLI használatához használjon hozzáférési tokent.

### Hatókörrel rendelkező hozzáférési token (`oma_live_…`)

1. Irányítópult: **Beállítások → Hozzáférési tokenek** → létrehozás (név + hatókör). **A titkos adat csak egyszer jelenik meg.**
2. Vagy CLI: `omniroute connect <host>` (jelszó → token). Lásd: [Távoli mód](./REMOTE-MODE.md).
3. Fejléc: `Authorization: Bearer oma_live_…`
4. Vonja vissza ugyanazon a Hozzáférési tokenek oldalon (vagy törölje a CLI-környezetet).
5. A szerver csak kivonatot tárol. A nyílt szövegű értéket jelszóként kezelje.

### Felügyeleti hatókörrel rendelkező API-kulcs

1. Irányítópult: **API-kezelő / API-kulcsok** → hozzon létre vagy szerkesszen egy kulcsot → engedélyezze a `manage` (vagy `admin`) hatókört.
2. Fejléc: `Authorization: Bearer sk-…` (a kulcs tényleges előtagja).
3. Vonja vissza a kulcsot, vagy távolítsa el a `manage` hatókört ugyanazon a felhasználói felületen.
4. A legkisebb jogosultság elvét követve, olyan automatizáláshoz, amely nem CLI: csak GET-műveleteket végző feladatokhoz részesítse előnyben a `read` hozzáférési tokent; API-kulcson csak akkor használjon `manage` hatókört, ha a hívónak a `/v1` és a felügyeleti végpontokkal egyaránt kommunikálnia kell.

---

## Fejlécformátum

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ne helyezzen felügyeleti hitelesítő adatokat az URL elérési útjába vagy lekérdezési karakterláncába. A felügyeleti hitelesítés
kizárólag fejlécen vagy cookie-n keresztül történhet.

---

## Másolható és beilleszthető példák

Csak olvasási művelet (szolgáltatók listázása). Használjon `read` hozzáférési tokent:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Módosítás (szolgáltatói kapcsolat létrehozása). Használjon `write`/`admin` hozzáférési tokent vagy
`manage` hatókörű API-kulcsot:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Következtetés (nem felügyeleti művelet). Normál API-kulcs, nincs szükség `manage` hatókörre:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuális futásidejű hibák (ne jelenítsen meg titkos adatokat)

| Helyzet                                                | Jellemző állapotkód | Üzenet (anonimizálva)                                                |
| ------------------------------------------------------ | ------------------- | -------------------------------------------------------------------- |
| Nincs hitelesítő adat                                  | 401                 | `Authentication required`                                            |
| Érvénytelen/lejárt `oma_live_…`                        | 401                 | `Invalid or expired access token`                                    |
| Érvényes API-kulcs `manage`/`admin` hatókör nélkül     | 403                 | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Érvénytelen normál API-kulcs egy felügyeleti útvonalon | 403                 | `Invalid management token`                                           |
| A hozzáférési token hatóköre túl alacsony              | 403                 | `Access token scope '<have>' is insufficient; '<need>' required.`    |

Az „Invalid management token” azt jelenti, hogy a bearer tokent a rendszer **nem** fogadta el felügyeleti
hitelesítő adatként. Ez **nem** jelzi, hogy melyik típusból kell újat létrehozni. Használja a fenti táblázatot:
a következtetési kulcsokhoz `manage` hatókör szükséges; a távoli CLI-hez `oma_live_…` szükséges; az irányítópult
a munkamenet-cookie-t használja.

---

## Javasolt, legkisebb jogosultságot biztosító választás

| Hívó                                                       | Használat                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| Böngésző                                                   | Irányítópult-munkamenet                                    |
| CLI a kiszolgáló gazdagépén                                | Gépi token                                                 |
| CLI egy távoli kiszolgálóhoz kapcsolódó laptopon           | `oma_live_…` az `omniroute connect` parancsból             |
| CI / szkriptek (csak felügyelet)                           | `oma_live_…` a működéshez elegendő legkisebb hatókörrel    |
| CI, amelynek a `/v1` és az `/api` végpontot is hívnia kell | API-kulcs `manage` hatókörrel **vagy** két hitelesítő adat |
