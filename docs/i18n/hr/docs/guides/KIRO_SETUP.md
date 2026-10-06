# Kiro Setup Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Ovaj vodič opisuje dodavanje računa za Kiro (AI pomoćnika za programiranje koji se izvršava na AWS-u) u OmniRoute,
s naglaskom na istodobnu upotrebu više računa bez sukoba sesija.

---

## Pozadina: zašto može doći do sukoba između računa za Kiro

Pozadinski sustav usluge Kiro koristi registracije klijenata za AWS SSO OIDC kako bi pratio aktivne sesije.
Ključno ograničenje: **svaka registracija OIDC klijenta podržava samo jednu aktivnu
sesiju istodobno**. Kada se drugi uređaj ili korisnik autentificira putem istog
registriranog klijenta, pozadinski sustav poništava token za osvježavanje prvog računa.

To je isti mehanizam koji uzrokuje probleme pri izvršavanju naredbe `kiro-cli login` na
računalu na kojem je već prijavljen drugi Kiro račun — nova prijava opoziva token
prvog računa.

---

## Kako OmniRoute rješava ovaj problem (v3.8.0+)

Počevši od v3.8.0, OmniRoute poziva `registerClient()` (AWS SSO OIDC) tijekom svakog
uvoza Kiro veze. Time svaka OmniRoute veza dobiva vlastitu namjensku registraciju OIDC
klijenta. Budući da je svaka registracija klijenta neovisna, osvježavanje ili
ponovna autentifikacija jednog računa ne utječe na token za osvježavanje bilo kojeg drugog računa.

Izolacija se primjenjuje na metode uvoza tokena za osvježavanje, dok autentifikacija API ključem
u potpunosti izbjegava OIDC sesije osvježavanja:

| Metoda uvoza                                               | Status izolacije                                                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Tijek koda uređaja za AWS Builder ID / IDC                 | Izolirano od uvođenja tijeka koda uređaja                                                                        |
| **Uvoz tokena** (ručno lijepljenje tokena za osvježavanje) | Izolirano od v3.8.0                                                                                              |
| **Društvena prijava putem Googlea / GitHuba**              | Izolirano od v3.8.0                                                                                              |
| **Automatski uvoz** (kiro-cli SQLite)                      | Izolirano od v3.8.0 (SQLite put već je bio izoliran; pričuvna opcija SSO predmemorije sada je također izolirana) |
| **API ključ** (dugotrajni CodeWhisperer ključ)             | Nema sesije osvježavanja; ključ se provjerava i pohranjuje kao vjerodajnica nositelja                            |

---

## Napomena o migraciji veza stvorenih prije v3.8.0

Veze uvezene prije v3.8.0 nemaju namjensku registraciju OIDC klijenta
pohranjenu u `providerSpecificData`. Te veze nastavljaju raditi, ali koriste zajedničku
krajnju točku za osvježavanje društvene autentifikacije, što znači da dvije takve veze i dalje mogu
međusobno poništavati tokene.

**Za postizanje izolacije:** izbrišite staru vezu putem **Nadzorna ploča → Pružatelji usluga** i
ponovno je uvezite koristeći bilo koji od podržanih tijekova uvoza. Sve novostvorene veze
automatski će dobiti vlastitu registraciju klijenta.

---

## Dodavanje dvaju Kiro računa jednog uz drugi

### Preduvjeti

- OmniRoute v3.8.0 ili noviji.
- Aktivan Kiro račun (e-pošta + lozinka ili prijava putem Googlea ili GitHuba).
- Po želji, drugi Kiro račun.

### Korak 1: uvezite prvi račun

1. Otvorite **Nadzorna ploča → Pružatelji usluga → Dodaj pružatelja usluga → Kiro**.
2. Odaberite jednu od sljedećih mogućnosti:
   - **Uvoz tokena** — zalijepite token za osvježavanje koji počinje s `aorAAAAAG`.
   - **API ključ** — zalijepite dugotrajni Kiro / CodeWhisperer API ključ.
   - **Prijava putem Googlea / GitHuba** — dovršite OAuth tijek u pregledniku.
   - **Automatski uvoz** — kliknite gumb; OmniRoute čita vjerodajnice iz
     lokalne baze podataka alata kiro-cli ili iz `~/.aws/sso/cache`.
3. Veza se sprema. Tijekovi tokena za osvježavanje automatski registriraju namjenski
   OIDC klijent. Tijekovi API ključa provjeravaju ključ putem AWS-a i ne pohranjuju token za osvježavanje.

### Korak 2: uvezite drugi račun

Ponovite 1. korak za drugi račun. Budući da svaki uvoz stvara zasebnu registraciju OIDC
klijenta, te su dvije veze potpuno izolirane.

