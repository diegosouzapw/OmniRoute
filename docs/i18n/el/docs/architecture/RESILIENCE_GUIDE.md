# Resilience Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Το OmniRoute διαθέτει τρεις διακριτούς αλλά αλληλοσχετιζόμενους μηχανισμούς ανθεκτικότητας. Καθένας έχει διαφορετικό εύρος και σκοπό. Κρατήστε τους ξεχωριστούς κατά την αποσφαλμάτωση της συμπεριφοράς δρομολόγησης.

![Μοντέλο ανθεκτικότητας 3 επιπέδων](../diagrams/exported/resilience-3layers.svg)

> Πηγή: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Διακόπτης Κυκλώματος Παρόχου (Circuit Breaker)

**Εύρος:** ολόκληρος ο πάροχος (π.χ., `glm`, `openai`, `anthropic`).

**Σκοπός:** διακοπή της αποστολής κίνησης προς έναν πάροχο που αποτυγχάνει επανειλημμένα σε επίπεδο upstream/υπηρεσίας.

**Υλοποίηση:**

- Βασική κλάση: `src/shared/utils/circuitBreaker.ts`
- Διασύνδεση: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API κατάστασης: `GET /api/monitoring/health`
- API επαναφοράς: `POST /api/resilience/reset`
- Περιτυλίγματα (wrappers): `open-sse/services/accountFallback.ts`
- Πίνακας ΒΔ: `domain_circuit_breakers`

**Καταστάσεις:**

- `CLOSED` — επιτρέπεται η κανονική κίνηση
- `DEGRADED` — η κίνηση εξακολουθεί να επιτρέπεται, αλλά καταγράφονται αυξημένες αποτυχίες του παρόχου· επιστρέφει σε `CLOSED` μετά από επαρκή αριθμό επιτυχιών, μετά από μια έγκυρη δοκιμή σύνδεσης, ή αφού παρέλθει η μεγαλύτερη διάρκεια παραμονής σε `OPEN` για το τελευταίο είδος αποτυχίας (η τιμή `cooldownByKind` του, αλλιώς το `resetTimeout`, × `maxBackoffMultiplier`, τουλάχιστον ένα cooldown) χωρίς νέα αποτυχία
- `OPEN` — ο πάροχος αποκλείεται προσωρινά· η δρομολόγηση combo τον παραλείπει
- `HALF_OPEN` — έχει παρέλθει ο χρόνος επαναφοράς· επιτρέπεται αίτημα διερεύνησης (probe)

**Διαμορφώσιμες προεπιλογές (`open-sse/config/constants.ts`, εκτίθενται στον Πίνακα Ελέγχου → Ρυθμίσεις → Ανθεκτικότητα):**

| Κλάση   | Υποβαθμίζεται στις | Ανοίγει στις | Χρόνος επαναφοράς |
| ------- | ------------------ | ------------ | ----------------- |
| OAuth   | 5 αποτυχίες        | 8 αποτυχίες  | 60s               |
| API-key | 7 αποτυχίες        | 12 αποτυχίες | 30s               |
| Local   | προκύπτει          | 2 αποτυχίες  | 15s               |

Το `degradationThreshold` ελέγχει πότε ένας πάροχος εισέρχεται σε `DEGRADED`· το `failureThreshold` ελέγχει πότε ανοίγει και παραλείπεται. Τα προφίλ τοπικών παρόχων δεν εκτίθενται ακόμη στη σελίδα ρυθμίσεων Ανθεκτικότητας.

**Κωδικοί ενεργοποίησης (trip):** μόνο καταστάσεις σε επίπεδο παρόχου `[408, 500, 502, 503, 504]`. ΔΕΝ ενεργοποιείται για σφάλματα σε επίπεδο λογαριασμού (τα περισσότερα 401/403/429 — αυτά ανήκουν στο cooldown ή στο lockout).

**Οκνηρή ανάκτηση (lazy recovery):** όταν λήξει το `OPEN`, οι `getStatus()`, `canExecute()`, `getRetryAfterMs()` ανανεώνουν την κατάσταση σε `HALF_OPEN`. Οι ίδιες αναγνώσεις (και η επόμενη αποτυχία) επαναφέρουν σταδιακά μια παρωχημένη `DEGRADED` σε `CLOSED`. Δεν απαιτείται χρονοδιακόπτης παρασκηνίου.

---

### Προαιρετική καθολική Παύση Παρόχου — Provider Cooldown (πύλη χρονικού παραθύρου)

Ένα τέταρτο, **προαιρετικό** επίπεδο (`PROVIDER_COOLDOWN_ENABLED`, προεπιλογή **απενεργοποιημένο**) διατηρεί μνήμη μεταξύ αιτημάτων για παρόχους που αποτυγχάνουν στο
`open-sse/services/providerCooldownTracker.ts`, το οποίο συμβουλεύεται η επίλυση στόχων combo, ώστε διαδοχικά αιτήματα combo να σταματούν να ξαναδιατρέχουν έναν πάροχο που μόλις απέτυχε. Οι εγγραφές σε επίπεδο παρόχου τηρούν την πύλη παραθύρου του `PROVIDER_PROFILES`:

| Προφίλ  | ενεργοποιείται μετά από (`providerFailureThreshold`) | εντός (`providerFailureWindowMs`) | παραμένει σε παύση για (`providerCooldownMs`) |
| ------- | ---------------------------------------------------: | --------------------------------: | --------------------------------------------: |
| OAuth   |                                                 `10` |                           `15min` |                                        `5min` |
| API key |                                                 `15` |                           `30min` |                                       `10min` |

Κάτω από το κατώφλι, ο πάροχος **δεν** θεωρείται ότι βρίσκεται σε παύση· μια επιτυχία καθαρίζει το παράθυρο. Οι εγγραφές σε επίπεδο σύνδεσης (`provider:connectionId`) διατηρούν αντί αυτού το εκθετικό backoff `minRetryCooldownMs → maxRetryCooldownMs`. Παρακάμψεις:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Έλεγχος παλινδρόμησης: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ψύξη σύνδεσης (Connection Cooldown)

**Εύρος:** μία σύνδεση/λογαριασμός/κλειδί παρόχου.

**Σκοπός:** παράλειψη ενός προβληματικού κλειδιού ενώ οι υπόλοιπες συνδέσεις για τον ίδιο πάροχο συνεχίζουν να εξυπηρετούν.

**Υλοποίηση:**

- Σήμανση ως μη διαθέσιμου: `src/sse/services/auth.ts::markAccountUnavailable()`
- Επιλογή: `getProviderCredentials*` στο ίδιο αρχείο
- Υπολογισμός cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ρυθμίσεις: `src/lib/resilience/settings.ts`

**Πεδία ανά σύνδεση:**

- `rateLimitedUntil` — χρονική στιγμή λήξης του cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — μετρητής εκθετικού backoff

**Προεπιλεγμένα cooldowns:**

- Βάση OAuth: 5s
- Βάση API-key: 3s
- API-key 429: προτιμά τα upstream headers `Retry-After`/reset headers/αναλύσιμο κείμενο επαναφοράς
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Προστασία κατά thundering-herd:** αποτρέπει ταυτόχρονες αποτυχίες από το να επεκτείνουν υπερβολικά το cooldown ή να αυξήσουν διπλά το `backoffLevel`.

**Τα 429 ορίου ταυτοχρονισμού δεν ανεβαίνουν τη σκάλα backoff.** Ένα `429` του οποίου το σώμα
αναφέρει όριο ταυτοχρονισμού ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) σημαίνει ότι ο λογαριασμός είναι υγιής αλλά απασχολημένος.
Το `checkFallbackError()` επιστρέφει λόγο `concurrency_limited`: γίνεται failover στην επόμενη
σύνδεση τώρα, ψύχεται αυτή για σταθερό `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ή σύμφωνα με το
upstream retry hint, το `backoffLevel` παραμένει αμετάβλητο και τίθεται `skipProviderBreaker`.
Ένα ρητό σώμα ποσόστωσης (quota) υπερισχύει ακόμα, οπότε ένα σώμα που ταιριάζει και με μοτίβο
quota παραμένει απόφαση quota. Ανίχνευση: `looksLikeConcurrencyLimit()` στο `src/shared/utils/classify429.ts`;
απόφαση: `open-sse/services/accountFallback/concurrencyLimit429.ts`. Το `classify429()` (το `FailureKind`
του breaker) παραμένει αμετάβλητο και εξακολουθεί να διαβάζει `rate_limit` για αυτά τα σώματα.

**Οι διακοπές περιεχομένου ροής (stream content stalls) δεν ψύχουν τον λογαριασμό.** Όταν ο watchdog
διακοπής περιεχομένου (`open-sse/utils/streamHandler.ts`) εγκαταλείπει μια ροή που δεν έστειλε έξοδο μοντέλου
εγκαίρως, το `markAccountUnavailable()` καταγράφει το σφάλμα στη σύνδεση αλλά δεν θέτει
cooldown: η διακοπή ανήκει σε εκείνο το αίτημα, τις περισσότερες φορές σε ένα μακρύ turn συλλογισμού χωρίς
έξοδο ακόμη. Οι διαχειριστές μπορούν να το ενεργοποιήσουν ξανά με `resilienceSettings.streamStallCooldown.enabled`
(προεπιλογή `false`).

**Τα πλαίσια συλλογισμού (reasoning frames) επανεκκινούν τον προϋπολογισμό διακοπής περιεχομένου.** Ένα μοντέλο συλλογισμού μπορεί να σκέφτεται για
λεπτά πριν το πρώτο ορατό token του: το Claude μεταδίδει πλαίσια `thinking_delta` των οποίων το
κείμενο σκέψης μπορεί να είναι κενό, και το Responses API μεταδίδει ένα στοιχείο συλλογισμού μετά
από άλλο. Το `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) αναγνωρίζει
αυτά τα πλαίσια, και ο watchdog επανεκκινεί τον προϋπολογισμό του σε καθένα από αυτά αντί να ακυρώνει
το turn. Εξακολουθούν να μην είναι έξοδος μοντέλου, οπότε ένα turn που τελειώνει μόνο με συλλογισμό εξακολουθεί να
αναφέρεται ως κενό, και ένα turn που σταματά τον συλλογισμό και στέλνει μόνο heartbeats εξακολουθεί να ενεργοποιεί
τον watchdog.

Τα δυαδικά πλαίσια `reasoningContentEvent` του Kiro με μη κενή υπογραφή διατηρούν αυτή τη
δραστηριότητα συλλογισμού μέσω του executor ως κενό delta `reasoning_content`. Η υπογραφή δεν
προωθείται. Τα μεταδεδομένα, τα ημιτελή πλαίσια και οι κενές υπογραφές δεν επανεκκινούν τον
προϋπολογισμό περιεχομένου· το ανεξάρτητο timeout ενεργού ροής και η ακύρωση από τον πελάτη εξακολουθούν να
ισχύουν (`open-sse/executors/kiro/reasoning.ts`).

**Τερματικές καταστάσεις (ΟΧΙ cooldowns):**

