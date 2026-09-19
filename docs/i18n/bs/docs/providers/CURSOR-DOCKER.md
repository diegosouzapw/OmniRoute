# CURSOR-DOCKER (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

# Cursor provajder u Docker okruženjima

Kada se OmniRoute pokreće unutar Docker-a, naslijeđeni tokovi **Import from Cursor IDE** / `cursor-agent` ne uspijevaju jer kontejner ne može vidjeti instalaciju Cursor-a na hostu. Umjesto toga koristite **Login with Cursor** (deep-control PKCE).

## Zašto IDE / CLI uvoz ne uspijeva u Docker-u

1. **Izolacija sistema datoteka** — Automatski uvoz traži Linux putanje kao što je `~/.config/Cursor/User/globalStorage/state.vscdb` _unutar_ kontejnera. Na Docker Desktop-u za macOS, baza podataka host IDE-a nije montirana po defaultu, a OS kontejnera je Linux čak i kada je host Darwin.
2. **Nema `cursor-agent` binarnog fajla** — Zvanične OmniRoute slike ne isporučuju `cursor-agent`. Dostupni modeli su prethodno pozivali `cursor-agent --list-models` i vraćali se na statički katalog.
3. **Pogrešan binarni fajl** — Nemojte **bind-mount**-ovati macOS `cursor-agent` u Linux kontejner. Neće se izvršiti.

## Preporučeno: Login with Cursor

1. Otvorite **Dashboard → Providers → Cursor**.
2. Odaberite karticu **Login with Cursor**.
3. Kliknite na **Login with Cursor** — OmniRoute otvara `https://cursor.com/loginDeepControl?…` u vašem **host** pretraživaču.
4. Odobrite prijavu u pretraživaču, a zatim se vratite na kontrolnu tablu. OmniRoute vrši upite (polls) ka `api2.cursor.sh/auth/poll` dok tokeni ne stignu.
5. OmniRoute pohranjuje **access + refresh** tokene i osvježava ih putem `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ova putanja ne zahtijeva Cursor IDE ili `cursor-agent` unutar kontejnera.

## Otkrivanje modela

Sa prijavljenom konekcijom, **Available Models / Auto-Sync** preferira Cursor-ov HTTP `AiService/AvailableModels` katalog koristeći bearer token konekcije. Ako to ne uspije, OmniRoute i dalje pokušava sa host `cursor-agent`-om (kada je prisutan), a zatim sa statičkim registarskim seed-om.

OmniRoute uvijek izlaže **`auto`** u katalogu (prikaz “Auto”), plus OpenCodex-stil router modove **`auto-cost`**, **`auto-balance`** i **`auto-intelligence`**. Na mreži se oni mapiraju na Cursor-ov `default` model (sa `optimization` ModelParameter-om za tri varijante). Preferirajte `cu/auto` kada su premium modeli van upotrebe — Auto često još uvijek ima budžet.

### Katalog uživo je ekskluzivan kada je sinhronizovan

Nakon uspješne sinhronizacije Cursor modela (`cursor-agent --list-models` → trajni sinhronizovani katalog, ili gore navedeno preuzimanje `AvailableModels` autentifikovano bearer tokenom), **dashboard**, **`/v1/models`** i **Test All** navode:

1. Modele vraćene sinhronizacijom uživo
2. Injektovane auto-router ID-ove: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operaterske **prilagođene** modele (Uvoz / ručno) — nikada ne uklanjane sinhronizacijom

Veliki statički registar pod `open-sse/config/providers/registry/cursor/` je **samo za offline rezervu**. Kada je sinhronizacija prazna (ili otkrivanje ne uspije), lista se vraća na taj registar.

ID-ovi sa sufiksom napora (na primjer `claude-4.6-sonnet-high`) se i dalje mogu **zahtijevati** u vrijeme izvršavanja: `resolveRequestedModel` uklanja sufiks u `ModelParameter` na mreži. Ekskluzivno listanje namjerno skriva te statičke varijante iz Test All tako da se probe podudaraju sa onim što Cursor zapravo vraća kao dostupno.

### Pomoćni alati

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` — `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — spajanje kontrolne table
- `ensureCursorAutoCatalogEntry` — auto* injekcija pri otkrivanju + listanju
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statička petlja

## Ograničenja provajdera (kvota)

**Usage → Provider Limits** za Cursor koristi Bearer API-je na `api2.cursor.sh` (`GetCurrentPeriodUsage` → sažetak upotrebe → auth/usage) nakon PKCE ili uvoza tokena. Naslijeđena putanja kolačića/`cursor.com` kontrolne table ostaje posljednja rezerva za starije sesije uvezene iz IDE-a.

Windows obično uključuju **Total**, **Auto + Composer** i **API**. Ako ograničenja izgledaju prazna, ponovo pokrenite **Login with Cursor** ili ponovo uvezite tokene (IDE uvoz sam po sebi više nije potreban).

## Prazni potezi / van upotrebe

Kada Cursor prihvati Run, ali ne vrati tekst asistenta (uobičajeno kada je premium upotreba iscrpljena), OmniRoute izbacuje djelotvoran **429** (indikatori kvote) ili **502** sa smjernicama — a ne samo “Provider returned empty content”. Greške strimovanja kao što je `not_found: AI Model Not Found` (prozor upotrebe iscrpljen) klasifikuju se kao **Cursor rate limit / usage exceeded** i zadržavaju tu poruku kroz SSE cjevovod (zajednički čuvar praznog strima ne prepisuje već emitovanu grešku). Provjerite ograničenja provajdera, isprobajte model **`auto`** ili povećajte ograničenja Cursor plana.

## Verzija klijenta (headless)

Bez lokalne `cursor-agent` instalacije, OmniRoute razrješava `x-cursor-client-version` putem env `CURSOR_AGENT_CLI_VERSION`, zatim disk-keširane ekstrakcije Cursor instalacione skripte, a zatim fiksiranog build ID-a. Nadjačajte sa `CURSOR_AGENT_CLI_VERSION` kada je potrebno.

## Rezerva: Ručni uvoz tokena

Ako ne možete završiti prijavu u pretraživaču:

1. Na hostu, izvucite tokene iz Cursor-ovog `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Otvorite **Import token** u Cursor auth modalu.
3. Zalijepite **Access Token** i, kada je dostupan, **Refresh Token** (potreban za automatsko osvježavanje). Machine ID je opcionalan.

Uvozi samo sa pristupnim tokenom i dalje rade, ali će isteći bez refresh tokena — ponovo uvezite kada chat vrati greške autentifikacije.

## Povezano

- Zed Docker smjernice: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor referenca za prijavu (eksterna): https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
