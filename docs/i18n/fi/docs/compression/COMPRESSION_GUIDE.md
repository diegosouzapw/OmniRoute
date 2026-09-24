# 🗜️ Prompt Compression Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

## Konfigurointi

### Hallintapaneeli

Siirry kohtaan `Dashboard → Context & Cache`:

- **Caveman** – tilan valinta, kielipaketit, esikatselu ja globaalit oletusarvot
- **RTK** – komentosuodattimen esikatselu, RTK-turvallisuusasetukset ja suodatinluettelo
- **Compression Combos** – nimettyjä moottoriputkia, jotka on määritetty reititysyhdistelmille
- **Auto-Trigger Threshold** – käynnistää pakkauksen automaattisesti, kun merkkimäärä ylittää kynnyksen

### Yhdistelmäkohtainen ohitus

Määritä `Dashboard → Context & Cache → Compression Combos` -kohdassa pakkausyhdistelmä reititysyhdistelmälle:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tämän avulla voit käyttää pinottua pakkausta ilmaisilla/koodaustoimittajilla pitäen samalla lite-tilan maksullisissa tilauksissa.

Tämä "Per-Combo Override" -määritys on eri ohjaus kuin **reititysyhdistelmän pakkaustilan** ohitus (Default/Off/Lite/Standard/Aggressive/Ultra) – tämä ohitus ei valitse nimettyä pakkausyhdistelmäputkea; se vain asettaa `compressionMode`-kentän, jota `resolveCompressionPlan` käyttää. Se voidaan asettaa joko yhdistelmäkortille (`Dashboard → Combos`) tai, #6760:n jälkeen, reititysyhdistelmäkohtaisesti "Assign to routing" -luettelossa `Dashboard → Context & Cache → Compression Combos` -kohdassa, aivan yllä dokumentoidun putkenmäärityksen valintaruudun vieressä. Molemmat käyttöliittymät säilyttävät tiedot saman `PUT /api/combos/{id}` -päätepisteen kautta.

### Pyyntökohtainen ohitus

Lähetä `x-omniroute-compression`-pyyntöotsake ohittaaksesi pakkaussuunnitelman yksittäiselle pyynnölle. Sillä on korkein prioriteetti – se ohittaa reititysyhdistelmän ohituksen, aktiivisen profiilin, automaattisen käynnistyksen ja paneelin oletusarvon. Tuntemattomat arvot ohitetaan (pyyntöä ei koskaan hylätä) ja globaali pääkytkin ohjaa edelleen kaikkea: kun pakkaus on pois päältä globaalisti, otsake ei voi kytkeä sitä päälle. Arvot:

| Arvo          | Vaikutus                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ei pakkausta tälle pyynnölle.                                                                                                   |
| `default`     | Paneelista johdettu oletusprofiili (ohittaa aktiivisen profiilin). Häviölliset moottorit jätetään pois päältä.                  |
| `safe`        | Sama kuin otsakkeen jättäminen pois: vain duplikaattien poisto ja välilyöntien tiivistys.                                       |
| `allow-lossy` | Säilytä tämän pyynnön operaattorisuunnitelma, mukaan lukien yhteenvedot, relevanssisuodattimet ja tyylin uudelleenkirjoitukset. |
| `engine:<id>` | Yksittäinen moottori, kun se on käytössä, esim. `engine:rtk`. Tämä on pyyntökohtainen opt-in kyseiselle moottorille.            |
| `<combo>`     | Nimetty yhdistelmä, joka vastaa ensin nimen (kirjainkoosta riippumatta) ja sitten tunnuksen perusteella.                        |

Ilman `allow-lossy`, `engine:<id>` tai nimettyä yhdistelmää häviöllisiä moottoreita ei käytetä. Pyyntö saa silti istunnon duplikaattien poiston ja välilyöntien tiivistyksen, kun pakkaus on päällä.

Käytetty suunnitelma toistetaan `X-OmniRoute-Compression: <mode>; source=<source>` -vastausotsakkeessa, jossa `<source>` on jokin seuraavista: `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` tai `off`.

### API

