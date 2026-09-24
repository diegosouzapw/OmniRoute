# Radar Free-Model Catalog (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Sannhetskilde:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Sist oppdatert:** 2026-09-01 — v3.8.51
> **Grense for dokumentasjon av den driftede tjenesten:** Reglene på serversiden som beskrives her, ble verifisert
> 2026-09-01 mot den bevisst private Radar-serveren på den eksakte revisjonen
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Denne implementasjonen distribueres ikke i
> dette OSS-repositoriet; driftet tilgjengelighet er fortsatt en separat operasjonell tilstand.

Radar er et **valgfritt tillegg** som legger en signert, nylig kuratert katalog over gratismodeller
oppå utgivelsens grunnkatalog (`FREE_MODEL_BUDGETS` i
`open-sse/config/freeModelCatalog.data.ts`). Det finnes fordi gratistilbudene endres
raskere enn utgivelsestakten — leverandører legger til, reduserer eller avvikler gratiskvoter mellom
utgivelser, og grunnkatalogen kan bare oppdateres når en ny versjon lanseres.

**Ingenting som er gratis i dag, slutter å være gratis på grunn av den eksterne datastrømmen.** Radar
legger aldri en betalingsmur på en oppføring i grunnkatalogen; det oppdaterer bare grense-/statusfelt ved lesing og kan
legge til nylig oppdagede gratismodeller mellom utgivelser. En operatør kan fortsatt skjule en
modell lokalt og gjenopprette den fra det samme kontrollpanelet. Selve grunnkatalogen
endres aldri på disken — se
[Regler for sammenslåing av overlegg ved lesing](#read-time-overlay-merge-rules) nedenfor.

---

## Leveringsstatus i v3.8.51

Følgende status skiller mellom det denne OSS-utgivelsen implementerer, og senere Radar-
arbeidsstrømmer. Dette er en status på kodenivå, ikke et løfte om at en bestemt driftet distribusjon
eller ekstern integrasjon er tilgjengelig for øyeblikket.

| Område                                     | Status i denne utgivelsen                                                                                                                                                                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Klient for signert katalog                 | Implementert bak `RADAR_ENABLED`, med separat aktivt samtykke, Ed25519-verifisering, lokale krypterte innstillinger/mellomlager, vedvarende visnings-/aktiveringsoverstyringer, reversible tombstones, planlegger og kontrollpanel.                                            |
| Aktivering for bidragsytere                | Kontrollpanelet lenker til den serverdriftede GitHub-flyten for krav og godtar en eksisterende `omr_…`-nøkkel. Bidragsyterkvalifisering avgjøres av den private tjenesten; OSS-klienten inneholder ingen GitHub-token eller utstedelseslogikk.                                 |
| Aktivering med støttenøkkel                | Implementert. Den ubehandlede nøkkelen valideres, krypteres ved lagring, maskeres ved lesing og sendes bare av synkronisering på serversiden. Endring eller sletting av nøkkelen ugyldiggjør alle de fire rettighetsavhengige mellomlagrene for datastrømmer.                  |
| Henvisningslenker                          | Implementert som en separat signert datastrøm som oppdateres hver time. Faste lenker er umiddelbart tilgjengelige for fellesskapsnivået; begrensede kampanjer forblir data fra live-nivået.                                                                                    |
| Tilbud til støttespillere                  | Implementert som en separat signert datastrøm kun for live-nivået og som en side i kontrollpanelet. Klienten validerer det lukkede fordelsskjemaet på nytt, beholder det siste fungerende mellomlageret, filtrerer ut utløpte oppføringer og merker partnertilbud uttrykkelig. |
| Innsikt og anerkjennelse av støttespillere | Implementert som en streng, signert datastrøm kun for live-nivået, med Radar-eid ELO, faktisk katalogaktualitet/-trend, et verifisert lokalt støttespillermerke, en side i kontrollpanelet og CLI-kommandoer kun for lokal status/synkronisering.                              |
| Betalinger og transaksjons-e-post          | Ikke implementert i OSS-klienten. Kjøp, donasjon, kvitteringsgjennomgang, gjenoppretting og levering av e-post hører til den private tjenesten; driftet tilgjengelighet avhenger fortsatt av dens overvåkede distribusjon og leverandørkonfigurasjon.                          |
| Arbeidsstrøm for forskningsagent           | Ikke en del av denne klientutgivelsen. Innholdet i de kuraterte datastrømmene forblir data på serversiden; ingen autonom forskningsagent kjører i en OmniRoute-installasjon.                                                                                                   |

---

## Offentlig kunngjøringsleser

Den generiske kunngjøringsleseren er separat fra Radar-funksjonsflagget. Hjem-siden i kontrollpanelet og
endringsloggvisningen henter repositoriets offentlige `news.json` via en vanlig `GET` til
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). De sender ingen Radar-innstilling, ledetekst,
leverandørkonfigurasjon, bruksregistrering eller lokal avvisningsstatus.

`news.json` bruker det lukkede v2-skjemaet implementert av `parseNewsPayload()`:

- `schemaVersion: 2` og en begrenset `items[]`-samling;
- stabile, unike `id`-verdier for kunngjøringer;
- eksplisitte `active`- og ISO `publishedAt`-felt;
- obligatorisk engelsk tekst med valgfri lokalisert tekst;
- valgfrie legitimasjonsfrie HTTPS-lenker og et ikon fra en tillatelsesliste;
- valg av nyeste aktive først, tilbakefall til engelsk språkinnstilling og lokal avvisning per ID.

Parseren godtar midlertidig det tidligere entallsformatet `{ active, title, message, ... }`, slik at
eldre forgreninger kan migrere uten en ødelagt endringsloggvisning. Ugyldige feeder er inaktive. Radar-lanseringsoppføringen
leveres med `active: false`; å endre den til `true` er en separat utgivelseshandling etter sammenslåing og utrulling
og endrer ikke `RADAR_ENABLED` eller det uavhengige samtykket til feedsynkronisering.

---

## Flagg: `RADAR_ENABLED` (av som standard)

