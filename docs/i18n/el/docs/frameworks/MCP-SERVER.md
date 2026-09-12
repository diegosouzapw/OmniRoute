# MCP-SERVER (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "OmniRoute MCP Server Documentation"
version: 3.8.50
lastUpdated: 2026-08-08
---

# Τεκμηρίωση OmniRoute MCP Server

> Διακομιστής Model Context Protocol με 110 εργαλεία που καλύπτουν λειτουργίες δρομολόγησης, cache, συμπίεσης, μνήμης, δεξιοτήτων, proxy, pool, Radar και πηγών περιεχομένου.
>
> Πηγή αλήθειας: το `open-sse/mcp-server/server.ts` υπολογίζει **110 μοναδικά εργαλεία** με την `countUniqueMcpTools()`: 45 κανονικοί ορισμοί (συμπεριλαμβανομένων των έξι εργαλείων κύκλου ζωής CCR, της τριάδας agent-skills, των `omniroute_radar_catalog` και `omniroute_x_search`), συν μνήμη (3), δεξιότητες (4), δεξιότητες GitHub (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), τοπικό corpus (3) και δύο εργαλεία συμπίεσης αποκλειστικά για RTK.

## Εγκατάσταση

Το OmniRoute MCP είναι ενσωματωμένο. Εκκινήστε το με:

```bash
omniroute --mcp
```

Ή μέσω του μεταφορέα open-sse:

```bash
# Μεταφορέας HTTP streamable (θύρα 20130)
omniroute --dev  # Το MCP εκκινεί αυτόματα στο endpoint /mcp
```

## Μεταφορείς

Ο διακομιστής MCP εκθέτει τρεις μεταφορείς, όλοι υποστηριζόμενοι από το ίδιο εργοστάσιο `createMcpServer()`:

| Μεταφορέας        | Τοποθεσία                                    | Πότε να χρησιμοποιηθεί                                                      |
| :---------------- | :------------------------------------------- | :-------------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Ενσωματώσεις IDE (Claude Desktop, Cursor, κ.λπ.)                            |
| `sse`             | `POST/GET /api/mcp/sse` μέσω `httpTransport` | Προγράμματα-πελάτες browser/agent που χρειάζονται ροή συμβάντων             |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Προγράμματα-πελάτες HTTP πολλαπλών συνεδριών (επικεφαλίδα `mcp-session-id`) |

Ο ενεργός μεταφορέας HTTP (`sse` ή `streamable-http`) επιλέγεται από τη ρύθμιση `mcpTransport`. Η εναλλαγή μεταφορέων κλείνει τις υπάρχουσες συνεδρίες στον άλλο μεταφορέα.

### Απομακρυσμένη πρόσβαση (παράκαμψη manage-scope)

Το `/api/mcp/*` βρίσκεται στην κατηγορία LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — από προεπιλογή μόνο οι τοπικοί κεντρικοί υπολογιστές (`localhost`, `127.0.0.1`, `::1`) μπορούν να το προσεγγίσουν. Από την έκδοση v3.8.2, οι μη-τοπικοί πελάτες μπορούν να συνδεθούν εφόσον παρουσιάσουν ένα `Authorization: Bearer <api-key>` του οποίου το κλειδί φέρει το πεδίο εφαρμογής `manage`. Αυτός είναι ο μόνος τρόπος να προσεγγιστεί ο απομακρυσμένος διακομιστής MCP μέσω tunnel, αντίστροφου proxy ή δημόσιου ονόματος κεντρικού υπολογιστή.

