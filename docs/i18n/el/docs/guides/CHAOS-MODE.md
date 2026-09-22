# Chaos Mode (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Πίνακας ελέγχου:** **Λειτουργία Chaos** (πλευρική γραμμή) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (συνεδρία πίνακα ελέγχου) · `POST /api/skills/collect/chaos` (κλειδί API)  
> **Πηγαίος κώδικας:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Η Λειτουργία Chaos στέλνει **μία εργασία σε πολλούς παρόχους ταυτόχρονα** — κάθε συμμετέχων πάροχος
συνεισφέρει μία παρουσία μοντέλου και λαμβάνετε όλες τις απαντήσεις τη μία δίπλα στην άλλη (ή σε αλυσίδα). Είναι μια
επιφάνεια εκτέλεσης πολλαπλών μοντέλων και όχι στρατηγική δρομολόγησης: η κανονική σας κίνηση προς το `/v1/chat/completions`
δεν επηρεάζεται ποτέ από αυτήν.

**Διευκρίνιση — τρία διαφορετικά πράγματα διατίθενται με το "chaos" στην ονομασία τους:**

| Στοιχείο                 | Τι είναι                                                                                                                                     | Πού τεκμηριώνεται                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Λειτουργία Chaos**     | Η σελίδα του πίνακα ελέγχου + το API που περιγράφονται εδώ: διαμοιρασμός μίας εργασίας σε πολλούς παρόχους (παράλληλα ή συνεργατικά).        | Αυτός ο οδηγός                               |
| `auto/chaos`             | Ένα αναγνωριστικό μοντέλου Auto-Combo με βάρη βαθμολόγησης εισαγωγής σφαλμάτων, για δοκιμές ανθεκτικότητας. Δεν απαιτείται ρύθμιση.          | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Ρύθμιση συνδυασμού Chaos | Ένας αποθηκευμένος συνδυασμός όπου το `config.chaos.enabled` διανέμει την εργασία σε μια ομάδα με προαιρετικό μοντέλο-κριτή (μόνο μέσω API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Ρύθμιση

1. Ανοίξτε το **Πίνακας ελέγχου → Λειτουργία Chaos** (`/dashboard/chaos`).
2. **Ενεργοποιήστε** τη — η Λειτουργία Chaos διατίθεται **απενεργοποιημένη από προεπιλογή** (`enabled: false` στο
   `src/lib/chaos/chaosConfig.ts`). Όσο είναι απενεργοποιημένη, το `POST /api/chaos/run` απαντά με
   `400 — "Η Λειτουργία Chaos δεν είναι ενεργοποιημένη. Ενεργοποιήστε την από το Πίνακας ελέγχου → Λειτουργία Chaos."`.
3. Επιλέξτε τους συμμετέχοντες και τις προεπιλογές (αποθηκεύονται ανά παρουσία μέσω του χώρου αποθήκευσης ρυθμίσεων):

   | Πεδίο               | Σημασία                                                               | Προεπιλογή / όρια                    |
   | ------------------- | --------------------------------------------------------------------- | ------------------------------------ |
   | `enabled`           | Κύριος διακόπτης                                                      | `false`                              |
   | `defaultMode`       | `parallel` ή `collaborative` (δείτε παρακάτω)                         | `parallel`                           |
   | `providerOverrides` | Συμμετοχή ανά πάροχο (`providerId`, προαιρετικό `modelId`, `enabled`) | κενό = κάθε ενεργός πάροχος, έως 200 |
   | `systemPrompt`      | Παράκαμψη της ενσωματωμένης προτροπής συστήματος του Chaos            | προαιρετικό, έως 10 000 χαρακτήρες   |
   | `timeoutMs`         | Μέγιστος χρόνος ανά κλήση μοντέλου                                    | `120000` (5 000–600 000)             |
   | `maxTokens`         | `max_tokens` ανά κλήση μοντέλου                                       | `4096` (256–128 000)                 |

4. Εκτελέστε μια **δοκιμή από την ίδια τη σελίδα** — ο πίνακας αποτελεσμάτων εμφανίζει την απάντηση,
   την κατάσταση και τη διάρκεια για κάθε πάροχο.

## Τρόποι εκτέλεσης

- **`parallel`** — κάθε μοντέλο λαμβάνει ταυτόχρονα την ίδια εργασία· λαμβάνετε όλες τις απαντήσεις
  ανεξάρτητα.
- **`collaborative`** — τα μοντέλα εκτελούνται **σε αλυσίδα**: κάθε μοντέλο βλέπει την έξοδο του προηγούμενου και
  καλείται να τη βελτιώσει, να την επεκτείνει, να την αξιολογήσει κριτικά ή να προσφέρει μια εναλλακτική. Το πεδίο `summary` της απόκρισης
  συνενώνει τις επιτυχείς εξόδους με τη σειρά της αλυσίδας (οι παράλληλες εκτελέσεις δεν έχουν `summary`).

## API

### `POST /api/chaos/run` — συνεδρία πίνακα ελέγχου

Με έλεγχο ταυτότητας μέσω cookie (η συνεδρία διαχείρισης — δείτε το
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md))· χρησιμοποιείται από τη σελίδα του πίνακα ελέγχου.

```jsonc
// σώμα
{
  "task": "Compare approaches to X", // απαιτείται
  "providers": ["glm", "kimi"], // προαιρετικό φίλτρο
  "mode": "parallel", // προαιρετικό — παρακάμπτει το defaultMode
  "systemPrompt": "…", // προαιρετική παράκαμψη
  "maxTokens": 4096, // προαιρετική παράκαμψη
}
```

### `POST /api/skills/collect/chaos` — κλειδί API

Παραλλαγή με διακριτικό Bearer για εξωτερικούς καλούντες. Το κλειδί πρέπει να διαθέτει τη **δικαιοδοσία Λειτουργίας Chaos**
(`chaosModeEnabled`), η οποία είναι **απενεργοποιημένη από προεπιλογή** — ενεργοποιήστε την ανά κλειδί από
**Πίνακας ελέγχου → Διαχείριση API → επεξεργασία κλειδιού → δικαιώματα → Λειτουργία Chaos**. Ίδιο σώμα με το παραπάνω.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Και τα δύο τελικά σημεία επιστρέφουν την ίδια δομή:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // μόνο στη συνεργατική λειτουργία
}
```

## Αντιμετώπιση προβλημάτων

- **`400 Chaos Mode is not enabled`** — δείτε το βήμα 2 παραπάνω: ο καθολικός διακόπτης είναι απενεργοποιημένος.
- **Το κλειδί API απορρίπτεται στο `/api/skills/collect/chaos`** — το κλειδί δεν διαθέτει τη δικαιοδοσία
  `chaosModeEnabled` ανά κλειδί (απενεργοποιημένη από προεπιλογή· πρόκειται για ρύθμιση και όχι για σφάλμα).
- **Ένας πάροχος που αναμένατε απουσιάζει από τα αποτελέσματα** — ελέγξτε το `providerOverrides` στη
  σελίδα της Λειτουργίας Chaos (μια απενεργοποιημένη παράκαμψη τον εξαιρεί), καθώς και αν η σύνδεση του παρόχου είναι
  ενεργή.
