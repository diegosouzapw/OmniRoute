# Error Message Sanitization (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Πηγή αλήθειας:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` και οι δημόσιοι builders στο `open-sse/utils/error.ts`
> **Δοκιμές:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Τελευταία ενημέρωση:** 2026-09-02 — v3.8.51
> **Απευθύνεται σε:** Κάθε μηχανικό που επεξεργάζεται αποκρίσεις σφαλμάτων (διαδρομές HTTP, ροές SSE, executors, χειριστές MCP).
> **Κατάσταση:** **ΥΠΟΧΡΕΩΤΙΚΟ** για κάθε διαδρομή κώδικα που επιστρέφει μήνυμα σφάλματος σε πελάτη.

## Γιατί υπάρχει αυτό

Ο κανόνας `js/stack-trace-exposure` (CWE-209) του CodeQL επισημαίνει κάθε διαδρομή κώδικα όπου ένα μήνυμα σφάλματος που προέρχεται από εξαίρεση κατά τον χρόνο εκτέλεσης καταλήγει σε απόκριση HTTP / SSE χωρίς να έχει εξυγιανθεί. Τα ίχνη στοίβας και οι απόλυτες διαδρομές αρχείων στις αποκρίσεις παραγωγής παρέχουν στους επιτιθέμενους:

- Εσωτερική διάταξη καταλόγων (`/srv/app/src/lib/...`) → αναγνώριση για περαιτέρω επιθέσεις.
- Εκδόσεις βιβλιοθηκών / framework που συνάγονται από τα πλαίσια στοίβας → επιλογή στοχευμένων exploits.
- Ευαίσθητες τιμές χρόνου εκτέλεσης που ενδέχεται να παρεμβάλλονται ως συμβολοσειρές σε σφάλματα (ερωτήματα DB, τιμές διαμόρφωσης).

Το βοηθητικό `sanitizeErrorMessage` που εξάγεται από το `open-sse/utils/error.ts` αφαιρεί αυτές τις κατηγορίες
διαρροών:

1. Φυσικές, σειριοποιημένες και σαφώς ενσωματωμένες καταλήξεις πλαισίων στοίβας JavaScript.
2. Απόλυτες διαδρομές συστήματος αρχείων POSIX, Windows, UNC και `file://`, διατηρώντας παράλληλα ασφαλή HTTPS URLs
   και ρητά επισημασμένες διαδρομές API.
3. Αναθέσεις διαπιστευτηρίων, συνήθεις μορφές token παρόχων, μπλοκ PEM ιδιωτικών κλειδιών και URLs δεδομένων
   base64.

Το sanitizer περιορίζει το μήκος της εισόδου και αποτυγχάνει με ασφαλή τρόπο όταν μια thrown τιμή απορρίπτει τη μετατροπή σε συμβολοσειρά.
Η αναδρομική εξυγίανση upstream JSON αφαιρεί επίσης μη ασφαλή κλειδιά διαπιστευτηρίων/διαδρομών, ψευδώνυμα συνεδριών και
κλειδιά ελέγχου πρωτοτύπου πριν σειριοποιηθεί μια απόκριση.

## Το υποχρεωτικό μοτίβο

### 1. Δημιουργία απόκρισης σφάλματος (διαδρομές HTTP / API)

Χρησιμοποιήστε το `buildErrorBody()` — η εξυγίανση είναι ενσωματωμένη:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... λογική χειριστή ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ή, για τα convenience wrappers στην ίδια μονάδα:

