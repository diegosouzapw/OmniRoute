# Kiro Setup Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

See juhend käsitleb Kiro (AWS-i hostitud AI-kodeerimisassistendi) kontode lisamist OmniRoute'i,
keskendudes mitme konto samaaegsele kasutamisele ilma seansikonfliktideta.

---

## Taust: miks Kiro kontod võivad konflikti sattuda

Kiro taustsüsteem kasutab aktiivsete seansside jälgimiseks AWS SSO OIDC kliendiregistreeringuid.
Oluline piirang: **iga OIDC kliendiregistreering toetab korraga ainult üht aktiivset
seanssi**. Kui teine seade või kasutaja autendib sama registreeritud kliendi abil,
muudab taustsüsteem esimese konto värskendustõendi kehtetuks.

Sama mehhanism põhjustab probleeme, kui käivitada `kiro-cli login` masinas,
kus teine Kiro konto on juba sisse logitud — uus sisselogimine tühistab
esimese konto tõendi.

---

## Kuidas OmniRoute selle lahendab (v3.8.0+)

Alates versioonist v3.8.0 kutsub OmniRoute iga Kiro ühenduse importimise ajal välja
`registerClient()` (AWS SSO OIDC). See annab igale OmniRoute'i ühendusele oma spetsiaalse
OIDC kliendiregistreeringu. Kuna iga kliendiregistreering on sõltumatu, ei mõjuta ühe
konto värskendamine või uuesti autentimine ühegi teise konto värskendustõendit.

Isolatsioon rakendub värskendustõendi importimise meetoditele ning API-võtmega autentimine
väldib OIDC värskendusseansse täielikult:

