# Subscription-first routing (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Două ID-uri `auto/*` noi — `auto/subscription` și `auto/thrifty`. Ambele sunt activate explicit prin
> solicitare: nimic nu este rutat prin ele decât dacă un apelant solicită ID-ul după nume și nu se
> modifică niciun pool, nicio strategie și nicio valoare implicită existentă.

## De ce există această funcționalitate

OmniRoute răspunde deja la două întrebări despre costuri, dar niciuna nu este cea pe care o pun majoritatea operatorilor.

| Mecanism existent                                        | Răspunde la întrebarea                             |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „este acest model catalogat ca gratuit?”           |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „mă poate taxa vreodată această conexiune?”        |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „este această conexiune aproape de limita sa?”     |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „limitează cheltuielile, treci la cea mai ieftină” |

Fiecare mecanism exclusiv gratuit **eșuează în mod închis** — un pool gratuit epuizat devine un pool gol, niciodată
un pas către o opțiune cu plată — iar fiecare mecanism pentru opțiunile cu plată nu ține cont de nivel.
Niciunul nu răspunde la:

> „Folosește cota pentru care plătesc deja. Când se epuizează, fie oprește-te, fie urcă succesiv câte o
> treaptă prin cele mai ieftine opțiuni cu plată — și revino imediat ce cota se resetează.”

## Facturarea este o proprietate a conexiunii, nu a modelului

`classifyTier()` (`open-sse/services/tierResolver.ts`) folosește cheia `(provider, model)` și returnează
`free | cheap | premium` pe baza prețurilor din catalog. Însă faptul că o solicitare generează costuri suplimentare
depinde de **conexiunea care o deservește**: același model este inclus în abonament printr-o conexiune OAuth Claude Code
și facturat per token printr-o conexiune cu cheie API.

`provider_connections.auth_type` nu este un indicator sigur în niciun sens — există conexiuni OAuth
contorizate și există conexiuni cu cheie API incluse în abonament (un token asociat unui abonament Copilot nu este o
cheie API contorizată). Prin urmare, clasa de facturare provine dintr-un **catalog gestionat manual**,
`open-sse/config/connectionBillingCatalog.ts`, configurat manual pe baza condițiilor publicate de fiecare furnizor —
același tipar deja stabilit de `FreeModelBudget.hardStopGuaranteed` pentru modelele gratuite.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ordinea de rezoluție (`autoCombo/connectionBilling.ts`): santinela sintetică fără autentificare →
`keyless`; o intrare din catalog care corespunde furnizorului **și** valorii `authType`; o intrare valabilă
pentru întregul furnizor; în caz contrar, `unknown`. **Ceea ce nu este gestionat în catalog nu este gratuit** —
`unknown` este tratat drept `metered` peste tot, astfel încât un furnizor adăugat mâine începe în afara treptei
de abonament și trebuie inclus în mod deliberat în catalog.

## Modelul treptelor

Cinci trepte, în ordinea escaladării. Ele diferă prin mai mult decât prețul — fiecare are propriul
**semnal de epuizare**, motiv pentru care aceasta nu este doar o sortare.

