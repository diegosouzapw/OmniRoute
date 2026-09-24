# Kiro Setup Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Ta vodnik opisuje dodajanje računov Kiro (pomočnika za programiranje z umetno inteligenco, ki ga gosti AWS) v OmniRoute,
s poudarkom na hkratni uporabi več računov brez konfliktov sej.

---

## Ozadje: zakaj lahko prihaja do konfliktov med računi Kiro

Zaledje Kiro uporablja registracije odjemalcev AWS SSO OIDC za sledenje aktivnim sejam.
Ključna omejitev: **vsaka registracija odjemalca OIDC podpira samo eno aktivno
sejo hkrati**. Ko se druga naprava ali uporabnik overi z uporabo istega
registriranega odjemalca, zaledje razveljavi osvežitveni žeton prvega računa.

Gre za isti mehanizem, ki povzroča težave pri izvajanju `kiro-cli login` v
računalniku, v katerem je že prijavljen drug račun Kiro — nova prijava prekliče
žeton prvega računa.

---

## Kako OmniRoute rešuje to težavo (v3.8.0+)

Od različice v3.8.0 dalje OmniRoute med vsakim uvozom povezave Kiro pokliče `registerClient()`
(AWS SSO OIDC). Tako vsaka povezava OmniRoute prejme lastno namensko registracijo odjemalca
OIDC. Ker je vsaka registracija odjemalca neodvisna, osveževanje ali
ponovno overjanje enega računa ne vpliva na osvežitveni žeton nobenega drugega računa.

Izolacija velja za načine uvoza z osvežitvenim žetonom, overjanje s ključem API pa se
sejam osveževanja OIDC v celoti izogne:

| Način uvoza                                       | Stanje izolacije                                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| AWS Builder ID / tok kode naprave IDC             | Izolirano od uvedbe toka kode naprave                                                                                    |
| **Uvoz žetona** (ročni vnos osvežitvenega žetona) | Izolirano od v3.8.0                                                                                                      |
| **Družabna prijava z Google / GitHub**            | Izolirano od v3.8.0                                                                                                      |
| **Samodejni uvoz** (SQLite za kiro-cli)           | Izolirano od v3.8.0 (pot SQLite je bila že izolirana; nadomestna uporaba predpomnilnika SSO je zdaj prav tako izolirana) |
| **Ključ API** (dolgotrajni ključ CodeWhisperer)   | Brez seje osveževanja; ključ je preverjen in shranjen kot poverilnica nosilca                                            |

---

## Opomba o selitvi za povezave, ustvarjene pred v3.8.0

Povezave, uvožene pred v3.8.0, nimajo namenske registracije odjemalca OIDC,
shranjene v `providerSpecificData`. Te povezave še naprej delujejo, vendar uporabljajo skupno
končno točko družabnega overjanja za osveževanje, kar pomeni, da se lahko dve takšni povezavi še vedno medsebojno
razveljavita.

**Za zagotovitev izolacije:** izbrišite staro povezavo prek **Nadzorna plošča → Ponudniki** in
jo znova uvozite z uporabo katerega koli od podprtih postopkov uvoza. Vse novo ustvarjene povezave bodo
samodejno prejele lastno registracijo odjemalca.

---

## Dodajanje dveh računov Kiro enega ob drugem

### Predpogoji

- OmniRoute v3.8.0 ali novejša različica.
- Delujoč račun Kiro (e-poštni naslov + geslo ali prijava z Google oziroma GitHub).
- Po želji še drugi račun Kiro.

### 1. korak: uvoz prvega računa

1. Odprite **Nadzorna plošča → Ponudniki → Dodaj ponudnika → Kiro**.
2. Izberite eno od naslednjih možnosti:
   - **Uvoz žetona** — prilepite osvežitveni žeton, ki se začne z `aorAAAAAG`.
   - **Ključ API** — prilepite dolgotrajni ključ API za Kiro / CodeWhisperer.
   - **Prijava z Google / GitHub** — dokončajte postopek OAuth v brskalniku.
   - **Samodejni uvoz** — kliknite gumb; OmniRoute prebere poverilnice iz
     lokalne podatkovne zbirke kiro-cli ali `~/.aws/sso/cache`.
3. Povezava se shrani. Postopki z osvežitvenimi žetoni samodejno registrirajo namenskega
   odjemalca OIDC. Postopki s ključi API preverijo ključ pri AWS in ne shranijo osvežitvenega žetona.

### 2. korak: uvoz drugega računa

Ponovite 1. korak za drugi račun. Ker vsak uvoz ustvari ločeno registracijo odjemalca
OIDC, sta povezavi popolnoma izolirani.

