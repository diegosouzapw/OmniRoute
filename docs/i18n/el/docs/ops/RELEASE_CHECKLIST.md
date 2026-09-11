# RELEASE_CHECKLIST (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Λίστα Ελέγχου Έκδοσης"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Λίστα Ελέγχου Έκδοσης

> **Τελευταία ενημέρωση:** 2026-08-28 — v3.8.51
> Βελτιωμένη ροή έκδοσης που αξιοποιεί τις δεξιότητες του Claude Code για αυτοματισμό.
>
> **Διατηρείτε την ουρά/κλάδο σε πράσινη κατάσταση μεταξύ εκδόσεων:** δείτε [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (οικογένεια `/green-prs` + `npm run check:release-green` + `/babysit` + νυχτερινό). Η εκτέλεση
> αυτού περιοδικά — και ιδιαίτερα **πριν** από αυτή τη λίστα ελέγχου — κάνει το PR έκδοσης να ξεκινά σε πράσινη κατάσταση.

## Σύνοψη

```bash
# 1. Αύξηση έκδοσης + δημιουργία CHANGELOG (δεξιότητα)
/version-bump-cc patch    # ή minor/major

# 2. Εκτέλεση τοπικής πύλης ποιότητας
npm run check              # lint + tests
npm run test:coverage      # πλήρης έλεγχος κάλυψης (60/60/60/60)

# 3. Κατασκευή & smoke test
npm run build
npm run test:e2e           # προαιρετικό αλλά συνιστάται

# 4. Δημιουργία έκδοσης (δεξιότητα)
/generate-release-cc

# 5. Ανάπτυξη (δεξιότητα)
/deploy-vps-both-cc        # ή akamai-cc / local-cc

# 6. Καταγραφή αποδεικτικών έκδοσης (δεξιότητα)
/capture-release-evidences-cc
```

## Αξιόπιστη Δημοσίευση npm (προεπιλογή από v3.8.51) — σταδιακή κατόπιν αιτήματος, άμεση ως εφεδρική

Το `npm-publish.yml` δημοσιεύει μέσω **Αξιόπιστης Δημοσίευσης npm (OIDC)** από προεπιλογή: το
job `stage-npm` (φιλοξενούμενο στο github) ανταλλάσσει το id-token του GitHub με ένα βραχύβιο διαπιστευτήριο npm
για εκείνη την εκτέλεση — χωρίς μακροχρόνιο token npm στα μυστικά του αποθετηρίου, χωρίς προτροπή 2FA, με επισυναπτόμενη προέλευση.
Αυτός είναι ο τρόπος παράκαμψης των κυρώσεων npm τώρα που τα tokens που παρακάμπτουν το 2FA αποσύρονται·
αποκαθιστά την πλήρως αυτόματη ροή που είχε το έργο έως τη v3.8.48 διατηρώντας παράλληλα
την εγγύηση WS1.3 (ένα διαρρευσμένο token δεν μπορεί να δημοσιεύσει μόνο του — δεν υπάρχει token).

**Εφάπαξ ρύθμιση (ιδιοκτήτης):** npmjs.com → πακέτο `omniroute` → Ρυθμίσεις → _Trusted
Publisher_ → GitHub: ιδιοκτήτης `diegosouzapw`, αποθετήριο `OmniRoute`, workflow `npm-publish.yml`
(περιβάλλον: κανένα). Μέχρι να υπάρχει αυτό, το αυτόματο βήμα αποτυγχάνει με `ENEEDAUTH`:
επανεκκινήστε με `publish_mode=staged` (παρακάτω) ή `direct`.

### Σταδιακή δημοσίευση (κατόπιν αιτήματος — `publish_mode=staged`)

Το workflow npm-publish δεν δημοσιεύει πλέον άμεσα: εκκινεί το συμπιεσμένο tarball
(`check:pack-boot`) και στη συνέχεια εκτελεί το `npm stage publish` — τα ακριβή bytes παρκάρονται στο
μητρώο, **μη εγκαταστάσιμα** μέχρι να εγκρίνει ο ιδιοκτήτης. Η ανθρώπινη πύλη 2FA μετακινήθηκε
ΜΕΤΆ την απόδειξη, όχι πριν.

**Ροή ιδιοκτήτη αφού το workflow γίνει πράσινο:**

1. `npm stage list omniroute` — βρείτε το αναγνωριστικό σταδίου (εκτυπώνεται επίσης στην περίληψη του workflow).
2. Επαληθεύστε τα bytes σταδίου (συνιστάται): `npm stage download <id>`, στη συνέχεια εγκαταστήστε το
   ληφθέν tarball σε ένα προσωρινό πρόθεμα και εκκινήστε το (`npm run check:pack-boot` αυτοματοποιεί
   την ίδια κρίση pack→install→boot στο CI).
3. `npm stage approve <id>` — η προτροπή 2FA ΕΙΝΑΙ η δημοσίευση. Το `npm stage reject <id>` την απορρίπτει.
4. Δίκτυο μετά τη δημοσίευση: ο επαληθευτής μετά τη δημοσίευση (WS1.4 του σχεδίου v3.8.49) εγκαθιστά την
   δημοσιευμένη έκδοση από το δημόσιο μητρώο σε ένα καθαρό container και την εκκινεί.

**Εφεδρική διαδικασία έκτακτης ανάγκης:** `workflow_dispatch` με `publish_mode=direct` αποκαθιστά το
παλαιό άμεσο `npm publish` (χρησιμοποιήστε μόνο αν το ίδιο το staging δυσλειτουργεί· καταγράψτε τον λόγο).

**Εφάπαξ σκλήρυνση (ιδιοκτήτης, npmjs.com):** ρυθμίστε τον Αξιόπιστο Εκδότη για
το `omniroute` σε λειτουργία μόνο-σταδίου, ώστε ένα διαρρευσμένο μακροχρόνιο token να μην μπορεί να εκτελέσει `npm publish`
άμεσα από οπουδήποτε — το CI μπορεί μόνο να κάνει stage· μόνο το 2FA του ιδιοκτήτη δημοσιεύει.

**Εγχειρίδιο κατεστραμμένου artifact (αμετάβλητο):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
ως η προεπιλεγμένη άμεση αντίδραση (λεπτά, αναστρέψιμη)· `npm unpublish` μόνο εντός του παραθύρου 72ω/χωρίς-εξαρτήσεις
και ποτέ ως πρώτη κίνηση. Docker: ποτέ μην ξαναγράφετε ετικέτα έκδοσης — η επαναφορά γίνεται με
επαναστόχευση του `latest` στην τελευταία καλή κατάσταση digest.

**Docker Hub `latest` (απαιτείται σε κάθε σταθερή δημοσίευση SemVer):** το
workflow `docker-publish` πρέπει να επισημαίνει **και** τα δύο `X.Y.Z` και, όταν
το `should-promote-latest.sh` συμφωνεί ότι πρόκειται για την υψηλότερη σταθερή SemVer, `:latest`
με το **ίδιο digest**. Μετά το job: το digest `latest` του Hub ισούται με το νέο
digest SemVer και το `last_updated` ενημερώθηκε. Μην αφήνετε το `:latest` σε μια παλαιότερη
κατασκευή ενώ οι σημειώσεις έκδοσης αναφέρουν διορθώσεις που υπάρχουν μόνο στο git. Τα quickstarts Compose
χρησιμοποιούν `:latest`· το GitOps πρέπει να συνεχίσει να καρφιτσώνει `X.Y.Z`. Δείτε
[Κανάλια έκδοσης Docker](../guides/DOCKER_GUIDE.md#release-channels) και #10317.

## Γρήγορη Διαδρομή Hotfix (ετικέτα `hotfix`)

Ένα PR με ετικέτα `hotfix` παρακάμπτει τη βαριά μήτρα CI (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) και διατηρεί τις γρήγορες, υψηλής αξιοπιστίας πύλες: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
και το tarball boot-smoke (`check:pack-boot`). Στόχος: πράσινο σε ≤15 λεπτά αντί για ~33 λεπτά.

**Πολιτική εισόδου — και τα τέσσερα απαιτούνται (βασισμένα στις έκτακτες διαδρομές Chromium/VS Code/Node):**

1. **Σοβαρότητα**: η παραγωγή είναι χαλασμένη — ένα δημοσιευμένο artifact κολλάει κατά την εκκίνηση /
   μια διόρθωση ασφαλείας / κάθε χρήστης της έκδοσης επηρεάζεται. Το «Σημαντικό» δεν είναι «Χαλασμένο».
2. **Εξουσιοδότηση**: μόνο ο ιδιοκτήτης του αποθετηρίου εφαρμόζει την ετικέτα `hotfix`. Η ετικέτα ΕΙΝΑΙ
   η έγκριση — ποτέ μη χρησιμοποιείτε αυτοεξυπηρέτηση σε ένα PR εκστρατείας.
3. **Τεκμηρίωση**: το σώμα του PR συνδέει την προηγούμενη πλήρως πράσινη βαριά εκτέλεση (η σουίτα που
   τα παρακαμφθέντα jobs θα επαναεπικύρωναν) καθώς και το δικό του τεστ που αρχικά απέτυχε και μετά πέρασε.
4. **Εύρος**: μόνο cherry-pick — η ελάχιστη διόρθωση, χωρίς αναδιαμορφώσεις, χωρίς επιπλέον αλλαγές.

Η παρακαμφθείσα επιφάνεια coverage/ratchet επαναεπικυρώνεται από την επόμενη πλήρη εκτέλεση στον
κλάδο έκδοσης (συνεχής πράσινη έκδοση) — η διαδρομή παρακάμπτει την ΑΝΑΜΟΝΗ, ποτέ την επικύρωση.
Οι διαφορές μόνο τεστ (όλα τα αρχεία κάτω από `tests/`, κανένα κάτω από `tests/e2e/`) παρακάμπτουν τη
μήτρα E2E αυτόματα, χωρίς καμία ετικέτα.

## Λεπτομερής Λίστα Ελέγχου

### Πριν την έκδοση

- [ ] Όλα τα PRs που στοχεύουν αυτή την έκδοση έχουν συγχωνευτεί στο `release/vX.Y.0`
- [ ] Όλα τα ανοιχτά Linear/issue για αυτή την έκδοση είναι κλειστά ή έχουν μεταφερθεί στο επόμενο milestone
- [ ] CI πράσινο στον κλάδο `release/vX.Y.0`
- [ ] Δεν υπάρχουν σημαδάκια `TODO(release)` στον κώδικα: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Η βασική εικόνα Docker είναι ενημερωμένη (τρέχουσα `node:24.15.0-trixie-slim`)

### Έκδοση & Αρχείο Αλλαγών

- [ ] Εκτελέστε `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - Ανεβάζει `package.json`, `electron/package.json`
  - Αναγεννά `CHANGELOG.md` από τα git commits από την τελευταία ετικέτα
  - Ενημερώνει τα badges README.md
- [ ] Ελέγξτε χειροκίνητα το CHANGELOG.md και καθαρίστε τα μηνύματα commits αν χρειάζεται
- [ ] Βεβαιωθείτε ότι η τελευταία ενότητα semver στο `CHANGELOG.md` ισούται με την έκδοση `package.json`
- [ ] Διατηρήστε το `## [Unreleased]` ως την πρώτη ενότητα changelog για επερχόμενη εργασία
- [ ] Ενημερώστε `docs/openapi.yaml` → το `info.version` πρέπει να ισούται με την έκδοση `package.json`

### Ποιότητα Κώδικα

- [ ] `npm run lint` — 0 σφάλματα (οι προειδοποιήσεις είναι προϋπάρχουσες)
- [ ] `npm run typecheck:core` — καθαρό
- [ ] `npm run typecheck:noimplicit:core` — καθαρό (strict)
- [ ] `npm run check:cycles` — χωρίς κυκλικές εξαρτήσεις
- [ ] `npm run check:any-budget:t11` — εντός προϋπολογισμού
- [ ] `npm run check:route-validation:t06` — καθαρό
- [ ] `npm run check:node-runtime` — το υποστηριζόμενο runtime floor πληρούται (`>=22.22.2 <23`, `>=24.0.0 <27`, ανά `SUPPORTED_NODE_RANGE` στο `src/shared/utils/nodeRuntimeSupport.ts`; ευθυγραμμισμένο με `engines` του `package.json`)

### Δοκιμές

- [ ] `npm run test:unit` — επιτυχία
- [ ] `npm run test:vitest` — επιτυχία (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — η πύλη 60/60/60/60 ικανοποιείται (statements/lines/functions/branches)
- [ ] `npm run test:integration` — επιτυχία (αν οι αλλαγές αφορούν DB / handlers)
- [ ] `npm run test:combo:matrix` — επιτυχία (μήτρα στρατηγικής combo: αποδεικνύει ντετερμινιστικά τις αποφάσεις επιλογής όλων των 19 δημόσιων στρατηγικών δρομολόγησης· εκτελέστε όταν αγγίζετε combo routing, στρατηγική resolution ή fallback logic)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **προαιρετικό/χειροκίνητο** (πραγματικό smoke με πραγματικά upstream· χρησιμοποιεί ένα read-only DB snapshot από VPS `root@192.168.0.15`· χτυπά πραγματικούς παρόχους, κοστίζει credits· δεν εκτελείται ποτέ στο CI· παρακάμπτεται καθαρά χωρίς την πύλη)
- [ ] `npm run test:combo:live:vps` — **προαιρετικό/χειροκίνητο** (Phase-3 VPS live smoke: 7 σενάρια HTTP έναντι του ζωντανού διακομιστή `.15` μέσω plain Node ESM· απαιτεί `ssh root@192.168.0.15`· δημιουργεί/διαγράφει μόνο `__live_test__*` combos· χτυπά πραγματικούς παρόχους· δεν εκτελείται ποτέ στο CI)
- [ ] `npm run test:e2e` — επιτυχία (αλλαγές UI)
- [ ] `npm run test:protocols:e2e` — επιτυχία (αλλαγές MCP/A2A)
- [ ] `npm run test:ecosystem` — επιτυχία

### Hooks (Επικυρωμένα από Husky)

Τα Husky hooks βρίσκονται στο `.husky/` και εκτελούνται αυτόματα σε git λειτουργίες.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** γρήγορες ντετερμινιστικές πύλες — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (ενεργοποιήθηκε 2026-06-13). Σκόπιμα εξαιρεί το `test:unit` (αργό· καλύπτεται από το CI job `test-unit`).
  - Εκτελέστε `npm run test:unit` χειροκίνητα πριν κάνετε push κλάδους έκδοσης.

Αν ένα hook αποτύχει: διορθώστε το υποκείμενο πρόβλημα, μην παρακάμψετε με `--no-verify`.

### Συμβατικές Δεσμεύσεις

Όλες οι δεσμεύσεις για έκδοση πρέπει να ακολουθούν τη μορφή `type(scope): subject`.

**Έγκυροι τύποι:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Έγκυρα scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Αλλαγές που σπάνε συμβατότητα: προσθέστε υποσέλιδο `BREAKING CHANGE:` ή `!` μετά το scope (π.χ. `feat(api)!: drop /v0`).

### Τεκμηρίωση

- [ ] Το `npm run check:docs-sync` περνά (εκτελείται αυτόματα από pre-commit)
- [ ] Το `npm run check:docs-all` περνά (ομπρέλα: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] Το `npm run check:env-doc-sync` τερματίζει με 0 — η σύμβαση env κώδικα ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` είναι άθικτη
- [ ] Το `npm run check:doc-links` τερματίζει με 0 — δεν υπάρχουν σπασμένες εσωτερικές αναφορές markdown μετά από αναδιάρθρωση
- [ ] Το `docs/architecture/ARCHITECTURE.md` ελέγχθηκε για αποκλίσεις storage/runtime
- [ ] Το `docs/guides/TROUBLESHOOTING.md` ελέγχθηκε για αποκλίσεις env var και λειτουργικές αποκλίσεις
- [ ] Αν το `.env.example` άλλαξε: το `docs/reference/ENVIRONMENT.md` ενημερώθηκε
- [ ] Αν το νέο χαρακτηριστικό έχει UI: το `docs/guides/USER_GUIDE.md` το αναφέρει
- [ ] Αν το νέο χαρακτηριστικό έχει API: το `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` ενημερώθηκαν
- [ ] Αν το νέο χαρακτηριστικό είναι module: υπάρχει αφιερωμένο `docs/<MODULE>.md`
- [ ] Αν υπάρχει αλλαγή που σπάει συμβατότητα: το `docs/guides/TROUBLESHOOTING.md` έχει σημείωση μετάβασης

### i18n

- [ ] Το `npm run i18n:check` τερματίζει με 0 — η κατάσταση μετάφρασης (`.i18n-state.json`) είναι συγχρονισμένη με τα πηγαία έγγραφα (χωρίς αποκλιμένες πηγές σε strict mode· η advisory warn-mode είναι αποδεκτή για τελευταία στιγμή doc touch-ups, αλλά πρέπει να είναι 0 πριν το tagging)
- [ ] Το `npm run i18n:check-ui-coverage` τερματίζει με 0 — κάθε locale UI βρίσκεται πάνω ή στο όριο κάλυψης 80%
- [ ] Το `npm run i18n:sync-ui:dry` αναφέρει 0 ελλείποντα κλειδιά σε όλα τα 42 locales
- [ ] Αν τα πηγαία αγγλικά έγγραφα άλλαξαν, εκτελέστε `npm run i18n:run` (απαιτεί `OMNIROUTE_TRANSLATION_API_KEY` στο `.env`) πριν το tagging
- [ ] Οι συνεισφορές μετάφρασης μπορούν να αναβληθούν στην επόμενη έκδοση αν είναι μικρές (παρακολουθήστε στο CHANGELOG)

### Μεταναστεύσεις Βάσης Δεδομένων

- [ ] Αν το `src/lib/db/migrations/` έχει νέα αρχεία:
  - [ ] Κάθε μετανάστευση είναι idempotent (`CREATE TABLE IF NOT EXISTS`, κ.λπ.)
  - [ ] Οι μεταναστεύσεις τυλιγμένες σε transactions
  - [ ] Αριθμημένες σωστά (χωρίς κενά στην ακολουθία)
- [ ] Δοκιμή σε νέα εγκατάσταση: διαγράψτε `~/.omniroute/omniroute.db` και εκτελέστε `npm run dev`
- [ ] Δοκιμή σε υπάρχουσα εγκατάσταση: δημιουργία αντιγράφου ασφαλείας DB, εκτέλεση μετανάστευσης, επαλήθευση schema
- [ ] Τα αρχεία WAL (`-wal`, `-shm`) χειρίζονται σωστά αν η μετανάστευση ξαναγράφει πίνακες

### Κατάλογος Παρόχων (Επικυρωμένος από Zod)

- [ ] Το Zod schema του `src/shared/constants/providers.ts` είναι έγκυρο κατά τη φόρτωση
  - [ ] Όλοι οι πάροχοι έχουν τα απαιτούμενα πεδία (`id`, `label`, `kind`, κ.λπ.)
  - [ ] Παρέχεται `freeNote` για νέους δωρεάν παρόχους
  - [ ] Οι πάροχοι OAuth έχουν `oauthConfig` εγγεγραμμένο στο `src/lib/oauth/constants/oauth.ts`
- [ ] Αν προστέθηκε νέος πάροχος: αντίστοιχος executor στο `open-sse/executors/`
- [ ] Αν δεν είναι μορφή OpenAI: translator στο `open-sse/translator/`
- [ ] Τα μοντέλα είναι εγγεγραμμένα στο `open-sse/config/providerRegistry.ts`
- [ ] Τα unit tests στο `tests/unit/` καλύπτουν ταξινόμηση παρόχου και δρομολόγηση

### Desktop (Electron)

Αν το `electron/` άλλαξε:

- [ ] Το `npm run electron:smoke:packaged` περνά
- [ ] Builds δοκιμασμένα για τουλάχιστον ένα από `:win`, `:mac`, `:linux`
- [ ] Τα πιστοποιητικά υπογραφής κώδικα δεν έχουν λήξει (αν υπογράφετε)
- [ ] Η έκδοση `electron/package.json` ταιριάζει με την έκδοση root `package.json`
- [ ] Ο δείκτης καναλιού auto-update ενημερώθηκε αν εκδίδεται στο `stable`

### Διάταξη Build

Το αποθετήριο χρησιμοποιεί τρεις ξεχωριστούς καταλόγους εξόδου — μην τους μπερδεύετε:

| Κατάλογος | Σκοπός                                                            | Παρακολουθείται; |
| --------- | ----------------------------------------------------------------- | ---------------- |
| `src/`    | Πηγαίος κώδικας εφαρμογής (TypeScript / TSX)                      | Ναι              |
| `.build/` | Ενδιάμεσα build — έξοδος `next build` (`distDir`)                 | Όχι (gitignored) |
| `dist/`   | Δέσμη npm για αποστολή — συναρμολογείται από `assembleStandalone` | Όχι (gitignored) |

> **Σημείωση χειριστή:** ο κατάλογος εικόνων στο απομακρυσμένο VPS παραμένει `/usr/lib/node_modules/omniroute/app/`.
> Μόνο η έξοδος build **εντός αποθετηρίου** μετακινήθηκε (`app/` → `dist/`). Τα deploy skills rsync
> περιεχόμενα `dist/` στον απομακρυσμένο κατάλογο `app/` — δεν απαιτούνται αλλαγές VPS path.

**Ροή μονής κατασκευής:**

```
npm run build:release
  └─ rm -rf .build dist          (καθαρισμός)
  └─ next build → .build/next/   (ενδιάμεσα)
  └─ assembleStandalone          (αντιγράφει standalone + static + public + natives → dist/)
  └─ γράφει dist/BUILD_SHA       (sentinel HEAD)
```

ΜΗΝ εκτελέσετε `npm run build` ακολουθούμενο από ξεχωριστό `npm run build:cli` για deploy — χρησιμοποιήστε
`npm run build:release` που κάνει καθαρή ανακατασκευή + sentinel σε μία εντολή.

### Επικύρωση Artifact

- [ ] Το `npm run build:release` επιτυγχάνει και `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Το `npm run check:pack-artifact` καθαρό — χωρίς `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ή άλλα τοπικά υπολείμματα
- [ ] Το `dist/server.js` υπάρχει μετά το build

### Tagging & Έκδοση

- [ ] Εκτελέστε `/generate-release-cc` (Claude Code skill):
  - Δημιουργεί ετικέτα `vX.Y.Z`
  - Κάνει push ετικέτα και κλάδο
  - Ανοίγει GitHub Release με σώμα changelog
  - Επισυνάπτει installers Electron (αν κατασκευάστηκαν)
- [ ] Ή χειροκίνητα:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Τα deploy skills χρησιμοποιούν τη ελαφριά ροή rsync — χωρίς `npm pack`, χωρίς `npm i -g`:

- [ ] Χρησιμοποιήστε το deploy skill που ταιριάζει στον στόχο:
  - `/deploy-vps-local-cc` — τοπικό VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — και τα δύο
- [ ] Πριν το deploy, επιβεβαιώστε ότι `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Το build πρέπει να εκτελείται εκεί που το `node_modules` είναι πραγματικό (κύρια checkout ή worktree με `npm ci` — ΟΧΙ symlinked worktree)
- [ ] Smoke test της αναπτυγμένης περίπτωσης:
  - Ανοίξτε `/dashboard/health` → ελέγξτε ότι το string έκδοσης ταιριάζει με την έκδοση
  - Εκτελέστε αίτημα `/v1/chat/completions` έναντι γνωστού παρόχου
  - Επαληθεύστε ότι το `/api/monitoring/health` επιστρέφει `CLOSED` circuit breakers
  - Επιβεβαιώστε ότι τα MCP transports ανταποκρίνονται (`/mcp` HTTP, `/mcp-sse` SSE)

### Μετά την Έκδοση

- [ ] Εκτελέστε `/capture-release-evidences-cc` (Claude Code skill)
  - Λαμβάνει WebP screenshots/recordings νέων χαρακτηριστικών
  - Επισυνάπτει στις σημειώσεις έκδοσης / ανάρτηση blog
- [ ] Ενημερώστε GitHub Discussions / Discord με ανακοίνωση έκδοσης
- [ ] Ανοίξτε milestone για την επόμενη έκδοση
- [ ] Αν κρίσιμο: καρφιτσώστε συζήτηση ή δημοσιεύστε στο `news.json` για in-app banner

### Πύλη δημόσιας έναρξης Radar

Η ανακοίνωση Radar δεσμεύεται σκόπιμα με `active: false`. Η ενεργοποίηση είναι ξεχωριστή
αλλαγή αφού κάθε στοιχείο παρακάτω τεκμηριωθεί:

- [ ] Όλα τα στοιβαγμένα Radar PRs έχουν συγχωνευτεί και το CI tip έκδοσης είναι πράσινο
- [ ] Αναπτύξτε και κάντε smoke τις OSS Radar routes με το `RADAR_ENABLED` ακόμα απενεργοποιημένο από προεπιλογή
- [ ] Smoke `GET /planos`, `/termos`, `/privacidade`, και `/reembolso` στον ονοματοδοτημένο Radar host
- [ ] Καταγράψτε ταυτότητα/επικοινωνία/διεύθυνση χειριστή και εγκεκριμένη νομική ανασκόπηση από τον ιδιοκτήτη στην ιδιωτική υπηρεσία
- [ ] Δοκιμάστε Stripe Checkout και υπογεγραμμένο webhook σε test mode μόνο
- [ ] Δοκιμάστε μία κρυπτογραφημένη συναλλακτική αποστολή email με τον εγκεκριμένο αποστολέα/domain
- [ ] Αποδείξτε επαναφορά αντιγράφου ασφαλείας και μία εποπτευόμενη εκτέλεση έρευνας με περιορισμό προϋπολογισμού
- [ ] Εγκρίνετε την πολιτική ανασκόπησης BRL/PIX πριν αποδεχτείτε αποδεικτικά δωρεάς
- [ ] Ενεργοποιήστε δημόσιο Checkout μόνο μετά τις προηγούμενες πύλες, έπειτα ενεργοποιήστε το νέο ID `news.json`
- [ ] Επαληθεύστε ότι το Home banner χρησιμοποιεί τοπικοποιημένο αντίγραφο και ότι ένα νέο ID εμφανίζεται ξανά αφού ένα παλαιότερο ID απορριφθεί

## Καπνός ενσωματωμένων υπηρεσιών (v3.8.4+)

Πριν από την αποστολή οποιασδήποτε έκδοσης που περιλαμβάνει αλλαγές σε ενσωματωμένες υπηρεσίες, επαληθεύστε:

### Εκκίνηση από νέα βάση δεδομένων (εντοπίζει συγκρούσεις μεταναστεύσεων — προστέθηκε μετά από hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — περιμένετε 10 δ για εκκίνηση
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` επιστρέφει `"9router"` (ΟΧΙ 404, ΟΧΙ 500). Επιβεβαιώνει ότι η μετανάστευση `071_services.sql` εφαρμόστηκε + η σειρά τοποθετήθηκε.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` επιστρέφει 3 σειρές.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` επιστρέφει 2 σειρές (επικυρώνει ότι το `070_webhooks_kind_metadata.sql` εφαρμόστηκε).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` περνά — προστατεύει από μελλοντικές συγκρούσεις.

### 9Router

- [ ] `POST /api/services/9router/install` επιστρέφει 200 με `installedVersion` σε λιγότερο από 2 λεπτά
- [ ] `POST /api/services/9router/start` επιστρέφει 200 και `state: "running"` σε λιγότερο από 30 δ
- [ ] `GET /api/services/9router/status` αναφέρει `health: "healthy"`
- [ ] `POST /v1/chat/completions` με `"model": "9router/auto/..."` επιστρέφει 200 (ολοκληρωμένη δρομολόγηση μέσω 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` αποδίδει το εγγενές UI του 9Router εντός του proxy (χωρίς άμεσο iframe `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` επιστρέφει `{ keyRotated: true }` και η υπηρεσία επανεκκινεί ομαλά
- [ ] `POST /api/services/9router/stop` επιστρέφει 200 και `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` επιστρέφει ροή SSE με συμβάν `snapshot` που περιέχει πρόσφατες γραμμές
- [ ] Εγκατάσταση σε περιβάλλον χωρίς `npm` στο PATH επιστρέφει 500 με φιλικό μήνυμα σφάλματος (χωρίς stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` επιστρέφει 200 σε λιγότερο από 2 λεπτά
- [ ] `POST /api/services/cliproxy/start` επιστρέφει 200 και `state: "running"` σε λιγότερο από 30 δ
- [ ] `GET /api/services/cliproxy/status` αναφέρει `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` επιστρέφει 200 και `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` επιστρέφει ροή SSE

### Παλινδρόμηση ασφάλειας

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` επιστρέφει `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` επιστρέφει `403 LOCAL_ONLY`
- [ ] Οι αποκρίσεις σφάλματος από το `/api/services/*` δεν περιέχουν `err.stack` ή απόλυτες διαδρομές αρχείων

## Έλεγχοι v3.8.0+

Πριν από την αποστολή οποιασδήποτε έκδοσης v3.8.x, επαληθεύστε αυτά τα επιπλέον στοιχεία:

- [ ] `omniroute --tray` εκκινεί στο macOS (το systray2 εγκαθίσταται στο `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` εκκινεί στο Linux (απαιτεί DISPLAY· ομαλό σφάλμα εάν δεν έχει οριστεί)
- [ ] `omniroute --tray` εκκινεί στα Windows (PowerShell NotifyIcon, χωρίς επιπλέον δυαδικά αρχεία)
- [ ] `omniroute config tray enable` δημιουργεί καταχώρηση αυτόματης εκκίνησης· το disable την αφαιρεί
- [ ] `npm install -g omniroute@<this-version>` εκτελεί το postinstall χωρίς εξαναγκαστική έξοδο
- [ ] Η διαδρομή ενημέρωσης διατηρεί τις προαιρετικές εξαρτήσεις: τα `omniroute update --apply` και ο αυτόματος ενημερωτής
      εκτελούν `npm install -g … --include=optional` ώστε τα `optionalDependencies` (better-sqlite3,
      keytar, tls-client, και η στοίβα SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) να επιβιώνουν μετά από ενημέρωση. Το επίπεδο SLM ultra `modelPath` χρειάζεται επίσης το
      μοντέλο tinybert, που λαμβάνεται αυτόματα στο `${DATA_DIR}/models/llmlingua` κατά την πρώτη χρήση. Στη συνέχεια το Postinstall
      (`scripts/build/colocateOptionals.mjs`) τοποθετεί συνεντοπισμένα την προαιρετική κλωστή SLM στο
      `dist/node_modules` ώστε ο worker να επιλύει ΕΝΑ ΜΟΝΟ instance `@huggingface/transformers` ^4.2.0
      — τα αυτόνομα bundle ίχνους μεταφέρουν μόνο το transformers, όχι τα δυναμικά εισαγόμενα
      optionals, επομένως χωρίς αυτό ο worker θα φόρτωνε το llmlingua-2 έναντι του transformers της ρίζας
      και το επίπεδο SLM θα αποτύγχανε αθόρυβα.
- [ ] `omniroute status` λειτουργεί χωρίς `.env` (διαδρομή token CLI, μόνο loopback)
- [ ] `curl http://localhost:20128/api/shutdown` επιστρέφει 401 (διαρκώς προστατευμένη διαδρομή)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` επιστρέφει 401 (φύλακας loopback)
- [ ] Το runtime SQLite επιλύεται σε `bundled` κατά την πρώτη εκτέλεση (το bundled δυαδικό αρχείο είναι έγκυρο για την πλατφόρμα)
- [ ] Το runtime SQLite υποχωρεί σε `runtime` όταν διαγραφεί το `node_modules/better-sqlite3`
- [ ] Το έξυπνο φίλτρο MCP συμπιέζει πραγματική έξοδο `playwright-mcp browser_snapshot` (μείωση ≥50%)
- [ ] Όλα τα 10 αρχεία `skills/omniroute*/SKILL.md` είναι δημοσίως προσβάσιμα μέσω raw URL GitHub
- [ ] Ο οδηγός εισαγωγής εμφανίζει το βήμα περιήγησης "How It Works" κατά την αρχική ρύθμιση
- [ ] Το widget κάλυψης επιπέδου στον κεντρικό πίνακα εμφανίζει τους αριθμούς ρυθμισμένων/ενεργών

---

## Επαναφορά (Rollback)

Εάν μια έκδοση έχει κρίσιμο πρόβλημα:

1. `gh release edit vX.Y.Z --prerelease` (την επισημαίνει ως μη τελευταία)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (μόνο εάν δεν έχει ακόμη υιοθετηθεί από χρήστες)
3. Ή: hotfix στο `release/vX.Y.0` → patch έκδοση `vX.Y.(Z+1)`
4. Άμεση ενημέρωση στα GitHub Discussions και Discord

## Αυστηροί Κανόνες

- Ποτέ μην κάνετε commit απευθείας στο `main`
- Ποτέ μην χρησιμοποιείτε `git push --force` στο `main` ή σε κλάδους `release/*`
- Ποτέ μην παρακάμπτετε τα Husky hooks (`--no-verify`)
- Ποτέ μην κάνετε commit μυστικά, διαπιστευτήρια ή αρχεία `.env`
- Η κάλυψη πρέπει να παραμένει ≥60/60/60/60 (εντολές/γραμμές/συναρτήσεις/κλάδοι)
- Πάντα να συμπεριλαμβάνετε ή να ενημερώνετε τα tests όταν αλλάζετε κώδικα παραγωγής στα `src/`, `open-sse/`, `electron/` ή `bin/`

## Αυτοματοποιημένος Έλεγχος Συγχρονισμού

Εκτελέστε τον φρουρό συγχρονισμού τεκμηρίωσης τοπικά πριν ανοίξετε ένα PR:

```bash
npm run check:docs-sync
```

Το CI εκτελεί επίσης αυτόν τον έλεγχο στο `.github/workflows/ci.yml` (εργασία lint).