| #   | Treaptă        | Apartenență                                           | Epuizată când                                   |
| --- | -------------- | ----------------------------------------------------- | ----------------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` gestionat în catalog        | fereastra cotei este la/sub pragul-limită       |
| 1   | `keyless`      | calea sintetică fără autentificare                    | expirarea temporară / întrerupătorul conexiunii |
| 2   | `free`         | conexiune contorizată, `classifyTier() === "free"`    | alocarea gratuită este epuizată                 |
| 3   | `cheap`        | conexiune contorizată, `classifyTier() === "cheap"`   | bugetul per treaptă este consumat               |
| 4   | `premium`      | conexiune contorizată, `classifyTier() === "premium"` | bugetul per treaptă este consumat               |

Treptele 0-2 se epuizează în funcție de **cotă**, care este observabilă și deja monitorizată. Treptele 3-4 nu au
cotă — o conexiune cu plată deservește solicitări la nesfârșit — astfel că singurul lor semnal rezonabil de epuizare
este un **buget** per treaptă. Fără acesta, „escaladează când opțiunea ieftină este epuizată” nu are niciun declanșator.

## `auto/subscription` — închidere în caz de eroare

Pool = doar treapta 0, limitat la conexiunile al căror consum peste limită este un `hard-stop` documentat, fiecare fiind verificată în timp real pentru a confirma că mai are cotă disponibilă. Tot ce este ambiguu este exclus: un furnizor nevalidat, o valoare a cotei care nu poate fi verificată, o valoare perimată sau un consum peste limită care este contorizat contra cost.

Un pool gol este răspunsul **intenționat**, nu un defect — calea existentă a apelantului pentru un pool gol îl transformă într-o eroare clară, în locul unei alternative silențioase și facturabile. Aceasta este întreaga promisiune a id-ului.

În mod deliberat, `keyless` **nu** se califică: această grupare înseamnă „planul pentru care plătesc”, așadar un backend fără autentificare nu îi aparține. Utilizați `auto/thrifty` (sau `auto/best-free`) în acest scop.

### Siguranța conexiunilor

Un candidat nu este întotdeauna legat de o singură conexiune — un candidat logic conține o listă de permisiuni `allowedConnectionIds`, iar contul utilizat efectiv este ales ulterior, la expediere, de `open-sse/services/combo/autoStrategy.ts`. Prin urmare, ambele grupări verifică **fiecare conexiune în mod individual** și rescriu `allowedConnectionIds` astfel încât să conțină exact submulțimea rămasă — niciodată lista originală completă și niciodată un membru ales arbitrar. Deoarece `autoStrategy.ts` impune deja acel tablou ca listă strictă de permisiuni, rescrierea sa aici face ca mulțimea conexiunilor „verificate” să fie, prin construcție, aceeași cu mulțimea conexiunilor „utilizate efectiv”. Aceasta este aceeași invariantă și același raționament ca în [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — escaladare treaptă cu treaptă

Pool = toate treptele, ordonate după indicele treptei, cu candidații epuizați excluși. Motorul `auto` continuă să calculeze scorurile **în cadrul** pool-ului rămas: scara decide ce trepte intră în calcul, iar evaluarea prin scor decide ce candidat câștigă în interiorul lor. Ordinea este stabilă în cadrul unei trepte, astfel încât clasamentul propriu al evaluatorului nu este niciodată reordonat de această suprapunere.

Aceasta este o suprapunere de ordonare + filtrare, **nu** un nou dispecer: bucla speculativă din `combo.ts` parcurge deja țintele în ordine și trece mai departe în caz de eșec, astfel încât epuizarea din timpul execuției, nedetectată de verificarea preliminară, determină în continuare escaladarea la treapta următoare în cadrul aceleiași solicitări.

În timp ce `auto/subscription` se închide **în caz de eroare**, `auto/thrifty` rămâne **deschis**: o conexiune inclusă în plan, pentru care nu există o valoare utilizabilă a cotei, este totuși încercată prima. Încercarea sa nu costă nimic, iar dacă se dovedește a fi epuizată, continuarea automată ajunge oricum la treapta următoare — în timp ce refuzul de a o încerca ar trimite solicitarea către o treaptă cu plată din cauza lipsei telemetriei, exact rezultatul pe care această grupare există pentru a-l evita.

## Revenirea la plan după o resetare

Trei lucruri independente trebuie să expire înainte ca rutarea să revină la treapta 0. Remedierea unuia singur lasă scara blocată pe trepte cu plată mult timp după realimentarea planului.

1. **Cache-ul stării cotei** — `freeAccessQuota.ts` memorează în cache pentru fiecare `(provider, connection)`, cu un TTL de 180s. O intrare din cache al cărei `resetAt` a trecut deja descrie o fereastră care nu mai există, așadar este acum considerată perimată **indiferent de vechime** și forțează o reîmprospătare. Fără acest comportament, un plan realimentat la miezul nopții continuă să fie raportat drept epuizat până când expiră TTL-ul.
2. **Starea proprie a scării** — prin proiectare, nu există niciuna. Eligibilitatea treptelor este recalculată din starea actuală a cotei la fiecare construire a pool-ului; nu există nicio înregistrare persistentă de tipul „în prezent pe treapta 3” care ar putea supraviețui unei resetări și bloca rutarea.
3. **Perioada de așteptare a conexiunii** — răspunsul 429 care indică epuizarea setează `rateLimitedUntil` pe baza unui backoff exponențial, care, pentru o conexiune a planului, poate depăși momentul real al resetării. `clampCooldownToReset()` (`subscriptionLadder.ts`) limitează perioada de așteptare la momentul resetării furnizat de serviciul din amonte și nu o poate prelungi niciodată. **Este implementată și testată, dar nu este încă integrată**: cache-ul cotei este invalidat în `src/sse/services/auth.ts` _înainte_ de scrierea oricărei perioade de așteptare, astfel încât `resetAt` trebuie capturat mai devreme în acea funcție — o modificare a căii critice de reziliență care trebuie să facă obiectul propriului PR revizuit. Până atunci, reintrarea așteaptă expirarea perioadei de așteptare a conexiunii (care deja preferă indicațiile `Retry-After` din amonte atunci când furnizorul le trimite).

### Prevenirea oscilațiilor

O treaptă care tocmai a fost resetată este readmisă numai peste `reentryMinRemainingPercent` (implicit 5), în timp ce o conexiune deja în uz trebuie doar să rămână peste `exitCutoffPercent` (implicit 2, în concordanță cu `quotaPreflight.defaultThresholdPercent`). Diferența reprezintă banda de histerezis — fără ea, o conexiune care oscilează în jurul pragului ar comuta între trepte la solicitări consecutive.

## Configurare

Doar ajustări. În mod deliberat **nu** există niciun flag `enabled`: un comutator capabil să le dezactiveze
ar face ca `auto/subscription` să continue să ofere discret întregul pool — inclusiv modelele cu plată — sub un
nume care promite contrariul.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 dezactivează complet o treaptă
  },
}
```

