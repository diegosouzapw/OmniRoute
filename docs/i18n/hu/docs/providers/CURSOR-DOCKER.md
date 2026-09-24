# Cursor Provider in Docker Environments (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Amikor az OmniRoute Dockerben fut, a régi **Importálás a Cursor IDE-ből** /
`cursor-agent` folyamatok meghiúsulnak, mert a konténer nem látja a gazdagépen
telepített Cursort. Használja helyette a **Bejelentkezés a Cursorral** (deep-control PKCE) lehetőséget.

## Miért sikertelen az IDE-/CLI-importálás Dockerben?

1. **Fájlrendszer-izoláció** — Az automatikus importálás olyan Linux-elérési utakat keres,
   mint a `~/.config/Cursor/User/globalStorage/state.vscdb`, mégpedig a konténeren
   _belül_. A macOS-es Docker Desktop alapértelmezés szerint nem csatolja be a gazdagép
   IDE-adatbázisát, és a konténer operációs rendszere akkor is Linux, ha a gazdagép Darwin.
2. **Nincs `cursor-agent` bináris** — A hivatalos OmniRoute-rendszerképek nem tartalmazzák
   a `cursor-agent` binárist. Az Elérhető modellek korábban meghívták a
   `cursor-agent --list-models` parancsot, majd hiba esetén egy statikus katalógust használtak.
3. **Helytelen bináris** — **Ne** csatoljon be bind mounttal macOS-es `cursor-agent`
   binárist egy Linux-konténerbe. Nem fog végrehajtódni.

## Ajánlott: Bejelentkezés a Cursorral

1. Nyissa meg az **Irányítópult → Szolgáltatók → Cursor** oldalt.
2. Válassza a **Bejelentkezés a Cursorral** lapot.
3. Kattintson a **Bejelentkezés a Cursorral** gombra — az OmniRoute megnyitja a
   `https://cursor.com/loginDeepControl?…` címet a **gazdagép** böngészőjében.
4. Hagyja jóvá a bejelentkezést a böngészőben, majd térjen vissza az irányítópultra. Az OmniRoute
   addig kérdezi le az `api2.cursor.sh/auth/poll` végpontot, amíg meg nem érkeznek a tokenek.
5. Az OmniRoute tárolja a **hozzáférési és frissítési** tokeneket, és a
   `https://api2.cursor.sh/auth/exchange_user_api_key` címen keresztül frissíti őket.

Ehhez az eljáráshoz nincs szükség Cursor IDE-re vagy `cursor-agent` binárisra a konténerben.

## Modellek felderítése

Bejelentkezett kapcsolat esetén az **Elérhető modellek / Automatikus szinkronizálás** előnyben részesíti a Cursor
HTTP-alapú `AiService/AvailableModels` katalógusát, a kapcsolat bearer tokenjét használva.
Ha ez sikertelen, az OmniRoute továbbra is megpróbálja használni a gazdagép `cursor-agent`
binárisát (ha elérhető), majd a statikus jegyzék kezdőadatait.

Az OmniRoute mindig elérhetővé teszi az **`auto`** modellt a katalógusban („Auto” megjelenítési névvel), valamint
az OpenCodex-stílusú **`auto-cost`**, **`auto-balance`** és
**`auto-intelligence`** útválasztási módokat. Az adatátvitel során ezek a Cursor `default` modelljére
képeződnek le (a három változat esetén egy `optimization` ModelParameter használatával). Részesítse előnyben
a `cu/auto` modellt, amikor a prémium modellek használati kerete elfogyott — az Auto gyakran még rendelkezik kerettel.

### Sikeres szinkronizáláskor kizárólag az élő katalógus használatos

A Cursor modellek sikeres szinkronizálása után (`cursor-agent --list-models` → tartósan tárolt
szinkronizált katalógus, vagy a fent említett, bearer-hitelesítést használó `AvailableModels` lekérés) az
**irányítópult**, a **`/v1/models`** és az **Összes tesztelése** a következőket sorolja fel:

1. Az élő szinkronizálás által visszaadott modellek
2. Beillesztett automatikus útválasztó-azonosítók: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Az üzemeltető **egyéni** modelljei (importálás / kézi hozzáadás) — ezeket a szinkronizálás soha nem távolítja el

