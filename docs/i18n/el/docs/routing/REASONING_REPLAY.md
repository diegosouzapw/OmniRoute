# Reasoning Replay Cache (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Πηγή αλήθειας:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute καταγράφει το `reasoning_content` του βοηθού που παράγεται από μοντέλα λειτουργίας συλλογισμού και το αναπαράγει με διαφανή τρόπο σε αιτήματα πολλαπλών γύρων, όταν το απαιτεί ο ανάντη πάροχος. Αυτό εξαλείφει τα σφάλματα HTTP 400 που επιστρέφουν οι αυστηροί πάροχοι όταν από το ιστορικό συνομιλίας ενός πελάτη λείπει ο συλλογισμός του προηγούμενου γύρου.

## Γιατί υπάρχει αυτό

Αρκετοί πάροχοι λειτουργίας συλλογισμού απορρίπτουν έναν επόμενο γύρο, εκτός εάν το **προηγούμενο μήνυμα του βοηθού περιλαμβάνει το αρχικό `reasoning_content`**. Ο ανάντη πάροχος επιστρέφει 400 με μηνύματα όπως:

```
Λανθασμένη παράμετρος: Το reasoning_content στη λειτουργία συλλογισμού πρέπει να αποστέλλεται ξανά στο API.
```

Ωστόσο, οι συνήθεις πελάτες (Cursor, Cline, Roo Code, OpenAI SDK) αφαιρούν το `reasoning_content` από το ιστορικό που αναπαράγουν. Το OmniRoute το επαναφέρει από μια κρυφή μνήμη στην πλευρά του διακομιστή, ώστε το αίτημα που βλέπει ο ανάντη πάροχος να είναι συνεπές. Το issue #1628 εισήγαγε την υβριδική διατήρηση σε μνήμη/SQLite, ώστε η κρυφή μνήμη να διατηρείται μετά από επανεκκινήσεις της διεργασίας.

## Αρχιτεκτονική

```
Γύρος N (το assistant δημιουργεί):
  → η απόκριση περιέχει reasoning_content + tool_calls
  → εάν requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      εγγράφει (μνήμη + DB), με κλειδί κάθε tool_call.id
  → προώθηση της απόκρισης στον client (ο οποίος μπορεί να διατηρήσει ή να μη διατηρήσει το reasoning)

Γύρος N+1 (ο client στέλνει συνέχεια):
  → ο translator ανιχνεύει: requiresReasoningReplay(provider, model) === true
  → για κάθε μήνυμα assistant με tool_calls και χωρίς reasoning_content:
      lookupReasoning(toolCalls[0].id) → μνήμη → DB
      επιτυχία  → msg.reasoning_content = cached; recordReplay()
      αποτυχία → msg.reasoning_content = "" (εφεδρική συμπεριφορά παλαιού τύπου για παλαιότερο DeepSeek)
  → το upstream βλέπει συνεπές ιστορικό → χωρίς 400
```

Η καταγραφή πραγματοποιείται στο `open-sse/handlers/chatCore.ts` (σε δύο σημεία, στις δύο θέσεις κλήσης του `cacheReasoningFromAssistantMessage`). Η επανάληψη πραγματοποιείται στο `open-sse/translator/index.ts` μετά την προσαρμογή του σχήματος, αλλά πριν από την αποστολή.

Οι απλοί γύροι του assistant (χωρίς κλήση εργαλείου) χρησιμοποιούν διαφορετικό κλειδί: το `buildAssistantMessageCacheKey()` δημιουργεί μια σύνοψη του εύρους της συνεδρίας μαζί με το κανονικοποιημένο transcript σε μορφή OpenAI έως εκείνον τον γύρο, επειδή το DeepSeek απαιτεί το reasoning _κάθε_ προηγούμενου γύρου μόλις υπάρχει το `tools`. Για προορισμούς Responses-API (για παράδειγμα `opencode-go/deepseek-v4-flash`, που δρομολογείται στο `/responses`), το σώμα του upstream περιέχει `input` και όχι `messages`, επομένως το `translateRequest()` (`open-sse/translator/index.ts`) αναφέρει μέσω μιας επιλογής callback το ενδιάμεσο transcript που συνόψισε και τα σημεία καταγραφής συνοψίζουν το ίδιο transcript. Το πέρασμα επανάληψης του Responses εκτελείται στο ενδιάμεσο OpenAI για κάθε μορφή προέλευσης, επομένως επαναλαμβάνονται και οι clients Anthropic Messages (Claude → OpenAI → Responses).

## Αποθήκευση — Υβριδική μνήμη + SQLite

Η διαδρομή υψηλής συχνότητας χρησιμοποιεί ένα `Map` στη μνήμη (LRU βάσει δημιουργίας), το οποίο υποστηρίζεται από έναν πίνακα SQLite για ανάκτηση μετά από κατάρρευση και για ορατότητα στον πίνακα ελέγχου.

| Επίπεδο | Υλοποίηση                                       | Σκοπός                                                      |
| ------- | ----------------------------------------------- | ----------------------------------------------------------- |
| Μνήμη   | `Map` στο `open-sse/services/reasoningCache.ts` | Γρήγορες αναζητήσεις, απομακρύνει το παλαιότερο στις 200    |
| DB      | Πίνακας `reasoning_cache` (`src/lib/db/`)       | Διατηρείται μεταξύ επανεκκινήσεων, τροφοδοτεί τα στατιστικά |

