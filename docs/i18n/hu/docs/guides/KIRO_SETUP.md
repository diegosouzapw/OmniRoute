# Kiro Setup Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Ez az útmutató bemutatja, hogyan adhat Kiro- (az AWS által üzemeltetett AI-kódolási asszisztens) fiókokat az OmniRoute-hoz,
különös tekintettel több fiók egyidejű, munkamenet-ütközések nélküli használatára.

---

## Háttér: Miért ütközhetnek a Kiro-fiókok?

A Kiro háttérrendszere AWS SSO OIDC-kliensregisztrációkkal követi nyomon az aktív munkameneteket.
A legfontosabb korlátozás: **minden OIDC-kliensregisztráció egyszerre csak egy aktív
munkamenetet támogat**. Amikor egy második eszköz vagy felhasználó ugyanazzal a
regisztrált klienssel hitelesít, a háttérrendszer érvényteleníti az első fiók frissítési tokenjét.

Ugyanez a mechanizmus okoz problémát akkor is, amikor a `kiro-cli login` parancsot olyan
gépen futtatják, amelyen már be van jelentkezve egy másik Kiro-fiók — az új bejelentkezés visszavonja az
első fiók tokenjét.

---

## Hogyan oldja meg ezt az OmniRoute (v3.8.0+)

A v3.8.0 verziótól kezdve az OmniRoute minden Kiro-kapcsolat importálása során meghívja a
`registerClient()` (AWS SSO OIDC) függvényt. Így minden OmniRoute-kapcsolat saját, dedikált OIDC-
kliensregisztrációt kap. Mivel minden kliensregisztráció független, az egyik fiók frissítése vagy
újrahitelesítése nincs hatással egyetlen másik fiók frissítési tokenjére sem.

Az elkülönítés a frissítési tokenes importálási módszerekre vonatkozik, az API-kulcsos
hitelesítés pedig teljesen elkerüli az OIDC-frissítési munkameneteket:

| Importálási módszer                                        | Elkülönítés állapota                                                                                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC eszközkódos folyamat                  | Az eszközkódos folyamat bevezetése óta elkülönített                                                                                          |
| **Token importálása** (frissítési token kézi beillesztése) | A v3.8.0 verziótól elkülönített                                                                                                              |
| **Google-/GitHub-alapú közösségi bejelentkezés**           | A v3.8.0 verziótól elkülönített                                                                                                              |
| **Automatikus importálás** (kiro-cli SQLite)               | A v3.8.0 verziótól elkülönített (az SQLite-útvonal már elkülönített volt; mostantól az SSO-gyorsítótár tartalékmechanizmusa is elkülönített) |
| **API-kulcs** (hosszú élettartamú CodeWhisperer-kulcs)     | Nincs frissítési munkamenet; a rendszer ellenőrzi a kulcsot, és bearer hitelesítő adatként tárolja                                           |

---

## Migrációs megjegyzés a v3.8.0 előtt létrehozott kapcsolatokhoz

A v3.8.0 előtt importált kapcsolatokhoz nem tartozik a `providerSpecificData` mezőben tárolt,
dedikált OIDC-kliensregisztráció. Ezek a kapcsolatok továbbra is működnek, de a megosztott
közösségi hitelesítési frissítési végpontot használják, ami azt jelenti, hogy két ilyen kapcsolat továbbra is érvénytelenítheti
egymást.

**Az elkülönítés eléréséhez:** törölje a régi kapcsolatot az **Irányítópult → Szolgáltatók** oldalon, majd
importálja újra valamelyik támogatott importálási folyamattal. Minden újonnan létrehozott kapcsolat
automatikusan saját kliensregisztrációt kap.

---

## Két Kiro-fiók párhuzamos hozzáadása

### Előfeltételek

- OmniRoute v3.8.0 vagy újabb.
- Egy működő Kiro-fiók (e-mail-cím + jelszó, Google- vagy GitHub-bejelentkezés).
- Opcionálisan egy második Kiro-fiók.

### 1. lépés: Az első fiók importálása

1. Nyissa meg az **Irányítópult → Szolgáltatók → Szolgáltató hozzáadása → Kiro** oldalt.
2. Válasszon az alábbiak közül:
   - **Token importálása** — illesszen be egy `aorAAAAAG` kezdetű frissítési tokent.
   - **API-kulcs** — illesszen be egy hosszú élettartamú Kiro- / CodeWhisperer API-kulcsot.
   - **Google- / GitHub-bejelentkezés** — fejezze be az OAuth-folyamatot a böngészőben.
   - **Automatikus importálás** — kattintson a gombra; az OmniRoute beolvassa a hitelesítő adatokat a
     helyi kiro-cli-adatbázisból vagy a `~/.aws/sso/cache` útvonalról.
3. A kapcsolat mentésre kerül. A frissítési tokenes folyamatok automatikusan regisztrálnak egy dedikált
   OIDC-klienst. Az API-kulcsos folyamatok ellenőrzik a kulcsot az AWS segítségével, és nem tárolnak frissítési tokent.

### 2. lépés: A második fiók importálása

Ismételje meg az 1. lépést a második fiókkal. Mivel minden importálás külön OIDC-
kliensregisztrációt hoz létre, a két kapcsolat teljesen elkülönül egymástól.

### 3. lépés: Mindkét kapcsolat aktív állapotának ellenőrzése

