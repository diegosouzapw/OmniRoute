# Management Authentication (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute má **štyri skupiny prihlasovacích údajov**, ktoré môžu autorizovať trasy správy.
Nie sú vzájomne zameniteľné. Kľúče inferenčného API (`sk-…`) **nespravujú**
server, pokiaľ im nebol explicitne udelený rozsah `manage` alebo `admin`.

Kanonická implementácia: `src/lib/api/requireManagementAuth.ts`.

| Prihlasovací údaj              | Typický tvar                          | Kde sa vytvára                                               | Zamýšľané použitie             | Možnosti správy                                                                                                 |
| ------------------------------ | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Relácia JWT ovládacieho panela | súbor cookie `auth_token`             | Prihlásenie do ovládacieho panela                            | Webové používateľské rozhranie | Úplná správa prostredníctvom ovládacieho panela, podliehajúca pravidlám CSRF, lokálnosti a vždy chránených trás |
| Token ID zariadenia CLI        | interný/lokálny                       | Úvodné nastavenie CLI (`omniroute` na tom istom zariadení)   | Lokálne CLI                    | Iba lokálna správa                                                                                              |
| Prístupový token s rozsahom    | `oma_live_…`                          | **Nastavenia → Prístupové tokeny** alebo `omniroute connect` | Vzdialené CLI a API správy     | Musí spĺňať požadovaný rozsah trasy `read`, `write` alebo `admin`                                               |
| Kľúč inferenčného API          | `sk-…` (a ďalšie predpony kľúčov API) | **Správca API / Kľúče API**                                  | Inferencia `/v1/*`             | **Žiadne**, pokiaľ metadáta kľúča neobsahujú `manage` alebo `admin`                                             |

Prihlasovacie údaje `oma_` sú prihlasovacie údaje pre správu/CLI. **Nie sú** kľúčmi inferenčného API.

Ak je prihlasovanie alebo autentifikácia pomocou kľúča API pre server zakázaná, niektoré trasy správy môžu
prijímať neautentifikované volania. Trasy obmedzené iba na lokálny prístup a vždy chránené trasy naďalej uplatňujú
vlastné pravidlá. Predloženie jedného z týchto prihlasovacích údajov preto nie je všeobecne
povinné a jeho vlastníctvo nie je bez požadovaného rozsahu a lokálnosti trasy všeobecne
postačujúce.

Súvisiace: [Vzdialený režim](./REMOTE-MODE.md) (ako sa vytvára `oma_live_…` pre vzdialené CLI).

---

## Matice rozsahov

Tieto dva slovníky rozsahov sú **odlišné**. Nekombinujte ich.

### Rozsahy prístupových tokenov (`oma_live_…`)

| Rozsah  | Typické operácie                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| `read`  | Výpisy a stavové požiadavky GET, ktoré môže token zobraziť                                                    |
| `write` | Zmeny (vytvorenie/aktualizácia/odstránenie) pod úrovňou správcu                                               |
| `admin` | Úplný prístup vzdialeného CLI/pripájacieho tokenu (úvodné nastavenie pomocou hesla ho používa ako predvolený) |

Token s rozsahom `read` nemôže volať trasu `write`. Tvar správy za behu:
`Rozsah prístupového tokenu '<have>' je nedostatočný; vyžaduje sa '<need>'.`

### Rozsahy správy kľúčov API

| Rozsah   | Význam                                                                         |
| -------- | ------------------------------------------------------------------------------ |
| (žiadny) | Iba inferencia. Trasy správy vracajú 403.                                      |
| `manage` | API správy (rovnaká brána ako vetva kľúča API funkcie `requireManagementAuth`) |
| `admin`  | Spĺňa aj `hasManageScope` (považuje sa za spôsobilý na správu)                 |

Povoľte pre kľúč rozsah `manage` v používateľskom rozhraní Kľúče API/Správca API. Nepoužívajte opakovane
kľúč klienta chatu na automatizáciu, pokiaľ ste mu tento rozsah neudelili zámerne.

---

## Ako vytvárať a odvolávať

### Relácia JWT ovládacieho panela

1. Otvorte `/login` a prihláste sa pomocou hesla správy (`INITIAL_PASSWORD` pri prvom spustení).
2. Súbor cookie `auth_token` má príznak HttpOnly. Ovládací panel v prehliadači ho používa automaticky.
3. Odhláste sa prostredníctvom `/api/auth/logout`. Nie je potrebné kopírovať žiadny dlhodobý tajný údaj.

