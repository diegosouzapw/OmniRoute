# CLI Machine-ID Token (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Yleiskatsaus

OmniRoute CLI -komennot todentautuvat paikalliselle hallinta-API:lle käyttämällä
`HMAC-SHA256(machine-id, salt)`-tunnistetta, joka lähetetään
`x-omniroute-cli-token`-pyyntöotsakkeessa.

Näin CLI-alikomennot (`omniroute status`, `omniroute providers` jne.) voivat
kutsua hallinnan päätepisteitä ilman, että käyttäjän tarvitsee antaa JWT:tä tai
salasanaa jokaisella suorituskerralla.

## Toimintaperiaate

1. `getMachineTokenSync()` lukee laitteiston konetunnuksen `node-machine-id`-paketin
   kautta (virheen ilmetessä käytetään tyhjää merkkijonoa, mikä poistaa CLI-todennuksen
   käytöstä).
2. Se laskee arvon `HMAC-SHA256(machine_id, salt)` ja palauttaa täydellisen,
   64 merkkiä pitkän heksadesimaalisen tiivisteen — deterministisen,
   peruuttamattoman ja tähän koneeseen sidotun tunnisteen.
3. CLI lähettää tunnisteen `x-omniroute-cli-token`-otsakkeessa vain, kun selvitetty
   kohde on eksplisiittinen loopback-URL (`localhost`, `127.0.0.0/8` tai
   loopback-IPv6). Tunnisteen sisältävissä pyynnöissä käytetään `redirect: error`-asetusta,
   joten paikallinen uudelleenohjaus ei voi välittää sitä toiseen originiin.
   Etäkontekstit käyttävät sen sijaan rajattuja käyttöoikeustunnisteita. Jos tunnisteen
   johtaminen ei ole mahdollista, CLI jättää otsakkeen pois ja `omniroute doctor`
   raportoi virheestä sen sijaan, että tyhjää tunnistetta pidettäisiin kelvollisena.
4. Palvelin (`src/server/authz/policies/management.ts`) laskee odotetun tunnisteen
   uudelleen samalla suolalla ja vertaa sitä `timingSafeEqual`-funktiolla estääkseen
   ajoitukseen perustuvan tunnisteen selvittämisen.

## Tietoturvaominaisuudet

| Ominaisuus                          | Kuvaus                                                                                                                                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vain loopback-yhteydet**          | Hyväksytään vain, kun palvelimen luotettu vertaisyhteyden paikallisuusmerkintä (joka johdetaan todellisesta TCP-vertaisosoitteesta) osoittaa loopback-yhteyttä. Asiakkaan hallitsemaan `Host`-otsakkeeseen ei koskaan luoteta paikallisuuden määrittämisessä. |
| **Vakioaikainen vertailu**          | `crypto.timingSafeEqual` estää ajoitushyökkäykset.                                                                                                                                                                                                            |
| **Peruuttamaton**                   | Koneen tunnusta ei voi palauttaa HMAC-tulosteesta.                                                                                                                                                                                                            |
| **Ei `always`-suojauksen ohitusta** | `isAlwaysProtectedPath()` arvioidaan ennen CLI-tunnisteen tarkistusta. `/api/shutdown` ja `/api/settings/database` vaativat aina JWT:n.                                                                                                                       |
| **Ei vietävissä**                   | Tunnistetta ei koskaan kirjoiteta levylle eikä lokiteta.                                                                                                                                                                                                      |

## Oletussuola (satunnainen asennuskohtainen arvo)

