# OpenCode Integration (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Κατάσταση:** Γενικά διαθέσιμο.
> **Απευθύνεται σε:** Διαχειριστές που συνδέουν το OpenCode με μια εγκατάσταση OmniRoute.
> **Έγκυρη πηγή (σχήμα ρυθμίσεων):** `src/shared/services/opencodeConfig.ts`
> **Έγκυρη πηγή (πακέτο npm):** `@omniroute/opencode-provider/` (χώρος εργασίας με δυνατότητα δημοσίευσης)

Το [OpenCode](https://opencode.ai) είναι ένα agentic πρόγραμμα-πελάτης AI για CLI/επιφάνεια εργασίας. Διαβάζει τον κατάλογο παρόχων του από το `~/.config/opencode/opencode.json` (ή το `opencode.jsonc`) και ακολουθεί το σχήμα στη διεύθυνση `https://opencode.ai/config.json`. Το OmniRoute εκτίθεται στο OpenCode ως ένας από αυτούς τους παρόχους — κάθε αίτημα διέρχεται από την τυπική, συμβατή με OpenAI επιφάνεια `/v1` του OmniRoute, επομένως το OpenCode επωφελείται αυτόματα από τη δρομολόγηση Auto-Combo, τους διακόπτες κυκλώματος, τις πολιτικές κλειδιών, την παρατηρησιμότητα κ.λπ.

Υπάρχουν **δύο υποστηριζόμενες διαδρομές ενσωμάτωσης**. Επιλέξτε μία — παράγουν τις ίδιες ρυθμίσεις.

---

## Διαδρομή 1 — Δημιουργία μέσω CLI (χωρίς εγκατάσταση npm)

Συνιστάται για τελικούς χρήστες. Παρέχεται μαζί με το OmniRoute. Ενημερώνει το `opencode.json` επιτόπου.

```bash
# Μετά την εγκατάσταση του OmniRoute (npm i -g @omniroute/cli ή τοπικός κλώνος)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Στο παρασκήνιο, το CLI καλεί τη `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), ώστε ένα υπάρχον `opencode.json` να διατηρεί τους άλλους παρόχους και τα σχόλιά του. Η καταχώριση του OmniRoute προστίθεται ή αντικαθίσταται ατομικά.

Αρχείο που προκύπτει (προεπιλεγμένος κατάλογος μοντέλων):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Διαδρομή 2 — Πακέτο npm `@omniroute/opencode-provider`

Συνιστάται όταν δημιουργείτε τις ρυθμίσεις μέσω σεναρίου Node/TS (διοχετεύσεις CI, monorepos, προσαρμοσμένες ροές εγκατάστασης).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Προαιρετικά: παρακάμψτε τον κατάλογο μοντέλων που εκτίθεται στο OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Για μια μη καταστροφική συγχώνευση με ένα υπάρχον αρχείο, αναπαραγάγετε τη `mergeOpenCodeConfigText()` από το `opencodeConfig.ts` ή καλέστε το εργαλείο δημιουργίας μέσω CLI.

Δείτε το [README του πακέτου](../../@omniroute/opencode-provider/README.md) για το πλήρες API.

---

## Τι κάνει στην πραγματικότητα το περιβάλλον εκτέλεσης

Και οι δύο διαδρομές παράγουν το ίδιο `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Κατά την εκτέλεση, το OpenCode φορτώνει το `@ai-sdk/openai-compatible` (που αποτελεί ήδη μεταβατική εξάρτηση του OpenCode) και το διαμορφώνει με `baseURL` + `apiKey`. Από εκεί και πέρα:

```
Διεπαφή χρήστη/agent του OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (επιφάνεια OpenAI του OmniRoute)
         → χειριστής OmniRoute /v1/chat/completions   (open-sse/handlers/chatCore.ts)
            → δρομολόγηση combo / Auto-Combo / executor
               → ανάντη πάροχος
