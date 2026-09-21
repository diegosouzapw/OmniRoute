# Kiro Setup Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Šiame vadove aprašoma, kaip pridėti Kiro (AWS talpinamo DI programavimo asistento) paskyras prie OmniRoute, daugiausia dėmesio skiriant kelių paskyrų naudojimui vienu metu be seansų konfliktų.

---

## Pagrindinė informacija: kodėl Kiro paskyros gali konfliktuoti

Kiro vidinė sistema aktyviems seansams sekti naudoja AWS SSO OIDC kliento registracijas.
Esminis apribojimas: **kiekviena OIDC kliento registracija vienu metu palaiko tik vieną aktyvų seansą**. Kai antras įrenginys arba naudotojas autentifikuojasi naudodamas tą patį užregistruotą klientą, vidinė sistema panaikina pirmosios paskyros atnaujinimo prieigos rakto galiojimą.

Tas pats mechanizmas sukelia problemų vykdant `kiro-cli login` kompiuteryje, kuriame jau prisijungta prie kitos Kiro paskyros — naujas prisijungimas atšaukia pirmosios paskyros prieigos raktą.

---

## Kaip OmniRoute tai išsprendžia (v3.8.0+)

Nuo v3.8.0 OmniRoute kiekvieną kartą importuodama Kiro ryšį iškviečia `registerClient()` (AWS SSO OIDC). Taip kiekvienam OmniRoute ryšiui suteikiama atskira OIDC kliento registracija. Kadangi kiekviena kliento registracija yra nepriklausoma, vienos paskyros atnaujinimas ar pakartotinis autentifikavimas neturi įtakos kitų paskyrų atnaujinimo prieigos raktams.

Izoliavimas taikomas importavimo naudojant atnaujinimo prieigos raktą metodams, o autentifikavimas naudojant API raktą visiškai išvengia OIDC atnaujinimo seansų:

| Importavimo metodas                                                             | Izoliavimo būsena                                                                                                     |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC įrenginio kodo srautas                                     | Izoliuotas nuo įrenginio kodo srauto įdiegimo                                                                         |
| **Importuoti prieigos raktą** (rankinis atnaujinimo prieigos rakto įklijavimas) | Izoliuotas nuo v3.8.0                                                                                                 |
| **Google / GitHub prisijungimas**                                               | Izoliuotas nuo v3.8.0                                                                                                 |
| **Automatinis importavimas** (kiro-cli SQLite)                                  | Izoliuotas nuo v3.8.0 (SQLite kelias jau buvo izoliuotas; atsarginis SSO podėlio variantas dabar taip pat izoliuotas) |
| **API raktas** (ilgalaikis CodeWhisperer raktas)                                | Nėra atnaujinimo seanso; raktas patikrinamas ir saugomas kaip perdavimo kredencialas                                  |

---

## Perkėlimo pastaba ryšiams, sukurtiems iki v3.8.0

Iki v3.8.0 importuotiems ryšiams nėra skirta atskira OIDC kliento registracija, saugoma `providerSpecificData`. Šie ryšiai ir toliau veikia, tačiau naudoja bendrą socialinio autentifikavimo atnaujinimo galinį tašką, todėl du tokie ryšiai vis dar gali panaikinti vienas kito galiojimą.

**Norėdami užtikrinti izoliavimą:** ištrinkite seną ryšį skiltyje **Valdymo skydas → Teikėjai** ir iš naujo jį importuokite naudodami bet kurį iš palaikomų importavimo srautų. Visi naujai sukurti ryšiai automatiškai gaus atskirą kliento registraciją.

---

## Dviejų Kiro paskyrų pridėjimas greta

### Būtinosios sąlygos

- OmniRoute v3.8.0 arba naujesnė versija.
- Veikianti Kiro paskyra (el. paštas ir slaptažodis, Google arba GitHub prisijungimas).
- Pasirinktinai — antra Kiro paskyra.

### 1 veiksmas: importuokite pirmąją paskyrą

1. Atidarykite **Valdymo skydas → Teikėjai → Pridėti teikėją → Kiro**.
2. Pasirinkite vieną iš šių parinkčių:
   - **Importuoti prieigos raktą** — įklijuokite atnaujinimo prieigos raktą, prasidedantį `aorAAAAAG`.
   - **API raktas** — įklijuokite ilgalaikį Kiro / CodeWhisperer API raktą.
   - **Google / GitHub prisijungimas** — užbaikite OAuth srautą naršyklėje.
   - **Automatinis importavimas** — spustelėkite mygtuką; OmniRoute nuskaito kredencialus iš vietinės kiro-cli duomenų bazės arba `~/.aws/sso/cache`.
3. Ryšys išsaugomas. Srautai, naudojantys atnaujinimo prieigos raktą, automatiškai užregistruoja atskirą OIDC klientą. Srautai, naudojantys API raktą, patikrina raktą per AWS ir nesaugo atnaujinimo prieigos rakto.

### 2 veiksmas: importuokite antrąją paskyrą

Pakartokite 1 veiksmą antrajai paskyrai. Kadangi kiekvienas importavimas sukuria atskirą OIDC kliento registraciją, abu ryšiai yra visiškai izoliuoti.

