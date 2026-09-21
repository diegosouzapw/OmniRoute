# Authorization Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Πηγή αλήθειας:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute διαθέτει μια διοχέτευση εξουσιοδότησης που λαμβάνει υπόψη τη διαδρομή και ελέγχει κάθε αίτημα API. Η ταξινόμηση είναι **ντετερμινιστική** και **κλειστή σε περίπτωση αποτυχίας** — οτιδήποτε δεν μπορεί να ταξινομηθεί καταλήγει ως `MANAGEMENT` και απαιτεί συνεδρία ή διακριτικό επιπέδου διαχείρισης. Αυτή η σελίδα εξηγεί το μοντέλο για μηχανικούς που συντηρούν διαδρομές ή σχεδιάζουν νέα τελικά σημεία.

![Διοχέτευση AuthZ (3 κατηγορίες διαδρομών + αξιολόγηση πολιτικής)](../diagrams/exported/authz-pipeline.svg)

> Πηγή: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Δύο τρόποι ελέγχου ταυτότητας

### 1. Κλειδί API (Bearer)

Χρησιμοποιείται για τα API πελατών που είναι συμβατά με OpenAI/Anthropic/Gemini και για ορισμένες διαδρομές διαχείρισης, όταν το κλειδί διαθέτει το πεδίο εφαρμογής `manage`.

```
Authorization: Bearer <api-key>
```