```

Το πρόσθετο δεν αλληλεπιδρά ποτέ με το HTTP. Παράγει μόνο ρυθμίσεις.

---

## Προεπιλογές καταλόγου μοντέλων

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Μπορείτε να τις παρακάμψετε μέσω `models: [...]`. Προτεινόμενες προσθήκες:

- `"auto"` — εμφανίζει τον δρομολογητή μηδενικής διαμόρφωσης [Auto-Combo](../routing/AUTO-COMBO.md) του OmniRoute. Επιτρέπει στο OpenCode να επιλέξει «το καλύτερο διαθέσιμο μοντέλο» χωρίς να χρειάζεται να κωδικοποιήσετε ρητά τον κατάλογο.
- `"<combo-name>"` — οποιοσδήποτε συνδυασμός έχετε ορίσει στον πίνακα ελέγχου· το OmniRoute τον επιλύει με διαφανή τρόπο.

---

## Κανονικοποίηση URL

Η βοηθητική συνάρτηση δέχεται και τις δύο μορφές και παράγει ακριβώς ένα `/v1`:

| Είσοδος                        | Έξοδος (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Αυτή η αποδιπλοποίηση είναι **η συνηθέστερη αιτία δυσλειτουργίας** που παρατηρείται σε παλαιότερες διαμορφώσεις. Αν έχετε ένα `opencode.json` από έκδοση πριν από την v3.8.0, το οποίο παραπέμπει σε `/v1/v1/...`, εκτελέστε ξανά τη γεννήτρια ή καλέστε ξανά τη `createOmniRouteProvider`.

---

## Τρόποι ελέγχου ταυτότητας

| Ρύθμιση OmniRoute                           | Προτεινόμενη τιμή `apiKey`                                              |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (προεπιλογή τοπικά) | `sk_omniroute` (κυριολεκτικό σύμβολο κράτησης θέσης)                    |
| `REQUIRE_API_KEY=true`                      | Ένα πραγματικό κλειδί API ανά χρήστη από Πίνακας ελέγχου → Κλειδιά API. |

Για πελάτες τύπου Anthropic που στέλνουν `x-api-key` + `anthropic-version`, η `extractApiKey` του OmniRoute λαμβάνει επίσης υπόψη το κλειδί από το `x-api-key`. Το OpenCode χρησιμοποιεί τη διεπαφή OpenAI, επομένως θα στέλνει πάντα `Authorization: Bearer ${apiKey}` — δεν εφαρμόζεται εδώ κάποια ειδική περίπτωση για το Anthropic.

---

## Αντιμετώπιση προβλημάτων

| Σύμπτωμα                                                   | Αιτία                                                                                       | Διόρθωση                                                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `404` σε κάθε αίτημα με URL που περιέχει `/v1/v1/`         | Παρωχημένη διαμόρφωση από πρόσθετο προγενέστερο της v3.8 που πρόσθετε διπλά το `/v1`.       | Δημιουργήστε ξανά τη διαμόρφωση μέσω της Διαδρομής 1 ή 2.                                                                    |
| `401 Invalid API key`                                      | Το OmniRoute έχει `REQUIRE_API_KEY=true` και το κλειδί είναι άγνωστο.                       | Δημιουργήστε το κλειδί στον πίνακα ελέγχου ή ορίστε `REQUIRE_API_KEY=false` (μόνο τοπικά) και χρησιμοποιήστε `sk_omniroute`. |
| Κενή λίστα μοντέλων στο περιβάλλον εργασίας του OpenCode   | Και τα 4 προεπιλεγμένα μοντέλα είναι κρυφά στις ρυθμίσεις ορατότητας παρόχων του OmniRoute. | Περάστε `models: ["auto", ...]` για να εμφανίσετε όσα έχετε ενεργοποιήσει.                                                   |
| Σφάλμα 500 του OpenCode με `cannot read property 'models'` | Παλαιότερες εκδόσεις του OpenCode (< 0.1.x) δεν αποδέχονταν ενσωματωμένο `models`.          | Αναβαθμίστε το OpenCode σε έκδοση που ακολουθεί το σχήμα v1 (`opencode.ai/config.json`).                                     |

---

## Δείτε επίσης

- [Αναφορά API](../reference/API_REFERENCE.md) — πλήρης κάλυψη του OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — τι σημαίνει το `model: "auto"`
- [README του `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Πηγαίος κώδικας: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
