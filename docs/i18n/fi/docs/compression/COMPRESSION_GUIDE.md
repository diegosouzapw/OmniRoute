# 🗜️ Prompt Compression Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Säästä automaattisesti 15–95 % soveltuvasta kontekstista. Katso nopea yleiskatsaus [README-tiedoston pakkausosiosta](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Yleiskatsaus

OmniRoute toteuttaa modulaarisen kehotteiden pakkausputken, joka suoritetaan **ennakoivasti** ennen kuin pyynnöt saavuttavat ylävirran palveluntarjoajat. Näin tunnisteita säästyy läpinäkyvästi — työnkulkuusi ei tarvitse tehdä muutoksia.

```
Asiakaspyyntö
  → Pakkausstrategian valitsin
    → Yhdistelmän ohitus? → Käytä yhdistelmäasetusta
    → Automaattisen käynnistyksen kynnys? → Käytä automaattista tilaa
    → Oletustila? → Käytä yleistä asetusta
    → Pois käytöstä? → Ohita pakkaus
  → Valittu pakkaustila
    → Pois käytöstä: Ei pakkausta
    → Kevyt: Turvallinen välilyöntien/muotoilun siivous (~15 %)
    → Vakio: Luolamiestyylinen täytesanojen poisto (~30 %)
    → Aggressiivinen: Historian ikäännytys + tiivistäminen (~50 %)
    → Ultra: Heuristinen karsinta + koodilohkojen harvennus (~75 %)
    → RTK: Komennot huomioiva pääte-/työkalutulosteen suodatus (60–90 % ylävirran vaihteluväli)
    → Pinottu: Järjestetty usean moottorin putki, yleensä RTK ja sitten Caveman (78–95 % soveltuvasta sisällöstä)
  → Pakattu pyyntö → Palveluntarjoaja
```

---

## Pakkaustilat

### Pois käytöstä

Pakkausta ei käytetä. Kaikki viestit välitetään muuttumattomina.

### Kevyt tila (~15 %:n säästö, <1 ms:n viive)

Turvallisin tila — ei semanttisia muutoksia, vain muotoilun siivousta:

| Tekniikka                | Kuvaus                                                              |
| ------------------------ | ------------------------------------------------------------------- |
| `collapseWhitespace`     | Yhdistä peräkkäiset tyhjät rivit ja poista rivien lopun välilyönnit |
| `dedupSystemPrompt`      | Poista päällekkäiset järjestelmäviestit                             |
| `compressToolResults`    | Pakkaa monisanaiset työkalu-/funktiotulosteet                       |
| `removeRedundantContent` | Poista toistetut ohjeet                                             |
| `replaceImageUrls`       | Lyhennä base64-kuvadatan URI-tunnisteita                            |

**Soveltuu parhaiten:** Jatkuvaan käyttöön ja turvallisuuskriittisiin työnkulkuihin.

### Vakiotila (~30 %:n säästö)