```bash
# Hae pakkausasetukset
curl http://localhost:20128/api/settings/compression

# Päivitä pakkausasetukset
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Esikatsele tiettyä RTK/pinottua hyötykuormaa
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listaa RTK-suodatinpaketit
curl http://localhost:20128/api/context/rtk/filters

# Testaa RTK:ta suoraan valinnaisilla komennon metatiedoilla
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

Jokainen pakattu pyyntö sisältää tilastoja palvelinlogeissa:

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

| Vaihe    | Tilamoodit                                                                                                                                                      | Tila          |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Vaihe 1  | Off, Lite                                                                                                                                                       | ✅ Toimitettu |
| Vaihe 2  | Standard, Aggressive, Ultra                                                                                                                                     | ✅ Toimitettu |
| Vaihe 3  | RTK, Stacked, Compression Combos                                                                                                                                | ✅ Toimitettu |
| Vaihe 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                     | ✅ Toimitettu |
| Vaihe 4C | Mukautuva kontekstibudjetti ("säädin") — laskentamoottori + API (`contextBudget` on `PUT /api/settings/compression`) + hallintapaneelin tila-/käytäntöohjaukset | ✅ Toimitettu |

---

## Kiitokset

Standard-tilan pakkaussäännöt ovat saaneet inspiraationsa **[JuliusBrusseen](https://github.com/JuliusBrussee)** luomasta **[Caveman](https://github.com/JuliusBrussee/caveman)**-projektista (⭐ 51K+) — viraalista "miksi käyttää monta tunnusta, kun vähä tunnus tehdä tehtävä" -projektista. Caveman raportoi `~75%` vähemmän tulostunnuksia, `65%`:n keskimääräisen tulossäästön vertailutesteissä, `22-87%`:n tulosalueen ja `~46%`:n syötteenpakkaustyökalun.

RTK-tila on saanut inspiraationsa **[RTK AI:n](https://github.com/rtk-ai)** **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** -projektista — suorituskykyisestä komentotulosteen pakkausprojektista päätelaitteiden, koontien, testien, gitin ja työkalutulosteiden suodatukseen. RTK raportoi `60-90%`:n säästön, ja sen README-tiedoston esimerkki-istunto osoittaa `~80%`:n säästön.

---

## Edistykselliset pakkausjärjestelmät

7 vakiotilan lisäksi OmniRoute sisältää useita edistyksellisiä pakkausjärjestelmiä, jotka toimivat automaattisesti kontekstin perusteella.

### Välimuistitietoinen pakkaus

Jotkut palveluntarjoajat (kuten Anthropic kehotteiden välimuistitallennuksella) tukevat **kehotteiden välimuistitallennusta**, jonka avulla ne voivat tallentaa osia kehotteesta kustannusten ja viiveen vähentämiseksi. Kun välimuistitallennus on käytössä, aggressiivinen pakkaus voi itse asiassa **heikentää** suorituskykyä, koska se muuttaa välimuistiin tallennettuja tunnuksia, mikä mitätöi välimuistin.

`cachingAware.ts`-moduuli ratkaisee tämän **tunnistamalla välimuistitallennuskontekstin** ja **säätämällä pakkausstrategiaa** sen mukaisesti.

#### Miten se toimii

1. **Tunnista välimuistitallennuskonteksti** – Tarkistaa pyynnön rungosta `cache_control`-merkkejä
2. **Tunnista välimuistitallennusta tukevat palveluntarjoajat** – Tarkistaa, tukeeko kohdepalveluntarjoaja välimuistitallennusta
3. **Säädä strategiaa** – Alentaa `aggressive`/`ultra`-tilan `standard`-tilaan välimuistitallennusta tukeville palveluntarjoajille
4. **Ohita järjestelmäkehote** – Järjestelmäkehotteet ovat yleensä välimuistissa, joten älä pakkaa niitä
5. **Käytä deterministisiä muunnoksia** – Käytä vain muunnoksia, jotka tuottavat johdonmukaisen tuloksen

#### Koodiesimerkki

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Välimuistimerkki
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Milloin käyttää

Välimuistitietoinen pakkaus on **aina päällä** – ei vaadi konfigurointia. Se aktivoituu vain, kun:

- Pyynnössä on `cache_control`-merkkejä
- Kohdepalveluntarjoaja tukee kehotteiden välimuistitallennusta (Anthropic, OpenAI jne.)

### Progressiivinen ikääntyminen

Pitkät keskustelut keräävät monia viestivuoroja, mutta vanhemmat vuorot muuttuvat vähemmän relevantiksi. `progressiveAging.ts`-moduuli **heikentää viestejä vuorojen etäisyyden mukaan**:

- **Viimeisimmät vuorot (0-3)**: Säilytetään sanasta sanaan (täydelliset yksityiskohdat)
- **Keskimmäiset vuorot (4-8)**: Kevyt pakkaus (välilyönnit, muotoilun siistiminen)
- **Vanhat vuorot (9+)**: Luolamiespakkaus (täytesanojen poisto, tiivistäminen)
- **Erittäin vanhat vuorot (20+)**: Voimakkaasti tiivistetty tai poistettu

#### Koodiesimerkki

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Ensimmäiset 3 vuoroa: sanasta sanaan
  light: 8, // Vuorot 4-8: kevyt pakkaus
  moderate: 20, // Vuorot 9-20: luolamiespakkaus
  // Vuorot 21+: voimakas tiivistäminen
});

// saved = säästettyjen tunnusten määrä
```

