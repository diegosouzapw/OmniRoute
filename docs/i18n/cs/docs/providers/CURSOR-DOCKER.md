# Cursor Provider in Docker Environments (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Když OmniRoute běží v Dockeru, starší postupy **Import from Cursor IDE** /
`cursor-agent` selžou, protože kontejner nevidí instalaci Cursoru v hostitelském
systému. Místo toho použijte **Login with Cursor** (PKCE deep-control).

## Proč import z IDE / CLI v Dockeru selhává

1. **Izolace souborového systému** — Automatický import hledá linuxové cesty, například
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _uvnitř_ kontejneru.
   V Docker Desktop pro macOS není databáze IDE z hostitelského systému ve výchozím nastavení připojena
   a operačním systémem kontejneru je Linux, i když hostitelským systémem je Darwin.
2. **Chybí binární soubor `cursor-agent`** — Oficiální obrazy OmniRoute
   neobsahují `cursor-agent`. Funkce Available Models dříve spouštěla
   `cursor-agent --list-models` a při neúspěchu použila statický katalog.
3. **Nesprávný binární soubor** — **Nepřipojujte** pomocí bind mountu macOS verzi `cursor-agent` do linuxového
   kontejneru. Nebude ji možné spustit.

## Doporučeno: Přihlášení pomocí Cursoru

1. Otevřete **Dashboard → Providers → Cursor**.
2. Vyberte kartu **Login with Cursor**.
3. Klikněte na **Login with Cursor** — OmniRoute otevře
   `https://cursor.com/loginDeepControl?…` ve vašem **hostitelském** prohlížeči.
4. Schvalte přihlášení v prohlížeči a poté se vraťte na řídicí panel. OmniRoute
   se dotazuje `api2.cursor.sh/auth/poll`, dokud neobdrží tokeny.
5. OmniRoute uloží **přístupový + obnovovací** token a obnovuje je prostřednictvím
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Tento postup nevyžaduje Cursor IDE ani `cursor-agent` uvnitř kontejneru.

## Zjišťování modelů

U přihlášeného připojení funkce **Available Models / Auto-Sync** upřednostňuje katalog
HTTP `AiService/AvailableModels` od Cursoru s použitím bearer tokenu připojení.
Pokud tento postup selže, OmniRoute se stále pokusí použít hostitelský `cursor-agent`
(je-li dostupný) a poté statický základ registru.

OmniRoute v katalogu vždy zpřístupňuje **`auto`** (zobrazené jako „Auto“) a také
režimy routeru ve stylu OpenCodex: **`auto-cost`**, **`auto-balance`** a
**`auto-intelligence`**. Při přenosu jsou mapovány na model Cursoru `default`
(s parametrem `optimization` v `ModelParameter` pro tyto tři varianty). Pokud je
vyčerpán limit prémiových modelů, upřednostněte `cu/auto` — Auto má často stále
k dispozici rozpočet.

### Po synchronizaci je živý katalog výhradní

Po úspěšné synchronizaci modelů Cursoru (`cursor-agent --list-models` → trvale uložený
synchronizovaný katalog nebo výše uvedené načtení `AvailableModels` ověřené bearer
tokenem) obsahují **řídicí panel**, **`/v1/models`** a seznam **Test All**:

1. Modely vrácené živou synchronizací
2. Vložená ID automatických routerů: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Vlastní** modely operátora (Import / ruční zadání) — synchronizace je nikdy neodstraní

Rozsáhlý statický registr v
`open-sse/config/providers/registry/cursor/` slouží **pouze jako offline záložní varianta**. Pokud
je synchronizovaný katalog prázdný (nebo zjišťování selže), seznam se načte z tohoto registru.

ID s příponou úrovně úsilí (například `claude-4.6-sonnet-high`) lze za běhu stále
**vyžádat**: `resolveRequestedModel` odebere příponu a převede ji na přenášený
`ModelParameter`. Výhradní seznam tyto statické varianty záměrně skrývá
před Test All, aby testovací požadavky odpovídaly tomu, co Cursor skutečně uvádí jako dostupné.

### Pomocné funkce

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — sloučení na řídicím panelu
- `ensureCursorAutoCatalogEntry` — vložení auto* při zjišťování + výpisu
- `shouldSuppressStaticModelForExclusiveListing` — statická smyčka `/v1/models`

## Limity poskytovatele (kvóta)

Sekce **Usage → Provider Limits** pro Cursor používá Bearer API na `api2.cursor.sh`
(`GetCurrentPeriodUsage` → souhrn využití → auth/usage) po PKCE nebo importu
tokenu. Starší cesta přes soubory cookie / řídicí panel `cursor.com` zůstává poslední záložní
možností pro starší relace importované z IDE.

Okna obvykle obsahují položky **Total**, **Auto + Composer** a **API**. Pokud
se limity zobrazují jako prázdné, znovu spusťte **Login with Cursor** nebo znovu importujte tokeny
(samotný import z IDE již není vyžadován).

## Prázdné odpovědi / vyčerpaný limit

Když Cursor přijme požadavek Run, ale nevrátí žádný text asistenta (což je běžné při
vyčerpání limitu prémiového využití), OmniRoute zobrazí použitelnou chybu **429** (s informacemi
o kvótě) nebo **502** s pokyny — nikoli pouze „Poskytovatel vrátil prázdný obsah“. Selhání
streamování, například `not_found: AI Model Not Found` (vyčerpané okno využití), jsou
klasifikována jako **překročení limitu požadavků / využití Cursoru** a tato zpráva zůstane
zachována v celé SSE pipeline (sdílená ochrana proti prázdnému streamu nepřepíše již
odeslanou chybu). Zkontrolujte Provider Limits, vyzkoušejte model **`auto`** nebo zvyšte
limity plánu Cursoru.

## Verze klienta (bez grafického rozhraní)

Bez místní instalace `cursor-agent` získává OmniRoute hodnotu
`x-cursor-client-version` nejprve z proměnné prostředí `CURSOR_AGENT_CLI_VERSION`, poté
z kopie instalačního skriptu Cursoru získané z disku a uložené do mezipaměti a nakonec
z připnutého ID sestavení. V případě potřeby ji přepište pomocí
`CURSOR_AGENT_CLI_VERSION`.

## Záložní možnost: Ruční import tokenu

Pokud nemůžete dokončit přihlášení v prohlížeči:

1. V hostitelském systému extrahujte tokeny ze souboru `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. V modálním okně ověřování Cursoru otevřete **Import token**.
3. Vložte **Access Token** a, je-li k dispozici, také **Refresh Token** (je vyžadován pro
   automatické obnovení). ID zařízení je volitelné.

Import pouze přístupového tokenu stále funguje, ale bez obnovovacího tokenu jeho platnost vyprší —
pokud chat začne vracet chyby ověřování, proveďte import znovu.

## Související informace

- Pokyny pro Zed v Dockeru: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referenční implementace přihlášení Cursoru v OpenCodex (externí):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
