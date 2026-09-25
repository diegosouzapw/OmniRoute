# Embeddings client runbook (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Σημειώσεις διαχειριστή για το `POST /v1/embeddings` όταν το OmniRoute βρίσκεται μπροστά από το
Hindsight 0.9.1 (μόνο κείμενο `encode(list[str])`) και το Memorix 1.6.0 (πύλη πολυμέσων
Jina). Επαληθεύτηκε σε πραγματικό περιβάλλον στις 2026-08-17 με το OmniRoute 3.8.49 στη διεύθυνση
`https://omniroute.jaguar-fish.ts.net/v1`. Δεν περιλαμβάνονται μυστικά παρακάτω.

## Αναγνωριστικά μοντέλων που λειτουργούν

| Αναγνωριστικό πελάτη                           | HTTP | Διανύσματα    | Διάσταση | Σημειώσεις                                                  |
| ---------------------------------------------- | ---- | ------------- | -------- | ----------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | παρτίδα 2 → 2 | 3072     | Λειτουργεί χωρίς εγγενές κλειδί Gemini                      |
| `openrouter/google/gemini-embedding-2-preview` | 200  | παρτίδα 2 → 2 | 3072     | Ίδιος διανυσματικός χώρος με το αναγνωριστικό χωρίς preview |
| `openrouter/google/gemini-embedding-001`       | 200  | παρτίδα 2 → 2 | 3072     | Παρατίθεται στο `GET /v1/embeddings`                        |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | παρτίδα 2 → 2 | 1024     | Κανονικό αναγνωριστικό Jina omni                            |
| `jina/jina-embeddings-v5-omni-small`           | 200  | παρτίδα 2 → 2 | 1024     | Ψευδώνυμο· το `model` στην απόκριση είναι `jina-ai/...`     |
| `jina-embeddings-v5-omni-small`                | 200  | παρτίδα 2 → 2 | 1024     | Επιλύεται επίσης και το σκέτο αναγνωριστικό                 |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1         | **768**  | Διαφορετικός διανυσματικός χώρος από το small               |

Τα `GET /v1/models` και `GET /v1/embeddings` παρέθεσαν τα
`jina-ai/jina-embeddings-v5-omni-small` (1024) και
`jina-ai/jina-embeddings-v5-omni-nano` (768), καθώς και το
`openrouter/google/gemini-embedding-001`. **Δεν** παρέθεσαν το
`openrouter/google/gemini-embedding-2`, παρόλο που αυτό το αναγνωριστικό ήδη εξυπηρετεί αιτήματα.

Μην αναμειγνύετε τα nano (768 διαστάσεων) και small (1024 διαστάσεων) στο ίδιο ευρετήριο. Δεν είναι
συγκρίσιμα.

## Προβληματικά / παραπλανητικά αναγνωριστικά

### Εγγενές Gemini Embedding 2

Αίτημα:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Πραγματικό αποτέλεσμα (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Το `gemini/gemini-embedding-2` επιστρέφει το ίδιο 400. Το `google/gemini-embedding-2`
επιστρέφει HTTP **400** `Unknown embedding provider: google`, εκτός αν κάποιος προσαρμοσμένος
κόμβος παρόχου χρησιμοποιεί το πρόθεμα `google`.

Αναμενόμενο: είτε εγγενής ενσωμάτωση Gemini με κλειδί Google AI Studio στον
πάροχο `gemini` είτε απόκριση 400 που κατονομάζει το λειτουργικό αναγνωριστικό OpenRouter.

Αναπαραγωγή (αποκρύψτε το bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Λειτουργικό υποκατάστατο:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Το εγγενές `gemini-embedding-2` δεν μπορεί να λειτουργήσει μόνο μέσω GitOps. Πρέπει να
προστεθεί ένα κλειδί Google AI Studio ως σύνδεση παρόχου `gemini` (μέσω του πίνακα ελέγχου ή με
εισαγωγή του `GEMINI_API_KEY` στο OmniRoute). Αυτό το μυστικό δεν βρίσκεται σε αυτό το αποθετήριο.

### Διαδρομή πολυμέσων Jina

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

Χρησιμοποιήστε το `POST /v1/embeddings` μέχρι να υπάρξει ψευδώνυμο.

### Αντικείμενο εικόνας Jina / Memorix

Κανονικό στοιχείο εικόνας OmniRoute (PNG 28×28, 784 pixel — το Jina απορρίπτει εικόνες 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

Πραγματικό αποτέλεσμα: HTTP **200**, 1 διάνυσμα, 1024 διαστάσεων.

Εγγενής μορφή Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Πραγματικό αποτέλεσμα: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Η ανάμειξη του `{ "text": "..." }` με το `{ "image": "data:..." }` επιστρέφει το ίδιο 400.

## Σημειώσεις πελατών

### Hindsight 0.9.1

Οι ενσωματώσεις του Hindsight αφορούν μόνο κείμενο (`encode(list[str])`). Δεν αποστέλλει
αντικείμενα εικόνων. Ρυθμίστε το βασικό URL ενσωματώσεων, συμβατό με OpenAI, του Hindsight ώστε να δείχνει στο
`/v1` του OmniRoute και χρησιμοποιήστε ένα λειτουργικό αναγνωριστικό από τον παραπάνω πίνακα
(`jina-ai/jina-embeddings-v5-omni-small` ή
`openrouter/google/gemini-embedding-2`). Μην ορίσετε ως μοντέλο το σκέτο
`gemini-embedding-2`, εκτός αν υπάρχει κλειδί API `gemini` στην πύλη.

### Memorix 1.6.0

Το Memorix αντιμετωπίζει ως εγγενή πολυμέσα μόνο ένα `baseUrl` που αντιστοιχεί στο `/jina\.ai/i`. Ένα
URL του OmniRoute παραμένει στη διαδρομή μόνο κειμένου, ακόμη και όταν το μοντέλο είναι Jina omni.
Αυτή η πύλη αποτελεί ζήτημα του πελάτη Memorix. Ανεξάρτητα από αυτό, το OmniRoute εξακολουθεί να απορρίπτει
το σώμα Jina `{image: "data:..."}` που θα έστελνε το Memorix αν άνοιγε η πύλη,
επομένως οι συμβατοί με Jina πελάτες δεν μπορούν να ενσωματώσουν εικόνες μέσω του OmniRoute
χωρίς το κανονικό σχήμα `{type,source}`.

Χρησιμοποιήστε το `jina-ai/jina-embeddings-v5-omni-small` για κείμενο. Μην κατευθύνετε το
`base_url` του Memorix στο `https://api.jina.ai` — διατηρήστε το OmniRoute ως το μοναδικό ενδιάμεσο σημείο.