Οι εγγραφές πραγματοποιούνται και στα δύο επίπεδα. Οι αναγνώσεις ελέγχουν πρώτα τη μνήμη και, στη συνέχεια, καταφεύγουν στη DB (οι επιτυχείς αναζητήσεις στη DB προωθούνται ξανά στη μνήμη). Οι αποτυχίες της DB δεν είναι μοιραίες — η κρυφή μνήμη στη μνήμη συνεχίζει να εξυπηρετεί τη διαδρομή υψηλής συχνότητας.

**Προεπιλογές:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Μέγιστες καταχωρίσεις μνήμης: `200` (`MAX_MEMORY_ENTRIES`)
- Απομάκρυνση: πρώτα το παλαιότερο `createdAt`

## Σχήμα βάσης δεδομένων

Μετεγκατάσταση: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Ευρετήρια: `expires_at`, `provider`, `model`, `created_at`. Το `expires_at` αποθηκεύεται ως δευτερόλεπτα Unix epoch· το επίπεδο SELECT κανονικοποιεί τις παλαιότερες τιμές κειμένου μέσω του `EXPIRES_AT_EPOCH_SQL`.

## Ανίχνευση Παρόχου / Μοντέλου

Η επανάληψη ενεργοποιείται όταν η `requiresReasoningReplay(provider, model)` επιστρέφει `true`. Η συνάρτηση ελέγχει δύο λίστες στο `open-sse/services/reasoningCache.ts`.

**Αναγνωριστικά παρόχων (ακριβής αντιστοίχιση, χωρίς διάκριση πεζών-κεφαλαίων):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Μοτίβα κανονικών εκφράσεων μοντέλων (χωρίς διάκριση πεζών-κεφαλαίων):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` και `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, προαιρετική κατάληξη `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Η προσθήκη ενός νέου παρόχου/μοντέλου αυστηρής λειτουργίας απαιτεί την προσθήκη του σε μία από αυτές τις λίστες και τη σύνταξη μιας δοκιμής μονάδας που επαληθεύει την εισαγωγή της επανάληψης. Η περιγραφή του PR θα πρέπει να παραθέτει το ακριβές μήνυμα 400 από το upstream σύστημα που αποτέλεσε την αιτία για την αλλαγή.

## REST API

Η κρυφή μνήμη εκθέτει δύο τελικά σημεία στο `src/app/api/cache/reasoning/route.ts`. Και τα δύο απαιτούν έλεγχο ταυτότητας διαχείρισης (`isAuthenticated` από το `@/shared/utils/apiAuth`).

| Μέθοδος | Τελικό σημείο                                             | Περιγραφή                                                                 |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Στατιστικά + καταχωρίσεις με σελιδοποίηση                                 |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Φιλτραρισμένη λίστα (το `limit` περιορίζεται στο εύρος `[1, 200]`)        |
| DELETE  | `/api/cache/reasoning`                                    | Διαγραφή όλων (μνήμη + ΒΔ) και μηδενισμός των μετρητών επιτυχιών/αστοχιών |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Διαγραφή μόνο των καταχωρίσεων ενός παρόχου                               |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Διαγραφή μίας καταχώρισης                                                 |

**Δομή απόκρισης GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Σημειώσεις Λειτουργίας

- **Εκκαθάριση:** Η `cleanupReasoningCache()` αφαιρεί τις ληγμένες καταχωρίσεις από τη μνήμη και εκτελεί `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Οι διεργασίες ελέγχου εύρυθμης λειτουργίας την καλούν περιοδικά.
- **Ανάκτηση μετά από κατάρρευση:** Μετά από μια επανεκκίνηση, η μνήμη είναι κενή, αλλά η ΒΔ εξακολουθεί να διατηρεί τις μη ληγμένες καταχωρίσεις. Η πρώτη αναζήτηση για ένα συγκεκριμένο `tool_call_id` επιτυγχάνει αντιστοίχιση στη ΒΔ· οι επόμενες αναζητήσεις επιτυγχάνουν αντιστοίχιση στη μνήμη.
- **Χωρίς συλλογισμό, χωρίς κρυφή μνήμη:** Η `cacheReasoningFromAssistantMessage` επιστρέφει `0` όταν το μήνυμα του βοηθού δεν διαθέτει πεδίο `reasoning_content` / `reasoning`, επομένως οι αποκρίσεις χωρίς συλλογισμό δεν έχουν κανένα κόστος.
- **Η εγγραφή υπόκειται επίσης σε έλεγχο:** και τα δύο σημεία κλήσης στο `chatCore.ts` (χωρίς ροή και με ροή) καλούν τη `cacheReasoningFromAssistantMessage()` μόνο όταν η `requiresReasoningReplay(provider, model)` είναι `true` — την ίδια συνθήκη που ελέγχει και η πλευρά ανάγνωσης. Οι εγκαταστάσεις που δεν χρησιμοποιούν ποτέ πάροχο επανάληψης παύουν να επιβαρύνονται με την εγγραφή, την ενημέρωση του ευρετηρίου και το try/catch σε κάθε απόκριση που περιέχει συλλογισμό.
- **Μη αυστηροί πάροχοι:** Όταν η `requiresReasoningReplay` είναι `false` και η μορφή προορισμού είναι OpenAI, ο μεταφραστής **αφαιρεί** οποιοδήποτε πεδίο `reasoning_content` από τα εξερχόμενα μηνύματα — το OpenAI Chat Completions δεν το αποδέχεται.

## Δείτε επίσης

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — διακόπτες κυκλώματος, περίοδοι αναμονής, αποκλεισμοί μοντέλων
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — διάγνωση σφαλμάτων 400 από ανάντη υπηρεσίες
- Πηγαίος κώδικας: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Μετεγκατάσταση: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Διαδρομή API: `src/app/api/cache/reasoning/route.ts`
- Αρχικό ζήτημα: #1628
