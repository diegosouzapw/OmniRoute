# Router Backends & Embedded Services — architecture contract (ADR) (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Κατάσταση:** Εγκρίθηκε · **Πλαίσιο:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Σύμβαση:** `domain/routing/routerBackends.ts`
> (μητρώο με τύπους — ο κώδικας ενσωματώνεται με το [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Αυτό το ADR καθορίζει τον τρόπο με τον οποίο οι μηχανές `ts` (εγγενής), `bifrost`, `cliproxy`, `9router` και οι συμβατές με το VibeProxy σχετίζονται μεταξύ τους, ώστε οι συνεισφέροντες να σταματήσουν να συγχέουν δύο πράγματα που είναι αρχιτεκτονικά διακριτά. Τεκμηριώνει το μητρώο με τύπους που εισήχθη από την εργασία router-backend-registry ως τη μοναδική πηγή αλήθειας για αυτό το μοντέλο.

## Η βασική διάκριση — δύο ορθογώνιοι άξονες

Ο ρόλος μιας μηχανής περιγράφεται από **δύο ανεξάρτητους άξονες**, οι οποίοι κωδικοποιούνται μαζί στο `RouterBackendDefinition` του μητρώου:

1. **Κύκλος ζωής** (`RouterBackendLifecycle`) — _πώς εκτελείται η μηχανή_:
   - `in-process` — εκτελείται εντός της διεργασίας Node του OmniRoute (η εγγενής διοχέτευση TS).
   - `supervised` — μια τοπική θυγατρική διεργασία, την οποία το OmniRoute εγκαθιστά/εκκινεί/διακόπτει/ελέγχει ως προς την εύρυθμη λειτουργία μέσω του `ServiceSupervisor` και, στη συνέχεια, χρησιμοποιεί ως σύνδεση παρόχου.
   - `external` — ένα τελικό σημείο HTTP στο οποίο το OmniRoute δρομολογεί αιτήματα, αλλά **δεν** το διαχειρίζεται (διαμορφώνεται μέσω ενός βασικού URL σε μεταβλητή περιβάλλοντος).
   - `disabled` — είναι καταχωρισμένη, αλλά δεν μπορεί να επιλεγεί.
2. **Άξονας επιλογής** (backend δρομολόγησης relay) — _αν το relay δρομολογεί αιτήματα προς αυτή_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` στο
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Το λάθος που πρέπει να αποφεύγεται: η αντιμετώπιση της «ενσωματωμένης υπηρεσίας» και του «backend δρομολόγησης» ως μίας ενιαίας λίστας. Δεν είναι. Μια μηχανή `supervised` (9router/cliproxy) είναι μια **σύνδεση παρόχου που χρησιμοποιείται από την εγγενή διοχέτευση** και όχι ένα εναλλακτικό backend δρομολόγησης του relay. Το `bifrost` είναι το αντίστροφο — ένα backend δρομολόγησης του relay, το οποίο (ιστορικά) ήταν αποκλειστικά `external`.

## Το μητρώο — μοναδική πηγή αλήθειας

Η σύμβαση `domain/routing/routerBackends.ts` (ο κώδικας ενσωματώνεται με το [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) δηλώνει κάθε μηχανή μία φορά, μαζί με τον κύκλο ζωής, τις δυνατότητες, την ταυτότητα υπηρεσίας, την προεπιλεγμένη θύρα, τη διαμόρφωση ελέγχου εύρυθμης λειτουργίας και την υποστήριξη τηλεμετρίας της. Οι καταναλωτές αναζητούν μηχανές μέσω των `getRouterBackend(id)`, `listRouterBackends()` και `listRouterBackendsByCapability(cap)`, αντί να χειρίζονται κάθε sidecar ως ειδική περίπτωση.

| Backend     | Κύκλος ζωής  | Υπηρεσία (άξονας A) | Backend relay (άξονας B) | Έλεγχος εύρυθμης λειτουργίας | Προεπιλεγμένη θύρα |
| ----------- | ------------ | ------------------- | ------------------------ | ---------------------------- | ------------------ |
| `ts`        | `in-process` | —                   | `ts` (εγγενές)           | —                            | —                  |
| `bifrost`   | `external`¹  | —¹                  | `bifrost` / `auto`       | `/health`                    | —                  |
| `cliproxy`  | `supervised` | `cliproxy`          | — (πάροχος)              | `/v1/models`                 | 8317               |
| `9router`   | `supervised` | `9router`           | — (πάροχος)              | `/api/health`                | 20130              |
| `vibeproxy` | `external`   | —                   | — (προσαρμογέας παρόχου) | `/v1/models`                 | —                  |

¹ Η προαγωγή του Bifrost σε μια `supervised` ενσωματωμένη υπηρεσία (με δυνατότητα εγκατάστασης/εκκίνησης από το `/api/services/bifrost/`) παρακολουθείται στο [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)· μέχρι να συγχωνευθεί, το Bifrost είναι αποκλειστικά `external` (προσβάσιμο μόνο μέσω του `BIFROST_BASE_URL`).

Οι `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) επιτρέπουν στους καλούντες να φιλτράρουν με βάση όσα μπορεί πράγματι να κάνει μια μηχανή, αντί να κωδικοποιούν άκαμπτα διακλαδώσεις ανά αναγνωριστικό.

## Άξονας A — ενσωματωμένες υπηρεσίες (πλευρά εποπτευόμενων διεργασιών)

- **Μητρώο εποπτευόμενων διεργασιών:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (σήμερα: `9router`, `cliproxy`).
- **Υπεύθυνος κύκλου ζωής:** `src/lib/services/ServiceSupervisor.ts` — η `start()` δημιουργεί
  τη θυγατρική διεργασία, περιμένει την επιτυχή ολοκλήρωση της `waitForHealthy()`, διοχετεύει τα stdout/stderr σε κυκλικό buffer·
  η `stop()` εκτελεί SIGTERM→SIGKILL· όλα εκτελούνται σειριακά υπό κλείδωμα.
- **Ένωση καταστάσεων** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, μαζί με μια
  ορθογώνια `HealthState = healthy | unhealthy | unknown`.
- **Γιατί ξεχωριστή διεργασία (και όχι SDK εντός της διεργασίας);** Η απομόνωση διεργασιών είναι αυτή που καθιστά
  την εγκατάσταση/εκκίνηση/διακοπή/παρακολούθηση υγείας/καταγραφή συμβάντων ανεξάρτητα ελέγξιμες ανά βοηθητική διεργασία και επιτρέπει
  την εφαρμογή του μηχανισμού προστασίας δημιουργίας διεργασιών μέσω loopback. Η μοντελοποίηση ενός προσαρμογέα εντός της διεργασίας αποτελεί μελλοντική εργασία — η
  σημαία δυνατότητας `native-hot-path` είναι το σημείο όπου θα εκφραζόταν αυτό.

### Συμβόλαιο διαδρομών κύκλου ζωής (`/api/services/<tool>/…`)

Οι κωδικοί κατάστασης είναι **εσκεμμένα συγκεκριμένοι ανά κατάσταση/ρήμα/διαδρομή** — αυτό είναι το συμβόλαιο και όχι
ασυνέπεια:

| Κλήση                             | Συνθήκη                                          | Κατάσταση                            |
| --------------------------------- | ------------------------------------------------ | ------------------------------------ |
| `POST .../start`                  | υπηρεσία `not_installed`                         | **409** (προϋπόθεση)                 |
| `POST .../stop`                   | ήδη σταματημένη                                  | **200** (ιδιοδύναμη μη ενέργεια)     |
| `GET .../status`                  | εντάξει                                          | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                  | αποτυχία δημιουργίας διεργασίας                  | **503** (παροδικό)                   |
| `GET .../status`, `.../stop`      | μη διαχειριζόμενο σφάλμα                         | **500**                              |
| `GET /api/services/<x>/logs`      | άγνωστο εργαλείο `<x>`                           | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`       | απουσία `X-Reveal-Confirm: yes`                  | **403** (μόνο για το 9router)        |
| **οποιοδήποτε** `/api/services/*` | ο καλών δεν προέρχεται από loopback/ιδιωτικό LAN | **403 LOCAL_ONLY**                   |

Όλα τα σώματα σφαλμάτων διαμορφώνονται από τη `createErrorResponse()` →
`{ error: { message, type }, requestId }`, όπου το `type` προκύπτει από τον κωδικό κατάστασης
(`500→server_error`, `404→not_found`, `409→conflict`, διαφορετικά `invalid_request`) και αποτελεί
το διακριτικό που μπορεί να αξιοποιηθεί προγραμματιστικά. Τα μηνύματα έχουν προηγουμένως εξυγιανθεί
(`sanitizeErrorMessage()`, Απαράβατος Κανόνας #12).

**Ο μηχανισμός προστασίας loopback** είναι η συνηθέστερη αιτία ενός `403`: το `/api/services/` βρίσκεται στα
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) και το
`src/server/authz/policies/management.ts` απορρίπτει οποιονδήποτε καλούντα δεν προέρχεται από loopback / ιδιωτικό LAN
**πριν από τον έλεγχο ταυτότητας**, επειδή αυτές οι διαδρομές δημιουργούν θυγατρικές διεργασίες (Απαράβατοι Κανόνες 15
και 17). Η πρόσβαση σε αυτές μέσω δημόσιου tunnel επιστρέφει εσκεμμένα `403`.

## Άξονας B — σύστημα υποστήριξης δρομολόγησης αναμετάδοσης (πλευρά αποστολής)

Μόνο η διαδρομή διαμεσολάβησης αναμετάδοσης `/api/v1/relay/chat/completions` επιλέγει σύστημα υποστήριξης
αποστολής· η κύρια επιφάνεια `/api/v1/chat/completions` δεν συμβουλεύεται ποτέ το
`routingBackend.ts`.

- **Επιλογή** (`resolveRelayRoutingBackend`): μία ενιαία καθολική εναλλαγή μέσω μεταβλητής περιβάλλοντος —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Αν δεν έχει οριστεί, χρησιμοποιείται `auto` όταν το Bifrost είναι ρυθμισμένο+ενεργοποιημένο, διαφορετικά `ts`.
- **Συμπεριφορά:**
  - `bifrost` (εξαναγκασμένο): αποτυχία του Bifrost → οριστικό `502`, χωρίς εναλλακτική μετάπτωση.
  - `auto`: δοκιμή του Bifrost και, σε περίπτωση αποτυχίας/περιόδου αναμονής, σιωπηρή μετάπτωση στην εγγενή υλοποίηση.
  - `ts` / μετά την εναλλακτική μετάπτωση: η εγγενής διοχέτευση μετάφρασης/εκτέλεσης `open-sse`.
- **Περίοδος αναμονής:** περίοδος αναμονής μετά από αποτυχία ανά `baseUrl` στο `bifrostCooldown.ts`.

Η επιλογή είναι **προς το παρόν καθολική σε επίπεδο αναμετάδοσης** — δεν υπάρχει εναλλαγή μηχανής ανά πάροχο
ή ανά αίτημα στο `release/v3.8.43`. Ο έλεγχος ανά αίτημα προστίθεται
μέσω της εργασίας για το manifest της βοηθητικής διεργασίας
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
η οποία επιτρέπει στο `auto` να δρομολογεί μέσω του Bifrost μόνο παρόχους που είναι επιλέξιμοι βάσει του manifest.

## Ενσωμάτωση στον πίνακα ελέγχου

Ο πίνακας ελέγχου υπηρεσιών πραγματοποιεί polling στο `GET /api/services/<tool>/status` κάθε 5s μέσω του
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
επιστρέφοντας `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Δεν υπάρχει κοινός πάροχος context διαθεσιμότητας —
κάθε component καλεί το hook για κάθε εργαλείο. Στο `!res.ok`, το hook εμφανίζει επί του παρόντος ένα
σκέτο `HTTP <status>`· η αντιστοίχιση του πεδίου `error.type` σε μια κατανοητή εξήγηση για τον χρήστη αποτελεί
καταγεγραμμένη βελτίωση UX και όχι αλλαγή του contract.

## Συνέπειες

- Τα νέα engines καταχωρίζονται μία φορά στο `ROUTER_BACKENDS`· οι consumers αποκτούν πρόσβαση σε αυτά μέσω ερωτημάτων
  δυνατοτήτων, χωρίς νέες διακλαδώσεις ανά id.
- Το ερώτημα «Πρόκειται για υπηρεσία ή για routing backend;» απαντάται από το πεδίο `lifecycle` και όχι
  από το σε ποια λίστα τυχαίνει να εμφανίζεται ένα id.
- Η εποπτεία του Bifrost (#5817) και η εγγενής μετάβαση του hot path (#5670) βασίζονται σε αυτό το
  κοινό contract, αντί να εφαρμόζουν ειδική μεταχείριση για κάθε sidecar.