### Korak 3: provjerite jesu li obje veze aktivne

1. **Nadzorna ploča → Pružatelji usluga** — obje Kiro veze trebaju imati status **Aktivno**.
2. **Nadzorna ploča → Stanje sustava** — obje veze trebaju proći provjeru ispravnosti tokena.

### Korak 4: upotrijebite kombinaciju za usmjeravanje između računa

Stvorite kombinaciju s objema vezama kao odredištima radi uravnoteženja opterećenja ili prebacivanja na pričuvnu vezu između njih:

```
kiro/kiro-dev → kiro/kiro-pro
```

Za konfiguraciju kombinacija pogledajte [FEATURES.md](./FEATURES.md) i dokumentaciju o usmjeravanju.

---

## Poslovni / IDC korisnici

Za račune AWS IAM Identity Center (IDC) upotrijebite tijek **AWS Builder ID / IDC koda uređaja**
putem **Nadzorna ploča → Pružatelji usluga → Kiro → Kod uređaja**. Tijek koda uređaja
oduvijek je bio potpuno izoliran. Za te veze nije potreban ponovni uvoz.

Poslovni korisnici koji rade u AWS regiji koja nije zadana mogu navesti regiju pri
uvozu putem API-ja za uvoz tokena:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Ako se izostavi, polje `region` zadano je postavljeno na `us-east-1`.

---

## Tijek uvoza API ključa

Autentifikacija API ključem namijenjena je dugotrajnim vjerodajnicama nositelja za Kiro / AWS CodeWhisperer. Ona
ne upotrebljava osvježavanje OAuth-a, čime se izbjegava poništavanje dijeljene OIDC sesije.

### Nadzorna ploča

1. Otvorite **Nadzorna ploča -> Pružatelji usluga -> Kiro**.
2. Odaberite **API ključ**.
3. Zalijepite API ključ i neobaveznu AWS regiju (zadano je `us-east-1`).
4. OmniRoute provjerava valjanost ključa i sprema vezu.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Interni ugovor

API ruta provjerava valjanost ključa pozivom metode `KiroService.validateApiKey()`, koja
upotrebljava `ListAvailableProfiles` na krajnjoj točki CodeWhisperer/Amazon Q koja odgovara
regiji i određuje `profileArn`.

Spremljena veza upotrebljava:

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

Tijekom izvođenja `KiroExecutor.buildHeaders()` šalje ključ kao
`Authorization: Bearer <key>` i dodaje `tokentype: API_KEY`. Pozivi za kvotu/profil
upotrebljavaju istu oznaku kako bi AWS nositelja tretirao kao dugotrajni API ključ, a ne
kao OIDC ili društveni pristupni token.

---

## Istek OIDC klijenta

Javni klijenti AWS SSO OIDC-a obično istječu nakon 90 dana
(`clientSecretExpiresAt`). OmniRoute pohranjuje ovu vremensku oznaku u `providerSpecificData`
radi praćenja. Ako se veza prestane osvježavati nakon približno 90 dana, ponovno
je uvezite kako biste dobili novu registraciju OIDC klijenta. Automatska ponovna registracija
nakon isteka planirana je kao buduće poboljšanje.

Veze s API ključem nemaju istek OIDC klijenta jer se ne osvježavaju
putem AWS SSO OIDC-a.

---

## Otklanjanje poteškoća

### Drugi se račun stalno odjavljuje

- Provjerite obje veze u odjeljku **Nadzorna ploča → Pružatelji usluga** i potvrdite da svaka u svojem neobrađenom
  JSON-u prikazuje vrijednost `clientId` koja nije null (vidljivo putem ikone za informacije). Ako bilo kojoj vezi nedostaje
  `clientId`, uvezena je prije v3.8.0 — ponovno je uvezite.

### Uvoz ne uspijeva uz poruku "Provjera valjanosti tokena nije uspjela"

- Provjerite počinje li token za osvježavanje s `aorAAAAAG`.
- Provjerite može li OmniRoute pristupiti adresi `https://oidc.us-east-1.amazonaws.com` (ili konfiguriranoj
  regiji). Ako se nalazite iza korporacijskog proxyja, postavite proxy na razini pružatelja usluga u
  odjeljku **Nadzorna ploča → Postavke → Proxyji**.

### Uvoz API ključa ne uspijeva

- Potvrdite da je ključ API ključ za Kiro / CodeWhisperer, a ne token za osvježavanje.
- Potvrdite da AWS regija odgovara ključu/računu. Zadana je vrijednost `us-east-1`.
- Ključ mora moći pozvati `ListAvailableProfiles`; u suprotnom OmniRoute ne može
  odrediti potrebni `profileArn`.

Za ostale poteškoće pogledajte glavnu datoteku [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
