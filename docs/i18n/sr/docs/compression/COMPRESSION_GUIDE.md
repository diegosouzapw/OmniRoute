# 🗜️ Prompt Compression Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Аутоматски уштедите 15–95% на погодном контексту. За кратак преглед погледајте [одељак README-а о компресији](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Преглед

OmniRoute примењује модуларан процес компресије упита који се извршава **проактивно**, пре него што захтеви стигну до узводних провајдера. То значи да се токени штеде транспарентно — нису потребне никакве промене у вашем начину рада.

```
Захтев клијента
  → Избор стратегије компресије
    → Замена подешавањем комбинације? → Користи подешавање комбинације
    → Праг аутоматског активирања? → Користи аутоматски режим
    → Подразумевани режим? → Користи глобално подешавање
    → Искључено? → Прескочи компресију
  → Изабрани режим компресије
    → Искључено: Без компресије
    → Лаки: Безбедно чишћење размака/форматирања (~15%)
    → Стандардни: Уклањање сувишних речи у телеграфском стилу (~30%)
    → Агресивни: Старење историје + сажимање (~50%)
    → Ултра: Хеуристичко орезивање + проређивање блокова кода (~75%)
    → RTK: Филтрирање излаза терминала/алата прилагођено командама (узводни опсег 60–90%)
    → Наслагани: Уређени процес са више механизама, обично RTK па Caveman (опсег од 78–95% погодног садржаја)
  → Компримовани захтев → Провајдер
```

---

## Режими компресије

### Искључено

Компресија се не примењује. Све поруке пролазе без измена.

### Лаки режим (~15% уштеде, кашњење <1ms)

Најбезбеднији режим — без семантичких промена, само чишћење форматирања:

| Техника                  | Опис                                                    |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Спаја узастопне празне редове и уклања размаке на крају |
| `dedupSystemPrompt`      | Уклања дуплиране системске поруке                       |
| `compressToolResults`    | Компримује опширне излазе алата/функција                |
| `removeRedundantContent` | Уклања поновљена упутства                               |
| `replaceImageUrls`       | Скраћује URI-је са base64 подацима слика                |

**Најбоље за:** Сталну употребу и токове рада у којима је безбедност од пресудног значаја.

### Стандардни режим (~30% уштеде)