| Importimismeetod                                             | Isolatsiooni olek                                                                                                          |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC seadmekoodi voog                        | Isoleeritud alates seadmekoodi voo kasutuselevõtust                                                                        |
| **Tõendi importimine** (värskendustõendi käsitsi kleepimine) | Isoleeritud alates versioonist v3.8.0                                                                                      |
| **Google'i / GitHubi sotsiaalne sisselogimine**              | Isoleeritud alates versioonist v3.8.0                                                                                      |
| **Automaatne importimine** (kiro-cli SQLite)                 | Isoleeritud alates versioonist v3.8.0 (SQLite'i tee oli juba isoleeritud; nüüd on isoleeritud ka SSO vahemälu varuvariant) |
| **API-võti** (pika elueaga CodeWhispereri võti)              | Värskendusseanssi ei kasutata; võti valideeritakse ja talletatakse kandjatõendina                                          |

---

## Migreerimismärkus enne versiooni v3.8.0 loodud ühenduste kohta

Enne versiooni v3.8.0 imporditud ühendustel ei ole spetsiaalset OIDC kliendiregistreeringut,
mis oleks talletatud väljal `providerSpecificData`. Need ühendused töötavad edasi, kuid kasutavad jagatud
sotsiaalse autentimise värskendusotspunkti, mis tähendab, et kaks sellist ühendust võivad endiselt teineteise
kehtetuks muuta.

**Isolatsiooni kasutuselevõtuks:** kustutage vana ühendus jaotises **Töölaud → Teenusepakkujad**
ja importige see uuesti, kasutades mõnda toetatud importimisvoogu. Kõik uued ühendused saavad
automaatselt oma kliendiregistreeringu.

---

## Kahe Kiro konto kõrvuti lisamine

### Eeltingimused

- OmniRoute v3.8.0 või uuem.
- Töötav Kiro konto (e-post + parool, Google'i või GitHubi sisselogimine).
- Soovi korral teine Kiro konto.

### 1. samm: importige esimene konto

1. Avage **Töölaud → Teenusepakkujad → Lisa teenusepakkuja → Kiro**.
2. Valige üks järgmistest:
   - **Tõendi importimine** — kleepige värskendustõend, mis algab tekstiga `aorAAAAAG`.
   - **API-võti** — kleepige pika elueaga Kiro / CodeWhispereri API-võti.
   - **Google'i / GitHubi sisselogimine** — viige OAuthi voog brauseris lõpule.
   - **Automaatne importimine** — klõpsake nuppu; OmniRoute loeb identimisteabe
     kohalikust kiro-cli andmebaasist või asukohast `~/.aws/sso/cache`.
3. Ühendus salvestatakse. Värskendustõendi vood registreerivad automaatselt spetsiaalse
   OIDC kliendi. API-võtme vood valideerivad võtme AWS-is ega talleta värskendustõendit.

### 2. samm: importige teine konto

Korrake teise konto jaoks 1. sammu. Kuna iga importimine loob eraldi OIDC
kliendiregistreeringu, on kaks ühendust täielikult isoleeritud.

### 3. samm: kontrollige, kas mõlemad ühendused on aktiivsed

1. **Töölaud → Teenusepakkujad** — mõlema Kiro ühenduse olek peaks olema **Aktiivne**.
2. **Töölaud → Seisund** — mõlemad ühendused peaksid läbima tõendi seisundikontrolli.

### 4. samm: kasutage kontode vahel marsruutimiseks kombinatsiooni

Looge mõlemat ühendust sihtmärkidena sisaldav kombinatsioon, et nende vahel koormust tasakaalustada või kasutada üht varuvariandina:

```
kiro/kiro-dev → kiro/kiro-pro
```

Kombinatsiooni seadistamise kohta vaadake faili [FEATURES.md](./FEATURES.md) ja marsruutimise dokumentatsiooni.

---

## Ettevõtte- / IDC-kasutajad

AWS IAM Identity Centeri (IDC) kontode puhul kasutage **AWS Builder ID / IDC seadmekoodi**
voogu asukohas **Töölaud → Pakkujad → Kiro → Seadmekood**. Seadmekoodi voog on
alati olnud täielikult isoleeritud. Neid ühendusi pole vaja uuesti importida.

Ettevõttekasutajad, kes töötavad AWS-i vaikepiirkonnast erinevas piirkonnas, saavad
Import Token API kaudu importimisel piirkonna määrata:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Kui väli `region` jäetakse välja, kasutatakse vaikeväärtust `us-east-1`.

---

## API-võtme impordivoog

API-võtmega autentimine on mõeldud pika elueaga Kiro / AWS CodeWhispereri esitaja mandaatidele.
See ei kasuta OAuthi värskendamist ja väldib seetõttu jagatud OIDC-seansi kehtetuks muutmist.

### Töölaud

1. Avage **Töölaud -> Pakkujad -> Kiro**.
2. Valige **API-võti**.
3. Kleepige API-võti ja soovi korral AWS-i piirkond (vaikimisi `us-east-1`).
4. OmniRoute valideerib võtme ja salvestab ühenduse.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Sisemine leping

API-marsruut valideerib võtme, kutsudes välja `KiroService.validateApiKey()`, mis
kasutab piirkonnale vastava CodeWhispereri/Amazon Q lõpp-punkti suhtes meetodit
`ListAvailableProfiles` ja lahendab väärtuse `profileArn`.

Salvestatud ühendus kasutab järgmist struktuuri:

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

Käitamise ajal saadab `KiroExecutor.buildHeaders()` võtme kujul
`Authorization: Bearer <key>` ja lisab `tokentype: API_KEY`. Kvoodi- ja profiilipäringud
kasutavad sama tähist, et AWS käsitleks esitaja mandaati pika elueaga API-võtmena, mitte
OIDC- või suhtlusplatvormi juurdepääsutõendina.

---

## OIDC-kliendi aegumine

AWS SSO OIDC avalikud kliendid aeguvad tavaliselt 90 päeva pärast
(`clientSecretExpiresAt`). OmniRoute salvestab selle ajatempli jälgitavuse huvides
väljal `providerSpecificData`. Kui ühenduse värskendamine lakkab umbes 90 päeva pärast
töötamast, importige ühendus uuesti, et saada uus OIDC-kliendi registreering. Automaatne
uuesti registreerimine aegumise korral on kavandatud tulevase täiendusena.

API-võtmega ühendustel puudub OIDC-kliendi aegumistähtaeg, sest neid ei värskendata
AWS SSO OIDC kaudu.

---

## Tõrkeotsing

### Teine konto logitakse pidevalt välja

- Kontrollige mõlemat ühendust asukohas **Töölaud → Pakkujad** ja veenduge, et kummagi
  töötlemata JSON-is kuvatakse `clientId`, mille väärtus ei ole null (nähtav teabeikooni
  kaudu). Kui kummalgi ühendusel puudub `clientId`, imporditi see enne versiooni v3.8.0 —
  importige see uuesti.

### Importimine nurjub veateatega „Token validation failed”

- Veenduge, et värskendustõend algaks väärtusega `aorAAAAAG`.
- Veenduge, et OmniRoute pääseks juurde aadressile `https://oidc.us-east-1.amazonaws.com`
  (või seadistatud piirkonnale). Kui kasutate ettevõtte puhverserverit, määrake pakkuja
  tasemel puhverserver asukohas **Töölaud → Sätted → Puhverserverid**.

### API-võtme importimine nurjub

- Veenduge, et võti oleks Kiro / CodeWhispereri API-võti, mitte värskendustõend.
- Veenduge, et AWS-i piirkond vastaks võtmele/kontole. Vaikeväärtus on `us-east-1`.
- Võti peab saama kutsuda meetodit `ListAvailableProfiles`; vastasel juhul ei saa
  OmniRoute nõutavat väärtust `profileArn` lahendada.

Muude probleemide korral vaadake peamist faili [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