```bash
# Εκχώρηση πεδίου εφαρμογής manage: ανοίξτε τη σελίδα API Keys του dashboard και ενεργοποιήστε
# το "Management Access" στο κλειδί, ή χρησιμοποιήστε POST scopes:["manage"] κατά τη δημιουργία.

# Στη συνέχεια συνδεθείτε από έναν απομακρυσμένο πελάτη MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ένα κλειδί χωρίς πεδίο εφαρμογής manage (ή χωρίς Bearer) επιστρέφει `403 LOCAL_ONLY`. Το συγγενικό πρόθεμα `/api/cli-tools/runtime/*` δεν είναι σκόπιμα παρακάμψιμο — βλέπε [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Διαμόρφωση IDE

Δείτε το [Οδηγό Διαμόρφωσης MCP Client](../guides/SETUP_GUIDE.md#mcp-client-configuration) για Claude Desktop,
Cursor, Cline και συμβατούς MCP clients.

---

## Βασικά Εργαλεία (14) — Φάση 1

| Εργαλείο                        | Εμβέλειες             | Περιγραφή                                                                                                                                       |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Διαθεσιμότητα, μνήμη, circuit breakers, όρια ρυθμού, στατιστικά cache                                                                           |
| `omniroute_list_combos`         | `read:combos`         | Όλα τα διαμορφωμένα combos με στρατηγικές (προαιρετικές μετρήσεις)                                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Μετρήσεις απόδοσης για συγκεκριμένο combo                                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | Ενεργοποίηση ή απενεργοποίηση ενός combo                                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | Δημιουργία επικυρωμένου combo μέσω του υπάρχοντος combo API                                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Χρησιμοποιημένη/συνολική ποσόστωση, ποσοστό που απομένει, χρόνος επαναφοράς, υγεία token                                                        |
| `omniroute_route_request`       | `execute:completions` | Αποστολή ολοκλήρωσης συνομιλίας μέσω της δρομολόγησης OmniRoute                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | Αναφορά κόστους ανά περίοδο (session/ημέρα/εβδομάδα/μήνα)                                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | Πλήρης κατάλογος μοντέλων με δυνατότητες, κατάσταση, τιμολόγηση                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Τοπικός υπογεγραμμένος κατάλογος Radar· προαιρετικά φίλτρα παρόχου/οικογένειας                                                                  |
| `omniroute_tool_search`         | `read:tools`          | Ανακάλυψη εργαλείων από τον καταχωρημένο κατάλογο MCP                                                                                           |
| `omniroute_web_search`          | `execute:search`      | Αναζήτηση στο διαδίκτυο μέσω των διαμορφωμένων παρόχων αναζήτησης. Όχι X/Twitter.                                                               |
| `omniroute_x_search`            | `execute:search`      | Αναζήτηση στο X μέσω xAI/SuperGrok, ή επιλέξτε `xquik-search` για αποτελέσματα Xquik API. Απαιτούνται διαπιστευτήρια για το επιλεγμένο backend. |
| `omniroute_web_fetch`           | `execute:search`      | Ανάκτηση περιεχομένου ιστού μέσω των διαμορφωμένων παρόχων ανάκτησης                                                                            |

## Προηγμένα Εργαλεία (11) — Φάση 2

| Εργαλείο                           | Εμβέλειες                            | Περιγραφή                                                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Προσομοίωση δρομολόγησης χωρίς εκτέλεση με δέντρο εναλλακτικής κατεύθυνσης                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Προϋπολογισμός συνεδρίας με ενέργεια υποβάθμισης/αποκλεισμού/ειδοποίησης                                                    |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ενημέρωση στρατηγικής combo κατά την εκτέλεση (προτεραιότητα/σταθμισμένη/αυτόματη/κ.λπ.)                                    |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Εφαρμογή προεπιλογής ανθεκτικότητας `aggressive` / `balanced` / `conservative`                                              |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Δοκιμή σε πραγματικές συνθήκες κάθε παρόχου σε ένα combo με πραγματική κλήση upstream                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Μετρήσεις ανά πάροχο με λανθάνοντα χρόνο p50/p95/p99 και κατάσταση διακόπτη κυκλώματος                                      |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Σύσταση combo ανά τύπο εργασίας με περιορισμούς προϋπολογισμού/λανθάνοντος χρόνου                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Εξήγηση του γιατί ένα αίτημα δρομολογήθηκε σε έναν πάροχο (παράγοντες βαθμολόγησης + εναλλακτικές)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Πλήρες στιγμιότυπο συνεδρίας: κόστος, tokens, κορυφαία μοντέλα/πάροχοι, σφάλματα, φύλακας προϋπολογισμού                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Διάγνωση (και προαιρετική αυτόματη επιδιόρθωση) αποκλίσεων βάσης δεδομένων, όπως σπασμένες αναφορές combo / ορφανές γραμμές |
| `omniroute_sync_pricing`           | `pricing:write`                      | Συγχρονισμός δεδομένων τιμολόγησης από εξωτερικές πηγές (LiteLLM)· υποστηρίζει `dryRun`                                     |

## Εργαλεία Κρυφής Μνήμης (2)

| Εργαλείο                | Εμβέλειες     | Περιγραφή                                                                    |
| :---------------------- | :------------ | :--------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Στατιστικά σημασιολογικής κρυφής μνήμης, κρυφής μνήμης prompt και ιδεμποτέντ |
| `omniroute_cache_flush` | `write:cache` | Εκκαθάριση κρυφής μνήμης καθολικά ή ανά υπογραφή/μοντέλο                     |

## Εργαλεία Συμπίεσης (13)

| Εργαλείο                            | Εμβέλειες           | Περιγραφή                                                                                                                                                   |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ρυθμίσεις συμπίεσης, σύνοψη αναλυτικών στοιχείων και στατιστικά με επίγνωση κρυφής μνήμης (περιλαμβάνει μεταδεδομένα `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Ρύθμιση παραμέτρων για τρόπο συμπίεσης, κατώφλι, αναλογία στόχου, διατήρηση system-prompt, εναλλαγή συμπίεσης περιγραφής MCP                                |
| `omniroute_set_compression_engine`  | `write:compression` | Επιλογή ενεργής μηχανής (off/caveman/rtk/stacked) και έντασης Caveman/RTK                                                                                   |
| `omniroute_list_compression_combos` | `read:compression`  | Λίστα ονομαστών combos συμπίεσης και των αγωγών μηχανών τους                                                                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | Αναλυτικά στοιχεία ομαδοποιημένα ανά combo συμπίεσης και μηχανή                                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Αποθήκευση απομονωμένου περιεχομένου καλούντος στο περιορισμένο αποθηκευτικό CCR στη μνήμη και επιστροφή δείκτη μαζί με αναφορά `ccr://`                    |
| `omniroute_ccr_retrieve`            | `read:compression`  | Ανάκτηση περιεχομένου CCR πλήρως ή με τρόπους head, tail, lines, grep και stats                                                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | Επιθεώρηση μεταδεδομένων CCR που ανήκουν στον καλούντα χωρίς επιστροφή περιεχομένου                                                                         |
| `omniroute_ccr_list`                | `read:compression`  | Λίστα σελιδοποιημένων μεταδεδομένων για μπλοκ CCR που ανήκουν στον καλούντα                                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Διαγραφή μπλοκ CCR που ανήκει στον καλούντα                                                                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | Αναφορά χρήσης μνήμης εντός εμβέλειας καλούντος, μετρητών κύκλου ζωής και ορίων αποθηκευτικού                                                               |
| `omniroute_rtk_discover`            | `read:compression`  | Ανακάλυψη επαναλαμβανόμενου θορύβου σε δείγματα εξόδου RTK με opt-in                                                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | Δημιουργία προσχεδίου φίλτρου RTK προς αξιολόγηση από δείγματα με opt-in                                                                                    |

Οι εγγραφές CCR βρίσκονται αποκλειστικά στη μνήμη και εξαφανίζονται κατά την επανεκκίνηση. Κάθε μπλοκ περιορίζεται στα 2 MiB, κάθε
κύριος χρήστης στα 16 MiB και το καθολικό αποθηκευτικό στα 64 MiB. Οι εγγραφές έχουν από προεπιλογή TTL 24 ωρών (μέγιστο
επτά ημερών). Η πλήρης ανάκτηση MCP περιορίζεται στα 256 KiB· τα μεγαλύτερα μπλοκ παραμένουν διαθέσιμα μέσω των
τρόπων εύρους και grep. Η αποθήκευση, η ανάκτηση, η λίστα, η επιθεώρηση, η διαγραφή και τα στατιστικά είναι απομονωμένα ανά
τον αυθεντικοποιημένο κύριο χρήστη API-key. Τα αρχεία ελέγχου περιέχουν κατακερματισμούς και μεταδεδομένα μεγέθους, ποτέ περιεχόμενο.

Το `omniroute_compression_status` αναφέρει τη συμπίεση περιγραφής MCP ξεχωριστά υπό
`analytics.mcpDescriptionCompression`. Αυτές οι τιμές είναι εκτιμήσεις μεγέθους μεταδεδομένων για περιγραφές που μπορούν να
καταχωριστούν στο MCP (`tools`, `prompts`, `resources` και `resourceTemplates`)· δεν αποτελούν αποδείξεις χρήσης παρόχου
και επισημαίνονται με `source: "mcp_metadata_estimate"`.

### Φίλτρο Δέντρου Προσβασιμότητας MCP (v3.8.0)

Ξεχωριστό από τα παραπάνω εργαλεία συμπίεσης, το OmniRoute περιλαμβάνει ένα φίλτρο μετά την εκτέλεση που
συμπιέζει τα **αποτελέσματα εργαλείων** των εργαλείων περιήγησης/προσβασιμότητας MCP πριν επιστραφούν στον
πράκτορα. Αυτό το φίλτρο δεν είναι από μόνο του εργαλείο — εκτελείται διαφανώς σε οποιοδήποτε αποτέλεσμα εργαλείου περιέχει
λεπτομερές κείμενο δέντρου προσβασιμότητας ή στιγμιότυπου περιήγησης (≥2000 χαρακτήρες).

Βασικές συμπεριφορές:

- Συμπτύσσει ≥30 συνεχόμενες επαναλαμβανόμενες γραμμές αδελφών κόμβων σε σύνοψη head + tail
- Διατηρεί τις άγκυρες `[ref=eXX]` που απαιτούνται από το Playwright/computer-use
- Περικόπτει αναγκαστικά υπερμεγέθη κείμενα (>50.000 χαρακτήρες) με υπόδειξη πλοήγησης
- Αναμενόμενη εξοικονόμηση: **60–80%** σε ωφέλιμα φορτία στιγμιότυπων περιήγησης

Ρύθμιση: `compression.mcpAccessibility` στις καθολικές ρυθμίσεις (μετεγκατάσταση 056).
Υλοποίηση: `open-sse/services/compression/engines/mcpAccessibility/`.
Πλήρης τεκμηρίωση: [Μηχανές Συμπίεσης — Φίλτρο Δέντρου Προσβασιμότητας MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Δείτε τις [Μηχανές Συμπίεσης](../compression/COMPRESSION_ENGINES.md) και τη [Συμπίεση RTK](../compression/RTK_COMPRESSION.md) για
το μοντέλο συμπίεσης χρόνου εκτέλεσης πίσω από αυτά τα εργαλεία.

## Εργαλεία 1Proxy (3)

| Εργαλείο                    | Εμβέλειες      | Περιγραφή                                                                                      |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ανάκτηση δωρεάν proxy από το marketplace του 1proxy (φίλτρα πρωτοκόλλου/χώρας/ποιότητας/ορίου) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Λήψη του επόμενου διαθέσιμου proxy βάσει στρατηγικής (`random` / `quality` / `sequential`)     |
| `omniroute_oneproxy_stats`  | `read:proxies` | Στατιστικά pool, κατάσταση συγχρονισμού, κατανομή ανά πρωτόκολλο και χώρα                      |

## Εργαλεία Μνήμης (3)

Ορίζονται στο `open-sse/mcp-server/tools/memoryTools.ts`. Η αυθεντικοποίηση/εμβέλεια επιβάλλεται μέσω της τυπικής διοχέτευσης εμβελειών MCP.

| Εργαλείο                  | Εμβέλειες      | Περιγραφή                                                                                              |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Αναζήτηση μνημών βάσει ερωτήματος / τύπου / κλειδιού API με επιβολή ορίου token                        |
| `omniroute_memory_add`    | `write:memory` | Προσθήκη νέας εγγραφής μνήμης (`factual` / `episodic` / `procedural` / `semantic`)                     |
| `omniroute_memory_clear`  | `write:memory` | Εκκαθάριση μνημών για ένα κλειδί API, προαιρετικά φιλτραρισμένη ανά τύπο ή χρονική σήμανση `olderThan` |

## Εργαλεία Δεξιοτήτων (4)

Ορίζονται στο `open-sse/mcp-server/tools/skillTools.ts`. Υποστηρίζονται από τα `src/lib/skills/registry` + `src/lib/skills/executor`.

| Εργαλείο                      | Εμβέλειες        | Περιγραφή                                                                                   |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Λίστα καταχωρημένων δεξιοτήτων με προαιρετικό φιλτράρισμα ανά κλειδί API, όνομα ή κατάσταση |
| `omniroute_skills_enable`     | `write:skills`   | Ενεργοποίηση ή απενεργοποίηση συγκεκριμένης δεξιότητας βάσει ID                             |
| `omniroute_skills_execute`    | `execute:skills` | Εκτέλεση δεξιότητας με δεδομένη είσοδο και επιστροφή της εγγραφής εκτέλεσης                 |
| `omniroute_skills_executions` | `read:skills`    | Λίστα πρόσφατου ιστορικού εκτελέσεων δεξιοτήτων                                             |

## Πηγή Περιεχομένου Notion (6)

Ορίζεται στο `open-sse/mcp-server/tools/notionTools.ts`. Το token αποθηκεύεται στον πίνακα `key_value` μέσω του `src/lib/db/notion.ts`. REST client στο `src/lib/notion/api.ts`. Settings API στο `src/app/api/settings/notion/route.ts`. Διεπαφή πίνακα ελέγχου στο `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Ρυθμίστε το token ενσωμάτωσης Notion από την καρτέλα **Πηγές Περιεχομένου** στον πίνακα ελέγχου Endpoint, ή μέσω του REST API:

```bash
# Ορισμός token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Έλεγχος κατάστασης
curl http://localhost:20128/api/settings/notion

# Αποσύνδεση
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Εργαλείο                     | Εμβέλειες      | Περιγραφή                                                           |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Αναζήτηση πλήρους κειμένου σε όλες τις σελίδες και βάσεις δεδομένων |
| `notion_get_page`            | `read:notion`  | Ανάκτηση σελίδας βάσει ID μαζί με τις ιδιότητές της                 |
| `notion_list_block_children` | `read:notion`  | Λίστα θυγατρικών blocks μιας σελίδας ή block                        |
| `notion_query_database`      | `read:notion`  | Ερώτημα σε βάση δεδομένων με φίλτρα, ταξινομήσεις και σελιδοποίηση  |
| `notion_get_database`        | `read:notion`  | Ανάκτηση σχήματος βάσης δεδομένων βάσει ID                          |
| `notion_append_blocks`       | `write:notion` | Προσθήκη θυγατρικών blocks σε γονικό block (έως 100 ανά αίτημα)     |

## Εργαλεία Καταλόγου Δεξιοτήτων Πράκτορα (3)

Ορίζονται στο `open-sse/mcp-server/tools/agentSkillTools.ts`. Υποστηρίζονται από το `src/lib/agentSkills/catalog`. Αυτά τα εργαλεία εκθέτουν τον κατάλογο τεκμηρίωσης Δεξιοτήτων Πράκτορα με 45 καταχωρήσεις σε MCP clients και εξωτερικούς πράκτορες. Εμβέλεια: `read:catalog`.

| Εργαλείο                          | Εμβέλειες      | Περιγραφή                                                                                                                                              |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Εμφανίζει όλες τις 45 δεξιότητες πράκτορα με προαιρετικά φίλτρα `category` (api\|cli) και `area`· επιστρέφει μεταδεδομένα + κάλυψη                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Ανακτά πλήρη μεταδεδομένα + περιεχόμενο SKILL.md για μία δεξιότητα με βάση το κανονικό `id`                                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | Στατιστικά κάλυψης: πόσες από τις 23 δεξιότητες API, 21 CLI και 1 config διαθέτουν αρχεία SKILL.md στο σύστημα αρχείων σε σχέση με τα σύνολα καταλόγου |

Δείτε το [AGENT-SKILLS.md](./AGENT-SKILLS.md) για τον πλήρη κατάλογο και τον τρόπο που οι εξωτερικοί πράκτορες τον χρησιμοποιούν.

## Συναφή Πλαίσια (v3.8.0)

Το παραπάνω ευρετήριο εργαλείων MCP (110 μοναδικά εργαλεία, υπολογισμένα από το `countUniqueMcpTools()`) έχει σκοπίμως
περιορισμένο εύρος σε λειτουργίες δρομολόγησης/κρυφής μνήμης/συμπίεσης/μνήμης/δεξιοτήτων/proxy/πηγών-περιβάλλοντος κατά το χρόνο εκτέλεσης. Δύο συμπληρωματικά
πλαίσια παρέχονται μαζί με τον MCP server στην έκδοση v3.8.0 και τεκμηριώνονται χωριστά:

### Cloud Agents

Τα Cloud Agents είναι πράκτορες κώδικα τεχνητής νοημοσύνης εκτός διεργασίας (codex-cloud, cursor-cloud, devin, jules) που συνδέονται στο
OmniRoute μέσω του ίδιου μοντέλου σύνδεσης που χρησιμοποιείται για τους παρόχους LLM. Εκτίθενται μέσω
της δικής τους REST επιφάνειας (`/api/v1/agents/*`) και **δεν** αποτελούν μέρος του καταλόγου εργαλείων MCP
— η κλήση ενός Cloud Agent δεν καταναλώνει εμβέλεια MCP.

- Υλοποίηση: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Κύκλος ζωής: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Τεκμηρίωση: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Τα Guardrails είναι φίλτρα πριν/μετά την εκτέλεση (vision-bridge, pii-masker, prompt-injection)
που εφαρμόζονται εντός του αγωγού συνομιλίας. Εκτελούνται πριν φτάσει η επεξεργασία στο επίπεδο εργαλείου/δρομολόγησης MCP
και εκπέμπουν δομημένες παραβιάσεις στον αγωγό ελέγχου· δεν καλούνται ως εργαλεία MCP.

- Υλοποίηση: `src/lib/guardrails/`.
- Τεκμηρίωση: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Κατά τον εντοπισμό σφαλμάτων σε κλήση MCP που φαίνεται να εμποδίζεται, ελέγξτε τόσο το αρχείο καταγραφής ελέγχου MCP
(καταχωρήσεις `scope_denied:*`) όσο και το ίχνος ελέγχου των guardrails — ένα αίτημα μπορεί να απορριφθεί από
ένα guardrail **πριν** φτάσει ποτέ στο επίπεδο επιβολής εμβέλειας MCP.

---

## Τελικά Σημεία REST API

| Τελικό Σημείο          | Μέθοδος               | Περιγραφή                                                                                                       | Αυθεντικοποίηση            |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Κατάσταση server: heartbeat, κατάσταση μεταφοράς HTTP, σύνοψη δραστηριότητας ελέγχου                            | Διαχείριση (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Κατάλογος εργαλείων (όνομα, περιγραφή, εμβέλειες, φάση, τελικά σημεία πηγής)                                    | Διαχείριση                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Τελικό σημείο μεταφοράς SSE (ελέγχεται από `mcpEnabled` + `mcpTransport === "sse"`)                             | Κλειδί API + εμβέλειες     |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Μεταφορά Streamable HTTP (χρησιμοποιεί κεφαλίδα `mcp-session-id`· το `DELETE` τερματίζει τη συνεδρία)           | Κλειδί API + εμβέλειες     |
| `/api/mcp/audit`       | `GET`                 | Καταχωρήσεις αρχείου ελέγχου από το `mcp_tool_audit` (φίλτρα: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Διαχείριση                 |
| `/api/mcp/audit/stats` | `GET`                 | Συγκεντρωτικά στατιστικά ελέγχου (`totalCalls`, `successRate`, `avgDurationMs`, κορυφαία εργαλεία)              | Διαχείριση                 |

Αρχεία πηγής: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Και οι δύο μεταφορές SSE και Streamable HTTP αποκλείονται έως ότου ο MCP server ενεργοποιηθεί στις Ρυθμίσεις (`mcpEnabled`) και επιλεγεί η κατάλληλη `mcpTransport`. Εάν έχει ρυθμιστεί λανθασμένη μεταφορά, η διαδρομή επιστρέφει HTTP 400 με υπόδειξη για αλλαγή ρυθμίσεων.

---

## Αυθεντικοποίηση & Εμβέλειες

Τα εργαλεία MCP αυθεντικοποιούνται μέσω εμβελειών κλειδιού API. Η επιβολή εμβελειών είναι κεντρικοποιημένη στο
`open-sse/mcp-server/scopeEnforcement.ts`. Κάθε εργαλείο απαιτεί συγκεκριμένες εμβέλειες:

| Εμβέλεια              | Εργαλεία                                                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 εργαλεία ανάγνωσης — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 εργαλεία εγγραφής — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Υποστηρίζονται εμβέλειες με χαρακτήρα μπαλαντέρ: το `read:*` παρέχει πρόσβαση σε όλες τις εμβέλειες ανάγνωσης, ενώ το `*` παρέχει πλήρη πρόσβαση.

### `mcp:connect` — περιορισμένη δυνατότητα δρομολόγησης (#7895)

Η πρόσβαση στη μεταφορά HTTP/SSE MCP (`/api/mcp/*`) από μη τοπικές διευθύνσεις απαιτεί την
εξαίρεση LOCAL_ONLY για το `/api/mcp/` (βλ. `docs/security/ROUTE_GUARD_TIERS.md`). Ιστορικά,
αυτή η εξαίρεση δεχόταν μόνο κλειδί API πλήρους εμβέλειας `manage`/`admin` — πολύ ευρύ για έναν
καλούντα που χρειάζεται μόνο επικοινωνία MCP. Το `src/shared/constants/managementScopes.ts` εξάγει πλέον
το `MCP_CONNECT_SCOPE = "mcp:connect"`: μια προσθετική, στενή εμβέλεια (ίδιο προηγούμενο με
το `SELF_USAGE_SCOPE`) που εξουσιοδοτεί ΜΟΝΟ την παράκαμψη `/api/mcp/` στο
`src/server/authz/policies/management.ts` — δεν παρέχει άλλη πρόσβαση σε διαδρομές διαχείρισης
και διατηρείται σκόπιμα ΕΚΤΟΣ `MANAGEMENT_API_KEY_SCOPES`. Ένα κλειδί με εμβέλεια `manage`/`admin`
εξακολουθεί να περνά την εξαίρεση αναλλοίωτο· το `mcp:connect` αποτελεί μια εναλλακτική χαμηλότερων προνομίων για
απομακρυσμένους καλούντες αποκλειστικά MCP, η οποία ελέγχεται μέσω του `hasMcpConnectOrManageScope()`.

### Δέσμευση εμβέλειας HTTP ανά κλειδί (#7895)

Μέσω HTTP/SSE, το `open-sse/mcp-server/httpTransport.ts` επιλύει πλέον τις πραγματικές
`api_keys.scopes` του καλούντος μέσω του `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
και τις διαβιβάζει στο `transport.handleRequest(req, { authInfo })` του MCP SDK, έτσι ώστε
το `extra.authInfo.scopes` που φτάνει σε κάθε κλήση εργαλείου να αντικατοπτρίζει τις ίδιες τις εμβέλειες του κλειδιού Bearer.
Η συνάρτηση `resolveCallerScopeContext()` του `scopeEnforcement.ts` ήδη προτεραιοποιούσε το `authInfo` έναντι
του εναλλακτικού `_meta` και της μεταβλητής περιβάλλοντος `OMNIROUTE_MCP_SCOPES` — αυτό απλώς τροφοδοτεί τώρα
αυτή την πρώτη, υψηλότερης προτεραιότητας πηγή, η οποία προηγουμένως δεν τροφοδοτούνταν μέσω HTTP. Όταν δεν επιλύεται
κανένα κλειδί API (απουσία επικεφαλίδας, μη έγκυρο κλειδί), το `authInfo` παραμένει `undefined` και η επίλυση
υποβαθμίζεται στην υπάρχουσα αλυσίδα `meta`/env αναλλοίωτη. Αυτό ΔΕΝ αντιστρέφει την προεπιλογή
του `OMNIROUTE_MCP_ENFORCE_SCOPES` — η επιβολή εξακολουθεί να απαιτεί ρητή ενεργοποίηση· η αλλαγή αυτή
απλώς δίνει προτεραιότητα στη διαδρομή ανά κλειδί μόλις ενεργοποιηθεί. Το stdio δεν διαθέτει ταυτότητα ανά καλούντα (βλ.
`mcpCallerIdentity.ts`) και δεν επηρεάζεται — παραμένει στην αλυσίδα εναλλακτικών `_meta`/env.

---

## Μεταβλητές Περιβάλλοντος

| Μεταβλητή                               | Προεπιλογή                                | Σκοπός                                                                                                                                   |
| :-------------------------------------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | Βασικό URL που χρησιμοποιεί ο διακομιστής MCP κατά την κλήση εσωτερικών API του OmniRoute                                                |
| `OMNIROUTE_API_KEY`                     | (κενό)                                    | Κλειδί API που προωθείται ως `Authorization: Bearer` στις εσωτερικές κλήσεις API                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (μόνο το `"true"` το ενεργοποιεί) | Όταν είναι ενεργοποιημένο, τα απόντα scopes απορρίπτουν κλήσεις εργαλείων και καταγράφουν `scope_denied:<reason>` στο αρχείο ελέγχου     |
| `OMNIROUTE_MCP_SCOPES`                  | (κενό)                                    | Λίστα scopes διαχωρισμένων με κόμμα που θεωρούνται «διαθέσιμα» εκ προεπιλογής (χρησιμοποιείται όταν ο καλών δεν παρέχει δικά του scopes) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (μη ορισμένο = ενεργό)                    | Όταν οριστεί σε `0/false/off/no`, απενεργοποιεί τη συμπίεση περιγραφών MCP κατά τη στιγμή της εγγραφής                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (μη ορισμένο = ενεργό)                    | Εναλλακτικό ψευδώνυμο για την ίδια επιλογή όπως παραπάνω                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | Χρονικό όριο ματαίωσης για εσωτερικές αναγνώσεις διαχείρισης (health, resilience, combos, quota, usage)                                  |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | Χρονικό όριο ματαίωσης για βήματα που αναμένουν απόκριση παρόχου (`route_request`, `web_search`, `web_fetch`)                            |
| `MCP_TOOL_DENY`                         | (μη ορισμένο = χωρίς φίλτρο)              | Ονόματα εργαλείων διαχωρισμένα με κόμμα που αφαιρούνται από το `tools/list` (μείωση πληθικότητας εργαλείων — βλ. παρακάτω)               |
| `MCP_TOOL_ALLOW`                        | (μη ορισμένο = χωρίς φίλτρο)              | Ονόματα εργαλείων διαχωρισμένα με κόμμα που διατηρούνται αποκλειστικά (λειτουργία λίστας επιτρεπόμενων — βλ. παρακάτω)                   |
| `DATA_DIR`                              | `~/.omniroute`                            | Το αρχείο heartbeat εγγράφεται στο `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                              |

---

## Συμπίεση Περιγραφών

Τα μητρώα εργαλείων, προτροπών και πόρων MCP μπορούν να συμπιέζουν τις περιγραφές κατά τη στιγμή εγγραφής/καταχώρισης, ώστε να μειωθεί το αποτύπωμα μεταδεδομένων που εκτίθεται στους πελάτες (και κατ' επέκταση το κόστος σε πλαίσιο προτροπής). Η υλοποίηση βρίσκεται στο `open-sse/mcp-server/descriptionCompressor.ts` και συνδέεται με τον διακομιστή MCP μέσω του `compressMcpRegistryMetadata` εντός του `createMcpServer()`.

- Η συμπίεση εκτελείται στο κείμενο της περιγραφής χρησιμοποιώντας το σύνολο κανόνων Caveman (`getRulesForContext("all", "full")`) με εξαγωγή διατηρημένων μπλοκ (εκτάσεις κώδικα, περιφραγμένα μπλοκ κ.λπ.), ώστε το δομικό περιεχόμενο να μην τροποποιείται.
- Εναλλαγή ανά ανάπτυξη μέσω της τιμής `compression.mcpDescriptionCompressionEnabled` στον πίνακα ρυθμίσεων `key_value` (προεπιλογή: ενεργοποιημένο) — εμφανίζεται στο UI ως **Analytics → MCP description compression**.
- Εναλλαγή σε επίπεδο διεργασίας είτε μέσω `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` είτε μέσω `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Στατιστικά σε πραγματικό χρόνο εμφανίζονται μέσω του `omniroute_compression_status` στο `analytics.mcpDescriptionCompression` και φέρουν την ετικέτα `source: "mcp_metadata_estimate"` για να διαχωρίζονται από τα πραγματικά παραστατικά χρήσης παρόχου.

---

## Μείωση Πληθικότητας Εργαλείων (F4.3)

Η συμπίεση περιγραφών συρρικνώνει τα μεταδεδομένα κάθε εργαλείου· η **μείωση πληθικότητας εργαλείων** προχωρά ένα βήμα παραπέρα, μειώνοντας το _πλήθος_ των εργαλείων που ανακοινώνονται συνολικά. Η διαφήμιση λιγότερων εργαλείων στο manifest `tools/list` μειώνει το κόστος σε tokens ανά αίτημα που πληρώνει το μοντέλο του πελάτη για τον κατάλογο εργαλείων (συμπίεση «στρώματος 5»). Η υλοποίηση είναι ένα καθαρό, αναλλοίωτο φίλτρο στο `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), συνδεδεμένο στον βρόχο εγγραφής της `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, απενεργοποιημένο εξ ορισμού.** Το φίλτρο εκτελείται μόνο όταν έχει οριστεί τουλάχιστον μία από δύο μεταβλητές περιβάλλοντος· αν καμία δεν έχει οριστεί, ανακοινώνονται αναλλοίωτα και τα 110 εργαλεία.

| Μεταβλητή        | Λειτουργία                                                                                                |
| :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Μαύρη λίστα — ονόματα εργαλείων χωρισμένα με κόμμα που αφαιρούνται πάντα από το `tools/list`              |
| `MCP_TOOL_ALLOW` | Λίστα επιτρεπόμενων — ονόματα εργαλείων χωρισμένα με κόμμα· μόνο αυτά επιβιώνουν, τα υπόλοιπα αφαιρούνται |

Το `deny` έχει προτεραιότητα έναντι του `allow`. Τα ονόματα διαχωρίζονται με κόμμα, περικόπτονται από κενά και οι κενές καταχωρίσεις αγνοούνται. Παραδείγματα:

```bash
# Αφαίρεση δύο εργαλείων από τον κατάλογο
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ανακοίνωση μόνο των εργαλείων δρομολόγησης + quota (λειτουργία λίστας επιτρεπόμενων)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Πώς αφαιρούνται τα φιλτραρισμένα εργαλεία:** η εγγραφή ολοκληρώνεται πάντα επιτυχώς· ένα εργαλείο που απορρίπτεται από το προφίλ στη συνέχεια απενεργοποιείται με `.disable()` στο αντίστοιχο handle του MCP SDK, οπότε δεν εμφανίζεται ποτέ στο `tools/list`, αλλά η σύνδεσή του παραμένει άθικτη (καθαρή ενεργοποίηση/απενεργοποίηση, χωρίς επανεγγραφή). Ο αναλυτής προφίλ είναι ο `readMcpToolProfileFromEnv(process.env)`, ο οποίος επιστρέφει `null` (χωρίς φιλτράρισμα) όταν και οι δύο μεταβλητές είναι κενές.

Το πλουσιότερο σχήμα `ToolProfile` που βρίσκεται πίσω από το `reduceToolManifest` υποστηρίζει επίσης φιλτράρισμα με τομή εμβέλειας (`allowScopes`, με μπαλαντέρ τύπου `read:*`) και έναν ντετερμινιστικό ανώτατο όριο `maxTools`, αλλά αυτά τα δύο στοιχεία ελέγχου χρειάζονται το πλήρες manifest κατά την εγγραφή και **δεν** εκτίθενται μέσω των μεταβλητών περιβάλλοντος σήμερα (ένα hook σε επίπεδο `tools/list` παρακολουθείται ως επόμενο βήμα). Η συνάρτηση `estimateManifestTokens()` είναι διαθέσιμη για σύγκριση του κόστους σε tokens του manifest πριν και μετά τη μείωση.

---

## Παλμός Εκτέλεσης (Runtime Heartbeat)

Η μεταφορά stdio διατηρεί ενεργοποίηση στο αρχείο `${DATA_DIR}/runtime/mcp-heartbeat.json` κάθε 5 δευτερόλεπτα. Το dashboard (`/api/mcp/status`) διαβάζει αυτό το αρχείο μαζί με την ενεργοποίηση PID για να υπολογίσει την κατάσταση `online`. Οι μεταφορές HTTP αναφέρουν κατάσταση από την εσωτερική διεργασία `getMcpHttpStatus()` (χωρίς εγγραφή αρχείου).

Το στιγμιότυπο παλμού περιέχει:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Καταγραφή Ελέγχου (Audit Logging)

Κάθε κλήση εργαλείου καταγράφεται στον πίνακα SQLite `mcp_tool_audit` από το `open-sse/mcp-server/audit.ts`:

- Όνομα εργαλείου, ορίσματα (κατακερματισμένα/περικομμένα σύμφωνα με το `auditLevel` κάθε εργαλείου), αποτέλεσμα
- Διάρκεια σε ms, σημαία επιτυχίας/αποτυχίας, μήνυμα σφάλματος (εφόσον υπάρχει)
- Κατακερματισμός κλειδιού API, χρονική σήμανση
- Οι αρνήσεις εμβέλειας καταγράφονται ως `scope_denied:<reason>` μαζί με τη λίστα των ελλειπουσών εμβελειών

Χρησιμοποιήστε το dashboard ή τα REST endpoints `/api/mcp/audit` και `/api/mcp/audit/stats` για να επιθεωρήσετε πρόσφατες κλήσεις.

---

## Αρχεία

| Αρχείο                                                                   | Σκοπός                                                                     |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Εργοστάσιο MCP server, σημείο εισόδου stdio, καταχωρίσεις εργαλείων εύρους |
| `open-sse/mcp-server/httpTransport.ts`                                   | Μεταφορά SSE + Streamable HTTP (διαχείριση συνεδρίας)                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Αξιολόγηση εύρους εργαλείου και επίλυση καλούντος                          |
| `open-sse/mcp-server/audit.ts`                                           | Καταγραφή ελέγχου κλήσεων εργαλείου (`mcp_tool_audit`)                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Συντάκτης heartbeat stdio (`mcp-heartbeat.json`)                           |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Συμπίεση περιγραφών για μητρώα εργαλείων / προτροπών / πόρων               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Σχήματα Zod + μητρώο εργαλείων (`MCP_TOOLS`, 45 καταχωρίσεις)              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Χειριστές εργαλείων Φάσης 2 + cache + 1proxy                               |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Χειριστές εργαλείων συμπίεσης                                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Ορισμοί εργαλείων μνήμης (3 εργαλεία)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ορισμοί εργαλείων δεξιοτήτων (4 εργαλεία)                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Ορισμοί εργαλείων πηγής περιεχομένου Notion (6 εργαλεία)                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Ορισμοί εργαλείων gamification (8 εργαλεία)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Εργαλεία καταχώρισης και διαχείρισης plugin (8 εργαλεία)                   |
| `src/app/api/mcp/status/route.ts`                                        | Τελικό σημείο `/api/mcp/status`                                            |
| `src/app/api/mcp/tools/route.ts`                                         | Τελικό σημείο `/api/mcp/tools`                                             |
| `src/app/api/mcp/sse/route.ts`                                           | Διαδρομή μεταφοράς SSE `/api/mcp/sse`                                      |
| `src/app/api/mcp/stream/route.ts`                                        | Διαδρομή μεταφοράς Streamable HTTP `/api/mcp/stream`                       |
| `src/app/api/mcp/audit/route.ts`                                         | Ερώτημα αρχείου καταγραφής ελέγχου `/api/mcp/audit`                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Συγκεντρωτικές μετρικές ελέγχου `/api/mcp/audit/stats`                     |
| `src/lib/notion/api.ts`                                                  | Πελάτης Notion REST API (επανάληψη, χρονικό όριο, ταξινόμηση σφαλμάτων)    |
| `src/lib/db/notion.ts`                                                   | Διατήρηση token Notion (πίνακας `key_value`)                               |
| `src/app/api/settings/notion/route.ts`                                   | API ρυθμίσεων Notion (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Διεπαφή διαχείρισης token Notion                                           |
| `tests/unit/notion-api.test.ts`                                          | Δοκιμές πελάτη Notion API (7)                                              |
| `tests/unit/notion-tools.test.ts`                                        | Δοκιμές επιβολής εύρους εργαλείων Notion (10)                              |
| `tests/unit/db/notion.test.mjs`                                          | Δοκιμές ενότητας DB Notion (3)                                             |
