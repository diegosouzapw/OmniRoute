# ACP registry and registered CLI launchers (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

Το OmniRoute διαχωρίζει την **ανίχνευση CLI**, το **εγγενές Agent Client Protocol** και τους
**παλαιούς προσαρμογείς stdio**. Η εύρεση ενός εγκατεστημένου εκτελέσιμου αρχείου δεν αποδεικνύει
τον έλεγχο ταυτότητάς του, τη συμβατότητα μοντέλων ή την ετοιμότητά του να διαχειριστεί ένα prompt.

Ο πίνακας ελέγχου χρησιμοποιεί τα `GET /api/acp/agents` και `POST /api/acp/agents` για την απογραφή
και την καταχώριση προσαρμοσμένων agents. Πρόκειται για διαδρομές διαχείρισης μόνο για τοπική χρήση και όχι για
δημόσιο API για την εκκίνηση διεργασιών ή την υποβολή prompts. Το εσωτερικό
`AcpManager` δεν μετατρέπεται αυτόματα σε εφεδρικό HTTP provider.

## Καταχωρισμένες συμβάσεις

Το `config/cli-tools-manifest.json` αποτελεί την πηγή αλήθειας για τα ενσωματωμένα εκτελέσιμα αρχεία
εκκίνησης, τα ορίσματα και τις λειτουργίες backend. Το μητρώο αντλεί τους ορισμούς του
από αυτό το manifest. Η ανίχνευση αποθηκεύεται στην cache για 60 δευτερόλεπτα.

- `acp`: η σύμβαση Gemini εκκινεί το `gemini --experimental-acp` και επικοινωνεί
  μέσω ACP JSON-RPC, οριοθετημένου με χαρακτήρες νέας γραμμής, χρησιμοποιώντας το επίσημο TypeScript SDK.
- `stdio-adapter`: οι υπόλοιπες καταχωρισμένες συμβάσεις διατηρούν τον παλαιό προσαρμογέα με είσοδο
  ανά γραμμή και έξοδο στο stdout. Μια περίοδος αδράνειας εξόδου δύο δευτερολέπτων τερματίζει την απόκρισή του.
  Αυτός ο προσαρμογέας **δεν** πιστοποιεί εγγενή υποστήριξη ACP για αυτά τα CLI.

