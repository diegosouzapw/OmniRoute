# Cursor Provider in Docker Environments (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kada se OmniRoute izvodi unutar Dockera, zastarjeli postupci **Uvoz iz Cursor IDE-a** /
`cursor-agent` ne uspijevaju jer spremnik ne može vidjeti instalaciju Cursora na
glavnom računalu. Umjesto toga upotrijebite **Prijavu putem Cursora** (deep-control PKCE).

## Zašto uvoz iz IDE-a / CLI-ja ne uspijeva u Dockeru

1. **Izolacija datotečnog sustava** — automatski uvoz traži Linux putanje poput
   `~/.config/Cursor/User/globalStorage/state.vscdb` _unutar_ spremnika.
   U Docker Desktopu za macOS baza podataka IDE-a s glavnog računala nije zadano montirana, a
   operacijski sustav spremnika jest Linux čak i kada je glavno računalo Darwin.
2. **Nema binarne datoteke `cursor-agent`** — službene OmniRoute slike ne sadrže
   `cursor-agent`. Dostupni modeli prethodno su pokretali
   `cursor-agent --list-models` i, u slučaju neuspjeha, koristili statički katalog.
3. **Pogrešna binarna datoteka** — **nemojte** bind-montirati macOS verziju programa `cursor-agent` u Linux
   spremnik. Neće se moći izvršiti.

## Preporučeno: Prijava putem Cursora

1. Otvorite **Nadzorna ploča → Pružatelji usluga → Cursor**.
2. Odaberite karticu **Prijava putem Cursora**.
3. Kliknite **Prijava putem Cursora** — OmniRoute otvara
   `https://cursor.com/loginDeepControl?…` u pregledniku na vašem **glavnom računalu**.
4. Odobrite prijavu u pregledniku, a zatim se vratite na nadzornu ploču. OmniRoute
   periodički provjerava `api2.cursor.sh/auth/poll` dok tokeni ne stignu.
5. OmniRoute pohranjuje tokene za **pristup + osvježavanje** i osvježava ih putem
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ovaj postupak ne zahtijeva Cursor IDE ni `cursor-agent` unutar spremnika.

## Otkrivanje modela

Uz prijavljenu vezu, **Dostupni modeli / Automatska sinkronizacija** daju prednost Cursorovu
HTTP katalogu `AiService/AvailableModels` koristeći bearer token veze.
Ako to ne uspije, OmniRoute i dalje pokušava upotrijebiti `cursor-agent` glavnog računala (kada je dostupan), a zatim
početne podatke statičkog registra.

OmniRoute u katalogu uvijek izlaže **`auto`** (prikaz „Automatski”), kao i
načine usmjerivača u stilu OpenCodexa **`auto-cost`**, **`auto-balance`** i
**`auto-intelligence`**. Pri prijenosu se oni mapiraju na Cursorov model `default`
(s `optimization` parametrom ModelParameter za tri varijante). Dajte prednost
`cu/auto` kada je iskorištena kvota premium modela — automatski način često još uvijek ima raspoloživog budžeta.

### Aktivni katalog isključiv je kada je sinkroniziran

Nakon uspješne sinkronizacije Cursorovih modela (`cursor-agent --list-models` → pohranjeni
sinkronizirani katalog ili gore navedeno dohvaćanje `AvailableModels` uz bearer autentifikaciju),
**nadzorna ploča**, **`/v1/models`** i popis **Testiraj sve** prikazuju:

1. Modele vraćene aktivnom sinkronizacijom
2. Dodane ID-ove automatskog usmjerivača: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Prilagođene** modele operatora (uvoz / ručno dodavanje) — sinkronizacija ih nikada ne uklanja

Veliki statički registar u
`open-sse/config/providers/registry/cursor/` služi **samo kao izvanmrežna pričuvna opcija**. Kada
je sinkronizirani katalog prazan (ili otkrivanje ne uspije), popis se vraća na taj registar.

ID-ovi sa sufiksom razine napora (na primjer `claude-4.6-sonnet-high`) i dalje se mogu
**zatražiti** tijekom izvođenja: `resolveRequestedModel` uklanja sufiks i pretvara ga u prijenosni
`ModelParameter`. Isključivi popis namjerno skriva te statičke varijante
iz opcije Testiraj sve kako bi provjere odgovarale onome što Cursor stvarno vraća kao dostupno.

### Pomoćne funkcije

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — spajanje za nadzornu ploču
- `ensureCursorAutoCatalogEntry` — dodavanje auto* modela tijekom otkrivanja i izrade popisa
- `shouldSuppressStaticModelForExclusiveListing` — statička petlja za `/v1/models`

## Ograničenja pružatelja usluga (kvota)

**Upotreba → Ograničenja pružatelja usluga** za Cursor koristi Bearer API-je na `api2.cursor.sh`
(`GetCurrentPeriodUsage` → sažetak upotrebe → auth/usage) nakon PKCE-a ili uvoza
tokena. Zastarjeli put putem kolačića / nadzorne ploče `cursor.com` ostaje posljednja pričuvna opcija
za starije sesije uvezene iz IDE-a.

Razdoblja obično uključuju **Ukupno**, **Auto + Composer** i **API**. Ako
ograničenja izgledaju prazno, ponovno pokrenite **Prijavu putem Cursora** ili ponovno uvezite tokene (sam uvoz iz IDE-a
više nije potreban).

## Prazni odgovori / iskorištena kvota

Kada Cursor prihvati pokretanje, ali ne vrati tekst asistenta (što je uobičajeno kada je premium
kvota iscrpljena), OmniRoute prikazuje koristan odgovor **429** (naznake vezane uz kvotu) ili
**502** sa smjernicama — umjesto same poruke „Pružatelj usluga vratio je prazan sadržaj”. Pogreške
strujanja kao što je `not_found: AI Model Not Found` (iscrpljeno razdoblje upotrebe)
klasificiraju se kao **prekoračenje Cursorova ograničenja brzine / upotrebe** i zadržavaju tu poruku
kroz SSE cjevovod (zajednička zaštita od praznog toka ne prepisuje
već emitiranu pogrešku). Provjerite Ograničenja pružatelja usluga, pokušajte s modelom **`auto`** ili povećajte
ograničenja Cursorova plana.

## Verzija klijenta (bez grafičkog sučelja)

Bez lokalne instalacije programa `cursor-agent`, OmniRoute određuje
`x-cursor-client-version` putem varijable okruženja `CURSOR_AGENT_CLI_VERSION`, zatim iz predmemoriranog na disku
dohvaćanja Cursorove instalacijske skripte, a potom iz fiksiranog ID-a međuverzije. Prema potrebi
postavite vlastitu vrijednost putem `CURSOR_AGENT_CLI_VERSION`.

## Pričuvna opcija: Ručni uvoz tokena

Ako ne možete dovršiti prijavu putem preglednika:

1. Na glavnom računalu izdvojite tokene iz Cursorove baze `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Otvorite **Uvoz tokena** u Cursorovu dijaloškom okviru za autentifikaciju.
3. Zalijepite **pristupni token** i, kada je dostupan, **token za osvježavanje** (potreban za
   automatsko osvježavanje). ID uređaja nije obavezan.

Uvozi koji sadrže samo pristupni token i dalje funkcioniraju, ali isteći će bez tokena za osvježavanje —
ponovno ih uvezite kada chat počne vraćati pogreške autentifikacije.

## Povezano

- Smjernice za Zed u Dockeru: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referenca za prijavu u Cursor putem OpenCodexa (vanjska):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
