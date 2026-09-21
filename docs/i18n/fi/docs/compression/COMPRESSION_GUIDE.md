# 🗜️ Prompt Compression Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Säästä automaattisesti 15–95 % soveltuvasta kontekstista. Katso nopea yleiskatsaus [README-tiedoston pakkausta käsittelevästä osiosta](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Yleiskatsaus

OmniRoute toteuttaa modulaarisen kehotteiden pakkausputken, joka suoritetaan **ennakoivasti** ennen pyyntöjen lähettämistä ylävirran palveluntarjoajille. Näin token-säästöt syntyvät läpinäkyvästi — työnkulkuusi ei tarvitse tehdä muutoksia.

```
Asiakaspyyntö
  → Pakkausstrategian valitsin
    → Yhdistelmän ohitusasetus? → Käytä yhdistelmän asetusta
    → Automaattisen käynnistyksen kynnys? → Käytä automaattista tilaa
    → Oletustila? → Käytä yleistä asetusta
    → Pois käytöstä? → Ohita pakkaus
  → Valittu pakkaustila
    → Pois käytöstä: Ei pakkausta
    → Kevyt: Turvallinen tyhjätilan ja muotoilun siivous (~15 %)
    → Vakio: Täytesanojen poisto luolamiestyylisesti (~30 %)
    → Aggressiivinen: Historian vanhentaminen + tiivistäminen (~50 %)
    → Ultra: Heuristinen karsinta + koodilohkojen ohentaminen (~75 %)
    → RTK: Komennot huomioiva pääte- ja työkalutulosteiden suodatus (ylävirran vaihteluväli 60–90 %)
    → Pinottu: Järjestetty usean moottorin putki, yleensä RTK ja sitten Caveman (soveltuva vaihteluväli 78–95 %)
  → Pakattu pyyntö → Palveluntarjoaja
```

---

## Pakkaustilat

### Pois käytöstä

Pakkausta ei käytetä. Kaikki viestit välitetään muuttamattomina.

### Kevyt tila (~15 %:n säästö, <1 ms:n viive)

Turvallisin tila — ei semanttisia muutoksia, vain muotoilun siivous:

| Tekniikka                | Kuvaus                                                                         |
| ------------------------ | ------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Yhdistää peräkkäiset tyhjät rivit ja poistaa rivien lopussa olevat välilyönnit |
| `dedupSystemPrompt`      | Poistaa päällekkäiset järjestelmäviestit                                       |
| `compressToolResults`    | Pakkaa monisanaiset työkalu- ja funktiotulosteet                               |
| `removeRedundantContent` | Poistaa toistetut ohjeet                                                       |
| `replaceImageUrls`       | Lyhentää base64-kuvadatan URI-tunnisteita                                      |

**Soveltuu parhaiten:** Jatkuvaan käyttöön ja turvallisuuskriittisiin työnkulkuihin.

### Vakiotila (~30 %:n säästö)