### Token ID zariadenia CLI

1. Spustite `omniroute` na **rovnakom hostiteľovi** ako server (slučka spätnej väzby).
2. CLI vytvorí token ID zariadenia v adresári `~/.omniroute/` (chmod 600).
3. Z iného zariadenia to **nefunguje**. Pre vzdialené CLI použite prístupový token.

### Prístupový token s rozsahom (`oma_live_…`)

1. Ovládací panel: **Nastavenia → Prístupové tokeny** → vytvoriť (názov + rozsah). **Tajný údaj sa zobrazí iba raz.**
2. Alebo CLI: `omniroute connect <host>` (heslo → token). Pozrite si [Vzdialený režim](./REMOTE-MODE.md).
3. Hlavička: `Authorization: Bearer oma_live_…`
4. Odvolajte ho na rovnakej stránke Prístupové tokeny (alebo odstráňte kontext CLI).
5. Server ukladá iba haš. S textom v otvorenej podobe zaobchádzajte ako s heslom.

### Kľúč API s rozsahom správy

1. Ovládací panel: **Správca API / Kľúče API** → vytvoriť alebo upraviť kľúč → povoliť `manage` (alebo `admin`).
2. Hlavička: `Authorization: Bearer sk-…` (skutočná predpona kľúča).
3. Odvolajte kľúč alebo odstráňte rozsah `manage` v rovnakom používateľskom rozhraní.
4. Pre automatizáciu, ktorá nie je CLI, používajte zásadu najmenších oprávnení: pri úlohách využívajúcich iba GET uprednostnite prístupový token s rozsahom `read`; rozsah `manage` na kľúči API používajte iba vtedy, keď volajúci musí komunikovať s `/v1` aj so správou.

---

## Formát hlavičky

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Neuvádzajte prihlasovacie údaje na správu v ceste URL ani v reťazci dopytu. Overovanie pre správu sa vykonáva iba prostredníctvom hlavičky alebo súboru cookie.

---

## Príklady na skopírovanie a vloženie

Iba na čítanie (zobrazenie zoznamu poskytovateľov). Použite prístupový token s oprávnením `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Úprava (vytvorenie pripojenia k poskytovateľovi). Použite prístupový token s oprávnením `write`/`admin` alebo API kľúč s rozsahom `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferencia (nie správa). Bežný API kľúč, oprávnenie `manage` sa nevyžaduje:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuálne chyby za behu (nezobrazujte tajné údaje)

| Situácia                                        | Typický stav | Správa (bez citlivých údajov)                                                |
| ----------------------------------------------- | ------------ | ---------------------------------------------------------------------------- |
| Chýbajúce prihlasovacie údaje                   | 401          | `Vyžaduje sa overenie`                                                       |
| Neplatný/expirovaný token `oma_live_…`          | 401          | `Neplatný alebo expirovaný prístupový token`                                 |
| Platný API kľúč bez oprávnenia `manage`/`admin` | 403          | `API kľúč nemá rozsah 'manage'. Povoľte ho na ovládacom paneli API kľúčov.`  |
| Neplatný bežný API kľúč na trase správy         | 403          | `Neplatný token správy`                                                      |
| Nedostatočný rozsah prístupového tokenu         | 403          | `Rozsah prístupového tokenu '<have>' je nedostatočný; vyžaduje sa '<need>'.` |

„Neplatný token správy“ znamená, že nosný token **nebol** prijatý ako prihlasovací údaj na správu. Neurčuje, ktorý typ prihlasovacích údajov máte vytvoriť. Použite tabuľku vyššie: inferenčné kľúče potrebujú rozsah `manage`; vzdialené CLI potrebuje `oma_live_…`; ovládací panel používa súbor cookie relácie.

---

## Odporúčaná voľba s najmenšími oprávneniami

| Volajúci                                              | Použitie                                                       |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| Prehliadač                                            | Relácia ovládacieho panela                                     |
| CLI na hostiteľskom serveri                           | Token zariadenia                                               |
| CLI na notebooku komunikujúcom so vzdialeným serverom | `oma_live_…` z `omniroute connect`                             |
| CI / skripty (iba správa)                             | `oma_live_…` s najmenším funkčným rozsahom                     |
| CI, ktoré musí volať `/v1` aj `/api`                  | API kľúč s rozsahom `manage` **alebo** dva prihlasovacie údaje |
