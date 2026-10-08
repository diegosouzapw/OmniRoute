# Management Authentication (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute má **štyri rodiny poverení**, ktoré môžu autorizovať manažérske trasy.
Nie sú vzájomne zameniteľné. Kľúče Inference API (`sk-…`) **nespravujú**
server, pokiaľ im nebol explicitne udelený rozsah `manage` alebo `admin`.

Kanonická implementácia: `src/lib/api/requireManagementAuth.ts`.

| Poverenie                    | Typická forma                      | Vytvorené kde                                                | Zamýšľané použitie                  | Schopnosť správy                                                                      |
| :--------------------------- | :--------------------------------- | :----------------------------------------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------ |
| JWT relácia Dashboardu       | `auth_token` cookie                | Prihlásenie do Dashboardu                                    | Používateľské rozhranie prehliadača | Úplná správa dashboardu, podliehajúca pravidlám CSRF, lokality a vždy chránených trás |
| Token ID stroja CLI          | interné / lokálne                  | Bootstrap CLI (`omniroute` na rovnakom stroji)               | Lokálne CLI                         | Len lokálna správa                                                                    |
| Token s obmedzeným prístupom | `oma_live_…`                       | **Nastavenia → Prístupové tokeny** alebo `omniroute connect` | Vzdialené CLI a API správy          | Musí spĺňať požadovaný rozsah `read`, `write` alebo `admin` trasy                     |
| Kľúč Inference API           | `sk-…` (a iné predpony API kľúčov) | **Správca API / API kľúče**                                  | `/v1/*` inferencia                  | **Žiadna**, pokiaľ metadáta kľúča neobsahujú `manage` alebo `admin`                   |

Poverenia `oma_` sú poverenia pre správu/CLI. **Nie sú** kľúčmi Inference API.

Ak je prihlásenie/autentifikácia API kľúčom pre server zakázaná, niektoré manažérske trasy môžu
akceptovať neautentifikované volania. Trasy len pre lokálne použitie a vždy chránené trasy stále uplatňujú
svoje vlastné pravidlá. Predloženie jedného z týchto poverení preto nie je univerzálne
povinné a jeho vlastníctvo nie je univerzálne dostatočné bez požadovaného
rozsahu a lokality trasy.

Súvisiace: [Vzdialený režim](./REMOTE-MODE.md) (ako sa `oma_live_…` vytvára pre vzdialené CLI).

---

## Matice rozsahov