#### Milloin käyttää

Progressiivinen ikääntyminen on **aina päällä** `aggressive`- ja `ultra`-tiloissa. Se on erityisen tehokas:

- Pitkäkestoisissa koodaussessioissa
- Monipäiväisissä keskusteluissa
- Agenttipohjaisissa työnkuluissa, joissa on paljon työkalukutsuja

### Luolamiehen tulostustila

`outputMode.ts`-moduuli lisää **järjestelmäkehotteen ohjeita**, jotta malli itse tuottaa pakattua, ytimekästä tulostetta ("luolamies"-tyyliin).

#### Miten se toimii

Sen sijaan, että tämä tila pakkaa syötteen, se lisää järjestelmäkehotteen, kuten:

> "Vastaa mahdollisimman vähillä sanoilla. Ohita kohteliaisuudet. Käytä lyhyitä lauseita."

Tämä toimii erityisen hyvin:

- Koodin generoinnissa (ytimekkäämpi tuloste = vähemmän tunnuksia)
- Nopeissa kysymys-vastaus-tilanteissa (ei tarvetta yksityiskohtaisille selityksille)
- Eräkäsittelyssä (maksimoi läpimenon)

#### Milloin käyttää

Luolamiehen tulostustila on **valinnainen** – aseta se yhdistelmäkonfiguraation kautta:

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

### Tulostustyylit (luettelo)

Yllä oleva luolamiehen tulostustila on **perinteinen yhden tyylin polku**. Vaihe 4 yleisti sen luetteloksi yhdisteltäviä tulostustyylejä: `OUTPUT_STYLE_CATALOG` tiedostossa
`open-sse/services/compression/outputStyles/catalog.ts`. Jokainen tyyli on järjestelmäkehotteen ohje, joka saa mallin itse tuottamaan edullisempaa tulostetta; tyylejä voidaan ottaa käyttöön yhdessä ja ne lisätään luettelojärjestyksessä.

| Tyyli                                | `id`          | Mitä se tekee                                                                                                                                                                                                                                          | Ohjekielet                                                             |
| :----------------------------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Tiivis proosa                        | `terse-prose` | Poistaa täytesanat/artikkelit/varovaisuuden; pitää teknisen sisällön täsmällisenä. Sama teksti kuin vanha caveman-tulostustila (viitattu, ei uudelleenkirjoitettu).                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Vähemmän koodia                      | `less-code`   | YAGNI-tikkaat: pienin toimiva muutos, ei pyytämättömiä abstraktioita.                                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Ponytail (laiska vanhempi kehittäjä) | `ponytail`    | "Paras koodi on koodi, jota ei koskaan kirjoiteta": uudelleenkäyttö > uudelleenkirjoitus, perussyy > oire, lyhin toimiva ero.                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Minulla on ADHD (toiminta ensin)     | `i-have-adhd` | Toiminta ensin (komento/polku/katkelma ennen proosaa), numeroidut rajatut vaiheet, YKSI konkreettinen seuraava vaihe, ei esipuhetta/yhteenvetoa/lopetuksia. Mukautettu [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) -projektista. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Tiivis CJK (文言)                    | `terse-cjk`   | Klassisen kiinan erittäin tiivis tyyli.                                                                                                                                                                                                                | zh (paikallisesti rajattu: tarjolla vain, kun ratkaistu kieli on `zh`) |