```ts
import {
  errorResponse, // αντικείμενο Response μίας χρήσης
  writeStreamError, // writer SSE
  createErrorResult, // δομή { success: false, status, response, ... }
  unavailableResponse, // προσθέτει Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Όλα αυτά εφαρμόζουν το κανονικό δημόσιο όριο σφαλμάτων. Τα `errorResponse`, `writeStreamError` και
`createErrorResult` δρομολογούνται μέσω του `buildErrorBody`· τα τρία εξειδικευμένα βοηθητικά για επανάληψη/κύκλωμα
προβάλλουν και εξυγιαίνουν απευθείας το δημόσιο περιβάλλον τους. **Δεν χρειάζεται ποτέ να καλέσετε
το `sanitizeErrorMessage` χειροκίνητα** όταν χρησιμοποιείτε αυτά τα βοηθητικά.

### 2. Προσαρμοσμένοι φάκελοι σφαλμάτων (σπάνια)

Όταν δεν μπορείτε να χρησιμοποιήσετε τα παραπάνω βοηθητικά (π.χ. η μορφή της απόκρισης υπαγορεύεται από ένα upstream πρωτόκολλο όπως το Connect-RPC), εισαγάγετε απευθείας το `sanitizeErrorMessage`:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Αυτός είναι ο μόνος εγκεκριμένος τρόπος δημιουργίας ενός προσαρμοσμένου σώματος σφάλματος. Ανατρέξτε στο `open-sse/executors/cursor.ts::buildErrorResponse` για την υλοποίηση αναφοράς.

### 3. Καταγραφή έναντι απόκρισης

Οι αξιόπιστες εσωτερικές εξαιρέσεις μπορούν να διατηρούν το πλήρες μήνυμα και το ίχνος στοίβας τους, ώστε οι διαχειριστές να μπορούν να κάνουν εντοπισμό σφαλμάτων. Οι τιμές
που προέρχονται από όρια παρόχων, επικύρωσης, συνεδριών προγράμματος περιήγησης ή σχετιζόμενα με διαπιστευτήρια πρέπει να
εξυγιαίνονται πριν εισέλθουν στην έξοδο της κονσόλας, στα μεταδεδομένα ελέγχου ή στα μόνιμα αρχεία καταγραφής κλήσεων. Μοτίβο:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // μόνο αξιόπιστη εσωτερική εξαίρεση
  return errorResponse(500, getErrorMessage(err)); // εξυγιασμένο — αποστέλλεται στον πελάτη
}
```

Για αποτυχίες που ελέγχονται από τον πάροχο, προβάλετε και την καταγεγραμμένη τιμή:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Απαγορευμένα μοτίβα

❌ **Ποτέ** μην τοποθετείτε μη επεξεργασμένη έξοδο εξαίρεσης σε σώμα Response:

