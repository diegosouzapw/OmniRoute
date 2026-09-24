# Account-Ban / Banned-Keyword Detection (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute scanează răspunsurile de eroare de la serviciile upstream pentru semnale care indică faptul că un
**cont al furnizorului este definitiv inutilizabil** (suspendat / dezactivat / interzis pentru încălcarea ToS) și, atunci când
găsește o potrivire, mută conexiunea respectivă într-o **stare terminală `banned`**, astfel încât aceasta să nu mai fie
selectată pentru cereri. Acesta este comportamentul configurat de cardul de setări **Security → Banned Keywords**
(„Cuvinte-cheie suplimentare care declanșează detectarea interdicției permanente a
contului. Cuvintele-cheie încorporate se aplică întotdeauna.”).

Această pagină documentează lista încorporată, fluxul de detectare, domeniul său de aplicare, modul de adăugare
în siguranță a cuvintelor-cheie personalizate și modul de recuperare a unei conexiuni marcate. Starea terminală
în sine face parte din modelul de reziliență — consultați
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Stări terminale”).

**Sursa de referință:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Cuvinte-cheie încorporate

Aceste 8 subșiruri se aplică întotdeauna (fără a ține cont de majuscule și minuscule), indiferent de orice listă personalizată:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Această listă evoluează pe măsură ce furnizorii modifică formulările privind interdicțiile. Copia oficială
> este `ACCOUNT_DEACTIVATED_SIGNALS` din `open-sse/services/accountFallback.ts`;
> considerați blocul de mai sus drept un instantaneu.

Două tabele de semnale alăturate, dar **separate**, se află în același fișier și _nu_ fac parte
din detectarea cuvintelor-cheie asociate interdicțiilor:

- `CREDITS_EXHAUSTED_SIGNALS` — facturare/cotă epuizată (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → starea terminală `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **neterminală**; o reîmprospătare a tokenului poate restabili funcționarea.

Notă: expresiile tranzitorii uzuale precum **`rate limit`** / `429` sunt gestionate prin
mecanismul de limitare a ratei / perioadă de așteptare a conexiunii și **nu** sunt semnale de interdicție.

## Fluxul de detectare

```
răspuns de eroare upstream
  → corp convertit în șir de caractere + transformat în litere mici
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [potrivire de subșir]
  → potrivire?
      → testStatus al conexiunii = "banned"      (permanent — perioadă de așteptare de 1 an, fără recuperare automată)
      → dacă setarea `autoDisableBannedAccounts` este activată și `autoDisableBannedScope`
        include această conexiune (`all` sau `subscription` pentru OAuth/cookie/sesiune)
        → și isActive = false. Cheile API preplătite rămân active când domeniul este
        `subscription`.
      → conexiunea este omisă în timpul selectării contului (stări combo QUOTA_BLOCKING)
```

- Potrivirea este o căutare de **subșir fără a ține cont de majuscule și minuscule** în **corpul**
  răspunsului (`isAccountDeactivated`, `accountFallback.ts`).
- Trecerea permanentă la starea terminală `banned` se declanșează la detectarea unui corp care conține un semnal de interdicție, pentru **orice
  stare HTTP** (prin `markAccountUnavailable` → `checkFallbackError`). Eticheta
  mai restrânsă **`deactivated`** (`isActive=false` atunci când conexiunea nu are
  chei API de rezervă) este scrisă de fluxul inline `chatCore.ts` pentru **HTTP 401 / 403**
  (clasificat prin `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Rețineți că
  fluxul `markAccountUnavailable()` scrie o stare terminală _diferită_ —
  **`expired`** — pentru același semnal `ACCOUNT_DEACTIVATED` (prin
  `resolveTerminalConnectionStatus`), astfel încât aceeași interdicție poate apărea fie ca
  `deactivated`, fie ca `expired`, în funcție de fluxul care a gestionat răspunsul. (Comentariul
  mai vechi din cod spune „când corpul unui răspuns 401 conține aceste șiruri” — această formulare
  subestimează comportamentul actual.)
- O conexiune `banned` este exclusă de la selecție oriunde sunt filtrate stările terminale
  (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Domeniu de aplicare — ce furnizori sunt scanați

**Toți furnizorii.** Verificarea rulează în fluxul generic de tratare a erorilor
prin care trece fiecare solicitare eșuată către serviciile upstream — **nu** este
limitată la extractoarele OAuth/abonament. Starea terminală rezultată este per
**conexiune**, nu per furnizor.

Cu toate acestea, _șirurile_ încorporate sunt orientate către furnizorii de
abonamente/OAuth cu risc real de interdicție (ChatGPT Web Codex, Claude Web,
Codex, Muse Spark, Antigravity). Un furnizor bazat pe cheie API va declanșa
detectorul numai dacă corpul erorii conține literalmente unul dintre subșiruri.

`autoDisableBannedScope` (`all` | `subscription`, implicit `all`) controlează dacă
o potrivire setează și `isActive=false`. `subscription` înseamnă locuri bazate pe
autentificare (abonamente plătite și conturi gratuite, inclusiv sesiuni bazate pe
cookie-uri web). Acesta înregistrează în continuare `testStatus=banned` pentru
cheile API preplătite, dar le păstrează în grupul de rutare. Soluția durabilă este
o suprascriere per furnizor și per cont; enumerarea globală este prima versiune.

## Cuvinte-cheie personalizate pentru interdicții

Adăugați sau eliminați cuvinte-cheie în **Securitate → Cuvinte-cheie pentru interdicții**
(persistate drept setarea globală `customBannedSignals` prin
`PATCH /api/settings`). Acestea sunt **adăugate la** lista încorporată — nu o
înlocuiesc niciodată — și sunt reîncărcate dinamic la salvare (și la pornire)
prin `setCustomBannedSignals()`. Fiecare cuvânt-cheie este limitat la 200 de
caractere; nu există nicio limită pentru lungimea matricei.

**⚠ Risc de rezultate fals pozitive — alegeți expresii specifice.** Detectarea
este o potrivire brută de subșir în întregul corp al răspunsului, iar o potrivire
este **permanentă** (perioadă de așteptare de 1 an, recuperare manuală). Un
cuvânt-cheie prea general poate interzice o conexiune perfect funcțională:

- **Nerecomandat:** `quota`, `limit`, `error`, `denied` — apar în multe erori tranzitorii.
- **Recomandat:** propoziții complete de interdicție, de exemplu
  `your account has been suspended for`, `account permanently banned`,
  `violation of our terms`.

Preferați cea mai lungă expresie neambiguă pe care furnizorul o returnează în
cazul unei interdicții reale. Dacă aveți dubii, monitorizați mai întâi
`lastError` al conexiunii, apoi adăugați formularea exactă.

## Recuperarea unei conexiuni marcate

Stările terminale `banned` / `deactivated` **nu se recuperează niciodată automat**
(acestea sunt excluse din ciclul de recuperare proactivă — numai perioadele de
așteptare `unavailable` se încheie automat). Un operator trebuie să le elimine
explicit:

1. **Retestați conexiunea** — acțiunea **Testare** din tabloul de bord
   (`POST /api/providers/{id}/test`); o verificare reușită resetează `testStatus`
   la `active` și golește câmpurile de eroare.
2. **Reautentificați-vă / editați datele de autentificare** — pentru furnizorii
   OAuth, relansați fluxul de autentificare / reîmprospătare; rutele de
   creare/importare ale furnizorilor setează `isActive = true`.
3. **Reactivați conexiunea** — dacă dezactivarea automată a setat
   `isActive = false` (domeniul `all` sau `subscription` pentru o conexiune
   OAuth/cookie/sesiune), reactivați-o după remedierea contului.

Nu există un buton separat „șterge marcajul de interdicție” — recuperarea se face
prin retestare, reautentificare sau reactivare, în conformitate cu regula
generală privind stările terminale din
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolarea verificărilor (testarea tuturor modelelor)

O **eroare provenită dintr-o verificare** (testarea tuturor modelelor / cereri de
verificare a stării executate în interiorul `runAsProbe`) nu elimină niciodată o
conexiune din grup (#9817): aceasta este **înregistrată pentru vizibilitate**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), dar omite
**fiecare** modificare a rutării — perioadele de așteptare, starea terminală
(`banned` / `deactivated` / `credits_exhausted`), blocările per model,
întrerupătorul de circuit al furnizorului, memoria cache de 5 minute pentru cotă,
reîmprospătarea tokenului OAuth și dezactivarea automată. Numai o eroare apărută
pe calea unei solicitări reale provoacă dezactivarea. Eroarea înregistrată este
cea care face vizibil un cont marcat în tabloul de bord, în timp ce acesta
continuă să deservească traficul.

Punctul unic de decizie este `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), consultat de **fiecare** loc care ar putea
modifica starea rutării în urma unei erori provenite dintr-o verificare:

- `markAccountUnavailable` (`auth.ts`) — numai înregistrare (textul brut
  `lastError`, `lastErrorType`, `errorCode`, `lastErrorAt`; în mod deliberat
  **fără** `backoffLevel`, care ar declanșa reducerea automată în momentul
  selecției și ar șterge înregistrarea)
- `maybeAutoDisableBannedAccount` — fără dezactivare automată
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (numai
  înregistrare, fără starea terminală `credits_exhausted`), GEO_BLOCKED (fără
  excludere timp de 24 de ore), MODEL_NOT_FOUND (fără `lockModel`), comutarea
  contului Codex în caz de eroare 429 (fără `markCodexScopeRateLimited`, fără
  `rate_limited_until` persistent, fără ștergerea afinității sesiunii),
  `persistCodexQuotaState` (fără scrierea stării cotei, fără invalidarea
  memoriei cache), `recordKeyHealthStatus` (mecanismul de rotație pe baza stării
  cheilor rămâne nemodificat)
- Reîmprospătarea OAuth — atât reîmprospătarea proactivă din baza executorului
  (`base.ts` `execute()`, fără consumarea rotației tokenului de reîmprospătare),
  cât și calea reactivă 401/403 din `chatCore` (fără dezactivarea `expired`)
- `chat.ts` — întrerupătorul de circuit al furnizorului și memoria cache de
  5 minute pentru cotă (`markAccountExhaustedFrom429`) nu sunt niciodată
  degradate

Eroarea înregistrată este cea care face vizibil un cont marcat în tabloul de bord,
în timp ce acesta continuă să deservească traficul. Notă: înregistrarea
verificării stochează textul **brut** (netrunchiat) al erorii, spre deosebire de
trunchierea `slice(0,100)` de pe calea reală.

Operatorii care folosesc testarea tuturor drept instrument de mentenanță pot
restabili comportamentul istoric (verificarea este considerată o generare reală)
prin oricare dintre următoarele metode:

- setarea `probeCanDisable` (`POST /api/settings` cu
  `{"probeCanDisable": true}` sau o editare directă a bazei de date `key_value`);
  sau
- indicatorul de funcționalitate **`PROBE_CAN_DISABLE=true`** (suprascriere prin
  mediu sau baza de date; are prioritate față de setare).

Mecanism de siguranță: dacă interogarea indicatorului sau a setărilor generează
o eroare, izolarea rămâne ACTIVATĂ.

## Fișiere sursă

| Aspect                                                | Fișier                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabele de semnale + potrivire                         | `open-sse/services/accountFallback.ts`                                                                        |
| Finalizare / persistență                              | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Domeniul dezactivării automate                        | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Clasificare în linie                                  | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Excluderea recuperării stării terminale               | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Încărcarea la rulare a cuvintelor-cheie personalizate | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interfața de configurări                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
