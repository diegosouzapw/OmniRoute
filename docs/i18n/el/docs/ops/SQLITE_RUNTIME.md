# SQLite Runtime Resolution (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

Το OmniRoute επιλύει τον οδηγό SQLite κατά την εκκίνηση μέσω μιας αλυσίδας εφεδρείας 5 βημάτων:

1. **Ενσωματωμένο `better-sqlite3`** (μέσω του `dependencies` στο `package.json`)
   — η ταχύτερη επιλογή, εγγενές δυαδικό αρχείο, εγκαθίσταται από το `npm install` όταν υπάρχουν διαθέσιμα εργαλεία μεταγλώττισης.

2. **`better-sqlite3` εγκατεστημένο κατά τον χρόνο εκτέλεσης** (στο `~/.omniroute/runtime/`)
   — εγκαθίσταται με καθυστέρηση κατά την πρώτη εκτέλεση **Ή** από το `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Επικυρώνει τα magic bytes του εγγενούς αρχείου `.node` (ELF / Mach-O / PE) πριν από τη φόρτωση,
   για προστασία από κατεστραμμένα δυαδικά αρχεία ή αρχεία για λανθασμένη πλατφόρμα.

3. **`node:sqlite`** (τυπική βιβλιοθήκη Node ≥22.5) — δεν απαιτείται εγγενής μεταγλώττιση· χρησιμοποιείται όταν
   αποτυγχάνουν και οι δύο διαδρομές του better-sqlite3. Περιορισμένο σύνολο δυνατοτήτων.

4. **`sql.js`** (WASM) — τελική εφεδρική επιλογή. Λειτουργεί παντού, αλλά είναι πιο αργό
   και εγγράφει δεδομένα ανά διαστήματα αντί για συγχρονισμένα.

## Γιατί αυτή η πολυπλοκότητα;

- **Windows EBUSY**: Το `npm install -g omniroute@latest` μπορεί να αποτύχει εάν το
  `better_sqlite3.node` της προηγούμενης έκδοσης είναι κλειδωμένο από μια διεργασία που εκτελείται. Η εγκατάσταση
  κατά τον χρόνο εκτέλεσης στο `~/.omniroute/runtime/` παρακάμπτει την καθολική κρυφή μνήμη του npm.
- **Απουσία εργαλείων μεταγλώττισης**: Ορισμένα περιβάλλοντα (εταιρικά Windows χωρίς VS Build
  Tools, ελάχιστες εικόνες Docker) δεν μπορούν να μεταγλωττίσουν το `better-sqlite3`. Το πρόγραμμα εγκατάστασης
  κατά τον χρόνο εκτέλεσης ανακτά ένα προκατασκευασμένο δυαδικό αρχείο από το μητρώο npm· οι εφεδρικοί
  οδηγοί διασφαλίζουν ότι το OmniRoute εξακολουθεί να εκκινείται ακόμη και αν αυτό αποτύχει.
- **Συστήματα απομονωμένα από το δίκτυο**: Εάν το μητρώο npm δεν είναι προσβάσιμο, το `node:sqlite`
  ή το `sql.js` εγγυώνται τη βασική λειτουργικότητα.

## Επικύρωση magic bytes

Πριν από τη φόρτωση ενός αρχείου `.node` εγκατεστημένου κατά τον χρόνο εκτέλεσης, το OmniRoute διαβάζει τα πρώτα 8
bytes και τα συγκρίνει με γνωστές μαγικές υπογραφές πλατφορμών:

| Πλατφόρμα             | Bytes (hex)   | Ετικέτα     |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Μια μαγική υπογραφή που δεν αντιστοιχεί → το αρχείο αγνοείται και η διαδικασία εφεδρείας συνεχίζει στο επόμενο βήμα.

## Έλεγχος του ενεργού οδηγού

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Χειροκίνητος έλεγχος

```bash
# Παράλειψη της προθέρμανσης postinstall (για γρήγορες εγκαταστάσεις CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Αναγκαστική επανεγκατάσταση του better-sqlite3 κατά τον χρόνο εκτέλεσης
rm -rf ~/.omniroute/runtime
omniroute  # θα επανεγκατασταθεί στην επόμενη εκκίνηση

# Έλεγχος του ενεργού οδηγού
omniroute config db-info  # (εάν υπάρχει η εντολή CLI)
```

## Αναφορά

Υλοποίηση:

- `bin/cli/runtime/magicBytes.mjs` — βοηθητικές συναρτήσεις επικύρωσης magic bytes δυαδικών αρχείων
- `bin/cli/runtime/sqliteRuntime.mjs` — επιλυτής 5 βημάτων κατά τον χρόνο εκτέλεσης + πρόγραμμα εγκατάστασης με καθυστέρηση
- `bin/cli/runtime/index.mjs` — ενορχηστρωτής εκκίνησης (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — άγκιστρο npm μετά την εγκατάσταση (μη μοιραία προθέρμανση)
- `src/lib/db/core.ts` — εξαγωγές `ensureDbInitialized()` / `getDriverInfo()`

## Τοπολογία μοναδικού εγγραφέα (δεν υποστηρίζεται HA)

Η παραπάνω αλυσίδα εφεδρείας οδηγών εξακολουθεί να εκτελείται σε **μία διεργασία**. Από προεπιλογή, το SQLite
του OmniRoute έχει **έναν μόνο εγγραφέα**:

- Μη συνδέετε δύο αντίγραφα του OmniRoute στο ίδιο αρχείο `storage.sqlite`.
- Μια επανεκκίνηση container, μια ανάπτυξη Recreate, ένας τερματισμός OOM ή μια επανεκκίνηση HEALTHCHECK διακόπτει
  κάθε ενεργή συνεδρία SSE. Δεν υπάρχει ομαλή αποστράγγιση συνεδριών στην τυπική διαδρομή.
- Ένας έλεγχος λειτουργικότητας του orchestrator που θεωρεί ότι ένα αργό `/healthz` σημαίνει μη λειτουργική κατάσταση θα τερματίσει το μοναδικό
  αντίγραφο. Προτιμήστε έλεγχο λειτουργικότητας TCP + έλεγχο ετοιμότητας HTTP `/healthz`. Δείτε τον
  [Οδηγό Docker — διαθεσιμότητα](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  και τις [προτάσεις για ελέγχους Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