Inspiraationa [Caveman](https://github.com/JuliusBrussee/caveman) — poistaa täytesanoja ja monisanaisia ilmaisuja merkityksen säilyttäen:

- Poistaa täytesanoja ("ole hyvä", "luulen", "periaatteessa", "itse asiassa")
- Tiivistää monisanaisia ilmauksia ("siinä tarkoituksessa, että" → "jotta", "sen seurauksena, että" → "koska")
- Poistaa kohteliaan epäröinnin ("Voisitko...", "Jos vain mitenkään voisit...")
- Yli 30 koodauskehotteille hienosäädettyä säännöllisen lausekkeen sääntöä

**Soveltuu parhaiten:** Päivittäisiin koodaustyönkulkuihin ja kustannustietoisille tiimeille.

### Aggressiivinen tila (~50 %:n säästö)

Älykäs historian hallinta pitkiä istuntoja varten:

- **Viestien ikäännytys** — vanhempia viestejä pakataan asteittain enemmän
- **Työkalutulosteiden pakkaus** — pitkät työkalutulosteet katkaistaan tai jätetään pois (ensimmäiset/viimeiset rivit,
  osumarivien suodatus, JSON-avainten tiivistäminen)
- **Rakenteellisen eheyden suojaukset** — varmistaa, että `tool_use`- ja `tool_result`-parit pysyvät yhdenmukaisina
- **Konteksti-ikkunan huomiointi** — noudattaa mallikohtaisia tunnisterajoja

**Soveltuu parhaiten:** Pitkiin virheenkorjausistuntoihin ja suuriin koodikantoihin.

### Ultra-tila (~75 %:n säästö)

Maksimaalinen pakkaus tilanteisiin, joissa tunnisteiden määrä on kriittinen:

- **Heuristinen karsinta** — pisteytykseen perustuva proosan tunnisteiden karsinta
- **Rakenteen säilyttäminen** — aidatut koodilohkot, upotettu koodi, URL-osoitteet ja tunnisteet
  korvataan paikkamerkeillä ja liitetään takaisin sanatarkasti, eikä niitä koskaan karsita
- **Valinnainen SLM-taso** — pieni paikallinen malli voi hienosäätää karsintaa, kun se on määritetty
- Riippumaton aggressiivisesta tilasta: se ei suorita viestien ikäännytystä, työkalutulosteiden pakkausta
  tai varatiivistäjää (vain SLM-tason vika voi ohjata varakäsittelyn
  aggressiivisen tilan kautta)

**Soveltuu parhaiten:** Kun kontekstirajat ylittyvät toistuvasti.

### RTK-tila (60–90 %:n ylävirran vaihteluväli)

RTK-tila on optimoitu koodausagenttien istunnoissa esiintyville monisanaisille työkalutulosteille:

- Tunnistaa komento-/tulosteluokkia, kuten `git status`, `git diff`, `git log`, testien suorittajat,
  TypeScript/Vite/Webpack-koontiversiot, ESLint/Biome/Prettier, npm-tarkastukset/-asennukset, Docker-lokit, infrastruktuurin
  tulosteet ja yleiset komentotulkin tulosteet
- Käyttää JSON-suodatinpaketteja hakemistosta `open-sse/services/compression/engines/rtk/filters/`
- Tuo RTK TOML schema v1 -suodattimia projektin tai yleisistä `filters.toml`-tiedostoista sekä käyttää upotettujen testien
  validointia ja projektitiedostojen luottamusrajoitusta
- Sisältää 55 sisäänrakennettua suodatinta ja upotetut vahvistusnäytteet
- Poistaa ANSI-ohjaussekvenssit, edistymispalkit, toistetut rivit ja muun ei-toiminnallisen kohinan
- Säilyttää epäonnistumiset, virheet, varoitukset, muuttuneet tiedostot, yhteenvedot ja pitkän tulosteen loppuosan
- Tukee luottamusrajoitettuja projektisuodattimia, yleisiä suodattimia ja valinnaista peitetyn raakatulosteen palautusta

**Soveltuu parhaiten:** Agentti-istuntoihin, joiden transkripteissä on komentotulkin, koonnin, testien, gitin, grepin ja tiedostotulosteiden sisältöä.

### Pinottu tila (78–95 % soveltuvasta sisällöstä)

Pinottu tila suorittaa useita pakkausmoottoreita deterministisessä järjestyksessä. Oletusputki on:

```txt
RTK -> Caveman
```

Tämä järjestys tiivistää ensin pääte-/työkalutulosteen ja käyttää sitten Caveman-moottorin semanttista tiivistystä
jäljellä olevaan luonnollisen kielen kehotteeseen. Pinotut putket voidaan määrittää yleisesti tai
reititysyhdistelmiin liitettyjen pakkausyhdistelmien kautta.

**Soveltuu parhaiten:** Sekalaiseen kontekstiin, jossa on suuria työkalulokeja sekä ihmisen antamia ohjeita tai avustajan yhteenvetoja.

---

## Upstream-säästöjen laskenta

OmniRoute dokumentoi pakkauksella saavutettavat säästöt kahdesta lähteestä: upstream-projektien vertailutuloksista ja
OmniRouten omasta moottoriyhdistelmästä.

| Lähde   | Tässä käytetty upstream-README:n luku                                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` vähemmän tulostetokeneita, vertailujen keskimääräinen tulostesäästö `65%`, vaihteluväli `22-87%` ja syötteen pakkaustyökalulla `~46%` |
| RTK     | `60-90%` säästö komentojen tulosteissa; esimerkki-istunnossa `~118,000 -> ~23,900` tokenia eli säästö `79.7%` (`~80%`)                       |

Päällekkäisissä työkalu-/kontekstihyötykuormissa OmniRouten oletusyhdistelmä pinoaa moottorit:

```txt
RTK -> Caveman
```

Yhdistetyt säästöt ovat kertautuvia, eivät yhteenlaskettavia:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tämä `78-95%`:n luku pätee, kun sekä RTK että Caveman voivat pienentää samaa syöte-/kontekstihyötykuormaa.
Cavemanin vastaustulostetila on erillinen: kun se on käytössä, käytä Cavemanin omia tulostesäästöjä (`65%`
keskimäärin, `~75%` otsikkolukuna, vaihteluväli `22-87%`). Laskutuksen kokonaissäästöt riippuvat kehotteidesi ja tulosteidesi suhteesta.

### Mitä "soveltuva" todellisuudessa tarkoittaa

Otsikossa ilmoitettu 15-95%:n vaihteluväli on todellinen, mutta se koskee vain **tarpeettomasti toistuvaa tai monisanaista** sisältöä — toistuvia
virherivejä, samaa varoitusta jatkuvasti tulostavaa koontilokia tai ylimitoitettua `grep`-/tiedostonlukutulostetta. Se
**ei** tarkoita, että jokainen pyyntö säästäisi näin paljon.

Empiirisesti varmennettu (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): `stacked`-ajo
(RTK + Caveman) Anthropic-muotoiselle `tool_result`-lohkolle, joka sisälsi 300 identtistä
virheriviä, tuotti **95.93% tokenisäästön / 96.26% merkkisäästön** — täsmälleen ilmoitetulla
vaihteluvälillä. Kun sama putki kuitenkin suoritetaan tavalliselle, ei-toistuvalle työkalutulosteelle (siistille `grep`-osumaluettelolle,
lyhyelle tiedostonluvulle tai tavalliselle keskustelutekstille), se tuottaa asianmukaisesti **lähes nollasäästön**, koska
poistettavaa toistoa ei ole ja `validateCompression()` (`validation.ts`) kieltäytyy toimittamasta
uudelleenkirjoitusta, joka poistaisi tai muuttaisi koodilohkoja, URL-osoitteita, otsikoita, versioita tai KOKONAAN_ISOILLA_KIRJOITETTUJA vakioiden tunnisteita.

Tämä on odotettua ja turvallista toimintaa, ei ohjelmistovirhe: koodausistunto, jossa enimmäkseen luetaan tai etsitään `grep`-komennolla siistejä tiedostoja,
saavuttaa vain maltillisia kokonaissäästöjä, vaikka pakkaus olisi kokonaan käytössä, kun taas epäonnistuvaan
silmukkaan tai monisanaiseen lintteriin törmäävä istunto saavuttaa kyseiselle liikenteelle täyden 78-95%:n vaihteluvälin. Älä pidä yksittäisen istunnon
alhaista kokonaissäästöprosenttia todisteena pakkauksen virheellisestä määrityksestä — tarkista ensin, oliko
taustalla oleva työkalutuloste todella toistuvaa.

---

## Tokenisäästöjen visualisointi

```
Ilman pakkausta:       LLM:lle lähetetään 47K tokenia
Lite-tilassa:          Lähetetään 40K tokenia          (15% säästö — turvallinen, aina käytössä)
Standard-tilassa:      Lähetetään 33K tokenia          (30% säästö — caveman-speak-säännöt)
Aggressive-tilassa:    Lähetetään 24K tokenia          (50% säästö — vanhentaminen + tiivistäminen)
Ultra-tilassa:         Lähetetään 12K tokenia          (75% säästö — heuristinen karsinta)
RTK:lla:               Lähetetään 19K-5K tokenia       (60-90% säästö komentojen/työkalujen tulosteissa)
Stacked-tilassa:       Lähetetään 10K-2.5K tokenia     (RTK+Caveman-yhdistelmän soveltuva 78-95%:n vaihteluväli)
```

---

## Määritykset

### Hallintapaneeli

Siirry kohtaan `Hallintapaneeli → Konteksti ja välimuisti`:

- **Caveman** — tilan valinta, kielipaketit, esikatselu ja yleiset oletusasetukset
- **RTK** — komentosuodattimen esikatselu, RTK:n turvallisuusasetukset ja suodatinluettelo
- **Pakkausyhdistelmät** — nimetyt moottoriputket, jotka on liitetty reititysyhdistelmiin
- **Automaattisen aktivoinnin kynnys** — aktivoi pakkauksen automaattisesti, kun tunnisteiden määrä ylittää kynnysarvon

### Yhdistelmäkohtainen ohitus

Liitä kohdassa `Hallintapaneeli → Konteksti ja välimuisti → Pakkausyhdistelmät` pakkausyhdistelmä
reititysyhdistelmään:

```txt
Yhdistelmä: "free-tier-fallback"
  Pakkausyhdistelmä: "coding-agent-stack"
  Putki: RTK -> Caveman
  Kohteet:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Näin voit käyttää pinottua pakkausta ilmaisilla tai ohjelmointiin tarkoitetuilla palveluntarjoajilla
ja säilyttää samalla kevyen tilan maksullisissa tilauksissa.

Tämä yhdistelmäkohtainen ohitusmääritys on eri ohjaus kuin **reititysyhdistelmän pakkaustilan**
ohitus (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — kentän skeema hyväksyy myös
arvot `rtk`, `stacked` ja `omniglyph`) — kyseinen ohitus ei valitse nimettyä pakkausyhdistelmäputkea,
vaan ainoastaan asettaa `resolveCompressionPlan`-toiminnon käyttämän `compressionMode`-kentän.
Sen voi asettaa joko yhdistelmäkortissa (`Hallintapaneeli → Yhdistelmät`) tai versiosta
#6760 lähtien reititysyhdistelmäkohtaisesti `Hallintapaneeli → Konteksti ja välimuisti → Pakkausyhdistelmät`
-näkymän ”Liitä reititykseen” -luettelossa aivan edellä kuvatun putken liittämisen valintaruudun vieressä.
Molempien näkymien muutokset tallennetaan saman `PUT /api/combos/{id}`-päätepisteen kautta.

### Pyyntökohtainen ohitus

Lähetä `x-omniroute-compression`-pyyntöotsake ohittaaksesi yksittäisen pyynnön pakkaussuunnitelman.
Sillä on korkein prioriteetti — se ohittaa reititysyhdistelmän ohituksen, aktiivisen profiilin,
automaattisen aktivoinnin ja paneelin oletusasetuksen. Tuntemattomat arvot ohitetaan (pyyntöä ei
koskaan hylätä), ja yleinen pääkytkin hallitsee edelleen kaikkea: kun pakkaus on poistettu käytöstä
yleisesti, otsake ei voi ottaa sitä käyttöön. Arvot:

| Arvo          | Vaikutus                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Tätä pyyntöä ei pakata.                                                                                                              |
| `default`     | Paneelista johdettu oletusprofiili (ohittaa aktiivisen profiilin). Häviölliset moottorit eivät ole käytössä.                         |
| `safe`        | Sama kuin otsakkeen pois jättäminen: vain duplikaattien poisto ja välilyöntien tiivistäminen.                                        |
| `allow-lossy` | Säilyttää tämän pyynnön operaattorin suunnitelman, mukaan lukien yhteenvedot, relevanssisuodattimet ja tyylin uudelleenkirjoitukset. |
| `engine:<id>` | Yksi moottori, jos se on käytössä, esimerkiksi `engine:rtk`. Tämä ottaa kyseisen moottorin käyttöön pyyntökohtaisesti.               |
| `<combo>`     | Nimetty yhdistelmä, joka täsmäytetään ensin nimen perusteella kirjainkoosta riippumatta ja sitten tunnisteen perusteella.            |

Ilman arvoa `allow-lossy`, `engine:<id>` tai nimettyä yhdistelmää häviöllisiä moottoreita ei käytetä.
Pyyntöön sovelletaan silti istuntokohtaista duplikaattien poistoa ja välilyöntien tiivistämistä, kun
pakkaus on käytössä.

Käytetty suunnitelma palautetaan vastauksen `X-OmniRoute-Compression: <mode>; source=<source>`
-otsakkeessa, jossa `<source>` on jokin arvoista `request-header`, `routing-override`,
`active-profile`, `auto-trigger`, `default` tai `off`.

### API

```bash
# Hae pakkausasetukset
curl http://localhost:20128/api/settings/compression

# Päivitä pakkausasetukset
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Esikatsele tietty RTK-/stacked-hyötykuorma
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Luettele RTK-suodatinpaketit
curl http://localhost:20128/api/context/rtk/filters

# Testaa RTK:ta suoraan valinnaisilla komentometatiedoilla
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mitä suojataan

Pakkausmoottori **säilyttää aina:**

- ✅ Koodilohkot (aidatut ja tekstinsisäiset)
- ✅ URL-osoitteet ja tiedostopolut
- ✅ JSON-rakenteet ja jäsennellyt tiedot
- ✅ Tunnisteet ja suojatut tekniset tokenit
- ✅ Matemaattiset lausekkeet
- ✅ Työkalu- ja funktiokutsujen määritykset
- ✅ Järjestelmäkehotteet (lite-tilassa)

RTK:n raakatulosteen palautus peittää yleiset API-avaimet, bearer-tokenit, Slack-tokenit, AWS-käyttöavaimet,
salasanat, tokenit ja salaisuudet ennen kuin mitään tallennetaan pysyvästi.

---

## Pakkaustilastot

Jokainen pakattu pyyntö sisältää tilastot palvelinlokeissa:

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

## Vaiheiden etenemissuunnitelma

| Vaihe    | Tilat                                                                                                                                                                     | Tila         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Vaihe 1  | Off, Lite                                                                                                                                                                 | ✅ Julkaistu |
| Vaihe 2  | Standard, Aggressive, Ultra                                                                                                                                               | ✅ Julkaistu |
| Vaihe 3  | RTK, Stacked, pakkausyhdistelmät                                                                                                                                          | ✅ Julkaistu |
| Vaihe 4  | Tulostyylit, SLM-tason Ultra, eval-testikehys                                                                                                                             | ✅ Julkaistu |
| Vaihe 4C | Mukautuva kontekstibudjetti ("säädin") — laskentamoottori + API (`contextBudget` kohteessa `PUT /api/settings/compression`) + hallintapaneelin tila- ja käytäntöasetukset | ✅ Julkaistu |

---

## Kiitokset

Standard-tilan pakkaussäännöt ovat saaneet inspiraationsa **[Caveman](https://github.com/JuliusBrussee/caveman)**-projektista, jonka tekijä on **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viraaliprojekti, jonka ajatuksena on "miksi käyttää monta tokenia, kun harva token riittää". Caveman raportoi `~75%` vähemmän tulostetokeneita, `65%`:n keskimääräisen tulostesäästön vertailutesteissä, `22-87%`:n tulostesäästövälin ja `~46%`:n syötteenpakkaustyökalun.

RTK-tila on saanut inspiraationsa **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** -projektista, jonka tekijä on **[RTK AI](https://github.com/rtk-ai)** — tehokas komentotulosteiden pakkausprojekti pääte-, koonti-, testi-, git- ja työkalutulosteiden suodattamiseen. RTK raportoi `60-90%`:n säästön, ja sen README-esimerkkisuoritus osoittaa `~80%`:n säästön.

---

## Edistyneet pakkausjärjestelmät

Edellä kuvattujen 7 tilan lisäksi (lähde hyväksyy myös `codex-responses`- ja
`omniglyph`-tilat, joita tämä opas ei käsittele) seuraavissa osioissa käsitellään ominaisuuksia,
jotka toimivat näiden tilojen sisällä tai rinnalla: työkalutulosten pakkaus ja asteittainen vanhentaminen
ovat aggressiivisen moottorin vaiheet 1 ja 2 (Aggressive-tila ja pinotun käsittelyketjun
`aggressive`-vaihe), pinottu käsittelyketju määrittää Stacked-tilan toiminnan, välimuistitietoinen pakkaus
alentaa `aggressive`- ja `ultra`-tilat `standard`-tilaan välimuistia käyttävillä palveluntarjoajilla pakkauksen
ollessa käytössä, ja Caveman-tulostila sekä tulostyylit ovat oletusarvoisesti poissa käytöstä olevia,
valinnaisia järjestelmäkehoteohjeita, jotka muokkaavat mallin tulostetta pyynnön pakkaamisen sijaan.

### Välimuistitietoinen pakkaus

Jotkin palveluntarjoajat (kuten Anthropic kehotteiden välimuistituksella) tukevat **kehotteiden välimuistitusta**,
jonka avulla ne voivat tallentaa kehotteen osia välimuistiin kustannusten ja viiveen vähentämiseksi. Kun
välimuisti on käytössä, aggressiivinen pakkaus voi itse asiassa **heikentää** suorituskykyä,
koska se muuttaa välimuistiin tallennettuja tokeneita ja mitätöi välimuistin.

`cachingAware.ts`-moduuli ratkaisee tämän **tunnistamalla välimuistikontekstin** ja
**mukauttamalla pakkausstrategiaa** sen mukaisesti.

#### Näin se toimii

1. **Tunnista välimuistikonteksti** — Etsii pyynnön rungosta `cache_control`-merkintöjä
2. **Tunnista välimuistia tukevat palveluntarjoajat** — Tarkistaa, tukeeko kohdepalveluntarjoaja välimuistitusta
3. **Mukauta strategiaa** — Alentaa `aggressive`/`ultra`-tilan `standard`-tilaan välimuistia tukevilla palveluntarjoajilla
4. **Ohita järjestelmäkehote** — Järjestelmäkehotteet tallennetaan yleensä välimuistiin, joten niitä ei pakata

Strategia-apufunktio palauttaa myös `deterministicOnly`-lipun, mutta suunnitelman muodostin käyttää
vain strategiaa — mikään myöhemmän vaiheen osa ei tällä hetkellä lue lippua.

#### Koodiesimerkki

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Välimuistimerkintä
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Milloin ominaisuutta käytetään

Välimuistitietoinen pakkaus on **aina käytössä** — määrityksiä ei tarvita. Se aktivoituu aina,
kun pakkaus on käytössä ja kohdepalveluntarjoaja tukee kehotteiden välimuistitusta (Anthropic, OpenAI
jne.); eksplisiittisiä `cache_control`-merkintöjä ei vaadita — pelkkä välimuistia tukeva palveluntarjoaja
käynnistää tilan alentamisen, eivätkä pelkät merkinnät koskaan tee niin (merkintöjen tunnistus tuottaa
välimuistin telemetriatietoja eikä vaikuta strategiapäätökseen).

### Asteittainen vanhentaminen

Pitkiin keskusteluihin kertyy useita viestikierroksia, mutta vanhemmat kierrokset muuttuvat
vähemmän olennaisiksi. `progressiveAging.ts`-moduuli **heikentää viestejä niiden kierrosetäisyyden perusteella**
(etäisyys mitataan keskustelun lopusta). Julkaistuilla oletusarvoilla
(`verbatim: 2, light: 2, moderate: 3`):

- **Viimeiset 2 vuoroa (etäisyys ≤ 2)**: Säilytetään sanatarkasti
- **Etäisyys 3**: Luolamiespakkaus (täytesanojen poisto)
- **Etäisyys 4+**: Avustajan viestit tiivistetään; käyttäjän viesteistä säilytetään vain ensimmäinen
  rivi, enintään 120 merkkiä; muiden roolien viestejä ei muuteta. Järjestelmäkehotteet, jo vanhennetut
  viestit ja käyttäjän uusin viesti säilytetään aina sanatarkasti etäisyydestä riippumatta.
  Mitään ei poisteta kokonaan, eikä `light`-vyöhykettä voi saavuttaa toimitukseen sisältyvillä oletusarvoilla
  (`light` on sama kuin `verbatim`).

#### Koodiesimerkki

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... vielä 50 vuoroa ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // viimeiset 3 vuoroa: sanatarkasti
  light: 8, // etäisyys <= 8: kevyt pakkaus
  moderate: 20, // etäisyys <= 20: luolamiespakkaus
  fullSummary: 5, // tyyppi edellyttää tätä, mutta vyöhykekoodi ei lue sitä
  // etäisyys > 20: tiivistetään (avustaja) / ensimmäinen rivi säilytetään (käyttäjä)
});

// saved = säästettyjen tokenien määrä
```

#### Milloin käyttää

Progressiivinen vanhentaminen on **aina käytössä** `aggressive`-tilassa — se on
`compressAggressive()`-toiminnon vaihe 2. Ultra-tila ei suorita sitä. Se on
erityisen tehokas seuraavissa tapauksissa:

- Pitkäkestoiset koodausistunnot
- Useita päiviä kestävät keskustelut
- Agenttipohjaiset työnkulut, joissa on paljon työkalukutsuja

### Luolamiesvastaustila

Luolamiesvastaustila lisää **järjestelmäkehotteeseen ohjeita**, jotka pyytävät itse mallia
tuottamaan niukkaa tekstiä — `lite`-taso pyytää tiiviitä vastauksia kokonaisia virkkeitä käyttäen, `full`
pyytää sitä "vastaamaan niukasti kuin älykäs luolamies" ja `ultra` pyytää sähkösanomatyylistä tekstiä;
ohjeet vain pyytävät tätä, eivätkä ne voi taata lopputulosta. Pyynnöt saavat ohjeet
`applyOutputStyles()`-toiminnon kautta (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` ratkaisee valinnan ensin taaksepäin yhteensopivuutta tukevalla sovittimella
(`resolveOutputStyleSelection()` tiedostossa
`open-sse/services/compression/outputStyles/backCompat.ts`), joka `outputStyles`-valinnan
ollessa tyhjä yhdistää käytössä olevan `cavemanOutputMode`-asetuksen `terse-prose`-vastaustyyliin
tasolla `cavemanOutputMode.intensity` (katso Taaksepäin yhteensopivuus jäljempänä); tyhjästä poikkeavaa `outputStyles`-valintaa
käytetään sellaisenaan, jolloin `cavemanOutputMode.enabled`- ja `intensity`-asetuksilla ei enää ole
vaikutusta, mutta sen `autoClarity`-valitsin on yhä voimassa. `outputMode.ts` sisältää
ohjetekstit (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), sisällön ohituksen ja
sijoitteluaputoiminnon, jota lisäys käyttää; sen omalla `applyCavemanOutputMode()`-lisäystoiminnolla ei ole
tuotantokäytössä kutsuja.

#### Toimintaperiaate

Tämä tila ei pakkaa syötettä. Se lisää järjestelmäkehotteeseen ohjelohkon
(katso jäljempänä kohta Kuinka lisäys toimii), ja pyynnölle valittu syötteen pakkaustila
suoritetaan silti tämän jälkeen rungolle, joka nyt sisältää kyseisen lohkon. Ennen
kaikille tasoille yhteistä, niiden lopussa olevaa rajoja koskevaa lauseketta englanninkielinen `full`-taso kuuluu näin:

> "Vastaa niukasti kuin älykäs luolamies. Jätä pois artikkelit (a/an/the), täytesanat (just/really/basically/actually/simply), kohteliaisuudet ja epäröivät ilmaukset. Virkkeenkatkelmat sallittuja. Käytä lyhyitä synonyymejä (big, ei extensive; fix, ei implement). Säilytä kaikki tekninen asiasisältö, koodi, virheet, URL-osoitteet ja tunnisteet täsmällisinä."

Tämä toimii erityisen hyvin seuraavissa tapauksissa:

- Koodin luonti (niukempi tuloste = vähemmän tokeneita)
- Nopeat kysymykset ja vastaukset (ei tarvetta perusteellisille selityksille)
- Eräkäsittely (maksimoi läpimenon)

#### Milloin käyttää

Luolamiesvastaustila on **valinnainen**. Kun pakkaus on käytössä (`enabled: true`, yleisvalitsin
Pakkausasetukset-sivulla), ota se käyttöön asetuksella `cavemanOutputMode.enabled`; `intensity`
valitsee tason `lite`, `full` tai `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Pakkausyhdistelmän **Vastaustila**-valitsin (`outputMode`, taso asetuksessa `outputModeIntensity`)
asettaa saman valinnan pyynnöille, joihin kyseistä yhdistelmää sovelletaan, ja
`omniroute_set_compression_engine`-MCP-työkalu kirjoittaa sen totuusarvoisen `outputMode`-argumenttinsa
kautta. Tyhjästä poikkeava `outputStyles`-valinta ohittaa tämän valitsimen. Hallintapaneelissa
**Niukka proosa** -vastaustyylin käyttöönotto lisää saman lohkon (katso jäljempänä Vastaustyylit).

### Vastaustyylit (luettelo)

Edellä kuvattu luolamiesvastaustila on **vanha yhden tyylin polku**. Vaiheessa 4 se
yleistettiin yhdisteltävien vastaustyylien luetteloksi: `OUTPUT_STYLE_CATALOG` tiedostossa
`open-sse/services/compression/outputStyles/catalog.ts`. Jokainen tyyli on järjestelmäkehotteen
ohje, joka pyytää itse mallia tuottamaan edullisempaa tulostetta; useita tyylejä voidaan ottaa käyttöön
samanaikaisesti, ja ne lisätään luettelon mukaisessa järjestyksessä.

| Tyyli                                | `id`          | Mitä se tekee                                                                                                                                                                                                                                        | Ohjekielet                                     |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Ytimekäs proosa                      | `terse-prose` | Poistaa täytesanat, artikkelit ja varaukset; säilyttää teknisen sisällön täsmällisenä. Sama teksti kuin vanhassa caveman-tulostustilassa (johon viitataan mutta jota ei kirjoiteta uudelleen).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Vähemmän koodia                      | `less-code`   | YAGNI-portaat: pienin toimiva muutos, ei pyytämättömiä abstraktioita.                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Poninhäntä (laiska senior-kehittäjä) | `ponytail`    | "Paras koodi on koodi, jota ei koskaan kirjoitettu": uudelleenkäyttö > uudelleenkirjoitus, juurisyy > oire, lyhin toimiva diff.                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Minulla on ADHD (toiminta ensin)     | `i-have-adhd` | Toiminta ensin (komento/polku/katkelma ennen proosaa), numeroidut rajatut vaiheet, YKSI konkreettinen seuraava vaihe, ei johdantoa/yhteenvetoa/lopetuksia. Mukautettu projektista [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Ytimekäs CJK (文言)                  | `terse-cjk`   | `full`/`ultra`-vastaus klassisella kiinalla (文言); `lite` pyytää vain lyhyitä vastauksia ilman funktiosanoja, kohteliaisuuksia tai koristelua.                                                                                                      | zh (rajoitettu kielialueen mukaan, katso alta) |

Jokaisessa tyylissä on kolme voimakkuustasoa — `lite`, `full`, `ultra` — ja jokainen taso
päättyy yhteiseen rajausehtoon (`SHARED_BOUNDARIES` tiedostossa `outputMode.ts`), joka
säilyttää koodilohkot, tiedostopolut, komennot, virheet ja URL-osoitteet täsmällisinä. Tasojen
`terse-prose` ja `terse-cjk` tekstit lisäävät tunnisteet tähän luetteloon.

`terse-cjk` on rajattu kielialueen `zh` mukaan kahdessa paikassa. Pakkausasetukset-sivulla
sen rivi näytetään vain, kun hallintapaneelin käyttöliittymän kieli on kiina (`zh-CN` tai `zh-TW`), ja
`applyOutputStyles()` lisää sen vain, kun pyynnön ratkaistu kieli (katso Kielivalinta
alta) on `zh`. Rivin piilottaminen ei poista tallennettua `terse-cjk`-valintaa:
asetusrajapinta hyväksyy minkä tahansa tyylitunnuksen, ja muiden tyylien tallentaminen sivulla säilyttää sen. Pyynnön
käsittelyn aikana `applyOutputStyles()`-kielentarkistus on ainoa kielialuerajoitus.

#### Miten lisääminen toimii

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ratkaisee
valinnan luettelon perusteella (tuntemattomat tunnukset ja kielialueeseen sopimattomat tyylit
pudotetaan pois ilman virhettä; valinta, joka ei ratkea miksikään tyyliksi, jättää rungon
muuttamatta ja ohitetaan syyllä `no_styles`), yhdistää valitut ohjeet luettelon
järjestyksessä,
lisää rajausehdon **kerran** (sekä turvallisuusehdon, `SAFETY_BOUNDARIES` tai sen
käännöksen, kun `less-code` tai `ponytail` on valittu) ja aloittaa lohkon yhdellä
idempotenssimerkinnällä (`[OmniRoute Output Styles]`), joten uudelleen lisääminen ei tee mitään. Kun
ratkaistulle kielelle (katso Kielivalinta alta) on käännös, englanninkielisen ohjeen
sijaan lisätään lokalisoitu ohje.

Rungossa, jossa on ei-tyhjä `messages`-taulukko, idempotenssitarkistus suoritetaan ennen
sisältöohitusta: kun `[OmniRoute Output Styles]` -merkintä on jo ylätason
`system`-kentässä (merkkijonona tai sisältölohkotaulukkona) tai järjestelmäviestissä, jonka
sisältö on merkkijono, runko jätetään muuttamatta syyllä `already_applied`, eikä avainsanatarkistusta suoriteta.
Muussa tapauksessa sisältöohitus (`shouldBypassCavemanOutputMode()` tiedostossa
`open-sse/services/compression/outputMode.ts`) tarkistaa kolmen viimeisen
viestin tekstin niiden roolista riippumatta ja ohittaa tyylit koko vuorolta, kun teksti
vastaa turvallisuuteen, peruuttamattomaan toimintoon tai selvennykseen liittyviä avainsanoja tai
järjestyksestä riippuvaa sarjaa: `first`, `then`, `after that`, `before`, `rollback` tai
`backup`, jota seuraa 240 merkin sisällä `delete`, `drop`, `migrate`, `deploy` tai
`release`. Ohitus suoritetaan, kun **Auto-Clarity Bypass** -valitsin
(`cavemanOutputMode.autoClarity`, oletusarvoisesti käytössä) on käytössä; valitsimen poistaminen käytöstä ohittaa
avainsanatarkistuksen.

Kun ohitus päästää vuoron läpi, `placeSystemInstruction()` (sama tiedosto), joka
ei koskaan luo uutta `messages[0]`-alkiota, sijoittaa lohkon ensimmäiseen löytämäänsä kohteeseen näistä:

1. Alussa oleva järjestelmäviesti, jonka sisältö on merkkijono: lohko lisätään sen tekstin perään.
2. Ylätason `system`-kenttä: lohko lisätään merkkijonon tekstin perään tai
   uutena tekstilohkona sisältölohkotaulukkoon.
3. Ensimmäinen myöhempi järjestelmäviesti, jonka sisältö on merkkijono: lohko lisätään sen
   tekstin perään.
4. Ei mikään edellisistä: lohko sijoitetaan uuteen järjestelmäviestiin `messages`-taulukon loppuun.

Rungossa, jossa ei ole `messages`-taulukkoa (tai jossa se on tyhjä), sisältöohitusta ei suoriteta eikä
ylätason `system`-kenttää tarkastella. Lohko lisätään merkkijonomuotoisen
`instructions`-kentän tekstin perään, ellei kenttä jo sisällä
`[OmniRoute Output Styles]` -merkintää, jolloin runko jätetään muuttamatta syyllä
`already_applied`. Kun rungossa ei ole merkkijonomuotoista `instructions`-kenttää mutta siinä on `input`
(merkkijono tai taulukko), lohkosta tulee `instructions`, ja se korvaa kentän mahdollisen muun kuin merkkijonoarvon.
Runko, jossa ei ole merkkijonomuotoista `instructions`-kenttää eikä merkkijono- tai taulukkomuotoista
`input`-kenttää, jätetään muuttamatta ja ohitetaan syyllä `no_messages`.

#### Käyttöönotto

Hallintapaneessa: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles -osio: yksi rivi kutakin tyyliä kohden sekä päälle/pois-
kytkin ja tasovalitsin. Tyylit lisätään, kun itse pakkaus on käytössä (sivun
pääkytkin `enabled`). **Auto-Clarity Bypass** -kytkin on **Caveman**-
sivulla (`/dashboard/context/caveman`) sen **Output Mode** -kortissa. Ohjelmallisesti
pakkausmääritys tallentaa valinnan seuraavasti:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Taaksepäin yhteensopivuus: kun `outputStyles` on tyhjä, vanha `cavemanOutputMode.enabled`-
asetus yhdistetään `terse-prose`-tyyliin tasolla `cavemanOutputMode.intensity`. Lohko alkaa tällöin
`[OmniRoute Output Styles]`-merkinnällä, kun taas vanha `applyCavemanOutputMode()`-
lisääjä kirjoitti `[OmniRoute Caveman Output Mode]`. Merkinnän alapuolella teksti vastaa
vanhaa lisäystä kielillä en, pt-BR, es, de, fr, it, ru, id ja vi; kielillä ja ja zh siinä on yksi
ylimääräinen välilyönti ennen rajoja koskevaa lausetta. `terse-prose` on käännetty kielille pt-BR, es, de,
fr, it, ru, zh, ja, id ja vi, joten pyyntö, jonka ratkaistu kieli on `hu`, saa
englanninkielisen tekstin, vaikka vanha lisääjä käytti unkarinkielistä tekstiään.

Tulostustyylin kielen valinta (`resolveOutputStyleLanguage()` tiedostossa
`outputStyles/apply.ts`): kun `languageConfig.enabled` on käytössä, `autoDetect` ottaa näytteeksi
pyynnön `messages`-taulukon uusimman tekstiä sisältävän käyttäjäviestin (merkkijonosisältö tai
sen sisältöosien `text`) ja suorittaa sille Caveman-moottorin tunnistimen
(`detectCompressionLanguage()`). Tunnistin palauttaa `zh`, jos tekstissä on han-
merkkejä mutta ei kana-merkkejä; muussa tapauksessa se palauttaa sen kielistä `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` ja `id`, jolla on eniten vihjeosumia, sekä `en`, jos osumia ei ole —
teksti, jota se ei pysty luokittelemaan, saa englannin, ei koskaan `defaultLanguage`-arvoa, eikä
kieltä `vi` koskaan tunnisteta, vaikka tyylien mukana toimitetaan `vi`-teksti. Responses API -rungon
vuorot säilytetään `input`-kentässä, josta ei oteta näytettä, joten se saa ensin `defaultLanguage`-arvon
ja sitten englannin. Kun yksikään `messages`-taulukon käyttäjäviesti ei sisällä tekstiä tai kun
`autoDetect` ei ole käytössä, käytetään ensin `defaultLanguage`-arvoa ja sitten englantia. Kun
`languageConfig.enabled` ei ole käytössä, kieli on englanti — paitsi jos pyyntöön sovelletaan
pakkausyhdistelmää (pyynnön reititysyhdistelmälle määritettyä yhdistelmää tai oletusarvoista
pakkausyhdistelmää, johon chatCore turvautuu sisäänrakennetussa pinotussa
käsittelyketjussa): yhdistelmän käyttäminen ottaa `languageConfig.enabled`-asetuksen käyttöön kyseiselle pyynnölle ja asettaa
`defaultLanguage`-arvon yhdistelmän kielipakettien perusteella (tallennettu arvo, jos se kuuluu
yhdistelmän paketteihin; muutoin yhdistelmän ensimmäinen paketti, jonka oletusarvo on `en`), samalla kun
tallennettua `autoDetect`-asetusta (oletusarvoisesti käytössä) sovelletaan edelleen. Caveman-syötemoottori valitsee
sääntöpakettinsa kielen eri tavalla — tekstiosa kerrallaan ja automaattisen tunnistuksen ollessa poissa käytöstä
`enabledPacks`-asetuksen rajaamana.

Tyyli × kieli -matriisi on kiinnitetty testillä
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: jokainen luettelon tyyli tarvitsee
merkinnän testin `BASELINE_LANGUAGES`-luettelossa; tyylin, jota ei ole rajattu alueasetuksen mukaan, mukana on toimitettava
pt-BR-käännös (alueasetuksen mukaan rajattu `terse-cjk` on vapautettu tästä säännöstä), ellei sitä ole
lueteltu `KNOWN_ENGLISH_ONLY`-luettelossa, joka saa sisältää vain tyylejä, joilla ei ole lainkaan käännöksiä —
luettelossa oleva tyyli, jolla on jokin käännös, aiheuttaa testin epäonnistumisen; ja tyyli aiheuttaa testin epäonnistumisen, jos
se menettää kielen, joka on lueteltu sen `BASELINE_LANGUAGES`-merkinnässä. Katso tyylin lisäämisohjeet tiedostosta
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Työkalutulosten pakkaus

`compressToolResult()` tiedostossa `open-sse/services/compression/toolResultCompressor.ts`
pakkaa työkalutuloksen tekstin **5 strategialla**. Se kokeilee niitä tässä järjestyksessä, ja
ensimmäinen käytössä oleva strategia, jonka tarkistus vastaa sisältöä, ratkaisee tuloksen:

1. **`fileContent`**: vähintään 3 rivin sisältö, jossa vähintään yksi rivi alkaa sisennyksen
   ohittamisen jälkeen merkkijonolla `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` tai `return ` (avainsana ja välilyönti) tai merkkijonolla
   `if`, `for` tai `while`, jota seuraa `(` tai ` (`, säilyttää ensimmäiset 20 ja
   viimeiset 5 riviään, ja pois jätetty keskiosa merkitään.
2. **`grepSearch`**: sisältö, jossa on vähintään yksi muotoa `<path>:<digits>:` oleva
   rivi ja jossa ensimmäistä kaksoispistettä edeltävässä tekstissä ei ole tyhjemerkkejä,
   säilyttää vain tällaiset rivit, enintään 30, minkä jälkeen ilmoitetaan mahdollisten
   lisäosumien määrä ja osumia sisältävien tiedostojen luettelo; kaikki muut rivit
   poistetaan. Yksi tällainen rivi riittää käynnistämään strategian, joten myös
   aikaleimalla, kuten `12:30:45`, alkava lokirivi lasketaan mukaan.
3. **`shellOutput`**: tulosteesta, joka sisältää ANSI CSI -sekvenssin (`ESC[` ja sen
   jälkeen numeroita tai puolipisteitä sekä kirjain, kuten värikoodeissa) tai missä
   tahansa kohdassa `$`-merkin, jota seuraa tyhjemerkki, poistetaan kyseiset sekvenssit
   (muut ohjaussekvenssit, kuten `ESC[?25l` tai OSC-ikkunaotsikkosekvenssi, säilytetään),
   ja sen viimeiset 50 riviä säilytetään siten, että peräkkäiset toistuvat rivit
   yhdistetään. Koska tämä tarkistus suoritetaan ennen `json`- ja `errorMessage`-
   strategioita, tällaisen `$`-merkin sisältävä JSON- tai virhetuloste ei koskaan päädy
   niille, kun `shellOutput` on käytössä.
4. **`json`**: yli 2 000 merkin JSON-kuorma, joka alkaa merkillä `{` tai `[` (mahdollisen
   tyhjätilan jälkeen) ja jonka jäsennys onnistuu, tiivistetään: yli 7 alkion taulukosta
   säilytetään ensimmäiset 5 ja viimeiset 2 alkiota sekä alkioiden kokonaismäärä, ja
   objektista säilytetään ensimmäiset 20 avainta siten, että jokainen sisäkkäinen
   objekti- tai taulukkoarvo korvataan paikkamerkillä `{…N keys}` (taulukon tapauksessa
   N on sen pituus) ja ensimmäisten 20 avaimen jälkeen pois jätettyjen avainten määrä
   ilmaistaan `_remaining_<N>_keys`-merkinnällä. Skalaariarvot kopioidaan kokonaisina,
   joten enintään 20 avainta sisältävä objekti, jossa ei ole sisäkkäisiä arvoja, vain
   sisennetään uudelleen — minifioitu objekti pitenee ja säilyy siksi muuttumattomana.
5. **`errorMessage`**: tuloste, joka sisältää missä tahansa kohdassa ja kirjainkoosta
   riippumatta tekstin `error:`, `error ` (sana ja sitä seuraava välilyönti, kuten
   ilmauksessa `no error found`), `[error]`, `exception:`, `exception `,
   `[exception]` tai `traceback`, säilyttää ensimmäisen rivinsä, seuraavat 10 riviä ja
   viimeiset 3 riviä siten, että niiden väliin jäävät rivit korvataan merkinnällä
   `… [N frames elided] …`. Merkintä lisätään vain, kun ensimmäisen rivin jälkeen on
   yli 13 riviä, joten enintään 14 rivin virhetulostetta ei lyhennetä (12 tai 13 rivin
   tapauksessa viimeiset 3 riviä toistavat jo säilytettyjä rivejä).

Kun strategia täsmää, myöhempiä strategioita ei kokeilla, vaikka täsmännyt strategia ei
säästäisi mitään. Kun täsmäävä strategia ei säästä arvioituja tokeneita (pituus ÷ 4,
pyöristettynä ylöspäin) — esimerkiksi koodimainen tiedosto, jossa on enintään 25 riviä,
tai yli 2 000 merkin JSON-taulukko, jossa on enintään 7 alkiota — aggressiivinen moottori
säilyttää alkuperäisen työkalutuloksen: molemmat kutsujat (`compressAggressive()` ja
`compressAnthropicToolResultBlock()`) säilyttävät alkuperäisen, kun `saved` on 0 tai
pienempi, vaikka `compressToolResult()` itse palauttaa edelleen kyseisen strategian
tuloksen. Työkalutuloksen käsittelyvaihe ei ole viimeinen sana: moottorin
varatiivistin voi edelleen lyhentää yli 8 192 merkin `tool`- tai `function`-viestin
(`maxTokensPerMessage`, 2 048, kerrottuna neljällä).

#### Milloin käyttää

Työkalutulosten pakkaus on aggressiivisen moottorin vaihe 1 (`compressAggressive()`
tiedostossa `open-sse/services/compression/aggressive.ts`), joten se suoritetaan
Aggressive-tilassa ja pinotun putken `aggressive`-vaiheessa. Se pakkaa OpenAI-muotoisia
`tool`- ja `function`-viestejä sekä Anthropic-`tool_result`-lohkojen sisällä olevaa
tekstiä. Jokaisella strategialla on oma kytkimensä kohdassa `aggressive.toolStrategies`,
ja ne kaikki ovat oletusarvoisesti käytössä. Hallintapaneelissa kytkimet ovat
Caveman-sivun **Advanced**-näkymässä, kun pakkaus on käytössä ja oletustilana on
Aggressive.

### Pinottu putki

Pinottu tila suorittaa **useita moottoreita peräkkäin** — yleensä ensin RTK:n
(60–90 %:n säästö työkalutuloksissa) ja sitten Cavemanin jäljellä olevalle tekstille
(~46 %:n säästö syötteessä). Yhdistettynä tuloksena on **78–95 %:n kelvollinen
vaihteluväli** (katso Upstream Savings Math edellä):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` on keskimäärin ≈89 %.

#### Toimintaperiaate

```
Syöte (1000 tokenia)
  → RTK (komentotietoinen suodatin) → 200 tokenia
    → Caveman (täytetekstin poisto) → 108 tokenia
  → Tuloste (108 tokenia, ~89 %:n säästö)
```

#### Milloin käyttää

Käytä pinottua tilaa seuraaviin:

- Työkalupainotteiset työnkulut (agenttipohjainen ohjelmointi, tutkimus)
- Kustannusherkkä eräkäsittely
- Kun tarvitset mahdollisimman suuren token-säästön

Pinotut putket määritetään globaalilla `stackedPipeline`-pakkausasetuksella tai
reititysyhdistelmälle määritetyllä nimetyllä pakkausyhdistelmällä (katso
Per-Combo Override edellä) — ei automaattisen yhdistelmän `modePack`-kentän kautta
(kyseinen kenttä vain painottaa uudelleen automaattisen yhdistelmän mallivalintaa, eikä
`stacked` ole kelvollinen paketin nimi).

---

## Pakkausyhdistelmäkohtaiset ohitukset

Voit ohittaa yleisen pakkaustilan **yhdistelmäkohtaisesti** hienosäätääksesi toimintaa
eri käyttötapauksissa:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Tästä on hyötyä seuraavissa tapauksissa:

- **Koodausyhdistelmät**: Käytä `aggressive`-tilaa pitkissä istunnoissa
- **Nopeat kysymys-vastausyhdistelmät**: Käytä `lite`-tilaa nopeisiin vastauksiin
- **Paljon työkaluja käyttävät yhdistelmät**: Käytä `stacked`-tilaa säästöjen maksimoimiseksi
- **Tuotantoyhdistelmät**: jätä ohitus pois käytöstä välimuistia käyttäville palveluntarjoajille — aina käytössä oleva
  välimuistitietoinen säätö vaihtaa `aggressive`-/`ultra`-tilan automaattisesti `standard`-tilaan
  (valittavaa `cache-aware`-tilaa ei ole)

---

## Katso myös

- [Ympäristöasetukset](../reference/ENVIRONMENT.md) — Pakkauksen ympäristömuuttujat
- [Arkkitehtuuriopas](../architecture/ARCHITECTURE.md) — Pakkausputken sisäinen toiminta
- [Käyttöopas](../guides/USER_GUIDE.md) — Pakkauksen käytön aloittaminen
- [RTK-pakkaus](./RTK_COMPRESSION.md) — RTK-suodattimet, luottamusmalli, varmennusportti ja raakatuotoksen palautus
- [Pakkausmoottorit](./COMPRESSION_ENGINES.md) — Caveman, RTK, pinottu tila, API:t, MCP ja hallintapaneeli
- [Pakkaussääntöjen muoto](./COMPRESSION_RULES_FORMAT.md) — JSON-sääntöpaketin muoto
- [Pakkauksen kielipaketit](./COMPRESSION_LANGUAGE_PACKS.md) — Kielikohtaiset Caveman-säännöt