Επικυρώνεται από τις `isValidApiKey()` / `extractApiKey()` στο `src/sse/services/auth.ts` και επανεξάγεται μέσω του `src/shared/utils/apiAuth.ts`. Ο επικυρωτής αποδέχεται επίσης τις μεταβλητές περιβάλλοντος `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ως μόνιμα κλειδιά διέλευσης (ζήτημα #1350).

### 2. Συνεδρία πίνακα ελέγχου (cookie auth_token)

Για σελίδες του πίνακα ελέγχου και λειτουργίες διαχειριστή.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ένα cookie αποτελεί συνεδρία μόνο όταν το JWT επαληθεύεται **και** περιέχει `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Κάθε
καταναλωτής του cookie (προστασία διαδρομών, ανανέωση διοχέτευσης authz, χειραψία WebSocket, ζωντανός
διακομιστής, `/api/settings/require-login`, `/api/auth/status`) χρησιμοποιεί αυτό το βοηθητικό εργαλείο.
Υπάρχουν και άλλα JWT υπογεγραμμένα με `JWT_SECRET` — η διέλευση του Cursor CLI δημιουργεί
διακριτικά `iss "omniroute" / aud "cursor-cli"` για κατόχους κλειδιών — τα οποία δεν αποτελούν ποτέ συνεδρίες
(#13298).

Επαληθεύεται από την `isDashboardSessionAuthenticated()` στο `src/shared/utils/apiAuth.ts`. Η διοχέτευση ανανεώνει αυτόματα το JWT όταν απομένουν λιγότερες από 7 ημέρες από τη διάρκεια ζωής του των 30 ημερών.

Ορισμένες διαδρομές διαχείρισης αποδέχονται **οποιονδήποτε** από τους δύο τρόπους: cookie Ή `Bearer <key>`, όταν το κλειδί API διαθέτει το πεδίο εφαρμογής `manage` (ή `admin`). Αυτό επιτρέπει τη ροή εργασίας «διαμόρφωση μέσω κλήσεων API» που προστέθηκε στην v3.8.

#### Προαιρετική πύλη σύνδεσης OIDC (#6973)

Η σύνδεση διαχειριστή στον πίνακα ελέγχου υποστηρίζει επίσης μια **προαιρετικά ενεργοποιούμενη** ροή OIDC (OpenID Connect)
παράλληλα με την προεπιλεγμένη σύνδεση μέσω κωδικού πρόσβασης — η σύνδεση μέσω κωδικού πρόσβασης δεν καταργείται ποτέ, απλώς
συμπληρώνεται:

- Είναι απενεργοποιημένη, εκτός εάν `settings.oidcEnabled === true` **και** τα `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` είναι όλα διαμορφωμένα (Ρυθμίσεις → Έλεγχος ταυτότητας).
  Διαφορετικά, το `GET /api/auth/oidc/login` επιστρέφει `400`.
- Το `GET /api/auth/oidc/login` εντοπίζει το `authorization_endpoint` από το
  `/.well-known/openid-configuration` του εκδότη (με εναλλακτική το
  `<issuer>/authorize`), δημιουργεί το URI ανακατεύθυνσης από το εισερχόμενο αίτημα
  (λαμβάνοντας υπόψη το `x-forwarded-proto`) και ανακατευθύνει στον IdP με ένα τυχαίο `state`
  αποθηκευμένο σε ένα cookie `oidc_state` τύπου `httpOnly`.
- Το `GET /api/auth/oidc/callback` επικυρώνει το `state`, ανταλλάσσει τον κωδικό εξουσιοδότησης
  και επαληθεύει την υπογραφή του διακριτικού ID μέσω του JWKS του εκδότη
  (`createRemoteJWKSet` της `jose`, το οποίο αποθηκεύεται στην κρυφή μνήμη ανά URI JWKS), με ελέγχους
  `issuer`/`audience`. Μια προαιρετική λίστα επιτρεπόμενων `oidcAllowedSubjects` αντιστοιχίζει την αξίωση
  `sub` του διακριτικού ή την αξίωση `email` — η αξίωση email λαμβάνεται υπόψη μόνο όταν
  `email_verified === true`, επομένως μια μη επαληθευμένη διεύθυνση email στον IdP δεν μπορεί ποτέ να περάσει
  την πύλη.
- Σε περίπτωση επιτυχίας, δημιουργεί το **ίδιο ακριβώς** JWT `auth_token` διάρκειας 30 ημερών που εκδίδει η σύνδεση
  μέσω κωδικού πρόσβασης (`src/app/api/auth/login/route.ts`), επομένως η υπόλοιπη
  διοχέτευση συνεδρίας του πίνακα ελέγχου (αυτόματη ανανέωση, σημαίες cookie) παραμένει αμετάβλητη —
  το OIDC αντικαθιστά μόνο τον τρόπο δημιουργίας του cookie και όχι τα δικαιώματα που αυτό παρέχει.

## Κλάσεις διαδρομών

Το `src/server/authz/types.ts` ορίζει τρεις κλάσεις· κάθε διαδρομή που δεν μπορεί να ταξινομηθεί με ντετερμινιστικό τρόπο κατατάσσεται από προεπιλογή στη `MANAGEMENT`.

| Κλάση        | Περιγραφή                                                                                                                                                                  | Απαιτούμενος έλεγχος ταυτότητας                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `PUBLIC`     | Ρητά ασφαλείς διαδρομές — σύνδεση, αποσύνδεση, κατάσταση, αρχικοποίηση, έλεγχος εύρυθμης λειτουργίας, αρχική ρύθμιση onboarding.                                           | Κανένας                                                                                 |
| `CLIENT_API` | Τελικά σημεία εξυπηρέτησης μοντέλων — `/api/v1/*`, `/api/v1beta/*`, καθώς και τα ψευδώνυμα `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Κλειδί Bearer όταν είναι ενεργοποιημένη η ισχύουσα σημαία λειτουργίας `REQUIRE_API_KEY` |
| `MANAGEMENT` | Σελίδες πίνακα ελέγχου, ρυθμίσεις, πάροχοι, κλειδιά, τελικά σημεία διαχείρισης και διαγνωστικών.                                                                           | Συνεδρία πίνακα ελέγχου Ή Bearer με εμβέλεια `manage`                                   |

## Ροή επεξεργασίας

```
Εισερχόμενο αίτημα → src/proxy.ts
  → runAuthzPipeline() στο src/server/authz/pipeline.ts
    1. Αφαίρεση αξιόπιστων εσωτερικών κεφαλίδων (x-omniroute-auth-*, x-omniroute-route-class)
    2. Δημιουργία αναγνωριστικού αιτήματος, ταξινόμηση διαδρομής μέσω classifyRoute()
    3. Αν pathname == "/" → ανακατεύθυνση στο /dashboard
    4. Αν βρίσκεται σε διαδικασία τερματισμού (ομαλός τερματισμός) και /api/* → 503
    5. Αν δεν είναι GET και είναι /api/* → έλεγχος προστασίας checkBodySize()
    6. Αν είναι OPTIONS → προκαταρκτικό αίτημα CORS 204
    7. Αν options.enforce == false → διέλευση με κεφαλίδες κλάσης διαδρομής
    8. Διαφορετικά: POLICIES[routeClass].evaluate(ctx)
       - αποδοχή  → προσθήκη x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - απόρριψη → σφάλμα JSON με correlation_id (σελίδες πίνακα ελέγχου → 302 /login)
```

Οι αξιόπιστες εσωτερικές κεφαλίδες (που ορίζονται στο `src/server/authz/headers.ts`) **αφαιρούνται από τα εισερχόμενα αιτήματα** πριν από την ταξινόμηση — οι πελάτες δεν μπορούν να προσυμπληρώσουν το `x-omniroute-auth-*` για να πλαστοπροσωπήσουν ένα υποκείμενο.

### Συμβάσεις πολιτικών

Κάθε κλάση διαδρομής έχει μια πολιτική στο `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — επιστρέφει πάντα `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — εξάγει το Bearer και το επικυρώνει μέσω `validateApiKey()`. Μεταπίπτει σε ανώνυμη πρόσβαση μόνο όταν η ισχύουσα σημαία λειτουργίας `REQUIRE_API_KEY` είναι απενεργοποιημένη. Η ισχύουσα σημαία επιλύεται μέσω `isRequireApiKeyEnabled()` (`παράκαμψη σημαίας λειτουργίας DB > process.env.REQUIRE_API_KEY > προεπιλογή`), ώστε οι Σημαίες Λειτουργιών του Πίνακα Ελέγχου και οι μεταβλητές περιβάλλοντος να διέπουν με συνέπεια τα `/api/v1/*`, `/api/v1beta/*` και τα ψευδώνυμα· οι αποτυχίες του επιλυτή οδηγούν σε ασφαλή απόρριψη. Επιτρέπει αιτήματα με συνεδρία πίνακα ελέγχου στις διαδρομές API πελάτη (συμπεριλαμβανομένης της `/api/v1/models`, η οποία χρησιμοποιείται από τον κατάλογο μοντέλων του πίνακα ελέγχου).
- **`managementPolicy`** (`policies/management.ts`) — αποδέχεται συνεδρία πίνακα ελέγχου, εσωτερικά αιτήματα συγχρονισμού μοντέλων (αντιστοιχισμένα με το `/api/providers/[name]/(sync-models|models)`) ή παρακάμπτεται πλήρως αν το `isAuthRequired()` επιστρέψει false. Επιστρέφει 403 (`AUTH_001`) όταν υπάρχει διακριτικό Bearer αλλά είναι μη έγκυρο, διαφορετικά 401. Επιβάλλει επίσης τις βαθμίδες προστασίας διαδρομών (LOCAL_ONLY / ALWAYS_PROTECTED) πριν από οποιονδήποτε κλάδο ελέγχου ταυτότητας — ανατρέξτε στο [Βαθμίδες Προστασίας Διαδρομών](../security/ROUTE_GUARD_TIERS.md). Οι διαδρομές LOCAL_ONLY στο `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (σήμερα: `/api/mcp/`) μπορούν να προσπελαστούν εκτός loopback όταν το κλειδί Bearer διαθέτει την εμβέλεια `manage`· όλες οι άλλες διαδρομές LOCAL_ONLY παραμένουν αυστηρά προσβάσιμες μόνο μέσω loopback, ανεξαρτήτως εμβέλειας.

Μια επιτυχημένη πολιτική επιστρέφει `AuthSubject` με `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Οι μεταγενέστεροι χειριστές μπορούν να το διαβάσουν μέσω `assertAuth(request, "CLIENT_API")` στο `src/server/authz/assertAuth.ts`, αντί να εκτελέσουν ξανά τη λογική ελέγχου ταυτότητας.

## Λίστα δημόσιων διαδρομών

Το `src/shared/constants/publicApiRoutes.ts` είναι η ρητή λίστα επιτρεπόμενων διαδρομών:

Η λίστα διαχωρίζεται βάσει **μορφής** και αυτός ο διαχωρισμός είναι κρίσιμος (GHSA-74g9-q8f6-793h): ένα πρόθεμα αντιστοιχίζεται με `startsWith()`, επομένως αντιστοιχίζεται επίσης σε κάθε γειτονική διαδρομή που έχει τους ίδιους αρχικούς χαρακτήρες.
Το `/api/usage/om-usage` ως πρόθεμα χαρακτήριζε το `/api/usage/om-usage<anything>` ως PUBLIC, και το Next το αντιστοιχίζει στο `/api/usage/[connectionId]` — έναν χειριστή χωρίς δικό του έλεγχο ταυτοποίησης.

```ts
// Πραγματικά υποδέντρα. Κάθε καταχώριση ΠΡΕΠΕΙ να τελειώνει σε "/" (επιβεβαιώνεται από μια δοκιμή μονάδας).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // αντιμετωπίζεται ως CLIENT_API στο classify, όχι ως δημόσια διαδρομή "χωρίς ταυτοποίηση"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Μεμονωμένες διαδρομές, που αντιστοιχίζονται ΑΚΡΙΒΩΣ (με ή χωρίς τελική κάθετο).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Μεμονωμένες διαδρομές μόνο για ανάγνωση, στις οποίες εφαρμόζεται επίσης η χαλάρωση προέλευσης CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Μεμονωμένη διαδρομή μόνο για ανάγνωση ΧΩΡΙΣ τη χαλάρωση CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Οι διαδρομές μόνο για ανάγνωση είναι δημόσιες **μόνο** για ασφαλείς μεθόδους. Σημείωση: η `classifyRoute()` εξαιρεί τα `/api/v1/*` και `/api/v1beta/*` από την εναλλακτική κατάταξη PUBLIC — αυτά είναι πάντα `CLIENT_API`, ώστε να εξακολουθεί να εφαρμόζεται η πολιτική κλειδιού Bearer.

## Προσθήκη νέας διαδρομής

### Μοτίβο 1 — Δημόσιο τελικό σημείο API πελάτη (ταυτοποίηση Bearer)

Οι διαδρομές κάτω από τα `/api/v1/` και `/api/v1beta/` ταξινομούνται αυτόματα ως `CLIENT_API`. Το middleware επιβάλλει τον έλεγχο Bearer· οι χειριστές διαδρομών δεν χρειάζεται να τον επαναλάβουν, αλλά μπορούν να διαβάσουν το υποκείμενο εάν αυτό είναι χρήσιμο.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... λογική χειριστή
}
```

### Μοτίβο 2 — Τελικό σημείο διαχείρισης (συνεδρία ή Bearer + manage)

Χρησιμοποιήστε τη `requireManagementAuth()` από το `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... λογική χειριστή
}
```

Η `requireManagementAuth()` επιστρέφει `null` σε περίπτωση επιτυχίας ή ένα σφάλμα JSON τύπου `Response`:

- 401 `AUTH_001` "Απαιτείται ταυτοποίηση" — δεν υπάρχουν καθόλου διαπιστευτήρια
- 403 — μη έγκυρο Bearer **ή** υπάρχει Bearer, αλλά το κλειδί δεν διαθέτει το πεδίο εφαρμογής `manage` / `admin`

Η `hasManageScope(scopes)` επιστρέφει true για `"manage"` ή `"admin"`.

### Μοτίβο 3 — Προσθήκη στη δημόσια λίστα επιτρεπόμενων διαδρομών

Επιλέξτε το σύνολο βάσει μορφής και όχι βάσει ευκολίας. Μία διαδρομή τοποθετείται στο `PUBLIC_API_ROUTES_EXACT` (ή στο `PUBLIC_READONLY_CORS_API_ROUTES` αν είναι μόνο για GET)· μόνο ένα πραγματικό υποδέντρο τοποθετείται στο `PUBLIC_API_ROUTE_PREFIXES` και **πρέπει να τελειώνει σε `/`**. Η τοποθέτηση μιας μεμονωμένης διαδρομής στη λίστα προθεμάτων δημοσιοποιεί επίσης κάθε γειτονική διαδρομή που έχει τους ίδιους αρχικούς χαρακτήρες — συμπεριλαμβανομένων συγγενικών διαδρομών με δυναμικά τμήματα που θα προστεθούν αργότερα (GHSA-74g9-q8f6-793h). Ενημερώστε τις δοκιμές μονάδας στα `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` και `tests/unit/authz/classify.test.ts`.

## Πεδία εφαρμογής

Τα κλειδιά API περιέχουν έναν πίνακα `scopes` (αποθηκευμένο ως JSON στο `api_keys.scopes`, βλ. `src/lib/db/apiKeys.ts`).

### Πεδίο εφαρμογής διαχείρισης

- `manage` / `admin` — παρέχει στο κλειδί πρόσβαση στα τελικά σημεία του API διαχείρισης όταν αποστέλλεται ως Bearer.

### Πεδία εφαρμογής MCP (`src/shared/constants/mcpScopes.ts`)

Κάθε εργαλείο MCP απαιτεί συγκεκριμένα πεδία εφαρμογής μέσω του `MCP_TOOL_SCOPES`. Πλήρης λίστα (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Η επιβολή των πεδίων εφαρμογής στο `open-sse/mcp-server/server.ts` μεταβιβάζει τη λίστα πεδίων εφαρμογής κάθε εργαλείου στη
`evaluateToolScopes()`, αφού η `resolveCallerScopeContext()` επιλύσει τα πεδία εφαρμογής από τις πληροφορίες ελέγχου ταυτότητας MCP,
τα μεταδεδομένα του αιτήματος ή το `OMNIROUTE_MCP_SCOPES`.

## Εναλλαγή απαίτησης ελέγχου ταυτότητας

Η `isAuthRequired()` στο `src/shared/utils/apiAuth.ts` αποφασίζει εάν επιβάλλεται **οποιοσδήποτε** έλεγχος ταυτότητας για ένα αίτημα:

- `settings.requireLogin === false` → ο έλεγχος ταυτότητας είναι καθολικά απενεργοποιημένος.
- Δεν έχει ρυθμιστεί κωδικός πρόσβασης **και** δεν υπάρχει μεταβλητή περιβάλλοντος `INITIAL_PASSWORD` → η λειτουργία αρχικής ρύθμισης επιτρέπει τον οδηγό εισαγωγής και τα αιτήματα loopback, αλλά τα αιτήματα από εκτεθειμένο δίκτυο εξακολουθούν να απαιτούν διαπιστευτήρια.
- Οποιοδήποτε σφάλμα της βάσης δεδομένων → αποτυχία με αποκλεισμό πρόσβασης (ασφάλεια από προεπιλογή).

Η επιβολή κλειδιού API πελάτη χρησιμοποιεί την `isRequireApiKeyEnabled()` στο `src/shared/utils/featureFlags.ts` και όχι την απευθείας ανάγνωση του `process.env.REQUIRE_API_KEY`. Αυτό έχει σημασία για τις αναπτυγμένες παρουσίες: η εναλλαγή του `REQUIRE_API_KEY` στο Dashboard → Feature Flags αποθηκεύει μια παράκαμψη στη βάση δεδομένων και επηρεάζει αμέσως τα `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` και άλλους ελέγχους ταυτότητας του API πελάτη που χρησιμοποιούν από κοινού αυτό το βοηθητικό στοιχείο. Εάν δεν είναι δυνατή η ανάγνωση του χώρου αποθήκευσης σημαιών λειτουργιών, ο έλεγχος ταυτότητας του API πελάτη αποτυγχάνει με αποκλεισμό πρόσβασης και απαιτεί κλειδί.

## Μη συμβατή αλλαγή — v3.8.0

Τα τελικά σημεία `/api/v1/agents/tasks/*` και `/api/resilience/model-cooldowns` **απαιτούν πλέον έλεγχο ταυτότητας διαχείρισης** (commit `588a0333`). Οι πελάτες που προηγουμένως έστελναν ένα κανονικό κλειδί API χωρίς το πεδίο εφαρμογής `manage` λαμβάνουν `403`. Μετεγκατάσταση: είτε εκχωρήστε στο κλειδί το πεδίο εφαρμογής `manage` από τον πίνακα ελέγχου API Keys είτε χρησιμοποιήστε μια συνδεδεμένη περίοδο λειτουργίας του πίνακα ελέγχου.

## Αλλαγή συμπεριφοράς — v3.8.2

Το `/api/mcp/*` (ο απομακρυσμένος διακομιστής MCP) εξακολουθεί να είναι LOCAL_ONLY από προεπιλογή, αλλά πλέον αποδέχεται αιτήματα εκτός loopback όταν η κεφαλίδα `Authorization: Bearer <api-key>` περιλαμβάνει το πεδίο εφαρμογής `manage`. Η εξαίρεση ελέγχεται ρητά ανά διαδρομή μέσω του `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` στο `src/server/authz/routeGuard.ts`· η συγγενική πρόθεση LOCAL_ONLY `/api/cli-tools/runtime/*` σκόπιμα ΔΕΝ μπορεί να παρακαμφθεί, επειδή μπορεί να εκκινήσει αυθαίρετες υποδιεργασίες. Τα ανώνυμα αιτήματα προς το `/api/mcp/*` εκτός loopback εξακολουθούν να επιστρέφουν `403 LOCAL_ONLY` — η προεπιλογή για κάθε νέα διαδρομή LOCAL_ONLY παραμένει αυστηρά loopback. Βλ. [Επίπεδα προστασίας διαδρομών](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Δοκιμές

- Δοκιμές μονάδας: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Δημόσια λίστα επιτρεπόμενων: `tests/unit/public-api-routes.test.ts`.
- Εκτέλεση εστιασμένης δοκιμής: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Εντοπισμός σφαλμάτων

Η διοχέτευση επισημαίνει πάντα τις αποκρίσεις με:

```
x-request-id:               <αναγνωριστικό συσχέτισης, επαναλαμβάνεται στα σώματα σφαλμάτων>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Για πιστοποιημένα αιτήματα, οι κεφαλίδες αιτήματος προς το ανάντη σύστημα (στην πλευρά του χειριστή) περιλαμβάνουν επίσης:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<τελευταία-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (προαιρετικό)
x-omniroute-auth-scopes:    λίστα διαχωρισμένη με κόμματα
```

Χρησιμοποιήστε το `assertAuth(req, expectedClass)` μέσα στους χειριστές — προκαλεί `AuthzAssertionError` με κωδικό `AUTHZ_NOT_INITIALIZED` εάν το ενδιάμεσο λογισμικό παρακάμφθηκε (χρήσιμο για τον εντοπισμό παλινδρομήσεων διαμόρφωσης στις δοκιμές).

## Δείτε επίσης

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — δείκτης ελέγχου ταυτότητας ανά τελικό σημείο
- [COMPLIANCE.md](../security/COMPLIANCE.md) — αρχείο καταγραφής ελέγχου για συμβάντα ελέγχου ταυτότητας
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — λεπτομέρειες επιβολής πεδίου εφαρμογής MCP
- Πηγαίος κώδικας: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
