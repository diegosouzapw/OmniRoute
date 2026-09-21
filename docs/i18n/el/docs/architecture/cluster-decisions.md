# Cluster Decisions — Optional Sidecar Profiles (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Κατάσταση:** πρόταση (αναμένεται αξιολόγηση από τον @diegosouzapw)
**Ημερομηνία:** 2026-06-20
**Αναφορές:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Δύο προαιρετικά προφίλ compose (`memory`, `bifrost`) για την υπάρχουσα ανάπτυξη 8 υπηρεσιών στο [`docker-compose.yml`](../../docker-compose.yml). Η προεπιλεγμένη συμπεριφορά εκκίνησης παραμένει **αμετάβλητη**: 3 × αντίγραφα `omniroute` + Caddy + Redis + CliproxyAPI. Τα δύο νέα προφίλ προσθέτουν τα Qdrant και Bifrost ως προαιρετικές πλευρικές υπηρεσίες, οι οποίες ενεργοποιούνται μέσω `docker compose --profile <name> up`. **Καμία υπάρχουσα υπηρεσία δεν καταργείται ούτε αντικαθίσταται.**

## Γιατί αυτή η προσέγγιση είναι συντηρητική

Η υπάρχουσα αρχιτεκτονική ανάπτυξης του OmniRoute είναι ήδη λιτή και δοκιμασμένη:

- Το **`redis:7-alpine`** διαχειρίζεται τον φόρτο εργασίας περιορισμού ρυθμού/κρυφής μνήμης σε κλίμακα παραγωγής.
- Τα **SQLite + sqlite-vec + FTS5** καλύπτουν την τοπική μνήμη + τα διανύσματα + την αναζήτηση κειμένου (βλ. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- Το **Caddy** είναι ήδη ο εξισορροπητής φορτίου + τερματιστής TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- Το **Bifrost** είναι ήδη ενσωματωμένο ως δρομολογητής Tier-1 στο [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (διαμεσολαβητής πλευρικής υπηρεσίας με διακόπτη απενεργοποίησης μέσω της μεταβλητής περιβάλλοντος `BIFROST_ENABLED` — ορίστε `=0` για παράκαμψη της πλευρικής υπηρεσίας και μετάβαση στη διαδρομή TS).

Τα δύο προφίλ εδώ αποτελούν **επιλογές οριζόντιας κλιμάκωσης για αναπτύξεις που φτάνουν στα όρια του SQLite** — όχι μετεγκαταστάσεις. Και τα δύο είναι απενεργοποιημένα από προεπιλογή.

## Τα δύο προφίλ

### `memory` — Πλευρική υπηρεσία διανυσματικής μνήμης Qdrant

**Πότε να το ενεργοποιήσετε:**

- > 1M ενσωματώσεις ανά ανάπτυξη (το sqlite-vec αρχίζει να επιβραδύνεται σε μεγάλη κλίμακα).
- Ανάπτυξη με πολλαπλά αντίγραφα που χρειάζεται κοινή διανυσματική κατάσταση μεταξύ των `omniroute-1/2/3`.
- Διαθέτετε ήδη εξωτερικό σύμπλεγμα Qdrant (Qdrant Cloud, στις δικές σας εγκαταστάσεις).

**Τι προσθέτει:**

| Υπηρεσία | Εικόνα                  | Θύρες       | Σημειώσεις                                            |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Ευρετήριο HNSW· μόνιμος τόμος `omniroute_qdrant_data` |

**Ενεργοποίηση:** ορίστε `qdrantEnabled = true` στο περιβάλλον χρήστη των Ρυθμίσεων **ή** ορίστε τη μεταβλητή περιβάλλοντος `QDRANT_HOST=qdrant`. Ανατρέξτε στο [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) για τους κανόνες προτεραιότητας (πίνακας ρυθμίσεων → μεταβλητή περιβάλλοντος → προεπιλογή).

**Μεταβλητές περιβάλλοντος:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (βλ. γραμμές 1672-1683 του `.env.example`).

### `bifrost` — Πλευρική υπηρεσία δρομολογητή Tier-1 Bifrost

**Πότε να το ενεργοποιήσετε:**

- Εκτελείτε ≥3 αντίγραφα `omniroute` και θέλετε η εναλλαγή παρόχων να συγκεντρώνεται σε μία διεργασία Go.
- Θέλετε μία ενιαία επιφάνεια ελέγχου/καταγραφής για αιτήματα προς ανάντη παρόχους από όλα τα αντίγραφα.
- Θέλετε οριζόντια κλιμάκωση του επιπέδου δρομολόγησης Tier-1, ανεξάρτητα από τα αντίγραφα του OmniRoute.

**Τι προσθέτει:**

| Υπηρεσία  | Εικόνα                            | Θύρες  | Σημειώσεις                                                                                      |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Δρομολογητής Tier-1 βασισμένος σε Go· μόνιμος τόμος αρχείων καταγραφής `omniroute_bifrost_logs` |

**Ενεργοποίηση:** ορίστε `BIFROST_BASE_URL=http://bifrost:8080` στο `.env.example`. Η υπάρχουσα διαδρομή διαμεσολαβητή πλευρικής υπηρεσίας στο [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (προστέθηκε στο PR #4381) θα την εντοπίσει αυτόματα.

**Μεταβλητές περιβάλλοντος:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (βλ. γραμμές 1685-1695 του `.env.example`).

## Τι ΔΕΝ κάνει ρητά αυτό το PR

Στο αρχικό νήμα του issue προτάθηκε μια ευρύτερη αναδιάρθρωση του cluster. Μετά από έλεγχο της πραγματικής μορφής του φόρτου εργασίας, τα ακόλουθα **απορρίπτονται** για τους λόγους που παρατίθενται:

| Στοιχείο                             | Απόφαση      | Αιτιολογία                                                                                                                            |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ΑΠΟΡΡΙΨΗ** | Το `redis:7-alpine` επαρκεί ήδη για τον φόρτο εργασίας περιορισμού ρυθμού σε κλίμακα παραγωγής· δεν υπάρχει όριο προς υπέρβαση.       |
| **NATS**                             | **ΑΠΟΡΡΙΨΗ** | Κάθε replica του `omniroute` είναι μία μοναδική διεργασία Node.js· δεν υπάρχει φόρτος εργασίας pub/sub πολλαπλών διεργασιών.          |
| **PostgreSQL**                       | **ΑΠΟΡΡΙΨΗ** | Τα SQLite + sqlite-vec + FTS5 καλύπτουν και τις 3 περιπτώσεις χρήσης· 97 migrations + η πακετοποίηση Electron εμποδίζουν τη μετάβαση. |
| **Neo4j**                            | **ΑΠΟΡΡΙΨΗ** | Η δρομολόγηση είναι ένα join 5 πινάκων· ένα αναδρομικό CTE στο SQLite επαρκεί.                                                        |
| **MinIO**                            | **ΑΠΟΡΡΙΨΗ** | Δεν υπάρχει φόρτος εργασίας blob πολλών MB· οι εικόνες/ο ήχος διέρχονται μέσω proxy χωρίς επεξεργασία.                                |
| **pgvector / pg_ai / pg_textsearch** | **ΑΠΟΡΡΙΨΗ** | Ισχύει ο ίδιος λόγος περί ορίου του SQLite όπως και για το PostgreSQL· το οικοσύστημα του pgvector είναι κατακερματισμένο.            |
| **HAProxy / Envoy**                  | **ΑΠΟΡΡΙΨΗ** | Το Caddy παρέχει ήδη LB + TLS· και τα δύο απορρίφθηκαν ρητά ως routers Tier-1 (βλ. `AGENTS.md`).                                      |

Αν κάποια μελλοντική περίπτωση χρήσης αποδείξει την καταλληλότητα ενός από αυτά, το παρόν έγγραφο είναι το κατάλληλο σημείο για τροποποίηση.

## Σταδιακή διάθεση 4 εβδομάδων (εφόσον εγκριθεί)

1. **Εβδ. 1** — Ενσωμάτωση αυτού του PR + επαλήθευση των προαιρετικών profiles με ένα compose stack 3 replicas.
2. **Εβδ. 2** — Πλήρης ενεργοποίηση του Bifrost για OpenAI/Claude/Gemini/Ollama (4 από 14+ providers), με χρήση της διαδρομής sidecar proxy στο [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ελεγχόμενη από το `BIFROST_ENABLED`, με δυνατότητα άμεσης απενεργοποίησης κατά την εκτέλεση).
3. **Εβδ. 3** — Ενεργοποίηση του profile μνήμης Qdrant σε μία μοναδική δοκιμαστική εγκατάσταση· μέτρηση της διαφοράς latency έναντι του sqlite-vec.
4. **Εβδ. 4** — Healthchecks παρατηρησιμότητας (κωδικοί εξόδου `docker compose ps` + smoke tests με `wget`)· ανανέωση των 71 πυλώνων σύμφωνα με το ADR-041.

## Αρχεία που τροποποιήθηκαν σε αυτό το PR

| Αρχείο                                                    | Αλλαγή                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                      | +30 γραμμές: profile `memory` (Qdrant), profile `bifrost` (Bifrost), μόνιμοι τόμοι, healthchecks.                                                                                                                                                  |
| `.env.example`                                            | +24 γραμμές: `QDRANT_*` (6 μεταβλητές), `BIFROST_*` (4 μεταβλητές).                                                                                                                                                                                |
| `docs/reference/ENVIRONMENT.md`                           | +6 σειρές στην ενότητα 25 για τις μεταβλητές περιβάλλοντος `QDRANT_*`.                                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                                | +33 γραμμές: αλυσίδα εφεδρικών τιμών μεταβλητών περιβάλλοντος (ρυθμίσεις → περιβάλλον → προεπιλογή) για `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`          | +88 γραμμές: 9 νέες περιπτώσεις δοκιμών που παγιώνουν την προτεραιότητα των εφεδρικών τιμών των μεταβλητών περιβάλλοντος.                                                                                                                          |
| `docs/architecture/cluster-decisions.md` (αυτό το αρχείο) | ΝΕΟ — καταγραφή αποφάσεων για τα προαιρετικά profiles.                                                                                                                                                                                             |
| `AGENTS.md`                                               | +1 γραμμή: παραπομπή σε αυτό το έγγραφο στον πίνακα τεκμηρίωσης αναφοράς.                                                                                                                                                                          |

**Καθαρό σύνολο κώδικα που επηρεάστηκε:** 4 αρχεία παραγωγής (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 αρχείο δοκιμών (`qdrant-wiring.test.ts`), 2 αρχεία τεκμηρίωσης (`cluster-decisions.md`, `AGENTS.md`).