Radar er ende-til-ende-sperret av funksjonsflagget `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategori `policies`,
`defaultValue: "false"`).

**Når flagget er av, finnes ikke grensesnittet:**

- Alle `/api/radar/*`-endepunkter, inkludert lokale lesinger og skrivinger av modelltilstand,
  returnerer `404` før de berører noen Radar-modul.
- Kontrollpanelsidene (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) gjengir
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returnerer den urørte grunnlinjen —
  samme antall oppføringer, samme verdier, hver oppføring merket med `origin: "baseline"` — og leser aldri
  feedbufferen.
- Det utføres aldri noe Radar-nettverkskall; hver synkroniseringsmodul returnerer `{ status: "disabled" }`
  før den berører `fetch`.

Dette er en streng overordnet sperre: Å slå på flagget låser bare opp _sidene_,
ikke noe mer. Det laster ikke opp data, starter ikke en bakgrunnssynkronisering og endrer ikke
ruting eller modellvalg — se det separate samtykket nedenfor.

---

## Datasynkronisering er et SEPARAT samtykke — personvernløftet

Å slå på `RADAR_ENABLED` låser bare opp brukergrensesnittet. Synkronisering av feeden krever et annet,
uavhengig samtykke lagret i `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrering `136_radar_cache_settings.sql`). `syncRadar()` kontrollerer flagget _og_ samtykket
før det utfører et nettverkskall:

```
Flagg av       → { status: "disabled" }   — ingen nettverkskall
Samtykke false → { status: "opt_out" }    — ingen nettverkskall
```

Når begge er slått på, er synkroniseringsforløpet:

1. `GET <feed base URL>/v1/catalog/latest` med `x-omniroute-radar-schema: 2` og en valgfri
   `Authorization: Bearer <supporter key>`-header (se nedenfor). Servere bruker som standard den separat
   signerte v1-overgangsartefakten når skjemaheaderen mangler, slik at eldre installerte klienter fortsetter
   å motta oppdateringer.
2. Dette er en programflyt kun for nedlasting, men det er fortsatt en HTTPS-forespørsel. Den driftede
   infrastrukturen mottar ordinære tilkoblingsmetadata, for eksempel kilde-IP-en. Når en støttenøkkel
   er konfigurert, sender synkroniseringen også denne nøkkelen i Bearer-headeren, slik at tjenesten kan fastslå
   rettigheten. Ved den nøyaktige private serverrevisjonen som er identifisert i evidensgrensen ovenfor,
   bruker registreringen av feedforespørsler nøkkelhasher, aggregert bruk og en daglig roterende, avkortet HMAC
   av IP-adressen for manuell misbruksgjennomgang; disse tabellene lagrer verken nøkkelen eller IP-adressen i råformat.
   Tilgangslogger for infrastrukturen og den krypterte leveringsutboksen er separate driftsmessige
   grenser.
3. OmniRoute sender aldri ledetekster, svar, samtaler, leverandørlegitimasjon, modelltrafikk,
   oppetid, ventetid eller den lokale leverandørkonfigurasjonen til Radar-tjenesten.
4. Svaret verifiseres, valideres og bufres lokalt (se
   [Sikkerhetsmodell](#security-model)). Radar har nøyaktig fire nettverksbaner på serversiden:
   `syncRadar()` for katalogen, `syncRadarReferrals()` for henvisninger og
   `syncRadarOffers()` / `syncRadarIntel()` for tilbud og Intel kun for støttespillere.

**Støttenøkkelen** er et valgfritt Bearer-token (`radar_settings.supporter_key`)
som lar feedtjenesten avgjøre hvilket nivå som skal leveres (se
[Nivåer](#tiers-community-and-live)). Den:

- Lagres **kryptert i hvile** med de samme AES-256-GCM-`encrypt()`/`decrypt()`-
  hjelpefunksjonene (`src/lib/db/encryption.ts`) som brukes for leverandørlegitimasjon.
- Angis via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) og
  **returneres aldri** — svaret returnerer en maskert form (`omr_****abcd`).
- Hvis den endres eller fjernes, ugyldiggjøres katalog-, henvisnings-, tilbuds- og Intel-bufferne atomisk. Den
  neste synkroniseringen/lesingen fastslår den nye rettigheten på serversiden; lagring av en nøkkel utløser ikke i seg selv
  noen nettverksforespørsel eller bruker opp en engangsaktiveringsnøkkel.
- Sendes til feedtjenesten som et Bearer-token i synkroniseringens GET-forespørsel — ingenting annet om
  nøkkelen forlater noensinne klienten.

---

## Tilgangs- og sikkerhetsregler som vises før samtykke

Det inaktive kontrollpanelet viser disse reglene fra
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **før** noen av aktiveringshandlingene.
Den kanoniske tilgangsskalaen er:

| Nivå                       | Kvalifikasjonskrav                                                                          | Tilgang                                               | Regel for gjentakelse/utløp                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| Fellesskap                 | Alle; ingen nøkkel                                                                          | Komplett katalog forsinket med omtrent 30 dager       | Alltid tilgjengelig; ingen utstedelse                                         |
| Stjerne + følg             | GitHub OAuth bekrefter både en stjerne på repositoriet og at eieren følges                  | Én direkteavlesning av katalogen, deretter Fellesskap | Én utstedelse per innlogging; utstedes aldri på nytt                          |
| Bidragsyter Topp 10        | Plassering 1–10 i den siste fullførte ukentlige rangeringen                                 | 365 dager med direktetilgang                          | Kreves ved behov; å falle ut av rangeringen forkorter ikke en tildelt periode |
| Bidragsyter Topp 100       | Plassering 11–100 i den rangeringen                                                         | 90 dager med direktetilgang                           | Samme behovsbaserte/idempotente regel for krav                                |
| Supporterkjøp              | Engangskjøp for 6 måneder, 1 år eller livstid                                               | Direktekatalog, signerte direkte tilbud og Intel      | Ingen automatisk fornyelse                                                    |
| Donasjon/manuell tildeling | Eiergodkjent donasjon eller en tildeling fra eieren for et uttrykkelig antall dager/livstid | Samme direkte rettighet i den tildelte perioden       | Revidert, idempotent tildeling                                                |

Sammenslåtte PR-er, commits og endrede linjer er **kun grunnlag for rangeringen**. En innlogging utenfor Topp 100 får
ingen bidragsytertildeling, uansett antall PR-er. Tidsbegrensede kjøp, donasjoner, bidragsyterperioder og
manuelle tildelinger akkumuleres fra gjeldende utløpstidspunkt; livstid har forrang. En endring i rangeringen
tilbakekaller eller forkorter aldri allerede tildelt tid med tilbakevirkende kraft.

Den driftede lisensen er personlig, og den brukersynlige regelen er én aktiv installasjon om gangen. Denne
utgivelsen hevder **ikke** å ha en maskinvarelås: OSS-synkroniseringen oppretter ikke fingeravtrykk av maskinvare og opprettholder ikke en
kryptografisk enhetsleie. I den bekreftede revisjonen av den private serveren ovenfor består den implementerte håndhevingen
av validering av rettigheter samt et signal for manuell gjennomgang når den samme aktive nøkkelen registreres fra en fjerde
unik IP-adresse innen 24 timer. Dette signalet blokkerer eller tilbakekaller aldri en nøkkel automatisk. Gjenoppretting
tilbakekaller og erstatter den tapte nøkkelen samtidig som den eksisterende utløpstiden beholdes; den starter ikke den
kjøpte eller tildelte perioden på nytt.

Direkte tilbud kurateres manuelt og kan endres eller utløpe. Samtykkeskjermen oppgir også den nøyaktige
personverngrensen: signerte katalog-/henvisningsmetadata lastes ned; en gyldig nøkkel låser i tillegg opp
signerte tilbud og Intel; Bearer-nøkkelen og vanlige tilkoblingsmetadata når den driftede tjenesten;
ledetekster, svar, samtaler, leverandørlegitimasjon, modelltrafikk, oppetid, ventetid og lokal
leverandørkonfigurasjon gjør ikke det.

---

## Slik får du en støttespillernøkkel

Aktiveringsskjermen (`/dashboard/radar`) lenker til to prosesser for å **skaffe** en
støttespillernøkkel. Selve OSS-repositoriet utsteder aldri en nøkkel, kjører aldri betalingskode og
**oppgir aldri en pris** – prisene fastsettes og vises utelukkende på
målsidene, ikke i dette repositoriet (spesifikasjonsbeslutning D14).

- **«Jeg er en bidragsyter»** – åpner `RADAR_CONTRIBUTOR_CLAIM_URL` (standardverdi
  `https://radar.omniroute.online/auth/github`), en GitHub OAuth-prosess for å kreve tilgang, driftet på
  den private Radar-serveren. Den kontrollerer den nyeste fullførte ukentlige rangeringen: De 10 beste får 365 dager,
  og plasseringene 11–100 får 90 dager. Utenfor topp 100 gir antall PR-er aldri tilgang; prosessen
  kontrollerer i stedet det separate engangsnivået for stjernemerking + følging.
- **«Støtt prosjektet»** – åpner `RADAR_SUPPORTER_PLANS_URL` (standardverdi
  `https://radar.omniroute.online/planos`), den driftede siden for engangsalternativene på 6 måneder, 1 år og
  livstid. OSS-siden viser fortsatt ingen pengeverdi.

Begge URL-ene løses på serversiden (`src/lib/radar/links.ts`, samme mønster for
overstyring via miljøvariabler som `RADAR_FEED_URL`) og videresendes til kontrollpanelet gjennom det eksisterende
`GET /api/radar/settings`-svaret (`contributorClaimUrl`, `supporterPlansUrl`) –
klientkomponenten leser aldri `process.env` selv.

| Variabel                      | Formål                                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Overstyrer URL-en for bidragsyterkrav (standardverdi `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Overstyrer URL-en for støttespillerplaner (standardverdi `https://radar.omniroute.online/planos`).  |

### Gjenoppretting av en tapt støttespillernøkkel

Gjenopprettingsadressen til den driftede tjenesten er `https://radar.omniroute.online/recover`; den er også
lenket fra plansiden. Gjenoppretting foregår fortsatt helt utenfor OSS-klienten fordi den lokale
installasjonen aldri mottar kjøperens/bidragsyterens e-postadresse og ikke kan rekonstruere en rå nøkkel fra
de krypterte innstillingene.

1. Send inn e-postadressen som er knyttet til nøkkelen. Tjenesten returnerer den samme bekreftelsessiden uansett om en
   gjenopprettbar lisens finnes eller ikke, slik at skjemaet ikke avslører hvilke kontoer som finnes.
2. Hvis brukeren er kvalifisert, sender leveringsprosessen en kortvarig engangslenke. Når den åpnes, flyttes
   tokenet umiddelbart til en midlertidig kryptert `HttpOnly`/`Secure`-informasjonskapsel, før brukeren omdirigeres til den rene
   `/recover`-URL-en. Siden inneholder ikke noe token, noen e-postadresse, gammel nøkkel eller erstatningsnøkkel.
3. Bekreft tilbakekallingen. Den private tjenesten tilbakekaller den forrige nøkkelen, oppretter erstatningen med
   samme plan/utløpsdato og legger den i kø for sending via e-post i én transaksjon. Erstatningen
   returneres aldri til nettleseren.
4. Lim inn erstatningen i `/dashboard/radar`. Den gamle nøkkelen skal nå nedgraderes til `community`, mens
   erstatningen skal gi en verifisert `live`-synkronisering. Hvis den samme gjenopprettingslenken åpnes på nytt, skal
   det mislykkes med et generisk svar om at den er ugyldig/utløpt.

Den driftede gjenopprettingsruten og e-postprosessen kan finnes i koden, men fortsatt være utilgjengelige i en gitt
utrulling. Ikke betrakt prosessen som produksjonsklar før serveren er rullet ut, leverandøren for utsending
er konfigurert med en kontrollert mottaker, og hele engangslenken er testet.

Når en besøkende har en nøkkel (`omr_` + 40 heksadesimale tegn), har aktiveringsskjermen
(`src/app/(dashboard)/dashboard/radar/page.tsx`) et felt for å lime inn nøkkelen som primær
fremgangsmåte: Når en nøkkel limes inn og sendes inn, sendes `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) i ett kall – å lime inn en nøkkel både angir den og melder brukeren inn,
slik at skjermen låses opp. Formatet (`omr_` + 40 heksadesimale tegn) kontrolleres først på klientsiden
med den delte hjelpefunksjonen `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
for å gi en bedre brukeropplevelse. Serverens Zod-skjema er uansett den autoritative kontrollen. Når en
nøkkel er angitt, viser aktiveringsskjermen den maskerte formen (`supporterKeyMasked` fra
`GET /api/radar/settings`) i stedet for et tomt felt, med en «endre nøkkel»-kontroll for å
lime inn en ny – den rå nøkkelen vises aldri igjen. De to knappene for krav/planer ovenfor
er fortsatt måten man _skaffer_ en nøkkel på i utgangspunktet. Dette feltet er der en operatør
som allerede har en nøkkel, aktiverer den.

### Ende-til-ende-aktivering og veiledet oppsett

Den private feed-tjenesten og denne OSS-klienten har et bevisst avgrenset grensesnitt: Tjenesten
utsteder og validerer støttespillernøkkelen, mens den lokale OmniRoute-installasjonen krypterer nøkkelen,
synkroniserer signerte artefakter på serversiden og veileder oppsettet av leverandører. Rekkefølgen for assistert validering er:

1. Skaff en nyutstedt eller gjenopprettet nøkkel fra bidragsyterkravet, plans/checkout, gjenopprettingsprosessen eller en autorisert operatør av en privat server. Ikke lim inn den rå nøkkelen i logger, skjermbilder, sakskommentarer eller kommandolinjeargumenter.
2. Aktiver funksjonsflagget `RADAR_ENABLED` i den lokale OmniRoute-installasjonen. Dette gjør brukergrensesnittet tilgjengelig, men det forblir nettverksinaktivt til det separate samtykket er lagret.
3. Åpne `/dashboard/radar`, lim inn nøkkelen og aktiver. Nettleseren sender én lokal `POST /api/radar/settings` med `{ optIn: true, supporterKey }`; nøkkelen krypteres lokalt, og svaret inneholder bare `omr_****<last4>`.
4. La aktiveringsskjermen kjøre katalogsynkroniseringen, eller velg **Synkroniser nå**. Bekreft at siden viser `live`, en feedversjon og et hentetidspunkt. For en autentisert lokal diagnose rapporterer `GET /api/radar/status` status for samtykke/nøkkel og de fire hurtigbuffertilstandene uten å returnere nøkkelen. `POST /api/radar/sync-all` kan eksplisitt oppdatere katalog, henvisninger, tilbud og Intel.
5. Åpne `/dashboard/radar/setup?provider=<provider>`. Følg den leverandøreide URL-en for påloggingsinformasjon, velg **Legg til API-nøkkel**, lagre via det faktiske leverandørskjemaet, gå tilbake til veiledningen og kjør **Test tilkobling**. Veiledningen bruker de vanlige rutene `/api/providers` og `/api/providers/<connection-id>/test`; den oppretter ikke separat påloggingsinformasjon for Radar.
6. Åpne `/dashboard/radar/combos` etter at minst to kompatible leverandørtilkoblinger er aktive. Se gjennom den foreslåtte familien, og opprett kombinasjonen via det eksisterende API-et for kombinasjoner. Tilbud og Intel forblir separate, signerte hurtigbuffere som bare er aktive i `live`, og kan kontrolleres på de egne Radar-sidene.
7. Last inn `/dashboard/radar` og oppsettsiden på nytt. Samtykket, statusen for den maskerte nøkkelen, den verifiserte hurtigbufferen, den lagrede leverandørtilkoblingen og testhandlingen må bestå etter ny innlasting. Registrer dokumentasjon først etter at den rå nøkkelen og leverandørens påloggingsinformasjon ikke lenger er synlige.

Det å lagre en nøkkel er ikke i seg selv bevis på en aktiv rettighet. Beviset er kombinasjonen av resultatet fra den private tjenestens `GET /v1/license/check`, den åpne kildekodekatalogens leverte `live`-nivå, en verifisert signert hurtigbuffer og den faktiske flyten for leverandørtilkobling/testing. En ugyldig, utløpt eller tilbakekalt nøkkel nedgraderer katalogen trygt til `community`; den må ikke rapporteres som en vellykket validering av en aktiv nøkkel.

### Lenke til privat administrasjonspanel

`RADAR_ADMIN_URL` legger valgfritt til **Radar-administrasjon ↗** umiddelbart etter det brukervendte Radar-elementet i Kostnader-delen av sidefeltet. Det har bevisst ingen standardverdi: Når variabelen ikke er angitt eller er ugyldig, inneholder det statiske sidefeltet, kommandopaletten og skjermen for tilpasning av sidefeltet verken et administrasjonselement eller en privat URL.

Verdien løses på serversiden og videreformidles gjennom det administrasjonsautentiserte `GET /api/settings`-svaret bare til en autentisert kontrollpaneløkt, eller til den betrodde loopback-eieren under lokal oppstart uten innlogging. Autentisering via CLI, interne tjenester og API-nøkler med manage-omfang mottar den ikke. Nettleseren validerer svaret på nytt før den eksterne lenken opprettes, og denne åpnes med `noopener noreferrer`.

Bruk en HTTPS-URL uten påloggingsinformasjon for tunnel/tailnet. Ren HTTP godtas bare for en loopback-SSH-videresending, for eksempel `http://127.0.0.1:9351`; andre protokoller, innebygd påloggingsinformasjon, ugyldige URL-er og eksterne HTTP-mål avvises sikkert og gjør navigasjonen inaktiv.

---

## Sikkerhetsmodell

### Ed25519-signatur over eksakte byteverdier

Feed-nyttelasten er signert med Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifiserer signaturen over de **eksakte byteverdiene i responsen**
som mottas over forbindelsen — nyttelasten serialiseres aldri på nytt før verifisering, slik at en
byte-for-byte-omkoding ikke i det stille kan ugyldiggjøre eller omgå signaturkontrollen.
Mislykket verifisering (`invalid_signature`) avbryter synkroniseringen før nyttelasten
blir analysert eller bufret.

### Fastlåst offentlig nøkkel + rotasjon

Den offentlige verifiseringsnøkkelen er fastlåst i `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), en matrise slik at en ny nøkkel kan legges til først før en
rotasjon, mens gamle bufrede feeder signert med en tidligere nøkkel forblir gyldige frem til
de synkroniseres på nytt.

### Miljøoverstyringer som støtter forgreninger

To miljøvariabler lar forgreninger og de som drifter selv, peke klienten mot sin egen feed i stedet for
standardtjenesten fra OmniRoute — se
[Slik drifter du en feed selv](#how-to-self-host-a-feed) nedenfor:

| Variabel            | Formål                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Overstyrer feedens basis-URL (standard `https://radar.omniroute.online`).                                                            |
| `RADAR_FEED_PUBKEY` | Overstyrer den fastlåste offentlige nøkkelen (base64-DER SPKI eller PEM) og erstatter den innebygde matrisen med denne ene nøkkelen. |

### Nedre versjonsgrense

`syncRadar()` avviser en nedlastet feed hvis `version` ikke er strengt nyere enn den
gjeldende bufrede versjonen (`compareVersions()`, punktdelt `YYYY.MM.DD.n`-sammenligning) —
`{ status: "stale" }`. Dette forhindrer at et kompromittert eller feilkonfigurert feed-endepunkt
ruller en klient tilbake til en eldre, annerledes signert nyttelast.

### To datoer, og hvorfor begge beholdes

En bufret feed inneholder to forskjellige datoer, og hele poenget med å beholde begge
er å unngå å forveksle dem:

| Felt          | Kommer fra                       | Besvarer                                    |
| ------------- | -------------------------------- | ------------------------------------------- |
| `generatedAt` | den signerte feedteksten         | hvor gamle **dataene** er                   |
| `fetchedAt`   | klokken til denne installasjonen | når denne installasjonen **lastet dem ned** |

En feed som ble hentet for få minutter siden, kan inneholde flere uker gamle tall, så `fetchedAt` alene kan ikke
fortelle en operatør om overlaget er ferskere enn grunnlaget det ligger oppå. Begge
lagres i `radar_feed_cache`, returneres av `getRadarCatalog().meta` og rapporteres
separat av `GET /api/radar/status`. En rad som ble bufret før kolonnen `generated_at`
eksisterte (migrering 163), leses tilbake som `null` — ukjent forblir ukjent i stedet for
å bruke hentetidspunktet. `radar_referrals_cache` har beholdt sin egen `generated_at` siden
migrering 142.

Den nedre versjonsgrensen ovenfor sammenligner `version`, ikke noen av datoene.

To mangler gjenstår, begge med hensikt: Kontrollpanelet viser fortsatt bare `Last fetched`, så visning
av byggedatoen der krever en ny etikett (og de 41 lokaliseringsoppføringene for den); og tilbuds- og intel-
hurtigbufferne lagrer ingen byggedato i det hele tatt, selv om feed-skjemaene deres inneholder en — `GET
/api/radar/status` utelater derfor feltet for disse to i stedet for å rapportere `null`,
som ville blitt tolket som «ukjent».

### Skjemavalidering

De nedlastede byteverdiene analyseres og valideres mot `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, et Zod-skjema) **etter** signaturverifisering. Et
skjemaavvik returnerer `{ status: "invalid_schema" }`, og hurtigbufferen forblir
urørt. Den bufrede nyttelasten valideres forebyggende på nytt ved hver lesing
(`getRadarCatalog()`) — en ødelagt eller manuelt redigert hurtigbufferrad faller tilbake til
grunnlaget i stedet for å bli levert.

### Grense for responsstørrelse (10 MB)

`syncRadar()` håndhever en **absolutt grense på 10 MB** for feed-responsens innhold — den signerte
feeden er et JSON-dokument på noen få KB, så alt over dette tyder på en feilkonfigurert eller
ondsinnet `RADAR_FEED_URL` (eller en oppstrømstjeneste som leverer søppel), ikke en legitim katalog.
Håndhevingen har to lag:

1. En forhåndskontroll av `Content-Length` unngår å lese innholdet fullstendig når
   deklarert verdi i headeren allerede overskrider grensen.
2. En løpende kontroll av totalstørrelsen under lesing av innholdet håndhever grensen selv når
   `Content-Length` mangler eller angir en lavere verdi enn den faktiske størrelsen — headeren anses aldri
   som pålitelig alene. Sammenslåing av de akkumulerte delene bevarer de eksakte
   byteverdiene som trengs for den påfølgende Ed25519-signaturkontrollen.

Overskridelse av grensen returnerer `{ status: "too_large" }` og lar hurtigbufferen være urørt,
i tråd med det samme ikke-destruktive mønsteret som alle andre synkroniseringsfeil
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Nivåer: `community` og `live`

Feed-skjemaet inneholder et `tier: "community" | "live"`-felt som bestemmes **på serversiden**
av feed-tjenesten basert på forespørselen (om støttenøkkelen finnes og er gyldig)
— klienten bestemmer aldri sitt eget nivå.

- **`community`** — gratiskatalogen, forsinket med omtrent 30 dager sammenlignet med de nyeste
  dataene. Dette er det en uautentisert forespørsel eller en forespørsel med ugyldig nøkkel mottar.
- **`live`** — den nyeste katalogen, levert til forespørsler som inneholder en gyldig
  støttenøkkel.

**En ugyldig eller utløpt støttenøkkel nedgraderes til `community` — det er aldri en
feil.** Synkroniseringsflyten skiller bare signatur-/skjema-/versjonsfeil (alle
kan gjenopprettes fra, og ingen er fatale for den bufrede tilstanden) fra en vellykket `{ status:
"updated", version, tier }`. Det finnes ingen nivåspesifikk feilflyt som en klient må
håndtere.

### Det leverte nivået kommer fra en responsheader, ikke den signerte meldingsteksten

`tier`-feltet i den signerte feedens **meldingstekst** er alltid `"live"` — feed-tjenesten leverer
**to signerte artefakter per versjon**: live inkluderer gjeldende kampanjer, mens community
utelater dem. Hvert artefakt signeres over sine egne eksakte byte. Meldingsteksten fungerer fortsatt ikke
som tilgangsavgjørelsen; nivået som faktisk velges for en forespørsel, formidles
i responsheaderen **`x-omniroute-feed-tier`**, og bestemmes på serversiden ut fra forespørselens
`Authorization`-nøkkel.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) er det eneste stedet
som fastsetter nivået en klient skal stole på:

1. Tolk `x-omniroute-feed-tier` med `RadarTierSchema` (Zod) — en manglende header eller
   en verdi som ikke er nøyaktig `"community"` eller `"live"`, behandles som **ikke
   til stede** (den lagres aldri uendret som en betrodd verdi i hurtigbufferen/grensesnittet; dette dekker også eldre feed-
   servere fra før headeren ble innført).
2. Bruk `tier`-feltet i den signerte meldingsteksten (alltid `"live"`) som reserve bare når trinn 1
   ikke gir noen verdi.
3. Det fastsatte nivået er det som bufres og returneres som `{ status: "updated",
version, tier }` — dette er verdien kontrollpanelet viser, aldri det ubehandlede feltet fra
   meldingsteksten.

---

## Regler for overliggende sammenslåing ved lesing

`applyFeed()` (`src/lib/radar/applyFeed.ts`) slår sammen den bufrede feeden **over**
det statiske utgangspunktet ved **lesing**, inne i `getRadarCatalog()`. Utgangstabellen
(`FREE_MODEL_BUDGETS`) muteres aldri — en ny `MergedEntry[]` beregnes ved hvert
kall.

Fire regler, sortert etter prioritet:

1. **Feeden overskriver aldri en lokal overstyring.** Per felt: Hvis operatøren har
   tilpasset et felt i en oppføring (`localOverrides`-kartet, med `provider:modelId` som nøkkel),
   hoppes feedens verdi for akkurat dette feltet over — operatørens verdi vinner.
2. **`enabled: false` deaktiverer oppføringen, med proveniens.** En feed-oppføring som slår
   av en oppføring, setter `enabled: false` og `disabledBy: "radar"` i det sammenslåtte resultatet,
   slik at brukergrensesnittet kan forklare _hvorfor_ en oppføring gikk fra tilgjengelig til deaktivert.
3. **En brukeropprettet oppføring som ikke finnes i feeden, overlever urørt.** Oppføringer som
   bare finnes i utgangspunktet (eller ble lagt til lokalt), og ikke har en tilsvarende feed-
   oppføring, videreføres uendret.
4. **En gravlagt oppføring gjenopprettes aldri.** Hvis operatøren eksplisitt slettet en
   oppføring (`tombstones`-settet), vil ikke feeden hente den tilbake dersom den legger til samme
   `provider:modelId` på nytt i en senere versjon.

De redigerbare feltene og gravmarkørene lagres i
`radar_local_model_state` (migrering `153_radar_local_model_state.sql`). Den offentlige DB-
adapteren (`src/lib/db/radar.ts`) konverterer disse radene til `localOverrides`-kartet og
`tombstones`-settet som brukes av `applyFeed()`; i produksjon laster `getRadarCatalog()` inn denne tilstanden
etter at kontrollene for flagg, hurtigbuffer og skjema er bestått. Bare `displayName` og `enabled` kan
redigeres av operatøren. Leverandør-/modellidentitet, feed-proveniens, kvote, funksjonalitet, bruksvilkår
og konfigurasjonsdata kan ikke skrives gjennom denne flaten.

Kontrollpanelet tilbyr fire lokale handlinger:

- **Rediger** endrer det lokale visningsnavnet og aktiveringsstatusen.
- **Tilbakestill lokale endringer** tømmer begge de redigerbare feltene uten å endre en gravmarkør.
- **Skjul** oppretter en gravmarkør, slik at senere feed-oppdateringer ikke kan gjenopprette raden.
- **Gjenopprett** fjerner gravmarkøren; eventuelle separat lagrede overstyringer forblir gjeldende.

Feed-verdien `enabled: false` er fortsatt sikkerhetsunntaket: Den vinner over en foreldet lokal
`enabled: true`, beholder den sammenslåtte oppføringen deaktivert og registrerer `disabledBy: "radar"`.

Katalogpubliseringer bruker `schemaVersion: 2`. `contextWindow` og hver av `tools`, `vision` og
`thinking` er uavhengig av typen `number | null` / `boolean | null`: `null` betyr ukjent, mens
`false` betyr at en D16-bekreftet offisiell leverandørkilde eksplisitt oppgir at funksjonen mangler.
Interne flagg fra OmniRoute-registeret eller modellspesifikasjonen oppgraderes aldri direkte til feed-fakta. Klienten
godtar fortsatt v1-øyeblikksbilder. Siden den gamle byggeren brukte `false` som plassholder for fravær, blir `false` i v1
normalisert til ukjent, mens `true` i v1 fortsatt behandles som et faktum. Ukjente skjemaversjoner avvises sikkert, og den
siste gyldige hurtigbufferen forblir tilgjengelig. Hver v2-modell med en kontekst-/funksjonsverdi som ikke er null, må ha en
legitimasjonsfri HTTPS-`metadataEvidenceUrls[]`; ellers mislykkes skjemavalideringen, og hurtigbufferen
erstattes ikke. Katalogtabellen viser alle tre tilstandene som `✓`, `✕` og `?`.

### Veiledede kombinasjoner og MCP-tilgang

Bekreftede `familyId`-verdier overlever den overliggende sammenslåingen ved lesing og driver den rene
`buildRadarComboSuggestions()`-modulen (`src/lib/radar/comboSuggestions.ts`). En familie foreslås
bare når minst to ulike leverandører har aktive tilkoblinger og tilbyr den eksakte kuraterte modell-
ID-en. Deaktiverte modeller, inaktive leverandører, manglende modell-ID-er, familier med bare ett medlem og tvetydige
alias-/prefikstreff avvises sikkert. Forslag bruker den eksisterende `priority`-strategien og sorterer det
største gjentakende månedsbudsjettet først; brukergrensesnittet oppretter dem bare gjennom `POST /api/combos`.

Det veiledede brukergrensesnittet finnes på `/dashboard/radar/combos`. Det leser bare de lokale
endepunktene `GET /api/radar/catalog` og `GET /api/combos/builder/options`. Det utløser aldri Radar-synkronisering,
leser leverandørlegitimasjon eller skriver direkte til combo-databasen.

MCP-klienter kan lese den samme lokale projeksjonen med `omniroute_radar_catalog` (`read:radar`). De
valgfrie filtrene `provider`, `familyId` og `enabledOnly` evalueres etter én lokal
`GET /api/radar/catalog`-lesing. Det avgrensede resultatet inkluderer katalogmetadata samt leverandør/modell,
visningsnavn, `familyId`, kvote, funksjoner, aktivert status, opprinnelse og `disabledBy`; URL-er for oppsett,
trinn, tilkoblinger, e-postadresser, nøkler og vervingsdata returneres aldri. Dette verktøyet er
skrivebeskyttet og kaller aldri `/api/radar/sync`.

### Opprinnelsesmarkører

Hver sammenslåtte oppføring har et `origin`-felt som brukergrensesnittet viser som et merke:

- `"baseline"` — uendret fra den statiske utgivelseskatalogen.
- `"radar"` — ett eller flere felt ble oppdatert av datastrømmen.
- `"local"` — operatøren har minst én lokal overstyring for denne oppføringen (lokale
  overstyringer har alltid forrang over datastrømmen i henhold til regel 1, uansett hva datastrømmen angir).

---

## Lokale grensesnitt — aldri en proxy for datastrømmen

De lokale Radar-rutefamiliene nedenfor støtter brukergrensesnittet under `src/app/api/radar/`:

| Rute                           | Metode | Formål                                                                                                                                 |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Returnerer den sammenslåtte katalogen (`getRadarCatalog()`) fra den lokale hurtigbufferen.                                             |
| `/api/radar/sync`              | POST   | Utløser `syncRadar()` på serversiden og returnerer den resulterende statusen.                                                          |
| `/api/radar/settings`          | GET    | Returnerer `{ optIn, hasSupporterKey, supporterKeyMasked }` — aldri den ubehandlede nøkkelen.                                          |
| `/api/radar/settings`          | POST   | Angir samtykke og/eller den (krypterte) støttenøkkelen.                                                                                |
| `/api/radar/referrals`         | GET    | Returnerer `{ fixed, campaigns, tier }` fra den lokale hurtigbufferen — se [Henvisningslenker](#referral-links-free-credits) nedenfor. |
| `/api/radar/offers`            | GET    | Returnerer aktive tilbud fra den verifiserte lokale live-hurtigbufferen; returnerer aldri støttenøkkelen.                              |
| `/api/radar/offers/sync`       | POST   | Utløser den serversidebaserte `syncRadarOffers()`-prosessen, som bare bruker live-nøkkelen.                                            |
| `/api/radar/intel`             | GET    | Returnerer verifisert lokal live-Intel samt en boolsk verdi for støttespillergjenkjenning; aldri en identitet eller nøkkel.            |
| `/api/radar/intel/sync`        | POST   | Utløser den serversidebaserte `syncRadarIntel()`-prosessen, som bare bruker live-nøkkelen.                                             |
| `/api/radar/status`            | GET    | Returnerer skrivebeskyttet lokal status for innstillinger/hurtigbuffer for katalog, henvisninger, tilbud og Intel, uten hemmeligheter. |
| `/api/radar/sync-all`          | POST   | Kjører alle de fire synkroniseringsmodulene på serversiden og returnerer en separat status for hver datastrøm.                         |
| `/api/radar/local-model-state` | GET    | Viser lagrede overstyringer og gravsteiner for redigerings- og gjenopprettingskontroller.                                              |
| `/api/radar/local-model-state` | PATCH  | Angir eller fjerner de validerte overstyringsfeltene `displayName`/`enabled`.                                                          |
| `/api/radar/local-model-state` | PUT    | Oppretter eller fjerner en gravstein med `{ provider, modelId, tombstoned }`.                                                          |
| `/api/radar/local-model-state` | DELETE | Fjerner redigerbare overstyringsfelt, men bevarer eventuelle gravsteiner.                                                              |

**Ufravikelig regel: Disse rutene fungerer aldri som proxy for datastrømtjenesten.** Nettleseren kommuniserer bare
med den lokale OmniRoute-serveren. De fire modulene som kommuniserer med Radar-tjenesten, er
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (henvisninger) og
`src/lib/radar/offersSync.ts` (tilbud), samt `src/lib/radar/intelSync.ts` (Intel); alle kjører
på serversiden, aldri på klientsiden. Dette holder
datastrømmens URL og eventuelle støttenøkler fullstendig unna klientrettet nettverkstrafikk.

Alle Radar-endepunkter returnerer `404` når `RADAR_ENABLED` er deaktivert (se
[Flagg](#flag-radar_enabled-default-off) ovenfor), og sender feilresponser gjennom
`buildErrorBody()`/`sanitizeErrorMessage()` i henhold til regelen for feilsanitering i hele repositoriet
(`docs/security/ERROR_SANITIZATION.md`).

### Autentisering

Alle Radar-endepunkter krever autentisering via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — en øktinformasjonskapsel for instrumentpanelet eller en
administrasjonsbegrenset API-nøkkel, den samme sperren som beskytter resten av `/api/settings/*`.
`404`-kontrollen for deaktivert flagg kjøres alltid **før** autentiseringskontrollen, slik at en installasjon der
`RADAR_ENABLED` er deaktivert, forblir byteidentisk (ingen autentiseringsforespørsel bare for å finne ut at
grensesnittet ikke finnes); når flagget er aktivert, får en uautentisert forespørsel `401` før
noen lese- eller skriveoperasjon mot databasen. `GET /api/radar/settings` returnerer aldri den
ubehandlede støttenøkkelen, uavhengig av autentiseringstilstand — bare den maskerte formen og en boolsk
`hasSupporterKey`-verdi.

---

## Støttespillertilbud

Tilbud bruker sin egen signerte artefakt, `GET /v1/offers/latest`, og deler aldri katalog- eller
henvisningsbufferen. Serverendepunktet krever en gyldig, aktiv Bearer-nøkkel for støttespillere; det
finnes ingen reserveordning for fellesskapsversjonen. `syncRadarOffers()` stopper derfor før
nettverkstilgang når funksjonsflagget er slått av, operatøren ikke har samtykket, eller ingen
støttespillernøkkel er konfigurert.

Etter en vellykket GET-forespørsel verifiserer klienten Ed25519-signaturen over de nøyaktige
responsbytene, validerer `RadarOffersFeedSchema`, krever at både den signerte brødteksten og
`x-omniroute-feed-tier`-headeren angir `live`, håndhever en strengt nyere punktdelt versjon og
erstatter først da `radar_offers_cache` atomisk (migrering `144_radar_offers_cache.sql`). Den samme
grensen på 10 MB for header pluss strøm som brukes av de andre feedene, gjelder også her. Feil knyttet
til signatur, skjema, nivå, repetisjon, størrelse, HTTP eller nettverk bevarer alle den sist
verifiserte bufferen.

Den lukkede tilbudsformen støtter tre sammenlignbare fordelstyper: prosentandel i basispunkter,
kreditt i mindre valutaenheter eller prøvedager. Et partnertilbud må inneholde en offentlig
referanseverdi av samme type, og fordelen må være strengt større; offisielle tilbud har ingen
partnerreferanse. URL-er må bruke HTTPS og ikke inneholde påloggingsopplysninger.
`getRadarOffers()` validerer defensivt den bufrede nyttelasten på nytt og filtrerer bort utløpte
oppføringer ved hver lokale lesing; `/dashboard/radar/offers` filtrerer utløpte oppføringer på nytt
før visning, bruker portugisisk tekst når den er tilgjengelig, med engelsk som reserve, og merker
partnertilbud uttrykkelig.

Nettleseren kaller bare lokale ruter: Den leser det maskerte øyeblikksbildet av innstillingene, ber
`POST /api/radar/offers/sync` om å oppdatere på serversiden og leser deretter
`GET /api/radar/offers`. Uten en nøkkel viser den de eksisterende lenkene for bidragsytere og støtte
i stedet for å forsøke en feedforespørsel. Eksterne tilbudslenker åpnes i en ny fane med
`noopener noreferrer`. Ingen `radar_offers`-MCP-verktøy er eksponert i denne utgivelsen.

---

## Radar Intel, støttespillermerke og CLI

Intel er en signert artefakt på `GET /v1/intel/latest`. Det lukkede `RadarIntelFeedSchema` godtar
bare Radar-eide ELO-rangeringer utledet av den private kuratoren fra bekreftede sammenligninger og
faktabaserte alders-/antallsendringer i katalogen utledet fra signerte katalogøyeblikksbilder.
Metoden er fastsatt til en innledende vurdering på 1000 og K=32. En tom rangering er gyldig når
ingen sammenligning er bekreftet; klienten genererer aldri en.

`syncRadarIntel()` bruker de samme kravene som tilbud for Bearer på serversiden, 30 sekunders
tidsavbrudd, en strømmegrense på 10 MiB, Ed25519-verifisering av de nøyaktige bytene, strengt skjema,
`live`-krav i brødtekst/header, versjonsgulv og bevaring av sist fungerende buffer. Etter at et
verifisert aktivt øyeblikksbilde er lagret, utleder klienten `radar:<sha256(supporter key)>`, lagrer
bare denne enveisidentiteten og sender den dedikerte `radar_supporter`-gjenkjenningshendelsen.
Merket `radar-supporter` er idempotent og gir null XP; det oppdaterer aldri resultatlister eller
gjenbruker `token_share`. `/dashboard/radar/intel` viser merket bare basert på verifiserte lokale
buffermetadata.

CLI-et tilbyr `omniroute radar status` og `omniroute radar sync`. Begge kommuniserer bare med det
lokale OmniRoute-API-et. `status` utfører en skrivebeskyttet `GET /api/radar/status`; `sync` sender én
`POST /api/radar/sync-all` og skriver ut ett resultat per feed. Ingen av kommandoene leser, godtar
eller skriver ut støttespillernøkkelen, og ingen av dem kontakter Radar-tjenesten direkte.

---

## Vervelenker (gratis kreditter)

Vervelenker leveres fra en **frittstående, alltid oppdatert** feed —
`GET /v1/referrals/latest` — atskilt fra katalogfeeden. Dette er med hensikt:
Katalogfeeden på fellesskapsnivået er et øyeblikksbilde som kan være opptil 30 dager
gammelt, så en vervelenke hentet fra den kunne tidligere ligge like langt etter
serverens reelle lenkeliste (en nylig lagt til vervelenke nådde kanskje ikke en
gratis-/fellesskapsbruker før det hadde gått opptil en måned). Vervelenkefeeden fjerner
denne forsinkelsen ved å synkronisere etter sin egen, mye kortere frekvens.

```ts
// Svarkropp fra GET /v1/referrals/latest (Ed25519-signert, samme fastlåste nøkkel som
// katalogfeeden):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisk: max(updatedAt) på tvers av
                                  // vervelenker, slik at to identiske forespørsler gir
                                  // nøyaktig samme signerte byte/signatur
  referrals: {
    fixed: RadarReferral[],      // finnes på ALLE nivåer, inkludert uten autentisering/fellesskap
    campaigns: RadarReferral[],  // fylles bare ut for en gyldig, aktiv Bearer-nøkkel
                                  // (støttespiller); forespørsler uten autentisering eller
                                  // med utløpt nøkkel får []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

I motsetning til katalogfeeden har denne kroppen ikke noe `tier`-felt — serveren
bestemmer hva som skal inkluderes per forespørsel basert på `Authorization`-nøkkelen,
så svarhodet `x-omniroute-feed-tier` er den ENESTE kilden til nivået som ble levert
(`referralsSync.ts::syncRadarReferrals`); et manglende eller ukjent hode nedgraderes til
`"community"`, antakelsen med færrest rettigheter. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validerer hele kroppen og gjenbruker det samme
`RadarReferralSchema` per vervelenke som eksporteres fra `feedSchema.ts`, slik at begge
feedene validerer individuelle vervelenker identisk. Hver `RadarReferral.url` må være
`https://` — en `http://`-URL består ikke skjemavalideringen.

Det GAMLE kataloginnebygde `referrals`-feltet i `RadarFeedSchema` (`feedSchema.ts`)
beholdes for bakoverkompatibilitet med katalogfeeder som allerede er mellomlagret, men
`getRadarReferrals()` leser det ikke lenger — se [Aksessor](#accessor) nedenfor.

### Synkronisering

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) er den ENESTE modulen som
bruker nettverket for vervelenker, og gjenspeiler kontrakten til `syncRadar()` nøyaktig:
flagg av → `disabled`; bortvalg → `opt_out`; laster ned
`${RADAR_FEED_URL}/v1/referrals/latest` (samme forgreningsspesifikke overstyringer av
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` som katalogen), verifiserer Ed25519-signaturen over
de nøyaktige byteverdiene i svaret (`verifyFeedBytes`), validerer mot
`RadarReferralsFeedSchema` og mellomlagrer i tabellen `radar_referrals_cache`
(migrering `142_radar_referrals_cache.sql`) — en tabell som er fullstendig atskilt fra
katalogens `radar_feed_cache`. En grense på 10 MB for svar og en nedre grense for
`generatedAt` avviser en innkommende feed som er eldre enn den mellomlagrede, noe som
beskytter mot gjenavspilling av en eldre signert artefakt. Et identisk tidsstempel
godtas: Serveren gir med hensikt fellesskaps- og aktiv-variantene av vervelenkefeeden
samme deterministiske `generatedAt`, slik at den signerte nyttelasten og det leverte
nivået kan endres etter en endring av støttespillernøkkelen uten at det underliggende
lenkesettet endres. Kaster aldri unntak — returnerer alltid et statusobjekt; feil
inneholder aldri en stakksporing i `reason`.

To utløsere holder vervelenkebufferen varm, begge uavhengige av katalogens egen
24-timersfrekvens:

- **Synkronisering ved lesing** — `GET /api/radar/referrals` kaller selv
  `syncRadarReferrals()` direkte når hurtigbufferen mangler eller er eldre enn
  `REFERRALS_STALE_MS` (1 t, `shouldSyncReferralsOnRead()`), før svaret leveres. Dette
  gjør at faste lenker er «alltid oppdaterte» allerede ved neste innlasting av
  kontrollpanelet, uten å måtte vente på en bakgrunnstidtaker.
- **Sidesynkronisering via planleggeren** — `radarSchedulerTick()` (`scheduler.ts`)
  vurderer uavhengig hvor utdaterte vervelenkene er ved den samme timesvise kjøringen
  som brukes for katalogen, og kaller `syncRadarReferrals()` ved behov. Dette kjøres
  uavhengig av om katalogen skulle oppdateres i den aktuelle kjøringen, og påvirker
  aldri formen til `RadarTickResult` (kun en etter beste evne-bivirkning som ignoreres
  ved feil).

### Aksessor

`src/lib/radar/index.ts` eksporterer to skrivebeskyttede aksessorer. Ingen av dem kaster
unntak (samme defensive kontrakt som `getRadarCatalog()` — avslått flagg, manglende
hurtigbuffer eller en skadet mellomlagret nyttelast resulterer alle i den tomme formen
i stedet for en feil):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  leser fra `radar_referrals_cache` (via `getRadarReferralsCache()`) og validerer
  gjennom `RadarReferralsFeedSchema` — **ikke** katalogbufferen.
- `getDefaultReferralFor(provider)` → den `fixed`-vervelenken med `isDefault: true` for
  den aktuelle leverandøren, eller `null`. Ser bare på `fixed` — en kampanje brukes
  aldri som en leverandørs «standardlenke».

Den faktiske regelen for «hvilken vervelenke er standard for en leverandør» finnes i
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), en liten ren funksjon **uten
DB-import** — den kan trygt importeres i en `"use client"`-komponent.
`getRadarReferrals`/`getDefaultReferralFor` (i `index.ts`) trekker inn
`@/lib/db/radar` og forblir derfor kun på serversiden; leverandørkontrollpanelet
importerer `referrals.ts` direkte i stedet for `index.ts` (se nedenfor) for å unngå å
pakke `better-sqlite3` inn i nettleserpakken.

### `GET /api/radar/referrals`

Følger nøyaktig samme kontrollrekkefølge som alle andre Radar-ruter: `RADAR_ENABLED` av →
`404` (kontrolleres først, byteidentisk standardoppførsel); ikke autentisert → `401`; ellers
utløses en synkronisering ved lesing (se ovenfor) når dataene er utdaterte, etterfulgt av `200` med
`{ fixed, campaigns, tier }` — `tier` kommer direkte fra den (muligens nettopp oppdaterte)
cache-raden og er kun informativ (styrer brukergrensesnittets forsiktige oppsalgstekst nedenfor). Ruten
videresender aldri direkte til feed-serveren — rutens egen kildekode inneholder ingen `fetch(`-kall;
nettverkstrafikk skjer bare inne i `syncRadarReferrals()`, etter samme prinsipp om kun lokal cache
som `/api/radar/catalog`.

### Brukergrensesnitt for kontrollpanelet — fanen "Gratis kreditter" på `/dashboard/radar`

Gjenbruker den eksisterende Radar-siden (`src/app/(dashboard)/dashboard/radar/page.tsx`) som en
ekstra fane i stedet for en ny rute — mindre overflate for ruting/i18n for en funksjon som er en
variant av dataene siden allerede henter. Etter aktivering tilbyr fanelinjen
**Katalog** (eksisterende tabell) og **Gratis kreditter**:

- Faste lenker grupperes etter leverandør, og hver av dem viser `requiredAction` (når den finnes)
  og en knapp med `target="_blank" rel="noopener noreferrer"` til vervelenken.
- Kampanjer viser det samme, i tillegg til `validUntil` når den finnes.
- Når `campaigns` er tom **og** det leverte nivået er `community`, viser brukergrensesnittet en
  kort oppsalgsmelding («tidsbegrensede kampanjer er en ekstra fordel for støttespillere») — dette
  skjuler eller begrenser **aldri** listen over faste lenker, som forblir fullt utfylt for alle nivåer.
  Oppsalget er kun en forsiktig melding, aldri en sperre.

### Vervelenke på leverandørnavnet (leverandørkontrollpanelet)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
lenket allerede leverandørnavnet til `providerInfo.website` når den var tilgjengelig, med ett
eksisterende eksempel på en inntektsgenererende lenke: merknaden for Kimi-partnerlenken (Moonshot AI)
(i18n-nøkkelen `providers.kimiPartnerLinkNote`). D28 gjenbruker nøyaktig det samme diskrete
merknadsmønsteret for Radars standardvervelenker i stedet for å innføre en ny nøkkel.

Løs kobling, med hensikt:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  er en **ren** funksjon — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — uten avhengighet til `@/lib/radar` eller `@/lib/db/*`. `providerPageUtils.ts` som
  helhet forblir fri for disse importene (verifisert av
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (en `"use client"`-komponent) er det eneste stedet som har tillatelse
  til å hente Radar-data — via `fetch("/api/radar/referrals")`, det samme mønsteret med lokal rute
  som Radar-kontrollpanelsiden selv bruker — og beregner standardvervelenken
  på klientsiden med `findDefaultReferral()` fra den databasefrie `src/lib/radar/referrals.ts`.
- Når `RADAR_ENABLED` er av, returnerer hentingen 404, `referralUrl` forblir `null`, og
  `resolveProviderHeaderLink()` returnerer den statiske katalogverdien `website` uendret —
  leverandørsiden er byteidentisk med slik den var før denne funksjonen eksisterte. Samme resultat når
  det ennå ikke finnes noen cache eller ingen standardvervelenke for den aktuelle leverandøren.
- Når en standardvervelenke gjelder, mottar `ProviderPageHeader` `isReferralLink`
  og viser samme diskrete merknad/verktøytips som Kimi-partnerlenken (ved å gjenbruke
  nøkkelen `providers.kimiPartnerLinkNote`) — aldri en ny, separat visuell utforming.

---

## Slik drifter du en feed selv

En fork eller selvdrifter som ønsker full kontroll over katalogen, kan kjøre sin egen feedtjeneste
uten å endre klientkoden:

1. Tilby et `GET /v1/catalog/latest`-endepunkt som returnerer en JSON-kropp som oppfyller
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — med `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` og `totals` på toppnivå. Respekter `x-omniroute-radar-schema: 2`; en overgangskompatibel server
   bør som standard sende forespørsler uten denne til en separat signert v1-artefakt.
2. Signer de nøyaktige responsbytene med et Ed25519-nøkkelpar, og returner base64-signaturen
   i responsheaderen `x-omniroute-feed-signature`.
3. Sett `RADAR_FEED_URL` til den nye basis-URL-en og `RADAR_FEED_PUBKEY` til den tilhørende
   offentlige nøkkelen (base64-DER SPKI eller PEM) — se
   [referansen for miljøvariabler](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Aktiver `RADAR_ENABLED`, og gi samtykke via `POST /api/radar/settings`
   (`{ optIn: true }`).

Ingen andre kodeendringer er nødvendige — `verifyFeedBytes()` bruker overstyringen
automatisk (`getFeedPublicKeys()` i `src/lib/radar/pinnedKeys.ts`), og versjonssammenligning,
skjemavalidering og flettingsreglene gjelder på samme måte for en selvdriftet
feed.

Henvisningslenker (se [Henvisningslenker (gratis kreditter)](#referral-links-free-credits)
ovenfor) er en separat, valgfri artefakt: En fork som bare tilbyr `/v1/catalog/latest`,
fungerer fortsatt fullt ut — `syncRadarReferrals()` går kontrollert over til `{ status: "error" }` ved en `404`
fra `/v1/referrals/latest`, og hurtigbufferen forblir ganske enkelt tom, slik at
`GET /api/radar/referrals` fortsetter å returnere `{ fixed: [], campaigns: [], tier: null }`
i stedet for å forårsake feil på resten av siden. For også å tilby henvisningslenker kan du tilby
`GET /v1/referrals/latest` som oppfyller `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`), og signere den med det samme Ed25519-nøkkelparet som
katalogfeeden.

Supportertilbud er en annen valgfri artefakt. For å tilby dem må du implementere
`GET /v1/offers/latest` med det lukkede `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), kreve en aktiv rettighet, returnere
`x-omniroute-feed-tier: live` og signere de nøyaktige bytene med den samme nøkkelen. En fork som utelater dette
endepunktet, beholder uendret oppførsel for katalogen og henvisningene. Oppdatering av tilbud mislykkes uten å
ødelegge data, og den sist verifiserte lokale hurtigbufferen for tilbud forblir tilgjengelig.

Intel er valgfritt på samme måte. En selvdrifter kan tilby `GET /v1/intel/latest` ved hjelp av
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), kreve en aktiv rettighet, returnere
`x-omniroute-feed-tier: live` og signere de nøyaktige bytene med den delte Ed25519-nøkkelen. Hvis
endepunktet utelates, forblir katalogen, henvisningene og tilbudene uendret. Oppdatering av Intel bevarer
det sist verifiserte lokale øyeblikksbildet.

---

## Relatert dokumentasjon

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — mønsteret for
  feilresponser som rutene under `/api/radar/*` følger.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referanse for `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