Limitarea pe baza bugetului este inactivă până când este conectat un resolver de cheltuieli: dacă nu este disponibilă contabilizarea, o
treaptă cu plată este ordonată, dar nu este niciodată restricționată. Începând cu v3.8.51, setarea `rungBudgetUsd` este acceptată de
schemă, dar NU este încă aplicată — considerați-o o configurație rezervată, nu o limită activă de cheltuieli. Ordonarea treptelor, epuizarea bazată pe cotă și reintrarea după resetare
funcționează toate fără aceasta.

## Compoziție

`subscription` și `thrifty` sunt valori `AutoTier`, deci se combină cu fiecare categorie:
`auto/coding:thrifty`, `auto/reasoning:subscription` și așa mai departe. Cele două ID-uri simple
(`auto/subscription`, `auto/thrifty`) sunt afișate în `/v1/models` și în panoul de control.

Niciunul dintre ID-uri nu aparține nivelului cu plată, astfel încât `isPaidTierAutoId()` returnează `false` pentru ambele, iar
`auto/subscription` rămâne disponibil când se utilizează `hidePaidModels`.

## Unde se află codul

| Aspect                                      | Fișier                                              |
| ------------------------------------------- | --------------------------------------------------- |
| Date de facturare atent selectate           | `open-sse/config/connectionBillingCatalog.ts`       |
| Clasificator                                | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Trepte, ambele grupări, reintrare           | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integrarea în pool-ul de candidați          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Perimarea cache-ului în funcție de resetare | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Suprafața nivelurilor                       | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ID-uri afișate                              | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Teste                                       | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