```ts
// ΚΑΚΟ: το ίχνος στοίβας και οι διαδρομές αρχείων φτάνουν στον πελάτη
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Ποτέ** μην υλοποιείτε δικό σας διαχωρισμό πρώτης γραμμής:

```ts
// ΚΑΚΟ: παραλείπει την αφαίρεση απόλυτων διαδρομών και μπορεί να αποκλίνει από το κανονικό βοηθητικό
const safe = String(err).split("\n")[0];
```

❌ **Ποτέ** μην κάνετε εξυγίανση στη διαδρομή και ξεχνάτε τη διαδρομή SSE. Οτιδήποτε γράφει σε ροή περνάει μέσω του `writeStreamError` (ή του υποκείμενου `buildErrorBody`).

❌ **Ποτέ** μην συμπεριλαμβάνετε σκόπιμα τα `process.cwd()`, `__filename`, `__dirname` ή διαδρομές που προέρχονται από μεταβλητές περιβάλλοντος
σε μηνύματα σφάλματος. Το sanitizer καλύπτει τις απόλυτες διαδρομές ως άμυνα σε βάθος, αλλά οι καλούντες δεν πρέπει εξαρχής
να δημιουργούν μηνύματα που αποκαλύπτουν την τοπολογία.

## Κάλυψη στο CI

Το `tests/unit/error-message-sanitization.test.ts` επιβάλλει τα εξής:

- Κάθε διαδρομή κάτω από το `/api/model-combo-mappings/*` επιστρέφει εξυγιασμένα σώματα στις αποκρίσεις 4xx/5xx.
- Το `sanitizeErrorMessage` αφαιρεί ίχνη στοίβας πολλαπλών γραμμών.
- Το `sanitizeErrorMessage` αντικαθιστά απόλυτες διαδρομές POSIX και Windows με `<path>`.
- Το `sanitizeErrorMessage` χειρίζεται με ασφάλεια εισόδους `null`/`undefined`/στιγμιοτύπων `Error`.
- Το `buildErrorBody` δεν εκθέτει ποτέ ίχνη στοίβας στο πεδίο `message`.

Όταν προσθέτετε μια νέα διαδρομή ή έναν νέο εκτελεστή, αντιγράψτε το μοτίβο ελέγχου από αυτό το αρχείο. Η πύλη κάλυψης (`npm run test:coverage`) επιβάλλει ≥60% σε εντολές/γραμμές/συναρτήσεις/διακλαδώσεις — οι διαδρομές σφάλματος πρέπει να καλύπτονται.

## Σχετικοί έλεγχοι

- Οι ειδοποιήσεις CodeQL `js/stack-trace-exposure` στο `.github/security` πρέπει πάντα **είτε** να διορθώνονται μέσω αυτών των βοηθητικών συναρτήσεων **είτε** να απορρίπτονται με σχόλιο που παραπέμπει σε αυτό το έγγραφο.
- Η ρύθμιση απόκρυψης δεδομένων του `pino` (`src/shared/utils/logRedaction.ts`) χειρίζεται ξεχωριστά τα αξιόπιστα δομημένα αρχεία καταγραφής. Αυτό το έγγραφο καλύπτει δημόσια μηνύματα αποκρίσεων και τιμές ελεγχόμενες από τον πάροχο, οι οποίες διασχίζουν μόνιμα όρια κλήσεων/αρχείων καταγραφής διαμεσολάβησης.
- Η λίστα αποκλεισμού κεφαλίδων ανάντη (`src/shared/constants/upstreamHeaders.ts`) καλύπτει τη διαρροή κεφαλίδων — διατηρείτε και τα δύο αρχεία ευθυγραμμισμένα όταν προσθέτετε μια νέα ανησυχία εξαγωγής δεδομένων.

## Μεταβίβαση λεπτομερειών ανάντη

Το `buildErrorBody` δέχεται ένα προαιρετικό τρίτο όρισμα `upstreamDetails` (το ακατέργαστο
αναλυμένο σώμα από τον ανάντη πάροχο). Όταν παρέχεται, εξυγιαίνεται από το
`sanitizeUpstreamDetails` πριν συμπεριληφθεί στην απόκριση ως `upstream_details`.

Ένα προαιρετικό τέταρτο όρισμα `classification`
(`{ type?: string; code?: string; reason?: string }`) δέχεται μια ρητή δημόσια ταξινόμηση.
Κάθε πεδίο προβάλλεται στο περιορισμένο δημόσιο λεξιλόγιο αναγνωριστικών. Μη ασφαλείς τιμές, τιμές
που μοιάζουν με διαπιστευτήρια, περιέχουν χαρακτήρες ελέγχου ή υπερβαίνουν το επιτρεπόμενο μήκος
αντικαθίστανται από τον τύπο/κωδικό που προκύπτει από την κατάσταση· ένας μη ασφαλής προαιρετικός
λόγος παραλείπεται. Τα τριψήφια αναγνωριστικά κατάστασης HTTP (`100` έως `599`) παραμένουν έγκυρα
για συμβάσεις παρόχων που εκθέτουν την αριθμητική κατάσταση ανάντη ως μηχαναγνώσιμο κωδικό. Το ίδιο
περιορισμένο εύρος γίνεται δεκτό στην τοπικά παραγόμενη μορφή δεσμευτικού θέσης κατάστασης HTTP·
αυθαίρετοι αριθμοί και ονόματα παρόχων παραμένουν εκτός του λεξιλογίου.

Περνάτε κάθε ρητή ταξινόμηση σε αυτό το τέταρτο όρισμα. Μην αντικαθιστάτε ποτέ τα
`body.error.code`, `body.error.type` ή `body.error.reason` αφού επιστρέψει το `buildErrorBody()`·
η μεταγενέστερη τροποποίηση παρακάμπτει τη δημόσια προβολή.

Κανόνες εξυγίανσης που εφαρμόζονται στο `upstreamDetails`:

1. Τερματικές τιμές συμβολοσειρών: περνούν από το `sanitizeErrorMessage` (αφαιρεί ίχνη στοίβας + απόλυτες διαδρομές).
2. Μη ασφαλή κλειδιά διαδρομών, διαπιστευτηρίων, ψευδωνύμων περιόδου σύνδεσης και ελέγχου πρωτοτύπου αφαιρούνται.
3. Όριο βάθους: η ένθεση πέρα από 4 επίπεδα αντικαθίσταται με τη συμβολοσειρά `"[truncated]"`.
4. Οι πίνακες περιορίζονται σε 32 στοιχεία.

Μόνο τα σημεία κλήσης με αναλυμένο σώμα σφάλματος παρόχου πρέπει να περνούν το `upstreamDetails`. Τα
εσωτερικά σφάλματα OmniRoute (αποτυχίες ανάλυσης SSE, κενό περιεχόμενο, αποκλεισμοί από μηχανισμούς
προστασίας) δεν πρέπει να το περιλαμβάνουν.

ΜΗΝ περνάτε ακατέργαστο `err.stack`, `err.message` ή οποιαδήποτε συμβολοσειρά από εξαίρεση χρόνου
εκτέλεσης στο `upstreamDetails`. Αυτά πρέπει να συνεχίσουν να περνούν από το `errorResponse` /
`buildErrorBody(code, msg)` χωρίς σώμα ανάντη.

Η επιλεκτική μεταβίβαση αποκρίσεων ανάντη 4xx διατηρεί την ασφαλή δομή JSON και τη διατύπωση του
παρόχου που απαιτούνται για την αυτόματη αποκατάσταση του πελάτη, αλλά δεν αποτελεί μεταβίβαση
byte προς byte: ο αναδρομικός εξυγιαντής εκτελείται πάντα πριν από τη σειριοποίηση. Κυκλικά σώματα,
σώματα που περιέχουν BigInt ή εχθρικό `toJSON()` αποτυγχάνουν με ασφαλή τρόπο και δεν είναι επιλέξιμα
για μεταβίβαση. Η OCR και ο έλεγχος περιεχομένου εφαρμόζουν τον ίδιο κανόνα· σώματα ανάντη που δεν
είναι JSON, είναι κενά ή φέρουν εσφαλμένη επισήμανση μετατρέπονται στο κανονικό περίβλημα σφάλματος
JSON του OmniRoute.

## Γνωστός περιορισμός του CodeQL: δεν αναγνωρίζονται οι προσαρμοσμένοι sanitizers

Το ερώτημα CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) χρησιμοποιεί μια σταθερή λίστα επιτρεπόμενων μοτίβων sanitizer (π.χ. ενσωματωμένο `.split("\n")[0]`, `String#replace` με συγκεκριμένες μορφές κανονικών εκφράσεων, πρόσβαση στο `.message` ενός `Error`). **Δεν** αναγνωρίζει την έμμεση κλήση μέσω ενός προσαρμοσμένου βοηθητικού εργαλείου όπως το `sanitizeErrorMessage()`.

Αυτό σημαίνει ότι τα σημεία κλήσης που αποδεδειγμένα πραγματοποιούν εξυγίανση μέσω αυτής της μονάδας — για παράδειγμα, τα `open-sse/utils/error.ts::errorResponse` και `open-sse/executors/cursor.ts::buildErrorResponse` — ενδέχεται να συνεχίσουν να ενεργοποιούν την ειδοποίηση, παρόλο που ο κώδικας είναι λειτουργικά ασφαλής. Προηγούμενες απορρίψεις: `#224`, `#231` (Μάιος 2026), και οι δύο επισημασμένες ως `false positive` με τεχνική αιτιολόγηση.

**Τρόπος διαχείρισης μιας νέας εμφάνισης:**

1. Επιβεβαιώστε ότι το σημείο κλήσης πράγματι διοχετεύει το μήνυμα μέσω του `sanitizeErrorMessage` / `buildErrorBody` / ενός από τα wrappers που τεκμηριώνονται παραπάνω (διαβάστε ολόκληρη την αλυσίδα κλήσεων — μην εμπιστεύεστε απλώς ένα σχόλιο).
2. Επιβεβαιώστε ότι το `tests/unit/error-message-sanitization.test.ts` καλύπτει τη συγκεκριμένη διαδρομή (ή προσθέστε κάλυψη).
3. Απορρίψτε την ειδοποίηση μέσω `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, παραπέμποντας σε αυτό το έγγραφο.
4. **Μην** επιχειρήσετε να το «διορθώσετε» ενσωματώνοντας το `.split("\n")[0]` παντού — το βοηθητικό εργαλείο αποτελεί τη μοναδική πηγή αλήθειας· η αντιγραφή του μοτίβου αποδυναμώνει τον sanitizer (χάνεται η απόκρυψη διαδρομών, το όριο μήκους και η μετατροπή τύπων) μόνο και μόνο για να φαίνεται ότι ικανοποιείται ο σαρωτής.

Η υιοθέτηση προαιρετικών λειτουργιών, όπως η [διαμόρφωση προσαρμοσμένων sanitizers `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) του CodeQL, αποτελεί τη μακροπρόθεσμη λύση· βρίσκεται εκτός του πεδίου αυτού του εγγράφου.

## Αναφορές

- [CWE-209: Έκθεση πληροφοριών μέσω μηνύματος σφάλματος](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Συνοπτικός οδηγός χειρισμού σφαλμάτων](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit που συγκεντρώνει το βοηθητικό εργαλείο σε ένα σημείο: `1a39c31f` — _fix(security): απόκρυψη δημόσιων διαπιστευτηρίων upstream + κεντρικοποίηση της εξυγίανσης σφαλμάτων_