Jokaisessa tyylissä on kolme intensiteettitasoa – `lite`, `full`, `ultra` – ja jokainen taso
päättyy jaettuun rajausehtoon, joka pitää koodilohkot, tiedostopolut, komennot,
virheketjut, URL-osoitteet ja tunnisteet muuttumattomina.

#### Miten injektio toimii

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ratkaisee
valinnan luetteloa vasten (tuntemattomat tunnukset ja paikallisesti yhteensopimattomat tyylit
poistetaan, ei koskaan virhettä), yhdistää valitut ohjeet luettelojärjestyksessä,
lisää rajausehdon **kerran** ja sijoittaa tuloksen järjestelmän
kehotteen eteen yhden idempotenttimerkin (`[OmniRoute Output Styles]`) taakse – uudelleen
soveltaminen ei tee mitään. Kun havaittu pyyntökieli sisältää käännöksen,
lokalisoitu ohje injektoidaan englannin sijaan.

#### Miten otetaan käyttöön

Hallintapaneelissa: **Context → Settings → Compression** – yksi rivi tyyliä kohden
on/off-kytkimellä ja tason valitsimella. Ohjelmallisesti pakkausasetukset säilyttävät
valinnan seuraavasti:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Taaksepäin yhteensopivuus: vanha `outputMode: "caveman"` -yhdistelmäasetus toimii edelleen ja vastaa
`terse-prose`-tyyliä, joka on tavu-identtinen vanhan injektion kanssa kaikilla vanhoilla kielillä.

Kielen valinta: kun `languageConfig.enabled` on päällä, `autoDetect` valitsee
uusimman käyttäjäviestin kielen (sama tunnistin kuin syöttömoottoreissa);
`autoDetect`-toiminnon poiskytkeminen kiinnittää `defaultLanguage`-asetuksen. Pois päältä → englanti.

Tyyli × kieli -matriisi on kiinnitetty tiedostoon
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: uusi tyyli ei voi tulla käyttöön
ilman vähintään pt-BR-käännöstä (tai nimenomaista seurattua poikkeusta), eikä
olemassa oleva tyyli voi hiljaisesti menettää lokalisointia. Tyylin lisäämiseksi katso
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Työkalun tulosten pakkaus

`toolResultCompressor.ts`-moduuli tarjoaa **5 erikoistunutta pakkausstrategiaa**
työkalujen tuloksille (funktiokutsut, agentin tulosteet, hakutulokset jne.):

1. **Hakutulosten pakkaus** – Poistaa redundantit tulokset, säilyttää N parasta
2. **Tiedoston lukemisen pakkaus** – Katkaisee suuret tiedostot, säilyttää otsikot/tuonnit
3. **Koodin suorituksen pakkaus** – Säilyttää vain olennaiset stdout/stderr-tulosteet
4. **Tietokantakyselyjen pakkaus** – Rajoittaa rivejä, poistaa yksityiskohtaiset metatiedot
5. **API-vastausten pakkaus** – Poistaa null-kentät, tiivistää taulukot

#### Milloin käyttää

Työkalun tulosten pakkaus on **aina päällä**, kun työkalukutsuja on. Ei
konfigurointia tarvita.

### Pinottu putki

Pinottu tila suorittaa **useita moottoreita peräkkäin** – yleensä ensin RTK
(60-90 % säästöjä työkalun tulosteissa), sitten Caveman (30 % lisäsäästöjä
jäljellä olevasta tekstistä). Tämä saavuttaa **78-95 % kokonaissäästöt**.

#### Miten se toimii

```
Syöte (1000 merkkiä)
  → RTK (komentotietoinen suodatin) → 200 merkkiä
    → Caveman (täytesanojen poisto) → 140 merkkiä
  → Tuloste (140 merkkiä, 86 % säästö)
```

#### Milloin käyttää

Käytä pinottua tilaa seuraavissa tapauksissa:

- Työkalupainotteiset työnkulut (agenttipohjainen koodaus, tutkimus)
- Kustannusherkkä eräkäsittely
- Kun tarvitset maksimaalisia merkkisäästöjä

Määritä yhdistelmän avulla:

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
