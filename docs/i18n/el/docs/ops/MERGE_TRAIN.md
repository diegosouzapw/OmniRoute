# Merge Queue & Manual Merge-Train Runbook (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Από την έκδοση v3.8.49 (WS3.2/WS3.4 του πλάνου ποιότητας/ταχύτητας), η προεπιλεγμένη διαδρομή συγχώνευσης για
ελεγμένα PRs προς το `release/vX.Y.Z` είναι η **ουρά συγχώνευσης του Mergify** (`.mergify.yml`)·
το **χειροκίνητο merge-train** που τεκμηριώνεται παρακάτω αποτελεί την ΕΦΕΔΡΙΚΗ ΛΥΣΗ — χρησιμοποιείται κατά τη διάρκεια περιστατικών,
παγώματος εκδόσεων ή αν αλλάξει ποτέ το πρόγραμμα Open Source του Mergify.

## Προεπιλεγμένη διαδρομή: η ουρά του Mergify

1. Το PR ελέγχεται/γίνεται πράσινο από τις καμπάνιες και εγκρίνεται από την πύλη ⭐
   πριν από τη συγχώνευση του κατόχου (η αναφορά + η απόφαση ανά στοιχείο — δείτε `/merge-prs` Βήμα 0.75).
2. Ο κάτοχος (ή η συνεδρία που ενεργεί βάσει της απόφασης του κατόχου) εφαρμόζει την ετικέτα **`queue`**.
   Η ετικέτα ΕΙΝΑΙ η έγκριση συγχώνευσης· το Mergify απλώς την εκτελεί.
3. Το Mergify ομαδοποιεί έως και 10 PRs που βρίσκονται στην ουρά, επικυρώνει την παρτίδα έναντι των fast-gates
   και πραγματοποιεί συγχώνευση (squash). Μια κόκκινη παρτίδα **διχοτομείται αυτόματα** — το προβληματικό PR
   απομονώνεται σε ~log2(N) επανεπικυρώσεις και αφαιρείται από την ουρά· τα υπόλοιπα συνεχίζουν.
4. Μετά τη συγχώνευση, η συνεχής ροή εργασίας release-green επικυρώνει το νέο tip κατά το push
   και ανοίγει ένα issue απόδοσης ευθύνης αν ο συνδυασμός προκάλεσε παλινδρόμηση (ποτέ αυτόματο revert).