- `banned` — τίθεται από ανίχνευση λέξεων-κλειδιών αποκλεισμού / αποκλεισμού λογαριασμού (βλ. [BAN_DETECTION](../security/BAN_DETECTION.md)), και από τρεις διαδοχικές upstream αρνήσεις ανά αίτημα (`request_rejected`, π.χ. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`)· μία μόνο άρνηση απλώς ψύχει τη σύνδεση
- `expired` (μεταβαίνει σε τερματική κατάσταση μετά από φραγμένες επαναλήψεις — `EXPIRED_RETRY_MAX = 3` με εκθετικό backoff — ώστε παροδικά σφάλματα OAuth να μπορούν να αυτοδιορθωθούν πριν ο λογαριασμός απενεργοποιηθεί μόνιμα)
- `credits_exhausted`

Αυτές παραμένουν μέχρι να αλλάξουν τα διαπιστευτήρια ή να τις επαναφέρει κάποιος διαχειριστής. Μην αντικαθιστάτε τερματικές καταστάσεις με παροδική κατάσταση cooldown.

**Νωχελική ανάκαμψη (Lazy recovery):** όταν το `rateLimitedUntil` έχει παρέλθει, η σύνδεση γίνεται ξανά elegible. Με επιτυχή χρήση, το `clearAccountError()` καθαρίζει όλα τα πεδία σφάλματος.

### Τοίχος χρήσης Claude OAuth: λωρίδα χαμηλότερης προτεραιότητας + επαναφορά ορίου συνεδρίας

**Εύρος:** μία σύνδεση συνδρομής Claude (OAuth). Και τα δύο χαρακτηριστικά είναι **opt-in ανά
σύνδεση** (Επεξεργασία σύνδεσης → ενότητα Claude → `lowPriorityMode` / `autoLimitReset` στο
`providerSpecificData`, και τα δύο απενεργοποιημένα από προεπιλογή) και αντιγράφουν τις εντολές `/low-priority` και
`/limit-reset` του Claude Code (wire contract που καταγράφηκε από το Claude Code 2.1.263).

**Υλοποίηση:**

- Μηχανή καταστάσεων + ταξινόμηση αποκρίσεων: `open-sse/services/claudeLowPriority.ts`
- Πελάτης κατάστασης/αξίωσης επαναφοράς: `open-sse/services/claudeLimitReset.ts`
- Άγκιστρο executor (έγχυση header + επανάληψη ίδιου λογαριασμού): `open-sse/executors/base.ts::execute()`
- Επιμονή opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ενεργοποίηση:** ο τοίχος χρήσης 5 ωρών — ένα `429` του οποίου τα headers φέρουν
`anthropic-ratelimit-unified-status: rejected` και, όταν ο λογαριασμός είναι elegible,
`anthropic-ratelimit-unified-slow-offer: treatment`. Τίποτα δεν αποστέλλεται πριν από αυτό το πρώτο 429 τοίχου·
ένα burst 429 χωρίς unified headers ακολουθεί την κανονική διαδρομή cooldown.

**Λωρίδα χαμηλότερης προτεραιότητας** (`lowPriorityMode`):

- Στον τοίχο 429 ο executor αποδέχεται την προσφορά και αμέσως επαναδοκιμάζει τον **ίδιο** λογαριασμό με `anthropic-usage-limit: slow`· η λωρίδα παραμένει ενεργή μέχρι το ανακοινωμένο `anthropic-ratelimit-unified-reset` (+60s χάρη) και κάθε αίτημα σε αυτό το παράθυρο φέρει την κεφαλίδα. Το υποκλαπέν 429 δεν φτάνει ποτέ στο `handleChatCore`, επομένως η σύνδεση **δεν** τίθεται σε cooldown και δεν περιστρέφεται μακριά.
- `anthropic-ratelimit-unified-slow-status` σε μεταγενέστερες αποκρίσεις: `active` / `not_needed` διατηρούν τη λωρίδα· `slot_busy` (429) ή ένα `529` περιμένουν το `anthropic-ratelimit-unified-slow-retry-after` του διακομιστή (προεπιλογή 20s, όριο 5–600s, ±30% jitter) και επαναδοκιμάζουν, με φραγμό το `anthropic-ratelimit-unified-slow-max-wait` (προεπιλογή 20 min, όριο 1 min–6 h) — πέρα από αυτό η λωρίδα τερματίζεται και μια περίοδος ηρεμίας 10 λεπτών αποκλείει την εκ νέου αποδοχή. Η αναμονή επιπλέον περιορίζεται από ό,τι απομένει από το ίδιο το upstream-start timeout του αιτήματος (`resolveFetchStartTimeout`, 10 min από προεπιλογή) μείον ένα περιθώριο 5 s: χωρίς αυτό το όριο η προεπιλεγμένη μέγιστη αναμονή των 20 λεπτών θα ξεπερνούσε το αίτημα και ο ύπνος θα διακοπτόταν στα μισά της αναμονής, εμφανίζοντας `TimeoutError` αντί για το ομαλό τέλος `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, μια εναλλαγή παραθύρου 5h, ή `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (που την τερματίζει ως `extra_usage` σε οποιαδήποτε κατάσταση, καθώς το πληρωμένο overage πλέον καλύπτει τον τοίχο) τερματίζουν τη λωρίδα· η απόκριση τότε ρέει στην κανονική διαδρομή cooldown. Το `budget_exhausted` διατηρείται στη μνήμη μέχρι την ανακοινωμένη επαναφορά προϋπολογισμού (≤ 8 ημέρες).
- Ο έλεγχος τοίχου εκτελείται μετά τις δικές του intra-attempt επαναδοκιμές του executor που οδηγούνται από 400 (επεξεργασία context, περιορισμοί thinking/effort, αυτόματη εκμάθηση παραμέτρων), επομένως ένας τοίχος 429 που εμφανίζεται μόνο σε μία από αυτές τις επαναδοκιμές εξακολουθεί να υποκλέπτεται αντί να φτάνει στη διαδρομή cooldown.
- Η κατάσταση είναι στη μνήμη ανά σύνδεση (μια επανεκκίνηση κοστίζει ένα επιπλέον τοίχο 429 για εκ νέου αποδοχή).

**Επαναφορά ορίου συνεδρίας** (`autoLimitReset`, δοκιμάζεται πριν τη λωρίδα όταν και τα δύο είναι ενεργά):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → μπλοκ `juniper_tide`· όταν `arm: "reset"` και `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` με `{ "program": "juniper_tide" }` (UUID οργανισμού από `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → το αίτημα επαναδοκιμάζεται με πλήρη ταχύτητα (χωρίς κεφαλίδα slow). `already_used` / `not_offered` αποθηκεύουν στη μνήμη το `next_available_at` (προεπιλογή μία εβδομάδα)· οποιαδήποτε αποτυχία κάνει back off 15 λεπτά. Η επαναφορά γίνεται μία φορά την εβδομάδα και εξακολουθεί να μετράει στο εβδομαδιαίο όριο.

Φύλακες παλινδρόμησης: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Συγγένεια συνεδρίας (#7274)

**Εμβέλεια:** μία συνεδρία πελάτη (κεφαλίδα `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) καρφιτσωμένη σε μία σύνδεση, για **οποιονδήποτε** πάροχο.

**Σκοπός:** διατήρηση ενός multi-turn agent (Claude Code, aider, προσαρμοσμένοι agents) στον ίδιο λογαριασμό μεταξύ αιτημάτων, μειώνοντας την απώλεια context μεταξύ λογαριασμών και τα επαναλαμβανόμενα cold-start 429 σε παρόχους με κατάσταση συνεδρίας ανά λογαριασμό.

**Υλοποίηση:**

- Επίλυση TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Επιλογή/δημιουργία pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Εξαγωγή κεφαλίδας (γενική, οποιοσδήποτε πάροχος): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Πίνακας μόνιμων pin: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ρύθμιση: `sessionAffinityTtlMs` (καθολικό TTL σε ms, `0` απενεργοποιεί) — `src/lib/db/settings.ts`. Μετονομάστηκε από το Codex-only `codexSessionAffinityTtlMs` από τη μετανάστευση `124_generic_session_affinity_ttl.sql`, η οποία μεταφέρει οποιοδήποτε προηγουμένως ρυθμισμένο Codex TTL ως τη νέα προεπιλογή.

Πριν το #7274, το `resolveSessionAffinityTtlMs()` επέστρεφε άμεσα `0` για κάθε πάροχο εκτός από το `codex`, οπότε η ρύθμιση TTL (και οι κεφαλίδες συνεδρίας) δεν είχαν καμία επίδραση πουθενά αλλού, παρόλο που ο μηχανισμός pinning και η εξαγωγή κεφαλίδας ήταν ήδη ανεξάρτητα από τον πάροχο. Η διόρθωση αφαίρεσε αυτή την πρώιμη επιστροφή· το TTL πλέον εφαρμόζεται ομοιόμορφα σε κάθε πάροχο μόλις οριστεί καθολικά πάνω από `0`.

Οι τρεις κεφαλίδες συγγένειας συνεδρίας δεν προωθούνται ποτέ προς τα πάνω (upstream) — οι executors δημιουργούν τις δικές τους upstream κεφαλίδες από την αρχή αντί να περνούν τις κεφαλίδες πελάτη, οπότε αυτό παραμένει μόνο ένα εσωτερικό αναγνωριστικό συσχέτισης.

### Αποκλειστικές μισθώσεις σύνδεσης διαχειριζόμενης συνεδρίας

**Εμβέλεια:** ένας ενεργός διαχειριζόμενος HTTP client/συνεδρία κατέχει μία επιλέξιμη σύνδεση OmniRoute.

**Σκοπός:** παροχή ανθεκτικής αποκλειστικής κυριότητας σύνδεσης σε πελάτες που χρειάζονται ένα σκληρό φράγμα δρομολόγησης μεταξύ αιτημάτων. Αυτό διαφέρει από τη συγγένεια συνεδρίας, η οποία είναι μια ήπια προτίμηση συνέχειας: μια αποκλειστική μίσθωση διατηρεί την κατάσταση κύκλου ζωής σε SQLite, επιβάλλει καθολική μοναδικότητα ενεργού κατόχου και ενεργής σύνδεσης, και απορρίπτει μια παρωχημένη γενιά πριν από την αποστολή στον πάροχο.

Η δυνατότητα είναι opt-in ανά API key. Ένα διαχειριζόμενο key πρέπει να έχει το scope `lease:exclusive` και μια ρητή μη κενή λίστα `allowedConnections`. Οποιοσδήποτε HTTP client μπορεί να χρησιμοποιήσει το endpoint κύκλου ζωής· δεν απαιτείται όνομα πελάτη, user-agent, πάροχος, μέθοδος OAuth ή μοντέλο. Η μίσθωση κατέχει μια σύνδεση, όχι ένα μοντέλο, οπότε μια αλλαγή μοντέλου διατηρεί τη δέσμευση όσο η σύνδεση παραμένει κανονικά επιλέξιμη. Οι κανονικοί κανόνες μοντέλου, quota, health, cooldown και allowlist παραμένουν κυρίαρχοι και μπορούν να μεταβιβάσουν την ίδια γενιά σε άλλη ελεύθερη επιλέξιμη σύνδεση.

Ο κύκλος ζωής είναι `POST /api/v1/session-leases` με ενέργειες JSON `acquire`, `renew` και `release`.
Οι διαχειριζόμενες αιτήσεις συμπερασμάτων (managed inference) υποβάλλουν την αδιαφανή τιμή
`X-OmniRoute-Lease-Owner` και την ακριβή τιμή `X-OmniRoute-Lease-Generation`. Ο κάτοχος χρησιμοποιεί
το πρόθεμα `vlo_` ακολουθούμενο από 43 χαρακτήρες base64url· αποθηκεύεται μόνο ο κατακερματισμός
SHA-256 του. Κάθε τελικό φράγμα αποστολής (dispatch fence) δεσμεύει επίσης το αναγνωριστικό του
πιστοποιημένου κλειδιού API και το αναγνωριστικό της ενεργής σύνδεσης. Οι κεφαλίδες ελέγχου μίσθωσης
(lease) αφαιρούνται από τα αρχεία καταγραφής, τα διατηρούμενα στιγμιότυπα αιτήσεων και τις κεφαλίδες
του ανωτερού εκτελεστή (upstream executor).

Εάν η συνήθης δρομολόγηση διαθέτει επιλέξιμους διαχειριζόμενους υποψηφίους αλλά κάθε ελεύθερος
υποψήφιος είναι κατειλημμένος από μια ξένη ενεργή μίσθωση, το OmniRoute επιστρέφει HTTP `429`,
κωδικό lease-capacity-unavailable, κατάσταση αναμονής για χωρητικότητα και ένα φραγμένο
`Retry-After` που προκύπτει από την παλαιότερη σχετική λήξη. Η συνήθης κενή επιλεξιμότητα δεν
αποτελεί ανταγωνισμό μίσθωσης και διατηρεί την υπάρχουσα σημασιολογία σφαλμάτων δρομολόγησης.

Οι σχετικοί μηχανισμοί παραμένουν ξεχωριστοί:

- Η κατανομή συνεδρίας OAuth είναι τοπική ανά διεργασία μαλακή κατανομή για λογαριασμούς OAuth.
- Οι σημαφόροι λογαριασμών παρέχουν άδειες ταυτοχρονίας αιτήσεων και λήγουν όταν ολοκληρωθεί μια αίτηση.
- Οι αποκλειστικές μισθώσεις διαχειριζόμενων συνεδριών αποτελούν διαρκή κυριότητα κύκλου ζωής με φράγμα γενιάς.

---

## 3. Κλείδωμα Μοντέλου (Model Lockout)

**Εύρος:** τριάδα provider + connection + model.

**Εύρος κλειδιού ανά status:** το status της αποτυχίας αποφασίζει σε ποιο κλειδί γράφεται ένα κλείδωμα
(`resolveLockoutScope()` στο `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — σήμα quota ή δικαίωμα πρόσβασης — κλειδώνει την **οικογένεια quota**:
  για codex ολόκληρο το εύρος `codex` / `spark` (κάθε μοντέλο `gpt-5*` του
  connection), για άλλους providers το `getQuotaScopedModelForProvider()`.
- Το `404` κλειδώνει το γυμνό μοντέλο (το `getModelLockKey()` περιορίζει το `not_found`).
- Οποιοδήποτε άλλο status — αποτυχίες μεταφοράς/διακομιστή `5xx` και το δικό του
  συνθετικό `502` του OmniRoute από την επικύρωση ποιότητας — κλειδώνει **μόνο** την ακριβή
  τριάδα provider/connection/model. Μια κακή ροή σε ένα μοντέλο δεν αποτελεί απόδειξη
  για το quota του λογαριασμού· πριν από αυτόν τον κανόνα, μία κενή απάντηση στο
  `codex/gpt-5.6-luna` αφαιρούσε κάθε μοντέλο `gpt-5*` αυτού του connection από τη
  δρομολόγηση για 2–30 λεπτά (κλιμακούμενο) ενώ το quota του παρέμενε άθικτο.
- Η ρητή επιλογή `scope` του καλούντος υπερισχύει πάντα (το Antigravity περνά `"exact"`).

**Σκοπός:** αποφυγή απενεργοποίησης ολόκληρου connection όταν μόνο ένα μοντέλο είναι μη διαθέσιμο ή περιορισμένο σε quota.

**Παραδείγματα:**

- Providers με quota ανά μοντέλο που επιστρέφουν 429
- Τοπικοί providers που επιστρέφουν 404 για ένα μοντέλο που λείπει
- Αποτυχίες δικαιωμάτων mode/μοντέλου ειδικά του provider (π.χ. Grok modes)

**Υλοποίηση:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Πίνακας Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Παραθέτει τα ενεργά κλειδώματα με: provider, connection, μοντέλο, λόγο, expiresAt. Οι χειριστές μπορούν να επανενεργοποιήσουν χειροκίνητα ένα μοντέλο από την κάρτα.

**REST API:**

- `GET /api/resilience/model-cooldowns` — λίστα ενεργών κλειδωμάτων
- `DELETE /api/resilience/model-cooldowns` — χειροκίνητη επανενεργοποίηση. Σώμα: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Μία σελίδα για κάθε connection που βρίσκεται εκτός δρομολόγησης για παροδικό λόγο, αντί να
ανοίγετε κάθε σελίδα provider ξεχωριστά. Παραθέτει cooldowns connections, κλειδώματα μοντέλων και τελικές
καταστάσεις, τα καθαρίζει ανά connection, για μια επιλογή ή για όλα τα connections ενός provider,
και επεξεργάζεται τους πιο συχνά ρυθμιζόμενους κανόνες cooldown: `streamStallCooldown.enabled` και το
`connectionCooldown` βασικό cooldown και μέγιστα βήματα backoff για OAuth / API-key
(αποθηκεύονται μέσω
`PATCH /api/resilience`). Οι τελικές καταστάσεις (`banned`, `expired`, `credits_exhausted`)
παρατίθενται αλλά δεν καθαρίζονται ποτέ εδώ.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections με status, υπόλοιπο cooldown,
  επίπεδο backoff, τύπο τελευταίου σφάλματος και κλειδώματα μοντέλων (χωρίς διαπιστευτήρια)
- `POST /api/resilience/cooldowns` — σώμα `{connectionIds: string[]}` ή
  `{all: true, provider?}`· επιστρέφει `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ρυθμίσεων κλειδώματος + ανάκαμψη με εξασθένηση επιτυχίας (v3.8.23)

Το κλείδωμα μοντέλου πέρασε από μια πάντα ενεργή hardcoded συμπεριφορά σε μια πλήρως παραμετροποιήσιμη,
opt-in λειτουργία με τη δική της κάρτα ρυθμίσεων και μια αυτοϊαζόμενη διαδρομή ανάκαμψης.

**Κάρτα ρυθμίσεων:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Αυτή είναι **διακριτή** από την read-only `ModelCooldownsCard` παραπάνω (η οποία μόνο
_παραθέτει_ τα ενεργά κλειδώματα) — η νέα κάρτα _ρυθμίζει τις παραμέτρους_. Οι προεπιλογές
βρίσκονται στο `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ρύθμιση                 | Προεπιλογή                       | Σημασία                                                                            |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Κύριος διακόπτης — το κλείδωμα μοντέλου είναι **απενεργοποιημένο από προεπιλογή**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statuses που μετρούν ως αποτυχία επιπέδου μοντέλου.                       |
| `baseCooldownMs`        | `120_000` (120 s)                | Αρχική διάρκεια κλειδώματος για την πρώτη αποτυχία.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Όριο στο κλιμακούμενο cooldown.                                                    |
| `maxBackoffSteps`       | `10`                             | Μέγιστα βήματα κλιμάκωσης εκθετικού backoff.                                       |
| `useExponentialBackoff` | `true`                           | Αν οι επαναλαμβανόμενες αποτυχίες κλιμακώνουν το cooldown εκθετικά.                |

Οι ρυθμίσεις διατηρούνται μέσω του κανονικού settings store και επικυρώνονται μέσω του
resilience settings schema· η κάρτα περιορίζει τα `baseCooldownMs`/`maxCooldownMs`
(με `maxCooldownMs ≥ baseCooldownMs`) και το `maxBackoffSteps`.

**Ανάκαμψη με εξασθένηση επιτυχίας:** η ανάκαμψη **δεν** είναι καθαρά λήξη χρονομέτρου. Μια υγιής
απάντηση υποβαθμίζει τον μετρητή αποτυχιών του μοντέλου, ώστε ένα μοντέλο που ανέκαμψε
εντός του παραθύρου να σταματά να κλιμακώνεται (και να καθαρίζεται) πριν λήξει το χρονόμετρό του. Σε επιτυχή
στόχο combo, το `open-sse/services/combo.ts` καλεί το `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), το οποίο **υποδιπλασιάζει** τον αποθηκευμένο
`failureCount` (`Math.floor(failureCount / 2)`)· όταν φτάσει στο `0` η εγγραφή
κλειδώματος διαγράφεται εντελώς. Το αντίστοιχο `recordModelLockoutFailure()`
αυξάνει τον μετρητή (και κλιμακώνει το cooldown) σε αποτυχίες εντός του
παραθύρου κλιμάκωσης. Αυτή η εξασθένηση επιτυχίας έρχεται επιπλέον της απλής λήξης χρονομέτρου —
οποιαδήποτε από τις δύο διαδρομές μπορεί να επανενεργοποιήσει ένα μοντέλο.

**Κατάσταση:** τα κλειδώματα διατηρούνται **στη μνήμη** (per-process `Map`s με
`ModelLockoutEntry` με κλειδί `provider:connectionId:model`, κλειδώματα ακριβούς εύρους με
`provider:connectionId:exact:model`), δεν αποθηκεύονται στη
βάση δεδομένων — χάνονται σε επανεκκίνηση. Οι _ρυθμίσεις_ αποθηκεύονται μόνιμα· η ενεργή
_κατάσταση_ κλειδώματος είναι εφήμερη.

---

## 4. Έλεγχος συγχρονισμού Quota-Share (v3.8.36)

Οι λογαριασμοί συνδρομής (GLM, MiniMax κ.λπ.) συχνά δέχονται μόνο ~1–3 ταυτόχρονα
αιτήματα· η υπέρβαση αυτού προκαλεί σφάλματα 429 και περιόδους cooldown. Το πρόβλημα
είναι οξύ στα combos **quota-share** (`qtSd/…`), όπου πολλά API keys μοιράζονται
έναν upstream λογαριασμό. Τρία επίπεδα εμποδίζουν την πλημμύρα ενός κοινόχρηστου
λογαριασμού.

### Όριο συγχρονισμού ανά σύνδεση (`max_concurrent`)

Κάθε σύνδεση παρόχου μπορεί να δηλώσει ένα ανώτατο όριο `max_concurrent`
(`provider_connections.max_concurrent`, ορίζεται στο modal σύνδεσης / API / DB).
Αφήστε το κενό για κανένα όριο. Αυτό είναι το μοναδικό χειριστήριο που οδηγεί το
επίπεδο σειριοποίησης παρακάτω — ορίστε το στον πραγματικό συγχρονισμό του
λογαριασμού (π.χ. GLM ~1, MiniMax ~2).

### Όρια συγχρονισμού ανά μοντέλο (`modelConcurrency`)

Μια σύνδεση μπορεί επιπλέον να δηλώσει ακριβή ανώτατα όρια συγχρονισμού ανά
μοντέλο μέσα στο map `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ορίστε το στο modal σύνδεσης (**Rate limit overrides → Per-model
concurrency caps**, ένα `model=cap` ανά γραμμή) ή μέσω
`PATCH /api/providers/[id]` με το ίδιο σχήμα JSON. Βασική σημασιολογία:

- **Σε επίπεδο σύνδεσης έναντι ανά μοντέλο:** το `maxConcurrent` παραμένει το
  κοινό ανώτατο όριο σε επίπεδο σύνδεσης. Όταν ισχύουν και τα δύο, και οι δύο
  πύλες αποκτώνται ατομικά στην ίδια σύνθετη πύλη
  (`global → provider → account → model`)· η πραγματική συμπεριφορά είναι το
  αυστηρότερο ισχύον όριο.
- **Ακριβής αντιστοίχιση κλειδιού μοντέλου:** το κλειδί είναι η συμβολοσειρά
  μοντέλου που περνά στον executor μετά την επίλυση δρομολόγησης — συνήθως το
  σκέτο upstream id μοντέλου (`glm-5`), όχι ένα ψευδώνυμο `provider/model` από
  την πλευρά του πελάτη (το `zai/glm-5` δεν αντιστοιχεί στο `glm-5`). Οι τιμές
  είναι θετικοί ακέραιοι που ορίζουν ανώτατα όρια ταυτόχρονων αιτημάτων.
- **Τοπική ουρά αναμονής, χωρίς ανακάλυψη:** τα πλεονάζοντα αιτήματα μπαίνουν
  σε τοπική ουρά με την υπάρχουσα σημασιολογία ουράς/timeout (τυποποιημένα
  σφάλματα αποδοχής `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). Το OmniRoute
  δεν ανακαλύπτει ούτε συνάγει την upstream πολιτική — επιβάλλει ακριβώς τα
  ανώτατα όρια που διαμόρφωσε ο χειριστής. Μια κορεσμένη πύλη μοντέλου δεν
  απενεργοποιεί ποτέ τον πάροχο και δεν δημιουργεί ποτέ μόνιμο κλείδωμα
  μοντέλου· η upstream συμπεριφορά 429/cooldown/fallback παραμένει το τελευταίο
  δίχτυ ασφαλείας για τα σφάλματα.
- **Εύρος ανά σύνδεση, ανά διεργασία:** τα όρια ισχύουν ανά εγγραφή σύνδεσης
  στη βάση δεδομένων και διατηρούνται στη μνήμη, επομένως δύο συνδέσεις που
  επαναχρησιμοποιούν το ίδιο upstream API key δεν συντονίζονται μεταξύ τους.
- **Χωρίς διαμόρφωση σημαίνει αμετάβλητη συμπεριφορά:** η παράλειψη του map
  (ή το κενό πεδίο στον πίνακα ελέγχου) δεν προσθέτει καμία πύλη μοντέλου.
  Παράδειγμα διαμόρφωσης χωρίς να επιβάλλεται κανένα καθολικό όριο παρόχου:

```text
glm-5=1
glm-4.7=3
```

### Σειριοποίηση αιτημάτων quota-share

Όταν μια αποστολή quota-share στοχεύει σύνδεση που δηλώνει θετικό
`max_concurrent`, τα ταυτόχρονα αιτήματα προς αυτόν τον **λογαριασμό**
σειριοποιούνται μέσω ενός σημαφόρου ανά σύνδεση (κλειδί `qsconn:<connectionId>`):
τα πλεονάζοντα αιτήματα **περιμένουν στην ουρά** αντί να πλημμυρίζουν τον
λογαριασμό. Είναι **fail-open** — μια κορεσμένη ουρά ή ένα timeout προχωρά
χωρίς θέση, αντί να απορρίψει ποτέ ένα αίτημα που μπορεί να αποσταλεί.
Εναλλαγή στα **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
προεπιλογή ενεργό). Χωρίς όριο `max_concurrent` η συμπεριφορά παραμένει
αμετάβλητη.

> Η πύλη δρομολόγησης quota-share (`selectQuotaShareTarget`, DRR + P2C) είναι
> η ίδια fail-open και μόνο _υποβαθμίζει την προτεραιότητα_ μιας σύνδεσης που
> έχει φτάσει στο όριο — με pool μίας σύνδεσης δεν μπορεί να επιβάλει σκληρό
> όριο, οπότε αυτός ο σημαφόρος είναι που περιορίζει πραγματικά την πλημμύρα.

### Επανάληψη combo με επίγνωση cooldown

Για κάθε στρατηγική combo (όταν είναι ενεργή), ένα αίτημα που θα κατέληγε σε
429 λόγω ΣΥΝΤΟΜΗΣ παροδικής περιόδου cooldown την αναμένει και επαναποστέλλει
αντί να επιστρέψει το 429 — αυτό καλύπτει παράθυρα TPM/RPM τύπου Gemini
(~60s retry-after) σε combos πολλαπλών μοντέλων, π.χ. όταν και οι δύο στόχοι
ενός combo 2 μοντέλων συναντούν όριο ρυθμού ανά μοντέλο. Περιορίζεται από το
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) στα
**Settings → Resilience**. Δεν περιμένει ποτέ σε `quota_exhausted` (κλειδωμένο
μέχρι τα μεσάνυχτα) ούτε σε αιτίες auth/not-found.

Η ίδια πύλη καλύπτει και την περίπτωση πριν από την αποστολή (#16319): όταν
κάθε στόχος ενός combo παραλείπεται πριν γίνει οποιαδήποτε προσπάθεια, επειδή
το μοντέλο του βρίσκεται σε σύντομο παροδικό κλείδωμα, η διαδρομή μηδενικών
προσπαθειών αναμένει τη λήξη του κλειδώματος υπό τα ίδια ανώτατα όρια και
επαναποστέλλει, αντί να απαντήσει με ένα `503 ALL_TARGETS_SKIPPED` χωρίς hint.
Όταν δεν επιτρέπεται αναμονή (εξαντλήθηκε το ανώτατο όριο, οι προσπάθειες ή
ο προϋπολογισμός, ή η δυνατότητα είναι απενεργοποιημένη), η τελική απόκριση
αναβαθμίζεται σε `429 rate_limit_error` φέροντας `retry_after` / `reset_at`
από την πρωιμότερη λήξη παροδικού κλειδώματος· τα κλειδώματα quota, auth και
not-found διατηρούν το 503 χωρίς hint.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Έλεγχος Αποδοχής Ουράς Αιτημάτων (v3.8.49 · issue #6593)

**Εύρος**: η τοπική ουρά ορίου ρυθμού ανά πάροχο+σύνδεση (`open-sse/services/rateLimitManager.ts`,
με υποστήριξη από το Bottleneck), ένα επίπεδο κάτω από τους τρεις μηχανισμούς παραπάνω.

**Το `maxWaitMs` θέτει όριο στην αναμονή στην ουρά· το `executionMaxWaitMs` θέτει όριο στην εκτέλεση.**
Τα δύο είναι σκόπιμα ξεχωριστά και κανένα δεν τροφοδοτεί το άλλο.

Το `resilienceSettings.requestQueue.maxWaitMs` είναι ο **προϋπολογισμός αναμονής στην ουρά**: καλύπτει
την αναμονή για μια θέση παρόχου και στη συνέχεια την παραμονή σε κατάσταση QUEUED, και ο χρονομετρητής του
μηδενίζεται τη στιγμή που η εργασία εγκαταλείπει το QUEUED και αρχίζει να εκτελείται
(`rateLimitManager.ts`, `wrappedFn`). Ένα αίτημα που τον υπερβαίνει δεν φτάνει ποτέ
στο upstream. Προεπιλογή 30000ms, παρέχεται από το `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
στο `src/lib/resilience/settings.ts` και καρφιτσώνεται από το
`tests/unit/ratelimit-admission-control-6593.test.ts`, ώστε μια αλλαγή σε αυτό να κάνει
εκείνο το τεστ κόκκινο αντί να αφήνει αυτή την παράγραφο σιωπηλά απαρχαιωμένη.

Το `resilienceSettings.requestQueue.executionMaxWaitMs` είναι αυτό που λαμβάνει το Bottleneck
ως `expiration` της εργασίας, του οποίου ο χρονομετρητής ξεκινά μόνο μετά την αποστολή. Είναι
ένα δίχτυ ασφαλείας για εκτελεστές χωρίς δικό τους timeout στο upstream, και
αυξάνεται στο δικό του εκτελεστή timeout έναρξης fetch όταν αυτό είναι μεγαλύτερο, ώστε
να μην μπορεί να κόψει μια υγιή απόκριση εν ώρα πτήσης. Προεπιλογή 600000ms (10 λεπτά).

Η τροφοδοσία του προϋπολογισμού ουράς στο `expiration` είναι αυτό που παλιότερα σκότωνε τις μη
αυξητικές πύλες (non-incremental gateways) στο μέσο της πτήσης — αυτές εκτελούνται νόμιμα για λεπτά πριν από τα πρώτα bytes —
και είναι ο λόγος που ένα expiration εμφανίζεται ως `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ενώ ο προϋπολογισμός ουράς φέρει τον
κωδικό queue-timeout. Παρακάμψτε οποιοδήποτε από τα δύο μέσω `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ή του πίνακα ελέγχου
(**Settings → Resilience**). Και τα δύο περιορίζονται (clamp) σε 1ms–24h κατά την κανονικοποίηση.

**Προτεραιότητα, και για τα δύο:** η μεταβλητή περιβάλλοντος παρέχει μόνο την _προεπιλογή_. Μια τιμή
αποθηκευμένη στο `resilienceSettings.requestQueue` (πίνακας ελέγχου / API patch, αποθηκευμένη
στο `key_value`) υπερισχύει αυτής, και ένα ανά σύνδεση
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` υπερισχύει εκείνης. Ο ορισμός
της μεταβλητής περιβάλλοντος σε μια εγκατάσταση που έχει ήδη αποθηκευμένη τιμή επομένως
δεν αλλάζει τίποτα — αντ' αυτού καθαρίστε ή ενημερώστε την αποθηκευμένη ρύθμιση.

Η παραμονή στην ουρά περιορίζεται από το `maxWaitMs`· το `maxQueueDepth` παρακάτω περιορίζει πόσοι
καλούντες μπορούν να βρίσκονται σε ουρά ταυτόχρονα.

**Επαναλήψεις που δηλώνονται στο σώμα: ρύθμιση ρυθμού έναντι αποκλεισμού.** Ένα σώμα 429 μπορεί να ονομάσει τη δική του αναμονή
(Gemini `RetryInfo.retryDelay`, κείμενο "retry after Ns"), την οποία
διαβάζει το `updateFromResponseBody`. Μια αναμονή που χωρά στο `maxWaitMs`
της σύνδεσης είναι ρύθμιση ρυθμού (pacing): ο περιοριστής αδειάζει τη δεξαμενή του για τόσο χρόνο και οι κλήσεις σε ουρά
αποστέλλονται όταν αυτή ξαναγεμίσει. Μια αναμονή μεγαλύτερη από το `maxWaitMs` δεν είναι κάτι που η
ουρά μπορεί να περιμένει — το Gemini απαντά σε εξαντλημένη ημερήσια ποσόστωση με
`retryDelay: "86399s"`. Το αναμεταδιδόμενο `Retry-After` στο ανακατασκευασμένο 429 (#16528)
ήδη κάνει τη μηχανή fallback να κλειδώνει το μοντέλο για εκείνο το παράθυρο, αλλά η παύση
του περιοριστή γι' αυτό επίσης θα καθυστερούσε ακόμα οποιαδήποτε κλήση φτάσει νωρίς στο κλειδί
(μετά από μια επαναφορά resilience, για παράδειγμα) για ολόκληρο το `maxWaitMs`. Όταν μια τέτοια αναμονή προέρχεται από ένα τυποποιημένο πεδίο Google `RetryInfo`
(η προέλευση `google_rpc_retry_info`) και ο περιοριστής του κλειδιού είναι
ήδη προσαρμοσμένος στο μοντέλο (βλ. `getLimiterKey`), το 429 γίνεται αντ' αυτού
αποκλεισμός μοντέλου σε εκείνη τη σύνδεση (`lockModelForLongBodyRetry` στο
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, με ανώτατο όριο 24h), και ο
περιοριστής παραμένει χωρίς παύση. Η επιλογή λογαριασμού παρακάμπτει βάσει αυτού του κλειδώματος μέσω
`isModelLocked()`, και το ίδιο κάνει η πύλη πριν την αποστολή του combo για στόχους καρφιτσωμένους
στη σύνδεση. Στο antigravity, του οποίου ο περιοριστής είναι ανά οικογένεια ποσόστωσης, το κλείδωμα είναι
στο ακριβές μοντέλο, όπως τα άλλα του κλειδώματα ποσόστωσης. Το όνομα που ζήτησε ο πελάτης
κλειδώνεται επίσης όταν ένα alias το ανέλυσε σε εκείνο το μοντέλο, επειδή εκείνοι οι έλεγχοι χρησιμοποιούν
το ζητούμενο όνομα· κλειδώνεται ακριβώς (`lockExactModel`), ώστε ένα alias που
διασχίζει μια οικογένεια ποσόστωσης antigravity ή ένα εύρος codex δεν κλειδώνει ποτέ το δικό του. Μια
υπόδειξη σε πεζό κείμενο, ένα μη τυποποιημένο `retryDelay`, ή ένας
περιοριστής κοινός για ολόκληρη τη σύνδεση διατηρεί την παύση. Όταν ο περιοριστής που
η διαδρομή 429 μόλις ανακατασκεύασε κάνει όντως παύση, ένας καλών του οποίου ο εναπομένων χρόνος ουράς τελειώνει
πριν τελειώσει η παύση απορρίπτεται αμέσως με τον κωδικό queue-timeout
(`checkLimiterPause`) αντί να περιμένει να λήξει εκείνος ο χρόνος· το καταγεγραμμένο τέλος είναι
αγκυροβολημένο πριν δημιουργηθεί ο περιοριστής, εκεί όπου το Bottleneck ξεκινά το ρολόι
ανανέωσής του, και οποιαδήποτε μεταγενέστερη αλλαγή στη δεξαμενή το ξεχνά. Καλύπτεται από
τα `tests/unit/rate-limit-long-body-retry-lockout.test.ts` και
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — προαιρετικό όριο αποδοχής (νέο).** Το `resilienceSettings.requestQueue.maxQueueDepth`
περιορίζει πόσα αιτήματα μπορούν να βρίσκονται σε ουρά (δεν έχουν ακόμη αποσταλεί) για έναν
πάροχο+σύνδεση ταυτόχρονα. Όταν η ουρά κρατά ήδη `maxQueueDepth`
αιτήματα, ένα νέο αίτημα απορρίπτεται ταχέως με έναν τυποποιημένο σφάλμα
`code: "RATE_LIMIT_QUEUE_FULL"` **πριν** φτάσει ποτέ στο `limiter.schedule()`
— έτσι η απόρριψη είναι φθηνή και συμβαίνει πριν από οποιαδήποτε downstream
εργασία συμπίεσης prompt / μετάφρασης για εκείνο το αίτημα. Προεπιλογή `0` =
απενεργοποιημένο, διατηρώντας την υπάρχουσα συμπεριφορά ουράς χωρίς όριο· περιορισμένο σε 0–100000.
Παράκαμψη μέσω `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ή
`resilienceSettings.requestQueue.maxQueueDepth` (πίνακας ελέγχου/API patch).

Ο ίδιος ο έλεγχος αποδοχής είναι μια καθαρή συνάρτηση
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ώστε
να είναι δυνατός ο έλεγχος μονάδας (unit test) χωρίς πραγματικό περιοριστή Bottleneck.

> Το RFC που άνοιξε το #6593 πρότεινε επίσης μια σημαία
> `bypassCompressionOnRateLimit`. Το pipeline
> `open-sse/services/compression/` αυτού του αποθετηρίου αφορά συμπίεση
> prompt/πλαισίου στο εξερχόμενο αίτημα LLM (`chatCore.ts`, γύρω από το
> μπλοκ `resolveCompressionSettings`/`selectCompressionStrategy`), όχι
> συμπίεση απόκρισης HTTP σε συνθετικά σώματα 429 — δεν υπάρχει αντίστοιχη
> διαδρομή κώδικα για μια κυριολεκτική σημαία παράκαμψης. Αυτό το βήμα
> συμπίεσης prompt εκτελείται επί του παρόντος _πριν_ από το
> `withRateLimit()` στο pipeline του αιτήματος, επομένως η αναδιάταξη ώστε
> να παραλείπεται σε απόρριψη λόγω γεμάτης ουράς είναι μια ξεχωριστή,
> μεγαλύτερη αλλαγή από το εύρος αυτού του issue· σκόπιμα **δεν**
> υλοποιήθηκε εδώ και αφήνεται ως follow-up, αν το κέρδος εξοικονόμησης CPU
> αξίζει τον κίνδυνο της αναδιάταξης.

### Δίχτυ Ασφαλείας Αυτόματης Ενεργοποίησης Rate-Limit & Προστασία Σύνδεσης (`rateLimitProtection`)

**Δίχτυ ασφαλείας αυτόματης ενεργοποίησης** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, προεπιλογή `true`):
Από προεπιλογή, το OmniRoute ενεργοποιεί αυτόματα την προστασία ουράς rate-limit για όλες τις ενεργές συνδέσεις παρόχων με κλειδί API (`getProviderCategory(provider) === "apikey"`). Αυτό διασφαλίζει ότι τα εισερχόμενα αιτήματα προς upstream κλειδιά API με ευαισθησία στον ρυθμό μπαίνουν σε ουρά και περιορίζονται μέσω Bottleneck, αντί να ξεσπούν σε upstream σφάλματα 429. Το δίχτυ ασφαλείας μπορεί να παρακαμφθεί μέσω της μεταβλητής περιβάλλοντος `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` το απενεργοποιεί, `true`/`1`/`on` το επιβάλλει), η οποία υπερισχύει της αποθηκευμένης ρύθμισης του πίνακα ελέγχου (**Ρυθμίσεις → Ανθεκτικότητα** / `PATCH /api/resilience`).

**Σημασιολογία του ανά-σύνδεση `rateLimitProtection`:**
Η ανά-σύνδεση προστασία rate-limit παρακολουθείται μέσω του δυαδικού πεδίου `rateLimitProtection` στις συνδέσεις παρόχων (αποθηκεύεται ως `rate_limit_protection` στην SQLite):

- **Ρητή ενεργοποίηση (`rateLimitProtection === true`)**: Η προστασία rate-limit ενεργοποιείται ρητά για αυτή τη σύνδεση, ανεξάρτητα από την κατηγορία του παρόχου ή από το αν το δίχτυ ασφαλείας αυτόματης ενεργοποίησης είναι ενεργό.
- **Ρητή απενεργοποίηση (`rateLimitProtection === false`)**: Απενεργοποιεί τη ρητή προστασία, αλλά **δεν** εξαιρεί μια ενεργή σύνδεση κλειδιού API από το καθολικό δίχτυ ασφαλείας αυτόματης ενεργοποίησης. Στην `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), το `false` και το `undefined` είναι ισοδύναμα: μόνο το `rateLimitProtection === true` αντιμετωπίζεται ως ρητή παράκαμψη. Αν το `rateLimitProtection` είναι `false` (ή δεν έχει οριστεί), μια ενεργή σύνδεση κλειδιού API εξακολουθεί να ικανοποιεί τη συνθήκη αυτόματης ενεργοποίησης και παραμένει προστατευμένη από rate-limit.
- **Καμία εξαίρεση ανά σύνδεση**: Ένας χειριστής δεν μπορεί επί του παρόντος να εκφράσει «αυτή η μεμονωμένη ενεργή σύνδεση κλειδιού API πρέπει να λειτουργεί χωρίς προστασία ουράς rate-limit» διατηρώντας παράλληλα την αυτόματη ενεργοποίηση ενεργή για τις υπόλοιπες. Για να λειτουργήσουν οι συνδέσεις κλειδιών API εντελώς χωρίς ουρές rate-limit, το δίχτυ ασφαλείας πρέπει να απενεργοποιηθεί καθολικά (`RATE_LIMIT_AUTO_ENABLE=false` ή `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Υποστηριζόμενες διαδρομές εγγραφής:**

- **`POST /api/rate-limits`**: Η υποστηριζόμενη διαδρομή εγγραφής διαχείρισης για εναλλαγή του `rateLimitProtection` μιας σύνδεσης (`{ connectionId: string, enabled: boolean }`). Η κλήση με `enabled: true` ενεργοποιεί τη ρητή προστασία· η κλήση με `enabled: false` αφαιρεί τη ρητή προστασία (αν και οι ενεργές συνδέσεις κλειδιών API παραμένουν καλυμμένες από το καθολικό δίχτυ ασφαλείας, εφόσον η αυτόματη ενεργοποίηση είναι ενεργή).
- **`PUT /api/providers/[id]`**: Σκόπιμα **δεν** δέχεται ούτε αλλάζει το `rateLimitProtection` (#11278). Η ενημέρωση των μεταδεδομένων σύνδεσης παρόχου μέσω `PUT /api/providers/[id]` δεν θα αλλάξει ποτέ την αποθηκευμένη κατάσταση προστασίας rate-limit.

---

## 6. Watchdog ρυθμού απόδοσης αργής ροής (#9709)

Ο προαιρετικός φύλακας `resilienceSettings.streamRecovery.throughputWatchdog` εντοπίζει
ένα upstream που εξακολουθεί να στέλνει chunks αλλά παράγει έξοδο βοηθού κάτω από τον
διαμορφωμένο ρυθμό χρήσιμης εξόδου. Είναι σκόπιμα διακριτός από το χρονικό όριο αδράνειας:
τα heartbeats και τα μεταδεδομένα δεν επαναφέρουν κανέναν από τους δύο χρονομετρητές και
δεν μετρούν ως πρόοδος. Είναι επίσης διακριτός από τη σκληρή προθεσμία προσπάθειας (#9153),
η οποία παραμένει ένα απόλυτο ανώτατο όριο ασφαλείας ανεξάρτητα από την ποιότητα της εξόδου.

Ο watchdog απαιτεί μια περίοδο προθέρμανσης ακολουθούμενη από ένα πλήρες κυλιόμενο παράθυρο
προτού μπορέσει να ακυρώσει. Μετρά δέλτα κειμένου από συμβάντα εξόδου των Chat Completions
και Responses API (ένας συντηρητικός δείκτης προσέγγισης σε bytes UTF-8), αγνοεί συμβάντα
μόνο-χρήσης και κενά συμβάντα, και αναστέλλει την κρίση όσο συμβάντα tool-call ή reasoning
είναι σε εξέλιξη. Είναι απενεργοποιημένος από προεπιλογή και μπορεί να ενεργοποιηθεί με
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`· το παράθυρο, η προθέρμανση, ο ελάχιστος ρυθμός
και η ελάχιστη μετρήσιμη έξοδος περιορίζονται από το κανονικό επίπεδο κανονικοποίησης
των ρυθμίσεων ανθεκτικότητας.

Όταν είναι ενεργοποιημένος, μια ακύρωση από τον watchdog εφαρμόζεται μόνο στην ενεργή
προσπάθεια upstream. Πριν από οποιαδήποτε bytes ορατά στον πελάτη, η υπάρχουσα διαδρομή
έγκαιρης ανάκτησης του ίδιου λογαριασμού μπορεί να ξανανοίξει την προσπάθεια. Μετά το
commit, η ροή δεν επαναλαμβάνεται ποτέ τυφλά· μόνο το υπάρχον ασφαλές συμβόλαιο συνέχισης
ενδιάμεσης ροής μπορεί να ράψει ένα επίθημα. Η ολοκλήρωση παραμένει μονής εκτέλεσης, ώστε
η καταμέτρηση χρήσης και η απελευθέρωση του σημαφόρου να μην διπλασιάζονται.

---

## 7. Αναδιατύπωση Κατάστασης Upstream (σφάλματα quota με λανθασμένη κατάσταση)

**Εύρος:** ένα upstream gateway που αναφέρει προσωρινή εξάντληση quota με λάθος κατάσταση HTTP.

**Σκοπός:** διόρθωση μιας παραπλανητικής κατάστασης ΠΡΙΝ από την ταξινόμηση, ώστε οι downstream καταναλωτές (μηχανή fallback, συνάθροιση combo, η απόκριση προς τον πελάτη) να βλέπουν την πραγματική, επαναληψίμη φύση της αποτυχίας.

Ορισμένα gateways σηματοδοτούν ΠΡΟΣΩΡΙΝΗ εξάντληση quota με μη επαναληψίμη
κατάσταση HTTP. Το `agentrouter.org` επιστρέφει `403` (μερικές φορές `400`) με
κινέζικο σώμα (`用户额度不足` / `额度不足`) αντί για το τυπικό `429`. Πελάτες
όπως το Claude Code αντιμετωπίζουν το `403` ως μόνιμο και ματαιώνουν τη
συνεδρία, και χωρίς διόρθωση η μηχανή fallback θα το ταξινομούσε ως
`AUTH_ERROR` αντί για συμβάν quota.

**Υλοποίηση:**

- Μητρώο + matcher: `open-sse/config/upstreamStatusRestatement.ts` — μια λίστα
  κανόνων ανά πάροχο (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), με αντιστοίχιση μέσω
  `applyStatusRestatement()`.
- Σημείο κλήσης: το μπλοκ `providerFailure:` στο
  `open-sse/handlers/chatCore.ts` (περίπου στη γραμμή 3654), αμέσως μετά την
  ανάλυση μιας upstream απόκρισης με κατάσταση σφάλματος HTTP
  (`!providerResponse.ok`) από το `parseUpstreamError()`, και πριν εκτελεστεί
  οποιαδήποτε ταξινόμηση, ώστε κάθε downstream καταναλωτής να βλέπει τη
  διορθωμένη κατάσταση. Σφάλματα ενσωματωμένα μέσα σε ένα stream SSE `200`
  ακολουθούν ξεχωριστή, μεταγενέστερη διαδρομή ανάλυσης stream και **δεν**
  καλύπτονται από αυτό το hook σήμερα — γνωστός περιορισμός, που δεν
  χρειάζεται ακόμη για τη λανθασμένη κατάσταση του agentrouter (η οποία
  εμφανίζεται ως κατάσταση σφάλματος HTTP).
- Καταλληλότητα επανάληψης: το `429` περιλαμβάνεται στις
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), οπότε ένα αναδιατυπωμένο
  σφάλμα φέρει πραγματικό παράθυρο επανάληψης αντί να εμφανίζεται ως νεκρό
  `403`.
- Το συνθετικό `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  είναι μόνο αυτό που η αναδιατυπωμένη απόκριση λέει στον **πελάτη**· δεν είναι
  από μόνο του η εσωτερική διάρκεια cooldown/lockout της σύνδεσης — αυτή
  ρυθμίζεται ξεχωριστά από όποιον μηχανισμό χειρίζεται πραγματικά το
  αναδιατυπωμένο σφάλμα (το κλιμακούμενο backoff του Connection Cooldown, §2,
  βάση `3s` για παρόχους API-key· ή το Model Lockout, §3, για παρόχους
  per-model-quota όπως το agentrouter). Ο router μπορεί να καταστεί επιλέξιμος
  για εσωτερική επανάληψη νωρίτερα από το παράθυρο των 60s που διαφημίζει στον
  πελάτη — σκόπιμο περιθώριο, όχι bug.

Μόνιμα σφάλματα (το `无权访问模型` του agentrouter — δεν υπάρχει πρόσβαση σε
αυτό το μοντέλο) ΔΕΝ αναδιατυπώνονται ΠΟΤΕ: τα `excludeMarkers` ακυρώνουν τον
κανόνα ακόμη κι όταν τα `textMarkers` ταιριάζουν, ώστε το σφάλμα να διατηρεί
την αρχική του κατάσταση και τίποτα να μην το επαναλαμβάνει επ' άπειρον. Ο
αντίστοιχος κανόνας ταξινόμησης παρόχου (`agentrouter-model-access-denied` στο
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, δηλωμένο βασικό cooldown `6h`) λαμβάνεται υπόψη από το
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _πριν_ από το
γενικό early-return `FORBIDDEN` της κατηγορίας apikey, με έλεγχο μέσω
`honorsRuleLockScope(provider)` (#10334 — προς το παρόν αποκλειστικά για το
agentrouter μέσω της allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο
`providerErrorRules.ts`). Το δηλωμένο cooldown των 6h του κανόνα ρέει ως
`fallbackResult.baseCooldownMs`, αλλά εξακολουθεί να τροφοδοτεί την
προϋπάρχουσα διαδρομή lockout per-model-quota (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, αμετάβλητη από το #10334 εκτός από την πηγή του
cooldown): περιορίζεται στο `mlSettings.maxCooldownMs` του χειριστή
(προεπιλογή `1_800_000ms` / 30min), όπως κάθε άλλο model lockout, και ο
_διατηρούμενος λόγος lockout_ παραμένει η προϋπάρχουσα hardcoded τιμή
`"forbidden"`, όχι το `"auth_error"` του κανόνα — μόνο η διάρκεια του cooldown
τιμάται από άκρο σε άκρο, όχι το string του λόγου. Η ίδια η σύνδεση παραμένει
ενεργή· τα αδελφά μοντέλα στην ίδια σύνδεση δεν επηρεάζονται.

Τα αναδιατυπωμένα σφάλματα quota (`额度不足`) φτάνουν σε κανόνα παρόχου στην
παραγωγή (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, χωρίς δικό του δηλωμένο cooldown — εφαρμόζεται η
προεπιλογή κλιμακούμενου backoff του επιπέδου persistence). Από το #10334, το
`scope` στο `ProviderErrorRuleMatch` ΠΡΑΓΜΑΤΙ καταναλώνεται από άκρο σε άκρο,
αλλά **μόνο** για παρόχους στην allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — σήμερα μόνο `"agentrouter"`, με έλεγχο μέσω
`honorsRuleLockScope()`). Για κάθε άλλο πάροχο, το `scope` παραμένει
ενημερωτικό, ακριβώς όπως πριν από το #10334. Το `checkFallbackError`
εμφανίζει το scope του κανόνα που ταίριξε ως `fallbackResult.ruleScope`· το
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) είναι ο
κοινός guard που επιβεβαιώνει ότι ένα `ruleScope` είναι πραγματικά ασφαλές να
τιμηθεί ως σήμα σε επίπεδο σύνδεσης με αυτοανάκαμψη (scope `"connection"`,
reason `quota_exhausted`, ποτέ `permanent`, ποτέ `creditsExhausted` — άμυνα
απέναντι σε έναν μελλοντικό κανόνα που θα συνδυάζει scope `"connection"` με
μόνιμη κατάσταση λογαριασμού). Δύο καταναλωτές το καλούν:

- **Επιμονή** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  αντί να πέφτει στον κλάδο κλειδώματος **ανά μοντέλο** του passthrough-provider
  (το agentrouter είναι `passthroughModels: true` → το `hasPerModelQuota()`
  επιστρέφει `true`), εφαρμόζει ένα **προσωρινό cooldown σύνδεσης** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ποτέ μια τελική κατάσταση
  (`credits_exhausted`/`banned`/`expired`) — έτσι ώστε η σύνδεση να αυτο-ανακτάται
  μόλις λήξει το cooldown, αντί να απαιτεί χειροκίνητη επαναφορά διαπιστευτηρίων.
  Παραλείπεται για συνδέσεις με `disableCooling: true` (#2997): αυτή η opt-out
  πέφτει αντίθετα στο κλείδωμα ανά μοντέλο (μια τεκμηριωμένη αντιστάθμιση —
  δείτε το σχόλιο κώδικα πάνω από τον κλάδο).
- **Δρομολόγηση combo στο ίδιο αίτημα** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ο ίδιος έλεγχος σημειώνει τη
  σύνδεση στο εν-μνήμη σύνολο `exhaustedConnections`, με κλειδί
  `${provider}:${connectionId}`. Αυτό παραλείπει μόνο έναν εναπομείναντα στόχο
  ΙΔΙΟΥ ΑΙΤΗΜΑΤΟΣ που _ο ίδιος ήδη φέρει ακριβώς εκείνο το `connectionId`_ στο
  δικό του αντικείμενο στόχου (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` πριν από την αναζήτηση στο `exhaustedConnections`) — ένα απλό
  combo λίστας μοντέλων, όπου οι αδελφοί στόχοι δεν φέρουν δικό τους καρφιτσωμένο
  `connectionId` και ένας επιλύεται μόνο ανά αποστολή από την κεφαλίδα
  `X-OmniRoute-Selected-Connection-Id` της απάντησης, δεν πετυχαίνει ποτέ αυτήν
  την αντιστοίχιση κλειδιού. Για αυτήν την κοινή περίπτωση, η πραγματική
  προστασία έναντι της επαναχρησιμοποίησης του μόλις εξαντλημένου λογαριασμού
  από ένα εναπομείναν σκέλος ΔΕΝ είναι αυτό το Set — είναι το επίπεδο επιμονής
  παραπάνω (το `rateLimitedUntil` της σύνδεσης είναι πλέον στο μέλλον) σε
  συνδυασμό με τον ίδιο αυτόν έλεγχο που καταστέλλει τα
  `transientRateLimitedProviders` για την αποτυχία (δείτε "Σχεδιασμός δύο σταδίων"
  και το σχόλιο κώδικα στον κλάδο `isAgentrouterConnectionQuotaScope` στο
  `targetExhaustion.ts`): με αυτό το Set χωρίς σήμανση, το force-allow
  `allowRateLimitedConnection` του `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ΔΕΝ ενεργοποιείται για
  τα εναπομείναντα σκέλη του provider, οπότε το φίλτρο `rateLimitedUntil` της
  επιλογής διαπιστευτηρίων (`src/sse/services/auth.ts:1238`) τηρείται κανονικά
  και ένα εναπομείναν σκέλος είτε επιλέγει μια διαφορετική, ακόμη επιλέξιμη
  σύνδεση agentrouter είτε αποτυγχάνει χωρίς διαθέσιμα διαπιστευτήρια — δεν
  ανοίγει δια της βίας δρόμο πίσω στη σύνδεση που αυτός ο κλάδος μόλις έθεσε
  σε cooldown.

### Σχεδιασμός δύο σταδίων: αναδιατύπωση κατάστασης, έπειτα ταξινόμηση

Η αναδιατύπωση κατάστασης (`upstreamStatusRestatement.ts`) και οι κανόνες
ταξινόμησης provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) είναι ξεχωριστά μητρώα που και τα δύο κλειδώνουν με βάση
το provider id και δείκτες κειμένου, αλλά εκτελούνται σε διαφορετικά σημεία και
εξυπηρετούν διαφορετικούς σκοπούς: η αναδιατύπωση ξαναγράφει την κατάσταση HTTP
νωρίς στο `chatCore.ts`· οι κανόνες ταξινόμησης επιλέγουν το εναλλακτικό `reason`
και κλειδώνουν το `scope` (`model` / `provider` / `connection`) μέσα στο
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Οι κανόνες ταξινόμησης βλέπουν πλήρες **κείμενο** σφάλματος (απαιτείται για την
αντιστοίχιση δεικτών σώματος όπως `额度不足`) μόνο για providers που περιλαμβάνονται
στη λίστα επιτρεπόμενων `FULL_TEXT_RULE_PROVIDERS` στο `providerErrorRules.ts` —
προς το παρόν μόνο το `"agentrouter"`. Για κάθε άλλον provider του
**ενσωματωμένου καταλόγου**, το `checkFallbackError` παραδίδει στο
`getProviderErrorRuleMatch` μόνο το δομημένο σφάλμα (`{code, type}`), που αρκεί
για κανόνες βάσει κεφαλίδας/κατάστασης/κωδικού αλλά είναι τυφλό σε δείκτες
κειμένου σώματος. Το βοηθητικό `resolveRuleMatchBody()` εκτελεί αυτήν την
επιλογή: πλήρες κείμενο σφάλματος για τους providers της λίστας επιτρεπόμενων,
το δομημένο σφάλμα διαφορετικά. Η προσθήκη ενός provider του **ενσωματωμένου
καταλόγου** στο `FULL_TEXT_RULE_PROVIDERS` είναι μια ρητή opt-in ανά provider —
υπάρχει ώστε η προεπιλεγμένη διαδρομή για κάθε provider εκτός λίστας να
παραμένει αμετάβλητη byte-προς-byte.

Το `scope` ενός κανόνα (`model` / `provider` / `connection`) είναι ξεχωριστή
opt-in από το `FULL_TEXT_RULE_PROVIDERS`: το `checkFallbackError` το εκθέτει μόνο
ως `fallbackResult.ruleScope`, και οι καταναλωτές downstream το τιμούν ως κάτι
περισσότερο από ενημερωτική ετικέτα μόνο για providers στη λίστα επιτρεπόμενων
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο ίδιο αρχείο (με έλεγχο μέσω
`honorsRuleLockScope()` — σήμερα μόνο `"agentrouter"`). Δείτε "Αναδιατυπωμένα
σφάλματα quota" παραπάνω για το τι πραγματικά κάνει μια αντιστοίχιση
`scope: "connection"` μόλις ένας provider μπει σε εκείνη τη λίστα.

**#11104 — οι κανόνες που δηλώνει ο χειριστής παρακάμπτουν και τις δύο λίστες
επιτρεπόμενων.** Ένας χειριστής μπορεί να δηλώσει έναν κανόνα ανά provider σε
χρόνο εκτέλεσης μέσω `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) χωρίς
να επεξεργαστεί αυτό το αρχείο. Ο περιορισμός ενός κανόνα χειριστή πίσω από τα
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — λίστες
επιτρεπόμενων που προορίζονται να προστατεύουν την **προεπιλεγμένη** συμπεριφορά
των κανόνων του ενσωματωμένου καταλόγου — θα καθιστούσε τον μηχανισμό ρυθμίσεων
αδρανή για κάθε provider εκτός από εκείνους που είναι ήδη καταχωρημένοι εκεί,
αφού η δήλωση του κανόνα αποτελεί ήδη τη ρητή opt-in του χειριστή. Τα
`resolveRuleMatchBody()` και `honorsRuleLockScope()` ελέγχουν και τα δύο πρώτα
το `hasOperatorRuleForProvider()`: ένας provider με κανόνα χειριστή λαμβάνει το
ακατέργαστο κείμενο σφάλματος και το δηλωμένο `scope` του τιμάται, ανεξάρτητα
από το αν εμφανίζεται επίσης σε κάποια από τις λίστες επιτρεπόμενων.

**Γνωστό κενό — το `providerRuleRegistry` δεν συμβουλεύεται ποτέ για HTTP 400.**
Ο κλάδος `BAD_REQUEST` του `checkFallbackError` ταξινομεί την κατάσταση 400 εξ
ολοκλήρου μέσω των δικών του πινάκων προτύπων (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, κ.λπ. στο `accountFallback.ts`) και επιστρέφει πριν
προσεγγιστεί ο κλάδος `configuredRule`/`getProviderErrorRuleMatch` που βρίσκεται
παραπάνω. Ένας κανόνας του ενσωματωμένου καταλόγου (ή ένας κανόνας χειριστή) με
`status: 400` είναι συντακτικά έγκυρος αλλά δεν θα ενεργοποιηθεί ποτέ. Κανένας
υπάρχων κανόνας δεν στοχεύει 400 σήμερα, οπότε τίποτα στην παραγωγή δεν
επηρεάζεται — αλλά ένας μελλοντικός κανόνας 400 χρειάζεται πρώτα να τροποποιηθεί
αυτός ο κλάδος, κάτι που είναι μεγαλύτερη αλλαγή από την προσθήκη ενός κανόνα
(επαναταξινομεί το 400 για κάθε provider που ήδη βασίζεται στη συμπεριφορά των
πινάκων προτύπων) και βρίσκεται εκτός πεδίου για μια προσθήκη κανόνα
μεμονωμένου provider.

### Προσθήκη νέου gateway με λανθασμένη αναφορά quota

1. Καταχωρήστε έναν πίνακα κανόνων στο `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Διατηρήστε τα `textMarkers`
   ειδικά ανά πάροχο· μην επαναχρησιμοποιείτε ποτέ γενικές αγγλικές φράσεις που
   συγκρούονται με τα `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Προαιρετικά, καταχωρήστε κανόνες ταξινόμησης στο
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) για να επιλέξετε
   το σωστό εύρος κλειδώματος (`connection` για quota σε επίπεδο λογαριασμού,
   `model` για σφάλματα ανά μοντέλο). Αυτό το βήμα ισχύει στην παραγωγή μόνο
   για παρόχους των οποίων οι κανόνες χρειάζονται το πλήρες κείμενο του σφάλματος
   (δείκτες σώματος): προσθέστε το αναγνωριστικό του παρόχου στο
   `FULL_TEXT_RULE_PROVIDERS` στο ίδιο αρχείο — διαφορετικά το
   `checkFallbackError` παραδίδει πάντα στον κανόνα μόνο το δομημένο
   σφάλμα `{code, type}` και ένας κανόνας κειμένου σώματος δεν θα ταιριάξει ποτέ
   με την πραγματική κίνηση. Κανόνες που ταιριάζουν αποκλειστικά με βάση
   `status`/`headers` (όπως του Opencode ή του Minimax) δεν χρειάζονται αυτό το
   opt-in. Ξεχωριστά, αν ο κανόνας δηλώνει `scope: "connection"` και η πρόθεση
   είναι πραγματική αναμονή σε επίπεδο σύνδεσης συν παράλειψη combo στο ίδιο
   αίτημα (όχι απλώς μια ενημερωτική ετικέτα), προσθέστε το αναγνωριστικό του
   παρόχου στο `HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο ίδιο αρχείο — αυτό είναι
   που ελέγχει την αξιοποίηση τύπου `isAgentrouterConnectionQuotaScope()` στο
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) και στο
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)· χωρίς αυτό, το `scope`
   εξακολουθεί να ρέει μέσω του `fallbackResult.ruleScope`, αλλά τίποτα δεν
   ενεργεί με βάση αυτό.
3. Προσθέστε μοναδικές δοκιμές που αντικατοπτρίζουν τα
   `tests/unit/upstream-status-restatement.test.ts` και
   `tests/unit/agentrouter-error-rules.test.ts` (συμπεριλαμβανομένων των ελέγχων
   not-permanent / not-creditsExhausted, και — αν ο πάροχος χρειάζεται τη λίστα
   επιτρεπόμενων — μιας δοκιμής που επιβεβαιώνει ότι το `resolveRuleMatchBody()`
   επιστρέφει το πλήρες κείμενο μόνο για αυτόν τον πάροχο).

Δεν απαιτούνται αλλαγές στα `chatCore.ts`, `classifyError` ή στο combo.

#### Κλείδωμα με ομαδοποίηση κατά egress (#10880)

Οι πάροχοι στο `EGRESS_BUCKETED_LOCK_PROVIDERS` (οικογένεια opencode)
αντιμετωπίζονται ως upstream με ομαδοποίηση κατά IP (το δωρεάν επίπεδο του
opencode είναι ομαδοποιημένο κατά IP, όχι κατά λογαριασμό — δείτε #9611): ένα
status-429 ταξινομημένο ως `quota_exhausted` **ή** `rate_limit_exceeded` θέτει
σε αναμονή κάθε σύνδεση της οικογένειας της λίστας επιτρεπόμενων της οποίας η
τελευταία γνωστή IP egress ταιριάζει με αυτήν της αποτυχημένης σύνδεσης, πριν
η εναλλαγή προλάβει να τις δοκιμάσει
— αποφεύγοντας N-1 εγγυημένα αποτυχημένες κλήσεις upstream (ίδιο σχήμα με
#10460/#10525). Το `rate_limit_exceeded` περιλαμβάνεται σκόπιμα: στη διαδρομή
`markAccountUnavailable` οι κανόνες ειδικοί για το opencode δεν ταιριάζουν ποτέ
(δεν παραδίδονται headers/body στο `checkFallbackError`, το opencode δεν
βρίσκεται στο `FULL_TEXT_RULE_PROVIDERS`), οπότε ένα 429 του οποίου το σώμα
φέρει το κείμενο quota συνδρομής ("monthly usage limit
reached") ταξινομείται ως `quota_exhausted` από το fallback κειμένου quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`· αναμονή 1 ώρας) πριν
φτάσει ποτέ ο κανόνας `status_429` — ενώ ένα 429 χωρίς κείμενο quota (απλός
περιορισμός ρυθμού) ταξινομείται μέσω του κανόνα `status_429` ως
`rate_limit_exceeded` και εξακολουθεί να θέτει σε αναμονή την οικογένεια IP.
Για έναν πάροχο της λίστας επιτρεπόμενων, ένας περιορισμός ρυθμού με
ομαδοποίηση κατά IP είναι το ίδιο σήμα με ένα εξαντλημένο quota. Ειλικρινείς
περιορισμοί:

- **Βέλτιστης προσπάθειας**: το κλείδωμα επιλύει την τελευταία γνωστή `egress_ip`
  της σύνδεσης από τα `proxy_logs` (παράθυρο 24 ωρών, σύγχρονα, χωρίς cache).
  Κρύα cache (η egress IP δεν ανιχνεύτηκε ποτέ) ή καμία γραμμή → η αποτυχημένη
  σύνδεση εξακολουθεί να ψύχεται από τον κλάδο (καταγράφεται όπως σήμερα),
  απλώς δεν κλειδώνεται καμία αδελφική σύνδεση.
- **Ποτέ τελική**: η ψύξη είναι ένα ανανεούμενο παράθυρο ορίου
  (`testStatus: "unavailable"`)· μια μόνιμη κατάσταση δεν προκύπτει ποτέ από
  σήμα επιπέδου IP. Οι συνδέσεις `disableCooling` παρακάμπτουν τον κλάδο
  εντελώς.
- **Αλλαγή κοκκιότητας κλειδώματος για την οικογένεια της λίστας
  επιτρεπόμενων**: πρόκειται για αλλαγή εμβέλειας, όχι μόνο για βελτιστοποίηση
  αδελφικών συνδέσεων. Το opencode είναι πάροχος `passthroughModels`, οπότε
  πριν από αυτόν τον κλάδο ένα 429 παρήγαγε κλείδωμα ανά ΜΟΝΤΕΛΟ· τώρα παράγει
  ψύξη σύνδεσης — συμπεριλαμβανομένου και ενός χειριστή που τρέχει μία μόνο
  σύνδεση χωρίς καμία αδελφική. Αυτή είναι η κοκκιότητα που ο πίνακας κανόνων
  του opencode ήδη δηλώνει ως σωστή (`scope: "connection"`,
  `providerErrorRules.ts`), η οποία δεν τηρήθηκε ποτέ μέχρι τώρα επειδή το
  opencode δεν βρίσκεται στους `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ο κλάδος
  γράφει ο ίδιος την ψύξη της αποτυχημένης σύνδεσης + το `backoffLevel`,
  αντικατοπτρίζοντας τον κλάδο agentrouter με εμβέλεια σύνδεσης, και
  επιστρέφει — το μπλοκ ανά μοντέλο και η γενική διαδρομή παρακάτω δεν
  εκτελούνται ποτέ.
- **Συμπεριλαμβάνεται το combo**: όπως ο κλάδος agentrouter, η εμβέλεια αγνοεί
  σκόπιμα την υποβάθμιση `persistUnavailableState`/`isCombo` που εφαρμόζει
  ένας καλών combo σε ένα 429. Το κλείδωμα ανά μοντέλο δεν είναι ασθενέστερη
  μορφή αυτής της εμβέλειας, είναι η λάθος μονάδα: δεν λέει τίποτα για την
  εξαντλημένη IP, οπότε η εναλλαγή combo θα συνέχιζε να καίει μία εγγυημένα
  αποτυχημένη κλήση ανά αδελφική σύνδεση.
- **Ασφάλεια αδελφικών συνδέσεων**: μια αδελφική σύνδεση που είναι ήδη σε
  τελική κατάσταση (banned/credits_exhausted) ή ήδη σε μακρύτερη ψύξη δεν
  αντικαθίσταται ποτέ.
- **Αποκλειστική λίστα επιτρεπόμενων**: η διεύρυνση του
  `EGRESS_BUCKETED_LOCK_PROVIDERS` είναι ρητή απόφαση του κατόχου· καμία γενική
  καλωδίωση (μοτίβο #10334/#10419). Το ερώτημα αδελφικών συνδέσεων δεσμεύει
  την ίδια λίστα επιτρεπόμενων αντί να την επαναλαμβάνει ως SQL literal, οπότε
  η διεύρυνσή της παραμένει αλλαγή μίας γραμμής.
- **Εναλλαγή egress IP, και προς τις δύο κατευθύνσεις**: το παράθυρο
  αναζήτησης (24 ώρες) είναι πολύ ευρύτερο από το TTL της cache egress-IP
  (5 λεπτά), οπότε η «τελευταία γνωστή IP» είναι ιστορικό, όχι τρέχουσα
  κατάσταση. Αν ο proxy μιας σύνδεσης εναλλάχθηκε εντός του παραθύρου, το
  κλείδωμα μπορεί να **χάσει** μια πραγματικά κοινόχρηστη IP (η καταγεγραμμένη
  IP είναι η νέα, μη εξαντλημένη) — και συμμετρικά μπορεί να **ψύξει μια
  αδελφική σύνδεση που εν τω μεταξύ έχει εναλλαχθεί μακριά** από την
  εξαντλημένη IP. Η δεύτερη περίπτωση κοστίζει σε εκείνη την αδελφική σύνδεση
  ένα παράθυρο ψύξης· και οι δύο είναι αποδεκτά όρια βέλτιστης προσπάθειας
  μιας αναζήτησης βασισμένης σε ιστορικό.
- **Κόστος**: δύο φραγμένες σαρώσεις των `proxy_logs` (φιλτραρισμένες κατά
  παράθυρο μέσω `idx_pl_timestamp`), μόνο σε συχνότητα 429. Κανένα νέο
  ευρετήριο (migration 134 YAGNI). Μετρήθηκε σε αντίγραφο βάσης δεδομένων
  πραγματικής κίνησης μέτριου μεγέθους· μια εγκατάσταση υψηλής απόδοσης
  διατηρεί αναλογικά περισσότερες γραμμές στο ίδιο παράθυρο.

---

## Άλλες Δυνατότητες Ανθεκτικότητας

- **21 στρατηγικές δρομολόγησης** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — δείτε το [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Δρομολόγηση με επίγνωση επαναφοράς** (v3.8.0) — δίνει προτεραιότητα στις συνδέσεις με βάση τον χρόνο επαναφοράς του quota.
- **Υποβάθμιση της λειτουργίας background** — το Responses API με `background: true` υποβαθμίζεται σε σύγχρονη εκτέλεση με προειδοποίηση.
- **Δυναμικός εντοπισμός ορίου εργαλείων** — εφαρμόζει backoff στους παρόχους όταν επιτυγχάνονται τα όρια στον αριθμό εργαλείων.
- **Emergency fallback** — ελέγχεται από το `OMNIROUTE_EMERGENCY_FALLBACK`· οι χειριστές μπορούν να το παρακάμψουν από τη σελίδα Feature Flags χωρίς επανεκκίνηση.

---

## Εντοπισμός σφαλμάτων

- Το σταθμισμένο combo απαντά με `503 all_targets_cooling_down` (το `Retry-After` έχει οριστεί, το `diagnostics.excluded` παραθέτει κάθε στόχο με `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → η δεξαμενή (pool) είναι ρυθμισμένη και συνδεδεμένη, απλώς κάθε στόχος αποκλείεται από έναν χρονομετρητή ανθεκτικότητας· η προειδοποίηση `[COMBO] Weighted selection: every target excluded before dispatch — …` κατονομάζει τους λόγους και τα εναπομείναντα δευτερόλεπτα. Ένα `404 no_executable_targets` από το ίδιο combo σημαίνει ότι δεν ενεπλάκη κανένας χρονομετρητής ανθεκτικότητας (τίποτα προς εκτέλεση, ή κάθε λογαριασμός απέτυχε στον έλεγχο διαθεσιμότητας). Υλοποιείται στο `open-sse/services/combo/pinRecovery.ts` από τους αποκλεισμούς που συλλέγονται στο `targetResolution.ts`.
- Όλα τα κλειδιά ενός παρόχου παραλείπονται → ελέγξτε τόσο την κατάσταση του circuit breaker ΟΣΟ ΚΑΙ το `rateLimitedUntil`/`testStatus` κάθε σύνδεσης.
- Ο πάροχος αποκλείεται μόνιμα μετά το παράθυρο επαναφοράς → κώδικας που διαβάζει το σκέτο `state` αντί για `getStatus()`/`canExecute()`.
- Ένα κλειδί αποτυγχάνει, τα υπόλοιπα θα έπρεπε να λειτουργούν → προτιμήστε το connection cooldown έναντι του circuit breaker.
- Μόνο ένα μοντέλο αποτυγχάνει → προτιμήστε το model lockout έναντι του connection cooldown.
- Η κατάσταση θα έπρεπε να αυτοανακάμπτει αλλά δεν το κάνει → ελέγξτε για μελλοντική χρονοσήμανση + διαδρομή ανάγνωσης που ανανεώνει τη ληγμένη κατάσταση. Οι μόνιμες καταστάσεις απαιτούν χειροκίνητες αλλαγές.

---

## Κατάσταση χρόνου εκτέλεσης — γρήγορη αναφορά για agent

> Μεταφέρθηκε αυτούσιο από το `AGENTS.md` → "Resilience Runtime State" (PR #12743), ώστε ο
> οδηγός του agent να παραμένει εντός του προϋπολογισμού context των 40k. Αποτελεί τη συμπυκνωμένη,
> στραμμένη προς τον agent όψη των παραπάνω ενοτήτων· οι αριθμημένες ενότητες παραμένουν η πλήρης αναφορά.

Το OmniRoute διαθέτει τρεις συσχετιζόμενους αλλά διακριτούς μηχανισμούς προσωρινής αστοχίας. Κρατήστε
το πεδίο εφαρμογής τους ξεχωριστό κατά τον εντοπισμό σφαλμάτων στη συμπεριφορά δρομολόγησης. Δείτε το
[διάγραμμα ανθεκτικότητας 3 επιπέδων](../diagrams/exported/resilience-3layers.svg)
(πηγή: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
για μια συνοπτική απεικόνιση.

### Circuit Breaker Παρόχου

**Πεδίο εφαρμογής**: ολόκληρος ο πάροχος, π.χ. `glm`, `openai`, `anthropic`.

**Σκοπός**: να σταματά η αποστολή κίνησης προς έναν πάροχο που αποτυγχάνει επανειλημμένα σε
επίπεδο upstream/υπηρεσίας, ώστε ένας μη υγιής πάροχος να μην επιβραδύνει κάθε αίτημα.

**Υλοποίηση**:

- Κύρια κλάση: `src/shared/utils/circuitBreaker.ts`
- Συνδεσμολογία gate/εκτέλεσης chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API κατάστασης χρόνου εκτέλεσης: `src/app/api/monitoring/health/route.ts`
- Κοινόχρηστα wrappers: `open-sse/services/accountFallback.ts`
- Πίνακας μόνιμης αποθήκευσης κατάστασης: `domain_circuit_breakers`

**Καταστάσεις** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: επιτρέπεται η κανονική κίνηση.
- `DEGRADED`: ζώνη έγκαιρης προειδοποίησης — οι αστοχίες ξεπέρασαν το κατώφλι υποβάθμισης αλλά όχι
  ακόμη το κατώφλι του διακόπτη· η κίνηση εξακολουθεί να ρέει, οι πίνακες ελέγχου εμφανίζουν την
  προειδοποίηση. Ένα έγκυρο τεστ σύνδεσης ή ένα ήσυχο παράθυρο χωρίς νέα αστοχία την επιστρέφει σε
  `CLOSED` (το παράθυρο βρίσκεται στο `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: ο πάροχος αποκλείεται προσωρινά· οι καλούντες λαμβάνουν απόκριση provider-circuit-open
  ή η δρομολόγηση combo παραλείπει σε άλλο στόχο.
- `HALF_OPEN`: το χρονικό όριο επαναφοράς έχει παρέλθει· επιτρέπεται ένα αίτημα διερεύνησης (probe).
  Η επιτυχία κλείνει τον διακόπτη, η αποτυχία τον ανοίγει ξανά.

**Προεπιλογές** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, καταναλώνεται μέσω
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` στο `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` στο `src/sse/handlers/chatHelpers.ts`). Ο διακόπτης ολόκληρου
παρόχου λειτουργεί με βάση τα `circuitBreakerThreshold` / `circuitBreakerReset`:

| Προφίλ     | υποβαθμίζεται σε | ανοίγει σε (`circuitBreakerThreshold`) | επαναφορά (`circuitBreakerReset`) |
| ---------- | ---------------: | -------------------------------------: | --------------------------------: |
| OAuth      |              `5` |                                    `8` |                             `60s` |
| Κλειδί API |              `7` |                                   `12` |                             `30s` |
| Τοπικό     |      (παράγεται) |                                    `2` |                             `15s` |

Το `PROVIDER_PROFILES` ορίζει επίσης `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 λεπτά) και `providerCooldownMs` (5/10/1 λεπτά): αυτά τροφοδοτούν
την **πύλη παραθύρου του προαιρετικού καθολικού Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`,
προεπιλογή απενεργοποιημένο) — μια καταχώριση επιπέδου παρόχου στο
`open-sse/services/providerCooldownTracker.ts` θεωρείται σε ψύξη μόνο μετά από
`providerFailureThreshold` αστοχίες εντός του `providerFailureWindowMs`, και στη συνέχεια ψύχεται για
`providerCooldownMs`. ΔΕΝ αποτελούν τα κατώφλια του ενεργού διακόπτη — μην τα ρυθμίζετε περιμένοντας
συμπεριφορά διακόπτη. Κάθε προεπιλογή μπορεί να παρακαμφθεί μέσω των μεταβλητών περιβάλλοντος
`OMNIROUTE_PROVIDER_BREAKER_*` και `OMNIROUTE_CIRCUIT_BREAKER_*`· ο ακριβής πίνακας αναφοράς για τον
χρόνο εκτέλεσης βρίσκεται στο `docs/architecture/RESILIENCE_GUIDE.md`.

Μόνο καταστάσεις αστοχίας επιπέδου παρόχου θα πρέπει να ενεργοποιούν τον διακόπτη παρόχου:

```ts
(408, 500, 502, 503, 504);
```

Μην ενεργοποιείτε τον διακόπτη ολόκληρου παρόχου για συνήθη σφάλματα λογαριασμού/κλειδιού/μοντέλου,
όπως οι περισσότερες περιπτώσεις `401`, `403` ή `429`. Αυτές συνήθως ανήκουν στο connection cooldown
ή στο model lockout. Ένα γενικό `403` παρόχου με κλειδί API θα πρέπει να είναι ανακτήσιμο, εκτός αν
ταξινομείται ως τερματικό σφάλμα παρόχου/λογαριασμού.

Ο breaker χρησιμοποιεί lazy recovery, όχι background timer. Όταν το `OPEN` λήξει, οι αναγνώσεις όπως
`getStatus()`, `canExecute()` και `getRetryAfterMs()` ανανεώνουν την κατάσταση σε
`HALF_OPEN`, ώστε τα dashboards και οι combo candidate builders να μην εξακολουθούν να αποκλείουν
έναν ληγμένο provider για πάντα.

### Connection Cooldown

**Scope**: μία σύνδεση/λογαριασμός/κλειδί provider.

**Σκοπός**: παράλειψη ενός προβληματικού κλειδιού/λογαριασμού προσωρινά, επιτρέποντας σε άλλες συνδέσεις
για τον ίδιο provider να συνεχίσουν να εξυπηρετούν αιτήματα.

**Υλοποίηση**:

- Διαδρομή εγγραφής/ενημέρωσης: `src/sse/services/auth.ts::markAccountUnavailable()`
- Επιλογή/φιλτράρισμα λογαριασμού: `src/sse/services/auth.ts::getProviderCredentials...`
- Υπολογισμός cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ρυθμίσεις: `src/lib/resilience/settings.ts`

Σημαντικά πεδία στις συνδέσεις provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Κατά την επιλογή λογαριασμού, μια σύνδεση παραλείπεται όσο:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Τα cooldowns είναι επίσης lazy: όταν το `rateLimitedUntil` είναι στο παρελθόν, η σύνδεση γίνεται
ξανά elegible. Με επιτυχημένη χρήση, το `clearAccountError()` καθαρίζει τα `testStatus`,
`rateLimitedUntil`, τα πεδία σφάλματος και το `backoffLevel`.

Προεπιλεγμένη συμπεριφορά connection cooldown:

- Βασικό cooldown OAuth: `5s`.
- Βασικό cooldown API-key: `3s`.
- Το API-key `429` θα πρέπει να προτιμά υποδείξεις επανάληψης από το upstream (`Retry-After`, headers επαναφοράς ή
  αναλύσιμο κείμενο επαναφοράς) όταν είναι διαθέσιμες.
- Επαναλαμβανόμενες ανακτήσιμες αποτυχίες χρησιμοποιούν εκθετικό backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ο μηχανισμός anti-thundering-herd αποτρέπει τις ταυτόχρονες αποτυχίες στην ίδια σύνδεση από
το να επεκτείνουν επανειλημμένα το cooldown ή να αυξάνουν διπλά το `backoffLevel`.

Οι τερματικές καταστάσεις δεν είναι cooldowns. Τα `banned`, `expired` (το οποίο γίνεται τερματικό μόνο μετά από N φραγμένες επαναλήψεις μέσω `EXPIRED_RETRY_MAX`) και `credits_exhausted`
προορίζονται να παραμένουν μη διαθέσιμα έως ότου αλλάξουν τα credentials/ρυθμίσεις ή τα επαναφέρει
ένας διαχειριστής. Μην αντικαθιστάτε τερματικές καταστάσεις με μεταβατική κατάσταση cooldown.

### Model Lockout

**Scope**: provider + connection + model.

**Σκοπός**: αποφυγή απενεργοποίησης ολόκληρης της σύνδεσης όταν μόνο ένα model είναι μη διαθέσιμο ή
περιορισμένο ως προς το quota για αυτή τη σύνδεση.

Παραδείγματα:

- Providers με quota ανά model που επιστρέφουν `429`.
- Local providers που επιστρέφουν `404` για ένα model που λείπει.
- Αποτυχίες δικαιωμάτων mode/model ειδικές για τον provider, όπως επιλεγμένα modes του Grok.

Το model lockout βρίσκεται στο `open-sse/services/accountFallback.ts` και επιτρέπει στην ίδια
σύνδεση να συνεχίσει να εξυπηρετεί άλλα models.

### Οδηγίες αποσφαλμάτωσης

- Αν όλα τα κλειδιά για έναν provider παραλείπονται, ελέγξτε τόσο την κατάσταση του provider breaker όσο και το
  `rateLimitedUntil`/`testStatus` κάθε σύνδεσης.
- Αν ένας provider φαίνεται μόνιμα αποκλεισμένος μετά το παράθυρο επαναφοράς, ελέγξτε αν ο κώδικας
  διαβάζει το ακατέργαστο `state` αντί να χρησιμοποιεί το `getStatus()`/`canExecute()`.
- Αν ένα κλειδί provider αποτυγχάνει αλλά άλλα θα έπρεπε να λειτουργούν, προτιμήστε connection cooldown αντί για
  provider breaker.
- Αν μόνο ένα model αποτυγχάνει, προτιμήστε model lockout αντί για connection cooldown.
- Αν μια κατάσταση θα πρέπει να ανακάμψει αυτόματα, θα πρέπει να έχει μελλοντικό timestamp/reset timeout και μια
  διαδρομή ανάγνωσης που ανανεώνει τη ληγμένη κατάσταση. Οι μόνιμες καταστάσεις απαιτούν χειροκίνητες αλλαγές
  credentials ή config.

---

## Δακτυλικά αποτυπώματα TLS & Stealth

Το stealth ανά πάροχο (JA3/JA4, CCH, συσκότιση) τεκμηριώνεται ξεχωριστά — δείτε `docs/security/STEALTH_GUIDE.md` (git· δεν μεταγλωττίζεται στο `/docs`).

---

## Δοκιμές ανθεκτικότητας (Φάση 8 · Μπλοκ C)

Πέρα από τα unit tests για τη λογική ανθεκτικότητας, τρεις δοκιμές εξασκούν το runtime υπό
πραγματικές συνθήκες φόρτου/αποτυχίας (όλες integration/nightly — καμία δεν μπλοκάρει PRs):

| Δοκιμή      | Τι κάνει                                                                                                                                                                                          | Εκτέλεση                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Ο fake-upstream κόμβος εισάγει πραγματική καθυστέρηση/reset/timeout/503· επικυρώνει ότι ο circuit breaker ανοίγει/ανακτά και ότι το `checkFallbackError` ταξινομεί το 503 ως ανακτήσιμο fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 ροές ανά `createSSEStream` με `--expose-gc`· αποτυγχάνει αν ο σωρός αυξηθεί πέρα από το όριο (προστασία OOM #3069).                                                                          | `npm run test:heap`                      |
| k6 soak     | Παρατεταμένο φορτίο εναντίον του `/api/monitoring/health`· όρια p95/σφαλμάτων.                                                                                                                    | `k6 run tests/load/k6-soak.js` (nightly) |

Οργανώνεται από το `.github/workflows/nightly-resilience.yml` (cron + dispatch). Στο
προεπιλεγμένο `test:integration`, τα chaos και heap αυτο-παραλείπονται (χωρίς `RUN_CHAOS_INT`/`--expose-gc`).

---

## Δείτε επίσης

- [Οδηγός αρχιτεκτονικής](./ARCHITECTURE.md) — Αρχιτεκτονική συστήματος και εσωτερική λειτουργία
- [Οδηγός χρήστη](../guides/USER_GUIDE.md) — Πάροχοι, combos, ενσωμάτωση CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Βαθμολόγηση 16 παραγόντων, πακέτα λειτουργιών