Инспирисан алатом [Caveman](https://github.com/JuliusBrussee/caveman) — уклања сувишне речи и опширне формулације уз очување значења:

- Уклања поштапалице („молим“, „мислим“, „у суштини“, „заправо“)
- Сажима опширне изразе („како би“ → „да“, „као резултат“ → „због“)
- Уклања учтиво ублажавање („Да ли бисте могли...“, „Ако бисте можда могли...“)
- Више од 30 regex правила прилагођених упитима за програмирање

**Најбоље за:** Свакодневне програмерске токове рада и тимове који воде рачуна о трошковима.

### Агресивни режим (~50% уштеде)

Паметно управљање историјом за дуге сесије:

- **Старење порука** — старије поруке се прогресивно компримују
- **Сажимање резултата алата** — дуги излази алата замењују се сажецима
- **Заштита структурног интегритета** — осигурава доследност парова `tool_use` + `tool_result`
- **Уважавање контекстног прозора** — поштује ограничења броја токена за сваки модел

**Најбоље за:** Продужене сесије отклањања грешака и велике базе кода.

### Ултра режим (~75% уштеде)

Максимална компресија за сценарије у којима су токени критични:

- **Хеуристичко орезивање** — уклања поруке испод прага релевантности
- **Проређивање блокова кода** — компримује понављајуће примере кода
- **Скраћивање бинарном претрагом** — проналази оптималну тачку скраћивања за контекстни прозор
- Укључује све функције агресивног режима

**Најбоље за:** Ситуације у којима често достижете ограничења контекста.

### RTK режим (узводни опсег 60–90%)

RTK режим је оптимизован за опширне излазе алата који се појављују у сесијама програмерских агената:

- Препознаје класе команди/излаза као што су `git status`, `git diff`, `git log`, покретачи тестова,
  TypeScript/Vite/Webpack израде, ESLint/Biome/Prettier, npm провере/инсталације, Docker евиденције, инфраструктурни
  излаз и генерички излаз љуске
- Примењује пакете JSON филтера из `open-sse/services/compression/engines/rtk/filters/`
- Увози филтере RTK TOML шеме v1 из пројектних или глобалних `filters.toml` датотека, са провером
  уграђених тестова и условљавањем поверењем за пројектне датотеке
- Испоручује 49 уграђених филтера са уграђеним примерима за проверу
- Уклања ANSI контролне секвенце, траке напретка, поновљене редове и небитни шум
- Задржава неуспехе, грешке, упозорења, измењене датотеке, сажетке и завршетак дугог излаза
- Подржава пројектне филтере условљене поверењем, глобалне филтере и опциони опоравак редигованог сировог излаза

**Најбоље за:** Сесије агената са транскриптима љуске, израде, тестирања, git-а, grep-а и излаза датотека.

### Наслагани режим (опсег од 78–95% погодног садржаја)

Наслагани режим покреће више механизама за компресију детерминистичким редоследом. Подразумевани процес је:

```txt
RTK -> Caveman
```

Овај редослед најпре сажима излаз терминала/алата, а затим примењује Caveman семантичко сажимање на
преостали упит на природном језику. Наслагани процеси могу се конфигурисати глобално или путем
комбинација компресије додељених комбинацијама усмеравања.

**Најбоље за:** Мешовити контекст са великим евиденцијама алата, заједно са људским упутствима или сажецима асистента.

---

## Математика уштеде из изворних пројеката

OmniRoute документује уштеде захваљујући компресији из два извора: мерења перформанси изворних пројеката и
сопственог комбиновања механизама у оквиру OmniRoute-а.

| Извор   | Број из README-а изворног пројекта који се овде користи                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` мање излазних токена, просечна уштеда излаза од `65%` на тестовима, распон од `22-87%` и алат за компресију улаза од `~46%` |
| RTK     | Уштеда од `60-90%` на излазу команди; пример сесије: `~118,000 -> ~23,900` токена, односно уштеда од `79.7%` (`~80%`)              |

За преклапајуће садржаје алата/контекста, подразумевана OmniRoute комбинација надовезује механизме:

```txt
RTK -> Caveman
```

Комбиноване уштеде су мултипликативне, а не адитивне:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Тај број од `78-95%` важи када и RTK и Caveman могу да смање исти улазни/контекстуални садржај.
Caveman режим излазног одговора је засебан: када је омогућен, користе се сопствене Caveman уштеде излаза (просечно `65%`,
истакнутих `~75%`, распон од `22-87%`). Укупне уштеде при наплати зависе од односа улазних упита и излаза.

### Шта „подесно” заправо значи

Истакнути распон од 15-95% је стваран, али важи само за **редундантан или преопширан** садржај — поновљене
редове грешака, евиденцију изградње која непрестано исписује исто упозорење, превелики `grep`/исписи читања датотека. То
**не** значи да се при сваком захтеву остварује толика уштеда.

Емпиријски потврђено (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): извршавање
`stacked` (RTK + Caveman) режима над `tool_result` блоком у Anthropic формату, који садржи 300 идентичних
редова грешке, дало је **уштеду од 95.93% токена / 96.26% знакова** — тачно у оквиру оглашеног
распона. Међутим, исти процес примењен на нормалан, нередундантан излаз алата (чиста листа `grep` подударања,
кратко читање датотеке, обичан разговорни текст) исправно даје **уштеду близу нуле**, јер
нема ничег што се понавља и `validateCompression()` (`validation.ts`) одбија да пошаље
прерађен садржај који би изоставио или изменио блокове кода, URL адресе, наслове, верзије или идентификаторе константи исписане СВИМ ВЕЛИКИМ СЛОВИМА.

Ово је очекивано и безбедно понашање, а не грешка: сесија програмирања која углавном чита/претражује чисте датотеке помоћу `grep`
оствариће скромну укупну уштеду чак и када је компресија у потпуности омогућена, док ће сесија која наиђе на неуспешну
петљу или преопширан линтер остварити пуни распон од 78-95% на том саобраћају. Немојте користити низак
проценат укупне уштеде једне сесије као доказ да је компресија погрешно конфигурисана — прво проверите да ли је
основни излаз алата заиста био редундантан.

---

## Визуелизација уштеде токена

```
Без компресије:       47K токена послато LLM-у
Са Lite:               40K токена послато         (уштеда 15% — безбедно, увек укључено)
Са Standard:           33K токена послато         (уштеда 30% — правила Caveman говора)
Са Aggressive:         24K токена послато         (уштеда 50% — старење + сажимање)
Са Ultra:              12K токена послато         (уштеда 75% — хеуристичко орезивање)
Са RTK:                19K-5K токена послато      (уштеда 60-90% на излазу команди/алата)
Са Stacked:            10K-2.5K токена послато    (подесни RTK+Caveman распон од 78-95%)
```

---

## Konfiguracija

### Kontrolna tabla

Idite na `Kontrolna tabla → Kontekst i keš`:

- **Caveman** — izbor režima, jezički paketi, pregled i globalne podrazumevane vrednosti
- **RTK** — pregled filtera komandi, RTK bezbednosna podešavanja i katalog filtera
- **Kombinacije kompresije** — imenovane cevovode motora dodeljene kombinacijama rutiranja
- **Prag automatskog okidanja** — automatski aktivira kompresiju kada broj tokena pređe prag

### Premošćavanje po kombinaciji

U `Kontrolna tabla → Kontekst i keš → Kombinacije kompresije`, dodelite kombinaciju kompresije kombinaciji rutiranja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućava da koristite složenu kompresiju na besplatnim/kodirajućim provajderima, dok zadržavate lite režim na plaćenim pretplatama.

Ovo dodeljivanje "Premošćavanja po kombinaciji" je drugačija kontrola od premošćavanja **režima kompresije kombinacije rutiranja** (Default/Off/Lite/Standard/Aggressive/Ultra) — to premošćavanje ne bira imenovani cevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje konsultuje `resolveCompressionPlan`. Može se podesiti ili na kartici kombinacije (`Kontrolna tabla → Kombinacije`) ili, od #6760, po kombinaciji rutiranja na listi "Dodelite rutiranju" na `Kontrolna tabla → Kontekst i keš → Kombinacije kompresije`, odmah pored polja za potvrdu dodeljivanja cevovoda dokumentovanog iznad. Obe površine se čuvaju putem iste `PUT /api/combos/{id}` krajnje tačke.

### Premošćavanje po zahtevu

Pošaljite `x-omniroute-compression` zaglavlje zahteva da premostite plan kompresije za jedan zahtev. Ono ima najveći prioritet — nadjačava premošćavanje kombinacije rutiranja, aktivni profil, automatsko okidanje i podrazumevanu vrednost panela. Nepoznate vrednosti se ignorišu (zahtev nikada nije odbijen) i globalni glavni prekidač i dalje kontroliše sve: kada je kompresija globalno isključena, zaglavlje je ne može uključiti. Vrednosti:

| Vrednost      | Efekat                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `off`         | Nema kompresije za ovaj zahtev.                                                                      |
| `default`     | Podrazumevani profil izveden iz panela (ignoriše aktivni profil). Gubitni motori su isključeni.      |
| `safe`        | Isto kao izostavljanje zaglavlja: samo dedup i preklapanje belina.                                   |
| `allow-lossy` | Zadržite plan operatora ovog zahteva, uključujući sažetke, filtere relevantnosti i prepravke stila.  |
| `engine:<id>` | Jedan motor kada je omogućen, npr. `engine:rtk`. Ovo je opcija uključivanja po zahtevu za taj motor. |
| `<combo>`     | Imenovana kombinacija, prvo se podudara po imenu (bez obzira na veličinu slova), a zatim po ID-u.    |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, gubitni motori se ne primenjuju. Zahtev i dalje dobija dedup sesije i preklapanje belina kada je kompresija uključena.

Primenjeni plan se vraća u `X-OmniRoute-Compression: <mode>; source=<source>` zaglavlju odgovora, gde je `<source>` jedno od `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ili `off`.

### API

```bash
# Preuzmi podešavanja kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj podešavanja kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pregledaj specifični RTK/složeni teret
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Izlistaj RTK pakete filtera
curl http://localhost:20128/api/context/rtk/filters

# Testiraj RTK direktno sa opcionalnim metapodacima komande
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Шта се штити

Механизам за компресију **увек чува:**

- ✅ Блокове кода (ограђене и уметнуте)
- ✅ URL адресе и путање датотека
- ✅ JSON структуре и структуриране податке
- ✅ Идентификаторе и заштићене техничке токене
- ✅ Математичке изразе
- ✅ Дефиниције позива алата/функција
- ✅ Системске упите (у lite режиму)

Опоравак сировог RTK излаза редигује уобичајене API кључеве, bearer токене, Slack токене, AWS приступне кључеве,
лозинке, токене и тајне пре него што се било шта трајно сачува.

---

## Статистика компресије

Сваки компримовани захтев укључује статистику у серверским евиденцијама:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Mapa puta faza

| Faza    | Režimi                                                                                                                                                              | Status        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Faza 1  | Isključeno, Lite                                                                                                                                                    | ✅ Isporučeno |
| Faza 2  | Standardno, Agresivno, Ultra                                                                                                                                        | ✅ Isporučeno |
| Faza 3  | RTK, Složeno, Kombinacije kompresije                                                                                                                                | ✅ Isporučeno |
| Faza 4  | Izlazni stilovi, SLM-nivo Ultra, eval harness                                                                                                                       | ✅ Isporučeno |
| Faza 4C | Adaptivni budžet konteksta ("biranje") — računarski mehanizam + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole režima/politike kontrolne table | ✅ Isporučeno |

---

## Захвалнице

Правила компресије у Standard режиму инспирисана су пројектом **[Caveman](https://github.com/JuliusBrussee/caveman)** аутора **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — виралним пројектом „зашто користити много токена када мало токена завршава посао“. Caveman наводи `~75%` мање излазних токена, просечну уштеду излаза од `65%` на референтним тестовима, распон излаза од `22-87%` и алат за компресију улаза од `~46%`.

RTK режим је инспирисан пројектом **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** организације **[RTK AI](https://github.com/rtk-ai)** — пројектом високих перформанси за компресију излаза команди за терминал, изградњу, тестирање, git и филтрирање излаза алата. RTK наводи уштеду од `60-90%`, док пример сесије у његовом README-у показује уштеду од `~80%`.

---

## Napredni sistemi kompresije

Pored 7 standardnih režima, OmniRoute uključuje nekoliko naprednih sistema kompresije
koji rade automatski na osnovu konteksta.

### Kompresija svesna keša

Neki provajderi (poput Anthropic-a sa keširanjem promptova) podržavaju **keširanje promptova**,
što im omogućava da keširaju delove prompta kako bi smanjili troškove i kašnjenje. Kada
je keširanje omogućeno, agresivna kompresija zapravo može **naškoditi** performansama
jer menja keširane tokene, poništavajući keš.

Modul `cachingAware.ts` ovo rešava **detektovanjem konteksta keširanja** i
**prilagođavanjem strategije kompresije** u skladu sa tim.

#### Kako funkcioniše

1.  **Detektuje kontekst keširanja** — Skenira telo zahteva za `cache_control` markere
2.  **Identifikuje provajdere koji podržavaju keširanje** — Proverava da li ciljni provajder podržava keširanje
3.  **Prilagođava strategiju** — Smanjuje `aggressive`/`ultra` na `standard` za provajdere koji podržavaju keširanje
4.  **Preskače sistemski prompt** — Sistemski promptovi su obično keširani, pa ih ne kompresujte
5.  **Koristi determinističke transformacije** — Koristi samo transformacije koje proizvode dosledan izlaz

#### Primer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marker keša
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada koristiti

Kompresija svesna keša je **uvek uključena** — nije potrebna konfiguracija. Aktivira se
samo kada:

- Zahtev ima `cache_control` markere
- Ciljni provajder podržava keširanje promptova (Anthropic, OpenAI, itd.)

### Progresivno starenje

Dugi razgovori akumuliraju mnogo poruka, ali starije poruke postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke po udaljenosti okreta**:

- **Nedavni okreti (0-3)**: Zadržani doslovno (pun detalj)
- **Srednji okreti (4-8)**: Laka kompresija (razmaci, čišćenje formatiranja)
- **Stari okreti (9+)**: Pećinska kompresija (uklanjanje punilaca, sumiranje)
- **Veoma stari okreti (20+)**: Jako sumirani ili izbačeni

#### Primer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 okreta ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prva 3 okreta: doslovno
  light: 8, // Okreti 4-8: laka kompresija
  moderate: 20, // Okreti 9-20: pećinska kompresija
  // Okreti 21+: teško sumiranje
});

// saved = broj sačuvanih tokena
```

#### Kada koristiti

Progresivno starenje je **uvek uključeno** za `aggressive` i `ultra` režime. Posebno je
efikasno za:

- Dugotrajne sesije kodiranja
- Višednevne razgovore
- Agentne radne tokove sa mnogo poziva alata

### Pećinski izlazni režim

Modul `outputMode.ts` ubacuje **instrukcije sistemskog prompta** kako bi sam model
proizvodio kompresovan, sažet izlaz (u "pećinskom" stilu).

#### Kako funkcioniše

Umesto kompresovanja ulaza, ovaj režim dodaje sistemski prompt poput:

> "Odgovori minimalnim rečima. Preskoči ljubaznosti. Koristi kratke rečenice."

Ovo posebno dobro funkcioniše za:

- Generisanje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovori (nema potrebe za detaljnim objašnjenjima)
- Grupna obrada (maksimiziranje propusnosti)

#### Kada koristiti

Pećinski izlazni režim je **opcioni** — podesite ga putem kombinovane konfiguracije:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Izlazni stilovi (katalog)

Gore navedeni pećinski izlazni režim je **nasleđeni put jednog stila**. Faza 4 ga je
generalizovala u katalog složivih izlaznih stilova: `OUTPUT_STYLE_CATALOG` u
`open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je instrukcija
sistemskog prompta koja čini da sam model proizvodi jeftiniji izlaz; stilovi se mogu
omogućiti zajedno i ubacuju se po redosledu kataloga.

| Stil                         | `id`          | Šta radi                                                                                                                                                                                                                    | Jezici instrukcija                                              |
| :--------------------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| Sažeta proza                 | `terse-prose` | Izbacuje suvišne reči/članove/ograde; čuva tehničku suštinu tačnom. Isti tekst kao i stari caveman izlazni režim (referenciran, nije ponovo kucan).                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Manje koda                   | `less-code`   | YAGNI princip: najmanja funkcionalna promena, bez netraženih apstrakcija.                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Ponytail (lenji stariji dev) | `ponytail`    | "Najbolji kod je kod koji nikada nije napisan": ponovna upotreba > prepisivanje, osnovni uzrok > simptom, najkraći funkcionalni diff.                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Imam ADHD (akcija-prvo)      | `i-have-adhd` | Akcija prvo (komanda/putanja/isečak pre proze), numerisani ograničeni koraci, JEDAN konkretan sledeći korak, bez uvoda/rezimea/zaključaka. Adaptirano iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Sažeti CJK (文言)            | `terse-cjk`   | Klasični kineski ultra-sažeti stil.                                                                                                                                                                                         | zh (ograničeno lokalom: nudi se samo kada je rešeni jezik `zh`) |

Svaki stil dolazi sa tri nivoa intenziteta — `lite`, `full`, `ultra` — i svaki nivo
se završava zajedničkom klauzulom o granicama, koja čuva blokove koda, putanje datoteka, komande,
stringove grešaka, URL-ove i identifikatore doslovno.

#### Kako funkcioniše ubrizgavanje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rešava
selekciju u odnosu na katalog (nepoznati ID-ovi i stilovi koji se ne podudaraju sa lokalom se
odbacuju, nikada ne izazivaju grešku), spaja odabrane instrukcije po redosledu iz kataloga,
dodaje klauzulu o granicama **jednom**, i unapred učitava rezultat u sistemski prompt
iza jednog markera idempotencije (`[OmniRoute Output Styles]`) — ponovna primena
je no-op. Kada detektovani jezik zahteva prevod, lokalizovana instrukcija se ubrizgava umesto engleske.

#### Kako omogućiti

Na kontrolnoj tabli: **Context → Settings → Compression** — jedan red po stilu sa
prekidačem za uključivanje/isključivanje i selektorom nivoa. Programski, konfiguracija kompresije
čuva selekciju kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost unazad: stari `outputMode: "caveman"` kombinovani parametar i dalje radi i mapira se na
`terse-prose`, bajt-identičan starom ubrizgavanju u svakom starom jeziku.

Izbor jezika: kada je `languageConfig.enabled` uključen, `autoDetect` bira
jezik poslednje korisničke poruke (isti detektor kao i ulazni mehanizmi);
isključivanje `autoDetect` fiksira `defaultLanguage`. Isključeno → Engleski.

Matrica stil × jezik je fiksirana pomoću
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: novi stil ne može biti isporučen
bez barem pt-BR prevoda (ili eksplicitnog praćenog izuzetka), a postojeći
stil ne može tiho izgubiti lokal. Da biste dodali stil, pogledajte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

Modul `toolResultCompressor.ts` pruža **5 specijalizovanih strategija kompresije**
za rezultate alata (pozivi funkcija, izlazi agenta, rezultati pretrage, itd.):

1.  **Kompresija rezultata pretrage** — Uklanja suvišne rezultate, zadržava top-N
2.  **Kompresija čitanja datoteka** — Skraćuje velike datoteke, čuva zaglavlja/importove
3.  **Kompresija izvršavanja koda** — Zadržava samo esencijalni stdout/stderr
4.  **Kompresija upita baze podataka** — Ograničava redove, uklanja opširne metapodatke
5.  **Kompresija API odgovora** — Uklanja null polja, kondenzuje nizove

#### Kada koristiti

Kompresija rezultata alata je **uvek uključena** kada su prisutni pozivi alata. Nije
potrebna konfiguracija.

### Složeni cevovod

Složeni režim pokreće **više mehanizama u nizu** — obično prvo RTK
(ušteda 60-90% na izlazu alata), zatim Caveman (dodatnih 30% uštede na
preostalom tekstu). Ovo postiže **ukupnu uštedu od 78-95%**.

#### Kako funkcioniše

```
Ulaz (1000 tokena)
  → RTK (filter svestan komandi) → 200 tokena
    → Caveman (uklanjanje suvišnih reči) → 140 tokena
  → Izlaz (140 tokena, 86% uštede)
```

#### Kada koristiti

Koristite složeni režim za:

- Radne tokove sa mnogo alata (agentsko kodiranje, istraživanje)
- Troškovno osetljivu serijsku obradu
- Kada vam je potrebna maksimalna ušteda tokena

Konfigurišite putem kombinacije:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Замене компресије по комбинацији

Можете да замените глобални режим компресије **за сваку комбинацију појединачно** како бисте фино подесили понашање
за различите случајеве употребе:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Ово је корисно за:

- **Комбинације за програмирање**: Користите режим `aggressive` за дуге сесије
- **Комбинације за брза питања и одговоре**: Користите режим `lite` за брзе одговоре
- **Комбинације са интензивном употребом алата**: Користите режим `stacked` за максималну уштеду
- **Продукционе комбинације**: Користите режим `cache-aware` за добављаче који подржавају кеширање

---

## Погледајте и

- [Конфигурација окружења](../reference/ENVIRONMENT.md) — Променљиве окружења за компресију
- [Водич кроз архитектуру](../architecture/ARCHITECTURE.md) — Унутрашњи механизми цевовода компресије
- [Кориснички водич](../guides/USER_GUIDE.md) — Почетак рада са компресијом
- [RTK компресија](./RTK_COMPRESSION.md) — RTK филтери, модел поверења, контролна тачка верификације, опоравак необрађеног излаза
- [Механизми компресије](./COMPRESSION_ENGINES.md) — Caveman, RTK, `stacked`, API-ји, MCP, контролна табла
- [Формат правила компресије](./COMPRESSION_RULES_FORMAT.md) — Формат JSON пакета правила
- [Језички пакети за компресију](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman правила специфична за језик