[Cavemanin](https://github.com/JuliusBrussee/caveman) innoittama tila poistaa täytesanoja ja monisanaisia ilmauksia merkityksen säilyttäen:

- Poistaa täytesanoja ("ole hyvä", "mielestäni", "periaatteessa", "itse asiassa")
- Tiivistää monisanaisia ilmauksia ("sitä varten, että" → "jotta", "sen seurauksena, että" → "koska")
- Poistaa kohteliaan epäröinnin ("Sopisiko sinulle...", "Jos vain mitenkään voisit...")
- Yli 30 ohjelmointikehotteille viritettyä regex-sääntöä

**Soveltuu parhaiten:** Päivittäisiin ohjelmointityönkulkuihin ja kustannustietoisille tiimeille.

### Aggressiivinen tila (~50 %:n säästö)

Älykäs historian hallinta pitkiä istuntoja varten:

- **Viestien vanhentaminen** — vanhempia viestejä pakataan asteittain
- **Työkalutulosten tiivistäminen** — pitkät työkalutulosteet korvataan yhteenvedoilla
- **Rakenteellisen eheyden suojaukset** — varmistavat, että `tool_use`- ja `tool_result`-parit säilyvät yhdenmukaisina
- **Konteksti-ikkunan huomioiminen** — noudattaa mallikohtaisia token-rajoja

**Soveltuu parhaiten:** Pitkiin virheenkorjausistuntoihin ja suuriin koodikantoihin.

### Ultra-tila (~75 %:n säästö)

Maksimaalinen pakkaus tilanteisiin, joissa tokenien säästäminen on kriittistä:

- **Heuristinen karsinta** — poistaa relevanssikynnyksen alittavat viestit
- **Koodilohkojen ohentaminen** — pakkaa toistuvia koodiesimerkkejä
- **Katkaisukohdan binäärihaku** — etsii konteksti-ikkunan optimaalisen katkaisukohdan
- Sisältää kaikki aggressiivisen tilan ominaisuudet

**Soveltuu parhaiten:** Kun kontekstirajat ylittyvät toistuvasti.

### RTK-tila (ylävirran vaihteluväli 60–90 %)

RTK-tila on optimoitu ohjelmointiagenttien istunnoissa esiintyville monisanaisille työkalutulosteille:

- Tunnistaa komento- ja tulosteluokat, kuten `git status`, `git diff`, `git log`, testien suorittajat,
  TypeScript/Vite/Webpack-koontiversiot, ESLint/Biome/Prettier, npm-tarkastukset ja -asennukset, Docker-lokit, infrastruktuurin
  tulosteet sekä yleiset komentorivitulosteet
- Käyttää JSON-suodatinpaketteja hakemistosta `open-sse/services/compression/engines/rtk/filters/`
- Tuo RTK:n TOML-skeeman v1 suodattimet projektin tai järjestelmänlaajuisista `filters.toml`-tiedostoista sekä validoi
  sisäiset testit ja varmistaa projektitiedostojen luotettavuuden
- Sisältää 49 sisäänrakennettua suodatinta sekä sisäiset varmennusesimerkit
- Poistaa ANSI-ohjausjaksot, edistymispalkit, toistuvat rivit ja epäolennaisen kohinan
- Säilyttää epäonnistumiset, virheet, varoitukset, muuttuneet tiedostot, yhteenvedot ja pitkän tulosteen loppuosan
- Tukee luotettavuustarkistettuja projektisuodattimia, yleisiä suodattimia ja valinnaista peitetyn raakadatulosteen palautusta

**Soveltuu parhaiten:** Agentti-istuntoihin, jotka sisältävät komentorivi-, koonti-, testi-, git-, grep- ja tiedostotulosteiden lokitietoja.

### Pinottu tila (soveltuva vaihteluväli 78–95 %)

Pinottu tila suorittaa useita pakkausmoottoreita deterministisessä järjestyksessä. Oletusputki on:

```txt
RTK -> Caveman
```

Tässä järjestyksessä pääte- ja työkalutulosteet tiivistetään ensin, minkä jälkeen jäljelle jäävään
luonnollisen kielen kehotteeseen sovelletaan Cavemanin semanttista tiivistystä. Pinotut putket voidaan määrittää yleisesti tai
reititysyhdistelmiin liitettyjen pakkausyhdistelmien kautta.

**Soveltuu parhaiten:** Sekamuotoiseen kontekstiin, joka sisältää suuria työkalulokeja sekä käyttäjän ohjeita tai avustajan yhteenvetoja.

---

## Upstream-säästöjen laskenta

OmniRoute dokumentoi pakkaussäästöt kahdesta lähteestä: upstream-projektien vertailutesteistä ja
OmniRouten omasta moottoriyhdistelmästä.

| Lähde   | Tässä käytetty upstream-README:n luku                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` vähemmän tulostetokeneita, vertailutestien keskimääräinen tulostesäästö `65%`, vaihteluväli `22-87%` ja syötteen pakkaustyökalulla `~46%` |
| RTK     | `60-90%` säästö komentotulosteissa; esimerkki-istunnossa `~118,000 -> ~23,900` tokenia eli `79.7%` säästö (`~80%`)                               |

Kun työkalu- ja kontekstihyötykuormat ovat päällekkäisiä, OmniRouten oletusyhdistelmä pinoaa moottorit:

```txt
RTK -> Caveman
```

Yhdistetyt säästöt ovat kertautuvia, eivät yhteenlaskettavia:

```txt
combined = 1 - (1 - RTK-säästö) * (1 - Caveman-syötesäästö)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tämä `78-95%`:n luku pätee, kun sekä RTK että Caveman voivat pienentää samaa syöte-/kontekstihyötykuormaa.
Cavemanin vastaustulostetila on erillinen: kun se on käytössä, käytä Cavemanin omia tulostesäästöjä (keskimäärin `65%`,
otsikkoluku `~75%`, vaihteluväli `22-87%`). Laskutuksen kokonaissäästöt riippuvat kehotteiden ja tulosteiden suhteesta.

### Mitä "soveltuva" todella tarkoittaa

Otsikossa ilmoitettu 15-95%:n vaihteluväli on todellinen, mutta se koskee vain **toisteista tai monisanaista** sisältöä — toistuvia
virherivejä, saman varoituksen jatkuvasti tulostavaa koontilokia tai ylisuurta `grep`-/tiedostonlukutulostetta. Se
**ei** tarkoita, että jokainen pyyntö säästäisi näin paljon.

Empiirisesti varmennettu (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): Anthropic-muotoiselle
300 identtistä virheriviä sisältävälle `tool_result`-lohkolle suoritettu `stacked`-ajo (RTK + Caveman) tuotti
**95.93%:n token-säästön / 96.26%:n merkkisäästön** — täysin ilmoitetulla vaihteluvälillä.
Kun sama käsittelyketju kuitenkin suoritetaan normaalille, ei-toisteiselle työkalutulosteelle (siisti `grep`-osumaluettelo,
lyhyt tiedostonluku, tavallinen keskusteluteksti), se tuottaa oikein **lähes olemattomat säästöt**, koska
mitään toisteista poistettavaa ei ole ja `validateCompression()` (`validation.ts`) estää sellaisen
uudelleenkirjoituksen käytön, joka poistaisi tai muuttaisi koodilohkoja, URL-osoitteita, otsikoita, versioita tai KAIKKI-ISOLLA kirjoitettuja vakioiden tunnisteita.

Tämä on odotettua ja turvallista toimintaa, ei virhe: koodausistunnossa, jossa pääasiassa luetaan tai etsitään siisteistä tiedostoista,
kokonaissäästöt jäävät vaatimattomiksi, vaikka pakkaus olisi täysin käytössä, kun taas epäonnistuvaan
silmukkaan tai runsassanaiseen linteriin törmäävä istunto saavuttaa kyseisessä liikenteessä täyden 78-95%:n säästövälin. Älä pidä yksittäisen istunnon
pientä kokonaissäästöprosenttia todisteena pakkauksen virheellisestä määrityksestä — tarkista ensin, oliko
taustalla oleva työkalutuloste todella toisteinen.

---

## Token-säästöjen visualisointi

```
Ilman pakkausta:       LLM:lle lähetetään 47K tokenia
Lite-tilassa:          lähetetään 40K tokenia          (15% säästö — turvallinen, aina käytössä)
Standard-tilassa:      lähetetään 33K tokenia          (30% säästö — luolamiestyylin säännöt)
Aggressive-tilassa:    lähetetään 24K tokenia          (50% säästö — vanhentaminen + tiivistäminen)
Ultra-tilassa:         lähetetään 12K tokenia          (75% säästö — heuristinen karsinta)
RTK:lla:               lähetetään 19K-5K tokenia       (60-90% säästö komento-/työkalutulosteissa)
Stacked-tilassa:       lähetetään 10K-2.5K tokenia     (soveltuvan RTK+Caveman-sisällön säästöväli 78-95%)
```

---

## Määritykset

### Hallintapaneeli

Siirry kohtaan `Dashboard → Context & Cache`:

- **Caveman** — tilan valinta, kielipaketit, esikatselu ja yleiset oletusasetukset
- **RTK** — komentosuodattimen esikatselu, RTK:n turvallisuusasetukset ja suodatinluettelo
- **Pakkausyhdistelmät** — nimetyt moottoriputket, jotka on määritetty reititysyhdistelmille
- **Automaattisen käynnistyksen kynnysarvo** — pakkaus otetaan automaattisesti käyttöön, kun tokenien määrä ylittää kynnysarvon

### Yhdistelmäkohtainen ohitus

Määritä kohdassa `Dashboard → Context & Cache → Compression Combos` pakkausyhdistelmä
reititysyhdistelmälle:

```txt
Yhdistelmä: "free-tier-fallback"
  Pakkausyhdistelmä: "coding-agent-stack"
  Putki: RTK -> Caveman
  Kohteet:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Näin voit käyttää pinottua pakkausta ilmaisilla ja ohjelmointiin tarkoitetuilla palveluntarjoajilla
samalla, kun maksullisissa tilauksissa käytetään kevyttä tilaa.

Tämä yhdistelmäkohtainen ohitus on eri asetus kuin **reititysyhdistelmän pakkaustilan**
ohitus (Default/Off/Lite/Standard/Aggressive/Ultra) — kyseinen ohitus ei valitse nimettyä
pakkausyhdistelmän putkea, vaan ainoastaan määrittää `compressionMode`-kentän, jota
`resolveCompressionPlan` käyttää. Sen voi määrittää joko yhdistelmäkortissa (`Dashboard → Combos`)
tai versiosta #6760 alkaen reititysyhdistelmäkohtaisesti `Assign to routing` -luettelossa kohdassa
`Dashboard → Context & Cache → Compression Combos`, aivan edellä kuvatun putken määritysvalintaruudun
vieressä. Molempien käyttöliittymien muutokset tallennetaan saman `PUT /api/combos/{id}`-päätepisteen kautta.

### Pyyntökohtainen ohitus

Lähetä `x-omniroute-compression`-pyyntöotsake ohittaaksesi yksittäisen pyynnön pakkaussuunnitelman.
Sillä on korkein prioriteetti — se ohittaa reititysyhdistelmän ohituksen, aktiivisen profiilin,
automaattisen käynnistyksen ja paneelin Default-asetuksen. Tuntemattomat arvot ohitetaan (pyyntöä ei
koskaan hylätä), ja yleinen pääkytkin hallitsee edelleen kaikkea: kun pakkaus on poistettu yleisesti
käytöstä, otsake ei voi ottaa sitä käyttöön. Arvot:

| Arvo          | Vaikutus                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tätä pyyntöä ei pakata.                                                                                                   |
| `default`     | Paneelista johdettu Default-profiili (aktiivinen profiili ohitetaan).                                                     |
| `engine:<id>` | Yksittäinen moottori, kun se on käytössä, esim. `engine:rtk`.                                                             |
| `<combo>`     | Nimetty yhdistelmä, joka täsmäytetään ensin nimen perusteella kirjainkoosta riippumatta ja sitten tunnisteen perusteella. |

Käytetty suunnitelma palautetaan `X-OmniRoute-Compression: <mode>; source=<source>`-vastausotsakkeessa,
jossa `<source>` on jokin seuraavista: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` tai `off`.

### API

```bash
# Hae pakkausasetukset
curl http://localhost:20128/api/settings/compression

# Päivitä pakkausasetukset
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Esikatsele tietty RTK-/pinottu hyötykuorma
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

- ✅ Koodilohkot (aidatut ja rivinsisäiset)
- ✅ URL-osoitteet ja tiedostopolut
- ✅ JSON-rakenteet ja jäsennellyn datan
- ✅ Tunnisteet ja suojatut tekniset tunnukset
- ✅ Matemaattiset lausekkeet
- ✅ Työkalu- ja funktiokutsujen määritelmät
- ✅ Järjestelmäkehotteet (lite-tilassa)

RTK:n raakatulosteen palautus peittää yleiset API-avaimet, bearer-tunnukset, Slack-tunnukset, AWS-käyttöavaimet,
salasanat, tunnukset ja salaisuudet ennen minkään tiedon tallentamista.

---

## Pakkaustilastot

Jokaisen pakatun pyynnön tilastot sisällytetään palvelinlokeihin:

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

| Vaihe    | Tilat                                                                                                                                                                    | Tila         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| Vaihe 1  | Off, Lite                                                                                                                                                                | ✅ Julkaistu |
| Vaihe 2  | Standard, Aggressive, Ultra                                                                                                                                              | ✅ Julkaistu |
| Vaihe 3  | RTK, Stacked, Compression Combos                                                                                                                                         | ✅ Julkaistu |
| Vaihe 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                              | ✅ Julkaistu |
| Vaihe 4C | Mukautuva kontekstibudjetti ("säädin") — laskentamoottori + API (`contextBudget` kohteessa `PUT /api/settings/compression`) + hallintapaneelin tila- ja käytäntösäätimet | ✅ Julkaistu |

---

## Kiitokset

Standard-tilan pakkaussäännöt ovat saaneet inspiraationsa **[JuliusBrusseen](https://github.com/JuliusBrussee)** luomasta **[Caveman](https://github.com/JuliusBrussee/caveman)**-projektista (⭐ 51K+) — viraalista "miksi käyttää monta tunnusta, kun vähä tunnus tehdä tehtävä" -projektista. Caveman raportoi `~75%` vähemmän tulostunnuksia, `65%`:n keskimääräisen tulossäästön vertailutesteissä, `22-87%`:n tulosalueen ja `~46%`:n syötteenpakkaustyökalun.

RTK-tila on saanut inspiraationsa **[RTK AI:n](https://github.com/rtk-ai)** **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** -projektista — suorituskykyisestä komentotulosteen pakkausprojektista päätelaitteiden, koontien, testien, gitin ja työkalutulosteiden suodatukseen. RTK raportoi `60-90%`:n säästön, ja sen README-tiedoston esimerkki-istunto osoittaa `~80%`:n säästön.

---

## Edistyneet pakkausjärjestelmät

Seitsemän vakiotilan lisäksi OmniRoute sisältää useita edistyneitä pakkausjärjestelmiä,
jotka toimivat automaattisesti kontekstin perusteella.

### Välimuistitietoinen pakkaus

Jotkin palveluntarjoajat (kuten Anthropic kehotteiden välimuistitallennuksella) tukevat **kehotteiden välimuistitallennusta**,
jonka avulla ne voivat tallentaa kehotteen osia välimuistiin kustannusten ja viiveen vähentämiseksi. Kun
välimuistitallennus on käytössä, aggressiivinen pakkaus voi itse asiassa **heikentää** suorituskykyä,
koska se muuttaa välimuistiin tallennettuja tunnuksia ja mitätöi välimuistin.

`cachingAware.ts`-moduuli ratkaisee tämän **tunnistamalla välimuistikontekstin** ja
**säätämällä pakkausstrategiaa** sen mukaisesti.

#### Toimintaperiaate

1. **Tunnista välimuistikonteksti** — Etsii pyynnön rungosta `cache_control`-merkintöjä
2. **Tunnista välimuistitallennusta tukevat palveluntarjoajat** — Tarkistaa, tukeeko kohdepalveluntarjoaja välimuistitallennusta
3. **Säädä strategiaa** — Laskee `aggressive`-/`ultra`-tilan `standard`-tilaan välimuistitallennusta tukevilla palveluntarjoajilla
4. **Ohita järjestelmäkehote** — Järjestelmäkehotteet tallennetaan yleensä välimuistiin, joten niitä ei pakata
5. **Käytä deterministisiä muunnoksia** — Käyttää vain yhdenmukaisia tuloksia tuottavia muunnoksia

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Milloin käytetään

Välimuistitietoinen pakkaus on **aina käytössä** — määrityksiä ei tarvita. Se aktivoituu vain,
kun:

- Pyynnössä on `cache_control`-merkintöjä
- Kohdepalveluntarjoaja tukee kehotteiden välimuistitallennusta (Anthropic, OpenAI jne.)

### Asteittainen vanheneminen

Pitkiin keskusteluihin kertyy paljon viestikierroksia, mutta vanhemmista kierroksista tulee vähemmän
merkityksellisiä. `progressiveAging.ts`-moduuli **heikentää viestejä kierrosetäisyyden perusteella**:

- **Viimeisimmät kierrokset (0-3)**: Säilytetään sanatarkasti (kaikki yksityiskohdat)
- **Keskitason kierrokset (4-8)**: Lite-pakkaus (välilyöntien ja muotoilun siistiminen)
- **Vanhat kierrokset (9+)**: Caveman-pakkaus (täytesanojen poisto ja tiivistäminen)
- **Erittäin vanhat kierrokset (20+)**: Tiivistetään voimakkaasti tai poistetaan

#### Koodiesimerkki

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... vielä 50 kierrosta ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Ensimmäiset 3 kierrosta: sanatarkasti
  light: 8, // Kierrokset 4–8: lite-pakkaus
  moderate: 20, // Kierrokset 9–20: caveman-pakkaus
  // Kierrokset 21+: voimakas tiivistäminen
});

// saved = säästettyjen tunnusten määrä
```

#### Milloin käytetään

Progressiivinen vanhentaminen on **aina käytössä** `aggressive`- ja `ultra`-tiloissa. Se on
erityisen tehokas seuraavissa tilanteissa:

- Pitkäkestoiset ohjelmointi-istunnot
- Useita päiviä kestävät keskustelut
- Agenttipohjaiset työnkulut, joissa on paljon työkalukutsuja

### Luolamies-tulostustila

`outputMode.ts`-moduuli lisää **järjestelmäkehotteen ohjeita**, jotka saavat
mallin itsensä tuottamaan tiivistettyä ja niukkasanaista tulostetta ("luolamiestyyliin").

#### Toimintaperiaate

Syötteen pakkaamisen sijaan tämä tila lisää seuraavan kaltaisen järjestelmäkehotteen:

> "Vastaa mahdollisimman vähin sanoin. Ohita kohteliaisuudet. Käytä lyhyitä lauseita."

Tämä toimii erityisen hyvin seuraavissa käyttötapauksissa:

- Koodin generointi (niukkasanaisempi tuloste = vähemmän tokeneita)
- Nopeat kysymykset ja vastaukset (perusteellisia selityksiä ei tarvita)
- Eräkäsittely (maksimoi läpimeno)

#### Milloin sitä kannattaa käyttää

Luolamies-tulostustila on **valinnainen** — ota se käyttöön yhdistelmäasetuksella:

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

### Tulostetyylit (luettelo)

Edellä kuvattu luolamies-tulostustila on **vanha yhden tyylin toteutuspolku**. Vaiheessa 4 se
yleistettiin yhdisteltävien tulostetyylien luetteloksi: `OUTPUT_STYLE_CATALOG` tiedostossa
`open-sse/services/compression/outputStyles/catalog.ts`. Jokainen tyyli on järjestelmäkehotteen
ohje, joka saa mallin itsensä tuottamaan edullisempaa tulostetta. Tyylejä voidaan ottaa käyttöön
yhdessä, ja ne lisätään luettelon mukaisessa järjestyksessä.

| Tyyli                                  | `id`          | Toiminta                                                                                                                                                                                                                                                   | Ohjekielet                                                                          |
| -------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Niukkasanainen proosa                  | `terse-prose` | Poistaa täytesanat, artikkelit ja varaukset; säilyttää teknisen sisällön täsmällisenä. Sama teksti kuin vanhassa luolamies-tulostustilassa (siihen viitataan, eikä tekstiä kirjoiteta uudelleen).                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Vähemmän koodia                        | `less-code`   | YAGNI-portaat: pienin toimiva muutos, ei pyytämättömiä abstraktioita.                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Poninhäntä (laiska vanhempi kehittäjä) | `ponytail`    | "Paras koodi on koodi, jota ei koskaan kirjoitettu": uudelleenkäyttö > uudelleenkirjoitus, juurisyy > oire, lyhin toimiva muutosjoukko.                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Minulla on ADHD (toiminta ensin)       | `i-have-adhd` | Toiminta ensin (komento/polku/katkelma ennen selostusta), numeroidut ja rajatut vaiheet, YKSI konkreettinen seuraava vaihe, ei johdantoa/yhteenvetoa/lopetuksia. Mukautettu projektista [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Niukkasanainen CJK (文言)              | `terse-cjk`   | Klassisen kiinan äärimmäisen niukkasanainen tyyli.                                                                                                                                                                                                         | zh (aluekohtaista saatavuutta rajattu: tarjotaan vain, kun ratkaistu kieli on `zh`) |

Jokaisessa tyylissä on kolme voimakkuustasoa — `lite`, `full`, `ultra` — ja jokainen taso
päättyy yhteiseen rajausehtoon, joka säilyttää koodilohkot, tiedostopolut, komennot,
virhetekstit, URL-osoitteet ja tunnisteet muuttamattomina.

#### Ohjeiden lisäämisen toimintaperiaate

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sovittaa
valinnan luetteloon (tuntemattomat tunnukset ja alueasetukseen sopimattomat tyylit
ohitetaan, eivätkä ne koskaan aiheuta virhettä), yhdistää valitut ohjeet luettelon mukaisessa järjestyksessä,
lisää rajausehdon **kerran** ja sijoittaa tuloksen järjestelmäkehotteen alkuun yhden
idempotenssimerkinnän (`[OmniRoute Output Styles]`) jälkeen — uudelleensoveltaminen
ei tee mitään. Kun havaitulle pyynnön kielelle on olemassa käännös, järjestelmäkehotteeseen
lisätään englannin sijasta lokalisoitu ohje.

#### Käyttöönotto

Hallintapaneelissa: **Konteksti → Asetukset → Pakkaus** — jokaiselle tyylille on oma rivi,
jolla on käyttöön-/poiskytkin ja tason valitsin. Ohjelmallisesti pakkausmääritykseen
tallennetaan valinta seuraavasti:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Taaksepäin yhteensopivuus: vanha yhdistelmäasetus `outputMode: "caveman"` toimii edelleen ja vastaa
`terse-prose`-tyyliä tavutasolla identtisesti vanhan lisäyksen kanssa kaikilla vanhoilla kielillä.

Kielen valinta: kun `languageConfig.enabled` on käytössä, `autoDetect` valitsee
uusimman käyttäjäviestin kielen (sama tunnistin kuin syötemoottoreissa);
`autoDetect`-toiminnon poistaminen käytöstä lukitsee kieleksi `defaultLanguage`-arvon. Pois käytöstä → englanti.

Tyyli × kieli -matriisi on kiinnitetty testillä
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: uutta tyyliä ei voi julkaista
ilman vähintään pt-BR-käännöstä (tai nimenomaisesti seurattua poikkeusta), eikä
olemassa oleva tyyli voi huomaamatta menettää kielialuetta. Lisätietoja tyylin lisäämisestä on kohdassa
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Työkalutulosten pakkaus

`toolResultCompressor.ts`-moduuli tarjoaa **5 erikoistunutta pakkausstrategiaa**
työkalutuloksille (funktiokutsut, agenttien tulosteet, hakutulokset jne.):

1. **Hakutulosten pakkaus** — Poistaa tarpeettomasti toistuvat tulokset ja säilyttää parhaat N tulosta
2. **Tiedostojen lukutulosten pakkaus** — Katkaisee suuret tiedostot ja säilyttää otsakkeet/tuonnit
3. **Koodin suoritustulosten pakkaus** — Säilyttää vain olennaisen stdout/stderr-tulosteen
4. **Tietokantakyselyiden pakkaus** — Rajoittaa rivejä ja poistaa monisanaiset metatiedot
5. **API-vastausten pakkaus** — Poistaa null-kentät ja tiivistää taulukot

#### Milloin sitä kannattaa käyttää

Työkalutulosten pakkaus on **aina käytössä**, kun työkalukutsuja esiintyy.
Määrityksiä ei tarvita.

### Pinottu käsittelyputki

Pinottu tila suorittaa **useita moottoreita peräkkäin** — yleensä ensin RTK:n
(60–90 %:n säästö työkalutulosteessa) ja sitten Cavemanin (30 %:n lisäsäästö
jäljellä olevasta tekstistä). Näin saavutetaan **yhteensä 78–95 %:n säästö**.

#### Toimintaperiaate

```
Syöte (1000 tokenia)
  → RTK (komennot huomioiva suodatin) → 200 tokenia
    → Caveman (täytesanojen poisto) → 140 tokenia
  → Tuloste (140 tokenia, 86 %:n säästö)
```

#### Milloin sitä kannattaa käyttää

Käytä pinottua tilaa seuraavissa tilanteissa:

- Työkalupainotteiset työnkulut (agenttipohjainen ohjelmointi, tutkimus)
- Kustannusherkkä eräkäsittely
- Kun tarvitset mahdollisimman suuren token-säästön

Määritä yhdistelmäasetuksella:

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

## Yhdistelmäkohtaiset pakkausasetusten ohitukset

Voit ohittaa yleisen pakkaustilan **yhdistelmäkohtaisesti**, jotta voit hienosäätää toimintaa
eri käyttötapauksia varten:

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

Tämä on hyödyllistä seuraavissa tapauksissa:

- **Ohjelmointiyhdistelmät**: Käytä `aggressive`-tilaa pitkissä istunnoissa
- **Nopeat kysymys-vastausyhdistelmät**: Käytä `lite`-tilaa nopeita vastauksia varten
- **Paljon työkaluja käyttävät yhdistelmät**: Käytä `stacked`-tilaa mahdollisimman suuriin säästöihin
- **Tuotantoyhdistelmät**: Käytä `cache-aware`-tilaa välimuistia tukevien palveluntarjoajien kanssa

---

## Katso myös

- [Ympäristöasetukset](../reference/ENVIRONMENT.md) — Pakkauksen ympäristömuuttujat
- [Arkkitehtuuriopas](../architecture/ARCHITECTURE.md) — Pakkausputken sisäinen toiminta
- [Käyttöopas](../guides/USER_GUIDE.md) — Pakkauksen käytön aloittaminen
- [RTK-pakkaus](./RTK_COMPRESSION.md) — RTK-suodattimet, luottamusmalli, vahvistusportti ja raakasyötteen palautus
- [Pakkausmoottorit](./COMPRESSION_ENGINES.md) — Caveman, RTK, pinottu tila, ohjelmointirajapinnat, MCP ja hallintapaneeli
- [Pakkaussääntöjen muoto](./COMPRESSION_RULES_FORMAT.md) — JSON-sääntöpaketin muoto
- [Pakkauksen kielipaketit](./COMPRESSION_LANGUAGE_PACKS.md) — Kielikohtaiset Caveman-säännöt
