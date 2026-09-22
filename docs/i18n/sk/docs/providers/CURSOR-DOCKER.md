# Cursor Provider in Docker Environments (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Keď OmniRoute beží v Dockeri, staršie postupy **Importovať z Cursor IDE** /
`cursor-agent` zlyhajú, pretože kontajner nevidí hostiteľskú inštaláciu Cursoru.
Namiesto toho použite **Prihlásiť sa cez Cursor** (deep-control PKCE).

## Prečo import z IDE / CLI v Dockeri zlyháva

1. **Izolácia súborového systému** — Automatický import vyhľadáva linuxové cesty, ako napríklad
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _vo vnútri_ kontajnera.
   V Docker Desktop pre macOS nie je databáza IDE hostiteľa predvolene pripojená
   a operačným systémom kontajnera je Linux, aj keď hostiteľ používa Darwin.
2. **Chýbajúci binárny súbor `cursor-agent`** — Oficiálne obrazy OmniRoute
   neobsahujú `cursor-agent`. Funkcia Dostupné modely predtým spúšťala
   `cursor-agent --list-models` a pri zlyhaní použila statický katalóg.
3. **Nesprávny binárny súbor** — **Nepripájajte** macOS verziu `cursor-agent`
   do linuxového kontajnera pomocou bind mountu. Nebude sa dať spustiť.

## Odporúčané: Prihlásenie cez Cursor

1. Otvorte **Ovládací panel → Poskytovatelia → Cursor**.
2. Vyberte kartu **Prihlásiť sa cez Cursor**.
3. Kliknite na **Prihlásiť sa cez Cursor** — OmniRoute otvorí
   `https://cursor.com/loginDeepControl?…` vo vašom **hostiteľskom** prehliadači.
4. Schváľte prihlásenie v prehliadači a potom sa vráťte na ovládací panel. OmniRoute
   sa opakovane dopytuje na `api2.cursor.sh/auth/poll`, kým nezíska tokeny.
5. OmniRoute uloží **prístupový + obnovovací** token a obnovuje ich prostredníctvom
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Tento postup nevyžaduje Cursor IDE ani `cursor-agent` vo vnútri kontajnera.

## Zisťovanie modelov

Pri prihlásenom pripojení funkcia **Dostupné modely / Automatická synchronizácia**
uprednostňuje HTTP katalóg `AiService/AvailableModels` od Cursoru s použitím
bearer tokenu pripojenia. Ak to zlyhá, OmniRoute sa stále pokúsi použiť hostiteľský
`cursor-agent` (ak je prítomný) a následne statický základ registra.

OmniRoute v katalógu vždy sprístupňuje **`auto`** (zobrazené ako „Auto“) spolu
s režimami smerovača v štýle OpenCodex: **`auto-cost`**, **`auto-balance`** a
**`auto-intelligence`**. Pri prenose sa mapujú na model Cursoru `default`
(s parametrom `optimization` typu ModelParameter pre tri uvedené varianty).
Keď je vyčerpané používanie prémiových modelov, uprednostnite `cu/auto` — režim
Auto má často stále dostupný rozpočet.

### Živý katalóg je po synchronizácii výhradný

Po úspešnej synchronizácii modelov Cursoru (`cursor-agent --list-models` → uložený
synchronizovaný katalóg alebo vyššie uvedené načítanie `AvailableModels` overené
bearer tokenom) zobrazujú **ovládací panel**, **`/v1/models`** a **Testovať všetky**:

1. Modely vrátené živou synchronizáciou
2. Pridané identifikátory automatického smerovača: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Vlastné** modely operátora (importované / manuálne) — synchronizácia ich nikdy neodstráni

Rozsiahly statický register v
`open-sse/config/providers/registry/cursor/` slúži **iba ako offline záložná možnosť**.
Keď je synchronizovaný katalóg prázdny (alebo zisťovanie zlyhá), zoznam sa načíta
z tohto registra.

Identifikátory s príponou úrovne úsilia (napríklad `claude-4.6-sonnet-high`) možno
za behu stále **vyžiadať**: `resolveRequestedModel` odstráni príponu a prevedie ju
na prenášaný `ModelParameter`. Výhradný zoznam tieto statické varianty zámerne
skrýva vo funkcii Testovať všetky, aby sondy zodpovedali tomu, čo Cursor skutočne
vracia ako dostupné.

### Pomocné funkcie

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — zlúčenie pre ovládací panel
- `ensureCursorAutoCatalogEntry` — pridanie auto* pri zisťovaní + zostavovaní zoznamu
- `shouldSuppressStaticModelForExclusiveListing` — statická slučka `/v1/models`

## Limity poskytovateľa (kvóta)

Sekcia **Používanie → Limity poskytovateľa** pre Cursor používa Bearer API na
`api2.cursor.sh` (`GetCurrentPeriodUsage` → súhrn používania → auth/usage) po
PKCE alebo importe tokenu. Staršia cesta cez cookie/ovládací panel `cursor.com`
zostáva poslednou záložnou možnosťou pre staršie relácie importované z IDE.

Okná zvyčajne zahŕňajú položky **Celkom**, **Auto + Composer** a **API**. Ak sa
limity zobrazujú ako prázdne, znova vykonajte **Prihlásenie cez Cursor** alebo
opätovne importujte tokeny (samotný import z IDE už nie je potrebný).

## Prázdne odpovede / vyčerpané používanie

Keď Cursor prijme požiadavku Run, ale nevráti žiadny text asistenta (čo je bežné
pri vyčerpaní prémiového používania), OmniRoute zobrazí použiteľnú chybu **429**
(indície týkajúce sa kvóty) alebo **502** s usmernením — nie iba holé hlásenie
„Poskytovateľ vrátil prázdny obsah“. Zlyhania streamovania, ako napríklad
`not_found: AI Model Not Found` (vyčerpané obdobie používania), sú klasifikované
ako **prekročenie limitu požiadaviek / používania Cursoru** a toto hlásenie sa
zachová v celom kanáli SSE (zdieľaná ochrana pred prázdnym streamom neprepíše
už odoslanú chybu). Skontrolujte Limity poskytovateľa, vyskúšajte model
**`auto`** alebo zvýšte limity plánu Cursoru.

## Verzia klienta (bez grafického rozhrania)

Bez lokálnej inštalácie `cursor-agent` OmniRoute určuje
`x-cursor-client-version` najprv z premennej prostredia `CURSOR_AGENT_CLI_VERSION`,
potom z výsledku načítania inštalačného skriptu Cursoru uloženého vo vyrovnávacej
pamäti na disku a nakoniec z pevne nastavenej identifikácie zostavy. V prípade
potreby hodnotu prepíšte pomocou `CURSOR_AGENT_CLI_VERSION`.

## Záložná možnosť: Manuálny import tokenu

Ak nemôžete dokončiť prihlásenie v prehliadači:

1. Na hostiteľovi extrahujte tokeny zo súboru `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. V modálnom okne overenia Cursoru otvorte **Importovať token**.
3. Vložte **prístupový token** a, ak je k dispozícii, **obnovovací token**
   (vyžaduje sa na automatické obnovenie). ID zariadenia je voliteľné.

Importy obsahujúce iba prístupový token budú naďalej fungovať, ale bez
obnovovacieho tokenu ich platnosť vyprší — keď chat začne vracať chyby overenia,
vykonajte import znova.

## Súvisiace informácie

- Pokyny pre Zed v Dockeri: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referencia prihlásenia Cursoru v OpenCodex (externá):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