Kun `OMNIROUTE_CLI_SALT`-muuttujaa ei ole asetettu, suolana käytetään satunnaista,
64 merkkiä pitkää heksadesimaalista merkkijonoa, joka luodaan kerran ja tallennetaan
polkuun `<DATA_DIR>/cli-token-salt.json` (tila `0600`) — ei versionhallintaan
tallennettua literaalia `omniroute-cli-auth-v1`. Sekä `getActiveSalt()` tiedostossa
`src/lib/machineToken.ts` että sen vastine tiedostossa
`bin/cli/utils/cliToken.mjs` lukevat saman tiedoston, joten palvelin ja tämän
asennuksen jokainen CLI-suorituskerta päätyvät samaan arvoon. Versionhallintaan
tallennettua literaalia käytetään vain viimeisenä varavaihtoehtona, kun pysyvää tai
ympäristömuuttujasta saatavaa suolaa ei vielä voida muodostaa (esimerkiksi tuoreessa,
vain CLI:n sisältävässä asennuksessa ennen kuin palvelinta on koskaan suoritettu).
Tämä korjaa vanhan kiinteän oletusliteraalin heikkouden: `/etc/machine-id` on
yleensä kaikkien käyttäjien luettavissa, joten kuka tahansa paikallinen käyttäjä
olisi muuten voinut johtaa saman tunnisteen kaikille asennuksille, joissa
`OMNIROUTE_CLI_SALT`-muuttujaa ei ollut asetettu.

## Suolan kierrätys

Aseta `OMNIROUTE_CLI_SALT`, jotta johdettu tunniste voidaan kierrättää ilman koodimuutoksia — se
on aina ensisijainen asennuskohtaisesti tallennettuun suolaan nähden. Kierrätyksen jälkeen kaikki tämän
koneen CLI-prosessit käyttävät uutta tunnistetta automaattisesti. Tämä on hyödyllistä, jos
prosessiluettelon vuoto on saattanut paljastaa aiemman johdetun arvon.

```bash
# Pysyvä kierrätys (lisää komentotulkin profiiliin)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Varmista, että uusi tunniste on käytössä
omniroute status
```

## Vanha muoto (SHA-256, 32 merkkiä) — hyväksytään edelleen

Ennen yllä kuvattua HMAC-muotoa CLI johti tunnisteensa kaavalla
`SHA-256(machineId + salt).hex[0..32]` (32 merkin etuliite) tiedostossa
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` tiedostossa `src/lib/machineToken.ts`).

Taaksepäin yhteensopivuuden vuoksi palvelin hyväksyy **molemmat** muodot: tarkistin muodostaa
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ja vertaa
saapuvaa otsaketta kuhunkin käyttäen `timingSafeEqual`-funktiota
(`src/server/authz/policies/management.ts` ja `src/lib/middleware/cliTokenAuth.ts`).
Tunniste on siis kelvollinen, jos se vastaa **joko** 64 merkin HMAC-tiivistettä tai 32 merkin
vanhan SHA-256-muodon etuliitettä.

**Poistaminen käytöstä:** aseta `OMNIROUTE_DISABLE_CLI_TOKEN=true` (ympäristössä tai `.env`-tiedostossa), jotta CLI:n
tunnistemekanismi poistetaan kokonaan käytöstä; tällöin kaikki käyttö edellyttää nimenomaista API-avainta. Usean käyttäjän
isäntäkoneissa tätä suositellaan, koska `machine-id` on laitekohtainen (ei käyttäjäkohtainen) ja toinen
saman isäntäkoneen käyttäjä voisi laskea saman tunnisteen.

## Tiedostot

| Tiedosto                                  | Tarkoitus                                          |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tunnisteen johtaminen (`getMachineTokenSync`)      |
| `bin/cli/utils/cliToken.mjs`              | Saman johtamisen CLI-puolen vastine                |
| `<DATA_DIR>/cli-token-salt.json`          | Tallennettu satunnainen asennuskohtainen suola     |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER`-vakio                           |
| `src/server/authz/policies/management.ts` | Palvelinpuolen tarkistus                           |
| `src/server/authz/routeGuard.ts`          | Loopback-isäntäkoneen tarkistus (`isLoopbackHost`) |

## Katso myös

- `docs/security/ROUTE_GUARD_TIERS.md` — reittien suojaustasot
- `docs/architecture/AUTHZ_GUIDE.md` — koko valtuutusketju