Το Gemini τεκμηριώνει τη σημαία εκκίνησης στην [αναφορά CLI](https://geminicli.com/docs/cli/cli-reference/).
Ο client χρησιμοποιεί το [επίσημο ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
για αρχικοποίηση, δημιουργία συνεδριών, αιτήματα prompt, ειδοποιήσεις και ακύρωση.

Οι ορισμοί προσαρμοσμένων agents παραμένουν συμβάσεις εκκίνησης υπό τον έλεγχο του διαχειριστή.
Η καταχώριση ενός εκτελέσιμου αρχείου και ορισμάτων παραχωρεί σε αυτήν τη διεργασία τα τοπικά
δικαιώματα εκτέλεσης του χρήστη του διακομιστή· η καταχώριση δεν αποτελεί sandbox. Οι έλεγχοι έκδοσης αποδέχονται
μόνο το καταχωρισμένο εκτελέσιμο αρχείο και μια αναγνωρισμένη σημαία έκδοσης.

## Εσωτερικό API εκκίνησης

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Περάστε μόνο τις μεταβλητές του provider που έχουν εκχωρηθεί σκόπιμα σε αυτόν τον agent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Εξήγησε αυτό το έργο", 120_000);
  // Καταναλώστε την απόκριση στην εφαρμογή που πραγματοποιεί την κλήση.
} finally {
  acpManager.kill(session.id);
}
```

Το `spawn(agentId, options)` επιλύει το εκτελέσιμο αρχείο και τα ορίσματα από τον
καταχωρισμένο ορισμό. Οι μόνες επιλογές του καλούντος είναι τα `cwd` και `env`· η παλιά
υπογραφή `spawn(agentId, binary, args, env)` και οι παρακάμψεις εκτελέσιμου αρχείου
απορρίπτονται. Οι συμβάσεις εκκίνησης HTTP δεν υποστηρίζονται από αυτόν τον manager.

Η θυγατρική διεργασία κληρονομεί το ίδιο λειτουργικό σύστημα, τερματικό, locale και allowlist
πιστοποιητικών με τους CLI launchers. Τα secrets του διακομιστή/provider δεν αντιγράφονται από το
περιβάλλον της γονικής διεργασίας. Τα διαπιστευτήρια που απαιτούνται από το επιλεγμένο CLI πρέπει να μεταβιβάζονται
ρητά ή να παρέχονται μέσω του τοπικού ελέγχου ταυτότητας του ίδιου του CLI. Η θυγατρική διεργασία
εξακολουθεί να έχει τα δικαιώματα συστήματος αρχείων του τοπικού χρήστη και μπορεί να διαβάσει τη δική της διαμόρφωση.

## Εγγενής κύκλος ζωής και όρια

1. Εκκινήστε το καταχωρισμένο εκτελέσιμο αρχείο, αρχικοποιήστε το ACP και δημιουργήστε μια συνεδρία με ριζικό κατάλογο
   τον επιλεγμένο κατάλογο εργασίας. Η αρχικοποίηση έχει όριο δέκα δευτερολέπτων.
2. Υποβάλετε ένα prompt και συλλέξτε ειδοποιήσεις κειμένου μόνο για αυτήν τη συνεδρία.
   Η ολοκλήρωση καθορίζεται από την απόκριση RPC του prompt και όχι από μια περίοδο σιωπής στο stdout.
3. Χρησιμοποιήστε μία προθεσμία prompt, συμπεριλαμβανομένης τυχόν μη ολοκληρωμένης αρχικοποίησης· η προεπιλογή
   είναι 120 δευτερόλεπτα. Τα ταυτόχρονα prompts στην ίδια διεργασία απορρίπτονται.
4. Σε εγγενές timeout, επιχειρήστε `session/cancel` και τερματίστε τη διεργασία. Ένα
   περιορισμένο χρονικό παράθυρο 100 ms επιτρέπει την εκκαθάριση των ειδοποιήσεων πριν από τον τερματισμό.
5. Κλείστε την κατάσταση μεταφοράς και καταργήστε τη συνεδρία όταν αποτυγχάνει η αρχικοποίηση, κλείνει η
   σύνδεση, τερματίζεται η διεργασία ή την τερματίζει ο καλών.

Τα αιτήματα δικαιωμάτων εργαλείων απορρίπτονται. Δεν διαφημίζονται δυνατότητες client
για το σύστημα αρχείων ή το τερματικό. Αυτοί οι περιορισμοί δεν απομονώνουν σε sandbox το ίδιο το θυγατρικό εκτελέσιμο αρχείο
ούτε αντικαθιστούν τις ρυθμίσεις εξουσιοδότησης του ίδιου του CLI.

Τόσο το εγγενές κείμενο όσο και τα παλαιά stdout/stderr διατηρούν το πολύ 1 MiB χαρακτήρων,
κρατώντας τη νεότερη έξοδο μαζί με μια ειδοποίηση περικοπής. Κάθε μεμονωμένο εγγενές wire
frame περιορίζεται σε 2 MiB byte πριν από την ανάλυση από το SDK. Τα buffer επαναφέρονται ανά prompt.

Το `kill(sessionId)` στέλνει SIGTERM και, στη συνέχεια, SIGKILL μετά από πέντε δευτερόλεπτα, εάν η διεργασία
δεν έχει τερματιστεί. Τα timeout παλαιών prompts αποδεσμεύουν listeners και timers, αλλά αφήνουν
τη συνεδρία διαθέσιμη για άλλο prompt· οι καλούντες παραμένουν υπεύθυνοι για την κλήση
`kill()` ή `killAll()` όταν ολοκληρώσουν.

## Συμβάντα και επιθεώρηση

Ο manager εκπέμπει `stdout`, `stderr` και `exit`, καθένα με `sessionId`.
Το `sessionError` αναφέρει ένα εξυγιασμένο σφάλμα μεταφοράς. Το συμβάν συμβατότητας `error`
εκπέμπεται μόνο όταν διαθέτει συνδρομητή, ώστε ένα εκτελέσιμο αρχείο που λείπει να μην μπορεί
να προκαλέσει ανεπίλυτο σφάλμα EventEmitter.

- Το `getSession(sessionId)` επιστρέφει μια διαχειριζόμενη συνεδρία ή `undefined`.
- Το `getActiveSessions()` εξαιρεί τις συνεδρίες που έχουν διακοπεί ή βρίσκονται σε διαδικασία διακοπής.
- Το `sendInput(sessionId, input)` είναι διαθέσιμο μόνο για έναν ενεργό παλαιό προσαρμογέα·
  το εγγενές ACP απορρίπτει την ακατέργαστη είσοδο για την προστασία της ροής JSON-RPC.
- Το `killAll()` τερματίζει κάθε συνεδρία που διαχειρίζεται η συγκεκριμένη παρουσία.

## Όρια επικύρωσης

Ντετερμινιστικά fixtures καλύπτουν το εγγενές handshake, την έξοδο κειμένου, τα απορριφθέντα
δικαιώματα, την ακύρωση, τα ταυτόχρονα prompts, την αποτυχημένη αρχικοποίηση, τον τερματισμό
διεργασίας, τα όρια εξόδου και την απομόνωση secrets. Οι υπάρχουσες παλινδρομήσεις buffer/listener
του παλαιού μηχανισμού εξακολουθούν να καλύπτονται. Αυτές οι δοκιμές δεν αποδεικνύουν ενεργή σύνδεση στο Gemini
ή επιτυχημένο inference από τον provider· αυτά απαιτούν μια ξεχωριστά εξουσιοδοτημένη δοκιμή smoke
στο περιβάλλον-στόχο.

## Σχετική τεκμηρίωση

- [Πρωτόκολλα agents](./AGENT_PROTOCOLS_GUIDE.md)
- [Συμβάσεις εκκίνησης CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Εργαλεία CLI](../reference/CLI-TOOLS.md)
- [Διακομιστής A2A](./A2A-SERVER.md)
- [Agents cloud](./CLOUD_AGENT.md)