Rozsahy správy API kľúčov a rozsahy prístupových tokenov sú odlišné slovníky.
Rozsahy nástrojov MCP sú tretím slovníkom, kontrolovaným pomocou `scopeMatches` namiesto
ktorejkoľvek funkcie v tabuľkách nižšie. Vedľa seba:
[Tri menné priestory rozsahov](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Rozsahy prístupových tokenov (`oma_live_…`)

| Rozsah  | Typické operácie                                                                       |
| :------ | :------------------------------------------------------------------------------------- |
| `read`  | Zoznam/stav GET požiadaviek, ktoré token smie vidieť                                   |
| `write` | Mutácie (vytvorenie/aktualizácia/vymazanie) pod úrovňou admin                          |
| `admin` | Úplné vzdialené CLI / pripojovací token (predvolené nastavenia bootstrapu hesla sú tu) |

Token s `read` nemôže volať trasu `write`. Tvar správy za behu:
`Rozsah prístupového tokenu '<have>' je nedostatočný; vyžaduje sa '<need>'.`

### Rozsahy správy API kľúčov

| Rozsah   | Význam                                                                 |
| :------- | :--------------------------------------------------------------------- |
| (žiadny) | Len inferencia. Manažérske trasy vracajú 403.                          |
| `manage` | API správy (rovnaká brána ako vetva API kľúča `requireManagementAuth`) |
| `admin`  | Tiež spĺňa `hasManageScope` (považované za schopné správy)             |

Povoľte `manage` na kľúči v používateľskom rozhraní API kľúče / Správca API.
Nepoužívajte kľúč chatového klienta na automatizáciu, pokiaľ ste úmyselne neudelili tento rozsah.

---

## Ako vytvoriť a zrušiť

### JWT relácia palubnej dosky

1.  Otvorte `/login`, prihláste sa pomocou hesla pre správu (`INITIAL_PASSWORD` pri prvom spustení).
2.  Cookie `auth_token` je HttpOnly. Palubná doska prehliadača ju používa automaticky.
3.  Odhláste sa cez `/api/auth/logout`. Neexistuje žiadny dlhodobý tajný kľúč na skopírovanie.

### Token CLI machine-id

1.  Spustite `omniroute` na **rovnakom hostiteľovi** ako server (loopback).
2.  CLI inicializuje token machine-id pod `~/.omniroute/` (chmod 600).
3.  Toto **nefunguje** z iného stroja. Pre vzdialené CLI použite prístupový token.

### Prístupový token s rozsahom (`oma_live_…`)

1.  Palubná doska: **Nastavenia → Prístupové tokeny** → vytvoriť (názov + rozsah). **Tajný kľúč sa zobrazí iba raz.**
2.  Alebo CLI: `omniroute connect <host>` (heslo → token). Pozrite si [Vzdialený režim](./REMOTE-MODE.md).
3.  Hlavička: `Authorization: Bearer oma_live_…`
4.  Zrušte z rovnakej stránky Prístupových tokenov (alebo odstráňte kontext CLI).
5.  Server ukladá iba hash. S otvoreným textom zaobchádzajte ako s heslom.

### API kľúč s rozsahom správy

1.  Palubná doska: **Správca API / API kľúče** → vytvorte alebo upravte kľúč → povoľte `manage` (alebo `admin`).
2.  Hlavička: `Authorization: Bearer sk-…` (skutočná predpona kľúča).
3.  Zrušte alebo odstráňte `manage` v rovnakom používateľskom rozhraní.
4.  Najmenšie oprávnenia pre automatizáciu, ktorá nie je CLI: uprednostnite `read` prístupový token pre úlohy iba na čítanie (GET); použite `manage` na API kľúči iba vtedy, keď volajúci musí tiež komunikovať s `/v1` a správou.

---

## Formát hlavičky

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Neumiestňujte prihlasovacie údaje pre správu do cesty URL alebo reťazca dotazu. Overenie správy je iba v hlavičke/cookie.

---

## Príklady na kopírovanie a vkladanie

Iba na čítanie (zoznam poskytovateľov). Použite `read` prístupový token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Úprava (vytvorenie pripojenia poskytovateľa). Použite `write`/`admin` prístupový token alebo API kľúč s rozsahom správy:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferencie (nie správa). Obyčajný API kľúč, nevyžaduje sa `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuálne chyby za behu (neoznamujte tajné kľúče)

| Situácia                                        | Typický stav | Správa (vyčistená)                                                   |
| :---------------------------------------------- | :----------- | :------------------------------------------------------------------- |
| Žiadne poverenie                                | 401          | `Authentication required`                                            |
| Neplatný/expirovaný `oma_live_…`                | 401          | `Invalid or expired access token`                                    |
| Platný API kľúč bez `manage`/`admin`            | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Neplatný obyčajný API kľúč na manažérskej trase | 403          | `Invalid management token`                                           |
| Rozsah prístupového tokenu je príliš nízky      | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ znamená, že nositeľ **nebol** prijatý ako poverenie pre správu. **Nehovorí** vám, ktorú rodinu tokenov máte vytvoriť. Použite vyššie uvedenú tabuľku: inferenčné kľúče potrebujú rozsah `manage`; vzdialené CLI potrebuje `oma_live_…`; palubná doska používa reláciu cookie.

## Odporúčaná voľba s najmenšími oprávneniami

| Volajúci                                          | Použitie                                         |
| :------------------------------------------------ | :----------------------------------------------- |
| Prehliadač                                        | Dashboard session                                |
| CLI na hostiteľskom serveri                       | Machine token                                    |
| CLI na laptope komunikujúce s vzdialeným serverom | `oma_live_…` z `omniroute connect`               |
| CI / skripty (len správa)                         | `oma_live_…` s najmenším rozsahom, ktorý funguje |
| CI, ktoré musí volať `/v1` aj `/api`              | API key s `manage` **alebo** dvoma povereniami   |