1. **Irányítópult → Szolgáltatók** — mindkét Kiro-kapcsolatnál az **Aktív** állapotnak kell megjelennie.
2. **Irányítópult → Állapot** — mindkét kapcsolatnak sikeresen kell teljesítenie a tokenállapot-ellenőrzést.

### 4. lépés: Kombináció használata a fiókok közötti irányításhoz

Hozzon létre egy kombinációt, amelyben mindkét kapcsolat célként szerepel, hogy terheléselosztást vagy feladatátvételt alkalmazhasson közöttük:

```
kiro/kiro-dev → kiro/kiro-pro
```

A kombinációk konfigurálásáról a [FEATURES.md](./FEATURES.md) fájlban és az útválasztási dokumentációban olvashat.

---

## Vállalati / IDC-felhasználók

Az AWS IAM Identity Center- (IDC-) fiókokhoz használja az **AWS Builder ID / IDC eszközkódos**
folyamatot az **Irányítópult → Szolgáltatók → Kiro → Eszközkód** útvonalon. Az eszközkódos folyamat
mindig is teljesen elkülönítve működött. Ezeket a kapcsolatokat nem szükséges újraimportálni.

A nem alapértelmezett AWS-régióban működő vállalati felhasználók az Import Token API-n
keresztüli importáláskor megadhatják a régiót:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Ha a `region` mezőt kihagyja, annak alapértelmezett értéke `us-east-1`.

---

## API-kulcsos importálási folyamat

Az API-kulcsos hitelesítés a hosszú élettartamú Kiro / AWS CodeWhisperer bearer hitelesítő adatokhoz használható. Nem
használ OAuth-frissítést, így elkerüli a megosztott OIDC-munkamenetek érvénytelenítését.

### Irányítópult

1. Nyissa meg az **Irányítópult -> Szolgáltatók -> Kiro** oldalt.
2. Válassza az **API-kulcs** lehetőséget.
3. Illessze be az API-kulcsot és opcionálisan az AWS-régiót (alapértelmezés szerint `us-east-1`).
4. Az OmniRoute ellenőrzi a kulcsot, és menti a kapcsolatot.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Belső szerződés

Az API-útvonal a `KiroService.validateApiKey()` meghívásával ellenőrzi a kulcsot, amely
a régiónak megfelelő CodeWhisperer/Amazon Q végponttal szemben használja a `ListAvailableProfiles`
műveletet, és felold egy `profileArn` értéket.

A mentett kapcsolat a következőket használja:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Futásidőben a `KiroExecutor.buildHeaders()` a kulcsot
`Authorization: Bearer <key>` formában küldi el, és hozzáadja a `tokentype: API_KEY` értéket. A kvóta-/profilhívások
ugyanezt a jelölőt használják, így az AWS a bearer hitelesítő adatot hosszú élettartamú API-kulcsként kezeli,
nem pedig OIDC- vagy közösségi hozzáférési tokenként.

---

## Az OIDC-kliens lejárata

Az AWS SSO OIDC nyilvános kliensei jellemzően 90 nap után járnak le
(`clientSecretExpiresAt`). Az OmniRoute megfigyelhetőségi célból a `providerSpecificData`
mezőben tárolja ezt az időbélyeget. Ha egy kapcsolat körülbelül 90 nap elteltével már nem frissül, importálja
újra a kapcsolatot, hogy új OIDC-kliensregisztrációt kapjon. A lejáratkor történő automatikus
újraregisztrálás jövőbeli fejlesztésként van nyilvántartva.

Az API-kulcsos kapcsolatoknál nincs OIDC-klienslejárat, mivel azok nem
az AWS SSO OIDC-n keresztül frissülnek.

---

## Hibaelhárítás

### A második fiók folyamatosan kijelentkezik

- Ellenőrizze mindkét kapcsolatot az **Irányítópult → Szolgáltatók** oldalon, és győződjön meg arról, hogy mindkettőnél nem null értékű
  `clientId` jelenik meg a nyers JSON-adatokban (az információs ikonon keresztül tekinthető meg). Ha bármelyik kapcsolatból hiányzik
  a `clientId`, akkor azt a v3.8.0 előtt importálták — importálja újra.

### Az importálás sikertelen, „A token ellenőrzése sikertelen” hibaüzenettel

- Győződjön meg arról, hogy a frissítési token `aorAAAAAG` karakterekkel kezdődik.
- Győződjön meg arról, hogy az OmniRoute eléri a `https://oidc.us-east-1.amazonaws.com` címet (vagy a beállított
  régiót). Ha vállalati proxy mögött van, állítson be szolgáltatószintű proxyt az
  **Irányítópult → Beállítások → Proxyk** oldalon.

### Az API-kulcs importálása sikertelen

- Ellenőrizze, hogy a kulcs Kiro / CodeWhisperer API-kulcs, nem pedig frissítési token.
- Ellenőrizze, hogy az AWS-régió megfelel a kulcsnak/fióknak. Az alapértelmezett régió `us-east-1`.
- A kulcsnak képesnek kell lennie a `ListAvailableProfiles` meghívására; ellenkező esetben az OmniRoute nem tudja
  feloldani a szükséges `profileArn` értéket.

Egyéb problémák esetén tekintse meg a fő [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) dokumentumot.