### 3. korak: preverjanje, ali sta obe povezavi aktivni

1. **Nadzorna plošča → Ponudniki** — obe povezavi Kiro bi morali imeti stanje **Aktivno**.
2. **Nadzorna plošča → Stanje sistema** — obe povezavi bi morali uspešno prestati preverjanje veljavnosti žetona.

### 4. korak: uporaba kombinacije za usmerjanje med računoma

Ustvarite kombinacijo z obema povezavama kot ciljema za uravnoteženje obremenitve ali preklop ob napaki med njima:

```
kiro/kiro-dev → kiro/kiro-pro
```

Za konfiguracijo kombinacij glejte [FEATURES.md](./FEATURES.md) in dokumentacijo o usmerjanju.

---

## Uporabniki Enterprise / IDC

Za račune AWS IAM Identity Center (IDC) uporabite postopek s **kodo naprave AWS Builder ID / IDC** na strani **Nadzorna plošča → Ponudniki → Kiro → Koda naprave**. Postopek s kodo naprave je bil vedno popolnoma izoliran. Za te povezave ponovni uvoz ni potreben.

Uporabniki Enterprise, ki delujejo v AWS-regiji, ki ni privzeta, lahko regijo določijo pri uvozu prek API-ja Import Token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Če je polje `region` izpuščeno, je njegova privzeta vrednost `us-east-1`.

---

## Postopek uvoza API-ključa

Preverjanje pristnosti z API-ključem je namenjeno dolgoročno veljavnim poverilnicam nosilca Kiro / AWS CodeWhisperer. Ne uporablja osveževanja OAuth, zato se izogne razveljavitvi skupne seje OIDC.

### Nadzorna plošča

1. Odprite **Nadzorna plošča -> Ponudniki -> Kiro**.
2. Izberite **API-ključ**.
3. Prilepite API-ključ in po želji navedite AWS-regijo (privzeto `us-east-1`).
4. OmniRoute preveri veljavnost ključa in shrani povezavo.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Notranja pogodba

Pot API preveri veljavnost ključa s klicem `KiroService.validateApiKey()`, ki uporabi `ListAvailableProfiles` proti končni točki CodeWhisperer/Amazon Q, ki ustreza regiji, in razreši `profileArn`.

Shranjena povezava uporablja:

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

Med izvajanjem `KiroExecutor.buildHeaders()` pošlje ključ kot `Authorization: Bearer <key>` in doda `tokentype: API_KEY`. Klici za kvoto/profil uporabljajo isto oznako, zato AWS poverilnico nosilca obravnava kot dolgoročno veljaven API-ključ in ne kot dostopni žeton OIDC ali družbenega ponudnika.

---

## Potek veljavnosti odjemalca OIDC

Javni odjemalci AWS SSO OIDC običajno potečejo po 90 dneh (`clientSecretExpiresAt`). OmniRoute ta časovni žig shrani v `providerSpecificData` zaradi opazljivosti. Če se povezava po približno 90 dneh preneha osveževati, jo znova uvozite, da pridobite novo registracijo odjemalca OIDC. Samodejna ponovna registracija ob poteku veljavnosti je načrtovana kot prihodnja izboljšava.

Povezave z API-ključem nimajo poteka veljavnosti odjemalca OIDC, ker se ne osvežujejo prek AWS SSO OIDC.

---

## Odpravljanje težav

### Drugi račun se nenehno odjavlja

- Preverite obe povezavi na strani **Nadzorna plošča → Ponudniki** in potrdite, da je pri vsaki v neobdelanem JSON-u prikazan `clientId`, ki ni `null` (vidno prek ikone za informacije). Če pri kateri koli povezavi manjka `clientId`, je bila uvožena pred različico v3.8.0 — znova jo uvozite.

### Uvoz ne uspe z napako »Preverjanje veljavnosti žetona ni uspelo«

- Prepričajte se, da se osvežitveni žeton začne z `aorAAAAAG`.
- Prepričajte se, da lahko OmniRoute doseže `https://oidc.us-east-1.amazonaws.com` (ali konfigurirano regijo). Če ste za posredniškim strežnikom podjetja, nastavite posredniški strežnik na ravni ponudnika na strani **Nadzorna plošča → Nastavitve → Posredniški strežniki**.

### Uvoz API-ključa ne uspe

- Preverite, ali je ključ API-ključ Kiro / CodeWhisperer in ne osvežitveni žeton.
- Preverite, ali se AWS-regija ujema s ključem/računom. Privzeta regija je `us-east-1`.
- Ključ mora omogočati klic `ListAvailableProfiles`; sicer OmniRoute ne more razrešiti zahtevanega `profileArn`.

Za druge težave glejte glavno datoteko [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
