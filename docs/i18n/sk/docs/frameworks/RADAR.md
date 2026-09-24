# Radar Free-Model Catalog (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Zdroj pravdy:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Posledná aktualizácia:** 2026-09-01 — v3.8.51
> **Hranica dôkazov pre hostovanú službu:** tu opísané pravidlá na strane servera boli overené
> 2026-09-01 voči zámerne súkromnému serveru Radar na presnej revízii
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Táto implementácia nie je distribuovaná v
> tomto OSS repozitári; dostupnosť hostovanej služby zostáva samostatným prevádzkovým stavom.

Radar je **voliteľný doplnok**, ktorý nad základným katalógom vydania (`FREE_MODEL_BUDGETS` v
`open-sse/config/freeModelCatalog.data.ts`) sprístupňuje podpísaný a aktuálne spravovaný
katalóg bezplatných modelov. Existuje preto, že prostredie bezplatných úrovní sa mení
rýchlejšie než cyklus vydávania — poskytovatelia medzi vydaniami pridávajú, obmedzujú alebo
rušia bezplatné kvóty a základný katalóg možno aktualizovať iba pri vydaní novej verzie.

**Nič, čo je dnes bezplatné, neprestane byť bezplatné v dôsledku vzdialeného kanála.** Radar
nikdy neuzamkne položku základného katalógu za platený prístup; iba pri čítaní aktualizuje
polia limitov/stavu a medzi vydaniami môže dopĺňať novoobjavené bezplatné modely.
Prevádzkovateľ môže model naďalej lokálne skryť a z rovnakého ovládacieho panela ho môže
obnoviť. Samotný základný katalóg sa na disku nikdy nemení — pozrite si nižšie uvedené
[Pravidlá zlučovania prekrytia pri čítaní](#read-time-overlay-merge-rules).

---

## Stav poskytovania vo v3.8.51

Nasledujúci stav rozlišuje, čo toto OSS vydanie implementuje, od neskorších pracovných
prúdov Radaru. Ide o stav na úrovni kódu, nie o prísľub, že je konkrétne hostované nasadenie
alebo externá integrácia momentálne dostupná.

| Oblasť                          | Stav v tomto vydaní                                                                                                                                                                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klient podpísaného katalógu     | Implementovaný za `RADAR_ENABLED` so samostatným explicitným súhlasom, overovaním Ed25519, lokálnymi šifrovanými nastaveniami/vyrovnávacou pamäťou, trvalými prepismi zobrazenia/povolenia, vratnými náhrobkami, plánovačom a ovládacím panelom.                                    |
| Aktivácia prispievateľa         | Ovládací panel odkazuje na serverom hostovaný tok overenia nároku cez GitHub a prijíma existujúci kľúč `omr_…`. Oprávnenosť prispievateľa vyhodnocuje súkromná služba; OSS klient neobsahuje žiadny token GitHub ani logiku vydávania kľúčov.                                       |
| Aktivácia kľúčom podporovateľa  | Implementovaná. Nespracovaný kľúč sa overí, uloží v zašifrovanej podobe, pri čítaní sa zamaskuje a odosiela sa iba synchronizáciou na strane servera. Zmena alebo vymazanie kľúča zneplatní všetky štyri vyrovnávacie pamäte kanálov citlivé na oprávnenia.                         |
| Odkazy na odporúčania           | Implementované ako samostatne podpísaný kanál obnovovaný každú hodinu. Pevné odkazy sú komunitnej úrovni dostupné okamžite; časovo obmedzené kampane zostávajú údajmi živej úrovne.                                                                                                 |
| Ponuky pre podporovateľov       | Implementované ako samostatný podpísaný kanál dostupný iba v živej úrovni a stránka ovládacieho panela. Klient opätovne overuje uzavretú schému výhod, zachováva poslednú platnú vyrovnávaciu pamäť, filtruje položky po skončení platnosti a výslovne označuje partnerské ponuky.  |
| Intel a uznanie podporovateľov  | Implementované ako striktný podpísaný kanál dostupný iba v živej úrovni s ELO spravovaným Radarom, faktickou aktuálnosťou/trendom katalógu, overeným lokálnym odznakom podporovateľa, stránkou ovládacieho panela a príkazmi CLI na stav/synchronizáciu, ktoré fungujú iba lokálne. |
| Platby a transakčné e-maily     | V OSS klientovi nie sú implementované. Nákup, darovanie, kontrola potvrdeniek, obnovenie a doručovanie pošty patria súkromnej službe; dostupnosť hostovanej služby naďalej závisí od jej riadeného nasadenia a konfigurácie poskytovateľa.                                          |
| Pracovný prúd výskumného agenta | Nie je súčasťou tohto vydania klienta. Spravovaný obsah kanálov zostáva údajmi na strane servera; v inštalácii OmniRoute sa nespúšťa žiadny autonómny výskumný agent.                                                                                                               |

---

## Čítačka verejných oznámení

Všeobecná čítačka oznámení je oddelená od príznaku funkcie Radar. Domovská stránka ovládacieho panela a
prehliadač zmien načítavajú verejný súbor `news.json` repozitára prostredníctvom jednoduchého požiadavku `GET` na
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Neodosielajú žiadne nastavenie Radaru, prompt, konfiguráciu
poskytovateľa, záznam o používaní ani lokálny stav zamietnutia.

`news.json` používa uzavretú schému v2 implementovanú funkciou `parseNewsPayload()`:

- `schemaVersion: 2` a kolekcia `items[]` s obmedzenou veľkosťou;
- stabilné a jedinečné hodnoty `id` oznámení;
- explicitné polia `active` a `publishedAt` vo formáte ISO;
- povinný anglický text s voliteľnými lokalizovanými textami;
- voliteľné odkazy HTTPS bez prihlasovacích údajov a ikona zo zoznamu povolených ikon;
- výber najnovšieho aktívneho oznámenia ako prvého, záložné použitie angličtiny pre lokalizáciu a lokálne zamietnutie podľa jednotlivých ID.

Parser dočasne akceptuje predchádzajúci jednotný formát `{ active, title, message, ... }`, aby
staršie forky mohli migrovať bez nefunkčného zobrazenia zmien. Neplatné kanály sú neaktívne. Záznam o spustení
Radaru sa dodáva s hodnotou `active: false`; jej zmena na `true` je samostatná akcia vydania vykonaná po zlúčení a nasadení
a nemení `RADAR_ENABLED` ani nezávislý súhlas so synchronizáciou kanála.

---

## Príznak: `RADAR_ENABLED` (predvolene vypnutý)

Radar je kompletne podmienený príznakom funkcie `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategória `policies`,
`defaultValue: "false"`).

**Keď je príznak vypnutý, toto rozhranie neexistuje:**

- Všetky koncové body `/api/radar/*` vrátane lokálnych čítaní a zápisov stavu modelu
  vrátia `404` skôr, než pristúpia ku ktorémukoľvek modulu Radaru.
- Obrazovky ovládacieho panela (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) vykreslia
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) vráti nezmenený základný stav —
  rovnaký počet záznamov, rovnaké hodnoty, každý záznam označený `origin: "baseline"` — a nikdy
  nečíta vyrovnávaciu pamäť kanála.
- Nevykoná sa žiadne sieťové volanie Radaru; každý synchronizačný modul vráti `{ status: "disabled" }`
  skôr, než pristúpi k `fetch`.

Ide o striktnú nadradenú bránu: zapnutie príznaku odomkne iba _obrazovky_ a nič
viac. Nenahráva údaje, nespúšťa synchronizáciu na pozadí ani nemení
smerovanie či výber modelu — pozrite si samostatný súhlas uvedený nižšie.

---

## Synchronizácia údajov je SAMOSTATNÝ súhlas — prísľub ochrany súkromia

Zapnutie `RADAR_ENABLED` iba odomkne používateľské rozhranie. Synchronizácia kanála vyžaduje druhý,
nezávislý súhlas uložený v `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrácia `136_radar_cache_settings.sql`). `syncRadar()` pred vykonaním akéhokoľvek sieťového volania kontroluje príznak _aj_
súhlas:

```
Príznak vypnutý  → { status: "disabled" }   — žiadne sieťové volanie
Súhlas neudelený → { status: "opt_out" }    — žiadne sieťové volanie
```

Keď sú obe možnosti zapnuté, synchronizácia prebieha takto:

1. `GET <základná URL kanála>/v1/catalog/latest` s `x-omniroute-radar-schema: 2` a voliteľnou
   hlavičkou `Authorization: Bearer <kľúč podporovateľa>` (pozrite nižšie). Ak hlavička schémy chýba, servery predvolene
   používajú samostatne podpísaný prechodový artefakt v1, aby starší nainštalovaní klienti naďalej
   dostávali aktualizácie.
2. Ide o aplikačný tok určený iba na sťahovanie, stále však predstavuje požiadavku HTTPS. Hostovaná
   infraštruktúra prijíma bežné metadáta pripojenia, napríklad zdrojovú IP adresu. Keď je nakonfigurovaný kľúč
   podporovateľa, synchronizácia tento kľúč zároveň odošle v hlavičke Bearer, aby služba mohla určiť
   oprávnenie. V presnej revízii súkromného servera určenej vyššie uvedenou hranicou dôkazov
   používa účtovanie požiadaviek na kanál haše kľúčov, agregované údaje o používaní a denne rotovaný skrátený HMAC
   IP adresy na manuálnu kontrolu zneužitia; tieto tabuľky neuchovávajú kľúč ani IP adresu v nespracovanej podobe.
   Prístupové protokoly infraštruktúry a šifrovaný priečinok odosielaných správ predstavujú samostatné prevádzkové
   hranice.
3. OmniRoute nikdy neodosiela službe Radar prompty, odpovede, konverzácie, prihlasovacie údaje
   poskytovateľov, prevádzku modelov, dostupnosť, latenciu ani lokálnu konfiguráciu poskytovateľov.
4. Odpoveď sa overí, validuje a uloží do lokálnej vyrovnávacej pamäte (pozrite si
   [Model zabezpečenia](#security-model)). Radar má presne štyri sieťové cesty na strane servera:
   `syncRadar()` pre katalóg, `syncRadarReferrals()` pre odporúčania a
   `syncRadarOffers()` / `syncRadarIntel()` pre ponuky a Intel dostupné iba podporovateľom.

**Kľúč podporovateľa** je voliteľný token Bearer (`radar_settings.supporter_key`),
ktorý službe kanála umožňuje rozhodnúť, ktorú úroveň má poskytovať (pozrite si
[Úrovne](#tiers-community-and-live)). Tento kľúč:

- Je uložený **zašifrovaný** pomocou rovnakých pomocných funkcií AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`), ktoré sa používajú pre prihlasovacie údaje poskytovateľov.
- Nastavuje sa prostredníctvom `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) a
  **nikdy sa neposiela späť** — odpoveď vráti maskovanú podobu (`omr_****abcd`).
- Jeho zmena alebo vymazanie atómovo zneplatní vyrovnávacie pamäte katalógu, odporúčaní, ponúk a Intel. Nasledujúca
  synchronizácia alebo čítanie určí nové oprávnenie na strane servera; uloženie kľúča samo osebe
  nevykoná sieťovú požiadavku ani nespotrebuje aktivačný kľúč na jedno použitie.
- Odošle sa službe kanála ako token Bearer v synchronizačnom požiadavku GET — žiadne ďalšie informácie o
  kľúči nikdy neopustia klienta.

---

## Pravidlá prístupu a bezpečnosti zobrazené pred prihlásením

Neaktívny ovládací panel zobrazuje tieto pravidlá zo súboru
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **pred** ktoroukoľvek z aktivačných akcií.
Kanonická stupnica prístupu je:

| Úroveň                  | Oprávnenosť                                                                       | Prístup                                         | Pravidlo opakovania/ukončenia platnosti                                |
| ----------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| Komunita                | Ktokoľvek; bez kľúča                                                              | Kompletný katalóg oneskorený približne o 30 dní | Vždy k dispozícii; bez vydania                                         |
| Hviezdička + sledovanie | GitHub OAuth overí hviezdičku pri repozitári aj sledovanie vlastníka              | Jedno živé načítanie katalógu, potom Komunita   | Jedno vydanie na jedno prihlásenie; nikdy sa nevydáva opakovane        |
| Prispievateľ Top 10     | Pozície 1–10 v najnovšom úplnom týždennom rebríčku                                | 365 dní živého prístupu                         | Nárokované na požiadanie; opustenie rebríčka neskráti priznané obdobie |
| Prispievateľ Top 100    | Pozície 11–100 v danom rebríčku                                                   | 90 dní živého prístupu                          | Rovnaké pravidlo nárokovania na požiadanie/idempotentného nárokovania  |
| Nákup podporovateľa     | Jednorazový nákup na 6 mesiacov, 1 rok alebo doživotne                            | Živý katalóg, podpísané živé ponuky a Intel     | Bez automatického obnovenia                                            |
| Dar/manuálne udelenie   | Dar posúdený vlastníkom alebo udelenie vlastníkom na výslovný počet dní/doživotne | Rovnaké živé oprávnenie na udelené obdobie      | Auditované, idempotentné udelenie                                      |

Zlúčené PR, commity a zmenené riadky sú **iba vstupmi do rebríčka**. Prihlásenie mimo Top 100
nezíska žiadne oprávnenie prispievateľa bez ohľadu na počet PR. Časovo obmedzené nákupy, dary,
obdobia prispievateľov a manuálne udelenia sa pripočítavajú od aktuálneho dátumu skončenia platnosti;
doživotné oprávnenie má prednosť. Zmena umiestnenia nikdy spätne nezruší ani neskráti už priznaný čas.

Hosťovaná licencia je osobná a pravidlom pre používateľov je jedna aktívna inštalácia súčasne. Toto
vydanie **netvrdí**, že používa hardvérový zámok: OSS synchronizácia nevytvára odtlačok hardvéru ani
neudržiava kryptografický prenájom zariadenia. Vo vyššie uvedenej overenej revízii súkromného servera
implementované presadzovanie zahŕňa overenie oprávnenia a signál na manuálne preskúmanie, keď sa ten
istý aktívny kľúč zaznamená zo štvrtej odlišnej IP adresy v priebehu 24 hodín. Tento signál nikdy
automaticky nezablokuje ani nezruší kľúč. Obnovenie zruší a nahradí stratený kľúč, pričom zachová
existujúci dátum skončenia platnosti; nezaháji zakúpené ani udelené obdobie odznova.

Živé ponuky sú manuálne spravované a môžu sa meniť alebo ich platnosť môže skončiť. Obrazovka
prihlásenia tiež presne uvádza hranice ochrany súkromia: sťahujú sa podpísané metadáta
katalógu/odporúčaní; platný kľúč navyše odomyká podpísané ponuky a Intel; Bearer kľúč a bežné
metadáta pripojenia sa odosielajú hosťovanej službe; prompty, odpovede, konverzácie, prihlasovacie
údaje poskytovateľov, modelová prevádzka, doba prevádzky, latencia a lokálna konfigurácia
poskytovateľov sa neodosielajú.

---

## Získanie kľúča podporovateľa

Aktivačná obrazovka (`/dashboard/radar`) odkazuje na dva postupy na **získanie**
kľúča podporovateľa. Samotný OSS repozitár kľúče nikdy nevydáva, nikdy nespúšťa platobný kód a
**nikdy neuvádza cenu** — ceny sa určujú a zobrazujú výhradne na
cieľových stránkach, nie v tomto repozitári (rozhodnutie špecifikácie D14).

- **„Som prispievateľ“** — otvorí `RADAR_CONTRIBUTOR_CLAIM_URL` (predvolene
  `https://radar.omniroute.online/auth/github`), proces nárokovania cez GitHub OAuth hosťovaný na
  súkromnom serveri Radar. Kontroluje najnovšie úplné týždenné poradie: členovia Top 10 získajú 365 dní
  a pozície 11–100 získajú 90 dní. Mimo Top 100 počet PR nikdy neposkytuje prístup; proces
  namiesto toho kontroluje samostatnú jednorazovú úroveň za hviezdičku + sledovanie.
- **„Podporiť projekt“** — otvorí `RADAR_SUPPORTER_PLANS_URL` (predvolene
  `https://radar.omniroute.online/planos`), hosťovanú stránku s jednorazovými možnosťami na 6 mesiacov, 1 rok a
  doživotne. Stránka OSS naďalej nezobrazuje žiadnu peňažnú hodnotu.

Obe adresy URL sa vyhodnocujú na strane servera (`src/lib/radar/links.ts`, rovnaký vzor prepisovania
prostredníctvom prostredia ako pri `RADAR_FEED_URL`) a odovzdávajú sa na ovládací panel prostredníctvom existujúcej
odpovede `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — klientsky
komponent nikdy priamo nečíta `process.env`.

| Premenná                      | Účel                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Prepisuje adresu URL na nárokovanie prispievateľom (predvolene `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Prepisuje adresu URL plánov pre podporovateľov (predvolene `https://radar.omniroute.online/planos`).          |

### Obnovenie strateného kľúča podporovateľa

Vstupný bod obnovy hosťovanej služby je `https://radar.omniroute.online/recover`; odkazuje sa naň aj
zo stránky plánov. Obnova zostáva úplne mimo klienta OSS, pretože lokálna
inštalácia nikdy nezíska e-mail kupujúceho/prispievateľa a nedokáže zrekonštruovať nespracovaný kľúč zo
svojich šifrovaných nastavení.

1. Odošlite e-mail priradený ku kľúču. Služba vráti rovnakú stránku s potvrdením bez ohľadu na to, či
   obnoviteľná licencia existuje, takže formulár neodhaľuje existenciu účtov.
2. Ak sú splnené podmienky, pracovník doručovania odošle krátkodobý odkaz na jedno použitie. Jeho otvorenie okamžite presunie
   token do dočasného šifrovaného súboru cookie `HttpOnly`/`Secure` a presmeruje na čistú
   adresu URL `/recover`; stránka neobsahuje žiadny token, e-mail, starý kľúč ani náhradný kľúč.
3. Potvrďte zneplatnenie. Súkromná služba zneplatní predchádzajúci kľúč, vytvorí náhradný kľúč s
   rovnakým plánom/dátumom vypršania platnosti a v rámci jednej transakcie ho zaradí do frontu na odoslanie e-mailom. Náhradný kľúč sa nikdy
   nevráti prehliadaču.
4. Vložte náhradný kľúč do `/dashboard/radar`. Starý kľúč sa teraz musí znížiť na `community`;
   náhradný kľúč musí spustiť overenú synchronizáciu `live`. Opätovné otvorenie toho istého odkazu na obnovenie musí zlyhať
   so všeobecnou odpoveďou o neplatnosti/vypršaní platnosti.

Hosťovaná trasa obnovy a pracovník pošty môžu byť prítomné v kóde, no v konkrétnom
nasadení môžu byť stále nedostupné. Neoznačujte tento proces za pripravený na produkciu, kým nebude server nasadený,
poskytovateľ doručovania nakonfigurovaný s kontrolovaným príjemcom a celý odkaz na jedno použitie otestovaný.

Keď už návštevník má kľúč (`omr_` + 40 hexadecimálnych znakov), aktivačná obrazovka
(`src/app/(dashboard)/dashboard/radar/page.tsx`) ponúka ako primárny postup pole na vloženie kľúča:
vložením kľúča a odoslaním sa v jedinom volaní odošle `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — vloženie kľúča ho nastaví a zároveň aktivuje účasť,
čím sa obrazovka odomkne. Formát (`omr_` + 40 hexadecimálnych znakov) sa najskôr kontroluje na strane klienta
pomocou zdieľanej pomocnej funkcie `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
na zlepšenie používateľského zážitku; autoritatívnou kontrolou je však v každom prípade schéma Zod na serveri. Po
nastavení kľúča aktivačná obrazovka namiesto prázdneho vstupného poľa zobrazí maskovanú podobu
(`supporterKeyMasked` z `GET /api/radar/settings`) spolu s ovládacím prvkom „zmeniť kľúč“ na
vloženie nového kľúča — nespracovaný kľúč sa už nikdy znova nezobrazí. Dve tlačidlá na nárokovanie/plány uvedené vyššie
zostávajú spôsobom, ako kľúč najprv _získať_; toto vstupné pole slúži na jeho aktiváciu operátorovi,
ktorý ho už má.

### Kompletná aktivácia a riadené nastavenie

Súkromná služba kanála a tento klient OSS majú zámerne úzko vymedzenú hranicu: služba
vydáva a overuje kľúč podporovateľa, zatiaľ čo lokálna inštalácia OmniRoute kľúč šifruje,
synchronizuje podpísané artefakty na strane servera a sprevádza nastavením poskytovateľa. Poradie asistovaného overovania je:

1. Získajte novo vydaný alebo obnovený kľúč z procesu uplatnenia nároku prispievateľa, plánov/platby, procesu
   obnovenia alebo od autorizovaného prevádzkovateľa súkromného servera. Nevkladajte nespracovaný kľúč do protokolov,
   snímok obrazovky, komentárov k problémom ani argumentov príkazového riadka.
2. Povoľte príznak funkcie `RADAR_ENABLED` v lokálnej inštalácii OmniRoute. Tým sa sprístupní používateľské rozhranie,
   ale sieť zostane neaktívna, kým sa neuloží samostatný súhlas.
3. Otvorte `/dashboard/radar`, vložte kľúč a aktivujte ho. Prehliadač odošle jednu lokálnu požiadavku
   `POST /api/radar/settings` s `{ optIn: true, supporterKey }`; kľúč sa zašifruje lokálne a
   odpoveď obsahuje iba `omr_****<last4>`.
4. Nechajte aktivačnú obrazovku vykonať synchronizáciu katalógu alebo vyberte možnosť **Synchronizovať teraz**. Overte, že stránka
   uvádza `live`, verziu kanála a čas načítania. Pri autentifikovanej lokálnej diagnostike
   `GET /api/radar/status` hlási prítomnosť súhlasu/kľúča a štyri stavy vyrovnávacej pamäte bez vrátenia
   kľúča. `POST /api/radar/sync-all` môže explicitne obnoviť katalóg, odporúčania, ponuky a Intel.
5. Otvorte `/dashboard/radar/setup?provider=<provider>`. Prejdite na adresu URL poverení spravovanú poskytovateľom,
   vyberte **Pridať kľúč API**, uložte ho prostredníctvom skutočného formulára poskytovateľa, vráťte sa do sprievodcu a spustite
   **Otestovať pripojenie**. Sprievodca používa štandardné trasy `/api/providers` a
   `/api/providers/<connection-id>/test`; nevytvára paralelné poverenie Radar.
6. Po aktivovaní aspoň dvoch kompatibilných pripojení poskytovateľov otvorte `/dashboard/radar/combos`.
   Skontrolujte navrhovanú rodinu a vytvorte kombináciu prostredníctvom existujúceho rozhrania API pre kombinácie. Ponuky a
   Intel zostávajú samostatnými podpísanými vyrovnávacími pamäťami dostupnými iba v režime `live` a možno ich skontrolovať na ich vyhradených stránkach Radar.
7. Znova načítajte `/dashboard/radar` a stránku nastavenia. Súhlas, stav maskovaného kľúča, overená vyrovnávacia pamäť, uložené
   pripojenie poskytovateľa a testovacia akcia musia zostať zachované aj po opätovnom načítaní. Dôkazy zaznamenávajte až vtedy, keď
   už nespracovaný kľúč a poverenie poskytovateľa nie sú viditeľné.

Samotné uloženie kľúča nie je dôkazom platného nároku na režim `live`. Dôkazom je kombinácia výsledku
`GET /v1/license/check` súkromnej služby, vrstvy `live` poskytovanej katalógom OSS, overenej podpísanej
vyrovnávacej pamäte a skutočného toku pripojenia/testovania poskytovateľa. Neplatný, exspirovaný alebo odvolaný kľúč bezpečne
prepne katalóg na `community`; nesmie byť hlásený ako úspešne overený kľúč pre režim `live`.

### Odkaz na súkromný administračný panel

`RADAR_ADMIN_URL` voliteľne pridáva položku **Správa Radar ↗** bezprostredne za používateľskú položku
Radar v sekcii Náklady na bočnom paneli. Zámerne nemá predvolenú hodnotu: keď premenná
nie je nastavená alebo je neplatná, statický bočný panel, paleta príkazov ani obrazovka prispôsobenia bočného panela neobsahujú
žiadnu administračnú položku ani súkromnú adresu URL.

Hodnota sa vyhodnocuje na strane servera a prostredníctvom odpovede
`GET /api/settings` chránenej autentifikáciou správy sa odovzdáva iba autentifikovanej relácii ovládacieho panela alebo dôveryhodnému
vlastníkovi na spätnej slučke počas lokálneho úvodného spustenia bez prihlásenia. Autentifikácia CLI, internej služby a kľúča API
s rozsahom správy ju nedostane. Prehliadač pred vytvorením externého odkazu odpoveď znova
overí a odkaz sa otvorí s `noopener noreferrer`.

Použite adresu URL tunela HTTPS/tailnetu bez poverení. Protokol HTTP sa akceptuje iba pre SSH
presmerovanie na spätnú slučku, napríklad `http://127.0.0.1:9351`; ostatné schémy, vložené poverenia, nesprávne formátované adresy URL a
vzdialené ciele HTTP sa bezpečne odmietnu a navigácia zostane neaktívna.

---

## Bezpečnostný model

### Podpis Ed25519 nad presnými bajtmi

Dátový obsah kanála je podpísaný pomocou Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) overuje podpis nad **presnými bajtmi odpovede**
prijatými po sieti — dátový obsah sa pred overením nikdy opätovne neserializuje, takže
opätovné zakódovanie bajt po bajte nemôže nepozorovane zneplatniť ani obísť kontrolu podpisu.
Zlyhanie overenia (`invalid_signature`) preruší synchronizáciu ešte predtým, než sa dátový obsah
spracuje alebo uloží do vyrovnávacej pamäte.

### Pripnutý verejný kľúč + rotácia

Overovací verejný kľúč je pripnutý v `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), čo je pole, aby sa nový kľúč mohol pred rotáciou pridať
na začiatok, zatiaľ čo staré kanály vo vyrovnávacej pamäti podpísané predchádzajúcim
kľúčom zostanú platné až do opätovnej synchronizácie.

### Prepísania pomocou premenných prostredia vhodné pre forky

Dve premenné prostredia umožňujú forkom a používateľom s vlastným hostingom nasmerovať klienta
na vlastný kanál namiesto predvolenej služby OmniRoute — pozrite si nižšie
[Ako hostovať vlastný kanál](#how-to-self-host-a-feed):

| Premenná            | Účel                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Prepíše základnú URL adresu kanála (predvolená je `https://radar.omniroute.online`).                                           |
| `RADAR_FEED_PUBKEY` | Prepíše pripnutý verejný kľúč (SPKI vo formáte DER s kódovaním base64 alebo PEM) a nahradí vstavané pole týmto jediným kľúčom. |

### Minimálna verzia

`syncRadar()` odmietne stiahnutý kanál, ktorého `version` nie je striktne novšia než
aktuálne uložená verzia vo vyrovnávacej pamäti (`compareVersions()`, porovnanie bodkami oddeleného formátu `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Tým sa zabráni tomu, aby kompromitovaný alebo nesprávne nakonfigurovaný koncový bod kanála
vrátil klienta k staršiemu dátovému obsahu podpísanému iným spôsobom.

### Dva dátumy a prečo sa uchovávajú oba

Kanál vo vyrovnávacej pamäti obsahuje dva odlišné dátumy a práve možnosť ich zámeny je dôvodom,
prečo sa uchovávajú oba:

| Pole          | Pochádza z              | Určuje                               |
| ------------- | ----------------------- | ------------------------------------ |
| `generatedAt` | tela podpísaného kanála | aké staré sú **údaje**               |
| `fetchedAt`   | hodín tejto inštalácie  | kedy ich táto inštalácia **stiahla** |

Kanál stiahnutý pred niekoľkými minútami môže obsahovať údaje staré niekoľko týždňov, takže samotné
`fetchedAt` nedokáže prevádzkovateľovi povedať, či je prekryvná vrstva aktuálnejšia než základné údaje,
na ktorých je postavená. Obe hodnoty sa uchovávajú v `radar_feed_cache`, vracajú sa cez
`getRadarCatalog().meta` a samostatne sa vykazujú prostredníctvom `GET /api/radar/status`.
Riadok uložený do vyrovnávacej pamäte pred existenciou stĺpca `generated_at`
(migrácia 163) sa načíta ako `null` — neznáma hodnota zostane neznáma namiesto toho,
aby sa použil čas stiahnutia. `radar_referrals_cache` uchováva vlastnú hodnotu
`generated_at` od migrácie 142.

Vyššie uvedená minimálna verzia porovnáva `version`, nie niektorý z dátumov.

Zostávajú dve medzery, obe zámerne: ovládací panel stále zobrazuje iba `Last fetched`, takže zobrazenie
dátumu zostavenia na tomto mieste vyžaduje nový štítok (a jeho 41 lokalizovaných položiek); vyrovnávacie pamäte
ponúk a spravodajských údajov navyše neuchovávajú žiadny dátum zostavenia, hoci ho ich schémy kanálov obsahujú —
`GET /api/radar/status` preto toto pole pre tieto dve vyrovnávacie pamäte vynecháva namiesto vykazovania hodnoty `null`,
ktorá by sa interpretovala ako „neznáme“.

### Overenie schémy

Stiahnuté bajty sa **po** overení podpisu spracujú a overia voči `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, schéma Zod). Nezhoda so schémou vráti
`{ status: "invalid_schema" }` a vyrovnávacia pamäť zostane nedotknutá.
Dátový obsah vo vyrovnávacej pamäti sa pri každom čítaní opätovne preventívne overuje
(`getRadarCatalog()`) — pri poškodenom alebo ručne upravenom riadku vyrovnávacej pamäte
sa namiesto jeho poskytnutia použijú základné údaje.

### Limit veľkosti odpovede (10 MB)

`syncRadar()` vynucuje **pevný limit 10 MB** pre telo odpovede kanála — podpísaný
kanál je dokument JSON s veľkosťou v ráde KB, takže čokoľvek nad tento limit poukazuje
na nesprávne nakonfigurovanú alebo nepriateľskú adresu `RADAR_FEED_URL` (prípadne na nadradený
server poskytujúci nezmyselné údaje), nie na legitímny katalóg.
Limit sa vynucuje v dvoch vrstvách:

1. Predbežná kontrola `Content-Length` úplne preskočí čítanie tela, keď už hlavička
   deklaruje hodnotu presahujúcu limit.
2. Kontrola priebežného súčtu počas čítania tela vynúti limit aj vtedy, keď
   `Content-Length` chýba alebo uvádza nižšiu než skutočnú veľkosť — samotnej hlavičke
   sa nikdy nedôveruje. Spojením nahromadených blokov sa zachovajú presné
   bajty potrebné na následnú kontrolu podpisu Ed25519.

Prekročenie limitu vráti `{ status: "too_large" }` a ponechá vyrovnávaciu pamäť nedotknutú,
v súlade s rovnakým nedeštruktívnym postupom ako pri každom inom zlyhaní synchronizácie
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Úrovne: `community` a `live`

Schéma feedu obsahuje pole `tier: "community" | "live"`, o ktorom rozhoduje **serverová strana**
služby feedu na základe požiadavky (prítomnosti a platnosti kľúča podporovateľa)
— klient nikdy nerozhoduje o svojej vlastnej úrovni.

- **`community`** — bezplatný katalóg oneskorený približne o 30 dní oproti najnovším
  údajom. Dostane ho neautentifikovaná požiadavka alebo požiadavka s neplatným kľúčom.
- **`live`** — najnovší katalóg poskytovaný požiadavkám, ktoré obsahujú platný kľúč
  podporovateľa.

**Neplatný kľúč podporovateľa alebo kľúč s uplynutou platnosťou vedie k úrovni `community` — nikdy nejde o
chybu.** Synchronizačná cesta rozlišuje iba zlyhania podpisu/schémy/verzie (všetky
obnoviteľné a žiadne z nich nie je fatálne pre stav vo vyrovnávacej pamäti) od úspešného výsledku `{ status:
"updated", version, tier }`. Klient nemusí spracúvať žiadnu chybovú cestu špecifickú pre
konkrétnu úroveň.

### Poskytovaná úroveň pochádza z hlavičky odpovede, nie z podpísaného tela

Pole `tier` v **tele** podpísaného feedu má vždy hodnotu `"live"` — služba feedu distribuuje
**dva podpísané artefakty pre každú verziu**: artefakt live zahŕňa aktuálne kampane a artefakt community
ich vynecháva. Každý artefakt je podpísaný nad svojimi vlastnými presnými bajtmi. Telo však stále
neslúži na rozhodovanie o oprávnení; úroveň skutočne vybraná pre požiadavku sa prenáša
v **hlavičke odpovede `x-omniroute-feed-tier`**, pričom sa o nej rozhoduje na strane servera podľa kľúča
`Authorization` v požiadavke.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) je jediné miesto,
ktoré určuje úroveň, ktorej má klient dôverovať:

1. Analyzuje `x-omniroute-feed-tier` pomocou `RadarTierSchema` (Zod) — chýbajúca hlavička alebo
   hodnota, ktorá nie je presne `"community"` alebo `"live"`, sa považuje za **neprítomnú**
   (nikdy sa v nezmenenej podobe nepovažuje za dôveryhodnú a neuloží sa do vyrovnávacej pamäte/nezobrazí v používateľskom rozhraní; zahŕňa to aj staršie servery
   feedu, ktoré vznikli pred zavedením tejto hlavičky).
2. K podpísanému poľu `tier` z tela (vždy `"live"`) sa pristúpi ako k záložnej hodnote iba vtedy, keď krok 1
   neprinesie žiadny výsledok.
3. Určená úroveň sa uloží do vyrovnávacej pamäte a vráti ako `{ status: "updated",
version, tier }` — informačný panel zobrazuje túto hodnotu, nikdy nie nespracované pole
   z tela.

---

## Pravidlá zlučovania prekrytia pri čítaní

`applyFeed()` (`src/lib/radar/applyFeed.ts`) zlučuje feed z vyrovnávacej pamäte **cez**
statický základ **pri čítaní** v rámci `getRadarCatalog()`. Základné pole
(`FREE_MODEL_BUDGETS`) sa nikdy nemení — pri každom volaní sa nanovo vypočíta `MergedEntry[]`.

Štyri pravidlá v poradí podľa priority:

1. **Feed nikdy neprepíše lokálnu úpravu.** Pre každé pole platí: ak operátor
   upravil pole záznamu (`localOverrides` mapované podľa `provider:modelId`),
   hodnota daného poľa z feedu sa preskočí — prednosť má hodnota operátora.
2. **`enabled: false` deaktivuje záznam a zachová pôvod tejto zmeny.** Záznam feedu, ktorý
   vypne záznam, nastaví vo výsledku zlúčenia `enabled: false` a `disabledBy: "radar"`,
   aby používateľské rozhranie mohlo vysvetliť, _prečo_ sa záznam zmenil z dostupného na deaktivovaný.
3. **Používateľom pridaný záznam, ktorý sa nenachádza vo feede, zostane nedotknutý.** Záznamy, ktoré
   existujú iba v základe (alebo boli pridané lokálne) a nemajú zodpovedajúci záznam vo feede,
   sa prenesú bez zmeny.
4. **Záznam označený náhrobkom sa nikdy neobnoví.** Ak operátor záznam explicitne odstránil
   (množina `tombstones`), opätovné pridanie daného `provider:modelId` feedom v novšej
   verzii ho neobnoví.

Upraviteľné polia a náhrobky sa uchovávajú v
`radar_local_model_state` (migrácia `153_radar_local_model_state.sql`). Verejný DB
adaptér (`src/lib/db/radar.ts`) prevádza tieto riadky na mapu `localOverrides` a
množinu `tombstones`, ktoré používa `applyFeed()`; produkčná funkcia `getRadarCatalog()` načíta tento stav
po úspešnom prejdení kontrolami príznaku, vyrovnávacej pamäte a schémy. Operátor môže upravovať iba `displayName` a `enabled`.
Identitu poskytovateľa/modelu, pôvod údajov z feedu, kvótu, schopnosti, zmluvné podmienky,
ani konfiguračné údaje nemožno cez toto rozhranie zapisovať.

Informačný panel ponúka štyri lokálne akcie:

- **Upraviť** zmení lokálny zobrazovaný názov a stav aktivácie.
- **Obnoviť lokálne zmeny** vymaže obe upraviteľné polia bez zmeny náhrobku.
- **Skryť** vytvorí náhrobok, takže neskoršie aktualizácie feedu nebudú môcť riadok znovu vytvoriť.
- **Obnoviť** odstráni náhrobok; každá samostatne uložená úprava zostane účinná.

Hodnota `enabled: false` z feedu zostáva bezpečnostnou výnimkou: má prednosť pred zastaranou lokálnou
hodnotou `enabled: true`, ponechá zlúčený záznam deaktivovaný a zaznamená `disabledBy: "radar"`.

Publikácie katalógu používajú `schemaVersion: 2`. `contextWindow` a každá z hodnôt `tools`, `vision` a
`thinking` majú nezávisle typ `number | null` / `boolean | null`: `null` znamená neznáme, zatiaľ čo
`false` znamená, že oficiálny zdroj poskytovateľa potvrdený podľa D16 explicitne uvádza neprítomnosť danej schopnosti.
Interné príznaky registra/špecifikácie modelov OmniRoute sa nikdy priamo nepovyšujú na fakty feedu. Klient
naďalej prijíma snímky v1; keďže starý zostavovač používal `false` ako zástupnú hodnotu neprítomnosti, hodnota `false` z v1 sa
normalizuje na neznámu, zatiaľ čo hodnota `true` z v1 zostáva faktická. Neznáme verzie schémy zlyhajú bezpečným spôsobom a
posledná platná vyrovnávacia pamäť zostane dostupná. Každý model v2 s nenulovým kontextom alebo schopnosťou musí obsahovať
`metadataEvidenceUrls[]` s HTTPS adresami dostupnými bez prihlasovacích údajov; inak overenie schémy zlyhá a vyrovnávacia pamäť sa
nenahradí. Tabuľka katalógu vykresľuje všetky tri stavy ako `✓`, `✕` a `?`.

### Sprievodné kombinácie a prístup MCP

Potvrdené hodnoty `familyId` pretrvajú prekrytie pri čítaní a riadia čistý
modul `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Rodina sa navrhne
iba vtedy, keď majú aspoň dvaja rôzni poskytovatelia aktívne pripojenia a sprístupňujú presné kurátorované ID
modelu. Deaktivované modely, neaktívni poskytovatelia, chýbajúce ID modelov, rodiny s jediným prvkom a nejednoznačné
zhody aliasov/predpôn zlyhajú bezpečným spôsobom. Návrhy používajú existujúcu stratégiu `priority`, ktorá na prvé miesto
zoraďuje najväčší opakujúci sa mesačný rozpočet; používateľské rozhranie ich vytvára iba prostredníctvom `POST /api/combos`.

Sprievodcovské používateľské rozhranie sa nachádza na `/dashboard/radar/combos`. Číta iba lokálne
koncové body `GET /api/radar/catalog` a `GET /api/combos/builder/options`. Nikdy nespúšťa synchronizáciu Radaru,
nečíta prihlasovacie údaje poskytovateľa ani nezapisuje priamo do databázy kombinácií.

Klienti MCP môžu čítať rovnakú lokálnu projekciu pomocou `omniroute_radar_catalog` (`read:radar`). Voliteľné
filtre `provider`, `familyId` a `enabledOnly` sa vyhodnocujú po jednom lokálnom
čítaní `GET /api/radar/catalog`. Jeho uzavretý výstup zahŕňa metadáta katalógu spolu s poskytovateľom/modelom,
zobrazovaným názvom, `familyId`, kvótou, schopnosťami, stavom povolenia, pôvodom a `disabledBy`; adresy URL
nastavenia, kroky, pripojenia, e-mailové adresy, kľúče ani odporúčacie údaje sa nikdy nevracajú. Tento nástroj je
určený iba na čítanie a nikdy nevolá `/api/radar/sync`.

### Značky pôvodu

Každá zlúčená položka obsahuje pole `origin`, ktoré používateľské rozhranie vykresľuje ako odznak:

- `"baseline"` — nezmenené zo statického katalógu vydania.
- `"radar"` — jedno alebo viac polí bolo aktualizovaných z dátového kanála.
- `"local"` — operátor má pri tejto položke aspoň jedno lokálne prepísanie (lokálne
  prepísania majú podľa pravidla 1 vždy prednosť pred dátovým kanálom bez ohľadu na to, čo dátový kanál uvádza).

---

## Lokálne rozhrania — nikdy nie proxy pre kanál

Nižšie uvedené skupiny lokálnych trás Radar obsluhujú používateľské rozhranie v `src/app/api/radar/`:

| Trasa                          | Metóda | Účel                                                                                                                                               |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Vracia zlúčený katalóg (`getRadarCatalog()`) z lokálnej vyrovnávacej pamäte.                                                                       |
| `/api/radar/sync`              | POST   | Spustí `syncRadar()` na strane servera a vráti výsledný stav.                                                                                      |
| `/api/radar/settings`          | GET    | Vracia `{ optIn, hasSupporterKey, supporterKeyMasked }` — nikdy nie nespracovaný kľúč.                                                             |
| `/api/radar/settings`          | POST   | Nastaví súhlas a/alebo (šifrovaný) kľúč podporovateľa.                                                                                             |
| `/api/radar/referrals`         | GET    | Vracia `{ fixed, campaigns, tier }` z lokálnej vyrovnávacej pamäte — pozrite si časť [Odkazy na odporúčanie](#referral-links-free-credits) nižšie. |
| `/api/radar/offers`            | GET    | Vracia aktívne ponuky z overenej lokálnej živej vyrovnávacej pamäte; nikdy nevracia kľúč podporovateľa.                                            |
| `/api/radar/offers/sync`       | POST   | Spustí kanál `syncRadarOffers()` na strane servera, ktorý používa iba živý kľúč.                                                                   |
| `/api/radar/intel`             | GET    | Vracia overené lokálne živé údaje Intel spolu s booleovskou hodnotou rozpoznania podporovateľa; nikdy nie identitu ani kľúč.                       |
| `/api/radar/intel/sync`        | POST   | Spustí kanál `syncRadarIntel()` na strane servera, ktorý používa iba živý kľúč.                                                                    |
| `/api/radar/status`            | GET    | Vracia lokálne nastavenia a stav vyrovnávacej pamäte iba na čítanie pre katalóg, odporúčania, ponuky a Intel, bez tajných údajov.                  |
| `/api/radar/sync-all`          | POST   | Spustí všetky štyri synchronizačné moduly na strane servera a vráti samostatný stav pre každý kanál.                                               |
| `/api/radar/local-model-state` | GET    | Zobrazí zoznam uložených prepísaní a náhrobkov pre ovládacie prvky úprav a obnovenia.                                                              |
| `/api/radar/local-model-state` | PATCH  | Nastaví alebo vymaže overené polia prepísania `displayName`/`enabled`.                                                                             |
| `/api/radar/local-model-state` | PUT    | Vytvorí alebo odstráni náhrobok pomocou `{ provider, modelId, tombstoned }`.                                                                       |
| `/api/radar/local-model-state` | DELETE | Vymaže upraviteľné polia prepísania, pričom zachová prípadný náhrobok.                                                                             |

**Pevné pravidlo: tieto trasy nikdy nesprostredkúvajú službu kanála.** Prehliadač vždy komunikuje
iba s lokálnym serverom OmniRoute. Štyri moduly, ktoré pristupujú k službe Radar, sú
`src/lib/radar/sync.ts` (katalóg), `src/lib/radar/referralsSync.ts` (odporúčania) a
`src/lib/radar/offersSync.ts` (ponuky) spolu s `src/lib/radar/intelSync.ts` (Intel); všetky sa spúšťajú
na strane servera, nikdy nie na strane klienta. Vďaka tomu
sa URL kanála ani žiadny kľúč podporovateľa nikdy neobjavia v sieťovej komunikácii smerujúcej ku klientovi.

Všetky koncové body Radar vracajú `404`, keď je `RADAR_ENABLED` vypnuté (pozrite si
časť [Príznak](#flag-radar_enabled-default-off) vyššie), a chybové odpovede trás spracúvajú prostredníctvom
`buildErrorBody()`/`sanitizeErrorMessage()` podľa pravidla sanitizácie chýb platného pre celý repozitár
(`docs/security/ERROR_SANITIZATION.md`).

### Autentifikácia

Všetky koncové body Radar vyžadujú autentifikáciu prostredníctvom `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — súbor cookie relácie ovládacieho panela alebo API kľúč s rozsahom
správy, teda rovnakú bránu, ktorá chráni zvyšok `/api/settings/*`. Kontrola vypnutého
príznaku s odpoveďou `404` sa vždy vykoná **pred** kontrolou autentifikácie, takže inštalácia s vypnutým
`RADAR_ENABLED` zostáva bajtovo identická (žiadna výzva na autentifikáciu len preto, aby sa zistilo, že rozhranie neexistuje);
po zapnutí príznaku dostane neautentifikovaná požiadavka odpoveď `401` pred akýmkoľvek čítaním z DB alebo
zápisom. `GET /api/radar/settings` nikdy nevracia nespracovaný kľúč podporovateľa bez ohľadu na
stav autentifikácie — iba jeho maskovanú podobu a booleovskú hodnotu `hasSupporterKey`.

---

## Ponuky pre podporovateľov

Ponuky používajú vlastný podpísaný artefakt `GET /v1/offers/latest` a nikdy nezdieľajú vyrovnávaciu pamäť katalógu ani odporúčaní. Koncový bod servera vyžaduje platný aktívny kľúč Bearer podporovateľa; komunitný záložný režim neexistuje. `syncRadarOffers()` sa preto zastaví ešte pred sieťovou požiadavkou, ak je príznak funkcie vypnutý, prevádzkovateľ sa nezapojil alebo nie je nakonfigurovaný žiadny kľúč podporovateľa.

Po úspešnej požiadavke GET klient overí podpis Ed25519 nad presnými bajtmi odpovede, overí platnosť `RadarOffersFeedSchema`, vyžaduje, aby podpísané telo aj hlavička `x-omniroute-feed-tier` uvádzali `live`, vynúti striktne novšiu verziu s bodkovou notáciou a až potom atomicky nahradí `radar_offers_cache` (migrácia `144_radar_offers_cache.sql`). Platí rovnaký limit 10 MB pre hlavičku spolu s prúdom, aký používajú ostatné informačné kanály. Zlyhania podpisu, schémy, úrovne, opakovaného prehrania, veľkosti, HTTP aj siete zachovajú poslednú overenú vyrovnávaciu pamäť.

Uzavretý formát ponuky podporuje tri porovnateľné typy výhod: percento v bázických bodoch, kredit v najmenších menových jednotkách alebo skúšobné dni. Partnerská ponuka musí obsahovať verejnú referenčnú hodnotu rovnakého typu a jej výhoda musí byť striktne väčšia; oficiálne ponuky nemajú partnerskú referenčnú hodnotu. Adresy URL musia používať HTTPS a nesmú obsahovať prihlasovacie údaje. `getRadarOffers()` pri každom lokálnom čítaní preventívne znova overuje platnosť údajov vo vyrovnávacej pamäti a filtruje položky po dátume platnosti; `/dashboard/radar/offers` pred vykreslením znova filtruje položky po dátume platnosti, používa portugalský text, keď je dostupný, s anglickým textom ako záložnou možnosťou a partnerské ponuky explicitne označuje.

Prehliadač volá iba lokálne trasy: načíta maskovaný prehľad nastavení, požiada `POST /api/radar/offers/sync` o obnovenie na strane servera a následne načíta `GET /api/radar/offers`. Bez kľúča namiesto pokusu o požiadavku na informačný kanál zobrazí existujúce odkazy pre prispievateľov a podporovateľov. Externé odkazy na ponuky sa otvárajú na novej karte s `noopener noreferrer`. V tomto vydaní nie je sprístupnený žiadny nástroj MCP `radar_offers`.

---

## Radar Intel, odznak podporovateľa a CLI

Intel je podpísaný artefakt na adrese `GET /v1/intel/latest`. Uzavretá schéma `RadarIntelFeedSchema` prijíma iba rebríčky ELO vlastnené službou Radar, ktoré sú odvodené súkromným kurátorom z potvrdených porovnaní, a faktické rozdiely vo veku a počte katalógu odvodené z podpísaných snímok katalógu. Metodika je pevne stanovená na počiatočné hodnotenie 1000 a K=32. Prázdny rebríček je platný, ak nebolo potvrdené žiadne porovnanie; klient ho nikdy synteticky nevytvára.

`syncRadarIntel()` uplatňuje rovnaký serverový Bearer, 30-sekundový časový limit, limit streamu 10 MiB, overenie Ed25519 nad presnými bajtmi, striktnú schému, požiadavku na hodnotu `live` v tele aj hlavičke, minimálnu verziu a zachovanie poslednej funkčnej vyrovnávacej pamäte ako ponuky. Po uložení overenej aktívnej snímky klient odvodí `radar:<sha256(supporter key)>`, uloží iba túto jednosmernú identitu a vyšle vyhradenú udalosť rozpoznania `radar_supporter`. Jej odznak `radar-supporter` je idempotentný a udeľuje nula XP; nikdy neaktualizuje rebríčky ani opätovne nepoužíva `token_share`. `/dashboard/radar/intel` vykresľuje odznak iba na základe overených metadát lokálnej vyrovnávacej pamäte.

CLI sprístupňuje `omniroute radar status` a `omniroute radar sync`. Oba komunikujú iba s lokálnym API OmniRoute. `status` vykoná iba na čítanie určenú požiadavku `GET /api/radar/status`; `sync` odošle jednu požiadavku `POST /api/radar/sync-all` a vypíše výsledok pre každý informačný kanál. Ani jeden príkaz nečíta, neprijíma ani nevypisuje kľúč podporovateľa a ani jeden nekontaktuje službu Radar priamo.

---

## Odporúčacie odkazy (bezplatné kredity)

Odporúčacie odkazy sa poskytujú zo **samostatného, vždy aktuálneho** feedu —
`GET /v1/referrals/latest` — oddelene od katalógového feedu. Je to zámerné:
katalógový feed v komunitnej úrovni je snímka, ktorá môže byť stará až 30 dní, takže
odporúčací odkaz získaný z neho predtým zaostával za skutočným zoznamom odkazov na
serveri o rovnaký čas (novopridaný odporúčací odkaz sa k bezplatnému/komunitnému
používateľovi nemusel dostať až mesiac). Feed odporúčaní toto oneskorenie odstraňuje
vďaka synchronizácii vo vlastnom, oveľa kratšom intervale.

```ts
// Telo odpovede GET /v1/referrals/latest (podpísané pomocou Ed25519, rovnaký pripnutý
// kľúč ako pri katalógovom feede):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministické: max(updatedAt) naprieč
                                  // odporúčacími odkazmi, takže dve identické požiadavky
                                  // vytvoria presne rovnaké podpísané bajty/podpis
  referrals: {
    fixed: RadarReferral[],      // prítomné v KAŽDEJ úrovni vrátane bez overenia/komunitnej
    campaigns: RadarReferral[],  // vyplnené iba pri platnom aktívnom Bearer kľúči
                                  // (podporovateľa); požiadavky bez overenia alebo
                                  // s vypršaným kľúčom dostanú []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Na rozdiel od katalógového feedu toto telo vôbec neobsahuje pole `tier` — server
rozhoduje, čo zahrnie do každej požiadavky, na základe kľúča `Authorization`, takže
hlavička odpovede `x-omniroute-feed-tier` je JEDINÝM zdrojom poskytovanej úrovne
(`referralsSync.ts::syncRadarReferrals`); chýbajúca alebo nerozpoznaná hlavička sa
degraduje na `"community"`, teda predpoklad s najnižšími oprávneniami.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) overuje celé telo
a opätovne používa rovnakú schému `RadarReferralSchema` exportovanú z `feedSchema.ts`,
takže oba feedy overujú jednotlivé odporúčania identicky. Každá hodnota
`RadarReferral.url` musí používať `https://` — adresa URL s `http://` neprejde
overením schémy.

STARÉ pole `referrals` vložené do katalógu v `RadarFeedSchema` (`feedSchema.ts`) sa
zachováva kvôli spätnej kompatibilite s už uloženými katalógovými feedmi, ale
`getRadarReferrals()` ho už nečíta — pozrite si časť [Prístupová funkcia](#accessor)
nižšie.

### Synchronizácia

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) je JEDINÝ modul, ktorý
pristupuje k sieti kvôli odporúčaniam, pričom presne kopíruje kontrakt funkcie
`syncRadar()`: vypnutý príznak → `disabled`; nesúhlas s účasťou → `opt_out`; stiahne
`${RADAR_FEED_URL}/v1/referrals/latest` (s rovnakými prepísaniami
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` pre forky ako katalóg), overí podpis Ed25519 nad
presnými bajtmi odpovede (`verifyFeedBytes`), overí obsah pomocou
`RadarReferralsFeedSchema` a uloží ho do vyrovnávacej tabuľky
`radar_referrals_cache` (migrácia `142_radar_referrals_cache.sql`) — tabuľky úplne
oddelenej od katalógovej tabuľky `radar_feed_cache`. Limit odpovede 10 MB a dolná
hranica `generatedAt` odmietnu prichádzajúci feed starší než ten uložený vo
vyrovnávacej pamäti, čím chránia pred opätovným prehratím staršieho podpísaného
artefaktu. Rovnaká časová pečiatka sa akceptuje: server zámerne prideľuje komunitnému
a aktívnemu variantu odporúčaní rovnakú deterministickú hodnotu `generatedAt`, takže
podpísaný obsah a poskytovaná úroveň sa môžu po zmene kľúča podporovateľa zmeniť bez
toho, aby sa zmenila základná množina odkazov. Nikdy nevyvolá výnimku — vždy vráti
stavový objekt; chyby nikdy neobsahujú trasovanie zásobníka v `reason`.

Vyrovnávaciu pamäť odporúčaní udržiavajú aktualizovanú dva spúšťače, pričom oba sú
nezávislé od vlastného 24-hodinového intervalu katalógu:

- **Synchronizácia pri čítaní** — samotné `GET /api/radar/referrals` volá
  `syncRadarReferrals()` priamo vždy, keď vyrovnávacia pamäť chýba alebo je staršia
  než `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), ešte pred poskytnutím
  odpovede. Vďaka tomu sú pevné odkazy „vždy aktuálne“ už pri nasledujúcom načítaní
  ovládacieho panela bez čakania na akýkoľvek časovač na pozadí.
- **Vedľajšia synchronizácia plánovača** — `radarSchedulerTick()` (`scheduler.ts`)
  nezávisle vyhodnocuje zastaranosť odporúčaní pri rovnakom hodinovom tiku, aký sa
  používa pre katalóg, a v prípade potreby volá `syncRadarReferrals()`. Spustí sa bez
  ohľadu na to, či mal byť katalóg v danom tiku synchronizovaný, a nikdy neovplyvní
  štruktúru `RadarTickResult` (iba vedľajší efekt vykonávaný podľa možností, pričom
  chyby sa potlačia).

### Prístupová funkcia

`src/lib/radar/index.ts` exportuje dve prístupové funkcie iba na čítanie, pričom ani
jedna nikdy nevyvolá výnimku (rovnaký defenzívny kontrakt ako `getRadarCatalog()` —
vypnutý príznak, chýbajúca vyrovnávacia pamäť alebo poškodený uložený obsah vždy
vrátia prázdnu štruktúru namiesto chyby):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  číta z `radar_referrals_cache` (prostredníctvom `getRadarReferralsCache()`) a overuje
  pomocou `RadarReferralsFeedSchema` — **nie** z vyrovnávacej pamäte katalógu.
- `getDefaultReferralFor(provider)` → odporúčanie `fixed` s `isDefault: true` pre
  daného poskytovateľa alebo `null`. Kontroluje iba `fixed` — kampaň sa nikdy nepoužije
  ako „predvolený“ odkaz poskytovateľa.

Samotné pravidlo určujúce, „ktoré odporúčanie je predvolené pre poskytovateľa“, sa
nachádza vo funkcii `findDefaultReferral()` (`src/lib/radar/referrals.ts`), malej
čistej funkcii **bez importu DB** — možno ju bezpečne importovať do komponentu
`"use client"`. `getRadarReferrals`/`getDefaultReferralFor` (v `index.ts`) importujú
`@/lib/db/radar`, a preto zostávajú dostupné iba na serveri; ovládací panel
poskytovateľov importuje priamo `referrals.ts` namiesto `index.ts` (pozrite nižšie),
aby sa `better-sqlite3` nepribalil do kódu pre prehliadač.

### `GET /api/radar/referrals`

Dodržiava presne rovnaké poradie kontrol ako všetky ostatné trasy Radar: vypnuté `RADAR_ENABLED` →
`404` (kontroluje sa ako prvé, bajtovo identické zotrvanie); neautentifikovaný používateľ → `401`; inak
pri neaktuálnych údajoch spustí synchronizáciu pri čítaní (pozri vyššie) a následne vráti `200` s
`{ fixed, campaigns, tier }` — `tier` pochádza priamo z riadka vo vyrovnávacej pamäti (ktorý mohol byť práve obnovený)
a má čisto informatívny charakter (riadi text nenásilnej ponuky vyššieho plánu v používateľskom rozhraní nižšie). Nikdy
nepoužíva server zdroja priamo ako proxy — samotný zdrojový kód trasy neobsahuje žiadne volanie `fetch(`;
sieťová komunikácia prebieha výhradne vo vnútri `syncRadarReferrals()`, podľa rovnakého princípu
používania iba lokálnej vyrovnávacej pamäte ako pri `/api/radar/catalog`.

### Používateľské rozhranie ovládacieho panela — karta „Kredity zdarma“ na `/dashboard/radar`

Existujúca stránka Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) sa znova použije ako
druhá karta namiesto novej trasy — menší rozsah routovania/i18n pre funkciu, ktorá je
variáciou údajov, ktoré už stránka načítava. Po prihlásení do programu panel kariet ponúka
**Katalóg** (existujúca tabuľka) a **Kredity zdarma**:

- Pevné odkazy sú zoskupené podľa poskytovateľa, pričom každý zobrazuje `requiredAction` (ak je k dispozícii)
  a tlačidlo s `target="_blank" rel="noopener noreferrer"` smerujúce na referral URL.
- Kampane zobrazujú to isté a navyše `validUntil`, ak je k dispozícii.
- Keď je `campaigns` prázdne **a** poskytovaná úroveň je `community`, používateľské rozhranie zobrazí
  krátku poznámku s ponukou vyššieho plánu („časovo obmedzené kampane sú bonusom pre podporovateľov“) — táto poznámka **nikdy**
  neskrýva ani neobmedzuje zoznam pevných odkazov, ktorý zostáva úplne naplnený pre každú úroveň. Táto
  ponuka je iba nenásilným oznámením, nikdy nie prekážkou.

### Referral odkaz v názve poskytovateľa (ovládací panel poskytovateľov)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
už prepájal názov poskytovateľa s `providerInfo.website`, ak bol k dispozícii, pričom existoval jeden
precedens pre monetizovaný odkaz: poznámka k partnerskému odkazu Kimi (Moonshot AI)
(kľúč i18n `providers.kimiPartnerLinkNote`). D28 opätovne používa presne ten istý vzor nenápadnej poznámky
pre predvolené referral odkazy Radar namiesto zavedenia nového kľúča.

Voľné prepojenie je zámerné:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  je **čistá** funkcia — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — bez závislosti od `@/lib/radar` alebo `@/lib/db/*`. Súbor `providerPageUtils.ts` ako
  celok zostáva bez týchto importov (overuje to
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponent s `"use client"`) je jediným miestom, ktoré môže
  načítavať údaje Radar — prostredníctvom `fetch("/api/radar/referrals")`, podľa rovnakého vzoru
  lokálnej trasy, aký používa samotná stránka ovládacieho panela Radar — a predvolený referral odkaz
  vypočítava na strane klienta pomocou `findDefaultReferral()` z `src/lib/radar/referrals.ts`, ktorý je nezávislý od DB.
- Keď je `RADAR_ENABLED` vypnuté, požiadavka vráti 404, `referralUrl` zostane `null` a
  `resolveProviderHeaderLink()` vráti statickú katalógovú hodnotu `website` bez zmeny — stránka
  poskytovateľa je bajtovo identická so stavom pred zavedením tejto funkcie. Rovnaký výsledok nastane,
  keď zatiaľ neexistuje vyrovnávacia pamäť alebo pre daného poskytovateľa neexistuje predvolený referral odkaz.
- Keď sa predvolený referral odkaz použije, `ProviderPageHeader` dostane `isReferralLink`
  a zobrazí rovnakú nenápadnú poznámku/pomocný text ako pri partnerskom odkaze Kimi (opätovne použije
  kľúč `providers.kimiPartnerLinkNote`) — nikdy nie nové, samostatné vizuálne spracovanie.

---

## Ako prevádzkovať vlastný feed

Fork alebo prevádzkovateľ vlastnej inštancie, ktorý chce mať úplnú kontrolu nad katalógom, môže spustiť vlastnú službu feedu
bez zásahu do kódu klienta:

1. Sprístupnite koncový bod `GET /v1/catalog/latest`, ktorý vracia telo JSON zodpovedajúce
   schéme `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — na najvyššej úrovni `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` a `totals`. Rešpektujte `x-omniroute-radar-schema: 2`; server kompatibilný
   s prechodným obdobím by mal požiadavky bez tejto hlavičky predvolene smerovať na samostatne podpísaný artefakt v1.
2. Podpíšte presné bajty odpovede párom kľúčov Ed25519 a vráťte podpis vo formáte base64
   v hlavičke odpovede `x-omniroute-feed-signature`.
3. Nastavte `RADAR_FEED_URL` na novú základnú URL a `RADAR_FEED_PUBKEY` na zodpovedajúci
   verejný kľúč (SPKI vo formáte base64-DER alebo PEM) — pozrite si
   [referenciu premenných prostredia](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Povoľte `RADAR_ENABLED` a udeľte súhlas prostredníctvom `POST /api/radar/settings`
   (`{ optIn: true }`).

Nie sú potrebné žiadne ďalšie zmeny kódu — `verifyFeedBytes()` automaticky použije
prepísanú hodnotu (`getFeedPublicKeys()` v `src/lib/radar/pinnedKeys.ts`) a porovnávanie
verzií, overovanie schémy aj pravidlá zlučovania sa na vlastný feed uplatňujú rovnako.

Odkazy na odporúčania (pozrite si vyššie uvedenú časť [Odkazy na odporúčania (bezplatné kredity)](#referral-links-free-credits))
sú samostatným voliteľným artefaktom: fork, ktorý poskytuje iba `/v1/catalog/latest`,
naďalej funguje v plnom rozsahu — `syncRadarReferrals()` pri odpovedi `404`
z `/v1/referrals/latest` bezpečne prejde do stavu `{ status: "error" }`
a vyrovnávacia pamäť jednoducho zostane prázdna, takže
`GET /api/radar/referrals` bude naďalej vracať `{ fixed: [], campaigns: [], tier: null }`
namiesto toho, aby spôsobila zlyhanie zvyšku stránky. Ak chcete ponúkať aj odkazy na odporúčania, sprístupnite
`GET /v1/referrals/latest` zodpovedajúci schéme `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) a podpíšte ho rovnakým párom kľúčov Ed25519 ako
feed katalógu.

Ponuky pre podporovateľov sú ďalším voliteľným artefaktom. Ak ich chcete poskytovať, implementujte
`GET /v1/offers/latest` s uzavretou schémou `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), vyžadujte aktívne oprávnenie, vráťte
`x-omniroute-feed-tier: live` a podpíšte presné bajty rovnakým kľúčom. Fork, ktorý tento
koncový bod vynechá, nemení správanie katalógu ani odporúčaní; obnovenie ponúk zlyhá bez deštruktívnych následkov
a posledná overená lokálna vyrovnávacia pamäť ponúk zostane dostupná.

Intel je rovnakým spôsobom voliteľný. Prevádzkovateľ vlastnej inštancie môže sprístupniť `GET /v1/intel/latest` pomocou
schémy `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), vyžadovať aktívne oprávnenie, vrátiť
`x-omniroute-feed-tier: live` a podpísať presné bajty zdieľaným kľúčom Ed25519. Vynechanie tohto
koncového bodu nemení katalóg, odporúčania ani ponuky; obnovenie Intel zachová poslednú overenú
lokálnu snímku.

---

## Súvisiaca dokumentácia

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — vzor
  chybových odpovedí, ktorý používajú trasy `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referencia pre `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