### 3 veiksmas: patikrinkite, ar abu ryšiai aktyvūs

1. **Valdymo skydas → Teikėjai** — abiejų Kiro ryšių būsena turėtų būti **Aktyvus**.
2. **Valdymo skydas → Būsena** — abu ryšiai turėtų sėkmingai praeiti prieigos rakto būklės patikrą.

### 4 veiksmas: naudokite derinį maršrutams tarp paskyrų parinkti

Sukurkite derinį, kuriame abu ryšiai būtų tiksliniai, kad galėtumėte paskirstyti apkrovą arba nesėkmės atveju persijungti tarp jų:

```
kiro/kiro-dev → kiro/kiro-pro
```

Informacijos apie derinių konfigūravimą rasite [FEATURES.md](./FEATURES.md) ir maršrutų parinkimo dokumentacijoje.

---

## Įmonių / IDC naudotojai

AWS IAM Identity Center (IDC) paskyroms naudokite **AWS Builder ID / IDC įrenginio kodo**
srautą, pasiekiamą per **Valdymo skydas → Teikėjai → Kiro → Įrenginio kodas**. Įrenginio kodo srautas
visada buvo visiškai izoliuotas. Šių ryšių pakartotinai importuoti nereikia.

Įmonių naudotojai, dirbantys ne numatytajame AWS regione, gali nurodyti regioną
importuodami per Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Jei laukas `region` praleistas, numatytoji jo reikšmė yra `us-east-1`.

---

## Importavimo naudojant API raktą srautas

Autentifikavimas API raktu skirtas ilgai galiojantiems Kiro / AWS CodeWhisperer perdavimo prieigos duomenims. Jis
nenaudoja OAuth atnaujinimo, todėl išvengiama bendrinamo OIDC seanso panaikinimo.

### Valdymo skydas

1. Atidarykite **Valdymo skydas -> Teikėjai -> Kiro**.
2. Pasirinkite **API raktas**.
3. Įklijuokite API raktą ir, jei reikia, AWS regioną (numatytasis – `us-east-1`).
4. OmniRoute patikrina raktą ir išsaugo ryšį.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Vidinė sutartis

API maršrutas patikrina raktą iškviesdamas `KiroService.validateApiKey()`, kuri
naudoja `ListAvailableProfiles` su regioną atitinkančiu CodeWhisperer/Amazon Q
galiniu tašku ir nustato `profileArn`.

Išsaugotam ryšiui naudojama:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Vykdymo metu `KiroExecutor.buildHeaders()` siunčia raktą kaip
`Authorization: Bearer <key>` ir prideda `tokentype: API_KEY`. Kvotos / profilio užklausos
naudoja tą patį žymeklį, todėl AWS perdavimo reikšmę traktuoja kaip ilgai galiojantį API raktą, o ne
OIDC ar socialinės paskyros prieigos atpažinimo ženklą.

---

## OIDC kliento galiojimo pabaiga

AWS SSO OIDC viešieji klientai paprastai nustoja galioti po 90 dienų
(`clientSecretExpiresAt`). OmniRoute saugo šią laiko žymą `providerSpecificData`,
kad būtų galima stebėti. Jei po maždaug 90 dienų ryšys nustoja būti atnaujinamas, pakartotinai importuokite
ryšį, kad gautumėte naują OIDC kliento registraciją. Automatinis perregistravimas
pasibaigus galiojimui numatytas kaip būsimas patobulinimas.

Ryšiams, naudojantiems API raktą, OIDC kliento galiojimo pabaiga netaikoma, nes jie nėra atnaujinami
per AWS SSO OIDC.

---

## Trikčių šalinimas

### Antroji paskyra vis atjungiama

- Patikrinkite abu ryšius skiltyje **Valdymo skydas → Teikėjai** ir įsitikinkite, kad kiekvieno jų neapdorotame
  JSON rodoma ne null reikšmė `clientId` (ją galima pamatyti spustelėjus informacijos piktogramą). Jei kuriame nors ryšyje
  nėra `clientId`, jis buvo importuotas prieš v3.8.0 – importuokite jį iš naujo.

### Importuoti nepavyksta dėl klaidos „Token validation failed“

- Įsitikinkite, kad atnaujinimo atpažinimo ženklas prasideda `aorAAAAAG`.
- Įsitikinkite, kad OmniRoute gali pasiekti `https://oidc.us-east-1.amazonaws.com` (arba sukonfigūruotą
  regioną). Jei naudojate įmonės tarpinį serverį, nustatykite teikėjo lygmens tarpinį serverį
  skiltyje **Valdymo skydas → Nustatymai → Tarpiniai serveriai**.

### Nepavyksta importuoti naudojant API raktą

- Patikrinkite, ar raktas yra Kiro / CodeWhisperer API raktas, o ne atnaujinimo atpažinimo ženklas.
- Patikrinkite, ar AWS regionas atitinka raktą / paskyrą. Numatytasis regionas yra `us-east-1`.
- Raktas turi suteikti galimybę iškviesti `ListAvailableProfiles`; priešingu atveju OmniRoute negalės
  nustatyti reikiamo `profileArn`.

Kitų problemų sprendimus žr. pagrindiniame faile [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
