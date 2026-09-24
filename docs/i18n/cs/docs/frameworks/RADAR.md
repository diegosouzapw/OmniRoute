# Radar Free-Model Catalog (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Zdroj pravdy:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Poslední aktualizace:** 2026-09-01 — v3.8.51
> **Hranice důkazů pro hostovanou službu:** zde popsaná pravidla na straně serveru byla ověřena
> 2026-09-01 vůči záměrně privátnímu serveru Radar na přesné revizi
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Tato implementace není distribuována v
> tomto OSS repozitáři; dostupnost hostované služby zůstává samostatným provozním stavem.

Radar je **volitelný doplněk**, který nad výchozí katalog vydání (`FREE_MODEL_BUDGETS` v
`open-sse/config/freeModelCatalog.data.ts`) přidává podepsaný, průběžně aktualizovaný katalog
bezplatných modelů. Existuje proto, že prostředí bezplatných úrovní se mění rychleji než
cyklus vydávání — poskytovatelé mezi jednotlivými vydáními přidávají, omezují nebo ruší
bezplatné kvóty a výchozí katalog lze aktualizovat pouze při vydání nové verze.

**Nic, co je dnes zdarma, nepřestane být zdarma kvůli vzdálenému zdroji dat.** Radar nikdy
nezpoplatní položku z výchozího katalogu; pouze při čtení aktualizuje pole limitů a stavu
a mezi vydáními může přidávat nově objevené bezplatné modely. Provozovatel může model
nadále lokálně skrýt a ze stejného řídicího panelu jej znovu obnovit. Samotný výchozí
katalog se na disku nikdy nemění — viz níže uvedená
[Pravidla slučování překryvných dat při čtení](#read-time-overlay-merge-rules).

---

## Stav dodání ve v3.8.51

Následující stav rozlišuje, co implementuje toto OSS vydání, od pozdějších pracovních
proudů Radaru. Jde o stav na úrovni kódu, nikoli o příslib, že je konkrétní hostované
nasazení nebo externí integrace aktuálně dostupná.

| Oblast                              | Stav v tomto vydání                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Klient podepsaného katalogu         | Implementováno za příznakem `RADAR_ENABLED`, se samostatným přihlášením, ověřováním Ed25519, lokálně šifrovaným nastavením a mezipamětí, trvalými přepsáními zobrazení a aktivace, vratnými náhrobky, plánovačem a řídicím panelem.                                                  |
| Aktivace pro přispěvatele           | Řídicí panel odkazuje na tok žádosti přes GitHub hostovaný na serveru a přijímá existující klíč `omr_…`. Způsobilost přispěvatele určuje privátní služba; OSS klient neobsahuje žádný token GitHubu ani logiku vydávání klíčů.                                                       |
| Aktivace klíčem podporovatele       | Implementováno. Nezpracovaný klíč je ověřen, v úložišti zašifrován, při čtení maskován a odesílán pouze synchronizací na straně serveru. Změna nebo vymazání klíče zneplatní všechny čtyři mezipaměti zdrojů dat citlivých na oprávnění.                                             |
| Odkazy s doporučením                | Implementovány jako samostatně podepsaný zdroj dat aktualizovaný každou hodinu. Pevné odkazy jsou komunitní úrovni dostupné okamžitě; časově omezené kampaně zůstávají živými daty dané úrovně.                                                                                      |
| Nabídky pro podporovatele           | Implementovány jako samostatný podepsaný zdroj dat dostupný pouze živě a jako stránka řídicího panelu. Klient znovu ověřuje uzavřené schéma výhod, zachovává poslední platnou mezipaměť, filtruje položky po vypršení platnosti a nabídky partnerů výslovně označuje.                |
| Přehledy a rozpoznání podporovatelů | Implementováno jako striktní podepsaný zdroj dat dostupný pouze živě, s hodnocením ELO spravovaným Radarem, faktickými údaji o aktuálnosti a trendech katalogu, ověřeným lokálním odznakem podporovatele, stránkou řídicího panelu a lokálními příkazy CLI pro stav a synchronizaci. |
| Platby a transakční e-maily         | V OSS klientovi nejsou implementovány. Nákup, darování, kontrola účtenek, obnovení a doručování e-mailů zajišťuje privátní služba; dostupnost hostované služby nadále závisí na jejím spravovaném nasazení a konfiguraci poskytovatele.                                              |
| Pracovní proud výzkumného agenta    | Není součástí tohoto vydání klienta. Spravovaný obsah zdrojů dat zůstává daty na straně serveru; v instalaci OmniRoute neběží žádný autonomní výzkumný agent.                                                                                                                        |

---

## Veřejná čtečka oznámení

Obecná čtečka oznámení je oddělená od příznaku funkce Radar. Domovská stránka řídicího panelu a
prohlížeč změn načítají veřejný soubor `news.json` repozitáře pomocí prostého požadavku `GET` na
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Neodesílají žádné nastavení Radaru, výzvy, konfiguraci
poskytovatele, záznamy o využití ani místní stav skrytí oznámení.

Soubor `news.json` používá uzavřené schéma v2 implementované funkcí `parseNewsPayload()`:

- `schemaVersion: 2` a kolekce `items[]` s omezenou velikostí;
- stabilní a jedinečné hodnoty `id` oznámení;
- explicitní pole `active` a `publishedAt` ve formátu ISO;
- povinný anglický text s volitelnými lokalizovanými texty;
- volitelné odkazy HTTPS nevyžadující přihlašovací údaje a ikona ze seznamu povolených ikon;
- výběr nejnovějšího aktivního oznámení, náhradní použití angličtiny pro chybějící lokalizaci a místní skrytí podle ID.

Parser dočasně přijímá také dřívější singulární strukturu `{ active, title, message, ... }`, aby
starší forky mohly přejít na novou verzi bez nefunkčního zobrazení změn. Neplatné kanály jsou nečinné. Položka
o spuštění Radaru se dodává s hodnotou `active: false`; změna na `true` je samostatná akce vydání
prováděná po sloučení a nasazení a nemění `RADAR_ENABLED` ani nezávislý souhlas se synchronizací kanálu.

---

## Příznak: `RADAR_ENABLED` (ve výchozím nastavení vypnutý)

Radar je kompletně řízen příznakem funkce `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorie `policies`,
`defaultValue: "false"`).

**Když je příznak vypnutý, dané rozhraní neexistuje:**

- Všechny koncové body `/api/radar/*`, včetně místního čtení a zápisu stavu modelů,
  vracejí `404`, aniž by přistoupily k jakémukoli modulu Radaru.
- Obrazovky řídicího panelu (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) vykreslí
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) vrací nezměněný základní katalog —
  stejný počet položek, stejné hodnoty, každá položka označená `origin: "baseline"` — a nikdy
  nečte mezipaměť kanálu.
- Nikdy nedojde k žádnému síťovému volání Radaru; každý synchronizační modul vrátí `{ status: "disabled" }`
  ještě před použitím `fetch`.

Jedná se o striktní nadřazenou bránu: zapnutí příznaku zpřístupní pouze _obrazovky_,
nic dalšího. Nenahrává data, nespouští synchronizaci na pozadí ani nemění
směrování či výběr modelu — viz samostatný souhlas níže.

---

## Synchronizace dat je SAMOSTATNĚ volitelná — závazek ochrany soukromí

Zapnutí `RADAR_ENABLED` pouze zpřístupní uživatelské rozhraní. Synchronizace kanálu vyžaduje druhý,
nezávislý souhlas uložený v `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrace `136_radar_cache_settings.sql`). `syncRadar()` před provedením jakéhokoli síťového volání kontroluje příznak _i_
souhlas:

```
Příznak vypnutý → { status: "disabled" } — žádné síťové volání
Souhlas neudělen → { status: "opt_out" }  — žádné síťové volání
```

Když jsou oba zapnuté, synchronizace probíhá následovně:

1. `GET <základní adresa URL kanálu>/v1/catalog/latest` s hlavičkou `x-omniroute-radar-schema: 2` a volitelnou
   hlavičkou `Authorization: Bearer <klíč podporovatele>` (viz níže). Pokud hlavička schématu chybí,
   servery ve výchozím nastavení poskytují samostatně podepsaný přechodový artefakt v1, takže starší nainstalovaní klienti
   nadále dostávají aktualizace.
2. Jde o aplikační tok určený pouze ke stahování, stále se však jedná o požadavek HTTPS. Hostovaná
   infrastruktura přijímá běžná metadata připojení, například zdrojovou IP adresu. Když je nakonfigurován klíč podporovatele,
   synchronizace tento klíč také odesílá v hlavičce Bearer, aby služba mohla určit příslušný
   nárok. V přesné revizi privátního serveru určené ve výše uvedených hranicích důkazů
   používá účtování požadavků kanálu hashe klíčů, agregované využití a denně obměňovaný zkrácený HMAC
   IP adresy pro ruční kontrolu zneužití; tyto tabulky neuchovávají klíč ani IP adresu v nezpracované podobě.
   Protokoly přístupu k infrastruktuře a šifrovaná fronta odchozího doručování představují samostatné provozní
   hranice.
3. OmniRoute službě Radar nikdy neodesílá výzvy, odpovědi, konverzace, přihlašovací údaje
   poskytovatelů, provoz modelů, údaje o dostupnosti, latenci ani místní konfiguraci poskytovatelů.
4. Odpověď je ověřena, validována a uložena do místní mezipaměti (viz
   [Model zabezpečení](#security-model)). Radar má přesně čtyři síťové cesty na straně serveru:
   `syncRadar()` pro katalog, `syncRadarReferrals()` pro doporučení a
   `syncRadarOffers()` / `syncRadarIntel()` pro nabídky a Intel určené pouze podporovatelům.

**Klíč podporovatele** je volitelný token Bearer (`radar_settings.supporter_key`),
který službě kanálu umožňuje rozhodnout, kterou úroveň poskytne (viz
[Úrovně](#tiers-community-and-live)). Tento klíč je:

- Uložen **šifrovaně** pomocí stejných pomocných funkcí AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`), které se používají pro přihlašovací údaje poskytovatelů.
- Nastavován prostřednictvím `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) a
  **nikdy se nevrací v plné podobě** — odpověď obsahuje maskovanou podobu (`omr_****abcd`).
- Jeho změna nebo odstranění atomicky zneplatní mezipaměti katalogu, doporučení, nabídek a Intel. Při
  příští synchronizaci či čtení se nový nárok určí na straně serveru; samotné uložení klíče
  nevyvolá síťový požadavek ani nespotřebuje jednorázový aktivační klíč.
- Odesílá se službě kanálu jako token Bearer při synchronizačním požadavku GET — žádné další informace o
  klíči klient nikdy neopustí.

---

## Pravidla přístupu a bezpečnosti zobrazená před udělením souhlasu

Neaktivní řídicí panel zobrazuje tato pravidla ze souboru
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **před** kteroukoli z akcí aktivace.
Kanonická škála přístupu je:

| Úroveň                | Způsobilost                                                                      | Přístup                                         | Pravidlo opakování/expirace                                        |
| --------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Komunita              | Kdokoli; bez klíče                                                               | Kompletní katalog se zpožděním přibližně 30 dní | Vždy dostupné; bez vydávání                                        |
| Hvězdička + sledování | GitHub OAuth ověří jak hvězdičku u repozitáře, tak sledování jeho vlastníka      | Jedno načtení živého katalogu, poté Komunita    | Jedno vydání na přihlášení; nikdy se nevydává znovu                |
| Přispěvatel Top 10    | Pozice 1–10 v nejnovějším úplném týdenním žebříčku                               | 365 dní živého přístupu                         | Nárokováno na vyžádání; opuštění žebříčku nezkrátí přiznané období |
| Přispěvatel Top 100   | Pozice 11–100 v tomto žebříčku                                                   | 90 dní živého přístupu                          | Stejné pravidlo nárokování na vyžádání/idempotentního nárokování   |
| Nákup podporovatele   | Jednorázový nákup na 6 měsíců, 1 rok nebo doživotně                              | Živý katalog, podepsané živé nabídky a Intel    | Bez automatického obnovení                                         |
| Dar/ruční udělení     | Dar posouzený vlastníkem nebo udělení vlastníkem na výslovný počet dní/doživotně | Stejné živé oprávnění po udělenou dobu          | Auditované, idempotentní udělení                                   |

Sloučené PR, commity a změněné řádky jsou **pouze vstupy pro žebříček**. Přihlášení mimo Top 100
nezíská žádné oprávnění přispěvatele bez ohledu na počet PR. Časově omezené nákupy, dary, období
přispěvatele a ruční udělení se přičítají k aktuální době expirace; doživotní přístup má přednost.
Změna pořadí nikdy zpětně neodebere ani nezkrátí již přiznanou dobu.

Hostovaná licence je osobní a pravidlo prezentované uživatelům povoluje vždy pouze jednu aktivní
instalaci. Toto vydání **netvrdí**, že používá hardwarový zámek: synchronizace OSS nevytváří otisk
hardwaru ani neudržuje kryptografický pronájem zařízení. Ve výše uvedené ověřené revizi soukromého
serveru spočívá implementované vynucování v ověřování oprávnění a signálu pro ruční kontrolu, pokud
je stejný aktivní klíč během 24 hodin zaznamenán ze čtvrté odlišné IP adresy. Tento signál nikdy
automaticky neblokuje ani neruší klíč. Obnovení zruší a nahradí ztracený klíč, přičemž zachová
stávající dobu expirace; zakoupené ani udělené období se tím nespustí znovu.

Živé nabídky jsou ručně spravovány a mohou se změnit nebo vypršet. Obrazovka pro udělení souhlasu
také přesně vymezuje hranice ochrany soukromí: stahují se podepsaná metadata katalogu/doporučení;
platný klíč navíc odemyká podepsané nabídky a Intel; Bearer klíč a běžná metadata připojení se
odesílají hostované službě; prompty, odpovědi, konverzace, přihlašovací údaje poskytovatelů,
provoz modelů, doba provozu, latence a místní konfigurace poskytovatelů se neodesílají.

---

## Získání podporovatelského klíče

Aktivační obrazovka (`/dashboard/radar`) odkazuje na dva postupy pro **získání**
podporovatelského klíče. Samotný OSS repozitář jej nikdy nevydává, nespouští žádný platební kód a
**nikdy neuvádí cenu** — ceny jsou určovány a zobrazovány výhradně na
cílových stránkách, nikoli v tomto repozitáři (specifikace D14).

- **„Jsem přispěvatel“** — otevře `RADAR_CONTRIBUTOR_CLAIM_URL` (výchozí hodnota
  `https://radar.omniroute.online/auth/github`), což je proces nárokování prostřednictvím GitHub OAuth hostovaný na
  privátním serveru Radar. Kontroluje nejnovější úplný týdenní žebříček: prvních 10 získá 365 dní
  a pozice 11–100 získají 90 dní. Mimo prvních 100 příspěvky ve formě PR nikdy přístup nezajistí; proces
  namísto toho kontroluje samostatnou jednorázovou úroveň za hvězdičku + sledování.
- **„Podpořit projekt“** — otevře `RADAR_SUPPORTER_PLANS_URL` (výchozí hodnota
  `https://radar.omniroute.online/planos`), hostovanou stránku s jednorázovými možnostmi na 6 měsíců, 1 rok a
  doživotně. OSS stránka nadále nezobrazuje žádnou peněžní částku.

Obě URL jsou vyhodnocovány na straně serveru (`src/lib/radar/links.ts`, stejný způsob přepsání
pomocí proměnných prostředí jako u `RADAR_FEED_URL`) a předávány dashboardu prostřednictvím stávající
odpovědi `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — klientská
komponenta nikdy sama nečte `process.env`.

| Proměnná                      | Účel                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Přepisuje URL pro nárokování přispěvatele (výchozí `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Přepisuje URL plánů pro podporovatele (výchozí `https://radar.omniroute.online/planos`).          |

### Obnovení ztraceného podporovatelského klíče

Vstupním bodem pro obnovení v hostované službě je `https://radar.omniroute.online/recover`; odkazuje
na něj také stránka s plány. Obnovení probíhá zcela mimo OSS klienta, protože místní
instalace nikdy neobdrží e-mail kupujícího/přispěvatele a nedokáže z
šifrovaných nastavení rekonstruovat nezpracovaný klíč.

1. Odešlete e-mail spojený s klíčem. Služba vrátí stejnou stránku s potvrzením bez ohledu na to, zda
   obnovitelná licence existuje, takže formulář neumožňuje zjišťovat existenci účtů.
2. Pokud jsou splněny podmínky, pracovní proces pro doručování odešle krátkodobý odkaz na jedno použití. Jeho otevření okamžitě přesune
   token do dočasného šifrovaného souboru cookie `HttpOnly`/`Secure` a přesměruje na čistou
   URL `/recover`; stránka neobsahuje žádný token, e-mail, starý klíč ani náhradní klíč.
3. Potvrďte zneplatnění. Privátní služba zneplatní předchozí klíč, vytvoří náhradní se
   stejným plánem/datem vypršení platnosti a v rámci jedné transakce jej zařadí do fronty k odeslání e-mailem. Náhradní klíč se nikdy
   nevrací do prohlížeče.
4. Vložte náhradní klíč do `/dashboard/radar`. Starý klíč se nyní musí přepnout na `community`;
   náhradní klíč musí provést ověřenou synchronizaci `live`. Opětovné otevření stejného odkazu pro obnovení musí selhat
   s obecnou odpovědí o neplatném odkaz-u či vypršení jeho platnosti.

Hostovaná trasa pro obnovení a pracovní proces pro e-maily mohou být přítomny v kódu, a přesto v daném
nasazení nedostupné. Neoznačujte tento postup za připravený k produkčnímu použití, dokud nebude nasazen server,
poskytovatel doručování nakonfigurován s kontrolovaným příjemcem a nebude otestován celý odkaz na jedno použití.

Jakmile návštěvník získá klíč (`omr_` + 40 hexadecimálních znaků), aktivační obrazovka
(`src/app/(dashboard)/dashboard/radar/page.tsx`) nabídne jako primární
postup pole pro vložení klíče: vložení a odeslání klíče odešle `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) v jediném volání — vložení klíče jej současně nastaví a aktivuje účast,
čímž obrazovku odemkne. Formát (`omr_` + 40 hexadecimálních znaků) je nejprve kontrolován na straně klienta
pomocí sdílené pomocné funkce `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
pro lepší uživatelský komfort; rozhodující kontrolou je v každém případě schéma Zod na serveru. Jakmile je
klíč nastaven, aktivační obrazovka namísto prázdného pole zobrazí jeho maskovanou podobu (`supporterKeyMasked` z
`GET /api/radar/settings`) s ovládacím prvkem „změnit klíč“ pro
vložení nového — celý klíč se už nikdy znovu nezobrazí. Dvě výše uvedená tlačítka pro nárokování/plány
nadále slouží k prvotnímu _získání_ klíče; do tohoto pole jej aktivuje operátor,
který už klíč má.

### Kompletní aktivace a průvodce nastavením

Privátní služba kanálu a tento OSS klient mají záměrně úzce vymezené rozhraní: služba
vydává a ověřuje podporovatelský klíč, zatímco místní instalace OmniRoute klíč šifruje,
synchronizuje podepsané artefakty na straně serveru a provází nastavením poskytovatele. Pořadí asistovaného ověřování je:

1. Získejte nově vydaný nebo obnovený klíč z procesu uplatnění nároku přispěvatele, plánů/pokladny, procesu
   obnovení nebo od autorizovaného provozovatele soukromého serveru. Nevkládejte nezpracovaný klíč do protokolů,
   snímků obrazovky, komentářů k problémům ani argumentů příkazového řádku.
2. Povolte příznak funkce `RADAR_ENABLED` v místní instalaci OmniRoute. Tím se zpřístupní uživatelské rozhraní,
   ale síťová komunikace zůstane neaktivní, dokud nebude uložen samostatný výslovný souhlas.
3. Otevřete `/dashboard/radar`, vložte klíč a proveďte aktivaci. Prohlížeč odešle jeden místní požadavek
   `POST /api/radar/settings` s `{ optIn: true, supporterKey }`; klíč se místně zašifruje a
   odpověď obsahuje pouze `omr_****<last4>`.
4. Nechte aktivační obrazovku provést synchronizaci katalogu nebo vyberte **Synchronizovat nyní**. Ověřte, že stránka
   uvádí stav `live`, verzi zdroje a čas načtení. Pro ověřenou místní diagnostiku vrací
   `GET /api/radar/status` informace o výslovném souhlasu, přítomnosti klíče a čtyřech stavech mezipaměti, aniž by vrátil
   samotný klíč. Pomocí `POST /api/radar/sync-all` lze explicitně aktualizovat katalog, doporučení, nabídky a Intel.
5. Otevřete `/dashboard/radar/setup?provider=<provider>`. Přejděte na adresu URL pro přihlašovací údaje spravovanou poskytovatelem,
   vyberte **Přidat klíč API**, uložte jej prostřednictvím skutečného formuláře poskytovatele, vraťte se do průvodce a spusťte
   **Otestovat připojení**. Průvodce používá standardní trasy `/api/providers` a
   `/api/providers/<connection-id>/test`; nevytváří paralelní přihlašovací údaj pro Radar.
6. Jakmile budou aktivní alespoň dvě kompatibilní připojení poskytovatelů, otevřete `/dashboard/radar/combos`.
   Zkontrolujte navrhovanou skupinu a vytvořte kombinaci prostřednictvím stávajícího API pro kombinace. Nabídky a
   Intel zůstávají oddělenými podepsanými mezipaměťmi dostupnými pouze v režimu live a lze je zkontrolovat na jejich vyhrazených stránkách Radaru.
7. Znovu načtěte `/dashboard/radar` a stránku nastavení. Výslovný souhlas, stav maskovaného klíče, ověřená mezipaměť, uložené
   připojení poskytovatele a akce testování musí po opětovném načtení zůstat zachovány. Důkazy zaznamenejte až poté, co
   nezpracovaný klíč a přihlašovací údaj poskytovatele již nebudou viditelné.

Samotné uložení klíče není důkazem oprávnění k režimu live. Důkazem je kombinace výsledku
`GET /v1/license/check` soukromé služby, úrovně `live` poskytované katalogem OSS, ověřené podepsané
mezipaměti a skutečného toku připojení/testování poskytovatele. Neplatný, prošlý nebo odvolaný klíč bezpečně
přepne katalog na `community`; nesmí být vykázán jako úspěšné ověření klíče pro režim live.

### Odkaz na soukromý panel správce

`RADAR_ADMIN_URL` volitelně přidá položku **Správa Radaru ↗** bezprostředně za uživatelskou položku
Radar v sekci Náklady na bočním panelu. Záměrně nemá žádnou výchozí hodnotu: pokud proměnná
není nastavena nebo je neplatná, statický boční panel, paleta příkazů ani obrazovka přizpůsobení bočního panelu neobsahují
žádnou položku správce ani soukromou adresu URL.

Hodnota se vyhodnocuje na straně serveru a prostřednictvím odpovědi
`GET /api/settings` chráněné ověřením pro správu se předává pouze ověřené relaci řídicího panelu nebo důvěryhodnému
vlastníkovi na loopback rozhraní během místního počátečního nastavení bez přihlášení. Ověření pomocí CLI, interní služby a klíče API
s rozsahem správy tuto hodnotu neobdrží. Prohlížeč odpověď před vytvořením
externího odkazu, který se otevře s `noopener noreferrer`, znovu ověří.

Použijte adresu URL tunelu/tailnetu přes HTTPS bez přihlašovacích údajů. Prostý protokol HTTP je přijímán pouze pro přesměrování SSH
na loopback rozhraní, například `http://127.0.0.1:9351`; jiná schémata, vložené přihlašovací údaje, chybně formátované adresy URL a
vzdálené cíle HTTP jsou bezpečně odmítnuty a navigace zůstane neaktivní.

---

## Bezpečnostní model

### Podpis Ed25519 přes přesné bajty

Datový obsah feedu je podepsán pomocí Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) ověřuje podpis nad **přesnými bajty odpovědi**
přijatými po síti — datový obsah se před ověřením nikdy znovu neserializuje, takže
opětovné zakódování bajt po bajtu nemůže nepozorovaně zneplatnit ani obejít kontrolu podpisu.
Selhání ověření (`invalid_signature`) přeruší synchronizaci ještě předtím, než je datový obsah
analyzován nebo uložen do mezipaměti.

### Připnutý veřejný klíč + rotace

Veřejný klíč pro ověřování je připnut v `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`) jako pole, aby bylo možné před rotací přidat nový klíč
na začátek, zatímco staré feedy v mezipaměti podepsané předchozím klíčem zůstanou
platné až do další synchronizace.

### Přepsání pomocí proměnných prostředí s ohledem na forky

Dvě proměnné prostředí umožňují forkům a uživatelům provozujícím vlastní instanci
nasměrovat klienta na vlastní feed namísto výchozí služby OmniRoute — viz níže
[Jak provozovat vlastní feed](#how-to-self-host-a-feed):

| Proměnná            | Účel                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Přepíše základní URL feedu (výchozí je `https://radar.omniroute.online`).                                          |
| `RADAR_FEED_PUBKEY` | Přepíše připnutý veřejný klíč (SPKI ve formátu base64-DER nebo PEM) a nahradí vestavěné pole tímto jediným klíčem. |

### Minimální verze

`syncRadar()` odmítne stažený feed, jehož `version` není striktně novější než
aktuálně uložená verze v mezipaměti (`compareVersions()`, porovnání tečkami odděleného
formátu `YYYY.MM.DD.n`) — `{ status: "stale" }`. Tím se zabrání tomu, aby napadený
nebo nesprávně nakonfigurovaný koncový bod feedu vrátil klienta ke staršímu datovému
obsahu podepsanému jiným způsobem.

### Dvě data a proč se uchovávají obě

Feed uložený v mezipaměti obsahuje dvě odlišná data a právě možnost jejich záměny
je důvodem, proč se uchovávají obě:

| Pole          | Původ                  | Na jakou otázku odpovídá         |
| ------------- | ---------------------- | -------------------------------- |
| `generatedAt` | tělo podepsaného feedu | jak stará jsou **data**          |
| `fetchedAt`   | hodiny této instalace  | kdy je tato instalace **stáhla** |

Feed stažený před několika minutami může obsahovat několik týdnů staré údaje, takže
samotné `fetchedAt` operátorovi neřekne, zda je překryvná vrstva aktuálnější než
základní data, nad kterými se zobrazuje. Obě hodnoty se ukládají do
`radar_feed_cache`, vracejí se prostřednictvím `getRadarCatalog().meta` a samostatně
se uvádějí v odpovědi `GET /api/radar/status`. Řádek uložený do mezipaměti předtím,
než existoval sloupec `generated_at` (migrace 163), se načte jako `null` — neznámá
hodnota zůstává neznámá a nepřebírá čas stažení. `radar_referrals_cache` si uchovává
vlastní `generated_at` již od migrace 142.

Výše uvedená minimální verze porovnává `version`, nikoli některé z těchto dat.

Zůstávají dvě mezery, obě záměrně: řídicí panel stále zobrazuje pouze `Last fetched`,
takže zobrazení data sestavení na tomto místě vyžaduje nový popisek (a jeho 41
lokalizovaných variant); mezipaměti nabídek a zpravodajských informací navíc datum
sestavení vůbec neuchovávají, přestože jej jejich schémata feedů obsahují — `GET
/api/radar/status` proto toto pole u těchto dvou mezipamětí vynechává, namísto aby
uváděl hodnotu `null`, která by se interpretovala jako „neznámá“.

### Ověření schématu

Stažené bajty jsou analyzovány a ověřeny podle `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, schéma Zod) **až po** ověření podpisu. Neshoda
se schématem vrátí `{ status: "invalid_schema" }` a mezipaměť zůstane
beze změny. Datový obsah v mezipaměti je z bezpečnostních důvodů znovu ověřován
při každém načtení (`getRadarCatalog()`) — poškozený nebo ručně upravený řádek
mezipaměti způsobí návrat k základním datům namísto toho, aby byl použit.

### Limit velikosti odpovědi (10 MB)

`syncRadar()` vynucuje **pevný limit 10 MB** pro tělo odpovědi feedu — podepsaný
feed je dokument JSON o velikosti v řádu KB, takže cokoli nad tímto limitem ukazuje
na nesprávně nakonfigurovanou nebo nepřátelskou adresu `RADAR_FEED_URL` (případně
na zdroj vyšší úrovně poskytující nesmyslná data), nikoli na legitimní katalog.
Limit se vynucuje ve dvou vrstvách:

1. Předběžná kontrola `Content-Length` zcela přeskočí čtení těla, pokud
   hlavička již deklaruje hodnotu překračující limit.
2. Kontrola průběžného součtu při čtení těla vynutí limit i tehdy, když
   `Content-Length` chybí nebo uvádí menší hodnotu než skutečná velikost — samotné
   hlavičce se nikdy nedůvěřuje. Zřetězení nashromážděných bloků zachová přesné
   bajty potřebné pro následnou kontrolu podpisu Ed25519.

Překročení limitu vrátí `{ status: "too_large" }` a ponechá mezipaměť beze změny,
v souladu se stejným nedestruktivním postupem jako u všech ostatních selhání
synchronizace (`invalid_signature`, `invalid_schema`, `stale`).

---

## Úrovně: `community` a `live`

Schéma feedu obsahuje pole `tier: "community" | "live"`, o jehož hodnotě rozhoduje
**na straně serveru** služba feedu na základě požadavku (přítomnosti a platnosti klíče podporovatele)
— klient nikdy nerozhoduje o své vlastní úrovni.

- **`community`** — bezplatný katalog opožděný přibližně o 30 dní oproti nejnovějším
  datům. Tuto úroveň obdrží neověřený požadavek nebo požadavek s neplatným klíčem.
- **`live`** — nejnovější katalog poskytovaný požadavkům s platným klíčem
  podporovatele.

**Neplatný nebo prošlý klíč podporovatele způsobí přechod na `community` — nikdy nejde
o chybu.** Synchronizační cesta rozlišuje pouze selhání podpisu/schématu/verze (všechna
jsou obnovitelná a pro stav mezipaměti nefatální) od úspěšného výsledku `{ status:
"updated", version, tier }`. Klient nemusí obsluhovat žádnou chybovou cestu specifickou
pro určitou úroveň.

### Poskytovaná úroveň pochází z hlavičky odpovědi, nikoli z podepsaného těla

Pole `tier` v podepsaném **těle** feedu má vždy hodnotu `"live"` — služba feedu distribuuje
**dva podepsané artefakty pro každou verzi**: varianta live zahrnuje aktuální kampaně, zatímco varianta community
je vynechává. Každý artefakt je podepsán nad svými vlastními přesnými bajty. Tělo však stále
neslouží k rozhodování o oprávnění; úroveň skutečně vybraná pro požadavek je uvedena
v **hlavičce odpovědi `x-omniroute-feed-tier`** a je určena na straně serveru podle klíče
`Authorization` z požadavku.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) je jediné místo,
které určuje úroveň, jíž má klient důvěřovat:

1. Analyzuje `x-omniroute-feed-tier` pomocí `RadarTierSchema` (Zod) — chybějící hlavička nebo
   hodnota, která není přesně `"community"` či `"live"`, se považuje za **nepřítomnou
   ** (nikdy se v původní podobě nepřenese jako důvěryhodná do mezipaměti/UI; to zahrnuje také starší servery
   feedu, které vznikly před zavedením této hlavičky).
2. Pouze pokud krok 1 nic nevrátí, použije jako náhradní hodnotu pole `tier` z podepsaného těla
   (vždy `"live"`).
3. Určená úroveň se uloží do mezipaměti a vrátí jako `{ status: "updated",
version, tier }` — řídicí panel zobrazuje tuto hodnotu, nikdy nezobrazuje nezpracované pole
   z těla.

---

## Pravidla slučování překryvné vrstvy při čtení

`applyFeed()` (`src/lib/radar/applyFeed.ts`) slučuje feed uložený v mezipaměti **přes**
statický základ **při čtení** uvnitř `getRadarCatalog()`. Pole základu
(`FREE_MODEL_BUDGETS`) se nikdy nemění — při každém volání se nově vypočítá `MergedEntry[]`.

Čtyři pravidla v pořadí podle priority:

1. **Feed nikdy nepřepíše místní nastavení.** Pro jednotlivá pole platí: pokud provozovatel
   upravil pole záznamu (mapa `localOverrides` s klíčem `provider:modelId`),
   hodnota tohoto konkrétního pole z feedu se přeskočí — přednost má hodnota provozovatele.
2. **`enabled: false` záznam deaktivuje a zachovává informaci o původu.** Záznam feedu, který
   záznam vypne, nastaví ve sloučeném výsledku `enabled: false` a `disabledBy: "radar"`,
   aby UI mohlo vysvětlit, _proč_ se dostupný záznam změnil na deaktivovaný.
3. **Uživatelem přidaný záznam, který není ve feedu, zůstane beze změny.** Záznamy, které
   existují pouze v základu (nebo byly přidány místně) a nemají odpovídající záznam ve feedu,
   projdou beze změny.
4. **Záznam označený náhrobkem se nikdy neobnoví.** Pokud provozovatel záznam výslovně odstranil
   (sada `tombstones`), jeho opětovné přidání do feedu jako `provider:modelId` v pozdější
   verzi jej nevrátí.

Upravitelná pole a náhrobky jsou trvale uloženy v
`radar_local_model_state` (migrace `153_radar_local_model_state.sql`). Veřejný databázový
adaptér (`src/lib/db/radar.ts`) převádí tyto řádky na mapu `localOverrides` a sadu
`tombstones`, které používá `applyFeed()`; produkční `getRadarCatalog()` načte tento stav
poté, co projdou kontroly příznaku, mezipaměti a schématu. Provozovatel může upravovat pouze `displayName` a `enabled`.
Identitu poskytovatele/modelu, původ ve feedu, kvótu, schopnosti, ToS
ani údaje o nastavení nelze prostřednictvím tohoto rozhraní zapsat.

Řídicí panel nabízí čtyři místní akce:

- **Upravit** změní místní zobrazovaný název a stav aktivace.
- **Obnovit místní změny** vymaže obě upravitelná pole, aniž by změnilo náhrobek.
- **Skrýt** vytvoří náhrobek, takže pozdější aktualizace feedu nemohou řádek znovu vytvořit.
- **Obnovit** odstraní náhrobek; jakékoli samostatně uložené přepsání zůstane v platnosti.

Hodnota `enabled: false` z feedu zůstává bezpečnostní výjimkou: má přednost před zastaralou místní
hodnotou `enabled: true`, ponechá sloučený záznam deaktivovaný a zaznamená `disabledBy: "radar"`.

Publikace katalogu používají `schemaVersion: 2`. `contextWindow` a každá z hodnot `tools`, `vision` a
`thinking` mají nezávisle typ `number | null` / `boolean | null`: `null` znamená neznámou hodnotu, zatímco
`false` znamená, že oficiální zdroj poskytovatele ověřený podle D16 výslovně uvádí nepřítomnost dané schopnosti.
Interní příznaky registru/specifikace modelu OmniRoute se nikdy přímo nepovyšují na fakta feedu. Klient
nadále přijímá snímky v1; protože starý sestavovací nástroj používal `false` jako zástupnou hodnotu nepřítomnosti, v1 `false` se
normalizuje na neznámou hodnotu, zatímco v1 `true` zůstává faktickou hodnotou. Neznámé verze schématu bezpečně selžou a
poslední platná mezipaměť zůstane dostupná. Každý model v2 s nenulovým kontextem/schopností musí obsahovat
`metadataEvidenceUrls[]` s adresami HTTPS nevyžadujícími přihlašovací údaje; jinak ověření schématu selže a mezipaměť
nebude nahrazena. Tabulka katalogu vykresluje všechny tři stavy jako `✓`, `✕` a `?`.

### Průvodcem vytvářené kombinace a přístup k MCP

Potvrzené hodnoty `familyId` zůstávají zachovány při překrytí během čtení a používá je čistý
modul `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Rodina se navrhne
pouze tehdy, když mají alespoň dva různí poskytovatelé aktivní připojení a nabízejí přesný spravovaný identifikátor
modelu. Deaktivované modely, neaktivní poskytovatelé, chybějící identifikátory modelů, rodiny s jediným členem a nejednoznačné
shody aliasů/předpon bezpečně selžou. Návrhy používají existující strategii `priority`, která řadí
největší opakovaný měsíční rozpočet jako první; UI je vytváří pouze prostřednictvím `POST /api/combos`.

Průvodce v uživatelském rozhraní se nachází na adrese `/dashboard/radar/combos`. Čte pouze místní
koncové body `GET /api/radar/catalog` a `GET /api/combos/builder/options`. Nikdy nespouští synchronizaci Radaru,
nečte přihlašovací údaje poskytovatele ani nezapisuje přímo do databáze kombinací.

Klienti MCP mohou číst stejnou místní projekci pomocí `omniroute_radar_catalog` (`read:radar`). Volitelné
filtry `provider`, `familyId` a `enabledOnly` se vyhodnocují po jednom místním
načtení přes `GET /api/radar/catalog`. Jeho uzavřený výstup zahrnuje metadata katalogu a dále poskytovatele/model,
zobrazovaný název, `familyId`, kvótu, funkce, stav povolení, původ a `disabledBy`; adresy URL pro nastavení,
postup, připojení, e-mailové adresy, klíče ani referenční údaje se nikdy nevracejí. Tento nástroj je
pouze pro čtení a nikdy nevolá `/api/radar/sync`.

### Značky původu

Každá sloučená položka obsahuje pole `origin`, které uživatelské rozhraní vykresluje jako odznak:

- `"baseline"` — beze změn ze statického katalogu vydání.
- `"radar"` — jedno nebo více polí bylo aktualizováno z informačního kanálu.
- `"local"` — operátor má u této položky alespoň jednu místní úpravu (místní
  úpravy mají podle pravidla 1 vždy přednost před informačním kanálem bez ohledu na jeho obsah).

---

## Lokální rozhraní — nikdy ne proxy feedu

Níže uvedené rodiny lokálních tras Radar zajišťují uživatelské rozhraní v `src/app/api/radar/`:

| Trasa                          | Metoda | Účel                                                                                                                      |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Vrací sloučený katalog (`getRadarCatalog()`) z lokální mezipaměti.                                                        |
| `/api/radar/sync`              | POST   | Spustí `syncRadar()` na straně serveru a vrátí výsledný stav.                                                             |
| `/api/radar/settings`          | GET    | Vrací `{ optIn, hasSupporterKey, supporterKeyMasked }` — nikdy ne nezpracovaný klíč.                                      |
| `/api/radar/settings`          | POST   | Nastaví souhlas a/nebo (zašifrovaný) klíč podporovatele.                                                                  |
| `/api/radar/referrals`         | GET    | Vrací `{ fixed, campaigns, tier }` z lokální mezipaměti — viz níže [Odkazy pro doporučení](#referral-links-free-credits). |
| `/api/radar/offers`            | GET    | Vrací aktivní nabídky z ověřené lokální živé mezipaměti; nikdy nevrací klíč podporovatele.                                |
| `/api/radar/offers/sync`       | POST   | Spustí serverovou pipeline `syncRadarOffers()`, která používá pouze živý klíč.                                            |
| `/api/radar/intel`             | GET    | Vrací ověřená lokální živá data Intel a booleovský příznak rozpoznání podporovatele; nikdy ne identitu ani klíč.          |
| `/api/radar/intel/sync`        | POST   | Spustí serverovou pipeline `syncRadarIntel()`, která používá pouze živý klíč.                                             |
| `/api/radar/status`            | GET    | Vrací lokální stav nastavení a mezipaměti pouze pro čtení pro katalog, doporučení, nabídky a Intel, bez tajných údajů.    |
| `/api/radar/sync-all`          | POST   | Spustí všechny čtyři serverové synchronizační moduly a vrátí samostatný stav pro každý feed.                              |
| `/api/radar/local-model-state` | GET    | Vypíše uložená přepsání a záznamy tombstone pro ovládací prvky úprav a obnovení.                                          |
| `/api/radar/local-model-state` | PATCH  | Nastaví nebo vymaže ověřená pole přepsání `displayName`/`enabled`.                                                        |
| `/api/radar/local-model-state` | PUT    | Vytvoří nebo odstraní záznam tombstone pomocí `{ provider, modelId, tombstoned }`.                                        |
| `/api/radar/local-model-state` | DELETE | Vymaže upravitelná pole přepsání a zachová případný záznam tombstone.                                                     |

**Pevné pravidlo: tyto trasy nikdy nefungují jako proxy služby feedu.** Prohlížeč komunikuje
výhradně s lokálním serverem OmniRoute. Čtyři moduly, které komunikují se službou Radar, jsou
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (doporučení) a
`src/lib/radar/offersSync.ts` (nabídky) spolu s `src/lib/radar/intelSync.ts` (Intel); všechny běží
na straně serveru, nikdy na straně klienta. Díky tomu se
URL feedu ani případný klíč podporovatele nikdy neobjeví v síťovém provozu směřujícím ke klientovi.

Všechny koncové body Radar vracejí `404`, když je `RADAR_ENABLED` vypnutý (viz
[Flag](#flag-radar_enabled-default-off) výše), a chybové odpovědi směrují přes
`buildErrorBody()`/`sanitizeErrorMessage()` v souladu s pravidlem sanitizace chyb platným pro celý repozitář
(`docs/security/ERROR_SANITIZATION.md`).

### Ověřování

Všechny koncové body Radar vyžadují ověření prostřednictvím `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — cookie relace řídicího panelu nebo API klíč s rozsahem
pro správu, tedy stejnou bránu, která chrání zbytek `/api/settings/*`. Kontrola
`404` při vypnutém příznaku proběhne vždy **před** kontrolou ověření, takže instalace s vypnutým
`RADAR_ENABLED` zůstává bajtově identická (bez výzvy k ověření jen kvůli zjištění, že rozhraní neexistuje);
jakmile je příznak zapnutý, neověřený požadavek obdrží `401` ještě před jakýmkoli čtením z DB nebo
zápisem do ní. `GET /api/radar/settings` nikdy nevrací nezpracovaný klíč podporovatele bez ohledu na
stav ověření — pouze jeho maskovanou podobu a booleovský příznak `hasSupporterKey`.

---

## Nabídky pro podporovatele

Nabídky používají vlastní podepsaný artefakt `GET /v1/offers/latest` a nikdy nesdílejí mezipaměť katalogu ani
doporučení. Koncový bod serveru vyžaduje platný aktivní klíč Bearer podporovatele; žádná
komunitní záložní možnost neexistuje. Funkce `syncRadarOffers()` proto skončí ještě před síťovým požadavkem, pokud je příznak funkce
vypnutý, provozovatel se nezapojil nebo není nakonfigurován žádný klíč podporovatele.

Po úspěšném požadavku GET klient ověří podpis Ed25519 nad přesnými bajty odpovědi,
ověří `RadarOffersFeedSchema`, vyžaduje, aby podepsané tělo i
hlavička `x-omniroute-feed-tier` uváděly `live`, vynutí striktně novější verzi s tečkovou notací a teprve poté
atomicky nahradí `radar_offers_cache` (migrace `144_radar_offers_cache.sql`). Platí stejný limit 10 MB
pro hlavičku a datový proud, jaký používají ostatní kanály. Selhání podpisu, schématu, úrovně, ochrany proti opakování, velikosti, HTTP
i sítě vždy zachovají poslední ověřenou mezipaměť.

Uzavřený formát nabídky podporuje tři porovnatelné typy výhod: procentní podíl v bazických bodech, kredit
v nejmenších měnových jednotkách nebo zkušební dny. Partnerská nabídka musí obsahovat veřejnou výchozí hodnotu stejného typu a
její výhoda musí být striktně vyšší; oficiální nabídky partnerskou výchozí hodnotu nemají. Adresy URL musí používat
HTTPS a nesmějí obsahovat přihlašovací údaje. Funkce `getRadarOffers()` při každém místním čtení z bezpečnostních důvodů znovu ověřuje data v mezipaměti a filtruje
položky s prošlou platností; `/dashboard/radar/offers` před vykreslením znovu filtruje podle platnosti,
používá portugalský text, pokud je k dispozici, jinak anglický, a partnerské nabídky výslovně označuje.

Prohlížeč volá pouze místní trasy: načte maskovaný snímek nastavení, požádá
`POST /api/radar/offers/sync` o aktualizaci na straně serveru a poté načte `GET /api/radar/offers`. Bez
klíče namísto pokusu o požadavek na kanál zobrazí existující odkazy pro přispěvatele a podporu. Externí
odkazy na nabídky se otevírají na nové kartě s `noopener noreferrer`. V této verzi není zpřístupněn žádný nástroj MCP `radar_offers`.

---

## Radar Intel, odznak podporovatele a CLI

Intel je podepsaný artefakt na `GET /v1/intel/latest`. Uzavřené schéma `RadarIntelFeedSchema` přijímá
pouze žebříčky ELO vlastněné službou Radar, které soukromý kurátor odvodil z potvrzených porovnání, a faktické
rozdíly ve stáří a počtech katalogu odvozené z podepsaných snímků katalogu. Metodika je pevně stanovena na počáteční
hodnocení 1000 a K=32. Prázdný žebříček je platný, pokud nebylo potvrzeno žádné porovnání; klient
nikdy žádný uměle nevytváří.

Funkce `syncRadarIntel()` používá stejně jako nabídky serverový Bearer, časový limit 30 sekund, limit streamu 10 MiB,
ověření přesných bajtů pomocí Ed25519, striktní schéma, požadavek na `live` v těle i hlavičce, minimální verzi a
zachování poslední funkční mezipaměti. Po uložení ověřeného aktivního snímku klient
odvodí `radar:<sha256(supporter key)>`, uloží pouze tuto jednosměrnou identitu a vygeneruje vyhrazenou
událost uznání `radar_supporter`. Její odznak `radar-supporter` je idempotentní a uděluje nula XP;
nikdy neaktualizuje žebříčky ani znovu nepoužívá `token_share`. `/dashboard/radar/intel` vykreslí odznak
pouze na základě ověřených metadat místní mezipaměti.

CLI zpřístupňuje `omniroute radar status` a `omniroute radar sync`. Oba komunikují pouze s
místním API OmniRoute. `status` provádí pouze čtecí požadavek `GET /api/radar/status`; `sync` odešle jeden
`POST /api/radar/sync-all` a vypíše výsledek pro každý kanál. Žádný z příkazů klíč podporovatele nečte, nepřijímá ani nevypisuje
a žádný z nich nekontaktuje službu Radar přímo.

---

## Odkazy pro doporučení (kredity zdarma)

Odkazy pro doporučení jsou poskytovány ze **samostatného, vždy aktuálního** kanálu —
`GET /v1/referrals/latest` — odděleného od katalogového kanálu. Je to záměrné:
katalogový kanál komunitní úrovně je snímek, který může být až 30 dní starý, takže
odkaz pro doporučení získaný z tohoto kanálu dříve zaostával za skutečným seznamem
odkazů na serveru o stejnou dobu (nově přidané doporučení se k uživateli bezplatné/
komunitní úrovně nemuselo dostat až měsíc). Kanál doporučení toto zpoždění odstraňuje
vlastní synchronizací v mnohem kratším intervalu.

```ts
// Tělo odpovědi GET /v1/referrals/latest (podepsané pomocí Ed25519, stejný připnutý
// klíč jako u katalogového kanálu):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministické: max(updatedAt) napříč odkazy
                                  // pro doporučení, takže dva identické požadavky vytvoří
                                  // přesně stejné podepsané bajty/stejný podpis
  referrals: {
    fixed: RadarReferral[],      // přítomné v KAŽDÉ úrovni, včetně bez ověření/komunitní
    campaigns: RadarReferral[],  // naplněné pouze pro platný aktivní klíč Bearer
                                  // (podporovatel); požadavky bez ověření/se
                                  // skončenou platností klíče obdrží []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Na rozdíl od katalogového kanálu toto tělo vůbec neobsahuje pole `tier` — server
rozhoduje o tom, co zahrnout do jednotlivých požadavků, podle klíče `Authorization`,
takže hlavička odpovědi `x-omniroute-feed-tier` je JEDINÝM zdrojem obsluhované úrovně
(`referralsSync.ts::syncRadarReferrals`); chybějící nebo nerozpoznaná hlavička vede
k přechodu na `"community"`, tedy předpoklad s nejnižšími oprávněními.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) ověřuje celé tělo
a znovu používá stejné schéma `RadarReferralSchema` pro jednotlivá doporučení,
exportované z `feedSchema.ts`, takže oba kanály ověřují jednotlivá doporučení shodně.
Každé `RadarReferral.url` musí používat `https://` — URL s `http://` při ověření
schématu neprojde.

STARÉ pole `referrals` vložené do katalogu v `RadarFeedSchema` (`feedSchema.ts`) je
zachováno kvůli zpětné kompatibilitě s již uloženými katalogovými kanály, ale
`getRadarReferrals()` je již nečte — viz [Přístupová funkce](#accessor) níže.

### Synchronizace

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) je JEDINÝ modul, který
u doporučení komunikuje se sítí, a přesně napodobuje kontrakt funkce `syncRadar()`:
vypnutý příznak → `disabled`; nesouhlas → `opt_out`; stáhne
`${RADAR_FEED_URL}/v1/referrals/latest` (se stejnými možnostmi přepsání
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` pro odnože jako katalog), ověří podpis Ed25519
nad přesnými bajty odpovědi (`verifyFeedBytes`), provede validaci pomocí
`RadarReferralsFeedSchema` a uloží data do mezipaměti v tabulce
`radar_referrals_cache` (migrace `142_radar_referrals_cache.sql`) — tabulce zcela
oddělené od katalogové tabulky `radar_feed_cache`. Limit odpovědi 10 MB a dolní mez
`generatedAt` odmítnou příchozí kanál starší než ten uložený v mezipaměti, čímž chrání
před opětovným přehráním staršího podepsaného artefaktu. Shodné časové razítko je
přijato: server záměrně přiděluje komunitní i aktivní variantě doporučení stejné
deterministické `generatedAt`, takže se podepsaný obsah a obsluhovaná úroveň mohou po
změně klíče podporovatele změnit, aniž by se změnila podkladová sada odkazů. Nikdy
nevyvolá výjimku — vždy vrátí stavový objekt; chyby v `reason` nikdy neobsahují trasování
zásobníku.

Mezipaměť doporučení udržují aktuální dva spouštěče, oba nezávislé na vlastní
24hodinové frekvenci katalogu:

- **Synchronizace při čtení** — samotný požadavek `GET /api/radar/referrals` volá
  `syncRadarReferrals()` přímo, kdykoli mezipaměť chybí nebo je starší než
  `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), a teprve poté odešle
  odpověď. Díky tomu jsou pevné odkazy „vždy aktuální“ již při příštím načtení
  ovládacího panelu, aniž by se čekalo na časovač běžící na pozadí.
- **Vedlejší synchronizace plánovače** — `radarSchedulerTick()` (`scheduler.ts`)
  nezávisle vyhodnocuje zastaralost doporučení při stejném hodinovém taktu, který se
  používá pro katalog, a v případě potřeby volá `syncRadarReferrals()`. Spustí se bez
  ohledu na to, zda měl být při daném taktu aktualizován samotný katalog, a nikdy
  neovlivní strukturu `RadarTickResult` (jde pouze o vedlejší efekt vykonávaný podle
  možností, jehož chyby jsou potlačeny).

### Přístupová funkce

`src/lib/radar/index.ts` exportuje dvě přístupové funkce pouze pro čtení, přičemž ani
jedna nikdy nevyvolává výjimku (stejný defenzivní kontrakt jako `getRadarCatalog()` —
vypnutý příznak, chybějící mezipaměť nebo poškozený obsah uložený v mezipaměti vždy
vedou k prázdné struktuře namísto chyby):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  čte z `radar_referrals_cache` (prostřednictvím `getRadarReferralsCache()`) a ověřuje
  pomocí `RadarReferralsFeedSchema` — **nikoli** z mezipaměti katalogu.
- `getDefaultReferralFor(provider)` → `fixed` doporučení s `isDefault: true` pro
  daného poskytovatele, nebo `null`. Prohledává pouze `fixed` — kampaň se nikdy
  nepoužije jako „výchozí“ odkaz poskytovatele.

Vlastní pravidlo určující, „které doporučení je pro poskytovatele výchozí“, se nachází
ve `findDefaultReferral()` (`src/lib/radar/referrals.ts`), malé čisté funkci **bez
importu DB** — lze ji bezpečně importovat do komponenty `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (v `index.ts`) načítají
`@/lib/db/radar`, a proto zůstávají dostupné pouze na serveru; ovládací panel
poskytovatelů importuje přímo `referrals.ts` namísto `index.ts` (viz níže), aby se
zabránilo zabalení `better-sqlite3` do kódu pro prohlížeč.

### `GET /api/radar/referrals`

Dodržuje přesně stejné pořadí kontrol jako každá jiná trasa Radaru: vypnuté `RADAR_ENABLED` →
`404` (kontroluje se jako první, bajtově identické zachování stavu); neověřený uživatel → `401`; jinak
při zastaralých datech spustí synchronizaci při čtení (viz výše) a poté vrátí `200` s
`{ fixed, campaigns, tier }` — `tier` pochází přímo z řádku mezipaměti (který mohl být právě aktualizován)
a slouží čistě pro informaci (řídí níže uvedený nenásilný text nabídky upgradu v uživatelském rozhraní). Nikdy
nefunguje jako přímý proxy serveru zdroje — vlastní zdrojový kód trasy neobsahuje žádné volání `fetch(`;
síťová komunikace probíhá výhradně uvnitř `syncRadarReferrals()`, podle stejného principu používání
pouze místní mezipaměti jako u `/api/radar/catalog`.

### Uživatelské rozhraní řídicího panelu — karta „Kredity zdarma“ na `/dashboard/radar`

Znovu používá existující stránku Radaru (`src/app/(dashboard)/dashboard/radar/page.tsx`) jako
druhou kartu namísto nové trasy — menší rozsah směrování/i18n pro funkci, která je
variantou dat, jež stránka již načítá. Po přihlášení k funkci nabízí lišta karet
**Katalog** (existující tabulka) a **Kredity zdarma**:

- Pevné odkazy jsou seskupeny podle poskytovatele; každý zobrazuje `requiredAction` (je-li uvedena)
  a tlačítko s `target="_blank" rel="noopener noreferrer"` vedoucí na doporučující URL.
- Kampaně zobrazují totéž a navíc `validUntil`, je-li uvedeno.
- Když je `campaigns` prázdné **a** poskytovaná úroveň je `community`, uživatelské rozhraní zobrazí
  krátkou poznámku s nabídkou upgradu („časově omezené kampaně jsou výhodou pro podporovatele“) — ta **nikdy**
  neskrývá ani neomezuje seznam pevných odkazů, který zůstává plně dostupný pro každou úroveň. Tato
  nabídka upgradu je pouze nenásilným sdělením, nikdy překážkou.

### Doporučující odkaz v názvu poskytovatele (řídicí panel poskytovatelů)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
již odkazoval název poskytovatele na `providerInfo.website`, pokud byla uvedena, přičemž existuje
jeden precedens pro monetizovaný odkaz: poznámka k partnerskému odkazu Kimi (Moonshot AI)
(i18n klíč `providers.kimiPartnerLinkNote`). D28 znovu používá přesně stejný vzor diskrétní poznámky
pro výchozí doporučující odkazy Radaru namísto zavádění nového klíče.

Záměrně volná vazba:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  je **čistá** funkce — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — bez závislosti na `@/lib/radar` nebo `@/lib/db/*`. Soubor `providerPageUtils.ts` jako
  celek zůstává bez těchto importů (ověřeno testem
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponenta `"use client"`) je jediným místem, kde je povoleno
  načítat data Radaru — prostřednictvím `fetch("/api/radar/referrals")`, tedy stejného vzoru
  místní trasy, který používá samotná stránka řídicího panelu Radaru — a výchozí doporučení
  vypočítává na straně klienta pomocí `findDefaultReferral()` z `src/lib/radar/referrals.ts`,
  který je bez závislosti na databázi.
- Při vypnutém `RADAR_ENABLED` vrátí požadavek `404`, `referralUrl` zůstane `null` a
  `resolveProviderHeaderLink()` vrátí statickou katalogovou hodnotu `website` beze změny — stránka
  poskytovatele je bajtově identická se stavem před zavedením této funkce. Stejný výsledek nastane,
  pokud zatím neexistuje mezipaměť nebo pro daného poskytovatele neexistuje výchozí doporučující odkaz.
- Když se výchozí doporučující odkaz použije, `ProviderPageHeader` obdrží `isReferralLink`
  a zobrazí stejnou diskrétní poznámku/popisek jako partnerský odkaz Kimi (s opětovným použitím
  klíče `providers.kimiPartnerLinkNote`) — nikdy nepoužije nové, samostatné vizuální zpracování.

---

## Jak hostovat vlastní feed

Fork nebo provozovatel vlastní instance, který chce mít úplnou kontrolu nad katalogem, může spustit vlastní
službu feedu bez zásahu do klientského kódu:

1. Zpřístupněte koncový bod `GET /v1/catalog/latest`, který vrací tělo JSON splňující
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — na nejvyšší úrovni `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` a `totals`. Respektujte `x-omniroute-radar-schema: 2`; server kompatibilní
   s přechodným obdobím by měl požadavky bez této hlavičky ve výchozím nastavení směrovat na samostatně podepsaný artefakt v1.
2. Podepište přesné bajty odpovědi párem klíčů Ed25519 a vraťte podpis ve formátu base64
   v hlavičce odpovědi `x-omniroute-feed-signature`.
3. Nastavte `RADAR_FEED_URL` na novou základní adresu URL a `RADAR_FEED_PUBKEY` na odpovídající
   veřejný klíč (SPKI ve formátu base64-DER nebo PEM) — viz
   [přehled proměnných prostředí](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Povolte `RADAR_ENABLED` a udělte souhlas prostřednictvím `POST /api/radar/settings`
   (`{ optIn: true }`).

Nejsou vyžadovány žádné další změny kódu — `verifyFeedBytes()` automaticky použije
přepsané nastavení (`getFeedPublicKeys()` v `src/lib/radar/pinnedKeys.ts`) a porovnávání
verzí, ověřování schématu i pravidla slučování se na vlastní feed použijí stejně.

Odkazy s doporučením (viz [Odkazy s doporučením (kredity zdarma)](#referral-links-free-credits)
výše) představují samostatný, volitelný artefakt: fork, který poskytuje pouze `/v1/catalog/latest`,
nadále funguje v plném rozsahu — při odpovědi `404` z `/v1/referrals/latest` se
`syncRadarReferrals()` bezpečně přepne na `{ status: "error" }` a mezipaměť jednoduše zůstane prázdná, takže
`GET /api/radar/referrals` nadále vrací `{ fixed: [], campaigns: [], tier: null }`,
aniž by způsobil selhání zbytku stránky. Chcete-li nabízet také odkazy s doporučením, zpřístupněte
`GET /v1/referrals/latest` splňující `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) a podepište jej stejným párem klíčů Ed25519 jako
feed katalogu.

Nabídky pro podporovatele jsou dalším volitelným artefaktem. Chcete-li je poskytovat, implementujte
`GET /v1/offers/latest` s uzavřeným schématem `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), vyžadujte aktivní oprávnění, vraťte
`x-omniroute-feed-tier: live` a podepište přesné bajty stejným klíčem. U forku, který tento
koncový bod vynechá, zůstane chování katalogu a doporučení beze změny; aktualizace nabídek selže nedestruktivně a
poslední ověřená místní mezipaměť nabídek zůstane dostupná.

Intel je stejným způsobem volitelný. Provozovatel vlastní instance může zpřístupnit `GET /v1/intel/latest` pomocí
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), vyžadovat aktivní oprávnění, vracet
`x-omniroute-feed-tier: live` a podepisovat přesné bajty sdíleným klíčem Ed25519. Vynechání tohoto
koncového bodu ponechá katalog, doporučení a nabídky beze změny; aktualizace Intel zachová poslední ověřený
místní snímek.

---

## Související dokumentace

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — vzor
  chybových odpovědí, který používají trasy `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — přehled `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
