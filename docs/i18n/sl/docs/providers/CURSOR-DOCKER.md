# Cursor Provider in Docker Environments (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Ko se OmniRoute izvaja znotraj Dockerja, podedovani postopki **Uvozi iz Cursor IDE** /
`cursor-agent` ne delujejo, ker vsebnik ne more dostopati do namestitve Cursorja
na gostitelju. Namesto tega uporabite **Prijava s Cursorjem** (deep-control PKCE).

## Zakaj uvoz iz IDE-ja/CLI-ja v Dockerju ne deluje

1. **Izolacija datotečnega sistema** — Samodejni uvoz išče poti Linux, kot je
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _znotraj_ vsebnika.
   V okolju Docker Desktop za macOS zbirka podatkov IDE-ja na gostitelju privzeto ni vpeta,
   operacijski sistem vsebnika pa je Linux, tudi ko je gostitelj Darwin.
2. **Ni binarne datoteke `cursor-agent`** — Uradne slike OmniRoute ne vsebujejo
   `cursor-agent`. Razdelek Razpoložljivi modeli je prej izvajal
   `cursor-agent --list-models` in ob neuspehu uporabil statični katalog.
3. **Napačna binarna datoteka** — Binarne datoteke `cursor-agent` za macOS **ne**
   vpenjajte v vsebnik Linux. Ne bo se izvedla.

## Priporočeno: Prijava s Cursorjem

1. Odprite **Nadzorna plošča → Ponudniki → Cursor**.
2. Izberite zavihek **Prijava s Cursorjem**.
3. Kliknite **Prijava s Cursorjem** — OmniRoute v vašem brskalniku na **gostitelju**
   odpre `https://cursor.com/loginDeepControl?…`.
4. V brskalniku odobrite prijavo in se nato vrnite na nadzorno ploščo. OmniRoute
   preverja `api2.cursor.sh/auth/poll`, dokler ne prejme žetonov.
5. OmniRoute shrani žetona za **dostop in osvežitev** ter ju osvežuje prek
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ta način ne zahteva Cursor IDE-ja ali `cursor-agent` znotraj vsebnika.

## Odkrivanje modelov

Pri prijavljeni povezavi funkcija **Razpoložljivi modeli / Samodejna sinhronizacija** prednostno uporabi Cursorjev
katalog HTTP `AiService/AvailableModels` z nosilnim žetonom povezave.
Če to ne uspe, OmniRoute še vedno poskusi uporabiti gostiteljski `cursor-agent` (če je prisoten), nato pa
statični začetni register.

OmniRoute v katalogu vedno ponuja **`auto`** (prikazano kot »Samodejno«) ter
načine usmerjevalnika v slogu OpenCodex: **`auto-cost`**, **`auto-balance`** in
**`auto-intelligence`**. Pri prenosu se ti preslikajo v Cursorjev model `default`
(s parametrom `optimization` vrste ModelParameter za tri različice). Ko je poraba
premium modelov izčrpana, uporabite `cu/auto` — Auto ima pogosto še vedno razpoložljivo kvoto.

### Sinhronizirani katalog v živo je izključujoč

Po uspešni sinhronizaciji modelov Cursor (`cursor-agent --list-models` → trajno shranjeni
sinhronizirani katalog ali zgoraj opisani pridobitvi `AvailableModels`, overjeni z nosilnim žetonom)
**nadzorna plošča**, **`/v1/models`** in seznam **Preizkusi vse** vsebujejo:

1. Modele, ki jih vrne sinhronizacija v živo
2. Dodane ID-je samodejnega usmerjevalnika: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Modele po meri** operaterja (uvožene / ročno dodane) — sinhronizacija jih nikoli ne odstrani

Velik statični register v
`open-sse/config/providers/registry/cursor/` se uporablja **samo kot nadomestna možnost brez povezave**. Ko
je sinhronizirani katalog prazen (ali odkrivanje ne uspe), seznam uporabi ta register.

ID-je s pripono stopnje napora (na primer `claude-4.6-sonnet-high`) je med izvajanjem še vedno
mogoče **zahtevati**: `resolveRequestedModel` odstrani pripono in jo pretvori v prenosni
`ModelParameter`. Izključujoči seznam namenoma skrije te statične različice
iz možnosti Preizkusi vse, tako da se preizkusi ujemajo z modeli, ki jih Cursor dejansko vrne kot razpoložljive.

### Pomožne funkcije

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — združevanje na nadzorni plošči
- `ensureCursorAutoCatalogEntry` — dodajanje auto* pri odkrivanju in izpisovanju
- `shouldSuppressStaticModelForExclusiveListing` — statična zanka `/v1/models`

## Omejitve ponudnika (kvota)

Razdelek **Poraba → Omejitve ponudnika** za Cursor po PKCE-ju ali uvozu žetonov
uporablja API-je z nosilnim žetonom na `api2.cursor.sh`
(`GetCurrentPeriodUsage` → povzetek porabe → auth/usage). Podedovana pot prek piškotkov oziroma
nadzorne plošče `cursor.com` ostaja zadnja nadomestna možnost za starejše seje, uvožene iz IDE-ja.

Okna običajno vključujejo **Skupaj**, **Auto + Composer** in **API**. Če
so omejitve videti prazne, znova izvedite **Prijava s Cursorjem** ali ponovno uvozite žetone (sam
uvoz iz IDE-ja ni več potreben).

## Prazni odgovori / izčrpana poraba

Ko Cursor sprejme izvajanje, vendar ne vrne besedila pomočnika (kar je pogosto, ko je
poraba premium storitev izčrpana), OmniRoute prikaže uporabno napako **429** (namigi glede kvote) ali
**502** z navodili — ne zgolj »Ponudnik je vrnil prazno vsebino«. Napake pretakanja,
kot je `not_found: AI Model Not Found` (izčrpano obdobje porabe), so
razvrščene kot **Cursorjeva omejitev hitrosti / presežena poraba**, to sporočilo pa se ohrani
skozi cevovod SSE (skupno varovalo pred praznim tokom ne prepiše že
oddane napake). Preverite Omejitve ponudnika, poskusite model **`auto`** ali povečajte
omejitve naročniškega paketa Cursor.

## Različica odjemalca (brez grafičnega vmesnika)

Brez lokalne namestitve `cursor-agent` OmniRoute določi
`x-cursor-client-version` najprej prek okoljske spremenljivke `CURSOR_AGENT_CLI_VERSION`, nato prek na disku predpomnjenega
zajema namestitvenega skripta Cursor in nazadnje prek pripetega ID-ja gradnje. Po potrebi jo
preglasite z `CURSOR_AGENT_CLI_VERSION`.

## Nadomestna možnost: ročni uvoz žetona

Če prijave v brskalniku ne morete dokončati:

1. Na gostitelju izvlecite žetone iz Cursorjeve datoteke `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. V modalnem oknu za overjanje Cursor odprite **Uvozi žeton**.
3. Prilepite **žeton za dostop** in, če je na voljo, **žeton za osvežitev** (potreben za
   samodejno osveževanje). ID naprave ni obvezen.

Uvoz samo žetona za dostop še vedno deluje, vendar bo brez žetona za osvežitev potekel —
ko klepet začne vračati napake pri overjanju, ga ponovno uvozite.

## Povezano

- Navodila za Zed v Dockerju: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referenca za prijavo Cursor v OpenCodex (zunanja):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