Προστατευτικοί κανόνες (αντικατοπτρίζουν τους Αυστηρούς Κανόνες #21/#22 του `CLAUDE.md`):

- **Ενεργό πάγωμα έκδοσης** → ΜΗΝ προσθέτετε ετικέτες σε PRs που στοχεύουν τον παγωμένο κλάδο· αλλάξτε πρώτα τον στόχο στον
  ενεργό `release/vX+1`.
- **PR άλλης συνεδρίας που βρίσκεται σε εξέλιξη** → μην του προσθέτετε ποτέ ετικέτα· μόνο η συνεδρία στην οποία ανήκει βάζει
  τη δική της εργασία στην ουρά.
- Τα diffs που αφορούν μόνο δοκιμές και τα PRs με ετικέτα `hotfix` εκτελούν ήδη μειωμένο CI (δείτε
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane)· οι συνθήκες της ουράς αποδέχονται οποιοδήποτε
  σύνολο ελέγχων εκτελέστηκε στην πράξη (`#check-failure=0` + `#check-pending=0`).

## Εφεδρική λύση: το χειροκίνητο merge-train

Χρησιμοποιείται όταν η ουρά δεν είναι διαθέσιμη. Αυτό κωδικοποιεί την πρακτική που διεκπεραίωσε 33 PRs μέσα σε
μία ημέρα κατά τον κύκλο v3.8.47:

1. **Συναρμολογήστε την παρτίδα** (~10–30 ελεγμένα+εγκεκριμένα PRs). Ελέγξτε για συγκρούσεις `linked:`
   (ίδια `tap.testFiles`, ίδια τμήματα του CHANGELOG) και επεξεργαστείτε τα διαδοχικά.
2. **Επικυρώστε ΜΙΑ ΦΟΡΑ**: σε ένα απομονωμένο worktree που βασίζεται στο tip της έκδοσης, συγχωνεύστε τοπικά όλες τις
   κεφαλές της παρτίδας και, στη συνέχεια, εκτελέστε τη σουίτα που αντιστοιχεί στην έκδοση
   (`npm run check:release-green`, προσθέστε `--with-build` πριν από μια έκδοση).
   Το `scripts/release/merge-train.sh <base> <PR#>…` αυτοματοποιεί τα βήματα 1–2 (τα συγκρουόμενα
   PRs αποβάλλονται, το train συνεχίζει). Η πλήρης λειτουργία εκτελεί `npm run test:unit` — τον
   runner ρυθμισμένο για το συγκεκριμένο μηχάνημα (`--test-concurrency=20`), **όχι** τα δύο διαδοχικά CI shards των 4 πυρήνων,
   τα οποία εκτελούσαν την κυρίαρχη φάση στο ~25% ενός μηχανήματος 16 πυρήνων (διορθώθηκε
   στις 2026-07-18). Το `--fast` (εκκαθάριση mega-train εντός της ημέρας, εγκεκριμένη από τον κάτοχο στις 2026-07-18)
   διατηρεί κάθε στατική πύλη + vitest, αλλά εκτελεί μόνο τα αρχεία node:test που τροποποιήθηκαν από τα
   PRs που επιβιβάστηκαν· η ΠΛΗΡΗΣ σουίτα πρέπει παρ' όλα αυτά να εκτελείται τουλάχιστον μία φορά την ημέρα στο
   συσσωρευμένο tip (ένα train χωρίς `--fast`).
3. **Πράσινο** → συγχωνεύστε τα PRs διαδοχικά (επανελέγχοντας τα `state,headRefOid` πριν από το καθένα —
   ένα PR του οποίου το head μετακινήθηκε επιστρέφει στον έλεγχο). Αποδείξτε ότι το καθαρό diff κάθε συγχώνευσης είναι η
   αλλαγή του ίδιου του PR (όχι reverts από αυτόματη επίλυση: ελέγξτε το `git diff --stat` για
   διαγραφές εκτός πεδίου).
4. **Κόκκινο** → διχοτομήστε την παρτίδα σε μισά (επικυρώστε κάθε μισό), αντί να εκτελείτε
   εκ νέου επικύρωση ένα προς ένα· επιστρέψτε το προβληματικό PR στην ουρά ελέγχου μαζί με τα αποδεικτικά στοιχεία.
5. **Ποτέ**: συγχώνευση στον παγωμένο κλάδο κατά τη διάρκεια παγώματος· `git stash` οπουδήποτε·
   αδιάκριτη επανεκτέλεση του CI με την ελπίδα να εξαφανιστεί ένα κόκκινο αποτέλεσμα (κανόνας: ένα κόκκινο αποτέλεσμα είναι πληροφορία).

## Διαβάθμιση (γιατί η ουρά είναι ασφαλής μόνο με fast-gates)

- **Ανά PR** (fast-gates του quality.yml): δοκιμές που επηρεάζονται από το TIA + πλήρης μονάδα 4 shards +
  vitest + σύνολο lint + typecheck + ακεραιότητα τεκμηρίωσης/changelog.
- **Ανά παρτίδα/tip** (συνεχές release-green): ΑΥΣΤΗΡΕΣ πύλες `--quick` σε κάθε push προς
  τον κλάδο έκδοσης· πλήρεις σαρώσεις `--with-build --full-ci` 3×/ημέρα.
- **Ανά έκδοση** (ci.yml στο PR της έκδοσης): το πλήρες matrix, συμπεριλαμβανομένων των E2E ×9,
  package-artifact + ελέγχου εκκίνησης tarball, coverage/ratchets.

Τίποτα δεν επικυρώνεται λιγότερο από πριν — η βαριά επιφάνεια απλώς εκτελείται ανά παρτίδα/tip
αντί ανά PR, και αυτό είναι που εξαλείφει τις O(N) διαδρομές μετ' επιστροφής.