Az
`open-sse/config/providers/registry/cursor/` alatt található nagy statikus jegyzék **csak kapcsolat nélküli tartalékmegoldás**. Ha
a szinkronizált lista üres (vagy a felderítés meghiúsul), a listázás ezt a jegyzéket használja tartalékként.

Az erőfeszítési szintet jelölő utótaggal ellátott azonosítók (például `claude-4.6-sonnet-high`) futásidőben továbbra is
**kérhetők**: a `resolveRequestedModel` eltávolítja az utótagot, és egy adatátviteli
`ModelParameter` értékké alakítja. A kizárólagos listázás szándékosan elrejti ezeket a statikus változatokat
az Összes tesztelése funkció elől, hogy a próbák megfeleljenek a Cursor által ténylegesen elérhetőként visszaadott modelleknek.

### Segédfüggvények

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — irányítópult-összefésülés
- `ensureCursorAutoCatalogEntry` — auto* beillesztése felderítéskor és listázáskor
- `shouldSuppressStaticModelForExclusiveListing` — a `/v1/models` statikus ciklusa

## Szolgáltatói korlátok (kvóta)

A Cursor esetében a **Használat → Szolgáltatói korlátok** az `api2.cursor.sh` Bearer API-jait használja
(`GetCurrentPeriodUsage` → használati összesítés → auth/usage) PKCE vagy tokenimportálás
után. A régi cookie-/`cursor.com`-alapú irányítópult-elérési út végső tartalékmegoldásként megmarad
a régebbi, IDE-ből importált munkamenetekhez.

Az ablakok jellemzően tartalmazzák az **Összesen**, az **Auto + Composer** és az **API** értékeket. Ha
a korlátok üresnek tűnnek, futtassa újra a **Bejelentkezés a Cursorral** műveletet, vagy importálja újra a tokeneket (önmagában az IDE-importálás
már nem szükséges).

## Üres fordulók / elfogyott használati keret

Amikor a Cursor elfogad egy futtatást, de nem ad vissza asszisztensi szöveget (ami gyakori, amikor a prémium
használati keret elfogyott), az OmniRoute egy cselekvésre ösztönző **429**-es (kvótára utaló) vagy
útmutatást tartalmazó **502**-es hibát jelenít meg — nem pusztán a „A szolgáltató üres tartalmat adott vissza” üzenetet. Az olyan streamelési
hibák, mint a `not_found: AI Model Not Found` (a használati időszak kerete elfogyott),
**Cursor-sebességkorlátozás / használati keret túllépve** hibaként lesznek besorolva, és ez az üzenet
az SSE-folyamaton keresztül is megmarad (a megosztott üresstream-védelem nem írja felül a
már kibocsátott hibát). Ellenőrizze a Szolgáltatói korlátokat, próbálja ki az **`auto`** modellt, vagy növelje
a Cursor-előfizetés korlátait.

## Kliensverzió (grafikus felület nélkül)

Helyi `cursor-agent`-telepítés hiányában az OmniRoute az
`x-cursor-client-version` értékét először a `CURSOR_AGENT_CLI_VERSION` környezeti változóból, majd a Cursor telepítőszkriptjének
lemezen gyorsítótárazott feldolgozásából, végül pedig egy rögzített buildazonosítóból határozza meg. Szükség esetén felülbírálhatja
a `CURSOR_AGENT_CLI_VERSION` használatával.

## Tartalékmegoldás: Token kézi importálása

Ha nem tudja befejezni a böngészős bejelentkezést:

1. A gazdagépen nyerje ki a tokeneket a Cursor `state.vscdb` adatbázisából:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Nyissa meg a **Token importálása** lehetőséget a Cursor hitelesítési párbeszédpanelén.
3. Illessze be a **hozzáférési tokent**, és ha rendelkezésre áll, a **frissítési tokent** (ez szükséges az
   automatikus frissítéshez). A gépazonosító megadása nem kötelező.

A csak hozzáférési tokent tartalmazó importálások továbbra is működnek, de frissítési token nélkül lejárnak —
importálja újra a tokent, amikor a csevegés hitelesítési hibákat ad vissza.

## Kapcsolódó anyagok

- Zed Docker-útmutató: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor-bejelentkezési referencia (külső):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
